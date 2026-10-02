import { useState } from 'react'
import type { QuizState } from './files'
import { firstHeading, parseGrades, parseTable, splitAroundTable, splitLogEntry, splitSections, type Deadline, type TopicRow } from './markdown'
import { hrefAnchor, scrollIfSame } from './routes'
import { toneStyle } from './theme'
import { formatDate, shortDate, todayISO } from './stats'
import { Md } from './Md'
import { PAGE, usePager } from './Pager'
import { CourseChip, DueTable, LastGrade, NothingDue, TopicCell, dueRows, dueTitle, rowKey } from './DueNow'
import { SectionRail } from './SectionRail'

const PATH = 'ledger.md'
const isCourseCode = (s: string) => /^[A-Z]{2,4}\d{3}[A-Z]?$/.test(s)
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s)

/** ledger.md rendered as a dashboard: live Due now, paged All topics / Term calendar / Grades / Session log. */
export function LedgerView({ text, topics, calendar, quiz }: { text: string; topics: TopicRow[]; calendar: Deadline[]; quiz: QuizState | null }) {
  const today = todayISO()
  // The preamble (title, grade key, ladder) is for the scripts; the page starts at the first section.
  const sections = splitSections(text).slice(1).filter((s) => s.heading !== null)
  return (
    <article className="ledger-page">
      <h1>{firstHeading(text) ?? 'Ledger'}</h1>
      <SectionRail sections={sections.map((s) => ({ id: s.id, label: s.heading ?? '' }))} path={PATH} />
      {sections.length > 1 && (
        <div className="contents">
          {sections.map((s) => <a key={s.id} className="chip" href={hrefAnchor(PATH, s.id)} onClick={scrollIfSame}>{s.heading}</a>)}
        </div>
      )}
      {sections.map((s) => {
        const h = s.heading ?? ''
        let body
        if (/^due now/i.test(h)) body = <DueSection topics={topics} today={today} />
        else if (/^all topics/i.test(h)) body = <AllTopics heading={h} topics={topics} today={today} quiz={quiz} />
        else if (/^term calendar/i.test(h)) body = <CalendarSection heading={h} body={s.body} calendar={calendar} today={today} />
        else if (/^grades/i.test(h)) body = <GradesSection heading={h} body={s.body} />
        else if (/^session log/i.test(h)) body = <SessionLog heading={h} body={s.body} />
        else body = <><h2>{h}</h2><Md text={s.body} path={PATH} /></>
        return <section key={s.id} id={'sec-' + s.id}>{body}</section>
      })}
    </article>
  )
}

function DueSection({ topics, today }: { topics: TopicRow[]; today: string }) {
  const due = dueRows(topics, today)
  return (
    <>
      <h2>{dueTitle(due.length, today)}</h2>
      {due.length > 0 ? <DueTable rows={due} today={today} /> : <NothingDue topics={topics} today={today} />}
    </>
  )
}

const byNext = (a: TopicRow, b: TopicRow) =>
  (a.next || '9999').localeCompare(b.next || '9999') || a.course.localeCompare(b.course) || a.topic.localeCompare(b.topic)

function AllTopics({ heading, topics, today, quiz }: { heading: string; topics: TopicRow[]; today: string; quiz: QuizState | null }) {
  const [course, setCourse] = useState<string | null>(null)
  const courses = [...new Set(topics.map((t) => t.course))].sort()
  const shown = [...topics].sort(byNext).filter((t) => !course || t.course === course)
  const { rows, pager } = usePager(shown, PAGE, { resetKey: course })
  const histories = Object.values(quiz?.questions ?? {})
  const answers = histories.reduce((n, h) => n + (h.history?.length ?? 0), 0)
  return (
    <>
      <h2>{heading} <span className="count">{shown.length}{course ? ` of ${topics.length}` : ''}</span></h2>
      {histories.length > 0 && (
        <p className="muted small">{histories.length} question{histories.length === 1 ? ' has' : 's have'} been asked {answers} time{answers === 1 ? '' : 's'} so far.</p>
      )}
      {courses.length > 1 && (
        <div className="filter">
          <button type="button" className={'chip' + (course ? '' : ' on')} onClick={() => setCourse(null)}>All</button>
          {courses.map((c) => (
            <button key={c} type="button" className={'chip tone' + (course === c ? ' on' : '')} style={toneStyle(c)} onClick={() => setCourse(course === c ? null : c)}>{c}</button>
          ))}
        </div>
      )}
      <table className="ledger topics-all">
        <thead>
          <tr><th>Course</th><th>Topic</th><th className="lec">Lec</th><th className="last">Last</th><th className="grade">Grade</th><th className="next">Next</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const due = !!r.next && r.next <= today
            return (
              <tr key={rowKey(r)}>
                <td className="course nowrap"><CourseChip code={r.course} /></td>
                <td className="topic"><TopicCell topic={r.topic} /></td>
                <td className="lec">{r.lec || '—'}</td>
                <td className="last">{isDate(r.last) ? shortDate(r.last) : '—'}</td>
                <td className="grade"><LastGrade r={r} /></td>
                <td className={'next' + (due ? ' late' : '')}>{due ? 'due' : r.next ? shortDate(r.next) : '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {pager}
    </>
  )
}

function CalendarSection({ heading, body, calendar, today }: { heading: string; body: string; calendar: Deadline[]; today: string }) {
  const { before, table, after } = splitAroundTable(body)
  const hidden = Math.max(0, (parseTable(table)?.rows.length ?? 0) - calendar.length)
  const upcoming = calendar.findIndex((d) => d.date >= today)
  const { rows, pager } = usePager(calendar, PAGE, { initialIndex: upcoming >= 0 ? upcoming : calendar.length - 1 })
  return (
    <>
      <h2>{heading} <span className="count">{calendar.length}</span></h2>
      {before.trim() && <Md text={before} path={PATH} />}
      {calendar.length > 0 && (
        <table className="ledger calendar">
          <thead>
            <tr><th>Date</th><th className="course">Course</th><th>What</th><th className="weight">Weight</th></tr>
          </thead>
          <tbody>
            {rows.map((d) => {
              const chip = isCourseCode(d.course) ? <CourseChip code={d.course} /> : d.course === 'UBC' ? <span className="chip">UBC</span> : null
              return (
                <tr key={`${d.date} ${d.time} ${d.course} ${d.what}`} className={(d.date < today ? 'past' : '') + (d.exam ? ' exam' : '')}>
                  {/* The weekday stays here: it matters on exam days. */}
                  <td className="date">{d.approx ? '~' : ''}{formatDate(d.date)}{d.time ? `, ${d.time}` : ''}</td>
                  <td className="course nowrap">{chip}</td>
                  <td className="what">
                    {/* On phones the Course column is hidden and the chip leads the What cell instead. */}
                    {chip && <span className="chip-inline">{chip}</span>}
                    <Md text={d.rawWhat} path={PATH} inline />
                  </td>
                  <td className="weight">{d.weight}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      {pager}
      {hidden > 0 && <p className="muted small">{hidden} row{hidden === 1 ? '' : 's'} of the table {hidden === 1 ? 'has' : 'have'} no calendar date and {hidden === 1 ? 'is' : 'are'} not shown here.</p>}
      {after.trim() && <Md text={after} path={PATH} />}
    </>
  )
}

/** Grades so far: course chip, the Canvas total with the graded items as chips, and the as-of date. The file's preamble sentence is for the scripts and is not shown. */
function GradesSection({ heading, body }: { heading: string; body: string }) {
  const rows = parseGrades(body)
  if (rows.length === 0) return <><h2>{heading}</h2><Md text={body} path={PATH} /></>
  return (
    <>
      <h2>{heading}</h2>
      <table className="ledger grades">
        <thead>
          <tr><th>Course</th><th>Score</th><th className="asof">As of</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const empty = r.percent === null && r.items.length === 0 && r.notes.length === 0
            const asOf = r.asOf ? shortDate(r.asOf) : ''
            return (
              <tr key={r.course}>
                <td className="course nowrap"><CourseChip code={r.course} /></td>
                <td className="score">
                  {empty ? <span className="muted">Nothing graded yet.</span> : (
                    <>
                      <div className={'total' + (r.percent === null ? ' none' : '')}>{r.percent !== null ? `${r.percent}%` : r.hidden ? 'Canvas hides the total.' : 'No total yet.'}</div>
                      {(r.items.length > 0 || asOf) && (
                        <div className="items">
                          {r.items.map((it) => <span key={it.name} className="chip">{it.name}{' '}<b>{it.got}/{it.of}</b></span>)}
                          {asOf && <span className="asof-inline">as of {asOf}</span>}
                        </div>
                      )}
                      {r.notes.map((n) => <div key={n} className="note">{n}</div>)}
                    </>
                  )}
                </td>
                <td className="asof">{asOf}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

interface LogEntry { i: number; date: string; what: string }

/** Consecutive entries that share a date become one day block. */
function groupByDate(entries: LogEntry[]): { date: string; entries: LogEntry[] }[] {
  const out: { date: string; entries: LogEntry[] }[] = []
  for (const e of entries) {
    const last = out[out.length - 1]
    if (last && last.date === e.date) last.entries.push(e)
    else out.push({ date: e.date, entries: [e] })
  }
  return out
}

/** Session log as a list, newest first, ten entries a page, each entry a title with its detail behind "more". */
function SessionLog({ heading, body }: { heading: string; body: string }) {
  const table = parseTable(body)
  // Newest first; the key is the row's position in the file, which only ever grows at the end.
  const entries: LogEntry[] = (table?.rows ?? []).map((cells, i) => ({ i, date: cells[0] ?? '', what: cells.slice(1).join(' ') })).reverse()
  const { rows, pager } = usePager(entries)
  const [open, setOpen] = useState<Set<number>>(() => new Set())
  if (!table) return <><h2>{heading}</h2><Md text={body} path={PATH} /></>
  const toggle = (i: number) => setOpen((prev) => {
    const next = new Set(prev)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    return next
  })
  return (
    <>
      <h2>{heading} <span className="count">{entries.length}</span></h2>
      <div className="log">
        {groupByDate(rows).map((day) => (
          <div key={day.entries[0].i} className="log-day">
            <div className="log-date">{shortDate(day.date)}</div>
            <ul className="log-entries">
              {day.entries.map((e) => {
                const { title, detail } = splitLogEntry(e.what)
                const isOpen = open.has(e.i)
                return (
                  <li key={e.i} className="log-entry">
                    <div className="log-title">
                      <Md text={title} path={PATH} inline />
                      {detail && <button type="button" className="link" aria-expanded={isOpen} onClick={() => toggle(e.i)}>{isOpen ? 'less' : 'more'}</button>}
                    </div>
                    {detail && isOpen && <div className="log-more"><Md text={detail} path={PATH} inline /></div>}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      {pager}
    </>
  )
}
