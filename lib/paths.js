// Where the Miran engine lives on this machine.
//
// The order matches the other Miran hosts: an explicit path wins, then the
// environment, then the location `npx miran-fann setup` installs to, then PATH.
import { accessSync, constants } from 'node:fs'
import { homedir } from 'node:os'
import { delimiter, isAbsolute, join } from 'node:path'

/** The executable names a Miran install may use. */
const NAMES = ['miran', 'kinetic']

/**
 * Expand a leading `~` against the person's home directory.
 * @param {string} path - an absolute or `~` path.
 * @param {string} [home] - home directory override (tests).
 * @returns {string} the expanded path.
 */
export function expandHome(path, home = homedir()) {
  if (path === '~') return home
  if (path.startsWith('~/')) return join(home, path.slice(2))
  return path
}

/**
 * Whether a path is an executable file.
 * @param {string} path - candidate path.
 * @returns {boolean} true when it can be executed.
 */
export function isExecutable(path) {
  try {
    accessSync(path, constants.X_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Find the Miran engine binary.
 * @param {object} options - search inputs.
 * @param {string} [options.configured] - the plugin's enginePath setting.
 * @param {NodeJS.ProcessEnv} [options.env] - environment to read.
 * @param {string} [options.home] - home directory (tests).
 * @returns {{ path: string | null, tried: string[] }} the binary and every candidate tried.
 */
export function findEngine({ configured = '', env = process.env, home = homedir() } = {}) {
  const tried = []
  /** @type {string[]} */
  const candidates = []

  if (configured && configured.trim()) candidates.push(expandHome(configured.trim(), home))
  if (env.MIRAN_BINARY && env.MIRAN_BINARY.trim()) candidates.push(expandHome(env.MIRAN_BINARY.trim(), home))
  for (const name of NAMES) candidates.push(join(home, '.miran', 'bin', name))

  const pathEnv = env.PATH ?? ''
  for (const dir of pathEnv.split(delimiter)) {
    if (!dir) continue
    for (const name of NAMES) candidates.push(join(dir, name))
  }

  for (const candidate of candidates) {
    if (!isAbsolute(candidate)) continue
    const listed = candidate.endsWith('/miran') || candidate.endsWith('/kinetic')
    tried.push(candidate)
    if (isExecutable(candidate)) return { path: candidate, tried }
    // A home install that is absent is not worth reporting as a failed candidate
    // when PATH answers; keep the list short by trimming the usual misses.
    if (!listed) tried.pop()
  }

  return { path: null, tried }
}

/**
 * The command the settings UI tells people to run when no engine is installed.
 * @returns {string} the setup command.
 */
export function setupCommand() {
  return 'npx miran-fann setup'
}
