// Keeps an open tab on the latest deploy. GitHub Pages hands out index.html with a ten-minute cache and a
// single-page app never reloads on its own, so the build writes a tiny version.json next to the bundle and
// this module compares it with the build stamp compiled into the running bundle.
//
// Policy when a newer build is found: reload at once if nobody is looking (hidden tab) or the page has only
// just loaded, unless something is typed in the search box; otherwise show the toast and reload when he next
// opens another page (a jump within the same page does not count). A tab reloads for a given build at most
// once every few minutes, so a cache that has not caught up cannot cause a loop, and the tab still recovers
// on its own once the cache does catch up. Our own reloads put the page back at the same scroll position.
import { useSyncExternalStore } from 'react'
import { parseHash } from './routes'

export type UpdateStatus = 'current' | 'checking' | 'available' | 'error'
export interface UpdateInfo {
  status: UpdateStatus
  /** Stamp of the newer build on the server, when there is one. */
  newer: string | null
  /** True when this tab reloaded for `newer` a moment ago and still runs the old bundle. */
  retried: boolean
  dismissed: boolean
  checkedAt: number | null
}

const INTERVAL_MS = 5 * 60_000
const MIN_GAP_MS = 10_000
const FRESH_LOAD_MS = 3_000
/** How long after an automatic reload for a build we wait before trying that build again. */
const RETRY_MS = 3 * 60_000
/** A click on another page may reload sooner than that, but not in a burst. */
const NAV_RETRY_MS = 30_000
const RELOADED_KEY = 'reloaded-for'
const SCROLL_KEY = 'scroll-after-reload'

export const BUILD: string = __BUILD_TIME__
export const buildLabel = (stamp: string = BUILD) =>
  new Date(stamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

let info: UpdateInfo = { status: 'current', newer: null, retried: false, dismissed: false, checkedAt: null }
const listeners = new Set<() => void>()
let started = false
let inFlight: Promise<UpdateStatus> | null = null
let navArmed = false

function emit(next: Partial<UpdateInfo>) {
  info = { ...info, ...next }
  listeners.forEach((l) => l())
}
function subscribe(l: () => void) {
  listeners.add(l)
  return () => { listeners.delete(l) }
}
const snapshot = () => info

export function useUpdate(): UpdateInfo {
  return useSyncExternalStore(subscribe, snapshot, snapshot)
}
export const getUpdate = snapshot

// sessionStorage is per tab and survives a reload, which is exactly the scope the loop guard needs.
function readSession<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    return raw === null ? null : (JSON.parse(raw) as T)
  } catch { return null }
}
function writeSession(key: string, value: unknown) {
  try { value === null ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(value)) } catch { /* private mode */ }
}

interface Reloaded { build: string; at: number }
/** Milliseconds since this tab last reloaded for `build`, or Infinity if it never did. */
function sinceReloadFor(build: string): number {
  const rec = readSession<Reloaded>(RELOADED_KEY)
  return rec && rec.build === build && typeof rec.at === 'number' ? Date.now() - rec.at : Infinity
}

async function fetchServerBuild(): Promise<string> {
  const url = new URL('version.json', document.baseURI)
  url.searchParams.set('t', String(Date.now())) // a fresh URL every time, so no cache between here and the origin can answer
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`version.json ${res.status}`)
  const body: unknown = await res.json()
  const build = (body as { build?: unknown } | null)?.build
  if (typeof build !== 'string') throw new Error('version.json has no build stamp')
  return build
}

/** Reload the page. `forBuild` records the build we are reloading for so the guard above can count it. */
export function reloadNow(forBuild?: string | null) {
  if (forBuild) writeSession(RELOADED_KEY, { build: forBuild, at: Date.now() } satisfies Reloaded)
  writeSession(SCROLL_KEY, { hash: window.location.hash, y: window.scrollY })
  window.location.reload()
}

/** After one of our reloads, the scroll position to put back for this hash; consumed on read. */
export function takeSavedScroll(hash: string): number | null {
  const rec = readSession<{ hash: string; y: number }>(SCROLL_KEY)
  if (!rec) return null
  writeSession(SCROLL_KEY, null)
  return rec.hash === hash && typeof rec.y === 'number' ? rec.y : null
}

/** The page a hash names, ignoring any in-page anchor: home, a course, or a file. */
function pageOf(hash: string): string {
  const r = parseHash(hash)
  return r.kind === 'file' ? r.path : r.kind === 'course' ? 'course/' + r.code : ''
}

/** Reload on the next move to another page. Jumps within the same page (contents chips) are left alone. */
function armNextNavigation() {
  if (navArmed) return
  navArmed = true
  const onHash = (e: HashChangeEvent) => {
    if (pageOf(new URL(e.oldURL).hash) === pageOf(window.location.hash)) return
    window.removeEventListener('hashchange', onHash)
    navArmed = false
    const target = info.newer
    if (target && sinceReloadFor(target) > NAV_RETRY_MS) reloadNow(target)
  }
  window.addEventListener('hashchange', onHash)
}

export async function checkForUpdate(force = false): Promise<UpdateStatus> {
  if (inFlight) return inFlight
  if (!force && info.checkedAt !== null && Date.now() - info.checkedAt < MIN_GAP_MS) return info.status
  const startedAt = performance.now()
  inFlight = (async () => {
    if (info.status !== 'available') emit({ status: 'checking' })
    try {
      const server = await fetchServerBuild()
      // ISO-8601 stamps compare as strings. An older stamp means a cache that has not caught up, not a downgrade.
      const newer = server > BUILD ? server : null
      if (!newer) {
        writeSession(RELOADED_KEY, null)
        emit({ status: 'current', newer: null, retried: false, dismissed: false, checkedAt: Date.now() })
        return 'current'
      }
      const retried = sinceReloadFor(newer) < RETRY_MS
      emit({ status: 'available', newer, retried, dismissed: newer === info.newer ? info.dismissed : false, checkedAt: Date.now() })
      const unattended = document.visibilityState === 'hidden' || startedAt < FRESH_LOAD_MS
      const typing = !!document.querySelector<HTMLInputElement>('.search input')?.value
      if (!retried && unattended && !typing) {
        reloadNow(newer)
      } else {
        armNextNavigation()
      }
      return 'available'
    } catch {
      emit({ status: info.newer ? 'available' : 'error', checkedAt: Date.now() })
      return 'error'
    } finally {
      inFlight = null
    }
  })()
  return inFlight
}

export function dismissUpdate() {
  emit({ dismissed: true })
}

/** Start polling. Safe to call more than once; does nothing on the dev server, where Vite reloads for us. */
export function startUpdateChecks() {
  if (started || import.meta.env.DEV) return
  started = true
  void checkForUpdate()
  window.setInterval(() => void checkForUpdate(), INTERVAL_MS)
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') void checkForUpdate() })
  window.addEventListener('focus', () => void checkForUpdate())
  window.addEventListener('online', () => void checkForUpdate())
}
