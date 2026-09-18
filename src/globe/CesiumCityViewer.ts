/**
 * CesiumCityViewer.ts
 *
 * Tactical 3D Photorealistic City Engine for Terra Matrix.
 * - Deeply integrated native 3D renderer using Cesium Ion Google Photorealistic 3D Tiles (Asset 2275207)
 * - Zero foreign UI overlays: operates seamlessly with Terra Matrix top header, rails, and bottom telemetry
 * - Full support for Auto-Rotate (cinematic orbit), Reset view, and SearchBar coordinate flyTo
 * - 3D CCTV spatial surveillance nodes with direct modal trigger
 */

import { CCTV_PRESETS } from '../data/cctv-presets';

declare const Cesium: any;

export const CESIUM_ION_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IkpVeUlMTjdDVmFRRzlUb3giLCJqdGkiOiIwNjJlYzdhYi1iYzYzLTRkZGYtYWZlZS01MTFiNzQyYTQzZDgiLCJpZCI6NDk4MzkwLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODk2MzYzNjd9.HEvGr8jP3547HRhCE_MuUqEBFP686m60-XAJC7RUZNg';

export class CesiumCityViewer {
  private container: HTMLElement;
  private viewer: any = null;
  private tileset: any = null;
  private isInitialized = false;
  private isActive = false;
  private autoRotate = false;
  private tickListener?: () => void;
  private telemetryInterval?: number;

  public onExit?: (cameraState: { lng: number; lat: number; zoom: number; pitch: number; bearing: number }) => void;
  public onSelectCctv?: (camera: any) => void;
  public onTelemetry?: (telemetry: { lat: number; lng: number; altM: number }) => void;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Lazy initializes the Cesium viewer when first requested
   */
  public async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    if (typeof Cesium === 'undefined') {
      console.warn('[CesiumCityViewer] Waiting for Cesium library to load...');
      await new Promise<void>((resolve) => {
        const check = () => {
          if (typeof Cesium !== 'undefined') resolve();
          else setTimeout(check, 80);
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

      this.isInitialized = true;
      console.log('[CesiumCityViewer] Native 3D City Engine initialized successfully.');
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
      const tileset = await Cesium.createGooglePhotorealistic3DTileset();
      this.tileset = tileset;
      this.viewer.scene.primitives.add(tileset);
      console.log('[CesiumCityViewer] Google Photorealistic 3D Tiles attached.');
      return;
    } catch (e) {
      console.warn('[CesiumCityViewer] Google 3D Tiles failed, trying Cesium OSM Buildings:', e);
    }

    // 2. Fallback: Cesium OSM Buildings (Asset 96188)
    try {
      const osmBuildings = await Cesium.createOsmBuildingsAsync();
      this.tileset = osmBuildings;
      this.viewer.scene.primitives.add(osmBuildings);
      console.log('[CesiumCityViewer] Cesium OSM Buildings attached.');
    } catch (e2) {
      console.error('[CesiumCityViewer] Failed to load OSM Buildings:', e2);
    }
  }

  /**
   * Enters 3D city view synchronized seamlessly from current MapLibre coordinates
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
    // Smooth cross-fade in
    requestAnimationFrame(() => {
      this.container.style.opacity = '1';
    });
    this.isActive = true;

    // Convert maplibre zoom to camera altitude
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
      duration: 1.2,
      complete: () => {
        const pinsSource = cctvList && cctvList.length > 0 ? cctvList : CCTV_PRESETS;
        this.updateCctvPins(lng, lat, pinsSource);
      },
    });

    this.startTelemetryLoop();
    this.viewer.resize();
  }

  /**
   * Exits 3D city view and smoothly cross-fades back to the tactical globe
   */
  public exitCityMode(): void {
    if (!this.isActive) return;

    this.stopTelemetryLoop();
    this.setAutoRotate(false);

    const cameraState = this.getCurrentCameraState();

    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.style.display = 'none';
      this.isActive = false;
      if (this.onExit) {
        this.onExit(cameraState);
      }
    }, 280);
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  /**
   * Fly directly to specific coordinates (called by SearchBar or RegionPresets)
   */
  public flyToCoordinates(
    lng: number,
    lat: number,
    zoom: number = 16,
    pitch: number = 35,
    bearing: number = 0
  ): void {
    if (!this.viewer) return;

    const height = Math.max(180, Math.min(4500, Math.pow(2, 18 - zoom) * 110));
    const targetPitch = Cesium.Math.toRadians(-Math.max(20, Math.min(85, pitch)));
    const targetHeading = Cesium.Math.toRadians(bearing);

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
      orientation: {
        heading: targetHeading,
        pitch: targetPitch,
        roll: 0.0,
      },
      duration: 1.5,
      complete: () => {
        this.updateCctvPins(lng, lat, CCTV_PRESETS);
      },
    });
  }

  /**
   * Enables or disables cinematic orbit auto-rotation around current city view
   */
  public setAutoRotate(enabled: boolean): void {
    this.autoRotate = enabled;
    if (!this.viewer) return;

    if (enabled) {
      if (!this.tickListener) {
        this.tickListener = () => {
          if (this.autoRotate && this.viewer && this.isActive) {
            this.viewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.0006);
          }
        };
        this.viewer.clock.onTick.addEventListener(this.tickListener);
      }
    } else {
      if (this.tickListener) {
        this.viewer.clock.onTick.removeEventListener(this.tickListener);
        this.tickListener = undefined;
      }
    }
  }

  /**
   * Update 3D CCTV spatial pins hovering over 3D city
   */
  public updateCctvPins(centerLng: number, centerLat: number, cameras: any[]): void {
    if (!this.viewer) return;

    this.viewer.entities.removeAll();

    const nearby = cameras.filter((cam) => {
      const cLon = cam.lon ?? cam.lng;
      const cLat = cam.lat;
      if (cLon === undefined || cLat === undefined) return false;
      const dLng = Math.abs(cLon - centerLng);
      const dLat = Math.abs(cLat - centerLat);
      return dLng < 0.35 && dLat < 0.35;
    });

    nearby.forEach((cam) => {
      const lon = cam.lon ?? cam.lng;
      const lat = cam.lat;
      const isLive = Boolean(cam.videoId || cam.stream_url?.includes('.m3u8'));

      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 20),
        point: {
          pixelSize: 10,
          color: isLive ? Cesium.Color.fromCssColorString('#10b981') : Cesium.Color.fromCssColorString('#06b6d4'),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: `[CAM] ${cam.name?.slice(0, 18) || 'CCTV'}`,
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

    // Pause auto-rotation on user drag/touch
    handler.setInputAction(() => {
      if (this.autoRotate) {
        this.setAutoRotate(false);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
  }

  public getCurrentCameraState(): {
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

    const zoom = Math.max(1.5, Math.min(18, 18 - Math.log2(Math.max(10, height) / 110)));
    const pitch = Math.min(85, Math.max(0, -Cesium.Math.toDegrees(camera.pitch) - 10));
    const bearing = Cesium.Math.toDegrees(camera.heading);

    return { lng, lat, zoom, pitch, bearing };
  }

  private startTelemetryLoop(): void {
    this.stopTelemetryLoop();
    this.telemetryInterval = window.setInterval(() => {
      if (!this.viewer || !this.isActive) return;

      const cart = Cesium.Cartographic.fromCartesian(this.viewer.camera.position);
      const lat = Number(Cesium.Math.toDegrees(cart.latitude).toFixed(4));
      const lng = Number(Cesium.Math.toDegrees(cart.longitude).toFixed(4));
      const altM = Math.round(cart.height);

      if (this.onTelemetry) {
        this.onTelemetry({ lat, lng, altM });
      }
    }, 300);
  }

  private stopTelemetryLoop(): void {
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
      this.telemetryInterval = undefined;
    }
  }

  public destroy(): void {
    this.stopTelemetryLoop();
    this.setAutoRotate(false);
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
    }
    this.isInitialized = false;
  }
}
