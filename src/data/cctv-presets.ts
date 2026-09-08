export interface CCTVPoint {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  videoId: string;
  category: 'cctv' | 'news' | 'traffic' | 'port';
}

export const CCTV_PRESETS: CCTVPoint[] = [
  {
    id: 'pts-news',
    name: '公視新聞台 PTS News 24H',
    city: 'Taipei',
    country: 'Taiwan',
    lat: 25.033,
    lon: 121.5654,
    videoId: 'wM0g8EoUZ_E',
    category: 'news'
  },
  {
    id: 'ttv-news',
    name: '台視新聞台 TTV News Live',
    city: 'Taipei',
    country: 'Taiwan',
    lat: 25.048,
    lon: 121.552,
    videoId: 'xL0ch83RAK8',
    category: 'news'
  },
  {
    id: 'keelung-port',
    name: '基隆港海運即時監控 Keelung Port Live Cam',
    city: 'Keelung',
    country: 'Taiwan',
    lat: 25.132,
    lon: 121.745,
    videoId: 'z_fY1pj1VBw',
    category: 'port'
  },
  {
    id: 'tokyo-shibuya',
    name: '東京澀谷 Tokyo Shibuya Crossing 4K Live',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6595,
    lon: 139.7004,
    videoId: '_k-5U7IeK8g',
    category: 'cctv'
  },
  {
    id: 'dw-news',
    name: 'DW News 24/7 International',
    city: 'Berlin',
    country: 'Germany',
    lat: 52.52,
    lon: 13.405,
    videoId: 'LuKwFajn37U',
    category: 'news'
  },
  {
    id: 'france-24',
    name: 'France 24 English Live',
    city: 'Paris',
    country: 'France',
    lat: 48.8566,
    lon: 2.3522,
    videoId: 'u9foWyMSETk',
    category: 'news'
  },
  {
    id: 'new-york-times-square',
    name: '紐約時代廣場 New York Times Square 4K',
    city: 'New York',
    country: 'USA',
    lat: 40.758,
    lon: -73.9855,
    videoId: '4qyZLflp-sI',
    category: 'cctv'
  },
  {
    id: 'london-piccadilly',
    name: '倫敦皮卡迪利 London Piccadilly Circus',
    city: 'London',
    country: 'UK',
    lat: 51.51,
    lon: -0.134,
    videoId: 'Lxqcg1qt0XU',
    category: 'cctv'
  },
  {
    id: 'kyiv-maidan',
    name: '烏克蘭基輔 Kyiv Maidan Live Feed',
    city: 'Kyiv',
    country: 'Ukraine',
    lat: 50.4501,
    lon: 30.5234,
    videoId: '-Q7FuPINDjA',
    category: 'cctv'
  },
  {
    id: 'sky-news',
    name: 'Sky News Live Breaking',
    city: 'London',
    country: 'UK',
    lat: 51.488,
    lon: -0.32,
    videoId: 'uvviIF4725I',
    category: 'news'
  },
  {
    id: 'iss-earth',
    name: 'NASA ISS HD Earth Viewing',
    city: 'Low Earth Orbit',
    country: 'Space',
    lat: 0.0,
    lon: 0.0,
    videoId: 'vytmBNhc9ig',
    category: 'cctv'
  },
  {
    id: 'sydney-harbour',
    name: '雪梨港灣 Sydney Harbour Live',
    city: 'Sydney',
    country: 'Australia',
    lat: -33.8568,
    lon: 151.2153,
    videoId: '7pcL-0Wo77U',
    category: 'cctv'
  }
];

export const DEFAULT_MATRIX_CHANNELS: CCTVPoint[] = [
  CCTV_PRESETS[0], // PTS News
  CCTV_PRESETS[1], // TTV News
  CCTV_PRESETS[4], // DW News
  CCTV_PRESETS[3], // Tokyo Shibuya
];
