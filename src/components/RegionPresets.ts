export interface RegionPreset {
  id: string;
  label: string;
  lat: number;
  lng: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
  icon: string;
  hot?: boolean;
  desc: string;
}

export const STRATEGIC_REGIONS: RegionPreset[] = [
  {
    id: 'taiwan-strait',
    label: 'TAIWAN STRAIT',
    lat: 24.2,
    lng: 120.8,
    zoom: 6.8,
    pitch: 45,
    bearing: 355,
    icon: '🇹🇼',
    hot: true,
    desc: 'Taiwan Strait & First Island Chain Defense Sector',
  },
  {
    id: 'ukraine',
    label: 'UKRAINE WARZONE',
    lat: 48.5,
    lng: 33.2,
    zoom: 6.2,
    pitch: 40,
    bearing: 15,
    icon: '⚔️',
    hot: true,
    desc: 'Eastern Front & Black Sea Naval Theatre',
  },
  {
    id: 'middle-east',
    label: 'MIDDLE EAST / GULF',
    lat: 28.0,
    lng: 48.5,
    zoom: 5.5,
    pitch: 35,
    bearing: 0,
    icon: '🔥',
    hot: true,
    desc: 'Persian Gulf & Levant Conflict Matrix',
  },
  {
    id: 'red-sea',
    label: 'RED SEA / MANDAB',
    lat: 13.8,
    lng: 43.2,
    zoom: 6.8,
    pitch: 40,
    bearing: 330,
    icon: '🌊',
    hot: true,
    desc: 'Bab el-Mandeb Chokepoint & Maritime Corridors',
  },
  {
    id: 'korea',
    label: 'KOREAN DMZ',
    lat: 38.0,
    lng: 127.5,
    zoom: 6.5,
    pitch: 35,
    bearing: 0,
    icon: '🇰🇷',
    hot: true,
    desc: '38th Parallel & Yellow Sea Defense Grid',
  },
  {
    id: 'south-china-sea',
    label: 'SOUTH CHINA SEA',
    lat: 12.0,
    lng: 114.5,
    zoom: 5.5,
    pitch: 30,
    bearing: 0,
    icon: '🚢',
    hot: true,
    desc: 'Spratly & Paracel Islands Naval Operations',
  },
  {
    id: 'malacca',
    label: 'MALACCA STRAIT',
    lat: 2.6,
    lng: 101.8,
    zoom: 7.2,
    pitch: 35,
    bearing: 315,
    icon: '⚓',
    hot: false,
    desc: 'Strategic Energy & Container Shipping Chokepoint',
  },
  {
    id: 'arctic',
    label: 'ARCTIC / GIUK GAP',
    lat: 72.0,
    lng: 0.0,
    zoom: 4.0,
    pitch: 30,
    bearing: 0,
    icon: '❄️',
    hot: false,
    desc: 'North Sea & High North Submarine Transit Corridor',
  },
  {
    id: 'baltic',
    label: 'BALTIC / SUWALKI',
    lat: 54.5,
    lng: 23.0,
    zoom: 6.5,
    pitch: 35,
    bearing: 0,
    icon: '🛡️',
    hot: true,
    desc: 'Suwalki Gap & Eastern Flank Border Bastion',
  },
  {
    id: 'panama',
    label: 'PANAMA CANAL',
    lat: 9.1,
    lng: -79.7,
    zoom: 8.8,
    pitch: 40,
    bearing: 320,
    icon: '🇵🇦',
    hot: false,
    desc: 'Interoceanic Canal Lock System',
  },
  {
    id: 'americas',
    label: 'NORAD / AMERICAS',
    lat: 38.0,
    lng: -97.0,
    zoom: 3.8,
    pitch: 25,
    bearing: 0,
    icon: '🦅',
    hot: false,
    desc: 'North American Aerospace Defense Command',
  },
  {
    id: 'global',
    label: 'GLOBAL OVERVIEW',
    lat: 20.0,
    lng: 10.0,
    zoom: 2.3,
    pitch: 0,
    bearing: 0,
    icon: '🌍',
    hot: false,
    desc: 'Planetary 3D Surveillance Horizon',
  },
];

export class RegionPresetsPanel {
  private container: HTMLElement;
  private panelEl!: HTMLElement;
  private isVisible: boolean = false;
  private onSelectRegion: (region: RegionPreset) => void;

  constructor(parent: HTMLElement, onSelectRegion: (region: RegionPreset) => void) {
    this.container = parent;
    this.onSelectRegion = onSelectRegion;
    this.render();
  }

  private render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'region-presets-panel glass-panel';
    this.panelEl.style.display = 'none';

    const hotCount = STRATEGIC_REGIONS.filter((r) => r.hot).length;

    this.panelEl.innerHTML = `
      <div class="region-presets-header">
        <div class="region-presets-title">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-gold)" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
          <span>THEATER PRESETS</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="region-hot-tag">${hotCount} CONFLICTS</span>
          <button class="panel-close-btn" id="region-panel-close">&times;</button>
        </div>
      </div>

      <div class="region-presets-grid">
        ${STRATEGIC_REGIONS.map(
          (r) => `
          <button class="region-preset-btn ${r.hot ? 'is-hot' : ''}" data-id="${r.id}" title="${r.desc}">
            <span class="region-icon">${r.icon}</span>
            <span class="region-name">${r.label}</span>
            ${r.hot ? '<span class="pulse-beacon"></span>' : ''}
          </button>
        `
        ).join('')}
      </div>
    `;

    this.container.appendChild(this.panelEl);

    // Event listeners
    this.panelEl.querySelector('#region-panel-close')?.addEventListener('click', () => {
      this.hide();
    });

    const btns = this.panelEl.querySelectorAll('.region-preset-btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const region = STRATEGIC_REGIONS.find((r) => r.id === id);
        if (region) {
          btns.forEach((b) => b.classList.remove('selected'));
          (e.currentTarget as HTMLElement).classList.add('selected');
          this.onSelectRegion(region);
        }
      });
    });
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public show(): void {
    this.isVisible = true;
    this.panelEl.style.display = 'flex';
  }

  public hide(): void {
    this.isVisible = false;
    this.panelEl.style.display = 'none';
  }
}
