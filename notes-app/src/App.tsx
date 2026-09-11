import { useEffect, useMemo, useRef, useState } from 'react'
import { buildTree, courseOf, labelFor, loadAll, type Texts } from './files'
import { HREF_HOME, hrefCourse, parseHash, type Route } from './routes'
import { TopBar, type Crumb } from './TopBar'
import { Sidebar } from './Sidebar'
import { Home } from './Home'
import { CoursePage } from './CoursePage'
import { Viewer } from './Viewer'
import { QuestionBank } from './QuestionBank'
import { SearchResults } from './SearchResults'

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export default function App() {
  const route = useRoute()
  const tree = useMemo(buildTree, [])
  const [all, setAll] = useState<Texts | null>(null)
  const [query, setQuery] = useState('')
  const [pinned, setPinned] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadAll().then(setAll) }, [])
  useEffect(() => { setQuery(''); window.scrollTo(0, 0) }, [route])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.tagName === 'INPUT'
      if (e.key === '/' && !typing) { e.preventDefault(); searchRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const current = route.kind === 'file' ? route.path : route.kind === 'course' ? `course/${route.code}` : ''
  const crumbs: Crumb[] = [{ label: 'Home', href: HREF_HOME }]
  if (route.kind === 'course') crumbs.push({ label: route.code })
  if (route.kind === 'file') {
    const code = courseOf(route.path)
    if (code) crumbs.push({ label: code, href: hrefCourse(code) })
    crumbs.push({ label: labelFor(route.path, tree) })
  }
  useEffect(() => { document.title = crumbs[crumbs.length - 1].label }, [crumbs])

  let body
  if (!all) body = <p className="muted">Loading…</p>
  else if (query.trim()) body = <SearchResults query={query} all={all} tree={tree} />
  else if (route.kind === 'home') body = <Home tree={tree} all={all} />
  else if (route.kind === 'course') body = <CoursePage code={route.code} tree={tree} all={all} />
  else if (!(route.path in all)) body = <article><h1>Not found</h1><p><code>{route.path}</code></p></article>
  else if (route.path.endsWith('/02-questions.md')) body = <QuestionBank path={route.path} text={all[route.path]} title={`${courseOf(route.path)} · Question bank`} />
  else body = <Viewer path={route.path} text={all[route.path]} />

  return (
    <div className={'wrap' + (pinned ? ' pinned' : '')}>
      <Sidebar tree={tree} current={current} pinned={pinned} />
      <TopBar crumbs={crumbs} query={query} onQuery={setQuery} onMenu={() => setPinned((v) => !v)} pinned={pinned} inputRef={searchRef} />
      <main>{body}</main>
    </div>
  )
}
