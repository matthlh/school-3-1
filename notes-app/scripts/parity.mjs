// Parser parity. Every courses/*/02-questions.md is parsed twice: by the quiz scripts (`_parse_bank` in
// .claude/skills/quiz-me/scripts/quizlib.py) and by the site (`parseQuestions` in src/markdown.ts, the id from
// `questionId` in src/stats.ts). Both must find the same questions in the same order, with the same id, question,
// display, answer, topic, lec and type; otherwise the site shows a question differently from how the quiz asks it, files
// its history under another id, or lists it under another topic, lecture or type.
//   npm run parity      (the Pages build runs it before building)
// Exit code 1 on any difference, each one printed from the first place where the two parsers part.
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSite } from './import-site.mjs'

const root = decodeURIComponent(new URL('../..', import.meta.url).pathname)
const FIELDS = ['id', 'question', 'display', 'answer', 'topic', 'lec', 'type']
const banks = readdirSync(join(root, 'courses')).sort()
  .map((code) => `courses/${code}/02-questions.md`)
  .filter((bank) => existsSync(join(root, bank)))

// The site's side: markdown.ts and stats.ts bundled for Node with the esbuild Vite ships.
const { parseQuestions, questionId } = await importSite("export { parseQuestions } from './markdown'\nexport { questionId } from './stats'")

// The quiz scripts' side: `_parse_bank` on each bank, as JSON. -B keeps __pycache__ out of the repo. No cap on the
// output: the default 1 MiB would stop the deploys once the banks grow past it.
const PY = `
import json, sys
sys.path.insert(0, sys.argv[1])
import quizlib
print(json.dumps({bank: [dict(id=q["id"], question=q["q"], display=q["q_display"], answer=q["a"], topic=q["topic"], lec=q["lec"],
                              type=q["type"], line=q["line"])
                         for q in quizlib._parse_bank(f"{sys.argv[2]}/{bank}", bank.split("/")[1])]
                  for bank in sys.argv[3:]}))
`
const py = spawnSync('python3', ['-B', '-c', PY, join(root, '.claude', 'skills', 'quiz-me', 'scripts'), root, ...banks], { encoding: 'utf8', maxBuffer: Infinity })
if (py.status !== 0) {
  console.error(`parity: python3 could not run quizlib._parse_bank\n${py.error?.message ?? py.stderr}`)
  process.exit(1)
}
const scripts = JSON.parse(py.stdout)

/** Where two texts first part (line and column, from 1), and each side from a little before that point, quoted so
 *  that stray whitespace shows. A side that has run out of lines says so. */
function firstDifference(a, b) {
  const la = a.split('\n')
  const lb = b.split('\n')
  let line = 0
  while (line < la.length && la[line] === lb[line]) line++
  let col = 0
  while (col < (la[line] ?? '').length && la[line][col] === lb[line]?.[col]) col++
  const from = Math.max(0, col - 30)
  const show = (s) => s === undefined ? '(no such line)'
    : (from ? '…' : '') + JSON.stringify(s.slice(from, col + 50)) + (s.length > col + 50 ? '…' : '')
  return { where: `line ${line + 1}, column ${col + 1}`, a: show(la[line]), b: show(lb[line]) }
}

let differences = 0
let total = 0
for (const bank of banks) {
  const course = bank.split('/')[1]
  const site = []
  for (const q of parseQuestions(readFileSync(join(root, bank), 'utf8')).flatMap((g) => g.questions)) {
    site.push({ id: await questionId(course, q.question), question: q.question, display: q.display, answer: q.answer, topic: q.topic, lec: q.lec, type: q.type })
  }
  const theirs = scripts[bank]
  total += theirs.length
  const paired = Math.min(site.length, theirs.length)
  let i = 0
  for (; i < paired; i++) {
    const fields = FIELDS.filter((field) => site[i][field] !== theirs[i][field])
    for (const field of fields) {
      const d = firstDifference(theirs[i][field], site[i][field])
      console.log(`${bank}:${theirs[i].line} question ${i + 1}: ${field} differs at ${d.where}`)
      console.log(`  quiz scripts  ${d.a}`)
      console.log(`  site          ${d.b}`)
    }
    differences += fields.length
    // With a question found on one side only, every pair after the first difference is out of step and says nothing new.
    if (fields.length && site.length !== theirs.length) break
  }
  if (site.length !== theirs.length) {
    differences++
    console.log(`${bank}: the quiz scripts find ${theirs.length} questions, the site ${site.length}; ` + (i < paired
      ? `the questions after question ${i + 1} are not compared`
      : `the first one without a partner is ${JSON.stringify((site[i] ?? theirs[i]).question)}`))
  }
}
console.log(differences
  ? `\nparity: ${differences} difference${differences === 1 ? '' : 's'} between quizlib._parse_bank and parseQuestions`
  : `parity: ${total} questions in ${banks.length} banks parse the same in the quiz scripts and on the site`)
process.exit(differences ? 1 : 0)
