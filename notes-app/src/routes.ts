export type Route =
  | { kind: 'home' }
  | { kind: 'course'; code: string }
  | { kind: 'file'; path: string; anchor?: string }

/** `#/courses/X/file.md#section-id` → file route with an in-page anchor (the element id is `sec-<anchor>`). */
export function parseHash(hash: string): Route {
  const s = decodeURIComponent(hash.replace(/^#\/?/, ''))
  if (!s) return { kind: 'home' }
  const m = /^course\/([^/]+)$/.exec(s)
  if (m) return { kind: 'course', code: m[1] }
  const i = s.indexOf('#')
  if (i >= 0) return { kind: 'file', path: s.slice(0, i), anchor: s.slice(i + 1) || undefined }
  return { kind: 'file', path: s }
}

export const HREF_HOME = '#/'
export const hrefCourse = (code: string) => `#/course/${code}`
/** Link to a `## Heading` inside a file: `hrefAnchor('ledger.md', 'term-calendar-hard-dates')`. */
export const hrefAnchor = (path: string, anchor: string) => `#/${path}#${anchor}`

/** onClick for anchor links: when the URL already carries this anchor no hashchange fires, so scroll by hand. */
export function scrollIfSame(e: { currentTarget: HTMLAnchorElement }) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || window.location.hash !== href) return
  const id = href.slice(href.lastIndexOf('#') + 1)
  document.getElementById('sec-' + id)?.scrollIntoView({ block: 'start' })
}
