// The small HTTP face the browser half talks to.
//
// It is same-origin with the dsh web UI, refuses cross-site writes, and never
// returns a secret value: status reports whether a key is set, never the key.
import { messageOf } from './engine.js'

/** Largest write body accepted. */
const MAX_BODY = 1024 * 1024

/**
 * Send a JSON response.
 * @param {import('node:http').ServerResponse} res - response.
 * @param {number} status - HTTP status.
 * @param {unknown} body - JSON body.
 * @returns {void}
 */
function sendJson(res, status, body) {
  const text = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(text),
  })
  res.end(text)
}

/**
 * Read and parse a JSON request body.
 * @param {import('node:http').IncomingMessage} req - request.
 * @returns {Promise<any>} the parsed body.
 */
function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('request body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8')
      if (!text) return resolve({})
      try {
        resolve(JSON.parse(text))
      } catch {
        reject(new Error('expected a JSON body'))
      }
    })
    req.on('error', reject)
  })
}

/**
 * Refuse a write that another site's page sent.
 * @param {import('node:http').IncomingMessage} req - request.
 * @returns {boolean} whether the write may proceed.
 */
function sameOrigin(req) {
  const origin = req.headers.origin
  const host = req.headers.host
  if (!origin) return true
  if (!host) return false
  return origin === `http://${host}` || origin === `https://${host}`
}

/**
 * Register the plugin's routes on the dsh web server.
 * @param {object} ctx - the web-server injection context.
 * @param {any} webServer - dsh's web server service.
 * @param {object} deps - callbacks the routes need.
 * @param {() => Promise<any>} deps.status - fresh status payload.
 * @param {object} deps.settings - EngineSettings instance.
 * @param {(provider: string, value: string) => Promise<void>} deps.setKey - store one key in both places.
 * @param {(provider: string) => Promise<void>} deps.removeKey - forget one key in both places.
 * @param {(provider: string) => Promise<any>} deps.testKey - ask the engine to check a key.
 * @param {() => Promise<{ url?: string, error?: string }>} deps.openViewer - start the viewer.
 * @param {() => Promise<any>} deps.reloadTools - reconnect the MCP client.
 * @param {(req: import('node:http').IncomingMessage) => number | undefined} deps.reject - dsh's trust fence.
 * @param {{ info: Function, warn: Function }} deps.log - logger.
 * @returns {void}
 */
export function registerRoutes(ctx, webServer, deps) {
  if (!webServer) {
    deps.log.info('no web server in this composition; the Miran settings page is not served')
    return
  }
  // A named route is dispatched before dsh's own auth fallback, so without the
  // fence these routes would answer any caller that can reach the port. Refuse
  // to serve at all rather than serve them open.
  if (typeof deps.reject !== 'function') {
    deps.log.info('no dsh auth fence in this composition; the Miran settings page is not served')
    return
  }
  ctx.effect(() => webServer.register({
    kind: 'prefix',
    path: '/miran',
    handler: (req, res) => { void handle(req, res, deps) },
  }), 'miran.routes')
  deps.log.info('Miran settings API on /miran/api')
}

/**
 * Route one request.
 * @param {import('node:http').IncomingMessage} req - request.
 * @param {import('node:http').ServerResponse} res - response.
 * @param {object} deps - as registered.
 * @returns {Promise<void>}
 */
async function handle(req, res, deps) {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? '127.0.0.1'}`)
  const path = url.pathname
  const write = req.method === 'POST'

  // dsh's browser-trust fence: a foreign Host (DNS rebinding), a foreign Origin
  // and a missing login cookie are refused before any route reads a secret,
  // starts the engine's page or writes a setting.
  const rejection = deps.reject(req)
  if (rejection !== undefined) {
    sendJson(res, rejection, {
      error: rejection === 401 ? 'sign in to dsh first' : 'not a trusted dsh origin',
    })
    return
  }
  if (write && !sameOrigin(req)) {
    sendJson(res, 403, { error: 'cross-origin writes are refused' })
    return
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    sendJson(res, 405, { error: 'GET or POST' })
    return
  }

  try {
    if (!write && path === '/miran/api/status') {
      sendJson(res, 200, await deps.status())
      return
    }
    if (!write && path === '/miran/settings') {
      // The engine's own page, with its private token, without exposing the
      // token to the page's JavaScript.
      const { base, token } = await deps.settings.ready()
      res.writeHead(302, { Location: `${base}/?t=${encodeURIComponent(token)}`, 'Cache-Control': 'no-store' })
      res.end()
      return
    }
    if (!write) {
      sendJson(res, 404, { error: 'not found' })
      return
    }

    const body = await readJson(req)
    switch (path) {
      case '/miran/api/prefs':
        await deps.settings.prefs(body.patch ?? body)
        sendJson(res, 200, await deps.status())
        return
      case '/miran/api/key': {
        const { provider, value } = body
        if (typeof provider !== 'string' || typeof value !== 'string' || !value.trim()) {
          sendJson(res, 400, { error: 'provider and value are required' })
          return
        }
        await deps.setKey(provider, value.trim())
        sendJson(res, 200, await deps.status())
        return
      }
      case '/miran/api/key/remove': {
        if (typeof body.provider !== 'string') {
          sendJson(res, 400, { error: 'provider is required' })
          return
        }
        await deps.removeKey(body.provider)
        sendJson(res, 200, await deps.status())
        return
      }
      case '/miran/api/key/test': {
        if (typeof body.provider !== 'string') {
          sendJson(res, 400, { error: 'provider is required' })
          return
        }
        sendJson(res, 200, await deps.testKey(body.provider))
        return
      }
      case '/miran/api/signin':
        await deps.settings.call('POST', '/api/account/signin')
        sendJson(res, 200, await deps.status())
        return
      case '/miran/api/signout':
        await deps.settings.call('POST', '/api/account/signout')
        sendJson(res, 200, await deps.status())
        return
      case '/miran/api/update':
        sendJson(res, 200, await deps.settings.call('POST', '/api/update/now'))
        return
      case '/miran/api/model/download':
        await deps.settings.call('POST', '/api/model/download')
        sendJson(res, 200, await deps.status())
        return
      case '/miran/api/model/cancel':
        await deps.settings.call('POST', '/api/model/cancel')
        sendJson(res, 200, await deps.status())
        return
      case '/miran/api/viewer':
        sendJson(res, 200, await deps.openViewer())
        return
      case '/miran/api/restart':
        await deps.reloadTools()
        sendJson(res, 200, await deps.status())
        return
      default:
        sendJson(res, 404, { error: 'not found' })
    }
  } catch (error) {
    deps.log.warn(`miran route ${path}: ${messageOf(error)}`)
    sendJson(res, 500, { error: messageOf(error) })
  }
}
