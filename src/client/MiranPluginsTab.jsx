// The Miran card inside Settings → Plugins.
//
// It answers "is Miran ready?" and offers the two actions a person needs from
// here (sign in, open the viewer); the full set lives in Settings → Miran.
import { Button, Pill } from '@deepseek-ai/dsh-client-ui-primitives'
import logoUrl from '../../assets/logo.svg'
import { api } from './api.js'
import { useMiran } from './MiranSettings.jsx'
import { useStyles } from './styles.js'

/**
 * Render the Plugins tab.
 * @returns {import('react').ReactElement} the tab.
 */
export function MiranPluginsTab() {
  useStyles()
  const { status, loadError, busy, actionError, run } = useMiran()

  if (!status) {
    return (
      <div className="miran-tab">
        <div className="miran-tab-row">
          <img className="miran-mark" src={logoUrl} alt="" />
          <div>
            <div className="miran-title">Miran Fann</div>
            <div className="miran-sub">{loadError || 'Reading the Miran engine…'}</div>
          </div>
        </div>
      </div>
    )
  }

  const engine = status.engine ?? {}
  const account = status.account ?? {}
  const gpu = status.gpu

  return (
    <div className="miran-tab">
      <div className="miran-tab-row">
        <img className="miran-mark" src={logoUrl} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div className="miran-title">Miran Fann</div>
          <div className="miran-sub">GPU motion graphics on this Mac, as dsh tools and skills.</div>
        </div>
        <div className="miran-pills">
          {engine.found ? <Pill active>{status.version ? `v${status.version}` : 'engine found'}</Pill> : <Pill>engine missing</Pill>}
          <Pill active={Boolean(account.signed_in)}>{account.signed_in ? 'signed in' : 'sign-in needed'}</Pill>
        </div>
      </div>

      {actionError ? <div className="miran-error">{actionError}</div> : null}

      {!engine.found ? (
        <div className="miran-card">
          <div className="miran-card-title">Install the engine</div>
          <div className="miran-card-copy">
            Run <span className="miran-mono">{engine.setup ?? 'npx miran-fann setup'}</span> once in a terminal, then reopen this tab.
          </div>
        </div>
      ) : (
        <div className="miran-card">
          <div className="miran-card-copy">
            {engine.error
              ? engine.error
              : `${gpu && gpu.status ? `GPU · ${gpu.engine ?? gpu.backend ?? 'GPU'}: ${gpu.status.startsWith('AVAILABLE') ? 'available' : 'off'} · CPU · Flint: ${gpu.flint ?? 'available'}` : 'Engines: reading…'} · ${status.tools && status.tools.mounted ? 'tools connected' : 'tools off'}`}
          </div>
          <div className="miran-card-actions">
            {account.signed_in ? (
              <Button size="sm" variant="outline" disabled={Boolean(busy)} onClick={() => void run('signout', () => api.signOut())}>Sign out</Button>
            ) : (
              <Button size="sm" variant="primary" disabled={Boolean(busy) || account.signing_in} onClick={() => void run('signin', () => api.signIn())}>
                {account.signing_in ? 'Waiting for your browser…' : 'Sign in with Google'}
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              disabled={Boolean(busy) || !engine.found}
              onClick={() => void run('viewer', async () => {
                const result = await api.viewer()
                if (result && result.url) window.open(result.url, '_blank', 'noopener')
                else if (result && result.error) throw new Error(result.error)
              })}
            >
              Open live viewer
            </Button>
          </div>
          <div className="miran-note">
            {account.signed_in
              ? `${account.name ? `${account.name} · ` : ''}${account.email ?? ''}`
              : 'Miran Fann asks each person to sign in once with Google; this plugin shows that check and never bypasses it.'}
          </div>
        </div>
      )}

      <div className="miran-note">API keys, render defaults, voices and updates live in Settings → Miran.</div>
    </div>
  )
}
