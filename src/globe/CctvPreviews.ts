import type { Map as MlMap } from 'maplibre-gl';
import { layoutTile, tileHeight, tilesOverlap, type TileGeometry } from './tile-layout';
import type { CctvCamera } from '../data/cctv-cameras';

const MIN_ZOOM = 10;
const MAX_TILES = 8;

const GEOM: TileGeometry = {
  width: 176,
  imageHeight: 99,
  labelHeight: 22,
  gap: 24,
};

export class CctvPreviewsManager {
  private map: MlMap;
  private container: HTMLElement;
  private active = true;
  private currentCams: CctvCamera[] = [];
  private tileElements: Map<string, HTMLElement> = new Map();
  private onSelectCamera?: (cam: CctvCamera) => void;
  private isDestroyed = false;

  constructor(map: MlMap, parentElement: HTMLElement, onSelect?: (cam: CctvCamera) => void) {
    this.map = map;
    this.onSelectCamera = onSelect;

    this.container = document.createElement('div');
    this.container.className = 'cctv-previews-overlay';
    parentElement.appendChild(this.container);

    this.bindEvents();
    this.recompute();
  }

  public setActive(active: boolean): void {
    this.active = active;
    if (!active) {
      this.clearTiles();
    } else {
      this.recompute();
    }
  }

  private bindEvents(): void {
    const onMove = () => this.placeTiles();
    const onSettle = () => this.recompute();

    this.map.on('move', onMove);
    this.map.on('moveend', onSettle);
    this.map.on('zoomend', onSettle);
    this.map.on('idle', onSettle);
  }

  public recompute(): void {
    if (this.isDestroyed || !this.active) return;
    const zoom = this.map.getZoom();
    if (zoom < MIN_ZOOM) {
      this.clearTiles();
      return;
    }

    let feats;
    try {
      feats = this.map.queryRenderedFeatures({ layers: ['cctv-dots'] });
    } catch {
      return;
    }

    if (!feats || feats.length === 0) {
      this.clearTiles();
      return;
    }

    const canvas = this.map.getCanvas();
    const cx = canvas.clientWidth / 2;
    const cy = canvas.clientHeight / 2;

    const seen = new Set<string>();
    const candidates: { cam: CctvCamera; box: any; d: number }[] = [];

    for (const f of feats) {
      const p = (f.properties ?? {}) as any;
      const id = String(p.id ?? '');
      if (!id || seen.has(id)) continue;
      seen.add(id);

      const coords = (f.geometry as any)?.coordinates;
      if (!coords) continue;

      const pt = this.map.project(coords);
      const cam: CctvCamera = {
        id,
        name: p.name || 'CAMERA',
        city: p.city || 'Taipei',
        country: p.country || 'Taiwan',
        lat: coords[1],
        lng: coords[0],
        feed_url: p.feed_url,
        stream_url: p.stream_url,
        stream_type: p.stream_type,
        videoId: p.videoId,
        source: p.source || 'CCTV',
      };

      const box = layoutTile(pt, { width: canvas.clientWidth, height: canvas.clientHeight }, GEOM);
      const d = (pt.x - cx) ** 2 + (pt.y - cy) ** 2;

      candidates.push({ cam, box, d });
    }

    // Sort by distance to center
    candidates.sort((a, b) => a.d - b.d);

    const picked: CctvCamera[] = [];
    const pickedBoxes: any[] = [];

    for (const c of candidates) {
      if (picked.length >= MAX_TILES) break;
      const clash = pickedBoxes.some((b) => tilesOverlap(b, c.box, GEOM));
      if (clash) continue;
      picked.push(c.cam);
      pickedBoxes.push(c.box);
    }

    // Check if same
    const same =
      this.currentCams.length === picked.length &&
      this.currentCams.every((c, i) => c.id === picked[i].id);

    if (!same) {
      this.currentCams = picked;
      this.renderTiles();
    }
    this.placeTiles();
  }

  private renderTiles(): void {
    this.container.innerHTML = '';
    this.tileElements.clear();

    for (const cam of this.currentCams) {
      const tileWrapper = document.createElement('div');
      tileWrapper.className = 'cctv-preview-tile';
      tileWrapper.style.width = `${GEOM.width}px`;

      // Live status dot
      const isLive = true;
      const statusHtml = `
        <div class="cctv-tile-header">
          <div class="cctv-live-tag">
            <span class="cctv-live-dot"></span>
            <span>LIVE</span>
          </div>
          <div class="cctv-open-btn">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            <span>MONITOR</span>
          </div>
        </div>
      `;

      // Preview Frame
      let mediaSrc = '';
      if (cam.videoId) {
        mediaSrc = `https://img.youtube.com/vi/${cam.videoId}/hqdefault.jpg`;
      } else if (cam.feed_url) {
        mediaSrc = cam.feed_url;
      }

      const imageHtml = `
        <div class="cctv-tile-media" style="height: ${GEOM.imageHeight}px;">
          ${
            mediaSrc
              ? `<img src="${mediaSrc}" alt="${cam.name}" referrerpolicy="no-referrer" class="cctv-tile-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
              : ''
          }
          <div class="cctv-tile-fallback" style="${mediaSrc ? 'display:none;' : 'display:flex;'}">
            <div class="cctv-scanline-sweep"></div>
            <div class="cctv-fallback-radar"></div>
            <span class="cctv-fallback-text">FEED ACTIVE</span>
          </div>
        </div>
      `;

      // Label strip
      const labelHtml = `
        <div class="cctv-tile-label" style="height: ${GEOM.labelHeight}px;">
          <span class="cctv-label-dot"></span>
          <span class="cctv-label-name" title="${cam.name}">${cam.name}</span>
        </div>
      `;

      // Connector Stem Line
      const stemHtml = `
        <div class="cctv-stem-down"></div>
        <div class="cctv-stem-up"></div>
      `;

      tileWrapper.innerHTML = `
        <div class="cctv-tile-card">
          ${statusHtml}
          ${imageHtml}
          ${labelHtml}
        </div>
        ${stemHtml}
      `;

      tileWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onSelectCamera?.(cam);
      });

      this.container.appendChild(tileWrapper);
      this.tileElements.set(cam.id, tileWrapper);
    }
  }

  private placeTiles(): void {
    if (this.currentCams.length === 0) return;
    const canvas = this.map.getCanvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    for (const cam of this.currentCams) {
      const el = this.tileElements.get(cam.id);
      if (!el) continue;

      const pt = this.map.project([cam.lng, cam.lat]);
      const box = layoutTile(pt, { width, height }, GEOM);

      el.setAttribute('data-flip', !box.anchored ? 'none' : box.flipped ? 'below' : 'above');
      el.style.transform = `translate3d(${Math.round(box.x)}px, ${Math.round(box.y)}px, 0)`;
    }
  }

  private clearTiles(): void {
    this.container.innerHTML = '';
    this.tileElements.clear();
    this.currentCams = [];
  }

  public destroy(): void {
    this.isDestroyed = true;
    this.clearTiles();
    this.container.remove();
  }
}
