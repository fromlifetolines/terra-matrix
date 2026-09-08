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
    id: 'cts-news',
    name: '華視新聞 CH52 CTS News Live',
    city: 'Taipei',
    country: 'Taiwan',
    lat: 25.042,
    lon: 121.556,
    videoId: 'TL8MMGiF0hA',
    category: 'news'
  },
  {
    id: 'ctv-news',
    name: '中視新聞 CTV News Live 24H',
    city: 'Taipei',
    country: 'Taiwan',
    lat: 25.056,
    lon: 121.594,
    videoId: '_GDAswKx6Cg',
    category: 'news'
  },
  {
    id: 'tokyo-shibuya',
    name: '東京澀谷街頭 4K CCTV (Shibuya Crossing Live)',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6595,
    lon: 139.7004,
    videoId: '4993sBLAzGA',
    category: 'cctv'
  },
  {
    id: 'alishan-live',
    name: '阿里山二延平步道 4K 即時影像 Alishan 4K',
    city: 'Chiayi',
    country: 'Taiwan',
    lat: 23.511,
    lon: 120.704,
    videoId: 'B6eki-0-w0g',
    category: 'cctv'
  },
  {
    id: 'taoyuan-airport',
    name: '桃園國際機場即時影像 Taoyuan Airport 4K',
    city: 'Taoyuan',
    country: 'Taiwan',
    lat: 25.0797,
    lon: 121.2342,
    videoId: 'y3_x8el5ZJY',
    category: 'traffic'
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
  }
];

export const DEFAULT_MATRIX_CHANNELS: CCTVPoint[] = [
  CCTV_PRESETS[0], // 公視新聞台 PTS Live (wM0g8EoUZ_E)
  CCTV_PRESETS[8], // DW News 24/7 International (LuKwFajn37U)
  CCTV_PRESETS[3], // 東京澀谷街頭 4K CCTV (4993sBLAzGA)
  CCTV_PRESETS[7], // 紐約時代廣場 New York Times Square 4K (4qyZLflp-sI)
];
