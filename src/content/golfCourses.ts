export interface CourseEntry {
  name: string
  /** quiet inline annotation shown after the name, e.g. "home" or "ace #1" */
  note?: string
}

export interface CourseGroup {
  region: string
  played: (string | CourseEntry)[]
  wishlist?: string[]
}

/** one line of the record list — `link` is appended after `text` when present */
export type GolfRecordItem = {
  text: string
  link?: { label: string; url: string }
}

/** page header for /golf — mirrors piano.name / piano.tagline */
export const golfProfile = {
  name: 'Cami Yen, competitive golf',
  tagline: '0.4 index, 20k+ miles traveled for tournaments, 2 aces',
  /** rendered as consecutive paragraphs on /golf */
  bio: [
    "I started playing at 5 and got serious at 12. At Nueva, my high school, I was the only girl on the boys' varsity team and co-captain from sophomore year on. Playing the back tees every week meant I couldn't overpower a hole, so I had to think my way around one: where a miss was survivable, which side of the fairway opened the angle in, how much a slope would feed or reject a shot. Most of my scoring came from those decisions, not distance.",
    "That turned into an interest in how courses are built. Routing, wind, firm turf, the shape of a green complex — each course asks a slightly different question, and I like working out what it's asking before I play it. I now play on Stanford's club golf team.",
  ],
  /** heading shown above the course ledger regions */
  ledgerLabel: 'where tournaments took me',
  record: [
    { text: 'Handicap index: 0.4' },
    { text: 'Scoring average: 77, low round 69' },
    { text: 'AJGA: best rank 561 nationally, class of 2025' },
    { text: "Nueva boys' varsity: four years, co-captain for three" },
    {
      text: 'Stanford club golf:',
      link: {
        label: 'tournament stats ↗',
        url: 'https://nccga.org/app/golf-tournament-stats/camiyen',
      },
    },
    { text: 'Tournament rounds: always walked' },
    { text: '2 aces' },
  ] satisfies GolfRecordItem[],
}

export const golfData: CourseGroup[] = [
  {
    region: 'National & International',
    played: [
      'Charles River Country Club (Boston)',
      'The Bridges Golf & Country Club (Montrose, CO)',
      'Walnut Creek Golf Preserve (Westminster, CO)',
      'Wichita Country Club (Kansas)',
      'Twin Hills Golf & Country Club (Joplin, MO)',
      'Narashino Country Club (Chiba, Japan)',
    ],
    wishlist: [],
  },
  {
    region: 'SF Bay Area & Peninsula',
    played: [
      { name: 'Stanford Golf Course', note: 'home' },
      { name: 'Peninsula Golf & Country Club', note: 'ace #2, former home' },
      'The Olympic Club (Lake, Ocean, Cliffs)',
      'TPC Harding Park (Championship)',
      'Burlingame Country Club',
      'Sharon Heights Golf & Country Club',
      'Green Hills Country Club',
      'Palo Alto Hills Golf & Country Club',
      'San Jose Country Club',
      'Boulder Ridge Golf Club',
      'Sequoyah Country Club',
      'Diablo Country Club',
      'Castlewood Country Club (Hill, Valley)',
      'Ruby Hill Golf Club',
      'Blackhawk Country Club (Lakeside, Falls)',
      'Crow Canyon Country Club',
      'Half Moon Bay Golf Links (Old, Ocean)',
      'Presidio Golf Course',
      'TPC Stonebrae',
      'Corica Park (South)',
      'Coyote Creek Golf Club (Tournament)',
      'Baylands Golf Links',
      'Crystal Springs Golf Course',
      'Lincoln Park Golf Course',
      { name: 'Blackberry Farm Golf Course', note: 'first course ever' },
    ],
    wishlist: ['Poppy Ridge Golf Course'],
  },
  {
    region: 'Monterey Peninsula & Santa Cruz',
    played: [
      'Pasatiempo Golf Club',
      'CordeValle',
      'Monterey Peninsula CC (Shore)',
      'Monterey Peninsula CC (Dunes)',
      'The Links at Spanish Bay',
      'The Preserve Golf Club',
      'Poppy Hills Golf Course',
      'Bayonet Golf Course',
      'Black Horse Golf Course',
      'Pacific Grove Golf Links',
      'Del Monte Golf Course',
      'The Hay (Pebble Beach)',
    ],
    wishlist: [
      'Pebble Beach Golf Links',
      'Spyglass Hill Golf Course',
    ],
  },
  {
    region: 'Central Coast & Southern California',
    played: [
      { name: 'The Mission Club (Vandenberg Village)', note: 'ace #1' },
      'PGA West (Stadium)',
    ],
    wishlist: [],
  },
  {
    region: 'Northern California & Sierra',
    played: [
      'Martis Camp Club (Truckee)',
      'The Copper Valley Club (Copperopolis)',
      'Santa Rosa Golf & Country Club',
      'Haggin Oaks (Sacramento)',
      'The Reserve at Spanos Park (Stockton)',
      'Micke Grove Golf Links (Lodi)',
    ],
    wishlist: [],
  },
  {
    region: 'Hawaii',
    played: [
      'Kapalua Golf (Plantation, Bay)',
      'Kaʻanapali Golf Courses (Royal)',
      'Wailea Golf Club (Gold, Emerald)',
      'Mauna Kea Golf Course',
      'Hapuna Golf Course',
      'Mauna Lani Resort (North, South)',
    ],
    wishlist: [],
  },
]

export const totalPlayed = golfData.reduce((sum, group) => sum + group.played.length, 0)
export const totalWishlist = golfData.reduce(
  (sum, group) => sum + (group.wishlist?.length ?? 0),
  0,
)