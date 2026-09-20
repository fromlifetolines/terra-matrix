/**
 * src/components/RadioPlayerWidget.ts
 *
 * Tactical Global Radio Station Tuner & Live Audio Player
 * (inspired by bilawalsidhu/gods-eye-view radio feature).
 *
 * Features:
 * - Real-time worldwide audio streaming (MP3, AAC, and HLS .m3u8)
 * - Analog tuning static sound synthesis (tuningNoise)
 * - Dynamic 24-band LED audio spectrum visualizer
 * - Frequency dial (88.0 ~ 108.0 MHz FM scale)
 * - 7 tactical category filters (News, Transit, Safety, Air/Sea, Music, Talk, Weather)
 * - Full tactical HUD and collapsible mini docked mode
 */

import { type RadioStation, RADIO_CATEGORY_CONFIG, type RadioCategory } from '../globe/layers/RadioLayer';
import { tuningNoise } from '../utils/tuningNoise';
import Hls from 'hls.js';

export class RadioPlayerWidget {
  private container: HTMLElement;
  private miniPill: HTMLElement;
  private audio: HTMLAudioElement | null = null;
  private hls: Hls | null = null;

  private allStations: RadioStation[] = [];
  private currentStation: RadioStation | null = null;
  private isPlaying = false;
  private audioState: 'idle' | 'tuning' | 'connecting' | 'playing' | 'error' = 'idle';
  private userVolume = 0.8;
  private isMuted = false;

  private currentCategory: string = 'all';
  private searchQuery: string = '';
  private isMinimized = false;
  private isVisible = false;

  private visualizerInterval: number | null = null;
  public onStationSelected?: (station: RadioStation) => void;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'terra-radio-widget';
    this.container.className = 'tactical-radio-panel';
    this.container.style.display = 'none';

    this.miniPill = document.createElement('div');
    this.miniPill.id = 'terra-radio-mini-pill';
    this.miniPill.className = 'tactical-radio-pill';
    this.miniPill.style.display = 'none';

    document.body.appendChild(this.container);
    document.body.appendChild(this.miniPill);

    this.initAudio();
    this.render();
    this.renderMiniPill();
  }

  private initAudio(): void {
    if (this.audio) return;
    this.audio = new Audio();
    this.audio.preload = 'none';
    this.audio.volume = this.userVolume;

    this.audio.addEventListener('playing', () => {
      this.audioState = 'playing';
      this.isPlaying = true;
      this.startVisualizer();
      this.updateStatus();
    });

    this.audio.addEventListener('waiting', () => {
      this.audioState = 'connecting';
      this.updateStatus();
    });

    this.audio.addEventListener('pause', () => {
      if (this.audioState !== 'error') {
        this.audioState = 'idle';
      }
      this.isPlaying = false;
      this.stopVisualizer();
      this.updateStatus();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('[RadioPlayer] Audio playback error:', e);
      this.audioState = 'error';
      this.isPlaying = false;
      this.stopVisualizer();
      this.updateStatus();
    });
  }

  public setStations(stations: RadioStation[]): void {
    this.allStations = stations;
    if (!this.currentStation && stations.length > 0) {
      // Default to Taiwan PBS or first station
      const tw = stations.find((s) => s.countryCode === 'TW') || stations[0];
      this.currentStation = tw;
    }
    this.renderStationList();
    this.updateStationCard();
  }

  public open(station?: RadioStation): void {
    this.isVisible = true;
    this.container.style.display = 'flex';
    this.miniPill.style.display = 'none';
    this.isMinimized = false;

    if (station) {
      this.tuneToStation(station);
    } else if (this.currentStation) {
      this.updateStationCard();
    }
  }

  public close(): void {
    this.isVisible = false;
    this.container.style.display = 'none';
    if (this.isPlaying) {
      this.miniPill.style.display = 'flex';
    } else {
      this.miniPill.style.display = 'none';
    }
  }

  public toggle(): void {
    if (this.isVisible) {
      this.close();
    } else {
      this.open();
    }
  }

  public tuneToStation(station: RadioStation): void {
    this.currentStation = station;
    this.audioState = 'tuning';
    this.updateStatus();
    this.updateStationCard();
    this.renderStationList();

    // 1. Play authentic analog radio tuning static
    tuningNoise.playTuningHiss(0.35, 0.08);

    // 2. Clear existing audio / HLS
    this.stopAudio();

    // 3. Connect to live stream
    const isHls =
      station.streamUrl.includes('.m3u8') ||
      station.codec === 'HLS' ||
      station.streamUrl.includes('/chunklist') ||
      station.streamUrl.includes('/playlist');

    if (isHls && Hls.isSupported()) {
      this.hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      this.hls.loadSource(station.streamUrl);
      if (this.audio) {
        this.hls.attachMedia(this.audio);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.audio?.play().catch((err) => {
            console.warn('[RadioPlayer] Autoplay prevented:', err);
            this.audioState = 'idle';
            this.updateStatus();
          });
        });
        this.hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            this.audioState = 'error';
            this.updateStatus();
          }
        });
      }
    } else if (this.audio) {
      this.audio.src = station.streamUrl;
      this.audio.load();
      this.audio.play().catch((err) => {
        console.warn('[RadioPlayer] Autoplay prevented:', err);
        this.audioState = 'idle';
        this.updateStatus();
      });
    }

    this.onStationSelected?.(station);
    this.renderMiniPill();
  }

  private stopAudio(): void {
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.removeAttribute('src');
      this.audio.load();
    }
    this.isPlaying = false;
    this.stopVisualizer();
  }

  public togglePlay(): void {
    if (!this.currentStation) {
      if (this.allStations.length > 0) {
        this.tuneToStation(this.allStations[0]);
      }
      return;
    }

    if (this.isPlaying) {
      this.audio?.pause();
      this.isPlaying = false;
      this.audioState = 'idle';
      this.stopVisualizer();
    } else {
      if (!this.audio?.src && this.currentStation) {
        this.tuneToStation(this.currentStation);
      } else {
        this.audio?.play().catch(() => {});
      }
    }
    this.updateStatus();
    this.renderMiniPill();
  }

  public nextStation(): void {
    const list = this.getFilteredStations();
    if (list.length === 0) return;
    const currentIndex = this.currentStation
      ? list.findIndex((s) => s.id === this.currentStation?.id)
      : -1;
    const nextIndex = (currentIndex + 1) % list.length;
    this.tuneToStation(list[nextIndex]);
  }

  public prevStation(): void {
    const list = this.getFilteredStations();
    if (list.length === 0) return;
    const currentIndex = this.currentStation
      ? list.findIndex((s) => s.id === this.currentStation?.id)
      : -1;
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    this.tuneToStation(list[prevIndex]);
  }

  public randomScan(): void {
    const list = this.getFilteredStations();
    if (list.length === 0) return;
    const randomIndex = Math.floor(Math.random() * list.length);
    this.tuneToStation(list[randomIndex]);
  }

  private getFilteredStations(): RadioStation[] {
    let list = this.allStations;
    if (this.currentCategory !== 'all') {
      list = list.filter((s) => s.category === this.currentCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      const isTwQuery = q === '台灣' || q === '台湾' || q === 'tw' || q === 'taiwan';
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          (s.countryCode && s.countryCode.toLowerCase().includes(q)) ||
          (s.state && s.state.toLowerCase().includes(q)) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          (isTwQuery && (s.countryCode === 'TW' || s.country.toLowerCase().includes('taiwan')))
      );
    }
    return list;
  }

  private startVisualizer(): void {
    if (this.visualizerInterval) return;
    const bars = this.container.querySelectorAll<HTMLElement>('.spectrum-bar');
    if (bars.length === 0) return;

    this.visualizerInterval = window.setInterval(() => {
      bars.forEach((bar, idx) => {
        if (!this.isPlaying) {
          bar.style.height = '15%';
          return;
        }
        // Realistic simulated audio equalizer waves
        const wave =
          Math.sin(Date.now() * 0.008 + idx * 0.4) * 0.35 +
          Math.sin(Date.now() * 0.015 - idx * 0.2) * 0.25 +
          0.4;
        const heightPct = Math.max(10, Math.min(100, Math.round(wave * 90)));
        bar.style.height = `${heightPct}%`;
      });
    }, 60);
  }

  private stopVisualizer(): void {
    if (this.visualizerInterval) {
      clearInterval(this.visualizerInterval);
      this.visualizerInterval = null;
    }
    const bars = this.container.querySelectorAll<HTMLElement>('.spectrum-bar');
    bars.forEach((b) => (b.style.height = '15%'));
  }

  private updateStatus(): void {
    const badge = this.container.querySelector<HTMLElement>('#radio-status-badge');
    const playBtn = this.container.querySelector<HTMLElement>('#radio-btn-play');

    if (playBtn) {
      playBtn.innerHTML = this.isPlaying ? '⏸ PAUSE' : '▶ PLAY';
      if (this.isPlaying) {
        playBtn.classList.add('active');
      } else {
        playBtn.classList.remove('active');
      }
    }

    if (badge) {
      if (this.audioState === 'tuning') {
        badge.textContent = 'TUNING FREQUENCY...';
        badge.className = 'radio-badge tuning';
      } else if (this.audioState === 'connecting') {
        badge.textContent = 'BUFFERING STREAM...';
        badge.className = 'radio-badge buffering';
      } else if (this.audioState === 'playing') {
        badge.textContent = '🔴 LIVE BROADCAST';
        badge.className = 'radio-badge live';
      } else if (this.audioState === 'error') {
        badge.textContent = 'STREAM OFFLINE';
        badge.className = 'radio-badge offline';
      } else {
        badge.textContent = 'STANDBY';
        badge.className = 'radio-badge standby';
      }
    }

    this.renderMiniPill();
  }

  private updateStationCard(): void {
    const s = this.currentStation;
    if (!s) return;

    const nameEl = this.container.querySelector<HTMLElement>('#radio-current-name');
    const countryEl = this.container.querySelector<HTMLElement>('#radio-current-country');
    const catEl = this.container.querySelector<HTMLElement>('#radio-current-cat');
    const techEl = this.container.querySelector<HTMLElement>('#radio-current-tech');

    const catConf = RADIO_CATEGORY_CONFIG[s.category] || RADIO_CATEGORY_CONFIG.music;

    if (nameEl) nameEl.textContent = s.name;
    if (countryEl) countryEl.textContent = `${s.countryCode ? `[${s.countryCode}] ` : ''}${s.country.toUpperCase()}`;
    if (catEl) {
      catEl.textContent = `${catConf.icon} ${catConf.label}`;
      catEl.style.color = catConf.color;
      catEl.style.backgroundColor = catConf.bg;
      catEl.style.borderColor = catConf.color;
    }
    if (techEl) {
      techEl.textContent = `${s.bitrate || 128} KBPS // ${s.codec || 'MP3'} // LIVE STEREO`;
    }

    // Update dial needle (simulated frequency mapping)
    const dialNeedle = this.container.querySelector<HTMLElement>('#radio-dial-needle');
    if (dialNeedle) {
      const hash = s.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const pct = (hash % 85) + 8; // 8% to 93%
      dialNeedle.style.left = `${pct}%`;
    }
  }

  private renderStationList(): void {
    const listEl = this.container.querySelector<HTMLElement>('#radio-stations-list');
    if (!listEl) return;

    const filtered = this.getFilteredStations();
    listEl.innerHTML = '';

    const countEl = this.container.querySelector<HTMLElement>('#radio-station-count');
    if (countEl) countEl.textContent = `${filtered.length} STATIONS`;

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="radio-empty-state">NO STATIONS FOUND MATCHING FILTER</div>`;
      return;
    }

    filtered.slice(0, 500).forEach((s) => {
      const isCurrent = this.currentStation?.id === s.id;
      const catConf = RADIO_CATEGORY_CONFIG[s.category] || RADIO_CATEGORY_CONFIG.music;

      const item = document.createElement('div');
      item.className = `radio-station-item ${isCurrent ? 'active' : ''}`;
      item.innerHTML = `
        <div class="radio-item-main">
          <div class="radio-item-name">${s.name}</div>
          <div class="radio-item-meta">
            <span class="radio-item-country">${s.countryCode ? `[${s.countryCode}] ` : ''}${s.state ? `${s.state} · ` : ''}${s.country}</span>
            <span class="radio-item-tag" style="color:${catConf.color};">${catConf.label}</span>
          </div>
        </div>
        <div class="radio-item-tech">${s.bitrate || 128}k</div>
      `;

      item.addEventListener('click', () => {
        this.tuneToStation(s);
      });

      listEl.appendChild(item);
    });
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="radio-panel-header">
        <div class="radio-header-title">
          <span class="radio-title-icon">📻</span>
          <span class="radio-title-text">TERRA RADIO // GLOBAL SIGINT INTERCEPT</span>
        </div>
        <div class="radio-header-actions">
          <button id="radio-btn-minimize" class="radio-icon-btn" title="Minimize to Docked Pill">_</button>
          <button id="radio-btn-close" class="radio-icon-btn" title="Close Panel">✕</button>
        </div>
      </div>

      <!-- Current Tuned Station Card -->
      <div class="radio-hero-card">
        <div class="radio-hero-top">
          <div id="radio-current-country" class="radio-country-tag">GLOBAL BROADCAST</div>
          <div id="radio-status-badge" class="radio-badge standby">STANDBY</div>
        </div>
        <div id="radio-current-name" class="radio-station-title">SELECT A BROADCAST FREQUENCY</div>
        <div class="radio-hero-details">
          <span id="radio-current-cat" class="radio-cat-badge">📡 INTERCEPT</span>
          <span id="radio-current-tech" class="radio-tech-badge">128 KBPS // MP3 // LIVE STEREO</span>
        </div>

        <!-- Dynamic Analog Frequency Dial -->
        <div class="radio-analog-dial" id="radio-analog-dial">
          <div class="dial-scale">
            <span>88.0</span>
            <span>92.0</span>
            <span>96.0</span>
            <span>100.0</span>
            <span>104.0</span>
            <span>108.0</span>
          </div>
          <div class="dial-marks">
            ${Array.from({ length: 30 }).map(() => '<div class="dial-tick"></div>').join('')}
          </div>
          <div id="radio-dial-needle" class="dial-needle" style="left: 35%;"></div>
        </div>

        <!-- LED Audio Equalizer Visualizer -->
        <div class="radio-spectrum-container">
          ${Array.from({ length: 24 })
            .map(() => '<div class="spectrum-bar" style="height: 15%;"></div>')
            .join('')}
        </div>

        <!-- Primary Transport Controls -->
        <div class="radio-transport-bar">
          <button id="radio-btn-prev" class="radio-ctrl-btn" title="Previous Station">⏮ PREV</button>
          <button id="radio-btn-play" class="radio-ctrl-btn primary" title="Play / Pause">▶ PLAY</button>
          <button id="radio-btn-next" class="radio-ctrl-btn" title="Next Station">⏭ NEXT</button>
          <button id="radio-btn-scan" class="radio-ctrl-btn" title="Random Frequency Scan">🎲 SCAN</button>
          
          <div class="radio-volume-group">
            <span id="radio-mute-icon" class="volume-icon" title="Mute / Unmute">🔊</span>
            <input type="range" id="radio-volume-slider" min="0" max="1" step="0.05" value="0.8" class="radio-volume-slider" title="Volume Control" />
          </div>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="radio-filter-tabs">
        <button class="radio-filter-tab active" data-cat="all">ALL</button>
        <button class="radio-filter-tab" data-cat="news">NEWS</button>
        <button class="radio-filter-tab" data-cat="traffic-transit">TRANSIT</button>
        <button class="radio-filter-tab" data-cat="public-safety">SAFETY</button>
        <button class="radio-filter-tab" data-cat="aviation-marine">AIR / SEA</button>
        <button class="radio-filter-tab" data-cat="music">MUSIC</button>
        <button class="radio-filter-tab" data-cat="talk">TALK</button>
        <button class="radio-filter-tab" data-cat="weather">WEATHER</button>
      </div>

      <!-- Station Directory & Search -->
      <div class="radio-directory-bar">
        <input type="text" id="radio-search-input" class="radio-search-input" placeholder="Search station, city, callsign, or country..." />
        <span id="radio-station-count" class="radio-count-badge">848 STATIONS</span>
      </div>

      <div id="radio-stations-list" class="radio-stations-list">
        <!-- Rendered dynamically -->
      </div>
    `;

    // Bind event listeners
    this.container.querySelector('#radio-btn-close')?.addEventListener('click', () => {
      this.close();
    });

    this.container.querySelector('#radio-btn-minimize')?.addEventListener('click', () => {
      this.minimize();
    });

    this.container.querySelector('#radio-btn-play')?.addEventListener('click', () => {
      this.togglePlay();
    });

    this.container.querySelector('#radio-btn-next')?.addEventListener('click', () => {
      this.nextStation();
    });

    this.container.querySelector('#radio-btn-prev')?.addEventListener('click', () => {
      this.prevStation();
    });

    this.container.querySelector('#radio-btn-scan')?.addEventListener('click', () => {
      this.randomScan();
    });

    const volSlider = this.container.querySelector<HTMLInputElement>('#radio-volume-slider');
    volSlider?.addEventListener('input', (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      this.userVolume = val;
      if (this.audio) {
        this.audio.volume = val;
      }
      this.isMuted = val === 0;
    });

    const muteIcon = this.container.querySelector('#radio-mute-icon');
    muteIcon?.addEventListener('click', () => {
      this.isMuted = !this.isMuted;
      if (this.audio) {
        this.audio.muted = this.isMuted;
      }
      if (muteIcon) {
        muteIcon.textContent = this.isMuted ? '🔇' : '🔊';
      }
    });

    // Category Tabs
    const tabs = this.container.querySelectorAll<HTMLElement>('.radio-filter-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentCategory = tab.dataset.cat || 'all';
        this.renderStationList();
      });
    });

    // Search Input
    const searchInput = this.container.querySelector<HTMLInputElement>('#radio-search-input');
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value;
      this.renderStationList();
    });
  }

  private minimize(): void {
    this.isMinimized = true;
    this.container.style.display = 'none';
    this.miniPill.style.display = 'flex';
    this.renderMiniPill();
  }

  private renderMiniPill(): void {
    const s = this.currentStation;
    if (!s) {
      this.miniPill.innerHTML = `
        <span class="pill-dot"></span>
        <span class="pill-title">RADIO STANDBY</span>
        <button id="pill-btn-expand" class="pill-btn">EXPAND ⛶</button>
      `;
    } else {
      this.miniPill.innerHTML = `
        <span class="pill-dot ${this.isPlaying ? 'live' : ''}"></span>
        <span class="pill-title">📻 ${s.name}</span>
        <button id="pill-btn-toggle" class="pill-btn">${this.isPlaying ? '⏸' : '▶'}</button>
        <button id="pill-btn-expand" class="pill-btn">EXPAND ⛶</button>
      `;
    }

    this.miniPill.querySelector('#pill-btn-toggle')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePlay();
    });

    this.miniPill.querySelector('#pill-btn-expand')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.open();
    });

    this.miniPill.addEventListener('click', () => {
      this.open();
    });
  }
}
