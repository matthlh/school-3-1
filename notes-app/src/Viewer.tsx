import { splitSections } from './markdown'
import { Md } from './Md'

/** Sections that stay folded by default — raw dumps he already has on paper. */
const FOLDED = /^(your notes|raw|raw notes)\b/i

export function Viewer({ path, text }: { path: string; text: string }) {
  const sections = splitSections(text)
  const [pre, ...rest] = sections
  const named = rest.filter((s) => s.heading)
  const jump = (id: string) => document.getElementById('sec-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <article>
      {pre.body.trim() && <Md text={pre.body} path={path} />}
      {named.length >= 4 && (
        <div className="contents">
          {named.map((s) => <button key={s.id} className="chip" onClick={() => jump(s.id)}>{s.heading}</button>)}
        </div>
      )}
      {rest.map((s) =>
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
