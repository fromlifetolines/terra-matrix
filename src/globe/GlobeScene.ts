import maplibregl, { type Map as MlMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ALL_CCTV_CAMERAS, type CctvCamera } from '../data/cctv-cameras';
import { UNDERSEA_CABLES } from '../data/cables';
import type { EarthquakeItem } from './layers/EarthquakeLayer';
import { CctvPreviewsManager } from './CctvPreviews';

export interface GlobeLayerState {
  cctv: boolean;
  live_news: boolean;
  earthquakes: boolean;
  global_incidents: boolean;
  day_night: boolean;
  cables: boolean;
  maritime: boolean;
  sdk_air: boolean;
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

  private currentStyle: 'dark' | 'sat' = 'dark';
  private currentPitch: 50 | 0 = 50;

  private layerStates: GlobeLayerState = {
    cctv: true,
    live_news: true,
    earthquakes: true,
    global_incidents: true,
    day_night: true,
    cables: true,
    maritime: true,
    sdk_air: true,
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.initMap();
  }

  private initMap(): void {
    // Style: CartoDB Dark Matter vector style (crisp streets, highways, district labels)
    const styleUrl = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

    this.map = new maplibregl.Map({
      container: this.container,
      style: styleUrl,
      center: [121.50, 25.04], // Center on Taipei / New Taipei City
      zoom: 12.5,
      minZoom: 1.5,
      maxZoom: 18,
      pitch: 50, // 3D perspective pitch matching Osiris
      bearing: 0,
      attributionControl: false,
      maxPitch: 85,
    });

    // Disable auto-rotation by default! User has 100% stable control
    this.autoRotate = false;

    // Stop any rotation if user interacts
    this.map.on('dragstart', () => { this.setAutoRotate(false); });
    this.map.on('touchstart', () => { this.setAutoRotate(false); });
    this.map.on('wheel', () => { this.setAutoRotate(false); });

    this.map.on('load', () => {
      this.initSatelliteLayer();
      this.initCctvLayer();
      this.initEarthquakeLayer();
      this.initCablesLayer();
      this.initAirCorridorsLayer();
      this.initMaritimeLayer();
      this.initTacticalControls();
      this.initTelemetryHUD();

      // Initialize floating CCTV preview cards
      this.previewManager = new CctvPreviewsManager(this.map, this.container, (cam) => {
        this.handleCctvClick(cam);
      });

      // Trigger resize after layout settles
      setTimeout(() => this.map.resize(), 100);
      setTimeout(() => this.map.resize(), 500);
    });

    window.addEventListener('resize', this.onResize);
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
        paint: { 'raster-opacity': 0.85 },
      });
    }
  }

  private initCctvLayer(): void {
    const features = ALL_CCTV_CAMERAS.map((cam) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [cam.lng, cam.lat],
      },
      properties: {
        id: cam.id,
        name: cam.name,
        city: cam.city,
        country: cam.country,
        feed_url: cam.feed_url || '',
        stream_url: cam.stream_url || '',
        stream_type: cam.stream_type || 'jpg',
        videoId: cam.videoId || '',
        source: cam.source,
      },
    }));

    this.map.addSource('cctv', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    });

    // Outer subtle glow
    this.map.addLayer({
      id: 'cctv-glow',
      type: 'circle',
      source: 'cctv',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 4, 6, 7, 10, 12, 14, 18],
        'circle-color': '#10b981',
        'circle-opacity': 0.25,
        'circle-blur': 0.8,
      },
    });

    // Main emerald dot
    this.map.addLayer({
      id: 'cctv-dots',
      type: 'circle',
      source: 'cctv',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 2.5, 6, 4.5, 10, 7, 14, 10],
        'circle-color': '#10b981',
        'circle-opacity': 0.95,
        'circle-stroke-width': 2,
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
        'text-size': 9.5,
        'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
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

    // Interaction
    this.map.on('click', 'cctv-dots', (e) => {
      const feat = e.features?.[0];
      if (feat && feat.properties) {
        this.handleCctvClick(feat.properties as any);
      }
    });

    this.map.on('mouseenter', 'cctv-dots', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'cctv-dots', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  private handleCctvClick(cam: any): void {
    this.onSelectCctv?.({
      id: cam.id,
      name: cam.name,
      city: cam.city,
      country: cam.country,
      lat: cam.lat,
      lon: cam.lng,
      videoId: cam.videoId || '',
      feed_url: cam.feed_url,
      stream_type: cam.stream_type,
    });
  }

  private async initEarthquakeLayer(): Promise<void> {
    try {
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
      const data = await res.json();

      this.map.addSource('earthquakes', {
        type: 'geojson',
        data,
      });

      // Earthquake glow
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

      // Main earthquake circle
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

      // Magnitude label
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

  private initCablesLayer(): void {
    const validCables = UNDERSEA_CABLES.filter((c) => c.points && c.points.length > 1);
    const features = validCables.map((c) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'LineString' as const,
        coordinates: c.points,
      },
      properties: {
        id: c.id,
        name: c.name,
      },
    }));

    this.map.addSource('cables', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    });

    this.map.addLayer({
      id: 'cables-layer',
      type: 'line',
      source: 'cables',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#5eead4',
        'line-width': ['interpolate', ['linear'], ['zoom'], 1, 1, 6, 1.8, 12, 2.5],
        'line-opacity': 0.75,
      },
    });
  }

  private initAirCorridorsLayer(): void {
    const airArcs = [
      { id: 'tpe-lax', name: '台北 - 洛杉磯 跨太平洋航空走廊', coords: [[121.23, 25.07], [140.0, 35.0], [-160.0, 45.0], [-135.0, 40.0], [-118.40, 33.94]] },
      { id: 'tpe-nrt', name: '台北 - 東京成田 航線', coords: [[121.23, 25.07], [128.0, 30.0], [140.39, 35.77]] },
      { id: 'tpe-sin', name: '台北 - 新加坡 樟宜航線', coords: [[121.23, 25.07], [115.0, 15.0], [103.99, 1.36]] },
      { id: 'lhr-jfk', name: '北大西洋航路 NAT-Track', coords: [[-0.45, 51.47], [-30.0, 56.0], [-55.0, 48.0], [-73.77, 40.64]] },
    ];

    const features = airArcs.map((a) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'LineString' as const,
        coordinates: a.coords,
      },
      properties: { id: a.id, name: a.name },
    }));

    this.map.addSource('air-corridors', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features },
    });

    this.map.addLayer({
      id: 'air-layer',
      type: 'line',
      source: 'air-corridors',
      paint: {
        'line-color': '#38bdf8',
        'line-width': 1.6,
        'line-dasharray': [3, 2],
        'line-opacity': 0.8,
      },
    });
  }

  private initMaritimeLayer(): void {
    const maritimeLines = [
      { id: 'tw-strait', name: '台灣海峽戰略航道', coords: [[119.5, 23.0], [120.2, 24.5], [121.5, 26.0]] },
      { id: 'malacca', name: '馬六甲海峽能源航道', coords: [[95.0, 5.5], [101.0, 2.5], [104.0, 1.2]] },
      { id: 'suez', name: '蘇伊士運河航路', coords: [[32.3, 31.2], [32.5, 29.9]] },
    ];

    const features = maritimeLines.map((m) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'LineString' as const,
        coordinates: m.coords,
      },
      properties: { id: m.id, name: m.name },
    }));

    this.map.addSource('maritime', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features },
    });

    this.map.addLayer({
      id: 'maritime-layer',
      type: 'line',
      source: 'maritime',
      paint: {
        'line-color': '#f59e0b',
        'line-width': 1.5,
        'line-dasharray': [4, 2],
        'line-opacity': 0.75,
      },
    });
  }

  private initTacticalControls(): void {
    const controls = document.createElement('div');
    controls.className = 'map-controls-tactical';
    controls.innerHTML = `
      <button class="ctrl-btn active" id="btn-3d" title="3D Isometric Tactical View">🌐 3D</button>
      <button class="ctrl-btn" id="btn-2d" title="2D Orthographic Top-Down View">👤 2D</button>
      <button class="ctrl-btn active" id="btn-map" title="Tactical Dark Vector Map">🌙 MAP</button>
      <button class="ctrl-btn" id="btn-sat" title="High-Res Satellite Imagery">🛰️ SAT</button>
    `;
    this.container.appendChild(controls);

    const btn3d = controls.querySelector('#btn-3d') as HTMLButtonElement;
    const btn2d = controls.querySelector('#btn-2d') as HTMLButtonElement;
    const btnMap = controls.querySelector('#btn-map') as HTMLButtonElement;
    const btnSat = controls.querySelector('#btn-sat') as HTMLButtonElement;

    btn3d?.addEventListener('click', () => {
      this.currentPitch = 50;
      this.map.easeTo({ pitch: 50, duration: 600 });
      btn3d.classList.add('active');
      btn2d.classList.remove('active');
    });

    btn2d?.addEventListener('click', () => {
      this.currentPitch = 0;
      this.map.easeTo({ pitch: 0, duration: 600 });
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
      <span>LOCATION: <b id="hud-location">Taipei, Taiwan</b></span>
      <span style="color:var(--border-active);">|</span>
      <span>ZOOM: <b id="hud-zoom">12.5</b></span>
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

  public focusCoordinates(lat: number, lng: number, _altitude?: number): void {
    this.map.flyTo({
      center: [lng, lat],
      zoom: 12.5,
      pitch: this.currentPitch,
      duration: 1200,
    });
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
      } else if (layerKey === 'cables') {
        if (this.map.getLayer('cables-layer')) this.map.setLayoutProperty('cables-layer', 'visibility', vis);
      } else if (layerKey === 'sdk_air') {
        if (this.map.getLayer('air-layer')) this.map.setLayoutProperty('air-layer', 'visibility', vis);
      } else if (layerKey === 'maritime') {
        if (this.map.getLayer('maritime-layer')) this.map.setLayoutProperty('maritime-layer', 'visibility', vis);
      }
    } catch (e) {
      console.warn(`[GlobeScene] Toggle layer ${layerKey} error:`, e);
    }
  }

  private onResize = (): void => {
    if (this.map) {
      this.map.resize();
    }
  };

  public destroy(): void {
    this.isDestroyed = true;
    this.setAutoRotate(false);
    this.previewManager?.destroy();
    window.removeEventListener('resize', this.onResize);
    this.map.remove();
  }
}
