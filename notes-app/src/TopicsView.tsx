import { splitSections, type Grade } from './markdown'
import { GradeChip } from './StatViews'
import { todayISO } from './stats'
import { Md } from './Md'

const LADDER = 'Spacing ladder — X missed: asked again tomorrow · ~ shaky: +3 days · O solid: +7 days, then +16, then +35'

interface Row { id: string; text: string; g: Grade | null; last: string; next: string }

/** A topic table with a Status/Grade column → rows; anything else → null (rendered as markdown). */
function parseTable(body: string): Row[] | null {
  const lines = body.split('\n').filter((l) => l.trim().startsWith('|'))
  if (lines.length < 2) return null
  const cells = (l: string) => l.trim().split('|').slice(1, -1).map((c) => c.trim())
  const head = cells(lines[0]).map((h) => h.toLowerCase())
  const iS = head.findIndex((h) => /status|grade/.test(h))
  const iN = head.findIndex((h) => /^next/.test(h))
  const iL = head.findIndex((h) => /^last/.test(h))
  if (iS < 0) return null
  return lines.slice(1).map(cells).filter((c) => c.length >= 2 && c[0] && !/^-+$/.test(c[0])).map((c) => ({
    id: c[0], text: c[1],
    g: c[iS] === 'X' || c[iS] === '~' || c[iS] === 'O' ? c[iS] : null,
    last: iL >= 0 ? c[iL] ?? '' : '', next: iN >= 0 ? c[iN] ?? '' : '',
  }))
}
const withoutTables = (body: string) => body.split('\n').filter((l) => !l.trim().startsWith('|')).join('\n').trim()

/** 01-topics.md: the preamble is dropped; each chapter is a status table with chips and due dates. */
export function TopicsView({ path, text }: { path: string; text: string }) {
  const today = todayISO()
  const [, ...rest] = splitSections(text)
  const named = rest.filter((s) => s.heading)
  const all = named.flatMap((s) => parseTable(s.body) ?? [])
  const covered = all.filter((r) => r.g).length
  return (
    <article>
      <div className="legend key">
        <span><GradeChip g="X" /> missed</span><span><GradeChip g="~" /> shaky</span><span><GradeChip g="O" /> solid</span>
        <span><GradeChip g={null} /> not covered yet</span>
        <span className="hint" title={LADDER}>when do topics come back?</span>
        <span className="muted right">{covered} of {all.length} covered</span>
      </div>
      {named.map((s) => {
        const rows = parseTable(s.body)
        const prose = rows ? withoutTables(s.body) : ''
        return (
          <section key={s.id}>
            <h2>{s.heading}</h2>
            {rows ? (
              <table className="topics outcomes">
                <tbody>
                  {rows.map((r) => {
                    const due = !!r.next && r.next <= today
                    return (
                      <tr key={r.id} className={r.g ? '' : 'later'}>
                        <td><GradeChip g={r.g} title={r.last ? `last quizzed ${r.last}` : undefined} /></td>
                        <td className="id">{r.id}</td>
                        <td><Md text={r.text} path={path} inline /></td>
                        <td className={due ? 'due' : 'muted'}>{r.next ? (due ? `due ${r.next}` : `next ${r.next}`) : ''}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : <Md text={s.body} path={path} />}
            {prose && <Md text={prose} path={path} />}
          </section>
        )
      })}
    </article>
  )
}
