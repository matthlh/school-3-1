import { useEffect, useState } from 'react'
import { slug, splitTopic } from './markdown'

export type Route =
  | { kind: 'home' }
  | { kind: 'course'; code: string }
  | { kind: 'file'; path: string; query: string; anchor?: string }

/** A malformed % escape stays as typed: the raw path matches no file, so the page says Not found. */
function decode(s: string): string {
  try { return decodeURIComponent(s) } catch { return s }
}

/** "a?b" → ["a", "b"]; no `ch` → [s, '']. */
function cut(s: string, ch: string): [string, string] {
  const i = s.indexOf(ch)
  return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + 1)]
}

/**
 * `#/courses/X/file.md?query#section-id` → file route. The query is a question bank's view (BankView); the anchor is
 * a section (the element id is `sec-<anchor>`). Both are cut off before decoding, so an escaped ? or # stays in place.
 */
export function parseHash(hash: string): Route {
  const [rest, anchor] = cut(hash.replace(/^#\/?/, ''), '#')
  const [path, query] = cut(rest, '?')
  const s = decode(path)
  if (!s) return { kind: 'home' }
  const m = /^course\/([^/]+)$/.exec(s)
  if (m) return { kind: 'course', code: m[1] }
  return { kind: 'file', path: s, query, anchor: decode(anchor) || undefined }
}

/** Fired by navigate, which changes the URL without a hashchange event. */
const NAVIGATED = 'navigated'

/**
 * Go to `href`, adding a Back step; the step being left remembers its scroll position. With `replace` the current step
 * changes instead: opening and closing answers is not something Back should step through. Either way the browser fires
 * no hashchange, and useRoute hears NAVIGATED at once, so the next click already builds on this URL.
 */
export function navigate(href: string, replace = false) {
  if (replace) history.replaceState({ ...history.state, y: window.scrollY }, '', href)
  else { rememberScroll(); history.pushState(null, '', href) }
  window.dispatchEvent(new Event(NAVIGATED))
}

/** Write where the page is scrolled into the current history entry. */
function rememberScroll() {
  history.replaceState({ ...history.state, y: window.scrollY }, '')
}

/** Where the page was last scrolled in the current history entry; null in an entry it has never been scrolled in. */
export function savedScroll(): number | null {
  const y: unknown = history.state?.y
  return typeof y === 'number' ? y : null
}

let remembering = false
/**
 * Keep each history entry's scroll position in the entry, so Back, Forward and a reload can put it back once the page
 * has rendered (App reads savedScroll). The browser's own restoring is switched off: it runs before the page has
 * re-rendered for the entry it returns to, so it lands short on a page still showing a shorter view.
 */
export function startScrollMemory() {
  if (remembering) return
  remembering = true
  history.scrollRestoration = 'manual'
  let timer = 0
  window.addEventListener('scroll', () => { window.clearTimeout(timer); timer = window.setTimeout(rememberScroll, 150) }, { passive: true })
}

/** The route in the address bar, kept current through links, Back and Forward, and navigate. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    window.addEventListener(NAVIGATED, onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener(NAVIGATED, onChange)
    }
  }, [])
  return route
}

export const HREF_HOME = '#/'
export const hrefCourse = (code: string) => `#/course/${code}`
/** Link to a `## Heading` inside a file: `hrefAnchor('ledger.md', 'term-calendar-hard-dates')`. */
export const hrefAnchor = (path: string, anchor: string) => `#/${path}#${anchor}`

/** onClick for anchor links: when the URL already carries this anchor no hashchange fires, so scroll by hand. */
export function scrollIfSame(e: { currentTarget: HTMLAnchorElement }) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || window.location.hash !== href) return
  const id = href.slice(href.lastIndexOf('#') + 1)
  document.getElementById('sec-' + id)?.scrollIntoView({ block: 'start' })
}

// ---- a question bank's view, kept in its URL so Back, Forward and a reload come back to it ----------------------

/** Runs of question numbers: [[3, 3], [7, 9]] is questions 3, 7, 8 and 9. */
type Ranges = [number, number][]

export interface BankView {
  /** A `## ` section's key (sectionKeys in QuestionBank.tsx), or '' for every section. */
  section: string
  /** The filters as slugs, '' for none: topicKey of a Topic tag, then the slugs of a Lec tag and a Type tag. */
  topic: string
  lec: string
  type: string
  only: 'all' | 'weak' | 'new'
  /** The shuffle's seed; 0 keeps file order. */
  shuffle: number
  /** The questions showing their answer, by position in the file counting from 1. */
  open: Ranges
}

const WHOLE_BANK: BankView = { section: '', topic: '', lec: '', type: '', only: 'all', shuffle: 0, open: [] }

/** The slug a topic goes by in a bank URL: its main text without the trailing parenthetical. */
export const topicKey = (topic: string) => slug(splitTopic(topic).main)

/** Ascending numbers → runs: [3, 7, 8, 9] → [[3, 3], [7, 9]]. */
export function toRanges(ns: number[]): Ranges {
  const out: Ranges = []
  for (const n of ns) {
    const last = out[out.length - 1]
    if (last && n === last[1] + 1) last[1] = n
    else out.push([n, n])
  }
  return out
}

/** "3,7-9" → [[3, 3], [7, 9]]; a part that is not a number or a range is dropped. */
function parseRanges(s: string): Ranges {
  return s.split(',').flatMap((part): Ranges => {
    const m = /^(\d+)(?:-(\d+))?$/.exec(part)
    return m ? [[+m[1], +(m[2] ?? m[1])]] : []
  })
}

/** A bank route's query → its view; whatever the query leaves out is at its default. */
export function parseBankView(query: string): BankView {
  const p = new URLSearchParams(query)
  const only = p.get('only')
  return {
    section: p.get('section') ?? '',
    topic: p.get('topic') ?? '',
    lec: p.get('lec') ?? '',
    type: p.get('type') ?? '',
    only: only === 'weak' || only === 'new' ? only : 'all',
    shuffle: Number(p.get('shuffle')) || 0,
    open: parseRanges(p.get('open') ?? ''),
  }
}

/**
 * A bank's URL for `view`, defaults left out, then the `#section` the page was opened at, which a change of view keeps
 * (so it is no new place to scroll to): `#/courses/STAT251/02-questions.md?section=lec-7&type=apply&open=3,7-9`.
 */
export function hrefBank(path: string, view: BankView, anchor?: string): string {
  const { section, topic, lec, type, only, shuffle, open } = view
  const q = Object.entries({ section, topic, lec, type }).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
  if (only !== 'all') q.push(`only=${only}`)
  if (shuffle) q.push(`shuffle=${shuffle}`)
  if (open.length) q.push('open=' + open.map(([a, b]) => (a === b ? `${a}` : `${a}-${b}`)).join(','))
  return `#/${path}${q.length ? '?' + q.join('&') : ''}${anchor ? '#' + anchor : ''}`
}

/** The course's question bank showing only one topic's questions: a ledger row's topic or a question's Topic tag. */
export const hrefTopic = (code: string, topic: string) =>
  hrefBank(`courses/${code}/02-questions.md`, { ...WHOLE_BANK, topic: topicKey(topic) })
