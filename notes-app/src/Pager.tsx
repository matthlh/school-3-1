import { useState, type ReactNode } from 'react'

/** Rows shown per page before a table gets previous/next controls. */
export const PAGE = 10

export interface PagerProps { page: number; pages: number; total: number; size: number; onPage: (page: number) => void }

/** "11–20 of 63" on the left, ‹ 2 of 7 › on the right. Renders nothing when everything fits on one page. */
export function Pager({ page, pages, total, size, onPage }: PagerProps) {
  if (pages <= 1) return null
  const from = page * size + 1
  const to = Math.min(total, (page + 1) * size)
  return (
    <div className="pager">
      <span className="range">{from}–{to} of {total}</span>
      <button type="button" aria-label="Previous page" disabled={page <= 0} onClick={() => onPage(page - 1)}>‹</button>
      <span className="count">{page + 1} of {pages}</span>
      <button type="button" aria-label="Next page" disabled={page >= pages - 1} onClick={() => onPage(page + 1)}>›</button>
    </div>
  )
}

/**
 * Slice `items` into pages of `size`. Returns the current page's rows plus `pager`, the controls to render
 * under the table (null when the list fits). `opts.initialIndex` opens on the page holding that item.
 * When the row count or `opts.resetKey` changes (a filter, a reload) the pager goes back to its opening page.
 */
export function usePager<T>(items: T[], size = PAGE, opts?: { initialIndex?: number; resetKey?: string | number | null }): {
  rows: T[]; page: number; pages: number; setPage: (page: number) => void; pager: ReactNode
} {
  const total = items.length
  const pages = Math.max(1, Math.ceil(total / size))
  const clamp = (p: number) => Math.min(Math.max(0, p), pages - 1)
  const initial = clamp(Math.floor(Math.max(0, opts?.initialIndex ?? 0) / size))
  const key = opts?.resetKey ?? null
  const [state, setState] = useState({ page: initial, total, key })
  const page = state.total === total && state.key === key ? clamp(state.page) : initial
  const setPage = (p: number) => setState({ page: clamp(p), total, key })
  const paged = total > size
  const rows = paged ? items.slice(page * size, (page + 1) * size) : items
  const pager: ReactNode = paged ? <Pager page={page} pages={pages} total={total} size={size} onPage={setPage} /> : null
  return { rows, page, pages, setPage, pager }
}
