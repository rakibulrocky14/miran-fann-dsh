// Miran Fann for DeepSeek Harness: the host half.
//
// It resolves the engine, mounts dsh's own mcp-client on top of it, registers
// the bundled skills, and serves the settings API the browser half calls. Every
// preference and key read or write goes through the engine's settings server, so
// this plugin and Miran's own page never disagree.
import { fileURLToPath } from 'node:url'
import z from '@deepseek-ai/schemastery'
import { EngineSettings, engineVersion, gpuInfo, messageOf } from './engine.js'
import { findEngine, setupCommand } from './paths.js'
import { PROVIDERS, providerById } from './providers.js'
import { registerRoutes } from './server.js'
import { registerSkills } from './skills.js'

/** Where the bundle's SKILL.md folders live. */
const SKILLS_DIR = fileURLToPath(new URL('../skills/', import.meta.url))

/** Namespace the engine's tools are published under. */
const SERVER_NAME = 'miran'

/** How long a GPU reading is trusted before the engine is asked again. */
const GPU_TTL_MS = 60_000

export const name = 'miran-fann'

/** dsh always has the tool registry; the rest are looked up so this plugin also loads headless. */
export const inject = ['tools']

export const Config = z.object({
  enginePath: z.string().default('')
    .description('Absolute path to the Miran engine. Empty finds ~/.miran/bin/miran, then PATH (MIRAN_BINARY also counts).'),
  workspace: z.string().default('')
    .description('Folder Miran reads and writes. Empty leaves it to the engine (the working folder dsh started in).'),
  tools: z.union(['default', 'full', 'lean']).default('default')
    .description('Tool list: full lists every tool, lean lists about 30 and reaches the rest through scripts. default follows MIRAN_TOOLS_DEFAULT.'),
  viewer: z.boolean().default(true)
    .description('Start the live Miran Viewer with the engine so the browser half can open it.'),
  viewerPort: z.number().min(1024).max(65535).step(1).default(47800)
    .description('Preferred port for the live viewer; the next free one is used when it is taken.'),
})

/**
 * Start the Miran connection.
 * @param {import('@deepseek-ai/cordis').Context} ctx - plugin context.
 * @param {z.infer<typeof Config>} config - resolved plugin config.
 * @returns {Promise<void>}
 */
export async function apply(ctx, config) {
  const log = ctx.logger ?? console
  const engine = findEngine({ configured: config.enginePath })
  const settings = new EngineSettings({ bin: engine.path ?? '', log })

  // Cordis only resolves an injected service through `ctx.get`, so every
  // optional service arrives as its own child fiber below. Each one is
  // optional: a headless composition has no credentials, skills or web server,
  // and this plugin still mounts the engine there.
  /** @type {any} */
  let credentials = null
  /** @type {import('@deepseek-ai/cordis').Fiber | null} */
  let mcpFiber = null
  let toolsError = ''
  let mounting = Promise.resolve()
  let gpu = null
  let gpuAt = 0
  let version = null
  /** @type {string[]} */
  let registeredSkills = []

  ctx.effect(() => () => {
    settings.stop()
    void mcpFiber?.dispose?.()
  }, 'miran.engine')

  if (engine.path) log.info(`Miran engine: ${engine.path}`)
  else log.info(`Miran engine not found; install it with "${setupCommand()}"`)

  // The dsh key store. Keys are handed to the engine child process, so a late
  // store means the mount already happened without them: reconnect it.
  ctx.inject(['credentials'], (ctx) => {
    credentials = ctx.credentials
    ctx.effect(() => () => { credentials = null }, 'miran.credentials')
    if (mcpFiber) void reloadTools()
  })

  // The bundled skills, once the composition has a skill registry.
  ctx.inject(['skills'], (ctx) => {
    void registerSkills(
      { skills: ctx.skills, effect: (fn, label) => ctx.effect(fn, label) },
      SKILLS_DIR,
      log,
    ).then((names) => { registeredSkills = names })
  })

  /**
   * Provider keys to hand the engine process. dsh scrubs credential-shaped
   * variables from the child environment, so they are resolved and passed here.
   * @returns {Promise<Record<string, string>>} environment entries.
   */
  async function providerEnv() {
    /** @type {Record<string, string>} */
    const env = {}
    if (!credentials) return env
    for (const provider of PROVIDERS) {
      try {
        const value = await credentials.resolve(provider.env)
        if (typeof value === 'string' && value) env[provider.env] = value
      } catch {
        // An unreadable reference is the same as an unset one for spawning.
      }
    }
    return env
  }

  /** Mount dsh's mcp-client on the engine, replacing any earlier mount. */
  async function mount() {
    if (!engine.path) return
    let plugin
    try {
      plugin = await import('@deepseek-ai/dsh-mcp-client')
    } catch (error) {
      toolsError = `dsh's mcp-client package did not resolve: ${messageOf(error)}`
      log.warn(toolsError)
      return
    }
    const env = await providerEnv()
    if (config.tools !== 'default') env.MIRAN_TOOLS_DEFAULT = config.tools
    env.MIRAN_VIEWER_PORT = String(config.viewerPort)
    const args = ['mcp']
    if (config.viewer) args.push('--viewer')
    if (config.workspace) args.push('--workspace', config.workspace)

    try {
      mcpFiber = ctx.plugin(plugin, {
        serverName: SERVER_NAME,
        transport: 'stdio',
        command: engine.path,
        args,
        env,
        cwd: config.workspace || process.cwd(),
      })
      toolsError = ''
    } catch (error) {
      toolsError = `cannot start dsh's mcp-client: ${messageOf(error)}`
      log.warn(toolsError)
    }
  }

  /** Drop the current mount and connect again (new keys, new args). */
  function reloadTools() {
    mounting = mounting.then(async () => {
      const previous = mcpFiber
      mcpFiber = null
      if (previous) {
        try {
          await previous.dispose()
        } catch (error) {
          log.warn(`closing the Miran MCP client failed: ${messageOf(error)}`)
        }
      }
      await mount()
    })
    return mounting
  }

  /**
   * Fresh GPU reading, cached briefly.
   * @returns {Promise<any>} the reading or null.
   */
  async function gpuStatus() {
    if (!engine.path) return null
    if (gpu && Date.now() - gpuAt < GPU_TTL_MS) return gpu
    try {
      gpu = await gpuInfo(engine.path)
      gpuAt = Date.now()
    } catch (error) {
      gpu = { status: 'unavailable', reason: messageOf(error) }
      gpuAt = Date.now()
    }
    return gpu
  }

  /**
   * Merge the engine's key list with what the harness credential store holds.
   * @param {any[]} engineKeys - the engine's own report.
   * @returns {Promise<any[]>} rows for the UI.
   */
  async function keyRows(engineKeys) {
    const byId = new Map(engineKeys.map((key) => [key.id, key]))
    return Promise.all(PROVIDERS.map(async (provider) => {
      const engineKey = byId.get(provider.id) ?? {}
      let harness = { configured: false, writable: false }
      if (credentials) {
        try {
          harness = await credentials.describe(provider.env)
        } catch {
          // Keep the unconfigured default.
        }
      }
      return {
        id: provider.id,
        name: provider.name,
        env: provider.env,
        set: Boolean(engineKey.set),
        hint: engineKey.hint ?? '',
        source: engineKey.source ?? null,
        store: engineKey.store ?? null,
        harness: { configured: Boolean(harness.configured), writable: Boolean(harness.writable), source: harness.source ?? null },
      }
    }))
  }

  /** @returns {Promise<any>} the payload behind GET /miran/api/status. */
  async function status() {
    const base = {
      engine: {
        found: Boolean(engine.path),
        path: engine.path,
        setup: setupCommand(),
        searched: engine.tried.slice(0, 4),
        error: '',
      },
      account: { signed_in: false, signing_in: false },
      prefs: {},
      keys: [],
      tools: { mounted: Boolean(mcpFiber), error: toolsError, server: SERVER_NAME },
      harness: {
        credentials: Boolean(credentials),
        skills: registeredSkills,
      },
      config: {
        workspace: config.workspace,
        tools: config.tools,
        viewer: config.viewer,
        viewerPort: config.viewerPort,
      },
      version: null,
      gpu: null,
    }
    if (!engine.path) return base

    let state = null
    try {
      state = await settings.state()
      base.engine.error = ''
    } catch (error) {
      base.engine.error = messageOf(error)
    }
    base.gpu = await gpuStatus()
    if (state) {
      version = state.version ?? version
      return {
        ...base,
        version: state.version ?? version,
        account: state.account ?? base.account,
        prefs: state.prefs ?? {},
        keys: await keyRows(state.keys ?? []),
        image_models: state.image_models ?? [],
        image_default: state.image_default ?? null,
        video_default: state.video_default ?? null,
        draft_default: state.draft_default ?? null,
        spend: state.spend ?? null,
        voice: state.voice ?? null,
        feedback: state.feedback ?? null,
        update: state.update ?? null,
        models: state.models ?? null,
        network: state.network ?? null,
      }
    }
    if (!version) version = await engineVersion(engine.path)
    return { ...base, version, keys: await keyRows([]) }
  }

  /** Store one key in the dsh credential store and in Miran's own key store. */
  async function setKey(providerId, value) {
    const provider = providerById(providerId)
    if (!provider) throw new Error(`unknown key ${providerId}`)
    if (credentials) {
      try {
        await credentials.set(provider.env, value)
      } catch (error) {
        log.warn(`the harness credential store refused ${provider.env}: ${messageOf(error)}`)
      }
    }
    await settings.call('POST', '/api/key', { provider: providerId, key: value })
    await reloadTools()
  }

  /** Forget one key in both stores. */
  async function removeKey(providerId) {
    const provider = providerById(providerId)
    if (!provider) throw new Error(`unknown key ${providerId}`)
    if (credentials) {
      try {
        await credentials.unset(provider.env)
      } catch (error) {
        log.warn(`the harness credential store refused to drop ${provider.env}: ${messageOf(error)}`)
      }
    }
    try {
      await settings.call('POST', '/api/key/delete', { provider: providerId })
    } catch (error) {
      // The engine may have no key of its own; the harness copy is gone already.
      log.info(`Miran had no ${providerId} key to forget: ${messageOf(error)}`)
    }
    await reloadTools()
  }

  /** Ask the engine to start its viewer and return the link it publishes. */
  async function openViewer() {
    try {
      const result = await ctx.tools.execute({
        callId: `miran-viewer-${Date.now().toString(36)}`,
        name: `mcp__${SERVER_NAME}__openViewer`,
        arguments: { port: config.viewerPort },
        signal: AbortSignal.timeout(20_000),
      })
      const url = viewerUrlOf(result)
      if (url) return { url }
      if (result.isError) return { error: textOf(result) || 'the viewer did not start' }
      return { error: 'the viewer started but published no link' }
    } catch (error) {
      return { error: messageOf(error) }
    }
  }

  await mount()
  ctx.inject(['webServer', 'connection'], (ctx) => {
    registerRoutes(ctx, ctx.webServer, {
      status,
      settings,
      setKey,
      removeKey,
      testKey: (provider) => settings.call('POST', '/api/key/test', { provider }),
      openViewer,
      reloadTools,
      reject: (req) => ctx.connection.requestRejection(req),
      log,
    })
  })
}

/**
 * Find the viewer URL in an MCP tool result.
 * @param {any} result - dsh tool execution result.
 * @returns {string | null} the link.
 */
function viewerUrlOf(result) {
  const candidates = []
  if (result && typeof result === 'object' && result.value && typeof result.value === 'object') {
    if (typeof result.value.url === 'string') candidates.push(result.value.url)
  }
  if (result && Array.isArray(result.content)) {
    for (const block of result.content) {
      if (block && block.type === 'text' && typeof block.text === 'string') candidates.push(block.text)
    }
  }
  for (const text of candidates) {
    const match = /http:\/\/127\.0\.0\.1:\d+\/\?t=[\w-]+(?:&(?:frame|comp)=[^\s"']*)?/.exec(text)
    if (match) return match[0]
  }
  return null
}

/**
 * Join the text blocks of a tool result.
 * @param {any} result - dsh tool execution result.
 * @returns {string} the text.
 */
function textOf(result) {
  if (!result || !Array.isArray(result.content)) return ''
  return result.content
    .filter((block) => block && block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .slice(0, 400)
}
