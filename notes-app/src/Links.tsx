import type { LinkRow } from './markdown'
import { toneStyle } from './theme'

/** Pills that open course tools in a new tab. `course` narrows to that course (ALL rows excluded). */
export function LinkChips({ rows, course }: { rows: LinkRow[]; course?: string }) {
  const list = course ? rows.filter((r) => r.course === course) : rows
  if (list.length === 0) return null
  return (
    <div className="row links">
      {list.map((r) => (
        <a key={r.course + r.url + r.name} className="btn link" style={r.course === 'ALL' ? undefined : toneStyle(r.course)}
           href={r.url} target="_blank" rel="noreferrer" title={r.url}>
          {course ? '' : r.course === 'ALL' ? '' : `${r.course} · `}{r.name}
        </a>
      ))}
    </div>
  )
}
