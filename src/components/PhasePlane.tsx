import { useEffect, useRef, useState } from 'react'
import { photos } from '../content/photos'
import {
  DIAMETERS,
  ORBITS,
  fitPlane,
  fromPixels,
  orbitPath,
  orbitPoint,
  projectTheta,
  springStep,
  toPixels,
} from './orbit'
import styles from './PhasePlane.module.css'

/**
 * Photo discs riding eccentric elliptical orbits around a shared origin.
 *
 * Each disc owns one tilted ellipse (see orbit.ts) and a parametric angle θ.
 * Idle, θ advances at that orbit's own authored rate; negative rates run the
 * orbit backwards, so neighbouring discs sweep past each other instead of
 * drifting in lockstep.
 *
 * Dragging lifts a disc off its orbit: θ freezes and an (offX, offY) offset
 * follows the cursor. On release the cursor point is projected back to the
 * closest θ on that disc's own ellipse and the leftover offset springs to
 * zero, so the disc glides onto its path instead of snapping to it.
 *
 * Per frame the loop writes transforms and attributes straight to the DOM
 * through refs, so 60fps costs zero React re-renders.
 */
const DISC_COUNT = Math.min(ORBITS.length, photos.length)

type Disc = {
  src: string
  alt: string
  size: number
  theta: number
  /** displacement from the orbit, in panel px — non-zero only while settling */
  offX: number
  offY: number
  voffX: number
  voffY: number
}

function makeDiscs(): Disc[] {
  return photos.slice(0, DISC_COUNT).map((photo, i) => ({
    ...photo,
    size: DIAMETERS[i],
    theta: ORBITS[i].theta0,
    offX: 0,
    offY: 0,
    voffX: 0,
    voffY: 0,
  }))
}

export default function PhasePlane() {
  const stageRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const vectorRef = useRef<SVGLineElement>(null)
  const orbitRefs = useRef<(SVGPathElement | null)[]>([])
  const discRefs = useRef<(HTMLDivElement | null)[]>([])

  // built once; mutated in place by the animation loop and by dragging, which
  // never needs to trigger a re-render
  const [discs] = useState(makeDiscs)

  const dragRef = useRef<number | null>(null)
  const activeRef = useRef<number | null>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const [methodOpen, setMethodOpen] = useState(false)

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
    const cx = w / 2
    const cy = h / 2
    const { discScale, axes } = fitPlane(w, h)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      // integer sub-steps keep the spring stable if a frame runs long
      const steps = Math.max(1, Math.min(3, Math.round(dt * 60)))

      discs.forEach((disc, i) => {
        const orbit = ORBITS[i]
        if (dragRef.current !== i) {
          // speeds are authored per frame at 60fps; dt keeps that frame-rate independent
          if (!prefersReduced) disc.theta += orbit.speed * dt * 60
          for (let s = 0; s < steps; s++) {
            const nx = springStep(disc.offX, disc.voffX, 0)
            const ny = springStep(disc.offY, disc.voffY, 0)
            disc.offX = nx.value
            disc.voffX = nx.velocity
            disc.offY = ny.value
            disc.voffY = ny.velocity
          }
        }

        const base = toPixels(orbitPoint(orbit, disc.theta), axes[i])
        const x = cx + base.x + disc.offX
        const y = cy + base.y + disc.offY
        const half = (disc.size * discScale) / 2
        const el = discRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${(x - half).toFixed(1)}px, ${(y - half).toFixed(1)}px, 0)`
        }
      })

      // telemetry for whichever disc is hovered or being dragged
      const active = activeRef.current
      orbitRefs.current.forEach((ellipse, i) => {
        ellipse?.classList.toggle(styles.orbitActive, active === i)
      })

      const vector = vectorRef.current
      if (vector) {
        if (active === null) {
          vector.setAttribute('opacity', '0')
        } else {
          const disc = discs[active]
          const base = toPixels(orbitPoint(ORBITS[active], disc.theta), axes[active])
          vector.setAttribute('opacity', '1')
          vector.setAttribute('x2', (cx + base.x + disc.offX).toFixed(1))
          vector.setAttribute('y2', (cy + base.y + disc.offY).toFixed(1))
        }
      }

      if (readoutRef.current) {
        if (active === null) {
          readoutRef.current.textContent = 'ORBITAL STATE: [r: —, θ: —]'
        } else {
          const disc = discs[active]
          const base = toPixels(orbitPoint(ORBITS[active], disc.theta), axes[active])
          const dx = base.x + disc.offX
          const dy = base.y + disc.offY
          const degrees = ((disc.theta * 180) / Math.PI) % 360
          readoutRef.current.textContent = `ORBITAL STATE: [r: ${Math.round(Math.hypot(dx, dy))}px, θ: ${Math.round(degrees < 0 ? degrees + 360 : degrees)}°]`
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [size, discs])

  const handlePointerDown = (i: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = i
    activeRef.current = i
    discs[i].voffX = 0
    discs[i].voffY = 0
    event.currentTarget.style.zIndex = '3'
  }

  const handlePointerMove = (i: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (dragRef.current !== i || !size || !stage) return
    const rect = stage.getBoundingClientRect()
    const scale = fitPlane(size.w, size.h).axes[i]
    const disc = discs[i]
    // θ is frozen mid-drag; the offset is what carries the disc to the cursor
    const base = toPixels(orbitPoint(ORBITS[i], disc.theta), scale)
    disc.offX = event.clientX - rect.left - rect.width / 2 - base.x
    disc.offY = event.clientY - rect.top - rect.height / 2 - base.y
  }

  const handlePointerUp = (i: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId)
    event.currentTarget.style.zIndex = ''
    dragRef.current = null
    if (!size) return

    const scale = fitPlane(size.w, size.h).axes[i]
    if (scale.sx <= 0 || scale.sy <= 0) return
    const disc = discs[i]
    const base = toPixels(orbitPoint(ORBITS[i], disc.theta), scale)
    const heldX = base.x + disc.offX
    const heldY = base.y + disc.offY

    // project where it was released onto this disc's own ellipse (in orbit
    // units), keeping the rendered position identical this frame so the glide
    // starts seamlessly
    const held = fromPixels(heldX, heldY, scale)
    const theta = projectTheta(ORBITS[i], held.x, held.y)
    const landing = toPixels(orbitPoint(ORBITS[i], theta), scale)
    disc.theta = theta
    disc.offX = heldX - landing.x
    disc.offY = heldY - landing.y
  }

  const { discScale, axes } = size ? fitPlane(size.w, size.h) : { discScale: 1, axes: [] }

  return (
    <figure className={styles.panel}>
      <figcaption className={styles.caption}>
        <span>FIG 1.0 — KEPLERIAN ORBIT PLANE [a, b, φ]</span>
        <span className={styles.captionRight}>
          <span ref={readoutRef} className={styles.readout}>
            ORBITAL STATE: [r: —, θ: —]
          </span>
          <button
            type="button"
            className={styles.methodology}
            aria-expanded={methodOpen}
            onClick={() => setMethodOpen((open) => !open)}
          >
            [methodology ↗]
          </button>
        </span>
      </figcaption>

      <div className={styles.stage} ref={stageRef}>
        {methodOpen && (
          <div className={styles.popover}>
            <p>
              <strong>Orbits.</strong> Each photo owns one ellipse sharing the canvas origin,
              with its own semi-axes and tilt φ. A point at parametric angle θ is the
              axis-aligned point (a cos θ, b sin θ) rotated by φ.
            </p>
            <p>
              <strong>Sweep rate.</strong> Each orbit carries its own angular rate, and half
              of them run negative — so adjacent discs counter-rotate and cross rather than
              travelling together.
            </p>
            <p>
              <strong>Re-entry.</strong> Dragging lifts a disc off its path. On release the
              cursor point is projected to the closest θ on that ellipse — a quartic, solved
              here by a coarse sweep polished with Newton — and the leftover offset springs
              to zero so the disc glides back into orbit.
            </p>
          </div>
        )}

        {size && (
          <svg className={styles.grid} width={size.w} height={size.h} aria-hidden="true">
            <line className={styles.axis} x1={0} y1={size.h / 2} x2={size.w} y2={size.h / 2} />
            <line className={styles.axis} x1={size.w / 2} y1={0} x2={size.w / 2} y2={size.h} />
            {ORBITS.slice(0, DISC_COUNT).map((orbit, i) => (
              <path
                key={`${orbit.rx}-${orbit.ry}-${orbit.rot}`}
                ref={(el) => {
                  orbitRefs.current[i] = el
                }}
                className={styles.orbit}
                d={orbitPath(orbit, axes[i], size.w / 2, size.h / 2)}
              />
            ))}
            <line
              ref={vectorRef}
              className={styles.vector}
              x1={size.w / 2}
              y1={size.h / 2}
              x2={size.w / 2}
              y2={size.h / 2}
              opacity="0"
            />
          </svg>
        )}

        {discs.map((disc, i) => (
          <div
            key={disc.src}
            ref={(el) => {
              discRefs.current[i] = el
            }}
            className={styles.discAnchor}
            style={{ width: `${disc.size * discScale}px`, height: `${disc.size * discScale}px` }}
            onPointerDown={handlePointerDown(i)}
            onPointerMove={handlePointerMove(i)}
            onPointerUp={handlePointerUp(i)}
            onPointerEnter={() => {
              activeRef.current = i
            }}
            onPointerLeave={() => {
              if (dragRef.current === null) activeRef.current = null
            }}
          >
            <div className={styles.disc}>
              <img src={disc.src} alt={disc.alt} draggable={false} />
            </div>
            <span className={styles.node} aria-hidden="true" />
          </div>
        ))}
      </div>
    </figure>
  )
}
