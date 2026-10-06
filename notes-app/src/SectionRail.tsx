// Notion-style table of contents: a thin rail of bars at the right edge that lights up on hover and jumps to sections.
// Rendered into <body> through a portal so it sits outside <main> and the sidebar. That matters: the "blobs" secret
// visual puts a filter on <main>, which would turn <main> into the containing block of a fixed-position child.
// When the margin beside the article is wide enough, the section names show at rest too, faint; see measureRoom.
import { useLayoutEffect, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { hrefAnchor, scrollIfSame } from './routes'

interface RailSection { id: string; label: string }

/** Headings at or above this line (just under the 48px top bar) count as passed. */
const TOP_LINE = 80

/** How far the bars' right end sits in from the viewport edge: the rail's right: 14px plus its 12px right padding (rail.css). */
const BAR_INSET = 26
/** The widest bar (the active one), then the gap between a bar and its label. */
const BAR = 24
const GAP = 8
/** Free space kept between the end of the article's text and the start of a label. */
const BREATHE = 20
/** Below this many pixels of room, only the bars show at rest. */
const MIN_ROOM = 110
/** Labels never get wider than this, at rest or open. Keep in step with the 220px in rail.css. */
const MAX_LABEL = 220

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

/** Pixels free for a label between the article's text (the right edge of main's content box) and the bars, after the breathing space. */
function measureRoom(): number | undefined {
  const main = document.querySelector('main')
  if (!main) return undefined
  const textRight = main.getBoundingClientRect().right - (parseFloat(getComputedStyle(main).paddingRight) || 0)
  // clientWidth rather than innerWidth: a fixed element's right offset is measured from inside a classic scrollbar.
  return Math.floor(document.documentElement.clientWidth - textRight - BAR_INSET - BAR - GAP - BREATHE)
}

export function SectionRail({ sections, path }: { sections: RailSection[]; path: string }) {
  const [active, setActive] = useState<string | undefined>()
  const [room, setRoom] = useState<number | undefined>()
  // The parent builds a fresh array every render; the joined ids change only when the sections do (slugs never contain spaces).
  const key = sections.map((s) => s.id).join(' ')

  // A layout effect, so the first paint already has the right active row and the right label width.
  useLayoutEffect(() => {
    const ids = key ? key.split(' ') : []
    const wrap = document.querySelector<HTMLElement>('.wrap')
    let frame = 0
    let timer = 0
    let followUntil = 0
    const update = () => {
      frame = 0
      setActive(activeId(ids))
      setRoom(measureRoom())
      // While a sidebar pin slides the article sideways, measure every frame so the labels keep clear of it.
      if (performance.now() < followUntil) frame = requestAnimationFrame(update)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    // Pinning toggles .wrap.pinned, which animates its padding-left over .22s and moves <main> with it.
    const follow = () => {
      followUntil = performance.now() + 260
      schedule()
      window.clearTimeout(timer)
      timer = window.setTimeout(schedule, 260) // in case no transitionend arrives (reduced motion, an interrupted slide)
    }
    const onSlideEnd = (e: TransitionEvent) => { if (e.target === wrap) schedule() }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Content that grows or shrinks without a scroll (a pager, a filter, a folded section) moves the headings too.
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)
    const mo = new MutationObserver(follow)
    if (wrap) {
      mo.observe(wrap, { attributes: true, attributeFilter: ['class'] })
      wrap.addEventListener('transitionend', onSlideEnd)
    }
    return () => {
      ro.disconnect()
      mo.disconnect()
      wrap?.removeEventListener('transitionend', onSlideEnd)
      window.clearTimeout(timer)
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [key])

  if (sections.length < 3) return null
  const roomy = room !== undefined && room >= MIN_ROOM
  const style = roomy ? ({ '--rail-label': Math.min(room, MAX_LABEL) + 'px' } as CSSProperties) : undefined
  return createPortal(
    <div className={roomy ? 'rail roomy' : 'rail'} style={style} role="navigation" aria-label="On this page">
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
