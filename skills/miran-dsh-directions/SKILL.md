---
name: miran-dsh-directions
description: "Choosing the visual direction of a Miran Fann film so no two films look alike - nine distinct directions (palette, type pairing, layout grammar, motion personality, transitions, signature devices, sound), how to pick one from the product, audience and brand, a palette derived from a brand colour instead of a default, a menu of openings, signature moments and end cards, the look script that sets it all, and the check against making the same film again. Use before building any film."
whenToUse: "After the brief and before the treatment of every film; again whenever a film starts to look like the last one or like a template."
---

# Choose a direction

The fastest way to spot a film made by a machine is that it looks like the
last one: the same pale ground, the same centred grotesk, the same
fade-and-rise, the same wordmark-and-tagline ending. Each frame can be clean
and the film still reads as a template, because a viewer who has seen two of
them has seen them all.

Studios avoid this with one decision made before any frame: the **direction**.
A direction is not a colour. It is a package of choices that belong together:
a palette, a type pairing, a way of laying out the frame, a way of moving, a
small set of transitions, a few signature devices and a sound. Pick it from the
brief, commit to it, and the film has a voice. Pick nothing, and you get the
house look by default.

## How to pick

Read the brief for three things, then shortlist.

1. **The product's own nature.** What does it do with its hands? A code tool
   lives in text and diffs; a card lives in a wallet and a phone; a notes app
   lives on a page. The direction should feel like the product's material.
2. **The audience's taste.** Developers trust density and precision; a
   consumer audience wants warmth or play; finance buyers want calm and
   proof; creative people want a point of view.
3. **The brand's signals.** A brand colour, a typeface, a tone ("bold",
   "quiet", "friendly"). If the brand has a colour, derive the palette from it
   (below). If it has none, choose one that fits the product and say why.

Then write down **three** directions that could work, rank them, and take the
first, unless your films log (below) says you used it for this brand or this
kind of brief last time. In that case take the second and write one line on
why it also fits. That is how a second film for the same brief comes out
different on purpose, not by chance.

## Nine directions

Each is a starting package, not a costume. Keep its logic; adapt its details
to the brand.

### 1. Neon signal (dark tech)
- **Fits:** developer tools, AI, security, infrastructure, anything that
  happens in a terminal or a dashboard.
- **Palette:** a near-black ground tinted with the brand's hue, one electric
  accent (the brand colour pushed bright), a cool second accent for data. Glow
  on the accent only.
- **Type:** a precise grotesk with a mono for labels and numbers (SF Pro + SF
  Mono; Google: Space Grotesk + JetBrains Mono).
- **Layout:** dense and off-centre, a HUD of small labels around one big
  subject; UI shown at an angle (`kit.screen3d`), code panels (`kit.code`),
  a faint grid backdrop.
- **Motion:** `punchy`: fast arrivals that gather speed, crisp landings with a
  small overshoot, a hard stop only on the hit, glitch-short holds.
- **Joins:** hard cuts on the beat, a `whip` for lists, one `zoom` through a
  detail for the reveal, a `flash` on the drop.
- **Signature devices:** a `kit.sheen` across the hero panel, `kit.glow` on
  the number that matters, a scan line or a cursor that types the claim.
- **Sound:** `tech` or `dark`; `click`, `ticks`, a `sub-drop` on the drop.
- **It fails when** everything glows: then nothing is the accent.

### 2. Candy pop (bright and playful)
- **Fits:** consumer apps, social, food, games, young fintech, anything you
  use for fun.
- **Palette:** the brand colour as the ground (`ground: "brand"`), flat fields
  that flip colour on the beat, a complementary pop for stickers.
- **Type:** rounded and heavy (SF Pro Rounded 800, Arial Rounded MT Bold;
  Google: Nunito 900 or Poppins 800).
- **Layout:** big shapes that crop off the frame, stickers and pills
  (`kit.pill`, `kit.flow`), a phone face-on with real screens, blobs
  (`kit.blob`).
- **Motion:** `playful`: `spring:bouncy` pops, squash on landing
  (`kit.squash`), things that wobble once and stop.
- **Joins:** brand-colour `wipe`s, `iris` from a tap, a `match` from a sticker
  to the next shot's button.
- **Signature devices:** a colour flip on the hit (`kit.color` on the
  backdrop), a `kit.burst` when the good thing happens, cards fanning out of a
  stack (`kit.fan`).
- **Sound:** `playful` or `hype`; `pop`, one `boing`, a bright `logo` sting.
- **It fails when** every element bounces: bounce the objects, not the words.

### 3. Editorial (serif and space)
- **Fits:** writing, publishing, research, premium services, finance with
  gravitas, anything that wants to feel considered.
- **Palette:** paper or ink as the ground (`light` with a warm or cool tint,
  or `dark` as ink), one restrained accent used on a word or a rule.
- **Type:** a serif display over a quiet sans (New York or Iowan Old Style +
  Avenir Next; Google: Fraunces + Inter).
- **Layout:** left-aligned on a column, generous margins (a third of the frame
  can be empty, on purpose), hairline rules and a visible grid
  (`kit.line`), large page numbers or kickers.
- **Motion:** `calm` or `smooth`: line-by-line mask reveals, slow pushes,
  nothing bounces.
- **Joins:** hard cuts, one `slide` like a turning page, a `match` from a word
  to its place in the product.
- **Signature devices:** a sentence set huge across two lines with one word
  in italic or in the accent, a rule that draws under it, a `kit.lockup`
  ending on the grid.
- **Sound:** `minimal`, `chill` or `luxury`; `swish`, a soft `click`, a `ding`
  on the end card.
- **It fails when** the space is empty instead of composed: the empty third
  must balance something heavy.

### 4. Glass depth (layered 3D)
- **Fits:** platforms, productivity suites, operating-system-like products,
  hardware companions, anything with many surfaces.
- **Palette:** a deep `mesh` or `radial` ground built from the brand hue and
  its analogous neighbour, frosted surfaces (`kit.card({glass: true})`),
  white text.
- **Type:** a neutral system grotesk (SF Pro; Google: Inter Tight + Inter).
- **Layout:** stacked planes at different depths, a hero screen with panels
  lifted off it, light pooled behind the subject (`kit.spot`).
- **Motion:** `smooth`: long glides, parallax (`kit.parallax`), a camera that
  moves slower than the layers.
- **Joins:** `flythrough` (the foreground becomes the transition), `zoom` into
  a panel, a soft `blur` for a change of place.
- **Signature devices:** `kit.screen3d` assembling and swinging face-on, a
  panel lifting off the screen (`kit.lift`), a light pass (`kit.sheen`).
- **Sound:** `tech` or `luxury`; `air`, `swoosh`, a warm `pad`.
- **It fails when** the depth is decoration: each lift should point at the
  thing the viewer must read.

### 5. Poster type (brutalist, big type)
- **Fits:** bold launches, events, sport, music, contrarian brands, a feature
  that deserves shouting.
- **Palette:** two flat colours at full strength (ink and paper, or ink and
  the brand colour) plus one loud third used for a single word.
- **Type:** heavy condensed (Avenir Next Condensed 800, DIN Condensed,
  Impact; Google: Anton or Bebas Neue + Barlow) at 300-600 px, bleeding off
  the frame.
- **Layout:** the type is the picture: a word fills the frame, crops at the
  edges, stacks; mono labels in the corners.
- **Motion:** `punchy`: slams, shakes on impact (`kit.shake`), holds of a few
  frames, words that change on every beat.
- **Joins:** hard cuts only, plus a colour flip; one `flash` at most.
- **Signature devices:** a word that scales past the camera into the next
  shot, a colour inversion on the drop, a counter set as big as the frame.
- **Sound:** `hype`; `slam`, `impact`, and the bed's stop of silence before the drop.
- **It fails when** the type is big but the words are weak: the copy must be
  short and sharp enough to deserve 400 px.

### 6. Warm hand (illustrative)
- **Fits:** health, education, community, non-profits, food, family products,
  anything that should feel human.
- **Palette:** warm mid-tones (`light` ground tinted toward the brand's warm
  side, or a soft `brand` ground), a darker ink for type, analogous accents.
- **Type:** humanist (Seravek, Gill Sans or Optima; Google: Nunito Sans or
  Fraunces in its soft cut).
- **Layout:** drawn objects (SVG you write: a cup, a leaf, a hand, a phone)
  arranged like a spread in a picture book, handwritten-feeling lines
  (`kit.sketch`), plenty of round corners.
- **Motion:** `smooth` or `playful`: draw-ons (`kit.svg({draw: true})`),
  gentle springs, things that sway (`kit.float`).
- **Joins:** a `match` on a shape (a circle becomes a plate becomes a dot),
  soft `push`es, an `iris` from a drawn object.
- **Signature devices:** an illustration drawing itself and then filling with
  colour, a line that travels from one object to the next.
- **Sound:** `chill` or `playful`; soft `pop`s, a `slide-whistle` used once, a `chime`.
- **It fails when** the drawing is three circles and a rectangle: draw a real
  object with real details in SVG, or use `generateImage` for art you cannot
  draw.

### 7. Print shop (retro and grain)
- **Fits:** heritage brands, coffee and craft goods, indie tools, anything with
  nostalgia or a maker's pride.
- **Palette:** cream or newsprint as the ground and two spot inks
  (`harmony: "complement"`), slight misregistration.
- **Type:** slab or condensed (Rockwell, Superclarendon, American Typewriter;
  Google: Alfa Slab One + Courier Prime).
- **Layout:** stamps, badges, ticket stubs, halftone images, borders.
- **Motion:** stepped, on twos (`kit.posterize(ids, 12)`), stamps that land
  with a tiny shake, paper that slides.
- **Joins:** hard cuts and `wipe`s in the two inks; a `slide` like a card
  pulled from a deck.
- **Signature devices:** a halftone (`addEffect halftone`) on the hero, grain
  through `kit.finish({grain: 0.03})`, a stamp landing on the end card.
- **Sound:** `playful` or `chill`; `typing`, a `stomp` for the stamp, a `kick`.
- **It fails when** the grain is the idea: texture supports a concept, it
  does not replace one.

### 8. Swiss data (grid and numbers)
- **Fits:** analytics, fintech, health metrics, reports, anything whose proof
  is a number.
- **Palette:** white or black and one hot accent (red, orange, electric blue
  or the brand colour), greys for the grid.
- **Type:** a grotesk with good numerals (Helvetica Neue or DIN Alternate +
  SF Mono; Google: Inter Tight + IBM Plex Mono), huge numbers.
- **Layout:** a strict grid that draws itself (`kit.line`), numbers and charts
  as the heroes (`kit.counter`, `kit.bars`, `kit.donut`), left-aligned
  labels.
- **Motion:** `crisp`: numbers race and land, bars grow, lines draw on;
  nothing floats.
- **Joins:** `push` in the direction of progress, hard cuts on the number, a
  `match` from a bar to the next chart.
- **Signature devices:** a counter racing to the claim with the frame flipping
  to the accent as it lands, a chart whose one bar lifts (`kit.lift`).
- **Sound:** `minimal` or `tech`; `ticks` under counters, a single `bell`.
- **It fails when** there are three charts: one number, proven once, is the
  film.

### 9. Night cinema (dark and lit)
- **Fits:** premium hardware, cars, audio, fashion, anything sold on feeling.
- **Palette:** a deep dark ground, one warm light (the brand colour softened)
  pooled behind the subject, almost no other colour.
- **Type:** a high-contrast serif or a wide-tracked light sans (Didot or
  Baskerville + Avenir Next; Google: Cormorant Garamond + Josefin Sans).
- **Layout:** one subject per shot, lit (`kit.lit`, `kit.spot`), extruded
  type or logo (`kit.text3d`, `kit.logo3d`), letterboxed calm.
- **Motion:** `calm`: slow camera moves (`cameraDolly`, `cameraOrbit`), rack
  focus, `blur` reveals.
- **Joins:** slow `blur` dissolves, a `flythrough`, long holds broken by one
  hard cut.
- **Signature devices:** a light sweeping across the product
  (`kit.lit({sweep})`), a rack focus from the detail to the name.
- **Sound:** `dark`, `epic` or `ambient`; `riser`, `boom`, `braam`.
- **It fails when** it is dark and slow but has nothing to light.

## A palette from the brand colour

Reaching for a default palette is how every film ends up the same colour.
Start from the brand instead: one colour gives you a whole palette if you keep
its hue and move its lightness and saturation. Pros tend to:

- **tint the ground with the brand's hue** rather than using pure black or
  pure white, so even the neutrals belong to the brand;
- **keep the brand colour for the accent**, used on one thing per frame;
- **find the second accent by turning the hue**: about 150-180° for energy
  (neon, candy, print), about 30-40° for calm (editorial, glass), the same
  hue lighter for a quiet one-colour film;
- **measure contrast**, because a brand colour that looks strong on a swatch
  can vanish as text: body text wants 4.5:1 against its ground, display type
  3:1. An accent under 3:1 is for shapes and fields, never for words.

The look script below registers `kit.palette(brandHex, {ground, harmony})`,
which does exactly this and reports the contrast of each colour, so you can see
when the accent is only fit for shapes. `ground` is `"dark"`, `"light"` or
`"brand"` (the brand colour itself as the ground, for candy and poster films);
`harmony` is `"complement"`, `"split"`, `"analogous"` or `"mono"`.

## The look script

The first script of every film. It creates the composition, sets the look from
your direction card and nothing else; every later script reads the look back
with `kit.theme()`, so no skeleton ever carries a colour or a font of its own.

```js
// Your direction card, written before this script. Every value comes from the brief.
const CARD = {
  direction: "editorial", brand: "#2B59C3",
  why: "a tide-table app for sailors: calm, exact, trusted",
  opening: "data point", signature: "the chart draws itself and one bar lifts", end: "left lockup on the grid",
};
const LOOKS = {   // font pairs are Mac families; on Linux or Windows use the Google pair named in the direction
  neon:      {ground: "dark",  harmony: "split",      font: "SF Pro",                display: "SF Pro",                mono: "SF Mono", motion: "punchy",  backdrop: "grid",   style: "slam", join: "whip",       align: "left",   mood: "tech"},
  candy:     {ground: "brand", harmony: "complement", font: "SF Pro Rounded",        display: "SF Pro Rounded",        mono: "SF Mono", motion: "playful", backdrop: "solid",  style: "pop",  join: "wipe",       align: "center", mood: "playful"},
  editorial: {ground: "light", harmony: "analogous",  font: "Avenir Next",           display: "New York",              mono: "SF Mono", motion: "calm",    backdrop: "linear", style: "mask", join: "slide",      align: "left",   mood: "minimal"},
  glass:     {ground: "dark",  harmony: "analogous",  font: "SF Pro",                display: "SF Pro",                mono: "SF Mono", motion: "smooth",  backdrop: "mesh",   style: "blur", join: "flythrough", align: "center", mood: "luxury"},
  poster:    {ground: "brand", harmony: "complement", font: "Avenir Next Condensed", display: "Avenir Next Condensed", mono: "SF Mono", motion: "punchy",  backdrop: "solid",  style: "slam", join: "flash",      align: "center", mood: "hype"},
  warm:      {ground: "light", harmony: "analogous",  font: "Seravek",               display: "Seravek",               mono: "SF Mono", motion: "smooth",  backdrop: "radial", style: "rise", join: "push",       align: "center", mood: "chill"},
  print:     {ground: "light", harmony: "complement", font: "American Typewriter",   display: "Rockwell",              mono: "Courier", motion: "crisp",   backdrop: "dots",   style: "drift", join: "wipe",      align: "left",   mood: "playful"},
  swiss:     {ground: "light", harmony: "mono",       font: "Helvetica Neue",        display: "Helvetica Neue",        mono: "SF Mono", motion: "crisp",   backdrop: "grid",   style: "mask", join: "push",       align: "left",   mood: "minimal"},
  cinema:    {ground: "dark",  harmony: "analogous",  font: "Avenir Next",           display: "Didot",                 mono: "SF Mono", motion: "calm",    backdrop: "radial", style: "blur", join: "blur",       align: "center", mood: "dark"},
};
const L = LOOKS[CARD.direction];
// UI and tech films run at 60 fps: fps: 60, duration_frames: 1200, and every
// frame number in every later script doubled. The 30 fps values here are the
// shared notation the beat skeletons are written in; film-look pieces keep 30.
const c = miran.createComposition({name: "Main", width: 1920, height: 1080, fps: 30, duration_frames: 600});
kit.use(c.id);
kit.define("palette", (hex, o) => {
  o = o || {};
  const ground = o.ground || "dark", turn = {complement: 180, split: 150, analogous: 35, mono: 0}[o.harmony || "split"];
  const n = parseInt(hex.slice(1, 7), 16), c = [n >> 16 & 255, n >> 8 & 255, n & 255].map((v) => v / 255);
  const mx = Math.max(...c), mn = Math.min(...c), d = mx - mn, L = (mx + mn) / 2;
  const S = d ? d / (1 - Math.abs(2 * L - 1)) : 0;
  const H = !d ? 0 : mx === c[0] ? 60 * ((((c[1] - c[2]) / d) % 6 + 6) % 6) : mx === c[1] ? 60 * ((c[2] - c[0]) / d + 2) : 60 * ((c[0] - c[1]) / d + 4);
  const hsl = (h, s, l) => {
    const a = s * Math.min(l, 1 - l), f = (k) => { const t = (k + (((h % 360) + 360) % 360) / 30) % 12; return l - a * Math.max(-1, Math.min(t - 3, 9 - t, 1)); };
    return "#" + [f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
  };
  const lum = (x) => { const v = parseInt(x.slice(1, 7), 16); return [16, 8, 0].reduce((a, k, i) => { const u = (v >> k & 255) / 255; return a + [0.2126, 0.7152, 0.0722][i] * (u <= 0.03928 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4)); }, 0); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return +((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(1); };
  const s = Math.max(S, 0.15), brand = hex.toUpperCase(), h2 = H + turn;
  let p;
  if (ground === "dark") p = {bg: hsl(H, Math.min(s, 0.4), 0.06), surface: hsl(H, Math.min(s, 0.3), 0.11), text: hsl(H, 0.15, 0.95), muted: hsl(H, 0.12, 0.66), accent: brand, accent2: hsl(h2, Math.max(s, 0.6), 0.62)};
  else if (ground === "light") p = {bg: hsl(H, Math.min(s, 0.35), 0.955), surface: hsl(H, 0.2, 0.995), text: hsl(H, 0.3, 0.1), muted: hsl(H, 0.12, 0.38), accent: brand, accent2: hsl(h2, Math.max(s, 0.55), 0.42)};
  else { // the brand colour is the ground
    const ink = lum(brand) > 0.3 ? hsl(H, 0.35, 0.09) : hsl(H, 0.2, 0.97);
    p = {bg: brand, surface: hsl(H, s, L > 0.5 ? L - 0.1 : L + 0.1), text: ink, muted: lum(brand) > 0.3 ? hsl(H, 0.3, 0.24) : hsl(H, 0.3, 0.84), accent: ink, accent2: hsl(h2, Math.max(s, 0.7), lum(brand) > 0.3 ? 0.3 : 0.7)};
  }
  p.line = lum(p.bg) > 0.4 ? "#0000001F" : "#FFFFFF24";
  p.contrast = {text: ratio(p.text, p.bg), muted: ratio(p.muted, p.bg), accent: ratio(p.accent, p.bg), accent2: ratio(p.accent2, p.bg)};
  return p;
});
const p = kit.palette(CARD.brand, {ground: L.ground, harmony: L.harmony});
kit.theme({bg: p.bg, surface: p.surface, text: p.text, muted: p.muted, accent: p.accent, accent2: p.accent2, line: p.line,
  font: L.font, display: L.display, mono: L.mono, motion: L.motion,
  direction: CARD.direction, style: L.style, join: L.join, align: L.align, mood: L.mood});
kit.backdrop(L.backdrop === "solid" ? {style: "solid", color: p.bg}
  : L.backdrop === "mesh" ? {style: "mesh", colors: [p.bg, p.surface, p.bg, p.accent]}
  : {style: L.backdrop, colors: [p.bg, p.surface]});
log("card: " + JSON.stringify(CARD) + " contrast: " + JSON.stringify(p.contrast));
return {palette: p, theme: kit.theme()};
```

Later scripts start with `const T = kit.theme();` and use `T.bg`, `T.accent`,
`T.display`, `T.mono` and the rest, plus the direction's habits: `T.style`
(the title entrance), `T.join` (its signature transition), `T.align` (its
layout axis) and `T.mood` (its music). `kit.theme` keeps these extra keys with
the project, so the skeletons in the other skills never hard-code a look: they
read it. The table holds starting points; change any value the brief argues
for (a calm candy film, a centred editorial one), and write the reason on the
card.

Fonts: the families above are installed on a Mac. On Linux or Windows, or for
a brand typeface, use the Google pairing named in the direction:
`miran.importFont({family: "Space Grotesk", weights: [500, 700]})` once (it
needs the network the first time, then it is cached and the project keeps a
copy), and put that family in the theme. Check `families_used` from
`measureText` once: a missing family falls back to a plain sans silently.

Vertical films: the same script with `width: 1080, height: 1920`.

## Structure is part of the direction

Colour alone does not make two films different; structure does. Choose these
three on the card, and choose them for this product.

**Openings.** The first second decides whether anyone watches the second.

| opening | what it does | fits |
|---|---|---|
| cold open on the product | the real UI already moving at frame 0, mid-action | confident products, demos |
| the question | a question the audience has actually asked, set big | explainers, problem-led launches |
| the data point | one number racing to a claim | fintech, analytics, scale |
| a single word | one word at full frame, then the sentence | poster, editorial |
| sound-led | a sound and a single drawn line or flash answering it | cinema, neon, music-led films |
| the problem, shown | the messy before, in real UI (forty tabs, a red build) | tools that fix a pain |

**Signature moments.** The frame someone would screenshot. One per film.

| signature | how |
|---|---|
| the screen assembles in 3D and swings face-on | `kit.screen3d` with `face` and `push` |
| a word becomes the product | `kit.match` from a word to the card or button it names |
| the number lands and the frame flips colour | `kit.counter`, then `kit.color` on the backdrop or a `wipe` |
| the click opens the next world | `kit.cursor` click, then `kit.transition({style: "iris"})` from that point |
| the pull-back reveal | `kit.frame` from one detail to the whole screen, `back: true` |
| typing becomes interface | `kit.title` with `style: "type"`, then the UI it produced |
| the stack fans out | `kit.fan` on real cards |
| the light finds the product | `kit.lit({sweep})` or `kit.sheen` across the hero |

**End cards.** The last two seconds are what people remember.

| end card | how |
|---|---|
| left lockup on the grid | `kit.lockup({align: "left"})`, a rule drawing under it |
| wordmark slam on a colour field | `kit.title` with `style: "slam"` over a `kit.color` flip |
| the product is the end card | the UI tilted behind, the name and line over it |
| loop to the opening | the last frame rhymes with the first (social) |
| the line types, then the name | `kit.title` `type`, then `kit.endcard` |
| the mark built from the film's shape | `kit.match` from the film's recurring shape into the mark |

Every one of these is in `miran-dsh-launch` or `miran-dsh-design` as a
runnable recipe.

## The same-film check

Before the treatment, write the card (direction, palette source, type pair,
layout, motion, joins, opening, signature, end card) and ask two questions.

1. **Is this the default?** Pale ground, centred grotesk, fade-and-rise, a
   card with three lines, a wordmark and tagline at the end. If your card
   could describe that, it is the default with a new name. Change the
   direction, or at least two of opening, signature and end card.
2. **Is this my last film?** Hide the product name: would the card describe
   the last film you made, for this brand or any other? If yes, change it the
   same way.

Then keep a record. If you can write files, append one line per film to
`miran-films.md` in the workspace:

```text
2026-10-18 | Quill | launch 20 s 16:9 | editorial | data point | chart draws, one bar lifts | left lockup
```

Read it before you choose. Without file tools, keep the same lines in your
notes for the session. A films log is how a studio stays fresh: the work is
judged against the last piece, not against nothing.

## Check it

- `renderContactSheet {frames: "auto"}`: put it beside the last film's sheet.
  If you could swap a cell between them unnoticed, the direction is not
  carrying.
- Count the colours on the sheet: ground, surface, text, one accent and maybe
  a second. A sixth colour is an accident.
- Read the type on the sheet at the size a phone shows it (`miran-dsh-design`).
