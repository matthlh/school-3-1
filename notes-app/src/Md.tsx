import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { hrefFor, resolveRelative } from './files'

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)
const isLocalMd = (href: string) => !/^(https?:|mailto:|#|\/)/.test(href) && /\.md(#.*)?$/.test(href)

/** Markdown renderer. `path` is the current file (for relative links); `inline` drops <p> wrappers. */
export function Md({ text, path = '', inline = false }: { text: string; path?: string; inline?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, href, children, ...rest }) => {
          if (href && isLocalMd(href)) return <a href={hrefFor(resolveRelative(path, href))}>{children}</a>
          return (
            <a href={href} target={href && isExternal(href) ? '_blank' : undefined} rel="noreferrer" {...rest}>
              {children}
            </a>
          )
        },
        ...(inline ? { p: ({ children }) => <>{children}</> } : {}),
      }}
    >
      {text}
    </ReactMarkdown>
  )
}
