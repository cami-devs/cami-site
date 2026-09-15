import { useState } from 'react'
import styles from './SierpinskiBullet.module.css'

/**
 * A list bullet that's a tiny clickable Sierpinski triangle — click cycles
 * through recursion depths (0 = solid triangle, up to MAX_DEPTH), so the
 * fractal visibly gets more intricate each click, then resets.
 */
const MAX_DEPTH = 4

type Point = [number, number]

const P1: Point = [50, 6]
const P2: Point = [6, 94]
const P3: Point = [94, 94]

function midpoint(a: Point, b: Point): Point {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
}

function subdivide(depth: number, a: Point, b: Point, c: Point): Point[][] {
  if (depth === 0) return [[a, b, c]]
  const ab = midpoint(a, b)
  const bc = midpoint(b, c)
  const ca = midpoint(c, a)
  return [
    ...subdivide(depth - 1, a, ab, ca),
    ...subdivide(depth - 1, ab, b, bc),
    ...subdivide(depth - 1, ca, bc, c),
  ]
}

export default function SierpinskiBullet() {
  const [depth, setDepth] = useState(1)
  const triangles = subdivide(depth, P1, P2, P3)

  return (
    <button
      type="button"
      className={styles.bullet}
      onClick={() => setDepth((d) => (d + 1) % (MAX_DEPTH + 1))}
      aria-label={`Sierpinski fractal bullet, depth ${depth} — click to change`}
    >
      <svg viewBox="0 0 100 100" width="10" height="10" aria-hidden="true">
        {triangles.map((t, i) => (
          <polygon key={i} points={t.map((p) => p.join(',')).join(' ')} />
        ))}
      </svg>
    </button>
  )
}
