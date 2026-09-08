/**
 * OSIRIS — LIVE FROM SPACE
 * 24/7 downlink from cameras mounted outside the International Space Station.
 */

export interface SpaceFeed {
  id: string;
  label: string;
  detail: string;
  videoId: string;
}

export const SPACE_FEEDS: SpaceFeed[] = [
  {
    id: 'sen-4k',
    label: '4K EARTH',
    detail: 'Sen · 4K cameras mounted on the ISS',
    videoId: 'fO9e9jnhYK8',
  },
  {
    id: 'iss-earth',
    label: 'EARTH VIEW',
    detail: 'ISS external camera · nadir',
    videoId: 'tj4knR4r1UU',
  },
  {
    id: 'iss-overview',
    label: 'OVERVIEW CAM',
    detail: 'ISS overview camera · wide',
    videoId: 'OKQEMp2555A',
  },
];

const ORBIT_ALT_KM = 408;

function buildEmbedSrc(videoId: string, big: boolean): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    modestbranding: '1',
    rel: '0',
  });
  if (big) params.set('vq', 'hd1080');
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export class SpaceCamPanel {
  private container: HTMLElement;
  private currentFeed: SpaceFeed = SPACE_FEEDS[0];
  private isVisible = true;
  private isExpanded = false;
  private parentElement: HTMLElement;
  private modalContainer?: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.container = document.createElement('div');
    this.container.className = 'spacecam-floating-panel';
    this.parentElement.appendChild(this.container);
    this.render();
  }

  public setVisible(visible: boolean): void {
    this.isVisible = visible;
    this.container.style.display = visible ? 'block' : 'none';
  }

  public toggle(): void {
    this.setVisible(!this.isVisible);
  }

  public render(): void {
    this.container.innerHTML = `
      <div class="spacecam-card">
        <div class="spacecam-header">
          <div class="spacecam-title-group">
            <span class="spacecam-radio-icon">((•))</span>
            <span class="spacecam-title">LIVE FROM SPACE</span>
          </div>
          <div class="spacecam-status-group">
            <span class="spacecam-live-dot"></span>
            <span class="spacecam-tag">24/7</span>
            <button class="spacecam-btn expand-btn" title="Expand Fullscreen (4K)">⛶</button>
            <button class="spacecam-btn close-btn" title="Hide Space Cam">✕</button>
          </div>
        </div>

        <div class="spacecam-player-wrapper">
          <iframe
            src="${buildEmbedSrc(this.currentFeed.videoId, false)}"
            title="ISS Live — ${this.currentFeed.label}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="spacecam-tabs">
          ${SPACE_FEEDS.map(
            (f) => `
            <button class="spacecam-tab-btn ${f.id === this.currentFeed.id ? 'active' : ''}" data-id="${f.id}">
              ${f.label}
            </button>
          `
          ).join('')}
        </div>

        <div class="spacecam-footer">
          <div class="spacecam-meta">
            <div class="spacecam-detail">${this.currentFeed.detail}</div>
            <div class="spacecam-telemetry">ALT ~${ORBIT_ALT_KM} KM · ORBIT ~93 MIN</div>
          </div>
          <a
            href="https://www.youtube.com/watch?v=${this.currentFeed.videoId}"
            target="_blank"
            rel="noopener noreferrer"
            class="spacecam-source-link"
          >
            SOURCE ↗
          </a>
        </div>
      </div>
    `;

    // Bind events
    const closeBtn = this.container.querySelector('.close-btn');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setVisible(false);
    });

    const expandBtn = this.container.querySelector('.expand-btn');
    expandBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openExpandedModal();
    });

    const tabBtns = this.container.querySelectorAll<HTMLButtonElement>('.spacecam-tab-btn');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const feed = SPACE_FEEDS.find((f) => f.id === id);
        if (feed) {
          this.currentFeed = feed;
          this.render();
        }
      });
    });
  }

  private openExpandedModal(): void {
    this.closeExpandedModal();
    this.isExpanded = true;

    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'spacecam-expanded-modal';
    this.modalContainer.innerHTML = `
      <div class="spacecam-modal-backdrop"></div>
      <div class="spacecam-modal-dialog">
        <div class="spacecam-modal-header">
          <div class="spacecam-title-group">
            <span class="spacecam-radio-icon">((•))</span>
            <span class="spacecam-title">LIVE FROM SPACE</span>
            <span class="spacecam-sub">· ${this.currentFeed.detail}</span>
          </div>
          <div class="spacecam-status-group">
            <span class="spacecam-live-dot"></span>
            <span class="spacecam-tag">24/7 HD</span>
            <button class="spacecam-btn modal-close-btn" title="Close (Esc)">✕</button>
          </div>
        </div>

        <div class="spacecam-modal-body">
          <iframe
            src="${buildEmbedSrc(this.currentFeed.videoId, true)}"
            title="ISS Live 4K Expanded"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
          ></iframe>
        </div>

        <div class="spacecam-modal-footer">
          <div class="spacecam-tabs">
            ${SPACE_FEEDS.map(
              (f) => `
              <button class="spacecam-tab-btn ${f.id === this.currentFeed.id ? 'active' : ''}" data-modal-id="${f.id}">
                ${f.label}
              </button>
            `
            ).join('')}
          </div>
          <div class="spacecam-telemetry">ALT ~${ORBIT_ALT_KM} KM · ORBIT ~93 MIN · ESC TO CLOSE</div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modalContainer);

    // Escape listener
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeExpandedModal();
        window.removeEventListener('keydown', onKey);
      }
    };
    window.addEventListener('keydown', onKey);

    const closeBtn = this.modalContainer.querySelector('.modal-close-btn');
    closeBtn?.addEventListener('click', () => {
      this.closeExpandedModal();
      window.removeEventListener('keydown', onKey);
    });

    const backdrop = this.modalContainer.querySelector('.spacecam-modal-backdrop');
    backdrop?.addEventListener('click', () => {
      this.closeExpandedModal();
      window.removeEventListener('keydown', onKey);
    });

    const modalTabs = this.modalContainer.querySelectorAll<HTMLButtonElement>('[data-modal-id]');
    modalTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-modal-id');
        const feed = SPACE_FEEDS.find((f) => f.id === id);
        if (feed) {
          this.currentFeed = feed;
          this.render();
          this.openExpandedModal();
        }
      });
    });
  }

  private closeExpandedModal(): void {
    if (this.modalContainer) {
      this.modalContainer.remove();
      this.modalContainer = undefined;
    }
    this.isExpanded = false;
  }

  public destroy(): void {
    this.closeExpandedModal();
    this.container.remove();
  }
}
