const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const code = fs.readFileSync(path.join(__dirname, '..', 'cv-music.js'), 'utf8');
const flush = () => new Promise(resolve => setImmediate(resolve));

// Fake only browser boundaries; execute the actual controller in each test.
function setup({ blocked = false, stored = null, storageDenied = false, renderFails = false, supported = true } = {}) {
    const elements = new Map();
    function element(selector) {
        if (!elements.has(selector)) elements.set(selector, {
            attributes: {}, events: {}, hidden: false,
            querySelector: element,
            setAttribute(name, value) { this.attributes[name] = value; },
            addEventListener(name, callback) { this.events[name] = callback; }
        });
        return elements.get(selector);
    }
    const events = {};
    const document = { documentElement: { lang: 'en' }, querySelector: element };
    let observer;
    let audio;
    let gain;
    let source;
    class AudioContext {
        constructor() { audio = this; this.state = 'suspended'; this.currentTime = 0; }
        addEventListener(name, callback) { this.onState = callback; }
        createGain() {
            gain = { gain: { value: 1, setTargetAtTime(value) { this.value = value; } }, connect() {} };
            return gain;
        }
        createBufferSource() {
            source = { started: false, connect() {}, start() { this.started = true; } };
            return source;
        }
        resume() {
            if (blocked) return new Promise(() => {});
            this.state = 'running'; this.onState(); return Promise.resolve();
        }
        suspend() { this.state = 'suspended'; this.onState(); return Promise.resolve(); }
    }
    const storage = {
        getItem() { if (storageDenied) throw new Error('Storage denied'); return stored; },
        setItem(key, value) { if (storageDenied) throw new Error('Storage denied'); stored = value; }
    };
    const window = {
        AudioContext: supported ? AudioContext : undefined,
        createImperialHymn: () => renderFails ? Promise.reject(new Error('Render failed')) : Promise.resolve({ duration: 46 }),
        addEventListener(name, callback) { events[name] = callback; }
    };
    vm.runInNewContext(code, {
        document, window, localStorage: storage,
        MutationObserver: class { constructor(callback) { observer = callback; } observe() {} }
    });
    return {
        element, events, document,
        get audio() { return audio; }, get gain() { return gain; }, get source() { return source; },
        get stored() { return stored; },
        allowPlayback() { blocked = false; }, changeLanguage(lang) { document.documentElement.lang = lang; observer(); },
        click(selector) { element(selector).events.click(); },
        status() { return element('.music-status').textContent; }
    };
}

test('blocked autoplay offers click-to-play, then loops, pauses and resumes', async () => {
    const page = setup({ blocked: true });
    await flush();
    assert.equal(page.status(), 'Click to play');
    assert.equal(page.source, undefined);
    page.allowPlayback(); page.click('.music-play'); await flush();
    assert.equal(page.status(), 'Playing');
    assert.equal(page.source.started, true);
    assert.equal(page.source.loop, true);
    const originalSource = page.source;
    page.click('.music-play'); await flush();
    assert.equal(page.status(), 'Paused');
    page.click('.music-play'); await flush();
    assert.equal(page.status(), 'Playing');
    assert.equal(page.source, originalSource);
});

test('mute changes actual gain, is remembered and can be reversed', async () => {
    const page = setup(); await flush();
    page.click('.music-mute');
    assert.equal(page.status(), 'Muted');
    assert.equal(page.gain.gain.value, 0);
    assert.equal(page.stored, 'true');
    assert.equal(page.element('.music-mute').attributes['aria-pressed'], 'true');
    const nextVisit = setup({ stored: page.stored }); await flush();
    assert.equal(nextVisit.gain.gain.value, 0);
    nextVisit.click('.music-mute');
    assert.equal(nextVisit.gain.gain.value, 0.2);
    assert.equal(nextVisit.stored, 'false');
});

test('language changes update accessible names and playback status', async () => {
    const page = setup(); await flush();
    page.changeLanguage('zh-CN');
    assert.equal(page.status(), '播放中');
    assert.equal(page.element('.music-play').attributes['aria-label'], '暂停圣歌');
    page.changeLanguage('ja'); page.click('.music-mute');
    assert.equal(page.status(), 'ミュート中');
    assert.equal(page.element('.music-mute').attributes['aria-label'], 'ミュート解除');
});

test('navigation suspends music; back-cache restores only previously playing music', async () => {
    const page = setup(); await flush();
    page.events.pagehide(); await flush();
    assert.equal(page.audio.state, 'suspended');
    page.events.pageshow({ persisted: true }); await flush();
    assert.equal(page.status(), 'Playing');
    page.click('.music-play'); await flush();
    page.events.pagehide(); page.events.pageshow({ persisted: true }); await flush();
    assert.equal(page.status(), 'Paused');
});

test('blocked storage does not prevent local mute', async () => {
    const page = setup({ storageDenied: true }); await flush();
    page.click('.music-mute');
    assert.equal(page.status(), 'Muted');
    assert.equal(page.gain.gain.value, 0);
});

test('render failure and unsupported audio show a disabled, localized fallback', async () => {
    for (const options of [{ renderFails: true }, { supported: false }]) {
        const page = setup(options); await flush(); page.changeLanguage('zh-CN');
        assert.equal(page.status(), '暂时无法播放音乐');
        assert.equal(page.element('.music-play').disabled, true);
        assert.equal(page.element('.music-mute').disabled, true);
    }
});
