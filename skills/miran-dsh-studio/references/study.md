# What 95 professional motion films actually do

A measurement study of real motion-design work, made to check the
`miran-dsh-*` skills against evidence rather than taste. The films were used
for measurement only: they are not kept, shipped or copied, and no film,
studio or brand in them is a target to imitate. Only the numbers are used.

## The corpus

Ninety-five films, 70 minutes, collected from public Vimeo and YouTube channels
on 2026-10-17 and 2026-10-18, in twelve kinds: studio reels (9), hardware
launches (8), app and SaaS launches (9), kinetic type (9), UI motion promos
(8), logo stings (8), explainers (8), transition packs (7), title sequences
(7), data visualisation (7), 3D product turntables (7) and social cuts (8,
collected as 16:9 masters).

The set is deliberately weighted toward launch films, reels and kinetic type,
because those are the films a Miran user asks for most. It is not a random
sample of the motion industry.

## What it found

1. Shot length belongs to the kind of film: a studio reel cuts every 1.0 s, a
   logo sting every 6.0 s, an explainer every 4.9 s.
2. Cuts land on the music: 73% of cuts within 120 ms of an onset, median 67 ms.
3. Moves peak early: the peak comes at 0.12 of a move, 67% in the first third.
4. The first half carries 62% of the travel.
5. 59% of moves overshoot; the second peak is 62% of the first.
6. Holds are short and completely still: median 0.1 s, longest 1.2 s, drift 0.
7. Speed runs from 46 px/s (logo stings) to 289 px/s (reels) at 1080p.
8. 81% of joins are hard cuts; every other transition shares the remaining 19%.
9. A word stays 0.5 s (the OCR floor) and films run about 100 words per minute.
10. 14% of the frame moves on a typical frame; the busiest reach 46%.

## How each film was measured

Every film went through one deterministic measurement pass, the same for
every film, so the numbers are comparable between kinds.

| dimension | how |
|---|---|
| cuts | SceneDetect's adaptive detector, plus a guarded frame-difference pass for continuous films; boundaries closer than 0.35 s are merged |
| shots | the spans between cuts; duration, p10/p90, standard deviation |
| speed | Farneback optical flow at 15 fps on a 320 px-wide decode, scaled to a 1080p short edge; median, p90, peak px/s per shot |
| motion share | the fraction of pixels moving more than 0.5 px per frame |
| holds | runs where under 0.6% of the frame moves and the dominant speed is under 22 px/s, with the residual drift inside them |
| moves | runs of motion between holds; duration, travel, time-to-peak, share of travel in the first half, overshoot oscillations, settle ratio, travel |
| layering | coherent motion groups per frame (direction bucket × speed octave), and the ratio of p90 to p10 local speed as a parallax proxy |
| blur | 10-90% edge rise on the sharpest frame of a shot versus the frames where motion is fastest, in px at 1080p; smear time from the frame rate |
| type | Apple Vision OCR at 2 fps on a 720 px decode; word appearance tracks (same text, place and size), duration, words per minute, text height as a fraction of the frame, share of runtime with words |
| transitions | the change profile around each cut: one-frame jump (cut), spread change (dissolve), flow-field motion (whip/slide/zoom) |
| beat | audio onset detection; the share of cuts within 80 and 120 ms of an onset, the median distance, a tempo guess |
| colour | k-means palette per shot (5 colours), luma, top-two contrast ratio |

## Limits, stated plainly

- **OCR reads words, not meaning.** It misses thin, small or heavily
  animated type, and it resolves appearance to ±0.5 s. Word durations are a
  lower bound on how long a word was visible.
- **Blur, palette and depth did not produce numbers worth teaching from**:
  the blur reference came back empty for most films, the palette extractor
  failed on most, and a picture does not show a camera rig. The skills teach
  those from craft, not from this study.
- **Blur is measured on the busiest shots only**, and an edge that is already
  soft (a glow, a gradient) reads as blur. The numbers are comparable between
  films, not absolute optics.
- **Cuts are the hardest thing to detect** in motion graphics, because a fast
  move and a cut look alike in a frame difference. Continuous films are
  under-counted even with the fallback; reel and launch numbers are the most
  trustworthy in this study.
- **Move segmentation** starts a move when motion crosses a floor, so a move
  that begins with a jump reports a low time-to-peak. The overshoot and
  settle numbers are the robust part.
- **No social 9:16 films survived collection** (the vertical URLs were
  region-locked or removed); the vertical guidance in `miran-dsh-social` comes
  from platform specification, not from this corpus.
