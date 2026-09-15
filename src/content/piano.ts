import type { PianoProfile } from './types'

export const piano: PianoProfile = {
  name: 'Cami Yen, classical piano',
  tagline: 'SFCM student (11 years), pianist (14 years)',

  education: {
    institution: 'San Francisco Conservatory of Music Pre-College (SFCM)',
    program: 'Piano Major',
    years: '2015–2025',
    coursework: [
      '7 years of Musicianship (Advanced Theory + Ear Training, RCM ARCT)',
      '2 years of Music History and Analysis (Baroque/Classical, Romantic/Contemporary)',
      '8 years of Ensemble — Piano Trio 3x, Woodwind-Piano Duo 2x, Piano Duet 3x; Chamber Music Awards (2022, 2023, 2024)',
    ],
    electives: ['Choir (8 years)', 'Collaborative Pianist', 'Community Engagement'],
    volunteer: ['Musicianship Tutor', 'Musicianship Placement Test Proctor'],
  },

  instructors: [
    { name: 'John McCarthy', location: 'San Francisco, CA', years: '2018–2026' },
    { name: 'Hang Li', location: 'Palo Alto, CA', years: '2011–2018' },
  ],

  awards: [
    { description: '2nd Place — American Protege Piano Competition', year: '2024' },
    { description: 'Category B Finalist — Rossall Piano Competition', year: '2021' },
    {
      description: 'Winner — Junior Bach Festival ("Most Outstanding Performance")',
      year: '2019, 2020',
    },
    { description: 'Performance at Carnegie Hall', year: '2018' },
  ],

  repertoire: [
    {
      category: 'Solo',
      works: [
        { composer: 'J.S. Bach', title: 'French Suite No. 3 in B Minor, BWV 814' },
        {
          composer: 'J.S. Bach',
          title:
            'Prelude and Fugue in C Major, BWV 846 (The Well-Tempered Clavier, Book I, No. 1)',
        },
        {
          composer: 'J.S. Bach',
          title:
            'Prelude and Fugue in C-sharp Minor, BWV 849 (The Well-Tempered Clavier, Book I, No. 4)',
        },
        {
          composer: 'J.S. Bach',
          title:
            'Prelude and Fugue in D Minor, BWV 851 (The Well-Tempered Clavier, Book I, No. 6)',
        },
        {
          composer: 'J.S. Bach',
          title:
            'Prelude and Fugue in E Major, BWV 854 (The Well-Tempered Clavier, Book I, No. 9)',
        },
        {
          composer: 'J.S. Bach',
          title: 'Goldberg Variations, BWV 988 — Aria and Variations 1–15',
        },
        { composer: 'Franz Joseph Haydn', title: 'Sonata in A-flat Major, Hob. XVI:46' },
        {
          composer: 'Ludwig van Beethoven',
          title: 'Sonata No. 17 in D Minor, Op. 31, No. 2 ("The Tempest")',
        },
        { composer: 'Ludwig van Beethoven', title: 'Sonata No. 24 in F-sharp Major, Op. 78' },
        { composer: 'Ludwig van Beethoven', title: 'Sonata No. 25 in G Major, Op. 79' },
        {
          composer: 'Franz Schubert',
          title: 'Impromptu in E-flat Major, Op. 90, No. 2, D. 899',
        },
        {
          composer: 'Franz Schubert',
          title: 'Impromptu in G-flat Major, Op. 90, No. 3, D. 899',
        },
        {
          composer: 'Franz Schubert',
          title: 'Impromptu in A-flat Major, Op. 90, No. 4, D. 899',
        },
        {
          composer: 'Franz Liszt',
          title: 'Hungarian Rhapsody No. 12 in C-sharp Minor, S.244',
        },
        { composer: 'Franz Liszt', title: 'Rigoletto — Concert Paraphrase, S.434' },
        { composer: 'Franz Liszt', title: 'Liebestraum No. 3 in A-flat Major, S.541' },
        { composer: 'Frédéric Chopin', title: 'Étude in E Major, Op. 10, No. 3' },
        {
          composer: 'Frédéric Chopin',
          title: 'Étude in C Minor, Op. 10, No. 12 ("Revolutionary")',
        },
        { composer: 'Frédéric Chopin', title: 'Étude in F Minor, Op. 25, No. 2' },
        { composer: 'Frédéric Chopin', title: 'Étude in A Minor, Op. 25, No. 4' },
        { composer: 'Frédéric Chopin', title: 'Étude in G-sharp Minor, Op. 25, No. 6' },
        {
          composer: 'Claude Debussy',
          title: 'Suite Bergamasque, L.75: III: Clair de lune',
        },
        { composer: 'Claude Debussy', title: "Children's Corner, L. 113" },
      ],
    },
    {
      category: 'Piano Trios',
      works: [
        {
          composer: 'Franz Joseph Haydn',
          title: 'Piano Trio in G Major, Hob. XV:25, Finale',
        },
        { composer: 'W.A. Mozart', title: 'Piano Trio in C Major, K. 548, Allegro' },
        {
          composer: 'Ludwig van Beethoven',
          title: 'Piano Trio in B-flat Major, Op. 11, Allegro con brio',
        },
        { composer: 'Clara Schumann', title: 'Piano Trio in G Minor, Op. 17, Andante' },
        { composer: 'Joaquín Turina', title: 'Piano Trio No. 2 in B Minor, Op. 76' },
        {
          composer: 'Anton Arensky',
          title: 'Piano Trio in D Minor, Op. 32, Allegro moderato',
        },
      ],
    },
    {
      category: 'Other Ensemble',
      works: [
        {
          composer: 'J.S. Bach',
          title: "Jesu, Joy of Man's Desiring from Cantata, BWV 147",
        },
        {
          composer: 'J.S. Bach',
          title: 'Flute Sonata in E-flat Major, BWV 1031, Movements 1 and 2',
        },
        { composer: 'Claude Debussy', title: 'Petite Suite, L. 65' },
        {
          composer: 'Edward MacDowell',
          title: 'To a Wild Rose from Woodland Sketches, Op. 51, No. 1',
        },
        { composer: 'Reinhold Glière', title: 'Chanson, Op. 35, No. 3' },
        {
          composer: 'Philippe Gaubert',
          title: 'Sonata No. 3 for Flute and Piano, Movement 2',
        },
        { composer: 'Ernest Bloch', title: 'Suite Modale, B. 95, Movement 4' },
      ],
    },
    {
      category: 'Concerti',
      works: [
        { composer: 'W.A. Mozart', title: 'Piano Concerto No. 21 in C Major, K. 467' },
      ],
    },
  ],

  recordings: [
    {
      composer: 'Ludwig van Beethoven',
      title: 'Piano Sonata No. 17 in D Minor, Op. 31, No. 2 ("Tempest")',
      url: 'https://youtu.be/XOZjslG-9Io',
    },
    {
      composer: 'J.S. Bach',
      title: 'Prelude and Fugue in D Minor, WTC Book 1, BWV 851',
      url: 'https://youtu.be/8EBG0MlrS7Y',
    },
  ],
}
