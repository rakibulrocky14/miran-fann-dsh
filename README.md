<p align="center"><img src="assets/logo.svg" width="120" alt="Miran Fann"></p>

# Miran Fann for DeepSeek Harness

Motion graphics on this Mac, from a dsh session. The plugin starts the Miran
engine, hands its tools to the model as `mcp__miran__*`, and adds a **Miran**
section to dsh Settings.

```text
dsh session ──tool call──► dsh mcp-client ──stdio──► ~/.miran/bin/miran mcp
     ▲                                                     │
     └────────────── frame, video, project JSON ◄───────────┘
```

## Install

The engine comes first; the plugin only connects to it.

```sh
npx miran-fann setup        # the engine in ~/.miran/bin/miran
```

Setup adds the plugin to the `web` profile by itself when dsh is installed,
and every automatic update of the engine brings the plugin of the same version.
To add it by hand, use **Plugins** in the dsh web sidebar with the address
below, or:

```sh
dsh plugin --profile web add github:rakibulrocky14/miran-fann-dsh#v0.1.6-beta.1
```

dsh 0.2.1-rc.2 or newer is needed (`npm i -g @deepseek-ai/dsh@next`).

Restart `dsh web` after the install. `dsh --profile web --dump-config` shows
the `miran-fann` layer when it loaded.

## Sign in

Miran's tools run only for a signed-in install. Open **Settings → Miran**: the
page shows the account, the engine version, the GPU backend and whether the
tools are connected. **Sign in** runs the real flow (the browser opens
miranfann.com, the engine receives the code); **Sign out** ends it. The plugin
never fakes the sign-in and never works around it.

## Settings

Everything on **Settings → Miran** is read from and written to the engine, so
dsh, Claude Code and Codex agree:

| Part | What it does |
| --- | --- |
| Account | Who is signed in; sign in and out through the engine |
| Engine | Path, version, GPU, setup command when missing |
| Workspace | Folder the engine reads and writes |
| Tools | Tool surface (default, lean, full); the engine's own choice |
| dsh tools | Connected state, reconnect |
| Live viewer | Start the viewer, viewer theme, time units, preview quality |
| Render defaults | Export quality, file-size limit, default voice |
| API keys | Google Gemini, ElevenLabs, OpenRouter, fal, Replicate |
| Generation | Image, video and draft models, per-call and per-day caps, spend so far |
| Voices | Default voice, cloud voices, built-in voice |
| Feedback and updates | Share feedback, auto-update, version, update now |
| Skills | The skills this plugin gives the agent |

Keys go to dsh's credential store **and** to Miran's own key store, as secret
fields. The page only ever shows the last four characters. An environment
variable with the same name wins over both.

The **Built-in plugins → Miran** tab shows the same state as a card, with
**Open live viewer**.

## Tools and skills

The model sees the engine's tools as `mcp__miran__<tool>`. The default list is
the engine's own `MIRAN_TOOLS_DEFAULT`; **Settings → Tools** offers the engine
choice, `lean` (about 30 tools, the rest through `runScript`) and `full` (every
tool in the schema).

Skills ship in `skills/<name>/SKILL.md` and load into dsh's skill registry, so
`/miran-...` and model-side loading use the same files. Start with
`miran-dsh-studio`; it names the others.

| Skill | Teaches |
| --- | --- |
| `miran-dsh-studio` | The order of work, research, the beat sheet, the handoff map |
| `miran-dsh-directions` | Choosing a visual direction per brief, never a house look |
| `miran-dsh-reference` | Studying reference videos and turning them into the film's own timing and motion |
| `miran-dsh-design` | Hierarchy, readable sizes, depth, real UI |
| `miran-dsh-type` | Setting, revealing and reading type |
| `miran-dsh-motion` | Eases, timing, holds, the motion library |
| `miran-dsh-cuts` | Shot length, cutting, transitions |
| `miran-dsh-camera` | Depth, pushes, 3D screens, rack focus |
| `miran-dsh-sound` | Music, events, levels, the drop |
| `miran-dsh-polish` | Finishing, grade, export, captions |
| `miran-dsh-launch` | The arc of a launch film |
| `miran-dsh-explainer` | The structure of an explainer |
| `miran-dsh-social` | 9:16, hooks, captions, loops |

## Configuration

Profile settings live in `cordis.patch.yml`; every field has a default.

| Field | Default | Meaning |
| --- | --- | --- |
| `enginePath` | `""` | Engine binary; empty means `~/.miran/bin/miran`, then `PATH` (`MIRAN_BINARY` also counts) |
| `workspace` | `""` | Folder the engine reads and writes; empty leaves it to the engine |
| `tools` | `"default"` | `default` follows `MIRAN_TOOLS_DEFAULT`, `lean` lists about 30 tools, `full` lists all |
| `viewer` | `true` | Start the live viewer with the engine |
| `viewerPort` | `47800` | Preferred viewer port; the next free one when taken |

## Troubleshooting

**"Miran engine not found"** — run `npx miran-fann setup`, or set `enginePath`
to the binary. The settings page prints the path it looked for.

**Tools connected, but a call says sign-in is required** — open **Settings →
Miran** and sign in; the engine gates every tool call on the account.

**No Miran section in Settings** — the browser half did not load. Check that
`dsh --profile <name> --dump-config` lists `miran-fann`, then restart `dsh web`
and reload the page.

**A render returns no image** — the engine sends images as MCP image parts; dsh
shows them in the session. If a call returns text only, the engine refused the
render and the message says why.

**The viewer will not open** — the port is taken. Change `viewerPort`, or stop
the other viewer.
