---
name: miran-dsh-motion
description: "Moving things in Miran Fann, written from measurements of 95 professional motion films rather than taste: durations by distance, the fast-out/slow-in shape and the exact ease names that produce it, springs and when they overshoot, arcs, overlap and follow-through, how long a hold must be to read as a breath, speed bands, stagger, blur, and the habits that make motion look computed. Use whenever something in a Miran scene moves, appears, exits or is held still."
whenToUse: "Any time you animate a layer, choose an ease, decide how long a move takes, hold a frame, stagger a group, or wonder why a finished move feels dead."
---

# Moving things

Motion is not a property of a layer; it is a claim about what changed and how
much it mattered. Before choosing an ease, answer three questions in order:

1. **What changed?** A word arriving, a page turning, a price landing. If two
   things change at once and only one matters, the other one is furniture.
2. **How far does it travel?** Distance sets duration. Nothing else does.
3. **What was it before, and what is it after?** A move that begins and ends
   in the same pose is a loop; a move that begins off-frame is an arrival.

The tool surface is in `miran-motion` (properties, drivers, text animators).
This skill is about the decisions: numbers, shapes, and the order of operations.

## Durations by distance

What pros tend to give a move, by how far it travels (30 fps, distances at a
1080p short edge). They are starting points, and the right-hand column is the
reason: duration is what makes a move feel like a nudge or a scene change.

| travel | duration | feels like |
|---|---|---|
| 12-32 px (a nudge, a lift, a 2% scale) | 8-12 frames | a settle, almost subliminal |
| 40-120 px (a card entering from its own edge) | 14-18 frames | a confident arrival |
| 120-320 px (a panel crossing a third of the frame) | 18-24 frames | a move you watch |
| 320-900 px (a full-frame slide) | 24-32 frames | a scene change |
| over 900 px (a whip, a camera throw) | 18-26 frames *and* motion blur | speed, not distance |
| scale 0.9→1 or 1→1.06 | 20-28 frames | a breath, if it is the only motion |
| opacity only | 10-16 frames in, 6-10 out | a dissolve, never a move |

Two habits that survive every style, and why:

- **Exits are faster than entrances.** A thing arriving needs to be read; a
  thing leaving has already been read. Pros usually give an exit about
  two-thirds of its entrance.
- **A move that carries meaning gets the long version.** A move that is
  housekeeping (a cursor blink, a status dot) gets the short one.

## The shape: fast out, slow in

Almost every deliberate move in professional work leaves quickly and lands
slowly. In Miran's vocabulary that is `ease:"standard"` or
`ease:"emphasized-decelerate"`. `smooth` is a very strong
expo-out (90% of the travel in the first third): use it for landings, never for
drifts. For a drift, `ease-in-out` or `linear`.

`animateProperty` takes one ease for the whole move. When a move genuinely needs
two halves (a push that accelerates then brakes), build it as two chained moves
with `replace:true` on the second, or use a `bezier` you can justify:

```text
{bezier:[0.4, 0, 0.2, 1]}     // Material standard, the safe default
{bezier:[0.05, 0.7, 0.1, 1]}  // very fast out, long landing
{bezier:[0.6, 0, 0.9, 0.4]}   // slow out, hard arrival: for impacts only
```

Read the shape back with `critiqueMotion`: it reports straight-line travel,
constant speed, missing follow-through, lockstep timing and jumps. A move that
scores well there is shaped, not merely eased.

## Springs

A spring is for a physical object arriving: a card, a chip, a cursor, a pill, a
badge. Not for type that must be read, and not for a camera.

- `spring:snappy` (0.5 s, bounce 0.15) — the default for UI and cards.
- `spring:gentle` — large objects, calm brands.
- `spring:bouncy` — playful only; above bounce 0.3 reads as cartoon.
- `spring:punchy` — short travel, strong arrival, for a value or a number.

A spring that overshoots and then rings twice is a door closing; a spring that
overshoots and rings five times is a toy. If the property is text size or
opacity, use an ease, not a spring.

## Arcs, paths and orientation

Nothing in the physical world travels in a straight diagonal. When a layer
moves in two axes at once:

- `arc: 0.15-0.3` bows the path; positive bows left of travel.
- `via: [[x,y], ...]` for a route with a reason (around a corner, over an
  obstacle).
- `orient: true` turns the layer along its path (arrows, cursors, a pen).

A straight diagonal is acceptable only when the motion is mechanical: a
progress bar, a slider, a readout.

## Overlap and follow-through

Real objects do not all start and stop together.

- **Delay the follower 2-4 frames** behind its leader, not more. `parentLayer`
  plus a `follow` driver with `delay` gives this for free.
- **Stagger a group by 1-3 frames per item** (type: 1-2 per character, 4-8 per
  word, 8-14 per line). Above 4 per character it reads as a typewriter.
- **Overshoot the leader, settle the follower.** The item that arrives last
  should be the one that moves least.
- **Squash on impact, stretch on launch**, but only for objects with mass. A
  UI card squashing is a cartoon; a ball is not.

## Holds: the breath between moves

A hold is not dead time; it is where the viewer reads. In the corpus, holds are
short in reels and long in explainers, and the best films hold *still* — drift
inside a hold is what makes a frame feel like a screensaver.

- A held frame must contain a complete idea (a headline, a number, a product).
- Text needs `words / 3.5` seconds to be read once, plus 0.3 s to land.
- A hold under 0.4 s is not a hold; it is a hitch. Either commit or cut.
- If something must move during a hold, move it *slowly and monotonically*
  (a 1-2% push), never with an ease that draws attention.

## Speed bands

Speed reads differently at different rates (px/s at a 1080p short edge).
Under about 40 px/s the frame reads as still; 40-120 is a drift; 120-400 is
normal motion; 400-1200 is fast. Above about 1200 px/s a move strobes without
motion blur, because the eye sees separate copies instead of a smear: that is a
property of the shutter, not a style, so fast moves get blur. The study's films
ran between about 46 px/s (logo stings) and 289 px/s (studio reels) on a typical
frame.

Motion blur is set on the composition: `motion_blur_enabled:true`, shutter 180°
by default. Increase the shutter angle to 270-360 for a whip; keep it at 180
for everything else. A blurry frame with no motion is a bug.

## What makes motion look computed

- Every move the same duration (lockstep). Fix: derive duration from distance.
- Every move the same ease. Fix: arrivals decelerate, exits accelerate.
- Everything starts on the same frame. Fix: stagger 1-3 frames, but only for
  things that belong to a group.
- No overshoot anywhere, or overshoot everywhere. Fix: overshoot the object
  with mass, settle the type.
- A move that ends exactly on a grid line with zero residual. Fix: land 1-2 px
  past and settle back, or don't move it at all.
- Motion during a read. Fix: hold the words still while they are read. When a
  card carrying words must fly (a note filed into a column), fly the card and
  fade its words in where it lands.
- A camera that moves because the shot is boring. Fix: cut earlier instead.

## Recipes

Every block below is a `runScript` body run after the look script
(`miran-dsh-directions`): no `await`, no imports; `miran.` calls run
synchronously, and each script commits as one undo step. Colours come from
`kit.theme()`.

### One property, shaped

```js
const T = kit.theme();
const l = miran.createLayer({name: "Card", kind: "shape", shape: "rounded",
  width: 640, height: 400, radius: 28, fill: T.surface, position: [0, -260]});
miran.animateProperty({layer: l.id, property: "position.y", from: -260, to: -40,
  start_frame: 10, duration_frames: 22, ease: "emphasized-decelerate"});
miran.animateProperty({layer: l.id, property: "opacity", from: 0, to: 1,
  start_frame: 10, duration_frames: 10, ease: "linear"});
return l.id;
```

### A group that overlaps

```js
const T = kit.theme();
const row = miran.createLayer({name: "Row", kind: "null", position: [0, 0]});
["Draft", "Review", "Approved", "Shipped"].forEach((label, i) => {
  const chip = kit.pill(label, {at: [-330 + i * 220, 0], size: 32, fill: i === 3 ? T.accent : T.surface, color: i === 3 ? T.bg : T.text});
  miran.parentLayer({layer: chip.id, parent: row.id});
  miran.animateProperty({layer: chip.id, property: "position.y", from: -70, to: 0,
    start_frame: 12 + i * 2, duration_frames: 20, ease: "spring:snappy"});
});
return "row built";
```

### A move on an arc with follow-through

```js
const T = kit.theme();
const dot = miran.createLayer({name: "Dot", kind: "shape", shape: "circle",
  width: 90, fill: T.accent, position: [-420, 120]});
miran.animateProperty({layer: dot.id, property: "position", from: [-420, 120],
  to: [420, -60], start_frame: 8, duration_frames: 26, ease: "emphasized-decelerate",
  arc: 0.22, orient: true});
// A ring that follows a few frames late: overlap. Words never follow like this; they would be read in motion.
const ring = miran.createLayer({name: "Ring", kind: "shape", shape: "circle", width: 150, fill: "#00000000", stroke_color: T.accent2, stroke_width: 6, position: [420, -60]});
kit.follow(ring.id, dot.id, {delay: 4, spring: "snappy"});
return miran.critiqueMotion({});
```

## Check it

- `critiqueMotion` — the score names arcs, constant speed, lockstep and
  follow-through per layer.
- `inspectMotionActivity` — the share of the frame that changes per second;
  a long flat run means the film has stopped talking.
- `renderContactSheet {frames:"auto"}` — the eye, at the poses that matter.

## Failures you will hit

- Ease names are exactly the list `animateProperty` accepts: `linear`,
  `smooth`, `snap`, `standard`, `emphasized-decelerate`, `expo-out`,
  `back-out`, `spring:snappy` and friends. A guessed name (`arrive`, `ease`,
  `easeOut`) fails the call; the error lists every valid one.
- `animateProperty` with no `from` starts at the current value. If you built
  the layer at its destination, the move has zero travel: set `from` always.
- A spring named in `ease` lands over `duration_frames`; an explicit
  `{duration, bounce}` keeps its own clock and ignores `duration_frames`.
- `position` is y-up, px from the centre. A move "down" is negative y.
- Animating `scale` with one number scales both axes; `[1.2, 1]` is a stretch.
- Motion blur samples where the layer *is*, so a layer that appears on frame 10
  with a move starting on frame 10 has no blur on its first frame.

## What the study measured

Across 95 films and 1,774 moves:

- the peak speed comes early, at about 0.12 of a move's length, and in the
  first third for two moves in three: this is the measured shape behind "fast
  out, slow in";
- the first half of a move carries about 62% of its travel;
- 59% of moves overshoot, and the second swing is about 62% of the first:
  overshoot is common, and it is small;
- a typical move lasts about half a second and travels about 180 px at 1080p;
- holds between moves are short and completely still (median 0.1 s, the
  longest about 1.2 s, no drift inside them).
