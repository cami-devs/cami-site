import { Link } from 'react-router-dom'
import Section from '../components/Section'
import { golfData, golfProfile } from '../content/golfCourses'
import type { CourseEntry } from '../content/golfCourses'
import styles from './Golf.module.css'

export default function Golf() {
  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link to="/#piano">← back</Link>
      </p>

      <header className={styles.intro}>
        <h1 className={styles.name}>{golfProfile.name}</h1>
        <p className={styles.tagline}>{golfProfile.tagline}</p>
      </header>

      {golfProfile.bio.map((paragraph) => (
        <p key={paragraph} className={styles.bio}>
          {paragraph}
        </p>
      ))}

      <ul className={styles.record}>
        {golfProfile.record.map((item) => (
          <li key={item.text}>
            {item.text}
            {item.link && (
              <>
                {' '}
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.recordLink}
                >
                  {item.link.label}
                </a>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* same italic serif as the section headings, but without a rule of its
          own — each region below already brings one */}
      <h2 className={styles.ledgerLabel}>{golfProfile.ledgerLabel}</h2>

      {golfData.map((group) => (
        <Section key={group.region} id={slugify(group.region)} title={group.region}>
          <ul className={styles.list}>
            {group.played.map((item) => {
              const course: CourseEntry = typeof item === 'string' ? { name: item } : item
              return (
                <li key={course.name}>
                  {course.name}
                  {course.note && <span className={styles.note}> — {course.note}</span>}
                </li>
              )
            })}
          </ul>

          {group.wishlist && group.wishlist.length > 0 && (
            <p className={styles.targets}>
              <span className={styles.targetsLabel}>Targets:</span> {group.wishlist.join(', ')}
            </p>
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
