import type { WritingEntry } from './types'

/**
 * Homepage teaser copy — just a title and a link. Full title and text live
 * at /writing/:slug (content/essays.ts, transcribed from the PDFs in
 * public/writing/).
 */
export const writing: WritingEntry[] = [
  {
    slug: 'uniswap-default-slippage',
    title: 'how a slippage change impacts trader behavior on dex markets',
    link: {
      label: 'ssrn ↗',
      url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4674478',
    },
  },
  {
    slug: 'venture-capital-gatekeeper',
    title: 'do vc incentives gatekeep biotech innovations?',
    link: { label: 'read ↗', url: '/writing/venture-capital-gatekeeper' },
  },
  {
    slug: 'schubert-musical-architecture',
    title: 'schubert piano piece rhetorical analysis (impromptu op. 90 no. 3)',
    link: { label: 'read ↗', url: '/writing/schubert-musical-architecture' },
  },
  {
    slug: 'keynesian-multipliers',
    title: 'Keynesian Multipliers',
    link: { label: 'read ↗', url: '/writing/keynesian-multipliers' },
    hidden: true,
  },
]
