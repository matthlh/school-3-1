import type { Entry, Tree } from './files'
import { hrefFor } from './files'
import { HREF_HOME, hrefCourse } from './routes'
import { toneStyle } from './theme'
import { pctSolid, type Tally } from './stats'
import { Logo } from './Logo'

function Link({ entry, current }: { entry: Entry; current: string }) {
  return <a href={hrefFor(entry.path)} className={entry.path === current ? 'cur' : undefined}>{entry.label}</a>
}

/** Off-canvas; slides in when the left edge is hovered, stays when pinned. */
export function Sidebar({ tree, current, pinned, tallies }: {
  tree: Tree; current: string; pinned: boolean; tallies: Record<string, Tally>
}) {
  return (
    <>
      <div className="edge" aria-hidden="true" />
      <nav className={pinned ? 'pinned' : undefined}>
        <a className="home" href={HREF_HOME}><Logo /> School 3-1</a>
        <Link entry={{ path: 'ledger.md', label: 'Ledger' }} current={current} />
        {tree.courses.map((c) => {
          const pct = tallies[c.code] ? pctSolid(tallies[c.code]) : null
          return (
            <section key={c.code} className="course" style={toneStyle(c.code)}>
              <h3>
                <a href={hrefCourse(c.code)} className={current === `course/${c.code}` ? 'cur' : undefined}>
                  {c.code}{pct !== null && <span className="pct" title="topics solid">{pct}%</span>}
                </a>
              </h3>
              {c.main.map((e) => <Link key={e.path} entry={e} current={current} />)}
              {c.lectures.length > 0 && (
                <div className="lec">{c.lectures.map((e) => <Link key={e.path} entry={e} current={current} />)}</div>
              )}
            </section>
          )
        })}
        {tree.runs.length > 0 && (
          <section>
            <h3><span>Morning briefs</span></h3>
            {tree.runs.slice(0, 5).map((e) => <Link key={e.path} entry={e} current={current} />)}
          </section>
        )}
      </nav>
    </>
  )
}
