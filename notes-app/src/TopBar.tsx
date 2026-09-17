import type { RefObject } from 'react'
import { toneStyle } from './theme'
import { Settings } from './Settings'

export interface Crumb { label: string; href?: string; tone?: string }

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
        {crumbs.map((c, i) => {
          const cls = c.tone ? 'tone' : c.href ? undefined : 'here'
          const style = c.tone ? toneStyle(c.tone) : undefined
          return (
            <span key={i}>
              {i > 0 && <span className="sep">›</span>}
              {c.href
                ? <a href={c.href} className={cls} style={style}>{c.label}</a>
                : <span className={cls} style={style}>{c.label}</span>}
            </span>
          )
        })}
      </div>
      <Settings />
      <div className="search">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search"
          aria-label="Search notes"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Escape') { onQuery(''); e.currentTarget.blur() } }}
        />
      </div>
    </header>
  )
}
