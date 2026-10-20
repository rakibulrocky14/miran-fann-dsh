---
name: miran-dsh-sound
description: "Sound for Miran Fann films - composing the bed in-engine with addMusic (mood, tempo, key, drop, hits, ending, ducking), designing events with addSound and kit.sfx from 82 presets, cutting picture to the beat instead of to a metronome, setting levels and loudness targets, using silence, and checking the finished mix on the exported file. Use whenever a Miran film gets music, sound effects, a drop, a logo sting sound or a voiceover bed."
whenToUse: "Any film with music or sound effects, any cut that should land on the beat, any mix that sounds thin, muddy, too loud or out of sync."
---

# Sound

Sound is half the edit. A cut that lands on a beat reads as inevitable; the
same cut 6 frames early reads as a mistake. The good news is that Miran
composes and places the sound itself, so the picture and the track can share
one timeline instead of being married afterwards.

Tools: `addMusic` (a composed bed), `addSound` / `kit.sfx` (events), `mixAudio`
(the mix), `setCompositionField {loudness_target}` (the master). The reference
for every preset is `guide {topic:"sound"}`.

## Recordings, when synthesis is not the sound

The generated presets are clean and land on the frame. A real whoosh, click,
riser or room tone often carries more texture, and 352 CC0 recordings ship as
an index:

```
sounds {query: "whoosh", max_seconds: 1}
sounds {category: "riser", min_seconds: 2}
sounds {id: "anve/whoosh/snd-whoosh-swish-s", place: true}   // a direct call
```

`place: true` caches it under `~/.miran/cache/sounds`, copies it to `sounds/`
and imports it as an audio asset (place it with a direct call: a script reads
the cache but does not download); then `createLayer {kind:"audio"}` and
`setAudioTiming {start_frame}`. Durations are exact — filter with
`max_seconds` before listening. These are recordings, not a replacement for
`addSound`: use a recording for texture, a generated hit for the beat.

## Music first, or picture first

- **Music-led** (reels, kinetic type, social): compose the bed first, read its
  `beat_frames`, and board the cuts onto them. The picture serves the rhythm.
- **Picture-led** (explainer, launch): board the beats first, then compose a bed
  whose `drop` and `ending` land on the two moments that must hit. Set
  `hits:[...]` so accents land on the cut frames you already chose.
- **Voice-led** (anything with a voiceover): voice first, then a bed that ducks
  under it (`duck_db:-9` is the default and is usually right).

## Tempo and mood

The mood comes from the direction first (the look script stores it as
`T.mood`), and the tempo from the kind of film. What pros tend to reach for,
and why:

| kind | tempo | why |
|---|---|---|
| studio reel, kinetic type, social | 120-140 bpm | cuts every second need a beat under every cut |
| launch film | 100-120 bpm | fast enough for momentum, slow enough to read a claim |
| explainer, data story | 84-104 bpm | the music must not race the thinking |
| logo sting, 3D product | 90-110 bpm, sparse | one hit, room for the object |
| title sequence, cinema | 70-100 bpm | long risers and slow builds |

`addMusic` and `kit.music` take `mood` from this list only: `tech`,
`corporate`, `uplifting`, `epic`, `hype`, `chill`, `ambient`, `dark`,
`playful`, `minimal`, `luxury`. A guessed mood fails the call with the list.
They return `beat_frames`, `bar_frames` and `sections`: use them instead of
guessing where the beat is.

## The drop and the ending

- **The drop** is where the full arrangement arrives. Put it on the reveal, not
  on the first frame; a 20 s launch usually has one, somewhere in its first
  half, where the product appears.
- **The ending** is the final chord. Put it on the last frame of the logo, and
  let it ring past the picture if the format allows.
- **A stop** before the drop (a beat of near-silence) makes the drop land. It
  is on by default for hype, epic and dark moods; it is the cheapest way to
  buy impact.
- Never end on a hard cut of the music. Either resolve, or fade the last 8-12
  frames.

## Sound design

One sound per event, chosen by material:

| event | sound | level |
|---|---|---|
| type arriving | swish, soft | −18 dB |
| a card landing | pop, click | −14 dB |
| an impact, a slam | impact, slam | −8 dB |
| a page turning, a wipe | whoosh | −12 dB |
| typing | typing (count = characters) | −16 dB |
| a counter | ticks | −20 dB |
| a logo | logo, chime | −10 dB |
| a rise into a drop | riser | −12 dB |

What pros tend to do:

- **Silence is a sound.** Cutting all sound for 4-6 frames before an impact
  does more than any whoosh.
- **Do not sound every move.** Two or three events per 10 s is plenty; a film
  where every card pops is a toy.
- **Match the pitch to the picture's size.** A big object gets a low hit.
- **Diegetic first.** If the film shows typing, the typing sound is the story;
  the music goes under it.

## Levels

- Master: `loudness_target:-14` LUFS for web and social; −16 for calm or
  long-form. True peak stays under −1 dBTP automatically.
- Music under voice: `duck_db:-9`, or set the music to −18 LUFS and let the
  voice sit at −14.
- Sound effects peak 6-10 dB above the music, never above the voice.
- A mix that clips is not fixed by lowering the master; fix the layer gains.

## Recipes

Each runs after the look script (`miran-dsh-directions`), which made a
600-frame composition in the 30 fps notation. On a 60 fps film the composition
is 1200 frames and every frame in these recipes doubles: `reveal`, `hits`,
`ending`, `frame` and `duration_frames`.

### A bed with a drop on the reveal

```js
const T = kit.theme();
const m = kit.music({mood: T.mood || "tech", reveal: 270, hits: [150, 420], ending: 585});
log("drop " + m.drop_frame + ", first beats " + JSON.stringify((m.beat_frames || []).slice(0, 8)));
return {drop: m.drop_frame, sections: m.sections};
```

### A slam with a stop before it

```js
miran.addSound({sound: "riser", frame: 246, duration_frames: 24, gain_db: -14});
miran.addSound({sound: "impact", frame: 270, gain_db: -4});
return "placed";
```

### A type reveal with a swish per line

```js
kit.sfx("swish", 30, {gain_db: -6});
kit.sfx("swish", 48, {gain_db: -8});
return "placed";
```

## Check it

- `mixAudio {out:"audio/mix.wav"}` — the mix, with per-layer offsets and any
  errors.
- `analyzeWaveform` — peaks and RMS over time; a flat line is silence you did
  not intend.
- `detectBeats` on the composed track — the onsets the picture should agree
  with.
- `checkExport` on the final MP4 — loudness, true peak, stream presence.
- `critiqueEdit {checks:["audio"]}` — pops, clipping, music over speech, dead
  air.

## Failures you will hit

- `addMusic` with the same `name` replaces the track; a second call with a new
  name doubles it.
- `drop` snaps to the 16th-note grid, so the frame you ask for and the frame it
  lands on can differ by 1-3 frames. Read `sections` back and cut to that.
- `addSound`'s `frame` is the *hit* (a whoosh's pass, a riser's peak), not its
  start. A whoosh that should end on the cut is placed on the cut.
- `kit.sfx(sound, frame)` places an event; `kit.sound(false)` silences kit's
  automatic sounds for the rest of the script — useful when you design your own.
- A film with no audio layers renders silent even if `audio:true`: `renderVideo`
  only muxes what the composition has.

## What the study measured

95 films, audio onsets against every cut:

- 73% of cuts land within 120 ms of an onset; the median distance is 67 ms;
- studio reels are the tightest (93% within 120 ms, median 32 ms) and title
  sequences the loosest (50%, median 136 ms);
- the tempo guess runs from 91 bpm in data films to 148 bpm in logo stings.

Cutting to the beat is the norm in every kind, but the tightness is a choice:
a reel snaps, a title sequence breathes.
