import { offlineContextClass } from "../lib/audio.js";
// Original twelve-bar organ hymn, composed for Hu Kai's personal website.
// The score and pipe tones are synthesized locally; no recordings are used.
export async function createImperialHymn() {
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
