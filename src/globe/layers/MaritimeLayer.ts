import * as THREE from 'three';
import { MARITIME_ROUTES } from '../../data/routes';
import { latLonToVector3, interpolateGreatCircle } from '../../utils/coordinates';

export class MaritimeLayer {
  public group: THREE.Group;
  private lineMaterial: THREE.LineBasicMaterial;
  private ships: { mesh: THREE.Mesh; curvePoints: THREE.Vector3[]; progress: number; speed: number }[] = [];

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'maritime-layer';

    this.lineMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981, // Emerald green
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    this.buildRoutes(earthRadius);
  }

  private buildRoutes(radius: number): void {
    const routeRadius = radius * 1.002;
    const shipGeo = new THREE.ConeGeometry(0.2, 0.6, 8);
    shipGeo.rotateX(Math.PI / 2);

    for (const route of MARITIME_ROUTES) {
      const allPoints: THREE.Vector3[] = [];

      for (let i = 0; i < route.waypoints.length - 1; i++) {
        const [lat1, lon1] = route.waypoints[i];
        const [lat2, lon2] = route.waypoints[i + 1];
        const seg = interpolateGreatCircle(lat1, lon1, lat2, lon2, 12, routeRadius);
        allPoints.push(...seg);
      }

      const geom = new THREE.BufferGeometry().setFromPoints(allPoints);
      const maritimeUserData = {
        type: 'maritime',
        route,
        name: route.name,
      };

      const line = new THREE.Line(geom, this.lineMaterial);
      line.userData = maritimeUserData;
      this.group.add(line);

      // Add a moving ship along route
      if (allPoints.length > 2) {
        const shipMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
        const shipMesh = new THREE.Mesh(shipGeo, shipMat);
        shipMesh.userData = maritimeUserData;
        this.group.add(shipMesh);

        this.ships.push({
          mesh: shipMesh,
          curvePoints: allPoints,
          progress: Math.random(),
          speed: 0.025 + Math.random() * 0.02,
        });
      }
    }
  }

  public update(deltaTime: number): void {
    for (const ship of this.ships) {
      ship.progress = (ship.progress + deltaTime * ship.speed) % 1.0;
      const index = Math.floor(ship.progress * (ship.curvePoints.length - 1));
      const nextIndex = Math.min(index + 1, ship.curvePoints.length - 1);

      const p1 = ship.curvePoints[index];
      const p2 = ship.curvePoints[nextIndex];
      const subT = (ship.progress * (ship.curvePoints.length - 1)) - index;

      ship.mesh.position.lerpVectors(p1, p2, subT);
      if (p2.distanceTo(p1) > 0.001) {
        ship.mesh.lookAt(p2);
      }
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
