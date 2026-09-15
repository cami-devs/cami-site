import { Link, useParams } from 'react-router-dom'
import { essays } from '../content/essays'
import styles from './Essay.module.css'

export default function Essay() {
  const { slug } = useParams()
  const essay = essays.find((entry) => entry.slug === slug)

  if (!essay) {
    return (
      <main className={styles.page}>
        <p className={styles.back}>
          <Link to="/#writing">← back</Link>
        </p>
        <p>Couldn&rsquo;t find that piece of writing.</p>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link to="/#writing">← back</Link>
      </p>

      <header className={styles.intro}>
        <h1 className={styles.title}>{essay.title}</h1>
        <p className={styles.byline}>{essay.byline.join(' · ')}</p>
        {essay.video && (
          <p className={styles.videoLink}>
            <a href={essay.video} target="_blank" rel="noreferrer" className={styles.actionLink}>
              [watch performance ↗]
            </a>
          </p>
        )}
      </header>

      {essay.note && (
        <aside className={styles.note}>
          <p className={styles.label}>Author&rsquo;s Note</p>
          <p>
            <strong>Why I wrote this: </strong>
            {essay.note.why}
          </p>
          <p>
            <strong>What I want you to take away: </strong>
            {essay.note.takeaway}
          </p>
        </aside>
      )}

      <article className={styles.body}>
        {essay.body.map((block, i) =>
          block.type === 'quote' ? (
            <blockquote key={i} className={styles.quote}>
              {block.text}
            </blockquote>
          ) : (
            <p key={i}>{block.text}</p>
          ),
        )}
      </article>

      <section className={styles.sources}>
        <p className={styles.label}>Sources</p>
        <ul className={styles.sourcesList}>
          {essay.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>

      <p className={styles.pdfLink}>
        <a href={essay.pdf} target="_blank" rel="noreferrer" className={styles.actionLink}>
          [original PDF ↗]
        </a>
      </p>
    </main>
  )
}
