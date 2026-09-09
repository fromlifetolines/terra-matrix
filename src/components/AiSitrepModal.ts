export class AiSitrepModal {
  private container: HTMLElement;
  private modalEl!: HTMLElement;
  private isVisible: boolean = false;

  constructor(parent: HTMLElement) {
    this.container = parent;
    this.render();
  }

  private render(): void {
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'ai-sitrep-modal-backdrop';
    this.modalEl.style.display = 'none';

    this.container.appendChild(this.modalEl);
  }

  public show(): void {
    const zuluTime = new Date().toISOString().substring(0, 19).replace('T', ' ') + ' UTC';
    const tpeTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Taipei',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }) + ' TPE';

    this.modalEl.innerHTML = `
      <div class="ai-sitrep-dialog glass-panel">
        <div class="sitrep-dialog-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <span class="sitrep-main-title">OSIRIS AI // MULTI-DOMAIN TACTICAL SITREP</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="defcon-badge defcon-3">DEFCON 3 // ELEVATED</span>
            <button class="panel-close-btn" id="sitrep-dialog-close">&times;</button>
          </div>
        </div>

        <div class="sitrep-meta-bar">
          <div>CLASSIFICATION: <span style="color:var(--accent-cyan);">SECRET // NOFORN / REL TO OSIRIS HQ</span></div>
          <div>TIMESTAMP: <span style="color:var(--text-primary);">${zuluTime} (${tpeTime})</span></div>
          <div>SYNTHESIZER: <span style="color:var(--accent-emerald);">TERRA MATRIX NEURAL INTEL CORE V.4.1</span></div>
        </div>

        <div class="sitrep-body styled-scrollbar">
          <div class="sitrep-section">
            <div class="sitrep-sec-title">1. EXECUTIVE THREAT SYNTHESIS</div>
            <p>
              Planetary conflict matrices exhibit clustered kinetic friction in three primary strategic theaters:
              <strong>1) Taiwan Strait / First Island Chain</strong>, 
              <strong>2) Eastern European Frontline (Ukraine / Black Sea)</strong>, and 
              <strong>3) Bab el-Mandeb / Southern Red Sea Maritime Corridor</strong>. 
              Global civil aerospace networks maintain 7,000+ simultaneous tracks with zero active squawk 7500 hijack transmissions.
            </p>
          </div>

          <div class="sitrep-section">
            <div class="sitrep-sec-title">2. THEATER BREAKDOWN & KINETIC POSTURE</div>
            <ul class="sitrep-list">
              <li>
                <strong>🇹🇼 Taiwan Strait Sector:</strong> Multiple PLA J-16 strike packages and Y-8 ASW aircraft conducted cross-median line ADIZ penetrations in the southwest sector. ROCAF combat air patrols (CAP) and shore-based missile batteries active in tracking mode.
              </li>
              <li>
                <strong>🇺🇦 Ukraine / Eastern Front:</strong> High-density UMPK glide-bomb sorties and motorized assault operations along Pokrovsk-Kupiansk line. Air defense attrition continues with high intercept rates reported on Shahed UAV swarms.
              </li>
              <li>
                <strong>🌊 Red Sea / Bab el-Mandeb:</strong> Houthi anti-ship ballistic missile and drone boat threats persist against Red Sea shipping; commercial traffic rerouting around Cape of Good Hope at ~54% of normal throughput.
              </li>
            </ul>
          </div>

          <div class="sitrep-section">
            <div class="sitrep-sec-title">3. SPACE & ORBITAL DOMAIN TELEMETRY</div>
            <ul class="sitrep-list">
              <li>
                <strong>Active Tracked Orbiters:</strong> 1,336+ payloads in Low Earth Orbit (LEO) and Geostationary Orbit (GEO).
              </li>
              <li>
                <strong>ISS Real-Time Status:</strong> Orbiting at altitude 408.2 km, inclination 51.64°, orbital velocity 7.66 km/s, period 92.8 min. 24/7 4K Sen video telemetry downlink nominal.
              </li>
              <li>
                <strong>Space Weather & Solar Flux:</strong> Kp0 (Quiet geomagnetic field). Solar wind speed 384 km/s. Zero radio blackout risk across HF comms corridors.
              </li>
            </ul>
          </div>

          <div class="sitrep-section">
            <div class="sitrep-sec-title">4. SEISMIC, CLIMATE & CRITICAL INFRASTRUCTURE</div>
            <ul class="sitrep-list">
              <li>
                <strong>Seismic Hazards:</strong> USGS automated arrays recorded M6.2 offshore Tohoku, Japan (depth 22km) and M5.4 Hualien County, Taiwan (depth 18km). Subduction zone fault stress models within expected confidence intervals.
              </li>
              <li>
                <strong>Cyber & Financial Backbone:</strong> Global interbank BGP routing stability at 99.98%. Defense equity basket (LMT, RTX, GD, NOC, PLTR) trading at +1.8% daily median delta.
              </li>
            </ul>
          </div>

          <div class="sitrep-section">
            <div class="sitrep-sec-title">5. TACTICAL RECOMMENDATIONS & WATCH POINTS</div>
            <p>
              Maintain heightened radar surveillance on Western Pacific military airlift corridors. Keep automated alerts engaged on Bab el-Mandeb maritime corridors. Monitor NOAA space weather telemetry for any sudden Coronal Mass Ejection (CME) shockwaves.
            </p>
          </div>
        </div>

        <div class="sitrep-dialog-footer">
          <button class="matrix-btn" id="sitrep-copy-btn">📋 COPY SITREP TO CLIPBOARD</button>
          <button class="matrix-btn" id="sitrep-print-btn">🖨️ PRINT BRIEFING</button>
          <button class="matrix-btn" id="sitrep-close-btn" style="margin-left:auto;">✕ CLOSE</button>
        </div>
      </div>
    `;

    this.isVisible = true;
    this.modalEl.style.display = 'flex';

    // Listeners
    this.modalEl.querySelector('#sitrep-dialog-close')?.addEventListener('click', () => {
      this.hide();
    });
    this.modalEl.querySelector('#sitrep-close-btn')?.addEventListener('click', () => {
      this.hide();
    });

    this.modalEl.querySelector('#sitrep-copy-btn')?.addEventListener('click', (e) => {
      const btn = e.currentTarget as HTMLElement;
      const text = this.getSitrepPlainText();
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✅ COPIED!';
        setTimeout(() => {
          btn.textContent = orig;
        }, 2000);
      });
    });

    this.modalEl.querySelector('#sitrep-print-btn')?.addEventListener('click', () => {
      window.print();
    });
  }

  private getSitrepPlainText(): string {
    const body = this.modalEl.querySelector('.sitrep-body');
    return body ? (body as HTMLElement).innerText : '';
  }

  public hide(): void {
    this.isVisible = false;
    this.modalEl.style.display = 'none';
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }
}
