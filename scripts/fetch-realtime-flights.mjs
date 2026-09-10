#!/usr/bin/env node
/**
 * scripts/fetch-realtime-flights.mjs
 *
 * Fetches real-time ADS-B flight telemetry directly from global aviation sources
 * and writes an up-to-the-minute sanitized flights.json to public/data/flights.json.
 * Bypasses browser CORS limitations completely during build and scheduled updates.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '../public/data/flights.json');

async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function run() {
  console.log('[FlightSync] Initiating real-time ADS-B telemetry synchronization...');
  const nowTs = Date.now();
  let flightPayload = null;

  // Primary Source: Global Osiris High-Density Ingest (7,000+ flights)
  try {
    console.log('[FlightSync] Fetching primary ADS-B stream from https://osirisai.live/api/flights ...');
    const res = await fetchWithTimeout('https://osirisai.live/api/flights', {
      headers: {
        'User-Agent': 'TerraMatrix-Intelligence/4.2 (Airspace Telemetry Ingest)',
        'Accept': 'application/json',
      },
    }, 20000);

    if (res.ok) {
      const data = await res.json();
      const commercial = data.commercial_flights || data.flights || [];
      const privateFl = data.private_flights || [];
      const military = data.military_flights || [];
      const jets = data.private_jets || [];

      if (commercial.length > 500) {
        flightPayload = {
          sync_time: new Date().toISOString(),
          timestamp: nowTs,
          source: 'ADS-B Multi-Receiver Telemetry Network',
          counts: {
            commercial: commercial.length,
            private: privateFl.length,
            jets: jets.length,
            military: military.length,
            total: commercial.length + privateFl.length + jets.length + military.length,
          },
          commercial_flights: commercial.map((f, idx) => ({
            ...f,
            id: f.id || f.icao24 || f.callsign || `com-${idx}`,
            lat: Number(f.lat) || 0,
            lng: Number(f.lng) || 0,
            alt: Number(f.alt) || 0,
            heading: Number(f.heading) || 0,
            speed_knots: Number(f.speed_knots) || 400,
            timestamp: nowTs,
            category: 'commercial',
          })),
          private_flights: privateFl.map((f, idx) => ({
            ...f,
            id: f.id || f.icao24 || f.callsign || `prv-${idx}`,
            lat: Number(f.lat) || 0,
            lng: Number(f.lng) || 0,
            alt: Number(f.alt) || 0,
            heading: Number(f.heading) || 0,
            speed_knots: Number(f.speed_knots) || 300,
            timestamp: nowTs,
            category: 'private',
          })),
          private_jets: jets.map((f, idx) => ({
            ...f,
            id: f.id || f.icao24 || f.callsign || `jet-${idx}`,
            lat: Number(f.lat) || 0,
            lng: Number(f.lng) || 0,
            alt: Number(f.alt) || 0,
            heading: Number(f.heading) || 0,
            speed_knots: Number(f.speed_knots) || 450,
            timestamp: nowTs,
            category: 'jets',
          })),
          military_flights: military.map((f, idx) => ({
            ...f,
            id: f.id || f.icao24 || f.callsign || `mil-${idx}`,
            lat: Number(f.lat) || 0,
            lng: Number(f.lng) || 0,
            alt: Number(f.alt) || 0,
            heading: Number(f.heading) || 0,
            speed_knots: Number(f.speed_knots) || 500,
            timestamp: nowTs,
            category: 'military',
          })),
        };
        console.log(`[FlightSync] Successfully parsed ${flightPayload.counts.total} real-time active flights!`);
      }
    }
  } catch (err) {
    console.warn('[FlightSync] Primary source failed:', err.message);
  }

  // Fallback: OpenSky Network API
  if (!flightPayload) {
    try {
      console.log('[FlightSync] Attempting fallback to OpenSky Network...');
      const res = await fetchWithTimeout('https://opensky-network.org/api/states/all', {
        headers: {
          'User-Agent': 'TerraMatrix-Intelligence/4.2',
        },
      }, 20000);

      if (res.ok) {
        const osData = await res.json();
        const states = osData.states || [];
        const commercial = [];
        const military = [];

        for (let i = 0; i < states.length; i++) {
          const s = states[i];
          const icao = s[0];
          const callsign = (s[1] || '').trim();
          const lng = s[5];
          const lat = s[6];
          const altM = s[7];
          const onGround = s[8];
          const velocity = s[9];
          const heading = s[10];

          if (onGround || lat === null || lng === null) continue;

          const flightObj = {
            id: icao || callsign || `os-${i}`,
            icao24: icao,
            callsign: callsign || icao.toUpperCase(),
            lat: Number(lat),
            lng: Number(lng),
            alt: altM ? Math.round(altM * 3.28084) : 32000,
            heading: heading !== null ? Math.round(heading) : 0,
            speed_knots: velocity ? Math.round(velocity * 1.94384) : 420,
            model: 'Unknown',
            airline_code: callsign.slice(0, 3),
            timestamp: nowTs,
            grounded: false,
            type: 'flight',
          };

          if (['RCH', 'SAM', 'ASY', 'CFC', 'RRR', 'NVY'].some((p) => callsign.startsWith(p))) {
            military.push({ ...flightObj, category: 'military' });
          } else {
            commercial.push({ ...flightObj, category: 'commercial' });
          }
        }

        if (commercial.length > 200) {
          flightPayload = {
            sync_time: new Date().toISOString(),
            timestamp: nowTs,
            source: 'OpenSky Network Live Stream',
            counts: {
              commercial: commercial.length,
              private: 0,
              jets: 0,
              military: military.length,
              total: commercial.length + military.length,
            },
            commercial_flights: commercial,
            private_flights: [],
            private_jets: [],
            military_flights: military,
          };
          console.log(`[FlightSync] OpenSky fallback retrieved ${flightPayload.counts.total} active flights!`);
        }
      }
    } catch (err) {
      console.warn('[FlightSync] OpenSky fallback failed:', err.message);
    }
  }

  if (flightPayload) {
    fs.writeFileSync(targetPath, JSON.stringify(flightPayload, null, 2), 'utf-8');
    console.log(`[FlightSync] Successfully updated ${targetPath} (${(fs.statSync(targetPath).size / 1024 / 1024).toFixed(2)} MB).`);
  } else {
    console.warn('[FlightSync] Both online live sources were unavailable; preserving existing cache.');
  }
}

run().catch((e) => {
  console.error('[FlightSync] Fatal error:', e);
  process.exit(1);
});
