// One stylesheet for the Miran section and tab, drawn with dsh's own design
// tokens so light and dark follow the shell.
import { useEffect } from 'react'

const CSS = `
.miran-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 4px 0 24px;
  font-size: 13px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}
.miran-hero { display: flex; align-items: center; gap: 12px; }
.miran-mark { width: 40px; height: 40px; border-radius: 12px; flex: none; }
.miran-hero-copy { display: flex; flex-direction: column; min-width: 0; }
.miran-title { font-size: 15px; font-weight: 600; line-height: 22px; margin: 0; }
.miran-sub { color: var(--dsw-alias-label-tertiary); font-size: 12px; }
.miran-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-left: auto; justify-content: flex-end; }
.miran-card {
  border: 0.5px solid var(--dsw-alias-settings-card-stroke);
  border-radius: var(--dsw-radius-xl);
  background: var(--dsw-alias-settings-card-fill);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.miran-card-head { display: flex; align-items: center; gap: 8px; }
.miran-card-title { font-size: 14px; font-weight: 500; }
.miran-card-copy { color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 19px; }
.miran-card-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 2px; }
.miran-group {
  border: 0.5px solid var(--dsw-alias-settings-card-stroke);
  border-radius: var(--dsw-radius-xl);
  background: var(--dsw-alias-settings-card-fill);
  overflow: hidden;
}
.miran-group-head { padding: 12px 16px 6px; display: flex; flex-direction: column; gap: 2px; }
.miran-group-title { font-size: 14px; font-weight: 500; }
.miran-group-desc { color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 19px; }
.miran-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  border-top: 0.5px solid var(--dsw-alias-border-l2);
}
.miran-row.stacked { grid-template-columns: minmax(0, 1fr); align-items: stretch; }
.miran-row-label { font-size: 13px; }
.miran-row-help { color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 18px; margin-top: 1px; }
.miran-row-control { display: flex; align-items: center; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
.miran-row.stacked .miran-row-control { justify-content: flex-start; }
.miran-control { width: 100%; }
.miran-input { width: 100%; }
.miran-input input { width: 100%; }
.miran-mono {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11.5px;
}
.miran-inline { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.miran-muted { color: var(--dsw-alias-label-tertiary); }
.miran-error {
  border: 0.5px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-md);
  padding: 8px 10px;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-state-business-primary);
}
.miran-note { color: var(--dsw-alias-label-tertiary); font-size: 11.5px; line-height: 17px; }
.miran-select {
  height: 32px;
  min-width: 132px;
  padding: 0 26px 0 10px;
  border-radius: var(--dsw-radius-md);
  border: 0.5px solid var(--dsw-alias-border-l3);
  background: var(--dsw-alias-settings-card-fill);
  color: var(--dsw-alias-label-primary);
  font-size: 12.5px;
  font-family: inherit;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--dsw-alias-label-tertiary) 50%), linear-gradient(135deg, var(--dsw-alias-label-tertiary) 50%, transparent 50%);
  background-position: calc(100% - 13px) 14px, calc(100% - 9px) 14px;
  background-size: 4px 4px, 4px 4px;
  background-repeat: no-repeat;
}
.miran-select:focus-visible { outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color); outline-offset: 1px; }
.miran-key { display: flex; flex-direction: column; gap: 6px; padding: 12px 16px; border-top: 0.5px solid var(--dsw-alias-border-l2); }
.miran-key:first-of-type { border-top: none; }
.miran-key-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.miran-key-name { font-weight: 500; }
.miran-key-row { display: flex; align-items: center; gap: 8px; }
.miran-key-row .miran-input { flex: 1; }
.miran-key-note { color: var(--dsw-alias-label-tertiary); font-size: 11.5px; line-height: 17px; }
.miran-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 12px 16px 14px; border-top: 0.5px solid var(--dsw-alias-border-l2); }
.miran-banner { display: flex; flex-direction: column; gap: 6px; border-radius: var(--dsw-radius-xl); padding: 14px 16px; border: 0.5px solid var(--dsw-alias-border-l3); background: var(--dsw-alias-bg-skeleton); }
.miran-banner.signin { border-color: var(--dsw-alias-state-business-primary); }
.miran-banner-title { font-size: 13.5px; font-weight: 600; }
.miran-steps { margin: 0; padding-left: 18px; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 19px; }
.miran-footer { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding-top: 2px; }
.miran-spin { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid var(--dsw-alias-border-l3); border-top-color: var(--dsw-alias-state-business-primary); animation: miran-spin 0.8s linear infinite; }
@keyframes miran-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .miran-spin { animation-duration: 2.4s; } }
.miran-tab { display: flex; flex-direction: column; gap: 12px; padding: 4px 0 16px; }
.miran-tab-row { display: flex; align-items: center; gap: 10px; }
`

const ID = 'miran-fann-styles'

/** Add the stylesheet once per document. */
export function ensureStyles() {
  if (typeof document === 'undefined') return () => {}
  const existing = document.getElementById(ID)
  if (existing) return () => {}
  const style = document.createElement('style')
  style.id = ID
  style.textContent = CSS
  document.head.append(style)
  return () => style.remove()
}

/** Install the stylesheet for the lifetime of the plugin. */
export function useStyles() {
  useEffect(() => {
    const remove = ensureStyles()
    return remove
  }, [])
}
