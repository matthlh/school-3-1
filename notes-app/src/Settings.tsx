import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { PALETTES, currentPalette, setPalette, type Palette } from './palette'
import { darkQuery, isDark } from './theme'
import { VISUALS, currentVisual, nextVisual, setVisual, type Visual } from './visual'
import { buildLabel } from './update'

/** Gear button in the top bar. The popover holds Appearance, Colours and the Super secret settings button. */
export function Settings() {
  const [open, setOpen] = useState(false)
  const [visual, setV] = useState<Visual>(currentVisual)
  const ref = useRef<HTMLDivElement>(null)
  const gearRef = useRef<HTMLButtonElement>(null)
  const secretRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const sync = () => setV(currentVisual())
    window.addEventListener('visualchange', sync)
    return () => window.removeEventListener('visualchange', sync)
  }, [])

  // Click outside or Escape closes the popover; Escape hands focus back to the gear.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); gearRef.current?.focus() } }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="settings" ref={ref}>
      <button
        ref={gearRef}
        type="button"
        className={'gear' + (open ? ' on' : '')}
        aria-label="Settings"
        title="Settings"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >⚙︎</button>
      {open && (
        <div className="pop" role="dialog" aria-label="Settings">
          <div className="row">
            <span className="lbl">Appearance</span>
            <ThemeToggle />
          </div>
          <div className="row">
            <span className="lbl">Colours</span>
            <PalettePicker />
          </div>
          <div className="row">
            <span className="lbl">Secret visuals</span>
            <button
              ref={secretRef}
              type="button"
              className={'btn secret' + (visual !== 'off' ? ' on' : '')}
              title="Each click moves to the next effect. Links keep working."
              onClick={() => setVisual(nextVisual(visual))}
            >{visual === 'off' ? 'Super secret settings…' : VISUALS[visual].label}</button>
          </div>
          <div className="row">
            <span className="lbl">Version</span>
            <span className="val">built {buildLabel()}</span>
          </div>
          {visual !== 'off' && (
            <p className="hintline">
              {VISUALS[visual].hint} <button type="button" className="link" onClick={() => { setVisual('off'); secretRef.current?.focus() }}>Turn off</button>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/** One round swatch per palette: the page colour and the accent of the theme showing now. A click applies it at once. */
function PalettePicker() {
  const [palette, setP] = useState<Palette>(currentPalette)
  const [dark, setDark] = useState(isDark)

  useEffect(() => {
    const syncPalette = () => setP(currentPalette())
    const syncDark = () => setDark(isDark())
    const q = darkQuery()
    window.addEventListener('palettechange', syncPalette)
    window.addEventListener('themechange', syncDark)
    q?.addEventListener('change', syncDark)
    return () => {
      window.removeEventListener('palettechange', syncPalette)
      window.removeEventListener('themechange', syncDark)
      q?.removeEventListener('change', syncDark)
    }
  }, [])

  return (
    <div className="swatches" role="group" aria-label="Colours">
      {PALETTES.map((p) => {
        const s = dark ? p.dark : p.light
        return (
          <button
            key={p.id}
            type="button"
            className="swatch"
            aria-label={p.label}
            title={p.label}
            aria-pressed={palette === p.id}
            style={{ '--sw-page': s.page, '--sw-accent': s.accent } as CSSProperties}
            onClick={() => setPalette(p.id)}
          />
        )
      })}
    </div>
  )
}
