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
 * Photorealistic Earth Surface Shader with NASA Blue Marble, Black Marble night lights,
 * mountain relief normal mapping, ocean specular shine, and dynamic Rayleigh twilight terminator.
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
      
      // Calculate spherical tangent and bitangent for normal mapping
      vec3 up = vec3(0.0, 1.0, 0.0);
      vec3 tangent = normalize(cross(up, N0));
      if (length(tangent) < 0.001) tangent = vec3(1.0, 0.0, 0.0);
      vec3 bitangent = cross(N0, tangent);

      // Perturb normal with terrain normal map
      vec3 normalTex = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
      vec3 N = normalize(tangent * normalTex.x * 1.5 + bitangent * normalTex.y * 1.5 + N0 * normalTex.z);

      vec3 L = normalize(uSunDirection);
      vec3 V = normalize(cameraPosition - vWorldPosition);

      // Light dot products
      float NdotL = dot(N, L);
      float N0dotL = dot(N0, L);

      // Day / Night transition factor (Terminator line)
      // Smooth gradient across the twilight boundary
      float dayFactor = smoothstep(-0.16, 0.16, NdotL);

      // Textures
      vec3 dayColor = texture2D(uDayMap, vUv).rgb;
      vec3 nightColor = texture2D(uNightMap, vUv).rgb;
      float specMask = texture2D(uSpecularMap, vUv).r;

      // Day surface illumination
      float diffuse = max(NdotL, 0.0);
      vec3 dayLit = dayColor * (diffuse * 0.95 + 0.06);

      // Sunset / Twilight Rayleigh scattering orange-gold glow along terminator
      float twilightFactor = exp(-pow(N0dotL / 0.11, 2.0));
      vec3 twilightColor = vec3(1.0, 0.44, 0.16) * twilightFactor * 0.75;

      // Night city lights (boosted visibility on night hemisphere)
      vec3 nightLit = nightColor * 2.4 * (1.0 - dayFactor);

      // Ocean specular highlight (metallic reflection on water, zero on land)
      vec3 R = reflect(-L, N);
      float spec = pow(max(dot(R, V), 0.0), 36.0) * specMask * dayFactor;
      vec3 specularColor = vec3(0.9, 0.95, 1.0) * spec * 1.8;

      // Atmospheric limb / rim glow (Fresnel Rayleigh blue edge)
      float rim = 1.0 - max(dot(N0, V), 0.0);
      float rimGlow = pow(rim, 3.8);
      // Brighter on day side, subtle deep blue on dark side
      vec3 rimColor = mix(vec3(0.08, 0.22, 0.5), vec3(0.35, 0.72, 1.0), dayFactor) * rimGlow * 1.4;

      // Final composite color
      vec3 color = mix(nightLit, dayLit, dayFactor);
      color += twilightColor * (1.0 - specMask * 0.4);
      color += specularColor;
      color += rimColor;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as { [uniform: string]: THREE.IUniform },
    vertexShader,
    fragmentShader,
  });
}

/**
 * Outer Rayleigh Atmosphere Halo Mesh Shader
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
      float intensity = pow(rim, 4.0);

      // Solar lighting on atmosphere: day side has vibrant celestial cyan/blue
      float sunFacing = max(dot(N, L), 0.0);
      vec3 glowColor = mix(vec3(0.1, 0.35, 0.85), vec3(0.3, 0.75, 1.0), sunFacing);

      gl_FragColor = vec4(glowColor, intensity * 0.9);
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
