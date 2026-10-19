---
name: miran-dsh-reference
description: "Studying reference videos for a Miran Fann film - when to look (by default; the product's own demo or launch video first), finding and picking them, fetching with the reference tool, reading contact sheets and the measured breakdown at the paths the tool returns, turning it into this film's own timing, framing and motion, the guide overlay and compare for exact recreations, study-only rules, releasing the videos."
whenToUse: "Any new video or a revision with a new direction, unless the person says no references or offline. Also when they give a link or clip to match, ask for a film like another film, or want an exact recreation of one."
---

# References

A studio never starts from a blank page. Before anyone builds, they watch what
already works in the same kind of film: how long it holds the product, how a
headline arrives, where the camera moves, where the cuts land. Then they make
their own film. This skill is that habit. Miran can fetch a video, lay it out
as contact sheets and measure its pacing, and it is on you to look, think and
translate.

A reference teaches you the craft of a film, never its content. Your brief, the
product's real screens, the brand and the direction card still decide what is
on screen. The reference decides how long it stays, how it moves and how it
cuts. `reference` is a direct tool call (in dsh, `mcp__miran__reference`). It
never runs inside `runScript`, in the lean tool list or the full one.

## When to look

**By default, for every video**, unless the person says to skip references,
work offline or use only the ones they gave you. That covers launches,
explainers, shorts, title sequences, cartoons and revisions that change the
direction. Look once per film, or once more when the direction changes, and
reuse the studies while you iterate. A no from the person holds for the whole
task. A reference the person supplied is the main direction; still look for one
or two more that cover what theirs does not.

**Where it sits in the order of work** (`miran-dsh-studio`): after
`openViewer` and the subject research, before the direction card.

- **The product's own demo or launch video comes first.** It shows the real
  screens in motion: what clicks, what opens, what the result looks like. It
  belongs in the research sheet next to the screenshots.
- **Then two or three films of the same kind** as the one you are making: a
  calm product film for a calm product, a hard-cut kinetic launch for a loud
  one, a vertical short for a vertical short. These feed the beat sheet and the
  motion, not the screens.
- **Later, one more** when a single beat needs a better answer: how a number
  counts up, how a cursor moves, how a title hands off to the product.

## Finding and picking them

Miran fetches links. It does not search the web, so use your own web search,
fetch or browser tools. Search by the craft you need, not the product name
alone: "editorial kinetic typography opening", "premium app launch film UI
cursor", "vertical product teaser fast cuts". For the product's own film, look
in the places a person would: its site, its YouTube or Vimeo channel, the
launch post, the app store listing. Envato Elements and VideoHive pages give a
public rendered preview you can fetch too.

Open the candidates before you choose. A thumbnail and a title are not a study.
Prefer the film that:

- is the same kind and length as yours;
- has movement you can read (clear framing, intentional holds, clean joins);
- is short enough to take in whole: a three-minute sizzle teaches more than a
  forty-minute stream, and downloads stay bounded.

Skip compilations, reaction videos and slideshows with music. Popularity tells
you nothing about whether a film is well made.

Keep the shortlist in the film's plan: the link, why you chose it and what it
should teach this film ("the first cut lands on the drop", "the UI card pushes
in while the headline leaves"). If you have no search tools, or the person's
sources are closed, say so, ask for a link or a file, and carry on from what
you can reach. Never describe a video you did not look at, and never replace
the step with a style preset you made up.

## Fetching

```text
reference {"action":"add","source":"https://www.youtube.com/watch?v=VIDEO_ID","title":"Product launch, calm pacing"}
reference {"action":"add","source":"https://elements.envato.com/ITEM-SLUG"}
reference {"action":"add","source":"assets/reference.mp4"}
reference {"action":"list"}
```

`source` is a public video or page link, or a clip in the workspace (a person's
own file is the safest source). `title` is for you. `list` shows what is
already saved, with each id: reuse a study before you fetch the same video
again.

A fetch can take a while and comes back as a job (`status: running`). Wait for
it and do not start the same download again:

```text
jobStatus {"job":"job-1","wait_seconds":30}
```

`add` returns the study:

- `reference.id`, like `ref-0123456789abcdef`: the handle for every later call.
  Write it in the plan.
- `reference.media`: the saved video, which is what `footage` reads.
- `reference.size`, `fps`, `duration_s`, `has_audio`, `preview_only` and the
  `terms` note. A silent study (`has_audio: false`) cannot tell you anything
  about the sound design.
- the overview sheet (the picture), in `images`, with its path in `out`.

**Open the paths the result gives you, and nothing else.** The study lives in
the film's own folder, and every path the tool returns (`reference.media`,
`out`, `images`, `folder`) points straight at it. Use those paths exactly as
given. Never search the disk for a reference, a sheet or a frame, and never
guess a folder. If a path comes back relative, it is relative to the film's
workspace folder: join it to that folder rather than looking elsewhere. If a
path you were given does not open, call `reference {"action":"list"}` and read
it again.

The overview that `add` returns is your quick look. If it shows the wrong
video, a trailer for something else or a login wall, `remove` it and pick
another before spending anything more on it:

```text
reference {"action":"remove","video":"ref-0123456789abcdef"}
```

If a link fails, read the message. Platform links (YouTube, X, Vimeo) need the
separate `yt-dlp` program, and YouTube needs its EJS component; `miran doctor`
says what is missing, and the person installs it, you do not work around it. A
page with only a script-driven player will not resolve: find the public media
link in the browser, or ask for the file. Miran never uses logins or cookies,
and you never bypass a paywall, DRM or a preview watermark. Report the failure
as it is and go on with the references that did work.

## Reading a reference

Look before you measure. Sheets are contact sheets: up to twelve timestamped
frames on a page.

```text
reference {"action":"sheets","video":"ref-0123456789abcdef","mode":"overview"}
reference {"action":"sheets","video":"ref-0123456789abcdef","mode":"interval","interval":1,"pages":4}
reference {"action":"sheets","video":"ref-0123456789abcdef","mode":"interval","start":3,"end":5,"interval":0.1}
reference {"action":"frame","video":"ref-0123456789abcdef","start":3.4}
```

1. **The whole film first.** `overview` spreads frames across the whole
   video; `interval` takes one every `interval` seconds. A page holds twelve
   cells and a call returns at most four pages. Follow `next_page` until the
   range is covered. Do not judge from the first page of a long video.
2. **Then the moments that matter.** A dense interval over two seconds
   (`interval` 0.1 to 0.25) shows a move frame by frame: where it starts, how
   far it travels, whether it overshoots, how it settles. One `frame` at a
   timestamp is a held pose: the product screen, the end card, the exact
   composition of a hero shot.
3. **The cuts.** Index the media once and the shots become pages of their own,
   with an early, middle and late frame for each shot:

```text
footage {"action":"index","asset":"<reference.media from add>"}
reference {"action":"sheets","video":"ref-0123456789abcdef","mode":"shots","pages":4}
footage {"action":"map","asset":"<reference.media from add>","level":1}
footage {"action":"transcript","asset":"<reference.media from add>"}
footage {"action":"watch","asset":"<reference.media from add>","start":3,"end":9,"frames":12}
```

`map` lists shots, `transcript` the spoken words and `watch` shows frames over
the sound. Put the path `add` gave you in `asset`, exactly.

4. **The numbers.** The measured breakdown reads the first ten minutes:

```text
reference {"action":"analyze","video":"ref-0123456789abcdef"}
reference {"action":"recipe","video":"ref-0123456789abcdef"}
```

`analyze` returns `shots` (count, average and median length, cuts a minute),
`transitions` (cuts, dissolves, fades, flashes, whips, with frames), `motion`
(how much of the picture changes a second), `camera` (the share of time the
whole frame pans or pushes), `palette`, `contrast`, `type` (how often text is
on screen, sizes in px of a 1080-tall frame, capitals, weight), `guidance` in
plain words and a `style` summary. It runs as a job on a long video. `read_text:
false` skips reading the type and is faster. `recipe` is the same breakdown as
an edit recipe: it is for cutting a person's own clips (`edit` with `action:
"recreate"`), not for building a motion-graphics film.

How to read them:

- Shot length is energy. Cuts under a second are trailer or social pace; a
  second and a half to three is a product promo; four and up is an explainer or
  something luxurious. A long shot that never feels long has movement inside it.
- `motion` says how busy the film is, and the quiet matters as much as the
  busy parts. A calm reference with lively moves inside long shots is slow
  drifts and soft eases; a frantic one is hard cuts on beats.
- `camera` near zero means the film cut instead of moving the camera, or the
  camera is locked off and the subject moves. A fixed camera over moving
  subjects reads as still here, so check against the sheets.
- Type sizes, palette and weight are the reference's own. They tell you what
  it did, not what you should do.
- Eases, font names and "it uses a spring" are guesses from pixels. Say
  "looks like" and check against your own render.

Skip the parts that do not help. A launch film's reference does not need a
transcript, and a silent loop does not need sound analysis. Say what you
analysed and what you could not (no speech, text too stylised to read, a
silent file).

Write what you notice as you go; the notes stay with the study:

```text
reference {"action":"note","video":"ref-0123456789abcdef","start":3,"end":5,"text":"Headline masks up, holds, then the product card pushes in as it leaves. Take the hand-off, not the look."}
```

## Making it this film's

The notes are not the film. Turn each observation into a decision for this
brief, in the film's plan, before you build. A short breakdown looks like this:

```text
References: Atlas (the product's own launch film, ref-...), Lumen (a calm UI promo, ref-...)
Looked at   all of both; dense sheets on Atlas 0:04-0:06 (the card hand-off) and Lumen 0:11-0:13 (the counter)
Timing      Atlas holds each product shot ~1.5 s and cuts on the music; ours: 1.5 s holds at 60 fps = 90 frames, cut on the drop
Framing     Lumen puts the UI at 70% of the frame, headline small in a corner; ours: headline big, UI at 55% so the phone fits
Motion      Atlas's cards enter on an overshoot and settle in ~0.4 s; ours: spring:snappy for the cards, emphasized-decelerate for the headline
Camera      Lumen pushes in slowly through the whole beat; ours: a 6% push on the UI plane only
Joins       both hard-cut on the beat, one whip into the end card; ours: whip into the end card, the rest hard cuts
Sound       a riser before the first cut, then silence for a frame; ours: the same idea with our own riser
Not taking  their palette, type, copy, logos, layout, music, the stock images
```

Write the timing in this film's own frames. Reference timestamps are in source
seconds, whatever frame rate the video had: multiply by the film's fps.

What makes the translation work:

- **Every adopted choice gets a purpose in this film.** "It cuts every 1.5 s"
  is an observation; "ours cuts every 1.5 s because the story has a new idea
  every 1.5 s" is a decision. If you cannot say why, leave it out.
- **Take the how, leave the what.** Timing, order of reveal, hold lengths, how
  moves land, camera intent and where sound accents fall carry across. Palette,
  typefaces, words, logos, layouts and the exact composition of a shot do not.
  When someone could say "that is a copy of that film", you took too much.
- **Combine several.** The product film gives the pace, the kinetic reference
  gives the type timing, the calm one gives the camera. Different films
  contributing different parts is how you avoid cloning any one.
- **The direction card still chooses the look** (`miran-dsh-directions`).
  Colours and fonts come from the brand and that card. `style` and `palette`
  from the analysis are what the reference looks like, not a suggestion for your
  theme; do not save them as the brand. This is how films stay different from
  each other.
- **Then build with the craft skills.** The beat sheet and the stacks of planes
  are `miran-dsh-studio` and `miran-dsh-shots`; the moves are
  `miran-dsh-motion`; the cuts are `miran-dsh-cuts`; the camera is
  `miran-dsh-camera`; the sound is `miran-dsh-sound`.

## Checking the draft

After a first full pass, compare:

```text
reference {"action":"compare","video":"ref-0123456789abcdef"}
reference {"action":"compare","video":"ref-0123456789abcdef","composition":"Main","read_text":false}
```

It renders a draft of the composition (so it can run as a job) and lists the
measured differences, worst first, each with both numbers: "you cut every 3.8
s, the reference every 1.6 s". Judge it with the plan beside it. Differences in
the things you meant to adopt are real work (pacing and contrast change the
feel most, type last). Differences you chose on purpose, a different palette, a
different font, are the point and need no fix. Fix the two or three biggest
ones, render, and look at the film itself, not only the score. A score of 100
means the style is the same as the reference, which is not the goal.

## Recreating a reference exactly

Sometimes the person asks for the film itself: rebuild this video, same
brand, same words, same timing and look, often to see how close Miran can get.
That is a proper job, and exactness is the point. The content is never the
obstacle: matching the text, the brand and the design is the work. Only the
reference's own media files stay out of the delivered film.

Work it like a tracing animator:

- Study until you can say what every element is, where it sits and when it
  moves. Dense interval sheets around each entrance and join, single frames
  for held poses.
- Rebuild every element natively: shapes and type as layers in the measured
  sizes and colours, logos redrawn as vector artwork or imported from the
  person's own files, screens written as HTML in the product's real style, and
  motion matched to where the reference enters, lands and holds.
- Lay the reference over your work as a guide while you build:

```text
reference {"action":"guide","video":"ref-0123456789abcdef","composition":"Main","opacity":0.5}
reference {"action":"guide","video":"ref-0123456789abcdef","composition":"Main","remove":true}
```

The guide sits on top of the stack like onion skin and shows in the viewer,
`renderFrame` and contact sheets, so a misplaced element shows as a ghost you
can chase down. Calling `guide` again changes the opacity. Every export leaves
the guide out by itself and says so, so you do not have to remove it before
exporting; `remove: true` (or `deleteLayer`) takes it away. Never copy the guide
layer to keep its picture: a copy is an ordinary layer and the engine refuses
it, by design. A preview or contact sheet rendered with the guide showing
holds the reference's pixels, so it is marked and cannot be imported. If you
want a still for the film, render it with the guide removed.

Deliver the recreation as a normal export. Only when the person asks for proof
of the match, render the labelled side-by-side:

```text
reference {"action":"compare","video":"ref-0123456789abcdef","composition":"Main","out":"renders/compare.mp4"}
reference {"action":"compare","video":"ref-0123456789abcdef","composition":"Main","out":"renders/compare-stack.mp4","layout":"stack"}
```

It writes a silent MP4 with "Reference" and "Miran" labels and a similarity
score. It is the one file allowed to hold the reference's frames: show it as
proof, never deliver it as the film. If the reference was already released it
cannot render, and the result points you at the saved sheets instead; say so
rather than fetching the video again without asking.

## Study only

Reference media is for learning. It never goes into a delivered film, and the
engine enforces that: importing a reference's video, sheets, frames, a preview
made while its guide showed or a copy or rename of any of them is refused
(`reference-study-only`). Do not look for a way round it (a screenshot of a
sheet, a re-encode, a copy in another folder). The refusal is the answer: make
this film's own pictures, screens and motion. Public availability is not
permission to reuse, platform terms and creator rights still apply, and an
Envato or VideoHive preview stays watermarked and study-only. Keep source links
as they are, and put no credentials in a link or a note.

A reference that is the person's own clip is not marked this way: stills and
renders of their own footage are ordinary files. Its study folder is still
closed to imports, so work from the original file.

## Cleaning up

When the film is finished, or a study is done, release every reference you used.
Repeating it is safe:

```text
reference {"action":"release","video":"ref-0123456789abcdef"}
```

`release` deletes the saved video copy and any guide layers showing it, and
keeps the source link, contact sheets, frames and notes, so the study can still
be read later. After that, `sheets`, `frame`, `analyze`, `recipe` and `compare`
need the video and answer `reference-released`; to read more, `remove` the entry
and `add` the source again. `remove` deletes the whole study. The person's
original file is never touched. Release at the end of the film, not before the
last compare.

## When it fights you

- **A fetch fails or times out:** read the message, try another source or a
  local file, do not run the same download twice. Say what you could not get.
- **`reference-released` or `not-found`:** the id was released or removed, or
  mistyped. `list` shows what exists.
- **`busy`:** another call is working on that study. Wait, then call again.
- **The reference is a different kind of film than yours:** it still teaches one
  thing, but do not adopt its pace. Find a closer one.
- **Nothing looks like a reference should:** you may be studying the wrong
  moments. Go back to the interval sheets around the beat you are stuck on.
