import { useEffect, useRef } from 'react'
import { photos } from '../content/photos'
import styles from './Collage.module.css'

/**
 * An infinite horizontal carousel riding a fixed curve: y = -AMPLITUDE · sin(K·x).
 *
 * The curve and every card's vertical offset are both pure functions of x,
 * computed once at module load (not per animation frame) — so a card is
 * simply placed wherever the curve already is at its x (centerY - A·sin(kx),
 * via a translate(-50%, -50%) pull-back), no per-frame sync logic needed.
 * The only thing that changes on each requestAnimationFrame tick is a single
 * translateX on the shared `.track` element, which carries the curve, its
 * x-axis annotations, and every card left together in one transform write.
 *
 * Looping: COPIES sets of the photos are laid end to end (COPIES · TRACK px
 * of content). The track's scroll offset wraps via `% TRACK`, and because at
 * least two full copies are always rendered past the visible viewport, a
 * copy is always in place to slide into view — no jump, no gap.
 *
 * PADDING_X shifts every frame (and the curve/x-axis under it) right by half
 * a frame plus a margin, so the first frame never starts flush against the
 * viewport's left edge — without it, the frame at x=0 renders half-clipped
 * at rest (and permanently, under prefers-reduced-motion, since the track
 * never moves).
 */
const COUNT = photos.length
const COPIES = 3
const FRAME_W = 192 // px
const FRAME_H = 240 // px — tall, polaroid-ish
const AMPLITUDE = 40 // px
const WAVELENGTH = 640 // px per full 2π cycle
const GAP = 280 // px — center-to-center spacing along the track
const TRACK = COUNT * GAP // one loop length
const DRIFT_SPEED = 40 // px/sec
const K = (2 * Math.PI) / WAVELENGTH
const VIEWPORT_HEIGHT = FRAME_H + AMPLITUDE * 2
const CURVE_WIDTH = COPIES * TRACK
const SAMPLE_STEP = 8 // px between SVG path samples
const PADDING_X = FRAME_W / 2 + 40 // keeps every frame clear of the viewport edge at rest
const Y_AXIS_X = 20 // px — fixed left-edge ruler position
const TICK_LEN = 6 // px — axis tick mark length

function waveY(x: number): number {
  return -AMPLITUDE * Math.sin(K * x)
}

const curvePath = (() => {
  const steps = Math.ceil(CURVE_WIDTH / SAMPLE_STEP)
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const x = Math.min(i * SAMPLE_STEP, CURVE_WIDTH)
    const y = VIEWPORT_HEIGHT / 2 + waveY(x)
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' '
  }
  return d
})()

const frames = Array.from({ length: COUNT * COPIES }, (_, j) => {
  const photo = photos[j % COUNT]
  const x = j * GAP + PADDING_X
  return {
    key: j,
    ...photo,
    x,
    top: VIEWPORT_HEIGHT / 2 + waveY(x),
  }
})

// one reference cycle of x-axis ticks, drawn at the curve's true origin —
// these scroll with the curve since they live in the same coordinate space
const X_TICKS = [
  { x: 0, label: '0' },
  { x: WAVELENGTH / 4, label: 'π/2' },
  { x: WAVELENGTH / 2, label: 'π' },
  { x: (3 * WAVELENGTH) / 4, label: '3π/2' },
  { x: WAVELENGTH, label: '2π' },
]
const BASELINE_Y = VIEWPORT_HEIGHT / 2

export default function Collage() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf = 0
    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      const t = (now - start) / 1000
      const scroll = (DRIFT_SPEED * t) % TRACK
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${(-scroll).toFixed(2)}px, 0, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.tag}>FIG 1.0 — PARAMETRIC GALLERY [y = A · sin(kx)]</figcaption>

      <div className={styles.viewport} style={{ height: `${VIEWPORT_HEIGHT}px` }}>
        <div className={styles.track} ref={trackRef}>
          <svg
            className={styles.wave}
            width={CURVE_WIDTH}
            height={VIEWPORT_HEIGHT}
            aria-hidden="true"
          >
            <line
              className={styles.axis}
              x1={0}
              y1={BASELINE_Y}
              x2={CURVE_WIDTH}
              y2={BASELINE_Y}
            />
            <path d={curvePath} className={styles.curve} />

            {/* origin crosshair at (0, 0) */}
            <g className={styles.tickGroup}>
              <line x1={0} y1={BASELINE_Y - TICK_LEN} x2={0} y2={BASELINE_Y + TICK_LEN} />
              <line x1={-TICK_LEN} y1={BASELINE_Y} x2={TICK_LEN} y2={BASELINE_Y} />
              <text x={6} y={BASELINE_Y - TICK_LEN - 4} className={styles.originLabel}>
                (0, 0)
              </text>
            </g>

            {/* x-axis ticks for one reference cycle, in true curve coordinates */}
            {X_TICKS.map((t) => (
              <g key={t.label} className={styles.tickGroup}>
                <line x1={t.x} y1={BASELINE_Y - TICK_LEN} x2={t.x} y2={BASELINE_Y + TICK_LEN} />
                <text x={t.x} y={BASELINE_Y + TICK_LEN + 14} textAnchor="middle">
                  {t.label}
                </text>
              </g>
            ))}
            <text x={WAVELENGTH + 16} y={BASELINE_Y + TICK_LEN + 14} className={styles.tickGroup}>
              x →
            </text>
          </svg>

          {frames.map((frame) => (
            <div
              key={frame.key}
              className={styles.frame}
              style={{
                left: `${frame.x}px`,
                top: `${frame.top}px`,
                width: `${FRAME_W}px`,
                height: `${FRAME_H}px`,
              }}
            >
              <div className={styles.photo}>
                <img src={frame.src} alt={frame.alt} />
              </div>
            </div>
          ))}
        </div>

        {/* fixed y-axis ruler — amplitude is constant along x, so it stays
            pinned to the left edge instead of scrolling with the track */}
        <svg
          className={styles.yAxisOverlay}
          width="100%"
          height={VIEWPORT_HEIGHT}
          aria-hidden="true"
        >
          <rect x={0} y={0} width={48} height={VIEWPORT_HEIGHT} className={styles.yAxisBacking} />
          <line
            className={styles.axis}
            x1={Y_AXIS_X}
            y1={0}
            x2={Y_AXIS_X}
            y2={VIEWPORT_HEIGHT}
          />
          <g className={styles.tickGroup}>
            <line
              x1={Y_AXIS_X - TICK_LEN}
              y1={BASELINE_Y - AMPLITUDE}
              x2={Y_AXIS_X + TICK_LEN}
              y2={BASELINE_Y - AMPLITUDE}
            />
            <text x={Y_AXIS_X + TICK_LEN + 4} y={BASELINE_Y - AMPLITUDE + 3}>
              +A
            </text>
            <line
              x1={Y_AXIS_X - TICK_LEN}
              y1={BASELINE_Y}
              x2={Y_AXIS_X + TICK_LEN}
              y2={BASELINE_Y}
            />
            <text x={Y_AXIS_X + TICK_LEN + 4} y={BASELINE_Y + 3}>
              0
            </text>
            <line
              x1={Y_AXIS_X - TICK_LEN}
              y1={BASELINE_Y + AMPLITUDE}
              x2={Y_AXIS_X + TICK_LEN}
              y2={BASELINE_Y + AMPLITUDE}
            />
            <text x={Y_AXIS_X + TICK_LEN + 4} y={BASELINE_Y + AMPLITUDE + 3}>
              −A
            </text>
          </g>
          <text
            x={12}
            y={BASELINE_Y}
            className={styles.yAxisLabel}
            transform={`rotate(-90 12 ${BASELINE_Y})`}
          >
            y = sin(x)
          </text>
        </svg>
      </div>
    </figure>
  )
}
