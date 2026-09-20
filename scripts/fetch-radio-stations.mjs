#!/usr/bin/env node
/**
 * scripts/fetch-radio-stations.mjs
 *
 * Fetches and curates high-fidelity global radio stations from the Radio-Browser API
 * (identical to the engine used in bilawalsidhu/gods-eye-view).
 *
 * Validates HTTPS streams, coordinates, and categorizes into 7 tactical categories:
 * news, talk, weather, public-safety, aviation-marine, traffic-transit, music.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../public/data/radio-stations.json');

const MIRRORS = [
  'https://de1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info',
  'https://at1.api.radio-browser.info',
];

async function fetchWithFallback(pathname) {
  for (const mirror of MIRRORS) {
    const url = `${mirror}${pathname}`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'TerraMatrix/1.0 (Live Globe Radio Client)',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      // try next mirror
    }
  }
  throw new Error(`Failed to fetch ${pathname} from all mirrors.`);
}

function categorizeStation(tags = '', name = '') {
  const combined = (tags + ' ' + name).toLowerCase();

  if (combined.includes('police') || combined.includes('scanner') || combined.includes('fire') || combined.includes('public safety') || combined.includes('dispatch') || combined.includes('治安')) {
    return 'public-safety';
  }
  if (combined.includes('traffic') || combined.includes('transit') || combined.includes('交通') || combined.includes('警廣') || combined.includes('路況')) {
    return 'traffic-transit';
  }
  if (combined.includes('aviation') || combined.includes('atc') || combined.includes('air traffic') || combined.includes('marine') || combined.includes('maritime') || combined.includes('airport')) {
    return 'aviation-marine';
  }
  if (combined.includes('weather') || combined.includes('noaa') || combined.includes('emergency') || combined.includes('氣象')) {
    return 'weather';
  }
  if (combined.includes('news') || combined.includes('information') || combined.includes('journalism') || combined.includes('current affairs') || combined.includes('bbc') || combined.includes('npr') || combined.includes('nhk') || combined.includes('新聞')) {
    return 'news';
  }
  if (combined.includes('talk') || combined.includes('spoken') || combined.includes('podcast') || combined.includes('interview') || combined.includes('culture') || combined.includes('談話')) {
    return 'talk';
  }
  return 'music';
}

function cleanStreamUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed.startsWith('https://')) return null;
  return trimmed;
}

async function main() {
  console.log('[RadioFetch] Querying Radio Browser API mirrors for global stations...');

  // 1. Top clicked global stations
  console.log('  - Fetching top global clicked stations...');
  const topClicked = await fetchWithFallback('/json/stations/search?has_geo_info=true&is_https=true&hidebroken=true&order=clickcount&reverse=true&limit=400');

  // 2. Specific focus countries to guarantee coverage
  const countryQueries = ['TW', 'JP', 'US', 'GB', 'FR', 'DE', 'NO', 'FI', 'SE', 'IS', 'AU', 'BR', 'ZA'];
  const countryBatches = [];

  for (const cc of countryQueries) {
    try {
      console.log(`  - Fetching stations for country ${cc}...`);
      const batch = await fetchWithFallback(`/json/stations/search?countrycode=${cc}&has_geo_info=true&is_https=true&hidebroken=true&order=clickcount&reverse=true&limit=60`);
      countryBatches.push(...batch);
    } catch (e) {
      console.warn(`  Warning: failed for country ${cc}`);
    }
  }

  // 3. Category queries for public-safety, traffic, and news
  const categoryQueries = ['scanner', 'police', 'traffic', 'weather', 'aviation', 'news'];
  const categoryBatches = [];

  for (const tag of categoryQueries) {
    try {
      console.log(`  - Fetching category tag: ${tag}...`);
      const batch = await fetchWithFallback(`/json/stations/search?tag=${tag}&has_geo_info=true&is_https=true&hidebroken=true&order=clickcount&reverse=true&limit=40`);
      categoryBatches.push(...batch);
    } catch (e) {
      console.warn(`  Warning: failed for tag ${tag}`);
    }
  }

  const allRaw = [...topClicked, ...countryBatches, ...categoryBatches];
  console.log(`[RadioFetch] Fetched raw total: ${allRaw.length} stations. Normalizing and deduplicating...`);

  const stationMap = new Map();

  for (const raw of allRaw) {
    if (!raw) continue;
    const id = raw.stationuuid || String(raw.changeuuid);
    if (!id || stationMap.has(id)) continue;

    const lat = parseFloat(raw.geo_lat);
    const lon = parseFloat(raw.geo_long);
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) continue;
    if (lat === 0 && lon === 0) continue; // ignore dummy 0,0

    const streamUrl = cleanStreamUrl(raw.url_resolved || raw.url);
    if (!streamUrl) continue;

    const name = (raw.name || 'Unknown Radio').trim();
    const tags = (raw.tags || '').trim();
    const category = categorizeStation(tags, name);
    const country = (raw.country || 'International').trim();
    const countryCode = (raw.countrycode || '').trim().toUpperCase();
    const codec = (raw.codec || 'MP3').trim().toUpperCase();
    const bitrate = parseInt(raw.bitrate, 10) || 128;
    const homepage = raw.homepage ? cleanStreamUrl(raw.homepage) : null;
    const favicon = raw.favicon && raw.favicon.startsWith('https://') ? raw.favicon : null;

    stationMap.set(id, {
      id,
      name,
      country,
      countryCode,
      state: raw.state || '',
      lat,
      lon,
      streamUrl,
      homepage,
      favicon,
      category,
      tags: tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean).slice(0, 10),
      codec,
      bitrate,
      votes: parseInt(raw.votes, 10) || 0,
      clickcount: parseInt(raw.clickcount, 10) || 0,
    });
  }

  // Also manually guarantee essential flagship Taiwan & International stations if missing
  const manualCurated = [
    {
      id: 'pbs-taipei-fm943',
      name: '警察廣播電臺 - 臺北分臺 FM 94.3',
      country: 'Taiwan',
      countryCode: 'TW',
      state: 'Taipei',
      lat: 25.0360,
      lon: 121.5076,
      streamUrl: 'https://stream.pbs.gov.tw/live/TPS/playlist.m3u8',
      category: 'traffic-transit',
      tags: ['traffic', 'police', 'taiwan', 'taipei', 'fm 94.3'],
      codec: 'AAC',
      bitrate: 128,
      votes: 9999,
      clickcount: 9999,
    },
    {
      id: 'pbs-national-fm1049',
      name: '警察廣播電臺 - 全國治安交通網 FM 104.9',
      country: 'Taiwan',
      countryCode: 'TW',
      state: 'Taipei',
      lat: 25.0360,
      lon: 121.5076,
      streamUrl: 'https://stream.pbs.gov.tw/live/PBS/playlist.m3u8',
      category: 'traffic-transit',
      tags: ['traffic', 'police', 'national', 'taiwan', 'fm 104.9'],
      codec: 'AAC',
      bitrate: 128,
      votes: 9999,
      clickcount: 9999,
    },
    {
      id: 'pbs-taichung-fm945',
      name: '警察廣播電臺 - 臺中分臺 FM 94.5',
      country: 'Taiwan',
      countryCode: 'TW',
      state: 'Taichung',
      lat: 24.1529,
      lon: 120.6323,
      streamUrl: 'https://stream.pbs.gov.tw/live/TCS/playlist.m3u8',
      category: 'traffic-transit',
      tags: ['traffic', 'police', 'taichung', 'fm 94.5'],
      codec: 'AAC',
      bitrate: 128,
      votes: 8888,
      clickcount: 8888,
    },
    {
      id: 'pbs-kaohsiung-fm931',
      name: '警察廣播電臺 - 高雄分臺 FM 93.1',
      country: 'Taiwan',
      countryCode: 'TW',
      state: 'Kaohsiung',
      lat: 22.6273,
      lon: 120.3014,
      streamUrl: 'https://stream.pbs.gov.tw/live/KHS/playlist.m3u8',
      category: 'traffic-transit',
      tags: ['traffic', 'police', 'kaohsiung', 'fm 93.1'],
      codec: 'AAC',
      bitrate: 128,
      votes: 8888,
      clickcount: 8888,
    },
    {
      id: 'bbc-world-service',
      name: 'BBC World Service (London News 24/7)',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'London',
      lat: 51.5186,
      lon: -0.1439,
      streamUrl: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service',
      category: 'news',
      tags: ['news', 'bbc', 'world', 'london', 'global'],
      codec: 'MP3',
      bitrate: 128,
      votes: 99999,
      clickcount: 99999,
    },
    {
      id: 'somafm-secret-agent-sf',
      name: 'SomaFM: Secret Agent (San Francisco HQ)',
      country: 'United States',
      countryCode: 'US',
      state: 'California',
      lat: 37.7749,
      lon: -122.4194,
      streamUrl: 'https://ice1.somafm.com/secretagent-128-mp3',
      category: 'music',
      tags: ['spy', 'lounge', 'san francisco', 'electronic', 'somafm'],
      codec: 'MP3',
      bitrate: 128,
      votes: 9999,
      clickcount: 9999,
    },
    {
      id: 'somafm-groove-salad-sf',
      name: 'SomaFM: Groove Salad Ambient Chill (San Francisco)',
      country: 'United States',
      countryCode: 'US',
      state: 'California',
      lat: 37.7780,
      lon: -122.4120,
      streamUrl: 'https://ice1.somafm.com/groovesalad-128-mp3',
      category: 'music',
      tags: ['ambient', 'chillout', 'san francisco', 'downtempo'],
      codec: 'MP3',
      bitrate: 128,
      votes: 9999,
      clickcount: 9999,
    },
    {
      id: 'kcrw-los-angeles',
      name: 'KCRW 89.9 FM - NPR Los Angeles & Eclectic Music',
      country: 'United States',
      countryCode: 'US',
      state: 'California',
      lat: 34.0195,
      lon: -118.4912,
      streamUrl: 'https://kcrw.streamguys1.com/kcrw_192k_mp3_on_air',
      category: 'news',
      tags: ['npr', 'los angeles', 'santa monica', 'music', 'news'],
      codec: 'MP3',
      bitrate: 192,
      votes: 9999,
      clickcount: 9999,
    }
  ];

  for (const s of manualCurated) {
    stationMap.set(s.id, s);
  }

  const finalStations = Array.from(stationMap.values());
  // Sort by popularity (clickcount + votes)
  finalStations.sort((a, b) => (b.clickcount + b.votes) - (a.clickcount + a.votes));

  console.log(`[RadioFetch] Curated ${finalStations.length} unique worldwide radio stations!`);

  // Category summary
  const catCount = {};
  for (const s of finalStations) {
    catCount[s.category] = (catCount[s.category] || 0) + 1;
  }
  console.log('[RadioFetch] Category distribution:', catCount);

  // Write GeoJSON representation for MapLibre layer
  const geojson = {
    type: 'FeatureCollection',
    features: finalStations.map(s => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [s.lon, s.lat],
      },
      properties: {
        id: s.id,
        name: s.name,
        country: s.country,
        countryCode: s.countryCode,
        state: s.state,
        category: s.category,
        streamUrl: s.streamUrl,
        codec: s.codec,
        bitrate: s.bitrate,
        tags: s.tags.join(', '),
      },
    })),
  };

  fs.writeFileSync(outputPath, JSON.stringify(finalStations, null, 2), 'utf-8');
  console.log(`[RadioFetch] Saved catalog to ${outputPath}`);

  const geojsonPath = path.resolve(__dirname, '../public/data/radio-stations.geojson');
  fs.writeFileSync(geojsonPath, JSON.stringify(geojson), 'utf-8');
  console.log(`[RadioFetch] Saved GeoJSON layer to ${geojsonPath}`);
}

main().catch(err => {
  console.error('[RadioFetch] Execution failed:', err);
  process.exit(1);
});
