// The engine's own settings server, spoken to over its HTTP API.
//
// Every preference, key and account action goes through the engine so this
// plugin, Miran's settings page and every other host read and write one state.
import { execFile } from 'node:child_process'
import { spawn } from 'node:child_process'
import { promisify } from 'node:util'

const run = promisify(execFile)

/** How long the settings server may take to announce its URL. */
const START_TIMEOUT_MS = 20_000
/** How long one API call may take. */
const CALL_TIMEOUT_MS = 20_000

/**
 * Strip the ANSI colour codes the engine's CLI uses.
 * @param {string} text - raw terminal text.
 * @returns {string} plain text.
 */
function plain(text) {
  return text.replaceAll(/\u001b\[[0-9;]*m/g, '')
}

/**
 * Read the GPU section `miran gpu-info` prints.
 * @param {string} text - command output.
 * Engines from 0.1.6 also print `Engine:` (the GPU engine's name, e.g. Metal)
 * and a `Flint:` line (the CPU engine, always available: cores and SIMD).
 * @returns {{ status: string, adapter?: string, backend?: string, reason?: string, engine?: string, flint?: string }} the summary.
 */
export function parseGpuInfo(text) {
  const out = { status: 'unknown' }
  for (const line of plain(text).split('\n')) {
    const match = /^\s*([A-Za-z][A-Za-z ]*?):\s+(.*)$/.exec(line)
    if (!match) continue
    const [, key, value] = match
    const name = key.trim().toLowerCase()
    if (name === 'status') out.status = value.trim()
    else if (name === 'adapter') out.adapter = value.trim()
    else if (name === 'backend') out.backend = value.trim()
    else if (name === 'reason') out.reason = value.trim()
    else if (name === 'engine') out.engine = value.trim()
    else if (name === 'flint') out.flint = value.trim()
  }
  return out
}

/** Keeps one `miran settings --no-browser` child and calls its API. */
export class EngineSettings {
  /**
   * @param {object} options - engine details.
   * @param {string} options.bin - absolute engine path.
   * @param {{ info: Function, warn: Function }} [options.log] - logger.
   */
  constructor({ bin, log }) {
    this.bin = bin
    this.log = log
    /** @type {import('node:child_process').ChildProcess | null} */
    this.child = null
    this.base = ''
    this.token = ''
    /** @type {Promise<{ base: string, token: string }> | null} */
    this.starting = null
    this.stderr = ''
  }

  /**
   * Start the settings server if it is not running.
   * @returns {Promise<{ base: string, token: string }>} its address and token.
   */
  async ready() {
    if (this.base && this.token && this.child && this.child.exitCode === null) {
      return { base: this.base, token: this.token }
    }
    if (this.starting) return this.starting
    this.starting = this.#start()
    try {
      return await this.starting
    } finally {
      this.starting = null
    }
  }

  /** @returns {Promise<{ base: string, token: string }>} */
  #start() {
    return new Promise((resolve, reject) => {
      const child = spawn(this.bin, ['settings', '--no-browser'], {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: process.env,
      })
      this.child = child
      this.stderr = ''
      let buffered = ''
      let settled = false

      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        this.log?.warn?.(`Miran settings did not start in time; ${this.stderr.trim().slice(-400)}`)
        child.kill()
        reject(new Error('The Miran settings server did not start in time.'))
      }, START_TIMEOUT_MS)
      timer.unref?.()

      child.stdout.setEncoding('utf8')
      child.stdout.on('data', (chunk) => {
        buffered += chunk
        const match = /Miran Fann Settings:\s*(http:\/\/\S+)/.exec(buffered)
        if (!match || settled) return
        settled = true
        clearTimeout(timer)
        const url = new URL(match[1])
        this.base = url.origin
        this.token = url.searchParams.get('t') ?? ''
        resolve({ base: this.base, token: this.token })
      })
      child.stderr.setEncoding('utf8')
      child.stderr.on('data', (chunk) => {
        this.stderr = `${this.stderr}${chunk}`.slice(-4000)
      })
      child.on('error', (error) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        reject(new Error(`Cannot start the Miran engine: ${error.message}`))
      })
      child.on('exit', (code) => {
        this.base = ''
        this.token = ''
        this.child = null
        if (settled) return
        settled = true
        clearTimeout(timer)
        const detail = this.stderr.trim().split('\n').slice(-3).join(' ')
        reject(new Error(`The Miran settings server exited (${code ?? 'signal'})${detail ? `: ${detail}` : ''}`))
      })
    })
  }

  /**
   * Call one settings API route.
   * @param {'GET'|'POST'} method - HTTP method.
   * @param {string} path - route beginning with `/api/`.
   * @param {unknown} [body] - JSON body for writes.
   * @returns {Promise<any>} the parsed response.
   */
  async call(method, path, body) {
    const { base, token } = await this.ready()
    const url = `${base}${path}${path.includes('?') ? '&' : '?'}t=${encodeURIComponent(token)}`
    const init = { method, signal: AbortSignal.timeout(CALL_TIMEOUT_MS), headers: {} }
    if (method === 'POST') {
      init.headers = { 'X-Miran-Edit': '1', 'Content-Type': 'application/json' }
      init.body = JSON.stringify(body ?? {})
    }
    const response = await fetch(url, init)
    const text = await response.text()
    let parsed
    try {
      parsed = text ? JSON.parse(text) : null
    } catch {
      parsed = { error: text.slice(0, 400) }
    }
    if (!response.ok) {
      const message = parsed && typeof parsed === 'object' && 'error' in parsed ? String(parsed.error) : `HTTP ${response.status}`
      throw new Error(message)
    }
    return parsed
  }

  /** @returns {Promise<any>} the engine's full settings state. */
  state() {
    return this.call('GET', '/api/state')
  }

  /**
   * Write a preference patch.
   * @param {Record<string, unknown>} patch - engine preference fields.
   * @returns {Promise<any>} the new state.
   */
  prefs(patch) {
    return this.call('POST', '/api/prefs', patch)
  }

  /** Stop the settings server. */
  stop() {
    const child = this.child
    this.child = null
    this.base = ''
    this.token = ''
    if (child && child.exitCode === null) child.kill()
  }
}

/**
 * Read the engine's GPU status.
 * @param {string} bin - engine path.
 * @returns {Promise<ReturnType<typeof parseGpuInfo>>} the summary.
 */
export async function gpuInfo(bin) {
  const { stdout } = await run(bin, ['gpu-info'], { timeout: 30_000, maxBuffer: 1 << 20 })
  return parseGpuInfo(stdout)
}

/**
 * Read the engine version string.
 * @param {string} bin - engine path.
 * @returns {Promise<string | null>} the version, when the CLI prints one.
 */
export async function engineVersion(bin) {
  try {
    const { stdout } = await run(bin, ['--version'], { timeout: 10_000 })
    const match = /(\d+\.\d+\.\d+(?:[-+][\w.]+)?)/.exec(stdout)
    return match ? match[1] : stdout.trim() || null
  } catch {
    return null
  }
}

/** ANSI-free text of an unknown error. */
export function messageOf(error) {
  if (error instanceof Error) return error.message
  return String(error)
}
