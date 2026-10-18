---
name: miran-dsh-studio
description: "The Miran Fann studio method, end to end - brief, a visual direction chosen for this brief (never a house look), treatment, a beat sheet in frames, the look script, building beat by beat in runScript with kit pieces and real product UI, looking and measuring with the critique tools, sound, finish and export. Carries the order of work, the handoff map to the other miran-dsh skills, and the habits that make an AI-made film look computed or the same as the last one. Start here for any video."
whenToUse: "The first skill to load for any Miran film: launch, explainer, reel, title, social cut. Also when a film is half-built and drifting, or starts to look like the last one."
---

# The studio

Miran is a motion-graphics engine that a model drives through tools, not
through an editor. There is no timeline to nudge and no colleague to say the
cut is early. What there is instead is a renderer that tells the truth about a
frame and a set of measurements. This skill is the order of work that turns a
brief into a finished film without losing the plot, and without making the
same film twice.

## What you write before building

Each of these is short. Together they are the film; the build is execution.

1. **Brief**: one paragraph. Product, audience, the single message, format
   (size, fps, duration), brand (colour, typeface, tone), what must be shown.
2. **Direction card**: the visual direction chosen for this brief, with its
   palette source, type pair, layout grammar, motion personality, transition
   vocabulary, opening, signature moment and end card. How to choose, and the
   nine directions to choose from, are in `miran-dsh-directions`. This is the
   step that keeps every film from looking like the last one.
3. **Treatment**: three sentences. The idea, the visual conceit, the ending.
   If the treatment could describe any product, it is not a treatment yet.
4. **Beat sheet**: the beats in frames (below). This is the edit.
5. **Sound plan**: where the drop is, which two or three moments get a sound,
   whether there is a voice (`miran-dsh-sound`).

## The order of work

```text
brief -> direction card (same-film check) -> treatment -> beat sheet
      -> look script -> build beat by beat -> contact sheet -> critique -> repair
      -> sound -> finish -> export -> check the file -> films log
```

Studios keep this order because each step is expensive to redo once the next
has started. A colour decision made before the motion is final gets made
twice; a beat built before the beat sheet exists usually gets cut.

## The beat sheet

A beat is one change of idea. Write it in frames before any geometry, because
frames are what every tool speaks. Here is one for a 20 s budgeting-app launch
in the Swiss data direction, opening on a data point:

```text
#  frames    s    what changes                          how                                  sound
1  0-45     1.5  "$312" races up: spent on forgotten subs  counter at full frame, already moving  ticks
2  45-105   2.0  the subscriptions behind the number      real list in the app, rows land        soft pops
3  105-180  2.5  one tap cancels three                    cursor taps, rows strike through        click, the drop
4  180-270  3.0  the month after: the bar drops            chart draws, one bar lifts             a bell on the lift
5  270-345  2.5  what it is                               app screen face-on, the name over it    music lifts
6  345-600  ...   (and so on to the end card, which holds)
```

What makes a sheet like this work:

- **One idea per beat.** When the "how" column needs an "and", it is usually
  two beats, and the film will read better as two.
- **Durations come from the kind of film**: a launch cuts about every 1.5 s, an
  explainer about every 5 s (`miran-dsh-cuts` has the measured table and why).
- **The biggest change sits on the drop**, and the music is built around it.
- **The last beat holds.** A film that cuts on its final frame feels cut off.

## Building

- **The look script first** (`miran-dsh-directions`): it creates the
  composition, derives the palette from the brand and sets `kit.theme`. Every
  later script begins with `const T = kit.theme();` and uses `T.accent`,
  `T.display` and the rest, so the direction lives in one place.
- **One `runScript` per beat**, named for it (`label: "beat 3: one tap cancels
  three"`). A failed script rolls back whole; a good one is one undo step.
- **Real material for the product**: screens written as HTML with
  `importHtml` and the product's real words, `kit.code`, real numbers
  (`miran-dsh-design`). Never grey bars in a card.
- **Name every layer** as you would say it ("Headline", "Price", "Cursor")
  and address layers by name afterwards.
- **Build the held pose, then animate into and out of it.** A layer built
  mid-flight cannot be inspected.
- **`createCheckpoint` before a risky change**, `restoreCheckpoint` if it goes
  wrong.

## How a director checks a cut

Pros look in a fixed order, because a problem found late hides the ones
behind it. Each look has a tool:

- **Does it render?** `renderFrame` at three frames: no missing assets, no
  blank frames.
- **Does it read?** `renderContactSheet {frames: "auto"}` shows each scene and
  both sides of every cut. Look at it at phone size: one idea per cell, every
  word meant to be read is readable, no cell empty or half-built.
- **Does it fit?** `critiqueLayout`: collisions, type past the safe area,
  type too small, empty frames, frozen holds.
- **Does it move?** `critiqueMotion`: arcs, eases, overlap, follow-through,
  lockstep. A finished film usually scores in the high 80s or better; lower
  means a pass is left.
- **Does it breathe?** `inspectMotionActivity`: stretches where nothing
  changes. A still frame for reading is fine for about a second; longer reads
  as a slide.
- **Does it cut?** `critiqueEdit {checks: ["frames", "jump", "eye", "beat"]}`:
  flashes, black frames, jump cuts, cuts off the beat.
- **Does it sound right?** `critiqueEdit {checks: ["audio"]}`, then
  `checkExport` on the file.
- **Is it this brand's film?** Put the sheet beside your last film's. If
  cells could swap unnoticed, the direction is not carrying
  (`miran-dsh-directions`).

Fix one thing at a time and look again. Three changes at once make the next
critique unreadable.

## Handoff map

| the question | skill |
|---|---|
| which direction, palette, type, opening, signature, end card | `miran-dsh-directions` |
| hierarchy, readable sizes, depth, filling the frame, real UI | `miran-dsh-design` |
| how long is a shot, how do I cut, which transition | `miran-dsh-cuts` |
| how does this move, which ease, how long, how to hold | `miran-dsh-motion` |
| how is this set, revealed, read | `miran-dsh-type` |
| depth, a push, a 3D screen, a rack focus | `miran-dsh-camera` |
| music, events, levels, the drop | `miran-dsh-sound` |
| finishing, grade, export, captions | `miran-dsh-polish` |
| the arc of a launch film | `miran-dsh-launch` |
| the structure of an explainer | `miran-dsh-explainer` |
| 9:16, hooks, captions, loops | `miran-dsh-social` |
| exact parameter shapes for any tool | `describeTool {tool}`, `miran.help("kit.<piece>")` |

## Habits that make a film look computed

Each has an antidote, and the skills above teach it.

1. **The same film as last time.** Same ground, same font, same ending. Choose
   a direction per brief and check it against your films log.
2. **The house look.** A pale ground, a centred grotesk and a burgundy accent
   are nobody's brand. Derive the palette from the brand colour.
3. **Placeholder product.** Grey bars in a rounded card. Write the screen as
   HTML with the product's real words.
4. **Every shot the same length.** Take durations from the kind of film, and
   let the rhythm vary.
5. **Every move the same ease.** Arrivals decelerate, exits accelerate,
   objects with mass overshoot.
6. **Everything starts on the same frame.** Stagger things that belong to a
   group by a frame or two.
7. **Type that travels while it is read.** Words hold still; the ground or the
   camera can drift.
8. **Small type in a big empty frame.** Set a hierarchy, keep labels above the
   readable floor, fill the frame on purpose.
9. **One transition on every cut.** Most joins are hard cuts; one signature
   join carries the film.
10. **A silent or flat film.** A bed under everything, two or three sounds per
    ten seconds, the drop on the biggest change.

## When the film drifts

- **It looks like the last one**: the direction card was skipped or ignored.
  Write it, run the same-film check, change two of opening, signature and end.
- **It feels plain**: look for one plane (no depth), a placeholder product,
  or type that is all the same size. Fix the frame before the motion.
- **It feels slow**: cut the holds, not the shots; check
  `inspectMotionActivity`.
- **It feels busy**: remove one device per beat; keep the one that carries the
  message.
- **It feels generic**: the treatment could describe any product. Rewrite the
  treatment with the product's real words, screens and numbers.
- **The numbers are fine and it still feels wrong**: render a contact sheet
  and look. The eye is the last instrument, not the first.

## What the study measured

The craft notes in these skills were checked against 95 professional motion
films measured frame by frame (shot lengths, move shapes, holds, speed, cut
timing against the music, word timing). The short version, with its limits, is
in `references/study.md` beside this skill. Across 1,774 moves: the peak speed
comes early (at about 0.12 of a move's length, and in the first third for two
moves in three); 59% overshoot and settle; a typical move lasts about half a
second and travels about 180 px at 1080p. The numbers are evidence for the
advice, not targets to hit.
