// Web Audio API Synthesizer for a premium doorbell chime (no static assets needed)

export const playDoorbell = () => {
  try {
    // Create audio context (compatible with standard browsers)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    // Master gain node (volume controller - set to a gentle, soft level)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    // --- First Tone: "Ding" (E5 - 659.25 Hz) ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    
    osc1.type = "sine"; // Pure tone
    osc1.frequency.setValueAtTime(659.25, now); // E5
    
    // Envelope for Ding: starts instantly, decays over 1.2 seconds
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(1, now + 0.05); // Attack
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2); // Decay
    
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + 1.3);

    // --- Second Tone: "Dong" (C5 - 523.25 Hz) ---
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(523.25, now + 0.35); // C5, starts after 0.35s delay
    
    // Envelope for Dong: starts at 0.35s, decays over 1.8 seconds (longer resonance)
    gain2.gain.setValueAtTime(0, now + 0.35);
    gain2.gain.linearRampToValueAtTime(0.8, now + 0.35 + 0.08); // Attack
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + 1.8); // Decay
    
    osc2.connect(gain2);
    gain2.connect(masterGain);
    osc2.start(now + 0.35);
    osc2.stop(now + 0.35 + 1.9);

  } catch (error) {
    console.warn("Web Audio API not allowed or supported on this interaction: ", error);
  }
};
