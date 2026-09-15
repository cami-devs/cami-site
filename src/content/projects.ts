import type { Project } from './types'

/**
 * PLACEHOLDER LINKS — code/writeup/notes URLs are '#' until the real ones exist.
 * Swap them in per entry when ready.
 */
export const projects: Project[] = [
  {
    slug: 'institutional-holdings-13f',
    title: '13F fund correlation and sector rotation',
    links: [
      { label: 'code ↗', url: '#' },
      { label: 'writeup ↗', url: '#' },
    ],
  },
  {
    slug: 'eval-harness',
    title: 'Model Eval Harness',
    links: [{ label: 'code ↗', url: '#' }],
    hidden: true,
  },
  {
    slug: 'haptic-metronome',
    title:
      'microcontroller tempo detection for haptic metronome',
    links: [{ label: 'notes ↗', url: '#' }],
  },
  {
    slug: 'm3-municipal-energy',
    title: 'M3 Energy Grid',
    links: [{ label: 'summary ↗', url: '#' }],
    hidden: true,
  },
  {
    slug: 'photobooth',
    title: 'Photobooth',
    links: [{ label: 'coming soon' }],
    hidden: true,
  },
]
