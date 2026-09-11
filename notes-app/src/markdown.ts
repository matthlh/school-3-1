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

export function extractSection(md: string, heading: RegExp): string | null {
  const s = splitSections(md).find((x) => x.heading && heading.test(x.heading))
  return s ? s.body.trim() : null
}

export interface Question {
  id: string; question: string; topic: string; lec: string; type: string; answer: string
}
export interface QuestionGroup { title: string | null; questions: Question[] }

/** Parse the `### Q:` / `**Topic:** … **Lec:** … **Type:** …` / `**A:**` format. */
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
    if (cur) { cur.answer = cur.answer.trim(); push(cur); cur = null; mode = null }
  }

  for (const line of md.split('\n')) {
    if (/^```/.test(line)) { fence = !fence; continue }
    if (fence) continue
    if (/^## /.test(line)) { flush(); groups.push({ title: line.slice(3).trim(), questions: [] }); continue }
    if (/^### Q:/.test(line)) {
      flush()
      cur = { id: `q${++n}`, question: line.replace(/^### Q:\s*/, ''), topic: '', lec: '', type: '', answer: '' }
      mode = 'q'
      continue
    }
    if (!cur) continue
    const meta = /\*\*Topic:\*\*\s*(.*?)\s*\*\*Lec:\*\*\s*(.*?)\s*\*\*Type:\*\*\s*(\S+)/.exec(line)
    if (meta) { cur.topic = meta[1].trim(); cur.lec = meta[2].trim(); cur.type = meta[3].trim(); mode = null; continue }
    if (/^\*\*A:\*\*/.test(line)) { cur.answer = line.replace(/^\*\*A:\*\*\s*/, ''); mode = 'a'; continue }
    if (mode === 'q' && line.trim()) cur.question += ' ' + line.trim()
    else if (mode === 'a') cur.answer += '\n' + line
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
    const cells = line.trim().split('|').slice(1, -1).map((c) => c.trim())
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
