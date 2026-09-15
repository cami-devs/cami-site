export interface CourseEntry {
  name: string
  badge?: 'origin' | 'home' | 'former home' | 'ace'
}

export interface CourseGroup {
  region: string
  played: (string | CourseEntry)[]
  wishlist?: string[]
}

export const golfData: CourseGroup[] = [
  {
    region: 'SF Bay Area & Peninsula',
    played: [
      { name: 'Stanford Golf Course', badge: 'home' },
      { name: 'Peninsula Golf & Country Club', badge: 'ace' },
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
      'Wente Vineyards',
      'Baylands Golf Links',
      'Crystal Springs Golf Course',
      'Lincoln Park Golf Course',
      { name: 'Blackberry Farm Golf Course', badge: 'origin' },
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
      'Cypress Point Club',
      'Tehàma Golf Club',
    ],
  },
  {
    region: 'Central Coast & Southern California',
    played: [
      { name: 'The Mission Club (Vandenberg Village)', badge: 'ace' },
      'PGA West (Stadium, Mountain, Dunes)',
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
    wishlist: ['Clear Creek Tahoe', 'Lahontan Golf Club', 'Mayacama Golf Club'],
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
    wishlist: ['Manele Golf Course (Lanai)', 'Poipu Bay Golf Course (Kauai)'],
  },
  {
    region: 'National & International',
    played: [
      'Charles River Country Club (Boston)',
      'The Bridges Golf & Country Club (Montrose, CO)',
      'Wichita Country Club (Kansas)',
      'Twin Hills Golf & Country Club (Joplin, MO)',
      'Narashino Country Club (Chiba, Japan)',
    ],
    wishlist: [],
  },
]

export const totalPlayed = golfData.reduce((sum, group) => sum + group.played.length, 0)
export const totalWishlist = golfData.reduce(
  (sum, group) => sum + (group.wishlist?.length ?? 0),
  0,
)