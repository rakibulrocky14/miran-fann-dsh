---
name: miran-dsh-studio
description: "The Miran Fann studio method, end to end - the live viewer first and its link, research (the subject, its real screens and a research sheet), the brief, a direction for this brief (never a house look), treatment, a beat sheet with a picture and a performance per beat, the look script, each beat as a stack of planes, motion measured after every beat, sound, finish, export. The order of work, the handoff map and the habits that make a film look computed. Start here for any video."
whenToUse: "The first skill to load for any Miran film: launch, explainer, reel, title, social cut. Also when a film is half-built and drifting, looks like slides, or starts to look like the last one."
---

# The studio

Miran is a motion-graphics engine that a model drives through tools, not
through an editor. There is no timeline to nudge and no colleague to say the
cut is early. What there is instead is a renderer that tells the truth about a
frame, a live viewer the person watches while you work, and a set of
measurements. This skill is the order of work that turns a brief into a
finished film without losing the plot, and without making the same film twice.

## First: open the live viewer, and give the person its link

Before the brief, before any research, the first Miran call of every film is
`openViewer`. It starts the live viewer (a timeline of every layer, a preview
and the edit history, updating as you build) and returns a `url`. Put that
link in your reply straight away, as a link the person can open beside the
chat: "Live viewer: <url>". Then call `openViewer {composition: "Main"}` once
more right after the look script creates the composition, so it opens on the
film.

This is not optional and not a courtesy. The person is watching the film
being made, can scrub it, and can edit it there; their edits come back to you
in the next result as `viewer_edits`, and you build on them, never over them.
A film made without the viewer is made behind their back, and the first thing
they will ask is where it is. If you are partway into a film and have not
called it, call it now.

## Research: know the subject before you design it

The brand is the easy half of research: a logo, two colours, a typeface. A
film made from only that shows guessed screens in the right colours, and
anyone who knows the product sees it at once. So before the brief is
final, find out what the subject really is and what it really looks like.

This holds for every film, not only products. A film about a city, a habit,
a scientific idea or a person starts the same way: with the facts and the
real pictures of it.

**The subject itself.**
- Read past the home page: the feature pages, the docs or help centre, the
  pricing page, the changelog, the app store listing, the launch post or
  announcement.
- Write down, in the product's own words:
  - what it is and what it does, and who it is for;
  - the three or four moments people use it for;
  - the real names of its screens, buttons and states;
  - the real copy and the numbers it quotes.
- For a subject that is not a product: the facts, places, people, dates and
  numbers, from sources a careful reader would trust.

**What it really looks like.**
- `captureSite {url}` on the home page and on each key page: a feature page,
  a docs page with a screenshot, the pricing table, the latest changelog
  entry. `scroll` reaches below the fold, and `dark: true` shows the dark
  theme. Each capture returns the page's palette, fonts and logo, and the
  boxes of its headings, buttons and images.
- Product screenshots from the web, found with your web search and fetch
  tools: the official docs, the app store or Play listing, the press kit, the
  changelog, the README, the launch post.
- The product's demo or launch video goes through the `reference` tool. It
  gives you the real screens in motion: what clicks, what opens, what the
  result looks like. Studying references is the default for every video, and
  `miran-dsh-reference` teaches how: finding them, reading the sheets at the
  paths the tool returns, turning them into this film's own timing and motion.
- Look at every screenshot closely, the way you would before cloning a site:
  - the layout and the sidebar width;
  - the row height and the type sizes;
  - the icons, the empty and done states, the real labels.

**Rebuild, don't invent.**
- Write each screen the film needs as HTML (`importHtml`) from those
  screenshots: the product's real proportions, real labels and a believable
  amount of content.
- Third-party images and videos are study material. You look at them and
  rebuild; they never go into the film as pictures, and a reference video's
  copy is released when the film is done.
- When the person is the product's own team, the product's captured pages are
  their own material. One can open the film as itself (`captureSite {place:
  true}`) before the camera moves into the rebuilt screen.

**The research sheet.** Before the treatment, write a short sheet into the
plan and show it to the person with the viewer link. It says what you found,
where, and which real screen or picture each beat will use. Only then design.
For example:

```text
Research: Pantry (a shared grocery list)
What it is    a household list that sorts itself into the aisle order of your usual shop
For           households of two to five who shop weekly ("never buy the second milk")
Key moments   add by voice; the list re-sorts by aisle; a partner ticks an item and it
              vanishes on your phone; the running total
Real copy     "Shop once." (home), "Aisle order" (features page), "Running total" (docs)
Numbers       4.8 stars from 12k ratings (App Store page)
Screens       list view (store screenshot 2), aisle view (features page, captured),
              sharing settings (docs), dark theme (captureSite dark: true)
Brand         green #1E7F4F on cream #FBF6EC from the logo SVG and the site CSS; the
              site's -apple-system stack
Beats         1 voice-add, rebuilt from store shot 1; 2 aisle view, rebuilt from the
              features page; 3 two phones, the real ticked state; end card, the logo SVG
Invented      the partner's name and the list items (listed in the final report)
Not found     a demo video; the tablet layout
```

The person can correct the sheet before anything is built. A wrong guess
about what the product does costs one sentence here and a whole film later.
When nothing can be found (an unreleased product, no site), ask the person
for screenshots or a screen recording. If there are none, design the screens
in the brand's style and mark them invented on the sheet.

## What you write before building

Each of these is short. Together they are the film; the build is execution.

0. **Research sheet** (above): the subject, its real screens and pictures,
   and which beat uses which.
1. **Brief**: one paragraph. Product, audience, the single message, format
   (size, fps, duration), brand (colour, typeface, tone), what must be shown.
2. **Direction card**: the visual direction chosen for this brief, with its
   palette source, type pair, layout grammar, motion personality, transition
   vocabulary, opening, signature moment and end card. How to choose, and the
   nine directions to choose from, are in `miran-dsh-directions`. This is the
   step that keeps every film from looking like the last one.
3. **Treatment**: three sentences. The idea, the visual conceit, the ending.
   If the treatment could describe any product, it is not a treatment yet.
4. **Beat sheet**: the beats in frames (below), each with its picture and
   what keeps it moving. This is the edit.
5. **Sound plan**: where the drop is, which two or three moments get a sound,
   whether there is a voice (`miran-dsh-sound`).
6. **Generated shots** (when `openSettings` shows an OpenRouter key and a beat
   would gain a person, a real place, liquid, glass or a product in real
   light): one or two hero shots on the beat sheet and **one price for the set**
   in the plan, asked once. Pure UI demos, kinetic type, data stories and
   abstract brand motion stay motion design unless a generated shot clearly
   lifts them. How to judge it, what it costs and three recipes are in
   `miran-dsh-shots` ("Generated hero shots"). No key: say once that a
   generated shot could lift the film and where to add the key, then carry on.

## The order of work

```text
openViewer (give the link) -> research (the subject, its real screens) -> research sheet
      -> brief -> direction card (same-film check) -> treatment
      -> beat sheet (a picture and a performance per beat; generated hero shots
         priced as one set when a key is set and they lift the film) -> look script
      -> openViewer on the composition -> build each beat as a stack of planes
      -> after each beat: contact sheet + inspectMotionActivity -> repair
      -> sound -> critique the whole film -> finish -> export -> check the file -> films log
```

Studios keep this order because each step is expensive to redo once the next
has started. A colour decision made before the motion is final gets made
twice; a beat built before the beat sheet exists usually gets cut.

## The beat sheet

A beat is one change of idea. Write it in frames before any geometry, because
frames are what every tool speaks. Every row names three things the build
needs: **what changes** (the idea), **the picture** (what is on screen besides
the UI, and the planes behind and in front of it) and **what keeps it moving**
after it arrives (`miran-dsh-shots` has the five ways). Here is one for a 20 s
budgeting-app launch at 60 fps in the Swiss data direction, opening on a data
point:

```text
#  frames    what changes                        the picture                                  keeps moving                      sound
1  0-90      "$312" spent on forgotten subs      the number at full frame over a ghost grid   counter racing at frame 0         ticks
2  90-210    the subscriptions behind it         the app's list, filling the frame            rows land one by one, a push      soft pops
3  210-360   one tap cancels three               the list close; a burst at the tap           cursor taps, rows strike through  click, the drop
4  360-540   the month after: the bar drops      the chart as an object, the old bar ghosted  chart draws, one bar lifts, glow  a bell on the lift
5  540-690   what it is                          the app in 3D in its own light, dust in it   swings face-on, pushes in         music lifts
6  690-1200  ...                                 (and so on to the end card, which holds)
```

What makes a sheet like this work:

- **One idea per beat.** When the "what changes" column needs an "and", it is
  usually two beats, and the film will read better as two.
- **A picture, not a position.** "Headline left, UI right" is a position. If
  two rows have the same picture, change one.
- **Nothing stops after arriving.** An empty "keeps moving" cell is a beat that
  will freeze. That is the most common failure of model-made films.
- **Durations come from the kind of film**: a launch cuts about every 1.5 s, an
  explainer about every 5 s (`miran-dsh-cuts` has the measured table and why).
  Vary them: cuts on an exact grid (every 2.5 s, every 2.5 s) read as a
  metronome.
- **The biggest change sits on the drop**, and the music is built around it.
- **The last beat holds.** A film that cuts on its final frame feels cut off.

## Building

- **The look script first** (`miran-dsh-directions`): it creates the
  composition, derives the palette from the brand and sets `kit.theme`. Every
  later script begins with `const T = kit.theme();` and uses `T.accent`,
  `T.display` and the rest, so the direction lives in one place.
- **UI and tech films run at 60 fps.** Kit defaults are written at 30 fps and
  read at the composition's rate, so a piece left on its defaults lasts the same
  seconds; a `dur`, `stagger` or `start` you pass is frames, so double every
  frame number in the beat sheet and the scripts.
- **One `runScript` per beat**, named for it (`label: "beat 3: one tap cancels
  three"`). A failed script rolls back whole; a good one is one undo step.
- **Each beat is a stack of planes** (`miran-dsh-shots`), each plane drawn in
  this film's direction, never a house look: its own light, an
  atmosphere, the subject big enough to read, front details, light on the
  subject and one camera move with intent. A beat with only the subject on a
  flat ground is a slide, however well it moves.
- **Real material for the product**: screens written as HTML with
  `importHtml` and the product's real words, `kit.code`, real numbers
  (`miran-dsh-design`). Never grey bars in a card.
- **Look after every beat, with motion as well as stills**: a contact sheet of
  the beat, then `inspectMotionActivity {start, end}` on its frames. Stills
  cannot show a frozen beat; the activity numbers can.
- **Name every layer** as you would say it ("Headline", "Price", "Cursor")
  and address layers by name afterwards.
- **Build the held pose, then animate into and out of it.** A layer built
  mid-flight cannot be inspected.
- **`createCheckpoint` before a risky change**, `restoreCheckpoint` if it goes
  wrong.

## How a director checks a cut

Pros look in a fixed order, because a problem found late hides the ones
behind it. Each look has a tool:

- **Does it render?** `renderFrame` at three frames: no missing assets, no
  blank frames.
- **Does it read?** `renderContactSheet {frames: "auto"}` shows each scene and
  both sides of every cut. Look at it at phone size: one idea per cell, every
  word meant to be read is readable, no cell empty or half-built.
- **Does it fit?** `critiqueLayout`: collisions, type past the safe area,
  type too small, empty frames, frozen holds.
- **Is it alive?** `inspectMotionActivity`: the share of the frame changing,
  second by second, and every still hold. Energetic launch films sit at about
  5-9% median with almost nothing frozen (Lovable, Claude Design); calm UI
  films sit under 2% and hold for 2-3 s, which works only on a full frame of
  legible product with a cursor or voice about to act. For a film carried by
  music, aim for about 5% or more, and treat a still hold over about a second
  as a finding, except the breath before the climax (the end card's words
  hold, but its frame keeps a slow push or drift).
- **Are the moves well made?** `critiqueMotion`: arcs, eases, overlap,
  follow-through, lockstep. It scores the moves that exist: a film with ten
  well-eased moves and ten frozen seconds can score 100, and a living film
  with a few warnings can score 0. Read it after the activity check, never
  instead of it; mark atmosphere `intended` (`miran-dsh-shots`), fix the
  findings on your own moves, and never clear motion to raise the number.
- **Does it cut?** `critiqueEdit {checks: ["frames", "jump", "eye", "beat"]}`:
  flashes, black frames, jump cuts, cuts off the beat.
- **Does it sound right?** `critiqueEdit {checks: ["audio"]}`, then
  `checkExport` on the file.
- **Is it this brand's film?** Put the sheet beside your last film's. If
  cells could swap unnoticed, the direction is not carrying
  (`miran-dsh-directions`).

Fix one thing at a time and look again. Three changes at once make the next
critique unreadable.

## Handoff map

| the question | skill |
|---|---|
| which direction, palette, type, opening, signature, end card | `miran-dsh-directions` |
| what goes on screen, planes, keeping a beat alive, shot recipes, generated hero shots | `miran-dsh-shots` |
| hierarchy, readable sizes, depth, filling the frame, real UI | `miran-dsh-design` |
| how long is a shot, how do I cut, which transition | `miran-dsh-cuts` |
| how does this move, which ease, how long, how to hold | `miran-dsh-motion` |
| how is this set, revealed, read | `miran-dsh-type` |
| depth, a push, a 3D screen, a rack focus | `miran-dsh-camera` |
| music, events, levels, the drop | `miran-dsh-sound` |
| finishing, grade, export, captions | `miran-dsh-polish` |
| the arc of a launch film | `miran-dsh-launch` |
| the structure of an explainer | `miran-dsh-explainer` |
| 9:16, hooks, captions, loops | `miran-dsh-social` |
| studying reference videos, matching a film's pace, an exact recreation | `miran-dsh-reference` |
| exact parameter shapes for any tool | `describeTool {tool}`, `miran.help("kit.<piece>")` |

## Habits that make a film look computed

Each has an antidote, and the skills above teach it.

1. **The same film as last time.** Same ground, same font, same ending. Choose
   a direction per brief and check it against your films log.
2. **The house look.** A pale ground, a centred grotesk and a burgundy accent
   are nobody's brand. Derive the palette from the brand colour.
3. **Placeholder or guessed product.** Grey bars in a rounded card, or a
   screen in the right colours that nobody at the company would recognise.
   Research the real screens first (captures of the key pages, the store and
   docs screenshots, the demo video), then write each one as HTML with the
   product's real words.
4. **Every shot the same length.** Take durations from the kind of film, and
   let the rhythm vary.
5. **Every move the same ease.** A visible start leaves rest (`arrive`,
   `glide`); a hidden start may arrive moving on a strong ease-out; an exit
   accelerates away; objects with mass overshoot.
6. **Everything starts on the same frame.** Stagger the things that belong to
   one gesture, and let the action, the reaction and the world start at
   different times.
7. **The slide deck.** Each beat arrives, then freezes until the cut; every
   beat the same layout. Give each beat a picture and something that keeps
   it moving (`miran-dsh-shots`), and measure it.
8. **A small subject in a big empty field.** A screen at a third of the frame
   is texture. The thing that must be read fills most of the width; the rest
   of the frame carries light, depth and detail on purpose.
9. **Type that travels while it is read.** Words hold their place while they
   are read; the shot around them (light, atmosphere, the camera) keeps
   going.
10. **One transition on every cut, or every cut on a resting frame.** Most
    joins are hard cuts, made while the motion is still going and with the
    incoming shot already travelling the same way; one signature join carries
    the film.
11. **A silent or flat film.** A bed under everything, two or three sounds per
    ten seconds, the drop on the biggest change.
12. **Working behind the person's back.** No viewer link. `openViewer` is the
    first call of every film.

## When the film drifts

- **It looks like the last one**: the direction card was skipped or ignored.
  Write it, run the same-film check, change two of opening, signature and end.
- **It feels plain**: look for one plane (no depth), a placeholder product,
  or type that is all the same size. Fix the frame before the motion.
- **It feels like slides**: run `inspectMotionActivity`; find the still holds;
  give each of those beats a performance (the camera travelling, a staged
  reveal, the product doing its job) instead of clearing motion away.
- **It feels slow**: cut the holds, not the shots; check
  `inspectMotionActivity`.
- **It feels busy**: remove one device per beat; keep the one that carries the
  message.
- **It feels generic**: the treatment could describe any product. Rewrite the
  treatment with the product's real words, screens and numbers.
- **The numbers are fine and it still feels wrong**: render a contact sheet
  and look. The eye is the last instrument, not the first.

## What the study measured

The craft notes in these skills were checked against 95 professional motion
films measured frame by frame (shot lengths, move shapes, holds, speed, cut
timing against the music, word timing). The short version, with its limits, is
in `references/study.md` beside this skill. Across 1,774 moves: the peak speed
comes early (at about 0.12 of a move's length, and in the first third for two
moves in three); 59% overshoot and settle; a typical move lasts about half a
second and travels about 180 px at 1080p. The numbers are evidence for the
advice, not targets to hit.
