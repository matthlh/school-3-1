import { splitSections } from './markdown'
import { Md } from './Md'
import { VERIFY } from './CoursePage'

/** Sections folded by default: raw dumps he has on paper, and reference detail kept for Claude. */
const FOLDED = /^(your notes|raw|raw notes|reference|for claude|where .* live|sources|study resources|office hours|people|canvas)\b/i

export function Viewer({ path, text, hideTitle }: { path: string; text: string; hideTitle?: boolean }) {
  const sections = splitSections(text)
  const [pre, ...rest] = sections
  const preBody = hideTitle ? pre.body.replace(/^\s*#\s[^\n]*\n?/, '') : pre.body
  // Checklists ("To verify", "Ask in week 1") show on the course overview instead.
  const shown = /\/00-syllabus\.md$/.test(path) ? rest.filter((s) => !(s.heading && VERIFY.test(s.heading))) : rest
  const named = shown.filter((s) => s.heading)
  const jump = (id: string) => document.getElementById('sec-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <article>
      {preBody.trim() && <Md text={preBody} path={path} />}
      {named.length >= 4 && (
        <div className="contents">
          {named.map((s) => <button key={s.id} className="chip" onClick={() => jump(s.id)}>{s.heading}</button>)}
        </div>
      )}
      {shown.map((s) =>
        s.heading && FOLDED.test(s.heading) ? (
          <details key={s.id} id={'sec-' + s.id}>
            <summary>{s.heading}</summary>
            <Md text={s.body} path={path} />
          </details>
        ) : (
          <section key={s.id} id={'sec-' + s.id}>
            {s.heading && <h2>{s.heading}</h2>}
            <Md text={s.body} path={path} />
          </section>
        ),
      )}
    </article>
  )
}
