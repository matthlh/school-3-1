// The site's own TypeScript in a Node script. `entry` is export lines resolved against src/; they are bundled in memory
// with the esbuild Vite ships and imported from a data: URL, so a script runs the site's code, not a copy of it.
// parity.mjs and offline-pack.mjs read the question banks this way.
import { build } from 'esbuild'

const src = decodeURIComponent(new URL('../src', import.meta.url).pathname)

/** importSite("export { parseQuestions } from './markdown'") → those exports. */
export async function importSite(entry) {
  const bundle = await build({
    stdin: { contents: entry, resolveDir: src, loader: 'ts' },
    bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'error',
  })
  return import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'))
}
