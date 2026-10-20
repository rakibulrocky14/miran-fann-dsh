---
name: miran-dsh-motion
description: "Moving things in Miran Fann: timing as the eye reads it, starting from rest or already moving, the hand-off between moves, springs, arcs, overlap, the three layers of motion every shot needs (action, reaction, world), effects as moves (focus, glow, light, colour), the shutter as the source of blur, 60 fps for UI and tech films, and the habits that make motion look computed. Use whenever something in a Miran scene moves, appears, exits or holds."
whenToUse: "Any time you animate a layer, choose an ease, decide how long a move takes, hold a frame, stagger a group, or wonder why a finished move feels dead."
---

# Moving things

Motion is not a property of a layer; it is a claim about what changed and how
much it mattered. Before choosing an ease, answer three questions in order:

1. **What changed?** A word arriving, a page turning, a price landing. If two
   things change at once and only one matters, the other one is furniture.
2. **How far does it travel, and how heavy is it?** Distance and mass set the
   length; the eye confirms it.
3. **What was it before, and what is it after?** A move that begins and ends
   in the same pose is a loop; a move that begins off-frame is an arrival.

The tool surface is in `miran-motion` (properties, drivers, text animators).
This skill is about the decisions: numbers, shapes, and the order of operations.

## Search the technique directory before inventing a move

637 techniques ship in the engine with a Miran mapping for every one. When the
move you want has a name but no obvious tool — "that masked title reveal", "a
bar chart race", "a card stack shuffle" — look it up first:

```
motions {query: "mask reveal"}                  // words, or a family
motions {query: "feedback", family: "ui"}        // a use tag, in one family
motions {id: "iris-mask"}                        // one entry: call, recipe, parameters
```

`mapping.kind` is `kit` (`mapping.call` is the call; put your layers in for
`layer`), `effect` (`addEffect` with `params`), `tool` (call `mapping.tool`),
`recipe` (run the `recipe` string as a whole `runScript`), or `gap` (no single
call: a "No preset:" note lists the calls that build it, any other note names
what Miran lacks). Read `mapping.note`: it says when the kit call is
the whole move and when it is a starting point. The 128 clips with a rendered
reference can be fetched with `preview: true` and judged as a contact sheet.
For a whole film's motion, study real videos with `reference`
(`miran-dsh-reference`) and take their timing, not their look.

## Timing: the eye sets the length

A duration is the time the eye needs to follow the move, not a number to hit.
A button changing state is a blink; an entrance is a breath; a hero move gets
a held beat. Length follows distance and mass: something that crosses the
frame takes longer than a nudge, and a big thing moves slower than a small one.
Watch a draft and trust it: when a move feels slow, it is.

The study's films averaged about half a second a move, travelling about 180 px
at 1080p, but that describes the corpus, not a table to hit. The same film
holds a blink and a two-second reveal because they carry different weight.

**Count in beats when there are beats.** `kit.music` returns `beat_frames`,
`detectBeats` gives them for a track, and `kit.snap` puts a frame on the grid.
Land accents on the beat, and start an entrance just before it so it peaks on
it. With no music, read the line aloud and cut on the breath.

**Frame rate is a format decision.** UI and tech films run at 60 fps: the
cursor, a small card and a camera push travel half as far per frame, so the
eye reads them as smooth instead of stepped, and the shutter's smear is finer.
Film-look pieces, dialogue and footage keep 24 or 30. Frame numbers follow the
composition: the same move takes twice the frames at 60 to play in the same
seconds. Kit pieces take their lengths in frames; their defaults are written at
30 fps and read at the composition's rate, so a piece left on its defaults lasts
the same seconds at 60, and a `dur`, `stagger` or `start` you pass is frames, as
written. Examples in these skills
are written in 30 fps counts unless they say otherwise; when you change the
rate, change every frame number with it.

**Distance belongs to the style.** A calm premium entrance travels a little
and scales from near full size to 1; an energetic one arrives from off-frame,
words slam from twice, springs overshoot and exits whip away. Scaling up from
exactly 0 looks like a template unless it is a deliberate pop, and an opacity
fade should be shorter than the move it accompanies.

## The shape: start from rest, or already moving

A move the viewer watches begin leaves from rest. That is what `arrive` is
for: it gathers speed, crosses, and lands soft. `glide` repositions something
already on screen; `depart` leaves from rest and accelerates away.

A move that begins hidden can arrive already moving on a strong ease-out:
opacity 0, off-frame, behind a matte, or on the far side of a cut. In Miran's
vocabulary those are `emphasized-decelerate`, `smooth`, `snap`, `quint-out`
and `expo-out`: most of the travel in the first third. Use them where the
start cannot be seen. Put one on a layer the viewer is watching from its first
frame and the move begins with a jolt; `critiqueMotion` names it.

`standard` is the in-between for a state change that neither leaves rest nor
hides its start. `easy-ease` is a gentle both-ends for a small drift.
`linear` is for constant speed when that is the point (a progress bar, a
conveyor, a readout), not a default.

`animateProperty` takes one ease for the whole move. A move that genuinely
needs two halves is two moves, and the second starts while the first is still
traveling (below). If you use a `bezier`, know why:

```text
{bezier:[0.4, 0, 0.2, 1]}     // Material standard, a state change
{bezier:[0.3, 0, 0.15, 1]}    // arrive: from rest, land soft
{bezier:[0.6, 0, 0.9, 0.4]}   // slow out, hard arrival: impacts only
```

Read the shape back with `critiqueMotion`: it reports first-frame jolts, dead
stops, velocity jumps, missing follow-through and lockstep timing. A move that
scores well there is shaped, not merely eased.

**Moves hand off.** A move that starts while the property is still traveling
leaves at that speed, the way an animator matches handles, and two moves that
share an end point pass it at one speed instead of stopping. That is on by
default: `handoff:false` starts from rest, `join:false` stops at each key, and
`v0` sets the speed in units per frame. Before its first move a property holds
that move's `from`, so a flash or pop can start at the layer's `in_frame`.

Driver keys are `auto` unless you name an ease: each key joins the next at the
speed the motion already has. (`animateProperty` keys default to `standard`.)
Name an ease only when you want to shape that segment; `"hold"` freezes it.

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

- **Delay the follower behind its leader, and let the gap follow the weight.**
  A light badge answers sooner than a heavy panel; a slow leader has more time
  to spare than a fast one. `parentLayer` plus a `follow` driver with `delay`
  gives this for free.
- **Stagger a group only when its items are one gesture.** The gap is the shape
  of that gesture: characters move as one word, words as one line, lines as one
  thought. A gap wide enough to read as a typewriter is a different idea.
  `kit.title` carries a designed gap per style, and `kit.words` a default
  4-frame gap at 30 fps (read at the composition's rate); a `stagger` you pass is
  frames.
- **Overshoot the leader, settle the follower.** The item that arrives last
  should be the one that moves least.
- **Squash on impact, stretch on launch**, but only for objects with mass. A
  UI card squashing is a cartoon; a ball is not.

## Holds: the breath between moves

Read the corpus carefully here, because it is easy to learn the wrong lesson.
Holds in professional films are **short**: the median one lasts a tenth of a
second, and the longest in a whole film is usually about a second. In other
words, pro motion films almost never stop. Launch films with a voice or a calm
UI story can hold for two or three seconds, but only on a full frame of
legible product with a cursor about to act; a film carried by music behaves
like the motion films. When a move ends, the next one is already
starting somewhere else in the frame: a label lands as the card settles, the
camera begins its push as the headline finishes, the number ticks while the
eye reads it.

Two different things get called "a hold", and they need opposite treatment:

- **The words hold still while they are read.** A headline, once landed, keeps
  its place in the frame. Give it the time it takes to read once, plus a moment
  to land; read it aloud to find that length. That is right, and the critic
  checks it (`read_in_motion`).
- **The frame does not.** While the headline holds, the shot keeps performing:
  the light drifts, dust moves through it, the product behind it does its job,
  a ring draws, the camera pushes slowly. The study measured holds at a median
  of about a tenth of a second; a frame where nothing at all changes for a
  second reads as a slide, and attention drops with it.

Stillness is a tool with one use: the breath before the climax (the study puts
it between a third of a second and three quarters, then the hit). The end
card's words hold to be read while a slow push or drift keeps the frame alive.
Anywhere else, a frozen frame is a missing idea, not a rest.
When a beat has time left after it arrives, give it more story (a staged
reveal, the product changing state, the camera arriving somewhere), not a
fade.

## Three layers of motion in every shot

A shot that feels alive has motion at three levels at once, each with its own
job and speed:

1. **The action**: the move that carries the idea. The card files into the
   stack, the number lands, the screen swings face-on. One at a time, shaped
   (from rest, or already moving if it starts hidden), on the beat.
2. **The reaction**: what the action disturbs. The badge on the card trails it
   by a few frames and settles after it; the rows under a click answer one by
   one; the frame punches on the hit. Small, late, and smaller than the
   action. In Miran: `kit.follow` (a follower `delay` frames behind a leader,
   through a spring), `kit.inertia` (a layer's own stops overshoot and
   settle), `kit.overlap` (a chain), `kit.punch`, `kit.shake`.
3. **The world**: slow, continuous, far away. Dust in the light, a blob of
   colour, a light that breathes, a push of a few percent under the whole
   shot. It never draws the eye; it is why the frame never looks printed.

A shot with only the first layer looks mechanical; with only the third it is a
screensaver. Most model-made shots have the first layer and nothing else.

## Effects are motion too

An effect left at a constant value is a filter. An effect animated on a beat
is a move, and some of the most "produced" moments in launch films are
effects moving rather than layers moving:

- **Focus**: a word or a screen arrives out of focus and resolves as it lands
  (`blur` from visibly soft to 0 across the entrance, not after it), or the
  background softens as the subject comes forward.
- **Glow**: swells on the hit and settles to almost nothing (`kit.glow` with
  `peak` and `rest`). A glow that is always on is the cheap version.
- **Light**: rays through a title with their source drifting
  (`light_rays` `center` animated), one sweep across the hero at the payoff
  (`kit.sheen`).
- **Colour split and glitch**: a few frames of `chromatic_aberration` or
  `displacement_map {map: "blocks"}` on a cut or an impact, never held.
- **Colour itself**: the field warms to the brand colour when the reveal lands
  (`kit.color`).

Every effect parameter animates (`effect.<name>.<param>` in
`animateProperty`). Give each one a start and an end, like any other move.

## Speed and the shutter

Speed reads differently at different rates (px/s at a 1080p short edge).
Under about 40 px/s the frame reads as still; 40-120 is a drift; 120-400 is
normal motion; 400-1200 is fast. Above about 1200 px/s a move strobes unless
something smears it. Those bands describe the study's films, not quotas: a logo
sting can live near 46 px/s and a studio reel near 289.

Blur is the shutter, not an effect you add to a fast move. `motion_blur_enabled:true`
is on for new work, 180° by default and adaptive: it samples where the layer
actually was, so a whip or a card crossing the frame smears as much as its
travel needs. The shutter angle is a look, not a per-move switch — 180 is film,
90 is crisp, 360 is dreamy. Turning it off is a deliberate choice; raising it
for a whip is not. A blurry frame with no motion is a bug.

## What makes motion look computed

- Every move the same duration (lockstep). Fix: let distance, mass and the
  draft set each length; there is no table to hit.
- Every move the same ease. Fix: a visible start leaves rest (`arrive`,
  `glide`, `depart`); a hidden start may arrive already moving on a strong
  ease-out.
- Everything starts on the same frame. Fix: stagger the items that belong to
  one gesture; let the action, the reaction and the world start at different
  times.
- No overshoot anywhere, or overshoot everywhere. Fix: overshoot the object
  with mass, settle the type.
- A move that stops dead because it ran out of frames. Fix: let it land on the
  design's line, but ease the speed away before it gets there; a dead stop at
  speed is a finding, and landing exactly where the design says is not.
- Motion during a read. Fix: hold the words still while they are read. When a
  card carrying words must fly (a note filed into a column), fly the card and
  fade its words in where it lands.
- Everything arrives, then nothing happens. Fix: give the beat a reaction
  layer and a world layer, and a reason for the camera to travel (see above);
  measure it with `inspectMotionActivity`.
- A camera that wanders with no target. Fix: every camera move goes somewhere
  for a reason (wide to the part that matters, or back to reveal the whole),
  starts on an action and lands soft.
- Removing motion to fix a critique. Fix: when a critic flags text moving
  while it is read, hold the text and keep the rest of the shot alive; do not
  clear the shot.

## Recipes

Every block below is a `runScript` body run after the look script
(`miran-dsh-directions`): no `await`, no imports; `miran.` calls run
synchronously, and each script commits as one undo step. Colours come from
`kit.theme()`.

### One property, shaped

```js
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);   // the recipe is written at 30
const l = miran.createLayer({name: "Card", kind: "shape", shape: "rounded",
  width: 640, height: 400, radius: 28, fill: T.surface, position: [0, -260]});
miran.animateProperty({layer: l.id, property: "position.y", from: -260, to: -40,
  start_frame: F(10), duration_frames: F(22), ease: "arrive"});
miran.animateProperty({layer: l.id, property: "opacity", from: 0, to: 1,
  start_frame: F(10), duration_frames: F(10), ease: "linear"});
return l.id;
```

### A group that overlaps

```js
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);
const row = miran.createLayer({name: "Row", kind: "null", position: [0, 0]});
["Draft", "Review", "Approved", "Shipped"].forEach((label, i) => {
  const chip = kit.pill(label, {at: [-330 + i * 220, 0], size: 32, fill: i === 3 ? T.accent : T.surface, color: i === 3 ? T.bg : T.text});
  miran.parentLayer({layer: chip.id, parent: row.id});
  miran.animateProperty({layer: chip.id, property: "position.y", from: -70, to: 0,
    start_frame: F(12 + i * 2), duration_frames: F(20), ease: "spring:snappy"});
});
return "row built";
```

### A move on an arc with follow-through

```js
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);
const dot = miran.createLayer({name: "Dot", kind: "shape", shape: "circle",
  width: 90, fill: T.accent, position: [-420, 120]});
miran.animateProperty({layer: dot.id, property: "position", from: [-420, 120],
  to: [420, -60], start_frame: F(8), duration_frames: F(26), ease: "arrive",
  arc: 0.22, orient: true});
// A ring that follows a few frames late: overlap. Words never follow like this; they would be read in motion.
const ring = miran.createLayer({name: "Ring", kind: "shape", shape: "circle", width: 150, fill: "#00000000", stroke_color: T.accent2, stroke_width: 6, position: [420, -60]});
kit.follow(ring.id, dot.id, {delay: F(4), spring: "snappy"});
return miran.critiqueMotion({});
```

### Reaction: followers that answer the leader

```js
// Secondary motion: the leader moves; what hangs on it answers late and settles.
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);
const {w, h} = kit.size();
kit.scene({start: 0, end: F(90), name: "Secondary"}, ({start, end}) => {
  // The leader: a card that arrives on an arc and overshoots its landing (inertia).
  const card = kit.card({at: [-w * 0.05, 0], w: 620, h: 360, radius: 30, fill: T.surface});
  const title = kit.title("Kickoff", {at: [-w * 0.05, h * 0.07], size: 64, weight: 700, color: T.text, style: "none"});
  const g = kit.group([card.id, title.id], {name: "Invite card"});
  kit.move(g, {from: [-w * 0.6, -h * 0.3], to: [0, 0], arc: 0.2, start: start + F(4), dur: F(26), ease: "smooth"});
  kit.inertia(g, {spring: "snappy", amount: 0.6});
  // The followers: a badge and its shadow trail the card by a few frames and settle after it.
  const badge = kit.pill("all 6 free", {at: [w * 0.12, h * 0.17], size: 40, fill: T.accent2, color: T.bg});
  kit.follow(badge.id, g, {delay: F(4), spring: "snappy"});
  const dot = miran.createLayer({name: "Status dot", kind: "shape", shape: "circle", width: 36, fill: T.accent, position: [-w * 0.2, h * 0.07]});
  kit.follow(dot.id, g, {delay: F(7), spring: "bouncy", amount: 1});
});
return "secondary";
```

### Effects as moves: focus, light, glow and a colour split on the beat

```js
// Effects are motion: blur, glow, light rays and a colour split, each animated on a beat, never left static.
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);
const {w, h} = kit.size();
kit.scene({start: 0, end: F(90), name: "Effects as motion"}, ({start, end, group}) => {
  // Arrive out of focus: the word resolves from a blur as it lands.
  const word = kit.title("Wednesday.", {at: [0, h * 0.02], size: 240, weight: 800, font: T.display, color: T.text, style: "none"});
  miran.animateProperty({layer: word.id, property: "blur", from: 40, to: 0, start_frame: start + F(2), duration_frames: F(16), ease: "emphasized-decelerate"});
  miran.animateProperty({layer: word.id, property: "opacity", from: 0, to: 1, start_frame: start + F(2), duration_frames: F(8), ease: "linear"});
  // Light through the word, its source drifting so the rays travel while the word holds.
  miran.addEffect({layer: word.id, effect: "light_rays", params: {center: [0.3, 0.2], length: 0.3, intensity: 0.7, threshold: 0.35}});
  miran.animateProperty({layer: word.id, property: "effect.light_rays.center", from: [0.3, 0.2], to: [0.7, 0.2], start_frame: start, duration_frames: end - start, ease: "linear"});
  // The hit: a glow swells and settles, and the colour splits for four frames.
  kit.glow(word.id, {start: start + F(30), dur: F(30), peak: 1.2, rest: 0.15, radius: 36, color: T.accent});
  miran.animateProperty({layer: word.id, property: "effect.chromatic_aberration.amount", from: 12, to: 0, start_frame: start + F(30), duration_frames: F(6), ease: "emphasized-decelerate"});
  kit.punch(group, {start: start + F(30), dur: F(7), to: 1.04, sound: false});
});
return "effects as motion";
```

## Check it

- `critiqueMotion` — the score names arcs, constant speed, lockstep and
  follow-through per layer.
- `inspectMotionActivity` — the share of the frame that changes per second,
  and every still hold. On real launch films the energetic ones (Lovable,
  Claude Design) sit at about 5-9% median with almost nothing frozen; calm UI
  films (Cowork, Cursor 2.0) sit under 2% and hold for 2-3 s, which works only
  on a full frame of legible product. For a launch with music and no voice,
  aim for about 5% or more. `critiqueMotion` can score a frozen film 100,
  because it only grades the moves that exist: run both.
- `renderContactSheet {frames:"auto"}` — the eye, at the poses that matter.

## Failures you will hit

- Ease names are exactly the list `animateProperty` accepts: `linear`,
  `arrive`, `depart`, `glide`, `easy-ease`, `smooth`, `standard`, `snap`,
  `emphasized-decelerate`, `quint-out`, `expo-out`, `back-out`,
  `spring:snappy` and friends. A guessed name (`ease`, `easeOut`) fails the
  call; the error lists every valid one.
- A layer the viewer watches from its first frame must leave from rest:
  `arrive`, `glide` or `depart`. A strong ease-out (`smooth`,
  `emphasized-decelerate`, `snap`) belongs to a start the viewer cannot see.
  `critiqueMotion` names a first-frame jolt.
- Two chained moves hand off at the speed the first one has. That is what you
  want for overlapping action; pass `handoff:false` when the second must start
  from rest.
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
  first third for two moves in three. That is the curve of a move that starts
  hidden or crosses a cut already moving; a move the viewer watches begin
  leaves rest (`arrive`) and reaches its peak later. The measurement is not a
  licence to jolt a visible layer;
- the first half of a move carries about 62% of its travel;
- 59% of moves overshoot, and the second swing is about 62% of the first:
  overshoot is common, and it is small;
- a typical move lasts about half a second and travels about 180 px at 1080p;
- holds between moves are short (median 0.1 s, the longest about 1.2 s): the
  films barely stop, and a typical frame has about 14% of its pixels moving.
