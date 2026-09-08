export interface GeoIncident {
  id: string;
  title: string;
  location: string;
  lat: number;
  lon: number;
  level: 'CRITICAL' | 'ELEVATED' | 'MONITOR';
  category: 'geopolitical' | 'maritime' | 'security' | 'cyber';
  summary: string;
  updatedAt: string;
}

export const GLOBAL_INCIDENTS: GeoIncident[] = [
  {
    id: 'taiwan-strait-air-defense',
    title: 'Taiwan Strait ADIZ & Maritime Patrols',
    location: 'Taiwan Strait',
    lat: 24.1,
    lon: 119.8,
    level: 'ELEVATED',
    category: 'geopolitical',
    summary: 'Continuous situational tracking of naval and air activity along the median line.',
    updatedAt: 'LIVE'
  },
  {
    id: 'red-sea-security',
    title: 'Red Sea & Bab-el-Mandeb Commercial Escort',
    location: 'Bab-el-Mandeb Strait',
    lat: 12.58,
    lon: 43.33,
    level: 'CRITICAL',
    category: 'maritime',
    summary: 'Operation Prosperity Guardian & EU Aspides maritime protection zone.',
    updatedAt: 'LIVE'
  },
  {
    id: 'eastern-europe-front',
    title: 'Eastern European Theater Monitoring',
    location: 'Dnieper Basin, Ukraine',
    lat: 48.45,
    lon: 35.04,
    level: 'CRITICAL',
    category: 'security',
    summary: 'Satellite optical & synthetic aperture radar surveillance of conflict corridors.',
    updatedAt: 'LIVE'
  },
  {
    id: 'hormuz-monitoring',
    title: 'Strait of Hormuz Tanker Transit Monitoring',
    location: 'Strait of Hormuz',
    lat: 26.56,
    lon: 56.25,
    level: 'ELEVATED',
    category: 'maritime',
    summary: 'AIS anomaly detection and international task force surveillance over oil lifelines.',
    updatedAt: 'LIVE'
  },
  {
    id: 'scs-second-thomas',
    title: 'South China Sea Maritime Resupply Axis',
    location: 'Spratly Islands',
    lat: 9.75,
    lon: 115.85,
    level: 'ELEVATED',
    category: 'geopolitical',
    summary: 'Real-time positioning of coast guard patrols and territorial standoff points.',
    updatedAt: 'LIVE'
  },
  {
    id: 'korean-dmz',
    title: 'Korean Peninsula DMZ & Ballistic Monitoring',
    location: 'Panmunjom, DMZ',
    lat: 37.95,
    lon: 126.67,
    level: 'MONITOR',
    category: 'security',
    summary: 'Early warning radar network integration across East Asian periphery.',
    updatedAt: 'LIVE'
  }
];

export interface GeoNewsItem {
  id: string;
  headline: string;
  source: string;
  city: string;
  lat: number;
  lon: number;
  time: string;
}

export const LIVE_NEWS_POINTS: GeoNewsItem[] = [
  {
    id: 'news-tpe',
    headline: 'Taipei Command: Regional semiconductor & supply chain resilience status green',
    source: 'CNA / PTS',
    city: 'Taipei',
    lat: 25.0375,
    lon: 121.5637,
    time: '5m ago'
  },
  {
    id: 'news-dc',
    headline: 'Washington: National Security Council updates maritime navigation advisory',
    source: 'Reuters',
    city: 'Washington DC',
    lat: 38.8951,
    lon: -77.0364,
    time: '12m ago'
  },
  {
    id: 'news-tyo',
    headline: 'Tokyo: Defense Ministry issues quarterly aerial reconnaissance assessment',
    source: 'NHK / Kyodo',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.6917,
    time: '18m ago'
  },
  {
    id: 'news-bru',
    headline: 'Brussels: European Commission coordinates critical undersea infrastructure protection',
    source: 'EU Observer',
    city: 'Brussels',
    lat: 50.8503,
    lon: 4.3517,
    time: '25m ago'
  },
  {
    id: 'news-lon',
    headline: 'London: International Maritime Organization convenes on AIS spoofing countermeasures',
    source: 'Sky News',
    city: 'London',
    lat: 51.5074,
    lon: -0.1278,
    time: '32m ago'
  },
  {
    id: 'news-manila',
    headline: 'Manila: Coast Guard increases patrol frequency across western exclusive economic zone',
    source: 'Inquirer',
    city: 'Manila',
    lat: 14.5995,
    lon: 120.9842,
    time: '40m ago'
  }
];
