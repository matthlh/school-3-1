import type { CSSProperties } from 'react'

export interface Tone { tint: string; ink: string; line: string }
interface Pair { light: Tone; dark: Tone }

// Very light per-course tints (tint = background, line = border, ink = text/accent), with a dark-scheme twin.
const PALETTE: Pair[] = [
  { light: { tint: '#e9f0ff', ink: '#2f5fb3', line: '#d3e0fa' }, dark: { tint: '#192440', ink: '#8fb0f0', line: '#2a3a5e' } }, // blue
  { light: { tint: '#ebf7ef', ink: '#2f7a4a', line: '#d6ecdd' }, dark: { tint: '#162a1e', ink: '#7fcf9a', line: '#254a34' } }, // green
  { light: { tint: '#f3ecfc', ink: '#6a49a8', line: '#e6dcf6' }, dark: { tint: '#231b35', ink: '#b79cf0', line: '#3d2f5e' } }, // violet
  { light: { tint: '#fff7ea', ink: '#9a6420', line: '#f6e5c8' }, dark: { tint: '#2d2415', ink: '#e2b46a', line: '#4d3d20' } }, // amber
  { light: { tint: '#e9f6f4', ink: '#227a72', line: '#d2ece9' }, dark: { tint: '#142a28', ink: '#6fd0c6', line: '#234a46' } }, // teal
  { light: { tint: '#fdf0f3', ink: '#a0405a', line: '#f5d8de' }, dark: { tint: '#2f1a20', ink: '#ee97ab', line: '#552c38' } }, // rose
]

const FIXED: Record<string, number> = { STAT251: 0, CPSC310: 1, PHIL385: 2, ASIA250: 3 }

export type Theme = 'light' | 'dark' | 'auto'
const KEY = 'theme'

/** Stored preference; 'auto' when nothing is stored or storage is unavailable. */
export function getTheme(): Theme {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'dark') return v
  } catch { /* storage blocked (private mode, disabled cookies) */ }
  return 'auto'
}

/** What the page is actually showing: the forced attribute, else 'auto'. */
export function currentTheme(): Theme {
  const t = typeof document !== 'undefined' ? document.documentElement.dataset.theme : undefined
  return t === 'light' || t === 'dark' ? t : 'auto'
}

const PAGE_BG = { light: '#f6f8fd', dark: '#15171d' }

/** Mirror a theme onto <html data-theme> ('auto' removes the attribute so the OS decides) and the browser-chrome colour. */
function applyTo(t: Theme) {
  if (typeof document === 'undefined') return
  const el = document.documentElement
  if (t === 'auto') delete el.dataset.theme
  else el.dataset.theme = t
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark() ? PAGE_BG.dark : PAGE_BG.light)
}

/** Apply the stored preference (index.html does this inline before paint too; this keeps the two in step). */
export function applyTheme() { applyTo(getTheme()) }

/** Persist and apply a theme, then tell listeners (App re-renders course tints on 'themechange'). */
export function setTheme(t: Theme) {
  try {
    if (t === 'auto') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, t)
  } catch { /* storage blocked; the attribute still applies for this page load */ }
  applyTo(t)
  window.dispatchEvent(new Event('themechange'))
}


export const darkQuery = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null)
/** A forced theme wins; otherwise follow the OS. */
export const isDark = () => {
  const forced = typeof document !== 'undefined' ? document.documentElement.dataset.theme : undefined
  if (forced === 'dark') return true
  if (forced === 'light') return false
  return darkQuery()?.matches ?? false
}

export function tone(code: string): Tone {
  let i = FIXED[code]
  if (i === undefined) {
    i = 0
    for (const ch of code) i = (i * 31 + ch.charCodeAt(0)) % PALETTE.length
  }
  return isDark() ? PALETTE[i].dark : PALETTE[i].light
}

/** Inline CSS variables so the stylesheet can use var(--tint), var(--ink), var(--line). */
export function toneStyle(code: string): CSSProperties {
  const t = tone(code)
  return { '--tint': t.tint, '--ink': t.ink, '--line': t.line } as CSSProperties
}

// Runs last: applyTo() reads isDark(), so the whole module must be initialised first.
applyTheme()
