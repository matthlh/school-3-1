import type { CSSProperties } from 'react'

export interface Tone { tint: string; ink: string; line: string }

// Very light per-course tints: tint = background, line = border, ink = text/accent.
const PALETTE: Tone[] = [
  { tint: '#f0f5ff', ink: '#2f5fb3', line: '#dbe6fb' }, // blue
  { tint: '#f0f9f3', ink: '#2f7a4a', line: '#d6ecdd' }, // green
  { tint: '#f6f1fc', ink: '#6a49a8', line: '#e6dcf6' }, // violet
  { tint: '#fff7ea', ink: '#9a6420', line: '#f6e5c8' }, // amber
  { tint: '#eef9f8', ink: '#227a72', line: '#d2ece9' }, // teal
  { tint: '#fdf0f3', ink: '#a0405a', line: '#f5d8de' }, // rose
]

const FIXED: Record<string, number> = { STAT251: 0, CPSC310: 1, PHIL385: 2, ASIA250: 3, PHIL321: 4 }

export function tone(code: string): Tone {
  let i = FIXED[code]
  if (i === undefined) {
    i = 0
    for (const ch of code) i = (i * 31 + ch.charCodeAt(0)) % PALETTE.length
  }
  return PALETTE[i]
}

/** Inline CSS variables so the stylesheet can use var(--tint), var(--ink), var(--line). */
export function toneStyle(code: string): CSSProperties {
  const t = tone(code)
  return { '--tint': t.tint, '--ink': t.ink, '--line': t.line } as CSSProperties
}
