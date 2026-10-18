// The settings routes sit on a dsh web server without dsh's fallback fence in
// front of them, so every request must pass the fence the plugin asks for.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { registerRoutes } from '../src/host/server.js'

/** Mount the routes on a fake web server and return a request runner. */
function harness({ reject } = {}) {
  let handler = null
  let registrations = 0
  let statusCalls = 0
  const ctx = { effect: (fn) => { fn() } }
  const webServer = {
    register: (route) => {
      registrations += 1
      handler = route.handler
      return () => {}
    },
  }
  const deps = {
    reject,
    status: async () => {
      statusCalls += 1
      return { engine: { found: true } }
    },
    settings: {
      ready: async () => ({ base: 'http://127.0.0.1:1', token: 'secret-token' }),
      call: async () => ({}),
      prefs: async () => {},
    },
    setKey: async () => {},
    removeKey: async () => {},
    testKey: async () => ({ ok: true }),
    openViewer: async () => ({ url: 'http://127.0.0.1:1/?t=x' }),
    reloadTools: async () => {},
    log: { info: () => {}, warn: () => {} },
  }
  registerRoutes(ctx, webServer, deps)
  const run = (overrides = {}) =>
    new Promise((resolve) => {
      let settled = false
      const res = {
        status: 0,
        headers: {},
        body: '',
        writeHead(status, headers) {
          this.status = status
          this.headers = headers ?? {}
          return this
        },
        end(text) {
          this.body = text ?? ''
          if (!settled) {
            settled = true
            resolve(this)
          }
        },
      }
      if (!handler) {
        resolve({ status: 0, headers: {}, body: '' })
        return
      }
      handler({ headers: {}, method: 'GET', url: '/miran/api/status', ...overrides }, res)
    })
  return { run, registrations: () => registrations, statusCalls: () => statusCalls }
}

test('a request dsh does not trust never reaches the status payload', async () => {
  const { run, statusCalls } = harness({ reject: () => 401 })
  const res = await run()
  assert.equal(res.status, 401)
  assert.equal(statusCalls(), 0)
  assert.match(res.body, /sign in/)
})

test('a foreign Host is refused before any route', async () => {
  const { run } = harness({ reject: () => 403 })
  const res = await run({ url: '/miran/settings' })
  assert.equal(res.status, 403)
  assert.equal(res.headers.Location, undefined)
})

test('the engine token redirect is fenced too', async () => {
  const { run } = harness({ reject: () => 401 })
  const res = await run({ url: '/miran/settings' })
  assert.equal(res.status, 401)
  assert.doesNotMatch(res.body, /secret-token/)
})

test('a trusted request reaches the status payload', async () => {
  const { run, statusCalls } = harness({ reject: () => undefined })
  const res = await run()
  assert.equal(res.status, 200)
  assert.equal(statusCalls(), 1)
  assert.match(res.body, /"found":true/)
})

test('with no fence available the routes are not registered at all', () => {
  const { registrations } = harness({})
  assert.equal(registrations(), 0)
})
