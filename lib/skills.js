// The Miran skills that ship with this bundle.
//
// Each skill is a folder under <package>/skills with a SKILL.md whose YAML
// frontmatter carries `name`, `description` and optional routing keys. The body
// is handed to the model unchanged when the skill is loaded.
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Frontmatter keys the skill registry understands, in file spelling. */
const BOOLEAN_KEYS = new Set(['disable-model-invocation', 'user-invocable'])

/**
 * Parse the YAML subset a SKILL.md frontmatter uses: scalars, quoted strings,
 * folded (`>`) and literal (`|`) blocks, and booleans.
 * @param {string} source - a scalar value or block.
 * @returns {string | boolean} the parsed value.
 */
function parseScalar(source) {
  const text = source.trim()
  if (text === 'true') return true
  if (text === 'false') return false
  if (text.length >= 2 && ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'")))) {
    const inner = text.slice(1, -1)
    return text.startsWith('"') ? inner.replaceAll('\\"', '"').replaceAll('\\n', '\n').replaceAll('\\\\', '\\') : inner.replaceAll("''", "'")
  }
  return text
}

/**
 * Split a SKILL.md into frontmatter data and body.
 * @param {string} text - the whole file.
 * @returns {{ data: Record<string, unknown>, body: string }} parsed parts.
 */
export function parseSkillMarkdown(text) {
  const normalized = text.replaceAll('\r\n', '\n')
  if (!normalized.startsWith('---\n')) return { data: {}, body: normalized.trim() }
  const end = normalized.indexOf('\n---', 4)
  if (end === -1) return { data: {}, body: normalized.trim() }
  const block = normalized.slice(4, end)
  const bodyStart = normalized.indexOf('\n', end + 1)
  const body = bodyStart === -1 ? '' : normalized.slice(bodyStart + 1).trim()

  /** @type {Record<string, unknown>} */
  const data = {}
  const lines = block.split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const match = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line)
    if (!match) continue
    const key = match[1]
    const rest = match[2]

    if (/^[>|][+-]?$/.test(rest)) {
      const collected = []
      while (index + 1 < lines.length && (/^\s+\S/.test(lines[index + 1]) || lines[index + 1].trim() === '')) {
        index += 1
        collected.push(lines[index].trim())
      }
      while (collected.length > 0 && collected.at(-1) === '') collected.pop()
      data[key] = rest.startsWith('>') ? collected.join(' ').trim() : collected.join('\n')
      continue
    }

    if (rest === '') {
      // A nested map is outside what skills use; keep the raw remainder empty.
      data[key] = ''
      continue
    }

    data[key] = parseScalar(rest)
  }
  return { data, body }
}

/**
 * Read every skill folder.
 * @param {string} directory - absolute skills directory.
 * @param {{ warn?: (message: string) => void }} [log] - logger for unusable files.
 * @returns {Promise<Array<{ name: string, description: string, whenToUse?: string, content: string, path: string }>>} skills.
 */
export async function loadSkills(directory, log) {
  /** @type {string[]} */
  let entries
  try {
    entries = await readdir(directory)
  } catch {
    return []
  }
  /** @type {Array<{ name: string, description: string, whenToUse?: string, content: string, path: string }>} */
  const skills = []
  for (const entry of entries.sort()) {
    const file = join(directory, entry, 'SKILL.md')
    let text
    try {
      text = await readFile(file, 'utf8')
    } catch {
      continue
    }
    const { data, body } = parseSkillMarkdown(text)
    const name = typeof data.name === 'string' && data.name.trim() ? data.name.trim() : entry
    const description = typeof data.description === 'string' ? data.description.trim() : ''
    if (!description) {
      log?.warn?.(`skill ${name} has no description; skipped`)
      continue
    }
    if (!body) {
      log?.warn?.(`skill ${name} has no body; skipped`)
      continue
    }
    const whenToUse = typeof data.whenToUse === 'string' && data.whenToUse.trim()
      ? data.whenToUse.trim()
      : typeof data['when-to-use'] === 'string' && data['when-to-use'].trim()
        ? data['when-to-use'].trim()
        : undefined
    skills.push({
      name,
      description,
      ...(whenToUse ? { whenToUse } : {}),
      content: body,
      path: file,
      data,
    })
  }
  return skills
}

/**
 * Invocation policy from frontmatter keys.
 * @param {Record<string, unknown>} data - frontmatter.
 * @returns {{ modelInvocable: boolean, userInvocable: boolean }} policy.
 */
export function invocationOf(data) {
  return {
    modelInvocable: data['disable-model-invocation'] === true ? false : true,
    userInvocable: data['user-invocable'] === false ? false : true,
  }
}

/**
 * Register loaded skills with dsh's skill registry.
 * @param {object} ctx - host plugin context.
 * @param {string} directory - absolute skills directory.
 * @param {{ info: Function, warn: Function }} log - logger.
 * @returns {Promise<string[]>} the names registered.
 */
export async function registerSkills(ctx, directory, log) {
  if (!ctx.skills) {
    log.info?.('no skill registry in this composition; Miran skills were not registered')
    return []
  }
  const skills = await loadSkills(directory, log)
  const registered = []
  for (const skill of skills) {
    const invocation = invocationOf(skill.data)
    ctx.effect(() => ctx.skills.register({
      name: skill.name,
      description: skill.description,
      ...(skill.whenToUse ? { whenToUse: skill.whenToUse } : {}),
      content: skill.content,
      path: skill.path,
      source: 'bundled',
      provider: 'miran',
      resourceBase: { kind: 'directory', path: join(directory, skill.name) },
      invocation,
    }), `miran.skill(${skill.name})`)
    registered.push(skill.name)
  }
  if (registered.length > 0) log.info?.(`registered ${registered.length} Miran skill(s): ${registered.join(', ')}`)
  return registered
}
