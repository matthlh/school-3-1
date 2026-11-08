// Safe access to Web Storage. A store can throw or be missing (private mode, disabled site data), so every read falls
// back and every write is best-effort: a blocked store must never throw and never lose the page, it only means the
// value is not remembered past this page load. Pass localStorage or sessionStorage as `store`.

/** Parsed JSON at `key`, or null when it is missing, unreadable or not valid JSON. */
export function readJSON<T>(store: Storage, key: string): T | null {
  try {
    const raw = store.getItem(key)
    return raw === null ? null : (JSON.parse(raw) as T)
  } catch { return null }
}

/** Store `value` as JSON at `key`; null removes it. Does nothing when the store is blocked. */
export function writeJSON(store: Storage, key: string, value: unknown): void {
  try { value === null ? store.removeItem(key) : store.setItem(key, JSON.stringify(value)) } catch { /* storage blocked */ }
}

/** The raw string at `key`, or null when it is missing or the store is blocked. */
export function readText(store: Storage, key: string): string | null {
  try { return store.getItem(key) } catch { return null }
}

/** Store the raw string `value` at `key`; null removes it. Does nothing when the store is blocked. */
export function writeText(store: Storage, key: string, value: string | null): void {
  try { value === null ? store.removeItem(key) : store.setItem(key, value) } catch { /* storage blocked */ }
}
