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
    
    const BLUE_MARBLE_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
    const NIGHT_LIGHTS_URL = 'https://unpkg.com/three-globe/example/img/earth-night.jpg';
    const WATER_SPECULAR_URL = 'https://unpkg.com/three-globe/example/img/earth-water.png';
    const TOPOLOGY_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
    const CLOUDS_URL = 'https://unpkg.com/three-globe/example/img/earth-clouds.png';

    const texLoader = new THREE.TextureLoader();

    const configureTex = (tex: THREE.Texture) => {
      tex.anisotropy = 16;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
      return tex;
    };

    const dayTex = texLoader.load(BLUE_MARBLE_URL, configureTex);
    const nightTex = texLoader.load(NIGHT_LIGHTS_URL, configureTex);
    const specularTex = texLoader.load(WATER_SPECULAR_URL, configureTex);
    const bumpTex = texLoader.load(TOPOLOGY_URL, configureTex);

    // Custom Globe Material blending day Blue Marble, night lights, water specular and bump
    const customGlobeMaterial = new THREE.MeshPhongMaterial({
      map: dayTex,
      bumpMap: bumpTex,
      bumpScale: 0.04,
      specularMap: specularTex,
      specular: new THREE.Color(0x334455),
      shininess: 20,
    });

    customGlobeMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.nightTexture = { value: nightTex };
      shader.vertexShader = `
        varying vec3 vWorldNormal;
        ${shader.vertexShader}
      `.replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
         vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);`
      );
      shader.fragmentShader = `
        uniform sampler2D nightTexture;
        varying vec3 vWorldNormal;
        ${shader.fragmentShader}
      `.replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
         float sunDot = dot(vWorldNormal, normalize(vec3(0.8, 0.4, 0.6)));
         if (sunDot < 0.15) {
           vec4 nightCol = texture2D(nightTexture, vUv);
           float factor = smoothstep(0.15, -0.2, sunDot);
           gl_FragColor.rgb += nightCol.rgb * factor * 1.6;
         }
        `
      );
    };

    this.globe = createGlobe({
      rendererConfig: {
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      },
    })(this.container)
      .globeImageUrl(BLUE_MARBLE_URL)
      .bumpImageUrl(TOPOLOGY_URL)
      .globeMaterial(customGlobeMaterial)
      .backgroundColor('#050507')
      .atmosphereColor('#3a82f7')
      .atmosphereAltitude(0.18)
      .width(this.container.clientWidth)
      .height(this.container.clientHeight || 500);

    texLoader.load(CLOUDS_URL, (cloudsTexture) => {
      configureTex(cloudsTexture);
      const globeRadius = this.globe.getGlobeRadius ? this.globe.getGlobeRadius() : 100;
      const cloudsGeo = new THREE.SphereGeometry(globeRadius * 1.006, 75, 75);
      const cloudsMat = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.6,
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
      this.globe.width(this.container.clientWidth).height(this.container.clientHeight || 500);
    }
  };

  public destroy(): void {
  }
}
