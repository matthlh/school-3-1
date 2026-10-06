import type { Texts, Tree } from './files'
import { courseName, hrefFor } from './files'
import { countQuestions, parseLinks, type Deadline } from './markdown'
import { hrefAnchor, hrefCourse } from './routes'
import { toneStyle } from './tone'
import { EMPTY, type Tally } from './stats'
import { todayISO } from './dates'
import { StatBar } from './ui'
import { Logo } from './Logo'
import { Upcoming } from './Upcoming'
import { buildLabel } from './update'
import { DueBody, dueDetail, useDue } from './DueNow'
import { LinkGroups } from './LinksView'

/** Home: the Due now block, the next hard dates, a card per course, every link, the latest briefs. `topics` is unused:
 *  what is due comes from the ledger's Due now block. */
export function Home({ tree, all, tallies, calendar }: { tree: Tree; all: Texts; tallies: Record<string, Tally>; calendar: Deadline[] }) {
  const due = useDue(all['ledger.md'] ?? '')
  const today = todayISO()

  return (
    <>
      <h1 className="brand"><Logo size={26} /> School 3-1</h1>
      <section className="panel">
        <div className="panel-head"><span>Due now <span className="sub">· {dueDetail(due)}</span></span><a href={hrefAnchor('ledger.md', 'due-now')}>ledger →</a></div>
        <DueBody due={due} />
      </section>
      <Upcoming items={calendar} today={today} />
      <div className="grid">
        {tree.courses.map((c) => {
          const name = courseName(c.code, all)
          const q = countQuestions(all[`courses/${c.code}/02-questions.md`])
          return (
            <a key={c.code} className="card course" href={hrefCourse(c.code)} style={toneStyle(c.code)}>
              <div className="code">{c.code}</div>
              <div className="name">{name}</div>
              <div className="sub">{c.lectures.length} lecture{c.lectures.length === 1 ? '' : 's'} · {q} question{q === 1 ? '' : 's'}</div>
              <StatBar t={tallies[c.code] ?? EMPTY} due={due.ok ? due.count(c.code) : null} />
            </a>
          )
        })}
      </div>
      <section className="home-links">
        <div className="panel-head"><span>Links</span><a href={hrefFor('links.md')}>all links →</a></div>
        <LinkGroups rows={parseLinks(all['links.md'] ?? '')} />
      </section>
      {tree.runs.length > 0 && (
        <div className="row small">
          <span className="muted">Briefs:</span>
          {tree.runs.slice(0, 4).map((r) => <a key={r.path} className="btn" href={hrefFor(r.path)}>{r.label.replace(/-morning.*$/, '')}</a>)}
        </div>
      )}
      <p className="muted small updated">Site built {buildLabel()}</p>
    </>
  )
}
