/**
 * src/globe/layers/RadioLayer.ts
 *
 * Global Radio Station Layer for Terra Matrix (inspired by bilawalsidhu/gods-eye-view).
 * Handles station metadata, category styling, and GeoJSON management.
 */

export type RadioCategory =
  | 'news'
  | 'talk'
  | 'weather'
  | 'public-safety'
  | 'aviation-marine'
  | 'traffic-transit'
  | 'music';

export interface RadioStation {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  state?: string;
  lat: number;
  lon: number;
  streamUrl: string;
  homepage?: string | null;
  favicon?: string | null;
  category: RadioCategory;
  tags: string[];
  codec: string;
  bitrate: number;
  votes?: number;
  clickcount?: number;
}

export const RADIO_CATEGORY_CONFIG: Record<
  RadioCategory,
  { label: string; color: string; bg: string; icon: string }
> = {
  news: {
    label: 'NEWS',
    color: '#44adff',
    bg: 'rgba(68, 173, 255, 0.15)',
    icon: '📰',
  },
  'traffic-transit': {
    label: 'TRANSIT',
    color: '#ffd166',
    bg: 'rgba(255, 209, 102, 0.15)',
    icon: '🚗',
  },
  'public-safety': {
    label: 'SAFETY',
    color: '#ff8b4a',
    bg: 'rgba(255, 139, 74, 0.15)',
    icon: '🚨',
  },
  'aviation-marine': {
    label: 'AIR / SEA',
    color: '#a87cff',
    bg: 'rgba(168, 124, 255, 0.15)',
    icon: '✈️',
  },
  weather: {
    label: 'WEATHER',
    color: '#ff5c78',
    bg: 'rgba(255, 92, 120, 0.15)',
    icon: '⛈️',
  },
  talk: {
    label: 'TALK',
    color: '#f2b84b',
    bg: 'rgba(242, 184, 75, 0.15)',
    icon: '🎙️',
  },
  music: {
    label: 'MUSIC',
    color: '#54d17a',
    bg: 'rgba(84, 209, 122, 0.15)',
    icon: '🎵',
  },
};

export class RadioTracker {
  private stations: RadioStation[] = [];
  private isLoaded = false;

  constructor() {}

  public async loadStations(): Promise<RadioStation[]> {
    if (this.isLoaded && this.stations.length > 0) {
      return this.stations;
    }

    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const res = await fetch(`${baseUrl}data/radio-stations.json?_t=${Date.now()}`);
      if (res.ok) {
        this.stations = await res.json();
        this.isLoaded = true;
        return this.stations;
      }
    } catch (e) {
      console.warn('[RadioTracker] Failed to load radio-stations.json:', e);
    }
    return [];
  }

  public getStations(): RadioStation[] {
    return this.stations;
  }

  public getStationById(id: string): RadioStation | undefined {
    return this.stations.find((s) => s.id === id);
  }

  public filterStations(category?: RadioCategory | 'all', query?: string): RadioStation[] {
    let result = this.stations;

    if (category && category !== 'all') {
      result = result.filter((s) => s.category === category);
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      const isTwQuery = q === '台灣' || q === '台湾' || q === 'tw' || q === 'taiwan';
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          (s.countryCode && s.countryCode.toLowerCase().includes(q)) ||
          (s.state && s.state.toLowerCase().includes(q)) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          (isTwQuery && (s.countryCode === 'TW' || s.country.toLowerCase().includes('taiwan')))
      );
    }

    return result;
  }
}
