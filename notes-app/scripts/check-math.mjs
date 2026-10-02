// Check the LaTeX in course markdown before publishing.
//   node notes-app/scripts/check-math.mjs courses/STAT251/02-questions.md courses/STAT251/lectures/*.md
// 1. Every $$…$$ (inline) and $$ / … / $$ (display) block must parse in KaTeX, and % inside math must be \%.
// 2. Unicode math left outside $$ is listed for review. His verbatim "## Your notes" sections are skipped.
// Exit code 1 if any formula fails to parse.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const katex = require('katex')
const LEFTOVER = /[²³⁴⁵⁶⁷⁸⁹⁰¹ⁿ₀₁₂₃₄₅₆₇₈₉ᵢₖₙ∪∩≤≥√Σ∑∫σμλ̄ᶜ×≈∞θπ∅⊂⊆∈−]/g
let bad = 0, total = 0, leftovers = 0
for (const file of process.argv.slice(2)) {
  const lines = readFileSync(file, 'utf8').split('\n')
  let fence = false, inDisp = false, disp = [], dispStart = 0, verbatim = false
  lines.forEach((line, i) => {
    const n = i + 1
    if (/^## /.test(line)) verbatim = /^## (Your notes|Raw)/.test(line)
    if (verbatim) return
    if (/^```/.test(line)) { fence = !fence; return }
    if (fence) return
    if (inDisp) {
      if (line.trim() === '$$') {
        inDisp = false; total++
        if (disp.some(l => /(^|[^\\])%/.test(l))) { bad++; console.log(`${file}:${dispStart} UNESCAPED % in display`) }
        try { katex.renderToString(disp.join('\n'), { displayMode: true, throwOnError: true, strict: 'ignore' }) }
        catch (e) { bad++; console.log(`${file}:${dispStart} DISPLAY ${e.message.split('\n')[0]}`) }
      } else disp.push(line)
      return
    }
    if (line.trim() === '$$') { inDisp = true; disp = []; dispStart = n; return }
    let rest = line
    const parts = line.split('$$')
    if (parts.length % 2 === 0) { bad++; console.log(`${file}:${n} UNPAIRED $$`) }
    for (let k = 1; k < parts.length; k += 2) {
      total++
      if (/(^|[^\\])%/.test(parts[k])) { bad++; console.log(`${file}:${n} UNESCAPED % :: ${parts[k].slice(0, 60)}`) }
      try { katex.renderToString(parts[k], { displayMode: false, throwOnError: true, strict: 'ignore' }) }
      catch (e) { bad++; console.log(`${file}:${n} INLINE ${e.message.split('\n')[0]} :: ${parts[k].slice(0, 60)}`) }
    }
    const outside = parts.filter((_, k) => k % 2 === 0).join(' ')
      .replace(/`[^`]*`/g, '')                      // code spans
      .replace(/\*\*Topic:\*\*.*$/, '')             // ledger labels stay Unicode on purpose
    const m = outside.match(LEFTOVER)
    if (m) { leftovers += m.length; console.log(`${file}:${n} LEFTOVER ${[...new Set(m)].join('')} :: ${outside.trim().slice(0, 90)}`) }
  })
  if (inDisp) { bad++; console.log(`${file}:${dispStart} UNCLOSED DISPLAY`) }
}
console.log(`\n${total} math segments, ${bad} problems, ${leftovers} leftover unicode chars`)
process.exit(bad ? 1 : 0)
