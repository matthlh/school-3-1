// Appearance settings: theme, colour palette and the secret visuals. Each is kept in localStorage under its name
// and mirrored onto <html data-NAME> (index.html applies the stored values inline before the first paint), and fires
// a NAMEchange event on window when it changes. The default value is never stored and removes the attribute.
import { useSyncExternalStore } from 'react'

export interface Pref<T extends string> {
  /** What the page shows now: the attribute, else the default. */
  current(): T
  /** Persist and apply a value, then tell subscribers. */
  set(v: T): void
  subscribe(fn: () => void): () => void
}

function pref<T extends string>(name: string, values: readonly T[], fallback: T): Pref<T> {
  const root = document.documentElement
  const event = name + 'change'
  const valid = (v: unknown): v is T => (values as readonly unknown[]).includes(v)
  return {
    current: () => { const v = root.dataset[name]; return valid(v) ? v : fallback },
    set: (v) => {
      try {
        if (v === fallback) localStorage.removeItem(name)
        else localStorage.setItem(name, v)
      } catch { /* storage blocked (private mode): the attribute still applies for this page load */ }
      if (v === fallback) delete root.dataset[name]
      else root.dataset[name] = v
      window.dispatchEvent(new Event(event))
    },
    subscribe: (fn) => {
      window.addEventListener(event, fn)
      return () => window.removeEventListener(event, fn)
    },
  }
}

/** The current value of a preference, re-rendering when it changes. */
export function usePref<T extends string>(p: Pref<T>): T {
  return useSyncExternalStore(p.subscribe, p.current)
}

export type Theme = 'light' | 'dark' | 'auto'
/** 'auto' follows the OS. The stylesheet resolves every colour with light-dark() against <html>'s color-scheme. */
export const theme = pref<Theme>('theme', ['light', 'dark', 'auto'], 'auto')

type Palette = 'mist' | 'sage' | 'lavender' | 'sand' | 'slate'
interface Swatch { page: string; accent: string }
/** Picker order. page and accent copy each palette's --bg and --link from styles.css, so keep the two in step. */
export const PALETTES: { id: Palette; label: string; light: Swatch; dark: Swatch }[] = [
  { id: 'mist', label: 'Mist', light: { page: '#f6f8fd', accent: '#0a58ca' }, dark: { page: '#15171d', accent: '#7fb0ff' } },
  { id: 'sage', label: 'Sage', light: { page: '#f5f9f6', accent: '#22714b' }, dark: { page: '#131914', accent: '#8dbda0' } },
  { id: 'lavender', label: 'Lavender', light: { page: '#f8f7fc', accent: '#6a47b1' }, dark: { page: '#17161c', accent: '#b4a2ec' } },
  { id: 'sand', label: 'Sand', light: { page: '#fbf8f2', accent: '#9a431e' }, dark: { page: '#1a1711', accent: '#dd9e86' } },
  { id: 'slate', label: 'Slate', light: { page: '#f6f8f9', accent: '#086e77' }, dark: { page: '#151819', accent: '#79bdc4' } },
]
/** Mist is the stylesheet's base tokens; every other palette is a block keyed on <html data-palette> in styles.css. */
export const palette = pref<Palette>('palette', PALETTES.map((p) => p.id), 'mist')

// "Secret visuals": Minecraft's old Super Secret Settings, for a notes site. Settings shows Off and the effects
// side by side, one click each. Effects are pure CSS keyed on <html data-visual>, scoped to the content so the
// settings popover stays readable and every link keeps working.
type Visual = 'off' | 'abstract' | 'blobs' | 'wireframe'
export const VISUALS: Record<Visual, { label: string; hint: string }> = {
  off: { label: 'Off', hint: '' },
  abstract: { label: 'Abstract', hint: 'Every word is a bar and every card is a shape. Links still work.' },
  blobs: { label: 'Blobs', hint: 'The page through a blur. Links still work.' },
  wireframe: { label: 'Wireframe', hint: 'Outlines only. Links still work.' },
}
/** Picker order: Off first, then the effects as VISUALS lists them. */
export const VISUAL_ORDER = Object.keys(VISUALS) as Visual[]
export const visual = pref<Visual>('visual', VISUAL_ORDER, 'off')

// The browser chrome (meta theme-color) takes the current palette's page colour for the theme showing now: a forced
// theme wins, otherwise the OS decides. It follows a theme or palette pick and, in Auto, the OS flipping.
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
function syncChrome() {
  const t = theme.current()
  const dark = t === 'dark' || (t === 'auto' && darkQuery.matches)
  const p = PALETTES.find((x) => x.id === palette.current())!   // current() is always one of PALETTES
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? p.dark.page : p.light.page)
}
theme.subscribe(syncChrome)
palette.subscribe(syncChrome)
darkQuery.addEventListener('change', syncChrome)
syncChrome()
