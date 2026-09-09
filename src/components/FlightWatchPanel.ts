export interface FlightItem {
  id: string;
  callsign: string;
  icao24: string;
  model: string;
  registration?: string;
  operator?: string;
  category: 'commercial' | 'military' | 'private' | 'business';
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
    this.flights = flights;
    if (this.isVisible) {
      this.updateContent();
    }
  }

  private render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'flight-watch-panel glass-panel';
    this.panelEl.style.display = 'none';

    this.updateContent();
    this.container.appendChild(this.panelEl);
  }

  private updateContent(): void {
    const totalCount = this.flights.length;
    const milCount = this.flights.filter((f) => f.category === 'military').length;
    const emgCount = this.flights.filter(
      (f) => f.squawk === '7700' || f.squawk === '7600' || f.squawk === '7500'
    ).length;

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

    // Limit displayed items to top 100 for high performance
    const displayList = filtered.slice(0, 100);

    this.panelEl.innerHTML = `
      <div class="flight-watch-header">
        <div class="flight-watch-title">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
          </svg>
          <span>AIR RADAR WATCHLIST</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="flight-counter-pill">${filtered.length.toLocaleString()} RADAR</span>
          <button class="panel-close-btn" id="flight-panel-close">&times;</button>
        </div>
      </div>

      <!-- Search Box -->
      <div class="flight-search-container">
        <input 
          type="text" 
          id="flight-search-input" 
          class="flight-search-input" 
          placeholder="Filter Callsign, Model, ICAO24..." 
          value="${this.searchQuery}"
        />
      </div>

      <!-- Filter Tabs -->
      <div class="flight-filter-tabs">
        <button class="flight-tab-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-cat="all">ALL (${totalCount.toLocaleString()})</button>
        <button class="flight-tab-btn ${this.currentFilter === 'military' ? 'active' : ''}" data-cat="military">MILITARY (${milCount})</button>
        <button class="flight-tab-btn ${this.currentFilter === 'emergency' ? 'active' : ''}" data-cat="emergency">SQUAWK 7700 (${emgCount})</button>
        <button class="flight-tab-btn ${this.currentFilter === 'commercial' ? 'active' : ''}" data-cat="commercial">COMMERCIAL</button>
      </div>

      <!-- Flight List -->
      <div class="flight-items-list styled-scrollbar">
        ${
          displayList.length === 0
            ? '<div class="flight-empty">No aircraft matched query</div>'
            : displayList
                .map((f) => {
                  const altFt = Math.round(f.alt * 3.28084);
                  const isMil = f.category === 'military';
                  const isEmg = f.squawk === '7700' || f.squawk === '7600';
                  return `
            <div class="flight-card ${isMil ? 'is-mil' : ''} ${isEmg ? 'is-emergency' : ''}" data-id="${f.id}">
              <div class="flight-card-head">
                <span class="flight-callsign">${f.callsign || f.icao24.toUpperCase()}</span>
                <span class="flight-type-code">${f.model || 'AC'}</span>
                ${isMil ? '<span class="flight-mil-badge">AIR DEFENSE</span>' : ''}
                ${isEmg ? '<span class="flight-emg-badge">EMERGENCY 7700</span>' : ''}
                <button class="flight-track-btn" data-id="${f.id}" title="Focus on Flight">
                  🎯
                </button>
              </div>
              <div class="flight-card-stats">
                <div class="flight-stat-item">
                  <span class="stat-k">ALT:</span>
                  <span class="stat-v">${altFt.toLocaleString()} ft</span>
                </div>
                <div class="flight-stat-item">
                  <span class="stat-k">SPD:</span>
                  <span class="stat-v">${Math.round(f.speed_knots)} kts</span>
                </div>
                <div class="flight-stat-item">
                  <span class="stat-k">HDG:</span>
                  <span class="stat-v">${Math.round(f.heading)}°</span>
                </div>
                <div class="flight-stat-item">
                  <span class="stat-k">SQK:</span>
                  <span class="stat-v ${isEmg ? 'is-sqk-alert' : ''}">${f.squawk || 'AUTO'}</span>
                </div>
              </div>
            </div>
          `;
                })
                .join('')
        }
      </div>
    `;

    // Listeners
    this.panelEl.querySelector('#flight-panel-close')?.addEventListener('click', () => {
      this.hide();
    });

    const searchInput = this.panelEl.querySelector('#flight-search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target as HTMLInputElement).value;
        this.updateContent();
        // Re-focus and preserve cursor
        const nextInput = this.panelEl.querySelector('#flight-search-input') as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(this.searchQuery.length, this.searchQuery.length);
        }
      });
    }

    const tabs = this.panelEl.querySelectorAll('.flight-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        this.currentFilter = (e.currentTarget as HTMLElement).getAttribute('data-cat') || 'all';
        this.onFilterChange?.(this.currentFilter);
        this.updateContent();
      });
    });

    const trackBtns = this.panelEl.querySelectorAll('.flight-track-btn');
    trackBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const flight = this.flights.find((f) => f.id === id);
        if (flight) {
          this.onLocateFlight(flight);
        }
      });
    });

    const cards = this.panelEl.querySelectorAll('.flight-card');
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const flight = this.flights.find((f) => f.id === id);
        if (flight) {
          this.onLocateFlight(flight);
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
