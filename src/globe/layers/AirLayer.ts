import * as THREE from 'three';
import { AVIATION_ROUTES } from '../../data/routes';
import { latLonToVector3 } from '../../utils/coordinates';

export class AirLayer {
  public group: THREE.Group;
  private lineMaterial: THREE.LineBasicMaterial;
  private aircrafts: { group: THREE.Group; points: THREE.Vector3[]; progress: number; speed: number }[] = [];

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'air-layer';

    // Cold white thin lines, opacity 0.3
    this.lineMaterial = new THREE.LineBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.30,
      depthWrite: false,
    });

    this.buildAirCorridors(earthRadius);
  }

  private buildAirCorridors(radius: number): void {
    const coreGeo = new THREE.SphereGeometry(0.32, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const glowGeo = new THREE.SphereGeometry(0.65, 12, 12);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    for (const route of AVIATION_ROUTES) {
      const allPoints: THREE.Vector3[] = [];

      for (let i = 0; i < route.waypoints.length - 1; i++) {
        const [lat1, lon1] = route.waypoints[i];
        const [lat2, lon2] = route.waypoints[i + 1];

        const p1 = latLonToVector3(lat1, lon1, radius);
        const p2 = latLonToVector3(lat2, lon2, radius);

        // Subdivide with parabolic altitude arc (stratospheric cruise)
        const segments = 24;
        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const arcAltitude = 1.008 + Math.sin(t * Math.PI) * 0.038; // stratospheric altitude
          const pt = new THREE.Vector3().copy(p1).lerp(p2, t).normalize().multiplyScalar(radius * arcAltitude);
          allPoints.push(pt);
        }
      }

      const geom = new THREE.BufferGeometry().setFromPoints(allPoints);
      const corridorUserData = {
        type: 'air_corridor',
        route,
        code: route.id.toUpperCase(),
        name: route.name,
        altitude: 'FL380 (~11,600m / 平流層 Stratosphere)',
      };

      const line = new THREE.Line(geom, this.lineMaterial);
      line.userData = corridorUserData;
      this.group.add(line);

      // Moving glowing aircraft particles along flight corridor
      if (allPoints.length > 2) {
        // Spawn 1 to 2 aircraft per route
        const planesCount = route.type === 'Intercontinental' ? 2 : 1;
        for (let p = 0; p < planesCount; p++) {
          const planeGroup = new THREE.Group();
          const coreMesh = new THREE.Mesh(coreGeo, coreMat);
          const glowMesh = new THREE.Mesh(glowGeo, glowMat);

          planeGroup.userData = corridorUserData;
          coreMesh.userData = corridorUserData;
          glowMesh.userData = corridorUserData;

          planeGroup.add(coreMesh);
          planeGroup.add(glowMesh);

          this.group.add(planeGroup);

          this.aircrafts.push({
            group: planeGroup,
            points: allPoints,
            progress: (p * 0.5 + Math.random() * 0.4) % 1.0,
            speed: 0.025 + Math.random() * 0.02,
          });
        }
      }
    }
  }

  public update(deltaTime: number): void {
    for (const plane of this.aircrafts) {
      plane.progress = (plane.progress + deltaTime * plane.speed) % 1.0;
      const index = Math.floor(plane.progress * (plane.points.length - 1));
      const nextIndex = Math.min(index + 1, plane.points.length - 1);

      const p1 = plane.points[index];
      const p2 = plane.points[nextIndex];
      const subT = (plane.progress * (plane.points.length - 1)) - index;

      plane.group.position.lerpVectors(p1, p2, subT);
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
