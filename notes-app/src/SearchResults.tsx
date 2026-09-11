import { useMemo } from 'react'
import type { Texts, Tree } from './files'
import { courseOf, hrefFor, labelFor } from './files'

interface Hit { path: string; lines: string[]; score: number }

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const clean = (line: string) => line.replace(/^[#>*\-\s|]+/, '').replace(/^Q:\s*/, '').replace(/\*\*/g, '').trim()

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const re = new RegExp(`(${terms.map(escapeRe).join('|')})`, 'ig')
  return <>{text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}</>
}

export function SearchResults({ query, all, tree }: { query: string; all: Texts; tree: Tree }) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const hits = useMemo<Hit[]>(() => {
    if (terms.length === 0) return []
    const out: Hit[] = []
    for (const [path, text] of Object.entries(all)) {
      const lines = text.split('\n').filter((l) => { const s = l.toLowerCase(); return terms.every((t) => s.includes(t)) })
      if (lines.length) out.push({ path, lines: lines.map(clean).filter(Boolean).slice(0, 4), score: lines.length })
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 25)
  }, [all, query]) // eslint-disable-line react-hooks/exhaustive-deps

  if (terms.length === 0) return null
  const total = hits.reduce((n, h) => n + h.score, 0)
  return (
    <article>
      <h1>Search <span className="muted light">{total} match{total === 1 ? '' : 'es'} in {hits.length} file{hits.length === 1 ? '' : 's'}</span></h1>
      {hits.length === 0 && <p className="muted">Nothing for “{query}”.</p>}
      {hits.map((h) => (
        <a key={h.path} className="card wide hit" href={hrefFor(h.path)}>
          <div className="name">
            {courseOf(h.path) && <span className="chip">{courseOf(h.path)}</span>} {labelFor(h.path, tree)}
            <span className="sub"> · {h.score}</span>
          </div>
          {h.lines.map((l, i) => <div key={i} className="snippet"><Highlight text={l} terms={terms} /></div>)}
        </a>
      ))}
    </article>
  )
}
