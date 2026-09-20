#!/usr/bin/env node
/**
 * scripts/inject-caltrans-cctv.mjs
 *
 * Injects 1,014 official Caltrans CCTV traffic surveillance nodes
 * (688 Bay Area cameras + 326 Los Angeles cameras) from /tmp/caltrans_cctv.geojson
 * into public/data/cctv.geojson.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caltransGeojsonPath = '/tmp/caltrans_cctv.geojson';
const targetGeojsonPath = path.resolve(__dirname, '../public/data/cctv.geojson');

if (!fs.existsSync(caltransGeojsonPath)) {
  console.error(`[CaltransInject] Error: Source file ${caltransGeojsonPath} not found.`);
  process.exit(1);
}

console.log(`[CaltransInject] Reading Caltrans dataset from ${caltransGeojsonPath}...`);
const rawCaltrans = JSON.parse(fs.readFileSync(caltransGeojsonPath, 'utf-8'));
const targetGeojson = JSON.parse(fs.readFileSync(targetGeojsonPath, 'utf-8'));

// Filter District 4 (Bay Area) and District 7 (Los Angeles)
const selectedFeatures = rawCaltrans.features.filter(f => {
  const d = String(f.properties?.district);
  return d === '4' || d === '7';
});

console.log(`[CaltransInject] Found ${selectedFeatures.length} cameras in District 4 & 7.`);

const d4Count = selectedFeatures.filter(f => String(f.properties?.district) === '4').length;
const d7Count = selectedFeatures.filter(f => String(f.properties?.district) === '7').length;
console.log(`  - District 4 (San Francisco Bay Area): ${d4Count}`);
console.log(`  - District 7 (Los Angeles County): ${d7Count}`);

const caltransFormatted = selectedFeatures.map(f => {
  const p = f.properties || {};
  const district = String(p.district);
  const isLA = district === '7';
  const objectId = p.OBJECTID || p.index_ || Math.round(Math.random() * 100000);
  const route = p.route || 'CA-Fwy';
  const locName = p.locationName || `${route} Surveillance Node`;
  const city = isLA ? (p.nearbyPlace || 'Los Angeles') : (p.nearbyPlace || 'San Francisco');
  const county = p.county || (isLA ? 'Los Angeles' : 'San Francisco');

  // Caltrans HLS streams from wzmedia or snapshot image from cwwp2
  const streamUrl = p.streamingVideoURL || '';
  const imageUrl = p.currentImageURL || '';

  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [p.longitude, p.latitude],
    },
    properties: {
      id: `caltrans-d${district}-${objectId}`,
      name: `Caltrans ${route} - ${locName}`,
      city: isLA ? `Los Angeles (${city})` : `SF Bay Area (${city})`,
      country: 'USA (CA)',
      county,
      route,
      feed_url: imageUrl,
      stream_url: streamUrl || imageUrl,
      stream_type: streamUrl ? 'hls' : 'jpg',
      source: `Caltrans District ${district} (${isLA ? 'Los Angeles' : 'Bay Area'})`,
      category: 'traffic',
      priority: 85,
    },
  };
});

// Remove any existing caltrans-d4 or caltrans-d7 features from targetGeojson
const existingNonCaltrans = targetGeojson.features.filter(f => {
  const id = f.properties?.id || '';
  return !id.startsWith('caltrans-d4-') && !id.startsWith('caltrans-d7-');
});

console.log(`[CaltransInject] Preserved ${existingNonCaltrans.length} existing features.`);
targetGeojson.features = [...caltransFormatted, ...existingNonCaltrans];

fs.writeFileSync(targetGeojsonPath, JSON.stringify(targetGeojson), 'utf-8');
console.log(`[CaltransInject] Successfully wrote ${targetGeojson.features.length} total features to ${targetGeojsonPath}!`);
