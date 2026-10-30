import { createLanguageController } from "./language.js";

// #region 02 浏览器偏好设置
function readPreference(key, fallback) {
    try {
        return localStorage.getItem(key) ?? fallback;
    }
    catch {
        return fallback;
    }
}
function savePreference(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch {
        // Controls still work in this document when storage is blocked.
        document.documentElement.dataset.storage = "unavailable";
    }
}
// #endregion

// #region 03 音频通用工具
function audioContextClass() {
    const browser = window;
    return browser.AudioContext ?? browser.webkitAudioContext;
}
function offlineContextClass() {
    const browser = window;
    const Context = browser.OfflineAudioContext ?? browser.webkitOfflineAudioContext;
    if (!Context)
        throw new Error("Offline audio synthesis is unavailable.");
    return Context;
}
function normalizeBuffer(buffer, fadeSeconds = 0.3) {
    let peak = 0;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        for (const value of buffer.getChannelData(channel))
            peak = Math.max(peak, Math.abs(value));
    }
    const scale = peak > 0 ? 0.8 / peak : 1;
    const fadeLength = buffer.sampleRate * fadeSeconds;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const samples = buffer.getChannelData(channel);
        for (let index = 0; index < samples.length; index++) {
            const envelope = Math.min(1, index / fadeLength, (samples.length - 1 - index) / fadeLength);
            samples[index] = (samples[index] ?? 0) * scale * envelope;
        }
    }
    return buffer;
}
// #endregion

// #region 04 语言切换
const { initLanguage, translate } = createLanguageController({ readPreference, savePreference });
// #endregion

// #region 05 页面动效
function initMotion() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const progress = document.querySelector(".reading-progress");
    let frame = 0;
    const updateProgress = () => {
        frame = 0;
        const distance = document.documentElement.scrollHeight - innerHeight;
        const fraction = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
        if (progress)
            progress.style.transform = `scaleX(${fraction})`;
    };
    const scheduleProgress = () => {
        if (!frame)
            frame = requestAnimationFrame(updateProgress);
    };
    addEventListener("scroll", scheduleProgress, { passive: true });
    addEventListener("resize", scheduleProgress, { passive: true });
    updateProgress();
    const panels = document.querySelectorAll("[data-reveal]");
    let observer;
    const showAll = () => {
        observer?.disconnect();
        panels.forEach(panel => panel.classList.add("is-visible"));
    };
    if (reduced.matches || !("IntersectionObserver" in window)) {
        showAll();
    }
    else {
        document.body.classList.add("motion-enabled");
        observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer?.unobserve(entry.target);
                }
            }
        }, { threshold: 0.08 });
        panels.forEach(panel => observer?.observe(panel));
    }
    reduced.addEventListener("change", event => { if (event.matches)
        showAll(); });
    document.querySelectorAll(".tilt-surface").forEach(surface => {
        let tiltFrame = 0;
        surface.addEventListener("pointermove", event => {
            if (reduced.matches || event.pointerType !== "mouse")
                return;
            cancelAnimationFrame(tiltFrame);
            const bounds = surface.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            tiltFrame = requestAnimationFrame(() => {
                surface.style.setProperty("--tilt-x", `${-y * 7}deg`);
                surface.style.setProperty("--tilt-y", `${x * 7}deg`);
            });
        });
        const resetTilt = () => {
            cancelAnimationFrame(tiltFrame);
            surface.style.setProperty("--tilt-x", "0deg");
            surface.style.setProperty("--tilt-y", "0deg");
        };
        surface.addEventListener("pointerleave", resetTilt);
        reduced.addEventListener("change", event => { if (event.matches)
            resetTilt(); });
        addEventListener("pagehide", resetTilt);
    });
    addEventListener("pagehide", () => { cancelAnimationFrame(frame); showAll(); });
    addEventListener("pageshow", scheduleProgress);
}
// #endregion

// #region 06 证书筛选与图片查看器
function initCertificates() {
    const gallery = document.querySelector(".certificate-gallery");
    const dialog = document.querySelector(".certificate-dialog");
    const image = dialog?.querySelector(".viewer-image");
    const heading = dialog?.querySelector(".viewer-title");
    const position = dialog?.querySelector(".viewer-position");
    const original = dialog?.querySelector(".viewer-original");
    const error = dialog?.querySelector(".viewer-error");
    if (!gallery || !dialog || !image || !heading || !position || !original || !error)
        return;
    createGallery({ gallery, dialog, image, heading, position, original, error });
}
function createGallery({ gallery, dialog, image, heading, position, original, error }) {
    const records = [];
    gallery.querySelectorAll(".certificate-record").forEach(element => {
        const scan = element.querySelector(".certificate-image-link img");
        const title = element.querySelector("h2");
        if (scan && title)
            records.push({ element, image: scan, heading: title });
    });
    let visible = records;
    let selected = 0;
    let trigger;
    const count = document.querySelector(".certificate-count");
    function display() {
        const record = visible[selected];
        if (!record)
            return;
        image.src = record.image.src;
        image.alt = record.image.alt;
        heading.textContent = record.heading.textContent;
        position.textContent = translate("viewer.position", { current: selected + 1, total: visible.length });
        original.href = record.image.src;
        error.hidden = true;
    }
    gallery.querySelectorAll(".certificate-image-link, .certificate-open").forEach(link => {
        link.addEventListener("click", event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function")
                return;
            const index = visible.findIndex(record => record.element.contains(link));
            if (index < 0)
                return;
            event.preventDefault();
            selected = index;
            trigger = link;
            display();
            dialog.showModal();
            document.body.classList.add("viewer-open");
        });
    });
    const change = (offset) => {
        if (!visible.length)
            return;
        selected = (selected + offset + visible.length) % visible.length;
        display();
    };
    dialog.querySelector(".viewer-close")?.addEventListener("click", () => dialog.close());
    dialog.querySelector(".viewer-previous")?.addEventListener("click", () => change(-1));
    dialog.querySelector(".viewer-next")?.addEventListener("click", () => change(1));
    dialog.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(-1);
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            change(1);
        }
    });
    dialog.addEventListener("click", event => { if (event.target === dialog)
        dialog.close(); });
    dialog.addEventListener("close", () => { document.body.classList.remove("viewer-open"); trigger?.focus({ preventScroll: true }); });
    image.addEventListener("error", () => { error.hidden = false; });
    const filters = document.querySelector(".certificate-filters");
    filters?.querySelectorAll("[data-filter]").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.filter;
            visible = records.filter(record => category === "all" || record.element.dataset.category === category);
            records.forEach(record => { record.element.hidden = !visible.includes(record); });
            filters.querySelectorAll("[data-filter]").forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
            if (count)
                count.textContent = translate("cert.count", { count: visible.length });
        });
    });
    if (filters)
        filters.hidden = false;
    document.addEventListener("site:language-change", () => {
        if (count)
            count.textContent = translate("cert.count", { count: visible.length });
        if (dialog.open)
            display();
    });
    if (count)
        count.textContent = translate("cert.count", { count: records.length });
}
// #endregion

// #region 07 管风琴音乐合成
// Original twelve-bar organ hymn, composed for Hu Kai's personal website.
// The score and pipe tones are synthesized locally; no recordings are used.
async function createImperialHymn() {
    const OfflineContext = offlineContextClass();
    const beat = 60 / 66;
    const score = [
        { chord: [38, 50, 53, 57], melody: [[62, 1], [65, 1], [69, 2]] },
        { chord: [34, 50, 53, 58], melody: [[70, 1], [69, 1], [65, 2]] },
        { chord: [43, 50, 55, 58], melody: [[67, 2], [65, 1], [62, 1]] },
        { chord: [45, 52, 57, 61], melody: [[64, 1], [61, 1], [69, 2]] },
        { chord: [38, 50, 53, 57], melody: [[74, 2], [72, 1], [69, 1]] },
        { chord: [41, 48, 53, 57], melody: [[69, 1], [72, 1], [77, 2]] },
        { chord: [36, 48, 52, 55], melody: [[76, 1], [74, 1], [72, 2]] },
        { chord: [34, 50, 53, 58], melody: [[70, 2], [69, 1], [65, 1]] },
        { chord: [43, 50, 55, 58], melody: [[67, 1], [70, 1], [74, 2]] },
        { chord: [45, 52, 55, 61], melody: [[73, 2], [71, 1], [69, 1]] },
        { chord: [38, 50, 53, 57], melody: [[65, 1], [64, 1], [62, 2]] },
        { chord: [38, 50, 54, 57], melody: [[66, 1], [69, 1], [74, 2]] }
    ];
    const sampleRate = 22050;
    const duration = score.length * 4 * beat + 3;
    const context = new OfflineContext(2, Math.ceil(duration * sampleRate), sampleRate);
    const mix = context.createGain();
    const dry = context.createGain();
    dry.gain.value = 0.8;
    mix.connect(dry).connect(context.destination);
    const reverb = context.createConvolver();
    const impulse = context.createBuffer(2, Math.floor(sampleRate * 2.8), sampleRate);
    let seed = 19990124;
    for (let channel = 0; channel < 2; channel++) {
        const samples = impulse.getChannelData(channel);
        let previous = 0;
        for (let index = 0; index < samples.length; index++) {
            seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
            previous = previous * 0.55 + (seed / 4294967296 * 2 - 1) * 0.45;
            samples[index] = previous * Math.exp(-4.5 * index / samples.length);
        }
    }
    reverb.buffer = impulse;
    const wet = context.createGain();
    wet.gain.value = 0.38;
    mix.connect(reverb).connect(wet).connect(context.destination);
    const wave = context.createPeriodicWave(new Float32Array(9), new Float32Array([0, 1, 0.25, 0.1, 0.17, 0.03, 0.06, 0.01, 0.025]));
    function note(midi, start, length, volume, pan) {
        const pipe = context.createOscillator();
        pipe.setPeriodicWave(wave);
        pipe.frequency.value = 440 * 2 ** ((midi - 69) / 12);
        const envelope = context.createGain();
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(volume, start + 0.12);
        envelope.gain.setValueAtTime(volume, start + length - 0.08);
        envelope.gain.exponentialRampToValueAtTime(0.0001, start + length + 0.4);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        pipe.connect(envelope).connect(position).connect(mix);
        pipe.start(start);
        pipe.stop(start + length + 0.45);
    }
    score.forEach((bar, barIndex) => {
        const start = barIndex * 4 * beat;
        bar.chord.forEach((midi, voice) => {
            note(midi, start, 4 * beat, voice === 0 ? 0.09 : 0.05, (voice - 1.5) * 0.25);
        });
        let offset = 0;
        bar.melody.forEach(([midi, beats]) => {
            note(midi, start + offset * beat, beats * beat, 0.12, 0.05);
            offset += beats;
        });
    });
    const buffer = await context.startRendering();
    let peak = 0;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        for (const value of buffer.getChannelData(channel))
            peak = Math.max(peak, Math.abs(value));
    }
    const scale = peak ? 0.85 / peak : 1;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const samples = buffer.getChannelData(channel);
        for (let index = 0; index < samples.length; index++) {
            const fadeIn = Math.min(1, index / (sampleRate * 0.6));
            const fadeOut = Math.min(1, (samples.length - 1 - index) / (sampleRate * 1.5));
            samples[index] = (samples[index] ?? 0) * scale * fadeIn * fadeOut;
        }
    }
    return buffer;
}
// #endregion

// #region 08 行军音效合成
// An original soundscape: marching boots, field drums, brass and engine rumble.
async function createMusterSoundscape() {
    const sampleRate = 22050;
    const beat = 60 / 96;
    const duration = 16 * 4 * beat;
    const Context = offlineContextClass();
    const context = new Context(2, Math.ceil(duration * sampleRate), sampleRate);
    const mix = context.createGain();
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.ratio.value = 3;
    mix.connect(compressor).connect(context.destination);
    const noiseBuffer = context.createBuffer(1, sampleRate, sampleRate);
    const noiseSamples = noiseBuffer.getChannelData(0);
    let seed = 401999;
    for (let i = 0; i < noiseSamples.length; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        noiseSamples[i] = seed / 4294967296 * 2 - 1;
    }
    function noise(start, length, frequency, volume, pan) {
        const source = context.createBufferSource();
        source.buffer = noiseBuffer;
        const filter = context.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = frequency;
        filter.Q.value = 0.65;
        const gain = context.createGain();
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        source.connect(filter).connect(gain).connect(position).connect(mix);
        source.start(start, 0, length);
    }
    function thud(start, pitch, length, volume, pan) {
        const oscillator = context.createOscillator();
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(pitch, start);
        oscillator.frequency.exponentialRampToValueAtTime(pitch * 0.4, start + length);
        const gain = context.createGain();
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        oscillator.connect(gain).connect(position).connect(mix);
        oscillator.start(start);
        oscillator.stop(start + length);
    }
    const brassWave = context.createPeriodicWave(new Float32Array(8), new Float32Array([0, 1, 0.6, 0.35, 0.2, 0.12, 0.07, 0.035]));
    function brass(midi, start, length, volume, pan) {
        const oscillator = context.createOscillator();
        oscillator.setPeriodicWave(brassWave);
        oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(500, start);
        filter.frequency.linearRampToValueAtTime(1800, start + 0.09);
        filter.frequency.linearRampToValueAtTime(650, start + length);
        const gain = context.createGain();
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume, start + 0.065);
        gain.gain.setValueAtTime(volume * 0.85, start + length * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        oscillator.connect(filter).connect(gain).connect(position).connect(mix);
        oscillator.start(start);
        oscillator.stop(start + length + 0.02);
    }
    const roots = [38, 34, 43, 45];
    const phrases = [[62, 62, 65, 69], [70, 69, 65, 62], [67, 70, 74, 72], [69, 64, 61, 69]];
    for (let bar = 0; bar < 16; bar++) {
        const start = bar * 4 * beat;
        const root = roots[bar % roots.length] ?? 38;
        for (let step = 0; step < 4; step++) {
            const time = start + step * beat;
            const pan = step % 2 ? 0.35 : -0.35;
            thud(time, 110, 0.16, 0.2, pan);
            noise(time + 0.018, 0.12, 330, 0.13, pan);
            thud(time, 75, 0.28, step % 2 === 0 ? 0.24 : 0.12, 0);
            if (step % 2 === 1) {
                noise(time, 0.18, 2200, 0.16, -0.15);
                thud(time, 180, 0.12, 0.055, -0.15);
            }
            noise(time + beat * 0.75, 0.07, 2900, 0.035, 0.2);
        }
        if (bar % 4 === 3) {
            for (let roll = 0; roll < 6; roll++)
                noise(start + 3 * beat + roll * beat / 6, 0.09, 2400, 0.09, -0.1);
        }
        if (bar >= 2) {
            brass(root + 12, start, beat * 3.7, 0.085, -0.4);
            brass(root + 19, start, beat * 3.7, 0.035, 0.4);
            const phrase = phrases[bar % phrases.length] ?? phrases[0];
            phrase?.forEach((note, offset) => brass(note, start + offset * beat, beat * 0.85, 0.08, 0.15));
        }
        if (bar % 4 === 0) {
            noise(start + 0.3, 0.7, 90, 0.22, 0.5);
            thud(start + 0.3, 52, 0.8, 0.17, 0.5);
        }
    }
    const engine = context.createOscillator();
    engine.type = "triangle";
    engine.frequency.value = 43;
    const engineGain = context.createGain();
    engineGain.gain.value = 0.045;
    engine.connect(engineGain).connect(mix);
    engine.start();
    engine.stop(duration);
    return normalizeBuffer(await context.startRendering(), 0.5);
}
// #endregion

// #region 09 音频播放器
function initAudioPlayer() {
    const panel = document.querySelector("[data-audio-track]");
    const toggle = panel?.querySelector(".audio-toggle");
    const mute = panel?.querySelector(".music-mute");
    const volumeInput = panel?.querySelector(".audio-volume");
    const status = panel?.querySelector(".audio-status");
    if (!panel || !toggle || !mute || !volumeInput || !status)
        return { isMuted: () => false };
    return createPlayer({ panel, toggle, mute, volumeInput, status });
}
function createPlayer({ panel, toggle, mute, volumeInput, status }) {
    const track = panel.dataset.audioTrack === "march" ? "march" : "hymn";
    const mutedKey = track === "hymn" ? "hukai-hymn-muted" : "hukai-march-muted";
    const volumeKey = `hukai-${track}-volume`;
    let muted = readPreference(mutedKey, "false") === "true";
    const savedVolume = Number(readPreference(volumeKey, "18"));
    let volume = Number.isFinite(savedVolume) ? Math.min(50, Math.max(0, savedVolume)) / 100 : 0.18;
    let context;
    let gain;
    let source;
    let rendering;
    let buffer;
    let wanted = false;
    let failed = false;
    volumeInput.value = String(volume * 100);
    function update() {
        const playing = Boolean(source && context?.state === "running" && wanted);
        panel.dataset.audioState = playing ? "playing" : "off";
        document.body.classList.toggle("audio-active", playing && !muted && volume > 0);
        toggle.textContent = translate(wanted ? "audio.disable" : "audio.enable");
        toggle.setAttribute("aria-pressed", String(wanted));
        mute.textContent = translate(muted ? "audio.unmute" : "audio.mute");
        mute.setAttribute("aria-pressed", String(muted));
        toggle.disabled = failed;
        mute.disabled = failed;
        volumeInput.disabled = failed;
        const state = failed ? "audio.unavailable" : wanted && !buffer ? "audio.loading" : playing ? muted ? "audio.muted" : "audio.playing" : "audio.ready";
        status.textContent = translate(state);
    }
    function fail() {
        if (context?.state === "closed" && !wanted) {
            update();
            return;
        }
        wanted = false;
        failed = true;
        source?.stop();
        source = undefined;
        if (context && context.state !== "closed")
            void context.close().catch(update);
        update();
    }
    function startIfWanted() {
        if (!wanted || !buffer || !context || !gain || context.state !== "running" || document.hidden) {
            update();
            return;
        }
        if (!source) {
            source = context.createBufferSource();
            source.buffer = buffer;
            source.loop = true;
            source.connect(gain);
            source.start();
        }
        gain.gain.setTargetAtTime(muted ? 0 : volume, context.currentTime, 0.06);
        update();
    }
    function enable() {
        try {
            const Context = audioContextClass();
            if (!Context) {
                fail();
                return;
            }
            if (!context || context.state === "closed") {
                context = new Context();
                gain = context.createGain();
                gain.gain.value = muted ? 0 : volume;
                gain.connect(context.destination);
                context.addEventListener("statechange", update);
            }
            wanted = true;
            // Resume inside the user gesture; synthesis can finish asynchronously.
            const resumed = context.resume();
            rendering ??= track === "march" ? createMusterSoundscape() : createImperialHymn();
            void Promise.all([resumed, rendering]).then(([, rendered]) => {
                buffer = rendered;
                startIfWanted();
            }).catch(fail);
            update();
        }
        catch {
            fail();
        }
    }
    function disable() {
        wanted = false;
        source?.stop();
        source?.disconnect();
        source = undefined;
        if (context?.state === "running")
            void context.suspend().then(update).catch(fail);
        update();
    }
    toggle.addEventListener("click", () => wanted ? disable() : enable());
    mute.addEventListener("click", () => {
        muted = !muted;
        savePreference(mutedKey, String(muted));
        if (context && gain)
            gain.gain.setTargetAtTime(muted ? 0 : volume, context.currentTime, 0.04);
        update();
    });
    volumeInput.addEventListener("input", () => {
        volume = Math.min(50, Math.max(0, Number(volumeInput.value))) / 100;
        savePreference(volumeKey, String(volume * 100));
        if (context && gain)
            gain.gain.setTargetAtTime(muted ? 0 : volume, context.currentTime, 0.04);
        update();
    });
    document.addEventListener("site:language-change", update);
    document.addEventListener("visibilitychange", () => {
        if (!context || context.state === "closed")
            return;
        if (document.hidden)
            void context.suspend().then(update).catch(fail);
        else if (wanted)
            void context.resume().then(startIfWanted).catch(fail);
    });
    addEventListener("pagehide", () => {
        wanted = false;
        source?.stop();
        source?.disconnect();
        source = undefined;
        update();
        if (context && context.state !== "closed")
            void context.close().catch(update);
    });
    failed = !audioContextClass();
    panel.hidden = false;
    update();
    return { isMuted: () => muted };
}
// #endregion

// #region 10 印章互动
function initStamp(audio) {
    const button = document.querySelector(".stamp-button");
    const image = document.querySelector(".stamp-image");
    if (!button || !image)
        return;
    let effectContext;
    const release = (context) => {
        if (effectContext === context)
            effectContext = undefined;
        if (context && context.state !== "closed") {
            void context.close().catch(() => { image.dataset.sound = "unavailable"; });
        }
    };
    const playImpact = () => {
        const Context = audioContextClass();
        if (!Context || audio.isMuted() || effectContext)
            return;
        let context;
        try {
            context = new Context();
            effectContext = context;
            const active = context;
            void active.resume().then(() => {
                if (active.state !== "running") {
                    release(active);
                    return;
                }
                const now = active.currentTime;
                const buffer = active.createBuffer(1, Math.ceil(active.sampleRate * 0.19), active.sampleRate);
                const samples = buffer.getChannelData(0);
                let seed = 990124;
                for (let index = 0; index < samples.length; index++) {
                    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
                    samples[index] = seed / 4294967296 * 2 - 1;
                }
                const noise = active.createBufferSource();
                noise.buffer = buffer;
                const filter = active.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.value = 1800;
                const noiseGain = active.createGain();
                noiseGain.gain.setValueAtTime(0.24, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
                noise.connect(filter).connect(noiseGain).connect(active.destination);
                const thud = active.createOscillator();
                thud.type = "triangle";
                thud.frequency.setValueAtTime(185, now);
                thud.frequency.exponentialRampToValueAtTime(65, now + 0.14);
                const thudGain = active.createGain();
                thudGain.gain.setValueAtTime(0.38, now);
                thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);
                thud.connect(thudGain).connect(active.destination);
                noise.addEventListener("ended", () => release(active), { once: true });
                noise.start(now);
                noise.stop(now + 0.19);
                thud.start(now);
                thud.stop(now + 0.18);
            }).catch(() => release(active));
        }
        catch {
            image.dataset.sound = "unavailable";
            release(context);
        }
    };
    button.addEventListener("click", () => {
        if (!image.hidden)
            return;
        const wasFocused = document.activeElement === button;
        image.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.hidden = true;
        if (wasFocused)
            image.focus({ preventScroll: true });
        if (image.animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
            image.animate([
                { opacity: 0, transform: "scale(1.45) rotate(-14deg)" },
                { opacity: 1, transform: "scale(0.94) rotate(-8deg)", offset: 0.65 },
                { opacity: 1, transform: "scale(1) rotate(-8deg)" }
            ], { duration: 260, easing: "ease-out" });
        }
        playImpact();
    });
    addEventListener("pagehide", () => release(effectContext));
    button.hidden = false;
}
// #endregion

// #region 11 页面初始化
initLanguage();
initCertificates();
initMotion();
const audio = initAudioPlayer();
initStamp(audio);
// #endregion
