export interface IntelItem {
  id: string;
  category: 'warzone' | 'seismic' | 'cyber' | 'maritime' | 'intel';
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'LOW';
  title: string;
  summary: string;
  location: string;
  lat: number;
  lng: number;
  timeAgo: string;
  source: string;
  url?: string;
}

export const INITIAL_INTEL_DATA: IntelItem[] = [
  {
    id: 'intel-tw-01',
    category: 'warzone',
    severity: 'HIGH',
    title: 'PLA Joint Air-Sea Combat Patrols Detected in Taiwan ADIZ',
    summary: 'Multiple J-16 strike fighters and Y-8 ASW aircraft conducted cross-strait median line incursions into SW ADIZ sector.',
    location: 'Taiwan Strait (SW Sector)',
    lat: 23.5,
    lng: 119.8,
    timeAgo: '8m ago',
    source: 'MND ROC Telemetry',
    url: 'https://www.mnd.gov.tw',
  },
  {
    id: 'intel-ua-01',
    category: 'warzone',
    severity: 'CRITICAL',
    title: 'High-Density Glide Bomb & Shahed UAV Swarm Strikes on Pokrovsk Sector',
    summary: 'Heavy artillery exchanges and motorized assaults reported along Pokrovsk-Kostiantynivka defensive axis.',
    location: 'Pokrovsk, Donetsk Oblast',
    lat: 48.28,
    lng: 37.18,
    timeAgo: '14m ago',
    source: 'ISW War Assessment',
    url: 'https://liveuamap.com',
  },
  {
    id: 'intel-redsea-01',
    category: 'maritime',
    severity: 'CRITICAL',
    title: 'Anti-Ship Ballistic Missile Launch Alert in Southern Red Sea Corridor',
    summary: 'Commercial tanker reported near-miss splashdown 45NM southwest of Al-Mukha; coalition naval escort underway.',
    location: 'Bab el-Mandeb Strait',
    lat: 13.25,
    lng: 43.15,
    timeAgo: '26m ago',
    source: 'UKMTO Maritime Advisory',
    url: 'https://www.ukmto.org',
  },
  {
    id: 'intel-quake-01',
    category: 'seismic',
    severity: 'HIGH',
    title: 'M6.2 Shallow Earthquake Off East Coast of Honshu, Japan',
    summary: 'USGS automated detection: Depth 22.4 km. JMA issued offshore tsunami advisory with 0.3m wave height forecast.',
    location: 'Tohoku Offshore, Japan',
    lat: 38.45,
    lng: 142.12,
    timeAgo: '32m ago',
    source: 'USGS Earthquake Hazards',
    url: 'https://earthquake.usgs.gov',
  },
  {
    id: 'intel-cyber-01',
    category: 'cyber',
    severity: 'HIGH',
    title: 'Targeted DDoS & BGP Route Leak Targeting Asia-Pacific Financial Clearing',
    summary: 'Volumetric telemetry spiked to 1.8 Tbps targeting SWIFT / regional interbank switching nodes; mitigated by scrubbing center.',
    location: 'Singapore Interbank Nexus',
    lat: 1.35,
    lng: 103.82,
    timeAgo: '45m ago',
    source: 'Cloudflare Radar / BGPmon',
    url: 'https://radar.cloudflare.com',
  },
  {
    id: 'intel-scs-01',
    category: 'maritime',
    severity: 'HIGH',
    title: 'CCG Cutter Intercepts Philippine Supply Flotilla Near Sabina Shoal',
    summary: 'High-pressure water cannon deployment and aggressive close maneuvers observed by aerial maritime patrol.',
    location: 'Sabina Shoal, South China Sea',
    lat: 9.87,
    lng: 116.55,
    timeAgo: '1h ago',
    source: 'PCG West Philippine Sea Taskforce',
    url: 'https://news.usni.org',
  },
  {
    id: 'intel-space-01',
    category: 'intel',
    severity: 'ELEVATED',
    title: 'NOAA Space Weather Prediction: Minor G1 Geomagnetic Storm Watch',
    summary: 'Coronal Mass Ejection (CME) shockwave arrival detected by DSCOVR satellite at L1 Lagrange point.',
    location: 'Low Earth Orbit / Magnetosphere',
    lat: 51.5,
    lng: -0.12,
    timeAgo: '2h ago',
    source: 'NOAA SWPC',
    url: 'https://www.swpc.noaa.gov',
  },
];

export class IntelFeedPanel {
  private container: HTMLElement;
  private panelEl!: HTMLElement;
  private isVisible: boolean = false;
  private currentFilter: string = 'all';
  private items: IntelItem[] = [...INITIAL_INTEL_DATA];
  private onLocate: (lat: number, lng: number, zoom: number, title: string) => void;

  constructor(
    parent: HTMLElement,
    onLocate: (lat: number, lng: number, zoom: number, title: string) => void
  ) {
    this.container = parent;
    this.onLocate = onLocate;
    this.render();
  }

  private render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'intel-feed-panel glass-panel';
    this.panelEl.style.display = 'none';

    this.updateContent();
    this.container.appendChild(this.panelEl);
  }

  private updateContent(): void {
    const filtered =
      this.currentFilter === 'all'
        ? this.items
        : this.items.filter((item) => item.category === this.currentFilter);

    const criticalCount = this.items.filter((i) => i.severity === 'CRITICAL').length;

    this.panelEl.innerHTML = `
      <div class="intel-feed-header">
        <div class="intel-feed-title">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-red)" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          </svg>
          <span>LIVE INTEL & SIGINT FEED</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="gotham-tag gotham-tag--critical">${criticalCount} CRITICAL</span>
          <button class="panel-close-btn" id="intel-panel-close">&times;</button>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="intel-filter-tabs">
        <button class="intel-tab-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-cat="all">ALL (${this.items.length})</button>
        <button class="intel-tab-btn ${this.currentFilter === 'warzone' ? 'active' : ''}" data-cat="warzone">WARZONES</button>
        <button class="intel-tab-btn ${this.currentFilter === 'seismic' ? 'active' : ''}" data-cat="seismic">SEISMIC</button>
        <button class="intel-tab-btn ${this.currentFilter === 'maritime' ? 'active' : ''}" data-cat="maritime">MARITIME</button>
        <button class="intel-tab-btn ${this.currentFilter === 'cyber' ? 'active' : ''}" data-cat="cyber">CYBER</button>
      </div>

      <!-- Feed List -->
      <div class="intel-items-list styled-scrollbar">
        ${filtered
          .map(
            (item) => `
          <div class="intel-card" data-id="${item.id}">
            <div class="intel-card-top">
              <span class="severity-pill severity-${item.severity.toLowerCase()}">${item.severity}</span>
              <span class="intel-source">${item.source}</span>
              <span class="intel-time">${item.timeAgo}</span>
            </div>
            <div class="intel-card-title">${item.title}</div>
            <div class="intel-card-summary">${item.summary}</div>
            <div class="intel-card-footer">
              <span class="intel-loc">📍 ${item.location}</span>
              <div style="display:flex;gap:6px;">
                <button class="intel-locate-btn" data-lat="${item.lat}" data-lng="${item.lng}" data-title="${encodeURIComponent(item.title)}">
                  🎯 LOCATE
                </button>
                ${
                  item.url
                    ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="intel-source-link">↗ SOURCE</a>`
                    : ''
                }
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    // Listeners
    this.panelEl.querySelector('#intel-panel-close')?.addEventListener('click', () => {
      this.hide();
    });

    const tabs = this.panelEl.querySelectorAll('.intel-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        this.currentFilter = (e.currentTarget as HTMLElement).getAttribute('data-cat') || 'all';
        this.updateContent();
      });
    });

    const locBtns = this.panelEl.querySelectorAll('.intel-locate-btn');
    locBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const lat = parseFloat(target.getAttribute('data-lat') || '0');
        const lng = parseFloat(target.getAttribute('data-lng') || '0');
        const title = decodeURIComponent(target.getAttribute('data-title') || '');
        this.onLocate(lat, lng, 7.5, title);
      });
    });
  }

  public addIntelItem(item: IntelItem): void {
    this.items.unshift(item);
    if (this.items.length > 50) this.items.pop();
    if (this.isVisible) this.updateContent();
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
