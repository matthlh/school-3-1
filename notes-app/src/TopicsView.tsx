import { splitRow, splitSections, type Grade, type TopicRow } from './markdown'
import { courseOf } from './files'
import { normQuestion } from './stats'
import { GradeChip, NextCell } from './ui'
import { formatDate, isISODate, todayISO } from './dates'
import { Md } from './Md'
import { usePager } from './Pager'

const LADDER = 'Spacing ladder — X missed: asked again tomorrow · ~ shaky: +3 days · O solid: +7 days, then +16, then +35'
const COVERED = 'A topic is covered once the ledger shows it quizzed at least once. Every grade and date here comes from the ledger.'

interface Row { id: string; text: string; g: Grade | null; last: string; next: string }

const RANK: Record<Grade, number> = { X: 0, '~': 1, O: 2 }   // lower is worse, as quizlib's GRADE_RANK

/** quizlib.codes_of: the LO codes a `#` cell or a ledger topic starts with. '1b–c Box plots' → 1b, 1c; '3z–aa' → 3z, 3aa; '7' → none. */
function loCodes(s: string): string[] {
  const m = /^\s*(\d+)([a-z]{1,2})(?:[–-]([a-z]{1,2}))?\b/.exec(s)
  if (!m) return []
  const [, num, a, b] = m
  if (!b || a.length !== 1 || b.length !== 1) return b ? [num + a, num + b] : [num + a]
  const from = a.charCodeAt(0)
  return Array.from({ length: b.charCodeAt(0) - from + 1 }, (_, i) => num + String.fromCharCode(from + i))
}

/**
 * The ledger rows a topic-table row stands for, found the way quizlib.match_topic finds a question tag's row: the same
 * words after quizlib's norm, else one a prefix of the other (6+ characters), else a shared LO code. So STAT 251's 1b
 * row stands for every ledger row whose topic starts with a code covering 1b.
 */
function ledgerRowsOf(id: string, text: string, ledger: TopicRow[]): TopicRow[] {
  const t = normQuestion(text)
  const words = ledger.map((r) => normQuestion(r.topic))
  const same = ledger.filter((_, i) => words[i] === t)
  if (same.length) return same
  const prefix = ledger.filter((_, i) => Math.min(words[i].length, t.length) >= 6 && (words[i].startsWith(t) || t.startsWith(words[i])))
  if (prefix.length) return prefix
  const codes = loCodes(id)
  return ledger.filter((r) => loCodes(r.topic).some((c) => codes.includes(c)))
}

/** A row's chip and dates from its ledger rows: the worst grade among them, the latest Last and the earliest Next. No
 *  grade (none of them quizzed yet, or no ledger row at all) means not covered yet. */
function topicRow(id: string, text: string, ledger: TopicRow[]): Row {
  const rs = ledgerRowsOf(id, text, ledger)
  const grades = rs.flatMap((r) => (r.grade ? [r.grade] : []))
  return {
    id, text,
    g: grades.length ? grades.reduce((a, b) => (RANK[b] < RANK[a] ? b : a)) : null,
    last: rs.map((r) => r.last).filter(isISODate).sort().pop() ?? '',
    next: rs.map((r) => r.next).filter(Boolean).sort()[0] ?? '',
  }
}

/** A topic table (first column `#`, the row's number or LO code, then its topic or outcome) → rows; anything else,
 *  such as the Look-alikes table → null (rendered as markdown). */
function outcomeRows(body: string, ledger: TopicRow[]): Row[] | null {
  const lines = body.split('\n').filter((l) => l.trim().startsWith('|'))
  if (lines.length < 2 || splitRow(lines[0])[0] !== '#') return null
  return lines.slice(1).map(splitRow).filter((c) => c.length >= 2 && c[0] && !/^-+$/.test(c[0])).map((c) => topicRow(c[0], c[1], ledger))
}
const withoutTables = (body: string) => body.split('\n').filter((l) => !l.trim().startsWith('|')).join('\n').trim()

/** One chapter's outcomes: grade chip, id, text, next date. Paged at 10. */
function OutcomeTable({ rows, path, today }: { rows: Row[]; path: string; today: string }) {
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
              <NextCell next={r.next} today={today} />
            </tr>
          ))}
        </tbody>
      </table>
      {pager}
    </>
  )
}

/**
 * 01-topics.md: each chapter's topic table, every row with a grade chip and next date from the ledger (`topics`, the
 * parsed All topics table). The preamble's prose (title, notes for Claude) is dropped, but a file with no chapters
 * keeps its one table there, and that table is shown.
 */
export function TopicsView({ path, text, topics }: { path: string; text: string; topics: TopicRow[] }) {
  const today = todayISO()
  const ledger = topics.filter((r) => r.course === courseOf(path))
  const [pre, ...rest] = splitSections(text)
  const preRows = outcomeRows(pre.body, ledger)
  const named = rest.filter((s) => s.heading)
  const all = [...(preRows ?? []), ...named.flatMap((s) => outcomeRows(s.body, ledger) ?? [])]
  const covered = all.filter((r) => r.g).length
  return (
    <article>
      <div className="legend key">
        <span><GradeChip g="X" /> missed</span><span><GradeChip g="~" /> shaky</span><span><GradeChip g="O" /> solid</span>
        <span><GradeChip g={null} /> not covered yet</span>
        <span className="hint" title={LADDER}>when do topics come back?</span>
        <span className="muted right" title={COVERED}>{covered} of {all.length} covered</span>
      </div>
      {preRows && <OutcomeTable rows={preRows} path={path} today={today} />}
      {named.map((s) => {
        const rows = outcomeRows(s.body, ledger)
        const prose = rows ? withoutTables(s.body) : ''
        return (
          <section key={s.id} id={'sec-' + s.id}>
            <h2>{s.heading}</h2>
            {rows ? <OutcomeTable rows={rows} path={path} today={today} /> : <Md text={s.body} path={path} />}
            {prose && <Md text={prose} path={path} />}
          </section>
        )
      })}
    </article>
  )
}
