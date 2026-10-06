#!/usr/bin/env node
// Offline study pack. Folds every course's review pages, lecture notes (logged and staged), reading
// pages and question bank, plus the ledger's Due now list, into one self-contained HTML file whose
// answers hide under <details> (no JavaScript needed, so it opens from Files on a phone), and a print
// layout with the answers after each group, which --pdf renders through headless Chrome.
// Output lands in routines/offline/ (git-ignored).
//
//   node scripts/offline-pack.mjs          routines/offline/offline-pack-<date>.html and -print.html
//   node scripts/offline-pack.mjs --pdf    also routines/offline/offline-pack-<date>.pdf

import { execFile } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { marked } from 'marked'
import katex from 'katex'
import { importSite } from './import-site.mjs'

const root = decodeURIComponent(new URL('../..', import.meta.url).pathname)
const outDir = join(root, 'routines', 'offline')
// The local day: toISOString() is UTC, which names an evening's pack for tomorrow.
const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const wantPdf = process.argv.includes('--pdf')

// Reading order: the exam review first, then the two other closed-book courses, then the async one.
const COURSES = ['PHIL385', 'CPSC310', 'STAT251', 'ASIA250']

marked.use({ gfm: true })
// Math, same rule as the site: only $$…$$ is math. A $$ line, LaTeX, $$ line is a display equation; $$…$$
// inside a line is inline. KaTeX writes MathML, which phones and headless Chrome draw without extra CSS or fonts.
const tex = (t, displayMode) => katex.renderToString(t, { displayMode, output: 'mathml', throwOnError: false, strict: 'ignore' })
marked.use({ extensions: [
  { name: 'mathBlock', level: 'block',
    start: (src) => { const m = /^\$\$[ \t]*$/m.exec(src); return m ? m.index : undefined },
    tokenizer: (src) => { const m = /^\$\$[ \t]*\n([\s\S]+?)\n\$\$[ \t]*(?:\n|$)/.exec(src); return m ? { type: 'mathBlock', raw: m[0], text: m[1] } : undefined },
    renderer: (t) => tex(t.text, true) },
  { name: 'mathInline', level: 'inline',
    start: (src) => { const i = src.indexOf('$$'); return i < 0 ? undefined : i },
    tokenizer: (src) => { const m = /^\$\$([^\n]+?)\$\$/.exec(src); return m ? { type: 'mathInline', raw: m[0], text: m[1] } : undefined },
    renderer: (t) => tex(t.text, false) },
] })
const md = (s) => marked.parse(s)
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
const read = (p) => readFileSync(p, 'utf8')
const firstHeading = (text) => (/^# (.+)$/m.exec(text) || [])[1]?.trim()

/** Drop the title line and push every other heading down two levels (course = h2, file = h3). */
function demote(text) {
  let fence = false
  return text
    .split('\n')
    .filter((line, i) => !(i === 0 && /^# /.test(line)))
    .map((line) => {
      if (/^```/.test(line)) fence = !fence
      return !fence && /^#{1,4} /.test(line) ? '##' + line : line
    })
    .join('\n')
}

// The banks go through the site's own parser (src/markdown.ts), which `npm run parity` holds line for line to
// quizlib.py. A card shows its `display`, the stem as written.
const { parseQuestions } = await importSite("export { parseQuestions } from './markdown'")

// ---------- gather ----------
function dueNow() {
  const ledger = read(join(root, 'ledger.md'))
  const m = /## Due now\n([\s\S]*?)\n## /.exec(ledger)
  const lines = (m ? m[1] : '').split('\n').filter((l) => l.startsWith('- '))
  const byCourse = new Map()
  for (const l of lines) {
    const [course, ...rest] = l.slice(2).split(' · ')
    if (!byCourse.has(course)) byCourse.set(course, [])
    byCourse.get(course).push(rest.join(' · '))
  }
  return { count: lines.length, byCourse }
}

function course(code) {
  const dir = join(root, 'courses', code)
  const title = firstHeading(read(join(dir, '00-syllabus.md'))) || code
  const pages = [] // { kind, title, body(markdown), staged }
  const review = join(dir, '05-exam-review.md')
  if (existsSync(review)) pages.push({ kind: 'Review', title: firstHeading(read(review)) || 'Exam review', body: demote(read(review)) })
  for (const sub of ['lectures', 'readings']) {
    const d = join(dir, sub)
    if (!existsSync(d)) continue
    for (const f of readdirSync(d).filter((f) => f.endsWith('.md')).sort()) {
      const text = read(join(d, f))
      pages.push({
        kind: sub === 'lectures' ? 'Lecture' : 'Reading',
        title: firstHeading(text) || f,
        body: demote(text),
        staged: f.startsWith('_'),
      })
    }
  }
  const bank = parseQuestions(read(join(dir, '02-questions.md')))
  return { code, title, pages, bank, questionCount: bank.reduce((n, g) => n + g.questions.length, 0) }
}

// ---------- render ----------
const chips = (q) =>
  [q.topic, q.lec && 'lec ' + q.lec, q.type].filter(Boolean).map((c) => `<span class="chip">${esc(c)}</span>`).join(' ')

function renderBank(c, print) {
  const out = []
  for (const g of c.bank) {
    if (g.title) out.push(`<h4>${esc(g.title)}</h4>`)
    if (print) {
      out.push('<ol class="qs">' + g.questions.map((q) => `<li>${md(q.display)}<div class="meta">${chips(q)}</div></li>`).join('') + '</ol>')
      out.push('<p class="anshead">Answers</p>')
      out.push('<ol class="as">' + g.questions.map((q) => `<li>${md(q.answer)}</li>`).join('') + '</ol>')
    } else {
      out.push(
        g.questions
          .map(
            (q, i) =>
              `<details class="q"><summary><span class="n">${i + 1}.</span><div class="qt">${md(q.display)}</div><div class="meta">${chips(q)}</div></summary><div class="ans">${md(q.answer)}</div></details>`,
          )
          .join(''),
      )
    }
  }
  return out.join('\n')
}

function renderCourse(c, print) {
  const id = slug(c.code)
  const out = [`<section class="course" id="${id}"><h2>${esc(c.title)}</h2>`]
  for (const p of c.pages) {
    const pid = id + '-' + slug(p.title)
    out.push(`<section id="${pid}" class="${p.staged ? 'staged' : ''}"><h3><span class="kind">${p.kind}</span> ${esc(p.title)}</h3>`)
    if (p.staged) out.push('<p class="note">Pre-lecture outline written from the posted deck. Not yet watched or logged.</p>')
    out.push(md(p.body), '</section>')
  }
  out.push(`<section id="${id}-questions"><h3><span class="kind">Question bank</span> ${c.questionCount} questions</h3>`, renderBank(c, print), '</section></section>')
  return out.join('\n')
}

function toc(courses) {
  return (
    '<nav class="toc"><ul>' +
    courses
      .map((c) => {
        const id = slug(c.code)
        const items = c.pages.map((p) => `<li><a href="#${id}-${slug(p.title)}">${esc(p.title)}</a>${p.staged ? ' <span class="chip">staged</span>' : ''}</li>`)
        items.push(`<li><a href="#${id}-questions">Question bank, ${c.questionCount} questions</a></li>`)
        return `<li><a href="#${id}">${esc(c.title)}</a><ul>${items.join('')}</ul></li>`
      })
      .join('') +
    '</ul></nav>'
  )
}

function renderDue(due) {
  const out = [`<section id="due"><h2>Start here: ${due.count} topics due for revision</h2>`]
  out.push('<p class="note">From the ledger, longest overdue first. Each line is a topic, how long it has been due, and the last grade.</p>')
  for (const [course, items] of due.byCourse) {
    out.push(`<h3>${esc(course)}</h3><ul>` + items.map((t) => `<li>${esc(t)}</li>`).join('') + '</ul>')
  }
  out.push('</section>')
  return out.join('\n')
}

const CSS = `
math[display="block"] { display: block; margin: .6em 0; overflow-x: auto; max-width: 100%; }
mtable[columnalign^="right left"] > mtr > mtd:nth-child(odd) { text-align: right; padding-right: 0; }
mtable[columnalign^="right left"] > mtr > mtd:nth-child(even) { text-align: left; padding-left: 0; }
mtable[columnalign^="left"] > mtr > mtd { text-align: left; }
:root{--bg:#fff;--fg:#1a1a1a;--mut:#6a6a6a;--line:#dcdcdc;--chip:#eef1f7;--acc:#2a5db0}
@media(prefers-color-scheme:dark){:root{--bg:#141414;--fg:#e8e8e8;--mut:#9c9c9c;--line:#363636;--chip:#26303f;--acc:#8ab4f8}}
html{-webkit-text-size-adjust:100%}
body{margin:0 auto;max-width:720px;padding:16px;font:17px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--fg)}
a{color:var(--acc)}
h1{font-size:1.6em;line-height:1.2}
h2{font-size:1.35em;margin-top:2.2em;padding-bottom:.2em;border-bottom:2px solid var(--line)}
h3{font-size:1.15em;margin-top:1.8em}
h4{font-size:1em;margin-top:1.6em}
h5,h6{font-size:.95em}
.kind{font-size:.7em;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--mut);margin-right:.4em}
table{border-collapse:collapse;font-size:.9em;display:block;overflow-x:auto;max-width:100%}
td,th{border:1px solid var(--line);padding:4px 8px;vertical-align:top;text-align:left}
code{font-size:.9em;background:var(--chip);padding:0 3px;border-radius:3px}
pre{overflow-x:auto;padding:8px 10px;border:1px solid var(--line);border-radius:6px;font-size:.82em;line-height:1.4}
pre code{background:none;padding:0}
blockquote{margin:0;padding-left:12px;border-left:3px solid var(--line);color:var(--mut)}
.chip{display:inline-block;font-size:.74em;padding:0 7px;border-radius:999px;background:var(--chip);color:var(--mut);margin-right:4px;white-space:nowrap}
.note{color:var(--mut);font-size:.92em}
.staged{border-left:3px solid var(--acc);padding-left:12px}
.toc ul{padding-left:1.1em;margin:.2em 0}
.toc>ul>li{margin-bottom:.6em}
.toc li{font-size:.95em}
details.q{border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin:10px 0}
details.q summary{cursor:pointer;list-style:none}
details.q summary::-webkit-details-marker{display:none}
details.q .n{color:var(--mut);float:left;margin-right:6px}
details.q .qt>p:first-child{margin-top:0}
details.q .qt>p:last-child{margin-bottom:0}
details.q .meta{margin-top:4px}
details.q .ans{border-top:1px solid var(--line);margin-top:8px;padding-top:8px}
details.q .ans>p:first-child{margin-top:0}
.tools{position:sticky;top:0;background:var(--bg);padding:8px 0;border-bottom:1px solid var(--line);z-index:1}
.tools button{font:inherit;font-size:.9em;padding:4px 10px;border:1px solid var(--line);border-radius:6px;background:var(--chip);color:var(--fg)}
ol.qs>li,ol.as>li{margin:.5em 0}
ol.qs p,ol.as p{margin:.2em 0}
.anshead{font-weight:600;margin:1.2em 0 .2em;color:var(--mut)}
@page{size:5in 8.5in;margin:.4in}
@media print{
  :root{--bg:#fff;--fg:#000;--mut:#555;--line:#bbb;--chip:#eee;--acc:#000}
  body{font-size:11pt;line-height:1.4;max-width:none;padding:0}
  .tools{display:none}
  .course{break-before:page}
  ol.qs>li,ol.as>li,h3,h4{break-inside:avoid}
  h3,h4{break-after:avoid}
  a{color:inherit;text-decoration:none}
  pre{white-space:pre-wrap;word-break:break-word}
}
`

function page({ print, courses, due }) {
  const title = `Offline study pack, ${today}`
  const howTo = print
    ? '<p class="note">Questions come first in each group and the answers follow the group. Cover the answers, write yours, then compare.</p>'
    : '<p class="note">Tap a question to see its answer. The button opens or hides every answer at once. Nothing here needs a connection.</p><div class="tools"><button onclick="document.querySelectorAll(\'details.q\').forEach(d=>d.open=!window._o);window._o=!window._o">Show / hide all answers</button></div>'
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>${CSS}</style></head>
<body>
<h1>${esc(title)}</h1>
${howTo}
${toc(courses)}
${renderDue(due)}
${courses.map((c) => renderCourse(c, print)).join('\n')}
</body></html>`
}

function toPdf(htmlPath, pdfPath) {
  const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const profile = join(outDir, '.chrome-profile')
  rmSync(pdfPath, { force: true })
  return new Promise((resolve) => {
    let done = false
    const finish = () => { if (!done) { done = true; clearInterval(poll); resolve(existsSync(pdfPath)) } }
    const child = execFile(
      chrome,
      ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`,
        '--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href],
      { timeout: 240000 },
      finish,
    )
    // Chrome has been seen to keep running after the file is written, so stop it ourselves once the PDF is there.
    const poll = setInterval(() => {
      if (existsSync(pdfPath)) setTimeout(() => { child.kill('SIGKILL'); finish() }, 4000)
    }, 1000)
  })
}

// ---------- main ----------
mkdirSync(outDir, { recursive: true })
const courses = COURSES.map(course)
const due = dueNow()
const htmlPath = join(outDir, `offline-pack-${today}.html`)
const printPath = join(outDir, `offline-pack-${today}-print.html`)
writeFileSync(htmlPath, page({ print: false, courses, due }))
writeFileSync(printPath, page({ print: true, courses, due }))
console.log(`wrote ${htmlPath}`)
console.log(`wrote ${printPath}`)
for (const c of courses) console.log(`  ${c.code}: ${c.pages.length} pages, ${c.questionCount} questions`)
if (wantPdf) {
  const pdfPath = join(outDir, `offline-pack-${today}.pdf`)
  const ok = await toPdf(printPath, pdfPath)
  console.log(ok ? `wrote ${pdfPath}` : `PDF failed; open ${printPath} in a browser and print to PDF`)
}
