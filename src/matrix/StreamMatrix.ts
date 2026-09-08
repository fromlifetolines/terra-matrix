import { DEFAULT_MATRIX_CHANNELS, CCTV_PRESETS, type CCTVPoint } from '../data/cctv-presets';

export type MatrixGridLayout = '1x2' | '2x2' | '2x4' | '3x3';

export interface MatrixChannel {
  id: string;
  name: string;
  videoId: string;
  city?: string;
  country?: string;
}

const STORAGE_CHANNELS_KEY = 'terra_matrix_channels_v1';
const STORAGE_LAYOUT_KEY = 'terra_matrix_layout_v1';

export class StreamMatrix {
  private container: HTMLElement;
  private channels: MatrixChannel[] = [];
  private currentLayout: MatrixGridLayout = '2x2';
  private soloChannelId: string | null = null;
  private fullscreenTileId: string | null = null;

  public onChannelFocus?: (channel: MatrixChannel) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.loadState();
    this.render();
  }

  private loadState(): void {
    try {
      const savedChannels = localStorage.getItem(STORAGE_CHANNELS_KEY);
      if (savedChannels) {
        this.channels = JSON.parse(savedChannels);
      } else {
        this.channels = DEFAULT_MATRIX_CHANNELS.map((c) => ({
          id: c.id,
          name: c.name,
          videoId: c.videoId,
          city: c.city,
          country: c.country,
        }));
      }

      const savedLayout = localStorage.getItem(STORAGE_LAYOUT_KEY);
      if (savedLayout && ['1x2', '2x2', '2x4', '3x3'].includes(savedLayout)) {
        this.currentLayout = savedLayout as MatrixGridLayout;
      }
    } catch (e) {
      console.warn('[StreamMatrix] Failed to load localStorage state:', e);
    }
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_CHANNELS_KEY, JSON.stringify(this.channels));
      localStorage.setItem(STORAGE_LAYOUT_KEY, this.currentLayout);
    } catch (e) {
      console.warn('[StreamMatrix] Failed to save state:', e);
    }
  }

  public setLayout(layout: MatrixGridLayout): void {
    this.currentLayout = layout;
    this.saveState();
    this.render();
  }

  public addChannel(channel: MatrixChannel): void {
    // Avoid exact duplicate ID
    const exists = this.channels.some((c) => c.videoId === channel.videoId);
    if (!exists) {
      this.channels.push(channel);
      this.saveState();
      this.render();
    }
  }

  public removeChannel(id: string): void {
    this.channels = this.channels.filter((c) => c.id !== id);
    if (this.soloChannelId === id) this.soloChannelId = null;
    if (this.fullscreenTileId === id) this.fullscreenTileId = null;
    this.saveState();
    this.render();
  }

  public toggleSoloAudio(channelId: string): void {
    if (this.soloChannelId === channelId) {
      // Mute all
      this.soloChannelId = null;
      this.muteAllIframes();
    } else {
      this.soloChannelId = channelId;
      // Unmute target, mute others
      this.channels.forEach((c) => {
        const iframe = document.getElementById(`iframe-${c.id}`) as HTMLIFrameElement | null;
        if (!iframe || !iframe.contentWindow) return;

        if (c.id === channelId) {
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'unMute', args: '' }),
            '*'
          );
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
            '*'
          );
        } else {
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'mute', args: '' }),
            '*'
          );
        }
      });
    }
    this.updateAudioButtonsUI();
  }

  private muteAllIframes(): void {
    this.channels.forEach((c) => {
      const iframe = document.getElementById(`iframe-${c.id}`) as HTMLIFrameElement | null;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'mute', args: '' }),
          '*'
        );
      }
    });
  }

  private updateAudioButtonsUI(): void {
    this.channels.forEach((c) => {
      const btn = document.getElementById(`solo-btn-${c.id}`);
      if (btn) {
        const isSolo = this.soloChannelId === c.id;
        btn.classList.toggle('active-solo', isSolo);
        btn.title = isSolo ? 'Audio: SOLO (Active)' : 'Audio: Muted (Click for Solo)';
        btn.innerHTML = isSolo
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      }
    });
  }

  public toggleTileFullscreen(channelId: string): void {
    if (this.fullscreenTileId === channelId) {
      this.fullscreenTileId = null;
    } else {
      this.fullscreenTileId = channelId;
    }
    this.render();
  }

  public parseInputToVideoId(input: string): string | null {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Direct 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    // URL parser
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      if (url.hostname.includes('youtube.com')) {
        const v = url.searchParams.get('v');
        if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts[0] === 'live' && parts[1]) return parts[1];
      } else if (url.hostname.includes('youtu.be')) {
        const id = url.pathname.slice(1);
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    } catch {
      // Ignore URL parsing error
    }

    return null;
  }

  public render(): void {
    const activeChannels = this.getActiveChannelsForLayout();

    this.container.innerHTML = `
      <div class="matrix-root ${this.fullscreenTileId ? 'has-fullscreen' : ''}">
        <!-- Matrix Top Bar -->
        <div class="matrix-header">
          <div class="matrix-title-group">
            <span class="matrix-badge">SWISS GRID</span>
            <span class="matrix-label">LIVE STREAM MATRIX</span>
            <span class="matrix-count">[${this.channels.length} FEEDS]</span>
          </div>

          <!-- Quick Add Input -->
          <div class="matrix-quick-add">
            <input 
              type="text" 
              id="matrix-add-input" 
              class="matrix-input" 
              placeholder="YouTube URL or Video ID..." 
            />
            <button id="matrix-add-btn" class="matrix-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              ADD
            </button>
            <select id="matrix-preset-select" class="matrix-select" title="Preset Feeds">
              <option value="" disabled selected>Quick Add Preset...</option>
              ${CCTV_PRESETS.map((p) => `<option value="${p.id}">${p.name}</option>`).join('')}
            </select>
          </div>

          <!-- Grid Layout Buttons -->
          <div class="matrix-layout-presets">
            <button class="layout-btn ${this.currentLayout === '1x2' ? 'active' : ''}" data-layout="1x2">1×2</button>
            <button class="layout-btn ${this.currentLayout === '2x2' ? 'active' : ''}" data-layout="2x2">2×2</button>
            <button class="layout-btn ${this.currentLayout === '2x4' ? 'active' : ''}" data-layout="2x4">2×4</button>
            <button class="layout-btn ${this.currentLayout === '3x3' ? 'active' : ''}" data-layout="3x3">3×3</button>
          </div>
        </div>

        <!-- Matrix Video Grid -->
        <div class="matrix-grid grid-${this.currentLayout} ${this.fullscreenTileId ? 'has-fullscreen-tile' : ''}">
          ${
            activeChannels.length === 0
              ? `<div class="matrix-empty">No active streams. Add a YouTube stream ID or select a preset above.</div>`
              : activeChannels
                  .map((ch) => {
                    const isFullscreen = this.fullscreenTileId === ch.id;
                    const isSolo = this.soloChannelId === ch.id;
                    return `
              <div class="matrix-tile ${isFullscreen ? 'tile-fullscreen' : ''}" id="tile-${ch.id}">
                <div class="tile-bar">
                  <div class="tile-meta">
                    <span class="tile-live-indicator"><span class="dot"></span>LIVE</span>
                    <span class="tile-name" title="${ch.name}">${ch.name}</span>
                  </div>
                  <div class="tile-actions">
                    <button class="tile-btn solo-btn ${isSolo ? 'active-solo' : ''}" id="solo-btn-${ch.id}" title="${isSolo ? 'Mute' : 'Audio Solo'}">
                      ${
                        isSolo
                          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
                          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
                      }
                    </button>
                    <button class="tile-btn fullscreen-btn" data-id="${ch.id}" title="Toggle Fullscreen">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                    </button>
                    <button class="tile-btn remove-btn" data-id="${ch.id}" title="Remove Feed">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </div>
                <div class="tile-frame-wrapper">
                  <iframe
                    id="iframe-${ch.id}"
                    src="https://www.youtube-nocookie.com/embed/${ch.videoId}?autoplay=1&mute=1&enablejsapi=1"
                    title="${ch.name}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            `;
                  })
                  .join('')
          }
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private getActiveChannelsForLayout(): MatrixChannel[] {
    let max = 4;
    if (this.currentLayout === '1x2') max = 2;
    else if (this.currentLayout === '2x2') max = 4;
    else if (this.currentLayout === '2x4') max = 8;
    else if (this.currentLayout === '3x3') max = 9;

    if (this.fullscreenTileId) {
      const target = this.channels.find((c) => c.id === this.fullscreenTileId);
      return target ? [target] : this.channels.slice(0, max);
    }

    return this.channels.slice(0, max);
  }

  private bindEvents(): void {
    // Layout switcher
    this.container.querySelectorAll('.layout-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const layout = (e.currentTarget as HTMLElement).dataset.layout as MatrixGridLayout;
        if (layout) {
          this.fullscreenTileId = null;
          this.setLayout(layout);
        }
      });
    });

    // Solo button handlers
    this.channels.forEach((ch) => {
      const soloBtn = this.container.querySelector(`#solo-btn-${ch.id}`);
      if (soloBtn) {
        soloBtn.addEventListener('click', () => {
          this.toggleSoloAudio(ch.id);
        });
      }
    });

    // Fullscreen buttons
    this.container.querySelectorAll('.fullscreen-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (id) this.toggleTileFullscreen(id);
      });
    });

    // Remove buttons
    this.container.querySelectorAll('.remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (id) this.removeChannel(id);
      });
    });

    // Quick add input + button
    const addInput = this.container.querySelector('#matrix-add-input') as HTMLInputElement | null;
    const addBtn = this.container.querySelector('#matrix-add-btn') as HTMLButtonElement | null;
    const presetSelect = this.container.querySelector('#matrix-preset-select') as HTMLSelectElement | null;

    const handleAdd = () => {
      if (!addInput) return;
      const val = addInput.value.trim();
      const videoId = this.parseInputToVideoId(val);
      if (videoId) {
        const newCh: MatrixChannel = {
          id: `ch-${Date.now()}`,
          name: `Custom Stream (${videoId})`,
          videoId,
        };
        this.addChannel(newCh);
        addInput.value = '';
      } else {
        addInput.classList.add('input-error');
        setTimeout(() => addInput.classList.remove('input-error'), 1500);
      }
    };

    if (addBtn) addBtn.addEventListener('click', handleAdd);
    if (addInput) {
      addInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAdd();
      });
    }

    if (presetSelect) {
      presetSelect.addEventListener('change', () => {
        const pid = presetSelect.value;
        const target = CCTV_PRESETS.find((p) => p.id === pid);
        if (target) {
          this.addChannel({
            id: target.id,
            name: target.name,
            videoId: target.videoId,
            city: target.city,
            country: target.country,
          });
          presetSelect.selectedIndex = 0;
        }
      });
    }
  }
}
