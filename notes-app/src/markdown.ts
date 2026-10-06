// Small markdown-structure helpers: sections, headings, and the Q/A question-bank format.

export interface Section { id: string; heading: string | null; body: string }

export function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
}

/** Split on level-2 headings (outside fenced code). Item 0 is the preamble. */
export function splitSections(md: string): Section[] {
  const out: Section[] = [{ id: 'top', heading: null, body: '' }]
  let fence = false
  for (const line of md.split('\n')) {
    if (/^```/.test(line)) fence = !fence
    if (!fence && /^## /.test(line)) {
      const heading = line.slice(3).trim()
      out.push({ id: slug(heading), heading, body: '' })
      continue
    }
    out[out.length - 1].body += line + '\n'
  }
  return out
}

export function firstHeading(md: string): string | null {
  const m = /^# (.+)$/m.exec(md)
  return m ? m[1].trim() : null
}

/** "STAT 251 — Introductory Probability (2026W1)" → "Introductory Probability" */
export function afterDash(s: string): string {
  const i = s.indexOf(' — ')
  return (i >= 0 ? s.slice(i + 3) : s).replace(/\s*\(20\d\dW\d\)\s*$/, '').trim()
}

function extractSection(md: string, heading: RegExp): string | null {
  const s = splitSections(md).find((x) => x.heading && heading.test(x.heading))
  return s ? s.body.trim() : null
}

export interface Question {
  id: string
  /** The stem's prose on one line, fenced code left out: what questionId hashes, as the quiz scripts do. */
  question: string
  /** The stem exactly as written (line breaks, bullets, tables and code blocks kept): what the card shows. */
  display: string
  topic: string; lec: string; type: string; answer: string
}
export interface QuestionGroup { title: string | null; questions: Question[] }

/**
 * Parse the `### Q:` / `**Topic:** … **Lec:** … **Type:** …` / `**A:**` format. Mirror of `_parse_bank` in quizlib.py,
 * line for line (`npm run parity` fails the deploy on any difference): a `#`/`##` heading or a `---` line ends a
 * question, only its first meta line counts, and a second `**A:**` line extends the answer. `question` keeps the flat,
 * code-less text ids have always hashed; `display` keeps the stem as written. Fenced code in an answer stays in
 * `answer`. A fence outside any question (the format example atop each bank) is skipped whole.
 */
export function parseQuestions(md: string): QuestionGroup[] {
  const groups: QuestionGroup[] = []
  let cur: Question | null = null
  let mode: 'q' | 'a' | null = null
  let fence = false
  let n = 0

  const push = (q: Question) => {
    if (groups.length === 0) groups.push({ title: null, questions: [] })
    groups[groups.length - 1].questions.push(q)
  }
  const flush = () => {
    if (cur) { cur.display = cur.display.trim(); cur.answer = cur.answer.trim(); push(cur); cur = null; mode = null }
  }

  for (const line of md.split('\n')) {
    if (/^```/.test(line) || fence) {
      if (/^```/.test(line)) fence = !fence
      if (cur && mode === 'q') cur.display += '\n' + line
      else if (cur && mode === 'a') cur.answer += '\n' + line
      continue
    }
    if (/^## /.test(line)) { flush(); groups.push({ title: line.slice(3).trim(), questions: [] }); continue }
    if (/^### Q:/.test(line)) {
      flush()
      const first = line.replace(/^### Q:\s*/, '')
      cur = { id: `q${++n}`, question: first, display: first, topic: '', lec: '', type: '', answer: '' }
      mode = 'q'
      continue
    }
    if (!cur) continue
    if (/^# /.test(line) || line.trim() === '---') { flush(); continue }
    const meta = /\*\*Topic:\*\*\s*(.+?)\s+\*\*Lec:\*\*\s*(.+?)\s+\*\*Type:\*\*\s*(\w+)/.exec(line)
    if (meta && !cur.type) { cur.topic = meta[1].trim(); cur.lec = meta[2].trim(); cur.type = meta[3].toLowerCase(); continue }
    if (/^\*\*A:\*\*/.test(line)) {
      const rest = line.slice('**A:**'.length).trim()
      cur.answer = mode === 'a' ? cur.answer + '\n' + rest : rest   // a second **A:** line extends the answer
      mode = 'a'
      continue
    }
    if (mode === 'q') {
      if (line.trim()) cur.question += ' ' + line.trim()
      cur.display += '\n' + line
    } else if (mode === 'a') cur.answer += '\n' + line
  }
  flush()
  return groups.filter((g) => g.questions.length > 0)
}

export function countQuestions(md: string | undefined): number {
  return md ? parseQuestions(md).reduce((n, g) => n + g.questions.length, 0) : 0
}

// ---- ledger.md "All topics" table ---------------------------------------------------------

export type Grade = 'X' | '~' | 'O'
export interface TopicRow {
  course: string; topic: string; lec: string; last: string; grade: Grade | null; streak: number; next: string
}

/** Rows of `## All topics` — course codes normalised ("STAT 251" → "STAT251"). */
export function parseLedgerTopics(md: string): TopicRow[] {
  const sec = extractSection(md, /^all topics/i)
  if (!sec) return []
  const rows: TopicRow[] = []
  for (const line of sec.split('\n')) {
    if (!line.trim().startsWith('|')) continue
    const cells = splitRow(line)
    if (cells.length < 7 || cells[0] === 'Course' || /^-+$/.test(cells[0]) || !cells[0]) continue
    const g = cells[4]
    rows.push({
      course: cells[0].replace(/\s+/g, ''), topic: cells[1], lec: cells[2], last: cells[3],
      grade: g === 'X' || g === '~' || g === 'O' ? g : null,
      streak: parseInt(cells[5], 10) || 0, next: /^\d{4}-\d{2}-\d{2}$/.test(cells[6]) ? cells[6] : '',
    })
  }
  return rows
}

export interface LinkRow { course: string; name: string; url: string }
/** links.md → rows. Course "ALL" = shown everywhere. The 4th column (to-do matching) is for things_plan.py. */
export function parseLinks(md: string): LinkRow[] {
  const rows: LinkRow[] = []
  for (const line of md.split('\n')) {
    if (!line.trim().startsWith('|')) continue
    const cells = splitRow(line)
    if (cells.length < 3 || cells[0] === 'Course' || /^-+$/.test(cells[0]) || !/^https?:/.test(cells[2])) continue
    rows.push({ course: cells[0].replace(/\s+/g, ''), name: cells[1], url: cells[2] })
  }
  return rows
}

export interface Deadline { date: string; time: string; approx: boolean; course: string; what: string; rawWhat: string; weight: string; exam: boolean }
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const DATE_RE = /(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)?\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})(?:,?\s*(\d{1,2}:\d{2}))?/g

/**
 * ledger.md → "## Term calendar" rows with a parseable date. A range ("Sep 11 → Sep 24") keeps its end.
 * A table whose header starts with "Series" (the recurring series) is skipped whole: its rows are weekly, not dated.
 * `year` is the year the term began. A row is an exam when its What cell opens with the bold exam name
 * (**Exam 2**, **Midterm**, **Final**), so "exam schedule posted" and "final paper questions posted" are not.
 */
export function parseCalendar(md: string, year: number): Deadline[] {
  const sec = extractSection(md, /^term calendar/i)
  if (!sec) return []
  const out: Deadline[] = []
  let series = false
  for (const line of sec.split('\n')) {
    if (!line.trim().startsWith('|')) { series = false; continue }
    const cells = splitRow(line)
    if (/^series$/i.test(cells[0] ?? '')) series = true
    if (series || cells.length < 3 || cells[0] === 'Date' || /^-+$/.test(cells[0])) continue
    const plain = cells[0].replace(/\*/g, '')
    const matches = [...plain.matchAll(DATE_RE)]
    if (matches.length === 0) continue
    const last = matches[matches.length - 1]
    const month = MONTHS.indexOf(last[1].toLowerCase()) + 1
    const y = month < 6 ? year + 1 : year // a Sept–Dec term; Jan–May dates belong to the next year
    const date = `${y}-${String(month).padStart(2, '0')}-${last[2].padStart(2, '0')}`
    const what = cells[2].replace(/\*\*/g, '').replace(/\s*[—–-]\s+(confirmed|the |course-site|PrairieLearn's).*$/i, '').trim()
    out.push({
      date, time: last[3] ?? '', approx: /^~/.test(plain.trim()), course: cells[1].replace(/\s+/g, ''),
      what, rawWhat: cells[2], weight: (cells[3] ?? '').replace(/\*/g, '').trim(), exam: /^\*\*(exam\b|midterm|final)/i.test(cells[2]),
    })
  }
  return out.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
}

// ---- generic tables and topic strings -------------------------------------------------------

export interface Table { head: string[]; rows: string[][] }

/** One `| a | b |` line → trimmed cells; `\|` inside a cell stays a pipe. */
export function splitRow(line: string): string[] {
  const s = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return s.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, '|').trim())
}

/** Body → text before the first table, the table lines, and everything after that contiguous run. */
export function splitAroundTable(md: string): { before: string; table: string; after: string } {
  const lines = md.split('\n')
  const start = lines.findIndex((l) => l.trim().startsWith('|'))
  if (start < 0) return { before: md, table: '', after: '' }
  let end = start
  while (end < lines.length && lines[end].trim().startsWith('|')) end++
  return { before: lines.slice(0, start).join('\n'), table: lines.slice(start, end).join('\n'), after: lines.slice(end).join('\n') }
}

/** The first markdown table in `md` as header cells + body rows (the `|---|` separator row is dropped). */
export function parseTable(md: string): Table | null {
  const { table } = splitAroundTable(md)
  if (!table) return null
  const lines = table.split('\n').map(splitRow)
  const isRule = (cells: string[]) => cells.every((c) => /^:?-+:?$/.test(c) || c === '')
  const [head, ...rest] = lines
  return { head, rows: rest.filter((cells) => !isRule(cells)) }
}

/** "Mean and median (odd and even n · which to report)" → main text plus the trailing parenthetical. */
export function splitTopic(topic: string): { main: string; detail: string | null } {
  const s = topic.trim()
  if (!s.endsWith(')')) return { main: s, detail: null }
  let depth = 0
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') depth++
    else if (s[i] === '(' && --depth === 0) {
      const main = s.slice(0, i).trim()
      const detail = s.slice(i + 1, -1).trim()
      return main && detail ? { main, detail } : { main: s, detail: null }
    }
  }
  return { main: s, detail: null }
}

/** "STAT251" → "STAT 251" for prose; chips keep the compact code. */
export function courseLabel(code: string): string {
  return code.replace(/^([A-Za-z]+)(\d)/, '$1 $2')
}

// ---- ledger.md "Grades so far" and "Session log" ---------------------------------------------

interface GradeItem { name: string; got: string; of: string }
interface GradeRow {
  /** Course code with spaces removed ("ASIA250"). */
  course: string
  /** The overall percentage at the start of the Score cell, without the sign; null when there is none. */
  percent: string | null
  /** True when the Score cell says Canvas hides the total. */
  hidden: boolean
  /** Graded items written as "Name got/of". */
  items: GradeItem[]
  /** Any other fragment of the Score cell, as a sentence. */
  notes: string[]
  /** The As of cell, usually an ISO date; empty when nothing is graded. */
  asOf: string
}

/** "the only Canvas item so far" → "The only Canvas item so far." */
function sentence(s: string): string {
  const t = s.trim()
  const cap = /^[a-z][A-Z]/.test(t) ? t : t.charAt(0).toUpperCase() + t.slice(1)   // "iClicker" stays as written
  return /[.!?]$/.test(cap) ? cap : cap + '.'
}

/**
 * Rows of the first table in the `## Grades so far` body (Course | Score | As of). The Score cell is free text
 * written by the morning check: an optional "87%" at the start, then items like "Mini-Quiz 3 9.5/10" separated by
 * ";" or "," (parentheses count as separators), and remarks. "total hidden …" sets `hidden` instead of becoming a note.
 */
export function parseGrades(body: string): GradeRow[] {
  const table = parseTable(body)
  if (!table) return []
  const out: GradeRow[] = []
  for (const cells of table.rows) {
    if (!cells[0]) continue
    let score = (cells[1] ?? '').trim()
    let percent: string | null = null
    const pm = /^(\d+(?:\.\d+)?)%/.exec(score)
    if (pm) { percent = pm[1]; score = score.slice(pm[0].length) }
    const items: GradeItem[] = []
    const notes: string[] = []
    let hidden = false
    if (!/^[\s—–-]*$/.test(score)) {
      for (const raw of score.replace(/[()]/g, ',').split(/[;,]/)) {
        const f = raw.trim()
        if (!f) continue
        if (/total hidden/i.test(f)) { hidden = true; continue }
        const im = /^(.+?)\s+(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\.?$/.exec(f)
        if (im) items.push({ name: im[1], got: im[2], of: im[3] })
        else notes.push(sentence(f))
      }
    }
    out.push({ course: cells[0].replace(/\s+/g, ''), percent, hidden, items, notes, asOf: (cells[2] ?? '').trim() })
  }
  return out
}

/** Words that end in a period without ending a sentence ("e.g. the", "p. 147", "vs. the Judge"). */
const ABBREV = new Set(['e.g', 'i.e', 'vs', 'cf', 'p', 'pp', 'ca', 'approx', 'dr', 'mr', 'mrs', 'prof', 'st', 'fig'])

/**
 * Indices just past each sentence-ending ". " in `s`. A period ends a sentence when a space follows it and it sits
 * outside inline code, `$$…$$` math, parentheses, link brackets and a balanced `**bold**` run, and the word before
 * it is not an abbreviation such as "e.g". A decimal ("9.5/10") never qualifies because no space follows its period.
 */
function sentenceEnds(s: string): number[] {
  const out: number[] = []
  // Bold only shields its contents when the `**` markers outside code pair up; a stray one is ignored.
  const boldPairs = (s.replace(/`[^`]*`/g, '').match(/\*\*/g) ?? []).length % 2 === 0
  let code = false
  let math = false
  let bold = false
  let depth = 0
  for (let i = 0; i < s.length - 1; i++) {
    const ch = s[i]
    if (ch === '`' && !math) { code = !code; continue }
    if (code) continue
    if (ch === '$' && s[i + 1] === '$') { math = !math; i++; continue }
    if (math) continue
    if (ch === '*' && s[i + 1] === '*') { if (boldPairs) bold = !bold; i++; continue }
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1)
    else if (ch === '.' && depth === 0 && !bold && s[i + 1] === ' ') {
      const word = /([^\s(\[*_"'“‘]*)$/.exec(s.slice(0, i))?.[1] ?? ''
      if (ABBREV.has(word.toLowerCase())) continue
      out.push(i + 1)
    }
  }
  return out
}

/** Text split into sentences by the rule in `sentenceEnds`; each sentence keeps its closing period. */
export function splitSentences(text: string): string[] {
  const s = text.trim()
  if (!s) return []
  const out: string[] = []
  let from = 0
  for (const end of sentenceEnds(s)) {
    const piece = s.slice(from, end).trim()
    if (piece) out.push(piece)
    from = end
  }
  const tail = s.slice(from).trim()
  if (tail) out.push(tail)
  return out
}

/**
 * A session-log entry split for display: the title is the first sentence (see `splitSentences`); the rest is the
 * detail. An entry of 110 characters or fewer is all title.
 */
export function splitLogEntry(text: string): { title: string; detail: string | null } {
  const s = text.trim()
  if (s.length <= 110) return { title: s, detail: null }
  const end = sentenceEnds(s)[0]
  if (end === undefined) return { title: s, detail: null }
  const title = s.slice(0, end).trim()
  const detail = s.slice(end + 1).trim()
  return detail ? { title, detail } : { title: s, detail: null }
}
