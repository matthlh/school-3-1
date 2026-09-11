import type { Entry, Tree } from './files'
import { hrefFor } from './files'
import { HREF_HOME, hrefCourse } from './routes'

function Link({ entry, current }: { entry: Entry; current: string }) {
  return <a href={hrefFor(entry.path)} className={entry.path === current ? 'cur' : undefined}>{entry.label}</a>
}

/** Hidden off-canvas; slides in when the left edge is hovered, stays when pinned. */
export function Sidebar({ tree, current, pinned }: { tree: Tree; current: string; pinned: boolean }) {
  return (
    <>
      <div className="edge" aria-hidden="true" />
      <nav className={pinned ? 'pinned' : undefined}>
        <a className="home" href={HREF_HOME}>School 3-1</a>
        <Link entry={{ path: 'ledger.md', label: 'Ledger' }} current={current} />
        {tree.courses.map((c) => (
          <section key={c.code}>
            <h3><a href={hrefCourse(c.code)} className={current === `course/${c.code}` ? 'cur' : undefined}>{c.code}</a></h3>
            {c.main.map((e) => <Link key={e.path} entry={e} current={current} />)}
            {c.lectures.length > 0 && (
              <div className="lec">{c.lectures.map((e) => <Link key={e.path} entry={e} current={current} />)}</div>
            )}
          </section>
        ))}
        {tree.runs.length > 0 && (
          <section>
            <h3>Morning briefs</h3>
            {tree.runs.slice(0, 5).map((e) => <Link key={e.path} entry={e} current={current} />)}
          </section>
        )}
      </nav>
    </>
  )
}
