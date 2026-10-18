---
name: miran-dsh-explainer
description: "Building an explainer in Miran Fann that a person can follow and remember - question, mechanism, proof, recap; why explainers hold a shot about five seconds when launch films hold one and a half; one idea per shot; diagrams from real labelled parts, arrows and a moving cause; words versus voice; the pause; and a beat-by-beat runScript skeleton that reads its look from kit.theme. Use for explainers, how-it-works films, onboarding and data stories of 30 s to 3 minutes."
whenToUse: "Any film whose job is to make something understood rather than desired: how it works, why it matters, what changed. Load miran-dsh-directions first."
---

# The explainer

An explainer is judged by one thing: can the viewer say the idea back
afterwards? Beauty and tempo help, but comprehension is the score. The
direction still matters (an explainer in the neon direction and one in the
warm direction teach the same idea to different people), so write the card in
`miran-dsh-directions` first; the skeleton reads it.

## The structure

Most explainers that work move through four parts. The proportions below are
what pros tend to give each part, and why:

- **The question** (about a tenth): state the thing the viewer already
  wonders, in their words. It earns the next minute.
- **The mechanism** (about half): how it works, in three to five steps. This
  is the film; it gets the time.
- **The proof** (about a quarter): the number, the example, the before and
  after. Without it the mechanism is a claim.
- **The recap** (about a tenth): the idea in one line, held. It states the
  answer; it does not repeat the question.

## Why the shots are long

The explainers in the study held a shot about 4.9 s on median, against about
1.5 s in launch films. Pros hold longer because a viewer has to read a
diagram, connect it to the last one and think, and a cut interrupts thinking.
The time is not empty, though: within a long shot the diagram builds, a cause
travels, a number lands. A long shot with nothing changing is a slide.

**One idea per shot.** If a shot needs two sentences of narration, it is two
shots. **Steps, not features:** a mechanism is a sequence with a before and an
after (name the parts, show the action, show the result). Three steps is a
mechanism; seven is a lecture, so group them.

## Diagrams people can read

- **Real parts with real labels.** A node is a thing the viewer knows (a
  phone, a server, a bank), drawn as an icon in SVG with a label of two or
  three words and, where it helps, a number. An unlabelled circle teaches
  nothing.
- **Arrows between real edges.** `kit.arrow(a, b)` measures the cards and runs
  edge to edge; a hand-placed arrow is always slightly wrong.
- **A cause that travels.** Something moves along the arrow (a packet, a
  coin, a request) and the thing it reaches changes. Cause and effect is what
  makes a diagram a mechanism.
- **Labels above the readable floor**: 30-36 px at 1080p, near what they
  label. A label that needs a saccade is a subtitle.
- **One chart per film.** A chart is evidence only when it is read: give it a
  hold, and lift the one bar that matters.

## Words versus voice

- On-screen words carry the claim and the labels; a voice carries the
  reasoning. Reading and listening to different sentences at once costs
  comprehension, so never show a full sentence the voice is not saying.
- Without a voice, the screen carries the argument: six to ten words per
  shot, held long enough to read twice.
- With a voice: `voiceover` writes word timings, `kit.captions` shows them.

## The pause

After a step lands, pros leave about a second where only something small moves
(a slow drift on the ground, a pulse on the result). That pause is where the
viewer connects the step to the last one. `inspectMotionActivity` should show
low but not zero change there.

## The skeleton

A 60 s explainer at 30 fps: how a content network keeps a web page fast. Script
1 is the look script from `miran-dsh-directions`; the first block below sets
the length. Every block reads the look from `kit.theme()`. Replace the topic,
the parts and the numbers with your brief's.

```js
// The question, 0-180. The look script made a 600-frame composition; an explainer needs more.
const T = kit.theme();
const {w, h} = kit.size();
miran.setCompositionField({field: "duration_frames", value: 1800});
kit.scene({start: 0, end: 180, name: "Question"}, ({start, end}) => {
  const ghost = kit.title("2.4 s", {at: [w * 0.18, 0], size: Math.round(h * 0.6), weight: 800, font: T.display, color: T.text, style: "none"});
  miran.setProperty({layer: ghost.id, property: "opacity", value: 0.07});
  kit.lockup({align: T.align === "center" ? "center" : "left", at: [T.align === "center" ? 0 : kit.safe(0.1).left, 0], start: start,
    style: "rise", kicker: {text: "A page from across the world", size: Math.round(h * 0.03)},
    headline: {text: "Why does it load\nin a blink?", size: Math.round(h * 0.11), font: T.display}});
  kit.push(ghost.id, {from: 1, to: 1.06, start: start, end: end});
});
return "question built";
```

```js
// continues: the mechanism, 180-600. Step 1 names the parts; step 2 sends the first request the long way.
const T = kit.theme();
const {w, h} = kit.size();
const icon = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><g id="i" fill="none" stroke="${T.accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${paths}</g></svg>`;
const ICONS = {
  phone: icon(`<rect x="30" y="10" width="36" height="76" rx="8"/><line x1="42" y1="74" x2="54" y2="74"/>`),
  edge: icon(`<rect x="16" y="20" width="64" height="20" rx="4"/><rect x="16" y="50" width="64" height="20" rx="4"/><circle cx="28" cy="30" r="2"/><circle cx="28" cy="60" r="2"/>`),
  origin: icon(`<circle cx="48" cy="48" r="34"/><path d="M14 48h68M48 14c12 12 12 56 0 68M48 14c-12 12-12 56 0 68"/>`),
};
// A node is a real thing with a name and a fact, never an unlabelled box.
const node = (x, key, name, note, start) => {
  const card = kit.card({at: [x, -h * 0.02], w: w * 0.22, h: h * 0.42, radius: 26, start: start});
  const art = kit.svg(ICONS[key], {at: [x, h * 0.07], width: h * 0.12, start: start + 2, style: "pop"});
  kit.title(name, {at: [x, -h * 0.07], size: Math.round(h * 0.042), weight: 700, start: start + 3});
  kit.title(note, {at: [x, -h * 0.14], size: Math.round(h * 0.032), weight: 500, color: T.muted, start: start + 4});
  return {card, art};
};
const X = [-w * 0.32, 0, w * 0.32];
kit.scene({start: 180, end: 390, name: "Step 1: the parts"}, ({start, end, group}) => {
  kit.drift(group, {start: start, end: end, scale: 1.03, x: 16, y: 0});   // the hold breathes; at this size the words still read as still
  kit.title("Three places a page can come from", {at: [0, h * 0.34], size: Math.round(h * 0.052), weight: 600, font: T.display, style: "rise", start: start});
  const n = [node(X[0], "phone", "You, in Lisbon", "asks for the page", start), node(X[1], "edge", "Edge server", "Madrid, 600 km", start + 3), node(X[2], "origin", "Origin", "Virginia, 5,800 km", start + 6)];
});
kit.scene({start: 390, end: 600, name: "Step 2: the long way"}, ({start, end, group}) => {
  kit.drift(group, {start: start, end: end, scale: 1.03, x: 16, y: 0});
  kit.title("The first request goes all the way", {at: [0, h * 0.34], size: Math.round(h * 0.052), weight: 600, font: T.display, style: "rise", start: start});
  const n = [node(X[0], "phone", "You, in Lisbon", "asks for the page", start - 30), node(X[1], "edge", "Edge server", "nothing cached yet", start - 27), node(X[2], "origin", "Origin", "Virginia, 5,800 km", start - 24)];
  const packet = miran.createLayer({name: "Request", kind: "shape", shape: "rounded", width: h * 0.06, height: h * 0.045, radius: 8, fill: T.accent, position: [X[0], -h * 0.3]});
  kit.move(packet.id, {from: [X[0], -h * 0.3], to: [X[2], -h * 0.3], arc: -0.12, start: start + 12, dur: 70});
  kit.ripple({at: [X[2], -h * 0.02], radius: h * 0.12, start: start + 82});
  kit.counter({from: 0, to: 180, suffix: " ms", at: [0, -h * 0.4], size: Math.round(h * 0.05), weight: 700, start: start + 12, dur: 70, ease: "linear"});
});
return "steps 1-2 built";
```

```js
// continues: step 3, 600-840: the copy lands at the edge; step 4, 840-1080: everyone after is served nearby
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 600, end: 840, name: "Step 3: the copy"}, ({start, end, group}) => {
  kit.drift(group, {start: start, end: end, scale: 1.03, x: 16, y: 0});
  kit.title("The edge keeps a copy", {at: [0, h * 0.34], size: Math.round(h * 0.052), weight: 600, font: T.display, style: "rise", start: start});
  kit.card({at: [-w * 0.1, -h * 0.02], w: w * 0.34, h: h * 0.44, radius: 26, start: start});
  kit.title("Edge server, Madrid", {at: [-w * 0.1, h * 0.12], size: Math.round(h * 0.042), weight: 700, start: start + 2});
  const empty = kit.pill("cache: empty", {at: [-w * 0.1, -h * 0.04], size: Math.round(h * 0.032), fill: T.bg, color: T.muted, start: start + 2});
  kit.exit(empty.id, {start: start + 50});
  const packet = miran.createLayer({name: "Copy", kind: "shape", shape: "rounded", width: h * 0.06, height: h * 0.045, radius: 8, fill: T.accent, position: [w * 0.38, -h * 0.04]});
  kit.move(packet.id, {from: [w * 0.38, -h * 0.04], to: [w * 0.02, -h * 0.04], arc: 0.2, start: start + 10, dur: 40});
  kit.exit(packet.id, {start: start + 50, style: "scale"});
  kit.flow(["index.html", "styles.css", "hero.jpg", "app.js"], {at: [-w * 0.1, -h * 0.06], width: w * 0.3, size: Math.round(h * 0.032), start: start + 52, stagger: 4});
  kit.title("kept for 24 hours", {at: [-w * 0.1, -h * 0.18], size: Math.round(h * 0.032), weight: 500, color: T.muted, start: start + 70});
});
kit.scene({start: 840, end: 1080, name: "Step 4: everyone after"}, ({start, end, group}) => {
  kit.drift(group, {start: start, end: end, scale: 1.03, x: 16, y: 0});
  kit.title("Everyone after gets that copy, nearby", {at: [0, h * 0.34], size: Math.round(h * 0.052), weight: 600, font: T.display, style: "rise", start: start});
  const edge = kit.card({at: [0, -h * 0.04], w: w * 0.24, h: h * 0.3, radius: 26, start: start});
  kit.title("Edge, Madrid", {at: [0, -h * 0.04], size: Math.round(h * 0.042), weight: 700, start: start + 2});
  const cities = [["Porto", -w * 0.36, h * 0.14], ["Seville", -w * 0.36, -h * 0.22], ["Valencia", w * 0.36, h * 0.14], ["Bilbao", w * 0.36, -h * 0.22]];
  cities.forEach(([name, x, y], i) => {
    const p = kit.pill(name + "  18 ms", {at: [x, y], size: Math.round(h * 0.034), start: start + 8 + i * 20});
    kit.arrow(p, edge, {start: start + 14 + i * 20, dur: 12});   // measured edge to edge, never hand-placed
    kit.ripple({at: [0, -h * 0.04], radius: h * 0.16, start: start + 26 + i * 20});
  });
});
return "steps 3-4 built";
```

```js
// continues: the result and the proof, 1080-1560: one number, then one chart with the bar that matters lifted
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 1080, end: 1320, name: "The result"}, ({start, end, group}) => {
  kit.drift(group, {start: start, end: end, scale: 1.03, x: 16, y: 0});
  const n = kit.counter({from: 180, to: 18, suffix: " ms", at: [0, h * 0.06], size: Math.round(h * 0.28), weight: 800, font: T.display, start: start, dur: 48});
  kit.title("from 5,800 km away to 600 km away", {at: [0, -h * 0.2], size: Math.round(h * 0.045), weight: 500, color: T.muted, start: start + 6});
  kit.glow(n.id, {start: start + 48, rest: 0.3});
  kit.ripple({at: [0, h * 0.06], radius: h * 0.3, start: start + 48});
});
kit.scene({start: 1320, end: 1560, name: "Proof"}, ({start, end, group}) => {
  kit.drift(group, {start: start, end: end, scale: 1.03, x: 16, y: 0});
  const chart = kit.bars([2400, 1900, 640, 410], {at: [0, -h * 0.06], w: w * 0.62, h: h * 0.52, suffix: " ms",
    labels: ["no cache", "browser cache", "edge copy", "edge + small images"], start: start + 2});
  // The chart's own labels come out a little under the readable floor: lift them to the film's label size.
  (chart.labels || []).forEach((id) => miran.setTextStyle({layer: typeof id === "object" ? id.id : id, font_size: Math.round(h * 0.03)}));
  kit.title("Time to first paint, same page", {at: [-w * 0.31, h * 0.34], align: "left", size: Math.round(h * 0.048), weight: 600, start: start});
  // Dim the other bars, not the whole frame (a dimmed light ground turns grey), and settle back before the cut.
  kit.lift(chart.ids[2], {start: start + 70, until: end - 12, dim: [chart.ids[0], chart.ids[1], chart.ids[3]]});
});
return "result built";
```

```js
// continues: the recap, 1560-1800: the answer in one line, held; then the bed under the whole film
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 1560, end: 1800, name: "Recap"}, ({start, end}) => {
  const ghost = kit.title("18", {at: [w * 0.24, 0], size: Math.round(h * 0.8), weight: 800, font: T.display, color: T.text, style: "none"});
  miran.setProperty({layer: ghost.id, property: "opacity", value: 0.07});
  kit.lockup({align: T.align === "center" ? "center" : "left", at: [T.align === "center" ? 0 : kit.safe(0.1).left, 0], start: start, style: "rise",
    headline: {text: "Fast is mostly\nnear.", size: Math.round(h * 0.13), font: T.display},
    sub: {text: "The page is copied close to you, once, then served from there.", size: Math.round(h * 0.04)}});
  kit.push(ghost.id, {from: 1, to: 1.06, start: start, end: end});
});
kit.music({mood: T.mood === "hype" ? "uplifting" : "chill", hits: [180, 600, 1080, 1560], ending: 1780, duck_db: 0});
miran.setCompositionField({field: "loudness_target", value: -16});   // calm, long-form
return miran.critiqueLayout({});
```

## Before calling it done

- Ask of every cell of the contact sheet: *could a viewer say what this shot
  taught them?* If not, the shot is decoration.
- Every label readable at phone size; labels near their targets; no text over
  a busy diagram.
- `inspectMotionActivity`: a few low, living pauses after the steps; no run of
  more than about two seconds where nothing changes at all.
- `critiqueMotion`: diagrams move with purpose (a draw-on, a travelling
  cause, a measure), not a generic rise on everything.
- With a voice: `critiqueEdit {checks: ["captions", "audio"]}`.

## Failures you will hit

- **Every shot a full-frame sentence.** No diagram, no object, no before and
  after: a slideshow with narration.
- **The mechanism is a list.** Steps need a before and an after, not nouns.
- **The chart is the proof.** Only if it is read: hold it and lift the bar
  that matters.
- **Text and voice say different things.** Cut the on-screen sentence.
- **The recap repeats the question.** The recap states the answer.

## What the study measured

Eight of the 95 study films are explainers. Their medians: a shot lasts 4.86 s
(about 8.6 cuts a minute); the frame moves at about 160 px/s; the longest still
hold in a film is about 1.7 s, the longest of any kind, because explainers give
the viewer time to think; on-screen words run fast (about 260 words a minute in
total, much of it labels and captions read in passing).
