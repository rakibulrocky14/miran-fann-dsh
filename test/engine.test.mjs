// Engine discovery and the status parser, both pure enough to test here.
import assert from 'node:assert/strict'
import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { parseGpuInfo } from '../src/host/engine.js'
import { findEngine } from '../src/host/paths.js'

test('findEngine prefers the configured path, then ~/.miran/bin, then PATH', () => {
  const root = mkdtempSync(join(tmpdir(), 'miran-paths-'))
  try {
    const home = join(root, 'home')
    const bin = join(root, 'bin')
    const mk = (dir, name) => {
      const file = join(dir, name)
      writeFileSync(file, '#!/bin/sh\n')
      chmodSync(file, 0o755)
      return file
    }
    // Only the PATH copy exists.
    mkdirSync(bin, { recursive: true })
    const onPath = mk(bin, 'miran')
    assert.equal(findEngine({ env: { PATH: bin }, home }).path, onPath)
    // The home install wins over PATH.
    mkdirSync(join(home, '.miran', 'bin'), { recursive: true })
    const homeInstall = mk(join(home, '.miran', 'bin'), 'miran')
    assert.equal(findEngine({ env: { PATH: bin }, home }).path, homeInstall)
    // A configured path wins over both.
    const configured = mk(root, 'engine')
    assert.equal(findEngine({ configured, env: { PATH: bin }, home }).path, configured)
    // A configured path that is not executable falls through.
    writeFileSync(join(root, 'plain'), 'x')
    assert.equal(findEngine({ configured: join(root, 'plain'), env: { PATH: bin }, home }).path, homeInstall)
    // Nothing installed.
    const empty = findEngine({ env: { PATH: '' }, home: join(root, 'nowhere') })
    assert.equal(empty.path, null)
    assert.ok(Array.isArray(empty.tried))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('findEngine expands a ~ in the configured path', () => {
  const root = mkdtempSync(join(tmpdir(), 'miran-tilde-'))
  try {
    const home = join(root, 'home')
    mkdirSync(join(home, 'tools'), { recursive: true })
    const file = join(home, 'tools', 'miran')
    writeFileSync(file, '#!/bin/sh\n')
    chmodSync(file, 0o755)
    assert.equal(findEngine({ configured: '~/tools/miran', env: { PATH: '' }, home }).path, file)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('parseGpuInfo reads the engine gpu-info output and strips colour', () => {
  const text = '\u001b[1;36m=== GPU BACKEND ===\u001b[0m\nStatus:        AVAILABLE (real GPU execution)\nAdapter:       Apple M3\nBackend:       metal\n'
  assert.deepEqual(parseGpuInfo(text), { status: 'AVAILABLE (real GPU execution)', adapter: 'Apple M3', backend: 'metal' })
  assert.deepEqual(parseGpuInfo('Status:        UNAVAILABLE — CPU fallback required\nReason:        no adapter\n'), {
    status: 'UNAVAILABLE — CPU fallback required', reason: 'no adapter',
  })
  // 0.1.6 (D52): both engines, side by side.
  const both = 'Status:        AVAILABLE (real GPU execution)\nAdapter:       Apple M5\nBackend:       Metal\nEngine:        Metal\n\u001b[1;36m=== CPU ENGINE ===\u001b[0m\nFlint:         available (9 of 10 cores, NEON)\n'
  assert.deepEqual(parseGpuInfo(both), {
    status: 'AVAILABLE (real GPU execution)', adapter: 'Apple M5', backend: 'Metal', engine: 'Metal', flint: 'available (9 of 10 cores, NEON)',
  })
})
