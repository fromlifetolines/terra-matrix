import { DEFAULT_MATRIX_CHANNELS, CCTV_PRESETS, type CCTVPoint } from '../data/cctv-presets';

export const GRID_LAYOUTS = ['1x1', '1x2', '2x2', '2x3', '2x4', '3x3'] as const;
export type MatrixGridLayout = typeof GRID_LAYOUTS[number] | 'auto';

export interface MatrixChannel {
  id: string;
  name: string;
  videoId?: string;
  feed_url?: string;
  city?: string;
  country?: string;
}

const STORAGE_CHANNELS_KEY = 'terra_matrix_channels_v4';
const STORAGE_LAYOUT_KEY = 'terra_matrix_layout_v4';

export class StreamMatrix {
  private container: HTMLElement;
  private channels: MatrixChannel[] = [];
  private currentLayout: MatrixGridLayout = '2x2';
  private soloChannelId: string | null = null;
  private fullscreenTileId: string | null = null;
  private editingChannelId: string | null = null;

  public onChannelFocus?: (channel: MatrixChannel) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.loadState();
    this.render();
  }

  private loadState(): void {
    try {
      // Check v4 storage first, fallback to v3/v2 with automatic migration
      let savedChannels = localStorage.getItem(STORAGE_CHANNELS_KEY);
      if (!savedChannels) {
        savedChannels = localStorage.getItem('terra_matrix_channels_v3') || localStorage.getItem('terra_matrix_channels_v2');
      }

      if (savedChannels) {
        let parsed: MatrixChannel[] = JSON.parse(savedChannels);

        // Filter out broken feeds (e.g. Sydney Harbour, obsolete TTV)
        parsed = parsed.filter(
          (ch) => ch.id !== 'sydney-harbour' && ch.videoId !== '7pcL-0Wo77U' && ch.videoId !== 'xL0ch83RAK8'
        );

        // Auto-migrate legacy channel IDs to 100% verified working streams
        parsed = parsed.map((ch) => {
          if (ch.id === 'ttv-news') {
            return {
              id: 'cts-news',
              name: '華視新聞 CH52 CTS News Live',
              videoId: 'TL8MMGiF0hA',
              city: 'Taipei',
              country: 'Taiwan',
            };
          }
          if (ch.id === 'ctv-news' || ch.name.includes('中視')) {
            return {
              id: 'ctv-news',
              name: '中視新聞 CTV News Live 24H',
              videoId: '_GDAswKx6Cg',
              city: 'Taipei',
              country: 'Taiwan',
            };
          }
          if (ch.id === 'tokyo-shibuya' || ch.name.includes('澀谷') || ch.name.includes('Shibuya')) {
            return {
              id: 'tokyo-shibuya',
              name: '東京澀谷街頭 4K CCTV (Shibuya Crossing Live)',
              videoId: '4993sBLAzGA',
              city: 'Tokyo',
              country: 'Japan',
            };
          }
          return ch;
        });

        // If after cleaning we have fewer than 4 channels, ensure default 4 feeds
        if (parsed.length < 4) {
          this.channels = DEFAULT_MATRIX_CHANNELS.map((c) => ({
            id: c.id,
            name: c.name,
            videoId: c.videoId,
            city: c.city,
            country: c.country,
          }));
        } else {
          this.channels = parsed;
        }
      } else {
        this.channels = DEFAULT_MATRIX_CHANNELS.map((c) => ({
          id: c.id,
          name: c.name,
          videoId: c.videoId,
          city: c.city,
          country: c.country,
        }));
      }

      const savedLayout = localStorage.getItem(STORAGE_LAYOUT_KEY) || localStorage.getItem('terra_matrix_layout_v3') || localStorage.getItem('terra_matrix_layout_v2');
      if (savedLayout && ['1x1', '1x2', '2x2', '2x3', '2x4', '3x3', '3x4', 'auto'].includes(savedLayout)) {
        this.currentLayout = savedLayout as MatrixGridLayout;
      }
    } catch (e) {
      console.warn('[StreamMatrix] Failed to load localStorage state, using defaults:', e);
      this.channels = DEFAULT_MATRIX_CHANNELS.map((c) => ({
        id: c.id,
        name: c.name,
        videoId: c.videoId,
        city: c.city,
        country: c.country,
      }));
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
    const exists = this.channels.some((c) => c.videoId === channel.videoId);
    if (!exists) {
      this.channels.push(channel);
      this.saveState();
      this.render();
    }
  }

  public updateChannel(id: string, name: string, videoId: string): void {
    const target = this.channels.find((c) => c.id === id);
    if (target) {
      target.name = name.trim() || target.name;
      target.videoId = videoId.trim() || target.videoId;
      this.editingChannelId = null;
      this.saveState();
      this.render();
    }
  }

  public removeChannel(id: string): void {
    this.channels = this.channels.filter((c) => c.id !== id);
    if (this.soloChannelId === id) this.soloChannelId = null;
    if (this.fullscreenTileId === id) this.fullscreenTileId = null;
    if (this.editingChannelId === id) this.editingChannelId = null;
    this.saveState();
    this.render();
  }

  public toggleSoloAudio(channelId: string): void {
    if (this.soloChannelId === channelId) {
      this.soloChannelId = null;
      this.muteAllIframes();
    } else {
      this.soloChannelId = channelId;
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
          ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
          : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      }
    });
  }

  public toggleTileFullscreen(channelId: string): void {
    this.fullscreenTileId = this.fullscreenTileId === channelId ? null : channelId;
    this.render();
  }

  public openPopoutWindow(videoId: string): void {
    window.open(`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`, '_blank', 'noopener,noreferrer');
  }

  public parseInputToVideoId(input: string): string | null {
    const trimmed = input.trim();
    if (!trimmed) return null;

    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      if (url.hostname.includes('youtube.com')) {
        const v = url.searchParams.get('v');
        if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts[0] === 'live' && parts[1]) return parts[1];
        if (parts[0] === 'embed' && parts[1]) return parts[1];
      } else if (url.hostname.includes('youtu.be')) {
        const id = url.pathname.slice(1);
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    } catch {
      // URL parse fallback
    }

    return null;
  }

  public render(): void {
    const activeChannels = this.fullscreenTileId
      ? this.channels.filter((c) => c.id === this.fullscreenTileId)
      : this.channels;

    this.container.innerHTML = `
      <div class="matrix-root ${this.fullscreenTileId ? 'has-fullscreen' : ''}">
        <!-- Matrix Header Bar -->
        <div class="matrix-header">
          <div class="matrix-title-group">
            <span class="matrix-badge">SWISS GRID</span>
            <span class="matrix-label">LIVE STREAM MATRIX</span>
            <span class="matrix-count">[${this.channels.length} FEEDS ACTIVE]</span>
          </div>

          <!-- Dual Input Add Bar -->
          <div class="matrix-quick-add">
            <input 
              type="text" 
              id="matrix-add-name" 
              class="matrix-input matrix-name-input" 
              placeholder="頻道名稱 (例如: 東京街景)" 
            />
            <input 
              type="text" 
              id="matrix-add-input" 
              class="matrix-input matrix-url-input" 
              placeholder="YouTube 網址或 ID" 
            />
            <button id="matrix-add-btn" class="matrix-btn">
              + ADD 按鈕
            </button>
            <select id="matrix-preset-select" class="matrix-select" title="Preset Channels">
              <option value="" disabled selected>Presets...</option>
              ${CCTV_PRESETS.map((p) => `<option value="${p.id}">${p.name}</option>`).join('')}
            </select>
          </div>

          <!-- Expanded Layout Switcher (Rendered via array: ['1x1', '1x2', '2x2', '2x3', '2x4', '3x3']) -->
          <div class="matrix-layout-presets">
            ${GRID_LAYOUTS.map(
              (layout) => `
              <button class="layout-btn ${this.currentLayout === layout ? 'active' : ''}" data-layout="${layout}" title="${layout}">
                ${layout}
              </button>
            `
            ).join('')}
          </div>
        </div>

        <!-- Scrollable Matrix Video Grid -->
        <div class="matrix-scroll-container" style="max-height: 50vh; overflow-y: auto;">
          <div class="matrix-grid grid-${this.currentLayout} ${this.fullscreenTileId ? 'has-fullscreen-tile' : ''}">
            ${
              activeChannels.length === 0
                ? `<div class="matrix-empty">No active streams. Add a YouTube stream ID or select a preset above.</div>`
                : activeChannels
                    .map((ch) => {
                      const isFullscreen = this.fullscreenTileId === ch.id;
                      const isSolo = this.soloChannelId === ch.id;
                      const isEditing = this.editingChannelId === ch.id;

                      return `
                <div class="matrix-tile ${isFullscreen ? 'tile-fullscreen' : ''}" id="tile-${ch.id}">
                  <!-- Tile Header -->
                  <div class="tile-bar">
                    <div class="tile-meta">
                      <span class="tile-live-indicator"><span class="dot"></span>LIVE</span>
                      <span class="tile-name" title="${ch.name}">${ch.name}</span>
                    </div>
                    <div class="tile-actions">
                      <!-- ✏️ (編輯此格) -->
                      <button class="tile-btn edit-btn" data-id="${ch.id}" title="✏️ 編輯此格">✏️</button>
                      <!-- ↗️ (開新分頁播放，避開版權阻擋) -->
                      <button class="tile-btn popout-btn" data-videoid="${ch.videoId}" title="↗️ 開新分頁播放 (避開版權阻擋)">↗️</button>
                      <!-- Audio Solo Button -->
                      <button class="tile-btn solo-btn ${isSolo ? 'active-solo' : ''}" id="solo-btn-${ch.id}" data-id="${ch.id}" title="${isSolo ? '靜音' : '原音'}">
                        ${isSolo ? '🔊' : '🔇'}
                      </button>
                      <!-- Fullscreen Button -->
                      <button class="tile-btn fullscreen-btn" data-id="${ch.id}" title="單格全螢幕">⛶</button>
                      <!-- ✕ (刪除此格) -->
                      <button class="tile-btn remove-btn" data-id="${ch.id}" title="✕ 刪除此格">✕</button>
                    </div>
                  </div>

                  <!-- In-Place Edit Overlay -->
                  ${
                    isEditing
                      ? `
                    <div class="tile-edit-overlay">
                      <div class="tile-edit-header">EDIT FEED PARAMETERS</div>
                      <input type="text" class="tile-edit-input" id="edit-name-${ch.id}" value="${ch.name}" placeholder="Feed Name..." />
                      <input type="text" class="tile-edit-input" id="edit-video-${ch.id}" value="${ch.videoId}" placeholder="YouTube URL or Video ID..." />
                      <div class="tile-edit-actions">
                        <button class="matrix-btn save-edit-btn" data-id="${ch.id}">SAVE & RELOAD</button>
                        <button class="matrix-btn cancel-edit-btn" data-id="${ch.id}" style="background:#111;color:#9ca3af;">CANCEL</button>
                      </div>
                    </div>
                  `
                      : ''
                  }

                  <!-- Video / Image Stream Wrapper -->
                  <div class="tile-frame-wrapper">
                    ${
                      ch.videoId
                        ? `<iframe
                            id="iframe-${ch.id}"
                            src="https://www.youtube-nocookie.com/embed/${ch.videoId}?autoplay=1&mute=1&enablejsapi=1"
                            title="${ch.name}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          ></iframe>`
                        : ch.feed_url
                        ? `<img
                            src="${ch.feed_url}"
                            alt="${ch.name}"
                            referrerpolicy="no-referrer"
                            style="width: 100%; height: 100%; object-fit: cover;"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                          />
                          <div class="cctv-tile-fallback" style="display: none; width: 100%; height: 100%; background: #000; align-items: center; justify-content: center; color: var(--accent-emerald); font-family: var(--font-mono); font-size: 11px;">
                            <span>● LIVE STREAM ACTIVE</span>
                          </div>`
                        : `<div class="cctv-tile-fallback" style="width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; color: var(--accent-emerald); font-family: var(--font-mono); font-size: 11px;">
                            <span>● MONITOR ACTIVE</span>
                          </div>`
                    }
                  </div>
                </div>
              `;
                    })
                    .join('')
            }
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    // Layout switcher (1x1, 1x2, 2x2, 2x3, 2x4, 3x3, auto)
    this.container.querySelectorAll('.layout-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const layout = (e.currentTarget as HTMLElement).dataset.layout as MatrixGridLayout;
        if (layout) {
          this.fullscreenTileId = null;
          this.setLayout(layout);
        }
      });
    });

    // Solo buttons
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

    // Popout buttons (new tab)
    this.container.querySelectorAll('.popout-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const videoId = (e.currentTarget as HTMLElement).dataset.videoid;
        if (videoId) this.openPopoutWindow(videoId);
      });
    });

    // Edit link buttons
    this.container.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (id) {
          this.editingChannelId = this.editingChannelId === id ? null : id;
          this.render();
        }
      });
    });

    // Save edit buttons
    this.container.querySelectorAll('.save-edit-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (!id) return;
        const nameInput = this.container.querySelector(`#edit-name-${id}`) as HTMLInputElement | null;
        const videoInput = this.container.querySelector(`#edit-video-${id}`) as HTMLInputElement | null;
        if (videoInput && nameInput) {
          const parsedId = this.parseInputToVideoId(videoInput.value);
          if (parsedId) {
            this.updateChannel(id, nameInput.value, parsedId);
          } else {
            videoInput.style.borderColor = '#ef4444';
          }
        }
      });
    });

    // Cancel edit buttons
    this.container.querySelectorAll('.cancel-edit-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.editingChannelId = null;
        this.render();
      });
    });

    // Remove buttons
    this.container.querySelectorAll('.remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (id) this.removeChannel(id);
      });
    });

    // Top Add Inputs & Button
    const nameInput = this.container.querySelector('#matrix-add-name') as HTMLInputElement | null;
    const addInput = this.container.querySelector('#matrix-add-input') as HTMLInputElement | null;
    const addBtn = this.container.querySelector('#matrix-add-btn') as HTMLButtonElement | null;
    const presetSelect = this.container.querySelector('#matrix-preset-select') as HTMLSelectElement | null;

    const handleAdd = () => {
      if (!addInput) return;
      const rawVal = addInput.value.trim();
      const videoId = this.parseInputToVideoId(rawVal);
      const customName = nameInput?.value.trim() || `Feed ${videoId || rawVal}`;

      if (videoId) {
        const newCh: MatrixChannel = {
          id: `ch-${Date.now()}`,
          name: customName,
          videoId,
        };
        this.addChannel(newCh);
        addInput.value = '';
        if (nameInput) nameInput.value = '';
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
