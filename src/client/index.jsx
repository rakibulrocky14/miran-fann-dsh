// Client half of miran-fann-dsh: a Miran section in Settings plus a Plugins tab.
import { MiranPluginsTab } from './MiranPluginsTab.jsx'
import { MiranSection } from './MiranSettings.jsx'
import { ensureStyles } from './styles.js'

export const inject = ['slots']

/**
 * Register the section and the tab.
 * @param {import('@deepseek-ai/cordis').Context} ctx - client root context.
 * @returns {void}
 */
export function apply(ctx) {
  ctx.effect(() => ensureStyles(), 'miran: styles')
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'miran',
    order: 16,
    label: 'Miran',
  }, MiranSection))
  ctx.slots.inject('settings.plugins.tab', () => ctx.slots.register({
    name: 'settings.plugins.tab',
    // The tab only shows inside this plugin's own row, which dsh addresses by
    // the Loader entry id from cordis.patch.yml, not by package name.
    id: 'miran-fann',
    order: 16,
    label: 'Miran',
  }, MiranPluginsTab))
}
