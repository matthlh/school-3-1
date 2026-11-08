import { useEffect, useState, type RefObject } from 'react'
import { HREF_COURSES, HREF_HOME } from './routes'
import { Settings } from './Settings'

/** The three places the site is used from (2026-11-07): today's next step, a review session, and the courses. */
export type Section = 'today' | 'review' | 'courses'
const SECTIONS: [Section, string, string][] = [['today', 'Today', HREF_HOME], ['review', 'Review', '#/review'], ['courses', 'Courses', HREF_COURSES]]

export function TopBar({ section, query, onQuery, onMenu, pinned, inputRef }: {
  /** The section the page belongs to, marked in the menu; null for pages outside all three (the ledger, links, goals). */
  section: Section | null
  query: string
  onQuery: (q: string) => void
  onMenu: () => void
  pinned: boolean
  inputRef: RefObject<HTMLInputElement>
}) {
  // On a phone the search box would push the menu off the bar, so it hides behind a button and opens over the menu.
  // It stays open while it holds a query, so the results keep their box.
  const [searching, setSearching] = useState(false)
  const open = searching || query !== ''
  useEffect(() => { if (searching) inputRef.current?.focus() }, [searching, inputRef])
  // A pick, or a move to another page, empties the query after the box has lost focus: close it then, so the menu
  // comes back. Emptying the box while typing in it leaves it open.
  useEffect(() => { if (!query && document.activeElement !== inputRef.current) setSearching(false) }, [query, inputRef])
  // `/` opens the search from anywhere but a text field, on a phone-width window too, where the box starts hidden.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (e.key !== '/' || t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || t?.isContentEditable) return
      e.preventDefault()
      setSearching(true)
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inputRef])
  const close = () => { onQuery(''); setSearching(false); inputRef.current?.blur() }
  return (
    <header className={'topbar' + (open ? ' searching' : '')}>
      <button type="button" className={'menu' + (pinned ? ' on' : '')} onClick={onMenu} title="All pages" aria-label="All pages" aria-expanded={pinned}>☰</button>
      <div className="topnav" role="navigation" aria-label="Main">
        {SECTIONS.map(([id, label, href]) => (
          <a key={id} href={href} className={id === section ? 'cur' : undefined} aria-current={id === section ? 'page' : undefined}>{label}</a>
        ))}
      </div>
      <Settings />
      <button type="button" className="search-open" onClick={() => setSearching(true)} aria-label="Search notes" title="Search">
        <svg viewBox="0 0 16 16" width="17" height="17" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
      </button>
      <div className="search">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search"
          aria-label="Search notes"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Escape') close() }}
          onBlur={() => { if (!query) setSearching(false) }}
        />
        <button type="button" className="search-close" onClick={close}>Cancel</button>
      </div>
    </header>
  )
}
