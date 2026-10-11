import { audioContextClass } from "../lib/audio.js";
import { readPreference, savePreference } from "../lib/preferences.js";
import { translate } from "../i18n/index.js";
import { createImperialHymn } from "./organ.js";
import { createMusterSoundscape } from "./march.js";
export function initAudioPlayer() {
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
