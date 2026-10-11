import { audioContextClass } from "../lib/audio.js";
import type { AudioController } from "../audio/player.js";

export function initStamp(audio: AudioController): void {
  const button = document.querySelector<HTMLButtonElement>(".stamp-button");
  const image = document.querySelector<HTMLImageElement>(".stamp-image");
  if (!button || !image) return;
  let effectContext: AudioContext | undefined;

  const release = (context: AudioContext | undefined): void => {
    if (effectContext === context) effectContext = undefined;
    if (context && context.state !== "closed") {
      void context.close().catch(() => { image.dataset.sound = "unavailable"; });
    }
  };

  const playImpact = (): void => {
    const Context = audioContextClass();
    if (!Context || audio.isMuted() || effectContext) return;
    let context: AudioContext | undefined;
    try {
      context = new Context();
      effectContext = context;
      const active = context;
      void active.resume().then(() => {
        if (active.state !== "running") { release(active); return; }
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
    } catch {
      image.dataset.sound = "unavailable";
      release(context);
    }
  };

  button.addEventListener("click", () => {
    if (!image.hidden) return;
    const wasFocused = document.activeElement === button;
    image.hidden = false;
    button.setAttribute("aria-expanded", "true");
    button.hidden = true;
    if (wasFocused) image.focus({ preventScroll: true });
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
