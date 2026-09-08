import * as THREE from 'three';

/**
 * Converts latitude and longitude in degrees to a 3D Cartesian Vector3 on a sphere of given radius.
 * Accurately aligns with Three.js SphereGeometry equirectangular UV mapping.
 *
 * @param lat Latitude (-90 to 90)
 * @param lon Longitude (-180 to 180)
 * @param radius Sphere radius
 */
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Great circle interpolation between two lat/lon coordinates.
 */
export function interpolateGreatCircle(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  pointsCount: number,
  radius: number
): THREE.Vector3[] {
  const v1 = latLonToVector3(lat1, lon1, radius);
  const v2 = latLonToVector3(lat2, lon2, radius);

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= pointsCount; i++) {
    const t = i / pointsCount;
    // Slerp along unit sphere then scale
    const p = new THREE.Vector3().copy(v1).lerp(v2, t).normalize().multiplyScalar(radius);
    points.push(p);
  }
  return points;
}
