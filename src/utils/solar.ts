import * as THREE from 'three';

/**
 * Computes the astronomical unit sun position vector relative to the Earth's center
 * based on current UTC time and solar declination.
 */
export function getSunDirectionVector(date: Date = new Date()): THREE.Vector3 {
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const diffMs = date.getTime() - startOfYear.getTime();
  const dayOfYear = diffMs / (1000 * 60 * 60 * 24);

  // Approximate solar declination in radians (-23.44 deg to +23.44 deg)
  const declination = -23.44 * (Math.PI / 180) * Math.cos((2 * Math.PI / 365.25) * (dayOfYear + 10));

  // Subsolar longitude in degrees: at 12:00 UTC the subsolar meridian is ~0 deg.
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const sunLon = (12 - utcHours) * 15; // degrees

  const phi = Math.PI / 2 - declination;
  const theta = (sunLon + 180) * (Math.PI / 180);

  const x = -(Math.sin(phi) * Math.cos(theta));
  const z = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);

  return new THREE.Vector3(x, y, z).normalize();
}
