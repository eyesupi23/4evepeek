// Tiny square-wave beeps via Web Audio — no audio files needed.
let ctx: AudioContext | null = null;
let muted = false;

export const setMuted = (m: boolean) => { muted = m; };

function beep(freq: number, duration: number, delay = 0) {
  if (muted) return;
  try {
    ctx ??= new AudioContext();
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  } catch {
    /* audio not available */
  }
}

export const sfx = {
  start: () => { beep(523, 0.08); beep(784, 0.12, 0.09); },
  reveal: () => beep(880, 0.05),
  correct: () => { beep(659, 0.08); beep(880, 0.08, 0.09); beep(1319, 0.16, 0.18); },
  wrong: () => { beep(220, 0.12); beep(165, 0.2, 0.13); },
  timeout: () => { beep(330, 0.1); beep(247, 0.1, 0.11); beep(196, 0.22, 0.22); },
};
