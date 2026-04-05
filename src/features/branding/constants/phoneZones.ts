/**
 * Phone zone definitions — shared between ScrollScene (3D) and HTML layouts.
 *
 * Each zone defines where the 3D phone model visually occupies the viewport,
 * expressed as CSS-friendly percentage values. HTML components use these to
 * reserve empty space (via padding/margin/grid), and ScrollScene uses them
 * to position the Three.js model in the matching screen region.
 *
 * Coordinate system:
 *   x: 0 = left edge, 100 = right edge
 *   y: 0 = top edge,  100 = bottom edge
 *   width/height: percentage of viewport
 */

export type PhoneZone = {
  /** Center X as % of viewport width */
  x: number;
  /** Center Y as % of viewport height */
  y: number;
  /** Approximate width as % of viewport width */
  width: number;
  /** Approximate height as % of viewport height */
  height: number;
};

export type PhoneZoneConfig = {
  mobile: PhoneZone; // < 600px
  tablet: PhoneZone; // 600–1199px
  desktop: PhoneZone; // >= 1200px
};

// ── CU Society: phone overlays the image collage ──
// Mobile:  phone sits in upper-right area, images top-left, text bottom
// Tablet:  phone sits right-center, images left, text below
// Desktop: phone sits on top of the centered image collage
export const cusocietyZone: PhoneZoneConfig = {
  mobile: { x: 60, y: 35, width: 40, height: 35 },
  tablet: { x: 65, y: 40, width: 35, height: 45 },
  desktop: { x: 35, y: 50, width: 30, height: 60 },
};

// ── Elexir: phone sits to the left on desktop, top on mobile ──
export const elexirZone: PhoneZoneConfig = {
  mobile: { x: 50, y: 25, width: 50, height: 35 },
  tablet: { x: 20, y: 45, width: 30, height: 50 },
  desktop: { x: 18, y: 50, width: 25, height: 55 },
};

// ── Kiyo: phone is prominent, centered on mobile, right on desktop ──
export const kiyoZone: PhoneZoneConfig = {
  mobile: { x: 50, y: 30, width: 50, height: 40 },
  tablet: { x: 55, y: 45, width: 35, height: 55 },
  desktop: { x: 55, y: 50, width: 30, height: 70 },
};

/**
 * Convert a phone zone's center position (viewport %) to Three.js world coords.
 * The Canvas camera is at [0, 0.2, 4] with fov=50, so visible area is roughly:
 *   X: -3.7 to +3.7 (at z=0)
 *   Y: -3.3 to +3.9 (shifted up by camera y=0.2)
 */
export const zoneToThreePosition = (
  zone: PhoneZone,
): { x: number; y: number } => {
  // Map 0-100% to Three.js world coordinates
  // X: 0% = -3.7, 100% = +3.7
  const x = ((zone.x / 100) * 2 - 1) * 3.7;
  // Y: 0% = +3.9 (top), 100% = -3.3 (bottom), shifted by camera offset
  const y = 3.9 - (zone.y / 100) * 7.2;

  return { x, y };
};

/**
 * Get the phone zone for the current viewport width.
 */
export const getActiveZone = (
  config: PhoneZoneConfig,
  vw: number,
): PhoneZone => {
  if (vw < 600) return config.mobile;
  if (vw < 1200) return config.tablet;
  return config.desktop;
};
