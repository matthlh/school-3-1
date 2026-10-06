import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// The school workspace (School 3-1/) is one level up; all the markdown lives there.
const workspaceRoot = decodeURIComponent(new URL('..', import.meta.url).pathname)

// One stamp per build: compiled into the bundle as __BUILD_TIME__ and written to dist/version.json, so a running
// tab can ask the server whether a newer deploy exists (src/update.ts).
const buildTime = new Date().toISOString()
const versionFile = (): Plugin => ({
  name: 'version-json',
  apply: 'build',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ build: buildTime }) })
  },
})

// Vendor code in long-lived chunks of its own: React, the markdown pipeline (every other package; today that is
// react-markdown, remark/rehype, micromark and friends), KaTeX and highlight.js. A deploy that changes only the app
// rebuilds only the app chunk, so a phone keeps the libraries it has cached. Rollup's CommonJS interop helper, shared
// by React, highlight.js's core and a few markdown packages, is pinned to the React chunk, which imports nothing, so
// two vendor chunks never import each other.
function vendorChunk(id: string): string | undefined {
  if (id === '\0commonjsHelpers.js') return 'react'
  const pkg = /.*\/node_modules\/((?:@[^/]+\/)?[^/]+)\//.exec(id)?.[1]
  if (!pkg) return undefined
  if (pkg === 'react' || pkg === 'react-dom' || pkg === 'scheduler') return 'react'
  if (pkg === 'katex') return 'katex'
  if (pkg === 'highlight.js') return 'highlight'
  return 'markdown'
}

export default defineConfig({
  base: './', // relative asset URLs: works at a domain root and under a sub-path (GitHub Pages)
  plugins: [react(), versionFile()],
  define: { __BUILD_TIME__: JSON.stringify(buildTime) },
  build: { rollupOptions: { output: { manualChunks: vendorChunk } } },
  server: {
    host: '127.0.0.1',
    port: 8765,
    strictPort: true,
    fs: { allow: [workspaceRoot] },
  },
})
