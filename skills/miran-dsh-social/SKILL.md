---
name: miran-dsh-social
description: "Vertical social films in Miran Fann - 9:16 at 1080x1920, a hook that earns the first second (claim, question, surprise, before and after), type that survives a phone, the app's own interface and the clear box around it, short shots cut on the beat, real phone screens with real copy, loops that close, and a beat-by-beat runScript skeleton that reads its look from kit.theme. Use for Reels, TikTok, Shorts, stories and vertical ads."
whenToUse: "Any 9:16 film, vertical cut of a horizontal film, social ad, hook, story or loop. Load miran-dsh-directions first."
---

# Vertical

A vertical film is watched on a phone, at arm's length, often muted, with a
thumb ready to leave. The first second decides whether the rest exists. The
direction card (`miran-dsh-directions`) matters even more here: a feed is a
wall of films that look alike, and the one with a point of view is the one
that stops the thumb.

## The frame

- 1080x1920 (or 2160x3840 for a master), built vertical from the start. A
  horizontal film scaled into 9:16 has bars and type nobody can read.
- **The app owns part of the frame.** Roughly the top 270 px (the top bar),
  the bottom 420 px (caption, sound and navigation) and a 140 px column on the
  right (the buttons) are covered on Reels; TikTok and Shorts are similar.
  `kit.safe({platform: "reels"})` returns the clear box; everything that must
  be read goes inside it. `critiqueLayout {platform: "reels"}` checks it.
- **Type is bigger than you think.** A phone shows the whole 1080 px width at
  the width of a hand, so pros keep secondary text at about 40 px or more
  (2% of the frame height, the line `critiqueLayout` draws),
  captions at 44-56 px and hero words at 120 px and up, two to four words a
  line.

## The hook

The first half second gives a reason to stay. What works, and why:

- **The claim**: the boldest sentence in the film, already moving on frame 0.
  It promises a payoff.
- **The question**: one the viewer has actually asked. It opens a loop the
  film closes.
- **The surprise**: something unexpected, explained later. Curiosity is the
  cheapest retention there is.
- **The before and after**: the result first, the process after. The viewer
  stays to see how.

A logo, a fade from black or a title card is not a hook. Choose the hook on the
direction card, and make it different from your last film's.

## Rhythm

The social cuts in the study (measured from their 16:9 masters) held a shot
about 2.4 s on median, faster than an explainer and slower than a reel; pros
cutting for a vertical feed tend to go shorter still, around one second,
because every cut renews attention. Cut on the beat: `kit.music` returns
`beat_frames`. The first shot is short; the last is long enough to read the
name.

## The loop

A loop that closes gets rewatched, and a rewatch is the cheapest reach there
is. Either the last frame rhymes with the first so the replay is seamless, or
the last line sets up the first, or the last frame is the answer to the
opening question, held with the name. Never fade to black at the end of a
loop: the fade is the seam.

## The skeleton

A 15 s vertical film at 30 fps: a question hook, the turn, the product on a
phone screen, proof, and a loop back to the hook. Script 1 is the look script
from `miran-dsh-directions` with `width: 1080, height: 1920, duration_frames:
450`. The example product is a cooking app called Pantry; replace every
string and the screen with your brief's.

```js
// look: 1080x1920 450 (the look script, vertical)
// Hook, 0-36: the question lands hard on frame 0 (words slam in place; they do not slide while read).
const T = kit.theme();
const {w, h} = kit.size();
const S = kit.safe({platform: "reels"});
kit.scene({start: 0, end: 36, name: "Hook"}, ({start}) => {
  kit.words("What's for dinner?", {at: [S.cx, S.cy + h * 0.06], size: Math.round(w * 0.15), weight: 800, font: T.display, style: T.style === "pop" ? "pop" : "slam", stagger: 2, start: start - 6, max_width: S.w});   // started 6 frames early: frame 0 already shows the first word
  kit.title("you have 6 things in the fridge", {at: [S.cx, S.cy - h * 0.12], size: Math.round(w * 0.05), weight: 600, color: T.muted, style: "fade", start: start + 6, max_width: S.w});
});
return {clear_box: S};
```

```js
// continues: the turn, 36-96: the ingredients as stickers, filling the frame (a hard cut in)
const T = kit.theme();
const {w, h} = kit.size();
const S = kit.safe({platform: "reels"});
kit.scene({start: 36, end: 96, name: "Turn"}, ({start, end, group}) => {
  kit.flow(["2 eggs", "half an onion", "spinach", "feta", "rice", "1 lemon"], {at: [S.cx, S.cy + h * 0.08], width: S.w, size: Math.round(w * 0.065), gap: 22, start: start, stagger: 2});
  kit.title("That's a meal.", {at: [S.cx, S.cy - h * 0.16], size: Math.round(w * 0.11), weight: 800, font: T.display, style: "slam", start: start + 18});
});
return "turn built";
```

```js
// continues: the product, 96-300: a real phone screen, full of real content; a tap; the chosen dinner lifts
const T = kit.theme();
const {w, h} = kit.size();
const S = kit.safe({platform: "reels"});
const css = `
  * { box-sizing: border-box; }
  body { margin: 0; background: ${T.surface}; color: ${T.text}; font: 500 36px/1.3 "${T.font}", system-ui; }
  .wrap { height: 100%; padding: 56px 48px; display: flex; flex-direction: column; gap: 24px; border-radius: 56px; border: 2px solid ${T.line}; }
  .bar { display: flex; justify-content: space-between; color: ${T.muted}; font-size: 30px; }
  h1 { font: 800 70px/1.05 "${T.display}", system-ui; margin: 6px 0 4px; }
  .r { display: flex; gap: 24px; align-items: center; padding: 24px; border-radius: 28px; background: ${T.bg}; border: 1px solid ${T.line}; }
  .ph { width: 116px; height: 116px; border-radius: 22px; background: ${T.accent2}; flex: none; display: grid; place-items: center; color: ${T.bg}; font: 800 44px "${T.display}"; }
  .r b { display: block; font-size: 40px; } .r span { color: ${T.muted}; font-size: 30px; }
  .btn { margin-top: auto; text-align: center; padding: 30px; border-radius: 999px; background: ${T.accent}; color: ${T.bg}; font-weight: 800; font-size: 40px; }`;
kit.scene({start: 96, end: 300, name: "Product"}, ({start, end, group}) => {
  const r = miran.importHtml({name: "Pantry", width: 900, height: 1360, at: [S.cx, S.cy], html: `<style>${css}</style><div class="wrap">
    <div class="bar"><span>Pantry</span><span>6 items in your fridge</span></div>
    <h1>4 dinners, nothing to buy</h1>
    <div class="r" id="r1"><div class="ph">1</div><div><b>Spinach and feta omelette</b><span>12 min · uses 5 of 6</span></div></div>
    <div class="r" id="r2"><div class="ph">2</div><div><b>Lemon rice with greens</b><span>20 min · uses 4 of 6</span></div></div>
    <div class="r" id="r3"><div class="ph">3</div><div><b>Onion and egg fried rice</b><span>15 min · uses 4 of 6</span></div></div>
    <div class="r" id="r4"><div class="ph">4</div><div><b>Spinach rice bowl</b><span>18 min · uses 3 of 6</span></div></div>
    <div class="btn" id="cook">Start cooking</div></div>`});
  ["r1", "r2", "r3", "r4", "cook"].forEach((p, i) => kit.enter(r.parts[p], {style: "rise", start: start + i * 3}));
  const tap = kit.cursor({path: [[S.right - w * 0.08, S.cy - h * 0.25], r.boxes.r1.at], click: [1], start: start + 30});
  kit.lift(r.parts.r1, {start: tap.arrive[1] + 4, scale: 1.06, dim: [r.parts.r2, r.parts.r3, r.parts.r4]});
  kit.push(group, {from: 1, to: 1.04, start: start, end: end});   // the whole shot pushes, about its centre
});
kit.transition({at: 96, style: T.join || "push", dir: "up"});
return "product built";
```

```js
// continues: proof, 300-390; the loop, 390-450: the answer to the opening question
const T = kit.theme();
const {w, h} = kit.size();
const S = kit.safe({platform: "reels"});
kit.scene({start: 300, end: 390, name: "Proof"}, ({start, end, group}) => {
  kit.counter({from: 23, to: 0, prefix: "€", at: [S.cx, S.cy + h * 0.14], size: Math.round(w * 0.32), weight: 800, font: T.display, start: start, dur: 30});
  kit.title("spent on groceries tonight", {at: [S.cx, S.cy - h * 0.01], size: Math.round(w * 0.055), weight: 600, color: T.muted, start: start + 6, max_width: S.w});
  kit.flow(["no shop run", "no delivery", "12 minutes"], {at: [S.cx, S.cy - h * 0.13], width: S.w, size: Math.round(w * 0.055), start: start + 30, stagger: 4});
  kit.drift(group, {start: start, end: end, scale: 1.03, x: 0, y: 8});
});
kit.scene({start: 390, end: 450, name: "Loop"}, ({start}) => {
  kit.words("What's for dinner?", {at: [S.cx, S.cy + h * 0.12], size: Math.round(w * 0.13), weight: 800, font: T.display, style: "none", max_width: S.w});
  kit.pill("The omelette.", {at: [S.cx, S.cy - h * 0.04], size: Math.round(w * 0.08), fill: T.accent, color: T.bg, start: start + 2});
  kit.title("Pantry. Cook what you have.", {at: [S.cx, S.cy - h * 0.15], size: Math.round(w * 0.05), weight: 600, color: T.muted, start: start + 10});
});
kit.music({mood: T.mood || "playful", reveal: 96, hits: [36, 300, 390], ending: 448});
miran.setCompositionField({field: "loudness_target", value: -14});
return miran.critiqueLayout({platform: "reels"});
```

## Before calling it done

- `renderFrame` at frame 0: would you stop scrolling for it?
- `critiqueLayout {platform: "reels"}`: nothing to be read under the app's
  interface, nothing too small.
- `critiqueEdit {checks: ["retention", "captions", "flashes"], platform:
  "reels"}`: the first second, caption speed and position, photosensitivity.
- `inspectMotionActivity`: a still first second is a lost viewer.
- The loop: play the last second into the first. Is the seam invisible, or is
  the ending the answer to the opening?

## Failures you will hit

- **The horizontal film scaled to fit.** Build vertical; `exportVersions` makes
  vertical versions of a horizontal film, but fix the layout after.
- **Text in the bottom 420 px.** The app's caption and buttons cover it.
- **The hook is the logo.** Nobody waits for the product name.
- **Small type.** What reads on a desktop preview is a smudge on a phone.
- **A loop that fades.** Cut or match instead.

## What the study measured

Eight of the 95 study films are social cuts, but they were collected as 16:9
masters (the vertical uploads were unavailable), so they measure pacing, not
the vertical frame: a shot lasts about 2.4 s on median (about 18 cuts a
minute), the frame moves at about 190 px/s, and the longest still hold is
under a second. The safe areas and caption positions above come from the
platforms' own specifications.
