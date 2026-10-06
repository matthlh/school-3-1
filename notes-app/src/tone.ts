import type { CSSProperties } from 'react'

// Very light per-course tints (tint = background, line = border, ink = text/accent), light and dark side by side.
// light-dark() picks the right one from <html>'s color-scheme, so a theme switch needs no re-render.
const TONES: { tint: [string, string]; ink: [string, string]; line: [string, string] }[] = [
  { tint: ['#e9f0ff', '#192440'], ink: ['#2f5fb3', '#8fb0f0'], line: ['#d3e0fa', '#2a3a5e'] }, // blue
  { tint: ['#ebf7ef', '#162a1e'], ink: ['#2f7a4a', '#7fcf9a'], line: ['#d6ecdd', '#254a34'] }, // green
  { tint: ['#f3ecfc', '#231b35'], ink: ['#6a49a8', '#b79cf0'], line: ['#e6dcf6', '#3d2f5e'] }, // violet
  { tint: ['#fff7ea', '#2d2415'], ink: ['#9a6420', '#e2b46a'], line: ['#f6e5c8', '#4d3d20'] }, // amber
  { tint: ['#e9f6f4', '#142a28'], ink: ['#227a72', '#6fd0c6'], line: ['#d2ece9', '#234a46'] }, // teal
  { tint: ['#fdf0f3', '#2f1a20'], ink: ['#a0405a', '#ee97ab'], line: ['#f5d8de', '#552c38'] }, // rose
]

const FIXED: Record<string, number> = { STAT251: 0, CPSC310: 1, PHIL385: 2, ASIA250: 3 }

const ld = ([light, dark]: [string, string]) => `light-dark(${light}, ${dark})`

/** Inline CSS variables so the stylesheet can use var(--tint), var(--ink), var(--line). Unknown codes hash to a tone. */
export function toneStyle(code: string): CSSProperties {
  let i = FIXED[code]
  if (i === undefined) {
    i = 0
    for (const ch of code) i = (i * 31 + ch.charCodeAt(0)) % TONES.length
  }
  const t = TONES[i]
  return { '--tint': ld(t.tint), '--ink': ld(t.ink), '--line': ld(t.line) } as CSSProperties
}
