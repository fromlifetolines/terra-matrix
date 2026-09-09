import * as THREE from 'three';
import { latLonToVector3 } from '../../utils/coordinates';

export interface EarthquakeItem {
  id: string;
  mag: number;
  place: string;
  time: number;
  lat: number;
  lon: number;
  depth: number;
  tsunami?: number;
}

interface RippleAnim {
  rings: THREE.Mesh[];
  maxScale: number;
  speed: number;
  phase: number;
}

export class EarthquakeLayer {
  public group: THREE.Group;
  private earthRadius: number;
  private ripples: RippleAnim[] = [];
  public quakes: EarthquakeItem[] = [];
  private ringGeometry: THREE.RingGeometry;

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'earthquake-layer';
    this.earthRadius = earthRadius;
    this.ringGeometry = new THREE.RingGeometry(0.8, 1.0, 32);

    void this.fetchLiveQuakes();
  }

  public async fetchLiveQuakes(): Promise<void> {
    try {
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
      if (!res.ok) throw new Error(`USGS HTTP ${res.status}`);
      const data = await res.json();
      
      const items: EarthquakeItem[] = [];
      for (const feature of data.features || []) {
        const [lon, lat, depth] = feature.geometry.coordinates;
        const mag = feature.properties.mag ?? 3.0;
        items.push({
          id: feature.id,
          mag,
          place: feature.properties.place || 'Unknown location',
          time: feature.properties.time,
          lat,
          lon,
          depth
        });
      }

      this.quakes = items.slice(0, 80); // Top 80 recent earthquakes
      this.rebuildMeshes();
    } catch (err) {
      console.warn('[EarthquakeLayer] USGS fetch failed, using fallback seismic data:', err);
      this.loadFallbackQuakes();
    }
  }

  private loadFallbackQuakes(): void {
    this.quakes = [
      { id: 'q1', mag: 7.2, place: 'Hualien Offshore, Taiwan', time: Date.now() - 3600000, lat: 23.85, lon: 121.65, depth: 15 },
      { id: 'q2', mag: 6.8, place: 'Noto Peninsula, Japan', time: Date.now() - 7200000, lat: 37.5, lon: 137.2, depth: 10 },
      { id: 'q3', mag: 5.9, place: 'Mindanao, Philippines', time: Date.now() - 10800000, lat: 8.2, lon: 126.1, depth: 25 },
      { id: 'q4', mag: 6.3, place: 'Tonga Islands Region', time: Date.now() - 14400000, lat: -18.5, lon: -174.5, depth: 40 },
      { id: 'q5', mag: 5.4, place: 'Northern Chile Offshore', time: Date.now() - 18000000, lat: -23.1, lon: -70.8, depth: 32 },
      { id: 'q6', mag: 5.1, place: 'Southern Alaska', time: Date.now() - 21600000, lat: 61.2, lon: -150.1, depth: 45 },
    ];
    this.rebuildMeshes();
  }

  private rebuildMeshes(): void {
    // Clear old
    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
    }
    this.ripples = [];

    const surfaceRadius = this.earthRadius * 1.002;

    for (const q of this.quakes) {
      const pos = latLonToVector3(q.lat, q.lon, surfaceRadius);
      const normal = pos.clone().normalize();

      // Color code by Richter magnitude
      let colorHex = 0xfacc15; // Yellow for < 4.5
      let baseScale = 1.2;
      if (q.mag >= 6.0) {
        colorHex = 0xef4444; // Red for >= 6.0
        baseScale = 2.8;
      } else if (q.mag >= 4.5) {
        colorHex = 0xf97316; // Orange for 4.5 - 6.0
        baseScale = 1.9;
      }

      // Orientation quaternion to align local Z to sphere normal
      const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

      // Center core point
      const dotGeo = new THREE.SphereGeometry(0.25 * (q.mag / 4), 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      dotMesh.userData = { type: 'earthquake', quake: q };
      this.group.add(dotMesh);

      // Create 2 concentric ripple rings
      const rings: THREE.Mesh[] = [];
      for (let r = 0; r < 2; r++) {
        const ringMat = new THREE.MeshBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const ringMesh = new THREE.Mesh(this.ringGeometry, ringMat);
        ringMesh.position.copy(pos);
        ringMesh.quaternion.copy(orientation);
        ringMesh.userData = { type: 'earthquake', quake: q };
        this.group.add(ringMesh);
        rings.push(ringMesh);
      }

      this.ripples.push({
        rings,
        maxScale: baseScale * 2.2,
        speed: 0.8 + (q.mag / 10),
        phase: Math.random(),
      });
    }
  }

  public update(deltaTime: number): void {
    for (const item of this.ripples) {
      item.phase = (item.phase + deltaTime * item.speed) % 1.0;

      item.rings.forEach((ring, idx) => {
        // Offset phases between concentric rings
        const ringPhase = (item.phase + idx * 0.5) % 1.0;
        const currentScale = 0.2 + ringPhase * item.maxScale;
        ring.scale.set(currentScale, currentScale, 1);

        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, (1.0 - ringPhase) * 0.85);
      });
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
