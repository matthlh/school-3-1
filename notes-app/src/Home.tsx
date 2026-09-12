import type { Texts, Tree } from './files'
import { hrefFor } from './files'
import { afterDash, countQuestions, firstHeading, type TopicRow } from './markdown'
import { hrefCourse } from './routes'
import { toneStyle } from './theme'
import { EMPTY, todayISO, type Tally } from './stats'
import { StatBar } from './StatViews'
import { Logo } from './Logo'
import { Upcoming } from './Upcoming'
import type { Deadline } from './markdown'

function niceDate(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export function Home({ tree, all, tallies, topics, calendar }: { tree: Tree; all: Texts; tallies: Record<string, Tally>; topics: TopicRow[]; calendar: Deadline[] }) {
  // Due now is computed live from the ledger's topic table, never from prose.
  const today = todayISO()
  const due = topics.filter((r) => r.next && r.next <= today)
  const byCourse = new Map<string, number>()
  for (const r of due) byCourse.set(r.course, (byCourse.get(r.course) ?? 0) + 1)
  const nextDate = topics.map((r) => r.next).filter((n) => n > today).sort()[0]
  const nextRows = nextDate ? topics.filter((r) => r.next === nextDate) : []
  const nextCourses = [...new Set(nextRows.map((r) => r.course))]

  return (
    <>
      <h1 className="brand"><Logo size={26} /> School 3-1</h1>
      <section className="panel">
        <div className="panel-head"><span>Due now</span><a href={hrefFor('ledger.md')}>ledger →</a></div>
        {due.length > 0 ? (
          <p>
            <b>{due.length} topic{due.length === 1 ? '' : 's'} due</b>
            {[...byCourse].map(([c, n]) => (
              <a key={c} href={hrefCourse(c)} className="chip tone due-chip" style={toneStyle(c)}>{c} · {n}</a>
            ))}
            <span className="muted"> — say “quiz me”</span>
          </p>
        ) : (
          <p className="muted">
            Nothing due today.
            {nextDate && <> Next: {nextRows.length} topic{nextRows.length === 1 ? '' : 's'} on <b>{niceDate(nextDate)}</b> ({nextCourses.join(', ')}).</>}
          </p>
        )}
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
