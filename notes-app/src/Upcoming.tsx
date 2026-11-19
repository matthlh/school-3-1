import { courseLabel, slug, type Deadline } from './markdown'
import { hrefAnchor, hrefExam } from './routes'
import { examName } from './examScope'
import { calendarChip } from './ui'
import { daysBetween, formatDate } from './dates'

/** The ledger heading the "all dates" link jumps to; its slug must match what splitSections gives that section. */
const CALENDAR_HEADING = 'Term calendar — hard dates'

const when = (n: number) => (n === 0 ? 'today' : n === 1 ? 'tomorrow' : `in ${n} days`)

/**
 * The next few hard dates from the ledger's term calendar: seven, or `limit`. `compact` (Today) cuts each row's text to
 * two lines, the whole of it in the tooltip and on the ledger.
 */
export function Upcoming({ items, today, limit = 7, compact = false }: { items: Deadline[]; today: string; limit?: number; compact?: boolean }) {
  const future = items.filter((d) => d.date >= today)
  const next = future.slice(0, limit)
  const otherExams = future.slice(limit).filter(d => d.exam)
  if (next.length === 0) return null
  return (
    <section className="panel">
      <div className="panel-head"><span>Coming up</span><a href={hrefAnchor('ledger.md', slug(CALENDAR_HEADING))}>all dates →</a></div>
      <table className={'upcoming' + (compact ? ' compact' : '')}>
        <tbody>
          {next.map((d, i) => {
            const n = daysBetween(today, d.date)
            return (
              <tr key={i} className={d.exam ? 'exam' : undefined}>
                <td className={'when' + (n <= 2 ? ' soon' : '')}>{when(n)}</td>
                <td className="tag">{calendarChip(d.course)}</td>
                <td className="what">
                  {d.exam
                    ? <a className={compact ? 'clamp' : undefined} href={hrefExam(d.course, d.date)} title={d.what}>{examName(d)} prep</a>
                    : compact ? <div className="clamp" title={d.what}>{d.what}</div> : d.what}
                </td>
                <td className="meta">
                  <span className="date">{d.approx ? '~' : ''}{formatDate(d.date)}{d.time ? `, ${d.time}` : ''}</span>
                  <span className={'rel' + (n <= 2 ? ' soon' : '')}>{when(n)}</span>
                  {d.weight ? <span className="weight">{d.weight}</span> : null}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {otherExams.length > 0 && (
        <div className="row upcoming-exams">
          <span className="muted small">More exams</span>
          {otherExams.map(d => (
            <a className="btn" key={d.course + d.date} href={hrefExam(d.course, d.date)}>
              {courseLabel(d.course)} {examName(d)} · {formatDate(d.date)}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
