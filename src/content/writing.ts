import type { WritingEntry } from './types'

/**
 * Homepage teaser copy — just a title and a link. Full title and text live
 * at /writing/:slug (content/essays.ts, transcribed from the PDFs in
 * public/writing/).
 */
export const writing: WritingEntry[] = [
  {
    slug: 'uniswap-default-slippage',
    title: 'slippage change impact on trader behavior in DEX markets',
    link: {
      label: 'ssrn ↗',
      url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4674478',
    },
    featured: true,
  },
  {
    slug: 'venture-capital-gatekeeper',
    title: 'do vc incentives gatekeep biotech innovations?',
    link: { label: 'read ↗', url: '/writing/venture-capital-gatekeeper' },
  },
  {
    slug: 'schubert-musical-architecture',
    title: 'rhetorical analysis of schubert impromptu op. 90 no. 3 (piano)',
    link: { label: 'read ↗', url: '/writing/schubert-musical-architecture' },
  },
  {
    slug: 'keynesian-multipliers',
    title: 'Keynesian Multipliers',
    link: { label: 'read ↗', url: '/writing/keynesian-multipliers' },
    hidden: true,
  },
]
