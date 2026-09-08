/**
 * OSIRIS / Terra Matrix — where a preview tile sits relative to the marker it belongs to.
 * Ensures non-overlapping placement of floating live CCTV cards over the map canvas.
 */

export interface TileGeometry {
  width: number;
  imageHeight: number;
  labelHeight: number;
  gap: number;
}

export interface TilePlacement {
  x: number;
  y: number;
  flipped: boolean;
  anchored: boolean;
}

const EDGE = 40;
const EDGE_TOP = 70;
const EDGE_BOTTOM = 90;

export function tileHeight(geom: TileGeometry): number {
  return geom.imageHeight + geom.labelHeight;
}

export function layoutTile(
  pt: { x: number; y: number },
  viewport: { width: number; height: number },
  geom: TileGeometry
): TilePlacement {
  const h = tileHeight(geom);
  const maxX = viewport.width - geom.width - EDGE;
  const maxY = viewport.height - h - EDGE_BOTTOM;

  // Above the marker by default; below it when there is no room
  const above = pt.y - h - geom.gap;
  const flipped = above < EDGE_TOP;
  const wantX = pt.x - geom.width / 2;
  const wantY = flipped ? pt.y + geom.gap : above;

  const x = Math.min(Math.max(wantX, EDGE), Math.max(EDGE, maxX));
  const y = Math.min(Math.max(wantY, EDGE_TOP), Math.max(EDGE_TOP, maxY));

  return {
    x,
    y,
    flipped,
    anchored: Math.abs(x - wantX) < 2 && Math.abs(y - wantY) < 2,
  };
}

export function tilesOverlap(a: TilePlacement, b: TilePlacement, geom: TileGeometry): boolean {
  return (
    Math.abs(a.x - b.x) < geom.width + 12 &&
    Math.abs(a.y - b.y) < tileHeight(geom) + geom.gap
  );
}
