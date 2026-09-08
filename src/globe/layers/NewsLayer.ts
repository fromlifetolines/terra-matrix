import * as THREE from 'three';
import { LIVE_NEWS_POINTS, type GeoNewsItem } from '../../data/incidents-news';
import { latLonToVector3 } from '../../utils/coordinates';

export class NewsLayer {
  public group: THREE.Group;
  private markers: { mesh: THREE.Mesh; item: GeoNewsItem }[] = [];
  private pulseTime = 0;

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'news-layer';

    this.buildMarkers(earthRadius);
  }

  private buildMarkers(radius: number): void {
    const markerRadius = radius * 1.004;

    for (const item of LIVE_NEWS_POINTS) {
      const pos = latLonToVector3(item.lat, item.lon, markerRadius);

      // Core point (pulsing sapphire blue)
      const coreGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const mesh = new THREE.Mesh(coreGeo, coreMat);
      mesh.position.copy(pos);
      mesh.userData = { type: 'news', item };

      this.group.add(mesh);
      this.markers.push({ mesh, item });
    }
  }

  public update(deltaTime: number): void {
    this.pulseTime += deltaTime;
    const s = 1.0 + 0.3 * Math.sin(this.pulseTime * 4.0);
    for (const m of this.markers) {
      m.mesh.scale.set(s, s, s);
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
