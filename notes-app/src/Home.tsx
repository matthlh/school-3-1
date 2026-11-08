import type { Course, Loaded, Texts, Tree } from './files'
import { hrefFor, lectureNumber } from './files'
import { afterDash, courseLabel, firstHeading, type Deadline } from './markdown'
import { hrefAnchor } from './routes'
import { toneStyle } from './tone'
import { todayISO, formatDate } from './dates'
import { Upcoming } from './Upcoming'
import { DueBody, DueDetail, type Due } from './DueNow'
import { ReviewEntry } from './Review'

/**
 * The page a course's notes continue from: the first lecture page prepared before he studied it, else the latest
 * logged lecture. Null for a course with no lecture pages yet.
 */
export function nextPage(c: Course): { path: string; prepared: boolean } | null {
  if (c.prepared.length) return { path: c.prepared[0].path, prepared: true }
  const last = [...c.lectures].sort((a, b) => lectureNumber(a.path) - lectureNumber(b.path)).pop()
  return last ? { path: last.path, prepared: false } : null
}

/**
 * A notes page's H1 split for a one-line row: "STAT 251 — Lec 23 (Fri Nov 6) — Ch 7: …" gives the date "Fri Nov 6" and
 * the title "Ch 7: …"; "ASIA 250 — Lecture 8: Pure Land …" gives the title "Pure Land …". A title with no lecture part
 * stays whole after the course name.
 */
export function splitTitle(h1: string): { date: string | null; title: string } {
  const rest = afterDash(h1)
  const m = /^(?:Lec|Lecture)\s*\d+(?:[–-]\d+)?\s*(?:\(([^)]*)\))?\s*(?:—|:)\s*(.+)$/.exec(rest)
  return m ? { date: m[1] ?? null, title: m[2] } : { date: null, title: rest }
}

/** "Lec 23" or "Reading" for a notes page path. */
export function pageKind(path: string): string {
  const m = /\/lectures\/_?(\d+)(?:-(\d+)(?=-))?/.exec(path)
  return m ? `Lec ${+m[1]}${m[2] ? `–${+m[2]}` : ''}` : 'Reading'
}

/**
 * Today (2026-11-07, Matt: "a shorter Home page"): one next step first, a review session; then the hard dates coming up;
 * then where each course's notes continue. The due list folds away under its count; course cards and links moved to
 * Courses.
 */
export function Home({ tree, all, loaded, calendar, due }: {
  tree: Tree; all: Texts; loaded: Loaded; calendar: Deadline[]; due: Due
}) {
  const today = todayISO()
  return (
    <>
      <h1 className="today-title">Today <span className="muted light">{formatDate(today)}</span></h1>
      <ReviewEntry all={all} loaded={loaded} hero />
      <Upcoming items={calendar} today={today} limit={5} compact />
      <section className="panel">
        <div className="panel-head"><span>Continue</span></div>
        <ul className="continue">
          {tree.courses.map((c) => {
            const next = nextPage(c)
            if (!next) return null
            const { date, title } = splitTitle(firstHeading(all[next.path] ?? '') ?? '')
            return (
              <li key={c.code}>
                <a href={hrefFor(next.path)} style={toneStyle(c.code)}>
                  <span className="chip tone">{courseLabel(c.code)}</span>
                  <span className="what">
                    <span className="kind">{[pageKind(next.path), date, next.prepared && 'not studied yet'].filter(Boolean).join(' · ')}</span>
                    <span className="title">{title || pageKind(next.path)}</span>
                  </span>
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </li>
            )
          })}
        </ul>
      </section>
      <details className="panel queue">
        <summary className="panel-head"><span>Review queue <span className="sub">· <DueDetail due={due} /></span></span></summary>
        <DueBody due={due} />
        <p className="small"><a href={hrefAnchor('ledger.md', 'due-now')}>Open the ledger →</a></p>
      </details>
    </>
  )
}
