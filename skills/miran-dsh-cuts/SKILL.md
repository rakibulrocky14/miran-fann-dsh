---
name: miran-dsh-cuts
description: "Cutting and transitions in Miran Fann from measured practice: how long a shot lasts by kind of film, the four rhythms of cutting, which join to use (hard cut, match, whip, slide, zoom-through, dissolve, morph, iris, flash) and what each claims, cutting on music without becoming a metronome, cutting on motion and eye trace, and the checks that catch flashes, jumps and dead cuts. Use when joining two shots or choosing a transition."
whenToUse: "Any time two scenes meet, a shot feels too long or too short, a transition looks bolted on, or a cut is meant to land on the music."
---

# Cuts and joins

A cut is an argument: *this belongs next to that*. The join is the grammar. Get
the argument right and almost any transition works; get it wrong and no
transition saves it.

Tools: `kit.scene` builds a beat with its own frame range; `kit.transition`
joins the scene that ends at a frame to the one that starts there. The
mechanics are in `miran-create`; this skill is the editing judgement.

## Shot length

How long pros hold a shot depends on what the film is for. These are the
measured medians across the 95 study films, by kind (the median of each film's
own median, with the p10-p90 spread). They are evidence of habits, not
quotas:

| kind | shot median | p10-p90 | cuts / min |
|---|---|---|---|
| studio reel | 1.0 s | 0.48-2.33 s | 43.8 |
| launch film, hardware | 1.59 s | 0.9-4.8 s | 25.2 |
| launch film, app | 1.55 s | 0.78-7.48 s | 16.3 |
| kinetic type | 2.56 s | 0.56-8.1 s | 12.0 |
| UI motion promo | 5.31 s | 2.1-9.02 s | 8.0 |
| logo sting | 6.04 s | 4.06-8.61 s | 5.0 |
| explainer | 4.86 s | 1.89-10.85 s | 8.6 |
| transitions pack | 2.0 s | 0.85-4.28 s | 21.6 |
| title sequence | 5.0 s | 1.34-19.3 s | 5.2 |
| data visualisation | 6.4 s | 2.5-12.96 s | 5.9 |
| 3D product | 2.68 s | 1.4-12.96 s | 9.6 |
| social cut (16:9 masters) | 2.37 s | 0.59-5.77 s | 18.4 |

Read the spread, not just the median: a studio reel and a launch film can share
a mean shot length and feel nothing alike, because the reel alternates 0.4 s
and 2.3 s while the launch holds a 4 s product shot. The p90 is where the
"boring" lives; if your p90 is far above the table, one shot is doing too
little for too long.

Two things this table does **not** say: that a film should look like its
category, or that a longer film has longer shots. Film length and shot length
barely correlate in the corpus; the kind of film does the work.

## Four rhythms

1. **Accelerate**: shots shorten toward the reveal (2.0, 1.4, 0.8, 0.5 s).
   The classic launch build. Past about five shots it starts to read as a
   countdown.
2. **Breathe** — long, short, long, short. The explainer rhythm: a wide idea,
   then a detail.
3. **Hold and drop** — hold a frame for 2-3 s, then two cuts 8 frames apart.
   The drop is the change; the hold is what makes it feel like one.
4. **Lockstep** — every shot the same length, on the beat. Only for reels and
   music-led type; it flattens meaning by design.

## Which join

| join | claims | use when | cost |
|---|---|---|---|
| hard cut | "next" | 90% of all joins | none |
| match cut | "same shape, different thing" | two compositions rhyme | needs a real match |
| whip | "we are moving fast" | energy, a list, a montage | blur, motion sickness |
| slide | "next panel" | UI, carousels, chapters | reads as a template |
| zoom-through | "into the next world" | a transition into a detail | the hardest to fake |
| dissolve | "time passed" | a change of place or mood | slowness, sentiment |
| morph | "this became that" | a logo, an object transformation | needs matching shapes |
| wipe | "chapter" | structured, editorial | dated if coloured |
| iris | "focus on this" | a reveal, a product detail | one per film |
| flash | "impact" | a hit, a drop | photosensitivity risk |
| cut on action | "continuous" | movement across two shots | needs matched motion |

Habits that hold across styles, and why:

- **One signature transition per film, two at most; the rest are hard cuts.**
  81% of the joins in the study were hard cuts. A transition means something
  only because it is rare; a film where every join is a wipe is a slideshow.
  Your direction card names the signature join (`T.join`).
- **Cut on motion, not between motions.** If something is moving at the cut,
  the eye follows it; if everything is still, the cut lands as a blink.
- **Keep screen direction.** A subject moving left that cuts to moving right
  reads as a reversal unless the reversal is the point.
- **Match the cut to the music's structure**, not to every onset. Cut on the
  downbeat of a bar, or on the drop; cutting on every onset is a metronome.

The corpus measures cut-to-onset distance: in music-led films most cuts land
within 120 ms of an onset, and the median distance is often under 80 ms. That
is the target for a music-led film. For an explainer, the cut should land on
the sentence, not the beat.

## The cut point

`kit.scene({start, end})` is exclusive at `end`; a transition at frame `F`
belongs to the scene ending at `F` and the one starting at `F`. If a transition
is 16 frames long, the outgoing scene should have 8 frames of settled picture
before `F`, or the transition eats the last beat of the scene.

A transition needs material to move: a whip over an empty frame is a blur of
nothing. Put the thing that leaves at the edge of frame before the cut.

## Recipes

Each runs after the look script (`miran-dsh-directions`) and takes its
colours, type and signature join from `kit.theme()`.

### Three scenes, hard cuts, one signature join

```js
const T = kit.theme();
const {h} = kit.size();
const size = Math.round(h * 0.18);
kit.scene({start: 0, end: 54, name: "Open"}, ({start}) => {
  kit.title("Write it.", {at: [0, 0], size: size, weight: 800, font: T.display, style: T.style, start: start});
});
kit.scene({start: 54, end: 96, name: "Middle"}, ({start}) => {
  kit.title("Share it.", {at: [0, 0], size: size, weight: 800, font: T.display, style: T.style, start: start});
});
kit.scene({start: 96, end: 150, name: "Close"}, ({start}) => {
  kit.title("Ship it.", {at: [0, 0], size: size, weight: 800, font: T.display, color: T.accent, style: T.style, start: start});
});
// 54 is a hard cut; the signature join goes where the idea turns.
kit.transition({at: 96, style: T.join || "push", dir: "up"});
return "built";
```

### A match cut on a shape

```js
// The dot that ends one shot becomes the button that starts the next.
const T = kit.theme();
const {h} = kit.size();
let dot, button;
kit.scene({start: 0, end: 40, name: "A"}, ({start}) => {
  dot = miran.createLayer({name: "Dot", kind: "shape", shape: "circle", width: h * 0.12, fill: T.accent, position: [0, 0]});
  kit.title("One tap", {at: [0, -h * 0.16], size: Math.round(h * 0.06), weight: 700, style: "rise", start: start});
});
kit.scene({start: 40, end: 90, name: "B"}, ({start}) => {
  button = kit.pill("Send invite", {at: [0, -h * 0.05], size: Math.round(h * 0.05), fill: T.accent, color: T.bg});
  kit.title("and everyone's in.", {at: [0, h * 0.1], size: Math.round(h * 0.06), weight: 700, style: "rise", start: start + 8});
});
kit.match(dot.id, button.id, {at: 40});
return "match built";
```

### A dissolve that means time passing

```js
// continues: a soft join between B and the scene after it
const T = kit.theme();
const {h} = kit.size();
kit.scene({start: 90, end: 150, name: "Later"}, ({start}) => {
  kit.title("A week later", {at: [0, 0], size: Math.round(h * 0.08), weight: 600, color: T.muted, style: "fade", start: start});
});
kit.transition({at: 90, style: "blur", dur: 18});
return "dissolve built";
```

## Check it

- `critiqueEdit {checks:["frames","jump","eye","beat"]}` — flashes, black
  frames, jump cuts, eye trace across cuts and cuts off the beat, each with
  the three worst moments.
- `inspectMotionActivity` — a flat run means a shot sat still too long.
- `renderContactSheet {frames:"auto"}` — both sides of every cut, so you see
  the join rather than the shot.

## Failures you will hit

- A scene's layers are cut at `end`; a layer that should survive a cut must be
  built outside `kit.scene` or re-made in the next scene.
- `kit.transition` at a frame where two scenes do *not* meet silently does
  nothing useful. Check the scene table first (`listLayers` shows each scene
  stage's `[start-end]`).
- A `whip` or `zoom` moves the outgoing scene, words included. If those words
  are still being read when it starts, the viewer loses them and
  `critiqueMotion` reports reading in motion. Let the read finish first, or use
  a join that leaves the outgoing frame still while it is read (`iris`, `slide`,
  a hard cut).
- Whip and slide need a direction that matches the content's travel; `dir`
  defaults are not a decision.
- A dissolve between two nearly identical frames reads as a mistake, not a
  transition. Change something.
- Photosensitive flashes: `critiqueEdit {checks:["flashes"]}` is approximate
  but it catches the worst offenders. A full-frame flash under 3 frames is
  never worth it.

## What the study measured

Across all 95 films, 73% of cuts landed within 120 ms of an audio onset
(median 67 ms), and 81% of joins were hard cuts. The nine studio reels are the
fastest-cut kind: a shot lasts 1.0 s on median (about 44 cuts a minute), the
frame moves at about 290 px/s, and the longest still hold is under a second.
