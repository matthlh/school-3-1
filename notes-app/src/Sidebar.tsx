import { useEffect, useState } from 'react'
import type { Course, Entry, Tree } from './files'
import { hrefFor } from './files'
import { HREF_HOME, hrefCourse } from './routes'
import { toneStyle } from './tone'
import { pctSolid, type Tally } from './stats'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { buildLabel } from './update'

function Link({ entry, current }: { entry: Entry; current: string }) {
  return <a href={hrefFor(entry.path)} className={entry.path === current ? 'cur' : undefined}>{entry.label}</a>
}

/** The course a sidebar path belongs to: `course/STAT251` or `courses/STAT251/…`. */
const courseOfCurrent = (current: string) => /^courses?\/([^/]+)/.exec(current)?.[1] ?? null

// Which course blocks are open, kept per viewer (2026-11-06: "hard to scroll"). A course is open when he opened it, or
// while he is on one of its pages; the rest show their name only. Lecture and reading lists open the same way, one level
// down, so an open course still shows its main files first.
const KEY = 'navOpen'
function loadOpen(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, boolean> } catch { return {} }
}
function saveOpen(v: Record<string, boolean>) {
  try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* storage blocked: the choice lasts this page load */ }
}

function Group({ id, label, entries, current, open, onToggle }: {
  id: string; label: string; entries: Entry[]; current: string; open: boolean; onToggle: (id: string, shown: boolean) => void
}) {
  if (entries.length === 0) return null
  return (
    <div className="nav-group">
      <button type="button" className="nav-toggle" aria-expanded={open} onClick={() => onToggle(id, open)}>
        <span className="chev" aria-hidden="true">{open ? '▾' : '▸'}</span>{label}<span className="count">{entries.length}</span>
      </button>
      {open && <div className="lec">{entries.map((e) => <Link key={e.path} entry={e} current={current} />)}</div>}
    </div>
  )
}

function CourseBlock({ c, current, pct, open, onToggle }: {
  c: Course; current: string; pct: number | null; open: Record<string, boolean>; onToggle: (id: string, shown: boolean) => void
}) {
  const here = courseOfCurrent(current) === c.code
  const isOpen = (id: string, holds: Entry[] = []) => open[id] ?? (here && (holds.length === 0 || holds.some((e) => e.path === current)))
  const courseOpen = isOpen(c.code)
  return (
    <section className="course" style={toneStyle(c.code)}>
      <h3>
        <button type="button" className="nav-chev" aria-expanded={courseOpen} aria-label={(courseOpen ? 'Collapse ' : 'Expand ') + c.code}
          onClick={() => onToggle(c.code, courseOpen)}>{courseOpen ? '▾' : '▸'}</button>
        <a href={hrefCourse(c.code)} className={current === `course/${c.code}` ? 'cur' : undefined}>
          {c.code}{pct !== null && <span className="pct" title="topics solid">{pct}%</span>}
        </a>
      </h3>
      {courseOpen && (
        <>
          {c.main.map((e) => <Link key={e.path} entry={e} current={current} />)}
          <Group id={`${c.code}:lec`} label="Lectures" entries={c.lectures} current={current}
            open={isOpen(`${c.code}:lec`, c.lectures)} onToggle={onToggle} />
          <Group id={`${c.code}:read`} label="Readings" entries={c.readings} current={current}
            open={isOpen(`${c.code}:read`, c.readings)} onToggle={onToggle} />
        </>
      )}
    </section>
  )
}

/** Off-canvas; slides in when the left edge is hovered, stays when pinned. Courses fold to their names. */
export function Sidebar({ tree, current, pinned, tallies }: {
  tree: Tree; current: string; pinned: boolean; tallies: Record<string, Tally>
}) {
  const [open, setOpen] = useState(loadOpen)
  // Arriving on a page of a course clears any "closed" choice for that course and the list holding the page, so the
  // sidebar always shows where he is.
  useEffect(() => {
    const code = courseOfCurrent(current)
    if (!code) return
    setOpen((o) => {
      const drop = [code, `${code}:lec`, `${code}:read`].filter((k) => o[k] === false)
      if (drop.length === 0) return o
      const next = { ...o }
      for (const k of drop) delete next[k]
      saveOpen(next)
      return next
    })
  }, [current])
  const toggle = (id: string, shown: boolean) => setOpen((o) => {
    const next = { ...o, [id]: !shown }
    saveOpen(next)
    return next
  })
  const briefsOpen = open['briefs'] ?? tree.runs.some((e) => e.path === current)
  return (
    <>
      <div className="edge" aria-hidden="true" />
      <nav className={pinned ? 'pinned' : undefined}>
        <div className="nav-head">
          <a className="home" href={HREF_HOME}><Logo /> School 3-1</a>
          <ThemeToggle />
        </div>
        <Link entry={{ path: 'ledger.md', label: 'Ledger' }} current={current} />
        <Link entry={{ path: 'links.md', label: 'Links' }} current={current} />
        <Link entry={{ path: 'GOALS.md', label: 'Goals' }} current={current} />
        <Link entry={{ path: 'TOPICS.md', label: 'Topic list' }} current={current} />
        {tree.courses.map((c) => (
          <CourseBlock key={c.code} c={c} current={current} pct={tallies[c.code] ? pctSolid(tallies[c.code]) : null}
            open={open} onToggle={toggle} />
        ))}
        {tree.runs.length > 0 && (
          <section>
            <h3>
              <button type="button" className="nav-chev" aria-expanded={briefsOpen} onClick={() => toggle('briefs', briefsOpen)}
                aria-label="Morning briefs">{briefsOpen ? '▾' : '▸'}</button>
              <span>Morning briefs</span>
            </h3>
            {briefsOpen && tree.runs.slice(0, 5).map((e) => <Link key={e.path} entry={e} current={current} />)}
          </section>
        )}
        <p className="built">built {buildLabel()}</p>
      </nav>
    </>
  )
}
