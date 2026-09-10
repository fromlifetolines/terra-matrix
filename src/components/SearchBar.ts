/**
 * SearchBar.ts
 *
 * Full-featured Omnibox Search Engine for Terra Matrix:
 * - Real-time flight search (e.g. CAL162, EVA, UAL, TVF) with flightData forwarding
 * - Taiwan administrative cities, counties, and complete 29 New Taipei / Taipei districts
 * - Specificity Scoring Engine (district matches take highest priority over generic parent cities)
 * - Safe macOS/Windows IME handling to prevent text concatenation & premature selection
 * - Global OSM Nominatim address geocoding for any street or location
 * - Strategic straits, military facilities, space stations & coordinates
 */

import { CCTV_PRESETS } from '../data/cctv-presets';

export interface SearchResult {
  title: string;
  subtitle: string;
  category: 'FLIGHT' | 'CITY' | 'DISTRICT' | 'CCTV' | 'GEOCODE' | 'CHOKEPOINT' | 'CAPITAL' | 'AIRPORT' | 'SPACE' | 'COORDS';
  lat: number;
  lng: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
  keywords?: string[];
  flightData?: any;
  cctvData?: any;
}

// ── Taiwan Comprehensive Geographic Location Database ──
export const TAIWAN_LOCATIONS: SearchResult[] = [
  // ── Special Municipalities & Major Cities ──
  {
    title: '新北市 (New Taipei City)',
    subtitle: 'Taiwan / Special Municipality · 板橋市府核心',
    category: 'CITY',
    lat: 25.0117,
    lng: 121.4658,
    zoom: 11.5,
    pitch: 35,
    keywords: ['新北市', '新北', 'new taipei city', 'new taipei'],
  },
  {
    title: '台北市 (Taipei City)',
    subtitle: 'Taiwan / Capital Command & Center · 國家首都',
    category: 'CAPITAL',
    lat: 25.0375,
    lng: 121.5637,
    zoom: 12,
    pitch: 40,
    keywords: ['台北市', '臺北市', '台北', '臺北', 'taipei city', 'taipei'],
  },
  {
    title: '桃園市 (Taoyuan City)',
    subtitle: 'Taiwan / International Aviation Hub · 航空城',
    category: 'CITY',
    lat: 24.9936,
    lng: 121.3010,
    zoom: 11.5,
    pitch: 35,
    keywords: ['桃園市', '桃園', 'taoyuan city', 'taoyuan'],
  },
  {
    title: '新竹市 (Hsinchu City)',
    subtitle: 'Taiwan / Science Park & High-Tech Hub · 矽島核心',
    category: 'CITY',
    lat: 24.8138,
    lng: 120.9675,
    zoom: 12.5,
    pitch: 35,
    keywords: ['新竹市', '新竹', 'hsinchu city', 'hsinchu'],
  },
  {
    title: '新竹縣 (Hsinchu County)',
    subtitle: 'Taiwan / Zhubei & Science Corridor · 生醫園區',
    category: 'CITY',
    lat: 24.8387,
    lng: 121.0177,
    zoom: 11,
    pitch: 30,
    keywords: ['新竹縣', 'hsinchu county'],
  },
  {
    title: '台中市 (Taichung City)',
    subtitle: 'Taiwan / Central Metropolis & Harbor · 中台灣核心',
    category: 'CITY',
    lat: 24.1477,
    lng: 120.6736,
    zoom: 11.5,
    pitch: 35,
    keywords: ['台中市', '臺中市', '台中', '臺中', 'taichung city', 'taichung'],
  },
  {
    title: '台南市 (Tainan City)',
    subtitle: 'Taiwan / Southern Cultural & Tech Hub · 南科園區',
    category: 'CITY',
    lat: 22.9997,
    lng: 120.2270,
    zoom: 11.5,
    pitch: 35,
    keywords: ['台南市', '臺南市', '台南', '臺南', 'tainan city', 'tainan'],
  },
  {
    title: '高雄市 (Kaohsiung City)',
    subtitle: 'Taiwan / Naval Base & Global Port · 南方門戶',
    category: 'CITY',
    lat: 22.6273,
    lng: 120.3014,
    zoom: 11.5,
    pitch: 35,
    keywords: ['高雄市', '高雄', 'kaohsiung city', 'kaohsiung'],
  },
  {
    title: '基隆市 (Keelung City)',
    subtitle: 'Taiwan / Northern Maritime Bastion · 北方要塞港',
    category: 'CITY',
    lat: 25.1276,
    lng: 121.7392,
    zoom: 13,
    pitch: 40,
    keywords: ['基隆市', '基隆', 'keelung city', 'keelung'],
  },
  {
    title: '宜蘭縣 (Yilan County)',
    subtitle: 'Taiwan / Lanyang Plain & Suao Base · 蘭陽平原',
    category: 'CITY',
    lat: 24.7570,
    lng: 121.7530,
    zoom: 11.5,
    pitch: 35,
    keywords: ['宜蘭縣', '宜蘭', 'yilan county', 'yilan'],
  },
  {
    title: '花蓮縣 (Hualien County)',
    subtitle: 'Taiwan / Jiashan Underground Base · 佳山要塞',
    category: 'CITY',
    lat: 23.9872,
    lng: 121.6016,
    zoom: 11.5,
    pitch: 40,
    keywords: ['花蓮縣', '花蓮', 'hualien county', 'hualien'],
  },
  {
    title: '台東縣 (Taitung County)',
    subtitle: 'Taiwan / Chihhang Air Base · 志航基地',
    category: 'CITY',
    lat: 22.7583,
    lng: 121.1444,
    zoom: 11.5,
    pitch: 35,
    keywords: ['台東縣', '臺東縣', '台東', '臺東', 'taitung county', 'taitung'],
  },
  {
    title: '嘉義市 (Chiayi City)',
    subtitle: 'Taiwan / 4th TFW F-16V Air Base · 水上基地',
    category: 'CITY',
    lat: 23.4800,
    lng: 120.4491,
    zoom: 12.5,
    pitch: 35,
    keywords: ['嘉義市', '嘉義', 'chiayi city', 'chiayi'],
  },
  {
    title: '嘉義縣 (Chiayi County)',
    subtitle: 'Taiwan / Southwestern Coast',
    category: 'CITY',
    lat: 23.4518,
    lng: 120.2559,
    zoom: 11,
    pitch: 30,
    keywords: ['嘉義縣', 'chiayi county'],
  },
  {
    title: '苗栗縣 (Miaoli County)',
    subtitle: 'Taiwan / Northwestern Region',
    category: 'CITY',
    lat: 24.5602,
    lng: 120.8214,
    zoom: 11,
    pitch: 30,
    keywords: ['苗栗縣', '苗栗', 'miaoli county', 'miaoli'],
  },
  {
    title: '彰化縣 (Changhua County)',
    subtitle: 'Taiwan / Central Coast',
    category: 'CITY',
    lat: 24.0817,
    lng: 120.5385,
    zoom: 11.5,
    pitch: 30,
    keywords: ['彰化縣', '彰化', 'changhua county', 'changhua'],
  },
  {
    title: '南投縣 (Nantou County)',
    subtitle: 'Taiwan / Central Mountain Bastion',
    category: 'CITY',
    lat: 23.9099,
    lng: 120.6847,
    zoom: 11,
    pitch: 40,
    keywords: ['南投縣', '南投', 'nantou county', 'nantou'],
  },
  {
    title: '雲林縣 (Yunlin County)',
    subtitle: 'Taiwan / Mailiao Industrial Corridor',
    category: 'CITY',
    lat: 23.7092,
    lng: 120.4313,
    zoom: 11,
    pitch: 30,
    keywords: ['雲林縣', '雲林', 'yunlin county', 'yunlin'],
  },
  {
    title: '屏東縣 (Pingtung County)',
    subtitle: 'Taiwan / Hengchun & Jiupeng Base · 九鵬飛彈基地',
    category: 'CITY',
    lat: 22.6828,
    lng: 120.4879,
    zoom: 11,
    pitch: 35,
    keywords: ['屏東縣', '屏東', 'pingtung county', 'pingtung'],
  },
  {
    title: '澎湖縣 (Penghu County)',
    subtitle: 'Taiwan Strait / Magong Forward Bastion · 馬公作戰前哨',
    category: 'CHOKEPOINT',
    lat: 23.5712,
    lng: 119.5793,
    zoom: 11.5,
    pitch: 35,
    keywords: ['澎湖縣', '澎湖', 'penghu county', 'penghu', 'magong'],
  },
  {
    title: '金門縣 (Kinmen County)',
    subtitle: 'Frontline Island Bastion & Defense Command · 防衛司令部',
    category: 'CHOKEPOINT',
    lat: 24.4493,
    lng: 118.3766,
    zoom: 12,
    pitch: 40,
    keywords: ['金門縣', '金門', 'kinmen county', 'kinmen'],
  },
  {
    title: '連江縣 (Matsu Islands)',
    subtitle: 'Dongyin & Nangan Radar & Missile Bastion · 南竿北竿要塞',
    category: 'CHOKEPOINT',
    lat: 26.1558,
    lng: 119.9397,
    zoom: 12.5,
    pitch: 40,
    keywords: ['連江縣', '馬祖', '連江', 'matsu', 'dongyin', 'nangan'],
  },

  // ── 新北市 ALL 29 DISTRICTS (Complete Coverage) ──
  {
    title: '新北市林口區 (Linkou District)',
    subtitle: 'New Taipei City / High-Tech & Expressway Hub · 智慧新城',
    category: 'DISTRICT',
    lat: 25.0772,
    lng: 121.3912,
    zoom: 14,
    pitch: 45,
    keywords: ['新北市林口區', '新北市林口', '林口區', '林口', 'linkou', 'linkou district'],
  },
  {
    title: '新北市板橋區 (Banqiao District)',
    subtitle: 'New Taipei City / Government Center · 新北市府政經中心',
    category: 'DISTRICT',
    lat: 25.0143,
    lng: 121.4627,
    zoom: 14,
    pitch: 45,
    keywords: ['新北市板橋區', '新北市板橋', '板橋區', '板橋', 'banqiao', 'banqiao district'],
  },
  {
    title: '新北市三重區 (Sanchong District)',
    subtitle: 'New Taipei City / Tamsui River West Bank · 淡水河西岸樞紐',
    category: 'DISTRICT',
    lat: 25.0615,
    lng: 121.4983,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市三重區', '新北市三重', '三重區', '三重', 'sanchong', 'sanchong district'],
  },
  {
    title: '新北市中和區 (Zhonghe District)',
    subtitle: 'New Taipei City / Southern Urban Sector · 高科技廠辦聚落',
    category: 'DISTRICT',
    lat: 24.9984,
    lng: 121.5003,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市中和區', '新北市中和', '中和區', '中和', 'zhonghe', 'zhonghe district'],
  },
  {
    title: '新北市永和區 (Yonghe District)',
    subtitle: 'New Taipei City / High Density Sector · 雙和核心商業區',
    category: 'DISTRICT',
    lat: 25.0078,
    lng: 121.5173,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市永和區', '新北市永和', '永和區', '永和', 'yonghe', 'yonghe district'],
  },
  {
    title: '新北市新莊區 (Xinzhuang District)',
    subtitle: 'New Taipei City / Sub-City Center · 新莊副都心',
    category: 'DISTRICT',
    lat: 25.0374,
    lng: 121.4504,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市新莊區', '新北市新莊', '新莊區', '新莊', 'xinzhuang', 'xinzhuang district'],
  },
  {
    title: '新北市新店區 (Xindian District)',
    subtitle: 'New Taipei City / Southern Tech Corridor · 碧潭與科技重鎮',
    category: 'DISTRICT',
    lat: 24.9680,
    lng: 121.5414,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市新店區', '新北市新店', '新店區', '新店', 'xindian', 'xindian district'],
  },
  {
    title: '新北市土城區 (Tucheng District)',
    subtitle: 'New Taipei City / Tucheng Industrial Park · 頂埔高科技園區',
    category: 'DISTRICT',
    lat: 24.9723,
    lng: 121.4438,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市土城區', '新北市土城', '土城區', '土城', 'tucheng', 'tucheng district'],
  },
  {
    title: '新北市蘆洲區 (Luzhou District)',
    subtitle: 'New Taipei City / Metro Terminal · 蘆洲重劃區',
    category: 'DISTRICT',
    lat: 25.0848,
    lng: 121.4727,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市蘆洲區', '新北市蘆洲', '蘆洲區', '蘆洲', 'luzhou', 'luzhou district'],
  },
  {
    title: '新北市汐止區 (Xizhi District)',
    subtitle: 'New Taipei City / Keelung River Valley · 汐止科學園區',
    category: 'DISTRICT',
    lat: 25.0629,
    lng: 121.6575,
    zoom: 13.5,
    pitch: 40,
    keywords: ['新北市汐止區', '新北市汐止', '汐止區', '汐止', 'xizhi', 'xizhi district'],
  },
  {
    title: '新北市淡水區 (Tamsui District)',
    subtitle: 'New Taipei City / Tamsui River Estuary · 淡水河口海防重鎮',
    category: 'DISTRICT',
    lat: 25.1756,
    lng: 121.4439,
    zoom: 13.5,
    pitch: 45,
    keywords: ['新北市淡水區', '新北市淡水', '淡水區', '淡水', 'tamsui', 'tamsui district'],
  },
  {
    title: '新北市樹林區 (Shulin District)',
    subtitle: 'New Taipei City / Shulin Railway Hub · 樹林產業聚落',
    category: 'DISTRICT',
    lat: 24.9904,
    lng: 121.4248,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市樹林區', '新北市樹林', '樹林區', '樹林', 'shulin'],
  },
  {
    title: '新北市鶯歌區 (Yingge District)',
    subtitle: 'New Taipei City / Ceramics & High-Speed Art Hub · 陶瓷之都',
    category: 'DISTRICT',
    lat: 24.9547,
    lng: 121.3551,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市鶯歌區', '新北市鶯歌', '鶯歌區', '鶯歌', 'yingge'],
  },
  {
    title: '新北市三峽區 (Sanxia District)',
    subtitle: 'New Taipei City / National Taipei University · 歷史老街',
    category: 'DISTRICT',
    lat: 24.9342,
    lng: 121.3719,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市三峽區', '新北市三峽', '三峽區', '三峽', 'sanxia'],
  },
  {
    title: '新北市五股區 (Wugu District)',
    subtitle: 'New Taipei City / Wugu Industrial Park · 新北產業園區',
    category: 'DISTRICT',
    lat: 25.0833,
    lng: 121.4388,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市五股區', '新北市五股', '五股區', '五股', 'wugu'],
  },
  {
    title: '新北市泰山區 (Taishan District)',
    subtitle: 'New Taipei City / Ming Chi Tech Corridor · 泰山生活圈',
    category: 'DISTRICT',
    lat: 25.0592,
    lng: 121.4312,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市泰山區', '新北市泰山', '泰山區', '泰山', 'taishan'],
  },
  {
    title: '新北市八里區 (Bali District)',
    subtitle: 'New Taipei City / Taipei Port Command · 台北港物流要塞',
    category: 'DISTRICT',
    lat: 25.1465,
    lng: 121.3995,
    zoom: 13.5,
    pitch: 45,
    keywords: ['新北市八里區', '新北市八里', '八里區', '八里', '台北港', 'bali'],
  },
  {
    title: '新北市瑞芳區 (Ruifang District)',
    subtitle: 'New Taipei City / Jiufen & Gold Ecological Park · 東北角海防',
    category: 'DISTRICT',
    lat: 25.1089,
    lng: 121.8080,
    zoom: 13.5,
    pitch: 45,
    keywords: ['新北市瑞芳區', '新北市瑞芳', '瑞芳區', '瑞芳', '九份', 'ruifang'],
  },
  {
    title: '新北市深坑區 (Shenkeng District)',
    subtitle: 'New Taipei City / Technology Corridor',
    category: 'DISTRICT',
    lat: 25.0022,
    lng: 121.6158,
    zoom: 14,
    pitch: 40,
    keywords: ['新北市深坑區', '新北市深坑', '深坑區', '深坑', 'shenkeng'],
  },
  {
    title: '新北市石碇區 (Shiding District)',
    subtitle: 'New Taipei City / Feicui Reservoir Basin',
    category: 'DISTRICT',
    lat: 24.9918,
    lng: 121.6586,
    zoom: 13.5,
    pitch: 40,
    keywords: ['新北市石碇區', '新北市石碇', '石碇區', '石碇', 'shiding'],
  },
  {
    title: '新北市坪林區 (Pinglin District)',
    subtitle: 'New Taipei City / Tea Culture & Highway Tunnel Gateway',
    category: 'DISTRICT',
    lat: 24.9377,
    lng: 121.7118,
    zoom: 13.5,
    pitch: 40,
    keywords: ['新北市坪林區', '新北市坪林', '坪林區', '坪林', 'pinglin'],
  },
  {
    title: '新北市三芝區 (Sanzhi District)',
    subtitle: 'New Taipei City / North Coast Coastal Sector',
    category: 'DISTRICT',
    lat: 25.2583,
    lng: 121.5007,
    zoom: 13,
    pitch: 40,
    keywords: ['新北市三芝區', '新北市三芝', '三芝區', '三芝', 'sanzhi'],
  },
  {
    title: '新北市石門區 (Shimen District)',
    subtitle: 'New Taipei City / Fugui Cape Northernmost Tip · 富貴角燈塔',
    category: 'DISTRICT',
    lat: 25.2903,
    lng: 121.5683,
    zoom: 13,
    pitch: 40,
    keywords: ['新北市石門區', '新北市石門', '石門區', '石門', '富貴角', 'shimen'],
  },
  {
    title: '新北市金山區 (Jinshan District)',
    subtitle: 'New Taipei City / Jinshan Coastal Basin',
    category: 'DISTRICT',
    lat: 25.2223,
    lng: 121.6421,
    zoom: 13,
    pitch: 40,
    keywords: ['新北市金山區', '新北市金山', '金山區', '金山', 'jinshan'],
  },
  {
    title: '新北市萬里區 (Wanli District)',
    subtitle: 'New Taipei City / Yehliu Geopark · 野柳地質要塞',
    category: 'DISTRICT',
    lat: 25.1787,
    lng: 121.6887,
    zoom: 13,
    pitch: 40,
    keywords: ['新北市萬里區', '新北市萬里', '萬里區', '萬里', '野柳', 'wanli'],
  },
  {
    title: '新北市平溪區 (Pingxi District)',
    subtitle: 'New Taipei City / Keelung River Headwaters',
    category: 'DISTRICT',
    lat: 25.0256,
    lng: 121.7388,
    zoom: 13,
    pitch: 40,
    keywords: ['新北市平溪區', '新北市平溪', '平溪區', '平溪', 'pingxi'],
  },
  {
    title: '新北市雙溪區 (Shuangxi District)',
    subtitle: 'New Taipei City / Mountain Basin Sector',
    category: 'DISTRICT',
    lat: 25.0345,
    lng: 121.8654,
    zoom: 13,
    pitch: 40,
    keywords: ['新北市雙溪區', '新北市雙溪', '雙溪區', '雙溪', 'shuangxi'],
  },
  {
    title: '新北市貢寮區 (Gongliao District)',
    subtitle: 'New Taipei City / Cape Sandiao Easternmost Tip · 三貂角燈塔',
    category: 'DISTRICT',
    lat: 25.0168,
    lng: 121.9082,
    zoom: 13,
    pitch: 40,
    keywords: ['新北市貢寮區', '新北市貢寮', '貢寮區', '貢寮', '三貂角', 'gongliao'],
  },
  {
    title: '新北市烏來區 (Wulai District)',
    subtitle: 'New Taipei City / Indigenous Highland Bastion',
    category: 'DISTRICT',
    lat: 24.8653,
    lng: 121.5505,
    zoom: 12.5,
    pitch: 45,
    keywords: ['新北市烏來區', '新北市烏來', '烏來區', '烏來', 'wulai'],
  },

  // ── 台北市 KEY DISTRICTS ──
  {
    title: '台北市信義區 (Xinyi District)',
    subtitle: 'Taipei City / Taipei 101 Financial Center · 金融特區',
    category: 'DISTRICT',
    lat: 25.0336,
    lng: 121.5670,
    zoom: 14.5,
    pitch: 50,
    keywords: ['台北市信義區', '信義區', '信義', 'taipei 101', 'xinyi'],
  },
  {
    title: '台北市大安區 (Da\'an District)',
    subtitle: 'Taipei City / Core Metropolitan District · 敦南文教核心',
    category: 'DISTRICT',
    lat: 25.0264,
    lng: 121.5434,
    zoom: 14,
    pitch: 40,
    keywords: ['台北市大安區', '大安區', '大安', 'daan', 'da\'an'],
  },
  {
    title: '台北市中山區 (Zhongshan District)',
    subtitle: 'Taipei City / Business & Command Hub · 國防部周邊',
    category: 'DISTRICT',
    lat: 25.0685,
    lng: 121.5332,
    zoom: 14,
    pitch: 40,
    keywords: ['台北市中山區', '中山區', '中山', 'zhongshan'],
  },
  {
    title: '台北市中正區 (Zhongzheng District)',
    subtitle: 'Taipei City / Government & Presidential Office · 博愛特區',
    category: 'DISTRICT',
    lat: 25.0324,
    lng: 121.5190,
    zoom: 14.5,
    pitch: 45,
    keywords: ['台北市中正區', '中正區', '中正', '總統府', '博愛特區', 'zhongzheng'],
  },
  {
    title: '台北市內湖區 (Neihu District)',
    subtitle: 'Taipei City / Neihu Technology Park · 內湖科技園區',
    category: 'DISTRICT',
    lat: 25.0835,
    lng: 121.5944,
    zoom: 14,
    pitch: 45,
    keywords: ['台北市內湖區', '內湖區', '內湖', '內科', 'neihu'],
  },
  {
    title: '台北市南港區 (Nangang District)',
    subtitle: 'Taipei City / Software Park & Station · 南港軟體園區',
    category: 'DISTRICT',
    lat: 25.0531,
    lng: 121.6071,
    zoom: 14,
    pitch: 40,
    keywords: ['台北市南港區', '南港區', '南港', '南軟', 'nangang'],
  },
  {
    title: '台北市士林區 (Shilin District)',
    subtitle: 'Taipei City / Tianmu & Foreign Enclave · 天母使館特區',
    category: 'DISTRICT',
    lat: 25.0934,
    lng: 121.5248,
    zoom: 14,
    pitch: 40,
    keywords: ['台北市士林區', '士林區', '士林', '天母', 'shilin'],
  },
  {
    title: '台北市北投區 (Beitou District)',
    subtitle: 'Taipei City / Guandu & Beitou Science Park',
    category: 'DISTRICT',
    lat: 25.1321,
    lng: 121.4986,
    zoom: 13.5,
    pitch: 40,
    keywords: ['台北市北投區', '北投區', '北投', '關渡', 'beitou'],
  },
  {
    title: '台北市松山區 (Songshan District)',
    subtitle: 'Taipei City / Songshan Airport & Financial Boulevard',
    category: 'DISTRICT',
    lat: 25.0599,
    lng: 121.5574,
    zoom: 14,
    pitch: 45,
    keywords: ['台北市松山區', '松山區', '松山', 'songshan'],
  },
  {
    title: '台北市萬華區 (Wanhua District)',
    subtitle: 'Taipei City / Historic Riverfront Sector',
    category: 'DISTRICT',
    lat: 25.0348,
    lng: 121.4998,
    zoom: 14,
    pitch: 40,
    keywords: ['台北市萬華區', '萬華區', '萬華', '西門町', 'wanhua'],
  },

  // ── 桃園市 & 新竹 KEY HUBS ──
  {
    title: '桃園市中壢區 (Zhongli District)',
    subtitle: 'Taoyuan City / High-Speed Rail & High-Tech Core · 青埔特區',
    category: 'DISTRICT',
    lat: 24.9653,
    lng: 121.2248,
    zoom: 13.5,
    pitch: 40,
    keywords: ['桃園市中壢區', '中壢區', '中壢', '青埔', 'zhongli'],
  },
  {
    title: '桃園市大園區 (Dayuan District)',
    subtitle: 'Taoyuan City / Taoyuan International Airport Hub · 航空門戶',
    category: 'DISTRICT',
    lat: 25.0632,
    lng: 121.1969,
    zoom: 13.5,
    pitch: 45,
    keywords: ['桃園市大園區', '大園區', '大園', '桃園機場', 'dayuan'],
  },
  {
    title: '新竹縣竹北市 (Zhubei City)',
    subtitle: 'Hsinchu County / Biomedical Park · 竹北生醫高鐵園區',
    category: 'DISTRICT',
    lat: 24.8387,
    lng: 121.0177,
    zoom: 13.5,
    pitch: 40,
    keywords: ['新竹縣竹北市', '竹北市', '竹北', 'zhubei'],
  },
  {
    title: '經國路 (Jingguo Road)',
    subtitle: 'Taoyuan District / Major Traffic Artery (CCTV Hub)',
    category: 'DISTRICT',
    lat: 25.0180,
    lng: 121.3050,
    zoom: 14.5,
    pitch: 45,
    keywords: ['經國路', 'jingguo road', 'jingguo'],
  },
];

export const STRATEGIC_TARGETS: SearchResult[] = [
  // Strategic Capitals & Theaters
  { title: 'Tokyo', subtitle: 'Japan / East Asia Strategic Command', category: 'CAPITAL', lat: 35.676, lng: 139.65, zoom: 10, pitch: 35, keywords: ['tokyo', '東京', 'japan'] },
  { title: 'Washington D.C.', subtitle: 'United States / Pentagon & White House', category: 'CAPITAL', lat: 38.907, lng: -77.036, zoom: 11, pitch: 35, keywords: ['washington', 'pentagon', 'white house', '華盛頓'] },
  { title: 'Kyiv', subtitle: 'Ukraine / General Staff HQ', category: 'CAPITAL', lat: 50.45, lng: 30.523, zoom: 11, pitch: 40, keywords: ['kyiv', 'kiev', 'ukraine', '基輔'] },
  { title: 'Beijing', subtitle: 'China / Central Military Commission', category: 'CAPITAL', lat: 39.904, lng: 116.407, zoom: 10, pitch: 30, keywords: ['beijing', '北京', 'china'] },
  { title: 'Seoul', subtitle: 'South Korea / Combined Forces Command', category: 'CAPITAL', lat: 37.566, lng: 126.978, zoom: 11, pitch: 35, keywords: ['seoul', '首爾', 'korea'] },
  { title: 'London', subtitle: 'United Kingdom / MOD Whitehall', category: 'CAPITAL', lat: 51.507, lng: -0.127, zoom: 11, pitch: 35, keywords: ['london', '倫敦', 'uk'] },
  { title: 'Tel Aviv', subtitle: 'Israel / Kirya Military Command', category: 'CAPITAL', lat: 32.085, lng: 34.781, zoom: 12, pitch: 40, keywords: ['tel aviv', 'israel', '特拉維夫'] },
  { title: 'Tehran', subtitle: 'Iran / Supreme National Security Council', category: 'CAPITAL', lat: 35.689, lng: 51.389, zoom: 11, pitch: 35, keywords: ['tehran', '德黑蘭', 'iran'] },
  { title: 'Moscow', subtitle: 'Russia / National Defense Management Center', category: 'CAPITAL', lat: 55.755, lng: 37.617, zoom: 10, pitch: 35, keywords: ['moscow', '莫斯科', 'russia'] },
  { title: 'Singapore', subtitle: 'Changi Naval Base / Maritime Nexus', category: 'CAPITAL', lat: 1.352, lng: 103.819, zoom: 12, pitch: 40, keywords: ['singapore', '新加坡', 'changi'] },
  { title: 'Manila', subtitle: 'Philippines / Camp Aguinaldo Armed Forces HQ', category: 'CAPITAL', lat: 14.599, lng: 120.984, zoom: 11, pitch: 35, keywords: ['manila', '馬尼拉', 'philippines'] },

  // Maritime Chokepoints
  { title: 'Taiwan Strait', subtitle: 'Median Line & Maritime Bastion · 台灣海峽', category: 'CHOKEPOINT', lat: 24.0, lng: 119.8, zoom: 7.5, pitch: 45, bearing: 355, keywords: ['taiwan strait', '台灣海峽', '台海'] },
  { title: 'Strait of Malacca', subtitle: 'Key Oil & Container Shipping Lifeline · 馬六甲海峽', category: 'CHOKEPOINT', lat: 2.5, lng: 101.5, zoom: 7.5, pitch: 35, bearing: 315, keywords: ['malacca', '馬六甲'] },
  { title: 'Suez Canal', subtitle: 'Mediterranean - Red Sea Connector · 蘇伊士運河', category: 'CHOKEPOINT', lat: 30.5, lng: 32.35, zoom: 8.5, pitch: 40, bearing: 340, keywords: ['suez', '蘇伊士'] },
  { title: 'Strait of Hormuz', subtitle: 'Persian Gulf Hydrocarbon Gateway · 荷姆茲海峽', category: 'CHOKEPOINT', lat: 26.55, lng: 56.25, zoom: 8.5, pitch: 40, bearing: 320, keywords: ['hormuz', '荷姆茲'] },
  { title: 'Bab el-Mandeb', subtitle: 'Southern Red Sea & Gulf of Aden Chokepoint · 曼德海峽', category: 'CHOKEPOINT', lat: 12.6, lng: 43.35, zoom: 8.5, pitch: 40, bearing: 330, keywords: ['bab el mandeb', '曼德海峽'] },
  { title: 'Bosphorus Strait', subtitle: 'Black Sea - Marmara Gateway (Istanbul) · 博斯普魯斯海峽', category: 'CHOKEPOINT', lat: 41.1, lng: 29.05, zoom: 10, pitch: 45, bearing: 20, keywords: ['bosphorus', '博斯普魯斯'] },
  { title: 'Panama Canal', subtitle: 'Pacific - Atlantic Interoceanic Waterway · 巴拿馬運河', category: 'CHOKEPOINT', lat: 9.1, lng: -79.7, zoom: 9, pitch: 40, bearing: 320, keywords: ['panama', '巴拿馬'] },
  { title: 'Suwalki Gap', subtitle: 'NATO Eastern Flank Corridor (Poland-Lithuania)', category: 'CHOKEPOINT', lat: 54.3, lng: 23.3, zoom: 8, pitch: 35, keywords: ['suwalki', '蘇瓦烏基'] },

  // Airfields
  { title: 'TPE / Taoyuan Airport', subtitle: 'RCTP / Primary Taiwan Civil Hub · 台灣桃園國際機場', category: 'AIRPORT', lat: 25.079, lng: 121.234, zoom: 13, pitch: 45, keywords: ['tpe', 'rctp', 'taoyuan airport', '桃園機場'] },
  { title: 'TSA / Songshan Airport', subtitle: 'RCSS / Taipei Capital Dual-Use Base · 台北松山機場', category: 'AIRPORT', lat: 25.069, lng: 121.552, zoom: 14, pitch: 50, keywords: ['tsa', 'rcss', 'songshan', '松山機場'] },
  { title: 'KHH / Kaohsiung Airport', subtitle: 'RCKH / Southern Taiwan Maritime Gateway · 高雄小港機場', category: 'AIRPORT', lat: 22.571, lng: 120.35, zoom: 13, pitch: 45, keywords: ['khh', 'rckh', 'kaohsiung airport', '小港機場'] },
  { title: 'JFK / New York', subtitle: 'KJFK / Major Transatlantic Terminal', category: 'AIRPORT', lat: 40.641, lng: -73.778, zoom: 12, pitch: 40, keywords: ['jfk', 'kjfk', 'new york airport'] },
  { title: 'HND / Tokyo Haneda', subtitle: 'RJTT / Tokyo Bay Aerospace Terminal · 東京羽田空港', category: 'AIRPORT', lat: 35.549, lng: 139.779, zoom: 13, pitch: 45, keywords: ['hnd', 'rjtt', 'haneda', '羽田'] },
  { title: 'NRT / Tokyo Narita', subtitle: 'RJAA / Tokyo International Airport · 東京成田空港', category: 'AIRPORT', lat: 35.764, lng: 140.392, zoom: 13, pitch: 45, keywords: ['nrt', 'rjaa', 'narita', '成田'] },
  { title: 'LHR / London Heathrow', subtitle: 'EGLL / Western European Gateway · 倫敦希斯洛機場', category: 'AIRPORT', lat: 51.47, lng: -0.454, zoom: 13, pitch: 40, keywords: ['lhr', 'egll', 'heathrow', '希斯洛'] },

  // Space Assets
  { title: 'International Space Station (ISS)', subtitle: 'Orbital Complex / 408 km Low Earth Orbit · 國際太空站', category: 'SPACE', lat: 25.0, lng: 121.0, zoom: 3, pitch: 60, keywords: ['iss', 'space station', '太空站'] },
  { title: 'Tiangong Space Station (CSS)', subtitle: 'Chinese Orbital Space Station / 389 km · 天宮空間站', category: 'SPACE', lat: 30.0, lng: 110.0, zoom: 3, pitch: 60, keywords: ['css', 'tiangong', '天宮'] },
  { title: 'Hubble Space Telescope', subtitle: 'NASA/ESA Astronomical Observatory / 535 km · 哈伯望遠鏡', category: 'SPACE', lat: 0.0, lng: 0.0, zoom: 3, pitch: 60, keywords: ['hubble', '哈伯'] },
];

export class SearchBar {
  private container: HTMLElement;
  private rootEl!: HTMLElement;
  private inputEl!: HTMLInputElement;
  private resultsEl!: HTMLElement;
  private onSelect: (res: SearchResult) => void;
  private onGetFlights?: () => any[];
  private debounceTimer: number | null = null;
  private currentResults: SearchResult[] = [];
  private activeIndex: number = -1;

  constructor(
    parent: HTMLElement,
    onSelect: (res: SearchResult) => void,
    onGetFlights?: () => any[]
  ) {
    this.container = parent;
    this.onSelect = onSelect;
    this.onGetFlights = onGetFlights;
    this.render();
  }

  private render(): void {
    this.rootEl = document.createElement('div');
    this.rootEl.className = 'osiris-search-bar-wrapper';

    this.rootEl.innerHTML = `
      <div class="search-input-box">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2" class="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="global-search-input" 
          placeholder="SEARCH TARGET, FLIGHT (CAL162), CITY OR ADDRESS..." 
          autocomplete="off"
          spellcheck="false"
        />
        <button id="search-clear-btn" class="search-clear-btn" style="display:none;" title="Clear">&times;</button>
      </div>
      <div id="search-dropdown-results" class="search-dropdown-results styled-scrollbar" style="display:none;"></div>
    `;

    this.container.appendChild(this.rootEl);

    this.inputEl = this.rootEl.querySelector('#global-search-input') as HTMLInputElement;
    this.resultsEl = this.rootEl.querySelector('#search-dropdown-results') as HTMLElement;
    const clearBtn = this.rootEl.querySelector('#search-clear-btn') as HTMLButtonElement;

    this.inputEl.addEventListener('input', () => {
      const q = this.inputEl.value.trim();
      clearBtn.style.display = q ? 'block' : 'none';

      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = window.setTimeout(() => {
        this.handleSearch(q);
      }, 150);
    });

    // Handle Keyboard Navigation safely (including macOS/Windows IME protection)
    this.inputEl.addEventListener('keydown', (e: KeyboardEvent) => {
      // If user is currently composing Chinese/Japanese characters in IME, ignore Enter/Arrow keys!
      if (e.isComposing || e.keyCode === 229) {
        return;
      }

      if (e.key === 'Escape') {
        this.closeDropdown();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.currentResults.length > 0) {
          this.activeIndex = (this.activeIndex + 1) % this.currentResults.length;
          this.highlightActiveRow();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.currentResults.length > 0) {
          this.activeIndex = (this.activeIndex - 1 + this.currentResults.length) % this.currentResults.length;
          this.highlightActiveRow();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const targetIdx = this.activeIndex >= 0 ? this.activeIndex : 0;
        if (this.currentResults[targetIdx]) {
          this.selectResult(this.currentResults[targetIdx]);
        }
      }
    });

    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.inputEl.value = '';
      clearBtn.style.display = 'none';
      this.closeDropdown();
      this.inputEl.focus();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!this.rootEl.contains(e.target as Node)) {
        this.closeDropdown();
      }
    });
  }

  private highlightActiveRow(): void {
    const rows = this.resultsEl.querySelectorAll('.search-result-row');
    rows.forEach((row, idx) => {
      if (idx === this.activeIndex) {
        row.classList.add('is-active');
        row.scrollIntoView({ block: 'nearest' });
      } else {
        row.classList.remove('is-active');
      }
    });
  }

  private selectResult(res: SearchResult): void {
    // Replace input value with clean title without emojis or redundant prefixes
    const cleanTitle = res.title.replace(/^✈️\s*/, '').split(' (')[0] || res.title;
    this.inputEl.value = cleanTitle;
    this.closeDropdown();
    this.onSelect(res);
  }

  /**
   * Specificity Scoring Algorithm:
   * Accurately ranks locations by matching granularity so specific districts
   * (e.g. "新北市林口區") ALWAYS rank above generic municipalities ("新北市")!
   */
  private scoreMatch(query: string, item: SearchResult): number {
    const q = query.trim().toLowerCase();
    if (!q) return 0;

    let score = 0;
    const title = item.title.toLowerCase();
    const sub = item.subtitle.toLowerCase();
    const keywords = (item.keywords || []).map((k) => k.toLowerCase());

    // 1. Exact match on title or keywords
    if (title === q || keywords.includes(q)) {
      score += 15000;
    }

    // 2. Keyword exact containment
    for (const kw of keywords) {
      if (kw === q) {
        score += 12000;
      } else if (q.startsWith(kw) || kw.startsWith(q)) {
        score += 6000 + kw.length * 200;
      } else if (q.includes(kw)) {
        score += 4000 + kw.length * 150;
      } else if (kw.includes(q)) {
        score += 3000 + q.length * 100;
      }
    }

    // 3. Specificity bonus: District and CCTV nodes are far more specific than generic Municipality
    if (item.category === 'DISTRICT') {
      score += 3500;
    } else if (item.category === 'CCTV') {
      score += 4500;
    }

    // 4. Subtitle match
    if (sub.includes(q)) {
      score += 500;
    }

    return score;
  }

  private async handleSearch(query: string): Promise<void> {
    if (!query) {
      this.closeDropdown();
      return;
    }

    const qLower = query.toLowerCase();
    const results: SearchResult[] = [];

    // 1. Direct Coordinates Jump (e.g. "25.04, 121.50" or "25.04 121.50")
    const coordMatch = query.match(/^([+-]?\d+(?:\.\d+)?)[,\s]+([+-]?\d+(?:\.\d+)?)$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        results.push({
          title: `Coordinate Target (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`,
          subtitle: 'Direct Geodetic Telemetry Jump · 坐標精確直飛',
          category: 'COORDS',
          lat,
          lng,
          zoom: 13,
          pitch: 45,
        });
      }
    }

    // 2. Real-Time Flight Search (e.g. "CAL162", "EVA", "UAL966", "TVF")
    if (this.onGetFlights) {
      try {
        const allFlights = this.onGetFlights() || [];
        const flightMatches = allFlights
          .filter((f) => {
            const cs = String(f.callsign || '').toLowerCase();
            const icao = String(f.icao24 || '').toLowerCase();
            const op = String(f.operator || '').toLowerCase();
            const mdl = String(f.model || '').toLowerCase();
            return cs.includes(qLower) || icao.includes(qLower) || op.includes(qLower) || mdl.includes(qLower);
          })
          .slice(0, 4);

        for (const fl of flightMatches) {
          const lat = Number(fl.lat);
          const lng = Number(fl.lng);
          if (!isNaN(lat) && !isNaN(lng)) {
            const altM = Math.round(Number(fl.alt) || 0);
            const altFt = Math.round(altM * 3.28084);
            const spdKts = Math.round(Number(fl.speed_knots) || 0);
            const callsign = String(fl.callsign || fl.icao24 || 'FLIGHT').toUpperCase();

            results.push({
              title: `✈️ ${callsign} (${fl.model || 'AIRCRAFT'})`,
              subtitle: `Active Airborne ADS-B // ${altFt.toLocaleString()} FT · ${spdKts} KTS · ${fl.operator || 'RADAR'}`,
              category: 'FLIGHT',
              lat,
              lng,
              zoom: 9.5,
              pitch: 48,
              bearing: Number(fl.heading) || 0,
              flightData: fl,
            });
          }
        }
      } catch (e) {
        console.warn('[SearchBar] Flight match error:', e);
      }
    }

    // 2.5 Real-Time CCTV Live Surveillance Nodes (e.g. "林口", "台北", "東京", "加州", "CCTV", "101", "交流道")
    const cctvMatches = CCTV_PRESETS.filter((cam) => {
      const n = cam.name.toLowerCase();
      const c = cam.city.toLowerCase();
      const co = cam.country.toLowerCase();
      const cat = cam.category.toLowerCase();
      const id = cam.id.toLowerCase();
      return (
        n.includes(qLower) ||
        c.includes(qLower) ||
        co.includes(qLower) ||
        id.includes(qLower) ||
        (qLower === 'cctv' || qLower === 'cam' || qLower === '即時影像' || qLower === '監視器' || qLower === '攝影機')
      );
    }).slice(0, 6);

    for (const cam of cctvMatches) {
      const isHls = cam.stream_type === 'hls' || Boolean(cam.stream_url && cam.stream_url.includes('.m3u8'));
      const isLive = isHls || Boolean(cam.videoId);
      results.push({
        title: `📹 ${cam.name}`,
        subtitle: `${cam.city}, ${cam.country} // ${isLive ? '🔴 60FPS LIVE STREAM' : '⏱️ 2.5S REAL-TIME SNAPSHOT'} · ${cam.source || 'CCTV'}`,
        category: 'CCTV',
        lat: cam.lat,
        lng: cam.lon,
        zoom: 15.5,
        pitch: 45,
        keywords: [cam.name, cam.city, cam.country, 'cctv', 'cam', '即時影像'],
        cctvData: cam,
      });
    }

    // 3. Taiwan Cities, Counties, and 29 Districts with Specificity Scoring
    const scoredTaiwan = TAIWAN_LOCATIONS.map((loc) => ({
      item: loc,
      score: this.scoreMatch(query, loc),
    }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);

    results.push(...scoredTaiwan);

    // 4. Strategic Targets & World Capitals
    const scoredTargets = STRATEGIC_TARGETS.map((target) => ({
      item: target,
      score: this.scoreMatch(query, target),
    }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);

    results.push(...scoredTargets);

    // 5. OpenStreetMap Nominatim Live Geocoding Fallback
    // If local results are few or user searched for specific street/building, query OSM Nominatim
    if (results.length < 5 && query.length >= 2) {
      try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
        const res = await fetch(nominatimUrl, {
          headers: { 'Accept-Language': 'zh-TW,zh,en' },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            for (const item of data) {
              const lat = parseFloat(item.lat);
              const lng = parseFloat(item.lon);
              if (!isNaN(lat) && !isNaN(lng)) {
                let zoom = 14;
                if (['house', 'building', 'address', 'shop', 'amenity'].includes(item.type)) zoom = 16.5;
                else if (['road', 'street', 'highway'].includes(item.type)) zoom = 15;
                else if (['neighbourhood', 'suburb'].includes(item.type)) zoom = 14;
                else if (['city', 'town', 'village'].includes(item.type)) zoom = 12.5;
                else if (['county', 'state'].includes(item.type)) zoom = 10;
                else if (['country'].includes(item.type)) zoom = 5.5;

                const isDup = results.some((r) => Math.abs(r.lat - lat) < 0.005 && Math.abs(r.lng - lng) < 0.005);
                if (!isDup) {
                  const parts = (item.display_name || '').split(',').map((s: string) => s.trim());
                  const primary = parts.slice(0, 2).join(', ');
                  const secondary = parts.slice(2, 5).join(', ');
                  results.push({
                    title: primary || item.name || query,
                    subtitle: secondary || `OSM Geocode [${item.type}] · 全球地理定址`,
                    category: 'GEOCODE',
                    lat,
                    lng,
                    zoom,
                    pitch: 40,
                  });
                }
              }
            }
          }
        }
      } catch (e) {
        console.warn('[SearchBar] Nominatim geocode fallback error:', e);
      }
    }

    this.currentResults = results.slice(0, 10);
    this.activeIndex = -1;
    this.renderDropdown(this.currentResults);
  }

  private renderDropdown(results: SearchResult[]): void {
    if (results.length === 0) {
      this.resultsEl.innerHTML = `
        <div class="search-empty-state">No matching strategic targets, flights, or locations found</div>
      `;
      this.resultsEl.style.display = 'block';
      return;
    }

    this.resultsEl.innerHTML = results
      .map(
        (r, idx) => `
      <div class="search-result-row" data-idx="${idx}">
        <span class="search-cat-badge badge-${r.category.toLowerCase()}">${r.category}</span>
        <div class="search-res-text">
          <div class="search-res-title">${r.title}</div>
          <div class="search-res-sub">${r.subtitle}</div>
        </div>
        <span class="search-go-arrow">↗</span>
      </div>
    `
      )
      .join('');

    this.resultsEl.style.display = 'block';

    const rows = this.resultsEl.querySelectorAll('.search-result-row');
    rows.forEach((row) => {
      row.addEventListener('click', (e) => {
        const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-idx') || '0', 10);
        const selected = results[idx];
        if (selected) {
          this.selectResult(selected);
        }
      });
    });
  }

  public closeDropdown(): void {
    this.resultsEl.style.display = 'none';
    this.activeIndex = -1;
  }
}
