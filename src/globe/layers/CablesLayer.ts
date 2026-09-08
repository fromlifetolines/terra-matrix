import * as THREE from 'three';
import { UNDERSEA_CABLES, type UnderseaCable } from '../../data/cables';
import { latLonToVector3 } from '../../utils/coordinates';

function computeCableLengthKm(points: [number, number][]): number {
  let totalKm = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [lon1, lat1] = points[i];
    const [lon2, lat2] = points[i + 1];
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalKm += 6371 * c;
  }
  return Math.round(totalKm);
}

export class CablesLayer {
  public group: THREE.Group;
  private lineMaterial: THREE.LineBasicMaterial;
  private pulseUniforms: { uTime: { value: number } };

  constructor(earthRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'cables-layer';

    this.pulseUniforms = { uTime: { value: 0 } };

    // Undersea cables: Cool cyan glowing lines
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
    const landingGeo = new THREE.SphereGeometry(0.35, 10, 10);
    const landingMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    for (const cable of UNDERSEA_CABLES) {
      if (!cable.points || cable.points.length < 2) continue;

      const positions: number[] = [];
      const lengthKm = computeCableLengthKm(cable.points);

      const cableUserData = {
        type: 'cable',
        cable,
        name: cable.name,
        lengthKm,
        landingPoints: cable.landingPoints,
      };

      for (let i = 0; i < cable.points.length; i++) {
        const [lon, lat] = cable.points[i];
        const v = latLonToVector3(lat, lon, cableRadius);
        positions.push(v.x, v.y, v.z);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const line = new THREE.Line(geometry, this.lineMaterial);
      line.userData = cableUserData;
      this.group.add(line);

      // Add landing point markers if present
      if (cable.landingPoints && cable.landingPoints.length > 0) {
        for (const lp of cable.landingPoints) {
          const lpPos = latLonToVector3(lp.lat, lp.lon, cableRadius * 1.0005);
          const marker = new THREE.Mesh(landingGeo, landingMat);
          marker.position.copy(lpPos);
          marker.userData = {
            ...cableUserData,
            landingCity: lp.city,
            landingCountry: lp.countryName || lp.country,
          };
          this.group.add(marker);
        }
      }
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

