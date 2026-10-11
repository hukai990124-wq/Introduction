import { normalizeBuffer, offlineContextClass } from "../lib/audio.js";

// An original soundscape: marching boots, field drums, brass and engine rumble.
export async function createMusterSoundscape(): Promise<AudioBuffer> {
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

  function noise(start: number, length: number, frequency: number, volume: number, pan: number): void {
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

  function thud(start: number, pitch: number, length: number, volume: number, pan: number): void {
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
  function brass(midi: number, start: number, length: number, volume: number, pan: number): void {
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
      for (let roll = 0; roll < 6; roll++) noise(start + 3 * beat + roll * beat / 6, 0.09, 2400, 0.09, -0.1);
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
