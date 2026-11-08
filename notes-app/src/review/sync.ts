// Saving review events on this device at once, and syncing them through a private GitHub repository so the phone and
// the laptop see the same progress (Matt, 2026-11-06: progress must sync automatically; browser-only storage is not
// enough). Each event is its own file, `events/<day>/<id>.json`, so two devices never write the same file: retries are
// harmless (a file that already exists with the same id counts as saved) and nothing one device records can be lost
// by another. The token lives only in this browser's storage, never in the site's code or the public repository.

import { isEvent, type Event } from './events'
import { readText, writeText } from '../storage'

// ---- storage on this device -----------------------------------------------------------------

/** Where the store keeps its data: localStorage in the browser, a Map in tests. */
export interface Persist { get(key: string): string | null; set(key: string, value: string): void }

export const browserPersist: Persist = {
  get: (k) => readText(localStorage, k),
  set: (k, v) => writeText(localStorage, k, v),
}

const EVENTS = 'reviewEvents'
const PENDING = 'reviewPending'

/**
 * Every event this device knows, its own and other devices', and which of its own are not on the server yet. Two tabs
 * of the site share one storage, so every write first takes in what the other tab stored (events are never removed, and
 * a pending id leaves only when this tab or the other has sent it); `reload` takes it in without writing.
 */
export class EventStore {
  private events = new Map<string, Event>()
  private pending: string[] = []
  private sent = new Set<string>()
  private listeners = new Set<() => void>()

  constructor(private persist: Persist) {
    this.absorb()
  }

  /** Take in the stored events and pending ids. True when anything new arrived. */
  private absorb(): boolean {
    let changed = false
    try {
      const saved: unknown = JSON.parse(this.persist.get(EVENTS) ?? '[]')
      for (const e of Array.isArray(saved) ? saved : []) {
        if (isEvent(e) && !this.events.has(e.id)) { this.events.set(e.id, e); changed = true }
      }
      const p: unknown = JSON.parse(this.persist.get(PENDING) ?? '[]')
      for (const id of Array.isArray(p) ? p : []) {
        if (typeof id === 'string' && this.events.has(id) && !this.sent.has(id) && !this.pending.includes(id)) {
          this.pending.push(id); changed = true
        }
      }
    } catch { /* unreadable storage: keep what this page has rather than crash */ }
    return changed
  }

  /** Another tab wrote: take in its events and pending ids. */
  reload() {
    if (this.absorb()) for (const fn of this.listeners) fn()
  }

  all(): Event[] { return [...this.events.values()] }
  has(id: string): boolean { return this.events.has(id) }
  pendingIds(): string[] { return [...this.pending] }
  get(id: string): Event | undefined { return this.events.get(id) }

  /** Record an event made here: saved on this device at once and queued for the server. */
  add(e: Event) {
    if (this.events.has(e.id)) return
    this.events.set(e.id, e)
    this.pending.push(e.id)
    this.save()
  }

  /** Events from the server. A known id is skipped, so a pull never duplicates anything. Returns how many were new. */
  merge(remote: Event[]): number {
    let n = 0
    for (const e of remote) {
      if (!isEvent(e) || this.events.has(e.id)) continue
      this.events.set(e.id, e)
      n++
    }
    if (n) this.save()
    return n
  }

  markSynced(id: string) {
    this.sent.add(id)
    this.pending = this.pending.filter((x) => x !== id)
    this.save()
  }

  subscribe(fn: () => void): () => void { this.listeners.add(fn); return () => this.listeners.delete(fn) }

  private save() {
    this.absorb()
    this.persist.set(EVENTS, JSON.stringify([...this.events.values()]))
    this.persist.set(PENDING, JSON.stringify(this.pending))
    for (const fn of this.listeners) fn()
  }
}

// ---- the server ---------------------------------------------------------------------------------

export class OfflineError extends Error {}
export class AuthError extends Error {}
export class PrivacyError extends Error {}

/** What the sync needs from a server. GitHubTransport is the real one; tests use an in-memory one. */
export interface Transport {
  /** Every event file: its path and content id. */
  list(): Promise<{ path: string; sha: string }[]>
  /** One file's text by its content id. */
  read(sha: string): Promise<string>
  /** Create a file. 'exists' when a file is already at that path (a retry after a save the device never heard back about). */
  write(path: string, text: string): Promise<'created' | 'exists'>
  /** The text of the file at a path, or null. */
  readPath(path: string): Promise<string | null>
  /** Stops with an error unless the repository is private: what he types must never land in a public one. */
  checkPrivate(): Promise<void>
}

export interface SyncConfig { owner: string; repo: string; token: string }

const b64 = (s: string) => btoa(String.fromCharCode(...new TextEncoder().encode(s)))
const unb64 = (s: string) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g, '')), (c) => c.charCodeAt(0)))

/** The GitHub REST API on one private repository, with a fine-grained token limited to that repository's contents. */
export class GitHubTransport implements Transport {
  private base: string
  constructor(private cfg: SyncConfig, private fetcher: typeof fetch = (...a) => fetch(...a)) {
    this.base = `https://api.github.com/repos/${encodeURIComponent(cfg.owner)}/${encodeURIComponent(cfg.repo)}`
  }

  private async call(path: string, init: RequestInit = {}): Promise<Response> {
    let res: Response
    try {
      res = await this.fetcher(this.base + path, {
        ...init,
        cache: 'no-store',
        headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${this.cfg.token}`,
          'X-GitHub-Api-Version': '2022-11-28', ...(init.body ? { 'Content-Type': 'application/json' } : {}) },
      })
    } catch {
      throw new OfflineError('no connection')
    }
    if (res.status === 401 || res.status === 403) throw new AuthError(`GitHub said ${res.status}: the token is wrong, expired or lacks access`)
    return res
  }

  async checkPrivate() {
    if (this.cfg.owner.toLowerCase() === 'matthlh' && this.cfg.repo.toLowerCase() === 'school-3-1') {
      throw new PrivacyError('That is the public notes repository. Use the private progress repository.')
    }
    const res = await this.call('')
    if (res.status === 404) throw new AuthError('GitHub cannot find the repository with this token')
    if (!res.ok) throw new OfflineError(`GitHub said ${res.status}`)
    if ((await res.json() as { private?: boolean }).private !== true) {
      throw new PrivacyError('This repository is public. Make it private on GitHub before syncing grades to it.')
    }
  }

  async list() {
    const res = await this.call('/git/trees/HEAD?recursive=1')
    if (res.status === 404 || res.status === 409) {
      // 409: the repository has no commits yet. 404: no repository, or the token cannot see it.
      if (res.status === 404) throw new AuthError('GitHub cannot find the repository with this token')
      return []
    }
    if (!res.ok) throw new OfflineError(`GitHub said ${res.status}`)
    const body = await res.json() as { tree?: { path: string; sha: string; type: string }[] }
    return (body.tree ?? []).filter((t) => t.type === 'blob' && /^events\/.+\.json$/.test(t.path)).map(({ path, sha }) => ({ path, sha }))
  }

  async read(sha: string) {
    const res = await this.call(`/git/blobs/${sha}`)
    if (!res.ok) throw new OfflineError(`GitHub said ${res.status}`)
    return unb64((await res.json() as { content: string }).content)
  }

  async readPath(path: string) {
    const res = await this.call(`/contents/${path}`)
    if (res.status === 404) return null
    if (!res.ok) throw new OfflineError(`GitHub said ${res.status}`)
    return unb64((await res.json() as { content: string }).content)
  }

  async write(path: string, text: string): Promise<'created' | 'exists'> {
    // A 409 means another device moved the branch at the same moment: try again shortly.
    for (let i = 0; i < 4; i++) {
      const res = await this.call(`/contents/${path}`, {
        method: 'PUT', body: JSON.stringify({ message: `review event ${path.split('/').pop()}`, content: b64(text) }),
      })
      if (res.status === 200 || res.status === 201) return 'created'
      if (res.status === 422) return 'exists'
      // GitHub answers 404, not 403, to a token that cannot see a private repository.
      if (res.status === 404) throw new AuthError('GitHub cannot find the repository with this token')
      if (res.status !== 409) throw new OfflineError(`GitHub said ${res.status}`)
      await new Promise((r) => setTimeout(r, 300 + Math.random() * 700))
    }
    throw new OfflineError('GitHub kept refusing the write')
  }
}

export const eventPath = (e: Event) => `events/${e.day}/${e.id}.json`

// ---- the sync loop ------------------------------------------------------------------------------

export type SyncStatus =
  | { state: 'off' }                                   // no repository set up on this device
  | { state: 'saving'; pending: number }
  | { state: 'saved'; at: string }
  | { state: 'offline'; pending: number }
  | { state: 'error'; message: string; pending: number }

/**
 * Pushes this device's pending events, then pulls everyone else's. Pushing goes in order and stops at the first
 * failure, so the queue keeps its order across reconnects; a file that already exists is checked to hold the same event
 * before it counts as saved. Runs on a timer, when the device comes back online and when the page comes back into view.
 */
export class Sync {
  status: SyncStatus
  private listeners = new Set<(s: SyncStatus) => void>()
  private running: Promise<void> | null = null
  private again = false
  private checked = false
  private knownPaths = new Set<string>()

  constructor(private store: EventStore, private transport: Transport | null) {
    const n = store.pendingIds().length
    this.status = !transport ? { state: 'off' } : n ? { state: 'saving', pending: n } : { state: 'saved', at: '' }
  }

  subscribe(fn: (s: SyncStatus) => void): () => void { this.listeners.add(fn); return () => this.listeners.delete(fn) }
  private set(s: SyncStatus) { this.status = s; for (const fn of this.listeners) fn(s) }

  /** One push-and-pull pass. A call while a pass is in flight gets that pass, and one more pass follows it, so a grade
   *  saved during a pass is never left waiting behind a "saved" status. */
  run(): Promise<void> {
    if (!this.transport) return Promise.resolve()
    if (this.running) { this.again = true; return this.running }
    this.running = this.pass().finally(() => {
      this.running = null
      const more = this.again || (this.status.state === 'saving')
      this.again = false
      if (more) void this.run()
    })
    return this.running
  }

  private async pass() {
    const t = this.transport!
    const pending = () => this.store.pendingIds().length
    try {
      if (pending()) this.set({ state: 'saving', pending: pending() })
      if (!this.checked) { await t.checkPrivate(); this.checked = true }
      for (const id of this.store.pendingIds()) {
        const e = this.store.get(id)!
        const path = eventPath(e)
        const text = JSON.stringify(e)
        const r = await t.write(path, text)
        if (r === 'exists') {
          const there = await t.readPath(path)
          let same = false
          try { same = !!there && JSON.parse(there).id === e.id } catch { same = false }
          if (!same) throw new Error(`a different file already sits at ${path}`)
        }
        this.store.markSynced(id)
        this.knownPaths.add(path)
      }
      const files = await t.list()
      for (const f of files) {
        if (this.knownPaths.has(f.path)) continue
        const id = f.path.split('/').pop()!.replace(/\.json$/, '')
        if (this.store.has(id)) { this.knownPaths.add(f.path); continue }
        try {
          const e: unknown = JSON.parse(await t.read(f.sha))
          if (isEvent(e) && e.id === id) this.store.merge([e])     // stored before the path counts as known
        } catch (err) {
          if (err instanceof OfflineError || err instanceof AuthError) throw err
          // a file that is not an event is skipped, not fatal
        }
        this.knownPaths.add(f.path)
      }
      // A grade saved while this pass ran is still waiting: say so, and run() starts another pass at once.
      this.set(pending() ? { state: 'saving', pending: pending() } : { state: 'saved', at: new Date().toISOString() })
    } catch (err) {
      if (err instanceof OfflineError) this.set({ state: 'offline', pending: pending() })
      else this.set({ state: 'error', message: err instanceof Error ? err.message : String(err), pending: pending() })
    }
  }

  /** Run now, every `ms` after, on reconnect and when the page is shown again. Returns a stop function. */
  start(ms = 60_000): () => void {
    void this.run()
    const timer = window.setInterval(() => { void this.run() }, ms)
    const kick = () => { if (document.visibilityState !== 'hidden') void this.run() }
    window.addEventListener('online', kick)
    document.addEventListener('visibilitychange', kick)
    return () => { window.clearInterval(timer); window.removeEventListener('online', kick); document.removeEventListener('visibilitychange', kick) }
  }
}

// ---- configuration on this device ---------------------------------------------------------------

const CONFIG = 'syncConfig'

export function loadConfig(persist: Persist = browserPersist): SyncConfig | null {
  try {
    const c = JSON.parse(persist.get(CONFIG) ?? 'null') as Partial<SyncConfig> | null
    return c && typeof c.owner === 'string' && typeof c.repo === 'string' && typeof c.token === 'string' && c.token ? c as SyncConfig : null
  } catch { return null }
}

export function saveConfig(c: SyncConfig | null, persist: Persist = browserPersist) {
  persist.set(CONFIG, c ? JSON.stringify(c) : 'null')
}
