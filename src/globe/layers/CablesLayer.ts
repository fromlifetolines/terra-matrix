import * as THREE from 'three';
import { UNDERSEA_CABLES } from '../../data/cables';
import { latLonToVector3 } from '../../utils/coordinates';

export class CablesLayer {
  public group: THREE.Group;
  private lineMaterial: THREE.LineBasicMaterial;
  private pulseUniforms: { uTime: { value: number } };

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'cables-layer';

    this.pulseUniforms = { uTime: { value: 0 } };

    // Undersea cables: Cool white / cyan glowing lines, opacity 0.45
    this.lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5eead4, // Cyan-teal
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.buildCables(earthRadius);
  }

  private buildCables(radius: number): void {
    const cableRadius = radius * 1.0015; // Slightly above sphere surface to prevent z-fighting

    for (const cable of UNDERSEA_CABLES) {
      if (!cable.points || cable.points.length < 2) continue;

      const positions: number[] = [];

      for (let i = 0; i < cable.points.length; i++) {
        const [lon, lat] = cable.points[i];
        const v = latLonToVector3(lat, lon, cableRadius);
        positions.push(v.x, v.y, v.z);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const line = new THREE.Line(geometry, this.lineMaterial);
      this.group.add(line);
    }
  }

  public update(deltaTime: number): void {
    this.pulseUniforms.uTime.value += deltaTime;
    // Subtle breathing pulse on cables
    const pulse = 0.4 + 0.15 * Math.sin(this.pulseUniforms.uTime.value * 1.5);
    this.lineMaterial.opacity = pulse;
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }
}
