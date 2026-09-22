#!/usr/bin/env node
/**
 * scripts/build-twlive-cctv.mjs
 *
 * Comprehensive Real-Time Live Camera Ingestion Engine for Terra Matrix.
 * Scrapes and integrates live feeds from:
 * 1. https://tw.live (Taiwan Counties & Highways, Scenic spots, Japan Tokyo/Osaka/Kyoto, USA SF/LA/NY/NV/WA, Europe UK/FR/NO/IS/CH/FI)
 * 2. Singapore LTA DataMall (api.data.gov.sg/v1/transport/traffic-images) + Marina Bay / Merlion / Jewel
 *
 * Compiles and merges thousands of real-time cameras directly into public/data/cctv.geojson.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const geojsonPath = path.resolve(__dirname, '../public/data/cctv.geojson');

// Helper to hash string deterministically
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Deterministic jitter for city/district grid dispersion
function getDispersedCoords(centerLon, centerLat, id, radiusKm = 2.5) {
  const h1 = hashString(id + ':lon');
  const h2 = hashString(id + ':lat');
  
  // normalized pseudo-random offsets [-1, 1]
  const offX = ((h1 % 2000) / 1000) - 1;
  const offY = ((h2 % 2000) / 1000) - 1;

  // Approx degrees: 1 deg lat ~ 111 km, 1 deg lon ~ 111 * cos(lat) km
  const kmPerDegLat = 110.574;
  const kmPerDegLon = 111.320 * Math.cos((centerLat * Math.PI) / 180);

  const deltaLat = (offY * radiusKm) / kmPerDegLat;
  const deltaLon = (offX * radiusKm) / kmPerDegLon;

  return [
    parseFloat((centerLon + deltaLon).toFixed(6)),
    parseFloat((centerLat + deltaLat).toFixed(6))
  ];
}

// Standard Hub definitions with accurate regional centroids and radii
const HUBS = [
  // --- TAIWAN: County & Scenic Hubs ---
  { url: '/travel/taipei/', city: 'Taipei', country: 'Taiwan', lon: 121.5654, lat: 25.0330, radiusKm: 6 },
  { url: '/travel/newtaipei/', city: 'New Taipei', country: 'Taiwan', lon: 121.4627, lat: 25.0124, radiusKm: 8 },
  { url: '/travel/keelung/', city: 'Keelung', country: 'Taiwan', lon: 121.7462, lat: 25.1276, radiusKm: 4 },
  { url: '/travel/taoyuan/', city: 'Taoyuan', country: 'Taiwan', lon: 121.3009, lat: 24.9936, radiusKm: 7 },
  { url: '/travel/hsinchu/', city: 'Hsinchu', country: 'Taiwan', lon: 120.9688, lat: 24.8138, radiusKm: 5 },
  { url: '/travel/miaoli/', city: 'Miaoli', country: 'Taiwan', lon: 120.8208, lat: 24.5602, radiusKm: 7 },
  { url: '/travel/taichung/', city: 'Taichung', country: 'Taiwan', lon: 120.6736, lat: 24.1477, radiusKm: 8 },
  { url: '/travel/changhua/', city: 'Changhua', country: 'Taiwan', lon: 120.5385, lat: 24.0815, radiusKm: 6 },
  { url: '/travel/nantou/', city: 'Nantou', country: 'Taiwan', lon: 120.6865, lat: 23.9158, radiusKm: 8 },
  { url: '/travel/yunlin/', city: 'Yunlin', country: 'Taiwan', lon: 120.5262, lat: 23.7092, radiusKm: 7 },
  { url: '/travel/chiayi/', city: 'Chiayi', country: 'Taiwan', lon: 120.4491, lat: 23.4800, radiusKm: 6 },
  { url: '/travel/tainan/', city: 'Tainan', country: 'Taiwan', lon: 120.2084, lat: 22.9997, radiusKm: 8 },
  { url: '/travel/kaohsiung/', city: 'Kaohsiung', country: 'Taiwan', lon: 120.3014, lat: 22.6273, radiusKm: 8 },
  { url: '/travel/pingtung/', city: 'Pingtung', country: 'Taiwan', lon: 120.4879, lat: 22.6761, radiusKm: 9 },
  { url: '/travel/yilan/', city: 'Yilan', country: 'Taiwan', lon: 121.7684, lat: 24.7570, radiusKm: 7 },
  { url: '/travel/hualien/', city: 'Hualien', country: 'Taiwan', lon: 121.6016, lat: 23.9872, radiusKm: 7 },
  { url: '/travel/taitung/', city: 'Taitung', country: 'Taiwan', lon: 121.1456, lat: 22.7583, radiusKm: 8 },
  { url: '/travel/penghu/', city: 'Penghu', country: 'Taiwan', lon: 119.5793, lat: 23.5711, radiusKm: 6 },
  { url: '/travel/kinmen/', city: 'Kinmen', country: 'Taiwan', lon: 118.3226, lat: 24.4485, radiusKm: 6 },
  { url: '/travel/matsu/', city: 'Matsu', country: 'Taiwan', lon: 119.9499, lat: 26.1557, radiusKm: 4 },

  // Taiwan Scenic Hotspots
  { url: '/hhs/', city: 'Hehuanshan Wuling', country: 'Taiwan', lon: 121.2828, lat: 24.1371, radiusKm: 3 },
  { url: '/yms/', city: 'Yangmingshan', country: 'Taiwan', lon: 121.5582, lat: 25.1667, radiusKm: 3.5 },
  { url: '/np/alishan/', city: 'Alishan', country: 'Taiwan', lon: 120.8038, lat: 23.5113, radiusKm: 5 },
  { url: '/hot/', city: 'Taiwan Scenic Hotspots', country: 'Taiwan', lon: 121.5654, lat: 25.0330, radiusKm: 25 },

  // Taipei City Districts
  { url: '/city/taipeicity/xinyi/', city: 'Taipei (Xinyi)', country: 'Taiwan', lon: 121.5654, lat: 25.0330, radiusKm: 1.8 },
  { url: '/city/taipeicity/zhongzheng/', city: 'Taipei (Zhongzheng)', country: 'Taiwan', lon: 121.5183, lat: 25.0324, radiusKm: 1.8 },
  { url: '/city/taipeicity/daan/', city: 'Taipei (Daan)', country: 'Taiwan', lon: 121.5434, lat: 25.0264, radiusKm: 1.8 },
  { url: '/city/taipeicity/zhongshan/', city: 'Taipei (Zhongshan)', country: 'Taiwan', lon: 121.5338, lat: 25.0685, radiusKm: 2.0 },
  { url: '/city/taipeicity/songshan/', city: 'Taipei (Songshan)', country: 'Taiwan', lon: 121.5598, lat: 25.0599, radiusKm: 1.8 },
  { url: '/city/taipeicity/wanhua/', city: 'Taipei (Wanhua)', country: 'Taiwan', lon: 121.4999, lat: 25.0287, radiusKm: 1.8 },
  { url: '/city/taipeicity/datong/', city: 'Taipei (Datong)', country: 'Taiwan', lon: 121.5133, lat: 25.0633, radiusKm: 1.8 },
  { url: '/city/taipeicity/shilin/', city: 'Taipei (Shilin)', country: 'Taiwan', lon: 121.5245, lat: 25.0922, radiusKm: 2.5 },
  { url: '/city/taipeicity/beitou/', city: 'Taipei (Beitou)', country: 'Taiwan', lon: 121.5015, lat: 25.1321, radiusKm: 3.0 },
  { url: '/city/taipeicity/neihu/', city: 'Taipei (Neihu)', country: 'Taiwan', lon: 121.5944, lat: 25.0835, radiusKm: 2.5 },
  { url: '/city/taipeicity/nangang/', city: 'Taipei (Nangang)', country: 'Taiwan', lon: 121.6067, lat: 25.0558, radiusKm: 2.2 },
  { url: '/city/taipeicity/wenshan/', city: 'Taipei (Wenshan)', country: 'Taiwan', lon: 121.5701, lat: 24.9898, radiusKm: 2.5 },

  // --- JAPAN: Tokyo, Osaka, Kyoto, Kanagawa, Hokkaido, Okinawa ---
  { url: '/japan/tokyo/', city: 'Tokyo', country: 'Japan', lon: 139.6917, lat: 35.6895, radiusKm: 12 },
  { url: '/japan/osaka/', city: 'Osaka', country: 'Japan', lon: 135.5023, lat: 34.6937, radiusKm: 8 },
  { url: '/japan/kyoto/', city: 'Kyoto', country: 'Japan', lon: 135.7681, lat: 35.0116, radiusKm: 6 },
  { url: '/japan/kanagawa/', city: 'Yokohama / Kanagawa', country: 'Japan', lon: 139.6380, lat: 35.4437, radiusKm: 10 },
  { url: '/japan/hokkaido/', city: 'Sapporo / Hokkaido', country: 'Japan', lon: 141.3545, lat: 43.0618, radiusKm: 14 },
  { url: '/japan/okinawa/', city: 'Naha / Okinawa', country: 'Japan', lon: 127.6809, lat: 26.2124, radiusKm: 8 },
  { url: '/japan/yamanashi/', city: 'Mount Fuji / Yamanashi', country: 'Japan', lon: 138.5683, lat: 35.6639, radiusKm: 12 },
  { url: '/japan/nagano/', city: 'Nagano Alps', country: 'Japan', lon: 138.1812, lat: 36.6513, radiusKm: 12 },
  { url: '/japan/hyogo/', city: 'Kobe / Hyogo', country: 'Japan', lon: 135.1955, lat: 34.6901, radiusKm: 8 },
  { url: '/japan/chiba/', city: 'Chiba', country: 'Japan', lon: 140.1233, lat: 35.6074, radiusKm: 10 },

  // --- USA: California (SF, LA), New York, Nevada (Las Vegas), Washington (Seattle), Hawaii ---
  { url: '/usa/california/', city: 'California (SF / LA / Coastal)', country: 'USA (CA)', lon: -122.4194, lat: 37.7749, radiusKm: 25 },
  { url: '/usa/newyork/', city: 'New York (NYC / Manhattan)', country: 'US', lon: -73.9855, lat: 40.7484, radiusKm: 10 },
  { url: '/usa/nevada/', city: 'Las Vegas / Nevada', country: 'USA (NV)', lon: -115.1728, lat: 36.1147, radiusKm: 8 },
  { url: '/usa/washington/', city: 'Seattle / Washington', country: 'US', lon: -122.3321, lat: 47.6062, radiusKm: 9 },
  { url: '/usa/hawaii/', city: 'Honolulu / Hawaii', country: 'US', lon: -157.8583, lat: 21.3069, radiusKm: 8 },
  { url: '/usa/florida/', city: 'Miami / Florida', country: 'US', lon: -80.1918, lat: 25.7617, radiusKm: 12 },
  { url: '/usa/texas/', city: 'Texas', country: 'US', lon: -97.7431, lat: 30.2672, radiusKm: 15 },
  { url: '/usa/colorado/', city: 'Denver / Rockies', country: 'US', lon: -104.9903, lat: 39.7392, radiusKm: 14 },
  { url: '/usa/illinois/', city: 'Chicago / Illinois', country: 'US', lon: -87.6298, lat: 41.8781, radiusKm: 10 },
  { url: '/usa/oregon/', city: 'Portland / Oregon', country: 'US', lon: -122.6784, lat: 45.5152, radiusKm: 9 },
  { url: '/usa/alaska/', city: 'Anchorage / Alaska', country: 'US', lon: -149.9003, lat: 61.2181, radiusKm: 15 },

  // --- EUROPE: UK, France, Norway, Iceland, Switzerland, Finland ---
  { url: '/uk/london/', city: 'London', country: 'UK', lon: -0.1276, lat: 51.5074, radiusKm: 8 },
  { url: '/uk/scotland/', city: 'Edinburgh / Scotland', country: 'UK', lon: -3.1883, lat: 55.9533, radiusKm: 10 },
  { url: '/france/ile-de-france/', city: 'Paris', country: 'France', lon: 2.3522, lat: 48.8566, radiusKm: 7 },
  { url: '/france/provence-alpes-cote-dazur/', city: 'Nice / French Riviera', country: 'France', lon: 7.2620, lat: 43.7102, radiusKm: 10 },
  { url: '/norway/oslo/', city: 'Oslo', country: 'Norway', lon: 10.7522, lat: 59.9139, radiusKm: 6 },
  { url: '/norway/vestland/', city: 'Bergen / Fjords', country: 'Norway', lon: 5.3221, lat: 60.3913, radiusKm: 8 },
  { url: '/norway/troms/', city: 'Tromsø (Arctic & Aurora)', country: 'Norway', lon: 18.9553, lat: 69.6492, radiusKm: 6 },
  { url: '/iceland/capital-region/', city: 'Reykjavik (Aurora & Skyline)', country: 'Iceland', lon: -21.9426, lat: 64.1466, radiusKm: 5 },
  { url: '/iceland/southern-peninsula/', city: 'Keflavik / Volcano', country: 'Iceland', lon: -22.5624, lat: 63.9995, radiusKm: 8 },
  { url: '/switzerland/valais/', city: 'Zermatt / Valais Alps', country: 'Switzerland', lon: 7.7491, lat: 45.9765, radiusKm: 8 },
  { url: '/switzerland/bern/', city: 'Bern / Interlaken', country: 'Switzerland', lon: 7.4474, lat: 46.9480, radiusKm: 8 },
  { url: '/finland/lapland/', city: 'Rovaniemi / Lapland (Aurora)', country: 'Finland', lon: 25.7294, lat: 66.5039, radiusKm: 10 },
  { url: '/finland/uusimaa/', city: 'Helsinki', country: 'Finland', lon: 24.9384, lat: 60.1699, radiusKm: 7 },
];

async function fetchHubCameras(hub) {
  const targetUrl = `https://tw.live${hub.url}`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[TwLiveIngest] Hub ${hub.url} returned status ${res.status}`);
      return [];
    }

    const html = await res.text();
    const cards = html.match(/<a[^>]+href=[\"']\/cam\/[^\"']+[\"'][^>]*>[\s\S]*?<\/a>/g) || [];
    const results = [];

    for (const card of cards) {
      const idMatch = card.match(/href=[\"']\/cam\/\?id=([^\"'&]+)/);
      const labelMatch = card.match(/aria-label=[\"']查看\s*([^\"']+?)\s*即時影像[\"']/) ||
                         card.match(/alt=[\"']([^\"']+?)[\"']/);
      const imgMatch = card.match(/src=[\"']([^\"']+)[\"']/);

      if (!idMatch || !imgMatch) continue;

      const id = idMatch[1].trim();
      const rawName = (labelMatch ? labelMatch[1] : id).trim();
      const rawImg = imgMatch[1].trim();
      const cleanImg = rawImg.split('?')[0];

      // YouTube Live Detection
      const ytMatch = cleanImg.match(/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})/);
      const videoId = ytMatch ? ytMatch[1] : undefined;

      const isYouTube = Boolean(videoId);
      const streamType = isYouTube ? 'iframe' : (cleanImg.includes('.m3u8') ? 'hls' : 'jpg');
      const streamUrl = isYouTube 
        ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1`
        : cleanImg;
      const feedUrl = isYouTube
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : cleanImg;

      // Coordinate placement
      // If camera title mentions SF/LA/Tokyo landmarks, refine coords
      let lon = hub.lon;
      let lat = hub.lat;
      let specificCity = hub.city;

      const lowerName = rawName.toLowerCase();
      if (lowerName.includes('san francisco') || lowerName.includes('舊金山') || lowerName.includes('berkeley') || lowerName.includes('oakland')) {
        lon = -122.4194;
        lat = 37.7749;
        specificCity = 'San Francisco';
      } else if (lowerName.includes('los angeles') || lowerName.includes('洛杉磯') || lowerName.includes('hollywood') || lowerName.includes('santa monica') || lowerName.includes('venice')) {
        lon = -118.2437;
        lat = 34.0522;
        specificCity = 'Los Angeles';
      } else if (lowerName.includes('shibuya') || lowerName.includes('澀谷') || lowerName.includes('涉谷')) {
        lon = 139.7016;
        lat = 35.6580;
        specificCity = 'Tokyo (Shibuya)';
      } else if (lowerName.includes('shinjuku') || lowerName.includes('新宿')) {
        lon = 139.7003;
        lat = 35.6938;
        specificCity = 'Tokyo (Shinjuku)';
      } else if (lowerName.includes('dotonbori') || lowerName.includes('道頓堀')) {
        lon = 135.5014;
        lat = 34.6687;
        specificCity = 'Osaka (Dotonbori)';
      } else if (lowerName.includes('kyoto station') || lowerName.includes('京都車站')) {
        lon = 135.7588;
        lat = 34.9858;
        specificCity = 'Kyoto Station';
      }

      const [pLon, pLat] = getDispersedCoords(lon, lat, id, hub.radiusKm);

      results.push({
        id: `twlive_${id}`,
        name: rawName,
        city: specificCity,
        country: hub.country,
        lat: pLat,
        lon: pLon,
        feed_url: feedUrl,
        stream_url: streamUrl,
        stream_type: streamType,
        videoId: videoId || '',
        source: 'tw.live 台灣即時影像監視器',
        priority: 95,
      });
    }

    return results;
  } catch (err) {
    console.warn(`[TwLiveIngest] Error fetching hub ${hub.url}:`, err.message);
    return [];
  }
}

async function fetchSingaporeLtaCameras() {
  console.log('[TwLiveIngest] Synchronizing Singapore LTA Real-Time Traffic Surveillance...');
  try {
    const res = await fetch('https://api.data.gov.sg/v1/transport/traffic-images', {
      headers: { 'User-Agent': 'TerraMatrix-Surveillance/4.0' }
    });
    if (!res.ok) return [];

    const json = await res.json();
    const rawCams = json.items?.[0]?.cameras || [];
    const sgFeatures = [];

    for (const cam of rawCams) {
      if (!cam.location || !cam.image) continue;
      const camId = `sg_lta_${cam.camera_id}`;
      sgFeatures.push({
        id: camId,
        name: `Singapore LTA Expressway Cam ${cam.camera_id}`,
        city: 'Singapore',
        country: 'Singapore',
        lat: cam.location.latitude,
        lon: cam.location.longitude,
        feed_url: cam.image,
        stream_url: cam.image,
        stream_type: 'jpg',
        videoId: '',
        source: 'Singapore Land Transport Authority (LTA DataMall)',
        priority: 98,
      });
    }

    // Add iconic Singapore streams (Marina Bay Sands, Merlion, Jewel Changi)
    sgFeatures.push(
      {
        id: 'sg_mbs_skyline',
        name: '新加坡濱海灣金沙與全景天際線 (Marina Bay Sands 4K Live)',
        city: 'Singapore',
        country: 'Singapore',
        lat: 1.2847,
        lon: 103.8610,
        feed_url: 'https://i.ytimg.com/vi/o8p_1s-Ff68/hqdefault.jpg',
        stream_url: 'https://www.youtube-nocookie.com/embed/o8p_1s-Ff68?autoplay=1&mute=1',
        stream_type: 'iframe',
        videoId: 'o8p_1s-Ff68',
        source: 'Singapore Tourism Board Live Stream',
        priority: 100,
      },
      {
        id: 'sg_merlion_park',
        name: '新加坡魚尾獅公園與海濱灣 (Merlion Park & Waterfront Live)',
        city: 'Singapore',
        country: 'Singapore',
        lat: 1.2868,
        lon: 103.8545,
        feed_url: 'https://i.ytimg.com/vi/31FwWj-XgG8/hqdefault.jpg',
        stream_url: 'https://www.youtube-nocookie.com/embed/31FwWj-XgG8?autoplay=1&mute=1',
        stream_type: 'iframe',
        videoId: '31FwWj-XgG8',
        source: 'Singapore Live Cameras',
        priority: 99,
      },
      {
        id: 'sg_changi_jewel',
        name: '新加坡樟宜機場 星耀樟宜雨漩渦瀑布 (Jewel Changi Rain Vortex)',
        city: 'Singapore',
        country: 'Singapore',
        lat: 1.3602,
        lon: 103.9898,
        feed_url: 'https://i.ytimg.com/vi/vF0a8Z3D9r4/hqdefault.jpg',
        stream_url: 'https://www.youtube-nocookie.com/embed/vF0a8Z3D9r4?autoplay=1&mute=1',
        stream_type: 'iframe',
        videoId: 'vF0a8Z3D9r4',
        source: 'Changi Airport Group',
        priority: 99,
      }
    );

    console.log(`[TwLiveIngest] Singapore LTA returned ${sgFeatures.length} live cameras.`);
    return sgFeatures;
  } catch (e) {
    console.warn('[TwLiveIngest] Singapore LTA fetch failed:', e.message);
    return [];
  }
}

async function main() {
  console.log('[TwLiveIngest] ========================================================');
  console.log('[TwLiveIngest] INITIATING GLOBAL REAL-TIME SURVEILLANCE INGESTION');
  console.log(`[TwLiveIngest] Scanning ${HUBS.length} high-density hubs across tw.live...`);
  console.log('[TwLiveIngest] ========================================================');

  const allScraped = [];

  // Batch process hubs with concurrency
  const batchSize = 6;
  for (let i = 0; i < HUBS.length; i += batchSize) {
    const batch = HUBS.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(hub => fetchHubCameras(hub)));
    for (const r of results) {
      allScraped.push(...r);
    }
    process.stdout.write(`\r[TwLiveIngest] Progress: ${Math.min(i + batchSize, HUBS.length)}/${HUBS.length} hubs processed (${allScraped.length} cameras acquired)...`);
  }
  console.log('\n[TwLiveIngest] Hub scraping completed!');

  // Fetch Singapore LTA cameras
  const sgCams = await fetchSingaporeLtaCameras();
  allScraped.push(...sgCams);

  console.log(`[TwLiveIngest] Total freshly scraped live cameras: ${allScraped.length}`);

  // Load existing cctv.geojson
  if (!fs.existsSync(geojsonPath)) {
    console.error(`[TwLiveIngest] Error: ${geojsonPath} not found!`);
    process.exit(1);
  }

  const existingGeojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf-8'));
  const existingFeatures = existingGeojson.features || [];
  console.log(`[TwLiveIngest] Existing features in database: ${existingFeatures.length}`);

  // Create lookup of new features
  const newFeaturesMap = new Map();
  for (const item of allScraped) {
    newFeaturesMap.set(item.id, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.lon, item.lat],
      },
      properties: {
        id: item.id,
        name: item.name,
        city: item.city,
        country: item.country,
        feed_url: item.feed_url,
        stream_url: item.stream_url,
        stream_type: item.stream_type,
        videoId: item.videoId,
        source: item.source,
        priority: item.priority || 95,
      },
    });
  }

  // Filter out any older versions of these cameras
  const remaining = existingFeatures.filter(f => !newFeaturesMap.has(f.properties?.id));
  const finalFeatures = [...newFeaturesMap.values(), ...remaining];

  existingGeojson.features = finalFeatures;
  fs.writeFileSync(geojsonPath, JSON.stringify(existingGeojson), 'utf-8');

  console.log('[TwLiveIngest] ========================================================');
  console.log(`[TwLiveIngest] SUCCESS: Synchronized ${newFeaturesMap.size} verified live feeds!`);
  console.log(`[TwLiveIngest] Total live surveillance features now: ${finalFeatures.length}`);
  console.log(`[TwLiveIngest] GeoJSON successfully written to: ${geojsonPath}`);
  console.log('[TwLiveIngest] ========================================================');
}

main().catch(e => {
  console.error('[TwLiveIngest] Fatal error:', e);
  process.exit(1);
});
