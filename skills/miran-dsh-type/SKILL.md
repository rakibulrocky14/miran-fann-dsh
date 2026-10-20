---
name: miran-dsh-type
description: "Type in motion for Miran Fann, set from measurement: choosing a type system and scale, lockups that align by construction, how long a word must stay on screen to be read, which reveal (mask, rise, slam, blur, track, typewriter) suits which sentence, per-character and per-word stagger, kinetic-type beats, emphasis without extra weights, type on 9:16, and the legibility failures that come from speed, tracking and contrast. Use whenever words appear, move, change or are read in a Miran scene."
whenToUse: "Any scene with a headline, a label, a caption, a number or kinetic type - and any time text feels too fast, too small, too wide, or like it is sliding while it should be read."
---

# Words that move

Type is the most common subject in motion design and the easiest to get wrong,
because type has two jobs at once: it is a picture and it is a sentence. The
picture can move; the sentence cannot move while it is being read.

The mechanics are in `miran-create` (text layers, styles, wrap) and
`miran-motion` (animators, drivers). This skill is the judgement: size, weight,
tracking, timing, reveal, and the beats of a kinetic-type sequence.

## The type system, decided once

Pros decide the type system before the first frame and then stop improvising,
because a film that changes its type every beat reads as several films. The
direction card (`miran-dsh-directions`) already names the pair: `T.display`
for headlines and `T.font` for everything else, set in the look script. What
is left is how to use them:

- **Two families at most.** A third family is a costume change. A serif
  display over a quiet sans, or one grotesk at two weights, are the safest
  pairs; two similar sans-serifs side by side look like a mistake.
- **A few sizes, far apart.** Three or four sizes per film, stepped by a ratio
  (`miran-dsh-design` has the scale and the readable floor). More sizes read as
  accident; sizes too close together read as no hierarchy at all.
- **Two weights.** Every extra weight is a new voice. Emphasis can come from
  colour or size instead.
- **Tracking by size.** Big type wants to be closed up (about −0.02 to −0.04
  em at 64 px and up), small type wants air (+0.02 to +0.06 em under about
  28 px, and more for small capitals), because the eye judges spacing
  relative to the letter size.
- **Line height by role.** Display type is a block (about 0.95-1.05); body is
  a column (about 1.3-1.45).

## Lockups

A lockup is type plus something that must sit exactly against it: an underline,
a pill, a rule, a cursor, an icon. Build it by measurement, not by eye:

```js
const h = kit.title("Headline", {at:[0,0], size:150, start:4});
const m = miran.measureText({layer:h.id});     // boxes in comp space
```

`kit.lockup` sets every line in the theme's text font (`T.font`); give the
headline the direction's display face explicitly
(`headline: {text, font: T.display}`), or the lockup quietly loses the
direction's type.

`measureText` returns the block, each line and each word. Place the rule at
`m.y - m.height/2 - 18`, the cursor at `m.x + m.width/2`, the pill around a
word with 14 px of horizontal padding. A lockup that is 2 px off reads as a
mistake even when nobody can name it.

## How long a word stays

Comfortable reading of display type runs at about three to four words a
second, and the eye needs a moment to find a new line before it starts. So
pros give a headline of two to four words roughly 0.6-0.9 s a word, and never
much less than half a second a word plus a beat to land; in kinetic type a beat
carries one to three words for about half a second to a second. A single word
used as a shot reads in well under a second, as long as it holds still while it
is read.

Words on screen for less than about 0.3 s each are read as texture, not as a
sentence. That is a legitimate effect, but only for words that are not
carrying the message.

The kinetic-type films in the study (the numbers at the end of this skill)
kept every word up at least half a second, at about 127 words a minute: use
that to sanity-check a cut, not as a target.

## Choosing the reveal

The reveal is a sentence about the word. Pick by meaning, not by variety:

| reveal | says | use for |
|---|---|---|
| mask | "this was always here, now revealed" | the hero line, a title card |
| rise | "this arrives" | subtitles, labels, a list item |
| slam | "this lands, hard" | a claim, a price, a one-word beat |
| blur | "this resolves" | a question becoming an answer, a soft brand |
| track | "this focuses" | a lens-like brand, a product name |
| type | "this is being written" | a writing app, a terminal, a confession |
| pop | "this appears, playfully" | social, consumer, a sticker |
| fade | "this was already here" | lower thirds, credits |

`kit.title(text, {style, ...})` and `kit.words(text, {style, ...})` implement
these with a designed stagger and spring. Do not add a second entrance on top.

Stagger is the shape of the reveal, not a setting. Characters at a character's
gap move as one word; words at a word's gap let each word land; lines at a
line's gap let the eye finish one before the next. `kit.title` carries a
designed gap per style and `kit.words` a default 4-frame gap at 30 fps, read
at the composition's rate; a `stagger` you pass is frames, so at 60 double it.
If a line is long, tighten the gap rather than the read: the whole label
should finish before its hold, not at the cut.

## Kinetic type

A kinetic-type beat has one job: make a sentence land in a rhythm. What pros
tend to do, and why:

- **One thought per beat.** If a line needs a comma to be understood, it
  lands better as two beats.
- **Change one thing per beat**: scale, weight, colour or position. Change
  three and the eye cannot tell which one carries the meaning.
- **Keep a baseline** unless the grid is the design. Words that jump to a new
  baseline every beat read as a ransom note.
- **Let the punchline hold.** The beat after it can be fast.
- **Colour is emphasis**: one accent word per line at most, so the accent
  stays meaningful.

`kit.words` places each word exactly where it sits in the line, so
`highlight: {word: "ship", pill: true}` lands on the word rather than near it.

## Type on 9:16

- A phone shows the whole vertical frame at the width of a hand, so pros set
  hero type at about 120 px and up, body at 40-48 px and labels at 40 px or
  more on 1080x1920.
- Keep every line inside `kit.safe({platform:"reels"})`; the bottom 420 px and
  the right 140 px belong to the app.
- Break lines by meaning, not by width: 3-4 words per line is a headline, 6 is
  a paragraph.
- A single column, centred or left-aligned to one edge. Never centre one block
  and left-align the next.

## Legibility

- Body text wants about 4.5:1 contrast against its ground, display type
  about 3:1. `kit.palette` in the look script reports the ratio of each colour,
  so you know before you set a word in the accent.
- Type over footage needs either a scrim, a shadow, or a still area of the
  frame. `footage area` reports which of the three will read.
- Tracking below −0.05 em at small sizes closes counters; `inspectTextCoverage`
  will not catch it, your eye will.
- A font that is not installed falls back silently (a missing "Inter" drew
  Arial). `miran.importFont {family:"Inter", weights:[400,700]}` fetches and
  caches a Google family; "SF Pro", "Helvetica Neue" and "Avenir Next" are
  always safe. `inspectTextCoverage` names
  the family actually used; imported Google fonts are cached and deterministic.

## Recipes

Each recipe runs after the look script (`miran-dsh-directions`) and reads the
direction from `kit.theme()`.

### A lockup that aligns itself

```js
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);
const {w, h} = kit.size();
kit.title("Draft fast.", {at: [0, h * 0.07], size: Math.round(h * 0.14), weight: 700, font: T.display, style: T.style, start: F(4), stagger: F(2), dur: F(24)});
const second = kit.title("Fix later.", {at: [0, -h * 0.08], size: Math.round(h * 0.14), weight: 700, font: T.display, style: T.style, start: F(16), stagger: F(2), dur: F(24)});
const m = miran.measureText({layer: second.id});
miran.createLayer({name: "Rule", kind: "solid", width: m.width, height: Math.round(h * 0.006), fill: T.accent,
  position: [0, -h * 0.08 - m.height / 2 - h * 0.02]});
return {w: m.width, h: m.height};
```

### One word per beat

```js
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);
const {h} = kit.size();
const beats = [["Plan", 0], ["Build", F(20)], ["Ship", F(40)]];
for (const [word, start] of beats) {
  kit.scene({start: start, end: start + F(20), name: word}, () => {
    kit.title(word, {at: [0, 0], size: Math.round(h * 0.3), weight: 800, font: T.display, style: "slam", start: start, stagger: F(2), dur: F(16)});
  });
}
kit.sfx("impact", F(40));
return "beats built";
```

### A counter that lands

```js
const T = kit.theme();
const F = (n) => Math.round(n * kit.size().fps / 30);
const {h} = kit.size();
kit.counter({to: 12480, at: [0, h * 0.03], size: Math.round(h * 0.24), weight: 700, font: T.display, start: F(10), dur: F(54), ease: "arrive", thousands: true, label: "files reviewed this week"});
return "counter built";
```

## Check it

- `measureText` before placing anything against type.
- `critiqueLayout` — `read_in_motion` names words that travel while they are
  read; `too_small` names type under the legibility floor; `overlap` names
  collisions.
- `inspectTextCoverage` — the family actually used, and missing glyphs.
- `renderContactSheet` — read the sheet at the size a phone shows it.

## Failures you will hit

- `kit.title` with `align:"left"` treats `at.x` as the LEFT edge; with
  `"right"` as the right edge. A centred block placed with a left-edge x slides
  off frame.
- A line wider than the frame is set smaller by kit and the log says so. Pass
  `max_width` to wrap instead and keep the size.
- `text` with `\n` inside a `runScript` string must be escaped (`"A\nB"`);
  a literal newline is a syntax error and the whole script rolls back.
- `setTextContent` keeps the style; `setTextStyle` keeps the string. Neither
  resets the other.
- A counter with `style:"duration"` defaults to linear, because a clock should
  tick evenly. A value that lands reads better on `arrive`: it gathers speed
  and settles, instead of starting at full speed like a slot machine.

## What the study measured

Nine of the 95 study films are kinetic type. Their medians:

- a shot lasts 2.56 s (about 12 cuts a minute);
- the frame moves at about 270 px/s on a typical frame;
- the longest still hold in a film is 0.7 s;
- a word stays at least 0.5 s and the films run at about 127 words a minute.

The 0.5 s figure is the OCR sampling floor (2 fps), so read it as "at
least half a second", not as a measured average.
