import './styles/main.css';
import { GlobeScene } from './globe/GlobeScene';
import { StreamMatrix } from './matrix/StreamMatrix';
import { SpaceCamPanel } from './components/SpaceCam';
import { SpaceTrackingPanel, type SatelliteSublayerState } from './components/SpaceTrackingPanel';
import { SatelliteCardModal } from './components/SatelliteCard';
import { RegionPresetsPanel, type RegionPreset } from './components/RegionPresets';
import { IntelFeedPanel } from './components/IntelFeedPanel';
import { MarketsPanel } from './components/MarketsPanel';
import { FlightWatchPanel, type FlightItem } from './components/FlightWatchPanel';
import { AiSitrepModal } from './components/AiSitrepModal';
import { SearchBar, type SearchResult } from './components/SearchBar';
import { MeasureTool, type MeasureResult } from './components/MeasureTool';
import { DopplerRadarLegend } from './components/DopplerRadarLegend';
import { CctvExpandedModal } from './components/CctvExpandedModal';
import { DirectionsPanel } from './components/DirectionsPanel';
import { OsintPanel } from './components/OsintPanel';
import type { EarthquakeItem } from './globe/layers/EarthquakeLayer';
import type { GeoIncident } from './data/incidents-news';

class TerraMatrixApp {
  private globeScene!: GlobeScene;
  private streamMatrix!: StreamMatrix;
  private spaceCamPanel!: SpaceCamPanel;
  private spaceTrackingPanel!: SpaceTrackingPanel;
  private satelliteCardModal?: SatelliteCardModal;

  // Osiris Phase 2 & 3 Tactical Modules
  private regionPresets!: RegionPresetsPanel;
  private intelFeedPanel!: IntelFeedPanel;
  private marketsPanel!: MarketsPanel;
  private flightWatchPanel!: FlightWatchPanel;
  private aiSitrepModal!: AiSitrepModal;
  private searchBar!: SearchBar;
  private measureTool!: MeasureTool;
  private dopplerLegend!: DopplerRadarLegend;
  private cctvExpandedModal!: CctvExpandedModal;
  private directionsPanel!: DirectionsPanel;
  private osintPanel!: OsintPanel;

  private autoRotate = false;

  constructor() {
    try {
      this.initLayout();
    } catch (e) {
      console.error('[TerraMatrixApp] Layout initialization failed:', e);
    }

    try {
      this.initGlobe();
    } catch (e) {
      console.error('[TerraMatrixApp] Globe initialization failed:', e);
    }

    try {
      this.initMatrix();
    } catch (e) {
      console.error('[TerraMatrixApp] Matrix initialization failed:', e);
    }

    try {
      this.initClock();
      this.initHeaderActions();
      this.initRails();
      this.initPanels();
    } catch (e) {
      console.error('[TerraMatrixApp] Controls initialization failed:', e);
    }
  }

  private initLayout(): void {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    appEl.innerHTML = `
      <!-- Top Osiris Tactical Header -->
      <header class="terra-header">
        <div class="header-left">
          <div class="brand-badge">
            <span class="status-dot-emerald"></span>
            STATUS: LIVE
          </div>
          <div class="brand-title" style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>TERRA MATRIX</span>
          </div>
          <div class="brand-subtitle">// SITUATION INTELLIGENCE COMMAND <span style="color:var(--accent-cyan);font-weight:700;">V.4.1</span></div>
        </div>

        <!-- Global Search Bar Container -->
        <div class="header-search" id="header-search-container"></div>

        <div class="header-center">
          <div class="header-metric">
            <span>LAYERS:</span>
            <span class="metric-val" style="color:var(--accent-cyan);">26 ACTIVE</span>
          </div>
          <div class="header-metric">
            <span>ENTITIES:</span>
            <span class="metric-val" style="color:var(--accent-emerald);">47,861+</span>
          </div>
          <div class="header-metric">
            <span>SOLAR:</span>
            <span class="metric-val" style="color:var(--accent-amber);">Kp0 // QUIET</span>
          </div>
        </div>

        <div class="header-right">
          <button id="btn-ai-sitrep" class="header-btn" style="border-color:rgba(6,182,212,0.5);color:var(--accent-cyan);" title="Generate AI Multi-Domain SITREP Briefing">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>
            AI SITREP
          </button>
          <button id="btn-auto-rotate" class="header-btn" title="Toggle Earth Auto-Rotation">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            AUTO ROTATE
          </button>
          <button id="btn-reset-view" class="header-btn" title="Reset Camera Perspective">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
            RESET
          </button>
          <div class="tpe-clock">
            <span id="zulu-clock" class="clock-zulu">ZULU 00:00:00 UTC</span>
            <span class="clock-divider">|</span>
            <span id="tpe-clock" class="clock-local">0000-00-00 00:00:00 TPE</span>
          </div>
        </div>
      </header>

      <!-- Workspace: 3D Globe + Left & Right Rails + Floating Panels & Bottom Stream Matrix -->
      <main class="terra-workspace">
        <section class="globe-wrapper" id="globe-wrapper">
          <div id="globe-container"></div>

          <!-- Left Vertical Category Rail (Osiris Domain Navigation) -->
          <div class="left-category-rail">
            <button class="category-rail-btn active" id="cat-btn-theaters" title="Strategic Regional Theaters & Hotspots">
              <span class="category-rail-icon">🎯</span>
              <span>THEATERS</span>
            </button>
            <button class="category-rail-btn active" id="cat-btn-air" title="Live ADS-B Radar Air Traffic">
              <span class="category-rail-icon">✈️</span>
              <span>AIR (7K+)</span>
            </button>
            <button class="category-rail-btn active" id="cat-btn-sea" title="Strategic Maritime Corridors & Ocean Currents">
              <span class="category-rail-icon">🚢</span>
              <span>SEA & CURR</span>
            </button>
            <button class="category-rail-btn active" id="cat-btn-space" title="Space Tracking & Orbiting Satellites">
              <span class="category-rail-icon">🛰️</span>
              <span>SPACE (1.3K)</span>
            </button>
            <button class="category-rail-btn active" id="cat-btn-cctv" title="Global CCTV Surveillance Network">
              <span class="category-rail-icon">📹</span>
              <span>CCTV</span>
            </button>
            <button class="category-rail-btn active" id="cat-btn-weather" title="Global Severe Weather & Cyclones">
              <span class="category-rail-icon">🌪️</span>
              <span>WEATHER</span>
            </button>
            <button class="category-rail-btn active" id="cat-btn-conflicts" title="Global Warzone Flashpoints">
              <span class="category-rail-icon">⚠️</span>
              <span>WARZONES</span>
            </button>
            <button class="category-rail-btn active" id="cat-btn-cyber" title="Cyber Threat Telemetry">
              <span class="category-rail-icon">⚡</span>
              <span>CYBER</span>
            </button>
          </div>

          <!-- Right Tactical Action Rail -->
          <div class="right-tactical-rail">
            <button class="tactical-rail-btn active" id="rail-btn-3d" title="3D Spherical Earth Globe">
              <span>🌐</span> 3D GLOBE
            </button>
            <button class="tactical-rail-btn" id="rail-btn-2d" title="2D Mercator Flat Map">
              <span>🗺️</span> 2D FLAT
            </button>
            <button class="tactical-rail-btn active" id="rail-btn-map" title="Tactical Dark Vector Map">
              <span>🌙</span> MAP
            </button>
            <button class="tactical-rail-btn" id="rail-btn-sat" title="NASA/ArcGIS Satellite Earth">
              <span>🛰️</span> SAT
            </button>
            <div class="tactical-rail-divider"></div>
            <button class="tactical-rail-btn" id="rail-btn-recon" title="Osiris 20-in-1 Recon & Cyber Threat Suite">
              <span>🛡️</span> RECON
            </button>
            <button class="tactical-rail-btn" id="rail-btn-route" title="Tactical Directions & Turn-by-Turn Navigation">
              <span>🛣️</span> ROUTE
            </button>
            <button class="tactical-rail-btn" id="rail-btn-intel" title="Toggle Live Intel & SIGINT Feed">
              <span>🚨</span> INTEL FEED
            </button>
            <button class="tactical-rail-btn" id="rail-btn-markets" title="Toggle Defense & Macro Markets">
              <span>📈</span> MARKETS
            </button>
            <button class="tactical-rail-btn" id="rail-btn-flight-radar" title="Open Air Radar Flight Watchlist">
              <span>✈️</span> FLIGHT WATCH
            </button>
            <button class="tactical-rail-btn" id="rail-btn-measure" title="Geodesic Great-Circle Distance Ruler">
              <span>📐</span> MEASURE
            </button>
            <button class="tactical-rail-btn active" id="rail-btn-radar" title="Toggle Weather Doppler Radar & dBZ Scale">
              <span>📡</span> DOPPLER
            </button>
            <button class="tactical-rail-btn active" id="rail-btn-currents" title="Toggle Global Ocean Currents">
              <span>🌊</span> CURRENTS
            </button>
            <button class="tactical-rail-btn active" id="rail-btn-mil-bases" title="Toggle Global Military Bases">
              <span>🛡️</span> MIL BASES
            </button>
            <div class="tactical-rail-divider"></div>
            <button class="tactical-rail-btn active" id="rail-btn-sat-drawer" title="Toggle Space Tracking Drawer">
              <span>🛰️</span> TRACKING
            </button>
            <button class="tactical-rail-btn active" id="rail-btn-iss-cam" title="Toggle 24/7 ISS Live Cam">
              <span>📹</span> ISS CAM
            </button>
            <button class="tactical-rail-btn" id="rail-btn-target" title="Focus Taiwan HQ Command">
              <span>🎯</span> TAIWAN HQ
            </button>
          </div>

          <!-- Dynamic Info Card Modal -->
          <div id="globe-info-container"></div>
        </section>

        <!-- Bottom Telemetry & Marquee Bar -->
        <div class="telemetry-marquee-bar">
          <div class="telemetry-left">
            <span>CURSOR: <b id="bar-coords" class="telemetry-val">25.0400, 121.5000</b></span>
            <span>LOCATION: <b id="bar-location" class="telemetry-val">Taipei HQ / Global Intelligence Sphere</b></span>
            <span>ZOOM: <b id="bar-zoom" class="telemetry-val">2.3</b></span>
          </div>
          <div class="marquee-container">
            <div class="marquee-content" id="marquee-ticker">
              <span class="marquee-item"><span class="marquee-tag tag-solar">SOLAR FLUX</span> Kp 0 // Geomagnetic field quiet</span>
              <span class="marquee-item"><span class="marquee-tag tag-crypto">BTC/USD</span> $78,450.00 ▲ +2.4%</span>
              <span class="marquee-item"><span class="marquee-tag tag-crypto">ETH/USD</span> $2,548.20 ▲ +3.1%</span>
              <span class="marquee-item"><span class="marquee-tag tag-crypto">SOL/USD</span> $189.50 ▲ +5.8%</span>
              <span class="marquee-item"><span class="marquee-tag tag-quake">USGS M6.2</span> Tohoku, Japan Depth 22km</span>
              <span class="marquee-item"><span class="marquee-tag tag-quake">USGS M5.4</span> Hualien County, Taiwan Depth 18km</span>
              <span class="marquee-item"><span class="marquee-tag tag-quake">USGS M5.9</span> Tonga Trench Depth 10km</span>
              <span class="marquee-item"><span class="marquee-tag tag-solar">DEFCON 3</span> Elevated Readiness // Multi-domain telemetry nominal</span>
            </div>
          </div>
        </div>

        <!-- Live Stream Matrix Panel (Swiss Grid) -->
        <section class="matrix-wrapper" id="matrix-container"></section>
      </main>
    `;
  }

  private initGlobe(): void {
    const container = document.getElementById('globe-container');
    if (!container) return;

    this.globeScene = new GlobeScene(container);

    // Update coordinates in bottom bar on mouse movement
    const map = this.globeScene.getMap();
    const coordsEl = document.getElementById('bar-coords');
    const zoomEl = document.getElementById('bar-zoom');

    map.on('mousemove', (e) => {
      if (coordsEl) {
        coordsEl.textContent = `${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)}`;
      }
    });

    map.on('zoom', () => {
      if (zoomEl) {
        zoomEl.textContent = map.getZoom().toFixed(1);
      }
    });

    // Intercept map click for distance measurement if tool active
    map.on('click', (e) => {
      if (this.measureTool && this.measureTool.getIsActive()) {
        this.measureTool.handleMapClick(e.lngLat.lat, e.lngLat.lng);
      }
    });

    // In-place CCTV Expanded Live Surveillance Terminal (matches LIVE FROM SPACE behavior)
    this.cctvExpandedModal = new CctvExpandedModal({
      onFocusCamera: (lat, lng) => {
        this.globeScene.focusCoordinates(lat, lng, 13.5, 45, 0);
      },
    });

    // Handle CCTV Click: In-place expanded modal right over globe (does not redirect to bottom matrix)
    this.globeScene.onSelectCctv = (pt: any) => {
      this.cctvExpandedModal.open(pt);
    };

    // Handle Earthquake Click
    this.globeScene.onSelectEarthquake = (q: EarthquakeItem) => {
      const quakeTime =
        new Date(q.time).toLocaleString('en-US', {
          timeZone: 'Asia/Taipei',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' TPE';

      this.showInfoCard({
        badge: `MAG ${q.mag.toFixed(1)} SEISMIC`,
        badgeClass: q.mag >= 6.0 ? 'CRITICAL' : 'ELEVATED',
        title: q.place,
        content: `Magnitude: Richter ${q.mag.toFixed(1)}<br/>Depth: ${q.depth} km<br/>Time: ${quakeTime}`,
      });
    };

    // Handle Incident Click
    this.globeScene.onSelectIncident = (inc: GeoIncident) => {
      this.showInfoCard({
        badge: inc.level,
        badgeClass: inc.level,
        title: inc.title,
        content: `Location: ${inc.location}<br/>${inc.summary}`,
      });
    };

    // Handle News Click
    this.globeScene.onSelectNews = (n: any) => {
      let videoId = '';
      if (n.url) {
        const m = String(n.url).match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
        if (m) videoId = m[1];
      }
      if (videoId) {
        this.streamMatrix.addChannel({
          id: n.id,
          name: n.source,
          videoId,
          city: n.city,
          country: n.country,
        });
      }

      this.showInfoCard({
        badge: 'LIVE BROADCAST',
        badgeClass: 'MONITOR',
        title: `${n.source} (${n.city || 'Global'}, ${n.country || 'Broadcast'})`,
        content: `${n.headline || '24/7 Global Satellite News Broadcast'}<br/><span style="color: var(--accent-emerald);">● 已同步加入下方 Swiss Grid 播放矩陣</span>`,
        actionLabel: n.url ? '↗️ OPEN BROADCAST' : undefined,
        onAction: n.url ? () => window.open(n.url, '_blank') : undefined,
      });
    };

    // Handle Real Live Flight Click: Display Military / Commercial Dossier
    this.globeScene.onSelectFlight = (fl: any) => {
      const isMil = fl.category === 'military';
      const altFt = Math.round((fl.alt || 0) * 3.28084);
      const spdKmh = Math.round((fl.speed_knots || 0) * 1.852);

      this.showInfoCard({
        badge: isMil ? 'AIR DEFENSE INTERCEPT // MILITARY' : 'CIVIL AVIATION RADAR // ADS-B',
        badgeClass: isMil ? 'CRITICAL' : 'MONITOR',
        title: `FLIGHT ${fl.callsign || 'UNKNOWN'} // ${fl.model || 'AIRCRAFT'}`,
        content: `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px; margin-bottom: 8px;">
            <div><strong>Callsign:</strong> ${fl.callsign || 'N/A'}</div>
            <div><strong>Category:</strong> ${String(fl.category || 'flight').toUpperCase()}</div>
            <div><strong>Altitude:</strong> ${fl.alt || 0} m (${altFt.toLocaleString()} ft)</div>
            <div><strong>Speed:</strong> ${fl.speed_knots || 0} kts (${spdKmh} km/h)</div>
            <div><strong>Heading:</strong> ${fl.heading || 0}°</div>
            <div><strong>Squawk:</strong> ${fl.squawk || 'AUTO'}</div>
            <div><strong>ICAO24:</strong> ${fl.icao24 || 'N/A'}</div>
            <div><strong>Tail Reg:</strong> ${fl.registration || 'N/A'}</div>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <a href="https://www.flightradar24.com/${encodeURIComponent(fl.callsign)}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; text-decoration:none; font-size:10px; border:1px solid rgba(56,189,248,0.4); padding:3px 8px; border-radius:3px; background:rgba(56,189,248,0.1);">FLIGHTRADAR24 ↗</a>
            <a href="https://www.radarbox.com/data/flights/${encodeURIComponent(fl.callsign)}" target="_blank" rel="noopener noreferrer" style="color:#4ade80; text-decoration:none; font-size:10px; border:1px solid rgba(74,222,128,0.4); padding:3px 8px; border-radius:3px; background:rgba(74,222,128,0.1);">RADARBOX ↗</a>
          </div>
        `,
      });
    };

    // Handle 3D Satellite Click: Show High-Tech Satellite Dossier Modal
    this.globeScene.onSelectSatellite = (sat: any) => {
      const globeWrapper = document.getElementById('globe-wrapper');
      if (!globeWrapper) return;
      if (this.satelliteCardModal) {
        const existing = globeWrapper.querySelector('.satellite-detail-card');
        if (existing) existing.remove();
      }
      this.satelliteCardModal = new SatelliteCardModal(globeWrapper, sat, () => {
        this.satelliteCardModal = undefined;
      });
    };

    // Handle Weather Event Click: Severe Cyclone / Storm Alert
    this.globeScene.onSelectWeather = (ev: any) => {
      this.showInfoCard({
        badge: `${String(ev.severity || 'SEVERE').toUpperCase()} // WEATHER ALERT`,
        badgeClass: ev.severity === 'high' ? 'CRITICAL' : 'ELEVATED',
        title: ev.title,
        content: `
          <div style="margin-bottom:6px;font-size:11px;">
            <div><strong>Type:</strong> ${ev.type || 'Tropical Cyclone'}</div>
            <div><strong>Provider:</strong> ${ev.provider || 'NASA EONET'}</div>
            <div><strong>Date:</strong> ${ev.date || 'Active Alert'}</div>
            ${ev.area ? `<div><strong>Affected Region:</strong> ${ev.area}</div>` : ''}
          </div>
          <div style="color:var(--accent-sky);">● 氣象衛星即時動態追蹤中</div>
        `,
        actionLabel: ev.source ? '↗️ VIEW NOAA / EONET ADVISORY' : undefined,
        onAction: ev.source ? () => window.open(ev.source, '_blank') : undefined,
      });
    };
  }

  private initRails(): void {
    // Left Category Rail buttons
    const bindCat = (id: string, layerKey: Parameters<GlobeScene['toggleLayer']>[0]) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');
        const next = !isActive;
        btn.classList.toggle('active', next);
        this.globeScene.toggleLayer(layerKey, next);
      });
    };

    bindCat('cat-btn-air', 'sdk_air');
    bindCat('cat-btn-sea', 'maritime');
    bindCat('cat-btn-cctv', 'cctv');
    bindCat('cat-btn-weather', 'weather');
    bindCat('cat-btn-conflicts', 'global_incidents');

    // Theaters preset panel button
    document.getElementById('cat-btn-theaters')?.addEventListener('click', () => {
      this.regionPresets.toggle();
    });

    // Cyber dummy notification
    document.getElementById('cat-btn-cyber')?.addEventListener('click', (e) => {
      const btn = e.currentTarget as HTMLElement;
      btn.classList.toggle('active');
      this.showInfoCard({
        badge: 'CYBER TELEMETRY ACTIVE',
        badgeClass: 'MONITOR',
        title: 'BGP & Undersea Cable Routing Monitor',
        content:
          'Autonomous cyber defense nodes online. Zero abnormal BGP route hijackings detected in Asia-Pacific sector.',
      });
    });

    // Space button opens Space Tracking Drawer
    document.getElementById('cat-btn-space')?.addEventListener('click', () => {
      this.spaceTrackingPanel.toggle();
    });

    // Right Tactical Action Rail buttons
    const btn3d = document.getElementById('rail-btn-3d');
    const btn2d = document.getElementById('rail-btn-2d');
    const btnMap = document.getElementById('rail-btn-map');
    const btnSat = document.getElementById('rail-btn-sat');
    const btnRecon = document.getElementById('rail-btn-recon');
    const btnRoute = document.getElementById('rail-btn-route');
    const btnIntel = document.getElementById('rail-btn-intel');
    const btnMarkets = document.getElementById('rail-btn-markets');
    const btnFlightRadar = document.getElementById('rail-btn-flight-radar');
    const btnMeasure = document.getElementById('rail-btn-measure');
    const btnSatDrawer = document.getElementById('rail-btn-sat-drawer');
    const btnIssCam = document.getElementById('rail-btn-iss-cam');
    const btnTarget = document.getElementById('rail-btn-target');

    btn3d?.addEventListener('click', () => {
      this.globeScene.setProjection('globe');
      btn3d.classList.add('active');
      btn2d?.classList.remove('active');
    });

    btn2d?.addEventListener('click', () => {
      this.globeScene.setProjection('mercator');
      btn2d.classList.add('active');
      btn3d?.classList.remove('active');
    });

    btnMap?.addEventListener('click', () => {
      this.globeScene.setBaseStyle('dark');
      btnMap.classList.add('active');
      btnSat?.classList.remove('active');
    });

    btnSat?.addEventListener('click', () => {
      this.globeScene.setBaseStyle('sat');
      btnSat.classList.add('active');
      btnMap?.classList.remove('active');
    });

    btnRecon?.addEventListener('click', () => {
      const active = this.osintPanel.toggle();
      btnRecon.classList.toggle('active', active);
    });

    btnRoute?.addEventListener('click', () => {
      const active = this.directionsPanel.toggle();
      btnRoute.classList.toggle('active', active);
    });

    btnIntel?.addEventListener('click', () => {
      this.intelFeedPanel.toggle();
      btnIntel.classList.toggle('active');
    });

    btnMarkets?.addEventListener('click', () => {
      this.marketsPanel.toggle();
      btnMarkets.classList.toggle('active');
    });

    btnFlightRadar?.addEventListener('click', () => {
      // Sync active flights from GlobeScene
      const allFlights = this.globeScene.getAllFlights();
      this.flightWatchPanel.updateFlights(allFlights);
      this.flightWatchPanel.toggle();
      btnFlightRadar.classList.toggle('active');
    });

    btnMeasure?.addEventListener('click', () => {
      const active = this.measureTool.toggle();
      btnMeasure.classList.toggle('active', active);
    });

    const btnRadar = document.getElementById('rail-btn-radar');
    btnRadar?.addEventListener('click', () => {
      const isVis = this.dopplerLegend.toggle();
      this.globeScene.toggleDopplerRadar(isVis);
      btnRadar.classList.toggle('active', isVis);
    });

    const btnCurrents = document.getElementById('rail-btn-currents');
    btnCurrents?.addEventListener('click', () => {
      const active = btnCurrents.classList.toggle('active');
      this.globeScene.toggleOceanCurrents(active);
    });

    const btnMilBases = document.getElementById('rail-btn-mil-bases');
    btnMilBases?.addEventListener('click', () => {
      const active = btnMilBases.classList.toggle('active');
      this.globeScene.toggleMilitaryBases(active);
    });

    btnSatDrawer?.addEventListener('click', () => {
      this.spaceTrackingPanel.toggle();
    });

    btnIssCam?.addEventListener('click', () => {
      this.spaceCamPanel.toggle();
      btnIssCam.classList.toggle('active');
    });

    btnTarget?.addEventListener('click', () => {
      this.globeScene.focusCoordinates(25.04, 121.5, 7.5, 45, 355);
    });
  }

  private initPanels(): void {
    const globeWrapper = document.getElementById('globe-wrapper');
    if (!globeWrapper) return;

    // 1. Mount 24/7 Live SpaceCam Panel (top-right)
    this.spaceCamPanel = new SpaceCamPanel(globeWrapper);

    // 2. Mount Space Tracking Left Drawer
    this.spaceTrackingPanel = new SpaceTrackingPanel(globeWrapper, (state: SatelliteSublayerState) => {
      this.globeScene.toggleLayer('satellites', state.all);
      this.globeScene.toggleLayer('sat_comms', state.comms);
      this.globeScene.toggleLayer('sat_military', state.military);
      this.globeScene.toggleLayer('sat_navigation', state.navigation);
      this.globeScene.toggleLayer('sat_earth', state.earth_obs);
      this.globeScene.toggleLayer('sat_science', state.science);
    });

    // 3. Mount Strategic Region Presets Panel (Left)
    this.regionPresets = new RegionPresetsPanel(globeWrapper, (region: RegionPreset) => {
      this.globeScene.focusCoordinates(
        region.lat,
        region.lng,
        region.zoom,
        region.pitch,
        region.bearing
      );
      this.showInfoCard({
        badge: region.hot ? 'WARZONE SECTOR // HIGH THREAT' : 'STRATEGIC REGIONAL THEATER',
        badgeClass: region.hot ? 'CRITICAL' : 'MONITOR',
        title: region.label,
        content: `Target Geodetic: ${region.lat.toFixed(2)}°, ${region.lng.toFixed(2)}°<br/>${
          region.desc || 'Active Geostrategic Theater'
        }`,
      });
    });

    // 4. Mount Live Intel & SIGINT Feed Panel (Right)
    this.intelFeedPanel = new IntelFeedPanel(
      globeWrapper,
      (lat: number, lng: number, zoom: number, title: string) => {
        this.globeScene.focusCoordinates(lat, lng, zoom, 45, 0);
        this.showInfoCard({
          badge: 'TACTICAL SIGINT LOCATE',
          badgeClass: 'CRITICAL',
          title,
          content: `Target located at ${lat.toFixed(3)}°, ${lng.toFixed(3)}°`,
        });
      }
    );

    // 5. Mount Macro & Defense Markets Panel (Right)
    this.marketsPanel = new MarketsPanel(globeWrapper, {
      onTriggerAiOverview: () => {
        this.aiSitrepModal.toggle();
      },
    });

    // 5b. Mount Tactical Route Navigation Planner (OSRM GPS)
    this.directionsPanel = new DirectionsPanel({
      parentElement: globeWrapper,
      onDrawRoute: (coords) => {
        this.globeScene.drawNavigationRoute(coords, true);
      },
      onClearRoute: () => {
        this.globeScene.clearNavigationRoute();
      },
      getMapCenter: () => {
        const c = this.globeScene.getMap().getCenter();
        return { lat: c.lat, lng: c.lng };
      },
    });

    // 5c. Mount Osiris 20-in-1 Recon & Cyber Threat Suite
    this.osintPanel = new OsintPanel(globeWrapper);

    // 6. Mount Flight Watch Panel (Right)
    this.flightWatchPanel = new FlightWatchPanel(
      globeWrapper,
      (fl: FlightItem) => {
        this.globeScene.focusCoordinates(fl.lat, fl.lng, 9, 45, fl.heading);
        this.globeScene.onSelectFlight?.(fl);
      },
      (filterCat: string) => {
        this.globeScene.filterFlights(filterCat);
      }
    );

    // 7. Mount AI Tactical SITREP Modal (Backdrop)
    const appEl = document.getElementById('app') || document.body;
    this.aiSitrepModal = new AiSitrepModal(appEl);

    // 8. Mount Geodesic Measure Tool HUD
    this.measureTool = new MeasureTool(globeWrapper, (res: MeasureResult | null) => {
      if (res) {
        this.globeScene.drawMeasureLine(res.pointA, res.pointB);
      } else {
        this.globeScene.clearMeasureLine();
      }
    });

    // 9. Mount Global Search Bar in Header
    const searchContainer = document.getElementById('header-search-container');
    if (searchContainer) {
      this.searchBar = new SearchBar(
        searchContainer,
        (res: SearchResult) => {
          this.globeScene.focusCoordinates(res.lat, res.lng, res.zoom, res.pitch, res.bearing);
          this.showInfoCard({
            badge: `${res.category} // TARGET LOCATED`,
            badgeClass: 'MONITOR',
            title: res.title,
            content: `${res.subtitle}<br/>Geodetic Lat/Lng: ${res.lat.toFixed(4)}°, ${res.lng.toFixed(4)}°`,
          });
        },
        () => this.globeScene.getAllFlights()
      );
    }

    // 10. Mount Doppler Radar Legend
    this.dopplerLegend = new DopplerRadarLegend({
      onToggleRadar: (en) => {
        this.globeScene.toggleDopplerRadar(en);
        const btn = document.getElementById('rail-btn-radar');
        btn?.classList.toggle('active', en);
      },
    });
    this.dopplerLegend.init(globeWrapper);

    // 11. Wire callbacks for Military Bases & Ocean Currents
    this.globeScene.onSelectMilitaryBase = (base: any) => {
      this.showInfoCard({
        badge: `BASE // ${base.branch} [${base.country}]`,
        badgeClass: base.alliance === 'STRATEGIC_COMPETITOR' ? 'CRITICAL' : 'MONITOR',
        title: base.name,
        content: `
          <div style="margin-bottom:4px;"><b style="color:var(--accent-cyan);">${base.status}</b></div>
          <div><b>Runway:</b> ${base.runway}</div>
          <div style="margin-top:3px;"><b>Stationed:</b> ${base.stationed}</div>
          <div style="margin-top:4px;color:var(--text-muted);font-size:10.5px;">${base.significance}</div>
        `,
        actionLabel: 'FOCUS FACILITY',
        onAction: () => {
          const coords = base.coordinates || (base.geometry && base.geometry.coordinates);
          if (coords) {
            this.globeScene.focusCoordinates(coords[1], coords[0], 11, 45, 0);
          }
        },
      });
    };

    this.globeScene.onSelectOceanCurrent = (curr: any) => {
      this.showInfoCard({
        badge: `HYDRO // ${curr.type} CURRENT`,
        badgeClass: curr.type === 'WARM' ? 'ELEVATED' : 'MONITOR',
        title: curr.name,
        content: `
          <div><b>Basin:</b> ${curr.basin}</div>
          <div><b>Velocity:</b> <span style="color:var(--accent-emerald);font-weight:700;">${curr.speed}</span> | <b>Temp:</b> ${curr.temp}</div>
          <div style="margin-top:4px;color:var(--text-muted);font-size:10.5px;">${curr.impact}</div>
        `,
      });
    };

    // Update counts when satellites load
    setTimeout(() => {
      const counts = this.globeScene.getSatellitesCounts();
      this.spaceTrackingPanel.setCounts(counts);
    }, 1500);
  }

  private initMatrix(): void {
    const container = document.getElementById('matrix-container');
    if (!container) return;

    this.streamMatrix = new StreamMatrix(container);
  }

  private showInfoCard(opts: {
    badge: string;
    badgeClass: string;
    title: string;
    content: string;
    actionLabel?: string;
    onAction?: () => void;
  }): void {
    const container = document.getElementById('globe-info-container');
    if (!container) return;

    container.innerHTML = `
      <div class="globe-info-card">
        <button class="card-close-btn" id="info-card-close">&times;</button>
        <span class="info-badge ${opts.badgeClass}">${opts.badge}</span>
        <div class="info-title">${opts.title}</div>
        <div class="info-desc">${opts.content}</div>
        ${
          opts.actionLabel
            ? `<button class="matrix-btn" id="info-card-action" style="margin-top: 8px;">${opts.actionLabel}</button>`
            : ''
        }
      </div>
    `;

    document.getElementById('info-card-close')?.addEventListener('click', () => {
      container.innerHTML = '';
    });

    if (opts.actionLabel && opts.onAction) {
      document.getElementById('info-card-action')?.addEventListener('click', () => {
        opts.onAction?.();
        container.innerHTML = '';
      });
    }
  }

  private initClock(): void {
    const tpeClockEl = document.getElementById('tpe-clock');
    const zuluClockEl = document.getElementById('zulu-clock');

    const update = () => {
      const now = new Date();
      if (tpeClockEl) {
        const parts = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Taipei',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).formatToParts(now);
        const y = parts.find((p) => p.type === 'year')?.value || '2026';
        const m = parts.find((p) => p.type === 'month')?.value || '09';
        const d = parts.find((p) => p.type === 'day')?.value || '09';
        const h = parts.find((p) => p.type === 'hour')?.value || '00';
        const min = parts.find((p) => p.type === 'minute')?.value || '00';
        const s = parts.find((p) => p.type === 'second')?.value || '00';
        tpeClockEl.textContent = `${y}-${m}-${d} ${h}:${min}:${s} TPE`;
      }
      if (zuluClockEl) {
        const zuluTime = now.toISOString().substring(11, 19) + ' UTC';
        zuluClockEl.textContent = `ZULU ${zuluTime}`;
      }
    };
    update();
    setInterval(update, 1000);
  }

  private initHeaderActions(): void {
    const rotateBtn = document.getElementById('btn-auto-rotate');
    if (rotateBtn) {
      rotateBtn.style.color = 'var(--text-dim)';
      rotateBtn.addEventListener('click', () => {
        this.autoRotate = !this.autoRotate;
        this.globeScene.setAutoRotate(this.autoRotate);
        rotateBtn.style.color = this.autoRotate ? 'var(--accent-emerald)' : 'var(--text-dim)';
      });
    }

    const resetBtn = document.getElementById('btn-reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.globeScene.focusCoordinates(25.04, 121.5, 2.3, 30, 0);
      });
    }

    const aiSitrepBtn = document.getElementById('btn-ai-sitrep');
    if (aiSitrepBtn) {
      aiSitrepBtn.addEventListener('click', () => {
        this.aiSitrepModal.toggle();
      });
    }
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  new TerraMatrixApp();
});
