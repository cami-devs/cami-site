import { Link } from 'react-router-dom'
import Section from '../components/Section'
import PhasePlane from '../components/PhasePlane'
import { projects } from '../content/projects'
import { writing } from '../content/writing'
import { workExperience } from '../content/workExperience'
import { resumeUrl } from '../content/resume'
import type { ActionLink } from '../content/types'
import styles from './Home.module.css'

/** the leading glyph on every ledger row — an arrow, so the row reads as an action */
function EntryArrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      &rarr;
    </span>
  )
}

function LinkTag({ link }: { link: ActionLink }) {
  if (!link.url) {
    return <span className={styles.badge}>[{link.label}]</span>
  }
  if (link.url.startsWith('/')) {
    return (
      <Link to={link.url} className={styles.actionLink}>
        [{link.label}]
      </Link>
    )
  }
  return (
    <a href={link.url} target="_blank" rel="noreferrer" className={styles.actionLink}>
      [{link.label}]
    </a>
  )
}

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.ledger}>
        <header className={styles.intro}>
          <h1 className={styles.name}>Cami Yen</h1>
          <p className={styles.introText}>
            studying CS @ stanford.
            excited about market microstructure, early tech and healthcare, golf, and classical piano!
          </p>
          <p className={styles.contactLine}>
            <a href="mailto:camiyen@stanford.edu" className={styles.actionLink}>
              Say hi &#8599; camiyen@stanford.edu
            </a>
          </p>
        </header>

        <Section id="previously" title="Previous Work">
          <p className={styles.sectionLinkRow}>
            <a href={resumeUrl} className={styles.actionLink}>
              [resume.pdf ↗]
            </a>
          </p>
          <ul className={styles.entryList}>
            {workExperience
              .filter((job) => !job.hidden)
              .map((job) => (
                <li key={job.slug} className={styles.entry}>
                  <div className={rowClass(job.featured)}>
                    <EntryArrow />
                    <p className={styles.entryLine}>
                      <span className={styles.entryTitle}>{job.role}</span>{' '}
                      <LinkTag link={job.link} />
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </Section>

        <Section id="writing" title="Writing">
          <ul className={styles.entryList}>
            {writing
              .filter((entry) => !entry.hidden)
              .map((entry) => (
                <li key={entry.slug} className={styles.entry}>
                  <div className={rowClass(entry.featured)}>
                    <EntryArrow />
                    <p className={styles.entryLine}>
                      <span className={styles.entryTitle}>{entry.title}</span>{' '}
                      <LinkTag link={entry.link} />
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </Section>

        <Section id="projects" title="Projects">
          <ul className={styles.entryList}>
            {projects
              .filter((project) => !project.hidden)
              .map((project) => (
                <li key={project.slug} className={styles.entry}>
                  <div className={styles.entryRow}>
                    <EntryArrow />
                    <p className={styles.entryLine}>
                      <span className={styles.entryTitle}>{project.title}</span>{' '}
                      {project.links.map((link, i) => (
                        <span key={link.label}>
                          {i > 0 && ' '}
                          <LinkTag link={link} />
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </Section>

        <Section id="piano" title="Piano & Golf">
          <ul className={styles.entryList}>
            <li className={styles.entry}>
              <div className={styles.entryRow}>
                <EntryArrow />
                <p className={styles.entryLine}>
                  Conservatory Pre-College (SFCM) alumni and French romanticism (Ravel/Debussy/Faure) enthusiast.{' '}
                  <Link to="/piano" className={styles.actionLink}>
                    [music resume and repertoire ledger ↗]
                  </Link>
                </p>
              </div>
            </li>
            <li className={styles.entry}>
              <div className={styles.entryRow}>
                <EntryArrow />
                <p className={styles.entryLine}>
                  Scratch golfer (0.4 index), 20k+ miles traveled for tournaments, 2 aces.{' '}
                  <Link to="/golf" className={styles.actionLink}>
                    [course ledger ↗]
                  </Link>
                </p>
              </div>
            </li>
          </ul>
        </Section>
      </div>

      <div className={styles.panelColumn}>
        <PhasePlane />
      </div>
    </main>
  )
}

/** rows flagged `featured` in the content files get the accent treatment */
function rowClass(featured?: boolean) {
  return featured ? `${styles.entryRow} ${styles.featured}` : styles.entryRow
}
