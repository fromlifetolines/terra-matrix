import * as THREE from 'three';

export interface EarthShaderUniforms {
  uDayMap: { value: THREE.Texture | null };
  uNightMap: { value: THREE.Texture | null };
  uNormalMap: { value: THREE.Texture | null };
  uSpecularMap: { value: THREE.Texture | null };
  uSunDirection: { value: THREE.Vector3 };
  uTime: { value: number };
}

/**
 * Photorealistic Earth Surface Shader:
 * - Ultra-subtle terrain normal relief (0.15 - 0.2 intensity) eliminating dryness/noise
 * - Clean physical day/night terminator without magenta/purple artifacts
 * - Deep dark night hemisphere showing pure black + NASA Black Marble golden city lights
 * - Smooth ocean specular highlight strictly in daytime
 * - Soft amber sunset glow along the terminator
 */
export function createEarthMaterial(textures: {
  day: THREE.Texture;
  night: THREE.Texture;
  normal: THREE.Texture;
  specular: THREE.Texture;
}): THREE.ShaderMaterial {
  const uniforms: EarthShaderUniforms = {
    uDayMap: { value: textures.day },
    uNightMap: { value: textures.night },
    uNormalMap: { value: textures.normal },
    uSpecularMap: { value: textures.specular },
    uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
    uTime: { value: 0 },
  };

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  const fragmentShader = /* glsl */ `
    uniform sampler2D uDayMap;
    uniform sampler2D uNightMap;
    uniform sampler2D uNormalMap;
    uniform sampler2D uSpecularMap;
    uniform vec3 uSunDirection;
    uniform float uTime;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    void main() {
      // Base normal on sphere
      vec3 N0 = normalize(vWorldNormal);
      
      // Spherical tangent frame
      vec3 up = vec3(0.0, 1.0, 0.0);
      vec3 tangent = normalize(cross(up, N0));
      if (length(tangent) < 0.001) tangent = vec3(1.0, 0.0, 0.0);
      vec3 bitangent = cross(N0, tangent);

      // Controlled terrain normal map: strength strictly pressed to 0.16 for smooth satellite relief
      vec3 normalTex = (texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0);
      float normalStrength = 0.16;
      vec3 N = normalize(N0 + (tangent * normalTex.x + bitangent * normalTex.y) * normalStrength);

      vec3 L = normalize(uSunDirection);
      vec3 V = normalize(cameraPosition - vWorldPosition);

      // Light angle calculations
      float NdotL = dot(N, L);
      float N0dotL = dot(N0, L);

      // Day / Night factor: Strictly 0.0 on dark hemisphere
      float dayFactor = smoothstep(-0.01, 0.07, NdotL);

      // Sample textures
      vec3 dayColor = texture2D(uDayMap, vUv).rgb;
      vec3 nightColor = texture2D(uNightMap, vUv).rgb;
      float specMask = texture2D(uSpecularMap, vUv).r;

      // Daylight surface illumination
      float diffuse = max(NdotL, 0.0);
      vec3 dayLit = dayColor * (diffuse * 0.95 + 0.05);

      // Clean night hemisphere: ONLY pure dark surface + golden NASA Black Marble city lights
      // Zero blue or purple bleed on night land
      vec3 nightLit = nightColor * 2.1 * (1.0 - dayFactor);

      // Subtle natural amber/warm golden glow along the terminator line (strictly warm amber, no purple)
      float amberBand = smoothstep(-0.03, 0.02, N0dotL) * (1.0 - smoothstep(0.02, 0.10, N0dotL));
      vec3 amberGlow = vec3(1.0, 0.65, 0.28) * amberBand * 0.4;

      // Ocean specular reflection strictly in daytime, sharply extinction on land
      vec3 R = reflect(-L, N);
      float specAngle = max(dot(R, V), 0.0);
      float spec = pow(specAngle, 38.0) * specMask * smoothstep(0.03, 0.15, NdotL);
      vec3 specularColor = vec3(0.95, 0.98, 1.0) * spec * 1.6;

      // Daytime atmosphere limb glow (strictly facing sunlit hemisphere)
      float rim = 1.0 - max(dot(N0, V), 0.0);
      float dayRim = pow(rim, 4.0) * max(N0dotL, 0.0) * 0.75;
      vec3 rimColor = vec3(0.2, 0.6, 1.0) * dayRim;

      // Final composite
      vec3 finalColor = mix(nightLit, dayLit, dayFactor) + amberGlow + specularColor + rimColor;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as { [uniform: string]: THREE.IUniform },
    vertexShader,
    fragmentShader,
  });
}

/**
 * Atmospheric Troposphere Cloud Sphere Layer Shader:
 * Real clouds floating above Earth with physical day-side illumination and night transparency.
 */
export function createCloudsMaterial(cloudTexture: THREE.Texture): THREE.ShaderMaterial {
  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    uniform sampler2D uCloudMap;
    uniform vec3 uSunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldNormal;

    void main() {
      vec4 tex = texture2D(uCloudMap, vUv);
      float cloudDensity = (tex.r + tex.g + tex.b) / 3.0;

      if (cloudDensity < 0.05) discard;

      vec3 N = normalize(vWorldNormal);
      vec3 L = normalize(uSunDirection);
      float NdotL = dot(N, L);

      // Sunlit illumination on clouds
      float sunLight = max(NdotL, 0.0) * 0.9 + 0.1;
      vec3 cloudColor = vec3(0.94, 0.96, 1.0) * sunLight;

      // Day clouds are crisp (opacity ~0.45); on night side clouds become semi-transparent
      float dayFactor = smoothstep(-0.05, 0.1, NdotL);
      float alpha = cloudDensity * 0.45 * (dayFactor * 0.85 + 0.15);

      gl_FragColor = vec4(cloudColor, alpha);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      uCloudMap: { value: cloudTexture },
      uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
}

/**
 * Outer Rayleigh Atmosphere Halo Mesh Shader:
 * Clean celestial cyan-blue rim glow only on the sun-facing limb.
 */
export function createAtmosphereMaterial(): THREE.ShaderMaterial {
  const vertexShader = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  const fragmentShader = /* glsl */ `
    uniform vec3 uSunDirection;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vec3 V = normalize(cameraPosition - vWorldPosition);
      vec3 N = normalize(vNormal);
      vec3 L = normalize(uSunDirection);

      // Limb fresnel
      float rim = 1.0 - max(dot(N, V), 0.0);
      float intensity = pow(rim, 4.2);

      // Only glow on sun-illuminated limb, dark side remains pure space
      float sunFacing = smoothstep(-0.1, 0.3, dot(N, L));
      vec3 glowColor = vec3(0.25, 0.65, 1.0);

      gl_FragColor = vec4(glowColor, intensity * sunFacing * 0.85);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
    },
    vertexShader,
    fragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  });
}
