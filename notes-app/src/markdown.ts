// Small markdown-structure helpers: sections, headings, and the Q/A question-bank format.
import { formatDate } from './dates'

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

// ---- ledger.md "Due now" block ----------------------------------------------------------------
// quiz_pick.py rewrites this block on every run, and quiz_grade.py after every graded session (due_block in
// .claude/skills/quiz-me/scripts/quizlib.py). The site shows it as written and never works out for itself what is due:
// only the scheduler knows the exams, so only it can freeze topics after a non-cumulative exam, sweep topics in during
// an exam week and rank them by lateness. One line out of its format fails the whole block.

/** Why a topic is due: its Next date has come, or the exam-week sweep pulled it in early. */
export type DueWhen = { kind: 'today' } | { kind: 'overdue'; days: number } | { kind: 'sweep'; exam: string; date: string }

/** One bullet. `course` is the code without its space, as on a TopicRow; `topic` is the ledger's topic cell. */
export interface DueItem { course: string; topic: string; when: DueWhen; grade: Grade | null }

/** "PHIL 385 16 topics from Exam 1": topics that exam covered and the course's next exam does not. */
export interface FrozenGroup { course: string; count: number; exam: string }

/** One frozen bullet: a ledger row the scheduler keeps from coming due, and the exam it is frozen after. */
interface FrozenRow { course: string; topic: string; exam: string }

/** A course whose next exam is at most 21 days away, with the share of its in-scope questions likely recalled now. */
export interface Readiness {
  course: string
  /** As the block names it, start time included: "Exam 2 14:00". */
  exam: string
  /** As written: "Fri Oct 16". */
  date: string
  percent: number
  questions: number
  /** Topics in scope that no question matches. */
  bare: number
}

export interface DueBlock {
  /** The day the scheduler wrote the block, an ISO day, from its first line: `<!-- due as of 2026-10-06 -->`. */
  date: string
  /** The due topics in the scheduler's order, the most overdue for their interval first. */
  items: DueItem[]
  /** How many of the items the exam-week sweep pulled in. */
  swept: number
  /** The sentence that stands in for the list when nothing is due, as written (markdown); null when something is due. */
  nothing: string | null
  readiness: Readiness[]
  /** The frozen line's counts, in its order; empty without a frozen line. */
  frozen: FrozenGroup[]
  /** The sentence after the frozen counts, as written; null without a frozen line. */
  frozenWhy: string | null
  /** The frozen bullets under the frozen line, one per frozen ledger row. */
  frozenRows: FrozenRow[]
}

type DueParse = { ok: true; block: DueBlock } | { ok: false; error: string }

const DAY = '(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \\d{1,2}'
const LABEL = '[A-Z]{2,4} \\d{3}[A-Z]?'   // a course as the ledger writes it: "STAT 251"
const DUE_DATE = /^<!-- due as of (\d{4}-\d{2}-\d{2}) -->$/
const DUE_SUMMARY = new RegExp(`^_(\\d+) topics? due as of (${DAY})(?:, (\\d+) of them from an exam-week sweep)?\\.[^_]*_$`)
const DUE_NOTHING = new RegExp(`^_(Nothing due today\\. Next: \\d+ topics? on \\*\\*${DAY}\\*\\* \\([^)]+\\)\\.)_$`)
const DUE_UNSCHEDULED = /^_(Nothing scheduled yet\b[^_]*)_$/
const DUE_READY = new RegExp(`^_Readiness · (${LABEL}) (.+?) · (${DAY}) · (\\d+)% of (\\d+) in-scope questions? likely recalled`
  + '(?: · (\\d+) topics? in scope (?:has|have) no question)?\\._$')
const DUE_FROZEN = /^_Frozen, not due: (.+?)\. ([^_]+)_$/
const FROZEN_GROUP = new RegExp(`^(${LABEL}) (\\d+) topics? from (.+)$`)
const DUE_COURSE = new RegExp(`^${LABEL}$`)
const DUE_SWEEP = new RegExp(`^exam sweep before (.+) on (${DAY})$`)
const FROZEN_AFTER = /^frozen after (.+)$/

/** A bullet's parts around " · ": the course first, then the topic, which may hold " · " itself, then `tail` more parts
 *  of the scheduler's. Null when there are too few parts or the first is not a course. */
function bulletParts(s: string, tail: number): { course: string; topic: string; rest: string[] } | null {
  const parts = s.split(' · ')
  if (parts.length < tail + 2 || !DUE_COURSE.test(parts[0])) return null
  return { course: parts[0].replace(' ', ''), topic: parts.slice(1, -tail).join(' · '), rest: parts.slice(-tail) }
}

/** "STAT 251 · <topic> · overdue 19 d · last unquizzed" → an item, or null. */
function parseDueItem(s: string): DueItem | null {
  const b = bulletParts(s, 2)
  if (!b) return null
  const [w, last] = b.rest
  const g = /^last (O|~|X|unquizzed)$/.exec(last)?.[1]
  const overdue = /^overdue (\d+) d$/.exec(w)
  const sweep = DUE_SWEEP.exec(w)
  const when: DueWhen | null = w === 'due today' ? { kind: 'today' }
    : overdue ? { kind: 'overdue', days: +overdue[1] }
    : sweep ? { kind: 'sweep', exam: sweep[1], date: sweep[2] } : null
  if (!when || !g) return null
  return { course: b.course, topic: b.topic, when, grade: g === 'O' || g === '~' || g === 'X' ? g : null }
}

/** "PHIL 385 · <topic> · frozen after Exam 1" → a frozen row, or null. */
function parseFrozenRow(s: string): FrozenRow | null {
  const b = bulletParts(s, 1)
  const exam = b && FROZEN_AFTER.exec(b.rest[0])?.[1]
  return b && exam ? { course: b.course, topic: b.topic, exam } : null
}

/** "Exam 2 14:00" → "Exam 2": the block names an exam with its start time when it has one. */
export function examOnly(exam: string): string {
  return exam.replace(/ \d{1,2}:\d{2}$/, '')
}

/** A due topic's label in a table: "due today", "19 d late", or the sweep with its exam, "Exam 2 sweep". */
export function whenLabel(w: DueWhen): string {
  return w.kind === 'today' ? 'due today' : w.kind === 'overdue' ? `${w.days} d late` : `${examOnly(w.exam)} sweep`
}

/** The block's own words: "due today", "overdue 19 d", "exam sweep before Exam 2 14:00 on Fri Oct 16". */
export function whenTitle(w: DueWhen): string {
  return w.kind === 'today' ? 'due today' : w.kind === 'overdue' ? `overdue ${w.days} d` : `exam sweep before ${w.exam} on ${w.date}`
}

/**
 * ledger.md's `## Due now` block → its parts, or why it cannot be read. The first line is the date line,
 * `<!-- due as of 2026-10-06 -->`, which never renders. Every other non-blank line must be one of the scheduler's: the
 * summary ("_52 topics due as of Tue Oct 6, 6 of them from an exam-week sweep. Say **quiz me**._") with one bullet per
 * due topic, or the "Nothing due today" or "Nothing scheduled yet" line in their place; then a readiness line per near
 * exam; then at most one frozen line with one bullet per frozen topic under it ("- PHIL 385 · <topic> · frozen after
 * Exam 1"). The summary's day must be the date line's, and the counts of the summary and the frozen line must match
 * their bullets.
 */
export function parseDueBlock(ledger: string): DueParse {
  const fail = (error: string): DueParse => ({ ok: false, error })
  const body = extractSection(ledger, /^due now$/i)
  if (body === null) return fail('ledger.md has no "## Due now" section.')
  const [first = '', ...lines] = body.split('\n').map((l) => l.trim()).filter(Boolean)
  const date = DUE_DATE.exec(first)?.[1]
  if (!date) return fail('The block does not start with its date line, "<!-- due as of YYYY-MM-DD -->".')
  let head: { count: number; day: string | null; swept: number; nothing: string | null } | null = null
  const items: DueItem[] = []
  const readiness: Readiness[] = []
  const frozen: FrozenGroup[] = []
  const frozenRows: FrozenRow[] = []
  let frozenWhy: string | null = null
  for (const line of lines) {
    let m: RegExpExecArray | null
    // A bullet above the frozen line is a due topic, one under it a frozen topic.
    if (line.startsWith('- ') && frozenWhy === null) {
      const item = parseDueItem(line.slice(2))
      if (!item) return fail(`This bullet is not in the scheduler's format: "${line}"`)
      items.push(item)
    } else if (line.startsWith('- ')) {
      const row = parseFrozenRow(line.slice(2))
      if (!row) return fail(`This bullet under the frozen line is not in the scheduler's format: "${line}"`)
      frozenRows.push(row)
    } else if ((m = DUE_SUMMARY.exec(line))) {
      if (head) return fail('The block has more than one summary line.')
      head = { count: +m[1], day: m[2], swept: +(m[3] ?? 0), nothing: null }
    } else if ((m = DUE_NOTHING.exec(line) ?? DUE_UNSCHEDULED.exec(line))) {
      if (head) return fail('The block has more than one summary line.')
      head = { count: 0, day: null, swept: 0, nothing: m[1] }
    } else if ((m = DUE_READY.exec(line))) {
      readiness.push({ course: m[1].replace(' ', ''), exam: m[2], date: m[3], percent: +m[4], questions: +m[5], bare: +(m[6] ?? 0) })
    } else if ((m = DUE_FROZEN.exec(line))) {
      if (frozenWhy !== null) return fail('The block has two frozen lines.')
      for (const part of m[1].split(' · ')) {
        const g = FROZEN_GROUP.exec(part)
        if (!g) return fail(`The frozen line is not in the scheduler's format: "${line}"`)
        frozen.push({ course: g[1].replace(' ', ''), count: +g[2], exam: g[3] })
      }
      frozenWhy = m[2]
    } else return fail(`This line is not in the scheduler's format: "${line}"`)
  }
  if (!head) return fail('The block has no summary line.')
  if (head.day !== null && head.day !== formatDate(date)) return fail(`The summary is dated ${head.day}, but the date line says ${formatDate(date)}.`)
  const swept = items.filter((i) => i.when.kind === 'sweep').length
  if (items.length !== head.count || swept !== head.swept) {
    return fail(`The summary counts ${head.count} topics, ${head.swept} of them from a sweep, but the block lists ${items.length}, ${swept} of them from a sweep.`)
  }
  const counted = frozen.reduce((n, g) => n + g.count, 0)
  const under = (g: FrozenGroup) => frozenRows.filter((r) => r.course === g.course && r.exam === g.exam).length
  if (counted !== frozenRows.length || frozen.some((g) => under(g) !== g.count)) {
    return fail(`The frozen line counts ${counted} topics, but the ${frozenRows.length} bullets under it do not match those counts.`)
  }
  return { ok: true, block: { date, items, swept, nothing: head.nothing, readiness, frozen, frozenWhy, frozenRows } }
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

// ---- a syllabus's "## Grading" table, for the what-if panel on a course page ------------------

export interface GradeComponent {
  /** As the syllabus names it, without bold, italics, the count or the running mark: "WeBWorK" from "WeBWorK ×10". */
  name: string
  /** Percent of the course grade; for a bonus, the points it adds on top of the 100. */
  weight: number
  /** How many graded items it holds ("×10"); null when the syllabus gives no count. */
  count: number | null
  /** A weight written with a plus ("*+1%*"): extra points on top of the 100. */
  bonus: boolean
  /** Marked "(running)": one item holds the score so far ("iClicker 14/37"), and the component stays open until the end. */
  running: boolean
  /** Another cell of its row says scores are dropped ("lowest dropped"), which the what-if panel does not model. */
  drops: boolean
}

/**
 * The first table under a syllabus's `## Grading` heading (Component | Weight | …) → its components, or the one problem
 * that stopped the parse. All or nothing: a missing section, table or column, one weight not written like "4%",
 * "**22%**" or "*+1%*", or a running component with a count, fails the whole table, so the panel never shows numbers
 * from part of it.
 */
export function parseWeights(syllabus: string): { components: GradeComponent[] } | { error: string } {
  const sec = extractSection(syllabus, /^grading\b/i)
  if (sec === null) return { error: 'The syllabus has no Grading section.' }
  const table = parseTable(sec)
  if (!table) return { error: 'The Grading section has no table.' }
  const head = table.head.map((h) => h.replace(/\*/g, '').trim().toLowerCase())
  const nameAt = head.indexOf('component')
  const weightAt = head.indexOf('weight')
  if (nameAt < 0 || weightAt < 0) return { error: 'The grading table needs a Component column and a Weight column.' }
  if (table.rows.length === 0) return { error: 'The grading table has no rows.' }
  const components: GradeComponent[] = []
  for (const cells of table.rows) {
    const cell = (i: number) => (cells[i] ?? '').replace(/\*/g, '').trim()
    const counted = /^(.*?)\s*×\s*([1-9]\d*)$/.exec(cell(nameAt))
    const running = /^(.*?)\s*\(running\)$/.exec(counted ? counted[1] : cell(nameAt))
    const name = running ? running[1] : counted ? counted[1] : cell(nameAt)
    const weight = /^(\+?)(\d+(?:\.\d+)?)%$/.exec(cell(weightAt))
    if (!name) return { error: 'A row of the grading table has no component name.' }
    if (!weight) return { error: `The weight of ${name}, "${cell(weightAt)}", is not a percentage like 4% or +1%.` }
    if (running && counted) return { error: `${name} is marked running, so it holds one item and takes no count like ×${counted[2]}.` }
    components.push({
      name, weight: Number(weight[2]), count: counted ? Number(counted[2]) : null, bonus: weight[1] === '+', running: !!running,
      drops: cells.some((c, i) => i !== nameAt && i !== weightAt && /\bdropped\b/i.test(c)),
    })
  }
  return { components }
}

// ---- ledger.md "Grades so far" and "Session log" ---------------------------------------------

export interface GradeItem { name: string; got: string; of: string }
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
 * Rows of the first table in ledger.md's `## Grades so far` section (Course | Score | As of); none without that section.
 * The Score cell is free text written by the morning check: an optional "87%" at the start, then items like
 * "Mini-Quiz 3 9.5/10" separated by ";" or "," (parentheses count as separators), and remarks. "total hidden …" sets
 * `hidden` instead of becoming a note.
 */
export function parseLedgerGrades(ledger: string): GradeRow[] {
  const table = parseTable(extractSection(ledger, /^grades/i) ?? '')
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
