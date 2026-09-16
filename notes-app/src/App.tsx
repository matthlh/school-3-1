import { useEffect, useMemo, useRef, useState } from 'react'
import { buildTree, courseOf, labelFor, loadAll, loadQuizState, type QuizState, type Texts } from './files'
import { parseCalendar, parseLedgerTopics, parseLinks } from './markdown'
import { darkQuery } from './theme'
import { tallyByCourse } from './stats'
import { HREF_HOME, hrefCourse, parseHash, type Route } from './routes'
import { TopBar, type Crumb } from './TopBar'
import { Sidebar } from './Sidebar'
import { Home } from './Home'
import { CoursePage } from './CoursePage'
import { Viewer } from './Viewer'
import { LedgerView } from './LedgerView'
import { TopicsView } from './TopicsView'
import { CourseHeader, scopedCourse } from './CourseTabs'
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
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const [query, setQuery] = useState('')
  const [pinned, setPinned] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadAll().then(setAll); loadQuizState().then(setQuiz) }, [])
  // New route: back to the top, unless it names a `#section` — then scroll there once the content exists.
  useEffect(() => {
    setQuery('')
    const anchor = route.kind === 'file' ? route.anchor : undefined
    if (!anchor) { window.scrollTo(0, 0); return }
    const el = document.getElementById('sec-' + anchor)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [route, all])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.tagName === 'INPUT'
      if (e.key === '/' && !typing) { e.preventDefault(); searchRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const topics = useMemo(() => parseLedgerTopics(all?.['ledger.md'] ?? ''), [all])

  const links = useMemo(() => parseLinks(all?.['links.md'] ?? ''), [all])
  const calendar = useMemo(() => parseCalendar(all?.['ledger.md'] ?? '', new Date().getFullYear()), [all])

  // Course tints are picked in JS from the colour scheme; re-render when the OS setting flips or the toggle fires.
  const [, setScheme] = useState(0)
  useEffect(() => {
    const onChange = () => setScheme((n) => n + 1)
    const q = darkQuery()
    q?.addEventListener('change', onChange)
    window.addEventListener('themechange', onChange)
    return () => { q?.removeEventListener('change', onChange); window.removeEventListener('themechange', onChange) }
  }, [])
  const tallies = useMemo(() => tallyByCourse(topics), [topics])

  const current = route.kind === 'file' ? route.path : route.kind === 'course' ? `course/${route.code}` : ''
  const crumbs: Crumb[] = [{ label: 'Home', href: HREF_HOME }]
  if (route.kind === 'course') crumbs.push({ label: route.code, tone: route.code })
  if (route.kind === 'file') {
    const code = courseOf(route.path)
    if (code) crumbs.push({ label: code, href: hrefCourse(code), tone: code })
    crumbs.push({ label: labelFor(route.path, tree) })
  }
  useEffect(() => { document.title = crumbs[crumbs.length - 1].label }, [crumbs])

  const scoped = route.kind === 'course' ? route.code : route.kind === 'file' ? scopedCourse(route.path) : null

  let body
  if (!all) body = <p className="muted">Loading…</p>
  else if (query.trim()) body = <SearchResults query={query} all={all} tree={tree} />
  else if (route.kind === 'home') body = <Home tree={tree} all={all} tallies={tallies} topics={topics} calendar={calendar} />
  else if (route.kind === 'course') body = <CoursePage code={route.code} tree={tree} all={all} topics={topics} tallies={tallies} links={links} />
  else if (!(route.path in all)) body = <article><h1>Not found</h1><p><code>{route.path}</code></p></article>
  else if (route.path === 'ledger.md') body = <LedgerView text={all['ledger.md']} topics={topics} calendar={calendar} quiz={quiz} />
  else if (route.path.endsWith('/02-questions.md')) body = <QuestionBank path={route.path} text={all[route.path]} quiz={quiz} />
  else if (route.path.endsWith('/01-topics.md')) body = <TopicsView path={route.path} text={all[route.path]} />
  else body = <Viewer path={route.path} text={all[route.path]} hideTitle={!!scoped} />

  return (
    <div className={'wrap' + (pinned ? ' pinned' : '')}>
      <Sidebar tree={tree} current={current} pinned={pinned} tallies={tallies} />
      <TopBar crumbs={crumbs} query={query} onQuery={setQuery} onMenu={() => setPinned((v) => !v)} pinned={pinned} inputRef={searchRef} />
      <main className={scoped && route.kind === 'course' ? 'wide' : undefined}>
        {scoped && all && !query.trim() && <CourseHeader code={scoped} tree={tree} all={all} current={current} />}
        {body}
      </main>
    </div>
  )
}
