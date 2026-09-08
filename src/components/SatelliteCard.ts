export interface SatelliteDetail {
  name: string;
  lat: number;
  lng: number;
  alt: number; // km
  color?: string;
  mission?: string;
  category?: string;
  noradId?: string;
  periodMinutes?: number | null;
}

const EARTH_RADIUS_KM = 6371;

function regime(altKm: number): { label: string; note: string } {
  if (altKm < 2000) return { label: 'LEO', note: 'Low Earth orbit' };
  if (altKm < 35000) return { label: 'MEO', note: 'Medium Earth orbit' };
  if (altKm <= 36500) return { label: 'GEO', note: 'Geostationary belt' };
  return { label: 'HEO', note: 'High / highly elliptical' };
}

function speedKmS(altKm: number, periodMinutes: number): number {
  return (2 * Math.PI * (EARTH_RADIUS_KM + altKm)) / (periodMinutes * 60);
}

function period(minutes: number): string {
  if (minutes < 100) return `${minutes.toFixed(1)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes - h * 60);
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

export class SatelliteCardModal {
  private container: HTMLElement;
  private parentElement: HTMLElement;
  private onClose?: () => void;

  constructor(parentElement: HTMLElement, sat: SatelliteDetail, onClose?: () => void) {
    this.parentElement = parentElement;
    this.onClose = onClose;
    this.container = document.createElement('div');
    this.container.className = 'satellite-detail-card';
    this.parentElement.appendChild(this.container);
    this.render(sat);
  }

  public render(sat: SatelliteDetail): void {
    const accent = sat.color || '#00e5ff';
    const shell = regime(sat.alt);
    const estPeriod = sat.periodMinutes ?? (sat.alt < 2000 ? 92 : sat.alt < 20200 ? 718 : 1436);
    const estSpeed = speedKmS(sat.alt, estPeriod);

    this.container.style.borderColor = `${accent}55`;
    this.container.innerHTML = `
      <div class="sat-accent-line" style="background: ${accent};"></div>
      <div class="sat-header">
        <div class="sat-title-group">
          <span class="sat-icon" style="color: ${accent};">🛰️</span>
          <div class="sat-names">
            <div class="sat-name" title="${sat.name}">${sat.name}</div>
            <div class="sat-mission">${sat.mission || 'SPACE VEHICLE'}</div>
          </div>
        </div>
        <button class="sat-close-btn" title="Close (Esc)">✕</button>
      </div>

      <div class="sat-grid">
        <div class="sat-field">
          <div class="sat-label">ALTITUDE</div>
          <div class="sat-value" style="color: #00e5ff;">${Math.round(sat.alt).toLocaleString()} km</div>
        </div>
        <div class="sat-field">
          <div class="sat-label">ORBIT</div>
          <div class="sat-value" style="color: ${accent};">${shell.label}</div>
        </div>
        <div class="sat-field">
          <div class="sat-label">PERIOD</div>
          <div class="sat-value">${period(estPeriod)}</div>
        </div>
        <div class="sat-field">
          <div class="sat-label">VELOCITY</div>
          <div class="sat-value">${estSpeed.toFixed(2)} km/s</div>
        </div>
        <div class="sat-field">
          <div class="sat-label">LATITUDE</div>
          <div class="sat-value">${sat.lat.toFixed(3)}°</div>
        </div>
        <div class="sat-field">
          <div class="sat-label">LONGITUDE</div>
          <div class="sat-value">${sat.lng.toFixed(3)}°</div>
        </div>
        <div class="sat-field">
          <div class="sat-label">NORAD ID</div>
          <div class="sat-value">${sat.noradId || '—'}</div>
        </div>
        <div class="sat-field">
          <div class="sat-label">CLASS</div>
          <div class="sat-value">${shell.note}</div>
        </div>
      </div>

      <div class="sat-track-status">
        <span>● 3D ORBIT TRACK ACTIVE ON GLOBE</span>
      </div>

      ${
        sat.noradId
          ? `<a href="https://www.n2yo.com/satellite/?s=${encodeURIComponent(sat.noradId)}" target="_blank" rel="noopener noreferrer" class="sat-n2yo-btn" style="color: ${accent}; border-color: ${accent}44;">
              TRACK ON N2YO ↗
            </a>`
          : ''
      }
    `;

    const closeBtn = this.container.querySelector('.sat-close-btn');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.destroy();
    });
  }

  public destroy(): void {
    this.container.remove();
    this.onClose?.();
  }
}
