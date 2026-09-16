import { slug, type Deadline } from './markdown'
import { hrefAnchor, hrefCourse } from './routes'
import { toneStyle } from './theme'
import { daysBetween, formatDate } from './stats'

/** The ledger heading the "all dates" link jumps to; its slug must match what splitSections gives that section. */
export const CALENDAR_HEADING = 'Term calendar — hard dates'

const when = (n: number) => (n === 0 ? 'today' : n === 1 ? 'tomorrow' : `in ${n} days`)
const nice = formatDate

/** The next few hard dates from the ledger's term calendar. */
export function Upcoming({ items, today, limit = 7 }: { items: Deadline[]; today: string; limit?: number }) {
  const next = items.filter((d) => d.date >= today).slice(0, limit)
  if (next.length === 0) return null
  return (
    <section className="panel">
      <div className="panel-head"><span>Coming up</span><a href={hrefAnchor('ledger.md', slug(CALENDAR_HEADING))}>all dates →</a></div>
      <table className="upcoming">
        <tbody>
          {next.map((d, i) => {
            const n = daysBetween(today, d.date)
            const generic = d.course === 'UBC' || !d.course
            return (
              <tr key={i} className={d.exam ? 'exam' : undefined}>
                <td className={'when' + (n <= 2 ? ' soon' : '')}>{when(n)}</td>
                <td className="date">{d.approx ? '~' : ''}{nice(d.date)}{d.time ? `, ${d.time}` : ''}</td>
                <td>
                  {!generic && <a href={hrefCourse(d.course)} className="chip tone" style={toneStyle(d.course)}>{d.course}</a>}
                  {generic && d.course && <span className="chip">{d.course}</span>}
                  {' '}{d.what}
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
