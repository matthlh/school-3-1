// Notion-style table of contents: a thin rail of bars at the right edge that lights up on hover and jumps to sections.
// Rendered into <body> through a portal so it sits outside <main> and the sidebar. That matters: the "blobs" secret
// visual puts a filter on <main>, which would turn <main> into the containing block of a fixed-position child.
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { hrefAnchor, scrollIfSame } from './routes'

export interface RailSection { id: string; label: string }

/** Headings at or above this line (just under the 48px top bar) count as passed. */
const TOP_LINE = 80

/** The last section whose heading has scrolled past the top line; the first when none has; the last at the bottom of a scrollable page. */
function activeId(ids: string[]): string | undefined {
  if (!ids.length) return undefined
  const doc = document.documentElement
  const scrollable = doc.scrollHeight > window.innerHeight + 1
  if (scrollable && Math.ceil(window.innerHeight + window.scrollY) >= doc.scrollHeight - 1) {
    // At the bottom, a short section he just jumped to may never reach the top line; prefer it if it is on screen.
    const h = window.location.hash
    const want = h.slice(h.lastIndexOf('#') + 1)
    const el = ids.includes(want) ? document.getElementById('sec-' + want) : null
    const top = el?.getBoundingClientRect().top
    return top !== undefined && top >= 0 && top < window.innerHeight ? want : ids[ids.length - 1]
  }
  let cur = ids[0]
  for (const id of ids) {
    const el = document.getElementById('sec-' + id)
    if (el && el.getBoundingClientRect().top <= TOP_LINE) cur = id
  }
  return cur
}

export function SectionRail({ sections, path }: { sections: RailSection[]; path: string }) {
  const [active, setActive] = useState<string | undefined>()
  // The parent builds a fresh array every render; the joined ids change only when the sections do (slugs never contain spaces).
  const key = sections.map((s) => s.id).join(' ')

  useEffect(() => {
    const ids = key ? key.split(' ') : []
    let frame = 0
    const update = () => { frame = 0; setActive(activeId(ids)) }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Content that grows or shrinks without a scroll (a pager, a filter, a folded section) moves the headings too.
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [key])

  if (sections.length < 3) return null
  return createPortal(
    <div className="rail" role="navigation" aria-label="On this page">
      {sections.map((s) => {
        const on = s.id === active
        return (
          <a key={s.id} href={hrefAnchor(path, s.id)} onClick={scrollIfSame} className={on ? 'on' : undefined} aria-current={on ? 'true' : undefined} title={s.label}>
            <span className="bar" aria-hidden="true" />
            <span className="lbl">{s.label}</span>
          </a>
        )
      })}
    </div>,
    document.body,
  )
}
