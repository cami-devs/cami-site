import { Link, useParams } from 'react-router-dom'
import Section from '../components/Section'
import { notes } from '../content/notes'
import type { NoteBlock, NoteText } from '../content/types'
import styles from './Note.module.css'

/** a run of text, with any inline links rendered as external anchors */
function Inline({ text }: { text: NoteText }) {
  if (typeof text === 'string') return <>{text}</>
  return (
    <>
      {text.map((piece, i) =>
        typeof piece === 'string' ? (
          <span key={i}>{piece}</span>
        ) : (
          <a key={i} href={piece.url} target="_blank" rel="noreferrer">
            {piece.text}
          </a>
        ),
      )}
    </>
  )
}

/**
 * One block of a note. Every kind of content a note can hold is rendered
 * here, so adding material to src/content/notes.ts never means touching
 * this file — only a brand-new *kind* of block would.
 */
function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className={styles.paragraph}>
          <Inline text={block.text} />
        </p>
      )

    case 'list':
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) =>
            typeof item === 'string' ? (
              <li key={i}>{item}</li>
            ) : (
              <li key={i}>
                <strong className={styles.lead}>{item.lead}:</strong>{' '}
                <Inline text={item.text} />
              </li>
            ),
          )}
        </ul>
      )

    case 'table':
      // schematic-ish tables are wider than a phone; let this one scroll
      // sideways on its own rather than stretching the page
      return (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) => (
                    <td key={block.columns[i] ?? i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'image':
      // the image scales down to fit, and the link opens the full-resolution
      // file — the only way a wide schematic is readable on a phone
      return (
        <figure className={styles.figure}>
          <a href={block.src} target="_blank" rel="noreferrer">
            <img src={block.src} alt={block.alt} className={styles.image} />
          </a>
          <figcaption className={styles.caption}>
            {block.caption && <span>{block.caption} </span>}
            <a
              href={block.src}
              target="_blank"
              rel="noreferrer"
              className={styles.actionLink}
            >
              [open full size ↗]
            </a>
          </figcaption>
        </figure>
      )
  }
}

export default function Note() {
  const { slug } = useParams()
  const note = notes.find((entry) => entry.slug === slug)

  if (!note) {
    return (
      <main className={styles.page}>
        <p className={styles.back}>
          <Link to="/#projects">← back</Link>
        </p>
        <p>Couldn&rsquo;t find those notes.</p>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link to={note.backTo ?? '/#projects'}>← back</Link>
      </p>

      <header className={styles.intro}>
        <h1 className={styles.title}>{note.title}</h1>
        <p className={styles.leadIn}>
          <Inline text={note.intro} />
        </p>
      </header>

      {note.sections.map((section) => (
        <Section key={section.id} id={section.id} title={section.title}>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </Section>
      ))}
    </main>
  )
}
