// The Due now block the quiz scripts write into ledger.md, as Home, the ledger and a course page show it. The site never
// works out for itself what is due: every due, sweep and frozen mark comes from this block (parseDueBlock in markdown.ts).
import { useMemo } from 'react'
import { parseDueBlock, type DueBlock, type DueItem, type DueWhen, type FrozenGroup, type Readiness, type TopicRow } from './markdown'
import { formatDate } from './dates'
import { CourseChip, GradeChip, TopicCell } from './ui'
import { usePager } from './Pager'
import { Md } from './Md'

/** Where a ledger row stands in the block: listed as due, frozen, or neither. */
export type Standing = { kind: 'due'; when: DueWhen } | { kind: 'frozen' } | { kind: 'later' }

/** The block read from one ledger text, with the lookups the pages need; or why it could not be read. */
export type Due =
  | { ok: true; block: DueBlock; standing: (r: TopicRow) => Standing; count: (course: string) => number }
  | { ok: false; error: string }

/** The Due now block of `ledger`, ledger.md's text, read once per text. */
export function useDue(ledger: string): Due {
  return useMemo(() => readDue(ledger), [ledger])
}

function readDue(ledger: string): Due {
  const parsed = parseDueBlock(ledger)
  if (!parsed.ok) return parsed
  const { block } = parsed
  const listed = new Map(block.items.map((i) => [`${i.course}|${i.topic}`, i]))
  const frozenIn = new Set(block.frozen.map((g) => g.course))
  return {
    ok: true,
    block,
    // A row missing from the list is frozen when its course has frozen topics and its Next is before
    // block.frozenBefore (whose comment says why that is exact). Any other row is neither due nor frozen.
    standing: (r) => {
      const item = listed.get(`${r.course}|${r.topic}`)
      if (item) return { kind: 'due', when: item.when }
      const frozen = frozenIn.has(r.course) && block.frozenBefore !== null && r.next !== '' && r.next < block.frozenBefore
      return frozen ? { kind: 'frozen' } : { kind: 'later' }
    },
    count: (course) => block.items.filter((i) => i.course === course).length,
  }
}

/** What follows "Due now" in a panel title: "52 topics · Tue Oct 6", "nothing due", or "unreadable". */
export function dueDetail(due: Due): string {
  if (!due.ok) return 'unreadable'
  const { items, asOf } = due.block
  return items.length ? `${items.length} topic${items.length === 1 ? '' : 's'} · ${asOf}` : 'nothing due'
}

/** "due today", "19 d late" or "exam sweep". */
export function whenLabel(w: DueWhen): string {
  return w.kind === 'today' ? 'due today' : w.kind === 'overdue' ? `${w.days} d late` : 'exam sweep'
}

/** The block's own words, for a tooltip: "overdue 19 d", "exam sweep before Exam 2 14:00 on Fri Oct 16". */
export function whenTitle(w: DueWhen): string {
  return w.kind === 'today' ? 'due today' : w.kind === 'overdue' ? `overdue ${w.days} d` : `exam sweep before ${w.exam} on ${w.date}`
}

export const FROZEN_TITLE = "Not due: an exam that covered it is past and the course's next exam does not cover it."

/** "Exam 2 14:00" → ["Exam 2", "14:00"]: the block names an exam with its start time. */
function splitTime(exam: string): [string, string | null] {
  const m = /^(.*) (\d{1,2}:\d{2})$/.exec(exam)
  return m ? [m[1], m[2]] : [exam, null]
}

/**
 * The block as the scheduler wrote it: how many topics the sweep pulled in, the due topics paged at 10 (or the line that
 * stands in for them), the readiness lines, then the frozen line. An unreadable block shows why instead.
 */
export function DueBody({ due }: { due: Due }) {
  if (!due.ok) return <DueError error={due.error} />
  const { items, swept, nothing, readiness, frozen, frozenWhy } = due.block
  return (
    <>
      {swept > 0 && <p className="due-note">{swept} of them {swept === 1 ? 'comes' : 'come'} from the exam-week sweep.</p>}
      {items.length > 0 ? <DueTable items={items} /> : nothing && <p className="muted"><Md text={nothing} inline /></p>}
      {readiness.length > 0 && <ReadinessList rows={readiness} />}
      {frozen.length > 0 && <FrozenLine groups={frozen} why={frozenWhy} />}
    </>
  )
}

/** Due topics in the block's order: course chip, topic, why it is due, last grade. Paged at 10. */
function DueTable({ items }: { items: DueItem[] }) {
  const { rows, pager } = usePager(items)
  return (
    <>
      <table className="due">
        <tbody>
          {rows.map((i) => (
            <tr key={`${i.course}|${i.topic}`}>
              <td className="course nowrap"><CourseChip code={i.course} /></td>
              <td className="topic"><TopicCell r={i} /></td>
              <td className={'when' + (i.when.kind === 'overdue' ? ' late' : i.when.kind === 'sweep' ? ' sweep' : '')} title={whenTitle(i.when)}>{whenLabel(i.when)}</td>
              <td className="grade"><GradeChip g={i.grade} title={i.grade ? `last graded ${i.grade}` : 'not quizzed yet'} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {pager}
    </>
  )
}

/** One line per course with an exam within 21 days: "Exam 2 on Fri Oct 16 at 14:00. 0% of 12 in-scope questions likely recalled." */
function ReadinessList({ rows }: { rows: Readiness[] }) {
  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
  return (
    <div className="readiness">
      <div className="due-label">Exam readiness</div>
      <ul>
        {rows.map((r) => {
          const [exam, time] = splitTime(r.exam)
          return (
            <li key={`${r.course}|${r.exam}`}>
              <CourseChip code={r.course} />{' '}
              <b>{exam}</b> on {r.date}{time && ` at ${time}`}. <b>{r.percent}%</b> of {plural(r.questions, 'in-scope question', 'in-scope questions')} likely recalled.
              {r.bare > 0 && ` ${plural(r.bare, 'topic in scope has', 'topics in scope have')} no question.`}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** "Frozen, not due: [PHIL385] 16 topics from Exam 1. The exam that covered them is past and the course's next exam does not." */
function FrozenLine({ groups, why }: { groups: FrozenGroup[]; why: string | null }) {
  return (
    <p className="due-note">
      Frozen, not due:{' '}
      {groups.map((g, k) => (
        <span key={`${g.course}|${g.exam}`}>
          {k > 0 && ', '}<CourseChip code={g.course} /> {g.count} topic{g.count === 1 ? '' : 's'} from {splitTime(g.exam)[0]}
        </span>
      ))}
      . {why}
    </p>
  )
}

/** Why the block could not be read, in place of everything it would have shown. */
export function DueError({ error }: { error: string }) {
  return (
    <div className="due-error" role="alert">
      <p><b>The Due now block in ledger.md could not be read, so nothing is marked due.</b> {error}</p>
      <p>The morning check rewrites the block every day, and so does every quiz.</p>
    </div>
  )
}

/**
 * A course page's cell for one ledger row: the block's label in red when due (amber for an exam sweep), "frozen" muted,
 * else "next Sat Sep 20" muted. `s` is null when the block could not be read; then only the next date shows.
 */
export function StandingCell({ s, next }: { s: Standing | null; next: string }) {
  if (s?.kind === 'due') return <td className={s.when.kind === 'sweep' ? 'sweep' : 'due'} title={whenTitle(s.when)}>{whenLabel(s.when)}</td>
  if (s?.kind === 'frozen') return <td className="frozen" title={FROZEN_TITLE}>frozen</td>
  return <td className="muted">{next ? `next ${formatDate(next)}` : ''}</td>
}
