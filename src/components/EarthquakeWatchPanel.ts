import type { EarthquakeItem } from '../globe/layers/EarthquakeLayer';

export class EarthquakeWatchPanel {
  private container: HTMLElement;
  private panelEl!: HTMLElement;
  private isVisible: boolean = false;
  private currentFilter: string = 'all';
  private searchQuery: string = '';
  private quakes: EarthquakeItem[] = [];
  private onLocateEarthquake: (quake: EarthquakeItem) => void;

  private listContainerEl!: HTMLElement;
  private searchInputEl!: HTMLInputElement;
  private counterPillEl!: HTMLElement;
  private tabButtons: Map<string, HTMLButtonElement> = new Map();
  private lockedQuakeId: string | null = null;

  constructor(
    parent: HTMLElement,
    onLocateEarthquake: (quake: EarthquakeItem) => void
  ) {
    this.container = parent;
    this.onLocateEarthquake = onLocateEarthquake;
    this.render();
  }

  public updateQuakes(quakes: EarthquakeItem[]): void {
    this.quakes = quakes;
    if (this.isVisible) {
      this.updateList();
    }
  }

  private render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'earthquake-watch-panel glass-panel';
    this.panelEl.style.display = 'none';

    this.panelEl.innerHTML = `
      <div class="quake-watch-header">
        <div class="quake-watch-title">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#f59e0b" stroke-width="2">
            <path d="M2 12h3l2.5-6 4 13 3-9 2.5 5 2-3h5"></path>
          </svg>
          <span>SEISMIC INTELLIGENCE MONITOR</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="quake-counter-pill" id="quake-counter-pill">0 QUAKES</span>
          <button class="panel-close-btn" id="quake-panel-close">&times;</button>
        </div>
      </div>

      <!-- Search Box with Intercept Action -->
      <div class="quake-search-container">
        <input 
          type="text" 
          id="quake-search-input" 
          class="quake-search-input" 
          placeholder="Filter Location (e.g. Taiwan, Hualien, Japan, M6)..." 
        />
      </div>

      <!-- Filter Tabs -->
      <div class="quake-filter-tabs">
        <button class="quake-tab-btn active" data-cat="all">ALL</button>
        <button class="quake-tab-btn" data-cat="major">M4.5+ MAJOR</button>
        <button class="quake-tab-btn" data-cat="shallow">SHALLOW (&lt;70km)</button>
        <button class="quake-tab-btn" data-cat="taiwan">TAIWAN / ASIA</button>
      </div>

      <!-- Earthquake List -->
      <div class="quake-items-list styled-scrollbar" id="quake-items-list">
        <div class="quake-empty">Awaiting global seismic telemetry...</div>
      </div>
    `;

    this.container.appendChild(this.panelEl);

    // Cache elements
    this.listContainerEl = this.panelEl.querySelector('#quake-items-list') as HTMLElement;
    this.searchInputEl = this.panelEl.querySelector('#quake-search-input') as HTMLInputElement;
    this.counterPillEl = this.panelEl.querySelector('#quake-counter-pill') as HTMLElement;

    // Tab buttons
    this.panelEl.querySelectorAll('.quake-tab-btn').forEach((btn) => {
      const cat = btn.getAttribute('data-cat') || 'all';
      this.tabButtons.set(cat, btn as HTMLButtonElement);
      btn.addEventListener('click', () => {
        this.currentFilter = cat;
        this.tabButtons.forEach((b, c) => b.classList.toggle('active', c === cat));
        this.updateList();
      });
    });

    // Close button
    this.panelEl.querySelector('#quake-panel-close')?.addEventListener('click', () => {
      this.hide();
    });

    // Search input listener
    this.searchInputEl.addEventListener('input', () => {
      this.searchQuery = this.searchInputEl.value;
      this.updateList();

      const qClean = this.searchQuery.trim().toLowerCase();
      if (qClean.length >= 3) {
        const exactMatch = this.quakes.find((q) => q.place.toLowerCase().includes(qClean));
        if (exactMatch) {
          this.executeIntercept(exactMatch);
        }
      }
    });

    // Enter key triggers immediate flight to best match
    this.searchInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const qClean = this.searchQuery.trim().toLowerCase();
        if (!qClean) return;

        const matched = this.quakes.find((q) => q.place.toLowerCase().includes(qClean));
        if (matched) {
          this.executeIntercept(matched);
        }
      }
    });
  }

  private executeIntercept(quake: EarthquakeItem): void {
    this.lockedQuakeId = quake.id;
    this.onLocateEarthquake(quake);

    // Update locked class on cards
    this.listContainerEl.querySelectorAll('.quake-card').forEach((c) => {
      if (c.getAttribute('data-id') === quake.id) {
        c.classList.add('is-locked');
        c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        c.classList.remove('is-locked');
      }
    });
  }

  private updateList(): void {
    const totalCount = this.quakes.length;
    const majorCount = this.quakes.filter((q) => q.mag >= 4.5).length;
    const shallowCount = this.quakes.filter((q) => q.depth < 70).length;
    const taiwanCount = this.quakes.filter(
      (q) =>
        (q.lat >= 21.0 && q.lat <= 26.0 && q.lon >= 119.0 && q.lon <= 123.5) ||
        q.place.toLowerCase().includes('taiwan') ||
        q.place.toLowerCase().includes('japan') ||
        q.place.toLowerCase().includes('ryukyu')
    ).length;

    // Update tab counts
    const allTab = this.tabButtons.get('all');
    if (allTab) allTab.textContent = `ALL (${totalCount.toLocaleString()})`;
    const majorTab = this.tabButtons.get('major');
    if (majorTab) majorTab.textContent = `M4.5+ (${majorCount})`;
    const shallowTab = this.tabButtons.get('shallow');
    if (shallowTab) shallowTab.textContent = `SHALLOW (${shallowCount})`;
    const taiwanTab = this.tabButtons.get('taiwan');
    if (taiwanTab) taiwanTab.textContent = `TAIWAN / ASIA (${taiwanCount})`;

    let filtered = this.quakes;

    if (this.currentFilter === 'major') {
      filtered = filtered.filter((q) => q.mag >= 4.5);
    } else if (this.currentFilter === 'shallow') {
      filtered = filtered.filter((q) => q.depth < 70);
    } else if (this.currentFilter === 'taiwan') {
      filtered = filtered.filter(
        (q) =>
          (q.lat >= 21.0 && q.lat <= 26.0 && q.lon >= 119.0 && q.lon <= 123.5) ||
          q.place.toLowerCase().includes('taiwan') ||
          q.place.toLowerCase().includes('japan') ||
          q.place.toLowerCase().includes('ryukyu') ||
          q.place.toLowerCase().includes('philippines')
      );
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (it) =>
          it.place.toLowerCase().includes(q) ||
          `m${it.mag.toFixed(1)}`.includes(q) ||
          it.id.toLowerCase().includes(q)
      );
    }

    if (this.counterPillEl) {
      this.counterPillEl.textContent = `${filtered.length.toLocaleString()} QUAKES`;
    }

    // Limit displayed items to top 80 for high rendering performance
    const displayList = filtered.slice(0, 80);

    if (displayList.length === 0) {
      this.listContainerEl.innerHTML = `
        <div class="quake-empty">
          <div>No seismic events matching "${this.searchQuery}"</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:4px;">Try another region or clear filter</div>
        </div>
      `;
      return;
    }

    this.listContainerEl.innerHTML = displayList
      .map((q) => {
        const isLocked = this.lockedQuakeId === q.id;
        const diffMins = Math.max(1, Math.round((Date.now() - q.time) / 60000));
        const timeAgoStr =
          diffMins < 60 ? `${diffMins}m ago` : `${Math.round(diffMins / 60)}h ago`;

        const isTaiwan =
          (q.lat >= 21.0 && q.lat <= 26.0 && q.lon >= 119.0 && q.lon <= 123.5) ||
          q.place.toLowerCase().includes('taiwan');

        const magClass =
          q.mag >= 6.5 ? 'crit' : q.mag >= 5.0 ? 'high' : q.mag >= 4.0 ? 'med' : 'low';

        return `
          <div class="quake-card ${isTaiwan ? 'is-taiwan' : ''} ${isLocked ? 'is-locked' : ''}" data-id="${q.id}">
            <div class="quake-card-head">
              <span class="quake-mag-badge ${magClass}">M ${q.mag.toFixed(1)}</span>
              <span class="quake-place-name" title="${q.place}">${q.place}</span>
              <button class="quake-track-btn" data-id="${q.id}" title="Direct Intercept Epicenter">
                🎯
              </button>
            </div>
            <div class="quake-card-stats">
              <div class="quake-stat-item">
                <span class="stat-k">DEPTH:</span>
                <span class="stat-v ${q.depth < 35 ? 'is-shallow-alert' : ''}">${q.depth.toFixed(1)} km</span>
              </div>
              <div class="quake-stat-item">
                <span class="stat-k">TIME:</span>
                <span class="stat-v">${timeAgoStr}</span>
              </div>
              <div class="quake-stat-item">
                <span class="stat-k">COORD:</span>
                <span class="stat-v">${q.lat.toFixed(2)}°, ${q.lon.toFixed(2)}°</span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    // Bind click events on all cards & target buttons
    this.listContainerEl.querySelectorAll('.quake-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const quake = this.quakes.find((q) => q.id === id);
        if (quake) {
          this.executeIntercept(quake);
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
    this.updateList();
    setTimeout(() => {
      this.searchInputEl?.focus();
    }, 100);
  }

  public hide(): void {
    this.isVisible = false;
    this.panelEl.style.display = 'none';
  }
}
