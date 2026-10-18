// The Miran section inside dsh Settings.
//
// Everything here reads and writes the engine, so the same account, keys and
// defaults show up in Miran's own settings page and every other host. The only
// local copy is the API keys in dsh's credential store, which is what lets the
// engine process receive them without a plain-text file.
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Input, Pill, SegmentedControl, Switch } from '@deepseek-ai/dsh-client-ui-primitives'
import logoUrl from '../../assets/logo.svg'
import { api } from './api.js'
import { useStyles } from './styles.js'

/** Engine quality ids and the labels Miran's own page uses. */
const QUALITIES = [
  { value: '', label: 'Per request (high)' },
  { value: 'draft', label: 'Draft' },
  { value: 'standard', label: 'Standard' },
  { value: 'high', label: 'High' },
  { value: 'max', label: 'Max (10-bit HEVC)' },
  { value: 'master', label: 'Master (ProRes)' },
]

/**
 * Format a byte count the way the engine's page does.
 * @param {number} bytes - size.
 * @returns {string} a short human size.
 */
function size(bytes) {
  if (!bytes) return '0 MB'
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

/** Shared status loader and action runner. */
export function useMiran() {
  const [status, setStatus] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [busy, setBusy] = useState('')
  const [actionError, setActionError] = useState('')
  const alive = useRef(true)

  const refresh = useCallback(async () => {
    try {
      const next = await api.status()
      if (!alive.current) return
      setStatus(next)
      setLoadError('')
    } catch (error) {
      if (!alive.current) return
      setLoadError(error instanceof Error ? error.message : String(error))
    }
  }, [])

  useEffect(() => {
    alive.current = true
    void refresh()
    return () => { alive.current = false }
  }, [refresh])

  const signingIn = Boolean(status && status.account && status.account.signing_in)
  useEffect(() => {
    if (!signingIn) return undefined
    const timer = setInterval(() => { void refresh() }, 1500)
    return () => clearInterval(timer)
  }, [signingIn, refresh])

  const run = useCallback(async (label, work) => {
    setBusy(label)
    setActionError('')
    try {
      const next = await work()
      if (next && next.engine) setStatus(next)
      else await refresh()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : String(error))
    } finally {
      setBusy('')
    }
  }, [refresh])

  return { status, loadError, busy, actionError, setActionError, run, refresh }
}

/**
 * One labelled row inside a group.
 * @param {object} props - row props.
 * @returns {import('react').ReactElement} the row.
 */
function Row({ label, help, children, stacked = false }) {
  return (
    <div className={stacked ? 'miran-row stacked' : 'miran-row'}>
      <div>
        <div className="miran-row-label">{label}</div>
        {help ? <div className="miran-row-help">{help}</div> : null}
      </div>
      <div className="miran-row-control">{children}</div>
    </div>
  )
}

/**
 * A titled card holding rows.
 * @param {object} props - group props.
 * @returns {import('react').ReactElement} the group.
 */
function Group({ title, desc, children }) {
  return (
    <section className="miran-group">
      <div className="miran-group-head">
        <div className="miran-group-title">{title}</div>
        {desc ? <div className="miran-group-desc">{desc}</div> : null}
      </div>
      {children}
    </section>
  )
}

/**
 * A small status pill.
 * @param {object} props - pill props.
 * @returns {import('react').ReactElement} the pill.
 */
function State({ ok, children }) {
  return <Pill active={ok}>{children}</Pill>
}

/**
 * The Miran settings section.
 * @returns {import('react').ReactElement} the section.
 */
export function MiranSection() {
  useStyles()
  const { status, loadError, busy, actionError, run, refresh } = useMiran()

  if (!status) {
    return (
      <div className="miran-page">
        <div className="miran-hero">
          <img className="miran-mark" src={logoUrl} alt="" />
          <div className="miran-hero-copy">
            <h2 className="miran-title">Miran Fann</h2>
            <div className="miran-sub">Motion graphics with a GPU engine on this Mac.</div>
          </div>
        </div>
        <div className="miran-card">
          <div className="miran-card-copy">{loadError || 'Reading the Miran engine…'}</div>
          <div className="miran-card-actions">
            <Button size="sm" variant="outline" onClick={() => void refresh()}>Check again</Button>
          </div>
        </div>
      </div>
    )
  }

  const engine = status.engine ?? {}
  const account = status.account ?? {}
  const prefs = status.prefs ?? {}
  const keys = status.keys ?? []
  const update = status.update ?? {}
  const feedback = status.feedback ?? {}
  const voice = status.voice ?? {}
  const spend = status.spend ?? {}
  const gpu = status.gpu

  const savePrefs = (label, patch) => run(label, () => api.prefs(patch))

  return (
    <div className="miran-page">
      <div className="miran-hero">
        <img className="miran-mark" src={logoUrl} alt="" />
        <div className="miran-hero-copy">
          <h2 className="miran-title">Miran Fann</h2>
          <div className="miran-sub">Motion graphics with a GPU engine on this Mac.</div>
        </div>
        <div className="miran-pills">
          {engine.found ? <State ok>{status.version ? `v${status.version}` : 'engine found'}</State> : <State>engine missing</State>}
          {gpu && gpu.status ? <State ok={gpu.status.startsWith('AVAILABLE')}>{gpu.status.startsWith('AVAILABLE') ? `GPU · ${gpu.engine ?? gpu.backend ?? gpu.adapter ?? 'ready'}` : (gpu.engine ? `GPU · ${gpu.engine} off` : 'GPU off')}</State> : null}
          {gpu && gpu.status ? <State ok>CPU · Flint</State> : null}
          <State ok={Boolean(account.signed_in)}>{account.signed_in ? 'signed in' : 'sign-in needed'}</State>
        </div>
      </div>

      {actionError ? <div className="miran-error">{actionError}</div> : null}

      {!engine.found ? (
        <div className="miran-banner">
          <div className="miran-banner-title">Install the Miran engine</div>
          <div className="miran-card-copy">
            The plugin found no engine. Run this once in a terminal; it installs the engine to <span className="miran-mono">~/.miran/bin/miran</span> and takes about a minute.
          </div>
          <div className="miran-card-actions">
            <Input className="miran-input miran-mono" readOnly value={engine.setup ?? 'npx miran-fann setup'} onFocus={(event) => event.target.select()} aria-label="Setup command" />
            <Button size="sm" variant="primary" onClick={() => { void navigator.clipboard?.writeText(engine.setup ?? 'npx miran-fann setup') }}>Copy</Button>
            <Button size="sm" variant="outline" onClick={() => void refresh()}>Check again</Button>
          </div>
          <div className="miran-note">
            Looking in {engine.searched && engine.searched.length ? engine.searched.join(', ') : 'PATH'}. A different location can be set as <span className="miran-mono">enginePath</span> in this plugin's config.
          </div>
        </div>
      ) : null}

      {engine.found && engine.error ? (
        <div className="miran-banner">
          <div className="miran-banner-title">The engine is installed but not answering</div>
          <div className="miran-card-copy">{engine.error}</div>
          <div className="miran-card-actions">
            <Button size="sm" variant="outline" onClick={() => void refresh()}>Try again</Button>
          </div>
          <div className="miran-note miran-mono">{engine.path}</div>
        </div>
      ) : null}

      {engine.found ? (
        <section className={account.signed_in ? 'miran-banner' : 'miran-banner signin'}>
          <div className="miran-banner-title">{account.signed_in ? 'Signed in to Miran Fann' : 'Miran Fann runs signed in'}</div>
          {account.signed_in ? (
            <>
              <div className="miran-card-copy">
                {account.name ? `${account.name} · ${account.email}` : account.email}
                {account.since ? ` · since ${new Date(account.since * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
              </div>
              <div className="miran-card-actions">
                <Button size="sm" variant="outline" disabled={busy === 'signout'} onClick={() => void run('signout', () => api.signOut())}>Sign out</Button>
                <span className="miran-note">Signing out stops the agent from using Miran on this Mac.</span>
              </div>
            </>
          ) : (
            <>
              <div className="miran-card-copy">
                Miran Fann asks the person to sign in once with Google before its tools run. The plugin shows that check as it is; it never skips or imitates it.
              </div>
              <div className="miran-card-actions">
                <Button size="sm" variant="primary" disabled={Boolean(busy) || account.signing_in} onClick={() => void run('signin', () => api.signIn())}>
                  {account.signing_in ? 'Waiting for your browser…' : 'Sign in with Google'}
                </Button>
                {account.signing_in ? <span className="miran-spin" aria-label="Waiting" /> : null}
                <span className="miran-note">
                  {account.signing_in ? 'Finish signing in at miranfann.com; this page updates on its own.' : 'A browser window opens at miranfann.com.'}
                </span>
              </div>
              {account.error ? <div className="miran-error">{account.error}</div> : null}
            </>
          )}
        </section>
      ) : null}

      <Group title="Engine" desc={engine.found ? engine.path : 'Not installed.'}>
        <Row label="Version" help="Installed engine build.">
          <span className="miran-mono">{status.version ?? 'unknown'}</span>
        </Row>
        <Row label={`GPU · ${(gpu && gpu.engine) || 'Metal'}`} help={gpu && gpu.adapter ? gpu.adapter : 'Miran renders on the GPU when one is available.'}>
          <span className="miran-mono">{gpu ? `${gpu.status ?? 'unknown'}${gpu.backend ? ` · ${gpu.backend}` : ''}` : 'reading…'}</span>
        </Row>
        <Row label="CPU · Flint" help="Miran's own CPU renderer: it draws the same film when there is no GPU, or when a render asks for backend cpu.">
          <span className="miran-mono">{gpu ? (gpu.flint ?? 'available') : 'reading…'}</span>
        </Row>
        <Row
          label="Workspace"
          help="Folder Miran reads and writes. Empty uses the folder dsh started in; set it in this plugin's config to pin one."
          stacked
        >
          <span className="miran-mono">{status.config && status.config.workspace ? status.config.workspace : 'dsh workspace'}</span>
        </Row>
        <Row label="Tools" help="Lean lists about 30 tools and reaches the rest through scripts. This is the engine default, shared with the other Miran hosts.">
          <select
            className="miran-select"
            value={prefs.tools ?? ''}
            aria-label="Tool list"
            disabled={Boolean(busy)}
            onChange={(event) => void savePrefs('tools', { tools: event.target.value || null })}
          >
            <option value="">App default</option>
            <option value="full">Full · every tool</option>
            <option value="lean">Lean · scripts first</option>
          </select>
        </Row>
        <Row label="dsh tools" help={status.tools && status.tools.mounted ? 'dsh is connected to the engine and lists its tools.' : (status.tools && status.tools.error) || 'Not connected yet.'}>
          <div className="miran-inline">
            <State ok={Boolean(status.tools && status.tools.mounted && !status.tools.error)}>{status.tools && status.tools.mounted ? 'connected' : 'off'}</State>
            {engine.found ? (
              <Button size="sm" variant="outline" disabled={busy === 'restart'} onClick={() => void run('restart', () => api.restart())}>Reconnect</Button>
            ) : null}
          </div>
        </Row>
        <Row label="Live viewer" help="Start the engine's viewer so the button below can open it.">
          <Switch
            checked={Boolean(status.config && status.config.viewer)}
            label="Start the live viewer"
            disabled
            onChange={() => {}}
            title="Set in this plugin's config (viewer) so the engine starts with it."
          />
          <span className="miran-mono">{status.config ? `port ${status.config.viewerPort}` : ''}</span>
        </Row>
      </Group>

      {engine.found ? (
        <Group title="Render defaults" desc="Used when the agent's request does not say otherwise.">
          <Row label="Export quality" help="renderVideo without a quality.">
            <select
              className="miran-select"
              value={prefs.default_quality ?? ''}
              aria-label="Export quality"
              disabled={Boolean(busy)}
              onChange={(event) => void savePrefs('quality', { default_quality: event.target.value || null })}
            >
              {QUALITIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </Row>
          <Row label="File size limit" help="MB; exports aim under it. Empty means no limit.">
            <Input
              className="miran-input miran-mono"
              type="number"
              min="1"
              step="1"
              placeholder="no limit"
              defaultValue={prefs.default_max_mb ?? ''}
              aria-label="File size limit in MB"
              onBlur={(event) => void savePrefs('mb', { default_max_mb: event.target.value === '' ? null : Number(event.target.value) })}
            />
          </Row>
          <Row label="Voice" help="Voiceovers without a voice. e.g. kokoro:af_heart.">
            <Input
              className="miran-input miran-mono"
              placeholder="kokoro:af_heart"
              defaultValue={prefs.default_voice ?? ''}
              aria-label="Default voice"
              onBlur={(event) => void savePrefs('voice', { default_voice: event.target.value.trim() || null })}
            />
          </Row>
        </Group>
      ) : null}

      {engine.found ? (
        <Group
          title="API keys"
          desc="Cloud voices and generated media need a key. Values are stored in DeepSeek Harness's credential store and in Miran's own key store, so every host agrees; this page never shows a stored key."
        >
          <div>
            {keys.map((key) => (
              <KeyRow key={key.id} row={key} busy={busy} run={run} />
            ))}
          </div>
          <div className="miran-note" style={{ padding: '0 16px 12px' }}>
            An environment variable with the same name wins over both stores. Keys are billed to your own accounts.
          </div>
        </Group>
      ) : null}

      {engine.found ? (
        <Group title="Generation" desc="Image and video models made in the cloud with your OpenRouter, fal or Replicate key. Miran checks the price first and refuses a call over these caps.">
          <Row label="Image model" help={`Any OpenRouter image model id. Empty uses ${status.image_default ?? 'the default'}.`}>
            <Input
              className="miran-input miran-mono"
              placeholder={status.image_default ?? ''}
              defaultValue={prefs.image_model ?? ''}
              aria-label="Image model"
              onBlur={(event) => void savePrefs('image', { image_model: event.target.value.trim() || null })}
            />
          </Row>
          <Row label="Video model" help={`Any OpenRouter video model id. Empty uses ${status.video_default ?? 'the default'}.`}>
            <Input
              className="miran-input miran-mono"
              placeholder={status.video_default ?? ''}
              defaultValue={prefs.video_model ?? ''}
              aria-label="Video model"
              onBlur={(event) => void savePrefs('video', { video_model: event.target.value.trim() || null })}
            />
          </Row>
          <Row label="Draft model" help={`Cheap previews. Empty uses ${status.draft_default ?? 'the default'}.`}>
            <Input
              className="miran-input miran-mono"
              placeholder={status.draft_default ?? ''}
              defaultValue={prefs.draft_video_model ?? ''}
              aria-label="Draft video model"
              onBlur={(event) => void savePrefs('draft', { draft_video_model: event.target.value.trim() || null })}
            />
          </Row>
          <Row label="Most per call" help={`Dollars one generation may cost. Default $${spend.call_cap_default ?? 0}.`}>
            <Input
              className="miran-input miran-mono"
              type="number"
              min="0"
              step="0.5"
              placeholder={String(spend.call_cap_default ?? '')}
              defaultValue={prefs.spend_cap_call_usd ?? ''}
              aria-label="Spend cap per call"
              onBlur={(event) => void savePrefs('cap', { spend_cap_call_usd: event.target.value === '' ? null : Number(event.target.value) })}
            />
          </Row>
          <Row label="Most per day" help={`Spent today $${(spend.today_usd ?? 0).toFixed(2)}, this month $${(spend.month_usd ?? 0).toFixed(2)}.`}>
            <Input
              className="miran-input miran-mono"
              type="number"
              min="0"
              step="0.5"
              placeholder={String(spend.day_cap_default ?? '')}
              defaultValue={prefs.spend_cap_day_usd ?? ''}
              aria-label="Spend cap per day"
              onBlur={(event) => void savePrefs('daycap', { spend_cap_day_usd: event.target.value === '' ? null : Number(event.target.value) })}
            />
          </Row>
        </Group>
      ) : null}

      {engine.found ? (
        <Group title="Voices" desc="Kokoro, the built-in voice, runs on this Mac. Gemini and ElevenLabs voices go over the internet with your key.">
          <Row label="Cloud voices" help="When the agent may pick a cloud voice." stacked>
            <SegmentedControl
              id="miran-cloud-voices"
              label="Cloud voices"
              value={prefs.cloud_voices ?? 'ask'}
              disabled={Boolean(busy)}
              options={[
                { value: 'ask', label: 'Only when I ask' },
                { value: 'allowed', label: 'Allowed' },
              ]}
              onChange={(next) => void savePrefs('cloud', { cloud_voices: next })}
            />
          </Row>
          <Row
            label="Built-in voice"
            help={voice.installed
              ? 'Installed: 28 English voices, offline and free.'
              : `One download of ${size(voice.total_bytes ?? 0)}; a cut connection continues where it stopped.`}
          >
            {voice.installed ? (
              <State ok>installed</State>
            ) : voice.download && voice.download.running ? (
              <div className="miran-inline">
                <span className="miran-spin" aria-label="Downloading" />
                <span className="miran-note">
                  {size(voice.download.done ?? 0)} / {size(voice.download.total ?? 0)}
                  {voice.download.eta_s ? ` · ${Math.max(1, Math.round(voice.download.eta_s / 60))} min left` : ''}
                </span>
                <Button size="sm" variant="outline" onClick={() => void run('cancel', () => api.cancelVoice())}>Cancel</Button>
              </div>
            ) : (
              <div className="miran-inline">
                <Button size="sm" variant="outline" disabled={Boolean(busy)} onClick={() => void run('download', () => api.downloadVoice())}>Download</Button>
                {voice.download && voice.download.error ? <span className="miran-note">{voice.download.error}</span> : null}
              </div>
            )}
          </Row>
        </Group>
      ) : null}

      {engine.found ? (
        <Group title="Viewer" desc="How new viewers open; each viewer still remembers your changes.">
          <Row label="Theme" stacked>
            <SegmentedControl
              id="miran-viewer-theme"
              label="Viewer theme"
              value={(prefs.viewer && prefs.viewer.theme) || 'auto'}
              disabled={Boolean(busy)}
              options={[{ value: 'auto', label: 'Auto' }, { value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}
              onChange={(next) => void savePrefs('viewer-theme', { viewer: { theme: next } })}
            />
          </Row>
          <Row label="Time" stacked>
            <SegmentedControl
              id="miran-viewer-units"
              label="Viewer time units"
              value={(prefs.viewer && prefs.viewer.units) || 'tc'}
              disabled={Boolean(busy)}
              options={[{ value: 'tc', label: 'Timecode' }, { value: 'frames', label: 'Frames' }]}
              onChange={(next) => void savePrefs('viewer-units', { viewer: { units: next } })}
            />
          </Row>
          <Row label="Preview" stacked>
            <SegmentedControl
              id="miran-viewer-preview"
              label="Viewer preview quality"
              value={(prefs.viewer && prefs.viewer.preview) || 'draft'}
              disabled={Boolean(busy)}
              options={[{ value: 'draft', label: 'Draft' }, { value: 'full', label: 'Full' }]}
              onChange={(next) => void savePrefs('viewer-preview', { viewer: { preview: next } })}
            />
          </Row>
        </Group>
      ) : null}

      {engine.found ? (
        <Group title="Feedback and updates" desc="Miran ships better when issues come back; nothing is sent unless sharing is on.">
          <Row label="Share feedback" help={feedback.decided_by === 'MIRAN_FEEDBACK' || feedback.decided_by === 'DO_NOT_TRACK' ? `Set by ${feedback.decided_by} in the environment.` : 'The agent’s short issue reports go to the Miran team.'}>
            <Switch
              checked={Boolean(feedback.share)}
              label="Share feedback"
              disabled={Boolean(busy) || feedback.decided_by === 'MIRAN_FEEDBACK' || feedback.decided_by === 'DO_NOT_TRACK'}
              onChange={(next) => void savePrefs('feedback', { share_feedback: next })}
            />
          </Row>
          <Row label="Update automatically" help={update.npm_install ? 'Checks npm every few hours; the next session uses a new version.' : 'This is a developer build: it does not update itself.'}>
            <Switch
              checked={Boolean(update.auto)}
              label="Update automatically"
              disabled={Boolean(busy) || !update.npm_install || update.decided_by === 'MIRAN_AUTO_UPDATE'}
              onChange={(next) => void savePrefs('update', { auto_update: next })}
            />
          </Row>
          <Row
            label="Version"
            help={`Installed ${update.installed ?? status.version ?? 'unknown'}${update.latest ? ` · latest on npm ${update.latest}` : ''}${update.error ? ` · ${update.error}` : ''}`}
          >
            {update.npm_install ? (
              <Button size="sm" variant="outline" disabled={Boolean(busy)} onClick={() => void run('update-now', () => api.updateNow())}>Update now</Button>
            ) : (
              <span className="miran-note">no self-update</span>
            )}
          </Row>
        </Group>
      ) : null}

      <Group title="Skills" desc="Loaded from this plugin and offered to the agent by name, so /miran-… and model-side loading use the same files.">
        <div className="miran-chips">
          {status.harness && status.harness.skills && status.harness.skills.length > 0
            ? status.harness.skills.map((name) => <Pill key={name}>{name}</Pill>)
            : <span className="miran-note">No skills found under plugin-deepseek/skills yet.</span>}
        </div>
      </Group>

      <div className="miran-footer">
        <Button
          size="sm"
          variant="primary"
          disabled={!engine.found || busy === 'viewer'}
          onClick={() => void run('viewer', async () => {
            const result = await api.viewer()
            if (result && result.url) window.open(result.url, '_blank', 'noopener')
            else if (result && result.error) throw new Error(result.error)
          })}
        >
          Open live viewer
        </Button>
        <Button size="sm" variant="outline" disabled={!engine.found} onClick={() => window.open('/miran/settings', '_blank', 'noopener')}>
          Miran's own settings
        </Button>
        <span className="miran-note">Both open on this computer only.</span>
      </div>
    </div>
  )
}

/**
 * One API key row with save, remove and test.
 * @param {object} props - row props.
 * @returns {import('react').ReactElement} the row.
 */
function KeyRow({ row, busy, run }) {
  const [value, setValue] = useState('')
  const [test, setTest] = useState(null)
  const set = row.harness && row.harness.configured ? 'harness' : row.set ? 'engine' : 'none'

  return (
    <div className="miran-key">
      <div className="miran-key-head">
        <span className="miran-key-name">{row.name}</span>
        <State ok={set !== 'none'}>{set === 'none' ? 'not set' : set === 'harness' ? 'set in dsh' : 'set in Miran'}</State>
        {row.set && row.hint ? <span className="miran-mono miran-muted">{row.hint}</span> : null}
        {row.source === 'environment' ? <Pill>{`from ${row.env}`}</Pill> : null}
      </div>
      <div className="miran-key-row">
        <Input
          className="miran-input miran-mono"
          type="password"
          autoComplete="off"
          spellCheck="false"
          aria-label={`${row.name} API key`}
          placeholder={set === 'none' ? `Paste your ${row.name} key` : 'Replace the key…'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && value.trim()) {
              void run(`key:${row.id}`, async () => {
                const next = await api.saveKey(row.id, value.trim())
                setValue('')
                return next
              })
            }
          }}
        />
        <Button
          size="sm"
          variant="primary"
          disabled={Boolean(busy) || !value.trim()}
          onClick={() => void run(`key:${row.id}`, async () => {
            const next = await api.saveKey(row.id, value.trim())
            setValue('')
            return next
          })}
        >
          Save
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={Boolean(busy) || set === 'none'}
          onClick={() => void run(`test:${row.id}`, async () => {
            const result = await api.testKey(row.id)
            setTest(result)
          })}
        >
          Test
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={Boolean(busy) || (set === 'none' && !row.set)}
          title="Forget this key in both stores"
          onClick={() => void run(`remove:${row.id}`, () => api.removeKey(row.id))}
        >
          Remove
        </Button>
      </div>
      {test ? (
        <div className="miran-key-note">
          {test.busy ? 'Checking the key…' : test.ok
            ? `Works${test.models && test.models.length ? ` · ${test.models.length} models listed` : ''}${test.image_model ? ` · images use ${test.image_model}` : ''}`
            : test.message || 'The key did not work.'}
        </div>
      ) : null}
      <div className="miran-key-note">
        {row.env}
        {row.harness && row.harness.writable ? '' : ' · the dsh credential store is read-only here, so only Miran keeps it'}
      </div>
    </div>
  )
}
