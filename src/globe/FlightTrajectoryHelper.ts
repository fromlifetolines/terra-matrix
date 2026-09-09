/**
 * FlightTrajectoryHelper.ts
 *
 * Provides Great-Circle Geodesic trajectory computation, global airport topology,
 * and realistic flight origin/destination inference for real-time ADS-B radars.
 */

export interface AirportInfo {
  iata: string;
  icao: string;
  name: string;
  city: string;
  country: string;
  lng: number;
  lat: number;
}

export interface FlightRouteDetails {
  originIata: string;
  originCity: string;
  originName: string;
  destIata: string;
  destCity: string;
  destName: string;
  deptTime: string;
  arrTime: string;
  elapsedStr: string;
  remainingStr: string;
  progressPct: number;
  totalDistKm: number;
  distPastKm: number;
  distFutureKm: number;
  traveledCoords: [number, number][];
  futureCoords: [number, number][];
  originCoords: [number, number];
  destCoords: [number, number];
}

export const MAJOR_AIRPORTS: AirportInfo[] = [
  // Taiwan
  { iata: 'TPE', icao: 'RCTP', name: 'Taoyuan International Airport', city: 'Taipei', country: 'Taiwan', lng: 121.234, lat: 25.079 },
  { iata: 'TSA', icao: 'RCSS', name: 'Songshan Airport', city: 'Taipei', country: 'Taiwan', lng: 121.552, lat: 25.069 },
  { iata: 'KHH', icao: 'RCKH', name: 'Kaohsiung International Airport', city: 'Kaohsiung', country: 'Taiwan', lng: 120.350, lat: 22.571 },
  { iata: 'RMQ', icao: 'RCMQ', name: 'Taichung International Airport', city: 'Taichung', country: 'Taiwan', lng: 120.598, lat: 24.264 },
  { iata: 'MZG', icao: 'RCQC', name: 'Magong Airport', city: 'Penghu', country: 'Taiwan', lng: 119.630, lat: 23.568 },

  // East Asia
  { iata: 'HND', icao: 'RJTT', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan', lng: 139.779, lat: 35.549 },
  { iata: 'NRT', icao: 'RJAA', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', lng: 140.392, lat: 35.764 },
  { iata: 'KIX', icao: 'RJBB', name: 'Kansai International Airport', city: 'Osaka', country: 'Japan', lng: 135.233, lat: 34.432 },
  { iata: 'FUK', icao: 'RJFF', name: 'Fukuoka Airport', city: 'Fukuoka', country: 'Japan', lng: 130.450, lat: 33.585 },
  { iata: 'CTS', icao: 'RJCC', name: 'New Chitose Airport', city: 'Sapporo', country: 'Japan', lng: 141.692, lat: 42.775 },
  { iata: 'OKA', icao: 'ROAH', name: 'Naha Airport', city: 'Okinawa', country: 'Japan', lng: 127.646, lat: 26.195 },
  { iata: 'ICN', icao: 'RKSI', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', lng: 126.440, lat: 37.460 },
  { iata: 'GMP', icao: 'RKSS', name: 'Gimpo International Airport', city: 'Seoul', country: 'South Korea', lng: 126.790, lat: 37.558 },
  { iata: 'PUS', icao: 'RKPK', name: 'Gimhae International Airport', city: 'Busan', country: 'South Korea', lng: 128.938, lat: 35.179 },
  { iata: 'HKG', icao: 'VHHH', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China', lng: 113.914, lat: 22.308 },
  { iata: 'MFM', icao: 'VMMC', name: 'Macau International Airport', city: 'Macau', country: 'China', lng: 113.591, lat: 22.149 },
  { iata: 'PVG', icao: 'ZSPD', name: 'Pudong International Airport', city: 'Shanghai', country: 'China', lng: 121.805, lat: 31.144 },
  { iata: 'SHA', icao: 'ZSSS', name: 'Hongqiao International Airport', city: 'Shanghai', country: 'China', lng: 121.336, lat: 31.197 },
  { iata: 'PEK', icao: 'ZBAA', name: 'Capital International Airport', city: 'Beijing', country: 'China', lng: 116.597, lat: 40.079 },
  { iata: 'PKX', icao: 'ZBAD', name: 'Daxing International Airport', city: 'Beijing', country: 'China', lng: 116.410, lat: 39.509 },
  { iata: 'CAN', icao: 'ZGGG', name: 'Baiyun International Airport', city: 'Guangzhou', country: 'China', lng: 113.298, lat: 23.392 },
  { iata: 'SZX', icao: 'ZGSZ', name: 'Bao\'an International Airport', city: 'Shenzhen', country: 'China', lng: 113.810, lat: 22.639 },
  { iata: 'CTU', icao: 'ZUUU', name: 'Shuangliu International Airport', city: 'Chengdu', country: 'China', lng: 103.947, lat: 30.578 },

  // Southeast Asia
  { iata: 'SIN', icao: 'WSSS', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', lng: 103.991, lat: 1.364 },
  { iata: 'BKK', icao: 'VTBS', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', lng: 100.750, lat: 13.690 },
  { iata: 'DMK', icao: 'VTBD', name: 'Don Mueang International Airport', city: 'Bangkok', country: 'Thailand', lng: 100.607, lat: 13.912 },
  { iata: 'KUL', icao: 'WMKK', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia', lng: 101.709, lat: 2.745 },
  { iata: 'MNL', icao: 'RPLL', name: 'Ninoy Aquino International Airport', city: 'Manila', country: 'Philippines', lng: 121.019, lat: 14.508 },
  { iata: 'SGN', icao: 'VVTS', name: 'Tan Son Nhat International Airport', city: 'Ho Chi Minh', country: 'Vietnam', lng: 106.651, lat: 10.818 },
  { iata: 'HAN', icao: 'VVNB', name: 'Noi Bai International Airport', city: 'Hanoi', country: 'Vietnam', lng: 105.807, lat: 21.221 },
  { iata: 'CGK', icao: 'WIII', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', country: 'Indonesia', lng: 106.655, lat: -6.125 },
  { iata: 'DPS', icao: 'WADD', name: 'Ngurah Rai International Airport', city: 'Bali', country: 'Indonesia', lng: 115.167, lat: -8.748 },

  // South Asia & Middle East
  { iata: 'DEL', icao: 'VIDP', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', lng: 77.100, lat: 28.556 },
  { iata: 'BOM', icao: 'VABB', name: 'Chhatrapati Shivaji Maharaj Airport', city: 'Mumbai', country: 'India', lng: 72.874, lat: 19.089 },
  { iata: 'BLR', icao: 'VOBL', name: 'Kempegowda International Airport', city: 'Bengaluru', country: 'India', lng: 77.706, lat: 13.198 },
  { iata: 'DXB', icao: 'OMDB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE', lng: 55.364, lat: 25.253 },
  { iata: 'AUH', icao: 'OMAA', name: 'Zayed International Airport', city: 'Abu Dhabi', country: 'UAE', lng: 54.651, lat: 24.433 },
  { iata: 'DOH', icao: 'OTHH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', lng: 51.608, lat: 25.273 },
  { iata: 'IST', icao: 'LTFM', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', lng: 28.727, lat: 41.275 },
  { iata: 'SAW', icao: 'LTFJ', name: 'Sabiha Gokcen Airport', city: 'Istanbul', country: 'Turkey', lng: 29.430, lat: 40.898 },
  { iata: 'TLV', icao: 'LLBG', name: 'Ben Gurion Airport', city: 'Tel Aviv', country: 'Israel', lng: 34.885, lat: 32.005 },

  // Europe
  { iata: 'LHR', icao: 'EGLL', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom', lng: -0.454, lat: 51.470 },
  { iata: 'LGW', icao: 'EGKK', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom', lng: -0.190, lat: 51.148 },
  { iata: 'CDG', icao: 'LFPG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', lng: 2.550, lat: 49.009 },
  { iata: 'ORY', icao: 'LFPO', name: 'Orly Airport', city: 'Paris', country: 'France', lng: 2.360, lat: 48.726 },
  { iata: 'FRA', icao: 'EDDF', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', lng: 8.562, lat: 50.037 },
  { iata: 'MUC', icao: 'EDDM', name: 'Munich Airport', city: 'Munich', country: 'Germany', lng: 11.786, lat: 48.353 },
  { iata: 'DUS', icao: 'EDDL', name: 'Dusseldorf Airport', city: 'Dusseldorf', country: 'Germany', lng: 6.766, lat: 51.289 },
  { iata: 'AMS', icao: 'EHAM', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', lng: 4.764, lat: 52.308 },
  { iata: 'MAD', icao: 'LEMD', name: 'Adolfo Suarez Madrid-Barajas', city: 'Madrid', country: 'Spain', lng: -3.567, lat: 40.483 },
  { iata: 'BCN', icao: 'LEBL', name: 'Josep Tarradellas Barcelona-El Prat', city: 'Barcelona', country: 'Spain', lng: 2.078, lat: 41.297 },
  { iata: 'FCO', icao: 'LIRF', name: 'Leonardo da Vinci-Fiumicino', city: 'Rome', country: 'Italy', lng: 12.238, lat: 41.800 },
  { iata: 'ZRH', icao: 'LSZH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', lng: 8.549, lat: 47.458 },
  { iata: 'VIE', icao: 'LOWW', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria', lng: 16.569, lat: 48.110 },
  { iata: 'ATH', icao: 'LGAV', name: 'Eleftherios Venizelos Airport', city: 'Athens', country: 'Greece', lng: 23.944, lat: 37.936 },
  { iata: 'ARN', icao: 'ESSA', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden', lng: 17.918, lat: 59.651 },
  { iata: 'OSL', icao: 'ENGM', name: 'Oslo Airport', city: 'Oslo', country: 'Norway', lng: 11.100, lat: 60.197 },
  { iata: 'BUD', icao: 'LHBP', name: 'Budapest Ferenc Liszt Airport', city: 'Budapest', country: 'Hungary', lng: 19.255, lat: 47.436 },

  // Americas
  { iata: 'JFK', icao: 'KJFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', lng: -73.778, lat: 40.641 },
  { iata: 'EWR', icao: 'KEWR', name: 'Newark Liberty International', city: 'New York', country: 'USA', lng: -74.168, lat: 40.692 },
  { iata: 'LAX', icao: 'KLAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', lng: -118.408, lat: 33.942 },
  { iata: 'SFO', icao: 'KSFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA', lng: -122.375, lat: 37.619 },
  { iata: 'SEA', icao: 'KSEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'USA', lng: -122.308, lat: 47.450 },
  { iata: 'ORD', icao: 'KORD', name: 'O\'Hare International Airport', city: 'Chicago', country: 'USA', lng: -87.904, lat: 41.974 },
  { iata: 'DFW', icao: 'KDFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'USA', lng: -97.040, lat: 32.899 },
  { iata: 'ATL', icao: 'KATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'USA', lng: -84.427, lat: 33.640 },
  { iata: 'MIA', icao: 'KMIA', name: 'Miami International Airport', city: 'Miami', country: 'USA', lng: -80.287, lat: 25.795 },
  { iata: 'YVR', icao: 'CYVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada', lng: -123.184, lat: 49.196 },
  { iata: 'YYZ', icao: 'CYYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada', lng: -79.624, lat: 43.677 },
  { iata: 'GRU', icao: 'SBGR', name: 'Sao Paulo/Guarulhos International', city: 'Sao Paulo', country: 'Brazil', lng: -46.473, lat: -23.435 },
  { iata: 'EZE', icao: 'SAEZ', name: 'Ministro Pistarini International', city: 'Buenos Aires', country: 'Argentina', lng: -58.535, lat: -34.822 },

  // Oceania & Africa
  { iata: 'SYD', icao: 'YSSY', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', lng: 151.177, lat: -33.946 },
  { iata: 'MEL', icao: 'YMML', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', lng: 144.843, lat: -37.673 },
  { iata: 'BNE', icao: 'YBBN', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia', lng: 153.117, lat: -27.384 },
  { iata: 'AKL', icao: 'NZAA', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand', lng: 174.791, lat: -37.008 },
  { iata: 'JNB', icao: 'FAOR', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'South Africa', lng: 28.246, lat: -26.139 },
  { iata: 'CPT', icao: 'FACT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa', lng: 18.602, lat: -33.971 },
];

/**
 * Calculates great-circle distance in kilometers between two coordinates using Haversine formula.
 */
export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates initial bearing in degrees (0..360) from point 1 to point 2.
 */
export function bearingDegrees(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;
  const phi1 = lat1 * toRad;
  const phi2 = lat2 * toRad;
  const deltaLam = (lon2 - lon1) * toRad;

  const y = Math.sin(deltaLam) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLam);
  const theta = Math.atan2(y, x);
  return (theta * toDeg + 360) % 360;
}

/**
 * Generates smooth Great-Circle (geodesic) path coordinates between two points on the globe.
 */
export function generateGreatCircleCoordinates(
  startLng: number,
  startLat: number,
  endLng: number,
  endLat: number,
  numPoints: number = 40
): [number, number][] {
  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;

  const lat1 = startLat * toRad;
  const lon1 = startLng * toRad;
  const lat2 = endLat * toRad;
  const lon2 = endLng * toRad;

  const d = 2 * Math.asin(
    Math.sqrt(
      Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon1 - lon2) / 2), 2)
    )
  );

  if (d < 1e-6) {
    return [[startLng, startLat], [endLng, endLat]];
  }

  const coords: [number, number][] = [];
  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);

    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);

    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * toDeg;
    let lon = Math.atan2(y, x) * toDeg;

    while (lon > 180) lon -= 360;
    while (lon < -180) lon += 360;

    coords.push([lon, lat]);
  }

  return coords;
}

/**
 * Airline Hub Map: associates major airline IATA/ICAO prefixes to their primary hubs.
 */
const AIRLINE_HUBS: Record<string, string[]> = {
  CAL: ['TPE', 'KHH'],
  CI: ['TPE', 'KHH'],
  EVA: ['TPE', 'KHH'],
  BR: ['TPE', 'KHH'],
  SJX: ['TPE'],
  JX: ['TPE'],
  JAL: ['HND', 'NRT', 'KIX'],
  JL: ['HND', 'NRT'],
  ANA: ['HND', 'NRT', 'KIX'],
  NH: ['HND', 'NRT'],
  CPA: ['HKG'],
  CX: ['HKG'],
  SIA: ['SIN'],
  SQ: ['SIN'],
  THA: ['BKK'],
  TG: ['BKK'],
  UAL: ['SFO', 'ORD', 'EWR', 'LAX'],
  UA: ['SFO', 'ORD', 'EWR'],
  DAL: ['ATL', 'SEA', 'JFK', 'LAX'],
  DL: ['ATL', 'SEA'],
  AAL: ['DFW', 'MIA', 'ORD', 'JFK'],
  AA: ['DFW', 'MIA', 'ORD'],
  BAW: ['LHR', 'LGW'],
  BA: ['LHR'],
  AFR: ['CDG', 'ORY'],
  AF: ['CDG'],
  DLH: ['FRA', 'MUC'],
  LH: ['FRA', 'MUC'],
  KLM: ['AMS'],
  KL: ['AMS'],
  UAE: ['DXB'],
  EK: ['DXB'],
  QTR: ['DOH'],
  QR: ['DOH'],
  TVF: ['ORY', 'CDG'],
  EZY: ['LGW', 'CDG'],
  EWG: ['DUS', 'MUC'],
  AEE: ['ATH'],
  PGT: ['SAW', 'IST'],
  WZZ: ['BUD', 'WAW'],
  AIC: ['DEL', 'BOM'],
  IGO: ['DEL', 'BLR'],
  AXB: ['DEL', 'BOM'],
};

/**
 * Resolves full FlightRouteDetails for any flight, determining origin and destination
 * airports, calculating timestamps, progress, and generating great-circle coordinates.
 */
export function resolveFlightRouteDetails(flight: any): FlightRouteDetails {
  const fLat = Number(flight.lat) || 0;
  const fLng = Number(flight.lng) || 0;
  const heading = Number(flight.heading) || 0;
  const callsign = String(flight.callsign || flight.icao24 || '').toUpperCase().trim();
  const airlineCode = String(flight.airline_code || '').toUpperCase().trim();

  // 1. Identify candidate hub or airline
  let preferredHubIatas: string[] = [];
  for (const [code, hubs] of Object.entries(AIRLINE_HUBS)) {
    if (callsign.startsWith(code) || airlineCode === code) {
      preferredHubIatas = hubs;
      break;
    }
  }

  let originAirport: AirportInfo | undefined;
  let destAirport: AirportInfo | undefined;

  // If flight already explicitly has origin / dest
  if (flight.origin) {
    originAirport = MAJOR_AIRPORTS.find((a) => a.iata === flight.origin || a.icao === flight.origin);
  }
  if (flight.destination) {
    destAirport = MAJOR_AIRPORTS.find((a) => a.iata === flight.destination || a.icao === flight.destination);
  }

  // 2. Intelligent Inference using Heading Vector & Global Hubs
  if (!originAirport || !destAirport) {
    // Sort all airports by distance from current aircraft
    const sortedByDist = [...MAJOR_AIRPORTS]
      .map((a) => {
        const d = distanceKm(fLat, fLng, a.lat, a.lng);
        const brg = bearingDegrees(fLat, fLng, a.lat, a.lng);
        let angleDiff = Math.abs(brg - heading);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;
        // Forward if angleDiff <= 85 degrees; Backward if angleDiff >= 95 degrees
        const isAhead = angleDiff <= 85;
        const isBehind = angleDiff >= 95;
        const isHub = preferredHubIatas.includes(a.iata);
        return { airport: a, dist: d, isAhead, isBehind, isHub, angleDiff };
      })
      .sort((a, b) => a.dist - b.dist);

    // If we have a preferred hub for this airline
    const hubCandidates = sortedByDist.filter((item) => item.isHub);
    const primaryHubItem = hubCandidates[0];

    if (primaryHubItem) {
      if (primaryHubItem.isBehind) {
        // Plane is flying AWAY from hub -> Origin is Hub!
        originAirport = originAirport || primaryHubItem.airport;
        // Destination is the nearest/major airport ahead
        const aheadAirport = sortedByDist.find((item) => item.isAhead && item.dist > 150 && item.airport.iata !== originAirport?.iata);
        destAirport = destAirport || aheadAirport?.airport;
      } else {
        // Plane is flying TOWARDS hub -> Destination is Hub!
        destAirport = destAirport || primaryHubItem.airport;
        // Origin is the airport behind
        const behindAirport = sortedByDist.find((item) => item.isBehind && item.dist > 150 && item.airport.iata !== destAirport?.iata);
        originAirport = originAirport || behindAirport?.airport;
      }
    }

    // Fallback: pick closest airport behind as origin, closest ahead as destination
    if (!originAirport) {
      const behind = sortedByDist.find((item) => item.isBehind && item.dist > 80);
      originAirport = behind ? behind.airport : sortedByDist[1]?.airport || sortedByDist[0]?.airport;
    }
    if (!destAirport) {
      const ahead = sortedByDist.find((item) => item.isAhead && item.dist > 80 && item.airport.iata !== originAirport?.iata);
      destAirport = ahead ? ahead.airport : sortedByDist[0]?.airport;
    }
  }

  // Ensure origin and dest are not identical
  if (originAirport.iata === destAirport.iata) {
    const alt = MAJOR_AIRPORTS.find((a) => a.iata !== originAirport!.iata && distanceKm(fLat, fLng, a.lat, a.lng) > 200);
    if (alt) destAirport = alt;
  }

  // 3. Compute Distances & Time Telemetry
  const distPast = Math.max(50, Math.round(distanceKm(originAirport.lat, originAirport.lng, fLat, fLng)));
  const distFuture = Math.max(50, Math.round(distanceKm(fLat, fLng, destAirport.lat, destAirport.lng)));
  const totalDist = distPast + distFuture;

  const rawSpeedKts = Number(flight.speed_knots) || 450;
  const speedKmh = Math.max(400, Math.round(rawSpeedKts * 1.852));

  const elapsedHours = distPast / speedKmh;
  const remainingHours = distFuture / speedKmh;
  const progressPct = Math.min(98, Math.max(2, Math.round((distPast / totalDist) * 100)));

  const now = new Date();
  const deptTimeObj = new Date(now.getTime() - elapsedHours * 3600 * 1000);
  const arrTimeObj = new Date(now.getTime() + remainingHours * 3600 * 1000);

  const formatHhMm = (d: Date) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const formatDuration = (hrs: number) => {
    const h = Math.floor(hrs);
    const m = Math.round((hrs - h) * 60);
    return `${h}h ${m}m`;
  };

  // 4. Generate 3D Trajectory Coordinates
  const traveledCoords = generateGreatCircleCoordinates(originAirport.lng, originAirport.lat, fLng, fLat, 30);
  const futureCoords = generateGreatCircleCoordinates(fLng, fLat, destAirport.lng, destAirport.lat, 30);

  return {
    originIata: originAirport.iata,
    originCity: originAirport.city,
    originName: originAirport.name,
    destIata: destAirport.iata,
    destCity: destAirport.city,
    destName: destAirport.name,
    deptTime: formatHhMm(deptTimeObj),
    arrTime: formatHhMm(arrTimeObj),
    elapsedStr: formatDuration(elapsedHours),
    remainingStr: formatDuration(remainingHours),
    progressPct,
    totalDistKm: totalDist,
    distPastKm: distPast,
    distFutureKm: distFuture,
    traveledCoords,
    futureCoords,
    originCoords: [originAirport.lng, originAirport.lat],
    destCoords: [destAirport.lng, destAirport.lat],
  };
}
