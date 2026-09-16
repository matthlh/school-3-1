import { useEffect, useState } from 'react'
import { currentTheme, setTheme, type Theme } from './theme'

const OPTIONS: { value: Theme; glyph: string; label: string }[] = [
  { value: 'light', glyph: '☀︎', label: 'Light theme' },
  { value: 'auto', glyph: 'Auto', label: 'Follow the system theme' },
  { value: 'dark', glyph: '☾︎', label: 'Dark theme' },
]

/** Light / Auto / Dark segmented control. Persists to localStorage and dispatches a `themechange` event on window. */
export function ThemeToggle() {
  const [theme, setCurrent] = useState<Theme>(currentTheme)
  useEffect(() => {
    const sync = () => setCurrent(currentTheme())
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className={theme === o.value ? 'on' : undefined}
          aria-pressed={theme === o.value}
          aria-label={o.label}
          title={o.label}
          onClick={() => setTheme(o.value)}
        >{o.glyph}</button>
      ))}
    </div>
  )
}
