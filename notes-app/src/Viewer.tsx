import { splitSections, type Section } from './markdown'
import { hrefAnchor, scrollIfSame } from './routes'
import { Md } from './Md'
import { VERIFY } from './CoursePage'
import { SectionRail } from './SectionRail'

/** Sections folded by default: his pasted pages and raw dumps (he has them on paper), and reference kept for Claude. */
const FOLDED = /^(your notes|raw|reference|for claude|about this page|provenance)\b/i

/** Each `## ` section under its heading, or folded into a <details> when FOLDED names it. */
export function Sections({ sections, path }: { sections: Section[]; path: string }) {
  return (
    <>
      {sections.map((s) =>
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
    </>
  )
}

export function Viewer({ path, text, hideTitle }: { path: string; text: string; hideTitle?: boolean }) {
  const sections = splitSections(text)
  const [pre, ...rest] = sections
  const preBody = hideTitle ? pre.body.replace(/^\s*#\s[^\n]*\n?/, '') : pre.body
  // Checklists ("To verify", "Ask in week 1") show on the course's Materials tab instead.
  const shown = /\/00-syllabus\.md$/.test(path) ? rest.filter((s) => !(s.heading && VERIFY.test(s.heading))) : rest
  const named = shown.filter((s) => s.heading)

  // On a lecture or reading page, the text between the title and the first `## ` section says how the page was built
  // (the deck, the recording, whether he sent a page), so it folds into "About this page" when sections follow (Matt,
  // 2026-11-06: hide the descriptions meant for Claude). Every other page keeps its opening visible: cheat-sheet routers,
  // exam instructions and introductions are study content. Provenance there goes under `## About this page`.
  const h1 = /^\s*#\s[^\n]*\n?/.exec(preBody)?.[0] ?? ''
  const intro = preBody.slice(h1.length)
  const fold = /\/(lectures|readings)\/[^/]+\.md$/.test(path) && shown.length > 0 && intro.trim() !== ''
  return (
    <article>
      {h1.trim() && <Md text={h1} path={path} />}
      {fold
        ? <details className="about"><summary>About this page</summary><Md text={intro} path={path} /></details>
        : intro.trim() && <Md text={intro} path={path} />}
      {named.length >= 3 && (
        <div className="contents">
          {named.map((s) => <a key={s.id} className="chip" href={hrefAnchor(path, s.id)} onClick={scrollIfSame}>{s.heading}</a>)}
        </div>
      )}
      {named.length >= 3 && <SectionRail sections={named.map((s) => ({ id: s.id, label: s.heading ?? '' }))} path={path} />}
      <Sections sections={shown} path={path} />
    </article>
  )
}
