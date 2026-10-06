import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { PALETTES, VISUALS, nextVisual, palette, usePref, visual } from './prefs'
import { buildLabel } from './update'

/** Gear button in the top bar. The popover holds Appearance, Colours and the Super secret settings button. */
export function Settings() {
  const [open, setOpen] = useState(false)
  const effect = usePref(visual)
  const ref = useRef<HTMLDivElement>(null)
  const gearRef = useRef<HTMLButtonElement>(null)
  const secretRef = useRef<HTMLButtonElement>(null)

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
              className={'btn secret' + (effect !== 'off' ? ' on' : '')}
              title="Each click moves to the next effect. Links keep working."
              onClick={() => visual.set(nextVisual(effect))}
            >{effect === 'off' ? 'Super secret settings…' : VISUALS[effect].label}</button>
          </div>
          <div className="row">
            <span className="lbl">Version</span>
            <span className="val">built {buildLabel()}</span>
          </div>
          {effect !== 'off' && (
            <p className="hintline">
              {VISUALS[effect].hint} <button type="button" className="link" onClick={() => { visual.set('off'); secretRef.current?.focus() }}>Turn off</button>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/** One round swatch per palette: the page colour and the accent of the theme showing now. A click applies it at once. */
function PalettePicker() {
  const current = usePref(palette)
  return (
    <div className="swatches" role="group" aria-label="Colours">
      {PALETTES.map((p) => (
        <button
          key={p.id}
          type="button"
          className="swatch"
          aria-label={p.label}
          title={p.label}
          aria-pressed={current === p.id}
          style={{ '--sw-page': `light-dark(${p.light.page}, ${p.dark.page})`, '--sw-accent': `light-dark(${p.light.accent}, ${p.dark.accent})` } as CSSProperties}
          onClick={() => palette.set(p.id)}
        />
      ))}
    </div>
  )
}
