---
name: miran-dsh-polish
description: "The last pass on a Miran Fann film: content, motion, type, colour, sound, export in that order. Measured critique thresholds, contact sheets and what to look at, the one-fix-at-a-time repair loop, scopes and looks, the finishing pass (vignette, bloom, grain), per-platform export settings, captions and chapters, and the last-mile failures that ship broken films. Use before calling a Miran film finished and whenever an export differs from the preview."
whenToUse: "The end of every Miran film - and any time a render, an export, a caption or a grade looks wrong."
---

# Finish it

Finishing is not a coat of paint. It is a series of decisions made in a fixed
order, because a colour decision made before the motion is final is a decision
you will make twice.

## The order

1. **Content** — does every shot say something the film needs? Cut the rest.
2. **Motion** — arcs, eases, overlap, holds. `critiqueMotion` first.
3. **Type** — read times, lockups, safe areas. `critiqueLayout` first.
4. **Colour** — one grade, one accent, contrast measured.
5. **Sound** — music, events, levels, silence.
6. **Export** — settings per platform, then the file checked.

Never reorder 1-2 after 4-5: a grade hides nothing, and a mix cannot fix a
shot that is not needed.

## The measured loop

```text
renderContactSheet {frames:"auto"}     → look
critiqueLayout                          → collisions, safe area, read-in-motion
critiqueMotion                          → arcs, eases, lockstep, follow-through
inspectMotionActivity                   → are there dead stretches?
critiqueEdit {checks:["frames","jump","eye","beat","audio","captions","flashes"]}
→ fix ONE thing → re-render → re-critique
```

What a finished film usually looks like on these instruments, and why each
matters:

- **`critiqueMotion` in the high 80s or better.** Below that, the findings
  name moves that stop dead, travel in straight lines or start in lockstep:
  the things that make motion read as computed.
- **`critiqueLayout` with no collisions, nothing too small and nothing past the
  safe area.** Its `sparse` and `empty-area` notes are judgements, not errors:
  a calm direction leaves space on purpose; an accidental empty frame is a
  bug (`miran-dsh-design`).
- **`inspectMotionActivity` without long dead runs.** A still frame held for
  reading is fine for about a second; longer reads as a slide unless it is a
  deliberate hold on a full-frame idea.
- **`critiqueEdit` with no flash frames, black frames or jump cuts,** and the
  loudness within about 1 LU of the target.
- **A first frame that already shows the hook, and a last frame that holds.**

One fix per iteration. Changing three things makes the next critique
unreadable, which is how films ship with three new bugs.

## Colour

- Measure before grading: `grade {action:"scopes", frame}` gives luma p1/p50/p99,
  clipping, saturation and a white-balance cast.
- A typical film sits with its median luma around 0.42; a dark direction
  (neon, cinema) nearer 0.3, a bright one (candy, editorial) nearer 0.55.
  What matters is that the film is consistent: a film that swings between the
  two reads as two films.
- One look, applied once: `grade {action:"look", name:"teal-orange"|"bleach"|
  "film"|"mono"|"fade"|"warm"|"cool"}`. A second look is a mistake, not a
  refinement.
- `grade {action:"match", to:"<layer>"}` moves a layer's colour to another; use
  it across generated shots and footage, not across designed graphics.
- Contrast: two colours in the same frame should clear 3:1 for display type and
  4.5:1 for body. The palette in the metrics tells you the top-two ratio.

## The finishing pass

`kit.finish({vignette, bloom, grain})` last, once:

- vignette 0.15-0.3: focuses the frame without a visible ring.
- bloom only when there are highlights worth blooming (a screen, a light).
- grain: `grainHold:0` is a static texture (cheap), `3` is film flicker
  (expensive). A 4-minute film with per-frame grain came out at 531 MB; do not.
- A subtle `sheen` on one surface beats a glow on everything.

## Export

`renderVideo` presets, by destination:

| destination | call |
|---|---|
| review / draft | `quality:"draft"` (half size, fast) |
| web, social | `quality:"web"` (x264 tuned for flat animation, ~1/3 the size) |
| YouTube, master | `quality:"high"` (H.264 High, plays everywhere) |
| gradients, glow, dark | `quality:"max"` (HEVC 10-bit, dithered) |
| archive, finishing | `quality:"master"` (ProRes 422 HQ, `.mov`) |
| alpha | `quality:"master"` on a transparent composition (ProRes 4444) |

`deliver {to:[...]}` produces every platform's shape in one job, with loudness
normalised, captions, chapters and a thumbnail. Use it for anything that ships
to more than one place.

Captions: `deliver {captions:"burn"|"srt"|"vtt"|"both"|"none"}`. Burned
captions must respect `kit.safe({platform})` and sit above the app's own UI on
9:16. `footage area` tells you whether a caption will read over a shot.

## Recipes

Each runs after the look script (`miran-dsh-directions`), whose composition is
named `Main`.

### A measured grade

```js
const scopes = miran.grade({action: "scopes", composition: "Main", frame: 60});
log(JSON.stringify(scopes).slice(0, 400));
miran.grade({composition: "Main", action: "look", name: "film", strength: 0.6});
return "graded";
```

### The finishing pass, then the file

```js
kit.finish({vignette: 0.22, grain: 0});
return "finished";
```

Then export with a direct tool call (renders and deliveries cannot run inside
`runScript`):

```text
renderVideo {composition: "Main", out: "renders/final.mp4", quality: "high"}
checkExport {path: "renders/final.mp4"}
```

A long render returns a `job`: poll `jobStatus` until it is done.

### Every platform at once

```text
deliver {composition: "Main", to: ["youtube", "shorts", "reels", "x"], captions: "both", thumbnail: true, loudness: -14}
```

## Check it

- `checkExport {path}` on every exported file: frames decoded from the file
  itself, duration, size, bitrate, fps, audio and loudness.
- `compareImages` between the preview frame and the exported frame when they
  disagree.
- `inspectRenderGraph` when a frame renders on the CPU fallback and takes
  minutes.
- `listRenderCapabilities` before promising a codec or an effect.

## Failures you will hit

- `renderVideo` never overwrites: a second render to the same `out` is written
  beside it as `final-2.mp4`, then `final-3.mp4`. Read the path from the
  result, and run `checkExport` on that path, or you will be checking the old
  file.
- `quality:"master"` needs a `.mov` out path; `.mp4` is rejected.
- A transparent composition exported to H.264 loses alpha silently. Use ProRes
  4444.
- `checkExport` on a file with no audio reports `audio:false`, not an error —
  if the composition has audio layers, `renderVideo` muxes them; `audio:false`
  means the mux failed.
- Grain at every frame multiplies file size; `grainHold` 3 or 0.
- A draft render is half size by default; comparing it to a full-size export
  pixel-for-pixel will always differ.
- `deliver` does not change the project; it renders files. Re-running it
  overwrites the same outputs.

## What the study measured

Finishing is judged by the critique tools, not by this corpus; the study's
useful numbers for the last pass are:

- mean luma separates the kinds cleanly: explainers 205, UI promos 190, logo
  stings 153, studio reels 70, kinetic type 58;
- a typical frame has 14% of its pixels moving, and the busiest frames 46%;
- the longest hold in a film has a median of 1.17 s, so a frozen end card
  longer than that is a decision to defend, not a default.

Palette and contrast were not measurable reliably (the extractor failed on
most films), so grade by scope, not by a table.
