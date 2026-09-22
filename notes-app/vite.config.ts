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

export default defineConfig({
  base: './', // relative asset URLs: works at a domain root and under a sub-path (GitHub Pages)
  plugins: [react(), versionFile()],
  define: { __BUILD_TIME__: JSON.stringify(buildTime) },
  server: {
    host: '127.0.0.1',
    port: 8765,
    strictPort: true,
    fs: { allow: [workspaceRoot] },
  },
})
