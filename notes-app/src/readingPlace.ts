import { useEffect, type RefObject } from 'react'
import { parseHash } from './routes'
import { readJSON, writeJSON } from './storage'

interface ReadingPlace {
  path: string
  anchor: string
  section: string
  /** Pixels into the section, or from the top of the page before the first section. */
  offset: number
}

const course = (path: string) => /^courses\/([^/]+)\/(?:(?:lectures|readings)\/|0[567]-)[^/]+\.md$/.exec(path)?.[1]
const storageKey = (code: string) => 'study-place:' + code
const top = 60 // The section anchors' scroll margin for the sticky navigation.

export function readingPlace(code: string): ReadingPlace | null {
  const place = readJSON<ReadingPlace>(localStorage, storageKey(code))
  return place && typeof place.path === 'string' && course(place.path) === code &&
    typeof place.anchor === 'string' && typeof place.section === 'string' &&
    Number.isFinite(place.offset) && place.offset >= 0 ? place : null
}

export const resumeHref = (place: ReadingPlace) =>
  `#/${place.path}?resume=1${place.anchor ? '#' + place.anchor : ''}`

export function restoreReadingPlace(path: string, query: string, anchor: string | undefined, target: HTMLElement | null) {
  if (new URLSearchParams(query).get('resume') !== '1') return false
  const code = course(path)
  const place = code ? readingPlace(code) : null
  if (!place || place.path !== path || place.anchor !== (anchor ?? '')) return false
  if (place.anchor && !target) return false
  const start = target ? window.scrollY + target.getBoundingClientRect().top - top : 0
  window.scrollTo(0, Math.max(0, start) + place.offset)
  return true
}

function position(path: string, article: HTMLElement, anchor?: string): ReadingPlace {
  let section: HTMLElement | null = null
  for (const heading of article.querySelectorAll<HTMLElement>('[id^="sec-"]')) {
    if (heading.parentElement?.closest('details:not([open])') || !heading.getClientRects().length) continue
    if (heading.getBoundingClientRect().top > top + 1) break
    section = heading
  }
  // Near the end the browser may run out of room to align the linked section with the sticky header.
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
  const linked = atBottom && anchor ? document.getElementById('sec-' + anchor) : null
  const linkedTop = linked?.getBoundingClientRect().top
  if (linked && article.contains(linked) && linked.getClientRects().length &&
      linkedTop !== undefined && linkedTop > top && linkedTop < window.innerHeight) section = linked
  const label = section?.querySelector(':scope > summary, :scope > h2') ?? section
  return {
    path, anchor: section?.id.slice(4) ?? '', section: label?.textContent?.trim() ?? '',
    offset: section ? Math.max(0, top - section.getBoundingClientRect().top) : window.scrollY,
  }
}

/** Remember the passage while it is shown. An arriving route's scroll event never overwrites the one being left. */
export function useReadingPlace(path: string, article: RefObject<HTMLElement>) {
  useEffect(() => {
    const code = course(path)
    if (!code) return
    let last: ReadingPlace | null = null
    let frame = 0
    let timer = 0
    const flush = () => { if (last) writeJSON(localStorage, storageKey(code), last) }
    const sample = () => {
      const route = parseHash(window.location.hash)
      if (route.kind === 'file' && route.path === path && article.current) last = position(path, article.current, route.anchor)
    }
    const scroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        sample()
        window.clearTimeout(timer)
        timer = window.setTimeout(flush, 150)
      })
    }
    const leaving = () => { sample(); flush() }
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('pagehide', leaving)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      flush()
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('pagehide', leaving)
    }
  }, [path, article])
}
