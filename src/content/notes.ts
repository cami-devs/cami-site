import type { Note, NoteBlock } from './types'

/**
 * Write-ups behind the [notes ↗] tags on the homepage, keyed by the slug of
 * the project or job they belong to. The /notes/:slug route renders whatever
 * is here, so a new section is a data edit — no component changes.
 *
 * Images live in src/assets/<slug>/ and are pulled in by the glob below, the
 * same way photos.ts and resume.ts do it: bundled once, content-hashed, and
 * referenced by filename rather than a hand-written path.
 */
const imageModules = import.meta.glob<string>(
  '/src/assets/*/*.{png,PNG,jpg,jpeg,JPG,JPEG,webp,WEBP,svg,SVG}',
  { eager: true, query: '?url', import: 'default' },
)

/** the bundled URL for src/assets/<folder>/<file>, or undefined if absent */
function asset(folder: string, file: string): string | undefined {
  return imageModules[`/src/assets/${folder}/${file}`]
}

/**
 * An image block, or nothing when the file hasn't been added yet — so a
 * missing asset leaves a gap in the page instead of breaking the build.
 */
function imageBlock(
  folder: string,
  file: string,
  alt: string,
  caption?: string,
): NoteBlock[] {
  const src = asset(folder, file)
  return src ? [{ type: 'image', src, alt, caption }] : []
}

export const notes: Note[] = [
  {
    slug: 'rogers-investment-advisors',
    title: 'rogers investment advisors (tokyo)',
    // this one is a job, so "← back" returns to Previous Work
    backTo: '/#previously',
    intro: [
      'an asset management firm in tokyo (',
      { text: 'rogersia.com', url: 'https://www.rogersia.com/' },
      '). i interned there for 8 weeks in summer 2026 through the stanford global studies program.',
    ],
    sections: [
      {
        id: 'what-i-did',
        title: 'what i did',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'fund-return extraction and validation',
                text: "fund managers send monthly pdf reports, and every one lays out its performance table differently. i built a tool that finds the table, extracts monthly returns with pdf parsing and ocr, and outputs structured json. to check it, i compounded the monthly returns myself and compared the result to the fund's reported ytd and cumulative figures. a mismatch meant either my extraction or the source was wrong. i added a review mode, cli tools, documentation, and regression tests, and tested it on reports with different layouts.",
              },
              {
                lead: 'japanese vc landscape',
                text: "researched japan's startup and funding ecosystem: unicorns, sector mix, notable investors, and how saas differs from r&d-heavy companies, verifying market-size and funding figures in speeda.",
              },
              {
                lead: 'datasets and tracking',
                text: 'kept monthly return histories for selected funds and built comparison datasets (the magnificent 7 against comparable europe and asia companies, plus asian infrastructure funds), standardized so markets could be compared.',
              },
            ],
          },
        ],
      },
      {
        id: 'what-i-learned',
        title: 'what i learned',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'prime brokers are a leverage-times-rate business',
                text: 'they earn on financing longs, rebates on shorts, and commissions on turnover, so they want your aum to grow.',
              },
              {
                lead: 'cfo vs. coo activism',
                text: 'balance-sheet changes are easier to force than operational ones, so aggressive campaigns skew financial.',
              },
              {
                lead: 'fund math',
                text: 'a 10% gross return becomes 6% for investors after 0.5% expenses, a 2% management fee, and 20% carry on the rest.',
              },
              {
                lead: 'seeding is changing',
                text: "the scarce asset used to be fee revenue, and now it's the strategy's capacity.",
              },
            ],
          },
        ],
      },
      {
        id: 'realizations',
        title: 'realizations',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'a lot of funds struggle to justify their fees',
                text: "many don't beat a simple market index like the s&p 500 after fees. a fund also has to cover fixed costs (people, data, systems, rent) before it earns anything. in the example we studied, $3m of costs at a 1% fee meant needing a $300m fund to break even.",
              },
              {
                lead: "incentives aren't what i expected",
                text: 'i assumed managers would take extreme risks to chase performance fees. but the 2% management fee pays whether or not the fund does well, so the easier way to get rich is to gather assets, not swing for returns. newer structures like "1 or 30" (the greater of a 1% fee or 30% of profits) tie pay more closely to performance.',
              },
              {
                lead: "what might not be for me",
                text: "i am so grateful to have the opportunity to see how a firm works in different kinds of alternatives investing! there was a lot that interested me (venture capital, activism funds, and private equity) but i did realize that running a fund, especially a fund of funds, may not be the most exciting place for me. working at such a place means meeting a constant stream of investors and keeping up with several sectors at once. this seems to be the case for many long only and long/short equity funds specifically. i'm more driven when working on one domain.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'accordance-ai',
    title: 'accordance ai',
    // a job, so "← back" returns to Previous Work
    backTo: '/#previously',
    intro:
      'an ai startup building multi-agent tools for tax accounting and audit, founded by researchers from the stanford ai lab. i was a software engineering intern on the engineering team in summer 2025.',
    sections: [
      {
        id: 'what-i-built',
        title: 'what i built',
        blocks: [
          {
            type: 'p',
            text: "early users were sending in around 50 loose messages of feedback a day, with no easy way to see where the model worked well and where it didn't. i built an internal tool to organize it. i sorted feedback along three axes (context length, regulatory complexity, and task classification) and gave each entry a baseline score relative to others in its category. it helped the engineering, product, and go-to-market teams see where the model was strongest and weakest, and it was meant as a first step toward benchmarking the company's model.",
          },
        ],
      },
      {
        id: 'what-was-hard',
        title: 'what was hard',
        blocks: [
          {
            type: 'p',
            text: 'i wanted the tool to produce results automatically, but that turned out to be hard to do well. the feedback was unstructured, and i had to sort many entries by hand first to understand what the categories should be. so the tool mixes simple algorithms (no ai) with an easy-to-read view for the product team, which keeps a human verifying the results.',
          },
        ],
      },
      {
        id: 'what-id-do-differently',
        title: "what i'd do differently",
        blocks: [
          {
            type: 'p',
            text: "in mid 2025, the benchmarks i could find mostly measured general academic intelligence rather than domain-specific work. today i'd start by researching newer benchmarking tools and try building on top of them, tailored to accordance's field, instead of starting from scratch.",
          },
        ],
      },
      {
        id: 'what-it-taught-me',
        title: 'what it taught me',
        blocks: [
          {
            type: 'p',
            text: "it made me excited about startups: i'd like to operate, build, or evaluate them. it also showed me i want a stronger technical background, which is part of why i study cs at stanford. i noticed my risk tolerance is different from the people who thrive at startups, so i decided to work at a larger firm early on to see how that works, before possibly joining a small company building something fast, or starting my own.",
          },
        ],
      },
    ],
  },
  {
    slug: 'polaris-partners',
    title: 'polaris partners',
    // a job, so "← back" returns to Previous Work
    backTo: '/#previously',
    intro:
      'a venture capital firm focused on life sciences, health technology, and digital health, with offices in boston, san francisco, new york, and singapore. i was an investment intern in the san francisco office for three weeks in june-july 2025, working with a principal and a few other members of the team.',
    sections: [
      {
        id: 'what-i-did',
        title: 'what i did',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'biotech and healthcare company research',
                text: 'compiled about 600 rows of structured data across two projects for internal resources. for each company i tagged its most advanced clinical stage (marketed, preclinical, phase 1-3, services only, or out of business), noted the drugs behind the tag, and linked a source.',
              },
              {
                lead: 'testing ai for data extraction',
                text: 'tried more than seven ai tools on the same task and wrote up how update frequency and web access affected accuracy.',
              },
              {
                lead: 'startup sourcing',
                text: 'researched 80 startups, identified about 20 worth a closer look, and ran competitive analysis with standard diligence frameworks to recommend potential future fund investments.',
              },
              {
                lead: 'pbm research',
                text: 'studied how pharmacy benefit managers work and how they are being regulated, and presented my findings to the principal.',
              },
              {
                lead: 'inside a vc firm',
                text: 'sat in on 10+ pitches, weekly meetings with the international team, and partner calls, plus three one-hour sessions on term sheets, due diligence, and sourcing.',
              },
            ],
          },
        ],
      },
      {
        id: 'what-was-hard',
        title: 'what was hard',
        blocks: [
          {
            type: 'p',
            text: 'the data was messier than i expected. many companies were private with almost no public information. others had been acquired or renamed, or turned out to be funds or holding companies, so "what\'s their clinical stage?" had no clean answer. i marked entries i couldn\'t resolve as NA instead of guessing.',
          },
        ],
      },
      {
        id: 'what-i-learned-about-ai-and-verification',
        title: 'what i learned about ai and verification',
        blocks: [
          {
            type: 'p',
            text: 'as of summer 2025, the best tool i tested (grok) was right about 65-70% of the time on the entries i checked by hand, and a few tools were close to useless. tools with live web access did better, but even the best sometimes cited broken links. so i asked for a source url with every answer and treated the output as a first draft. these tools change fast, so treat those results as a snapshot.',
          },
        ],
      },
      {
        id: 'what-i-learned-about-the-industry',
        title: 'what i learned about the industry',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'picking a market',
                text: 'one framework i liked (from rock health and lg nova) scores digital health segments on value potential and capturable opportunity, looking for the "goldilocks" zone that\'s big enough to matter but not so crowded that newcomers can\'t get in.',
              },
              {
                lead: 'where drug money goes',
                text: 'one study of 2015 filings estimated that of every $100 spent on a retail prescription, about $17 covers production and manufacturers keep the largest margins. the four biggest pbms hold about 70% of their market.',
              },
              {
                lead: 'sizing a market',
                text: 'i learned to size it bottom-up, as the number of potential customers times a realistic annual contract value.',
              },
            ],
          },
        ],
      },
      {
        id: 'what-it-taught-me',
        title: 'what it taught me',
        blocks: [
          {
            type: 'p',
            text: 'i left really excited about mission-driven vc. it was one of my favorite experiences, because i got to see up close how a firm evaluates companies. the people stuck with me too. partners came from the military, medicine, and finance, and they had all ended up in the same place, backing science that can improve health. it made me want to be on the evaluating side of building things, not only the building side.',
          },
        ],
      },
    ],
  },
  {
    slug: 'stanford-pacific-fund',
    title: 'stanford pacific fund',
    // a job, so "← back" returns to Previous Work
    backTo: '/#previously',
    intro:
      'a hedge fund in palo alto. i was a financial research intern in july-august 2024, and it was my first experience understanding finance beyond my economics class. i chose costco for my project because my family visits one wherever we travel and compares the goods and food court items.',
    sections: [
      {
        id: 'what-i-did',
        title: 'what i did',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'valuation',
                text: 'built a dcf with conservative, normal, and aggressive revenue growth scenarios. all three came out below the market price, so i called the stock overvalued.',
              },
              {
                lead: 'understanding the business',
                text: 'costco earns most of its profit from membership fees and runs thin margins on the goods it sells, which made it very different from the retailers i compared it with.',
              },
              {
                lead: 'checking against reality',
                text: 'visited a warehouse, counted shoppers, and estimated its annual sales, which came out close to the reported figure.',
              },
              {
                lead: 'pitch',
                text: "presented the analysis to the fund's ceo.",
              },
            ],
          },
        ],
      },
      {
        id: 'looking-back',
        title: 'looking back',
        blocks: [
          {
            type: 'p',
            text: "it was a first pass. my three scenarios covered a narrow range of growth, and if i did it again i'd also test the discount rate and terminal assumptions.",
          },
        ],
      },
    ],
  },
  {
    slug: '13f-holdings',
    title: '13f fund correlation and sector rotation',
    intro:
      "every quarter, any institution managing more than $100m has to tell the sec what us-listed securities it holds. the filings are public, but they're dumped as raw spreadsheets: millions of rows, names that aren't standardized, and no context. i wanted to see what you could actually learn from them.",
    sections: [
      {
        id: 'the-project',
        title: 'the project',
        blocks: [
          {
            type: 'p',
            text: "i pulled 21 quarters of filings, about 58 million holdings, and built a pipeline to clean them, stitch them together, and ask questions. which stocks are institutions piling into? do the giant index funds all own the same thing? (yes, basically.) did hedge funds really keep buying tech through the 2022 crash? (it looks like it, but filings only show long positions and arrive weeks late, so i can't see hedges or shorts.)",
          },
          {
            type: 'p',
            text: "most of what i've learned is how data lies to you. a 10-for-1 stock split looks exactly like the biggest buying spree in history. the sec changed its units from thousands of dollars to dollars partway through. bonds and etfs sneak in disguised as stocks. i thought the hard part would be the analysis. it was the cleaning, and i'm still doing it.",
          },
          {
            type: 'p',
            text: 'next: fix all of the above, then find out whether "follow the institutions" is actually a signal or just a story.',
          },
        ],
      },
    ],
  },
  {
    slug: 'haptic-metronome',
    title: 'analog beat detection for a haptic metronome',
    intro:
      'a circuit that listens to a song, finds the beat, and taps it out as a physical click, so you can feel tempo instead of hearing it. built with no microcontroller: just filters, a 555 timer, and a relay.',
    sections: [
      {
        id: 'how-it-works',
        title: 'how it works',
        blocks: [
          {
            type: 'table',
            columns: ['step', 'component', 'input', 'output'],
            rows: [
              ['i', 'mp3 player', 'digital song', 'analog audio signal'],
              ['ii', 'high-pass filter', 'full-range audio', 'low-end noise removed'],
              ['iii', 'rectifier', 'ac signal', 'pulsed dc (positive only)'],
              ['iv', 'low-pass filter', 'pulsed dc', 'smooth envelope of beat pulses'],
              ['v', 'rc timing network', 'envelope', 'short timing pulses'],
              ['vi', 'ne555 timer', 'timing pulse', 'fixed-width digital pulse'],
              ['vii', 'transistor + relay', 'digital pulse', 'mechanical click'],
            ],
          },
        ],
      },
      {
        id: 'circuit',
        title: 'circuit',
        blocks: imageBlock(
          'haptic-metronome',
          'circuit.png',
          'schematic of the analog beat detection circuit',
          'schematic — open full size to read the component values',
        ),
      },
      {
        id: 'whats-next',
        title: "what's next",
        blocks: [
          {
            type: 'list',
            items: [
              'wearable haptics: a tempo pulse for rowing or golf, where rhythm matters and audio is impractical',
              'an led color organ that filters by frequency band (high-pass and low-pass) instead of amplitude, so bass, mids, and treble each get their own color',
            ],
          },
        ],
      },
    ],
  },
]
