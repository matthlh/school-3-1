import type { Texts, Tree } from './files'
import { courseName, hrefFor } from './files'
import { countQuestions, type Deadline } from './markdown'
import { hrefCourse } from './routes'
import { toneStyle } from './tone'
import { EMPTY, type Tally } from './stats'
import { StatBar } from './ui'
import { formatDate, todayISO } from './dates'
import type { Due } from './DueNow'

/** `#/courses`: a card per course with its next hard date, then the pages that cover every course. */
export function Courses({ tree, all, tallies, calendar, due }: {
  tree: Tree; all: Texts; tallies: Record<string, Tally>; calendar: Deadline[]; due: Due
}) {
  const today = todayISO()
  return (
    <>
      <h1>Courses</h1>
      <div className="grid">
        {tree.courses.map((c) => {
          const q = countQuestions(all[`courses/${c.code}/02-questions.md`])
          const next = calendar.find((d) => d.course === c.code && d.date >= today)
          return (
            <a key={c.code} className="card course" href={hrefCourse(c.code)} style={toneStyle(c.code)}>
              <div className="code">{c.code}</div>
              <div className="name">{courseName(c.code, all)}</div>
              <div className="sub">
                {c.lectures.length} lecture{c.lectures.length === 1 ? '' : 's'}
                {c.prepared.length > 0 && ` · ${c.prepared.length} not studied yet`} · {q} question{q === 1 ? '' : 's'}
              </div>
              {next && <div className="sub next">Next: {next.what}, {next.approx ? '~' : ''}{formatDate(next.date)}</div>}
              <StatBar t={tallies[c.code] ?? EMPTY} due={due.ok ? due.count(c.code) : null} />
            </a>
          )
        })}
      </div>
      <section className="panel">
        <div className="panel-head"><span>Across courses</span></div>
        <div className="row">
          <a className="btn" href={hrefFor('ledger.md')}>Ledger</a>
          <a className="btn" href={hrefFor('GOALS.md')}>Goals</a>
          <a className="btn" href={hrefFor('links.md')}>All links</a>
          <a className="btn" href={hrefFor('TOPICS.md')}>Topic list</a>
        </div>
      </section>
    </>
  )
}
