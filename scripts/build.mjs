#!/usr/bin/env node
// Builds both halves of the bundle into lib/:
//   lib/*.js      the Cordis host plugin, copied from src/host
//   lib/client.js the browser half, bundled into the frozen module-table format
//
// `prepare` runs this on npm pack and on GitHub installs, so the tarball and the
// checkout behave the same. Nothing here needs the dsh monorepo: the shell
// supplies react and the @deepseek-ai client packages at runtime.
import { build } from 'esbuild'
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const hostDir = join(root, 'src', 'host')
const libDir = join(root, 'lib')
const clientEntry = join(root, 'src', 'client', 'index.jsx')

/** Module-table specifiers the dsh shell already owns. */
const EXTERNAL = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  'zod',
  '@tanstack/react-virtual',
  '@deepseek-ai/dsh-client-store',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-dockkit',
]

const BANNER = `window.__ModuleLoader__.load({
  id: "miran-fann-dsh",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
`
const FOOTER = `
    return module.exports;
  },
});
`

const check = process.argv.includes('--check')

await rm(libDir, { recursive: true, force: true })
await mkdir(libDir, { recursive: true })

for (const entry of await readdir(hostDir)) {
  if (!entry.endsWith('.js')) continue
  const from = join(hostDir, entry)
  if (!(await stat(from)).isFile()) continue
  await cp(from, join(libDir, entry))
}

await build({
  entryPoints: [clientEntry],
  outfile: join(libDir, 'client.js'),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['chrome114', 'safari16'],
  jsx: 'automatic',
  external: EXTERNAL,
  loader: { '.svg': 'dataurl' },
  banner: { js: BANNER },
  footer: { js: FOOTER },
  legalComments: 'none',
  logLevel: 'warning',
})

const written = (await readdir(libDir)).sort()
if (check) {
  const missing = ['index.js', 'client.js'].filter((name) => !written.includes(name))
  if (missing.length > 0) {
    console.error(`build check: missing ${missing.join(', ')}`)
    process.exit(1)
  }
}
console.log(`built lib/: ${written.join(', ')}`)
