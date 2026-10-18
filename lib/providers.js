// The five API-key providers the engine knows, with the environment names it
// reads. Kept in step with Provider::ALL in crates/miran-protocol.
export const PROVIDERS = [
  { id: 'gemini', env: 'GEMINI_API_KEY', name: 'Google Gemini' },
  { id: 'elevenlabs', env: 'ELEVENLABS_API_KEY', name: 'ElevenLabs' },
  { id: 'openrouter', env: 'OPENROUTER_API_KEY', name: 'OpenRouter' },
  { id: 'fal', env: 'FAL_KEY', name: 'fal' },
  { id: 'replicate', env: 'REPLICATE_API_TOKEN', name: 'Replicate' },
]

/**
 * The provider record for an engine id.
 * @param {string} id - engine provider id.
 * @returns {{ id: string, env: string, name: string } | undefined} the record.
 */
export function providerById(id) {
  return PROVIDERS.find((provider) => provider.id === id)
}
