// Web Audio API Ambient Cafe Sound Synthesizer & Sound Effects

let audioCtx = null;
let ambientGain = null;
let noiseNode = null;
let droneOsc1 = null;
let droneOsc2 = null;
let isPlayingAmbient = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Toggles warm cafe ambient background tone + gentle vinyl lo-fi crackle
 */
export function toggleAmbientCafeVibe(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isPlayingAmbient) {
    stopAmbientCafe();
    isPlayingAmbient = false;
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startAmbientCafe();
    isPlayingAmbient = true;
    if (onStateChange) onStateChange(true);
    return true;
  }
}

function startAmbientCafe() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Master Gain for Ambient
  ambientGain = ctx.createGain();
  ambientGain.gain.setValueAtTime(0.08, ctx.currentTime);
  ambientGain.connect(ctx.destination);

  // 1. Warm Low Drone (Cozy acoustic room resonance)
  droneOsc1 = ctx.createOscillator();
  droneOsc1.type = 'sine';
  droneOsc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm base

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, ctx.currentTime);

  droneOsc1.connect(filter);
  filter.connect(ambientGain);
  droneOsc1.start();

  // 2. Gentle Harmonic Warmth
  droneOsc2 = ctx.createOscillator();
  droneOsc2.type = 'triangle';
  droneOsc2.frequency.setValueAtTime(165, ctx.currentTime); // E3 warm fifth
  
  const osc2Gain = ctx.createGain();
  osc2Gain.gain.setValueAtTime(0.04, ctx.currentTime);
  droneOsc2.connect(osc2Gain);
  osc2Gain.connect(ambientGain);
  droneOsc2.start();

  // 3. Pink/Brown noise generator for gentle cafe air ambiance
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
    b6 = white * 0.115926;
  }

  noiseNode = ctx.createBufferSource();
  noiseNode.buffer = noiseBuffer;
  noiseNode.loop = true;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(450, ctx.currentTime);
  noiseFilter.Q.setValueAtTime(1.2, ctx.currentTime);

  noiseNode.connect(noiseFilter);
  noiseFilter.connect(ambientGain);
  noiseNode.start();
}

function stopAmbientCafe() {
  if (droneOsc1) {
    try { droneOsc1.stop(); droneOsc1.disconnect(); } catch (e) {}
    droneOsc1 = null;
  }
  if (droneOsc2) {
    try { droneOsc2.stop(); droneOsc2.disconnect(); } catch (e) {}
    droneOsc2 = null;
  }
  if (noiseNode) {
    try { noiseNode.stop(); noiseNode.disconnect(); } catch (e) {}
    noiseNode = null;
  }
  if (ambientGain) {
    try { ambientGain.disconnect(); } catch (e) {}
    ambientGain = null;
  }
}

/**
 * Play a quick UI pleasant chime
 */
export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {}
}

/**
 * Play celebration fanfare for jackpot / order placed
 */
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch (e) {}
}
