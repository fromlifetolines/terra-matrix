export interface GeoRoute {
  id: string;
  name: string;
  category: 'maritime' | 'aviation';
  type: string;
  waypoints: [number, number][]; // [lat, lon]
}

export const MARITIME_ROUTES: GeoRoute[] = [
  {
    id: 'suez-med',
    name: 'Suez Canal & Red Sea Route (Asia-Europe)',
    category: 'maritime',
    type: 'Critical Chokepoint',
    waypoints: [
      [1.3, 103.8], // Singapore
      [5.9, 95.2],  // Malacca exit
      [12.6, 43.3], // Bab-el-Mandeb
      [27.8, 34.3], // Red Sea
      [29.9, 32.5], // Suez Canal
      [36.1, -5.3], // Gibraltar
      [51.9, 4.5]   // Rotterdam
    ]
  },
  {
    id: 'taiwan-strait',
    name: 'Taiwan Strait Strategic Lane',
    category: 'maritime',
    type: 'High Volume Trade',
    waypoints: [
      [21.9, 120.8], // South Taiwan
      [23.5, 119.5], // Penghu
      [25.3, 121.6], // North Taiwan
      [31.2, 121.5]  // Shanghai
    ]
  },
  {
    id: 'malacca-strait',
    name: 'Strait of Malacca Primary Lane',
    category: 'maritime',
    type: 'Energy & Container',
    waypoints: [
      [1.2, 103.6],
      [2.2, 102.2],
      [4.2, 100.1],
      [5.8, 97.5]
    ]
  },
  {
    id: 'hormuz-strait',
    name: 'Strait of Hormuz Oil Corridor',
    category: 'maritime',
    type: 'Hydrocarbon Lifeline',
    waypoints: [
      [29.9, 48.5], // Persian Gulf
      [26.5, 56.2], // Hormuz
      [23.6, 58.5], // Gulf of Oman
      [15.0, 65.0]  // Indian Ocean
    ]
  },
  {
    id: 'panama-canal',
    name: 'Panama Canal Transit (Pacific-Atlantic)',
    category: 'maritime',
    type: 'Global Chokepoint',
    waypoints: [
      [8.5, -79.9],  // Pacific entrance
      [9.0, -79.6],  // Gatun Lake
      [9.3, -79.9],  // Atlantic entrance
      [25.0, -78.0]  // Caribbean
    ]
  },
  {
    id: 'trans-pacific-maritime',
    name: 'Trans-Pacific Container Highway',
    category: 'maritime',
    type: 'Trans-Oceanic',
    waypoints: [
      [31.2, 121.5], // Shanghai
      [35.0, 140.0], // Japan Offshore
      [42.0, 175.0], // North Pacific
      [33.7, -118.2] // Los Angeles
    ]
  }
];

export const AVIATION_ROUTES: GeoRoute[] = [
  {
    id: 'nat-tracks-1',
    name: 'North Atlantic Track (London - New York)',
    category: 'aviation',
    type: 'Intercontinental',
    waypoints: [
      [51.47, -0.45],  // LHR
      [55.0, -15.0],
      [54.0, -30.0],
      [51.0, -50.0],
      [44.0, -65.0],
      [40.64, -73.78]  // JFK
    ]
  },
  {
    id: 'transpacific-air-1',
    name: 'Transpacific Air Corridor (Tokyo - San Francisco)',
    category: 'aviation',
    type: 'Intercontinental',
    waypoints: [
      [35.77, 140.39], // NRT
      [45.0, 165.0],
      [50.0, -170.0],
      [45.0, -140.0],
      [37.62, -122.38] // SFO
    ]
  },
  {
    id: 'tpe-lax',
    name: 'Taipei - Los Angeles Skyway',
    category: 'aviation',
    type: 'Intercontinental',
    waypoints: [
      [25.08, 121.23], // TPE
      [38.0, 150.0],
      [48.0, -165.0],
      [42.0, -135.0],
      [33.94, -118.41] // LAX
    ]
  },
  {
    id: 'euro-asia-airway',
    name: 'Euro-Asian Skyway (Frankfurt - Singapore)',
    category: 'aviation',
    type: 'Long Haul Hub',
    waypoints: [
      [50.03, 8.57],   // FRA
      [41.0, 28.9],    // Istanbul
      [25.25, 55.36],  // Dubai
      [13.69, 100.75], // Bangkok
      [1.36, 103.99]   // SIN
    ]
  },
  {
    id: 'polar-airway',
    name: 'Arctic Cross-Polar Corridor (Seoul - New York)',
    category: 'aviation',
    type: 'Polar Flight Track',
    waypoints: [
      [37.46, 126.44], // ICN
      [52.0, 140.0],
      [68.0, -165.0],  // Bering / Arctic
      [60.0, -100.0],  // Hudson
      [40.64, -73.78]  // JFK
    ]
  }
];
