import type { Texts, Tree } from './files'
import { hrefFor } from './files'
import { afterDash, countQuestions, firstHeading, type TopicRow } from './markdown'
import { hrefAnchor, hrefCourse } from './routes'
import { toneStyle } from './theme'
import { EMPTY, todayISO, type Tally } from './stats'
import { StatBar } from './StatViews'
import { Logo } from './Logo'
import { Upcoming } from './Upcoming'
import { DueTable, NothingDue, dueRows, dueDetail } from './DueNow'
import type { Deadline } from './markdown'

export function Home({ tree, all, tallies, topics, calendar }: { tree: Tree; all: Texts; tallies: Record<string, Tally>; topics: TopicRow[]; calendar: Deadline[] }) {
  // Due now is computed live from the ledger's topic table, never from prose.
  const today = todayISO()
  const due = dueRows(topics, today)

  return (
    <>
      <h1 className="brand"><Logo size={26} /> School 3-1</h1>
      <section className="panel">
        <div className="panel-head"><span>Due now <span className="sub">· {dueDetail(due.length, today)}</span></span><a href={hrefAnchor('ledger.md', 'due-now')}>ledger →</a></div>
        {due.length > 0 ? <DueTable rows={due} today={today} /> : <NothingDue topics={topics} today={today} />}
      </section>
      <Upcoming items={calendar} today={today} />
      <div className="grid">
        {tree.courses.map((c) => {
          const syllabus = all[`courses/${c.code}/00-syllabus.md`]
          const name = syllabus ? afterDash(firstHeading(syllabus) ?? c.code) : ''
          const q = countQuestions(all[`courses/${c.code}/02-questions.md`])
          return (
            <a key={c.code} className="card course" href={hrefCourse(c.code)} style={toneStyle(c.code)}>
              <div className="code">{c.code}</div>
              <div className="name">{name}</div>
              <div className="sub">{c.lectures.length} lecture{c.lectures.length === 1 ? '' : 's'} · {q} question{q === 1 ? '' : 's'}</div>
              <StatBar t={tallies[c.code] ?? EMPTY} />
            </a>
          )
        })}
      </div>
      {tree.runs.length > 0 && (
        <div className="row small">
          <span className="muted">Briefs:</span>
          {tree.runs.slice(0, 4).map((r) => <a key={r.path} className="btn" href={hrefFor(r.path)}>{r.label.replace(/-morning.*$/, '')}</a>)}
        </div>
      )}
      <p className="muted small updated">Site built {new Date(__BUILD_TIME__).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
    </>
  )
}
