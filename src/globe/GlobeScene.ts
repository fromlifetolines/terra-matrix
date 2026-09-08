import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createEarthMaterial, createAtmosphereMaterial } from './EarthShader';
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
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  private earthMesh!: THREE.Mesh;
  private earthMaterial!: THREE.ShaderMaterial;
  private atmosphereMesh!: THREE.Mesh;
  private atmosphereMaterial!: THREE.ShaderMaterial;

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

  private initEarth(): void {
    const baseUrl = import.meta.env.BASE_URL;
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load(`${baseUrl}textures/earth-blue-marble.jpg`);
    const nightTexture = textureLoader.load(`${baseUrl}textures/earth_lights.png`);
    const normalTexture = textureLoader.load(`${baseUrl}textures/earth_normal.jpg`);
    const specularTexture = textureLoader.load(`${baseUrl}textures/earth_specular.jpg`);

    [dayTexture, nightTexture, normalTexture, specularTexture].forEach((tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
    });

    // Earth Sphere Geometry
    const earthGeometry = new THREE.SphereGeometry(this.earthRadius, 96, 96);
    this.earthMaterial = createEarthMaterial({
      day: dayTexture,
      night: nightTexture,
      normal: normalTexture,
      specular: specularTexture,
    });

    this.earthMesh = new THREE.Mesh(earthGeometry, this.earthMaterial);
    this.scene.add(this.earthMesh);

    // Outer Atmosphere Halo Mesh
    const atmosphereGeometry = new THREE.SphereGeometry(this.earthRadius * 1.018, 64, 64);
    this.atmosphereMaterial = createAtmosphereMaterial();
    this.atmosphereMesh = new THREE.Mesh(atmosphereGeometry, this.atmosphereMaterial);
    this.scene.add(this.atmosphereMesh);
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

    const canvas = this.renderer.domElement;
    canvas.addEventListener('pointerdown', () => {
      this.controls.autoRotate = false;
    });

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const targets = [
        ...this.cctvLayer.group.children,
        ...this.earthquakeLayer.group.children,
        ...this.incidentsLayer.group.children,
        ...this.newsLayer.group.children,
      ];

      const intersects = this.raycaster.intersectObjects(targets, false);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData?.type === 'cctv') {
          const pt = obj.userData.point as CCTVPoint;
          this.focusCoordinates(pt.lat, pt.lon);
          this.onSelectCctv?.(pt);
        } else if (obj.userData?.type === 'incident') {
          const inc = obj.userData.incident as GeoIncident;
          this.focusCoordinates(inc.lat, inc.lon);
          this.onSelectIncident?.(inc);
        } else if (obj.userData?.type === 'news') {
          const nw = obj.userData.item as GeoNewsItem;
          this.focusCoordinates(nw.lat, nw.lon);
          this.onSelectNews?.(nw);
        }
      }
    });
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
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
