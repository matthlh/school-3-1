// Focused regressions for the website review fixes. Uses the real components with small browser/React
// adapters, plus a production Vite build in a disposable fixture containing a private brief.
// Run: node scripts/website-regressions.mjs
import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, mkdir, readFile, writeFile, rm, copyFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build as bundle } from 'esbuild'
import { build as viteBuild } from 'vite'

const app = decodeURIComponent(new URL('..', import.meta.url).pathname)
const root = decodeURIComponent(new URL('../..', import.meta.url).pathname)
const adapters = {
  react: 'export const useMemo=f=>f(); export const useRef=v=>({current:v}); export const useEffect=()=>{}; export const useState=v=>[typeof v==="function"?v():v,()=>{}];',
  'react/jsx-runtime': 'export const Fragment=Symbol.for("fragment"); export const jsx=(type,props,key)=>({type,props:props??{},key}); export const jsxs=jsx;',
  './files': 'export const hrefFor=p=>"#/"+p; export const courseOf=p=>/^courses\\/([^/]+)/.exec(p)?.[1]??null;',
  './Md': 'export function Md(props){return {type:"markdown",props}}',
  './CoursePage': 'export const VERIFY=/^(to verify|ask\\b|check\\b|do this week|open questions|to do)/i;',
  './SectionRail': 'export const SectionRail=()=>null;',
  './Logo': 'export const Logo=()=>null;',
  './ThemeToggle': 'export const ThemeToggle=()=>null;',
  './update': 'export const buildLabel=()=>"test";',
  './ui': 'export const GradeChip=()=>null;',
}
const built = await bundle({
  stdin: { contents: "export { Viewer } from './Viewer'; export { Sidebar } from './Sidebar'; export { QuestionBank } from './QuestionBank'; export { parseBankView, parseHash, hrefCourse } from './routes';", resolveDir: join(app, 'src'), loader: 'ts' },
  bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'error',
  plugins: [{ name: 'component-adapters', setup(api) {
    api.onResolve({ filter: /^(react(?:\/jsx-runtime)?|\.\/(?:files|Md|CoursePage|SectionRail|Logo|ThemeToggle|update|ui))$/ }, ({ path }) =>
      Object.hasOwn(adapters, path) ? { path, namespace: 'adapter' } : undefined)
    api.onLoad({ filter: /.*/, namespace: 'adapter' }, ({ path }) => ({ contents: adapters[path], loader: 'js' }))
  } }],
})
const { Viewer, Sidebar, QuestionBank, parseBankView, parseHash, hrefCourse } = await import('data:text/javascript;base64,' + Buffer.from(built.outputFiles[0].text).toString('base64'))

// Walk the rendered component tree while remembering whether content is inside a collapsed details.
function walk(tree, folded = false) {
  if (tree == null || typeof tree === 'boolean') return []
  if (Array.isArray(tree)) return tree.flatMap((node) => walk(node, folded))
  if (typeof tree !== 'object') return []
  if (typeof tree.type === 'function') return walk(tree.type(tree.props), folded)
  const inside = folded || (tree.type === 'details' && !tree.props.open)
  return [{ ...tree, folded: inside }, ...walk(tree.props.children, inside)]
}
const markdown = (tree) => walk(tree).filter((node) => node.type === 'markdown')

test('cheat-sheet routers and exam habits remain visible', () => {
  // Fixture text, not the live sheets, so rewording study content can never block a deploy.
  for (const [path, phrase] of [
    ['courses/CPSC310/06-cheat-sheet.md', '| If the question says | Reach for |'],
    ['courses/STAT251/06-cheat-sheet.md', 'The two habits: name the distribution, then write the setup.'],
  ]) {
    const text = `# Cheat sheet\n\n${phrase}\n\n## Recipe 1\nStudy this.\n\n## Recipe 2\nAnd this.`
    const nodes = markdown(Viewer({ path, text }))
    assert(nodes.some((n) => !n.folded && n.props.text.includes(phrase)), path + ' hides study content')
  }
})

test('a lecture or reading page folds its opening note; other pages keep theirs', () => {
  const text = '# Lecture\n\nYou sent no page for this lecture, so this file is the deck.\n\nDeck: [Source](source.pdf).\n\n## About this page\nExplicit provenance.\n\n## Learning goals\nStudy this.'
  for (const path of ['courses/STAT251/lectures/16-test.md', 'courses/PHIL385/readings/test.md']) {
    const nodes = markdown(Viewer({ path, text }))
    assert(nodes.some((n) => n.folded && n.props.text.includes('You sent no page') && n.props.text.includes('Deck:')), path)
    assert(nodes.some((n) => n.folded && n.props.text.includes('Explicit provenance.')), path)
    assert(nodes.some((n) => !n.folded && n.props.text.includes('Study this.')), path)
  }
  const exam = markdown(Viewer({ path: 'courses/CPSC310/06-cheat-sheet.md', text }))
  assert(exam.some((n) => !n.folded && n.props.text.includes('You sent no page')))
  const only = markdown(Viewer({ path: 'courses/STAT251/lectures/17-test.md', text: '# Lecture\n\nAll preamble.' }))
  assert(only.some((n) => !n.folded && n.props.text.includes('All preamble.')))
})

test('invalid saved navigation cannot crash or supply non-boolean expansion values', () => {
  const tree = { courses: [{ code: 'STAT251', main: [], lectures: [], readings: [], prepared: [] }], runs: [] }
  for (const raw of ['null', '[]', '"text"', '42', 'true', '{', '{"STAT251":"false","briefs":1}', '{"STAT251":true,"briefs":false}']) {
    globalThis.localStorage = { getItem: () => raw }
    const nodes = walk(Sidebar({ tree, current: '', pinned: false, tallies: {} }))
    const toggles = nodes.filter((n) => n.type === 'button' && n.props['aria-expanded'] !== undefined)
    assert(toggles.length > 0)
    assert(toggles.every((n) => typeof n.props['aria-expanded'] === 'boolean'), raw)
    if (raw === '{"STAT251":true,"briefs":false}') assert.equal(toggles[0].props['aria-expanded'], true)
  }
  globalThis.localStorage = { getItem: () => { throw new Error('storage blocked') } }
  assert.doesNotThrow(() => walk(Sidebar({ tree, current: '', pinned: false, tallies: {} })))
})

function browser() {
  let location = new URL('https://example.test/#/courses/STAT251/02-questions.md')
  globalThis.window = { get location() { return location }, scrollY: 0, dispatchEvent: () => {} }
  const update = (_, __, href) => { if (href) location = new URL(href, location) }
  globalThis.history = { state: null, replaceState: update, pushState: update }
}
const bank = '# Bank\n\n## Lec 1\n\n### Q: First?\n**Topic:** First **Lec:** 1 **Type:** recall **Id:** 11111111\n**A:** First answer.\n\n## Lec 2\n\n### Q: Second?\n**Topic:** Second **Lec:** 2 **Type:** recall **Id:** 22222222\n**A:** Second answer.\n\n### Q: Third?\n**Topic:** Third **Lec:** 2 **Type:** recall **Id:** 33333333\n**A:** Third answer.'
function bankNodes(query) {
  return walk(QuestionBank({ path: 'courses/STAT251/02-questions.md', text: bank, all: {}, topics: [], historyOf: () => undefined, view: parseBankView(query) }))
}
test('Courses and each course tab have their own address, and a course file stays a file', () => {
  assert.deepEqual(parseHash('#/'), { kind: 'home' })
  assert.deepEqual(parseHash('#/courses'), { kind: 'courses' })
  assert.deepEqual(parseHash('#/course/STAT251'), { kind: 'course', code: 'STAT251', tab: 'study' })
  for (const tab of ['study', 'materials', 'progress']) {
    assert.deepEqual(parseHash(hrefCourse('PHIL385', tab)), { kind: 'course', code: 'PHIL385', tab })
  }
  assert.equal(hrefCourse('PHIL385'), '#/course/PHIL385')
  assert.equal(parseHash('#/course/STAT251/bogus').kind, 'file')
  assert.deepEqual(parseHash('#/courses/STAT251/00-syllabus.md'), { kind: 'file', path: 'courses/STAT251/00-syllabus.md', query: '', anchor: undefined })
})

test('bulk reveal changes only visible answers and preserves hidden answer state', () => {
  browser()
  const show = bankNodes('section=lec-1&open=3').find((n) => n.type === 'button' && n.props.children === 'Show answers')
  show.props.onClick()
  assert.deepEqual(parseBankView(parseHash(window.location.hash).query).open, [[1, 1], [3, 3]])
  const hide = bankNodes('section=lec-1&open=1,3').find((n) => n.type === 'button' && n.props.children === 'Hide answers')
  hide.props.onClick()
  assert.deepEqual(parseBankView(parseHash(window.location.hash).query).open, [[3, 3]])
  const empty = bankNodes('section=missing').find((n) => n.type === 'button' && n.props.children === 'Show answers')
  assert.equal(empty.props.disabled, true)
})

test('production output excludes private briefs even when they exist in the build workspace', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'school-site-privacy-'))
  try {
    const fixtureApp = join(fixture, 'notes-app')
    const src = join(fixtureApp, 'src')
    await Promise.all([
      mkdir(src, { recursive: true }),
      mkdir(join(fixture, 'courses', 'STAT251'), { recursive: true }),
      mkdir(join(fixture, 'routines', 'runs'), { recursive: true }),
    ])
    await Promise.all(['files.ts', 'stats.ts', 'markdown.ts', 'dates.ts'].map((name) => copyFile(join(app, 'src', name), join(src, name))))
    await Promise.all([
      writeFile(join(fixture, 'courses', 'STAT251', '02-questions.md'), bank + '\nPUBLIC_BANK_FIXTURE'),
      writeFile(join(fixture, 'routines', 'runs', '2026-11-06-morning.md'), 'PRIVATE_BRIEF_FIXTURE_DO_NOT_PUBLISH'),
      writeFile(join(fixture, 'ledger.md'), '# Ledger'),
      writeFile(join(fixtureApp, 'package.json'), '{"type":"module"}'),
    ])
    const result = await viteBuild({
      root: fixtureApp, configFile: false, publicDir: false, logLevel: 'silent',
      build: { write: false, emptyOutDir: false, minify: false,
        lib: { entry: join(src, 'files.ts'), formats: ['es'], fileName: 'catalog' },
        rollupOptions: { output: { inlineDynamicImports: true } } },
    })
    const outputs = (Array.isArray(result) ? result : [result]).flatMap((r) => r.output)
    const code = outputs.map((o) => o.type === 'chunk' ? o.code : String(o.source)).join('\n')
    assert(code.includes('PUBLIC_BANK_FIXTURE'), 'fixture did not bundle public course files')
    assert(!code.includes('PRIVATE_BRIEF_FIXTURE_DO_NOT_PUBLISH'))
    assert(!code.includes('2026-11-06-morning.md'))
    for (const chunk of outputs.filter((o) => o.type === 'chunk')) {
      assert(Object.keys(chunk.modules).every((id) => !id.includes('/routines/runs/')))
    }
  } finally {
    await rm(fixture, { recursive: true, force: true })
  }
})
