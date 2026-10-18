---
name: miran-dsh-launch
description: "Building a launch film in Miran Fann that lands and does not look like the last one - the five jobs of a 15-30 s launch (hook, tension, reveal on the drop, proof, end card), why pros cut it at about 1.5 s a shot, real product UI written as HTML with real words, a directed cursor, a signature moment from the direction, and a beat-by-beat runScript skeleton that reads its look from kit.theme, with swappable openings and end cards. Use for a launch, feature reveal, teaser or app-store hero."
whenToUse: "Any launch film, product teaser, feature reveal or app promo of 15-40 seconds, 16:9 or 9:16. Load miran-dsh-directions first."
---

# The launch film

A launch film has one job: make a person want the thing, then tell them its
name. Everything else is tempo. Before this skill, write the direction card
(`miran-dsh-directions`): the skeleton below has no look of its own and takes
everything from it.

## The five jobs

A launch film of 15-30 s does five things, in roughly this order. The order
is a habit of the category, not a law; what matters is that each job is done.

1. **Hook** (the first 1.5-2 s): a reason to keep watching. Your opening from
   the card: the product cold, a question, a number, a single word, a sound.
2. **Tension**: the world without the product, in one idea. Shown, not told:
   the messy calendar, the red build, the forty tabs.
3. **Reveal**: the product arrives, on the music's drop. The study's launch
   films nearly all hold back the full arrangement until the product appears;
   the contrast between a sparse open and a full drop is the most reliable
   structural device in the category.
4. **Proof**: it works. Two or three quick, specific shots: the feature
   doing its thing, a number, a detail you can read.
5. **End card**: the name and one line, held still long enough to read
   (about 1.5-2.5 s), in the style your card chose.

A 30 s film usually spends its extra time on proof, not on the hook: a hook
that takes four seconds has stopped being a hook.

## Why it cuts so fast

The app and hardware launch films in the study cut about every 1.5 s (median
1.55 s for app launches, 1.59 s for hardware). Pros cut that fast because a
launch film sells a feeling of momentum, and each new shot is a small reward
for the eye. But the spread is wide (from under a second to over seven): the
fast cuts come in the tension and proof, and the product and end card get the
long holds. Alternate scale while you do it: wide, detail, wide, detail. Two
wides in a row read as one long scene.

## The product, honestly

- **Real UI, real words.** Write the screen as HTML with `importHtml`: the
  product's own names, dates, numbers and states, styled from `kit.theme()`.
  Grey bars in a card are not a product, and a viewer feels it at once.
- **Dense, like a real app.** A sidebar, a header, six to ten rows or a full
  grid. The push-in chooses the part that matters; the wide shot proves it is
  a real product.
- **Readable where it must be read.** A screen fitted to 66% of the frame
  shows 30 px CSS text at about 26 px; at 40% of the frame it is unreadable.
  Push in (`screen3d` push, `kit.frame`) for the beat that must be read
  (`miran-dsh-design` has the arithmetic).
- **One cursor, two or three stops.** A click should visibly cause something:
  a row strikes through, a panel opens, a number changes.

## The skeleton

This is one structure: an opening, the tension, the reveal on the drop, two
proof shots and an end card, 20 s at 30 fps. It is a set of scripts run in
order, one beat each. Script 1 is the look script from
`miran-dsh-directions` (with `duration_frames: 600`); every script below reads
the look from it, including the direction's title entrance (`T.style`), its
signature join (`T.join`) and its alignment (`T.align`).

The example product is a team calendar called Dayline. Replace every string
with your brief's real words, and every screen with your product's.

### Beat 1, the opening: pick the one on your card

Cold open on the product, already mid-action at frame 0:

```js
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 0, end: 60, name: "Hook"}, ({start, end, group}) => {
  const r = miran.importHtml({name: "Hook screen", width: 1440, height: 900, html: `<style>
    body { margin: 0; background: ${T.surface}; color: ${T.text}; font: 500 30px/1.35 "${T.font}", system-ui; }
    .wrap { padding: 60px 72px; display: flex; flex-direction: column; gap: 22px; }
    h1 { font: 700 64px/1.05 "${T.display}", system-ui; margin: 0 0 14px; }
    .slot { padding: 26px 30px; border-radius: 18px; background: ${T.bg}; border: 1px solid ${T.line}; display: flex; gap: 20px; }
    .slot b { font-weight: 700; } .slot span { margin-left: auto; color: ${T.muted}; }
    .slot.pick { background: ${T.accent}; color: ${T.bg}; } .slot.pick span { color: ${T.bg}; }
  </style><div class="wrap"><h1>Find a time for 6 people</h1>
    <div class="slot"><b>Tue 10:00</b> 4 of 6 free<span>conflict: Ana</span></div>
    <div class="slot pick" id="best"><b>Wed 14:30</b> all 6 free<span>best</span></div>
    <div class="slot"><b>Thu 09:00</b> 5 of 6 free<span>conflict: Raj</span></div>
    <div class="slot"><b>Fri 16:00</b> 3 of 6 free<span>two travelling</span></div></div>`});
  kit.frame([r.parts.best], {start: start, dur: 40, fill: 0.72, hold: 20});
  kit.cursor({path: [[w * 0.2, -h * 0.25], [w * 0.05, 0]], click: [1], start: start + 4});
});
return "hook built";
```

A data point racing to the claim:

```js
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 0, end: 60, name: "Hook"}, ({start, end, group}) => {
  const n = kit.counter({to: 11, at: [0, h * 0.08], size: Math.round(h * 0.32), weight: 800, font: T.display, start: start, dur: 34});
  kit.title("messages to book one meeting", {at: [0, -h * 0.2], size: Math.round(h * 0.05), weight: 500, color: T.muted, start: start + 6});
  kit.punch(group, {start: start + 34, to: 1.05, back: 10});
});
return "hook built";
```

A single word, then the sentence:

```js
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 0, end: 30, name: "Word"}, ({start}) => {
  kit.title("Tuesday?", {at: [0, 0], size: Math.round(h * 0.34), weight: 800, font: T.display, style: T.style || "slam", start: start, bleed: true});
});
kit.scene({start: 30, end: 60, name: "Sentence"}, ({start}) => {
  kit.words("No, Wednesday. No, Thursday.", {at: [0, 0], size: Math.round(h * 0.09), weight: 700, font: T.display, style: "slam", stagger: 3, start: start, highlight: {word: "Thursday.", pill: true}});
});
return "hook built";
```

### Beat 2, the tension: the world without the product, shown

```js
// continues: runs after your opening
// The thread is the picture: real messages stacking up on one edge, the claim on the other.
// The messages land fast (3 frames apart) so the frame is full within a second; the words hold still.
const T = kit.theme();
const {w, h} = kit.size();
const s = kit.safe(0.08);
kit.scene({start: 60, end: 150, name: "Tension"}, ({start, end}) => {
  const msgs = ["Does Tue work?", "I'm out Tue", "Wed after 2?", "Can't, dentist", "Thu morning?", "Raj is flying", "Next week then?"];
  const pills = msgs.map((m, i) => kit.pill(m, {size: Math.round(h * 0.04), fill: i % 2 ? T.surface : T.accent, color: i % 2 ? T.text : T.bg}));
  const thread = kit.stack(pills, {at: [-w * 0.2, 0], gap: Math.round(h * 0.022), align: "start", start: start, stagger: 3});
  kit.lockup({align: "left", at: [w * 0.06, 0], start: start + 22,
    headline: {text: "Seven messages.\nNo meeting.", size: Math.round(h * 0.09), font: T.display}});
  kit.push(thread.id, {from: 1, to: 1.04, start: start, end: end});
});
return "tension built";
```

### Beat 3, the reveal on the drop: the signature moment

The product itself, assembled in 3D, swinging face-on and pushing into the
part that matters, with the direction's join into it. If your signature is a
different one (a word becoming the product, the click opening a world, the
light finding it), build that here instead (the table in
`miran-dsh-directions` names the pieces).

```js
// continues
const T = kit.theme();
const {w, h} = kit.size();
const css = `
  * { box-sizing: border-box; }
  body { margin: 0; background: ${T.surface}; color: ${T.text}; font: 500 26px/1.3 "${T.font}", system-ui; }
  .app { display: grid; grid-template-columns: 260px 1fr; height: 100%; }
  .side { background: ${T.bg}; padding: 36px 26px; display: flex; flex-direction: column; gap: 12px; color: ${T.muted}; }
  .logo { color: ${T.text}; font: 700 34px "${T.display}", system-ui; margin-bottom: 20px; }
  .side .on { color: ${T.text}; font-weight: 700; }
  .main { padding: 30px 34px; }
  .top { display: flex; align-items: baseline; gap: 18px; margin-bottom: 18px; }
  .top h1 { font: 700 46px "${T.display}", system-ui; margin: 0; } .top span { color: ${T.muted}; }
  .grid { display: grid; grid-template-columns: 70px repeat(5, 1fr); gap: 8px; }
  .d { color: ${T.muted}; font-size: 24px; padding: 4px 8px; } .t { color: ${T.muted}; font-size: 22px; }
  .ev { border-radius: 12px; padding: 10px 12px; font-size: 22px; background: ${T.bg}; border: 1px solid ${T.line}; }
  .ev b { display: block; font-size: 23px; }
  .hit { background: ${T.accent}; color: ${T.bg}; border: none; }`;
const ev = (t, n, cls, id) => `<div class="ev ${cls || ""}" ${id ? `id="${id}"` : ""}><b>${t}</b>${n}</div>`;
const html = `<style>${css}</style><div class="app">
  <div class="side"><div class="logo">Dayline</div><div class="on">This week</div><div>Team: Design</div><div>Rooms</div><div>Focus time</div></div>
  <div class="main"><div class="top"><h1>Oct 20 - 24</h1><span>6 people, 3 time zones</span></div>
  <div class="grid" id="week">
    <div></div><div class="d">Mon</div><div class="d">Tue</div><div class="d">Wed</div><div class="d">Thu</div><div class="d">Fri</div>
    <div class="t">9:00</div>${ev("Standup", "15 min")}${ev("Standup", "15 min")}${ev("Standup", "15 min")}${ev("Standup", "15 min")}${ev("Standup", "15 min")}
    <div class="t">11:00</div>${ev("Focus", "Ana, Raj")}<div></div>${ev("Review", "Brand v3")}<div></div>${ev("Focus", "all")}
    <div class="t">14:30</div><div></div>${ev("1:1", "Lee")}${ev("Kickoff", "all 6 free", "hit", "kickoff")}<div></div><div></div>
    <div class="t">16:00</div>${ev("Interview", "Product")}<div></div><div></div>${ev("Demo", "Q4 plan")}${ev("Retro", "45 min")}
  </div></div></div>`;
kit.scene({start: 150, end: 300, name: "Reveal"}, ({start}) => {
  const r = miran.importHtml({name: "Dayline", width: 1440, height: 900, html: html});
  kit.screen3d([r.parts.week, r.parts.kickoff], {start: start, face: {at: start + 50}, push: {to: "kickoff", at: start + 95, fill: 0.55}});
  kit.title("One link. Everyone's free time.", {at: [0, -h * 0.4], size: Math.round(h * 0.045), weight: 600, style: T.style, start: start + 100});
});
kit.transition({at: 150, style: T.join || "push", dir: "left"});
return "reveal built";
```

### Beat 4, proof: two quick, specific shots

```js
// continues
// The card arrives with its content on it: a container never enters empty.
const T = kit.theme();
const {w, h} = kit.size();
const s = kit.safe(0.08);
kit.scene({start: 300, end: 390, name: "Proof: the invite"}, ({start, end}) => {
  const cx = w * 0.16;
  const card = kit.card({at: [cx, 0], w: w * 0.4, h: h * 0.6, radius: 30, start: start});
  kit.title("Kickoff", {at: [cx, h * 0.17], size: Math.round(h * 0.065), weight: 700, font: T.display, style: "rise", start: start + 2});
  kit.title("Wed 14:30 - 15:15", {at: [cx, h * 0.07], size: Math.round(h * 0.038), weight: 500, color: T.muted, style: "rise", start: start + 4});
  kit.flow(["Ana", "Raj", "Lee", "Mo", "Sun", "Kit"], {at: [cx, -h * 0.06], width: w * 0.32, size: Math.round(h * 0.034), start: start + 6, stagger: 2});
  kit.pill("All 6 accepted", {at: [cx, -h * 0.2], size: Math.round(h * 0.038), fill: T.accent, color: T.bg, start: start + 20});
  kit.lockup({align: "left", at: [s.left, 0], start: start, style: "rise",
    kicker: {text: "Sent in", size: Math.round(h * 0.03)}, headline: {text: "one tap", size: Math.round(h * 0.12), font: T.display}});
  kit.push(card.id, {from: 1, to: 1.03, start: start, end: end});
});
kit.scene({start: 390, end: 480, name: "Proof: the number"}, ({start, end}) => {
  // Before and after in one frame: the old number as ghost type, struck through; the new one set big.
  const ghost = kit.title("11", {at: [-w * 0.2, -h * 0.02], size: Math.round(h * 0.85), weight: 800, font: T.display, color: T.text, style: "none"});
  miran.setProperty({layer: ghost.id, property: "opacity", value: 0.08});
  kit.line({from: [-w * 0.42, -h * 0.02], to: [w * 0.02, h * 0.1], width: Math.round(h * 0.014), color: T.accent, start: start + 6, dur: 14});
  kit.lockup({align: "left", at: [w * 0.06, 0], start: start, style: "rise", max_width: w * 0.42,
    headline: {text: "1 message", size: Math.round(h * 0.12), font: T.display}, sub: {text: "to book the next one", size: Math.round(h * 0.05)}});
  kit.push(ghost.id, {from: 1, to: 1.05, start: start, end: end});
});
return "proof built";
```

### Beat 5, the end card: pick the one on your card

Left lockup on the grid (editorial, Swiss, print):

```js
// continues
const T = kit.theme();
const {w, h} = kit.size();
const s = kit.safe(0.1);
kit.scene({start: 480, end: 600, name: "End card"}, ({start, end, group}) => {
  const b = kit.lockup({align: "left", at: [s.left, 0], start: start + 4, size: Math.round(h * 0.13),
    kicker: "Out today", headline: {text: "Dayline", font: T.display}, sub: "Find the time, not the thread.", url: "dayline.app"});
  kit.line({from: [s.left, b.box.bottom - h * 0.05], to: [s.left + w * 0.3, b.box.bottom - h * 0.05], width: 4, color: T.accent, start: start + 20});
});
return "end card built";
```

Wordmark slam on a colour field (poster, candy, neon):

```js
// continues
const T = kit.theme();
const {w, h} = kit.size();
kit.scene({start: 480, end: 600, name: "End card"}, ({start, end, group}) => {
  const field = miran.createLayer({name: "End field", kind: "solid", width: w, height: h, fill: T.bg});
  kit.color(field.id, T.accent, {start: start, dur: 6});
  kit.title("Dayline", {at: [0, h * 0.04], size: Math.round(h * 0.26), weight: 800, font: T.display, color: T.bg, style: "slam", start: start + 2});
  kit.title("Find the time, not the thread.", {at: [0, -h * 0.16], size: Math.round(h * 0.045), weight: 600, color: T.bg, start: start + 16});
  kit.push(field.id, {from: 1, to: 1.04, start: start, end: end});
});
return "end card built";
```

The product as the end card (glass, cinema, warm): build the end card scene
with `kit.screen3d` of the same screen at rest, tilted and slightly dimmed, and
`kit.endcard({wordmark, tagline})` over it, so the last thing seen is the
product and its name together.

### Sound, then the check

```js
// continues
const T = kit.theme();
const m = kit.music({mood: T.mood || "tech", reveal: 150, hits: [300, 390, 480], ending: 585});
kit.sfx("impact", m.drop_frame || 150);
miran.setCompositionField({field: "loudness_target", value: -14});   // web and social; -16 for a calm film
return {drop: m.drop_frame, edit: m.edit};
```

```js
// continues
return {layout: miran.critiqueLayout({}), motion: miran.critiqueMotion({}),
  sheet: miran.renderContactSheet({frames: "auto", out: "qa/launch.png"})};
```

## Before calling it done

- The contact sheet tells the whole arc in its cells, and could not be
  mistaken for your last film's sheet.
- Every word meant to be read is readable at phone size, including the text
  inside the product screen when it is pushed in.
- No cell is empty or shows a container waiting for its content.
- The reveal lands on the drop: `kit.music` reports `drop_frame`, and the
  product appears there.
- `critiqueMotion` in the high 80s or better, `critiqueLayout` clean.
- `checkExport` on the file: duration, loudness, size.

## Failures you will hit

- **The product appears at frame 0 and again at the reveal.** A cold open is
  fine, but then the reveal must show something new: the whole product, a
  new state, the 3D swing.
- **Every shot is a centred card.** Alternate scale and layout; the grid comes
  from the direction (`T.align`).
- **The UI is too small to read.** Push in for the beat that matters.
- **The end card says three things.** The name, one line, perhaps a URL.
- **The music starts at full energy.** Then the drop has nothing to arrive
  into: `kit.music({reveal})` builds the sparse open for you.

## What the study measured

Nine of the 95 study films are app launches (eight more are hardware
launches). Their medians: a shot lasts 1.55 s (16 cuts a minute); the frame
moves at about 180 px/s on a typical frame; the longest still hold in a film is
about 0.6 s; a word stays on screen at least half a second and the films run at
about 146 words a minute, which is why launch copy is a few short claims, not
sentences.
