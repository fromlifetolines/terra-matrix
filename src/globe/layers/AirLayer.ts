import * as THREE from 'three';
import { AVIATION_ROUTES } from '../../data/routes';
import { latLonToVector3 } from '../../utils/coordinates';

export class AirLayer {
  public group: THREE.Group;
  private lineMaterial: THREE.LineBasicMaterial;
  private aircrafts: { mesh: THREE.Mesh; points: THREE.Vector3[]; progress: number; speed: number }[] = [];

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'air-layer';

    this.lineMaterial = new THREE.LineBasicMaterial({
      color: 0x93c5fd, // Light sky blue
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    this.buildAirCorridors(earthRadius);
  }

  private buildAirCorridors(radius: number): void {
    const planeGeo = new THREE.ConeGeometry(0.18, 0.5, 6);
    planeGeo.rotateX(Math.PI / 2);

    for (const route of AVIATION_ROUTES) {
      const allPoints: THREE.Vector3[] = [];

      for (let i = 0; i < route.waypoints.length - 1; i++) {
        const [lat1, lon1] = route.waypoints[i];
        const [lat2, lon2] = route.waypoints[i + 1];

        const p1 = latLonToVector3(lat1, lon1, radius);
        const p2 = latLonToVector3(lat2, lon2, radius);

        // Subdivide with parabolic altitude arc (stratospheric cruise)
        const segments = 16;
        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const arcAltitude = 1.0 + Math.sin(t * Math.PI) * 0.045; // peak ~4.5% above surface
          const pt = new THREE.Vector3().copy(p1).lerp(p2, t).normalize().multiplyScalar(radius * arcAltitude);
          allPoints.push(pt);
        }
      }

      const geom = new THREE.BufferGeometry().setFromPoints(allPoints);
      const line = new THREE.Line(geom, this.lineMaterial);
      this.group.add(line);

      // Moving aircraft on flight route
      if (allPoints.length > 2) {
        const planeMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
        const planeMesh = new THREE.Mesh(planeGeo, planeMat);
        this.group.add(planeMesh);

        this.aircrafts.push({
          mesh: planeMesh,
          points: allPoints,
          progress: Math.random(),
          speed: 0.035 + Math.random() * 0.02,
        });
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

      plane.mesh.position.lerpVectors(p1, p2, subT);
      if (p2.distanceTo(p1) > 0.001) {
        plane.mesh.lookAt(p2);
      }
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
