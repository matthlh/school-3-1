import { useMemo, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import type { Texts, Tree } from './files'
import { courseOf, hrefFor, labelFor } from './files'
import { splitSections } from './markdown'
import { hrefAnchor, hrefCourse, scrollIfSame } from './routes'
import { toneStyle } from './tone'
import { VERIFY } from './CoursePage'

/** One `## ` section of one file (the preamble too), with its text lowercased once for matching. `page` names where
 *  `href` goes. */
interface Part { key: string; path: string; href: string; page: string; heading: string | null; lines: string[]; lower: string }
/** A section holding every term: `full` lines hold all of them, `count` lines hold at least one, `snippets` show them. */
interface Hit extends Part { full: number; count: number; snippets: string[] }

/** Hits shown at first, and how many more each "Show more" adds. */
const BATCH = 20
const SNIPPETS = 4

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const clean = (line: string) => line.replace(/^[#>*\-\s|]+/, '').replace(/^Q:\s*/, '').replace(/\*\*/g, '').trim()

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const re = new RegExp(`(${terms.map(escapeRe).join('|')})`, 'ig')
  return <>{text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}</>
}

/**
 * Every file cut into its `## ` sections, as the viewer cuts it, so a hit links to the id its section gets there. A
 * syllabus checklist ("To verify", "To do") shows on the course Overview instead of the syllabus page, so its hits link
 * there. A line that is only an HTML comment, such as the Due now block's date line, never renders, so search skips it.
 */
function sectionsOf(all: Texts, tree: Tree): Part[] {
  return Object.entries(all).flatMap(([path, text]) => splitSections(text).map((s, i) => {
    const code = /^courses\/([^/]+)\/00-syllabus\.md$/.exec(path)?.[1]
    const overview = code !== undefined && s.heading !== null && VERIFY.test(s.heading)
    const lines = s.body.split('\n').filter((l) => !/^\s*<!--.*-->\s*$/.test(l))
    return {
      key: `${path}:${i}`, path,
      href: overview ? hrefCourse(code) : s.heading ? hrefAnchor(path, s.id) : hrefFor(path),
      page: overview ? 'Overview' : labelFor(path, tree),
      heading: s.heading, lines, lower: `${s.heading ?? ''}\n${lines.join('\n')}`.toLowerCase(),
    }
  }))
}

/**
 * Sections holding every term, anywhere in the section. Best first: the most lines holding all the terms, then the
 * most lines holding any (the heading counts as a line). The snippets are the body lines holding the most terms, in
 * reading order.
 */
function search(parts: Part[], terms: string[]): Hit[] {
  const hits: Hit[] = []
  for (const p of parts) {
    if (!terms.every((t) => p.lower.includes(t))) continue
    const rows = [p.heading ?? '', ...p.lines]
      .map((line, i) => { const s = line.toLowerCase(); return { i, line, n: terms.filter((t) => s.includes(t)).length } })
      .filter((r) => r.n > 0)
    const best = rows.filter((r) => r.i > 0).sort((a, b) => b.n - a.n).slice(0, SNIPPETS).sort((a, b) => a.i - b.i)
    const full = rows.filter((r) => r.n === terms.length).length
    hits.push({ ...p, full, count: rows.length, snippets: best.map((r) => clean(r.line)).filter(Boolean) })
  }
  return hits.sort((a, b) => b.full - a.full || b.count - a.count)
}

/** Every `## ` section that holds all the terms, each linked to its place on the page; the first BATCH, then more on request. */
export function SearchResults({ query, all, tree, onPick }: { query: string; all: Texts; tree: Tree; onPick: () => void }) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const parts = useMemo(() => sectionsOf(all, tree), [all, tree])
  const key = terms.join(' ')
  const [more, setMore] = useState({ key, count: BATCH })
  const count = more.key === key ? more.count : BATCH // a new query starts again at BATCH

  if (terms.length === 0) return null
  const hits = search(parts, terms)
  const files = new Set(hits.map((h) => h.path)).size
  // A hit on the page and section already in the URL changes no hash, so nothing else clears the search or scrolls:
  // clear it now, then scroll to the section on the page that comes back.
  const pick = (e: MouseEvent<HTMLAnchorElement>) => { flushSync(onPick); scrollIfSame(e) }
  return (
    <article>
      <h1>Search <span className="muted light">{hits.length} section{hits.length === 1 ? '' : 's'} in {files} file{files === 1 ? '' : 's'}</span></h1>
      {hits.length === 0 && <p className="muted">Nothing for “{query}”.</p>}
      {hits.slice(0, count).map((h) => {
        const code = courseOf(h.path)
        return (
          <a key={h.key} className="card wide hit" href={h.href} onClick={pick}>
            <div className="name">
              {code && <span className="chip tone" style={toneStyle(code)}>{code}</span>} {h.page}
              {h.heading && <> › <Highlight text={clean(h.heading)} terms={terms} /></>}
              <span className="sub"> · {h.count}</span>
            </div>
            {h.snippets.map((l, i) => <div key={i} className="snippet"><Highlight text={l} terms={terms} /></div>)}
          </a>
        )
      })}
      {hits.length > count && (
        <div className="row">
          <button type="button" className="btn" onClick={() => setMore({ key, count: count + BATCH })}>Show more</button>
          <span className="muted small">{count} of {hits.length} shown</span>
        </div>
      )}
    </article>
  )
}
