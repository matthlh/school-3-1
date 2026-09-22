import { useEffect, useRef, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { VISUALS, currentVisual, nextVisual, setVisual, type Visual } from './visual'
import { buildLabel, checkForUpdate, getUpdate, reloadNow } from './update'

/** Gear button in the top bar. The popover holds Appearance and the Super secret settings button. */
export function Settings() {
  const [open, setOpen] = useState(false)
  const [visual, setV] = useState<Visual>(currentVisual)
  const ref = useRef<HTMLDivElement>(null)
  const gearRef = useRef<HTMLButtonElement>(null)
  const secretRef = useRef<HTMLButtonElement>(null)
  const [checkMsg, setCheckMsg] = useState<string | null>(null)
  const msgTimer = useRef<number | undefined>(undefined)

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

  // Version row: ask the server for a newer build; reload if there is one, else say so for a moment.
  const checkNow = async () => {
    window.clearTimeout(msgTimer.current)
    setCheckMsg('Checking…')
    const status = await checkForUpdate(true)
    if (status === 'available') { reloadNow(getUpdate().newer); return }
    setCheckMsg(status === 'current' ? 'Up to date' : 'Could not check')
    msgTimer.current = window.setTimeout(() => setCheckMsg(null), 2500)
  }

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
            <span className="val">
              built {buildLabel()}
              {import.meta.env.DEV
                ? <span className="muted">· dev server</span>
                : <button type="button" className="link" onClick={checkNow} disabled={checkMsg === 'Checking…'}>{checkMsg ?? 'Check now'}</button>}
            </span>
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
