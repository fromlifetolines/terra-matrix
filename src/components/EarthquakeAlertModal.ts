import type { EarthquakeItem } from '../globe/layers/EarthquakeLayer';

export class EarthquakeAlertModal {
  private container: HTMLElement;
  private modalEl!: HTMLElement;
  private onLocate: (quake: EarthquakeItem) => void;
  private audioCtx: AudioContext | null = null;
  private isAudioUnlocked = false;
  private activeQuake: EarthquakeItem | null = null;
  private autoDismissTimer?: number;

  constructor(parent: HTMLElement, onLocate: (quake: EarthquakeItem) => void) {
    this.container = parent;
    this.onLocate = onLocate;
    this.initAudioUnlock();
    this.render();
  }

  private initAudioUnlock(): void {
    const unlock = () => {
      if (!this.audioCtx) {
        const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioClass) {
          this.audioCtx = new AudioClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      this.isAudioUnlocked = true;
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
  }

  private playTacticalAlertChime(): void {
    try {
      if (!this.audioCtx) {
        const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioClass) this.audioCtx = new AudioClass();
      }
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;

      // Pulse 1 (880 Hz - A5)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.28, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // Pulse 2 (659 Hz - E5)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, now + 0.12);
      gain2.gain.setValueAtTime(0.32, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.4);

      // Pulse 3 (587 Hz - D5 warning finish)
      const osc3 = this.audioCtx.createOscillator();
      const gain3 = this.audioCtx.createGain();
      osc3.type = 'sawtooth';
      osc3.frequency.setValueAtTime(587.33, now + 0.26);
      gain3.gain.setValueAtTime(0.18, now + 0.26);
      gain3.gain.exponentialRampToValueAtTime(0.005, now + 0.65);
      osc3.connect(gain3);
      gain3.connect(this.audioCtx.destination);
      osc3.start(now + 0.26);
      osc3.stop(now + 0.7);
    } catch (e) {
      console.info('[EarthquakeAlertModal] Audio chime muted or prevented:', e);
    }
  }

  private render(): void {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'earthquake-alert-banner';
    this.modalEl.className = 'earthquake-alert-container';
    this.modalEl.style.display = 'none';

    this.container.appendChild(this.modalEl);
  }

  public showAlert(quake: EarthquakeItem): void {
    this.activeQuake = quake;
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
    }

    const isTaiwan =
      quake.lat >= 21.0 && quake.lat <= 26.0 && quake.lon >= 119.0 && quake.lon <= 123.5;
    const isMajor = quake.mag >= 6.0;
    const isShallow = quake.depth < 35;
    const depthDesc =
      quake.depth < 30
        ? '極淺層地震 (Very Shallow - High Surface Energy)'
        : quake.depth < 70
        ? '淺層地震 (Shallow Crustal)'
        : '中深層地震 (Intermediate Deep)';

    const diffMins = Math.max(1, Math.round((Date.now() - quake.time) / 60000));
    const timeAgoStr = diffMins < 60 ? `${diffMins} 分鐘前` : `${Math.round(diffMins / 60)} 小時前`;

    const tpeTime = new Date(quake.time).toLocaleTimeString('zh-TW', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const isTsunami = (quake as any).tsunami === 1;

    this.modalEl.innerHTML = `
      <div class="eq-alert-card ${isMajor ? 'is-major' : ''} ${isTaiwan ? 'is-taiwan' : ''}">
        <div class="eq-alert-header">
          <div class="eq-alert-badge-group">
            <span class="eq-radar-beacon"></span>
            <span class="eq-alert-title-tag">
              ${isTaiwan ? '🚨 台灣近海地震速報 // SEISMIC EARLY WARNING' : '🚨 全球有感地震警報 // SEISMIC ALERT'}
            </span>
          </div>
          <button class="eq-alert-close-btn" id="eq-alert-close" title="關閉警報">&times;</button>
        </div>

        <div class="eq-alert-body">
          <div class="eq-mag-box">
            <span class="eq-mag-lbl">RICHTER</span>
            <span class="eq-mag-val ${quake.mag >= 6.5 ? 'crit' : quake.mag >= 5.0 ? 'high' : 'med'}">
              M${quake.mag.toFixed(1)}
            </span>
          </div>

          <div class="eq-detail-info">
            <div class="eq-place-name">${quake.place}</div>
            <div class="eq-meta-row">
              <span><b>深度:</b> ${quake.depth.toFixed(1)} km (${depthDesc})</span>
              <span><b>時間:</b> ${timeAgoStr} (${tpeTime} TPE)</span>
            </div>
            <div class="eq-status-row">
              <span class="eq-status-pill ${isTsunami ? 'pill-danger' : 'pill-safe'}">
                ${isTsunami ? '⚠️ 海嘯威脅警戒中 (TSUNAMI WATCH)' : '🛡️ 無海嘯威脅 (NO TSUNAMI DANGER)'}
              </span>
              <span class="eq-status-pill pill-coords">
                ${quake.lat.toFixed(3)}°N, ${quake.lon.toFixed(3)}°E
              </span>
            </div>
          </div>
        </div>

        <div class="eq-alert-actions">
          <button class="eq-action-intercept-btn" id="eq-btn-intercept">
            🎯 立即定位震央 (LOCATE EPICENTER)
          </button>
        </div>

        <div class="eq-progress-track">
          <div class="eq-progress-bar" id="eq-progress-bar"></div>
        </div>
      </div>
    `;

    this.modalEl.style.display = 'flex';
    this.playTacticalAlertChime();

    // Bind listeners
    this.modalEl.querySelector('#eq-alert-close')?.addEventListener('click', () => {
      this.dismiss();
    });

    this.modalEl.querySelector('#eq-btn-intercept')?.addEventListener('click', () => {
      if (this.activeQuake) {
        this.onLocate(this.activeQuake);
        this.dismiss();
      }
    });

    // Auto dismiss after 18 seconds
    this.autoDismissTimer = window.setTimeout(() => {
      this.dismiss();
    }, 18000);
  }

  public dismiss(): void {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
      this.autoDismissTimer = undefined;
    }
    this.modalEl.style.display = 'none';
  }
}
