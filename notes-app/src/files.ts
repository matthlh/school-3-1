// Every markdown file in the workspace, pulled in through Vite's glob imports.
// Files load as raw text; Vite hot-reloads the app when any of them changes.

import { afterDash, firstHeading } from './markdown'

type Loader = () => Promise<string>

const raw = {
  ...import.meta.glob('../../ledger.md', { query: '?raw', import: 'default' }),
  ...import.meta.glob('../../links.md', { query: '?raw', import: 'default' }),
  ...import.meta.glob('../../courses/**/*.md', { query: '?raw', import: 'default' }),
  ...import.meta.glob('../../routines/runs/*.md', { query: '?raw', import: 'default' }),
} as Record<string, Loader>

/** Workspace-relative path → loader, e.g. "courses/STAT251/00-syllabus.md". */
export const files: Record<string, Loader> = Object.fromEntries(
  Object.entries(raw).map(([k, v]) => [k.replace(/^(\.\.\/)+/, ''), v]),
)

export type Texts = Record<string, string>

let allCache: Promise<Texts> | null = null
/** Load every file once (there are a few dozen small ones); cached for the page lifetime. */
export function loadAll(): Promise<Texts> {
  if (!allCache) {
    allCache = Promise.all(
      Object.entries(files).map(async ([p, load]) => [p, await load()] as const),
    ).then((pairs) => Object.fromEntries(pairs))
  }
  return allCache
}

export interface Entry { path: string; label: string }
export interface Course { code: string; main: Entry[]; lectures: Entry[]; readings: Entry[] }
export interface Tree { courses: Course[]; runs: Entry[] }

const MAIN: [string, string][] = [
  ['00-syllabus.md', 'Syllabus'],
  ['03-logistics.md', 'Logistics'],
  ['01-topics.md', 'Topics'],
  ['02-questions.md', 'Question bank'],
  ['04-ask-kraal.md', 'Ask Kraal'],
  ['05-exam-review.md', 'Exam review'],
]

/** "01-02-ch1-data-types-displays.md" → "01–02 · ch1 data types displays"; "crop-rotation.md" → "crop rotation" */
function prettyLecture(name: string): string {
  const s = name.replace(/\.md$/, '')
  const m = /^(\d+(?:-\d+)?)-(.*)$/.exec(s)
  return m ? `${m[1].replace('-', '–')} · ${m[2].replace(/-/g, ' ')}` : s.replace(/-/g, ' ')
}

export function buildTree(): Tree {
  const courses = new Map<string, Course>()
  const course = (code: string): Course => {
    let c = courses.get(code)
    if (!c) { c = { code, main: [], lectures: [], readings: [] }; courses.set(code, c) }
    return c
  }
  const runs: Entry[] = []

  for (const p of Object.keys(files)) {
    let m = /^courses\/([^/]+)\/([^/]+\.md)$/.exec(p)
    if (m) {
      const label = MAIN.find(([f]) => f === m![2])?.[1]
      if (label) course(m[1]).main.push({ path: p, label })
      continue
    }
    // Staged outlines (`_NN-…`, `_<slug>`) are not logged yet and stay out of the tree.
    m = /^courses\/([^/]+)\/(lectures|readings)\/([^/]+\.md)$/.exec(p)
    if (m) {
      if (m[3].startsWith('_')) continue
      if (m[2] === 'lectures') course(m[1]).lectures.push({ path: p, label: prettyLecture(m[3]) })
      else course(m[1]).readings.push({ path: p, label: 'reading · ' + prettyLecture(m[3]) })
      continue
    }
    m = /^routines\/runs\/([^/]+)\.md$/.exec(p)
    if (m) runs.push({ path: p, label: m[1] })
  }

  const order = (path: string) => MAIN.findIndex(([f]) => path.endsWith('/' + f))
  for (const c of courses.values()) {
    c.main.sort((a, b) => order(a.path) - order(b.path))
    c.lectures.sort((a, b) => a.path.localeCompare(b.path))
    c.readings.sort((a, b) => a.path.localeCompare(b.path))
  }
  runs.sort((a, b) => b.label.localeCompare(a.label))

  return {
    courses: [...courses.values()].sort((a, b) => a.code.localeCompare(b.code)),
    runs: runs.slice(0, 10),
  }
}

/** "Introductory Probability" from the course syllabus's title line; '' when there is no syllabus. */
export function courseName(code: string, all: Texts): string {
  const syllabus = all[`courses/${code}/00-syllabus.md`]
  return syllabus ? afterDash(firstHeading(syllabus) ?? '') : ''
}

/** The course whose main file (syllabus, topics, …, Ask Kraal) `path` is: those pages get the course header and tabs. */
export function mainFileCourse(path: string): string | null {
  const m = /^courses\/([^/]+)\/([^/]+\.md)$/.exec(path)
  return m && MAIN.some(([f]) => f === m[2]) ? m[1] : null
}

/** Syllabus, topics, question bank and logistics: the course header already names these pages, so the viewer drops
 *  their H1. The other tabs keep theirs (an exam review's H1 carries the exam's time and room). */
export function titledByHeader(path: string): boolean {
  return /^courses\/[^/]+\/0[0-3]-[a-z]+\.md$/.test(path)
}

export function courseOf(path: string): string | null {
  const m = /^courses\/([^/]+)\//.exec(path)
  return m ? m[1] : null
}

/** Human label for any known path. */
export function labelFor(path: string, tree: Tree): string {
  if (path === 'ledger.md') return 'Ledger'
  if (path === 'links.md') return 'Links'
  for (const c of tree.courses) {
    const e = [...c.main, ...c.lectures, ...c.readings].find((x) => x.path === path)
    if (e) return e.label
  }
  const r = tree.runs.find((x) => x.path === path)
  if (r) return `Brief ${r.label.replace(/-morning.*$/, '')}`
  return path.split('/').pop() ?? path
}

/** Resolve a relative markdown link against the directory of the current file; a `#section` stays on the end. */
export function resolveRelative(fromPath: string, href: string): string {
  const [file, anchor] = href.split('#')
  const parts = fromPath.split('/').slice(0, -1)
  for (const seg of file.split('/')) {
    if (seg === '..') parts.pop()
    else if (seg && seg !== '.') parts.push(seg)
  }
  return parts.join('/') + (anchor ? '#' + anchor : '')
}

export const hrefFor = (path: string) => `#/${path}`

// ---- quiz history (routines/quiz-state.json, written by the quiz-me skill) ----------------

export interface QuizHistory { course: string; topic: string; history: [string, string][] }
export interface QuizState { questions: Record<string, QuizHistory>; sessions: unknown[] }

const quizRaw = import.meta.glob('../../routines/quiz-state.json', { query: '?raw', import: 'default' }) as Record<string, Loader>

export async function loadQuizState(): Promise<QuizState | null> {
  const load = Object.values(quizRaw)[0]
  if (!load) return null
  try { return JSON.parse(await load()) as QuizState } catch (e) { console.error('routines/quiz-state.json could not be loaded or parsed; quiz history is not shown', e); return null }
}
