import { Link } from 'react-router-dom'
import Section from '../components/Section'
import { piano } from '../content/piano'
import styles from './Piano.module.css'

export default function Piano() {
  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link to="/#piano">← back</Link>
      </p>

      <header className={styles.intro}>
        <h1 className={styles.name}>{piano.name}</h1>
        <p className={styles.tagline}>{piano.tagline}</p>
      </header>

      <Section id="recordings" title="Recordings">
        <ul className={styles.recordings}>
          {piano.recordings.map((recording) => (
            <li key={recording.title} className={styles.recording}>
              <p className={styles.recordingTitle}>
                {recording.composer} — <em>{recording.title}</em>
              </p>
              <a
                href={recording.url}
                target="_blank"
                rel="noreferrer"
                className={styles.actionLink}
              >
                [watch performance ↗]
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <p className={styles.institution}>
          {piano.education.institution}, {piano.education.program} ({piano.education.years})
        </p>

        <p className={styles.label}>Relevant Coursework</p>
        <ul className={styles.list}>
          {piano.education.coursework.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className={styles.label}>Elective Classes</p>
        <ul className={styles.list}>
          {piano.education.electives.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className={styles.label}>Volunteer</p>
        <ul className={styles.list}>
          {piano.education.volunteer.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="instructors" title="Instructors">
        <ul className={styles.list}>
          {piano.instructors.map((instructor) => (
            <li key={instructor.name}>
              {instructor.name}, {instructor.location} ({instructor.years})
            </li>
          ))}
        </ul>
      </Section>

      <Section id="awards" title="Awards and Honors">
        <ul className={styles.list}>
          {piano.awards.map((award) => (
            <li key={award.description}>
              {award.description} ({award.year})
            </li>
          ))}
        </ul>
      </Section>

      <Section id="repertoire" title="Repertoire">
        {piano.repertoire.map((group) => (
          <div key={group.category} className={styles.repGroup}>
            <h3 className={styles.repCategory}>{group.category}</h3>
            <ul className={styles.repList}>
              {group.works.map((work) => (
                <li key={`${work.composer}-${work.title}`} className={styles.repWork}>
                  <span className={styles.composer}>{work.composer}:</span> {work.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </main>
  )
}
