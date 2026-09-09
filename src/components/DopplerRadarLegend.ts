/**
 * DopplerRadarLegend.ts
 *
 * Tactical Doppler Weather Radar 4D Player & Reflectivity Scale HUD:
 * - Reflectivity dBZ gradient scale (5 - 65+ dBZ)
 * - 4D Time-lapse Radar Player: Animates 13 past radar frames from RainViewer
 * - Play / Pause, frame scrub bar, and UTC/TPE timestamp telemetry
 */

export interface RadarFrame {
  time: number;
  path: string;
}

export class DopplerRadarLegend {
  private container: HTMLElement | null = null;
  private isVisible: boolean = false;
  private onToggleRadar?: (enabled: boolean) => void;
  private onFrameChange?: (path: string) => void;

  private frames: RadarFrame[] = [];
  private currentFrameIndex: number = 0;
  private isPlaying: boolean = false;
  private playTimer: any = null;
  private playSpeedMs: number = 800; // 800ms per frame

  constructor(options?: {
    onToggleRadar?: (enabled: boolean) => void;
    onFrameChange?: (path: string) => void;
  }) {
    this.onToggleRadar = options?.onToggleRadar;
    this.onFrameChange = options?.onFrameChange;
    this.fetchRadarFrames();
  }

  public async fetchRadarFrames(): Promise<void> {
    try {
      const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
      if (res.ok) {
        const json = await res.json();
        if (json.radar && Array.isArray(json.radar.past)) {
          this.frames = json.radar.past.map((f: any) => ({
            time: f.time,
            path: f.path,
          }));
          if (this.frames.length > 0) {
            this.currentFrameIndex = this.frames.length - 1; // latest
            this.updatePlayerUI();
          }
        }
      }
    } catch (e) {
      console.warn('[DopplerRadarLegend] Failed to fetch radar animation frames:', e);
    }
  }

  public init(parentElement: HTMLElement): void {
    const el = document.createElement('div');
    el.id = 'doppler-radar-legend-container';
    el.className = 'doppler-radar-legend-card';
    el.style.display = 'none';

    el.innerHTML = `
      <div class="radar-legend-header">
        <div class="radar-legend-title">
          <span class="radar-live-pulse"></span>
          <span>DOPPLER RADAR 4D // LIVE REFLECTIVITY</span>
        </div>
        <button id="radar-legend-close" class="radar-legend-close-btn" title="Hide Radar Scale">×</button>
      </div>

      <!-- 4D Time-Lapse Player Controls -->
      <div class="radar-player-strip">
        <button class="radar-play-btn" id="radar-btn-play" title="Play / Pause Radar Loop">▶ PLAY</button>
        <div class="radar-timeline-track" id="radar-timeline-track">
          <div class="radar-timeline-bar" id="radar-timeline-progress" style="width: 100%;"></div>
        </div>
        <span class="radar-frame-time" id="radar-frame-time">LATEST</span>
      </div>

      <!-- dBZ Color Scale Gradient -->
      <div class="radar-dbz-bar-wrapper">
        <div class="radar-dbz-color-gradient"></div>
        <div class="radar-dbz-ticks">
          <span>5</span>
          <span>15</span>
          <span>25</span>
          <span>35</span>
          <span>45</span>
          <span>55</span>
          <span>65+ dBZ</span>
        </div>
      </div>

      <div class="radar-legend-labels">
        <div class="radar-legend-label-col">
          <span class="label-dot" style="background:#38bdf8;"></span>
          <span class="label-txt">5-15: DRIZZLE</span>
        </div>
        <div class="radar-legend-label-col">
          <span class="label-dot" style="background:#10b981;"></span>
          <span class="label-txt">15-35: RAIN</span>
        </div>
        <div class="radar-legend-label-col">
          <span class="label-dot" style="background:#f59e0b;"></span>
          <span class="label-txt">35-50: HEAVY</span>
        </div>
        <div class="radar-legend-label-col">
          <span class="label-dot" style="background:#ef4444;"></span>
          <span class="label-txt">50-65: STORM</span>
        </div>
        <div class="radar-legend-label-col">
          <span class="label-dot" style="background:#c084fc;"></span>
          <span class="label-txt">65+: SEVERE CORE</span>
        </div>
      </div>

      <div class="radar-legend-telemetry">
        <span>SWEEP: <b style="color:var(--accent-cyan);">WMO COMPOSITE</b></span>
        <span>OVERZOOM: <b style="color:var(--accent-emerald);">SMOOTH 4K</b></span>
      </div>
    `;

    parentElement.appendChild(el);
    this.container = el;

    // Listeners
    const closeBtn = el.querySelector('#radar-legend-close');
    closeBtn?.addEventListener('click', () => {
      this.hide();
      this.onToggleRadar?.(false);
    });

    const playBtn = el.querySelector('#radar-btn-play');
    playBtn?.addEventListener('click', () => {
      this.togglePlay();
    });

    const track = el.querySelector('#radar-timeline-track');
    track?.addEventListener('click', (e: any) => {
      if (this.frames.length < 2) return;
      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      this.currentFrameIndex = Math.floor(pct * (this.frames.length - 1));
      this.applyCurrentFrame();
    });
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public play(): void {
    if (this.frames.length < 2) return;
    this.isPlaying = true;
    const playBtn = this.container?.querySelector('#radar-btn-play');
    if (playBtn) playBtn.textContent = '⏸ PAUSE';

    this.playTimer = setInterval(() => {
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
      this.applyCurrentFrame();
    }, this.playSpeedMs);
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
    const playBtn = this.container?.querySelector('#radar-btn-play');
    if (playBtn) playBtn.textContent = '▶ PLAY';
  }

  private applyCurrentFrame(): void {
    if (this.frames.length === 0) return;
    const frame = this.frames[this.currentFrameIndex];
    if (frame) {
      this.onFrameChange?.(frame.path);
      this.updatePlayerUI();
    }
  }

  private updatePlayerUI(): void {
    if (!this.container || this.frames.length === 0) return;
    const frame = this.frames[this.currentFrameIndex];
    const timeEl = this.container.querySelector('#radar-frame-time');
    const barEl = this.container.querySelector('#radar-timeline-progress') as HTMLElement;

    if (frame && timeEl) {
      const isLatest = this.currentFrameIndex === this.frames.length - 1;
      const d = new Date(frame.time * 1000);
      const timeStr = d.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Taipei',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      timeEl.textContent = isLatest ? `${timeStr} (NOW)` : `${timeStr} TPE`;
    }

    if (barEl) {
      const pct = (this.currentFrameIndex / Math.max(1, this.frames.length - 1)) * 100;
      barEl.style.width = `${pct}%`;
    }
  }

  public show(): void {
    if (this.container) {
      this.container.style.display = 'flex';
      this.isVisible = true;
    }
  }

  public hide(): void {
    this.pause();
    if (this.container) {
      this.container.style.display = 'none';
      this.isVisible = false;
    }
  }

  public toggle(): boolean {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
    return this.isVisible;
  }
}
