/**
 * DopplerRadarLegend.ts
 *
 * Tactical HUD overlay displaying the international meteorological
 * Doppler Weather Radar dBZ reflectivity scale and live sweep telemetry.
 */

export class DopplerRadarLegend {
  private container: HTMLElement | null = null;
  private isVisible: boolean = false;
  private onToggleRadar?: (enabled: boolean) => void;

  constructor(options?: { onToggleRadar?: (enabled: boolean) => void }) {
    this.onToggleRadar = options?.onToggleRadar;
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
          <span>DOPPLER RADAR REFLECTIVITY (dBZ)</span>
        </div>
        <button id="radar-legend-close" class="radar-legend-close-btn" title="Hide Radar Scale">×</button>
      </div>

      <div class="radar-dbz-bar-wrapper">
        <div class="radar-dbz-color-gradient"></div>
        <div class="radar-dbz-ticks">
          <span>5</span>
          <span>15</span>
          <span>25</span>
          <span>35</span>
          <span>45</span>
          <span>55</span>
          <span>65+</span>
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
          <span class="label-txt">65+: HAIL/CORE</span>
        </div>
      </div>

      <div class="radar-legend-telemetry">
        <span>SWEEP: <b style="color:var(--accent-cyan);">WMO/NWS COMPOSITE</b></span>
        <span>RESOLUTION: <b style="color:var(--accent-emerald);">10-MIN LIVE</b></span>
      </div>
    `;

    parentElement.appendChild(el);
    this.container = el;

    const closeBtn = el.querySelector('#radar-legend-close');
    closeBtn?.addEventListener('click', () => {
      this.hide();
      this.onToggleRadar?.(false);
    });
  }

  public show(): void {
    if (this.container) {
      this.container.style.display = 'flex';
      this.isVisible = true;
    }
  }

  public hide(): void {
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
