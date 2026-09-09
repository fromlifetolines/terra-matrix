/**
 * MarketsPanel.ts
 *
 * OSIRIS Markets & Defense Intelligence Terminal (Screenshot 5 Match):
 * - Market Breadth indicator (16▲ / 12▼ of 28)
 * - Real-time Space Weather Kp index telemetry
 * - AI Overview situational briefing trigger
 * - Defense equities (RTX, LMT, NOC, GD, BA, LHX, PLTR) with SVG sparkline charts
 * - Energy & Indices tabs
 */

export interface MarketQuote {
  symbol: string;
  name: string;
  category: 'defense' | 'indices' | 'energy';
  price: string;
  change: string;
  isUp: boolean;
  sparkline: number[];
}

export const OSIRIS_DEFENSE_QUOTES: MarketQuote[] = [
  {
    symbol: 'RTX',
    name: 'RTX (Raytheon)',
    category: 'defense',
    price: '198.81',
    change: '-0.99%',
    isUp: false,
    sparkline: [202, 201, 200, 199.5, 199.2, 198.81],
  },
  {
    symbol: 'LMT',
    name: 'Lockheed Martin',
    category: 'defense',
    price: '536.15',
    change: '+2.07%',
    isUp: true,
    sparkline: [525, 528, 530, 532, 534, 536.15],
  },
  {
    symbol: 'NOC',
    name: 'Northrop Grumman',
    category: 'defense',
    price: '518.58',
    change: '+0.70%',
    isUp: true,
    sparkline: [514, 515, 516, 517, 517.5, 518.58],
  },
  {
    symbol: 'GD',
    name: 'General Dynamics',
    category: 'defense',
    price: '356.58',
    change: '-0.78%',
    isUp: false,
    sparkline: [360, 359, 358, 357.5, 357, 356.58],
  },
  {
    symbol: 'BA',
    name: 'Boeing Defense',
    category: 'defense',
    price: '210.73',
    change: '-0.72%',
    isUp: false,
    sparkline: [213, 212, 211.5, 211, 210.9, 210.73],
  },
  {
    symbol: 'LHX',
    name: 'L3Harris Technologies',
    category: 'defense',
    price: '255.74',
    change: '-0.28%',
    isUp: false,
    sparkline: [257, 256.5, 256.2, 256, 255.9, 255.74],
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    category: 'defense',
    price: '170.30',
    change: '-2.31%',
    isUp: false,
    sparkline: [175, 174, 173, 172.5, 171.2, 170.3],
  },
];

export const OSIRIS_INDICES_QUOTES: MarketQuote[] = [
  { symbol: 'SPX', name: 'S&P 500', category: 'indices', price: '5,864.20', change: '+0.42%', isUp: true, sparkline: [5840, 5845, 5850, 5855, 5864.2] },
  { symbol: 'NDX', name: 'Nasdaq 100', category: 'indices', price: '20,410.80', change: '+0.68%', isUp: true, sparkline: [20300, 20350, 20380, 20410.8] },
  { symbol: 'TWII', name: 'Taiwan TAIEX', category: 'indices', price: '23,450.10', change: '+1.24%', isUp: true, sparkline: [23200, 23300, 23380, 23450.1] },
  { symbol: 'VIX', name: 'CBOE Volatility', category: 'indices', price: '14.82', change: '-4.12%', isUp: false, sparkline: [15.8, 15.4, 15.1, 14.82] },
  { symbol: 'DXY', name: 'US Dollar Index', category: 'indices', price: '103.45', change: '+0.15%', isUp: true, sparkline: [103.2, 103.3, 103.4, 103.45] },
];

export const OSIRIS_ENERGY_QUOTES: MarketQuote[] = [
  { symbol: 'BRENT', name: 'Brent Crude', category: 'energy', price: '$77.20/bbl', change: '+1.15%', isUp: true, sparkline: [76.1, 76.4, 76.8, 77.2] },
  { symbol: 'WTI', name: 'WTI Light Sweet', category: 'energy', price: '$73.85/bbl', change: '+1.42%', isUp: true, sparkline: [72.8, 73.1, 73.5, 73.85] },
  { symbol: 'NATGAS', name: 'Henry Hub Gas', category: 'energy', price: '$2.88/MMBtu', change: '-0.65%', isUp: false, sparkline: [2.92, 2.90, 2.89, 2.88] },
];

export class MarketsPanel {
  private container: HTMLElement;
  private panelEl!: HTMLElement;
  private isVisible = false;
  private activeCategory: 'defense' | 'indices' | 'energy' = 'defense';
  private onTriggerAiOverview?: () => void;

  constructor(parentElement: HTMLElement, options?: { onTriggerAiOverview?: () => void }) {
    this.container = parentElement;
    this.onTriggerAiOverview = options?.onTriggerAiOverview;
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

  public render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'markets-floating-panel';
    this.panelEl.style.display = 'none';

    this.panelEl.innerHTML = `
      <!-- Header -->
      <div class="markets-header">
        <div class="markets-title-group">
          <span class="markets-icon">📊</span>
          <span class="markets-title">MARKETS & INTEL</span>
        </div>
        <div class="markets-status-group">
          <span class="markets-live-tag">LIVE</span>
          <span class="markets-timestamp">12m ago</span>
          <span class="markets-dot"></span>
          <button class="markets-btn close-btn" id="markets-close-btn" title="Close Panel">✕</button>
        </div>
      </div>

      <!-- Breadth Bar Strip -->
      <div class="markets-breadth-card">
        <div class="breadth-header">
          <span>BREADTH</span>
          <span class="breadth-counts"><b style="color:var(--accent-emerald);">16▲</b> / <b style="color:var(--accent-red);">12▼</b> of 28</span>
        </div>
        <div class="breadth-bar-track">
          <div class="breadth-bar-fill" style="width: 57%;"></div>
        </div>
        <div class="breadth-tickers">
          <span style="color:var(--accent-emerald);">▲ Corn +3.57%</span>
          <span style="color:var(--accent-red);">▼ PLTR -2.31%</span>
        </div>
      </div>

      <!-- Space Weather Telemetry Box -->
      <div class="space-weather-card">
        <div class="sw-title-row">
          <span class="sw-icon">⚡</span>
          <span class="sw-title">SPACE WEATHER</span>
          <span class="sw-val">Kp 0 — Quiet</span>
        </div>
        <div class="sw-sub">Latest flare: C3.4 · Solar Wind: 385 km/s</div>
      </div>

      <!-- AI Overview Button -->
      <button class="ai-overview-btn" id="btn-market-ai-overview">
        <span>✨</span> AI OVERVIEW
      </button>

      <!-- Category Tabs -->
      <div class="markets-tabs">
        <button class="mkt-tab ${this.activeCategory === 'indices' ? 'active' : ''}" data-cat="indices">
          📈 INDICES 5
        </button>
        <button class="mkt-tab ${this.activeCategory === 'defense' ? 'active' : ''}" data-cat="defense">
          🛡️ DEFENSE 7
        </button>
        <button class="mkt-tab ${this.activeCategory === 'energy' ? 'active' : ''}" data-cat="energy">
          🛢️ ENERGY 3
        </button>
      </div>

      <!-- Quotes List Header -->
      <div class="quotes-substrip">
        <span>● SESSION CLOSED</span>
        <span>⇅ DEFAULT</span>
      </div>

      <!-- Quotes List Container -->
      <div class="markets-quotes-list styled-scrollbar" id="quotes-list-container">
        <!-- Injected via renderQuotes -->
      </div>
    `;

    this.container.appendChild(this.panelEl);

    // Event listeners
    this.panelEl.querySelector('#markets-close-btn')?.addEventListener('click', () => {
      this.setVisible(false);
    });

    this.panelEl.querySelector('#btn-market-ai-overview')?.addEventListener('click', () => {
      this.onTriggerAiOverview?.();
    });

    const tabs = this.panelEl.querySelectorAll<HTMLButtonElement>('.mkt-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeCategory = tab.getAttribute('data-cat') as any;
        this.renderQuotes();
      });
    });

    this.renderQuotes();
  }

  private renderQuotes(): void {
    const container = this.panelEl.querySelector('#quotes-list-container');
    if (!container) return;

    let quotes: MarketQuote[] = OSIRIS_DEFENSE_QUOTES;
    if (this.activeCategory === 'indices') quotes = OSIRIS_INDICES_QUOTES;
    if (this.activeCategory === 'energy') quotes = OSIRIS_ENERGY_QUOTES;

    container.innerHTML = quotes
      .map((q) => {
        const sparklineSvg = this.generateSparkline(q.sparkline, q.isUp);
        return `
          <div class="market-row">
            <div class="market-symbol-box">
              <span class="mkt-symbol">${q.symbol}</span>
            </div>
            <div class="market-sparkline-box">
              ${sparklineSvg}
            </div>
            <div class="market-price-box">
              <span class="mkt-price">${q.price}</span>
              <span class="mkt-change ${q.isUp ? 'up' : 'down'}">${q.isUp ? '↗ ' : '↘ '}${q.change}</span>
            </div>
          </div>
        `;
      })
      .join('');
  }

  private generateSparkline(data: number[], isUp: boolean): string {
    if (!data || data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 64;
    const height = 18;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const color = isUp ? '#10b981' : '#ef4444';
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
        <polyline
          points="${points.join(' ')}"
          stroke="${color}"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
  }
}
