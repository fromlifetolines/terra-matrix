import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createEarthMaterial, createAtmosphereMaterial, createCloudsMaterial } from './EarthShader';
import { getSunDirectionVector } from '../utils/solar';
import { latLonToVector3 } from '../utils/coordinates';
import { CablesLayer } from './layers/CablesLayer';
import { EarthquakeLayer, type EarthquakeItem } from './layers/EarthquakeLayer';
import { CctvLayer } from './layers/CctvLayer';
import { NewsLayer } from './layers/NewsLayer';
import { IncidentsLayer } from './layers/IncidentsLayer';
import { MaritimeLayer } from './layers/MaritimeLayer';
import { AirLayer } from './layers/AirLayer';
import type { CCTVPoint } from '../data/cctv-presets';
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
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  private earthMesh!: THREE.Mesh;
  private earthMaterial!: THREE.ShaderMaterial;
  private cloudsMesh!: THREE.Mesh;
  private cloudsMaterial!: THREE.ShaderMaterial;
  private atmosphereMesh!: THREE.Mesh;
  private atmosphereMaterial!: THREE.ShaderMaterial;
  private tooltipEl!: HTMLElement;

  public cablesLayer!: CablesLayer;
  public earthquakeLayer!: EarthquakeLayer;
  public cctvLayer!: CctvLayer;
  public newsLayer!: NewsLayer;
  public incidentsLayer!: IncidentsLayer;
  public maritimeLayer!: MaritimeLayer;
  public airLayer!: AirLayer;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private earthRadius = 100;
  private isAnimating = false;
  private clock = new THREE.Clock();

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

    try {
      // Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x050507);

      // Camera
      const aspect = container.clientWidth / (container.clientHeight || 1);
      this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000);
      this.camera.position.set(0, 30, 260);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.1;
      container.appendChild(this.renderer.domElement);

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.rotateSpeed = 0.65;
      this.controls.minDistance = 115;
      this.controls.maxDistance = 500;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.25;

      this.initStars();
      this.initEarth();
      this.initLayers();
      this.initEvents();

      this.start();
    } catch (err) {
      console.error('[GlobeScene] WebGL initialization failed, rendering tactical 2D fallback:', err);
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%;background:#050507;color:#9ca3af;font-family:'JetBrains Mono',monospace;text-align:center;padding:20px;box-sizing:border-box;">
          <div style="color:#10b981;font-size:16px;font-weight:700;margin-bottom:8px;letter-spacing:0.1em;">TERRA MATRIX // 2D TACTICAL MODE</div>
          <div style="font-size:12px;max-width:480px;line-height:1.6;color:#6b7280;">3D WebGL acceleration context unavailable or degraded in this browser environment. The Swiss Grid Live Video Matrix below is fully operational.</div>
        </div>
      `;
      // Dummy stubs so public API methods don't crash
      this.cablesLayer = { setVisible: () => {} } as unknown as CablesLayer;
      this.earthquakeLayer = { setVisible: () => {} } as unknown as EarthquakeLayer;
      this.cctvLayer = { setVisible: () => {} } as unknown as CctvLayer;
      this.newsLayer = { setVisible: () => {} } as unknown as NewsLayer;
      this.incidentsLayer = { setVisible: () => {} } as unknown as IncidentsLayer;
      this.maritimeLayer = { setVisible: () => {} } as unknown as MaritimeLayer;
      this.airLayer = { setVisible: () => {} } as unknown as AirLayer;
    }
  }

  private initStars(): void {
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 600 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const brightness = 0.4 + Math.random() * 0.6;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness * 0.95;
      colors[i * 3 + 2] = brightness * 1.1;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    this.scene.add(starPoints);
  }

  private createFallbackTexture(color = '#1e293b'): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(canvas);
  }

  private initEarth(): void {
    const getAssetUrl = (filename: string): string => {
      const base = (import.meta.env.BASE_URL || '/terra-matrix/').replace(/\/+$/, '') + '/';
      return `${base}${filename.replace(/^\/+/, '')}`;
    };

    const textureLoader = new THREE.TextureLoader();

    const loadSafe = (path: string, fallbackColor: string): THREE.Texture => {
      return textureLoader.load(
        getAssetUrl(path),
        (tex) => {
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          if (this.renderer) {
            tex.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
          } else {
            tex.anisotropy = 16;
          }
          tex.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.warn(`[GlobeScene] Failed to load texture ${path}, using fallback:`, err);
        }
      );
    };

    const dayTexture = loadSafe('earth-blue-marble.jpg', '#0f172a');
    const nightTexture = loadSafe('earth_lights.png', '#020617');
    const normalTexture = loadSafe('earth_normal.jpg', '#8080ff');
    const specularTexture = loadSafe('earth_specular.jpg', '#000000');
    const cloudTexture = loadSafe('earth_clouds.png', '#ffffff');

    // Earth Sphere Geometry
    const earthGeometry = new THREE.SphereGeometry(this.earthRadius, 96, 96);
    try {
      this.earthMaterial = createEarthMaterial({
        day: dayTexture,
        night: nightTexture,
        normal: normalTexture,
        specular: specularTexture,
      });
    } catch (err) {
      console.warn('[GlobeScene] Custom EarthShader failed, using fallback StandardMaterial:', err);
      this.earthMaterial = new THREE.MeshStandardMaterial({
        map: dayTexture,
        roughness: 0.8,
        metalness: 0.1,
      }) as unknown as THREE.ShaderMaterial;
    }

    this.earthMesh = new THREE.Mesh(earthGeometry, this.earthMaterial);
    this.scene.add(this.earthMesh);

    // Independent Cloud Sphere Layer (Tropospheric convective clouds)
    try {
      const cloudsGeometry = new THREE.SphereGeometry(this.earthRadius * 1.005, 96, 96);
      this.cloudsMaterial = createCloudsMaterial(cloudTexture);
      this.cloudsMesh = new THREE.Mesh(cloudsGeometry, this.cloudsMaterial);
      this.scene.add(this.cloudsMesh);
    } catch (err) {
      console.warn('[GlobeScene] Cloud sphere layer failed to initialize:', err);
    }

    // Outer Atmosphere Halo Mesh
    try {
      const atmosphereGeometry = new THREE.SphereGeometry(this.earthRadius * 1.018, 64, 64);
      this.atmosphereMaterial = createAtmosphereMaterial();
      this.atmosphereMesh = new THREE.Mesh(atmosphereGeometry, this.atmosphereMaterial);
      this.scene.add(this.atmosphereMesh);
    } catch (err) {
      console.warn('[GlobeScene] Atmosphere halo failed to initialize:', err);
    }
  }

  private initLayers(): void {
    this.cablesLayer = new CablesLayer(this.earthRadius);
    this.scene.add(this.cablesLayer.group);

    this.earthquakeLayer = new EarthquakeLayer(this.earthRadius);
    this.scene.add(this.earthquakeLayer.group);

    this.cctvLayer = new CctvLayer(this.earthRadius);
    this.scene.add(this.cctvLayer.group);

    this.newsLayer = new NewsLayer(this.earthRadius);
    this.scene.add(this.newsLayer.group);

    this.incidentsLayer = new IncidentsLayer(this.earthRadius);
    this.scene.add(this.incidentsLayer.group);

    this.maritimeLayer = new MaritimeLayer(this.earthRadius);
    this.scene.add(this.maritimeLayer.group);

    this.airLayer = new AirLayer(this.earthRadius);
    this.scene.add(this.airLayer.group);
  }

  private initEvents(): void {
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Create Swiss HUD floating tooltip
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'globe-hud-tooltip';
    this.tooltipEl.style.display = 'none';
    document.body.appendChild(this.tooltipEl);

    this.raycaster.params.Line = { threshold: 3.5 };

    const canvas = this.renderer.domElement;
    canvas.addEventListener('pointerdown', () => {
      this.controls.autoRotate = false;
    });

    const getRaycastUserData = (intersects: THREE.Intersection[]): any | null => {
      for (const hit of intersects) {
        let current: THREE.Object3D | null = hit.object;
        while (current && current !== this.scene) {
          if (current.userData && current.userData.type) {
            return current.userData;
          }
          current = current.parent;
        }
      }
      return null;
    };

    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const targets: THREE.Object3D[] = [];
      if (this.layerStates.cctv) targets.push(...this.cctvLayer.group.children);
      if (this.layerStates.earthquakes) targets.push(...this.earthquakeLayer.group.children);
      if (this.layerStates.sdk_air) targets.push(...this.airLayer.group.children);
      if (this.layerStates.cables) targets.push(...this.cablesLayer.group.children);
      if (this.layerStates.maritime) targets.push(...this.maritimeLayer.group.children);
      if (this.layerStates.global_incidents) targets.push(...this.incidentsLayer.group.children);
      if (this.layerStates.live_news) targets.push(...this.newsLayer.group.children);

      const intersects = this.raycaster.intersectObjects(targets, true);
      const userData = getRaycastUserData(intersects);
      if (userData) {
        canvas.style.cursor = 'pointer';
        this.updateTooltip(userData, e.clientX, e.clientY);
      } else {
        canvas.style.cursor = 'grab';
        this.hideTooltip();
      }
    });

    canvas.addEventListener('pointerleave', () => {
      this.hideTooltip();
    });

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const targets: THREE.Object3D[] = [];
      if (this.layerStates.cctv) targets.push(...this.cctvLayer.group.children);
      if (this.layerStates.earthquakes) targets.push(...this.earthquakeLayer.group.children);
      if (this.layerStates.sdk_air) targets.push(...this.airLayer.group.children);
      if (this.layerStates.cables) targets.push(...this.cablesLayer.group.children);
      if (this.layerStates.maritime) targets.push(...this.maritimeLayer.group.children);
      if (this.layerStates.global_incidents) targets.push(...this.incidentsLayer.group.children);
      if (this.layerStates.live_news) targets.push(...this.newsLayer.group.children);

      const intersects = this.raycaster.intersectObjects(targets, true);
      const userData = getRaycastUserData(intersects);
      if (userData) {
        if (userData.type === 'cctv' && userData.point) {
          const pt = userData.point as CCTVPoint;
          this.focusCoordinates(pt.lat, pt.lon);
          this.onSelectCctv?.(pt);
        } else if (userData.type === 'earthquake' && userData.quake) {
          const q = userData.quake as EarthquakeItem;
          this.focusCoordinates(q.lat, q.lon);
          this.onSelectEarthquake?.(q);
        } else if (userData.type === 'incident' && userData.incident) {
          const inc = userData.incident as GeoIncident;
          this.focusCoordinates(inc.lat, inc.lon);
          this.onSelectIncident?.(inc);
        } else if (userData.type === 'news' && userData.item) {
          const nw = userData.item as GeoNewsItem;
          this.focusCoordinates(nw.lat, nw.lon);
          this.onSelectNews?.(nw);
        }
      }
    });
  }

  private updateTooltip(userData: any, clientX: number, clientY: number): void {
    if (!this.tooltipEl || !userData || !userData.type) {
      this.hideTooltip();
      return;
    }

    let badgeText = '';
    let badgeClass = '';
    let titleText = '';
    let detailText = '';

    if (userData.type === 'earthquake' && userData.quake) {
      const q: EarthquakeItem = userData.quake;
      const minAgo = Math.max(1, Math.floor((Date.now() - q.time) / 60000));
      const timeStr = minAgo < 60 ? `${minAgo} 分鐘前` : `${Math.floor(minAgo / 60)} 小時前`;
      badgeText = 'USGS 地震';
      badgeClass = q.mag >= 6.0 ? 'badge-critical' : q.mag >= 4.5 ? 'badge-elevated' : 'badge-monitor';
      titleText = `規模: M${q.mag.toFixed(1)} | 深度: ${q.depth.toFixed(0)}km | 震央: ${q.place} | 時間: ${timeStr}`;
      detailText = `座標: ${q.lat.toFixed(2)}°, ${q.lon.toFixed(2)}° (點擊聚焦震央)`;
    } else if (userData.type === 'cctv' && userData.point) {
      const pt: CCTVPoint = userData.point;
      badgeText = '即時監視攝影機';
      badgeClass = 'badge-cctv';
      titleText = `${pt.name}`;
      detailText = `地點: ${pt.city}, ${pt.country} | 點擊連動下方播放矩陣`;
    } else if (userData.type === 'cable') {
      badgeText = '海底光纜 (Cables)';
      badgeClass = 'badge-cable';
      titleText = `${userData.name || '全球海底光纜'}`;
      const len = userData.lengthKm ? `${userData.lengthKm.toLocaleString()} km` : '跨洋多節點';
      const landing = userData.landingCity ? `據點: ${userData.landingCity}, ${userData.landingCountry}` : '國際海底高頻寬骨幹';
      detailText = `長度: ${len} | ${landing}`;
    } else if (userData.type === 'air_corridor' || userData.type === 'aircraft') {
      badgeText = '國際航空 (Air Corridors)';
      badgeClass = 'badge-air';
      titleText = `航線代號: ${userData.code || 'AIR'} // ${userData.name}`;
      detailText = `巡航高度: ${userData.altitude || 'FL380 (平流層 Stratosphere / 11,600m)'}`;
    } else if (userData.type === 'maritime') {
      badgeText = '海運航道 (Maritime)';
      badgeClass = 'badge-maritime';
      titleText = `${userData.name || '戰略通航航道'}`;
      detailText = `類型: ${userData.route?.type || '戰略航運咽喉'}`;
    } else if (userData.type === 'incident' && userData.incident) {
      const inc: GeoIncident = userData.incident;
      badgeText = '全球地緣事件';
      badgeClass = inc.level === 'CRITICAL' ? 'badge-critical' : 'badge-elevated';
      titleText = `事件: ${inc.title} / 地點: ${inc.location}`;
      detailText = `情報層級: ${inc.level} | 座標: ${inc.lat.toFixed(2)}°, ${inc.lon.toFixed(2)}°`;
    } else if (userData.type === 'news' && userData.item) {
      const nw: GeoNewsItem = userData.item;
      badgeText = '即時全球新聞';
      badgeClass = 'badge-news';
      titleText = `焦點: ${nw.headline}`;
      detailText = `來源: ${nw.source} | 地點: ${nw.city} (${nw.time}) | 點擊定位`;
    } else {
      this.hideTooltip();
      return;
    }

    this.tooltipEl.innerHTML = `
      <div class="hud-tooltip-header">
        <span class="hud-tooltip-badge ${badgeClass}">[${badgeText}]</span>
      </div>
      <div class="hud-tooltip-title">${titleText}</div>
      <div class="hud-tooltip-detail">${detailText}</div>
    `;

    const offset = 15;
    let left = clientX + offset;
    let top = clientY + offset;

    const w = 380;
    if (left + w > window.innerWidth) {
      left = Math.max(10, clientX - w - offset);
    }
    if (top + 90 > window.innerHeight) {
      top = Math.max(10, clientY - 90 - offset);
    }

    this.tooltipEl.style.left = `${left}px`;
    this.tooltipEl.style.top = `${top}px`;
    this.tooltipEl.style.display = 'block';
  }

  private hideTooltip(): void {
    if (this.tooltipEl) {
      this.tooltipEl.style.display = 'none';
    }
  }

  public focusCoordinates(lat: number, lon: number, distance = 160): void {
    const targetVector = latLonToVector3(lat, lon, distance);
    const startPos = this.camera.position.clone();
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateCamera = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth easeInOutCubic
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      this.camera.position.lerpVectors(startPos, targetVector, ease);
      this.controls.update();

      if (t < 1) {
        requestAnimationFrame(animateCamera);
      }
    };

    requestAnimationFrame(animateCamera);
  }

  public toggleLayer(layerKey: keyof GlobeLayerState, enabled?: boolean): boolean {
    const nextState = enabled !== undefined ? enabled : !this.layerStates[layerKey];
    this.layerStates[layerKey] = nextState;

    switch (layerKey) {
      case 'cctv':
        this.cctvLayer.setVisible(nextState);
        break;
      case 'live_news':
        this.newsLayer.setVisible(nextState);
        break;
      case 'earthquakes':
        this.earthquakeLayer.setVisible(nextState);
        break;
      case 'global_incidents':
        this.incidentsLayer.setVisible(nextState);
        break;
      case 'cables':
        this.cablesLayer.setVisible(nextState);
        break;
      case 'maritime':
        this.maritimeLayer.setVisible(nextState);
        break;
      case 'sdk_air':
        this.airLayer.setVisible(nextState);
        break;
      case 'day_night':
        // If day_night is false, fixed sun position directly behind camera for uniform daylight
        break;
    }

    return nextState;
  }

  public getLayerStates(): GlobeLayerState {
    return { ...this.layerStates };
  }

  private onWindowResize(): void {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / (height || 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private start(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const renderLoop = () => {
      if (!this.isAnimating) return;
      requestAnimationFrame(renderLoop);

      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();

      // Controls
      this.controls.update();

      // Astronomical Solar Vector update (UTC time)
      if (this.earthMaterial && this.earthMaterial.uniforms) {
        let sunVector: THREE.Vector3;
        if (this.layerStates.day_night) {
          sunVector = getSunDirectionVector(new Date());
        } else {
          // Daylight uniform light facing camera
          sunVector = this.camera.position.clone().normalize();
        }

        this.earthMaterial.uniforms.uSunDirection.value.copy(sunVector);
        this.earthMaterial.uniforms.uTime.value = elapsed;

        if (this.atmosphereMaterial && this.atmosphereMaterial.uniforms) {
          this.atmosphereMaterial.uniforms.uSunDirection.value.copy(sunVector);
        }

        if (this.cloudsMaterial && this.cloudsMaterial.uniforms) {
          this.cloudsMaterial.uniforms.uSunDirection.value.copy(sunVector);
        }
      }

      // Clouds rotation (slightly faster than earth auto-rotation)
      if (this.cloudsMesh) {
        this.cloudsMesh.rotation.y += delta * 0.015;
      }

      // Layer animations
      if (this.layerStates.cables) this.cablesLayer.update(delta);
      if (this.layerStates.earthquakes) this.earthquakeLayer.update(delta);
      if (this.layerStates.cctv) this.cctvLayer.update(delta);
      if (this.layerStates.live_news) this.newsLayer.update(delta);
      if (this.layerStates.global_incidents) this.incidentsLayer.update(delta);
      if (this.layerStates.maritime) this.maritimeLayer.update(delta);
      if (this.layerStates.sdk_air) this.airLayer.update(delta);

      this.renderer.render(this.scene, this.camera);
    };

    renderLoop();
  }

  public setAutoRotate(enabled: boolean): void {
    this.controls.autoRotate = enabled;
  }

  public destroy(): void {
    this.isAnimating = false;
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    if (this.tooltipEl && this.tooltipEl.parentElement) {
      this.tooltipEl.parentElement.removeChild(this.tooltipEl);
    }
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
