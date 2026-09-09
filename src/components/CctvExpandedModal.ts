/**
 * CctvExpandedModal.ts
 *
 * In-place high-definition expanded CCTV surveillance terminal modal.
 * Expands directly over the 3D globe with auto-refreshing live frames
 * or embedded live video stream, matching LIVE FROM SPACE behavior.
 * Does not redirect to or disrupt the bottom Swiss Grid matrix.
 */

import { resolveMediaUrl, freshen } from '../globe/CctvPreviews';

export class CctvExpandedModal {
  private container: HTMLElement | null = null;
  private currentCam: any = null;
  private refreshTimer?: number;
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
    const isYouTube = Boolean(
      cam.videoId ||
      (cam.stream_url && String(cam.stream_url).match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/))
    );
    let videoId = cam.videoId;
    if (!videoId && cam.stream_url) {
      const m = String(cam.stream_url).match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
      if (m) videoId = m[1];
    }

    modal.innerHTML = `
      <div class="cctv-modal-backdrop" id="cctv-modal-backdrop"></div>
      <div class="cctv-modal-dialog">
        <!-- Header -->
        <div class="cctv-modal-header">
          <div class="cctv-modal-title-group">
            <span class="cctv-modal-live-dot"></span>
            <span class="cctv-modal-radio-icon">((•))</span>
            <span class="cctv-modal-title">${cam.name || 'SURVEILLANCE NODE'}</span>
            <span class="cctv-modal-city">// ${cam.city || 'Taipei'}, ${cam.country || 'Taiwan'}</span>
          </div>
          <div class="cctv-modal-actions">
            <span class="cctv-modal-badge" id="cctv-refresh-badge">
              ${isYouTube ? 'LIVE STREAM (HD)' : '● LIVE FEED ACTIVE'}
            </span>
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
              : `
              <div class="cctv-modal-img-container">
                <img
                  src="${freshen(rawMedia)}"
                  alt="${cam.name}"
                  referrerpolicy="no-referrer"
                  class="cctv-modal-img"
                  id="cctv-modal-dynamic-img"
                />
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
            <span>SOURCE: <b>${cam.source || 'TAIWAN MOTC / NPA'}</b></span>
            <span>STATUS: <b style="color:var(--accent-emerald);">● IN-PLACE SURVEILLANCE</b></span>
          </div>
          <div class="cctv-modal-footer-btns">
            ${
              !isYouTube
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

    const refreshNowBtn = modal.querySelector('#cctv-refresh-now-btn');
    const dynamicImg = modal.querySelector<HTMLImageElement>('#cctv-modal-dynamic-img');
    const fallbackEl = modal.querySelector<HTMLElement>('#cctv-modal-fallback');

    if (dynamicImg) {
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

      // Seamless double-buffered frame update without flickering
      const refreshFrame = () => {
        if (!this.container || !this.isLiveUpdating || !dynamicImg || !rawMedia) return;
        const nextSrc = freshen(rawMedia);
        const preloader = new Image();
        preloader.referrerPolicy = 'no-referrer';
        preloader.onload = () => {
          if (!this.container || !dynamicImg) return;
          dynamicImg.src = nextSrc;
          dynamicImg.style.display = 'block';
          if (fallbackEl) fallbackEl.style.display = 'none';

          const badge = this.container.querySelector('#cctv-refresh-badge');
          if (badge) {
            const timeStr = new Date().toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            badge.innerHTML = `<span class="cctv-modal-live-dot mini"></span> LIVE FRAME ${timeStr}`;
          }
        };
        preloader.onerror = () => {
          // Gracefully retain current frame during network stutter
        };
        preloader.src = nextSrc;
      };

      refreshNowBtn?.addEventListener('click', () => {
        refreshFrame();
      });

      // Continuous 1.8s live frame refresh loop
      if (!isYouTube && rawMedia) {
        this.refreshTimer = window.setInterval(refreshFrame, 1800);
      }
    }

    window.addEventListener('keydown', this.handleKeyDown);
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
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    this.currentCam = null;
  }
}
