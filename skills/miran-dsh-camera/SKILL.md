---
name: miran-dsh-camera
description: "Camera and depth in Miran Fann, chosen and timed like a DP: the four camera archetypes and what each claims, why only 3D layers see the camera, how to get parallax out of flat artwork, moving the camera slower than the layers, 3D screens and extruded type, focus pulls, framing and coverage, and the checks that catch flips, spikes and off-frame subjects. Use for any push, pull-back, orbit, crane, parallax shot, 3D screen or rack focus."
whenToUse: "Any push-in, pull-back, orbit, crane, truck, parallax shot, 3D screen, rack focus - and any time a camera move feels floaty, too fast or unmotivated."
---

# Camera and depth

A camera move is a statement about attention: *look here, then here*. If the
statement is not needed, the move is decoration, and decoration in 3D reads as
a slideshow with perspective.

The mechanics are in `miran-camera` (rig, pose, constraints, validation). This
skill is the choice and the timing.

## Only 3D layers see the camera

A camera move on 2D layers does nothing. To get parallax, the layers must have
`is_3d:true` and different `z`, and the camera must move. Minimum viable depth:

- background at z `+600` (further from the camera)
- subject at z `0`
- foreground element at z `-300` (nearer the camera)

The default camera sits at z = −2250 looking toward +z, so a larger z is
further away. Getting the sign wrong puts the "foreground" behind the subject
and blows the "background" up in front of it.

That separation is what makes a 20 px camera move read as depth. Layers on the
same z plane slide together, which is a slide, not a camera.

## The four archetypes

| move | claims | what sets its length | when |
|---|---|---|---|
| push in | "this matters more than the room" | how much new frame the push reveals | a reveal, a decision, a number |
| pull back | "here is the whole thing" | how much has to assemble before the eye reads it | the end of an act, a product reveal |
| orbit | "this is an object, not a picture" | the arc it has to complete without becoming a spin | hardware, a logo, a 3D screen |
| truck / crane | "we are beside it / above it" | the distance across the space it shows | a space, a list, a workspace |

What pros tend to do, and why:

- **One move per shot.** A push that becomes an orbit is two shots.
- **Leave rest, decelerate, never stop dead.** End the move on
  `ease:"camera"`; a camera that snaps into motion from a dead stop reads as a
  cut. `cameraSettle` is not a general "settle": it eases the rig back to its
  rest pose, which is what you want for a reveal-and-return, not for a push
  that should hold its new framing.
- **Camera moves are slower than layer moves.** A camera has mass and optical
  travel; it takes far longer than a layer to cross the same distance. If the
  push arrives before the eye has read the new framing, it is too fast.
- **The move must end where the next shot can start.** A camera that leaves
  the subject at the edge of frame traps the edit.

Speed changes the meaning: the same push can drift, commit or crash. A drift
moves a few percent of the frame a second and reads as breathing; a deliberate
move crosses enough of the frame for the eye to follow; a crash zoom is a
comedy or whip gesture. The difference is how much frame the move eats per
second, not a throttle setting.

Frame counts in this skill are 30 fps notation; on a 60 fps film double every
`start`, `duration` and `end` so the camera keeps the same seconds.

## Pull-back reveals

The strongest single camera move in a launch film: start tight on a detail,
pull back to the whole product. Build it in this order:

1. Build the whole composition at its final pose.
2. `cameraFrameLayers` at the last frame, so the final framing is exact.
3. `cameraRevealComposition` (or `cameraDolly` from a close z) over the time
   the reveal needs, easing out; the move holds its final framing rather than
   returning home.

`cameraRevealComposition {start, duration, closeup, sweep_deg}` does the whole
thing; `closeup:0.45` starts about 2.2x closer. A small `sweep_deg` during the
pull-back makes it feel handheld rather than mechanical — enough to see,
not enough to become an orbit.

## 3D screens and extruded type

`kit.screen3d` is the hero shot for software: a UI sheet tilted in perspective,
its panels lifted, a glide, then face-on and a push. It takes SVG markup, a
`.svg` path, a layer id, or a list of layers.

- The UI must be built at the size it will be read: 1440x900 or 1920x1080.
- Tilt 12-18° for a glance, 25-35° for a dramatic angle; beyond 40° the text
  is unreadable and the shot becomes an object shot.
- Return to face-on before the cut if the next shot is the same UI. A UI read
  at an angle is a mood; a UI read face-on is information.
- `kit.text3d` / `kit.logo3d` for extruded marks: keep the extrusion shallow
  (8-24 px) unless the object is the hero.

## Focus

A rack focus is a cut inside the shot: it moves attention without moving the
frame. Use it when two things are in the same frame and only one matters.

- `aperture: 0` is a pinhole (all sharp). 10-20 gives visible depth of field
  at 1080p; above 30 the background is soup.
- `focus_distance` is in world units from the camera; at the default rig the
  z=0 plane sits at about 2250. Measure with `inspectCameraTrajectory` rather
  than guessing.
- Pull focus over a beat, not a frame: the eye needs time to follow the sharp
  plane. A rack that lands in a couple of frames is a cut, not a focus pull.
- A rack focus on a moving subject needs the focus to track
  (`cameraRackFocus` with the subject's distance at the end frame), or it
  drifts off.

## Framing

- Pros keep about 6-8% of the frame clear on every side: a subject that
  touches the edge reads as a crop error unless the crop is the design.
- A 3D object usually gets 10-15% headroom; much more and it reads as
  floating.
- The horizon (or the product's base) should sit on a third, not the centre,
  unless symmetry is the design.
- On 9:16, keep the subject inside `kit.safe({platform})`; a camera push that
  ends with the subject under the caption block is a wasted shot.

## What makes camera motion look fake

- A linear dolly with no ease. Cameras have mass.
- A move that starts and ends at the same speed (no settle).
- Parallax on a single plane: everything slides together.
- A tilt that reveals nothing new.
- A camera move that drags text across the frame while it is being read.
  Pin the words to the screen (a 2D layer over the 3D shot) or let the push
  be a few percent, slow and steady; do not freeze the whole shot.
- A camera that never moves. A shot held dead still for seconds, with nothing
  else changing, reads as a slide: give the camera a destination (wide to the
  part that matters, or back to reveal the whole) or cut.
- An orbit around a flat card: it turns edge-on and disappears.

## Recipes

Each runs after the look script (`miran-dsh-directions`) and takes its colours
from `kit.theme()`.

### A push that settles and holds

```js
const T = kit.theme();
const {h} = kit.size();
const word = kit.title("Every frame, on time.", {at: [0, 0], size: Math.round(h * 0.11), weight: 800, font: T.display, style: "none"});
miran.setLayerField({layer: word.id, field: "is_3d", value: true});
miran.createCameraRig({position: [0, 0, -2250], focal_length: 50});
miran.cameraDolly({to_z: -1700, start: 10, duration: 70, ease: "camera"});
// it holds there: cameraSettle would pull the rig back to its rest pose.
return miran.validateCameraMove({start: 0, end: 90});
```

### Parallax from flat artwork

Every layer that should see the camera needs `is_3d` itself: a 2D layer
parented to a 3D null stays flat and does not move with the camera.

```js
const T = kit.theme();
const {w, h} = kit.size();
const flat = [];
// back plane: ghost type far behind
const ghost = kit.title("4", {at: [-w * 0.3, h * 0.05], size: Math.round(h * 0.9), weight: 800, font: T.display, color: T.text, style: "none"});
miran.setProperty({layer: ghost.id, property: "opacity", value: 0.07});
miran.setProperty({layer: ghost.id, property: "position", value: [-w * 0.3, h * 0.05, 700]});   // +z is further away
// subject plane: a card with real content
const card = kit.card({at: [0, 0], w: w * 0.46, h: h * 0.36, radius: 32});
const t1 = kit.title("Pull requests: 4 to review", {at: [0, h * 0.07], size: Math.round(h * 0.05), weight: 700, style: "none"});
const t2 = kit.title("2 changes flagged as risky", {at: [0, -h * 0.05], size: Math.round(h * 0.034), weight: 500, color: T.muted, style: "none"});
// near plane: an accent shape in front
const near = miran.createLayer({name: "Near", kind: "shape", shape: "circle", width: h * 0.24, fill: T.accent, position: [w * 0.27, -h * 0.2, -350]});   // -z is nearer
for (const id of [ghost.id, card.id, t1.id, t2.id, near.id]) miran.setLayerField({layer: id, field: "is_3d", value: true});
miran.createCameraRig({position: [0, 0, -2250]});
// Orbit angles are absolute: the default rig looks from 180 degrees, so 190 is a gentle 10-degree arc.
miran.cameraOrbit({from_deg: 180, to_deg: 190, start: 10, duration: 80, radius: 2250, ease: "camera"});
return miran.inspectCameraCoverage({layers: [card.id, t1.id], start: 0, end: 90});
```

## Check it

- `inspectCameraCoverage {layers, start, end}` — focal layers that leave frame.
- `validateCameraMove {start, end}` — flips, spikes, focal jumps, discontinuities,
  and whether the move happens before or after the story beat.
- `inspectCameraTrajectory` — the exact evaluated pose per frame; use it when a
  move looks wrong but the numbers look right.
- `renderContactSheet {frames:"auto"}` — the eye, at the cuts.

## Failures you will hit

- `cameraOrbit` angles are absolute, not relative: the default rig sits at
  180°, so `to_deg: 10` swings the camera round behind the scene and every
  word reads mirrored. A 10° arc is `from_deg: 180, to_deg: 190`.
- `kit.screen3d`'s `face` swings the screen face-on and re-centres it to fill
  the frame. To keep a screen beside a caption or a comment, glide it nearly
  face-on instead (`glide: {dur: 70, to: [3, 6, 0]}`), which leaves it where
  `at` put it. On a dark stage its default `sheen` and `rim` paint over the
  screen's text; `sheen: false, rim: false` when the text must be read.
- A 2D layer parented to a 3D null stays 2D: give each layer that should see
  the camera `is_3d` itself.

- A camera move with no `is_3d` layer under it renders as a still. Check the
  layer flags first.
- `cameraDolly` and `cameraOrbit` without `mode:"constraint"` bake keys; a later
  tool that moves the camera adds a second, conflicting set. Clear with
  `clearAnimation {layer:"camera", property:"position"}`.
- The default rig is pixel-true at 1080p: z = −2250 at 50 mm makes 3D layers at
  z=0 appear at their pixel size. Changing focal length changes apparent size;
  changing z changes both size and parallax.
- `cameraSettle` returns focus and aperture to the rest pose as well as
  position; if you racked focus, settle the lens separately. If you wanted the
  push to hold, using it undoes the push.
- A push into a 3D screen at an angle clips through it; keep the far plane and
  the screen's z in mind, or use `kit.screen3d`'s own push.

## What the study measured

The study did not measure camera rigs (it measures the picture, not the rig),
so nothing here is dressed up as a camera finding. What it does say about
depth is indirect:

- 3D product films cut every 2.68 s and hold the longest shot of any kind
  (p90 12.96 s): an object shot is allowed to breathe;
- their frames move at 134 px/s, slower than a reel (289 px/s), because an
  orbit reads at a lower speed than a cut.

Depth itself was not measured: the study sees a picture, not a rig, and its
parallax proxy was too noisy to report as a number.

Use `inspectCameraCoverage` and `validateCameraMove` for the rig itself.
