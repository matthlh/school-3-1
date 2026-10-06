import { theme, usePref, type Theme } from './prefs'

const OPTIONS: { value: Theme; glyph: string; label: string }[] = [
  { value: 'light', glyph: '☀︎', label: 'Light theme' },
  { value: 'auto', glyph: 'Auto', label: 'Follow the system theme' },
  { value: 'dark', glyph: '☾︎', label: 'Dark theme' },
]

/** Light / Auto / Dark segmented control. */
export function ThemeToggle() {
  const current = usePref(theme)
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className={current === o.value ? 'on' : undefined}
          aria-pressed={current === o.value}
          aria-label={o.label}
          title={o.label}
          onClick={() => theme.set(o.value)}
        >{o.glyph}</button>
      ))}
    </div>
  )
}
