import { useEffect, useRef, useState } from 'react'
import { photos } from '../content/photos'
import { clamp, segmentsToPath, tessellate, type Pt } from './voronoi'
import styles from './Tessellation.module.css'

/**
 * Photo cards floating on a live Voronoi/Delaunay mesh.
 *
 * The mesh is structure, not a mask: each photo sits in a framed card centred
 * on its seed, while the wireframe behind shows the partition those seeds
 * create. Drag a card and the whole lattice re-solves around it.
 *
 * Seeds live in normalized [0,1] panel coordinates, so a resize is just a
 * re-multiply. Each has a fixed "home" (moved only by dragging) plus a bounded
 * sinusoidal wander — it breathes forever without drifting away the way a
 * random walk would.
 *
 * Per frame the loop writes geometry straight to the DOM through refs (two
 * mesh paths + one transform per card), so 60fps costs zero React re-renders.
 */
const CARD_W = 128
const CARD_H = 176
const WANDER = 0.012 // how far a seed drifts from home, as a fraction of the panel
const WANDER_SPEED = 0.35 // radians/sec

type Seed = {
  src: string
  alt: string
  homeX: number
  homeY: number
  phaseX: number
  phaseY: number
}

/** lay the seeds out on a grid that adapts to however many photos exist */
function makeSeeds(): Seed[] {
  const cols = Math.ceil(Math.sqrt(photos.length))
  const rows = Math.ceil(photos.length / cols)
  return photos.map((photo, i) => {
    const row = Math.floor(i / cols)
    // a partial last row spreads across the full width instead of bunching left
    const inRow = Math.min(cols, photos.length - row * cols)
    return {
      ...photo,
      homeX: ((i % cols) + 0.5) / inRow,
      homeY: (row + 0.5) / rows,
      phaseX: i * 1.7,
      phaseY: i * 2.9 + 1.1,
    }
  })
}

/** where a seed actually sits right now, in panel pixels */
function seedPoint(seed: Seed, t: number, w: number, h: number): Pt {
  return [
    clamp(seed.homeX + WANDER * Math.sin(t * WANDER_SPEED + seed.phaseX), 0, 1) * w,
    clamp(seed.homeY + WANDER * Math.cos(t * WANDER_SPEED + seed.phaseY), 0, 1) * h,
  ]
}

export default function Tessellation() {
  const stageRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const voronoiRef = useRef<SVGPathElement>(null)
  const delaunayRef = useRef<SVGPathElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // built once; the objects inside are mutated in place by dragging, which
  // never needs to trigger a re-render — the animation loop reads them directly
  const [seeds] = useState(makeSeeds)

  const grabRef = useRef<{ index: number; dx: number; dy: number } | null>(null)
  const activeRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!size) return
    const { w, h } = size
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const paint = () => {
      const t = timeRef.current
      const points = seeds.map((seed) => seedPoint(seed, t, w, h))
      const { segments, neighbors } = tessellate(points, w, h)

      voronoiRef.current?.setAttribute('d', segmentsToPath(segments))
      delaunayRef.current?.setAttribute(
        'd',
        segmentsToPath(neighbors.map(([i, j]) => [points[i], points[j]])),
      )

      points.forEach(([px, py], i) => {
        const card = cardRefs.current[i]
        if (card) {
          card.style.transform = `translate3d(${(px - CARD_W / 2).toFixed(1)}px, ${(py - CARD_H / 2).toFixed(1)}px, 0)`
        }
      })

      const active = activeRef.current
      if (readoutRef.current) {
        readoutRef.current.textContent =
          active === null
            ? 'ACTIVE NODE: (—, —)'
            : `ACTIVE NODE: (${Math.round(points[active][0])}, ${Math.round(points[active][1])})`
      }
    }

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      // freezing time (rather than zeroing the wander) keeps every idle seed
      // exactly where it is while one is being dragged
      if (grabRef.current === null && !prefersReduced) {
        timeRef.current += (now - last) / 1000
      }
      last = now
      paint()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [size, seeds])

  const handlePointerDown = (i: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!stage || !size) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const rect = stage.getBoundingClientRect()
    const [px, py] = seedPoint(seeds[i], timeRef.current, size.w, size.h)
    // remember where inside the card it was grabbed, so it doesn't jump
    grabRef.current = {
      index: i,
      dx: event.clientX - rect.left - px,
      dy: event.clientY - rect.top - py,
    }
    activeRef.current = i
    event.currentTarget.style.zIndex = '3'
  }

  const handlePointerMove = (i: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    const grab = grabRef.current
    const stage = stageRef.current
    if (!grab || grab.index !== i || !stage) return
    const rect = stage.getBoundingClientRect()
    const seed = seeds[i]
    const t = timeRef.current
    // time is frozen mid-drag, so subtract the (now constant) wander offset to
    // land the seed exactly where the cursor wants it
    seed.homeX = clamp(
      (event.clientX - rect.left - grab.dx) / rect.width -
        WANDER * Math.sin(t * WANDER_SPEED + seed.phaseX),
      0,
      1,
    )
    seed.homeY = clamp(
      (event.clientY - rect.top - grab.dy) / rect.height -
        WANDER * Math.cos(t * WANDER_SPEED + seed.phaseY),
      0,
      1,
    )
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId)
    event.currentTarget.style.zIndex = ''
    grabRef.current = null
  }

  return (
    <figure className={styles.panel}>
      <figcaption className={styles.caption}>
        <span>FIG 1.0 — DYNAMIC PLANAR TESSELLATION [DELAUNAY // VORONOI]</span>
        <span ref={readoutRef} className={styles.readout}>
          ACTIVE NODE: (—, —)
        </span>
      </figcaption>

      <div className={styles.stage} ref={stageRef}>
        {size && (
          <svg className={styles.mesh} width={size.w} height={size.h} aria-hidden="true">
            <path ref={delaunayRef} className={styles.connector} />
            <path ref={voronoiRef} className={styles.wire} />
          </svg>
        )}

        {seeds.map((seed, i) => (
          <div
            key={seed.src}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className={styles.cardAnchor}
            style={{ width: `${CARD_W}px`, height: `${CARD_H}px` }}
            onPointerDown={handlePointerDown(i)}
            onPointerMove={handlePointerMove(i)}
            onPointerUp={handlePointerUp}
            onPointerEnter={() => {
              activeRef.current = i
            }}
            onPointerLeave={() => {
              if (grabRef.current === null) activeRef.current = null
            }}
          >
            <div className={styles.card}>
              <img src={seed.src} alt={seed.alt} draggable={false} />
              <span className={styles.node} aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}
