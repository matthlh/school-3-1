import { useState, type ReactNode } from 'react'

/** Rows shown per page before a table gets previous/next controls. */
export const PAGE = 10

/** "11–20 of 63" on the left, ‹ 2 of 7 › on the right. */
function Pager({ page, pages, total, onPage }: { page: number; pages: number; total: number; onPage: (page: number) => void }) {
  return (
    <div className="pager">
      <span className="range">{page * PAGE + 1}–{Math.min(total, (page + 1) * PAGE)} of {total}</span>
      <button type="button" aria-label="Previous page" disabled={page <= 0} onClick={() => onPage(page - 1)}>‹</button>
      <span className="count">{page + 1} of {pages}</span>
      <button type="button" aria-label="Next page" disabled={page >= pages - 1} onClick={() => onPage(page + 1)}>›</button>
    </div>
  )
}

/**
 * Slice `items` into pages of PAGE. Returns the current page's rows plus `pager`, the controls to render
 * under the table (null when the list fits). `opts.initialIndex` opens on the page holding that item.
 * When the row count or `opts.resetKey` changes (a filter, a reload) the pager goes back to its opening page.
 */
export function usePager<T>(items: T[], opts?: { initialIndex?: number; resetKey?: string | number | null }): { rows: T[]; pager: ReactNode } {
  const total = items.length
  const pages = Math.max(1, Math.ceil(total / PAGE))
  const clamp = (p: number) => Math.min(Math.max(0, p), pages - 1)
  const initial = clamp(Math.floor(Math.max(0, opts?.initialIndex ?? 0) / PAGE))
  const key = opts?.resetKey ?? null
  const [state, setState] = useState({ page: initial, total, key })
  const page = state.total === total && state.key === key ? clamp(state.page) : initial
  if (total <= PAGE) return { rows: items, pager: null }
  return {
    rows: items.slice(page * PAGE, (page + 1) * PAGE),
    pager: <Pager page={page} pages={pages} total={total} onPage={(p) => setState({ page: clamp(p), total, key })} />,
  }
}
