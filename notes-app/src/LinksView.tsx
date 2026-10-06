import { firstHeading, splitSections, type LinkRow } from './markdown'
import { Sections } from './Viewer'
import { CourseChip } from './ui'
import { toneStyle } from './tone'
import { LinkList } from './Links'
import { Md } from './Md'

/**
 * links.md's rows as groups: "Everywhere" first, then one tinted panel per course. The groups flow down balanced CSS
 * columns, so the course with the most links goes right after Everywhere, topping up the short first column, and the
 * other courses follow in file order. The links page and Home both show these.
 */
export function LinkGroups({ rows }: { rows: LinkRow[] }) {
  const codes = [...new Set(rows.map((r) => r.course))]
  const count = (c: string) => rows.filter((r) => r.course === c).length
  const courses = codes.filter((c) => c !== 'ALL')
  const longest = courses.reduce<string | null>((best, c) => (best === null || count(c) > count(best) ? c : best), null)
  const ordered = longest ? [longest, ...courses.filter((c) => c !== longest)] : courses
  const groups = (codes.includes('ALL') ? ['ALL'] : []).concat(ordered)
  return (
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
  )
}

/** links.md as grouped link lists, under the file's title and the prose before its table. */
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

  return (
    <article>
      <h1>{title}</h1>
      {intro && <Md text={intro} path="links.md" />}
      <LinkGroups rows={rows} />
      <Sections sections={rest} path="links.md" />
    </article>
  )
}
