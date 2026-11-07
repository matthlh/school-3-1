// The answer key a bank answer opens with, and the grade its ticks give. The same rule as the quiz scripts, the deck
// page and CLAUDE.md (2026-11-01, Parts 2026-11-06): in a Key or Steps list point 1 is the core, so the core not ticked
// is X, the core with another point unticked is ~, every point is O; a Parts list has no core, so every part is O, at
// least half is ~, fewer is X. Confidence never changes the grade; the scheduler reads it (1 or 2 holds the rung).

export type Grade = 'O' | '~' | 'X'
export type RubricKind = 'Key' | 'Steps' | 'Parts'

export interface Rubric {
  kind: RubricKind
  /** The numbered one-line points, as written (markdown). */
  points: string[]
  /** The explanation after the list (markdown); '' when there is none. */
  rest: string
}

/** The rubric an answer opens with, or null for an answer without one (an old-format answer: no grading from ticks). */
export function parseRubric(answer: string): Rubric | null {
  const m = /^(Key|Steps|Parts):\s*\n((?:\d+\.\s.*(?:\n|$))+)\s*([\s\S]*)$/.exec(answer.trim())
  if (!m) return null
  return {
    kind: m[1] as RubricKind,
    points: m[2].trim().split('\n').map((l) => l.replace(/^\d+\.\s+/, '')),
    rest: m[3].trim(),
  }
}

/** The grade a set of ticks gives under the rubric's rule. */
export function gradeFromTicks(kind: RubricKind, ticks: boolean[]): Grade {
  const n = ticks.filter(Boolean).length
  if (kind === 'Parts') return n === ticks.length ? 'O' : 2 * n >= ticks.length ? '~' : 'X'
  return !ticks[0] ? 'X' : n === ticks.length ? 'O' : '~'
}

/** A short, stable fingerprint of a text (FNV-1a, 32 bits, hex): which version of a stem or key an answer was graded
 *  against, so a later edit of the bank cannot reinterpret an old attempt. Not a security hash. */
export function fingerprint(s: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}
