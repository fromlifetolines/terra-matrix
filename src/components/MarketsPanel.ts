export interface MarketQuote {
  symbol: string;
  name: string;
  category: 'defense' | 'energy' | 'commodities' | 'crypto' | 'macro';
  price: string;
  change: string;
  isUp: boolean;
  sparkline: number[];
}

export const INITIAL_MARKETS_DATA: MarketQuote[] = [
  // Defense Equities
  {
    symbol: 'LMT',
    name: 'Lockheed Martin Corp',
    category: 'defense',
    price: '$468.20',
    change: '+1.82%',
    isUp: true,
    sparkline: [460, 461, 463, 462, 465, 466, 468.2],
  },
  {
    symbol: 'RTX',
    name: 'RTX (Raytheon)',
    category: 'defense',
    price: '$124.50',
    change: '+2.35%',
    isUp: true,
    sparkline: [121, 122, 122.5, 123, 123.8, 124.5],
  },
  {
    symbol: 'NOC',
    name: 'Northrop Grumman',
    category: 'defense',
    price: '$495.80',
    change: '+1.18%',
    isUp: true,
    sparkline: [488, 490, 492, 491, 494, 495.8],
  },
  {
    symbol: 'GD',
    name: 'General Dynamics',
    category: 'defense',
    price: '$304.10',
    change: '+0.88%',
    isUp: true,
    sparkline: [301, 302, 302.5, 303, 303.8, 304.1],
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    category: 'defense',
    price: '$118.40',
    change: '+4.85%',
    isUp: true,
    sparkline: [111, 112, 114, 115.5, 117, 118.4],
  },
  {
    symbol: 'RHM',
    name: 'Rheinmetall AG',
    category: 'defense',
    price: '€542.00',
    change: '+3.14%',
    isUp: true,
    sparkline: [520, 525, 530, 532, 538, 542],
  },

  // Energy
  {
    symbol: 'BRENT',
    name: 'Brent Crude Oil',
    category: 'energy',
    price: '$76.85/bbl',
    change: '+1.42%',
    isUp: true,
    sparkline: [75.2, 75.5, 76.1, 75.8, 76.4, 76.85],
  },
  {
    symbol: 'WTI',
    name: 'WTI Light Sweet Crude',
    category: 'energy',
    price: '$73.40/bbl',
    change: '+1.58%',
    isUp: true,
    sparkline: [71.8, 72.2, 72.5, 72.9, 73.1, 73.4],
  },
  {
    symbol: 'NATGAS',
    name: 'Henry Hub Natural Gas',
    category: 'energy',
    price: '$2.85/MMBtu',
    change: '-0.78%',
    isUp: false,
    sparkline: [2.92, 2.9, 2.88, 2.87, 2.86, 2.85],
  },
  {
    symbol: 'URANIUM',
    name: 'U3O8 Yellowcake',
    category: 'energy',
    price: '$82.50/lb',
    change: '+2.10%',
    isUp: true,
    sparkline: [79.5, 80.2, 80.8, 81.4, 82.0, 82.5],
  },

  // Commodities
  {
    symbol: 'GOLD',
    name: 'Gold Spot (XAU/USD)',
    category: 'commodities',
    price: '$2,895.40/oz',
    change: '+0.78%',
    isUp: true,
    sparkline: [2870, 2875, 2882, 2880, 2890, 2895.4],
  },
  {
    symbol: 'SILVER',
    name: 'Silver Spot (XAG/USD)',
    category: 'commodities',
    price: '$32.45/oz',
    change: '+1.52%',
    isUp: true,
    sparkline: [31.8, 32.0, 32.1, 32.2, 32.35, 32.45],
  },
  {
    symbol: 'COPPER',
    name: 'COMEX Copper',
    category: 'commodities',
    price: '$4.28/lb',
    change: '-0.38%',
    isUp: false,
    sparkline: [4.32, 4.31, 4.3, 4.29, 4.28, 4.28],
  },

  // Crypto
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'crypto',
    price: '$78,450.00',
    change: '+2.42%',
    isUp: true,
    sparkline: [76200, 76800, 77400, 77100, 77900, 78450],
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    category: 'crypto',
    price: '$2,548.20',
    change: '+3.15%',
    isUp: true,
    sparkline: [2460, 2480, 2500, 2520, 2535, 2548.2],
  },
  {
    symbol: 'SOL/USD',
    name: 'Solana',
    category: 'crypto',
    price: '$189.50',
    change: '+5.82%',
    isUp: true,
    sparkline: [178, 181, 184, 185, 188, 189.5],
  },

  // Macro & Currencies
  {
    symbol: 'DXY',
    name: 'US Dollar Index',
    category: 'macro',
    price: '104.25',
    change: '-0.15%',
    isUp: false,
    sparkline: [104.5, 104.4, 104.35, 104.3, 104.28, 104.25],
  },
  {
    symbol: 'USD/TWD',
    name: 'US Dollar / New Taiwan Dollar',
    category: 'macro',
    price: '32.185',
    change: '+0.08%',
    isUp: true,
    sparkline: [32.14, 32.15, 32.16, 32.17, 32.18, 32.185],
  },
  {
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    category: 'macro',
    price: '154.60',
    change: '-0.24%',
    isUp: false,
    sparkline: [155.2, 155.0, 154.8, 154.7, 154.65, 154.6],
  },
  {
    symbol: 'US10Y',
    name: 'US 10-Year Treasury Yield',
    category: 'macro',
    price: '4.382%',
    change: '+0.04%',
    isUp: true,
    sparkline: [4.33, 4.34, 4.35, 4.36, 4.37, 4.382],
  },
];

export class MarketsPanel {
  private container: HTMLElement;
  private panelEl!: HTMLElement;
  private isVisible: boolean = false;
  private currentTab: string = 'defense';
  private quotes: MarketQuote[] = [...INITIAL_MARKETS_DATA];

  constructor(parent: HTMLElement) {
    this.container = parent;
    this.render();
  }

  private render(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = 'markets-panel glass-panel';
    this.panelEl.style.display = 'none';

    this.updateContent();
    this.container.appendChild(this.panelEl);
  }

  private generateSparklineSvg(points: number[], isUp: boolean): string {
    const width = 60;
    const height = 18;
    if (points.length < 2) return '';
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const color = isUp ? 'var(--accent-emerald)' : 'var(--accent-red)';
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="market-sparkline">
        <polyline fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" points="${coords.join(' ')}" />
      </svg>
    `;
  }

  private updateContent(): void {
    const filtered =
      this.currentTab === 'all'
        ? this.quotes
        : this.quotes.filter((q) => q.category === this.currentTab);

    this.panelEl.innerHTML = `
      <div class="markets-header">
        <div class="markets-title">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-emerald)" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span>MACRO & DEFENSE MARKETS</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="live-pill-tag">LIVE FEED</span>
          <button class="panel-close-btn" id="markets-panel-close">&times;</button>
        </div>
      </div>

      <div class="markets-tabs">
        <button class="markets-tab-btn ${this.currentTab === 'defense' ? 'active' : ''}" data-cat="defense">DEFENSE</button>
        <button class="markets-tab-btn ${this.currentTab === 'energy' ? 'active' : ''}" data-cat="energy">ENERGY</button>
        <button class="markets-tab-btn ${this.currentTab === 'commodities' ? 'active' : ''}" data-cat="commodities">COMMODITIES</button>
        <button class="markets-tab-btn ${this.currentTab === 'crypto' ? 'active' : ''}" data-cat="crypto">CRYPTO</button>
        <button class="markets-tab-btn ${this.currentTab === 'macro' ? 'active' : ''}" data-cat="macro">MACRO / FX</button>
        <button class="markets-tab-btn ${this.currentTab === 'all' ? 'active' : ''}" data-cat="all">ALL</button>
      </div>

      <div class="markets-table styled-scrollbar">
        ${filtered
          .map(
            (q) => `
          <div class="market-row">
            <div class="market-cell-name">
              <div class="market-symbol">${q.symbol}</div>
              <div class="market-fullname">${q.name}</div>
            </div>
            <div class="market-cell-spark">
              ${this.generateSparklineSvg(q.sparkline, q.isUp)}
            </div>
            <div class="market-cell-price">
              <div class="market-price-val">${q.price}</div>
              <div class="market-change-val ${q.isUp ? 'is-up' : 'is-down'}">
                ${q.isUp ? '▲' : '▼'} ${q.change}
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    // Listeners
    this.panelEl.querySelector('#markets-panel-close')?.addEventListener('click', () => {
      this.hide();
    });

    const tabs = this.panelEl.querySelectorAll('.markets-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        this.currentTab = (e.currentTarget as HTMLElement).getAttribute('data-cat') || 'defense';
        this.updateContent();
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
