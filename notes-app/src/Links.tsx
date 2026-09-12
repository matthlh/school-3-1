import type { LinkRow } from './markdown'

/** Compact vertical list of a course's tool links (opens in a new tab). */
export function LinkList({ rows, course }: { rows: LinkRow[]; course: string }) {
  const list = rows.filter((r) => r.course === course)
  if (list.length === 0) return null
  return (
    <ul className="linklist">
      {list.map((r) => <li key={r.url + r.name}><a href={r.url} target="_blank" rel="noreferrer" title={r.url}>{r.name}</a></li>)}
    </ul>
  )
}
