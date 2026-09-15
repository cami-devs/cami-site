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
 * Sizes are in ideal units and converted to pixels at paint time. Discs and
 * orbits scale by *different* factors on purpose: the photos are the point,
 * so they render at full size whenever they fit and the orbits take whatever
 * room is left.
 */

export type Orbit = {
  /** semi-axis along the orbit's own x, ideal units */
  rx: number
  /** semi-axis along the orbit's own y, ideal units */
  ry: number
  /** tilt, radians */
  rot: number
  /** starting parametric angle, radians */
  theta0: number
  /** radians per frame at 60fps; negative orbits run the other way */
  speed: number
}

const deg = (d: number) => (d * Math.PI) / 180

export const ORBITS: Orbit[] = [
  { rx: 360, ry: 130, rot: deg(-15), theta0: 0, speed: 0.0012 }, // wide horizontal
  { rx: 140, ry: 330, rot: deg(20), theta0: 1.1, speed: -0.001 }, // tall vertical
  { rx: 290, ry: 170, rot: deg(-45), theta0: 2.2, speed: 0.0014 }, // diagonal left
  { rx: 190, ry: 180, rot: deg(0), theta0: 3.3, speed: -0.0011 }, // inner ring
  { rx: 400, ry: 140, rot: deg(40), theta0: 4.4, speed: 0.0009 }, // diagonal right
  { rx: 220, ry: 300, rot: deg(-30), theta0: 5.4, speed: -0.0013 }, // steep diagonal
]

export const DIAMETERS = [140, 150, 160, 170, 185, 200]

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

export type PlaneFit = {
  /** multiplier for disc diameters */
  discScale: number
  /** multiplier for orbit axes */
  orbitScale: number
}

/**
 * Split the panel between disc size and orbit extent.
 *
 * Each disc must stay inside the panel everywhere along its own orbit, so the
 * orbit factor is the tightest constraint across every disc and both axes.
 */
export function fitPlane(w: number, h: number): PlaneFit {
  const availW = Math.max(0, w / 2 - MARGIN)
  const availH = Math.max(0, h / 2 - MARGIN)
  const discScale = Math.min(1, (Math.min(availW, availH) * DISC_SHARE) / MAX_DISC_R)

  let orbitScale = Infinity
  ORBITS.forEach((orbit, i) => {
    const discR = (DIAMETERS[i] / 2) * discScale
    const { halfW, halfH } = extent(orbit)
    orbitScale = Math.min(orbitScale, (availW - discR) / halfW, (availH - discR) / halfH)
  })

  return { discScale, orbitScale: Math.max(0, Math.min(1, orbitScale)) }
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
