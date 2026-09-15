/**
 * Minimal Voronoi for a handful of seeds, built by half-plane clipping.
 *
 * A seed's Voronoi cell is every point closer to it than to any other seed.
 * "Closer to i than to j" is exactly one side of the perpendicular bisector
 * of i and j, so the cell is the panel rectangle clipped once per other
 * seed. At ~10 seeds that's ~90 clips per frame, which is nothing — no
 * Delaunay triangulation (and no dependency) required.
 */

export type Pt = [number, number]

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Sutherland–Hodgman: clip a convex polygon down to the half-plane f(p) <= 0 */
function clipHalfPlane(poly: Pt[], f: (p: Pt) => number): Pt[] {
  const out: Pt[] = []
  for (let k = 0; k < poly.length; k++) {
    const a = poly[k]
    const b = poly[(k + 1) % poly.length]
    const fa = f(a)
    const fb = f(b)
    if (fa <= 0) out.push(a)
    // the edge crosses the boundary — add the crossing point
    if (fa <= 0 !== fb <= 0) {
      const t = fa / (fa - fb)
      out.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])])
    }
  }
  return out
}

/** the cell for seeds[i], as a polygon clipped to the [0,0,width,height] box */
export function voronoiCell(seeds: Pt[], i: number, width: number, height: number): Pt[] {
  let poly: Pt[] = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ]
  const [ix, iy] = seeds[i]
  for (let j = 0; j < seeds.length; j++) {
    if (j === i || poly.length === 0) continue
    const [jx, jy] = seeds[j]
    // bisector of i and j: normal points from i toward j, through the midpoint.
    // coincident seeds give a zero normal, which clips nothing — no divide-by-zero.
    const nx = jx - ix
    const ny = jy - iy
    const mx = (ix + jx) / 2
    const my = (iy + jy) / 2
    poly = clipHalfPlane(poly, (p) => (p[0] - mx) * nx + (p[1] - my) * ny)
  }
  return poly
}

export function toPath(poly: Pt[]): string {
  if (poly.length < 3) return ''
  return `M${poly.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L')}Z`
}

const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1])

/**
 * The full mesh: every cell, the deduplicated Voronoi boundary segments, and
 * the Delaunay neighbour pairs.
 *
 * Delaunay falls out of the Voronoi for free — the two are duals, so seeds i
 * and j are neighbours exactly when their cells share an edge. Each cell edge
 * either sits on the panel border (nothing equidistant) or on the bisector of
 * exactly one other seed, which is the neighbour. Deduplicating the segments
 * matters for the dashed wireframe: drawing a shared edge twice from opposite
 * directions puts the two dash patterns out of phase and reads as a solid line.
 */
export function tessellate(seeds: Pt[], width: number, height: number) {
  const cells = seeds.map((_, i) => voronoiCell(seeds, i, width, height))
  const tol = 1e-6 * (width + height)

  const segments: [Pt, Pt][] = []
  const seenSegment = new Set<string>()
  const neighbors: [number, number][] = []
  const seenPair = new Set<string>()

  cells.forEach((poly, i) => {
    for (let k = 0; k < poly.length; k++) {
      const a = poly[k]
      const b = poly[(k + 1) % poly.length]

      // Clipping can leave a zero-length edge where several cells meet at one
      // point (a perfect grid does this). Its midpoint is that meeting point,
      // equidistant to every seed around it, which would report diagonal seeds
      // as neighbours. It draws nothing either way, so drop it.
      if (dist(a, b) < tol) continue

      const ends = [
        `${a[0].toFixed(2)},${a[1].toFixed(2)}`,
        `${b[0].toFixed(2)},${b[1].toFixed(2)}`,
      ].sort()
      const segmentKey = ends.join('|')
      if (!seenSegment.has(segmentKey)) {
        seenSegment.add(segmentKey)
        segments.push([a, b])
      }

      const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
      const own = dist(mid, seeds[i])
      for (let j = 0; j < seeds.length; j++) {
        if (j === i) continue
        if (Math.abs(dist(mid, seeds[j]) - own) > tol) continue
        const pairKey = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seenPair.has(pairKey)) {
          seenPair.add(pairKey)
          neighbors.push([i, j])
        }
      }
    }
  })

  return { cells, segments, neighbors }
}

export function segmentsToPath(segments: [Pt, Pt][]): string {
  return segments
    .map(([a, b]) => `M${a[0].toFixed(1)},${a[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}`)
    .join('')
}

export { clamp }
