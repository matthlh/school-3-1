import { useEffect, useMemo, useRef, useState } from 'react'
import { buildTree, courseOf, labelFor, loadAll, loadQuizState, mainFileCourse, titledByHeader, type QuizState, type Texts } from './files'
import { parseCalendar, parseLedgerTopics, parseLinks } from './markdown'
import { tallyByCourse } from './stats'
import { HREF_HOME, hrefCourse, parseHash, type Route } from './routes'
import { TopBar, type Crumb } from './TopBar'
import { Sidebar } from './Sidebar'
import { Home } from './Home'
import { CoursePage } from './CoursePage'
import { Viewer } from './Viewer'
import { LedgerView } from './LedgerView'
import { TopicsView } from './TopicsView'
import { CourseHeader } from './CourseTabs'
import { QuestionBank } from './QuestionBank'
import { LinksView } from './LinksView'
import { SearchResults } from './SearchResults'
import { UpdateToast } from './UpdateToast'
import { startUpdateChecks, takeSavedScroll } from './update'

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

/** The year the academic year began: Sep–Dec dates belong to it and Jan–May dates to the year after, even in January. */
function termYear(): number {
  const now = new Date()
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
}

export default function App() {
  const route = useRoute()
  const tree = useMemo(buildTree, [])
  const [all, setAll] = useState<Texts | null>(null)
  const [failed, setFailed] = useState(false)
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const [query, setQuery] = useState('')
  const [pinned, setPinned] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadAll().then(setAll, () => setFailed(true)); loadQuizState().then(setQuiz) }, [])
  useEffect(() => { startUpdateChecks() }, [])
  // New route: back to the top, unless it names a `#section` — then scroll there once the content exists, opening
  // it if it is folded. On a phone the sidebar covers the page, so following one of its links closes it.
  useEffect(() => {
    setQuery('')
    if (window.matchMedia('(max-width: 640px)').matches) setPinned(false)
    // After one of our own reloads (update.ts) land where he was, once the content exists.
    if (all) { const y = takeSavedScroll(window.location.hash); if (y !== null) { window.scrollTo(0, y); return } }
    const anchor = route.kind === 'file' ? route.anchor : undefined
    const el = anchor ? document.getElementById('sec-' + anchor) : null
    if (!el) { window.scrollTo(0, 0); return }
    if (el instanceof HTMLDetailsElement) el.open = true
    el.scrollIntoView({ block: 'start' })
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
  const calendar = useMemo(() => parseCalendar(all?.['ledger.md'] ?? '', termYear()), [all])
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

  const scoped = route.kind === 'course' ? route.code : route.kind === 'file' ? mainFileCourse(route.path) : null

  let body
  if (failed) body = <p className="muted">Some notes failed to load. <button type="button" className="link" onClick={() => window.location.reload()}>Reload</button></p>
  else if (!all) body = <p className="muted">Loading…</p>
  else if (query.trim()) body = <SearchResults query={query} all={all} tree={tree} onPick={() => setQuery('')} />
  else if (route.kind === 'home') body = <Home tree={tree} all={all} tallies={tallies} topics={topics} calendar={calendar} />
  else if (route.kind === 'course') body = <CoursePage code={route.code} tree={tree} all={all} topics={topics} tallies={tallies} links={links} />
  else if (!(route.path in all)) body = <article><h1>Not found</h1><p><code>{route.path}</code></p></article>
  else if (route.path === 'ledger.md') body = <LedgerView text={all['ledger.md']} topics={topics} calendar={calendar} quiz={quiz} />
  else if (route.path.endsWith('/02-questions.md')) body = <QuestionBank key={route.path} path={route.path} text={all[route.path]} quiz={quiz} all={all} />
  else if (route.path.endsWith('/01-topics.md')) body = <TopicsView path={route.path} text={all[route.path]} />
  else if (route.path === 'links.md') body = <LinksView text={all['links.md']} rows={links} />
  else body = <Viewer path={route.path} text={all[route.path]} hideTitle={titledByHeader(route.path)} />

  return (
    <div className={'wrap' + (pinned ? ' pinned' : '')}>
      <Sidebar tree={tree} current={current} pinned={pinned} tallies={tallies} />
      <TopBar crumbs={crumbs} query={query} onQuery={setQuery} onMenu={() => setPinned((v) => !v)} pinned={pinned} inputRef={searchRef} />
      <main className={scoped && route.kind === 'course' ? 'wide' : undefined}>
        {scoped && all && !query.trim() && <CourseHeader code={scoped} tree={tree} all={all} current={current} />}
        {body}
      </main>
      <UpdateToast />
    </div>
  )
}
