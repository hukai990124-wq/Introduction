(() => {
    const button = document.querySelector(".stamp-button");
    const image = document.querySelector(".stamp-image");
    const muteButton = document.querySelector(".music-mute");
    let effectContext;

    function release(context) {
        if (effectContext === context) effectContext = undefined;
        if (context && context.state !== "closed") context.close().catch(() => {});
    }

    function playImpact() {
        // Use a separate, short-lived context so stamping never resumes paused music.
        if (muteButton.getAttribute("aria-pressed") === "true" || effectContext) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        let context;
        try {
            context = new AudioContextClass();
            effectContext = context;
            context.resume().then(() => {
                if (context.state !== "running") {
                    release(context);
                    return;
                }
                // Original wooden impact: filtered noise plus a rapidly falling low tone.
                const now = context.currentTime;
                const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.19), context.sampleRate);
                const samples = buffer.getChannelData(0);
                let seed = 990124;
                for (let index = 0; index < samples.length; index++) {
                    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
                    samples[index] = seed / 4294967296 * 2 - 1;
                }
                const noise = context.createBufferSource();
                noise.buffer = buffer;
                const filter = context.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.value = 1800;
                const noiseGain = context.createGain();
                noiseGain.gain.setValueAtTime(0.24, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
                noise.connect(filter).connect(noiseGain).connect(context.destination);
                const thud = context.createOscillator();
                thud.type = "triangle";
                thud.frequency.setValueAtTime(185, now);
                thud.frequency.exponentialRampToValueAtTime(65, now + 0.14);
                const thudGain = context.createGain();
                thudGain.gain.setValueAtTime(0.38, now);
                thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);
                thud.connect(thudGain).connect(context.destination);
                noise.onended = () => release(context);
                noise.start(now);
                noise.stop(now + 0.19);
                thud.start(now);
                thud.stop(now + 0.18);
            }).catch(() => release(context));
        } catch {
            // Visual stamping remains available if audio is unsupported or denied.
            release(context);
        }
    }

    button.addEventListener("click", () => {
        if (!image.hidden) return;
        const wasFocused = document.activeElement === button;
        image.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.hidden = true;
        if (wasFocused) image.focus({ preventScroll: true });
        if (image.animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            image.animate([
                { opacity: 0, transform: "scale(1.45) rotate(-14deg)" },
                { opacity: 1, transform: "scale(0.94) rotate(-8deg)", offset: 0.65 },
                { opacity: 1, transform: "scale(1) rotate(-8deg)" }
            ], { duration: 260, easing: "ease-out" });
        }
        playImpact();
    });
    window.addEventListener("pagehide", () => release(effectContext));
    button.hidden = false;
})();
