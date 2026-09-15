import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Tessellation from '../components/Tessellation'
import SierpinskiBullet from '../components/SierpinskiBullet'
import { projects } from '../content/projects'
import { writing } from '../content/writing'
import { workExperience } from '../content/workExperience'
import { resumeUrl } from '../content/resume'
import type { ActionLink } from '../content/types'
import styles from './Home.module.css'

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
          <h1 className={styles.name}>Hi, I&rsquo;m Cami :)</h1>
          <p className={styles.introText}>
            Studying CS + Math @ Stanford. Into market structure, early tech/bio,
            and classical piano.
          </p>
          <p className={styles.contactLine}>
            <a href="mailto:camiyen@stanford.edu" className={styles.actionLink}>
              Say hi &#8599; camiyen@stanford.edu
            </a>
          </p>
        </header>

        <Section id="writing" title="Writing">
          <ul className={styles.entryList}>
            {writing
              .filter((entry) => !entry.hidden)
              .map((entry) => (
                <li key={entry.slug} className={styles.entry}>
                  <div className={styles.entryRow}>
                    <SierpinskiBullet />
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
                    <SierpinskiBullet />
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

        <Section id="previously" title="Previously">
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
                  <div className={styles.entryRow}>
                    <SierpinskiBullet />
                    <p className={styles.entryLine}>
                      <span className={styles.entryTitle}>{job.role}</span>{' '}
                      <LinkTag link={job.link} />
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </Section>

        <Section id="piano" title="Piano & Golf">
          <p className={styles.entryLine}>
            10 years @ SFCM. Playing Beethoven Op. 31 No. 2, Bach BWV 851, and
            Schubert Op. 90 No. 3.{' '}
            <Link to="/piano" className={styles.actionLink}>
              [music resume / repertoire ledger ↗]
            </Link>
          </p>
          <p className={styles.entryLine}>
            Scratch golfer (0.0 index), 18k+ tournament miles, 2 aces.
          </p>
        </Section>
      </div>

      <div className={styles.panelColumn}>
        <Tessellation />
      </div>
    </main>
  )
}
