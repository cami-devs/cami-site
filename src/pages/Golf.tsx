import { Link } from 'react-router-dom'
import Section from '../components/Section'
import { golfData, totalPlayed } from '../content/golfCourses'
import type { CourseEntry } from '../content/golfCourses'
import styles from './Golf.module.css'

/** badge value → modifier class; 'former home' shares the plain treatment */
const badgeClass: Record<NonNullable<CourseEntry['badge']>, string | undefined> = {
  home: styles.home,
  ace: styles.ace,
  origin: styles.origin,
  'former home': undefined,
}

export default function Golf() {
  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link to="/#piano">← back</Link>
      </p>

      <header className={styles.intro}>
        <span className={styles.eyebrow}>RECORD 02 // FIELD COURSE LEDGER</span>
        <div className={styles.titleRow}>
          <h1 className={styles.name}>Verified Circuits & Target Rotations</h1>
          <span className={styles.count}>{totalPlayed} COURSES LOGGED</span>
        </div>
        <p className={styles.stats}>0.4 INDEX // 20,000+ TOURNAMENT MILES // 2 ACES</p>
      </header>

      {golfData.map((group) => (
        <Section key={group.region} id={slugify(group.region)} title={group.region}>
          <p className={styles.regionCount}>{group.played.length} played</p>

          <ul className={styles.badges}>
            {group.played.map((item) => {
              const course: CourseEntry = typeof item === 'string' ? { name: item } : item
              const modifier = course.badge ? badgeClass[course.badge] : undefined

              return (
                <li key={course.name} className={`${styles.played} ${modifier ?? ''}`}>
                  {course.name}
                  {course.badge && <span className={styles.badgeTag}>[{course.badge}]</span>}
                </li>
              )
            })}
          </ul>

          {group.wishlist && group.wishlist.length > 0 && (
            <>
              <p className={styles.wishlistLabel}>Targets // Want to Play:</p>
              <ul className={styles.badges}>
                {group.wishlist.map((target) => (
                  <li key={target} className={styles.wishlist}>
                    {target}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Section>
      ))}
    </main>
  )
}

/** "SF Bay Area & Peninsula" → "sf-bay-area-peninsula", for the section anchor */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
