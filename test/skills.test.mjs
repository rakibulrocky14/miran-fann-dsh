// The skill loader: frontmatter parsing, folder discovery, registration shape.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { invocationOf, loadSkills, parseSkillMarkdown, registerSkills } from '../src/host/skills.js'

const here = dirname(fileURLToPath(import.meta.url))
const fixtures = join(here, 'fixtures', 'skills')

test('parseSkillMarkdown reads folded and plain frontmatter', () => {
  const text = `---
name: demo
description: >-
  one line
  after another
user-invocable: false
disable-model-invocation: true
---

Body text.
`
  const { data, body } = parseSkillMarkdown(text)
  assert.equal(data.name, 'demo')
  assert.equal(data.description, 'one line after another')
  assert.equal(data['user-invocable'], false)
  assert.equal(data['disable-model-invocation'], true)
  assert.equal(body, 'Body text.')
})

test('parseSkillMarkdown handles quoted values and CRLF input', () => {
  const { data, body } = parseSkillMarkdown('---\r\nname: "demo"\r\ndescription: \'it is fine\'\r\n---\r\n\r\nHello\r\n')
  assert.equal(data.name, 'demo')
  assert.equal(data.description, 'it is fine')
  assert.equal(body, 'Hello')
})

test('parseSkillMarkdown leaves a file without frontmatter alone', () => {
  const { data, body } = parseSkillMarkdown('# Title\n\nText\n')
  assert.deepEqual(data, {})
  assert.equal(body, '# Title\n\nText')
})

test('loadSkills finds the fixture and folds its description', async () => {
  const skills = await loadSkills(fixtures)
  assert.equal(skills.length, 1)
  const [skill] = skills
  assert.equal(skill.name, 'hello-miran')
  assert.match(skill.description, /^A fixture skill that proves the loader reads SKILL\.md frontmatter, folds a multi-line description/)
  assert.equal(skill.whenToUse, 'When a test needs a real skill file.')
  assert.match(skill.content, /^# Hello, Miran/)
  assert.ok(skill.path.endsWith('SKILL.md'))
})

test('loadSkills returns nothing for a missing directory', async () => {
  assert.deepEqual(await loadSkills(join(fixtures, 'nope')), [])
})

test('invocationOf defaults both surfaces on and honours the opt-outs', () => {
  assert.deepEqual(invocationOf({}), { modelInvocable: true, userInvocable: true })
  assert.deepEqual(invocationOf({ 'user-invocable': false }), { modelInvocable: true, userInvocable: false })
  assert.deepEqual(invocationOf({ 'disable-model-invocation': true }), { modelInvocable: false, userInvocable: true })
})

test('registerSkills hands each skill to ctx.skills.register through an effect', async () => {
  const registrations = []
  const effects = []
  const ctx = {
    skills: { register: (skill) => { registrations.push(skill); return () => {} } },
    effect: (fn, label) => { effects.push(label); fn() },
  }
  const names = await registerSkills(ctx, fixtures, { info() {}, warn() {} })
  assert.deepEqual(names, ['hello-miran'])
  assert.deepEqual(effects, ['miran.skill(hello-miran)'])
  assert.equal(registrations.length, 1)
  assert.equal(registrations[0].name, 'hello-miran')
  assert.equal(registrations[0].source, 'bundled')
  assert.equal(registrations[0].provider, 'miran')
  assert.deepEqual(registrations[0].invocation, { modelInvocable: true, userInvocable: true })
  assert.equal(registrations[0].resourceBase.kind, 'directory')
})

test('registerSkills is quiet when the composition has no skill registry', async () => {
  assert.deepEqual(await registerSkills({}, fixtures, { info() {}, warn() {} }), [])
})

// Built from pieces so this file does not trip the staging script's own scan.
const personalData = new RegExp(['/Us' + 'ers/', '@gm' + 'ail', 'mdr' + 'ir'].join('|'))

test('the bundled miran-dsh skills all load, and miran-dsh-reference is among them', async () => {
  const skills = await loadSkills(join(here, '..', 'skills'))
  const names = skills.map((skill) => skill.name)
  assert.ok(names.includes('miran-dsh-reference'), `skills found: ${names.join(', ')}`)
  for (const skill of skills) {
    assert.match(skill.name, /^miran-dsh-[a-z]+$/, skill.path)
    assert.ok(skill.description.length <= 500, `${skill.name} description is over dsh's 500-character catalog limit`)
    assert.ok(skill.content.length > 500, `${skill.name} has no real body`)
    assert.doesNotMatch(skill.content, personalData, `${skill.name} carries personal data`)
  }
})

test('miran-dsh-reference calls only real reference actions and params', async () => {
  const [skill] = (await loadSkills(join(here, '..', 'skills'))).filter((s) => s.name === 'miran-dsh-reference')
  const actions = new Set(['add', 'list', 'sheets', 'frame', 'note', 'release', 'remove', 'guide', 'analyze', 'compare', 'recipe'])
  const params = new Set(['action', 'source', 'video', 'title', 'mode', 'start', 'end', 'interval', 'page', 'pages', 'text', 'against', 'composition', 'id', 'opacity', 'remove', 'out', 'layout', 'read_text'])
  const calls = [...skill.content.matchAll(/^reference (\{.*\})$/gm)].map((m) => JSON.parse(m[1]))
  assert.ok(calls.length >= 10, 'the skill shows its reference calls')
  for (const call of calls) {
    assert.ok(actions.has(call.action), `unknown action ${call.action}`)
    for (const key of Object.keys(call)) assert.ok(params.has(key), `unknown param ${key} in ${JSON.stringify(call)}`)
  }
})
