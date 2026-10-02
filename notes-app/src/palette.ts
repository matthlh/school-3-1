// Colour palettes for the whole site, picked in Settings. Mist is the stylesheet's base tokens; every other
// palette is a block keyed on <html data-palette> in styles.css that overrides the page, surface, border and
// accent tokens only. Light and dark come from the theme as before, so each palette has both.

export type Palette = 'mist' | 'sage' | 'lavender' | 'sand' | 'slate'

interface Swatch { page: string; accent: string }
export interface PaletteInfo { id: Palette; label: string; light: Swatch; dark: Swatch }

/** Picker order. page and accent copy each palette's --bg and --link from styles.css, so keep the two in step. */
export const PALETTES: PaletteInfo[] = [
  { id: 'mist', label: 'Mist', light: { page: '#f6f8fd', accent: '#0a58ca' }, dark: { page: '#15171d', accent: '#7fb0ff' } },
  { id: 'sage', label: 'Sage', light: { page: '#f5f9f6', accent: '#22714b' }, dark: { page: '#131914', accent: '#8dbda0' } },
  { id: 'lavender', label: 'Lavender', light: { page: '#f8f7fc', accent: '#6a47b1' }, dark: { page: '#17161c', accent: '#b4a2ec' } },
  { id: 'sand', label: 'Sand', light: { page: '#fbf8f2', accent: '#9a431e' }, dark: { page: '#1a1711', accent: '#dd9e86' } },
  { id: 'slate', label: 'Slate', light: { page: '#f6f8f9', accent: '#086e77' }, dark: { page: '#151819', accent: '#79bdc4' } },
]

const KEY = 'palette'
const isPalette = (v: unknown): v is Palette => typeof v === 'string' && PALETTES.some((p) => p.id === v)

/** What the page is showing now: the attribute, else Mist. */
export function currentPalette(): Palette {
  const v = typeof document !== 'undefined' ? document.documentElement.dataset.palette : undefined
  return isPalette(v) ? v : 'mist'
}

/** Mist is the base stylesheet, so it removes the attribute rather than setting it. */
function applyTo(p: Palette) {
  if (typeof document === 'undefined') return
  const el = document.documentElement
  if (p === 'mist') delete el.dataset.palette
  else el.dataset.palette = p
}

/** Persist and apply a palette, then tell listeners (theme.ts repaints the browser chrome on 'palettechange'). */
export function setPalette(p: Palette) {
  try {
    if (p === 'mist') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, p)
  } catch { /* storage blocked; the attribute still applies for this page load */ }
  applyTo(p)
  window.dispatchEvent(new Event('palettechange'))
}

/** Apply the stored palette (index.html does this inline before paint too; this keeps the two in step). */
export function applyPalette() {
  try {
    const v = localStorage.getItem(KEY)
    applyTo(isPalette(v) ? v : 'mist')
  } catch { /* storage blocked: keep whatever the page already shows */ }
}

// Runs last, once everything above is defined.
applyPalette()
