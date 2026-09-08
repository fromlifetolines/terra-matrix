import './styles/main.css';
import { GlobeScene } from './globe/GlobeScene';
import { StreamMatrix } from './matrix/StreamMatrix';
import type { CCTVPoint } from './data/cctv-presets';
import type { EarthquakeItem } from './globe/layers/EarthquakeLayer';
import type { GeoIncident, GeoNewsItem } from './data/incidents-news';

class TerraMatrixApp {
  private globeScene!: GlobeScene;
  private streamMatrix!: StreamMatrix;
  private infoCardEl: HTMLElement | null = null;

  constructor() {
    this.initLayout();
    this.initGlobe();
    this.initMatrix();
    this.initClock();
    this.initHeaderActions();
  }

  private initLayout(): void {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    appEl.innerHTML = `
      <!-- Top Tactical Header -->
      <header class="terra-header">
        <div class="header-left">
          <div class="brand-badge">
            <span class="status-dot-emerald"></span>
            DEFCON 5 // STANDBY
          </div>
          <div class="brand-title">TERRA MATRIX</div>
          <div class="brand-subtitle">// SITUATION INTELLIGENCE COMMAND</div>
        </div>

        <div class="header-center">
          <div class="header-metric">
            <span>SEISMIC:</span>
            <span class="metric-val" id="header-quake-count">USGS LIVE</span>
          </div>
          <div class="header-metric">
            <span>CABLES:</span>
            <span class="metric-val">420+ GLOBAL</span>
          </div>
          <div class="header-metric">
            <span>INTEL FEEDS:</span>
            <span class="metric-val" style="color: var(--accent-emerald);">ACTIVE</span>
          </div>
        </div>

        <div class="header-right">
          <button id="btn-auto-rotate" class="header-btn" title="Toggle Earth Auto-Rotation">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            AUTO ROTATE
          </button>
          <button id="btn-reset-view" class="header-btn" title="Reset Camera Perspective">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
            RESET VIEW
          </button>
          <div class="utc-clock" id="utc-clock">00:00:00 UTC</div>
        </div>
      </header>

      <!-- Workspace: 3D Globe + Floating Pill (Top) & Live Stream Matrix (Bottom) -->
      <main class="terra-workspace">
        <section class="globe-wrapper">
          <div id="globe-container"></div>

          <!-- Minimal Floating Glass Pill (Top Left Whitelisted Layer Controller) -->
          <div class="glass-pill-container">
            <div class="glass-pill">
              <div class="pill-header">
                <span class="pill-title">LAYERS WHITELIST</span>
                <span style="font-family: var(--font-mono); font-size: 9px; color: var(--accent-emerald);">8 ACTIVE</span>
              </div>
              <div class="pill-layers-list">
                <label class="layer-toggle-item" title="Global live cameras and previews">
                  <input type="checkbox" id="layer-cctv" checked />
                  <span>cctv</span>
                </label>
                <label class="layer-toggle-item" title="Major news coordinates">
                  <input type="checkbox" id="layer-live_news" checked />
                  <span>live_news</span>
                </label>
                <label class="layer-toggle-item" title="USGS real-time earthquake ripples">
                  <input type="checkbox" id="layer-earthquakes" checked />
                  <span>earthquakes</span>
                </label>
                <label class="layer-toggle-item" title="Geopolitical critical flashpoints">
                  <input type="checkbox" id="layer-global_incidents" checked />
                  <span>global_incidents</span>
                </label>
                <label class="layer-toggle-item" title="Solar day-night terminator (UTC)">
                  <input type="checkbox" id="layer-day_night" checked />
                  <span>day_night</span>
                </label>
                <label class="layer-toggle-item" title="Undersea fiber-optic cables">
                  <input type="checkbox" id="layer-cables" checked />
                  <span>cables</span>
                </label>
                <label class="layer-toggle-item" title="Maritime shipping corridors">
                  <input type="checkbox" id="layer-maritime" checked />
                  <span>maritime</span>
                </label>
                <label class="layer-toggle-item" title="Aviation international skyways">
                  <input type="checkbox" id="layer-sdk_air" checked />
                  <span>sdk_air</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Dynamic Info Card Modal (Bottom Left) -->
          <div id="globe-info-container"></div>
        </section>

        <!-- Live Stream Matrix Panel (Swiss Grid) -->
        <section class="matrix-wrapper" id="matrix-container"></section>
      </main>
    `;
  }

  private initGlobe(): void {
    const container = document.getElementById('globe-container');
    if (!container) return;

    this.globeScene = new GlobeScene(container);

    // Layer checkboxes
    const layerKeys = [
      'cctv',
      'live_news',
      'earthquakes',
      'global_incidents',
      'day_night',
      'cables',
      'maritime',
      'sdk_air',
    ] as const;

    layerKeys.forEach((key) => {
      const checkbox = document.getElementById(`layer-${key}`) as HTMLInputElement | null;
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          this.globeScene.toggleLayer(key, checkbox.checked);
        });
      }
    });

    // Handle CCTV Click: Focus camera & add/switch stream in Matrix!
    this.globeScene.onSelectCctv = (pt: CCTVPoint) => {
      this.showInfoCard({
        badge: 'CCTV FEED',
        badgeClass: 'MONITOR',
        title: `${pt.name} (${pt.city}, ${pt.country})`,
        content: `Coordinates: ${pt.lat.toFixed(4)}°N, ${pt.lon.toFixed(4)}°E<br/>Target Stream: ${pt.videoId}`,
        actionLabel: 'OPEN IN MATRIX',
        onAction: () => {
          this.streamMatrix.addChannel({
            id: pt.id,
            name: pt.name,
            videoId: pt.videoId,
            city: pt.city,
            country: pt.country,
          });
        }
      });
    };

    // Handle Earthquake Click
    this.globeScene.onSelectEarthquake = (q: EarthquakeItem) => {
      this.showInfoCard({
        badge: `MAG ${q.mag.toFixed(1)} SEISMIC`,
        badgeClass: q.mag >= 6.0 ? 'CRITICAL' : 'ELEVATED',
        title: q.place,
        content: `Magnitude: Richter ${q.mag.toFixed(1)}<br/>Depth: ${q.depth} km<br/>Time: ${new Date(q.time).toUTCString()}`,
      });
    };

    // Handle Incident Click
    this.globeScene.onSelectIncident = (inc: GeoIncident) => {
      this.showInfoCard({
        badge: inc.level,
        badgeClass: inc.level,
        title: inc.title,
        content: `Location: ${inc.location}<br/>${inc.summary}`,
      });
    };

    // Handle News Click
    this.globeScene.onSelectNews = (n: GeoNewsItem) => {
      this.showInfoCard({
        badge: 'FLASH INTEL',
        badgeClass: 'MONITOR',
        title: `${n.source} // ${n.city}`,
        content: `${n.headline}<br/><span style="color: var(--text-dim); font-size: 10px;">Reported ${n.time}</span>`,
      });
    };
  }

  private initMatrix(): void {
    const container = document.getElementById('matrix-container');
    if (!container) return;

    this.streamMatrix = new StreamMatrix(container);
  }

  private showInfoCard(opts: {
    badge: string;
    badgeClass: string;
    title: string;
    content: string;
    actionLabel?: string;
    onAction?: () => void;
  }): void {
    const container = document.getElementById('globe-info-container');
    if (!container) return;

    container.innerHTML = `
      <div class="globe-info-card">
        <button class="card-close-btn" id="info-card-close">&times;</button>
        <span class="info-badge ${opts.badgeClass}">${opts.badge}</span>
        <div class="info-title">${opts.title}</div>
        <div class="info-desc">${opts.content}</div>
        ${
          opts.actionLabel
            ? `<button class="matrix-btn" id="info-card-action" style="margin-top: 8px;">${opts.actionLabel}</button>`
            : ''
        }
      </div>
    `;

    document.getElementById('info-card-close')?.addEventListener('click', () => {
      container.innerHTML = '';
    });

    if (opts.actionLabel && opts.onAction) {
      document.getElementById('info-card-action')?.addEventListener('click', () => {
        opts.onAction?.();
        container.innerHTML = '';
      });
    }
  }

  private initClock(): void {
    const clockEl = document.getElementById('utc-clock');
    const update = () => {
      if (clockEl) {
        const now = new Date();
        const iso = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
        clockEl.textContent = iso;
      }
    };
    update();
    setInterval(update, 1000);
  }

  private initHeaderActions(): void {
    let autoRotate = true;
    const rotateBtn = document.getElementById('btn-auto-rotate');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        autoRotate = !autoRotate;
        this.globeScene.setAutoRotate(autoRotate);
        rotateBtn.style.color = autoRotate ? '#fff' : 'var(--text-dim)';
      });
    }

    const resetBtn = document.getElementById('btn-reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Reset to initial Taiwan / East Asia perspective
        this.globeScene.focusCoordinates(24, 121, 260);
      });
    }
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  new TerraMatrixApp();
});
