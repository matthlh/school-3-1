import { Children, isValidElement, memo, useMemo, type ComponentProps, type ReactElement, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { hrefFor, resolveRelative } from './files'
import { PAGE, usePager } from './Pager'

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)
const isLocalMd = (href: string) => !/^(https?:|mailto:|#|\/)/.test(href) && /\.md(#.*)?$/.test(href)

/** Table body that pages itself past PAGE rows; shorter tables render exactly as react-markdown made them. */
function PagedBody({ children, ...rest }: ComponentProps<'tbody'>) {
  const rows = Children.toArray(children).filter(isValidElement)
  const { rows: shown, pager } = usePager(rows)
  if (rows.length <= PAGE) return <tbody {...rest}>{children}</tbody>
  const first = rows[0] as ReactElement<{ children?: ReactNode }>
  const cols = Math.max(1, Children.toArray(first.props.children).filter(isValidElement).length)
  return (
    <tbody {...rest}>
      {shown}
      <tr className="pager-row"><td colSpan={cols}>{pager}</td></tr>
    </tbody>
  )
}

// Component overrides live at module scope: react-markdown uses them as element types, so a fresh
// function per render would remount the subtree (and reset the pager's page) on every re-render.
type TBodyProps = ComponentProps<'tbody'> & { node?: unknown }
const TBody = ({ node: _node, ...rest }: TBodyProps) => <PagedBody {...rest} />
const Unwrap = ({ children }: { children?: ReactNode }) => <>{children}</>

/** Plain text under a React node, for reading a block's leading label. */
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children)
  return ''
}

// Callouts: a blockquote whose first line is a bold label (> **Definition.** …) renders as a coloured aside instead
// of a quote. The label word picks the colour and icon; anything else stays an ordinary blockquote.
const CALLOUT: Record<string, string> = {
  definition: 'def', example: 'example', 'watch out': 'warn', warning: 'warn', key: 'key',
  'key idea': 'key', remember: 'key', why: 'why', note: 'note', tip: 'note',
}
function calloutType(children: ReactNode): string | null {
  const first = Children.toArray(children).find(isValidElement) as ReactElement<{ children?: ReactNode }> | undefined
  if (!first || first.type !== 'p') return null
  const lead = Children.toArray(first.props.children).find(isValidElement) as ReactElement | undefined
  if (!lead || lead.type !== 'strong') return null
  const label = textOf(lead).toLowerCase().replace(/[.:]+\s*$/, '').trim()
  return CALLOUT[label] ?? null
}
const Blockquote = ({ node: _node, children, ...rest }: ComponentProps<'blockquote'> & { node?: unknown }) => {
  const t = calloutType(children)
  return t ? <aside className={`callout callout-${t}`}>{children}</aside> : <blockquote {...rest}>{children}</blockquote>
}

// Diagrams: a fenced block tagged ```svg is rendered as inline SVG so a lecture can carry a hand-drawn figure. The SVG
// is parsed and stripped of anything executable before it is inlined — a diagram must never run JavaScript, because the
// page also holds the private Review sync token in browser storage. Inline (not an <img>) so it can use the page's
// theme variables (var(--fg) etc.), which an <img>-embedded SVG cannot see.
const SVG_STRIP = new Set(['script', 'foreignobject', 'style', 'animate', 'animatetransform', 'animatemotion', 'set', 'handler'])
function sanitizeSvg(src: string): string {
  if (typeof window === 'undefined' || !window.DOMParser) return ''
  const doc = new window.DOMParser().parseFromString(src, 'image/svg+xml')
  const svg = doc.documentElement
  if (!svg || svg.nodeName.toLowerCase() !== 'svg' || doc.getElementsByTagName('parsererror').length) return ''
  const clean = (el: Element) => {
    for (const a of Array.from(el.attributes)) {
      const n = a.name.toLowerCase()
      // Drop every event handler, and any href that is not a same-document reference (blocks javascript: and data:).
      if (n.startsWith('on') || ((n === 'href' || n === 'xlink:href') && !a.value.trim().startsWith('#'))) el.removeAttribute(a.name)
    }
    for (const c of Array.from(el.children)) {
      if (SVG_STRIP.has(c.tagName.toLowerCase())) c.remove()
      else clean(c)
    }
  }
  clean(svg)
  return svg.outerHTML
}
const Pre = ({ node: _node, children, ...rest }: ComponentProps<'pre'> & { node?: unknown }) => {
  const code = Children.toArray(children).find(isValidElement) as ReactElement<{ className?: string; children?: ReactNode }> | undefined
  if (code && /\blanguage-svg\b/.test(code.props.className ?? '')) {
    const html = sanitizeSvg(textOf(code.props.children))
    if (html) return <figure className="svg-figure" dangerouslySetInnerHTML={{ __html: html }} />
  }
  return <pre {...rest}>{children}</pre>
}

// Math: only `$$…$$` counts as math, so a lone dollar sign ("$1450") stays plain text. `$$…$$` inside a line is
// inline math; a `$$` line, the LaTeX, then a closing `$$` line is a display equation. Rendered by KaTeX.
const REMARK = [remarkGfm, [remarkMath, { singleDollarTextMath: false }]] as NonNullable<ComponentProps<typeof ReactMarkdown>['remarkPlugins']>
// Code: a fenced block tagged with a language (```ts) gets highlight.js token classes; the colours live in
// styles.css under `.hljs-*` for both themes. Untagged fences stay plain, so prose in a fence is not guessed at.
const REHYPE = [[rehypeKatex, { strict: false }], [rehypeHighlight, { detect: false }]] as NonNullable<ComponentProps<typeof ReactMarkdown>['rehypePlugins']>

/**
 * Markdown renderer. `path` is the current file (for relative links); `inline` drops <p> wrappers. Memoised: its props
 * are plain strings, and re-rendering markdown with math and code is the slowest thing the site does.
 */
export const Md = memo(function Md({ text, path = '', inline = false }: { text: string; path?: string; inline?: boolean }) {
  const components = useMemo<Components>(() => ({
    a: ({ node: _node, href, children, ...rest }) => {
      if (href && isLocalMd(href)) return <a href={hrefFor(resolveRelative(path, href))}>{children}</a>
      return (
        <a href={href} target={href && isExternal(href) ? '_blank' : undefined} rel="noreferrer" {...rest}>
          {children}
        </a>
      )
    },
    tbody: TBody,
    blockquote: Blockquote,
    pre: Pre,
    ...(inline ? { p: Unwrap } : {}),
  }), [path, inline])
  return <ReactMarkdown remarkPlugins={REMARK} rehypePlugins={REHYPE} components={components}>{text}</ReactMarkdown>
})
