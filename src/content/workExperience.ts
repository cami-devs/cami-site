import type { WorkExperience } from './types'

/**
 * PLACEHOLDER LINKS — every url is '#' until the real notes/write-ups exist.
 * Swap them in per entry when ready.
 */
export const workExperience: WorkExperience[] = [
  {
    slug: 'rogers-investment-advisors',
    role: '@ Rogers Investment Advisors (Tokyo)',
    summary: 'Automated extraction for 300+ fund PDFs; analyzed Japanese M&A vs. IPO exits.',
    link: { label: 'notes ↗', url: '/notes/rogers-investment-advisors' },
    featured: true,
    photo: '/work/rogers.jpeg',
  },
  {
    slug: 'accordance-ai',
    role: '@ Accordance AI (SF)',
    summary: 'Built the core evaluation harness for domain-specific models from scratch.',
    link: { label: 'notes ↗', url: '/notes/accordance-ai' },
    photo: '/work/accordance.jpeg',
  },
  {
    slug: 'polaris-partners',
    role: '@ Polaris Partners (SF)',
    summary: 'Screened 80+ healthcare AI startups across inpatient monitoring and care navigation.',
    link: { label: 'notes ↗', url: '/notes/polaris-partners' },
    featured: true,
    photo: '/work/polaris.jpeg',
  },
  {
    slug: 'stanford-pacific-fund',
    role: '@ Stanford Pacific Fund (Palo Alto)',
    summary: 'Built bottom-up DCF and modeled working capital cycle for Costco.',
    link: { label: 'notes ↗', url: '/notes/stanford-pacific-fund' },
  },
]
