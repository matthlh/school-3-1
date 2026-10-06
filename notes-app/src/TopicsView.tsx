import { splitRow, splitSections, type Grade, type TopicRow } from './markdown'
import { courseOf } from './files'
import { loCodes, matchTopic } from './stats'
import { GradeChip } from './ui'
import { DueError, StandingCell, type Due, type Standing } from './DueNow'
import { formatDate, isISODate } from './dates'
import { Md } from './Md'
import { usePager } from './Pager'

const LADDER = 'Spacing ladder — X missed: asked again tomorrow · ~ shaky: +3 days · O solid: +7 days, then +16, then +35'
const COVERED = 'A topic is covered once the ledger shows it quizzed at least once. Every grade and date here comes from the ledger.'

interface Row { id: string; text: string; g: Grade | null; last: string; standing: Standing | null; next: string }

const RANK: Record<Grade, number> = { X: 0, '~': 1, O: 2 }   // lower is worse, as quizlib's GRADE_RANK

/**
 * Where a topic-table row stands when it stands for several ledger rows: the most overdue of those the Due now block
 * lists (due today after any overdue one, an exam sweep last), else frozen when every one is frozen, else later, with
 * the earliest Next among those not frozen. The standing is null when the block could not be read.
 */
function standingOf(rs: TopicRow[], due: Due): { standing: Standing | null; next: string } {
  const earliest = (from: TopicRow[]) => from.map((r) => r.next).filter(Boolean).sort()[0] ?? ''
  if (!due.ok) return { standing: null, next: earliest(rs) }
  const ss = rs.map((r) => due.standing(r))
  const lateness = (s: Standing) => (s.kind !== 'due' ? -2 : s.when.kind === 'overdue' ? s.when.days : s.when.kind === 'today' ? 0 : -1)
  const worst = ss.filter((s) => s.kind === 'due').sort((a, b) => lateness(b) - lateness(a))[0]
  if (worst) return { standing: worst, next: '' }
  if (ss.length > 0 && ss.every((s) => s.kind === 'frozen')) return { standing: ss[0], next: '' }
  return { standing: { kind: 'later' }, next: earliest(rs.filter((_, i) => ss[i].kind !== 'frozen')) }
}

/**
 * A row's chip and dates from the ledger rows it stands for, found as the quiz scripts find a Topic tag's row
 * (matchTopic), with the LO codes of its `#` cell: so STAT 251's 1b row stands for every ledger row whose topic starts
 * with a code covering 1b. The chip is the worst grade among them, the date the latest Last, and the standing comes from
 * the Due now block. No grade (none of them quizzed yet, or no ledger row at all) means not covered yet.
 */
function topicRow(course: string, id: string, text: string, ledger: TopicRow[], due: Due): Row {
  const rs = matchTopic(course, text, loCodes(id), ledger)
  const grades = rs.flatMap((r) => (r.grade ? [r.grade] : []))
  return {
    id, text,
    g: grades.length ? grades.reduce((a, b) => (RANK[b] < RANK[a] ? b : a)) : null,
    last: rs.map((r) => r.last).filter(isISODate).sort().pop() ?? '',
    ...standingOf(rs, due),
  }
}

/** A topic table (first column `#`, the row's number or LO code, then its topic or outcome) → rows; anything else,
 *  such as the Look-alikes table → null (rendered as markdown). */
function outcomeRows(body: string, course: string, ledger: TopicRow[], due: Due): Row[] | null {
  const lines = body.split('\n').filter((l) => l.trim().startsWith('|'))
  if (lines.length < 2 || splitRow(lines[0])[0] !== '#') return null
  return lines.slice(1).map(splitRow).filter((c) => c.length >= 2 && c[0] && !/^-+$/.test(c[0])).map((c) => topicRow(course, c[0], c[1], ledger, due))
}
const withoutTables = (body: string) => body.split('\n').filter((l) => !l.trim().startsWith('|')).join('\n').trim()

/** One chapter's outcomes: grade chip, id, text, standing. Paged at 10. */
function OutcomeTable({ rows, path }: { rows: Row[]; path: string }) {
  const { rows: shown, pager } = usePager(rows)
  return (
    <>
      <table className="topics outcomes">
        <tbody>
          {shown.map((r) => (
            <tr key={r.id} className={r.g ? '' : 'later'}>
              <td><GradeChip g={r.g} title={isISODate(r.last) ? `last quizzed ${formatDate(r.last)}` : undefined} /></td>
              <td className="id">{r.id}</td>
              <td><Md text={r.text} path={path} inline /></td>
              <StandingCell s={r.standing} next={r.next} />
            </tr>
          ))}
        </tbody>
      </table>
      {pager}
    </>
  )
}

/**
 * 01-topics.md: each chapter's topic table, every row with a grade chip from the ledger (`topics`, the parsed All topics
 * table) and its standing in the Due now block (`due`), as a course page shows them. The preamble's prose (title, notes
 * for Claude) is dropped, but a file with no chapters keeps its one table there, and that table is shown.
 */
export function TopicsView({ path, text, topics, due }: { path: string; text: string; topics: TopicRow[]; due: Due }) {
  const course = courseOf(path) ?? ''
  const [pre, ...rest] = splitSections(text)
  const preRows = outcomeRows(pre.body, course, topics, due)
  const named = rest.filter((s) => s.heading)
  const all = [...(preRows ?? []), ...named.flatMap((s) => outcomeRows(s.body, course, topics, due) ?? [])]
  const covered = all.filter((r) => r.g).length
  return (
    <article>
      <div className="legend key">
        <span><GradeChip g="X" /> missed</span><span><GradeChip g="~" /> shaky</span><span><GradeChip g="O" /> solid</span>
        <span><GradeChip g={null} /> not covered yet</span>
        <span className="hint" title={LADDER}>when do topics come back?</span>
        <span className="muted right" title={COVERED}>{covered} of {all.length} covered</span>
      </div>
      {!due.ok && <DueError error={due.error} />}
      {preRows && <OutcomeTable rows={preRows} path={path} />}
      {named.map((s) => {
        const rows = outcomeRows(s.body, course, topics, due)
        const prose = rows ? withoutTables(s.body) : ''
        return (
          <section key={s.id} id={'sec-' + s.id}>
            <h2>{s.heading}</h2>
            {rows ? <OutcomeTable rows={rows} path={path} /> : <Md text={s.body} path={path} />}
            {prose && <Md text={prose} path={path} />}
          </section>
        )
      })}
    </article>
  )
}
