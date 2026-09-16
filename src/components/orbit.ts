/**
 * Pure geometry for the elliptical orbit plane, kept separate from the
 * component so it can be reasoned about (and tested) on its own.
 *
 * Every orbit is an ellipse centred on the canvas origin, tilted by `rot`.
 * A point at parametric angle θ is the axis-aligned point (rx cos θ, ry sin θ)
 * rotated by that tilt:
 *
 *   x = cx + rx·cos θ·cos rot − ry·sin θ·sin rot
 *   y = cy + rx·cos θ·sin rot + ry·sin θ·cos rot
 *
 * Orbits are authored in *panel-relative* units: 1 means "reaches the edge of
 * the panel". At paint time each orbit is stretched by its own (sx, sy) so it
 * fills a tall, narrow panel as readily as a wide one — no single outsized
 * orbit forces the rest to shrink with it. Disc diameters are in px and scale
 * separately: the photos are the point, so they render at full size whenever
 * they fit and the orbits take whatever room is left.
 */

export type Orbit = {
  /** semi-axis along the orbit's own x, panel-relative (1 = panel edge) */
  rx: number
  /** semi-axis along the orbit's own y, panel-relative (1 = panel edge) */
  ry: number
  /** tilt, radians */
  rot: number
  /** starting parametric angle, radians */
  theta0: number
  /** radians per frame at 60fps; negative orbits run the other way */
  speed: number
}

const deg = (d: number) => (d * Math.PI) / 180

// theta0 values come from a numeric search that maximises the smallest
// edge-to-edge gap between discs on load and over the first ~40s of motion,
// so the photos open spread across the panel instead of stacked in one spot
export const ORBITS: Orbit[] = [
  { rx: 1.0, ry: 0.4, rot: deg(-15), theta0: 0.21, speed: 0.0012 }, // wide horizontal
  { rx: 0.45, ry: 1.0, rot: deg(10), theta0: 1.64, speed: -0.001 }, // tall vertical
  { rx: 1.0, ry: 0.5, rot: deg(-50), theta0: 5.95, speed: 0.0014 }, // diagonal left
  { rx: 0.5, ry: 0.5, rot: deg(0), theta0: 2.72, speed: -0.0011 }, // inner ring
  { rx: 1.0, ry: 0.45, rot: deg(50), theta0: 2.66, speed: 0.0009 }, // diagonal right
  { rx: 0.7, ry: 0.95, rot: deg(-25), theta0: 0.92, speed: -0.0013 }, // steep diagonal
]

export const DIAMETERS = [160, 168, 176, 180, 172, 164]

const STIFFNESS = 0.12
const DAMPING = 0.78
const MAX_DISC_R = Math.max(...DIAMETERS) / 2
const MARGIN = 8
/** the most of the available half-extent the widest disc may claim */
const DISC_SHARE = 0.55

/** half-width and half-height of a tilted ellipse's bounding box */
export function extent(orbit: Orbit): { halfW: number; halfH: number } {
  const { rx, ry, rot } = orbit
  return {
    halfW: Math.hypot(rx * Math.cos(rot), ry * Math.sin(rot)),
    halfH: Math.hypot(rx * Math.sin(rot), ry * Math.cos(rot)),
  }
}

/** point on the orbit at parametric angle θ, in ideal units relative to the origin */
export function orbitPoint(orbit: Orbit, theta: number): { x: number; y: number } {
  const { rx, ry, rot } = orbit
  const cos = Math.cos(rot)
  const sin = Math.sin(rot)
  return {
    x: rx * Math.cos(theta) * cos - ry * Math.sin(theta) * sin,
    y: rx * Math.cos(theta) * sin + ry * Math.sin(theta) * cos,
  }
}

const sqDist = (orbit: Orbit, theta: number, lx: number, ly: number) => {
  const dx = orbit.rx * Math.cos(theta) - lx
  const dy = orbit.ry * Math.sin(theta) - ly
  return dx * dx + dy * dy
}

/**
 * The θ whose orbit point is closest to (x, y) — i.e. project a dragged disc
 * back onto its ellipse. Exact closest-point-on-ellipse is a quartic, so this
 * brackets the minimum with a coarse sweep and then polishes it with Newton
 * on d(distance²)/dθ, keeping the sweep answer if Newton wanders off.
 */
export function projectTheta(orbit: Orbit, x: number, y: number): number {
  const cos = Math.cos(orbit.rot)
  const sin = Math.sin(orbit.rot)
  // rotate the point into the ellipse's own frame, where it's axis-aligned
  const lx = x * cos + y * sin
  const ly = -x * sin + y * cos

  const SAMPLES = 180
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2
    const d = sqDist(orbit, t, lx, ly)
    if (d < bestD) {
      bestD = d
      best = t
    }
  }

  let theta = best
  const { rx, ry } = orbit
  for (let i = 0; i < 8; i++) {
    const c = Math.cos(theta)
    const s = Math.sin(theta)
    // f = (rx·cosθ − lx)² + (ry·sinθ − ly)²
    const d1 = -2 * rx * s * (rx * c - lx) + 2 * ry * c * (ry * s - ly)
    const d2 =
      -2 * rx * c * (rx * c - lx) +
      2 * rx * rx * s * s -
      2 * ry * s * (ry * s - ly) +
      2 * ry * ry * c * c
    if (Math.abs(d2) < 1e-9) break
    const next = theta - d1 / d2
    if (!Number.isFinite(next)) break
    if (sqDist(orbit, next, lx, ly) > bestD) break // Newton made it worse — stop
    theta = next
    bestD = sqDist(orbit, theta, lx, ly)
  }

  return ((theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
}

/** px per panel-relative unit, per screen axis, for one orbit */
export type AxisScale = { sx: number; sy: number }

export type PlaneFit = {
  /** multiplier for disc diameters */
  discScale: number
  /** one entry per orbit — each orbit is stretched to the panel on its own */
  axes: AxisScale[]
}

/**
 * Split the panel between disc size and orbit extent.
 *
 * Each orbit gets its own horizontal and vertical stretch: panel-relative 1
 * maps to "the panel edge, minus this disc's radius", so every disc stays
 * fully inside the panel along its whole path. An orbit whose tilted bounding
 * box pokes past ±1 is scaled down just enough to fit — only that orbit, never
 * the others.
 */
export function fitPlane(w: number, h: number): PlaneFit {
  const availW = Math.max(0, w / 2 - MARGIN)
  const availH = Math.max(0, h / 2 - MARGIN)
  const discScale = Math.min(1, (Math.min(availW, availH) * DISC_SHARE) / MAX_DISC_R)

  const axes = ORBITS.map((orbit, i) => {
    const discR = (DIAMETERS[i] / 2) * discScale
    const { halfW, halfH } = extent(orbit)
    const fit = Math.min(1, 1 / halfW, 1 / halfH)
    return {
      sx: Math.max(0, availW - discR) * fit,
      sy: Math.max(0, availH - discR) * fit,
    }
  })

  return { discScale, axes }
}

/** panel-relative orbit point → px offset from the panel centre */
export function toPixels(point: { x: number; y: number }, scale: AxisScale) {
  return { x: point.x * scale.sx, y: point.y * scale.sy }
}

/** px offset from the panel centre → panel-relative units for that orbit */
export function fromPixels(x: number, y: number, scale: AxisScale) {
  return { x: scale.sx > 0 ? x / scale.sx : 0, y: scale.sy > 0 ? y / scale.sy : 0 }
}

/**
 * SVG path for an orbit, in px around (cx, cy). A tilted ellipse stretched
 * unevenly on x and y is still an ellipse, but no longer one SVG's <ellipse>
 * can express with a single rotate — so it's sampled into a closed polyline.
 */
export function orbitPath(orbit: Orbit, scale: AxisScale, cx: number, cy: number): string {
  const SEGMENTS = 120
  let d = ''
  for (let i = 0; i < SEGMENTS; i++) {
    const p = toPixels(orbitPoint(orbit, (i / SEGMENTS) * Math.PI * 2), scale)
    d += `${i === 0 ? 'M' : 'L'}${(cx + p.x).toFixed(1)},${(cy + p.y).toFixed(1)}`
  }
  return d + 'Z'
}

/** one damped-spring step of a value toward a target */
export function springStep(value: number, velocity: number, target: number) {
  let v = velocity
  v += (target - value) * STIFFNESS
  v *= DAMPING
  return { value: value + v, velocity: v }
}

export const MAX_DISC_RADIUS = MAX_DISC_R
export const PLANE_MARGIN = MARGIN
