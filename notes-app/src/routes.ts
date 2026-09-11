export type Route =
  | { kind: 'home' }
  | { kind: 'course'; code: string }
  | { kind: 'file'; path: string }

export function parseHash(hash: string): Route {
  const s = decodeURIComponent(hash.replace(/^#\/?/, ''))
  if (!s) return { kind: 'home' }
  const m = /^course\/([^/]+)$/.exec(s)
  if (m) return { kind: 'course', code: m[1] }
  return { kind: 'file', path: s }
}

export const HREF_HOME = '#/'
export const hrefCourse = (code: string) => `#/course/${code}`
