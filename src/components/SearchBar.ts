export interface SearchResult {
  title: string;
  subtitle: string;
  category: 'CAPITAL' | 'CHOKEPOINT' | 'AIRPORT' | 'SPACE' | 'COORDS';
  lat: number;
  lng: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export const SEARCH_DATABASE: SearchResult[] = [
  // Major Strategic Capitals & Bases
  { title: 'Taipei', subtitle: 'Taiwan / National Command Center', category: 'CAPITAL', lat: 25.033, lng: 121.565, zoom: 11, pitch: 45 },
  { title: 'Tokyo', subtitle: 'Japan / East Asia Strategic Command', category: 'CAPITAL', lat: 35.676, lng: 139.65, zoom: 10, pitch: 35 },
  { title: 'Washington D.C.', subtitle: 'United States / Pentagon & White House', category: 'CAPITAL', lat: 38.907, lng: -77.036, zoom: 11, pitch: 35 },
  { title: 'Kyiv', subtitle: 'Ukraine / General Staff HQ', category: 'CAPITAL', lat: 50.45, lng: 30.523, zoom: 11, pitch: 40 },
  { title: 'Beijing', subtitle: 'China / Central Military Commission', category: 'CAPITAL', lat: 39.904, lng: 116.407, zoom: 10, pitch: 30 },
  { title: 'Seoul', subtitle: 'South Korea / Combined Forces Command', category: 'CAPITAL', lat: 37.566, lng: 126.978, zoom: 11, pitch: 35 },
  { title: 'London', subtitle: 'United Kingdom / MOD Whitehall', category: 'CAPITAL', lat: 51.507, lng: -0.127, zoom: 11, pitch: 35 },
  { title: 'Tel Aviv', subtitle: 'Israel / Kirya Military Command', category: 'CAPITAL', lat: 32.085, lng: 34.781, zoom: 12, pitch: 40 },
  { title: 'Tehran', subtitle: 'Iran / Supreme National Security Council', category: 'CAPITAL', lat: 35.689, lng: 51.389, zoom: 11, pitch: 35 },
  { title: 'Moscow', subtitle: 'Russia / National Defense Management Center', category: 'CAPITAL', lat: 55.755, lng: 37.617, zoom: 10, pitch: 35 },
  { title: 'Singapore', subtitle: 'Changi Naval Base / Maritime Nexus', category: 'CAPITAL', lat: 1.352, lng: 103.819, zoom: 12, pitch: 40 },
  { title: 'Manila', subtitle: 'Philippines / Camp Aguinaldo Armed Forces HQ', category: 'CAPITAL', lat: 14.599, lng: 120.984, zoom: 11, pitch: 35 },

  // Maritime Chokepoints & Strategic Straits
  { title: 'Taiwan Strait', subtitle: 'Median Line & Maritime Bastion', category: 'CHOKEPOINT', lat: 24.0, lng: 119.8, zoom: 7.5, pitch: 45, bearing: 355 },
  { title: 'Strait of Malacca', subtitle: 'Key Oil & Container Shipping Lifeline', category: 'CHOKEPOINT', lat: 2.5, lng: 101.5, zoom: 7.5, pitch: 35, bearing: 315 },
  { title: 'Suez Canal', subtitle: 'Mediterranean - Red Sea Connector', category: 'CHOKEPOINT', lat: 30.5, lng: 32.35, zoom: 8.5, pitch: 40, bearing: 340 },
  { title: 'Strait of Hormuz', subtitle: 'Persian Gulf Hydrocarbon Gateway', category: 'CHOKEPOINT', lat: 26.55, lng: 56.25, zoom: 8.5, pitch: 40, bearing: 320 },
  { title: 'Bab el-Mandeb', subtitle: 'Southern Red Sea & Gulf of Aden Chokepoint', category: 'CHOKEPOINT', lat: 12.6, lng: 43.35, zoom: 8.5, pitch: 40, bearing: 330 },
  { title: 'Bosphorus Strait', subtitle: 'Black Sea - Marmara Gateway (Istanbul)', category: 'CHOKEPOINT', lat: 41.1, lng: 29.05, zoom: 10, pitch: 45, bearing: 20 },
  { title: 'Panama Canal', subtitle: 'Pacific - Atlantic Interoceanic Waterway', category: 'CHOKEPOINT', lat: 9.1, lng: -79.7, zoom: 9, pitch: 40, bearing: 320 },
  { title: 'Suwalki Gap', subtitle: 'NATO Eastern Flank Corridor (Poland-Lithuania)', category: 'CHOKEPOINT', lat: 54.3, lng: 23.3, zoom: 8, pitch: 35 },

  // Airfields
  { title: 'TPE / Taoyuan Airport', subtitle: 'RCTP / Primary Taiwan Civil Hub', category: 'AIRPORT', lat: 25.079, lng: 121.234, zoom: 13, pitch: 45 },
  { title: 'TSA / Songshan Airport', subtitle: 'RCSS / Taipei Capital Dual-Use Base', category: 'AIRPORT', lat: 25.069, lng: 121.552, zoom: 14, pitch: 50 },
  { title: 'KHH / Kaohsiung Airport', subtitle: 'RCKH / Southern Taiwan Maritime Gateway', category: 'AIRPORT', lat: 22.571, lng: 120.35, zoom: 13, pitch: 45 },
  { title: 'JFK / New York', subtitle: 'KJFK / Major Transatlantic Terminal', category: 'AIRPORT', lat: 40.641, lng: -73.778, zoom: 12, pitch: 40 },
  { title: 'HND / Tokyo Haneda', subtitle: 'RJTT / Tokyo Bay Aerospace Terminal', category: 'AIRPORT', lat: 35.549, lng: 139.779, zoom: 13, pitch: 45 },
  { title: 'LHR / London Heathrow', subtitle: 'EGLL / Western European Gateway', category: 'AIRPORT', lat: 51.47, lng: -0.454, zoom: 13, pitch: 40 },

  // Space Assets
  { title: 'International Space Station (ISS)', subtitle: 'Orbital Complex / 408 km Low Earth Orbit', category: 'SPACE', lat: 25.0, lng: 121.0, zoom: 3, pitch: 60 },
  { title: 'Tiangong Space Station (CSS)', subtitle: 'Chinese Orbital Space Station / 389 km', category: 'SPACE', lat: 30.0, lng: 110.0, zoom: 3, pitch: 60 },
  { title: 'Hubble Space Telescope', subtitle: 'NASA/ESA Astronomical Observatory / 535 km', category: 'SPACE', lat: 0.0, lng: 0.0, zoom: 3, pitch: 60 },
];

export class SearchBar {
  private container: HTMLElement;
  private rootEl!: HTMLElement;
  private inputEl!: HTMLInputElement;
  private resultsEl!: HTMLElement;
  private onSelect: (res: SearchResult) => void;

  constructor(parent: HTMLElement, onSelect: (res: SearchResult) => void) {
    this.container = parent;
    this.onSelect = onSelect;
    this.render();
  }

  private render(): void {
    this.rootEl = document.createElement('div');
    this.rootEl.className = 'osiris-search-bar-wrapper';

    this.rootEl.innerHTML = `
      <div class="search-input-box">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2" class="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="global-search-input" 
          placeholder="SEARCH TARGET, CHOKEPOINT, CITY OR LAT,LNG..." 
          autocomplete="off"
          spellcheck="false"
        />
        <button id="search-clear-btn" class="search-clear-btn" style="display:none;">&times;</button>
      </div>
      <div id="search-dropdown-results" class="search-dropdown-results styled-scrollbar" style="display:none;"></div>
    `;

    this.container.appendChild(this.rootEl);

    this.inputEl = this.rootEl.querySelector('#global-search-input') as HTMLInputElement;
    this.resultsEl = this.rootEl.querySelector('#search-dropdown-results') as HTMLElement;
    const clearBtn = this.rootEl.querySelector('#search-clear-btn') as HTMLButtonElement;

    this.inputEl.addEventListener('input', () => {
      const q = this.inputEl.value.trim();
      clearBtn.style.display = q ? 'block' : 'none';
      this.handleSearch(q);
    });

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDropdown();
      } else if (e.key === 'Enter') {
        const first = this.resultsEl.querySelector('.search-result-row') as HTMLElement;
        if (first) first.click();
      }
    });

    clearBtn.addEventListener('click', () => {
      this.inputEl.value = '';
      clearBtn.style.display = 'none';
      this.closeDropdown();
      this.inputEl.focus();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!this.rootEl.contains(e.target as Node)) {
        this.closeDropdown();
      }
    });
  }

  private handleSearch(query: string): void {
    if (!query) {
      this.closeDropdown();
      return;
    }

    // Check if query is direct coordinates: "25.04, 121.50" or "25.04 121.50"
    const coordMatch = query.match(/^([+-]?\d+(?:\.\d+)?)[,\s]+([+-]?\d+(?:\.\d+)?)$/);
    let results: SearchResult[] = [];

    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        results.push({
          title: `Coordinate Target (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
          subtitle: 'Direct Geodetic Telemetry Jump',
          category: 'COORDS',
          lat,
          lng,
          zoom: 12,
          pitch: 45,
        });
      }
    }

    const qLower = query.toLowerCase();
    const matches = SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(qLower) ||
        item.subtitle.toLowerCase().includes(qLower) ||
        item.category.toLowerCase().includes(qLower)
    );

    results = [...results, ...matches].slice(0, 10);

    if (results.length === 0) {
      this.resultsEl.innerHTML = `
        <div class="search-empty-state">No matching strategic targets found</div>
      `;
      this.resultsEl.style.display = 'block';
      return;
    }

    this.resultsEl.innerHTML = results
      .map(
        (r, idx) => `
      <div class="search-result-row" data-idx="${idx}">
        <span class="search-cat-badge badge-${r.category.toLowerCase()}">${r.category}</span>
        <div class="search-res-text">
          <div class="search-res-title">${r.title}</div>
          <div class="search-res-sub">${r.subtitle}</div>
        </div>
        <span class="search-go-arrow">↗</span>
      </div>
    `
      )
      .join('');

    this.resultsEl.style.display = 'block';

    const rows = this.resultsEl.querySelectorAll('.search-result-row');
    rows.forEach((row) => {
      row.addEventListener('click', (e) => {
        const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-idx') || '0', 10);
        const selected = results[idx];
        if (selected) {
          this.inputEl.value = selected.title;
          this.closeDropdown();
          this.onSelect(selected);
        }
      });
    });
  }

  private closeDropdown(): void {
    this.resultsEl.style.display = 'none';
  }
}
