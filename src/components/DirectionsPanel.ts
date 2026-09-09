/**
 * DirectionsPanel.ts
 *
 * OSIRIS Tactical Turn-by-Turn Route Planner:
 * Calculates real driving, cycling, and walking routes between two locations
 * using OSRM OpenStreetMap routing services and renders live navigation
 * tracks directly on the 3D globe.
 */

import { TAIWAN_LOCATIONS } from './SearchBar';

export type TravelMode = 'driving' | 'bike' | 'foot';

export interface RouteResult {
  mode: TravelMode;
  distanceKm: number;
  durationMins: number;
  coordinates: [number, number][]; // [lng, lat]
  steps: Array<{ instruction: string; distanceM: number }>;
}

export class DirectionsPanel {
  private container: HTMLElement;
  private panelEl!: HTMLElement;
  private isVisible = false;
  private travelMode: TravelMode = 'driving';

  private fromCoords: { lat: number; lng: number; label: string } | null = null;
  private toCoords: { lat: number; lng: number; label: string } | null = null;

  private onDrawRoute: (coords: [number, number][]) => void;
  private onClearRoute: () => void;
  private getMapCenter: () => { lat: number; lng: number };

  constructor(options: {
    parentElement: HTMLElement;
    onDrawRoute: (coords: [number, number][]) => void;
    onClearRoute: () => void;
    getMapCenter: () => { lat: number; lng: number };
  }) {
    this.container = options.parentElement;
    this.onDrawRoute = options.onDrawRoute;
    this.onClearRoute = options.onClearRoute;
    this.getMapCenter = options.getMapCenter;
    this.render();
  }

  public toggle(): boolean {
    this.setVisible(!this.isVisible);
    return this.isVisible;
  }

  public setVisible(visible: boolean): void {
    this.isVisible = visible;
    this.panelEl.style.display = visible ? 'flex' : 'none';
  }

  private render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'directions-floating-panel';
    this.panelEl.style.display = 'none';

    this.panelEl.innerHTML = `
      <div class="directions-header">
        <div class="directions-title-group">
          <span class="directions-icon">🛣️</span>
          <span class="directions-title">TACTICAL ROUTING</span>
          <span class="directions-sub">OSRM // GPS VECTOR</span>
        </div>
        <button class="directions-close-btn" id="directions-close-btn" title="Close Panel">✕</button>
      </div>

      <!-- Mode Selector -->
      <div class="directions-mode-strip">
        <button class="mode-btn active" data-mode="driving" title="Driving / Vehicle Navigation">
          <span>🚗</span> DRIVE
        </button>
        <button class="mode-btn" data-mode="bike" title="Bicycle / Tactical Cycling">
          <span>🚲</span> BIKE
        </button>
        <button class="mode-btn" data-mode="foot" title="Pedestrian / Dismounted Patrol">
          <span>🚶</span> WALK
        </button>
      </div>

      <!-- Origin & Destination Inputs -->
      <div class="directions-inputs-block">
        <div class="input-row">
          <span class="dot-origin"></span>
          <input type="text" id="dir-input-from" placeholder="Origin (City, Street, Address)..." />
          <button class="input-action-btn" id="btn-origin-here" title="Set to current map center">📍</button>
        </div>
        <div class="input-row">
          <span class="dot-dest"></span>
          <input type="text" id="dir-input-to" placeholder="Destination (e.g. 林口, 桃園, 台北)..." />
          <button class="input-action-btn" id="btn-dest-here" title="Set to current map center">🎯</button>
        </div>
      </div>

      <!-- Quick Route Presets -->
      <div class="directions-presets">
        <span class="presets-label">TACTICAL PRESETS:</span>
        <button class="preset-pill" data-from="台北市" data-to="林口區">Taipei ➔ Linkou</button>
        <button class="preset-pill" data-from="台北101" data-to="桃園市">Xinyi ➔ Taoyuan</button>
        <button class="preset-pill" data-from="新竹市" data-to="台中市">Hsinchu ➔ Taichung</button>
      </div>

      <!-- Action Buttons -->
      <div class="directions-actions">
        <button class="dir-calc-btn" id="dir-calc-btn">
          <span>⚡</span> CALCULATE ROUTE
        </button>
        <button class="dir-clear-btn" id="dir-clear-btn" title="Clear Route Track">
          CLEAR
        </button>
      </div>

      <!-- Status & Results Output -->
      <div class="directions-results-area styled-scrollbar" id="dir-results-area" style="display:none;">
        <div class="route-summary-card">
          <div class="summary-metric">
            <span class="metric-label">DISTANCE</span>
            <span class="metric-number" id="route-dist-km">-- km</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-metric">
            <span class="metric-label">EST. TIME</span>
            <span class="metric-number highlight" id="route-time-mins">-- min</span>
          </div>
        </div>

        <div class="route-steps-list" id="route-steps-list"></div>
      </div>
    `;

    this.container.appendChild(this.panelEl);

    // Bind event handlers
    this.panelEl.querySelector('#directions-close-btn')?.addEventListener('click', () => {
      this.setVisible(false);
    });

    const modeBtns = this.panelEl.querySelectorAll<HTMLButtonElement>('.mode-btn');
    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        modeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.travelMode = btn.getAttribute('data-mode') as TravelMode;
        if (this.fromCoords && this.toCoords) {
          this.calculateRoute();
        }
      });
    });

    const fromInput = this.panelEl.querySelector<HTMLInputElement>('#dir-input-from');
    const toInput = this.panelEl.querySelector<HTMLInputElement>('#dir-input-to');

    this.panelEl.querySelector('#btn-origin-here')?.addEventListener('click', () => {
      const center = this.getMapCenter();
      this.fromCoords = { lat: center.lat, lng: center.lng, label: 'Map Center' };
      if (fromInput) fromInput.value = `${center.lat.toFixed(4)}°, ${center.lng.toFixed(4)}°`;
    });

    this.panelEl.querySelector('#btn-dest-here')?.addEventListener('click', () => {
      const center = this.getMapCenter();
      this.toCoords = { lat: center.lat, lng: center.lng, label: 'Map Center' };
      if (toInput) toInput.value = `${center.lat.toFixed(4)}°, ${center.lng.toFixed(4)}°`;
    });

    // Preset click
    const presetBtns = this.panelEl.querySelectorAll<HTMLButtonElement>('.preset-pill');
    presetBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const fromStr = btn.getAttribute('data-from') || '';
        const toStr = btn.getAttribute('data-to') || '';
        if (fromInput) fromInput.value = fromStr;
        if (toInput) toInput.value = toStr;

        this.fromCoords = await this.resolveLocation(fromStr);
        this.toCoords = await this.resolveLocation(toStr);
        this.calculateRoute();
      });
    });

    this.panelEl.querySelector('#dir-calc-btn')?.addEventListener('click', async () => {
      const fromVal = fromInput?.value.trim() || '';
      const toVal = toInput?.value.trim() || '';

      if (!this.fromCoords && fromVal) {
        this.fromCoords = await this.resolveLocation(fromVal);
      }
      if (!this.toCoords && toVal) {
        this.toCoords = await this.resolveLocation(toVal);
      }

      this.calculateRoute();
    });

    this.panelEl.querySelector('#dir-clear-btn')?.addEventListener('click', () => {
      this.onClearRoute();
      const resultsArea = this.panelEl.querySelector<HTMLElement>('#dir-results-area');
      if (resultsArea) resultsArea.style.display = 'none';
    });
  }

  private async resolveLocation(query: string): Promise<{ lat: number; lng: number; label: string } | null> {
    if (!query) return null;

    // Check direct coordinates
    const m = query.match(/^([+-]?\d+(?:\.\d+)?)[,\s]+([+-]?\d+(?:\.\d+)?)$/);
    if (m) {
      return { lat: parseFloat(m[1]), lng: parseFloat(m[2]), label: query };
    }

    // Check built-in Taiwan locations
    const qLower = query.toLowerCase();
    const hit = TAIWAN_LOCATIONS.find(
      (item) => item.title.toLowerCase().includes(qLower) || query.includes(item.title.split(' ')[0])
    );
    if (hit) {
      return { lat: hit.lat, lng: hit.lng, label: hit.title };
    }

    // OpenStreetMap Nominatim Geocoding
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'zh-TW,zh,en' } });
      if (res.ok) {
        const list = await res.json();
        if (list.length > 0) {
          return {
            lat: parseFloat(list[0].lat),
            lng: parseFloat(list[0].lon),
            label: list[0].display_name.split(',')[0],
          };
        }
      }
    } catch (e) {
      console.warn('[DirectionsPanel] Geocode lookup failed:', e);
    }

    return null;
  }

  private async calculateRoute(): Promise<void> {
    if (!this.fromCoords || !this.toCoords) {
      alert('請先輸入或點選起點與終點 (Please select valid Origin and Destination)');
      return;
    }

    const calcBtn = this.panelEl.querySelector<HTMLButtonElement>('#dir-calc-btn');
    if (calcBtn) {
      calcBtn.innerHTML = `<span>⏳</span> ROUTING COMPUTE...`;
      calcBtn.disabled = true;
    }

    try {
      const start = this.fromCoords;
      const end = this.toCoords;

      // OSRM service router selection based on travelMode
      let endpoint = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&steps=true`;
      if (this.travelMode === 'bike') {
        endpoint = `https://routing.openstreetmap.de/routed-bike/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&steps=true`;
      } else if (this.travelMode === 'foot') {
        endpoint = `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&steps=true`;
      }

      let res = await fetch(endpoint);
      if (!res.ok) {
        // Fallback to driving router
        endpoint = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&steps=true`;
        res = await fetch(endpoint);
      }

      const data = await res.json();
      if (!data.routes || data.routes.length === 0) {
        alert('無法計算出可行路徑，請確認起迄點 (No feasible route found)');
        return;
      }

      const route = data.routes[0];
      const distanceKm = Number((route.distance / 1000).toFixed(1));
      const durationMins = Math.round(route.duration / 60);
      const coords: [number, number][] = route.geometry.coordinates;

      // Extract maneuver steps
      const steps: Array<{ instruction: string; distanceM: number }> = [];
      if (route.legs && route.legs[0]?.steps) {
        for (const s of route.legs[0].steps) {
          const street = s.name ? `onto ${s.name}` : '';
          const type = s.maneuver?.type || 'turn';
          const mod = s.maneuver?.modifier || '';
          steps.push({
            instruction: `${type.toUpperCase()} ${mod} ${street}`.trim(),
            distanceM: Math.round(s.distance),
          });
        }
      }

      // Draw onto 3D globe MapLibre
      this.onDrawRoute(coords);

      // Render Results summary
      const resultsArea = this.panelEl.querySelector<HTMLElement>('#dir-results-area');
      const distEl = this.panelEl.querySelector('#route-dist-km');
      const timeEl = this.panelEl.querySelector('#route-time-mins');
      const stepsListEl = this.panelEl.querySelector('#route-steps-list');

      if (resultsArea && distEl && timeEl && stepsListEl) {
        distEl.textContent = `${distanceKm} km`;
        timeEl.textContent = durationMins > 60
          ? `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`
          : `${durationMins} mins`;

        stepsListEl.innerHTML = steps
          .slice(0, 12)
          .map(
            (step, idx) => `
          <div class="step-item">
            <span class="step-idx">${idx + 1}</span>
            <span class="step-text">${step.instruction || 'Continue route'}</span>
            <span class="step-dist">${step.distanceM > 1000 ? (step.distanceM / 1000).toFixed(1) + 'km' : step.distanceM + 'm'}</span>
          </div>
        `
          )
          .join('');

        resultsArea.style.display = 'block';
      }
    } catch (e) {
      console.error('[DirectionsPanel] Route calculation failed:', e);
      alert('路徑運算逾時或失敗，請稍候重試 (Route calculation error)');
    } finally {
      if (calcBtn) {
        calcBtn.innerHTML = `<span>⚡</span> CALCULATE ROUTE`;
        calcBtn.disabled = false;
      }
    }
  }
}
