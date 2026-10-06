// Dates as the workspace writes them: ISO days ("2026-09-29"), compared as strings, shown short.

const pad = (n: number) => String(n).padStart(2, '0')
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const ISO = /^(\d{4})-(\d{2})-(\d{2})$/

export const isISODate = (s: string) => ISO.test(s)

export function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** The local Date an ISO day names, or null for anything else. */
function parse(iso: string): Date | null {
  const m = ISO.exec(iso.trim())
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null
}

/** "2026-09-16" → "Wed Sep 16". Anything that is not an ISO date comes back unchanged. */
export function formatDate(iso: string): string {
  const d = parse(iso)
  return d ? `${DOW[d.getDay()]} ${MON[d.getMonth()]} ${d.getDate()}` : iso
}

/** "2026-09-29" → "Sep 29", with the year added ("Sep 29, 2027") when it is not this year. Anything that is not an ISO date comes back unchanged. */
export function shortDate(iso: string): string {
  const d = parse(iso)
  if (!d) return iso
  const s = `${MON[d.getMonth()]} ${d.getDate()}`
  return d.getFullYear() === new Date().getFullYear() ? s : `${s}, ${d.getFullYear()}`
}

/** Whole days from ISO date `a` to ISO date `b` (positive when `b` is later). */
export function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000)
}
