#!/usr/bin/env node
/**
 * scripts/merge-cctv-presets.mjs
 *
 * Merges the curated high-definition Taiwan, Japan, and California CCTV points
 * directly into public/data/cctv.geojson so they appear as priority 3D surveillance
 * dots on the globe, in floating previews, and in the global search index.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const geojsonPath = path.resolve(__dirname, '../public/data/cctv.geojson');
const presetsTsPath = path.resolve(__dirname, '../src/data/cctv-presets.ts');

const tsContent = fs.readFileSync(presetsTsPath, 'utf-8');

// Regex extraction of CCTVPoint items from CCTV_PRESETS in cctv-presets.ts
const points = [];
const objRegex = /{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*city:\s*'([^']+)',\s*country:\s*'([^']+)',\s*lat:\s*([-\d.]+),\s*lon:\s*([-\d.]+),([\s\S]*?)}/g;
let match;
while ((match = objRegex.exec(tsContent)) !== null) {
  const [, id, name, city, country, latStr, lonStr, rest] = match;
  const lat = parseFloat(latStr);
  const lon = parseFloat(lonStr);
  
  const videoIdMatch = rest.match(/videoId:\s*'([^']+)'/);
  const streamUrlMatch = rest.match(/stream_url:\s*'([^']+)'/);
  const streamTypeMatch = rest.match(/stream_type:\s*'([^']+)'/);
  const sourceMatch = rest.match(/source:\s*'([^']+)'/);
  const categoryMatch = rest.match(/category:\s*'([^']+)'/);

  points.push({
    id,
    name,
    city,
    country,
    lat,
    lon,
    videoId: videoIdMatch ? videoIdMatch[1] : undefined,
    stream_url: streamUrlMatch ? streamUrlMatch[1] : undefined,
    stream_type: streamTypeMatch ? streamTypeMatch[1] : (videoIdMatch ? 'iframe' : 'jpg'),
    source: sourceMatch ? sourceMatch[1] : 'Terra Matrix Live Surveillance',
    category: categoryMatch ? categoryMatch[1] : 'traffic',
  });
}

console.log(`[CctvMerge] Extracted ${points.length} priority cameras from cctv-presets.ts`);

const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf-8'));
const presetIdSet = new Set(points.map(p => p.id));

// Filter out old versions of preset IDs so they get updated cleanly
const remainingFeatures = geojson.features.filter(f => !presetIdSet.has(f.properties?.id));

const newFeatures = points.map(p => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [p.lon, p.lat],
  },
  properties: {
    id: p.id,
    name: p.name,
    city: p.city,
    country: p.country,
    feed_url: p.videoId ? `https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg` : (p.stream_url || ''),
    stream_url: p.stream_url || (p.videoId ? `https://www.youtube.com/embed/${p.videoId}?autoplay=1&mute=1` : ''),
    stream_type: p.stream_type || (p.videoId ? 'iframe' : 'jpg'),
    videoId: p.videoId || '',
    source: p.source || 'Terra Matrix Live Surveillance',
    priority: 100,
  },
}));

geojson.features = [...newFeatures, ...remainingFeatures];
fs.writeFileSync(geojsonPath, JSON.stringify(geojson), 'utf-8');
console.log(`[CctvMerge] Successfully synced ${newFeatures.length} curated priority cameras into ${geojsonPath} (Total features: ${geojson.features.length}).`);
