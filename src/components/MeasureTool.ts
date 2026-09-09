export interface MeasurePoint {
  lat: number;
  lng: number;
}

export interface MeasureResult {
  pointA: MeasurePoint;
  pointB: MeasurePoint;
  distanceKm: number;
  distanceNm: number;
  distanceMi: number;
  bearingDeg: number;
}

export function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371.0;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const y = Math.sin(((lon2 - lon1) * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.cos(((lon2 - lon1) * Math.PI) / 180);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

export class MeasureTool {
  private container: HTMLElement;
  private hudEl!: HTMLElement;
  private isActive: boolean = false;
  private pointA: MeasurePoint | null = null;
  private pointB: MeasurePoint | null = null;
  private onMeasureChange: (res: MeasureResult | null) => void;

  constructor(parent: HTMLElement, onMeasureChange: (res: MeasureResult | null) => void) {
    this.container = parent;
    this.onMeasureChange = onMeasureChange;
    this.render();
  }

  private render(): void {
    this.hudEl = document.createElement('div');
    this.hudEl.className = 'measure-hud glass-panel';
    this.hudEl.style.display = 'none';

    this.container.appendChild(this.hudEl);
  }

  public activate(): void {
    this.isActive = true;
    this.pointA = null;
    this.pointB = null;
    this.updateHud();
    this.hudEl.style.display = 'flex';
    this.onMeasureChange(null);
  }

  public deactivate(): void {
    this.isActive = false;
    this.pointA = null;
    this.pointB = null;
    this.hudEl.style.display = 'none';
    this.onMeasureChange(null);
  }

  public toggle(): boolean {
    if (this.isActive) {
      this.deactivate();
      return false;
    } else {
      this.activate();
      return true;
    }
  }

  public handleMapClick(lat: number, lng: number): void {
    if (!this.isActive) return;

    if (!this.pointA) {
      this.pointA = { lat, lng };
      this.updateHud();
    } else if (!this.pointB) {
      this.pointB = { lat, lng };
      const distKm = haversineDistanceKm(
        this.pointA.lat,
        this.pointA.lng,
        this.pointB.lat,
        this.pointB.lng
      );
      const distNm = distKm * 0.539957;
      const distMi = distKm * 0.621371;
      const bearing = calculateBearing(
        this.pointA.lat,
        this.pointA.lng,
        this.pointB.lat,
        this.pointB.lng
      );

      const result: MeasureResult = {
        pointA: this.pointA,
        pointB: this.pointB,
        distanceKm: distKm,
        distanceNm: distNm,
        distanceMi: distMi,
        bearingDeg: bearing,
      };

      this.updateHud(result);
      this.onMeasureChange(result);
    } else {
      // Reset and start new measurement
      this.pointA = { lat, lng };
      this.pointB = null;
      this.updateHud();
      this.onMeasureChange(null);
    }
  }

  private updateHud(result?: MeasureResult): void {
    if (!this.pointA) {
      this.hudEl.innerHTML = `
        <div class="measure-hud-step">
          <span class="pulse-beacon"></span>
          <span>SELECT ORIGIN [POINT A] ON 3D GLOBE</span>
          <button class="panel-close-btn" id="measure-hud-close" style="margin-left:auto;">&times;</button>
        </div>
      `;
    } else if (!this.pointB) {
      this.hudEl.innerHTML = `
        <div class="measure-hud-step">
          <span class="pulse-beacon" style="background:var(--accent-amber);"></span>
          <span>ORIGIN SET: ${this.pointA.lat.toFixed(3)}°, ${this.pointA.lng.toFixed(3)}° &rarr; SELECT [POINT B]</span>
          <button class="panel-close-btn" id="measure-hud-close" style="margin-left:auto;">&times;</button>
        </div>
      `;
    } else if (result) {
      this.hudEl.innerHTML = `
        <div class="measure-hud-result">
          <div class="measure-result-title">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
              <path d="M2 22 22 2"></path>
              <path d="M11 2h11v11"></path>
            </svg>
            <span>GEODESIC DISTANCE TELEMETRY</span>
            <button class="panel-close-btn" id="measure-hud-close" style="margin-left:auto;">&times;</button>
          </div>
          <div class="measure-metrics-grid">
            <div class="measure-metric-box">
              <span class="m-label">DISTANCE (KM)</span>
              <span class="m-val" style="color:var(--accent-cyan);">${Math.round(result.distanceKm).toLocaleString()} km</span>
            </div>
            <div class="measure-metric-box">
              <span class="m-label">NAUTICAL MILES</span>
              <span class="m-val" style="color:var(--accent-emerald);">${Math.round(result.distanceNm).toLocaleString()} NM</span>
            </div>
            <div class="measure-metric-box">
              <span class="m-label">BEARING / AZIMUTH</span>
              <span class="m-val" style="color:var(--accent-gold);">${Math.round(result.bearingDeg)}° TRUE</span>
            </div>
          </div>
          <button class="matrix-btn" id="measure-reset-btn" style="width:100%;margin-top:6px;font-size:10px;">
            NEW MEASUREMENT / CLEAR
          </button>
        </div>
      `;

      this.hudEl.querySelector('#measure-reset-btn')?.addEventListener('click', () => {
        this.pointA = null;
        this.pointB = null;
        this.updateHud();
        this.onMeasureChange(null);
      });
    }

    this.hudEl.querySelector('#measure-hud-close')?.addEventListener('click', () => {
      this.deactivate();
    });
  }

  public getIsActive(): boolean {
    return this.isActive;
  }
}
