import { Children, isValidElement, useMemo, type ComponentProps, type ReactElement, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { hrefFor, resolveRelative } from './files'
import { PAGE, usePager } from './Pager'

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)
const isLocalMd = (href: string) => !/^(https?:|mailto:|#|\/)/.test(href) && /\.md(#.*)?$/.test(href)

/** Table body that pages itself past PAGE rows; shorter tables render exactly as react-markdown made them. */
function PagedBody({ children, ...rest }: ComponentProps<'tbody'>) {
  const rows = Children.toArray(children).filter(isValidElement)
  const { rows: shown, pager } = usePager(rows, PAGE)
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

/** Markdown renderer. `path` is the current file (for relative links); `inline` drops <p> wrappers. */
export function Md({ text, path = '', inline = false }: { text: string; path?: string; inline?: boolean }) {
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
    ...(inline ? { p: Unwrap } : {}),
  }), [path, inline])
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{text}</ReactMarkdown>
}
