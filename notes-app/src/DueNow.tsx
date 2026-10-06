import { courseLabel, type TopicRow } from './markdown'
import { daysBetween, formatDate } from './dates'
import { CourseChip, LastGrade, TopicCell } from './ui'
import { usePager } from './Pager'

/** The part after "Due now": "18 topics · Wed Sep 16", or "nothing due". */
export function dueDetail(n: number, today: string): string {
  if (n === 0) return 'nothing due'
  return `${n} topic${n === 1 ? '' : 's'} · ${formatDate(today)}`
}

/** Panel title: "Due now · 18 topics · Wed Sep 16", or "Due now · nothing due". */
export function dueTitle(n: number, today: string): string {
  return `Due now · ${dueDetail(n, today)}`
}

/** Topics whose Next is on or before today, most overdue first, then by course and topic. */
export function dueRows(topics: TopicRow[], today: string): TopicRow[] {
  return topics
    .filter((r) => r.next && r.next <= today)
    .sort((a, b) => a.next.localeCompare(b.next) || a.course.localeCompare(b.course) || a.topic.localeCompare(b.topic))
}

/** The nearest future review date and the topics that come due on it. */
function nextUp(topics: TopicRow[], today: string): { date: string; rows: TopicRow[] } | null {
  const date = topics.map((r) => r.next).filter((n) => n > today).sort()[0]
  if (!date) return null
  return { date, rows: topics.filter((r) => r.next === date) }
}

export const rowKey = (r: TopicRow) => `${r.course}|${r.topic}`

/** Due topics as dueRows sorts them: course chip, topic, how late, last grade. Paged at 10. */
export function DueTable({ rows, today }: { rows: TopicRow[]; today: string }) {
  const { rows: shown, pager } = usePager(rows)
  return (
    <>
      <table className="due">
        <tbody>
          {shown.map((r) => {
            const late = daysBetween(r.next, today)
            return (
              <tr key={rowKey(r)}>
                <td className="course nowrap"><CourseChip code={r.course} /></td>
                <td className="topic"><TopicCell topic={r.topic} /></td>
                <td className={'when' + (late > 0 ? ' late' : '')}>{late > 0 ? `${late} d late` : 'today'}</td>
                <td className="grade"><LastGrade r={r} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {pager}
    </>
  )
}

/** "Nothing due today. Next: 5 topics on Sat Sep 20 (STAT 251, PHIL 385)." */
export function NothingDue({ topics, today }: { topics: TopicRow[]; today: string }) {
  const next = nextUp(topics, today)
  const courses = next ? [...new Set(next.rows.map((r) => r.course))].sort().map(courseLabel) : []
  return (
    <p className="muted">
      Nothing due today.
      {next && <> Next: {next.rows.length} topic{next.rows.length === 1 ? '' : 's'} on <b>{formatDate(next.date)}</b> ({courses.join(', ')}).</>}
    </p>
  )
}
