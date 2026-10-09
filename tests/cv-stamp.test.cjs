const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const flush = () => new Promise(resolve => setImmediate(resolve));

function setup({ muted = false, reducedMotion = false, supported = true, audioFails = false } = {}) {
    const button = { attributes: { 'aria-expanded': 'false' },
        addEventListener(name, callback) { this[name] = callback; },
        setAttribute(name, value) { this.attributes[name] = value; } };
    let animations = 0;
    let canceled = 0;
    const image = { hidden: true, animate() { animations++; return { cancel() { canceled++; } }; } };
    const muteButton = { getAttribute() { return String(muted); } };
    const events = {};
    const contexts = [];
    const sounds = [];
    const parameter = () => ({ setValueAtTime() {}, exponentialRampToValueAtTime() {} });
    class AudioContext {
        constructor() { this.currentTime = 0; this.sampleRate = 22050; this.state = 'suspended'; contexts.push(this); }
        resume() { this.state = 'running'; return audioFails ? Promise.reject(new Error('Audio denied')) : Promise.resolve(); }
        close() { this.state = 'closed'; return Promise.resolve(); }
        createBuffer(channels, length) { return { getChannelData() { return new Float32Array(length); } }; }
        createBufferSource() { const sound = { connect(node) { return node; }, start() {}, stop() {} }; sounds.push(sound); return sound; }
        createGain() { return { gain: parameter(), connect(node) { return node; } }; }
        createBiquadFilter() { return { frequency: { value: 0 }, connect(node) { return node; } }; }
        createOscillator() { return { frequency: parameter(), connect(node) { return node; }, start() {}, stop() {} }; }
    }
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'cv-stamp.js'), 'utf8'), {
        document: { querySelector(selector) { return { '.stamp-button': button, '.stamp-image': image, '.music-mute': muteButton }[selector]; } },
        window: { AudioContext: supported ? AudioContext : undefined,
            matchMedia() { return { matches: reducedMotion }; },
            addEventListener(name, callback) { events[name] = callback; } }
    });
    return { button, image, contexts, sounds, events,
        get animations() { return animations; }, get canceled() { return canceled; },
        setMuted(value) { muted = value; } };
}

test('stamp is hidden until activated, reveals with animation and can be stamped again', async () => {
    const page = setup();
    assert.equal(page.image.hidden, true);
    assert.equal(page.contexts.length, 0);
    page.button.click(); await flush();
    assert.equal(page.image.hidden, false);
    assert.equal(page.button.attributes['aria-expanded'], 'true');
    assert.equal(page.animations, 1);
    assert.equal(page.sounds.length, 1);
    page.button.click(); await flush();
    assert.equal(page.animations, 2);
    assert.equal(page.canceled, 1);
    assert.equal(page.contexts.length, 1, 'rapid clicks do not allocate overlapping audio contexts');
});

test('stamp sound respects mute, while the visual stamp remains available', async () => {
    const page = setup({ muted: true });
    page.button.click(); await flush();
    assert.equal(page.image.hidden, false);
    assert.equal(page.contexts.length, 0);
    page.setMuted(false); page.button.click(); await flush();
    assert.equal(page.sounds.length, 1);
});

test('reduced motion displays the seal without a stamp animation', async () => {
    const page = setup({ reducedMotion: true });
    page.button.click(); await flush();
    assert.equal(page.image.hidden, false);
    assert.equal(page.animations, 0);
});

test('unsupported or rejected audio never prevents stamping', async () => {
    for (const options of [{ supported: false }, { audioFails: true }]) {
        const page = setup(options); page.button.click(); await flush();
        assert.equal(page.image.hidden, false);
        assert.equal(page.sounds.length, 0);
        if (page.contexts.length) assert.equal(page.contexts[0].state, 'closed');
    }
});

test('finished sounds and navigation release their audio context', async () => {
    const page = setup(); page.button.click(); await flush();
    page.sounds[0].onended(); await flush();
    assert.equal(page.contexts[0].state, 'closed');
    page.button.click(); await flush();
    assert.equal(page.contexts.length, 2);
    page.events.pagehide(); await flush();
    assert.equal(page.contexts[1].state, 'closed');
});
