/**
 * CctvExpandedModal.ts
 *
 * In-place high-definition expanded CCTV surveillance terminal modal.
 * Supports:
 * 1. Hardware-accelerated HLS (.m3u8) video streaming (30~60 FPS real-time moving traffic)
 * 2. Embedded 24/7 YouTube live streams (4K/1080p panoramic observation)
 * 3. High-frequency automated snapshot refreshing with 5-second countdown bar
 * 4. Proper memory cleanup with hls.destroy() on modal dismissal
 */

import Hls from 'hls.js';
import { resolveMediaUrl, freshen } from '../globe/CctvPreviews';

export class CctvExpandedModal {
  private container: HTMLElement | null = null;
  private currentCam: any = null;
  private refreshTimer?: number;
  private progressTimer?: number;
  private hlsInstance: Hls | null = null;
  private isLiveUpdating = true;
  private onFocusCamera?: (lat: number, lng: number) => void;

  constructor(options?: { onFocusCamera?: (lat: number, lng: number) => void }) {
    this.onFocusCamera = options?.onFocusCamera;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  public open(cam: any): void {
    this.close();
    this.currentCam = cam;

    const modal = document.createElement('div');
    modal.className = 'cctv-expanded-modal';
    modal.id = 'cctv-expanded-modal-root';

    const coordsStr =
      cam.lat !== undefined && cam.lng !== undefined
        ? `${Number(cam.lat).toFixed(4)}°N, ${Number(cam.lng).toFixed(4)}°E`
        : cam.lat !== undefined && cam.lon !== undefined
        ? `${Number(cam.lat).toFixed(4)}°N, ${Number(cam.lon).toFixed(4)}°E`
        : 'GEO-LOCATION ACTIVE';

    const rawMedia = resolveMediaUrl(cam);

    // 1. YouTube stream check
    const isYouTube = Boolean(
      cam.videoId ||
      (cam.stream_url && String(cam.stream_url).match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/))
    );
    let videoId = cam.videoId;
    if (!videoId && cam.stream_url) {
      const m = String(cam.stream_url).match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
      if (m) videoId = m[1];
    }

    // 2. HLS video stream check (.m3u8)
    const streamUrl = String(cam.stream_url || rawMedia || '').trim();
    const isHls = !isYouTube && (
      cam.stream_type === 'hls' ||
      streamUrl.includes('.m3u8') ||
      streamUrl.includes('/hls/')
    );

    const isLiveStream = isYouTube || isHls;

    modal.innerHTML = `
      <div class="cctv-modal-backdrop" id="cctv-modal-backdrop"></div>
      <div class="cctv-modal-dialog">
        <!-- Header -->
        <div class="cctv-modal-header">
          <div class="cctv-modal-title-group">
            <span class="cctv-modal-live-dot ${isLiveStream ? '' : 'mini'}" style="${isLiveStream ? '' : 'background:#38bdf8;box-shadow:0 0 8px #38bdf8;'}"></span>
            <span class="cctv-modal-radio-icon">((•))</span>
            <span class="cctv-modal-title">${cam.name || 'SURVEILLANCE NODE'}</span>
            <span class="cctv-modal-city">// ${cam.city || 'Taipei'}, ${cam.country || 'Taiwan'}</span>
          </div>
          <div class="cctv-modal-actions">
            <span class="cctv-modal-badge ${isLiveStream ? 'live-stream' : 'snapshot-mode'}" id="cctv-refresh-badge">
              ${
                isLiveStream
                  ? '<span class="cctv-modal-live-dot mini"></span> 🔴 60FPS LIVE STREAM'
                  : '<span class="cctv-modal-live-dot mini" style="background:#38bdf8;"></span> ⏱️ SNAPSHOT (5s REFRESH)'
              }
            </span>
            ${
              !isYouTube
                ? `<button class="cctv-modal-btn" id="cctv-modal-fit-btn" title="切換滿版 / 等比例 (Toggle Fill / Fit Frame)">⛶ FILL</button>`
                : ''
            }
            <button class="cctv-modal-btn" id="cctv-modal-focus-btn" title="Focus Camera Location on 3D Globe">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>
              LOCATE
            </button>
            <button class="cctv-modal-btn cctv-modal-close-btn" id="cctv-modal-close-btn" title="Close Modal (Esc)">✕</button>
          </div>
        </div>

        <!-- Video / Image Media Screen -->
        <div class="cctv-modal-screen">
          <div class="cctv-screen-scanline"></div>
          <div class="cctv-screen-reticle">
            <div class="reticle-corner top-left"></div>
            <div class="reticle-corner top-right"></div>
            <div class="reticle-corner bottom-left"></div>
            <div class="reticle-corner bottom-right"></div>
          </div>

          ${
            isYouTube && videoId
              ? `
              <iframe
                src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&modestbranding=1&rel=0"
                title="${cam.name}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowfullscreen
                class="cctv-modal-iframe"
              ></iframe>
            `
              : isHls
              ? `
              <div class="cctv-modal-img-container">
                <video
                  id="cctv-modal-video"
                  class="cctv-modal-video"
                  autoplay
                  muted
                  playsinline
                  controls
                ></video>
                <div class="cctv-modal-fallback" id="cctv-modal-fallback" style="display:none;">
                  <span class="cctv-modal-fb-icon">📡</span>
                  <span>OPTICAL STREAM CONNECTING</span>
                  <span style="font-size:10px;color:var(--text-dim);">Connecting to real-time HLS transport stream...</span>
                </div>
              </div>
            `
              : `
              <div class="cctv-modal-img-container">
                <img
                  src="${freshen(rawMedia)}"
                  alt="${cam.name}"
                  referrerpolicy="no-referrer"
                  class="cctv-modal-img"
                  id="cctv-modal-dynamic-img"
                />
                <div class="cctv-snapshot-progress-track">
                  <div class="cctv-snapshot-progress-bar" id="cctv-snapshot-progress-bar"></div>
                </div>
                <div class="cctv-modal-fallback" id="cctv-modal-fallback" style="display:none;">
                  <span class="cctv-modal-fb-icon">📹</span>
                  <span>OPTICAL SURVEILLANCE FEED ACTIVE</span>
                  <span style="font-size:10px;color:var(--text-dim);">Connecting to optical surveillance telemetry...</span>
                </div>
              </div>
            `
          }
        </div>

        <!-- Footer Telemetry Strip -->
        <div class="cctv-modal-footer">
          <div class="cctv-modal-telemetry">
            <span>COORDS: <b style="color:var(--accent-cyan);">${coordsStr}</b></span>
            <span>NODE ID: <b style="color:var(--accent-emerald);">${cam.id}</b></span>
            <span>SOURCE: <b>${cam.source || 'TAIWAN MOTC / NTPC ATIS'}</b></span>
            <span>STATUS: <b style="color:${isLiveStream ? '#ef4444' : 'var(--accent-emerald)'};">● ${isLiveStream ? 'REAL-TIME 60FPS LIVE' : '5S SNAPSHOT STREAM'}</b></span>
          </div>
          <div class="cctv-modal-footer-btns">
            ${
              !isLiveStream
                ? `<button class="cctv-footer-btn" id="cctv-refresh-now-btn">FORCE REFRESH</button>`
                : ''
            }
            <button class="cctv-footer-btn primary" id="cctv-modal-done-btn">DONE (ESC)</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.container = modal;

    // Attach listeners
    modal.querySelector('#cctv-modal-backdrop')?.addEventListener('click', () => this.close());
    modal.querySelector('#cctv-modal-close-btn')?.addEventListener('click', () => this.close());
    modal.querySelector('#cctv-modal-done-btn')?.addEventListener('click', () => this.close());

    modal.querySelector('#cctv-modal-focus-btn')?.addEventListener('click', () => {
      const lat = Number(cam.lat);
      const lng = Number(cam.lng !== undefined ? cam.lng : cam.lon);
      if (!isNaN(lat) && !isNaN(lng)) {
        this.onFocusCamera?.(lat, lng);
        this.close();
      }
    });

    const fitBtn = modal.querySelector<HTMLButtonElement>('#cctv-modal-fit-btn');
    const refreshNowBtn = modal.querySelector('#cctv-refresh-now-btn');
    const dynamicImg = modal.querySelector<HTMLImageElement>('#cctv-modal-dynamic-img');
    const videoEl = modal.querySelector<HTMLVideoElement>('#cctv-modal-video');
    const fallbackEl = modal.querySelector<HTMLElement>('#cctv-modal-fallback');

    // Fill / Fit toggle
    if (fitBtn) {
      fitBtn.addEventListener('click', () => {
        const targetEl = videoEl || dynamicImg;
        if (targetEl) {
          const isFill = targetEl.classList.toggle('fill-mode');
          fitBtn.textContent = isFill ? '⛶ FIT' : '⛶ FILL';
          fitBtn.title = isFill ? '切換為等比例縮放 (Fit)' : '切換為滿版填滿 (Fill)';
        }
      });
    }

    // Branch A: HLS Video Player
    if (isHls && videoEl && streamUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 15,
          maxBufferLength: 30,
        });
        this.hlsInstance = hls;

        hls.loadSource(streamUrl);
        hls.attachMedia(videoEl);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoEl.play().catch(() => {
            // Autoplay policy fallback: muted play
            videoEl.muted = true;
            videoEl.play().catch(() => {});
          });
          if (fallbackEl) fallbackEl.style.display = 'none';
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn('[CCTV HLS] Network error, recovering...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn('[CCTV HLS] Media error, recovering...');
                hls.recoverMediaError();
                break;
              default:
                console.warn('[CCTV HLS] Unrecoverable error:', data);
                if (fallbackEl) fallbackEl.style.display = 'flex';
                this.destroyHls();
                break;
            }
          }
        });
      } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Safari / iOS HLS
        videoEl.src = streamUrl;
        videoEl.addEventListener('loadedmetadata', () => {
          videoEl.play().catch(() => {});
          if (fallbackEl) fallbackEl.style.display = 'none';
        });
        videoEl.addEventListener('error', () => {
          if (fallbackEl) fallbackEl.style.display = 'flex';
        });
      }
    }

    // Branch B: Periodic Snapshot with 5s countdown progress bar
    if (!isLiveStream && dynamicImg && rawMedia) {
      dynamicImg.onerror = () => {
        if (!dynamicImg.src || dynamicImg.naturalWidth === 0) {
          dynamicImg.style.display = 'none';
          if (fallbackEl) fallbackEl.style.display = 'flex';
        }
      };
      dynamicImg.onload = () => {
        dynamicImg.style.display = 'block';
        if (fallbackEl) fallbackEl.style.display = 'none';
      };

      const progressBar = modal.querySelector<HTMLElement>('#cctv-snapshot-progress-bar');
      const badge = modal.querySelector('#cctv-refresh-badge');

      const refreshSnapshot = () => {
        if (!this.container || !this.isLiveUpdating || !dynamicImg || !rawMedia) return;
        const nextSrc = freshen(rawMedia);
        const preloader = new Image();
        preloader.referrerPolicy = 'no-referrer';
        preloader.onload = () => {
          if (!this.container || !dynamicImg) return;
          dynamicImg.src = nextSrc;
          dynamicImg.style.display = 'block';
          if (fallbackEl) fallbackEl.style.display = 'none';
        };
        preloader.src = nextSrc;
      };

      refreshNowBtn?.addEventListener('click', () => {
        refreshSnapshot();
      });

      // 5-second progress bar animation & trigger
      const INTERVAL_MS = 5000;
      let elapsedMs = 0;
      const STEP_MS = 100;

      this.progressTimer = window.setInterval(() => {
        if (!this.container) return;
        elapsedMs += STEP_MS;
        const pct = Math.min(100, (elapsedMs / INTERVAL_MS) * 100);
        if (progressBar) {
          progressBar.style.width = `${pct}%`;
        }

        const remainingSec = Math.max(0, Math.ceil((INTERVAL_MS - elapsedMs) / 1000));
        if (badge) {
          badge.innerHTML = `<span class="cctv-modal-live-dot mini" style="background:#38bdf8;"></span> ⏱️ SNAPSHOT (REFRESH IN ${remainingSec}s)`;
        }

        if (elapsedMs >= INTERVAL_MS) {
          elapsedMs = 0;
          refreshSnapshot();
        }
      }, STEP_MS);
    }

    window.addEventListener('keydown', this.handleKeyDown);
  }

  private destroyHls(): void {
    if (this.hlsInstance) {
      try {
        this.hlsInstance.stopLoad();
        this.hlsInstance.detachMedia();
        this.hlsInstance.destroy();
      } catch (e) {
        console.warn('[CctvExpandedModal] HLS destruction error:', e);
      }
      this.hlsInstance = null;
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  public close(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = undefined;
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = undefined;
    }

    this.destroyHls();

    // Release video element resources
    if (this.container) {
      const videoEl = this.container.querySelector<HTMLVideoElement>('video');
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      }
    }

    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    this.currentCam = null;
  }
}
