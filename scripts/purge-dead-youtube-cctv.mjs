import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const geojsonPath = path.resolve(__dirname, '../public/data/cctv.geojson');
const checkJsonPath = path.resolve(__dirname, '../scratch_yt_check.json');

const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf-8'));
const checkData = JSON.parse(fs.readFileSync(checkJsonPath, 'utf-8'));
const deadIds = new Set(Object.keys(checkData.dead));

console.log(`[Purge] Initial features in cctv.geojson: ${geojson.features.length}`);
console.log(`[Purge] Dead YouTube IDs identified: ${deadIds.size}`);

const filteredFeatures = geojson.features.filter((f) => {
  const p = f.properties || {};
  let vid = p.videoId;
  if (!vid && p.stream_url) {
    const m = p.stream_url.match(/(?:watch\?v=|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (m) vid = m[1];
  }
  if (vid && deadIds.has(vid)) {
    return false; // Remove dead YouTube camera
  }
  return true;
});

const removedCount = geojson.features.length - filteredFeatures.length;
console.log(`[Purge] Removed ${removedCount} dead YouTube features.`);
console.log(`[Purge] Remaining features: ${filteredFeatures.length}`);

geojson.features = filteredFeatures;
fs.writeFileSync(geojsonPath, JSON.stringify(geojson), 'utf-8');
console.log(`[Purge] Successfully updated ${geojsonPath}`);
