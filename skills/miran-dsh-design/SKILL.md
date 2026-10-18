---
name: miran-dsh-design
description: "Frame craft for Miran Fann films - type scale and hierarchy, the smallest text a phone can read at the final frame size (including text inside a UI screen), layering and depth in three planes, filling the frame with intent, never an empty or half-built frame, contrast and colour used as an accent, and real product UI written as HTML with real copy instead of grey placeholder bars. Runnable recipes that read the film's look from kit.theme. Use when composing any shot."
whenToUse: "Whenever you lay out a shot, build a product screen, set type sizes, or a contact sheet looks plain, empty, flat or hard to read."
---

# Frame craft

Timing makes a film feel alive; design makes each frame worth looking at.
A film can move beautifully and still look plain if its frames are small type
in a big empty field, flat on one plane, with a grey card standing in for the
product. This skill is the designer's half of the job. Every recipe reads the
look from `kit.theme()` (set by the look script in `miran-dsh-directions`), so
nothing here imposes a palette or a font.

## Hierarchy: three levels, far apart

A viewer gets one look at a frame, often less than two seconds. They read the
biggest thing, then the next, then maybe a label. Pros design for that order on
purpose: **one** primary element, a few secondary ones, small tertiary detail.
When two things are nearly the same size, the eye does not know where to go
and the frame reads as busy even when it is sparse.

Film needs bigger steps between levels than a web page, because nobody can
lean in. A useful way to set them is a ratio from your smallest readable size:

```js
const T = kit.theme();
const {h, w} = kit.size();
const base = Math.round(Math.min(w, h) * 0.028);   // the smallest text that must be read
const ratio = T.motion === "calm" || T.motion === "smooth" ? 1.6 : 2.0;   // calm films step gently, loud films jump
const scale = [0, 1, 2, 3, 4].map((i) => Math.round(base * Math.pow(ratio, i)));
log("label, body, sub, headline, hero: " + scale.join(", "));
return scale;
```

At 1080p that gives about 30, 48, 77, 123, 197 px for a calm film and 30, 60,
121, 242, 484 px for a loud one. Use three of the five in any one frame, not all
five. Weight helps too: a heavy headline over a regular label is a hierarchy
even at similar sizes; two heavy weights fight.

## The readable floor

Text that cannot be read is worse than no text: it tells the viewer they are
missing something. The floor is set by the **final rendered size**, on the
smallest screen the film will meet, which is a phone.

- **What pros tend to keep:** secondary text (labels, captions, a pill, a UI
  row) at about 2.6% of the frame's short side or more once rendered: 28 px at
  1920x1080, about 40 px on a 1080x1920 vertical (2% of its height, which
  `critiqueLayout` checks), because a phone shows the whole
  vertical frame at the width of a hand. Below about 22 px at 1080p it becomes
  a grey line on a phone; `critiqueLayout` reports it as too small.
- **Rendered size is not the font size.** A text layer inside a scaled card,
  or a UI screen fitted into the frame, renders at `font_size x scale`. A
  1440 px wide HTML screen shown 1270 px wide renders its 30 px rows at about
  26 px. A screen shown at 40% of the frame renders them at 12 px: unreadable,
  whatever the CSS says.
- **So:** size UI copy for the film (28-34 px CSS rows, 52 px and up for
  titles, in a 1200-1440 px page), push in (`kit.frame`, a `screen3d` push)
  for the beat where a line must be read, and let the wide shot be a picture,
  not a paragraph.

The proof film these skills were tested against had a "214 pages" pill and a
small caption under two cards that nobody could read at phone size; both were
far below this floor. A label worth showing is worth 28 px.

```js
// The rendered size of every text layer on screen at a frame: font size x how big it is drawn there.
const f = 90;
return miran.listLayers({}).layers.filter((l) => l.kind === "text" && l.in <= f && f < l.out).map((l) => {
  const info = miran.inspectLayer({layer: l.id, frame: f});
  const size = info.layer_type.Text.layout.font_size;
  const drawn = info.bounds ? info.bounds.size[0] / Math.max(1, miran.measureText({layer: l.id}).width) : 1;
  return {name: l.name, rendered_px: Math.round(size * drawn)};
}).filter((r) => r.rendered_px < 28);
```

`critiqueLayout` checks the same thing across the film; the snippet is for the
moment you want to know why.

## Depth: three planes

A flat frame is one plane: everything at the same distance, the same
sharpness, the same speed. Real space has at least three, and pros build
them even in a "2D" film:

1. **Ground**: never a dead flat fill unless the direction is flat by design
   (poster, candy). A gradient with a slow drift, a faint grid, dots, a pool
   of light behind the subject (`kit.backdrop`, `kit.spot`).
2. **Subject**: the thing the frame is about, with a shadow that says it sits
   above the ground (`kit.card` shadows, `importHtml` box-shadows, `kit.lift`
   when it becomes the subject).
3. **Foreground**: something nearer than the subject: a shape cropped by the
   frame edge passing close, a blurred chip, particles, a big faint word.
   It moves faster than the subject (`kit.parallax`), which is what sells
   the depth.

```js
// Three planes: a lit ground, a subject card with real content, a near shape that moves faster.
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 0, end: 150, name: "Depth"}, ({start, end, group}) => {
  const card = kit.card({at: [0, 0], w: w * 0.42, h: h * 0.5, radius: 28, start: start});
  const title = kit.title("Thursday, 9:40", {at: [0, h * 0.12], size: Math.round(h * 0.06), weight: 700, font: T.display, start: start + 6});
  const line = kit.title("Standup moved to the big room", {at: [0, -h * 0.02], size: Math.round(h * 0.034), weight: 500, color: T.muted, start: start + 10});
  const chip = kit.pill("Moved by Dana", {at: [0, -h * 0.13], size: Math.round(h * 0.03), start: start + 14});
  kit.spot({behind: card.id, start: start});
  const near = miran.createLayer({name: "Near disc", kind: "shape", shape: "circle", width: h * 0.55, fill: T.accent, position: [w * 0.42, -h * 0.38]});
  miran.setProperty({layer: near.id, property: "opacity", value: 0.85});
  miran.setProperty({layer: near.id, property: "blur", value: 18});
  kit.parallax([[], [card.id, title.id, line.id, chip.id], [near.id]], {start: start, end: end, distance: 90});
});
return miran.critiqueLayout({frames: [60, 140]});
```

## Fill the frame with intent

Empty space is a material, not a leftover. The question for every frame is
whether the emptiness is composed.

- **Give the subject a size that matches its importance.** A hero product,
  word or number usually owns 40-70% of the frame's width or height. A small
  subject in a big field only works when something heavy balances it: a huge
  faint numeral, a block of colour, a rule that runs off the edge.
- **Use a grid you could draw.** Centre-everything is the default and reads as
  a template; a left column, a split screen, a rule of thirds or a full bleed
  each say something. Pick one per direction and keep it.
- **Let things bleed.** Big type, shapes and art cropped by the frame edge
  feel bigger than the frame (`kit.title({bleed: true})`). UI text never
  bleeds: half a word reads as a mistake.
- **Calm and loud directions fill differently.** Editorial and cinema can
  leave half the frame empty if the other half is heavy; poster, candy and
  data use the whole frame.

```js
// A frame that fills with intent: a huge ghost number as counterweight, the claim on a left column.
// Ghost type is faint ink (5-8% opacity): the eye and critiqueLayout read it as texture, not as words.
// The ghost moves; the words being read stay still.
const T = kit.theme();
const {w, h} = kit.size();
const s = kit.safe(0.08);
kit.scene({start: 0, end: 120, name: "Claim"}, ({start, end}) => {
  const big = kit.title("38", {at: [w * 0.24, -h * 0.04], size: Math.round(h * 0.9), weight: 800, font: T.display, color: T.text, style: "none", bleed: true});
  miran.setProperty({layer: big.id, property: "opacity", value: 0.06});
  kit.lockup({align: "left", at: [s.left, 0], start: start + 4,
    kicker: "Hours a week on repeat questions",
    headline: {text: "Questions pile up.\nAnswers hide.", font: T.display},
    sub: "Most support teams answer the same ten questions all week."});
  kit.push(big.id, {from: 1, to: 1.06, start: start, end: end});
});
return miran.critiqueLayout({frames: [100]});
```

## Never an empty frame

A frame with only the ground in it, or a container with nothing in it yet, is
the single most common thing that makes a film look unfinished. The proof
film had both: a blank frame between its last beat and its end card, and a
card shell that arrived seconds before its content. They come from four habits:

- **Scenes that start empty.** `kit.scene` layers exist from `start`; if every
  entrance begins at `start + 8`, the first eight frames show only the ground.
  Compose frame `start` already: the hero is there, or it enters at `start`,
  or a transition covers the cut.
- **Gaps between scenes.** One scene ends at 330, the next starts at 336:
  six frames of nothing. Scenes should meet exactly; check the scene table in
  `listLayers`.
- **Containers that arrive empty.** A card, phone or window enters, and its
  content arrives a second later. Bring the content in with the container
  (a few frames behind it, not a second), or write the whole thing as HTML
  with the rows already in it.
- **Words painted under their card.** Layers paint in the order they are made,
  last on top. Make the card first and its words after; text made before its
  card ends up hidden under it, and the frame shows blank cards. After
  `parentLayer`, a child's position is read relative to its parent, so either
  place the words in the card's own coordinates before parenting or leave them
  unparented and give them the same entrance and rotation as the card.
- **Exits that finish early.** Everything leaves at 300 and the next beat
  starts at 320. Exit into the cut, or cut on the exit.

The check is quick: `critiqueLayout` reports empty frames, and
`renderContactSheet {frames: "auto"}` shows both sides of every cut, which is
exactly where they hide.

## Contrast and colour as an accent

- **Most of the frame is ground and surface; the accent is small.** Pros
  often land near 60% ground, 30% surface and type, 10% accent. The accent
  works because it is rare: put it on the one word, number, button or line
  the frame is about.
- **One accent per frame**, two at most when a chart needs a comparison.
- **Measure it.** `kit.palette` (in the look script) reports the contrast of
  text, muted, accent and accent2 against the ground. Body and labels want
  4.5:1, display type 3:1; an accent under 3:1 is for fields and shapes, not
  for words.
- **Type on a surface of its own colour vanishes.** Muted text on a surface
  that is close to the ground is the usual case; `critiqueLayout` reports
  text on a surface of its own colour.
- **Colour can be the transition.** A field that flips to the accent on the
  beat (`kit.color` on the backdrop, `kit.wipe`) is one of the strongest
  devices there is, precisely because the accent was rare until then.

## Real product UI, never placeholders

Grey bars in a rounded rectangle are not a product; they are a promise of one.
Models copy example code more faithfully than prose, so every product shot in
these skills is built from real-looking UI with real copy:

- **`importHtml`**: write the screen as HTML and CSS the way a front-end
  developer would, with the colours and fonts from `kit.theme()` and the
  product's real words: names, dates, numbers, states. Every element with an
  `id` becomes its own layer, ready for `kit.screen3d`, `kit.frame`,
  `kit.lift` and `kit.cursor`.
- **`kit.code`** for code, **`kit.counter`**, **`kit.bars`** for data,
  **`kit.pill`** and **`kit.flow`** for tags and chips.
- **Fill the screen.** A screen with three rows and 60% empty space reads as a
  placeholder too. Real apps are dense: a sidebar with sections, a header with
  a search and an avatar, a list with six to ten real rows, a detail pane.
  The push-in then picks the part that matters.
- **Highlights are tints.** A solid accent bar behind a line of code or a row
  makes its text unreadable; a tint keeps it legible
  (`highlight: [{line: 6, color: T.accent + "55"}]`).
- **Small chrome is texture, not information.** `kit.code`'s file-name bar
  and similar window chrome come out around 18 px; fine as texture, never the
  thing the viewer must read.
- **Say where the UI came from** in your report: written as HTML in the
  product's style, captured from the live product, or invented. Never present
  invented screens as the real product.

```js
// A real-looking app screen from the theme, with real copy, then into 3D.
const T = kit.theme();
const css = `
  * { box-sizing: border-box; }
  body { margin: 0; background: ${T.surface}; color: ${T.text}; font: 500 28px/1.4 "${T.font}", system-ui; }
  .app { display: grid; grid-template-columns: 300px 1fr 420px; height: 100%; }
  .side { background: ${T.bg}; padding: 40px 28px; display: flex; flex-direction: column; gap: 10px; color: ${T.muted}; }
  .brand { color: ${T.text}; font: 700 34px "${T.display}", system-ui; margin-bottom: 26px; }
  .nav { padding: 10px 16px; border-radius: 12px; }
  .nav.on { background: ${T.accent}; color: ${T.bg}; font-weight: 700; }
  .main { padding: 44px 48px; display: flex; flex-direction: column; gap: 14px; }
  h1 { font: 700 54px/1.1 "${T.display}", system-ui; margin: 0 0 12px; }
  .row { display: flex; gap: 16px; align-items: center; padding: 18px 22px; border-radius: 16px; border: 1px solid ${T.line}; background: ${T.bg}; }
  .row b { font-weight: 700; } .row span { margin-left: auto; color: ${T.muted}; font-size: 26px; }
  .pane { background: ${T.bg}; border-left: 1px solid ${T.line}; padding: 44px 36px; display: flex; flex-direction: column; gap: 16px; }
  .k { color: ${T.muted}; font-size: 24px; text-transform: uppercase; letter-spacing: .08em; }
  .big { font: 700 72px/1 "${T.display}", system-ui; color: ${T.accent}; }`;
const r = miran.importHtml({name: "App", width: 1440, height: 900, html: `<style>${css}</style>
<div class="app">
  <div class="side"><div class="brand">Relay</div><div class="nav on">Inbox</div><div class="nav">Assigned to me</div><div class="nav">Waiting</div><div class="nav">Done</div></div>
  <div class="main"><h1 id="title">Inbox</h1>
    <div class="row" id="r1"><b>Refund for order 4471</b><span>2 min</span></div>
    <div class="row" id="r2"><b>Can I change my plan mid-month?</b><span>9 min</span></div>
    <div class="row" id="r3"><b>Invoice shows the wrong VAT number</b><span>14 min</span></div>
    <div class="row" id="r4"><b>Login link expired twice</b><span>31 min</span></div>
    <div class="row" id="r5"><b>Bulk export to CSV?</b><span>1 h</span></div>
  </div>
  <div class="pane" id="pane"><div class="k">Median first reply</div><div class="big">4 min</div><div class="k">Open today</div><div class="big">23</div></div>
</div>`});
kit.scene({start: 0, end: 150, name: "Product"}, ({start}) => {
  kit.screen3d([r.parts.title, r.parts.r1, r.parts.r2, r.parts.r3, r.parts.r4, r.parts.r5, r.parts.pane], {start: start + 2, face: {at: start + 60}, push: {to: "pane", at: start + 100}});
});
return Object.keys(r.parts);
```

## Check it

- `renderContactSheet {frames: "auto"}`, then look at it at the size of a
  phone: can you read every word that is meant to be read? Is there one
  obvious first thing in each cell? Is any cell nearly empty?
- `critiqueLayout`: too small, empty frames, collisions, text past the safe
  area, text on its own colour.
- Squint at the sheet: if the cells blur into one grey, the hierarchy is too
  flat; if one colour is everywhere, the accent is not an accent.
