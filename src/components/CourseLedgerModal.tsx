import { useEffect, useRef } from 'react'
import { ORIGIN_COURSE, golfData, totalPlayed, totalWishlist } from '../content/golfCourses'
import styles from './CourseLedgerModal.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void
}

/**
 * The course ledger, as a native <dialog>.
 *
 * Going native rather than hand-rolling an overlay means Escape-to-close,
 * focus trapping, focus restore, and an inert background all come from the
 * browser. The only wiring needed is keeping `open` in sync with React state
 * and forwarding the dialog's own close event back up.
 */
export default function CourseLedgerModal({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    // fires for Escape as well as an explicit close()
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="ledger-title"
      // clicking the backdrop lands on the dialog element itself
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close()
      }}
    >
      <div className={styles.frame}>
        <header className={styles.header}>
          <span id="ledger-title" className={styles.title}>
            RECORD 02 // FIELD COURSE LEDGER
          </span>
          <span className={styles.headerRight}>
            <span className={styles.count}>
              {totalPlayed} played · {totalWishlist} wishlist
            </span>
            <button
              type="button"
              className={styles.close}
              onClick={() => dialogRef.current?.close()}
            >
              [esc ✕]
            </button>
          </span>
        </header>

        <div className={styles.body}>
          {golfData.map((group) => (
            <section key={group.region} className={styles.region}>
              <p className={styles.regionName}>
                {group.region}
                <span className={styles.regionCount}>{group.played.length}</span>
              </p>

              <ul className={styles.badges}>
                {group.played.map((course) => (
                  <li key={course} className={styles.played}>
                    {course}
                    {course === ORIGIN_COURSE && <span className={styles.origin}>origin</span>}
                  </li>
                ))}
              </ul>

              {group.wishlist && group.wishlist.length > 0 && (
                <>
                  <p className={styles.wishlistLabel}>wishlist</p>
                  <ul className={styles.badges}>
                    {group.wishlist.map((course) => (
                      <li key={course} className={styles.wishlist}>
                        {course}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </dialog>
  )
}
