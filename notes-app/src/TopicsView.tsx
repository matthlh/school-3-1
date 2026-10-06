import { splitRow, splitSections, type Grade } from './markdown'
import { GradeChip, NextCell } from './ui'
import { formatDate, isISODate, todayISO } from './dates'
import { Md } from './Md'
import { usePager } from './Pager'

const LADDER = 'Spacing ladder — X missed: asked again tomorrow · ~ shaky: +3 days · O solid: +7 days, then +16, then +35'

interface Row { id: string; text: string; g: Grade | null; last: string; next: string }

/** A topic table with a Status/Grade column → rows; anything else → null (rendered as markdown). */
function outcomeRows(body: string): Row[] | null {
  const lines = body.split('\n').filter((l) => l.trim().startsWith('|'))
  if (lines.length < 2) return null
  const head = splitRow(lines[0]).map((h) => h.toLowerCase())
  const iS = head.findIndex((h) => /status|grade/.test(h))
  const iN = head.findIndex((h) => /^next/.test(h))
  const iL = head.findIndex((h) => /^last/.test(h))
  if (iS < 0) return null
  return lines.slice(1).map(splitRow).filter((c) => c.length >= 2 && c[0] && !/^-+$/.test(c[0])).map((c) => ({
    id: c[0], text: c[1],
    g: c[iS] === 'X' || c[iS] === '~' || c[iS] === 'O' ? c[iS] : null,
    last: iL >= 0 ? c[iL] ?? '' : '', next: iN >= 0 ? c[iN] ?? '' : '',
  }))
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
 * 01-topics.md: each chapter is a status table with chips and due dates. The preamble's prose (title, keys) is for
 * Claude and is dropped, but a file with no chapters keeps its one table there, and that table is shown.
 */
export function TopicsView({ path, text }: { path: string; text: string }) {
  const today = todayISO()
  const [pre, ...rest] = splitSections(text)
  const preRows = outcomeRows(pre.body)
  const named = rest.filter((s) => s.heading)
  const all = [...(preRows ?? []), ...named.flatMap((s) => outcomeRows(s.body) ?? [])]
  const covered = all.filter((r) => r.g).length
  return (
    <article>
      <div className="legend key">
        <span><GradeChip g="X" /> missed</span><span><GradeChip g="~" /> shaky</span><span><GradeChip g="O" /> solid</span>
        <span><GradeChip g={null} /> not covered yet</span>
        <span className="hint" title={LADDER}>when do topics come back?</span>
        <span className="muted right">{covered} of {all.length} covered</span>
      </div>
      {preRows && <OutcomeTable rows={preRows} path={path} today={today} />}
      {named.map((s) => {
        const rows = outcomeRows(s.body)
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
