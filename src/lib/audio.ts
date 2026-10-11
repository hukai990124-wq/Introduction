interface AudioWindow extends Window {
  AudioContext?: typeof AudioContext;
  OfflineAudioContext?: typeof OfflineAudioContext;
  webkitAudioContext?: typeof AudioContext;
  webkitOfflineAudioContext?: typeof OfflineAudioContext;
}

export function audioContextClass(): typeof AudioContext | undefined {
  const browser: AudioWindow = window;
  return browser.AudioContext ?? browser.webkitAudioContext;
}

export function offlineContextClass(): typeof OfflineAudioContext {
  const browser: AudioWindow = window;
  const Context = browser.OfflineAudioContext ?? browser.webkitOfflineAudioContext;
  if (!Context) throw new Error("Offline audio synthesis is unavailable.");
  return Context;
}

export function normalizeBuffer(buffer: AudioBuffer, fadeSeconds = 0.3): AudioBuffer {
  let peak = 0;
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    for (const value of buffer.getChannelData(channel)) peak = Math.max(peak, Math.abs(value));
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
