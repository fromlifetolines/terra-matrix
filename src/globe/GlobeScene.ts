import maplibregl, { type Map as MlMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { EarthquakeItem } from './layers/EarthquakeLayer';
import { CctvPreviewsManager } from './CctvPreviews';
import { createSatelliteLayer, parseColor, type SatPoint } from './layers/SatelliteLayer';
import oceanCurrentsGeoJson from '../data/ocean-currents.json';
import militaryBasesGeoJson from '../data/military-bases.json';

export interface GlobeLayerState {
  cctv: boolean;
  live_news: boolean;
  earthquakes: boolean;
  global_incidents: boolean;
  day_night: boolean;
  maritime: boolean;
  sdk_air: boolean;
  satellites: boolean;
  sat_comms: boolean;
  sat_military: boolean;
  sat_navigation: boolean;
  sat_earth: boolean;
  sat_science: boolean;
  weather: boolean;
  ocean_currents: boolean;
  doppler_radar: boolean;
  military_bases: boolean;
}

export class GlobeScene {
  private container: HTMLElement;
  private map!: MlMap;
  private previewManager?: CctvPreviewsManager;
  private isDestroyed = false;
  private autoRotate = false;
  private rotateAnimationId?: number;

  public onSelectCctv?: (camera: any) => void;
  public onSelectEarthquake?: (quake: EarthquakeItem) => void;
  public onSelectIncident?: (incident: any) => void;
  public onSelectNews?: (news: any) => void;
  public onSelectFlight?: (flight: any) => void;
  public onSelectSatellite?: (sat: any) => void;
  public onSelectWeather?: (weather: any) => void;
  public onSelectMilitaryBase?: (base: any) => void;
  public onSelectOceanCurrent?: (curr: any) => void;

  private currentStyle: 'dark' | 'sat' = 'dark';
  private currentProjection: 'globe' | 'mercator' = 'globe';

  private flightAnimationTimer?: number;
  private flightFetchTimer?: number;
  private flightData: {
    commercial: any[];
    private: any[];
    jets: any[];
    military: any[];
  } = { commercial: [], private: [], jets: [], military: [] };

  private satLayer?: ReturnType<typeof createSatelliteLayer>;
  private satellitesRaw: any[] = [];
  private currentRenderedSats: any[] = [];
  private satFetchTimer?: number;

  private layerStates: GlobeLayerState = {
    cctv: true,
    live_news: true,
    earthquakes: true,
    global_incidents: true,
    day_night: true,
    maritime: true,
    sdk_air: true,
    satellites: true,
    sat_comms: true,
    sat_military: true,
    sat_navigation: true,
    sat_earth: true,
    sat_science: true,
    weather: true,
    ocean_currents: true,
    doppler_radar: true,
    military_bases: true,
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.initMap();
  }

  private initMap(): void {
    const styleUrl = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

    this.map = new maplibregl.Map({
      container: this.container,
      style: styleUrl,
      center: [121.50, 25.04], // Focus on Taiwan in global perspective
      zoom: 2.3, // Starts as 3D spherical Earth in space!
      minZoom: 1.5,
      maxZoom: 18,
      pitch: 30, // 3D tilted horizon perspective
      bearing: 0,
      attributionControl: false,
      maxPitch: 85,
    });

    // Stop auto-rotation if user touches, drags, or zooms
    this.map.on('dragstart', () => { this.setAutoRotate(false); });
    this.map.on('touchstart', () => { this.setAutoRotate(false); });
    this.map.on('wheel', () => { this.setAutoRotate(false); });

    this.map.on('load', () => {
      this.setupGlobeAtmosphere();
      this.initSatelliteLayer();
      this.initGlobalCctvLayer();
      this.initMaritimeLayer();
      this.initLiveNewsLayer();
      this.initConflictsLayer();
      this.initEarthquakeLayer();
      this.initRealFlightsLayer();
      this.initSatellites3DLayer();
      this.initWeatherLayer();
      this.initOceanCurrentsLayer();
      this.initDopplerRadarLayer();
      this.initMilitaryBasesLayer();

      // Initialize floating CCTV preview cards
      this.previewManager = new CctvPreviewsManager(this.map, this.container, (cam) => {
        this.handleCctvClick(cam);
      });

      setTimeout(() => this.map.resize(), 100);
      setTimeout(() => this.map.resize(), 500);
    });

    window.addEventListener('resize', this.onResize);
  }

  private setupGlobeAtmosphere(): void {
    try {
      (this.map as any).setProjection({ type: 'globe' });
      (this.map as any).setSky({
        'sky-color': '#030308',
        'sky-horizon-blend': 0.5,
        'horizon-color': '#070716',
        'horizon-fog-blend': 0.3,
        'fog-color': '#030308',
        'fog-ground-blend': 0.85,
      });
    } catch (e) {
      console.warn('[GlobeScene] 3D globe projection setup:', e);
    }
  }

  private initSatelliteLayer(): void {
    if (!this.map.getSource('satellite-tiles')) {
      this.map.addSource('satellite-tiles', {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        maxzoom: 18,
      });

      this.map.addLayer({
        id: 'satellite-layer',
        type: 'raster',
        source: 'satellite-tiles',
        layout: { visibility: 'none' },
        paint: { 'raster-opacity': 0.88 },
      });
    }
  }

  private initGlobalCctvLayer(): void {
    const baseUrl = import.meta.env.BASE_URL || '/';
    this.map.addSource('cctv', {
      type: 'geojson',
      data: `${baseUrl}data/cctv.geojson`,
    });

    // Outer glow
    this.map.addLayer({
      id: 'cctv-glow',
      type: 'circle',
      source: 'cctv',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 3, 5, 5, 10, 10, 14, 16],
        'circle-color': '#10b981',
        'circle-opacity': 0.22,
        'circle-blur': 0.8,
      },
    });

    // Main emerald surveillance dot
    this.map.addLayer({
      id: 'cctv-dots',
      type: 'circle',
      source: 'cctv',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1.8, 5, 3.5, 10, 6, 14, 9],
        'circle-color': '#10b981',
        'circle-opacity': 0.95,
        'circle-stroke-width': 1.5,
        'circle-stroke-color': '#000000',
        'circle-stroke-opacity': 0.9,
      },
    });

    // Labels at zoom 11+
    this.map.addLayer({
      id: 'cctv-label',
      type: 'symbol',
      source: 'cctv',
      minzoom: 11,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 9,
        'text-offset': [0, 1.6],
        'text-max-width': 12,
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': '#10b981',
        'text-halo-color': '#000000',
        'text-halo-width': 1.5,
        'text-opacity': 0.9,
      },
    });

    this.map.on('click', 'cctv-dots', (e) => {
      const feat = e.features?.[0];
      if (feat && feat.properties) {
        const coords = (feat.geometry as any)?.coordinates;
        this.handleCctvClick(feat.properties as any, coords);
      }
    });

    this.map.on('click', 'cctv-label', (e) => {
      const feat = e.features?.[0];
      if (feat && feat.properties) {
        const coords = (feat.geometry as any)?.coordinates;
        this.handleCctvClick(feat.properties as any, coords);
      }
    });

    this.map.on('mouseenter', 'cctv-dots', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'cctv-dots', () => {
      this.map.getCanvas().style.cursor = '';
    });
    this.map.on('mouseenter', 'cctv-label', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'cctv-label', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  private handleCctvClick(cam: any, coords?: [number, number]): void {
    let videoId = cam.videoId;
    if (!videoId && cam.stream_url) {
      const m = String(cam.stream_url).match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
      if (m) videoId = m[1];
    }

    const lat = cam.lat !== undefined ? Number(cam.lat) : coords ? coords[1] : undefined;
    const lng = cam.lng !== undefined ? Number(cam.lng) : cam.lon !== undefined ? Number(cam.lon) : coords ? coords[0] : undefined;

    this.onSelectCctv?.({
      id: cam.id,
      name: cam.name,
      city: cam.city,
      country: cam.country,
      lat,
      lon: lng,
      lng,
      videoId: videoId || '',
      feed_url: cam.feed_url || '',
      stream_url: cam.stream_url || '',
      stream_type: cam.stream_type || 'jpg',
      source: cam.source || 'CCTV',
    });
  }

  private async initMaritimeLayer(): Promise<void> {
    const baseUrl = import.meta.env.BASE_URL || '/';
    try {
      const res = await fetch(`${baseUrl}data/maritime.json`);
      const data = await res.json();

      // Ports GeoJSON
      const portFeatures = (data.ports || []).map((p: any) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
        properties: { ...p, kind: 'port' },
      }));

      // Chokepoints GeoJSON
      const chokepointFeatures = (data.chokepoints || []).map((c: any) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [c.lng, c.lat] },
        properties: { ...c, kind: 'chokepoint' },
      }));

      this.map.addSource('maritime-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [...portFeatures, ...chokepointFeatures],
        },
      });

      // Ports layer (cyan)
      this.map.addLayer({
        id: 'maritime-ports-layer',
        type: 'circle',
        source: 'maritime-data',
        filter: ['==', ['get', 'kind'], 'port'],
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 2.5, 6, 4.5, 12, 8],
          'circle-color': '#38bdf8',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#000',
        },
      });

      // Chokepoints layer (amber pulsing)
      this.map.addLayer({
        id: 'maritime-chokepoint-glow',
        type: 'circle',
        source: 'maritime-data',
        filter: ['==', ['get', 'kind'], 'chokepoint'],
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 6, 6, 12, 12, 20],
          'circle-color': '#f59e0b',
          'circle-opacity': 0.35,
          'circle-blur': 0.8,
        },
      });

      this.map.addLayer({
        id: 'maritime-chokepoints-layer',
        type: 'circle',
        source: 'maritime-data',
        filter: ['==', ['get', 'kind'], 'chokepoint'],
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 4, 6, 7, 12, 11],
          'circle-color': '#f59e0b',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000',
        },
      });

      this.map.addLayer({
        id: 'maritime-label',
        type: 'symbol',
        source: 'maritime-data',
        minzoom: 3,
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 9,
          'text-offset': [0, 1.5],
        },
        paint: {
          'text-color': '#f59e0b',
          'text-halo-color': '#000',
          'text-halo-width': 1.5,
        },
      });

      this.map.on('click', 'maritime-chokepoints-layer', (e) => {
        const p = e.features?.[0]?.properties;
        if (p) {
          this.onSelectIncident?.({
            title: `MARITIME CHOKEPOINT // ${p.name}`,
            location: `Strategic Transit Zone (Risk: ${p.risk || 'ELEVATED'})`,
            summary: `Traffic Volume: ${p.traffic || 'High-volume international maritime shipping lane'}.`,
            level: p.risk === 'HIGH' ? 'CRITICAL' : 'ELEVATED',
          });
        }
      });
    } catch (e) {
      console.warn('[GlobeScene] Maritime load failed:', e);
    }
  }

  private async initLiveNewsLayer(): Promise<void> {
    const baseUrl = import.meta.env.BASE_URL || '/';
    try {
      const res = await fetch(`${baseUrl}data/live-news.json`);
      const data = await res.json();
      const features = (data.feeds || []).map((n: any) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [n.lng, n.lat] },
        properties: n,
      }));

      this.map.addSource('live-news-data', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features },
      });

      // Red TV dot
      this.map.addLayer({
        id: 'live-news-dots',
        type: 'circle',
        source: 'live-news-data',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 4, 6, 7, 12, 10],
          'circle-color': '#ef4444',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      this.map.addLayer({
        id: 'live-news-label',
        type: 'symbol',
        source: 'live-news-data',
        minzoom: 3,
        layout: {
          'text-field': ['concat', '📺 ', ['get', 'name']],
          'text-size': 9.5,
          'text-offset': [0, 1.6],
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#ef4444',
          'text-halo-width': 1.5,
        },
      });

      this.map.on('click', 'live-news-dots', (e) => {
        const p = e.features?.[0]?.properties;
        if (p) {
          this.onSelectNews?.({
            id: p.id,
            source: p.name,
            headline: `24/7 Global Satellite News Broadcast (${p.city}, ${p.country})`,
            time: 'LIVE BROADCAST',
            city: p.city,
            country: p.country,
            category: p.category,
            url: p.url,
          });
        }
      });
    } catch (e) {
      console.warn('[GlobeScene] Live news load failed:', e);
    }
  }

  private async initConflictsLayer(): Promise<void> {
    const baseUrl = import.meta.env.BASE_URL || '/';
    try {
      const res = await fetch(`${baseUrl}data/conflicts.json`);
      const data = await res.json();
      const features = (data.zones || []).map((z: any) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [z.lng, z.lat] },
        properties: z,
      }));

      this.map.addSource('conflicts-data', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features },
      });

      this.map.addLayer({
        id: 'conflict-glow',
        type: 'circle',
        source: 'conflicts-data',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 8, 6, 16, 12, 28],
          'circle-color': '#dc2626',
          'circle-opacity': 0.35,
          'circle-blur': 0.85,
        },
      });

      this.map.addLayer({
        id: 'conflict-dots',
        type: 'circle',
        source: 'conflicts-data',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 5, 6, 8, 12, 12],
          'circle-color': '#dc2626',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000',
        },
      });

      this.map.addLayer({
        id: 'conflict-label',
        type: 'symbol',
        source: 'conflicts-data',
        layout: {
          'text-field': ['concat', '⚠️ ', ['get', 'label']],
          'text-size': 9.5,
          'text-offset': [0, 1.8],
        },
        paint: {
          'text-color': '#f87171',
          'text-halo-color': '#000',
          'text-halo-width': 1.5,
        },
      });

      this.map.on('click', 'conflict-dots', (e) => {
        const p = e.features?.[0]?.properties;
        if (p) {
          this.onSelectIncident?.({
            title: `FLASHPOINT // ${p.label}`,
            location: `Severity: ${p.severity?.toUpperCase() || 'CRITICAL'}`,
            summary: p.description || 'Active frontline geopolitical engagement zone.',
            level: 'CRITICAL',
          });
        }
      });
    } catch (e) {
      console.warn('[GlobeScene] Conflicts load failed:', e);
    }
  }

  private async initEarthquakeLayer(): Promise<void> {
    try {
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
      const data = await res.json();

      this.map.addSource('earthquakes', {
        type: 'geojson',
        data,
      });

      this.map.addLayer({
        id: 'eq-glow',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['get', 'mag'], 2.5, 8, 5.0, 16, 7.0, 28],
          'circle-color': [
            'step', ['get', 'mag'],
            '#eab308', 4.5,
            '#f97316', 6.0,
            '#ef4444'
          ],
          'circle-opacity': 0.3,
          'circle-blur': 0.8,
        },
      });

      this.map.addLayer({
        id: 'eq-circles',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['get', 'mag'], 2.5, 4, 5.0, 8, 7.0, 15],
          'circle-color': [
            'step', ['get', 'mag'],
            '#eab308', 4.5,
            '#f97316', 6.0,
            '#ef4444'
          ],
          'circle-opacity': 0.9,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#000000',
        },
      });

      this.map.addLayer({
        id: 'eq-label',
        type: 'symbol',
        source: 'earthquakes',
        minzoom: 3,
        filter: ['>=', ['get', 'mag'], 4.0],
        layout: {
          'text-field': ['concat', 'M', ['to-string', ['get', 'mag']]],
          'text-size': 9,
          'text-offset': [0, 1.4],
        },
        paint: {
          'text-color': '#f59e0b',
          'text-halo-color': '#000000',
          'text-halo-width': 1,
        },
      });

      this.map.on('click', 'eq-circles', (e) => {
        const feat = e.features?.[0];
        if (feat && feat.properties) {
          const p = feat.properties;
          const coords = (feat.geometry as any).coordinates;
          this.onSelectEarthquake?.({
            id: feat.id ? String(feat.id) : String(p.code),
            mag: p.mag,
            place: p.place,
            time: p.time,
            lat: coords[1],
            lon: coords[0],
            depth: coords[2] || 10,
          });
        }
      });
    } catch (e) {
      console.warn('[GlobeScene] USGS Earthquake fetch failed:', e);
    }
  }

  private createHDPlaneIcon(id: string, color: string, type: 'airliner' | 'fighter' | 'bizjet'): void {
    if (this.map.hasImage(id)) return;
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, size, size);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (type === 'fighter') {
      // Modern 5th-gen supersonic stealth fighter (F-22/F-35 silhouette)
      ctx.beginPath();
      ctx.moveTo(64, 14); // Nose radome
      ctx.lineTo(70, 32); // Right chine
      ctx.lineTo(72, 46); // Right wing root
      ctx.lineTo(114, 76); // Right wingtip
      ctx.lineTo(112, 82);
      ctx.lineTo(76, 76); // Trailing edge
      ctx.lineTo(76, 92);
      ctx.lineTo(96, 114); // Right stabilator
      ctx.lineTo(84, 116);
      ctx.lineTo(72, 102);
      ctx.lineTo(68, 110); // Right nozzle
      ctx.lineTo(64, 106); // Center notch
      ctx.lineTo(60, 110); // Left nozzle
      ctx.lineTo(56, 102);
      ctx.lineTo(44, 116);
      ctx.lineTo(32, 114); // Left stabilator
      ctx.lineTo(52, 92);
      ctx.lineTo(52, 76);
      ctx.lineTo(16, 82);
      ctx.lineTo(14, 76); // Left wingtip
      ctx.lineTo(56, 46);
      ctx.lineTo(58, 32); // Left chine
      ctx.closePath();
    } else if (type === 'bizjet') {
      // Sleek business jet (Gulfstream/Learjet with rear engines & T-tail)
      ctx.beginPath();
      ctx.moveTo(64, 16);
      ctx.lineTo(68, 44);
      ctx.lineTo(116, 68);
      ctx.lineTo(115, 73);
      ctx.lineTo(70, 68);
      ctx.lineTo(76, 76);
      ctx.lineTo(76, 92);
      ctx.lineTo(69, 93);
      ctx.lineTo(69, 102);
      ctx.lineTo(92, 112);
      ctx.lineTo(90, 117);
      ctx.lineTo(65, 112);
      ctx.lineTo(64, 118);
      ctx.lineTo(63, 112);
      ctx.lineTo(38, 117);
      ctx.lineTo(36, 112);
      ctx.lineTo(59, 102);
      ctx.lineTo(59, 93);
      ctx.lineTo(52, 92);
      ctx.lineTo(52, 76);
      ctx.lineTo(58, 68);
      ctx.lineTo(13, 73);
      ctx.lineTo(12, 68);
      ctx.lineTo(60, 44);
      ctx.closePath();
    } else {
      // Realistic Boeing/Airbus commercial airliner (swept wings, dual engines, stabilizers)
      ctx.beginPath();
      ctx.moveTo(64, 12);
      ctx.bezierCurveTo(67, 12, 70, 18, 70, 30);
      ctx.lineTo(70, 48);
      ctx.lineTo(76, 50);
      ctx.lineTo(118, 72);
      ctx.lineTo(117, 78);
      ctx.lineTo(74, 68);
      ctx.lineTo(72, 96);
      ctx.lineTo(94, 110);
      ctx.lineTo(91, 115);
      ctx.lineTo(68, 107);
      ctx.lineTo(64, 118);
      ctx.lineTo(60, 107);
      ctx.lineTo(37, 115);
      ctx.lineTo(34, 110);
      ctx.lineTo(56, 96);
      ctx.lineTo(54, 68);
      ctx.lineTo(11, 78);
      ctx.lineTo(10, 72);
      ctx.lineTo(52, 50);
      ctx.lineTo(58, 48);
      ctx.lineTo(58, 30);
      ctx.bezierCurveTo(58, 18, 61, 12, 64, 12);
      ctx.closePath();
    }

    // Outer dark glow/halo for maximum high contrast against land & clouds
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;

    ctx.fillStyle = color;
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Dark crisp edge line
    ctx.strokeStyle = '#05070d';
    ctx.lineWidth = 3;
    ctx.stroke();

    // For commercial airliner, also draw the dual wing engine pods
    if (type === 'airliner') {
      ctx.fillStyle = color;
      ctx.strokeStyle = '#05070d';
      ctx.lineWidth = 2;

      // Right engine pod
      ctx.beginPath();
      ctx.ellipse(86, 62, 4, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Left engine pod
      ctx.beginPath();
      ctx.ellipse(42, 62, 4, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    this.map.addImage(id, ctx.getImageData(0, 0, size, size), { pixelRatio: 2 });
  }

  private createMilBaseIcon(id: string, color: string, type: 'air' | 'navy' | 'radar' | 'joint'): void {
    if (this.map.hasImage(id)) return;
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, size, size);

    // Outer tactical circular badge with dark background
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 12, 18, 0.92)';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (type === 'air') {
      // Swept tactical wing symbol
      ctx.beginPath();
      ctx.moveTo(32, 16);
      ctx.lineTo(36, 26);
      ctx.lineTo(50, 36);
      ctx.lineTo(36, 36);
      ctx.lineTo(35, 46);
      ctx.lineTo(42, 49);
      ctx.lineTo(32, 47);
      ctx.lineTo(22, 49);
      ctx.lineTo(29, 46);
      ctx.lineTo(28, 36);
      ctx.lineTo(14, 36);
      ctx.lineTo(28, 26);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'navy') {
      // Naval anchor symbol
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(32, 22, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(32, 26);
      ctx.lineTo(32, 46);
      ctx.moveTo(24, 30);
      ctx.lineTo(40, 30);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(32, 38, 11, 0.2 * Math.PI, 0.8 * Math.PI, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(21, 41);
      ctx.lineTo(21, 37);
      ctx.moveTo(43, 41);
      ctx.lineTo(43, 37);
      ctx.stroke();
    } else if (type === 'radar') {
      // Phased array radar dish with wave arcs
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(28, 36, 12, 1.4 * Math.PI, 1.95 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(28, 36);
      ctx.lineTo(40, 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(40, 24, 6, -0.3 * Math.PI, 0.3 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(40, 24, 11, -0.35 * Math.PI, 0.35 * Math.PI);
      ctx.stroke();
    } else {
      // 4-point tactical star / Joint HQ
      ctx.beginPath();
      ctx.moveTo(32, 16);
      ctx.lineTo(35, 29);
      ctx.lineTo(48, 32);
      ctx.lineTo(35, 35);
      ctx.lineTo(32, 48);
      ctx.lineTo(29, 35);
      ctx.lineTo(16, 32);
      ctx.lineTo(29, 29);
      ctx.closePath();
      ctx.fill();
    }

    this.map.addImage(id, ctx.getImageData(0, 0, size, size), { pixelRatio: 2 });
  }

  private async initRealFlightsLayer(): Promise<void> {
    const baseUrl = import.meta.env.BASE_URL || '/';

    // Register sharp, authentic Hi-DPI silhouette aircraft icons (devicePixelRatio: 2)
    this.createHDPlaneIcon('plane-cyan', '#38bdf8', 'airliner');  // Commercial airliner (Cyan)
    this.createHDPlaneIcon('plane-green', '#4ade80', 'bizjet');   // Private aviation (Green)
    this.createHDPlaneIcon('plane-pink', '#f472b6', 'bizjet');    // Executive jets (Pink)
    this.createHDPlaneIcon('plane-red', '#ef4444', 'fighter');    // Military air defense (Red)

    // Setup GeoJSON sources for each aviation group
    const sources = ['flights-commercial', 'flights-private', 'flights-jets', 'flights-military'];
    sources.forEach((s) => {
      if (!this.map.getSource(s)) {
        this.map.addSource(s, {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
      }
    });

    const flightConfigs = [
      { id: 'fl-commercial', src: 'flights-commercial', icon: 'plane-cyan', scale: 0.44 },
      { id: 'fl-private', src: 'flights-private', icon: 'plane-green', scale: 0.40 },
      { id: 'fl-jets', src: 'flights-jets', icon: 'plane-pink', scale: 0.40 },
      { id: 'fl-military', src: 'flights-military', icon: 'plane-red', scale: 0.46 },
    ];

    flightConfigs.forEach((cfg) => {
      this.map.addLayer({
        id: cfg.id,
        type: 'symbol',
        source: cfg.src,
        layout: {
          'icon-image': cfg.icon,
          'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.35 * cfg.scale, 5, 0.65 * cfg.scale, 10, 0.95 * cfg.scale],
          'icon-rotate': ['get', 'heading'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
        },
        paint: {
          'icon-opacity': 0.92,
        },
      });

      this.map.on('click', cfg.id, (e) => {
        const feat = e.features?.[0];
        if (feat && feat.properties) {
          this.onSelectFlight?.(feat.properties);
        }
      });

      this.map.on('mouseenter', cfg.id, () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', cfg.id, () => {
        this.map.getCanvas().style.cursor = '';
      });
    });

    // Flight callsign labels at zoom >= 4.5
    this.map.addLayer({
      id: 'fl-labels',
      type: 'symbol',
      source: 'flights-commercial',
      minzoom: 4.5,
      layout: {
        'text-field': ['get', 'callsign'],
        'text-size': 8.5,
        'text-offset': [0, 1.1],
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': '#38bdf8',
        'text-halo-color': '#000000',
        'text-halo-width': 1.6,
      },
    });

    // Initial fetch of real flights
    await this.fetchFlightsData(baseUrl);

    // Setup real-time dead reckoning animation loop every 1.5s
    this.flightAnimationTimer = window.setInterval(() => {
      this.updateFlightDeadReckoning();
    }, 1500);

    // Periodic telemetry sync every 60s
    this.flightFetchTimer = window.setInterval(() => {
      this.fetchFlightsData(baseUrl);
    }, 60000);
  }

  private async fetchFlightsData(baseUrl: string): Promise<void> {
    try {
      let data: any = null;
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 6000);
        const res = await fetch('https://osirisai.live/api/flights', { signal: controller.signal });
        clearTimeout(tid);
        if (res.ok) {
          data = await res.json();
        }
      } catch (e) {
        console.info('[GlobeScene] Live flights remote fetch fallback to bundled cache:', e);
      }

      if (!data || (!data.commercial_flights && !data.flights)) {
        const localRes = await fetch(`${baseUrl}data/flights.json`);
        data = await localRes.json();
      }

      const commercial = data.commercial_flights || data.flights || [];
      const privateFl = data.private_flights || [];
      const jets = data.private_jets || [];
      const military = data.military_flights || [];

      this.flightData = {
        commercial: commercial.map((f: any) => ({ ...f, category: 'commercial' })),
        private: privateFl.map((f: any) => ({ ...f, category: 'private' })),
        jets: jets.map((f: any) => ({ ...f, category: 'jets' })),
        military: military.map((f: any) => ({ ...f, category: 'military' })),
      };

      this.pushFlightFeaturesToMap();

      const total =
        this.flightData.commercial.length +
        this.flightData.private.length +
        this.flightData.jets.length +
        this.flightData.military.length;

      const countEl = document.getElementById('header-flights-count');
      if (countEl) {
        countEl.textContent = `${total.toLocaleString()} RADAR`;
      }
    } catch (e) {
      console.warn('[GlobeScene] Failed to load flights data:', e);
    }
  }

  private pushFlightFeaturesToMap(): void {
    if (!this.map || this.isDestroyed) return;

    const toGeoJson = (arr: any[]) => ({
      type: 'FeatureCollection' as const,
      features: arr.map((f: any) => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [f.lng, f.lat],
        },
        properties: {
          callsign: f.callsign || 'UNKNOWN',
          heading: f.heading || 0,
          alt: f.alt || 0,
          speed_knots: f.speed_knots || 0,
          model: f.model || 'Standard',
          registration: f.registration || 'N/A',
          icao24: f.icao24 || 'N/A',
          squawk: f.squawk || '',
          airline_code: f.airline_code || '',
          category: f.category || 'commercial',
        },
      })),
    });

    const cSrc = this.map.getSource('flights-commercial') as any;
    if (cSrc) cSrc.setData(toGeoJson(this.flightData.commercial));

    const pSrc = this.map.getSource('flights-private') as any;
    if (pSrc) pSrc.setData(toGeoJson(this.flightData.private));

    const jSrc = this.map.getSource('flights-jets') as any;
    if (jSrc) jSrc.setData(toGeoJson(this.flightData.jets));

    const mSrc = this.map.getSource('flights-military') as any;
    if (mSrc) mSrc.setData(toGeoJson(this.flightData.military));
  }

  private updateFlightDeadReckoning(): void {
    if (!this.map || this.isDestroyed || !this.layerStates.sdk_air) return;
    const dt = 1.5; // seconds elapsed

    const moveGroup = (list: any[]) => {
      for (const f of list) {
        const speedKnots = f.speed_knots || 0;
        if (speedKnots > 20 && !f.grounded) {
          const headingRad = ((f.heading || 0) * Math.PI) / 180;
          const speedMps = speedKnots * 0.514444;
          const distM = speedMps * dt;
          const latRad = ((f.lat || 0) * Math.PI) / 180;
          const dLat = (distM * Math.cos(headingRad)) / 111320;
          const dLng = (distM * Math.sin(headingRad)) / (111320 * Math.max(0.1, Math.cos(latRad)));
          f.lat += dLat;
          f.lng += dLng;
        }
      }
    };

    moveGroup(this.flightData.commercial);
    moveGroup(this.flightData.private);
    moveGroup(this.flightData.jets);
    moveGroup(this.flightData.military);

    this.pushFlightFeaturesToMap();
  }

  private initSatellites3DLayer(): void {
    const baseUrl = import.meta.env.BASE_URL || '/';

    try {
      this.satLayer = createSatelliteLayer('satellites-3d');
      this.map.addLayer(this.satLayer as any);
    } catch (e) {
      console.warn('[GlobeScene] Failed to add satellites-3d layer:', e);
    }

    // Map click picking for satellites
    this.map.on('click', (e) => {
      if (!this.layerStates.satellites || !this.satLayer) return;
      const idx = this.satLayer.pick(e.point.x, e.point.y);
      if (idx !== null && this.currentRenderedSats[idx]) {
        const sat = this.currentRenderedSats[idx];
        this.satLayer.setSelected(idx);
        this.onSelectSatellite?.(sat);
      }
    });

    // Cursor pointer on hover over satellites
    this.map.on('mousemove', (e) => {
      if (this.layerStates.satellites && this.satLayer) {
        const idx = this.satLayer.pick(e.point.x, e.point.y);
        if (idx !== null) {
          this.map.getCanvas().style.cursor = 'pointer';
        }
      }
    });

    // Fetch satellite catalogue (1,336+ birds)
    fetch(`${baseUrl}data/satellites.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.satellites)) {
          this.satellitesRaw = data.satellites;
          this.updateSatellitesFilter();
        }
      })
      .catch((err) => console.warn('[GlobeScene] Satellites fetch error:', err));
  }

  public updateSatellitesFilter(): void {
    if (!this.satLayer) return;

    if (!this.layerStates.satellites) {
      this.satLayer.setPoints([]);
      this.currentRenderedSats = [];
      return;
    }

    const filtered = this.satellitesRaw.filter((s) => {
      const cat = (s.category || '').toLowerCase();
      if (cat === 'comms' && !this.layerStates.sat_comms) return false;
      if (cat === 'military' && !this.layerStates.sat_military) return false;
      if ((cat === 'navigation' || cat === 'nav') && !this.layerStates.sat_navigation) return false;
      if ((cat === 'earth_obs' || cat === 'earth') && !this.layerStates.sat_earth) return false;
      if (cat === 'science' && !this.layerStates.sat_science) return false;
      return true;
    });

    this.currentRenderedSats = filtered;

    const points: SatPoint[] = filtered.map((s) => {
      const isStation = s.noradId === '25544' || s.noradId === '48274' || (s.name && s.name.includes('ISS'));
      return {
        lng: s.lng,
        lat: s.lat,
        altKm: s.alt || 450,
        color: parseColor(s.color, 0x00e5ff),
        size: isStation ? 3.2 : 1.2,
      };
    });

    this.satLayer.setPoints(points);
  }

  public getSatellitesCounts(): Record<string, number> {
    const counts = {
      all: this.satellitesRaw.length || 1336,
      comms: 0,
      military: 0,
      navigation: 0,
      earth_obs: 0,
      science: 0,
    };
    for (const s of this.satellitesRaw) {
      const cat = (s.category || '').toLowerCase();
      if (cat === 'comms') counts.comms++;
      else if (cat === 'military') counts.military++;
      else if (cat === 'navigation' || cat === 'nav') counts.navigation++;
      else if (cat === 'earth_obs' || cat === 'earth') counts.earth_obs++;
      else if (cat === 'science') counts.science++;
    }
    return counts;
  }

  private initWeatherLayer(): void {
    const baseUrl = import.meta.env.BASE_URL || '/';

    this.map.addSource('weather-source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });

    // Outer glow ring
    this.map.addLayer({
      id: 'weather-glow',
      type: 'circle',
      source: 'weather-source',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 8, 5, 14, 10, 22],
        'circle-color': [
          'match',
          ['get', 'severity'],
          'high', '#ef4444',
          'medium', '#f59e0b',
          '#06b6d4',
        ],
        'circle-opacity': 0.35,
        'circle-blur': 0.6,
      },
    });

    // Core dot
    this.map.addLayer({
      id: 'weather-dots',
      type: 'circle',
      source: 'weather-source',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 4, 5, 7, 10, 11],
        'circle-color': [
          'match',
          ['get', 'severity'],
          'high', '#ef4444',
          'medium', '#f59e0b',
          '#06b6d4',
        ],
        'circle-opacity': 0.95,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-opacity': 0.9,
      },
    });

    // Label
    this.map.addLayer({
      id: 'weather-label',
      type: 'symbol',
      source: 'weather-source',
      minzoom: 3,
      layout: {
        'text-field': ['get', 'title'],
        'text-size': 10,
        'text-offset': [0, 1.6],
        'text-max-width': 14,
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': '#38bdf8',
        'text-halo-color': '#000000',
        'text-halo-width': 2,
        'text-opacity': 0.95,
      },
    });

    this.map.on('click', 'weather-dots', (e) => {
      const feat = e.features?.[0];
      if (feat && feat.properties) {
        this.onSelectWeather?.(feat.properties);
      }
    });

    this.map.on('mouseenter', 'weather-dots', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'weather-dots', () => {
      this.map.getCanvas().style.cursor = '';
    });

    fetch(`${baseUrl}data/weather.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.events)) {
          const geojson = {
            type: 'FeatureCollection',
            features: data.events.map((ev: any) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [ev.lng, ev.lat],
              },
              properties: ev,
            })),
          };
          const src = this.map.getSource('weather-source') as maplibregl.GeoJSONSource;
          if (src) {
            src.setData(geojson as any);
          }
        }
      })
      .catch((err) => console.warn('[GlobeScene] Weather fetch error:', err));
  }

  private initOceanCurrentsLayer(): void {
    try {
      if (!this.map.getSource('ocean-currents')) {
        this.map.addSource('ocean-currents', {
          type: 'geojson',
          data: oceanCurrentsGeoJson as any,
        });
      }

      // Outer glow for hydrodynamic flow
      if (!this.map.getLayer('ocean-currents-glow')) {
        this.map.addLayer({
          id: 'ocean-currents-glow',
          type: 'line',
          source: 'ocean-currents',
          paint: {
            'line-width': ['interpolate', ['linear'], ['zoom'], 1, 4, 6, 8, 10, 12],
            'line-color': [
              'case',
              ['==', ['get', 'type'], 'WARM'],
              '#f97316',
              '#06b6d4'
            ],
            'line-opacity': 0.3,
            'line-blur': 3,
          },
        });
      }

      // Core pulsing dashline
      if (!this.map.getLayer('ocean-currents-core')) {
        this.map.addLayer({
          id: 'ocean-currents-core',
          type: 'line',
          source: 'ocean-currents',
          paint: {
            'line-width': ['interpolate', ['linear'], ['zoom'], 1, 2, 6, 3.5, 10, 5],
            'line-color': [
              'case',
              ['==', ['get', 'type'], 'WARM'],
              '#ff5722',
              '#22d3ee'
            ],
            'line-opacity': 0.9,
            'line-dasharray': [4, 2],
          },
        });
      }

      // Labels
      if (!this.map.getLayer('ocean-currents-label')) {
        this.map.addLayer({
          id: 'ocean-currents-label',
          type: 'symbol',
          source: 'ocean-currents',
          minzoom: 3,
          layout: {
            'symbol-placement': 'line',
            'text-field': ['get', 'name'],
            'text-size': 10,
            'text-letter-spacing': 0.05,
          },
          paint: {
            'text-color': '#e2e8f0',
            'text-halo-color': '#020617',
            'text-halo-width': 1.5,
          },
        });
      }

      this.map.on('click', 'ocean-currents-core', (e) => {
        const feat = e.features?.[0];
        if (feat && feat.properties) {
          this.onSelectOceanCurrent?.(feat.properties);
        }
      });

      this.map.on('mouseenter', 'ocean-currents-core', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'ocean-currents-core', () => {
        this.map.getCanvas().style.cursor = '';
      });
    } catch (e) {
      console.warn('[GlobeScene] Ocean currents layer init error:', e);
    }
  }

  private async initDopplerRadarLayer(): Promise<void> {
    try {
      // Dynamic RainViewer live radar composite
      let radarTime = Math.floor(Date.now() / 1000) - 600; // default 10 mins ago
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 4000);
        const res = await fetch('https://api.rainviewer.com/public/weather-maps.json', { signal: controller.signal });
        clearTimeout(tid);
        if (res.ok) {
          const json = await res.json();
          if (json.radar && json.radar.past && json.radar.past.length > 0) {
            radarTime = json.radar.past[json.radar.past.length - 1].time;
          }
        }
      } catch (e) {
        console.warn('[GlobeScene] RainViewer API fallback to time offset:', e);
      }

      const tileUrl = `https://tilecache.rainviewer.com/v2/radar/${radarTime}/256/{z}/{x}/{y}/2/1_1.png`;

      if (!this.map.getSource('doppler-radar-source')) {
        this.map.addSource('doppler-radar-source', {
          type: 'raster',
          tiles: [tileUrl],
          tileSize: 256,
        });

        this.map.addLayer({
          id: 'doppler-radar-layer',
          type: 'raster',
          source: 'doppler-radar-source',
          paint: {
            'raster-opacity': 0.72,
            'raster-fade-duration': 300,
          },
          layout: {
            visibility: 'visible',
          },
        });
      }
    } catch (e) {
      console.warn('[GlobeScene] Doppler radar initialization error:', e);
    }
  }

  private initMilitaryBasesLayer(): void {
    try {
      if (!this.map.getSource('military-bases')) {
        this.map.addSource('military-bases', {
          type: 'geojson',
          data: militaryBasesGeoJson as any,
        });
      }

      // Base radar pulse / glow
      if (!this.map.getLayer('mil-bases-glow')) {
        this.map.addLayer({
          id: 'mil-bases-glow',
          type: 'circle',
          source: 'military-bases',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 6, 6, 10, 12, 16],
            'circle-color': [
              'case',
              ['==', ['get', 'alliance'], 'STRATEGIC_COMPETITOR'],
              '#ef4444',
              ['==', ['get', 'alliance'], 'INDO_PACIFIC_ALLIED'],
              '#10b981',
              '#06b6d4'
            ],
            'circle-opacity': 0.35,
            'circle-blur': 1,
          },
        });
      }

      // Base symbol layer
      if (!this.map.getLayer('mil-bases-layer')) {
        this.map.addLayer({
          id: 'mil-bases-layer',
          type: 'symbol',
          source: 'military-bases',
          layout: {
            'icon-image': [
              'case',
              ['==', ['get', 'branch'], 'NAVY'],
              'mil-icon-navy',
              ['==', ['get', 'branch'], 'AIR_FORCE'],
              'mil-icon-air',
              ['==', ['get', 'branch'], 'RADAR'],
              'mil-icon-radar',
              'mil-icon-joint'
            ],
            'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.45, 6, 0.65, 12, 0.9],
            'icon-allow-overlap': true,
            'text-field': ['get', 'name'],
            'text-size': 9.5,
            'text-offset': [0, 1.5],
            'text-optional': true,
          },
          paint: {
            'text-color': '#f1f5f9',
            'text-halo-color': '#020617',
            'text-halo-width': 1.5,
          },
        });
      }

      // Click handler
      this.map.on('click', 'mil-bases-layer', (e) => {
        const feat = e.features?.[0];
        if (feat && feat.properties) {
          this.onSelectMilitaryBase?.(feat.properties);
        }
      });

      this.map.on('mouseenter', 'mil-bases-layer', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'mil-bases-layer', () => {
        this.map.getCanvas().style.cursor = '';
      });
    } catch (e) {
      console.warn('[GlobeScene] Military bases layer init error:', e);
    }
  }

  private initTacticalControls(): void {
    const controls = document.createElement('div');
    controls.className = 'map-controls-tactical';
    controls.innerHTML = `
      <button class="ctrl-btn active" id="btn-3d" title="3D Spherical Earth Globe">🌐 3D GLOBE</button>
      <button class="ctrl-btn" id="btn-2d" title="2D Orthographic Map">👤 2D</button>
      <button class="ctrl-btn active" id="btn-map" title="Tactical Dark Vector Map">🌙 MAP</button>
      <button class="ctrl-btn" id="btn-sat" title="High-Res Satellite Imagery">🛰️ SAT</button>
    `;
    this.container.appendChild(controls);

    const btn3d = controls.querySelector('#btn-3d') as HTMLButtonElement;
    const btn2d = controls.querySelector('#btn-2d') as HTMLButtonElement;
    const btnMap = controls.querySelector('#btn-map') as HTMLButtonElement;
    const btnSat = controls.querySelector('#btn-sat') as HTMLButtonElement;

    btn3d?.addEventListener('click', () => {
      this.currentProjection = 'globe';
      (this.map as any).setProjection({ type: 'globe' });
      this.map.easeTo({ pitch: 40, duration: 800 });
      btn3d.classList.add('active');
      btn2d.classList.remove('active');
    });

    btn2d?.addEventListener('click', () => {
      this.currentProjection = 'mercator';
      (this.map as any).setProjection({ type: 'mercator' });
      this.map.easeTo({ pitch: 0, duration: 800 });
      btn2d.classList.add('active');
      btn3d.classList.remove('active');
    });

    btnMap?.addEventListener('click', () => {
      this.currentStyle = 'dark';
      if (this.map.getLayer('satellite-layer')) {
        this.map.setLayoutProperty('satellite-layer', 'visibility', 'none');
      }
      btnMap.classList.add('active');
      btnSat.classList.remove('active');
    });

    btnSat?.addEventListener('click', () => {
      this.currentStyle = 'sat';
      if (this.map.getLayer('satellite-layer')) {
        this.map.setLayoutProperty('satellite-layer', 'visibility', 'visible');
      }
      btnSat.classList.add('active');
      btnMap.classList.remove('active');
    });
  }

  private initTelemetryHUD(): void {
    const hud = document.createElement('div');
    hud.className = 'map-telemetry-hud';
    hud.id = 'map-telemetry-hud';
    hud.innerHTML = `
      <span>CURSOR: <b id="hud-coords">25.0400, 121.5000</b></span>
      <span style="color:var(--border-active);">|</span>
      <span>LOCATION: <b id="hud-location">Global Intelligence Sphere</b></span>
      <span style="color:var(--border-active);">|</span>
      <span>ZOOM: <b id="hud-zoom">2.3</b></span>
    `;
    this.container.appendChild(hud);

    const coordsEl = hud.querySelector('#hud-coords');
    const zoomEl = hud.querySelector('#hud-zoom');

    this.map.on('mousemove', (e) => {
      if (coordsEl) {
        coordsEl.textContent = `${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)}`;
      }
    });

    this.map.on('zoom', () => {
      if (zoomEl) {
        zoomEl.textContent = this.map.getZoom().toFixed(1);
      }
    });
  }

  public setAutoRotate(enabled: boolean): void {
    this.autoRotate = enabled;
    if (this.rotateAnimationId) {
      cancelAnimationFrame(this.rotateAnimationId);
      this.rotateAnimationId = undefined;
    }

    if (!enabled) return;

    let lastTime = performance.now();
    const frame = (time: number) => {
      if (!this.autoRotate || this.isDestroyed) return;
      const dt = time - lastTime;
      lastTime = time;

      const center = this.map.getCenter();
      center.lng += (0.4 * dt) / 1000;
      this.map.setCenter(center);

      this.rotateAnimationId = requestAnimationFrame(frame);
    };

    this.rotateAnimationId = requestAnimationFrame(frame);
  }

  public focusCoordinates(
    lat: number,
    lng: number,
    zoom = 12.5,
    pitch?: number,
    bearing?: number
  ): void {
    this.map.flyTo({
      center: [lng, lat],
      zoom,
      pitch: pitch !== undefined ? pitch : this.currentProjection === 'globe' ? 45 : 0,
      bearing: bearing !== undefined ? bearing : 0,
      duration: 1800,
      essential: true,
    });
  }

  public getAllFlights(): any[] {
    return [
      ...this.flightData.military,
      ...this.flightData.commercial,
      ...this.flightData.jets,
      ...this.flightData.private,
    ];
  }

  public filterFlights(category: string): void {
    if (!this.map) return;
    const all = ['fl-commercial', 'fl-private', 'fl-jets', 'fl-military'];
    if (category === 'military') {
      ['fl-commercial', 'fl-private', 'fl-jets'].forEach((id) => {
        if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', 'none');
      });
      if (this.map.getLayer('fl-military'))
        this.map.setLayoutProperty('fl-military', 'visibility', 'visible');
    } else if (category === 'commercial') {
      ['fl-commercial', 'fl-private', 'fl-jets'].forEach((id) => {
        if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', 'visible');
      });
      if (this.map.getLayer('fl-military'))
        this.map.setLayoutProperty('fl-military', 'visibility', 'none');
    } else {
      all.forEach((id) => {
        if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', 'visible');
      });
    }
  }

  public drawMeasureLine(pointA: { lat: number; lng: number }, pointB: { lat: number; lng: number }): void {
    const geojson: any = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [pointA.lng, pointA.lat],
              [pointB.lng, pointB.lat],
            ],
          },
          properties: {},
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [pointA.lng, pointA.lat],
          },
          properties: { label: 'POINT A' },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [pointB.lng, pointB.lat],
          },
          properties: { label: 'POINT B' },
        },
      ],
    };

    const source = this.map.getSource('measure-source') as maplibregl.GeoJSONSource;
    if (source) {
      source.setData(geojson);
    } else {
      this.map.addSource('measure-source', {
        type: 'geojson',
        data: geojson,
      });

      this.map.addLayer({
        id: 'measure-line',
        type: 'line',
        source: 'measure-source',
        filter: ['==', '$type', 'LineString'],
        paint: {
          'line-color': '#00e5ff',
          'line-width': 2.5,
          'line-dasharray': [2, 1],
        },
      });

      this.map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'measure-source',
        filter: ['==', '$type', 'Point'],
        paint: {
          'circle-radius': 5,
          'circle-color': '#00e5ff',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });
    }
  }

  public clearMeasureLine(): void {
    const source = this.map.getSource('measure-source') as maplibregl.GeoJSONSource;
    if (source) {
      source.setData({ type: 'FeatureCollection', features: [] });
    }
  }

  public drawNavigationRoute(coordinates: [number, number][], fitBounds = true): void {
    if (!this.map || !coordinates || coordinates.length === 0) return;
    const geojson: any = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates,
          },
          properties: {},
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates[0],
          },
          properties: { role: 'start' },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates[coordinates.length - 1],
          },
          properties: { role: 'end' },
        },
      ],
    };

    const source = this.map.getSource('navigation-route-source') as maplibregl.GeoJSONSource;
    if (source) {
      source.setData(geojson);
    } else {
      this.map.addSource('navigation-route-source', {
        type: 'geojson',
        data: geojson,
      });

      // Route casing glow
      this.map.addLayer({
        id: 'navigation-route-glow',
        type: 'line',
        source: 'navigation-route-source',
        filter: ['==', '$type', 'LineString'],
        paint: {
          'line-color': '#00e5ff',
          'line-width': 8,
          'line-opacity': 0.35,
          'line-blur': 3,
        },
      });

      // Core route vector
      this.map.addLayer({
        id: 'navigation-route-line',
        type: 'line',
        source: 'navigation-route-source',
        filter: ['==', '$type', 'LineString'],
        paint: {
          'line-color': '#06b6d4',
          'line-width': 4.5,
          'line-opacity': 0.95,
        },
      });

      // Start / End point circles
      this.map.addLayer({
        id: 'navigation-route-points',
        type: 'circle',
        source: 'navigation-route-source',
        filter: ['==', '$type', 'Point'],
        paint: {
          'circle-radius': 6,
          'circle-color': [
            'case',
            ['==', ['get', 'role'], 'start'],
            '#10b981',
            '#ef4444',
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });
    }

    if (fitBounds && coordinates.length > 0) {
      let minLng = coordinates[0][0], maxLng = coordinates[0][0];
      let minLat = coordinates[0][1], maxLat = coordinates[0][1];
      for (const [lng, lat] of coordinates) {
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
      this.map.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]],
        { padding: 80, duration: 1200, maxZoom: 16 }
      );
    }
  }

  public clearNavigationRoute(): void {
    const source = this.map?.getSource('navigation-route-source') as maplibregl.GeoJSONSource;
    if (source) {
      source.setData({ type: 'FeatureCollection', features: [] });
    }
  }

  public toggleLayer(layerKey: keyof GlobeLayerState, visible: boolean): void {
    this.layerStates[layerKey] = visible;
    const vis = visible ? 'visible' : 'none';

    try {
      if (layerKey === 'cctv') {
        if (this.map.getLayer('cctv-dots')) this.map.setLayoutProperty('cctv-dots', 'visibility', vis);
        if (this.map.getLayer('cctv-glow')) this.map.setLayoutProperty('cctv-glow', 'visibility', vis);
        if (this.map.getLayer('cctv-label')) this.map.setLayoutProperty('cctv-label', 'visibility', vis);
        this.previewManager?.setActive(visible);
      } else if (layerKey === 'earthquakes') {
        if (this.map.getLayer('eq-circles')) this.map.setLayoutProperty('eq-circles', 'visibility', vis);
        if (this.map.getLayer('eq-glow')) this.map.setLayoutProperty('eq-glow', 'visibility', vis);
        if (this.map.getLayer('eq-label')) this.map.setLayoutProperty('eq-label', 'visibility', vis);
      } else if (layerKey === 'sdk_air') {
        const flightLayers = ['fl-commercial', 'fl-private', 'fl-jets', 'fl-military', 'fl-labels'];
        flightLayers.forEach((id) => {
          if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', vis);
        });
      } else if (layerKey === 'maritime') {
        if (this.map.getLayer('maritime-ports-layer')) this.map.setLayoutProperty('maritime-ports-layer', 'visibility', vis);
        if (this.map.getLayer('maritime-chokepoint-glow')) this.map.setLayoutProperty('maritime-chokepoint-glow', 'visibility', vis);
        if (this.map.getLayer('maritime-chokepoints-layer')) this.map.setLayoutProperty('maritime-chokepoints-layer', 'visibility', vis);
        if (this.map.getLayer('maritime-label')) this.map.setLayoutProperty('maritime-label', 'visibility', vis);
      } else if (layerKey === 'live_news') {
        if (this.map.getLayer('live-news-dots')) this.map.setLayoutProperty('live-news-dots', 'visibility', vis);
        if (this.map.getLayer('live-news-label')) this.map.setLayoutProperty('live-news-label', 'visibility', vis);
      } else if (layerKey === 'global_incidents') {
        if (this.map.getLayer('conflict-glow')) this.map.setLayoutProperty('conflict-glow', 'visibility', vis);
        if (this.map.getLayer('conflict-dots')) this.map.setLayoutProperty('conflict-dots', 'visibility', vis);
        if (this.map.getLayer('conflict-label')) this.map.setLayoutProperty('conflict-label', 'visibility', vis);
      } else if (
        layerKey === 'satellites' ||
        layerKey === 'sat_comms' ||
        layerKey === 'sat_military' ||
        layerKey === 'sat_navigation' ||
        layerKey === 'sat_earth' ||
        layerKey === 'sat_science'
      ) {
        this.updateSatellitesFilter();
      } else if (layerKey === 'weather') {
        if (this.map.getLayer('weather-dots')) this.map.setLayoutProperty('weather-dots', 'visibility', vis);
        if (this.map.getLayer('weather-glow')) this.map.setLayoutProperty('weather-glow', 'visibility', vis);
        if (this.map.getLayer('weather-label')) this.map.setLayoutProperty('weather-label', 'visibility', vis);
      } else if (layerKey === 'ocean_currents') {
        const currentLayers = ['ocean-currents-glow', 'ocean-currents-core', 'ocean-currents-label'];
        currentLayers.forEach((id) => {
          if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', vis);
        });
      } else if (layerKey === 'doppler_radar') {
        if (this.map.getLayer('doppler-radar-layer')) {
          this.map.setLayoutProperty('doppler-radar-layer', 'visibility', vis);
        }
      } else if (layerKey === 'military_bases') {
        const milLayers = ['mil-bases-glow', 'mil-bases-layer'];
        milLayers.forEach((id) => {
          if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', vis);
        });
      }
    } catch (e) {
      console.warn(`[GlobeScene] Toggle layer ${layerKey} error:`, e);
    }
  }

  public toggleDopplerRadar(visible: boolean): void {
    this.toggleLayer('doppler_radar', visible);
  }

  public toggleOceanCurrents(visible: boolean): void {
    this.toggleLayer('ocean_currents', visible);
  }

  public toggleMilitaryBases(visible: boolean): void {
    this.toggleLayer('military_bases', visible);
  }

  public setProjection(proj: 'globe' | 'mercator'): void {
    this.currentProjection = proj;
    try {
      (this.map as any).setProjection({ type: proj });
      this.map.easeTo({ pitch: proj === 'globe' ? 40 : 0, duration: 800 });
    } catch (e) {
      console.warn('[GlobeScene] setProjection error:', e);
    }
  }

  public setBaseStyle(style: 'dark' | 'sat'): void {
    this.currentStyle = style;
    if (this.map.getLayer('satellite-layer')) {
      this.map.setLayoutProperty('satellite-layer', 'visibility', style === 'sat' ? 'visible' : 'none');
    }
  }

  public getMap(): MlMap {
    return this.map;
  }

  public getLayerStates(): GlobeLayerState {
    return this.layerStates;
  }

  private onResize = (): void => {
    if (this.map) {
      this.map.resize();
    }
  };

  public destroy(): void {
    this.isDestroyed = true;
    this.setAutoRotate(false);
    if (this.flightAnimationTimer) clearInterval(this.flightAnimationTimer);
    if (this.flightFetchTimer) clearInterval(this.flightFetchTimer);
    this.previewManager?.destroy();
    window.removeEventListener('resize', this.onResize);
    this.map.remove();
  }
}
