import { firstHeading, splitSections, type LinkRow } from './markdown'
import { CourseChip } from './DueNow'
import { toneStyle } from './theme'
import { LinkList } from './Links'
import { Md } from './Md'

/** Trailing sections kept for Claude render folded shut, like the Viewer does. */
const FOLDED = /reference|for claude/i

/** links.md as grouped link lists: "Everywhere" first, then one tinted panel per course in file order. */
export function LinksView({ text, rows }: { text: string; rows: LinkRow[] }) {
  const [pre, ...rest] = splitSections(text)
  const title = firstHeading(text) ?? 'Links'
  // The prose before the table: the preamble without its `# ` line and without the table's `|` lines.
  const intro = pre.body
    .replace(/^\s*#\s[^\n]*\n?/, '')
    .split('\n')
    .filter((l) => !l.trim().startsWith('|'))
    .join('\n')
    .trim()
  const codes = [...new Set(rows.map((r) => r.course))]
  const courses = codes.filter((c) => c !== 'ALL')
  const groups = (codes.includes('ALL') ? ['ALL'] : []).concat(courses)

  return (
    <article>
      <h1>{title}</h1>
      {intro && <Md text={intro} path="links.md" />}
      <div className="linkgroups">
        {groups.map((code) => (
          <section key={code} className="panel" style={code === 'ALL' ? undefined : toneStyle(code)}>
            <div className="panel-head">
              {code === 'ALL'
                ? <span>Everywhere</span>
                : <CourseChip code={code} />}
            </div>
            <LinkList rows={rows} course={code} />
          </section>
        ))}
      </div>
      {rest.map((s) =>
        s.heading && FOLDED.test(s.heading) ? (
          <details key={s.id} id={'sec-' + s.id}>
            <summary>{s.heading}</summary>
            <Md text={s.body} path="links.md" />
          </details>
        ) : (
          <section key={s.id} id={'sec-' + s.id}>
            {s.heading && <h2>{s.heading}</h2>}
            <Md text={s.body} path="links.md" />
          </section>
        ),
      )}
    </article>
  )
}
