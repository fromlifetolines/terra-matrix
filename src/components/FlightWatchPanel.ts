import { resolveFlightRouteDetails } from '../globe/FlightTrajectoryHelper';

export interface FlightItem {
  id: string;
  callsign: string;
  icao24: string;
  model: string;
  registration?: string;
  operator?: string;
  category: 'commercial' | 'military' | 'private' | 'business' | string;
  lat: number;
  lng: number;
  alt: number; // metres
  speed_knots: number;
  heading: number;
  squawk: string;
  origin?: string;
  destination?: string;
}

export class FlightWatchPanel {
  private container: HTMLElement;
  private panelEl!: HTMLElement;
  private isVisible: boolean = false;
  private currentFilter: string = 'all';
  private searchQuery: string = '';
  private flights: FlightItem[] = [];
  private onLocateFlight: (flight: FlightItem) => void;
  private onFilterChange?: (filterCategory: string) => void;

  private listContainerEl!: HTMLElement;
  private searchInputEl!: HTMLInputElement;
  private counterPillEl!: HTMLElement;
  private tabButtons: Map<string, HTMLButtonElement> = new Map();
  private lockedFlightId: string | null = null;

  constructor(
    parent: HTMLElement,
    onLocateFlight: (flight: FlightItem) => void,
    onFilterChange?: (filterCategory: string) => void
  ) {
    this.container = parent;
    this.onLocateFlight = onLocateFlight;
    this.onFilterChange = onFilterChange;
    this.render();
  }

  public updateFlights(flights: FlightItem[]): void {
    this.flights = flights.map((f, idx) => ({
      ...f,
      id: f.id || f.icao24 || f.callsign || `fl-${idx}`,
    }));
    if (this.isVisible) {
      this.updateList();
    }
  }

  private render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'flight-watch-panel glass-panel';
    this.panelEl.style.display = 'none';

    this.panelEl.innerHTML = `
      <div class="flight-watch-header">
        <div class="flight-watch-title">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
          </svg>
          <span>AIR RADAR WATCHLIST</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="flight-counter-pill" id="flight-counter-pill">0 RADAR</span>
          <button class="panel-close-btn" id="flight-panel-close">&times;</button>
        </div>
      </div>

      <!-- Search Box with Intercept Action -->
      <div class="flight-search-container">
        <input 
          type="text" 
          id="flight-search-input" 
          class="flight-search-input" 
          placeholder="Enter Callsign (e.g. UIA8709), ICAO24..." 
        />
      </div>

      <!-- Filter Tabs -->
      <div class="flight-filter-tabs">
        <button class="flight-tab-btn active" data-cat="all">ALL</button>
        <button class="flight-tab-btn" data-cat="military">MILITARY</button>
        <button class="flight-tab-btn" data-cat="emergency">SQUAWK 7700</button>
        <button class="flight-tab-btn" data-cat="commercial">COMMERCIAL</button>
      </div>

      <!-- Flight List -->
      <div class="flight-items-list styled-scrollbar" id="flight-items-list">
        <div class="flight-empty">Awaiting ADS-B telemetry...</div>
      </div>
    `;

    this.container.appendChild(this.panelEl);

    // Cache elements
    this.listContainerEl = this.panelEl.querySelector('#flight-items-list') as HTMLElement;
    this.searchInputEl = this.panelEl.querySelector('#flight-search-input') as HTMLInputElement;
    this.counterPillEl = this.panelEl.querySelector('#flight-counter-pill') as HTMLElement;

    // Tab buttons
    this.panelEl.querySelectorAll('.flight-tab-btn').forEach((btn) => {
      const cat = btn.getAttribute('data-cat') || 'all';
      this.tabButtons.set(cat, btn as HTMLButtonElement);
      btn.addEventListener('click', () => {
        this.currentFilter = cat;
        this.tabButtons.forEach((b, c) => b.classList.toggle('active', c === cat));
        this.onFilterChange?.(cat);
        this.updateList();
      });
    });

    // Close button
    this.panelEl.querySelector('#flight-panel-close')?.addEventListener('click', () => {
      this.hide();
    });

    // Search input listener with real-time auto intercept
    this.searchInputEl.addEventListener('input', () => {
      this.searchQuery = this.searchInputEl.value;
      this.updateList();

      const qClean = this.searchQuery.trim().toLowerCase();
      if (qClean.length >= 3) {
        // Find exact match first
        const exactMatch = this.flights.find(
          (f) => f.callsign.toLowerCase() === qClean || f.icao24.toLowerCase() === qClean
        );
        if (exactMatch) {
          this.executeIntercept(exactMatch);
        }
      }
    });

    // Enter key triggers immediate flight intercept to best match
    this.searchInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const qClean = this.searchQuery.trim().toLowerCase();
        if (!qClean) return;

        const matched =
          this.flights.find(
            (f) => f.callsign.toLowerCase() === qClean || f.icao24.toLowerCase() === qClean
          ) ||
          this.flights.find(
            (f) => f.callsign.toLowerCase().includes(qClean) || f.icao24.toLowerCase().includes(qClean)
          );

        if (matched) {
          this.executeIntercept(matched);
        }
      }
    });
  }

  private executeIntercept(flight: FlightItem): void {
    this.lockedFlightId = flight.id;
    this.onLocateFlight(flight);

    // Update locked class on cards
    this.listContainerEl.querySelectorAll('.flight-card').forEach((c) => {
      if (c.getAttribute('data-id') === flight.id) {
        c.classList.add('is-locked');
        c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        c.classList.remove('is-locked');
      }
    });
  }

  private updateList(): void {
    const totalCount = this.flights.length;
    const milCount = this.flights.filter((f) => f.category === 'military').length;
    const emgCount = this.flights.filter(
      (f) => f.squawk === '7700' || f.squawk === '7600' || f.squawk === '7500'
    ).length;

    // Update tab counts
    const allTab = this.tabButtons.get('all');
    if (allTab) allTab.textContent = `ALL (${totalCount.toLocaleString()})`;
    const milTab = this.tabButtons.get('military');
    if (milTab) milTab.textContent = `MILITARY (${milCount})`;
    const emgTab = this.tabButtons.get('emergency');
    if (emgTab) emgTab.textContent = `SQUAWK 7700 (${emgCount})`;

    let filtered = this.flights;

    if (this.currentFilter === 'military') {
      filtered = filtered.filter((f) => f.category === 'military');
    } else if (this.currentFilter === 'emergency') {
      filtered = filtered.filter(
        (f) => f.squawk === '7700' || f.squawk === '7600' || f.squawk === '7500'
      );
    } else if (this.currentFilter === 'commercial') {
      filtered = filtered.filter((f) => f.category === 'commercial');
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.callsign.toLowerCase().includes(q) ||
          f.icao24.toLowerCase().includes(q) ||
          (f.model && f.model.toLowerCase().includes(q)) ||
          (f.operator && f.operator.toLowerCase().includes(q))
      );
    }

    if (this.counterPillEl) {
      this.counterPillEl.textContent = `${filtered.length.toLocaleString()} RADAR`;
    }

    // Limit displayed items to top 100 for high performance
    const displayList = filtered.slice(0, 100);

    if (displayList.length === 0) {
      this.listContainerEl.innerHTML = `
        <div class="flight-empty">
          <div>No aircraft found matching "${this.searchQuery}"</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:4px;">Check callsign or try another flight code</div>
        </div>
      `;
      return;
    }

    this.listContainerEl.innerHTML = displayList
      .map((f) => {
        const altFt = Math.round((f.alt || 0) * 3.28084);
        const isMil = f.category === 'military';
        const isEmg = f.squawk === '7700' || f.squawk === '7600';
        const isLocked = this.lockedFlightId === f.id;
        const route = resolveFlightRouteDetails(f);

        return `
          <div class="flight-card ${isMil ? 'is-mil' : ''} ${isEmg ? 'is-emergency' : ''} ${isLocked ? 'is-locked' : ''}" data-id="${f.id}">
            <div class="flight-card-head">
              <span class="flight-callsign">${f.callsign || f.icao24.toUpperCase()}</span>
              <span class="flight-type-code">${f.model || 'AIRCRAFT'}</span>
              ${isMil ? '<span class="flight-mil-badge">AIR DEFENSE</span>' : ''}
              ${isEmg ? '<span class="flight-emg-badge">EMERGENCY 7700</span>' : ''}
              <button class="flight-track-btn" data-id="${f.id}" title="Direct Intercept & Lock Position">
                🎯
              </button>
            </div>
            <!-- In-flight Route Corridor Summary -->
            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:4px;padding:3px 8px;margin:5px 0;font-family:var(--font-mono);font-size:10px;">
              <span style="font-weight:700;color:#38bdf8;">${route.originIata} <span style="font-size:8.5px;color:rgba(255,255,255,0.5);font-weight:normal;">🛫${route.deptTime}</span></span>
              <span style="color:var(--text-dim);font-size:9px;">✈──${route.progressPct}%──▶</span>
              <span style="font-weight:700;color:#38bdf8;">${route.destIata} <span style="font-size:8.5px;color:#10b981;font-weight:normal;">🛬${route.arrTime}</span></span>
            </div>
            <div class="flight-card-stats">
              <div class="flight-stat-item">
                <span class="stat-k">ALT:</span>
                <span class="stat-v">${altFt.toLocaleString()} ft</span>
              </div>
              <div class="flight-stat-item">
                <span class="stat-k">SPD:</span>
                <span class="stat-v">${Math.round(f.speed_knots || 0)} kts</span>
              </div>
              <div class="flight-stat-item">
                <span class="stat-k">HDG:</span>
                <span class="stat-v">${Math.round(f.heading || 0)}°</span>
              </div>
              <div class="flight-stat-item">
                <span class="stat-k">SQK:</span>
                <span class="stat-v ${isEmg ? 'is-sqk-alert' : ''}">${f.squawk || 'AUTO'}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    // Bind click events on all cards & target buttons
    this.listContainerEl.querySelectorAll('.flight-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const id = card.getAttribute('data-id');
        const flight = this.flights.find((f) => f.id === id);
        if (flight) {
          this.executeIntercept(flight);
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
