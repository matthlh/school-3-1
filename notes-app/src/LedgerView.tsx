import { useState } from 'react'
import type { QuizState } from './files'
import { firstHeading, parseLedgerGrades, parseTable, splitAroundTable, splitLogEntry, splitSections, splitSentences, type Deadline, type Table, type TopicRow } from './markdown'
import { hrefAnchor, scrollIfSame } from './routes'
import { toneStyle } from './tone'
import { formatDate, isISODate, shortDate, todayISO } from './dates'
import { Md } from './Md'
import { usePager } from './Pager'
import { DueBody, DueDetail, StandingCell, type Due } from './DueNow'
import { CourseChip, LastGrade, TopicCell, calendarChip, isCourseCode } from './ui'
import { calibrationByCourse } from './stats'
import { SectionRail } from './SectionRail'

const PATH = 'ledger.md'

/** ledger.md rendered as a dashboard: the scheduler's Due now block (`due`, read from `text`), then paged All topics /
 *  Term calendar / Grades / Session log. */
export function LedgerView({ text, topics, calendar, quiz, due }: { text: string; topics: TopicRow[]; calendar: Deadline[]; quiz: QuizState | null; due: Due }) {
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
        if (/^due now/i.test(h)) body = <><h2>Due now · <DueDetail due={due} /></h2><DueBody due={due} /></>
        else if (/^all topics/i.test(h)) body = <AllTopics heading={h} topics={topics} due={due} quiz={quiz} />
        else if (/^term calendar/i.test(h)) body = <CalendarSection heading={h} body={s.body} calendar={calendar} today={today} />
        else if (/^grades/i.test(h)) body = <GradesSection heading={h} body={s.body} ledger={text} />
        else if (/^session log/i.test(h)) body = <SessionLog heading={h} body={s.body} />
        else body = <><h2>{h}</h2><Md text={s.body} path={PATH} /></>
        return <section key={s.id} id={'sec-' + s.id}>{body}</section>
      })}
    </article>
  )
}

const byNext = (a: TopicRow, b: TopicRow) =>
  (a.next || '9999').localeCompare(b.next || '9999') || a.course.localeCompare(b.course) || a.topic.localeCompare(b.topic)

/** Every ledger row, paged, with a course filter. The Next column shows the Due now block's standing (StandingCell): why
 *  a listed topic is due, "frozen", or else the Next date. */
function AllTopics({ heading, topics, due, quiz }: { heading: string; topics: TopicRow[]; due: Due; quiz: QuizState | null }) {
  const [course, setCourse] = useState<string | null>(null)
  const courses = [...new Set(topics.map((t) => t.course))].sort()
  const shown = [...topics].sort(byNext).filter((t) => !course || t.course === course)
  const { rows, pager } = usePager(shown, { resetKey: course })
  const histories = Object.values(quiz?.questions ?? {})
  const answers = histories.reduce((n, h) => n + (h.history?.length ?? 0), 0)
  return (
    <>
      <h2>{heading} <span className="count">{shown.length}{course ? ` of ${topics.length}` : ''}</span></h2>
      {histories.length > 0 && (
        <p className="muted small">{histories.length} question{histories.length === 1 ? ' has' : 's have'} been asked {answers} time{answers === 1 ? '' : 's'} so far.</p>
      )}
      <Calibration quiz={quiz} />
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
          {rows.map((r) => (
            <tr key={`${r.course}|${r.topic}`}>
              <td className="course nowrap"><CourseChip code={r.course} /></td>
              <td className="topic"><TopicCell r={r} /></td>
              <td className="lec">{r.lec || '—'}</td>
              <td className="last">{isISODate(r.last) ? shortDate(r.last) : '—'}</td>
              <td className="grade"><LastGrade r={r} /></td>
              <StandingCell s={due.ok ? due.standing(r) : null} next={r.next} />
            </tr>
          ))}
        </tbody>
      </table>
      {pager}
    </>
  )
}

const CONF = { 1: 'guess', 2: 'think so', 3: 'sure' } as const

/** A small panel per course: for each confidence he gave before the answer, how many answers and the share graded O.
 *  Nothing shows until a history entry carries a confidence. */
function Calibration({ quiz }: { quiz: QuizState | null }) {
  const courses = calibrationByCourse(Object.values(quiz?.questions ?? {}))
  if (courses.length === 0) return null
  return (
    <div className="calibration">
      {courses.map((c) => (
        <div key={c.course} className="panel" style={toneStyle(c.course)}>
          <div className="panel-head"><span>Calibration</span><CourseChip code={c.course} /></div>
          {c.levels.map((l) => (
            <div key={l.conf} className="cal-row">
              <span>{l.conf} {CONF[l.conf]}</span>
              <span className="n">{l.answers} answer{l.answers === 1 ? '' : 's'}</span>
              <span className="o">{l.answers ? `${Math.round((100 * l.solid) / l.answers)}% O` : '—'}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function CalendarSection({ heading, body, calendar, today }: { heading: string; body: string; calendar: Deadline[]; today: string }) {
  const { before, table, after } = splitAroundTable(body)
  const hidden = Math.max(0, (parseTable(table)?.rows.length ?? 0) - calendar.length)
  const upcoming = calendar.findIndex((d) => d.date >= today)
  const { rows, pager } = usePager(calendar, { initialIndex: upcoming >= 0 ? upcoming : calendar.length - 1 })
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
              const chip = calendarChip(d.course)
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
      {splitSeries(after).map((b, i) =>
        b.kind === 'md'
          ? b.text.trim() ? <Md key={i} text={b.text} path={PATH} /> : null
          : <RecurringSeries key={i} heading={b.heading} table={b.table} />,
      )}
    </>
  )
}

type AfterBlock = { kind: 'md'; text: string } | { kind: 'series'; heading: string | null; table: Table }

/**
 * The text after the hard-dates table, cut around every table whose header starts with "Series". Such a table
 * and the `###` heading right above it become a series block; everything else stays markdown.
 */
function splitSeries(md: string): AfterBlock[] {
  const out: AfterBlock[] = []
  let carry = ''
  let rest = md
  for (;;) {
    const { before, table, after } = splitAroundTable(rest)
    const parsed = table ? parseTable(table) : null
    if (!parsed) break
    if (/^series$/i.test(parsed.head[0] ?? '')) {
      const lines = before.split('\n')
      let j = lines.length - 1
      while (j >= 0 && !lines[j].trim()) j--
      const heading = j >= 0 && /^###\s/.test(lines[j]) ? lines[j].replace(/^###\s+/, '').trim() : null
      out.push({ kind: 'md', text: carry + (heading ? lines.slice(0, j).join('\n') : before) })
      out.push({ kind: 'series', heading, table: parsed })
      carry = ''
    } else {
      carry += before + '\n' + table + '\n'
    }
    rest = after
  }
  out.push({ kind: 'md', text: carry + rest })
  return out
}

/** Recurring series (Series | Course | When | Note) in the ledger look; on phones the chip leads the Series cell. */
function RecurringSeries({ heading, table }: { heading: string | null; table: Table }) {
  return (
    <>
      {heading && <h3>{heading}</h3>}
      <table className="ledger recurring">
        <thead>
          <tr><th>Series</th><th className="course">Course</th><th className="when">When</th><th className="note">Note</th></tr>
        </thead>
        <tbody>
          {table.rows.map((cells, i) => {
            const [series = '', course = '', when = '', note = ''] = cells
            const code = course.replace(/\s+/g, '')
            const chip = isCourseCode(code) ? <CourseChip code={code} /> : null
            return (
              <tr key={i}>
                <td className="series">
                  {chip && <span className="chip-inline">{chip}</span>}
                  <Md text={series} path={PATH} inline />
                </td>
                <td className="course nowrap">{chip ?? course}</td>
                <td className="when"><Md text={when} path={PATH} inline /></td>
                <td className="note"><Md text={note} path={PATH} inline /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

/** Grades so far: course chip, the Canvas total with the graded items as chips, and the as-of date. The file's preamble
 *  sentence is for the scripts and is not shown; without a table the section's `body` shows as written. */
function GradesSection({ heading, body, ledger }: { heading: string; body: string; ledger: string }) {
  const rows = parseLedgerGrades(ledger)
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

/** Session log as a list, newest first, ten entries a page, each entry a title with its detail behind "more" as one bullet per sentence. */
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
                    {detail && isOpen && (
                      <ul className="log-more">
                        {splitSentences(detail).map((d, k) => <li key={k}><Md text={d} path={PATH} inline /></li>)}
                      </ul>
                    )}
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
