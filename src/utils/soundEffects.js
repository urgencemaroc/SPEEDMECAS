// Web Audio API engine rev synthesizer for Valvetronic & UI sound effects
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playValvetronicSound(mode = 'open') {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 2.4;

  // Master gain
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, now);
  masterGain.gain.exponentialRampToValueAtTime(mode === 'open' ? 0.35 : 0.12, now + 0.1);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  masterGain.connect(ctx.destination);

  // Sub bass oscillator
  const subOsc = ctx.createOscillator();
  subOsc.type = 'sawtooth';
  const subFreq = mode === 'open' ? 58 : 42;
  subOsc.frequency.setValueAtTime(subFreq, now);
  // simulate throttle rev up and down
  subOsc.frequency.exponentialRampToValueAtTime(subFreq * (mode === 'open' ? 2.6 : 1.4), now + 0.6);
  subOsc.frequency.exponentialRampToValueAtTime(subFreq * 0.9, now + duration);

  // Filter
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(mode === 'open' ? 950 : 260, now);
  filter.frequency.exponentialRampToValueAtTime(mode === 'open' ? 2400 : 450, now + 0.6);
  filter.frequency.exponentialRampToValueAtTime(mode === 'open' ? 700 : 200, now + duration);
  filter.Q.value = mode === 'open' ? 4 : 1.5;

  // Distortion / WaveShaper for growl
  const waveShaper = ctx.createWaveShaper();
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const k = mode === 'open' ? 25 : 5;
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  waveShaper.curve = curve;
  waveShaper.oversample = '4x';

  subOsc.connect(waveShaper);
  waveShaper.connect(filter);
  filter.connect(masterGain);

  subOsc.start(now);
  subOsc.stop(now + duration);

  // Pops & bangs if mode is open
  if (mode === 'open') {
    [0.9, 1.25, 1.55].forEach((popTime, index) => {
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(140 - index * 20, now + popTime);
      popOsc.frequency.exponentialRampToValueAtTime(30, now + popTime + 0.08);

      popGain.gain.setValueAtTime(0.28, now + popTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + popTime + 0.09);

      popOsc.connect(popGain);
      popGain.connect(ctx.destination);

      popOsc.start(now + popTime);
      popOsc.stop(now + popTime + 0.1);
    });
  }
}

export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

export function playSosPulse() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(740, now);
  osc.frequency.setValueAtTime(880, now + 0.12);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.28);
}
