import { useEffect, useState } from 'react'
import { splitSections, type Section } from './markdown'
import { hrefAnchor, scrollIfSame } from './routes'
import { Md } from './Md'
import { VERIFY } from './CoursePage'
import { SectionRail } from './SectionRail'

/** Sections folded by default: his pasted pages and raw dumps (he has them on paper), and reference kept for Claude. */
const FOLDED = /^(your notes|raw|reference|for claude|about this page|provenance)\b/i

/** Lecture and reading pages, where each `## ` section can be folded away to skim the page as an outline. */
const FOLDABLE = /\/(lectures|readings)\/[^/]+\.md$/

/**
 * Each `## ` section under its heading. FOLDED sections (pasted notes, provenance) start collapsed. On a lecture page,
 * `foldable` makes every other section collapsible too, open by default, so the whole page can be skimmed as a list of
 * headings and opened one at a time. `open`/`onToggle` control the foldable sections so "Collapse all" holds across
 * re-renders (a native toggle alone would be reset when React re-applies the `open` prop).
 */
export function Sections({ sections, path, foldable = false, open, onToggle }: {
  sections: Section[]; path: string; foldable?: boolean
  open?: (id: string) => boolean; onToggle?: (id: string, open: boolean) => void
}) {
  return (
    <>
      {sections.map((s) =>
        s.heading && FOLDED.test(s.heading) ? (
          <details key={s.id} id={'sec-' + s.id}>
            <summary>{s.heading}</summary>
            <Md text={s.body} path={path} />
          </details>
        ) : s.heading && foldable ? (
          <details key={s.id} className="sec-fold" id={'sec-' + s.id} open={open ? open(s.id) : true}
            onToggle={(e) => onToggle?.(s.id, e.currentTarget.open)}>
            <summary><span className="sec-h">{s.heading}</span></summary>
            <div className="sec-body"><Md text={s.body} path={path} /></div>
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

export function Viewer({ path, text, hideTitle, practiceHref }: { path: string; text: string; hideTitle?: boolean; practiceHref?: string }) {
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
  const isLecture = FOLDABLE.test(path)
  const fold = isLecture && shown.length > 0 && intro.trim() !== ''

  // Foldable sections are controlled by a closed-set: a section is open unless its id is in `closed`. "Full notes"
  // empties it, "Outline" fills it, and a native click on one heading adds or removes just that id. A long lecture
  // opens as an outline — every section collapsed but the first — so it does not start as a wall of text. The FOLDED
  // sections (Your notes, provenance) are their own always-start-closed <details>, so they are not counted here.
  const foldable = named.filter((s) => s.heading && !FOLDED.test(s.heading))
  const longPage = isLecture && foldable.length >= 5
  const defaultClosed = () => (longPage ? new Set(foldable.slice(1).map((s) => s.id)) : new Set<string>())
  const [closed, setClosed] = useState<ReadonlySet<string>>(defaultClosed)
  const allOpen = closed.size === 0
  const setAll = (open: boolean) =>
    setClosed(open ? new Set() : new Set(foldable.map((s) => s.id)))
  const toggle = (id: string, isOpen: boolean) => setClosed((c) => {
    const next = new Set(c)
    if (isOpen) next.delete(id); else next.add(id)
    return next
  })

  // The fold state is per file (so collapsing a section on one lecture never carries to a same-named section on the
  // next), and a link to a section — from the contents row, the rail, or a search hit — opens it before scrolling.
  useEffect(() => {
    setClosed(defaultClosed())
    const anchorId = () => { const h = window.location.hash; const i = h.lastIndexOf('#'); return i > 0 ? h.slice(i + 1) : '' }
    const reveal = (id: string) => {
      if (!id) return
      setClosed((c) => { if (!c.has(id)) return c; const n = new Set(c); n.delete(id); return n })
      requestAnimationFrame(() => document.getElementById('sec-' + id)?.scrollIntoView({ block: 'start' }))
    }
    const onHash = () => reveal(anchorId())
    const onReveal = (e: Event) => reveal((e as CustomEvent<string>).detail)
    onHash()
    window.addEventListener('hashchange', onHash)
    window.addEventListener('reveal-section', onReveal as EventListener)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('reveal-section', onReveal as EventListener)
    }
  }, [path])
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
      {isLecture && (practiceHref || named.length >= 2) && (
        <div className="lec-tools">
          {practiceHref && <a className="btn practice" href={practiceHref}>Practice this lecture →</a>}
          {named.length >= 2 && (
            <button type="button" className="fold-all" onClick={() => setAll(!allOpen)}>{allOpen ? 'Outline' : 'Full notes'}</button>
          )}
        </div>
      )}
      <Sections sections={shown} path={path} foldable={isLecture}
        open={(id) => !closed.has(id)} onToggle={toggle} />
    </article>
  )
}
