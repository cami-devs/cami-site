import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Section.module.css'

type SectionProps = {
  /** anchor id for the <section> — used for in-page links now, route targets later */
  id: string
  /** heading text, normal capitalization, e.g. "Making" */
  title: string
  /** optional route — when set, the heading becomes a link into a deeper page */
  to?: string
  /** optional decorative glyph shown before the heading */
  symbol?: ReactNode
  children: ReactNode
}

export default function Section({ id, title, to, symbol, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <hr className={styles.rule} />
      <div className={styles.head}>
        {symbol && (
          <span className={styles.symbol} aria-hidden="true">
            {symbol}
          </span>
        )}
        <h2 className={styles.title}>
          {to ? <Link to={to}>{title}</Link> : title}
        </h2>
      </div>
      {children}
    </section>
  )
}
