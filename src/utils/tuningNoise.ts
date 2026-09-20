/**
 * src/utils/tuningNoise.ts
 *
 * Web Audio API synthesizer for authentic analog radio tuning static noise
 * (inspired by bilawalsidhu/gods-eye-view tuningNoise).
 * Plays a gentle, bandpassed static burst when scanning frequencies or switching stations.
 */

class TuningNoiseGenerator {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  private initContext(): void {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private getNoiseBuffer(): AudioBuffer | null {
    if (this.noiseBuffer) return this.noiseBuffer;
    if (!this.ctx) return null;

    const sampleRate = this.ctx.sampleRate;
    const duration = 1.0;
    const bufferSize = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate pink-ish noise (softer than raw white noise)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    this.noiseBuffer = buffer;
    return buffer;
  }

  /**
   * Play a brief tactical analog tuning static sound (default 0.35s)
   */
  public playTuningHiss(duration = 0.35, maxGain = 0.06): void {
    try {
      this.initContext();
      if (!this.ctx) return;

      const buffer = this.getNoiseBuffer();
      if (!buffer) return;

      const now = this.ctx.currentTime;
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // Bandpass filter to simulate analog receiver IF stage
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.8, now);

      // Gain envelope with smooth attack and decay
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(maxGain, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start(now);
      source.stop(now + duration);

      // Cleanup
      setTimeout(() => {
        try {
          source.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch {}
      }, (duration + 0.1) * 1000);
    } catch (err) {
      // Audio autoplay policy may block before gesture
    }
  }

  public getAudioContext(): AudioContext | null {
    this.initContext();
    return this.ctx;
  }
}

export const tuningNoise = new TuningNoiseGenerator();
