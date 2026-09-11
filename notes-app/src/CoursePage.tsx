import type { Texts, Tree } from './files'
import { hrefFor } from './files'
import { afterDash, countQuestions, firstHeading, type TopicRow } from './markdown'
import { toneStyle } from './theme'
import { EMPTY, todayISO, type Tally } from './stats'
import { GradeChip, StatBar } from './StatViews'

export function CoursePage({ code, tree, all, topics, tallies }: {
  code: string; tree: Tree; all: Texts; topics: TopicRow[]; tallies: Record<string, Tally>
}) {
  const course = tree.courses.find((c) => c.code === code)
  if (!course) return <article><h1>Unknown course</h1><p><code>{code}</code></p></article>

  const syllabus = all[`courses/${code}/00-syllabus.md`]
  const name = syllabus ? afterDash(firstHeading(syllabus) ?? '') : ''
  const qCount = countQuestions(all[`courses/${code}/02-questions.md`])
  const style = toneStyle(code)
  const rows = topics.filter((r) => r.course === code)
  const today = todayISO()

  return (
    <>
      <h1><span className="ink" style={style}>{code}</span> <span className="muted light">{name}</span></h1>
      <div className="row">
        {course.main.map((e) => (
          <a key={e.path} className="btn" href={hrefFor(e.path)}>
            {e.label}{e.label === 'Question bank' && qCount > 0 ? ` · ${qCount}` : ''}
          </a>
        ))}
      </div>

      <section className="panel">
        <div className="panel-head"><span>Retrieval</span><a href={hrefFor('ledger.md')}>ledger →</a></div>
        <StatBar t={tallies[code] ?? EMPTY} />
        {rows.length > 0 && (
          <table className="topics">
            <tbody>
              {rows.map((r, i) => {
                const due = !!r.next && r.next <= today
                return (
                  <tr key={i}>
                    <td><GradeChip g={r.grade} title={r.last ? `last quizzed ${r.last}` : 'not quizzed yet'} /></td>
                    <td>{r.topic}</td>
                    <td className={due ? 'due' : 'muted'}>{r.next ? (due ? `due ${r.next}` : `next ${r.next}`) : ''}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </section>

      <h2 className="section-title">Lectures</h2>
      {course.lectures.length === 0 ? (
        <p className="muted">No lectures logged yet.</p>
      ) : (
        <div className="list">
          {course.lectures.map((e) => {
            const title = afterDash(firstHeading(all[e.path] ?? '') ?? e.label)
            return (
              <a key={e.path} className="card wide lecture" href={hrefFor(e.path)} style={style}>
                <div className="name">{title}</div>
                <div className="sub">{e.label}</div>
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}
