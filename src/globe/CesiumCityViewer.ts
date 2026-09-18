/**
 * CesiumCityViewer.ts
 *
 * Tactical 3D Photorealistic City Viewer powered by Cesium Ion.
 * - Uses user-provided Cesium Ion Token
 * - Integrates Google Photorealistic 3D Tiles (Asset 2275207) with fallback to Cesium OSM Buildings (Asset 96188)
 * - Synchronizes camera position, heading, and pitch with MapLibre GL
 * - Embeds 3D spatial CCTV surveillance pins in the 3D city mesh
 * - Provides tactical HUD with telemetry and city quick-jump presets
 */

import { CCTV_PRESETS } from '../data/cctv-presets';

declare const Cesium: any;

export const CESIUM_ION_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IkpVeUlMTjdDVmFRRzlUb3giLCJqdGkiOiIwNjJlYzdhYi1iYzYzLTRkZGYtYWZlZS01MTFiNzQyYTQzZDgiLCJpZCI6NDk4MzkwLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODk2MzYzNjd9.HEvGr8jP3547HRhCE_MuUqEBFP686m60-XAJC7RUZNg';

export interface CityPreset {
  name: string;
  lng: number;
  lat: number;
  height: number;
  heading: number;
  pitch: number;
  icon: string;
}

export const FAMOUS_3D_CITIES: CityPreset[] = [
  {
    name: '拉斯維加斯 (Las Vegas Sphere & Strip)',
    lng: -115.1622,
    lat: 36.1212,
    height: 520,
    heading: 210,
    pitch: -25,
    icon: '🎰',
  },
  {
    name: '舊金山海灣大橋 (SF Bay Bridge & Downtown)',
    lng: -122.3937,
    lat: 37.7955,
    height: 650,
    heading: 310,
    pitch: -28,
    icon: '🌉',
  },
  {
    name: '洛杉磯市中心 (DTLA & LAX Airport)',
    lng: -118.255,
    lat: 34.051,
    height: 720,
    heading: 45,
    pitch: -30,
    icon: '🌴',
  },
  {
    name: '台北信義特區 (Taipei 101 Skyline)',
    lng: 121.5644,
    lat: 25.0339,
    height: 580,
    heading: 330,
    pitch: -25,
    icon: '🇹🇼',
  },
  {
    name: '東京澀谷與新宿 (Tokyo Shibuya 3D)',
    lng: 139.7016,
    lat: 35.658,
    height: 480,
    heading: 10,
    pitch: -28,
    icon: '🗼',
  },
  {
    name: '紐約曼哈頓 (NYC Manhattan 4K)',
    lng: -74.006,
    lat: 40.7128,
    height: 680,
    heading: 35,
    pitch: -28,
    icon: '🗽',
  },
];

export class CesiumCityViewer {
  private container: HTMLElement;
  private viewer: any = null;
  private tileset: any = null;
  private isInitialized = false;
  private isActive = false;
  private hudElement: HTMLElement | null = null;
  private telemetryInterval?: number;

  public onExit?: (cameraState: { lng: number; lat: number; zoom: number; pitch: number; bearing: number }) => void;
  public onSelectCctv?: (camera: any) => void;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Lazy initializes the Cesium viewer when first requested
   */
  public async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    // Check if window.Cesium exists
    if (typeof Cesium === 'undefined') {
      console.warn('[CesiumCityViewer] Cesium library not ready on window, waiting...');
      await new Promise<void>((resolve) => {
        const check = () => {
          if (typeof Cesium !== 'undefined') resolve();
          else setTimeout(check, 100);
        };
        check();
      });
    }

    try {
      Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN;

      this.viewer = new Cesium.Viewer(this.container, {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        scene3DOnly: true,
        orderIndependentTranslucency: true,
        contextOptions: {
          webgl: {
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
          },
        },
      });

      const scene = this.viewer.scene;
      scene.globe.baseColor = Cesium.Color.fromCssColorString('#06070a');
      scene.backgroundColor = Cesium.Color.fromCssColorString('#020204');
      if (scene.skyBox) scene.skyBox.show = false;
      if (scene.sun) scene.sun.show = true;
      if (scene.moon) scene.moon.show = false;
      scene.globe.enableLighting = true;

      // Load 3D Photorealistic Tiles
      await this.load3DTiles();

      // Setup click handler for 3D entities (CCTV pins)
      this.setupInteractionHandlers();

      // Build HUD
      this.buildHudOverlay();

      this.isInitialized = true;
      console.log('[CesiumCityViewer] Successfully initialized with Cesium Ion Token!');
      return true;
    } catch (err) {
      console.error('[CesiumCityViewer] Initialization error:', err);
      return false;
    }
  }

  private async load3DTiles(): Promise<void> {
    if (!this.viewer) return;

    // 1. Primary: Google Photorealistic 3D Tiles (Ion Asset 2275207)
    try {
      console.log('[CesiumCityViewer] Loading Google Photorealistic 3D Tiles (Asset 2275207)...');
      const tileset = await Cesium.createGooglePhotorealistic3DTileset();
      this.tileset = tileset;
      this.viewer.scene.primitives.add(tileset);
      console.log('[CesiumCityViewer] Google Photorealistic 3D Tiles attached to scene.');
      return;
    } catch (e) {
      console.warn('[CesiumCityViewer] Google 3D Tiles could not load, falling back to OSM 3D Buildings:', e);
    }

    // 2. Fallback: Cesium OSM Buildings (Asset 96188)
    try {
      console.log('[CesiumCityViewer] Loading Cesium OSM Buildings (Asset 96188)...');
      const osmBuildings = await Cesium.createOsmBuildingsAsync();
      this.tileset = osmBuildings;
      this.viewer.scene.primitives.add(osmBuildings);
      console.log('[CesiumCityViewer] Cesium OSM Buildings attached to scene.');
    } catch (e2) {
      console.error('[CesiumCityViewer] Failed to load OSM Buildings:', e2);
    }
  }

  /**
   * Enters 3D city view synchronized from current MapLibre coordinates
   */
  public async enterCityMode(
    lng: number,
    lat: number,
    zoom: number,
    pitch: number = 35,
    bearing: number = 0,
    cctvList?: any[]
  ): Promise<void> {
    if (!this.isInitialized) {
      const ok = await this.initialize();
      if (!ok) return;
    }

    this.container.style.display = 'block';
    this.container.style.opacity = '1';
    this.isActive = true;

    if (this.hudElement) {
      this.hudElement.style.display = 'flex';
    }

    // Convert maplibre zoom (typically 14~18) to camera height (meters)
    const height = Math.max(220, Math.min(4500, Math.pow(2, 18 - zoom) * 110));
    const targetPitch = Cesium.Math.toRadians(-Math.max(20, Math.min(85, pitch + 10)));
    const targetHeading = Cesium.Math.toRadians(bearing);

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
      orientation: {
        heading: targetHeading,
        pitch: targetPitch,
        roll: 0.0,
      },
      duration: 1.5,
    });

    // Populate CCTV pins in 3D City
    const pinsSource = (cctvList && cctvList.length > 0) ? cctvList : CCTV_PRESETS;
    this.updateCctvPins(lng, lat, pinsSource);

    this.startTelemetryLoop();
    this.viewer.resize();
  }

  /**
   * Exits 3D city view and returns to 3D tactical globe
   */
  public exitCityMode(): void {
    if (!this.isActive) return;

    this.stopTelemetryLoop();

    const cameraState = this.getCurrentCameraState();

    this.container.style.display = 'none';
    this.isActive = false;

    if (this.hudElement) {
      this.hudElement.style.display = 'none';
    }

    if (this.onExit) {
      this.onExit(cameraState);
    }
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  /**
   * Fly to a specific city preset
   */
  public flyToCity(city: CityPreset): void {
    if (!this.viewer) return;

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(city.lng, city.lat, city.height),
      orientation: {
        heading: Cesium.Math.toRadians(city.heading),
        pitch: Cesium.Math.toRadians(city.pitch),
        roll: 0.0,
      },
      duration: 2.0,
      complete: () => {
        this.updateCctvPins(city.lng, city.lat, CCTV_PRESETS);
      },
    });
  }

  /**
   * Update 3D CCTV spatial pins hovering over 3D city
   */
  public updateCctvPins(centerLng: number, centerLat: number, cameras: any[]): void {
    if (!this.viewer) return;

    // Clear old pins
    this.viewer.entities.removeAll();

    // Filter cameras within ~35km of current city
    const nearby = cameras.filter((cam) => {
      const cLon = cam.lon ?? cam.lng;
      const cLat = cam.lat;
      if (cLon === undefined || cLat === undefined) return false;
      const dLng = Math.abs(cLon - centerLng);
      const dLat = Math.abs(cLat - centerLat);
      return dLng < 0.45 && dLat < 0.45;
    });

    nearby.forEach((cam) => {
      const lon = cam.lon ?? cam.lng;
      const lat = cam.lat;
      const isLive = Boolean(cam.videoId || cam.stream_url?.includes('.m3u8'));

      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 25),
        point: {
          pixelSize: 10,
          color: isLive ? Cesium.Color.fromCssColorString('#10b981') : Cesium.Color.fromCssColorString('#06b6d4'),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: `[CAM] ${cam.name?.slice(0, 16) || 'CCTV'}`,
          font: '10px JetBrains Mono, monospace',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -18),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 4500),
        },
        properties: cam,
      });
    });
  }

  private setupInteractionHandlers(): void {
    if (!this.viewer) return;

    const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    handler.setInputAction((movement: any) => {
      const pickedObject = this.viewer.scene.pick(movement.position);
      if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
        const camData = pickedObject.id.properties.getValue();
        if (this.onSelectCctv) {
          this.onSelectCctv(camData);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  private getCurrentCameraState(): {
    lng: number;
    lat: number;
    zoom: number;
    pitch: number;
    bearing: number;
  } {
    if (!this.viewer) {
      return { lng: 121.5, lat: 25.04, zoom: 14.5, pitch: 35, bearing: 0 };
    }

    const camera = this.viewer.camera;
    const cartographic = Cesium.Cartographic.fromCartesian(camera.position);
    const lng = Cesium.Math.toDegrees(cartographic.longitude);
    const lat = Cesium.Math.toDegrees(cartographic.latitude);
    const height = cartographic.height;

    // Inverse height to MapLibre zoom: height = 2^(18 - zoom) * 110 => 18 - log2(height/110)
    const zoom = Math.max(1.5, Math.min(18, 18 - Math.log2(Math.max(10, height) / 110)));
    const pitch = Math.min(85, Math.max(0, -Cesium.Math.toDegrees(camera.pitch) - 10));
    const bearing = Cesium.Math.toDegrees(camera.heading);

    return { lng, lat, zoom, pitch, bearing };
  }

  private buildHudOverlay(): void {
    this.hudElement = document.createElement('div');
    this.hudElement.className = 'cesium-tactical-hud';
    this.hudElement.style.display = 'none';

    this.hudElement.innerHTML = `
      <div class="hud-top-bar">
        <div class="hud-brand">
          <span class="hud-pulse-dot"></span>
          <span class="hud-title">CESIUM ION 3D PHOTOREALISTIC CITY</span>
          <span class="hud-tag">ASSET 2275207 // 60FPS</span>
        </div>

        <div class="hud-telemetry" id="cesium-hud-telemetry">
          <span>LAT: --</span> | <span>LON: --</span> | <span>ALT: --</span>
        </div>

        <div class="hud-city-presets">
          ${FAMOUS_3D_CITIES.map(
            (c, idx) => `
            <button class="hud-city-btn" data-idx="${idx}" title="Jump to ${c.name}">
              <span>${c.icon}</span> ${c.name.split(' ')[0]}
            </button>
          `
          ).join('')}
        </div>

        <div class="hud-actions">
          <button class="hud-exit-btn" id="btn-exit-cesium" title="Exit 3D City View and return to Tactical Globe">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            <span>EXIT 3D CITY</span>
          </button>
        </div>
      </div>
    `;

    this.container.appendChild(this.hudElement);

    // Event listeners
    const exitBtn = this.hudElement.querySelector('#btn-exit-cesium');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.exitCityMode();
      });
    }

    this.hudElement.querySelectorAll('.hud-city-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = Number((e.currentTarget as HTMLElement).dataset.idx);
        const city = FAMOUS_3D_CITIES[idx];
        if (city) this.flyToCity(city);
      });
    });
  }

  private startTelemetryLoop(): void {
    this.stopTelemetryLoop();
    this.telemetryInterval = window.setInterval(() => {
      if (!this.viewer || !this.hudElement) return;
      const telemEl = this.hudElement.querySelector('#cesium-hud-telemetry');
      if (!telemEl) return;

      const cart = Cesium.Cartographic.fromCartesian(this.viewer.camera.position);
      const lat = Cesium.Math.toDegrees(cart.latitude).toFixed(4);
      const lng = Cesium.Math.toDegrees(cart.longitude).toFixed(4);
      const alt = Math.round(cart.height);

      telemEl.innerHTML = `
        <span style="color:var(--accent-cyan);">LAT: ${lat}°</span> | 
        <span style="color:var(--accent-cyan);">LON: ${lng}°</span> | 
        <span style="color:var(--accent-emerald);">ALT: ${alt}m</span>
      `;
    }, 500);
  }

  private stopTelemetryLoop(): void {
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
      this.telemetryInterval = undefined;
    }
  }

  public destroy(): void {
    this.stopTelemetryLoop();
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
    }
    this.isInitialized = false;
  }
}
