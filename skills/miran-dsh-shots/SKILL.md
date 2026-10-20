---
name: miran-dsh-shots
description: "What goes on screen in a Miran Fann film and how a shot keeps living - a world per beat (not a layout), a verb for every element, the stack of planes (light, atmosphere, back graphics, subject, front graphics, light on the subject, camera), the five ways a beat keeps performing, cause and effect on one frame, motion carried across the cut, when a generated video hero shot lifts a beat (and what it costs), and six runnable shot recipes. Use for every beat of every film."
whenToUse: "Before building any beat, and whenever a beat looks like a slide: a small screen in a big empty field, a headline left and UI right again, or nothing moving after the entrances."
---

# What goes on screen

A film made by a model fails in a recognisable way: every beat is a section of a
website. A headline on the left, a small piece of UI on the right, a dark empty
field around both; the parts arrive, and then nothing happens until the cut. Each
frame is tidy and the film is dead.

That is not a guess. A DeepSeek film of the DeepSeek Harness launch, measured
frame by frame in the 0.1.6 study, had a good idea and good copy, and still:
the same layout five times, the subject at a quarter to a third of the frame,
**half a percent of the frame changing on a typical frame**, and ten of its
twenty-four seconds completely frozen. `critiqueMotion` gave it 100, because the
few moves it had were well eased. The critic measures how a move is shaped, not
whether the film is alive.

Professional launch films come in two kinds, and neither looks like that.

- **The calm ones** hold still for two or three seconds at a time: Cowork,
  Cursor 2.0, Linear Agent. Every hold is a full frame of real, legible
  product, the type is confident, and a cursor or a voice is always about to
  act.
- **The energetic ones** barely stop at all: Lovable, Claude Design, Figma's
  Config reel. Glow, light, gradients and UI motion run under every second.

The DeepSeek film was neither. Its subject was small, the field empty, and
the same layout came back every time. The difference is not the eases. It is
what is on screen, how much of the frame it fills, and whether each element has
a job after it arrives. A launch film with music and no voice belongs to the
energetic kind; it is what people mean by a "stunning, dynamic" launch.

This skill is the part the other skills assume: what to put in the frame, and
how to keep it performing. `miran-dsh-motion` shapes each move,
`miran-dsh-design` sizes and orders what you place, `miran-dsh-cuts` joins the
shots.

## A beat is a world, not a layout

Before any geometry, write each beat as what the viewer experiences, in two
sentences. Then work out the pixels.

- Layout: "Dark background. Headline left. Calendar right."
- World: "Six people's weeks pile up as a wall of grey slots, too many to read.
  One slot turns blue and the wall falls away behind it."

The second sentence tells you what the picture is, what moves, what the camera
does and where the beat ends. The first only tells you where boxes go.

**Give every element a verb.** Not "the card animates in" but what it does:
it slams, drops, files into, docks, draws, fills, counts down, types, lifts,
sweeps, rings, cracks open. The verb comes from what the element means: a
price that falls drops; a name that is finally decided locks in; a list that
is being cleared files away. An element you cannot give a verb is not designed
yet, and in practice it is the one that fades in and sits there.

## The picture: what to show besides the screen

The product's screen is the evidence, but it is rarely the whole picture.
Studios put the idea on screen. Pick the picture per beat from what the beat
says:

| the beat says | a picture for it | in Miran |
|---|---|---|
| this one thing matters | the product's own element, huge: one row, one button, the number | `kit.frame`, `kit.screen3d` push, a pill set at 100+ px |
| the problem is too much | the mess as a pile: stacked messages, a wall of tabs, tickets raining down | `kit.stack`, `kit.flow`, `kit.particles` with glyph sprites |
| it got better by this much | the number as an object: the old one struck through, the new one landing inside a ring | `kit.counter`, `kit.ring`, `kit.line`, `kit.burst` |
| it has these parts | the features as objects with weight that fall, fan or dock into the product | `kit.card`, `kit.move {arc}`, `kit.fan`, `kit.match` |
| it connects things | the system as a diagram that builds: chips, arrows, a path the eye follows | `kit.flow`, `kit.arrow`, `kit.line {head}` |
| here is the claim | type as image: huge, anchored to an edge, cropped, set against the product behind it | `kit.lockup`, `kit.words`, a blurred product element as the back plane |
| this is the brand | the mark or motif as a recurring object that pays off at the end | `kit.svg`, `kit.logo3d`, `kit.match` into the end card |
| this is premium | a lit stage: real 3D type or logo, a key light that travels, a floor that catches shadow | `kit.lit`, `kit.text3d`, `kit.logo3d` |

A person, a real place, liquid, glass, fabric, food, weather or a product in
real light are pictures the engine does not draw. Higgsfield's showcase films
get exactly those pixels from video models: the 0.1.6 study found most of their
showcase frames are generated video. When the person has a video key set and a
beat would gain that presence, plan a generated hero shot for it
("Generated hero shots" below) and put Miran's own type, UI and motion on top.
Never fake it with grey shapes.

Their motion-design films are another matter: the BodyTask and "dusk" launches
are code, like ours. What makes them spectacular is density. One frame holds a
sea of glossy objects, a 3D carousel of real cards, or a point-cloud object
with live HUD numbers. Most of that is built from many copies of one designed
element, each doing something. Build it here from real cards and kit pieces;
it is not a video model.

## Generated hero shots: plan them when they lift the beat

**With a video key set, look for the beat that would gain real-world
presence**, and plan one or two generated hero shots into the beat sheet
yourself; do not wait to be asked and do not default to motion only. Then
build Miran's type, UI and motion on top: cutouts, screen replacement, light
wrap, and one grade and one grain over everything so it is one film.

*Can you?* `openSettings` (a direct call) returns `keys`; video models run on
the `openrouter` entry with `set: true`. Check once, when you write the beat
sheet. Hand over the link (or "Settings → Miran") only when the key is
missing, and never ask for a key in chat.

*Does this beat gain?*

- **Good fits**: a person using the thing (hands on a phone, a face reacting,
  someone arriving where the product lives); a real place or weather; liquid,
  glass, fabric, smoke, steam, food; the product as a physical object in real
  light under Miran's type; a cinematic establishing shot that hands off into
  the designed film; a brand or story film where a world with no photographic
  frame would read as a slideshow.
- **Poor fits, stay motion design**: a product-UI or screen demo (the real
  screen is the evidence); kinetic type; data stories and charts; abstract brand
  motion and logo animation; anything whose point is exact words, a logo,
  interface or a real person's likeness (models garble them, Miran draws them
  on top); a shot that is only decoration.
- **The test**: cover the generated shot in the beat sheet. If the beat says
  the same without it, do not buy it. One or two shots in a short film; the
  rest stays designed, which also keeps the generated ones feeling expensive.

*Price it once.* Give the shot a row on the beat sheet (what it shows, its
length, where Miran's type and UI sit over it). Price each with the exact
params you will send (`generateVideo {action: "estimate", ...}` returns the
price, the person's caps and `spent_today_usd`), add them and put **one total
for the set** in the plan: "Two generated shots, about $0.45 in all, inside
your caps." Ask once and run only on the yes; a budget named in the brief is
the yes up to that figure. With no yes, build the motion version and say in the
report what the shots would have added.

- **Cheapest model that meets the shot.** The default is the person's video
  model in Settings (`heygen/heygen-video-1` unless they changed it): cheaper and
  better than Kling for most plates. `generateVideo {action: "models"}` lists
  live prices. Go up only when the default's draft shows it cannot do the shot,
  and say the new price first. It makes 5-15 s: plan long, use two or three
  seconds (`place {duration}`).
- **Draft first, the hero last.** One cheap take to judge the idea
  (`resolution: "480p"` with a `seed`; look at the three frames in `images`),
  build the beat on it, and only when everything else holds make the hero
  (`768p`, or `2K` if the camera pushes into it) with the same seed and swap it
  in with `place {as: "replace"}`.
- **Reuse saved results.** The same call is the saved file, free
  (`cached: true`). One word changed in the prompt is a new bill: settle prompt,
  seed and resolution on the draft and repeat them exactly. `fresh: true` is a
  re-roll; say the price first.
- **Inside the Settings caps.** `limit-exceeded` means stop and offer the
  cheaper path (motion design, a still with parallax); never retry around it.
  Pass `max_cost` as the price you quoted. For `no-key`, `local-only`,
  `key-refused` and `no-credits`, say it and carry on with motion design.
  Report what was spent at the end.

*No key?* If `openSettings` shows no `openrouter` key and a beat would gain,
say it once, in the plan: "A generated hero shot (the opening street, about
$0.15) could lift this film. Add an OpenRouter key in Settings → Miran to unlock
it. Carrying on with motion design." Then carry on and do not ask again.

*Ask the model for pictures, never for words:* camera, subject, action, light
and look from the film's direction, plus "no text, no logos, no interface".

Generation calls are direct (a script refuses them); `place`, `grade` and the
kit run in scripts. Names, prompts and numbers are examples.

**A product hero plate, Miran's type and UI over it.**

```text
openSettings {}                                                          // keys: openrouter set -> plan it
generateVideo {action: "estimate", prompt: "A frosted glass bottle of cold brew on dark wet slate, condensation beading, soft side light from the left, shallow focus, the camera pushes in slowly, no text, no logos", seconds: 5, resolution: "768p"}   // all shots' estimates -> one total
generateVideo {prompt: "<the same prompt>", seconds: 5, resolution: "480p", seed: 7, name: "bottle"}   // the draft
place {media: "<path from the draft>", as: "background", at: 90, duration: 150, name: "Bottle plate"}
kit.lockup(...) and kit.screen3d(...) over it, kit.spot lit from the plate's light direction
generateVideo {prompt: "<the same prompt>", seconds: 5, resolution: "768p", seed: 7, name: "bottle", max_cost: 0.25}   // the hero, last
place {media: "<path from the hero>", as: "replace", layer: "Bottle plate"}
grade {action: "look", name: "film", composition: "Launch", strength: 0.5}; kit.finish({vignette: 0.2, grain: 0.03})
```

**A person cut out over a designed world.** Shoot the person on a plain wall
(the cutout is cleaner), build the world in Miran, put giant type between them.

```text
generateVideo {prompt: "A woman in a green raincoat turns toward the camera and laughs, plain light-grey studio wall, soft front light, locked-off medium shot, no text", seconds: 5, resolution: "480p", seed: 11, name: "ana"}
place {media: "<path>", as: "layer", at: 0, name: "Ana"}
cutout {action: "person", layer: "Ana", mode: "replace"}                  // "Ana cutout"; the wall turns off
kit.backdrop({style: "mesh", colors: [...]})                              // the world, from the direction's palette
kit.textBehind("Ana", "ON TIME", {start: 30})                             // giant type between world and person
kit.lightWrap("Ana cutout", <the backdrop's id>, {width: 24, strength: 0.5})
grade {action: "look", name: "film", composition: "Launch", strength: 0.4}; kit.finish({grain: 0.03})
```

If she holds a phone: `track {action: "plane", layer: "Ana", detect: "screen"}`
then `kit.screenReplace("Ana", <the product's own screen>)` puts the real UI on
it. The model never draws the interface.

**A generated establishing shot that hands off into motion design.**

```text
generateImage {prompt: "A rain-lit street at dusk, one warm shop window, deep blue shadows, wide, no text", aspect: "16:9", name: "street"}   // about $0.04: approve the frame
generateVideo {prompt: "The camera glides slowly forward down the street, rain falling, reflections moving, no text", first_frame: "<the image path>", seconds: 5, resolution: "480p", seed: 3, name: "street"}
place {media: "<path>", as: "layer", at: 0, duration: 90, name: "Street"}
place {media: {asset: "<path>", time: 4.8}, as: "background", at: 90, name: "Street held"}   // its last frame is the ground
kit.frame(...) pushes the way the camera did; the product's UI arrives in the shop window's light
```

## The stack: planes in every shot

A produced frame is built in planes, back to front. Each plane has a job, and
most shots use five to eight of them; a calm end card can use three.

**The direction decides what each plane is, so two films never share one.**
The soft spot and drifting dust in the recipes below are one direction's
light and atmosphere, not the house look. In the other directions
(`miran-dsh-directions`) the planes are different things:

- Print shop: halftone and grain carry the atmosphere, and a stamp is the
  front detail.
- Swiss data: the grid is the back graphic, and a counter or a rule drawing
  is the action.
- Neon signal: the light is a glow on the subject, and scanlines are the
  texture.
- Editorial: a single soft shadow is the light, and there is no atmosphere
  at all; the type's own movement carries the life.

Every plane must belong to this film's direction.

1. **Light.** The scene's own light: a soft pool falling off from one side,
   larger than the frame and quieter than the subject (`kit.spot {at, size,
   intensity}` inside the scene takes its tint from the theme and works on
   light and dark grounds). It explains where the glow and the shadows come
   from. Radial, not linear: a dark linear gradient bands in the export.
2. **Atmosphere.** Something slow and far: dust in the light, embers, a soft blob
   of the accent colour, a texture. It is why a hold never reads as a still
   image. Keep it faint and slow (`kit.particles("dust", {count: 10-18, size:
   3})`, `kit.blob` blurred).
3. **Back graphics.** A large, soft, slow element that belongs to the idea: the
   product's own element blurred and enlarged, ghost type, a grid. It moves
   slower than the subject, which is what depth is (`kit.parallax`, a slow
   `kit.move`).
4. **The subject.** The screen, the object or the words, big. A UI that must be
   read fills 60-80% of the frame width; a screen at a third of the frame is
   texture, not information.
5. **Front graphics.** The details that make a frame look made, not generated:
   a label, a rule that draws, a ring, a callout line, the cursor, a burst on a
   hit, a pill with the number.
6. **Light on the subject.** A soft light behind it (`kit.spot`), one sweep
   across it at the payoff (`kit.sheen`), a glow that swells on the hit and
   settles (`kit.glow`).
7. **The camera.** One move with intent per shot: assemble, swing face-on,
   push into the part that matters (`kit.screen3d` with `face` and `push`),
   a punch on the hit (`kit.punch`), a slow push under a read (`kit.push`).

Decorations must be visible to count: 12-25% opacity for atmosphere and ghost
elements, full colour for the accent on the thing that matters. Anything under
about 8% disappears in the export and only costs render time.

## Keep every beat performing

The test: pause the film at any second. Something meaningful should be in the
middle of happening. When a beat finishes arriving with seconds left, the plan
is short of story, and atmosphere will not save it. Give each beat one of these
on the beat sheet:

- **The camera with intent**: establish wide, travel, arrive on the part that
  matters; then push slowly while it is read.
- **Staged reveals**: hold information back and pay it out on beats: the frame
  keeps gaining something.
- **The product doing its job**: the count ticks, rows land, a state flips, a
  progress bar fills, a status turns green.
- **Objects acting it out**: a card files into a stack, a chip is dragged, the
  cards fan out, a result assembles.
- **Cursor-led action**: the cursor walks the eye to a button and its click
  starts the next thing.

Ambient motion (dust, the light breathing, a 3-4% push) is the floor under
these, never the performance. And the old rule still holds in its exact form:
**words do not travel while they are being read**. A headline lands and holds
its place in the frame; the shot around it keeps going.

A frame stops completely in one place only: the breath before the climax (a
third to three quarters of a second where everything stops, then the hit). The
end card's lockup holds its place so the name can be read, while a slow push,
a drift or the light keeps the frame alive; a frozen ending is a finding.

## Cause and effect on one frame

The strongest motion is a chain where each move is visibly launched by the last:
the cursor clicks, the button squashes, a ripple leaves it, the rows answer one
after another, the number lands, the frame punches. Two rules make it read:

- **The effect starts on the frame of its cause.** A ripple three frames after
  the click looks like a coincidence. Take the frame from the cause
  (`kit.cursor(...).arrive[i]`) and hang everything on it.
- **Bigger things answer slower.** A badge answers in a blink; a whole panel
  takes longer; the camera answers last and smallest.

## Across the cut

A film feels like one camera when motion carries through the cuts:

- **Leave and enter the same way.** If the outgoing shot pushes left, the next
  one arrives moving left; if one zooms in, the next does not shrink in. Cut
  while both sides are still moving; a shot that comes to rest and then cuts
  to a shot that starts from rest is a dead beat between them.
- **One direction means "next".** Choose it for the film (left, say) and use it
  for ordinary joins. Save the others for meaning: up for a conclusion,
  zooming through for going deeper, pulling back for the big arrival.
- **Hand something across.** The strongest join passes a real object over the
  cut: the pill becomes the button, the dot becomes the mark, the cursor
  keeps travelling (`kit.match`, `kit.transition {style: "zoom", into}`).

`miran-dsh-cuts` has the joins themselves; most of them are still hard cuts on
the beat.

## Recipes

Every block is a `runScript` body run after the look script
(`miran-dsh-directions`). Each builds its scene at frame 0 so it can be tried
alone: move `start` and `end` to your beat sheet, and replace every word and
screen with your brief's real ones. The example product is a team calendar
called Dayline.

### The product world: the hero shot as a stack, the camera with intent

```js
// The product world: the hero shot as a stack of planes, the camera with intent.
const T = kit.theme();
const {w, h} = kit.size();
const css = `* { box-sizing: border-box; }
  body { margin: 0; background: ${T.surface}; color: ${T.text}; font: 500 28px/1.3 "${T.font}", system-ui; }
  .app { display: grid; grid-template-columns: 250px 1fr; height: 100%; }
  .side { background: ${T.bg}; padding: 34px 26px; display: flex; flex-direction: column; gap: 14px; color: ${T.muted}; }
  .side b { color: ${T.text}; font: 700 32px "${T.display}", system-ui; margin-bottom: 18px; }
  .main { padding: 32px 36px; display: flex; flex-direction: column; gap: 14px; }
  h1 { font: 700 46px "${T.display}", system-ui; margin: 0 0 6px; }
  .row { display: flex; align-items: center; gap: 18px; padding: 20px 24px; border-radius: 16px; background: ${T.bg}; }
  .row span { margin-left: auto; color: ${T.muted}; font-size: 24px; }
  .row.hit { background: ${T.accent}; } .row.hit span { color: ${T.text}; }`;
const html = `<style>${css}</style><div class="app"><div class="side"><b>Dayline</b><div>This week</div><div>Team: Design</div><div>Rooms</div></div>
  <div class="main"><h1>Find a time for 6 people</h1>
  <div class="row" id="tue"><b>Tue 10:00</b> 4 of 6 free<span>Ana is out</span></div>
  <div class="row hit" id="wed"><b>Wed 14:30</b> all 6 free<span>best</span></div>
  <div class="row" id="thu"><b>Thu 09:00</b> 5 of 6 free<span>Raj is flying</span></div>
  <div class="row" id="fri"><b>Fri 16:00</b> 3 of 6 free<span>two travelling</span></div>
  <div class="row" id="mon"><b>Mon 11:30</b> 4 of 6 free<span>Lee at the dentist</span></div></div></div>`;
kit.scene({start: 0, end: 150, name: "The product world"}, ({start, end}) => {
  // Back plane: this scene's own light, falling from the top left, darker than the subject.
  const light = kit.spot({at: [-w * 0.3, h * 0.35], size: w * 1.6, intensity: 0.45});
  // Atmosphere: dust drifting in that light, far behind everything.
  const dust = kit.particles("dust", {start, colors: [T.text, T.accent], count: 14, size: 3});
  // Both drift on purpose: marked, the motion critic does not grade them as crawls.
  [light.id, dust.id].forEach((id) => miran.setLayerField({layer: id, field: "intended", value: true}));
  // The subject: the real screen. Pass the page's base with its parts, or the base stays flat behind.
  const r = miran.importHtml({name: "Dayline", width: 1440, height: 760, html});
  const s = kit.screen3d([r.base, r.parts.tue, r.parts.wed, r.parts.thu, r.parts.fri, r.parts.mon], {start, width: w * 0.72,
    face: {at: start + 45}, push: {to: "wed", at: start + 90, fill: 0.86}});
  kit.spot({behind: s.surface, intensity: 0.35});
  // Light finds the answer once the push lands.
  kit.sheen(r.parts.wed, {start: start + 118, dur: 26});
});
return "the product world";
```

### Cause and effect: the click launches everything, on its frame

```js
// Cause and effect: the cursor's click launches everything that follows, on the same frame.
const T = kit.theme();
const {w, h} = kit.size();
const css = `* { box-sizing: border-box; }
  body { margin: 0; background: ${T.surface}; color: ${T.text}; font: 500 30px/1.3 "${T.font}", system-ui; }
  .wrap { padding: 44px 52px; display: flex; flex-direction: column; gap: 16px; }
  .top { display: flex; align-items: center; } .top h1 { font: 700 50px "${T.display}", system-ui; margin: 0; }
  .btn { margin-left: auto; padding: 18px 30px; border-radius: 40px; background: ${T.accent}; font-weight: 700; }
  .p { display: flex; align-items: center; gap: 18px; padding: 18px 22px; border-radius: 16px; background: ${T.bg}; }
  .av { width: 54px; height: 54px; border-radius: 27px; display: grid; place-items: center; font: 700 24px "${T.font}", system-ui; color: ${T.bg}; }
  .p span { margin-left: auto; color: ${T.muted}; font-size: 26px; }`;
const ppl = [["AN", "Ana Ruiz", T.accent2], ["RS", "Raj Shah", T.accent], ["LK", "Lee Kim", T.accent2], ["MO", "Mo Adeyemi", T.accent]];
const html = `<style>${css}</style><div class="wrap"><div class="top"><h1>Kickoff, Wed 14:30</h1><div class="btn" id="send">Send invite</div></div>
  ${ppl.map(([i, n, c], k) => `<div class="p" id="p${k}"><div class="av" style="background:${c}">${i}</div>${n}<span id="s${k}">not sent</span><b id="a${k}" style="margin-left:18px;color:${T.accent}">accepted</b></div>`).join("")}</div>`;
kit.scene({start: 0, end: 120, name: "Cause and effect"}, ({start, end, group}) => {
  kit.spot({at: [w * 0.3, h * 0.3], size: w * 1.5, intensity: 0.4});
  // The screen fills the frame: a UI shot is the UI, close enough to read.
  const r = miran.importHtml({name: "Invite", width: 1500, height: 560, html, at: [0, 0]});
  // The cursor travels on an arc, slows, clicks. Everything below hangs on its click frame.
  const btn = miran.inspectLayer({layer: r.parts.send, frame: start}).bounds.center;
  const c = kit.cursor({path: [[-w * 0.3, -h * 0.35], btn], click: [1], start: start + 6});
  const hit = c.arrive[1];
  kit.ripple({at: btn, start: hit, color: T.text, radius: 70, rings: 2});
  kit.burst({at: btn, start: hit, color: T.accent2, inner: 120, outer: 210, arc: [200, 340], n: 9});
  // The effect travels down the list: each row answers a beat after the one above (a chain, not a crowd).
  ppl.forEach((p, k) => {
    kit.exit(r.parts["s" + k], {style: "fade", start: hit + 8 + k * 5, dur: 6});
    kit.enter(r.parts["a" + k], {style: "pop", start: hit + 10 + k * 5});
    kit.lift(r.parts["p" + k], {start: hit + 8 + k * 5, dur: 8, scale: 1.02, dim: false, shadow: 0.3, until: hit + 20 + k * 5, sound: false});
  });
  // The camera answers the click: a small punch, then a slow push toward the list.
  kit.punch(group, {start: hit, to: 1.03, sound: false});
  kit.push(group, {from: 1, to: 1.04, start: hit + 14, end});
});
return "cause and effect";
```

### The statement as an image: big type, the product behind it in depth

```js
// The statement as an image: big type anchored to an edge, the product behind it in depth, a rule that draws.
const T = kit.theme();
const {w, h} = kit.size();
const s = kit.safe(0.08);
kit.scene({start: 0, end: 90, name: "Statement"}, ({start, end, group}) => {
  kit.spot({at: [w * 0.35, -h * 0.2], size: w * 1.4, intensity: 0.5});
  // Back plane: the product's own element, huge, soft and slow, so the frame has depth and a subject behind the words.
  const back = kit.pill("Wed 14:30  all 6 free", {at: [w * 0.24, -h * 0.3], size: 110, fill: T.accent, color: T.text});
  miran.addEffect({layer: back.id, effect: "gaussian_blur", params: {radius: 26}});
  miran.setProperty({layer: back.id, property: "opacity", value: 0.45});
  kit.move(back.id, {to: [w * 0.19, -h * 0.27], start, dur: end - start, ease: "linear"});
  // The words: each lands on its own beat, then holds still while it is read.
  const head = kit.lockup({align: "left", at: [s.left, h * 0.12], start: start + 4, style: "rise",
    headline: {text: "Seven messages.\nOne link.", size: 150, font: T.display}});
  // A structural rule draws under the headline: the eye's path to the next beat.
  kit.line({from: [s.left, -h * 0.08], to: [s.left + w * 0.36, -h * 0.08], width: 6, color: T.accent2, start: start + 26, dur: 18});
  // The key word glows once on the hit and settles back.
  kit.glow(head.headline ? head.headline.id || head.headline : head.id, {start: start + 30, dur: 30, peak: 0.8, rest: 0, radius: 30, color: T.accent});
  kit.push(group, {from: 1, to: 1.035, start, end});
});
return "statement";
```

### Data as an object: the number races, lands, and the frame answers

```js
// Data as an object: the number races, lands on the beat, and the frame answers it.
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 0, end: 105, name: "The number"}, ({start, end, group}) => {
  const field = miran.createLayer({name: "Field", kind: "solid", width: w, height: h, fill: T.bg});
  // The old number, struck through: the before in the same frame as the after.
  const old = kit.title("11", {at: [-w * 0.27, 0], size: 520, weight: 800, font: T.display, color: T.muted, style: "none"});
  miran.setProperty({layer: old.id, property: "opacity", value: 0.22});
  kit.line({from: [-w * 0.42, -h * 0.18], to: [-w * 0.12, h * 0.2], width: 14, color: T.accent2, start: start + 8, dur: 12});
  // The new number counts down to its answer, a ring closing round it as it goes.
  kit.ring({at: [w * 0.2, h * 0.02], radius: 250, width: 10, color: T.accent, start: start + 14, dur: 36});
  const n = kit.counter({from: 11, to: 1, at: [w * 0.2, h * 0.04], size: 360, weight: 800, font: T.display, start: start + 14, dur: 36});
  kit.title("message to book the next one", {at: [w * 0.2, -h * 0.34], size: 44, weight: 600, color: T.muted, start: start + 40});
  const land = start + 50;
  // The landing: a burst outside the ring, a punch, and the field warms to the brand colour.
  kit.burst({at: [w * 0.2, h * 0.02], start: land, color: T.accent2, inner: 280, outer: 380, n: 14});
  kit.punch(group, {start: land, to: 1.05, sound: false});
  kit.color(field.id, T.surface, {start: land, dur: 18});
  kit.sfx("impact", land);
});
return "the number";
```

### Objects, not screens: features with weight that arrive and dock

```js
// Objects, not screens: the features arrive as things with weight, then dock into the product.
const T = kit.theme();
const {w, h} = kit.size();
const items = [["Rooms", T.accent], ["Focus time", T.accent2], ["Time zones", T.accent], ["Invites", T.accent2], ["Reminders", T.accent]];
kit.scene({start: 0, end: 120, name: "Objects"}, ({start, end, group}) => {
  kit.spot({at: [0, h * 0.4], size: w * 1.4, intensity: 0.4});
  kit.particles("dust", {start, colors: [T.text], count: 10, size: 3});
  // Each card is an object: it falls on an arc, overshoots, settles; the next one follows two frames late.
  const faces = [];
  const cards = items.map(([label, col], i) => {
    const c = kit.card({at: [-w * 0.36 + i * w * 0.18, -h * 0.02], w: 300, h: 380, radius: 28, fill: T.surface});
    const t = kit.title(label, {at: [-w * 0.36 + i * w * 0.18, -h * 0.12], size: 38, weight: 700, color: T.text, style: "none"});
    const dot = miran.createLayer({name: label + " icon", kind: "shape", shape: "circle", width: 120, fill: col, position: [-w * 0.36 + i * w * 0.18, h * 0.06]});
    faces.push(c.id);
    const g = kit.group([c.id, t.id, dot.id], {name: label});
    kit.move(g, {from: [(i - 2) * 80, h * 0.75], to: [0, 0], arc: i % 2 ? 0.25 : -0.25, start: start + 4 + i * 4, dur: 24, ease: "spring:snappy"});
    return g;
  });
  // Then they dock: the row tightens into one product, the carrier into the next scene.
  kit.zoom(group, {to: [0, 0], scale: 1.12, start: start + 70, dur: 40});
  kit.sheen(faces, {start: start + 80, dur: 30});
});
return "objects";
```

### The end card stays alive, then holds

```js
// The end card stays alive: it builds in order, light passes once, then it holds still to be read.
const T = kit.theme();
const {w, h} = kit.size();
const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect x="8" y="8" width="144" height="144" rx="40" fill="${T.accent}"/><rect x="40" y="70" width="80" height="20" rx="10" fill="${T.text}"/></svg>`;
kit.scene({start: 0, end: 120, name: "End card"}, ({start, end, group}) => {
  kit.spot({at: [0, h * 0.1], size: w * 1.2, intensity: 0.45});
  kit.particles("sparkles", {start, colors: [T.accent2, T.text], count: 6, size: 12});
  const e = kit.endcard({mark, wordmark: "Dayline", tagline: "Find the time, not the thread.", url: "dayline.app", size: 150, start: start + 4});
  kit.sheen(e.wordmark.id, {start: start + 34, dur: 30});
});
return "end card";
```

## Check it

- **After every beat, `inspectMotionActivity` on its frames**
  (`{start, end}`). On real launch films it reads like this:
  - the energetic ones (Lovable, Claude Design) sit at about 5-9% median,
    with almost nothing frozen;
  - the calm UI films (Cowork, Cursor 2.0) sit under 2% and hold for 2-3 s,
    which works only because each hold is a full frame of legible product.

  For a launch film with music and no voice, aim at the energetic end: about
  5% or more. Treat a still hold over about a second as a finding, unless it
  is the breath before the climax. This is the check that
  catches a slide deck; the contact sheet cannot, because stills of a frozen
  film and a living one look alike.
- `critiqueMotion` for how each move is shaped (arcs, eases, overshoot,
  lockstep). A high score says the moves are well made, not that there are
  enough of them; and its score drops to 0 while any warning stands, so read
  the findings, not the number. Atmosphere drifts on purpose: right after you
  make dust, sparkles or a breathing spot, mark it with
  `setLayerField {layer, field: "intended", value: true}`, or the critic
  calls it a crawl. Mark only atmosphere: a scene group, a camera move or
  your own moves marked intended hide real faults. Fix the findings on your own moves (words read in flight,
  jolts out of rest); never delete atmosphere, a push or an entrance to raise
  the score. A warning on a kit piece's own internal move is a note for the
  `feedback` report, not a reason to remove the piece.
- `renderContactSheet {frames: "auto"}`: each cell should show a light, a
  subject at a readable size and at least one front detail; no cell mostly
  empty field; no two cells in a row with the same layout.

## Failures you will hit

- **`kit.screen3d` with only an imported page's parts leaves the page's base
  (its background, header and sidebar) flat and still behind the 3D screen.**
  Pass the base with the parts: `[r.base, r.parts.a, r.parts.b]`.
- **An imported page taller than its content leaves an empty band** under it
  on screen. Size the page to the content (`height`), and fill it like a real
  app: six to ten rows, a sidebar, a header.
- **A font name that is not installed** (Inter, for one) falls back to Arial
  with a warning in the result. Read the warnings; the Mac families in the look
  script are installed.
- **`importHtml {at}` misplaces the page.** In 0.1.6 the page's base lands at
  twice the offset while its parts land once, so the parts float off their
  rows. Import at the centre and move the page by its root:
  `miran.setProperty({layer: r.id, property: "position", value: [x, y]})`.
  Read a part's place from `inspectLayer` bounds, not from `r.boxes`.
- **Font names in the page's CSS.** Chrome does not know "SF Pro" or
  "SF Mono" by those names: without a fallback the text comes out in a serif.
  Always end the stack with a system name: `"${T.font}", -apple-system,
  system-ui` and `ui-monospace, Menlo, monospace` for code.
- **`setTextContent` on an imported HTML part fails**: the part is a group.
  Build both states into the HTML (`not sent` and `accepted`) and swap them
  with `kit.exit` and `kit.enter`.
- **`kit.sheen` on a group or null finds nothing to light.** Sweep the visible
  layers (the card faces), not the group that moves them.
- **Rays and rings through letters read as a mistake.** Start a burst outside
  the hero (`inner` past its edge) or aim it with `arc`.

## What the study measured

The 0.1.6 study (step 5b.3) measured the DeepSeek film above, the Opus films
from 5b.2, Higgsfield's published films and a corpus of real launch films with
the same tools.

The short version: the designed launch films fill the frame with real
product, and they vary their shot lengths around a median of about 4-5 s.
The calm ones hold still on a full, legible frame, and the energetic ones
barely stop.

The DeepSeek film showed a small subject in an empty field, the same layout
five times, cuts on a fixed 2.5 s grid, and ten frozen seconds of twenty-four.
Live-action and generated films move many more pixels, so the corpus-wide
averages are not targets. The numbers are evidence for the advice above, not
goals to hit.
