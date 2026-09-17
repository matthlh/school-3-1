// "Secret visuals": Minecraft's old Super Secret Settings button, for a notes site. Each click moves to the
// next effect. Effects are pure CSS keyed on <html data-visual>, scoped to the content so the settings
// popover stays readable and every link keeps working.

export type Visual = 'off' | 'abstract' | 'blobs' | 'wireframe'
export const ORDER: Visual[] = ['off', 'abstract', 'blobs', 'wireframe']
export const VISUALS: Record<Visual, { label: string; hint: string }> = {
  off: { label: 'Off', hint: '' },
  abstract: { label: 'Abstract', hint: 'Every word is a bar and every card is a shape. Links still work.' },
  blobs: { label: 'Blobs', hint: 'The page through a blur. Links still work.' },
  wireframe: { label: 'Wireframe', hint: 'Outlines only. Links still work.' },
}
const KEY = 'visual'
const isVisual = (v: unknown): v is Visual => typeof v === 'string' && (ORDER as string[]).includes(v)

/** What the page is showing now. */
export function currentVisual(): Visual {
  const v = typeof document !== 'undefined' ? document.documentElement.dataset.visual : undefined
  return isVisual(v) ? v : 'off'
}

export function nextVisual(v: Visual): Visual {
  return ORDER[(ORDER.indexOf(v) + 1) % ORDER.length]
}

/** Persist and apply an effect, then tell listeners. */
export function setVisual(v: Visual) {
  try {
    if (v === 'off') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, v)
  } catch { /* storage blocked; the attribute still applies for this page load */ }
  const el = document.documentElement
  if (v === 'off') delete el.dataset.visual
  else el.dataset.visual = v
  window.dispatchEvent(new Event('visualchange'))
}

/** Apply the stored effect (index.html does this inline before paint too). */
export function applyVisual() {
  if (typeof document === 'undefined') return
  try {
    const v = localStorage.getItem(KEY)
    if (isVisual(v) && v !== 'off') document.documentElement.dataset.visual = v
  } catch { /* storage blocked */ }
}

applyVisual()
