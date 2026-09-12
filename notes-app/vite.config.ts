import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The school workspace (School 3-1/) is one level up; all the markdown lives there.
const workspaceRoot = decodeURIComponent(new URL('..', import.meta.url).pathname)

export default defineConfig({
  base: './', // relative asset URLs: works at a domain root and under a sub-path (GitHub Pages)
  plugins: [react()],
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
  server: {
    host: '127.0.0.1',
    port: 8765,
    strictPort: true,
    fs: { allow: [workspaceRoot] },
  },
})
