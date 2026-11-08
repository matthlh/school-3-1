import { slug, type Deadline } from './markdown'
import { hrefAnchor } from './routes'
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
  const next = items.filter((d) => d.date >= today).slice(0, limit)
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
                <td className="date">{d.approx ? '~' : ''}{formatDate(d.date)}{d.time ? `, ${d.time}` : ''}</td>
                <td>
                  {compact
                    ? <div className="clamp" title={d.what}>{calendarChip(d.course)}{' '}{d.what}</div>
                    : <>{calendarChip(d.course)}{' '}{d.what}</>}
                </td>
                <td className="weight">{d.weight}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
