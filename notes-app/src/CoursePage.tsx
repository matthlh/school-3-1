import type { Entry, Texts, Tree } from './files'
import { hrefFor } from './files'
import { afterDash, firstHeading, splitSections, type LinkRow, type TopicRow } from './markdown'
import { EMPTY, type Tally } from './stats'
import { todayISO } from './dates'
import { LastGrade, NextCell, StatBar, TopicCell } from './ui'
import { LinkList } from './Links'
import { Md } from './Md'
import { usePager } from './Pager'

/** Syllabus sections that belong on the overview (checklists), not in the syllabus view. */
export const VERIFY = /^(to verify|ask\b|check\b|do this week|open questions|to do)/i

/** One card per notes page: its title from the page's H1, its file label under it. */
function PageCards({ entries, all }: { entries: Entry[]; all: Texts }) {
  return (
    <div className="list">
      {entries.map((e) => (
        <a key={e.path} className="card lecture" href={hrefFor(e.path)}>
          <div className="name">{afterDash(firstHeading(all[e.path] ?? '') ?? e.label)}</div>
          <div className="sub">{e.label}</div>
        </a>
      ))}
    </div>
  )
}

export function CoursePage({ code, tree, all, topics, tallies, links }: {
  code: string; tree: Tree; all: Texts; topics: TopicRow[]; tallies: Record<string, Tally>; links: LinkRow[]
}) {
  const course = tree.courses.find((c) => c.code === code)
  const rows = topics.filter((r) => r.course === code)
  const { rows: shown, pager } = usePager(rows)
  if (!course) return <article><h1>Unknown course</h1><p><code>{code}</code></p></article>

  const syllabusPath = `courses/${code}/00-syllabus.md`
  const syllabus = all[syllabusPath]
  const verify = syllabus ? splitSections(syllabus).filter((s) => s.heading && VERIFY.test(s.heading)) : []
  const today = todayISO()
  const hasLinks = links.some((l) => l.course === code)

  return (
    <div className="course-grid">
      <div className="course-main">
        <section className="panel">
          <div className="panel-head"><span>Revision</span><a href={hrefFor('ledger.md')}>ledger →</a></div>
          <StatBar t={tallies[code] ?? EMPTY} />
          {rows.length > 0 && (
            <>
              <table className="topics">
                <tbody>
                  {shown.map((r) => (
                    <tr key={r.topic}>
                      <td><LastGrade r={r} /></td>
                      <td><TopicCell r={r} /></td>
                      <NextCell next={r.next} today={today} />
                    </tr>
                  ))}
                </tbody>
              </table>
              {pager}
            </>
          )}
        </section>

        <h2 className="section-title">Lectures</h2>
        {course.lectures.length === 0 ? <p className="muted">No lectures logged yet.</p> : <PageCards entries={course.lectures} all={all} />}
        {course.readings.length > 0 && (
          <>
            <h2 className="section-title">Readings</h2>
            <PageCards entries={course.readings} all={all} />
          </>
        )}
      </div>

      {(hasLinks || verify.length > 0) && (
        <aside className="course-side">
          {hasLinks && (
            <section className="panel side">
              <div className="panel-head"><span>Links</span></div>
              <LinkList rows={links} course={code} />
            </section>
          )}
          {verify.map((s) => (
            <section key={s.id} className="panel side">
              <div className="panel-head"><span>{s.heading}</span><a href={hrefFor(syllabusPath)}>syllabus →</a></div>
              <Md text={s.body} path={syllabusPath} />
            </section>
          ))}
        </aside>
      )}
    </div>
  )
}
