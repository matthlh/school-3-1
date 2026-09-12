import type { Deadline } from './markdown'
import { hrefFor } from './files'
import { hrefCourse } from './routes'
import { toneStyle } from './theme'

function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000)
}
const when = (n: number) => (n === 0 ? 'today' : n === 1 ? 'tomorrow' : `in ${n} days`)
const nice = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

/** The next few hard dates from the ledger's term calendar. */
export function Upcoming({ items, today, limit = 7 }: { items: Deadline[]; today: string; limit?: number }) {
  const next = items.filter((d) => d.date >= today).slice(0, limit)
  if (next.length === 0) return null
  return (
    <section className="panel">
      <div className="panel-head"><span>Coming up</span><a href={hrefFor('ledger.md')}>all dates →</a></div>
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
