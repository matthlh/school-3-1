import type { CSSProperties } from 'react'

export interface Tone { tint: string; ink: string; line: string }
interface Pair { light: Tone; dark: Tone }

// Very light per-course tints (tint = background, line = border, ink = text/accent), with a dark-scheme twin.
const PALETTE: Pair[] = [
  { light: { tint: '#f0f5ff', ink: '#2f5fb3', line: '#dbe6fb' }, dark: { tint: '#182136', ink: '#8fb0f0', line: '#2a3a5e' } }, // blue
  { light: { tint: '#f0f9f3', ink: '#2f7a4a', line: '#d6ecdd' }, dark: { tint: '#162a1e', ink: '#7fcf9a', line: '#254a34' } }, // green
  { light: { tint: '#f6f1fc', ink: '#6a49a8', line: '#e6dcf6' }, dark: { tint: '#231b35', ink: '#b79cf0', line: '#3d2f5e' } }, // violet
  { light: { tint: '#fff7ea', ink: '#9a6420', line: '#f6e5c8' }, dark: { tint: '#2d2415', ink: '#e2b46a', line: '#4d3d20' } }, // amber
  { light: { tint: '#eef9f8', ink: '#227a72', line: '#d2ece9' }, dark: { tint: '#142a28', ink: '#6fd0c6', line: '#234a46' } }, // teal
  { light: { tint: '#fdf0f3', ink: '#a0405a', line: '#f5d8de' }, dark: { tint: '#2f1a20', ink: '#ee97ab', line: '#552c38' } }, // rose
]

const FIXED: Record<string, number> = { STAT251: 0, CPSC310: 1, PHIL385: 2, ASIA250: 3, PHIL321: 4 }

export const darkQuery = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null)
export const isDark = () => darkQuery()?.matches ?? false

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
