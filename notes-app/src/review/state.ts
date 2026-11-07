// The one event store and sync loop the whole site shares, the review plan the quiz scripts publish, and the open
// review session, kept on this device so a reload, a trip to a notes page or a closed tab resumes where it was.

import { useSyncExternalStore } from 'react'
import { EventStore, GitHubTransport, Sync, browserPersist, loadConfig, saveConfig, type SyncConfig, type SyncStatus } from './sync'
import type { Event } from './events'

export const store = new EventStore(browserPersist)
// Another tab of the site saved or synced: take its events in, so neither tab's grades are lost.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => { if (e.key === 'reviewEvents' || e.key === 'reviewPending') store.reload() })
}
let sync = new Sync(store, transportFor(loadConfig()))
let stopSync: (() => void) | null = null
const syncListeners = new Set<() => void>()

function transportFor(c: SyncConfig | null) { return c ? new GitHubTransport(c) : null }

/** Start syncing in the background (App calls it once). */
export function startSync() {
  stopSync?.()
  stopSync = sync.start()
  sync.subscribe(() => { for (const fn of syncListeners) fn() })
}

/** Save or clear this device's repository settings and restart the sync with them. */
export function configureSync(c: SyncConfig | null) {
  saveConfig(c)
  stopSync?.()
  sync = new Sync(store, transportFor(c))
  startSync()
  for (const fn of syncListeners) fn()
}

export const syncNow = () => sync.run()

export function useSyncStatus(): SyncStatus {
  return useSyncExternalStore((fn) => { syncListeners.add(fn); return () => syncListeners.delete(fn) }, () => sync.status)
}

let snapshot: Event[] = store.all()
store.subscribe(() => { snapshot = store.all() })
/** Every known event, re-rendering when one arrives or is recorded. */
export function useEvents(): Event[] {
  return useSyncExternalStore((fn) => store.subscribe(fn), () => snapshot)
}

// ---- the review plan (routines/review-plan.json, written by quiz_pick.py and quiz_grade.py) -----------------------

export interface ReviewPlan {
  /** The day the scripts wrote it. */
  as_of: string
  /** Ledger row key ("STAT251|<topic>") → the dates of the exams that cover it, for the exam cap. */
  rows: Record<string, string[]>
  /** Question id → its ledger row key. */
  cards: Record<string, string>
  /** The questions to ask as of that day, best first, courses interleaved; long problems left out: the due ones,
   *  then the new ones (never asked) of studied topics. */
  queue: string[]
  /** How many of the queue's first entries are due; the rest are new. */
  due: number
}

export function parsePlan(text: string | undefined): ReviewPlan | null {
  if (!text) return null
  try {
    const p = JSON.parse(text) as Partial<ReviewPlan>
    if (typeof p.as_of !== 'string' || !Array.isArray(p.queue) || !p.rows || !p.cards) return null
    return { ...p, due: typeof p.due === 'number' ? p.due : p.queue.length } as ReviewPlan
  } catch { return null }
}

// ---- the open session ---------------------------------------------------------------------------

export interface CardDraft {
  attempt: string
  conf: 1 | 2 | 3 | null
  ticks: boolean[]
  flagged: boolean
  /** He opened the notes page before revealing the key. */
  assisted: boolean
  shownAt: number | null
  revealAt: number | null
  /** The review event that recorded it; null until saved. */
  saved: string | null
  /** The key's fingerprint when it was revealed: a key edited since resets the ticks. */
  khash?: string | null
}

export interface ReviewSession {
  id: string
  started: string
  qids: string[]
  at: number
  cards: Record<string, CardDraft>
}

const SESSION = 'reviewSession'

export function loadSession(): ReviewSession | null {
  try {
    const s = JSON.parse(browserPersist.get(SESSION) ?? 'null') as ReviewSession | null
    return s && Array.isArray(s.qids) && typeof s.at === 'number' && s.cards ? s : null
  } catch { return null }
}

export function saveSession(s: ReviewSession | null) {
  browserPersist.set(SESSION, s ? JSON.stringify(s) : 'null')
}

export const blankDraft = (n: number): CardDraft =>
  ({ attempt: '', conf: null, ticks: Array(n).fill(false), flagged: false, assisted: false, shownAt: null, revealAt: null, saved: null })
