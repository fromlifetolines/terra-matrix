/**
 * SearchBar.ts
 *
 * Full-featured Omnibox Search Engine for Terra Matrix:
 * - Real-time flight search (e.g. CAL162, EVA, UAL)
 * - Taiwan administrative cities, counties, and districts (新北市, 台北市, 新竹, 林口, 桃園...)
 * - Global OSM Nominatim address geocoding for any street or location
 * - Strategic straits, military facilities, space stations & coordinates
 */

export interface SearchResult {
  title: string;
  subtitle: string;
  category: 'FLIGHT' | 'CITY' | 'DISTRICT' | 'GEOCODE' | 'CHOKEPOINT' | 'CAPITAL' | 'AIRPORT' | 'SPACE' | 'COORDS';
  lat: number;
  lng: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

// ── Taiwan Comprehensive Geographic Location Database ──
export const TAIWAN_LOCATIONS: SearchResult[] = [
  // Special Municipalities & Major Cities
  { title: '新北市 (New Taipei City)', subtitle: 'Taiwan / Special Municipality', category: 'CITY', lat: 25.0117, lng: 121.4658, zoom: 11.5, pitch: 35 },
  { title: '台北市 (Taipei City)', subtitle: 'Taiwan / Capital Command & Center', category: 'CAPITAL', lat: 25.0375, lng: 121.5637, zoom: 12, pitch: 40 },
  { title: '桃園市 (Taoyuan City)', subtitle: 'Taiwan / International Aviation Hub', category: 'CITY', lat: 24.9936, lng: 121.3010, zoom: 11.5, pitch: 35 },
  { title: '新竹市 (Hsinchu City)', subtitle: 'Taiwan / Science Park & High-Tech Hub', category: 'CITY', lat: 24.8138, lng: 120.9675, zoom: 12.5, pitch: 35 },
  { title: '新竹縣 (Hsinchu County)', subtitle: 'Taiwan / Zhubei & Science Corridor', category: 'CITY', lat: 24.8387, lng: 121.0177, zoom: 11, pitch: 30 },
  { title: '台中市 (Taichung City)', subtitle: 'Taiwan / Central Metropolis & Harbor', category: 'CITY', lat: 24.1477, lng: 120.6736, zoom: 11.5, pitch: 35 },
  { title: '台南市 (Tainan City)', subtitle: 'Taiwan / Southern Cultural & Tech Hub', category: 'CITY', lat: 22.9997, lng: 120.2270, zoom: 11.5, pitch: 35 },
  { title: '高雄市 (Kaohsiung City)', subtitle: 'Taiwan / Naval Base & Global Port', category: 'CITY', lat: 22.6273, lng: 120.3014, zoom: 11.5, pitch: 35 },
  { title: '基隆市 (Keelung City)', subtitle: 'Taiwan / Northern Maritime Bastion', category: 'CITY', lat: 25.1276, lng: 121.7392, zoom: 13, pitch: 40 },
  { title: '宜蘭縣 (Yilan County)', subtitle: 'Taiwan / Lanyang Plain & Suao Base', category: 'CITY', lat: 24.7570, lng: 121.7530, zoom: 11.5, pitch: 35 },
  { title: '花蓮縣 (Hualien County)', subtitle: 'Taiwan / Jiashan Underground Base', category: 'CITY', lat: 23.9872, lng: 121.6016, zoom: 11.5, pitch: 40 },
  { title: '台東縣 (Taitung County)', subtitle: 'Taiwan / Chihhang Air Base', category: 'CITY', lat: 22.7583, lng: 121.1444, zoom: 11.5, pitch: 35 },
  { title: '嘉義市 (Chiayi City)', subtitle: 'Taiwan / 4th TFW F-16V Air Base', category: 'CITY', lat: 23.4800, lng: 120.4491, zoom: 12.5, pitch: 35 },
  { title: '嘉義縣 (Chiayi County)', subtitle: 'Taiwan / Southwestern Coast', category: 'CITY', lat: 23.4518, lng: 120.2559, zoom: 11, pitch: 30 },
  { title: '苗栗縣 (Miaoli County)', subtitle: 'Taiwan / Northwestern Region', category: 'CITY', lat: 24.5602, lng: 120.8214, zoom: 11, pitch: 30 },
  { title: '彰化縣 (Changhua County)', subtitle: 'Taiwan / Central Coast', category: 'CITY', lat: 24.0817, lng: 120.5385, zoom: 11.5, pitch: 30 },
  { title: '南投縣 (Nantou County)', subtitle: 'Taiwan / Central Mountain Bastion', category: 'CITY', lat: 23.9099, lng: 120.6847, zoom: 11, pitch: 40 },
  { title: '雲林縣 (Yunlin County)', subtitle: 'Taiwan / Mailiao Industrial Corridor', category: 'CITY', lat: 23.7092, lng: 120.4313, zoom: 11, pitch: 30 },
  { title: '屏東縣 (Pingtung County)', subtitle: 'Taiwan / Hengchun & Jiupeng Base', category: 'CITY', lat: 22.6828, lng: 120.4879, zoom: 11, pitch: 35 },
  { title: '澎湖縣 (Penghu County)', subtitle: 'Taiwan Strait / Magong Forward Bastion', category: 'CHOKEPOINT', lat: 23.5712, lng: 119.5793, zoom: 11.5, pitch: 35 },
  { title: '金門縣 (Kinmen County)', subtitle: 'Frontline Island Bastion & Defense Command', category: 'CHOKEPOINT', lat: 24.4493, lng: 118.3766, zoom: 12, pitch: 40 },
  { title: '連江縣 (Matsu Islands)', subtitle: 'Dongyin & Nangan Radar & Missile Bastion', category: 'CHOKEPOINT', lat: 26.1558, lng: 119.9397, zoom: 12.5, pitch: 40 },

  // Key Districts & Townships
  { title: '林口區 (Linkou District)', subtitle: 'New Taipei City / High-Tech & Expressway Hub', category: 'DISTRICT', lat: 25.0772, lng: 121.3912, zoom: 13.5, pitch: 45 },
  { title: '板橋區 (Banqiao District)', subtitle: 'New Taipei City / Government Center', category: 'DISTRICT', lat: 25.0143, lng: 121.4627, zoom: 14, pitch: 45 },
  { title: '中壢區 (Zhongli District)', subtitle: 'Taoyuan City / Major Urban Center', category: 'DISTRICT', lat: 24.9653, lng: 121.2248, zoom: 13.5, pitch: 40 },
  { title: '竹北市 (Zhubei City)', subtitle: 'Hsinchu County / Biomedical Park', category: 'DISTRICT', lat: 24.8387, lng: 121.0177, zoom: 13.5, pitch: 40 },
  { title: '三重區 (Sanchong District)', subtitle: 'New Taipei City / Tamsui River West Bank', category: 'DISTRICT', lat: 25.0615, lng: 121.4983, zoom: 14, pitch: 40 },
  { title: '中和區 (Zhonghe District)', subtitle: 'New Taipei City / Southern Urban Sector', category: 'DISTRICT', lat: 24.9984, lng: 121.5003, zoom: 14, pitch: 40 },
  { title: '永和區 (Yonghe District)', subtitle: 'New Taipei City / High Density Sector', category: 'DISTRICT', lat: 25.0078, lng: 121.5173, zoom: 14, pitch: 40 },
  { title: '新莊區 (Xinzhuang District)', subtitle: 'New Taipei City / Sub-City Center', category: 'DISTRICT', lat: 25.0374, lng: 121.4504, zoom: 14, pitch: 40 },
  { title: '汐止區 (Xizhi District)', subtitle: 'New Taipei City / Keelung River Valley', category: 'DISTRICT', lat: 25.0629, lng: 121.6575, zoom: 13.5, pitch: 40 },
  { title: '淡水區 (Tamsui District)', subtitle: 'New Taipei City / Tamsui River Estuary', category: 'DISTRICT', lat: 25.1756, lng: 121.4439, zoom: 13.5, pitch: 45 },
  { title: '信義區 (Xinyi District)', subtitle: 'Taipei City / Taipei 101 Financial Center', category: 'DISTRICT', lat: 25.0336, lng: 121.5670, zoom: 14.5, pitch: 50 },
  { title: '內湖區 (Neihu District)', subtitle: 'Taipei City / Neihu Technology Park', category: 'DISTRICT', lat: 25.0835, lng: 121.5944, zoom: 14, pitch: 45 },
  { title: '大安區 (Da\'an District)', subtitle: 'Taipei City / Core Metropolitan District', category: 'DISTRICT', lat: 25.0264, lng: 121.5434, zoom: 14, pitch: 40 },
  { title: '南港區 (Nangang District)', subtitle: 'Taipei City / Software Park & Station', category: 'DISTRICT', lat: 25.0531, lng: 121.6071, zoom: 14, pitch: 40 },
  { title: '經國路 (Jingguo Road)', subtitle: 'Taoyuan District / Major Traffic Artery (CCTV Hub)', category: 'DISTRICT', lat: 25.0180, lng: 121.3050, zoom: 14.5, pitch: 45 },
];

export const STRATEGIC_TARGETS: SearchResult[] = [
  // Strategic Capitals & Theaters
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

  // Maritime Chokepoints
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
  private onGetFlights?: () => any[];
  private debounceTimer: number | null = null;

  constructor(
    parent: HTMLElement,
    onSelect: (res: SearchResult) => void,
    onGetFlights?: () => any[]
  ) {
    this.container = parent;
    this.onSelect = onSelect;
    this.onGetFlights = onGetFlights;
    this.render();
  }

  private render(): void {
    this.rootEl = document.createElement('div');
    this.rootEl.className = 'osiris-search-bar-wrapper';

    this.rootEl.innerHTML = `
      <div class="search-input-box">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2" class="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="global-search-input" 
          placeholder="SEARCH TARGET, FLIGHT (CAL162), CITY OR ADDRESS..." 
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

      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = window.setTimeout(() => {
        this.handleSearch(q);
      }, 200);
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

  private async handleSearch(query: string): Promise<void> {
    if (!query) {
      this.closeDropdown();
      return;
    }

    const qLower = query.toLowerCase();
    const results: SearchResult[] = [];

    // 1. Direct Coordinates Jump (e.g. "25.04, 121.50" or "25.04 121.50")
    const coordMatch = query.match(/^([+-]?\d+(?:\.\d+)?)[,\s]+([+-]?\d+(?:\.\d+)?)$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        results.push({
          title: `Coordinate Target (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`,
          subtitle: 'Direct Geodetic Telemetry Jump',
          category: 'COORDS',
          lat,
          lng,
          zoom: 12.5,
          pitch: 45,
        });
      }
    }

    // 2. Real-Time Flight Search (e.g. "CAL162", "EVA", "UAL", callsign)
    if (this.onGetFlights) {
      try {
        const allFlights = this.onGetFlights() || [];
        const flightMatches = allFlights
          .filter((f) => {
            const cs = String(f.callsign || '').toLowerCase();
            const icao = String(f.icao24 || '').toLowerCase();
            const cntry = String(f.country || '').toLowerCase();
            return cs.includes(qLower) || icao.includes(qLower) || (qLower.length >= 4 && cntry.includes(qLower));
          })
          .slice(0, 4);

        for (const fl of flightMatches) {
          const lat = Number(fl.lat);
          const lng = Number(fl.lng);
          if (!isNaN(lat) && !isNaN(lng)) {
            const alt = fl.altitude ? `Alt: ${Math.round(fl.altitude)}m` : 'Airborne';
            const spd = fl.velocity ? ` · ${Math.round(fl.velocity)} km/h` : '';
            const cntry = fl.country ? ` · ${fl.country}` : '';
            results.push({
              title: `✈️ ${fl.callsign || fl.icao24 || 'FLIGHT'}`,
              subtitle: `Active Airborne Radar // ${alt}${spd}${cntry}`,
              category: 'FLIGHT',
              lat,
              lng,
              zoom: 12,
              pitch: 45,
              bearing: Number(fl.heading) || 0,
            });
          }
        }
      } catch (e) {
        console.warn('[SearchBar] Flight match error:', e);
      }
    }

    // 3. Taiwan Cities, Counties, and Districts Dictionary
    const taiwanMatches = TAIWAN_LOCATIONS.filter((item) => {
      const t = item.title.toLowerCase();
      const s = item.subtitle.toLowerCase();
      return t.includes(qLower) || s.includes(qLower) || query.includes(item.title.split(' ')[0]);
    });
    results.push(...taiwanMatches);

    // 4. Strategic Targets & World Capitals
    const targetMatches = STRATEGIC_TARGETS.filter((item) => {
      const t = item.title.toLowerCase();
      const s = item.subtitle.toLowerCase();
      return t.includes(qLower) || s.includes(qLower);
    });
    results.push(...targetMatches);

    // 5. OpenStreetMap Nominatim Live Geocoding Fallback
    // If local results are few or user searched for specific street/building, query OSM Nominatim
    if (results.length < 5 && query.length >= 2) {
      try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
        const res = await fetch(nominatimUrl, {
          headers: { 'Accept-Language': 'zh-TW,zh,en' },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            for (const item of data) {
              const lat = parseFloat(item.lat);
              const lng = parseFloat(item.lon);
              if (!isNaN(lat) && !isNaN(lng)) {
                // Determine appropriate zoom level
                let zoom = 13;
                if (['house', 'building', 'address', 'shop', 'amenity'].includes(item.type)) zoom = 16.5;
                else if (['road', 'street', 'highway'].includes(item.type)) zoom = 15;
                else if (['neighbourhood', 'suburb'].includes(item.type)) zoom = 14;
                else if (['city', 'town', 'village'].includes(item.type)) zoom = 12;
                else if (['county', 'state'].includes(item.type)) zoom = 9.5;
                else if (['country'].includes(item.type)) zoom = 5.5;

                // Avoid duplicate coordinates
                const isDup = results.some((r) => Math.abs(r.lat - lat) < 0.005 && Math.abs(r.lng - lng) < 0.005);
                if (!isDup) {
                  const parts = (item.display_name || '').split(',').map((s: string) => s.trim());
                  const primary = parts.slice(0, 2).join(', ');
                  const secondary = parts.slice(2, 5).join(', ');
                  results.push({
                    title: primary || item.name || query,
                    subtitle: secondary || `OSM Geocode [${item.type}]`,
                    category: 'GEOCODE',
                    lat,
                    lng,
                    zoom,
                    pitch: 40,
                  });
                }
              }
            }
          }
        }
      } catch (e) {
        console.warn('[SearchBar] Nominatim geocode fallback error:', e);
      }
    }

    this.renderDropdown(results.slice(0, 8));
  }

  private renderDropdown(results: SearchResult[]): void {
    if (results.length === 0) {
      this.resultsEl.innerHTML = `
        <div class="search-empty-state">No matching strategic targets, flights, or locations found</div>
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
          this.inputEl.value = selected.title.replace(/^✈️\s*/, '');
          this.closeDropdown();
          this.onSelect(selected);
        }
      });
    });
  }

  public closeDropdown(): void {
    this.resultsEl.style.display = 'none';
  }
}
