import Globe, { type GlobeInstance } from 'globe.gl';
import * as THREE from 'three';
import { CCTV_PRESETS, type CCTVPoint } from '../data/cctv-presets';
import { UNDERSEA_CABLES } from '../data/cables';
import type { EarthquakeItem } from './layers/EarthquakeLayer';
import type { GeoIncident, GeoNewsItem } from '../data/incidents-news';

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
  private globe!: GlobeInstance;
  private earthquakes: EarthquakeItem[] = [];
  private cloudsMesh?: THREE.Mesh;
  private isDestroyed = false;

  public onSelectCctv?: (point: CCTVPoint) => void;
  public onSelectEarthquake?: (quake: EarthquakeItem) => void;
  public onSelectIncident?: (incident: GeoIncident) => void;
  public onSelectNews?: (news: GeoNewsItem) => void;

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
    this.initGlobe();
    void this.fetchEarthquakes();
  }

  private initGlobe(): void {
    const createGlobe = Globe as unknown as (config?: any) => (el: HTMLElement) => GlobeInstance;
    
    // Step 1 & 2: Local bundled NASA textures via dynamic Base URL
    const baseUrl = import.meta.env.BASE_URL || '/';
    const globeImageUrl = `${baseUrl}earth-blue-marble.jpg`;
    const bumpImageUrl = `${baseUrl}earth-topology.png`;
    const nightLightsUrl = `${baseUrl}earth-night.jpg`;
    const waterSpecularUrl = `${baseUrl}earth-water.png`;
    const cloudsUrl = `${baseUrl}earth-clouds.png`;

    // Safe procedural fallback texture generator
    const createFallbackTexture = (color = '#0b1d3a'): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1024, 512);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= 1024; x += 64) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 512);
          ctx.stroke();
        }
        for (let y = 0; y <= 512; y += 64) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1024, y);
          ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };

    // CORS & Safe Texture Loader
    const texLoader = new THREE.TextureLoader();
    texLoader.setCrossOrigin('anonymous');

    const loadSafeTexture = (
      url: string,
      fallbackColor = '#0b1d3a',
      onLoaded?: (t: THREE.Texture) => void
    ): THREE.Texture => {
      return texLoader.load(
        url,
        (tex) => {
          tex.anisotropy = 16;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = true;
          tex.needsUpdate = true;
          onLoaded?.(tex);
        },
        undefined,
        (err) => {
          console.warn(`[GlobeScene] Texture load failed for ${url}, fallback to canvas:`, err);
          const fallback = createFallbackTexture(fallbackColor);
          fallback.anisotropy = 16;
          fallback.minFilter = THREE.LinearMipmapLinearFilter;
          fallback.magFilter = THREE.LinearFilter;
          fallback.generateMipmaps = true;
          fallback.needsUpdate = true;
          onLoaded?.(fallback);
        }
      );
    };

    const initialWidth = this.container.clientWidth || window.innerWidth;
    const initialHeight = this.container.clientHeight || Math.floor(window.innerHeight * 0.55);

    this.globe = createGlobe({
      rendererConfig: {
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      },
    })(this.container)
      .globeImageUrl(globeImageUrl)
      .bumpImageUrl(bumpImageUrl)
      .backgroundColor('#050507')
      .atmosphereColor('#3a82f7')
      .atmosphereAltitude(0.2)
      .width(initialWidth)
      .height(initialHeight);

    // Camera initial position check: camera.position.set(0, 0, 300)
    const camera = this.globe.camera() as THREE.PerspectiveCamera;
    if (camera) {
      camera.position.set(0, 0, 300);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }

    // Enhance globe material once ready
    this.globe.onGlobeReady(() => {
      const mat = this.globe.globeMaterial() as THREE.MeshPhongMaterial;
      if (mat) {
        if (mat.map) {
          mat.map.anisotropy = 16;
          mat.map.minFilter = THREE.LinearMipmapLinearFilter;
          mat.map.magFilter = THREE.LinearFilter;
          mat.map.generateMipmaps = true;
          mat.map.needsUpdate = true;
        }

        // Apply specular reflection on ocean
        loadSafeTexture(waterSpecularUrl, '#000000', (specTex) => {
          mat.specularMap = specTex;
          mat.specular = new THREE.Color(0x334455);
          mat.shininess = 22;
          mat.needsUpdate = true;
        });

        // Apply night city lights
        loadSafeTexture(nightLightsUrl, '#000000', (nightTex) => {
          mat.emissiveMap = nightTex;
          mat.emissive = new THREE.Color(0x888888);
          mat.emissiveIntensity = 0.4;
          mat.needsUpdate = true;
        });
      }
    });

    // Cloud layer with safe loader
    loadSafeTexture(cloudsUrl, '#ffffff', (cloudsTexture) => {
      const globeRadius = this.globe.getGlobeRadius ? this.globe.getGlobeRadius() : 100;
      const cloudsGeo = new THREE.SphereGeometry(globeRadius * 1.006, 75, 75);
      const cloudsMat = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });

      this.cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
      this.globe.scene().add(this.cloudsMesh);

      const rotateClouds = () => {
        if (this.isDestroyed) return;
        if (this.cloudsMesh) {
          this.cloudsMesh.rotation.y += 0.0003;
        }
        requestAnimationFrame(rotateClouds);
      };
      rotateClouds();
    });

    this.globe
      .pointLat((d: any) => d.lat)
      .pointLng((d: any) => (d.lon !== undefined ? d.lon : d.lng))
      .pointColor((d: any) => (d.type === 'cctv' ? '#06b6d4' : d.mag >= 6 ? '#ef4444' : '#f59e0b'))
      .pointAltitude((d: any) => (d.type === 'cctv' ? 0.02 : 0.015))
      .pointRadius((d: any) => (d.type === 'cctv' ? 0.45 : Math.max(0.3, (d.mag || 3) * 0.12)))
      .pointLabel((d: any) => {
        const labelText = d.id === 'tokyo-shibuya' ? '東京澀谷十字路口' : d.name;
        if (d.type === 'cctv') {
          return `<div style="background: rgba(0,0,0,0.8); border: 1px solid #333; padding: 8px; color: white; font-family: monospace;">[CCTV] ${labelText}</div>`;
        }
        if (d.type === 'earthquake') {
          return `<div style="background: rgba(0,0,0,0.8); border: 1px solid #333; padding: 8px; color: white; font-family: monospace;">[USGS] M${d.mag} ${d.place}</div>`;
        }
        return `<div style="background: rgba(0,0,0,0.8); border: 1px solid #333; padding: 8px; color: white; font-family: monospace;">${labelText}</div>`;
      })
      .onPointClick((point: any) => {
        const lat = point.lat;
        const lng = point.lon !== undefined ? point.lon : point.lng;
        this.globe.pointOfView({ lat, lng, altitude: 0.5 }, 1000);

        if (point.type === 'cctv' || point.videoId) {
          this.onSelectCctv?.(point);
        } else if (point.type === 'earthquake') {
          this.onSelectEarthquake?.(point);
        }
      });

    this.initAirArcs();
    this.initCables();

    const controls = this.globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    this.globe.pointOfView({ lat: 24, lng: 121, altitude: 2.2 }, 1000);

    window.addEventListener('resize', this.onResize);
    setTimeout(this.onResize, 50);
    setTimeout(this.onResize, 250);
    setTimeout(this.onResize, 600);
    this.updateVisibleData();
  }

  private initAirArcs(): void {
    const airArcs = [
      { id: 'tpe-lax', code: 'TPE-LAX', name: '台北 - 洛杉磯 跨太平洋航空走廊', startLat: 25.0797, startLng: 121.2342, endLat: 33.9416, endLng: -118.4085, initialGap: 0 },
      { id: 'tpe-nrt', code: 'TPE-NRT', name: '台北 - 東京成田 國際航線', startLat: 25.0797, startLng: 121.2342, endLat: 35.7720, endLng: 140.3929, initialGap: 0.3 },
      { id: 'tpe-sin', code: 'TPE-SIN', name: '台北 - 新加坡 樟宜國際航線', startLat: 25.0797, startLng: 121.2342, endLat: 1.3644, endLng: 103.9915, initialGap: 0.6 },
      { id: 'lhr-jfk', code: 'LHR-JFK', name: '北大西洋航路 NAT-Track', startLat: 51.4700, startLng: -0.4543, endLat: 40.6413, endLng: -73.7781, initialGap: 0.1 },
      { id: 'nrt-sfo', code: 'NRT-SFO', name: '跨太平洋極地走廊', startLat: 35.7720, startLng: 140.3929, endLat: 37.6213, endLng: -122.3790, initialGap: 0.4 },
      { id: 'fra-sin', code: 'FRA-SIN', name: '歐亞大陸樞紐航線', startLat: 50.0379, startLng: 8.5622, endLat: 1.3644, endLng: 103.9915, initialGap: 0.7 },
      { id: 'dxb-syd', code: 'DXB-SYD', name: '中東 - 澳洲遠程空運走廊', startLat: 25.2532, startLng: 55.3657, endLat: -33.9399, endLng: 151.1753, initialGap: 0.2 },
      { id: 'cdg-hnd', code: 'CDG-HND', name: '巴黎 - 東京羽田', startLat: 49.0097, startLng: 2.5479, endLat: 35.5494, endLng: 139.7798, initialGap: 0.5 },
      { id: 'jfk-lax', code: 'JFK-LAX', name: '美洲大陸橫貫幹線', startLat: 40.6413, startLng: -73.7781, endLat: 33.9416, endLng: -118.4085, initialGap: 0.8 },
    ];

    this.globe
      .arcsData(this.layerStates.sdk_air ? airArcs : [])
      .arcStartLat((d: any) => d.startLat)
      .arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat)
      .arcEndLng((d: any) => d.endLng)
      .arcColor(() => ['#ffffff', '#f8fafc', '#e2e8f0'])
      .arcAltitude(0.24)
      .arcStroke(0.65)
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashInitialGap((d: any) => d.initialGap || 0)
      .arcDashAnimateTime(3000)
      .arcLabel((d: any) => `<div style="background: rgba(0,0,0,0.8); border: 1px solid #333; padding: 8px; color: white; font-family: monospace;">[航空走廊] ${d.name} (${d.code})</div>`);
  }

  private initCables(): void {
    const validCables = UNDERSEA_CABLES.filter((c) => c.points && c.points.length > 1);

    this.globe
      .pathsData(this.layerStates.cables ? validCables : [])
      .pathPoints((d: any) => d.points.map(([lng, lat]: [number, number]) => ({ lat, lng })))
      .pathPointLat('lat')
      .pathPointLng('lng')
      .pathColor(() => '#5eead4')
      .pathStroke(0.7)
      .pathDashLength(0.25)
      .pathDashGap(0.04)
      .pathDashAnimateTime(6000)
      .pathLabel((d: any) => `<div style="background: rgba(0,0,0,0.85); border: 1px solid #333; padding: 8px 12px; color: white; font-family: monospace; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.6);"><span style="color:#5eead4;font-weight:bold;">[海底光纜]</span> ${d.name}</div>`);
  }

  private async fetchEarthquakes(): Promise<void> {
    try {
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
      const data = await res.json();
      const quakes: EarthquakeItem[] = (data.features || []).map((f: any) => ({
        id: f.id,
        mag: f.properties.mag ?? 3.0,
        place: f.properties.place || 'Unknown',
        time: f.properties.time,
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        depth: f.geometry.coordinates[2],
      }));
      this.earthquakes = quakes.slice(0, 60);
      this.updateVisibleData();
    } catch (err) {
      this.earthquakes = [
        { id: 'q1', mag: 7.2, place: 'Hualien Offshore', time: Date.now(), lat: 23.85, lon: 121.65, depth: 15 },
        { id: 'q2', mag: 6.8, place: 'Noto Peninsula', time: Date.now(), lat: 37.5, lon: 137.2, depth: 10 },
      ];
      this.updateVisibleData();
    }
  }

  private updateVisibleData(): void {
    if (!this.globe) return;
    const points: any[] = [];

    if (this.layerStates.cctv) {
      CCTV_PRESETS.forEach((p) => points.push({ ...p, type: 'cctv' }));
    }

    if (this.layerStates.earthquakes) {
      this.earthquakes.forEach((q) => points.push({ ...q, type: 'earthquake' }));
      this.globe
        .ringsData(this.earthquakes)
        .ringLat('lat')
        .ringLng('lon')
        .ringColor((d: any) => (d.mag >= 6.0 ? '#ef4444' : '#facc15'))
        .ringMaxRadius(10)
        .ringPropagationSpeed(2)
        .ringRepeatPeriod(1000);
    } else {
      this.globe.ringsData([]);
    }

    this.globe.pointsData(points);
    this.initAirArcs();
    this.initCables();
  }

  public toggleLayer(key: string, visible?: boolean): boolean {
    if (key in this.layerStates) {
      const next = visible !== undefined ? visible : !(this.layerStates as any)[key];
      (this.layerStates as any)[key] = next;
      this.updateVisibleData();
      return next;
    }
    return false;
  }

  public setAutoRotate(enabled: boolean): void {
    if (this.globe && this.globe.controls()) {
      this.globe.controls().autoRotate = enabled;
    }
  }

  public focusCoordinates(lat: number, lon: number, distance = 0.5): void {
    if (this.globe) {
      this.globe.pointOfView({ lat, lng: lon, altitude: distance }, 1000);
    }
  }

  private onResize = (): void => {
    if (this.globe && this.container) {
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || Math.floor(window.innerHeight * 0.55);
      this.globe.width(w).height(h);
    }
  };

  public destroy(): void {
  }
}
