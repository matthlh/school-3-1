// The Due now block the quiz scripts write into ledger.md, as Home, the ledger, a course page and a Topics tab show it.
// The site never works out for itself what is due: every due, sweep and frozen mark comes from this block (parseDueBlock
// in markdown.ts).
import { useMemo } from 'react'
import { examOnly, parseDueBlock, whenLabel, whenTitle, type DueBlock, type DueItem, type DueWhen, type FrozenGroup, type Readiness, type TopicRow } from './markdown'
import { daysBetween, formatDate, todayISO } from './dates'
import { CourseChip, GradeChip, TopicCell } from './ui'
import { usePager } from './Pager'
import { Md } from './Md'

/** Where a ledger row stands in the block: listed as due, listed as frozen (after `exam`), or neither. */
export type Standing = { kind: 'due'; when: DueWhen } | { kind: 'frozen'; exam: string } | { kind: 'later' }

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
  const listed = new Map(block.items.map((i) => [`${i.course}|${i.topic}`, i.when]))
  const frozen = new Map(block.frozenRows.map((f) => [`${f.course}|${f.topic}`, f.exam]))
  return {
    ok: true,
    block,
    standing: (r) => {
      const key = `${r.course}|${r.topic}`
      const when = listed.get(key)
      const exam = frozen.get(key)
      return when ? { kind: 'due', when } : exam !== undefined ? { kind: 'frozen', exam } : { kind: 'later' }
    },
    count: (course) => block.items.filter((i) => i.course === course).length,
  }
}

/**
 * What follows "Due now" in a panel title: "52 topics · Tue Oct 6", "nothing due · Tue Oct 6", or "unreadable". A block
 * written before today says how old it is, muted: "(2 days old)".
 */
export function DueDetail({ due }: { due: Due }) {
  if (!due.ok) return <>unreadable</>
  const { items, date } = due.block
  const age = daysBetween(date, todayISO())
  return (
    <>
      {items.length ? `${items.length} topic${items.length === 1 ? '' : 's'}` : 'nothing due'} · {formatDate(date)}
      {age > 0 && <span className="stale"> ({age} day{age === 1 ? '' : 's'} old)</span>}
    </>
  )
}

/** The block as the scheduler wrote it: how many topics the sweep pulled in, the due topics paged at 10 (or the line that
 *  stands in for them), the readiness lines, then the frozen line. An unreadable block shows why instead. */
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
          const exam = examOnly(r.exam)
          const time = r.exam.slice(exam.length).trim()
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
          {k > 0 && ', '}<CourseChip code={g.course} /> {g.count} topic{g.count === 1 ? '' : 's'} from {examOnly(g.exam)}
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
 * A ledger row's standing as a table cell (a course page's Revision panel, the ledger's All topics, a Topics tab): the
 * block's label in red when due, in amber with its exam for an exam sweep ("Exam 2 sweep"), "frozen" muted, else
 * "next Tue Oct 13" muted. `s` is null when the block could not be read; then only the next date shows.
 */
export function StandingCell({ s, next }: { s: Standing | null; next: string }) {
  if (s?.kind === 'due') return <td className={'standing ' + (s.when.kind === 'sweep' ? 'sweep' : 'late')} title={whenTitle(s.when)}>{whenLabel(s.when)}</td>
  if (s?.kind === 'frozen') {
    return <td className="standing" title={`Not due: ${examOnly(s.exam)} covered it and is past, and the course's next exam does not cover it.`}>frozen</td>
  }
  return <td className="standing">{next ? `next ${formatDate(next)}` : ''}</td>
}
