import * as THREE from 'three';
import { CCTV_PRESETS, type CCTVPoint } from '../../data/cctv-presets';
import { latLonToVector3 } from '../../utils/coordinates';

export class CctvLayer {
  public group: THREE.Group;
  private beacons: { mesh: THREE.Mesh; ring: THREE.Mesh; point: CCTVPoint }[] = [];
  private pulseTime = 0;
  public onSelectPoint?: (point: CCTVPoint) => void;

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'cctv-layer';

    this.buildBeacons(earthRadius);
  }

  private buildBeacons(radius: number): void {
    const beaconRadius = radius * 1.004;
    const ringGeo = new THREE.RingGeometry(0.4, 0.6, 24);

    for (const point of CCTV_PRESETS) {
      const pos = latLonToVector3(point.lat, point.lon, beaconRadius);
      const normal = pos.clone().normalize();
      const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

      // Core point (pulsing cyan / emerald)
      const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: point.category === 'port' ? 0x06b6d4 : 0x10b981,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.copy(pos);
      coreMesh.userData = { type: 'cctv', point };
      this.group.add(coreMesh);

      // Radar pulse ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.quaternion.copy(orientation);
      this.group.add(ringMesh);

      this.beacons.push({ mesh: coreMesh, ring: ringMesh, point });
    }
  }

  public update(deltaTime: number): void {
    this.pulseTime += deltaTime;
    const ringScale = 1.0 + (Math.sin(this.pulseTime * 3.0) * 0.5 + 0.5) * 1.8;
    const ringOpacity = Math.max(0, 1.0 - (ringScale - 1.0) / 1.8) * 0.75;

    for (const b of this.beacons) {
      b.ring.scale.set(ringScale, ringScale, 1);
      (b.ring.material as THREE.MeshBasicMaterial).opacity = ringOpacity;
    }
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
