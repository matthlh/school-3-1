// The notes page each bank question comes from, linked under its answer on the question cards.
// Mirror of the source-page block in .claude/skills/quiz-me/scripts/quizlib.py (attach_sources): keep the rules in step.

import type { Texts } from './files'
import { firstHeading, type QuestionGroup } from './markdown'
import { normQuestion } from './stats'

interface Source { path: string; title: string }

const LEC_FILE = /^(\d+)(?:-(\d+))?-/            // 05-06-<slug>.md covers lectures 5–6 (as term.py reads it)
const LEC_TAG = /^(\d+)(?:\s*[–—-]\s*(\d+))?$/   // **Lec:** 6 or 5–6

interface LecFile { a: number; b: number; path: string }
interface ReadFile { words: string[]; path: string }

/** "5–6" → [5, 6], "6" → [6, 6]; a non-lecture tag ("WW2", "reading", "Lab 1") → null. */
function lecSpan(tag: string): [number, number] | null {
  const m = LEC_TAG.exec(tag.trim())
  return m ? [+m[1], +(m[2] ?? m[1])] : null
}

/** Lowercase words with apostrophes dropped: "Seducer's Diary" → ["seducers", "diary"]. */
function words(s: string): string[] {
  return s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean)
}

/** The file whose NN or NN-MM prefix covers the whole span (narrowest first), else the one covering its start. */
function lectureFile([lo, hi]: [number, number], lecs: LecFile[]): string | null {
  for (const [a, b] of [[lo, hi], [lo, lo]]) {
    const hits = lecs.filter((f) => f.a <= a && b <= f.b)
    if (hits.length) return hits.reduce((x, y) => (y.b - y.a < x.b - x.a ? y : x)).path
  }
  return null
}

/** The reading whose slug words each start a word of the `## ` heading; the one named earliest wins. */
function readingFile(heading: string, reads: ReadFile[]): string | null {
  const hw = words(heading)
  let best: [number, string] | null = null
  for (const r of reads) {
    const at = r.words.map((s) => hw.findIndex((w) => w.startsWith(s)))
    if (r.words.length && !at.includes(-1) && (!best || Math.min(...at) < best[0])) best = [Math.min(...at), r.path]
  }
  return best ? best[1] : null
}

/**
 * The lecture file most other questions with question i's Topic tag point at; ties go to the earliest lecture.
 * Tags compare after normQuestion (quizlib's norm): equal first, else one a prefix of the other (6+ characters).
 */
function topicLecture(i: number, tags: string[], direct: (string | null)[]): string | null {
  const t = tags[i]
  if (!t) return null
  const tests = [(u: string) => u === t, (u: string) => Math.min(u.length, t.length) >= 6 && (u.startsWith(t) || t.startsWith(u))]
  for (const same of tests) {
    const counts = new Map<string, number>()
    tags.forEach((u, j) => {
      const d = direct[j]
      if (j !== i && d && same(u)) counts.set(d, (counts.get(d) ?? 0) + 1)
    })
    if (counts.size) return [...counts].sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1))[0][0]
  }
  return null
}

/**
 * Plain link text from the file's H1: "Lecture 6 notes: Conditional probability and independence",
 * "Lectures 1–2 notes: …", "Reading notes: Either/Or, "Crop Rotation"". Drops the course, the lecture number and
 * date, a "Ch 3:" prefix, a reading's dates and emphasis markers.
 */
function pageTitle(path: string, text: string): string {
  const name = (path.split('/').pop() ?? '').replace(/\.md$/, '')
  const m = LEC_FILE.exec(name)
  const reading = path.includes('/readings/')
  const kind = reading ? 'Reading notes' : m?.[2] ? `Lectures ${+m[1]}–${+m[2]} notes` : m ? `Lecture ${+m[1]} notes` : 'Notes'
  let s = (firstHeading(text) ?? '').replace(/[*`]/g, '').trim()
  s = s.replace(/^[A-Z]{2,5} ?\d{3}[A-Z]?\s+—\s+/, '')                                        // "STAT 251 — "
  s = s.replace(/^Lec(?:ture)?s?\s+\d+(?:\s*[–-]\s*\d+)?\s*(?:\([^)]*\))?\s*(?:[—:]\s*|$)/, '') // "Lec 6 (Mon Sep 21) — "
  if (reading) s = s.replace(/^Reading:\s*/, '').replace(/\s+—\s+[^—]*$/, '')                  // "Reading: " and its dates
  s = s.replace(/^Ch(?:apter)?\s*\d+:\s*/, '').trim()                                          // "Ch 3: "
  if (!s) s = (m ? name.slice(m[0].length) : name).split('-').join(' ')
  return s ? `${kind}: ${s[0].toUpperCase()}${s.slice(1)}` : kind
}

/**
 * Question id (the bank parse's `q<n>`) → the page it comes from. A numeric or range Lec maps to the lecture file
 * covering it. Any other tag (WW2, Lab 1, exam1, reading) falls back to the lecture that teaches its Topic. A
 * `reading` question, or any question under a `## Reading: …` heading, first tries the readings file that heading
 * names. Nothing in `all` → no entry.
 */
export function sourcesFor(code: string, groups: QuestionGroup[], all: Texts): Map<string, Source> {
  const dir = `courses/${code}/`
  const lecs: LecFile[] = []
  const reads: ReadFile[] = []
  for (const p of Object.keys(all).sort()) {
    if (!p.startsWith(dir)) continue
    const [sub, name, ...deeper] = p.slice(dir.length).split('/')
    if (deeper.length || !name?.endsWith('.md')) continue
    const m = LEC_FILE.exec(name)   // staged outlines (`_NN-…`) never match: the pattern needs a leading digit
    if (sub === 'lectures' && m) lecs.push({ a: +m[1], b: +(m[2] ?? m[1]), path: p })
    else if (sub === 'readings' && !name.startsWith('_')) reads.push({ words: words(name.slice(0, -3)), path: p })
  }

  const qs = groups.flatMap((g) => g.questions.map((q) => ({ q, section: g.title ?? '' })))
  const spans = qs.map(({ q }) => lecSpan(q.lec))
  const direct = spans.map((s) => (s ? lectureFile(s, lecs) : null))
  const tags = qs.map(({ q }) => normQuestion(q.topic))
  const titles = new Map<string, string>()
  const out = new Map<string, Source>()
  qs.forEach(({ q, section }, i) => {
    // A question written from a reading links to that reading's notes, whatever lecture its Lec names.
    const fromReading = q.lec.trim().toLowerCase() === 'reading' || section.toLowerCase().startsWith('reading')
    let src = (fromReading ? readingFile(section, reads) : null) ?? direct[i]
    if (!src && !spans[i]) src = topicLecture(i, tags, direct)
    if (!src) return
    if (!titles.has(src)) titles.set(src, pageTitle(src, all[src] ?? ''))
    out.set(q.id, { path: src, title: titles.get(src) ?? '' })
  })
  return out
}
