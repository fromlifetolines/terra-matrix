import * as THREE from 'three';
import { GLOBAL_INCIDENTS, type GeoIncident } from '../../data/incidents-news';
import { latLonToVector3 } from '../../utils/coordinates';

export class IncidentsLayer {
  public group: THREE.Group;
  private markers: { mesh: THREE.Mesh; incident: GeoIncident }[] = [];
  private pulseTime = 0;

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'incidents-layer';

    this.buildIncidents(earthRadius);
  }

  private buildIncidents(radius: number): void {
    const markerRadius = radius * 1.005;
    const geom = new THREE.OctahedronGeometry(0.45, 0);

    for (const incident of GLOBAL_INCIDENTS) {
      const pos = latLonToVector3(incident.lat, incident.lon, markerRadius);
      const color = incident.level === 'CRITICAL' ? 0xf43f5e : 0xf59e0b;

      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(pos);
      mesh.userData = { type: 'incident', incident };

      this.group.add(mesh);
      this.markers.push({ mesh, incident });
    }
  }

  public update(deltaTime: number): void {
    this.pulseTime += deltaTime;
    const rotSpeed = deltaTime * 1.2;

    for (const m of this.markers) {
      m.mesh.rotation.y += rotSpeed;
      m.mesh.rotation.x += rotSpeed * 0.5;
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
