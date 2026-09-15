import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Collage from '../components/Collage'
import SierpinskiBullet from '../components/SierpinskiBullet'
import { projects } from '../content/projects'
import { writing } from '../content/writing'
import { workExperience } from '../content/workExperience'
import { resumeUrl } from '../content/resume'
import type { ActionLink } from '../content/types'
import styles from './Home.module.css'

// flip to `true` to show the Previously entries again
const SHOW_WORK_ENTRIES = false
// flip to `true` to show the About Me section again
const SHOW_ABOUT_ME = false

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

      <header className={styles.intro}>
        <h1 className={styles.name}>Cami Yen</h1>
        <p className={styles.introText}>
          Studying CS @ Stanford. Interested in market structure, early tech/healthcare,
          classical piano, and golf!
        </p>
        <p className={styles.contactLine}>
          <a href="mailto:camiyen@stanford.edu" className={styles.actionLink}>
            Say hi &#8599; camiyen@stanford.edu
          </a>
        </p>
      </header>

      <div className="bleed">
        <Collage />
      </div>

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
        {SHOW_WORK_ENTRIES && (
          <ul className={styles.entryList}>
            {workExperience.map((job) => (
              <li key={job.slug} className={styles.entry}>
                <div className={job.photo ? styles.workRow : undefined}>
                  {job.photo && (
                    <img src={job.photo} alt={job.role} className={styles.workPhoto} />
                  )}
                  <p className={styles.entryLine}>
                    <span className={styles.entryTitle}>{job.role}</span>
                    {' — '}
                    {job.summary} <LinkTag link={job.link} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="piano" title="Piano">
        <p className={styles.entryLine}>
          <Link to="/piano" className={styles.actionLink}>
            [music resume / repertoire ledger ↗]
          </Link>
        </p>
      </Section>

      <footer className={styles.footer}>
        <nav className={styles.index} aria-label="sections">
          <a href="#writing">Writing</a>
          <a href="#projects">Projects</a>
          <a href="#previously">Previously</a>
          <a href="#piano">Piano</a>
          {SHOW_ABOUT_ME && <a href="#about">About Me</a>}
          <a href={resumeUrl}>Resume</a>
        </nav>
      </footer>
    </main>
  )
}
