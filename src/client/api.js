// Calls into the plugin's own host half, which proxies the engine.
// Same-origin only; a failed call surfaces its message to the page.

/**
 * Call one plugin route.
 * @param {'GET'|'POST'} method - HTTP method.
 * @param {string} path - route under /miran/api.
 * @param {unknown} [body] - JSON body for writes.
 * @returns {Promise<any>} the parsed response.
 */
async function call(method, path, body) {
  const init = { method, headers: {} }
  if (method === 'POST') {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body ?? {})
  }
  const response = await fetch(`/miran/api/${path}`, init)
  const text = await response.text()
  let parsed = null
  try {
    parsed = text ? JSON.parse(text) : null
  } catch {
    parsed = { error: text.slice(0, 300) }
  }
  if (!response.ok) throw new Error((parsed && parsed.error) || `HTTP ${response.status}`)
  return parsed
}

export const api = {
  /** @returns {Promise<any>} the full Miran status. */
  status: () => call('GET', 'status'),
  /** @param {Record<string, unknown>} patch - engine preference fields. */
  prefs: (patch) => call('POST', 'prefs', { patch }),
  /** @param {string} provider - provider id. @param {string} value - the key. */
  saveKey: (provider, value) => call('POST', 'key', { provider, value }),
  /** @param {string} provider - provider id. */
  removeKey: (provider) => call('POST', 'key/remove', { provider }),
  /** @param {string} provider - provider id. */
  testKey: (provider) => call('POST', 'key/test', { provider }),
  signIn: () => call('POST', 'signin'),
  signOut: () => call('POST', 'signout'),
  updateNow: () => call('POST', 'update'),
  downloadVoice: () => call('POST', 'model/download'),
  cancelVoice: () => call('POST', 'model/cancel'),
  /** @returns {Promise<{ url?: string, error?: string }>} the live viewer link. */
  viewer: () => call('POST', 'viewer'),
  restart: () => call('POST', 'restart'),
}
