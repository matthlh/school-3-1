// The notes page each bank question comes from, linked under its answer on the question cards.
// The starting page follows quizlib.py's attach_sources. The site can then target a heading within that page or its linked reading.

import type { Texts } from './files'
import { firstHeading, isRawSection, splitSections, subheadings, type Question, type QuestionGroup } from './markdown'
import { parseRubric } from './review/rubric'
import { normQuestion } from './stats'

export interface Source { path: string; title: string; anchor?: string; heading?: string }

export const sourceHref = (source: Source) => `#/${source.path}${source.anchor ? '#' + source.anchor : ''}`
export const sourceLabel = (source: Source) => source.heading ?? source.title

const LEC_FILE = /^(\d+)(?:-(\d+))?-/            // 05-06-<slug>.md covers lectures 5–6 (as term.py reads it)
const LEC_TAG = /^(\d+)(?:\s*[–—-]\s*(\d+))?$/   // **Lec:** 6 or 5–6

interface LecFile { a: number; b: number; path: string }
interface ReadFile { words: string[]; path: string }

/** The question-bank `?lec=` value for a lecture page, or null for anything else. Mirrors how the bank slugs a Lec tag:
 *  a file `05-06-…` covers lectures 5–6, whose questions are tagged `5–6`, which slugs to `5-6`. */
export function lecQuery(path: string): string | null {
  const m = /\/lectures\/(\d+)(?:-(\d+))?-/.exec(path)
  if (!m) return null
  return m[2] ? `${+m[1]}-${+m[2]}` : `${+m[1]}`
}

/** "5–6" → [5, 6], "6" → [6, 6]; a non-lecture tag ("WW2", "reading", "Lab 1") → null. */
function lecSpan(tag: string): [number, number] | null {
  const m = LEC_TAG.exec(tag.trim())
  return m ? [+m[1], +(m[2] ?? m[1])] : null
}

/** Lowercase words with apostrophes dropped: "Seducer's Diary" → ["seducers", "diary"]. */
function words(s: string): string[] {
  return s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean)
}

const COMMON = new Set('be been being which would should could what when where whose these those each more most only than does doing from into same through between about both part first second show gives give says think take makes question answer explain means because choose compare following have will their there they them this that with without also how why use used example examples two one three something person individual course lecture reading concept summary key notes point section different name describe define'.split(' '))

function focusWords(text: string) {
  return words(text).filter(word => word.length > 2 && !/^\d+$/.test(word) && !COMMON.has(word))
}

const terms = (text: string) => new Set(focusWords(text))

function phrases(text: string) {
  const tokens = focusWords(text)
  return new Set(tokens.slice(1).map((word, i) => tokens[i] + ' ' + word))
}

function pageReferences(text: string) {
  return [...text.matchAll(/\b(PDF|Hannay)\s+(?:around\s+)?pp?\.\s*(\d+)(?:[–-](\d+))?/gi)]
    .map(([, edition, from, to]) => ({ edition: edition.toLowerCase(), from: +from, to: +(to ?? from) }))
}

const questionEvidence = (q: Question) =>
  [q.display.split('\n', 1)[0], ...(parseRubric(q.answer)?.points ?? [])].join('\n')

export function questionTerms(question: Question) {
  return terms(questionEvidence(question))
}

interface Passage { anchor: string; heading: string; title: Set<string>; body: Set<string>; phrases: Set<string>; references: ReturnType<typeof pageReferences> }

function passages(text: string): Passage[] {
  return splitSections(text).flatMap(section => {
    if (!section.heading || isRawSection(section.heading)) return []
    const lines = section.body.split('\n')
    const headings = subheadings(section.body, section.id)
    const starts = [{ id: section.id, heading: section.heading, line: 0 }, ...headings]
    return starts.map((h, i) => {
      const body = lines.slice(h.line, starts[i + 1] ? starts[i + 1].line - 1 : undefined).join(' ')
      return {
        anchor: h.id, heading: h.heading.replace(/[*\x60]/g, ''), title: terms(h.heading), body: terms(body),
        phrases: phrases(h.heading + '\n' + body), references: pageReferences(h.heading),
      }
    })
  })
}

function closestPassage(question: Question, candidates: { path: string; passage: Passage }[]) {
  const text = questionEvidence(question)
  const evidence = terms(text)
  const pairs = phrases(text)
  const refs = pageReferences(question.display.split('\n', 1)[0] + '\n' + question.answer)
  const topic = terms(question.topic)
  const ranked = candidates.map(({ path, passage }) => {
    let score = 0
    let strong = 0
    for (const word of evidence) {
      if (passage.title.has(word)) { score += 6; strong++ }
      else if (passage.body.has(word)) { score++; strong++ }
    }
    for (const pair of pairs) if (passage.phrases.has(pair)) score += 4
    for (const ref of refs) {
      const range = passage.references.find(r => r.edition === ref.edition && r.from <= ref.from && r.to >= ref.to)
      if (range) score += range.from === ref.from && range.to === ref.to ? 16 : 12
    }
    for (const word of topic) if (!evidence.has(word) && passage.title.has(word)) score += 2
    return { path, passage, score, strong }
  }).sort((a, b) => b.score - a.score)
  const [best, next] = ranked
  // Weak or tied evidence falls back to the notes page. A heading link should point to the explanation, not a guess.
  return best && best.strong >= 2 && best.score >= 5 && best.score > (next?.score ?? 0) ? best : null
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
  const indexed = new Map<string, Passage[]>()
  const forPath = (path: string) => {
    const prior = indexed.get(path)
    if (prior) return prior
    const found = passages(all[path] ?? '')
    indexed.set(path, found)
    return found
  }
  const linked = new Map<string, string[]>()
  const readingLinks = (path: string) => {
    const prior = linked.get(path)
    if (prior) return prior
    const paths = [...(all[path] ?? '').matchAll(/\]\(\.\.\/readings\/([\w-]+\.md)(?:#[^)]*)?\)/g)]
      .map(([, file]) => dir + 'readings/' + file).filter(file => file in all)
    const found = [...new Set(paths)]
    linked.set(path, found)
    return found
  }
  qs.forEach(({ q, section }, i) => {
    // A question written from a reading links to that reading's notes, whatever lecture its Lec names.
    const fromReading = q.lec.trim().toLowerCase() === 'reading' || section.toLowerCase().startsWith('reading')
    let src = (fromReading ? readingFile(section, reads) ?? readingFile(q.topic, reads) : null) ?? direct[i]
    if (!src && !spans[i]) src = topicLecture(i, tags, direct)
    if (!src) return
    const match = closestPassage(q, [src, ...readingLinks(src)]
      .flatMap(path => forPath(path).map(passage => ({ path, passage }))))
    const path = match?.path ?? src
    if (!titles.has(path)) titles.set(path, pageTitle(path, all[path] ?? ''))
    out.set(q.id, { path, title: titles.get(path) ?? '', anchor: match?.passage.anchor, heading: match?.passage.heading })
  })
  return out
}
