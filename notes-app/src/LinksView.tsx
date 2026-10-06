import { firstHeading, splitSections, type LinkRow } from './markdown'
import { Sections } from './Viewer'
import { CourseChip } from './ui'
import { toneStyle } from './tone'
import { LinkList } from './Links'
import { Md } from './Md'

/** links.md as grouped link lists: "Everywhere" first, then one tinted panel per course (the longest first, the rest in file order). */
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
  const count = (c: string) => rows.filter((r) => r.course === c).length
  // The groups flow down two balanced CSS columns. The course with the most links goes right after Everywhere,
  // so it tops up the short first column and the other courses fill the second one in file order.
  const courses = codes.filter((c) => c !== 'ALL')
  const longest = courses.reduce<string | null>((best, c) => (best === null || count(c) > count(best) ? c : best), null)
  const ordered = longest ? [longest, ...courses.filter((c) => c !== longest)] : courses
  const groups = (codes.includes('ALL') ? ['ALL'] : []).concat(ordered)

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
      <Sections sections={rest} path="links.md" />
    </article>
  )
}
