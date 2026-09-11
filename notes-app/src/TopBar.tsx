import type { RefObject } from 'react'

export interface Crumb { label: string; href?: string }

export function TopBar({ crumbs, query, onQuery, onMenu, pinned, inputRef }: {
  crumbs: Crumb[]
  query: string
  onQuery: (q: string) => void
  onMenu: () => void
  pinned: boolean
  inputRef: RefObject<HTMLInputElement>
}) {
  return (
    <header className="topbar">
      <button className={'menu' + (pinned ? ' on' : '')} onClick={onMenu} title="Pin sidebar" aria-label="Toggle sidebar">☰</button>
      <div className="crumbs">
        {crumbs.map((c, i) => (
          <span key={i}>
            {i > 0 && <span className="sep">›</span>}
            {c.href ? <a href={c.href}>{c.label}</a> : <span className="here">{c.label}</span>}
          </span>
        ))}
      </div>
      <div className="search">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search notes   /"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Escape') { onQuery(''); e.currentTarget.blur() } }}
        />
      </div>
    </header>
  )
}
