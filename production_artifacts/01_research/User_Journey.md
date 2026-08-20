# PREDYX — User Journey Hypotheses

> **Version:** 1.0.0
> **Phase:** 1 — UX Research
> **Date:** 2026-08-17
> **Owner:** @ux
> **Status:** Complete — All journeys are HYPOTHESES. No user research has been conducted.

---

## Important Caveat

**All user journeys described below are hypotheses** derived from observed competitor UX patterns, fitness platform behavior analysis, and established UX research on fitness app usage. None of these journeys have been validated through primary user research (interviews, surveys, usability testing). They must be treated as design hypotheses, not established facts.

Labels:
- `[HYPOTHESIS]` — Untested belief about user behavior
- `[INFERRED]` — Reasonable interpretation of observed competitive behavior
- `[OBSERVED]` — Directly seen in competitor products

---

## Hypothetical User Segments

Based on the Project Charter, the following audience hypotheses are assumed for journey mapping. These are NOT validated personas.

| Segment | Description |
|---|---|
| **Committed Enthusiast** | Consistent training 3–5x/week; structured goals; cares about progressive overload and tracking |
| **Performance-Focused Athlete** | Amateur/semi-professional; tracks metrics; biometric-aware; motivated by data and PRs |
| **Discovery-Oriented Beginner** | Entering fitness; needs clear instruction; intimidated by complexity; needs fast wins |

---

## Journey S1: Pre-Workout — Discovery to Session Start

### Scenario
A committed fitness enthusiast opens PREDYX intending to train. They don't know what exactly to do today.

### Stage 1: Entry & Context Assessment
**What happens:** `[HYPOTHESIS]`
- User opens the app in the evening after work. They have ~45 minutes.
- They check if any recovery guidance is available (HR, sleep-based readiness signal if wearable connected).
- The home screen shows a personalized recommendation based on time of day, recent training history, and any connected wearable data.

**Friction points:** `[HYPOTHESIS]`
- No personalization yet (first-time users see a generic home screen — this is the "empty state" problem).
- Decision paralysis if too many options shown simultaneously.

**Motivational moments:** `[HYPOTHESIS]`
- Seeing a "recommended for tonight" workout that matches their energy level feels like coaching.
- A streak indicator reminding them "you've trained 4 days in a row" provides social/self-accountability momentum.

**Trust moments:** `[HYPOTHESIS]`
- Seeing the exercise curated by a credible expert source.
- Knowing the recommendation is based on their actual history, not a generic default.

---

### Stage 2: Discovery
**What happens:** `[HYPOTHESIS]`
- User browses discovery: they toggle from "gym" to "home" environment (they're at home today).
- They filter by time (under 30 min) and muscle group (upper body — did legs yesterday).
- They scan 4–5 options, preview one or two, then select a workout.

**Friction points:** `[HYPOTHESIS]`
- Mismatch between declared equipment and what's actually available today.
- Too many steps between "open app" and "start workout" breaks momentum.
- Workout descriptions that sound generic ("Upper Body Strength") without differentiating quality cues.

**Uncertainty:** `[HYPOTHESIS]`
- "Is this the right difficulty for me today?"
- "How long will it actually take, including rest?"

**PREDYX opportunity:** `[HYPOTHESIS]`
- Offer a "Quick Start" path: 1-tap access to a contextually appropriate workout (best-fit for time + equipment + recovery status).
- Show estimated actual duration (with rest periods) not just declared duration.
- Surface clear difficulty signals (not just Beginner/Intermediate — include volume context like "40 total reps / 5 sets").

---

### Stage 3: Pre-Workout Preparation
**What happens:** `[HYPOTHESIS]`
- User reads/previews the workout. They check exercises they're unfamiliar with.
- They watch the looping demo for 1–2 exercises.
- They set up their equipment.

**Friction points:** `[HYPOTHESIS]`
- Having to navigate away from the workout screen to look up an exercise breaks flow.
- No pre-workout instruction integration — user has to remember notes while setting up equipment.

**Opportunity — 3D / Motion value:** `[HYPOTHESIS]`
- An interactive exercise preview showing the movement plane and primary muscle activation before the workout begins could reduce uncertainty and improve mental preparation.

**3D Value Classification:** `MEDIUM VALUE` — provides preparation context, not decoration. Lightweight 2.5D animation or 2D muscle map may be sufficient.

---

## Journey S2: During Workout — Session Execution

### Scenario
The user has started a 30-minute strength workout. They are 10 minutes in.

### Stage 4: Active Session Flow
**What happens:** `[HYPOTHESIS]`
- User is executing exercises. Phone is propped against a water bottle 60cm away.
- They glance at the screen between sets for: next exercise, rep count, rest timer.
- Audio cues remind them when rest is ending.
- They tap "Next Set" with a sweaty thumb.

**Physical reality constraints:** `[INFERRED]`
- Sweaty / slippery hands — large touch targets essential.
- Eyes partially diverted — audio cues must carry critical information.
- Breathing hard — cognitive load is impaired, UI must be at maximum simplicity.
- Phone on the floor — text must be legible at 60cm–1m distance.

**Friction points:** `[HYPOTHESIS]`
- Small tap targets causing missed taps during rest period.
- Music pausing or not ducking properly when audio cue plays.
- App locking screen mid-session requiring re-authentication.
- Needing to type weight and reps — keyboard opens, breaks flow.

**PREDYX opportunity:** `[HYPOTHESIS]`
- Large-format, distance-readable session HUD: only 3–5 metrics visible.
- Smart auto-fill for weight and reps (pre-populate from previous session, allow +/− with giant buttons).
- Eyes-free audio cues as primary session communication channel.
- Prevent screen lock during active sessions.

---

### Stage 5: Exercise Discovery Mid-Session
**What happens:** `[HYPOTHESIS]`
- User reaches an exercise they've never done before: "Pendlay Row."
- They pause the timer and want to check form before attempting.
- They need to see: what muscles it works, what a correct rep looks like, common mistakes.

**Friction points:** `[HYPOTHESIS]`
- Pausing timer feels like "losing progress" mentally.
- Leaving the session screen to navigate to exercise library loses context.
- Text instructions are insufficient for complex barbell exercises.

**PREDYX opportunity — 3D / Motion value:** `[HYPOTHESIS]`
- An in-session exercise card (expandable from session HUD without leaving the screen) showing:
  - Looping video demo (front + side angle)
  - Primary / secondary muscle activation overlay
  - 3-step setup instructions
  - Top 2 common mistakes

**3D Value Classification:** `HIGH VALUE` for muscle activation visualization — genuinely informative, not decorative. Lightweight 2D vector maps are sufficient (see Whoop pattern), but 3D interactive would be novel and differentiated.

---

### Stage 6: Session Adaptation
**What happens:** `[HYPOTHESIS]`
- Mid-session, the user finds the barbell station is occupied in a commercial gym.
- They need to substitute the next exercise.

**Friction points:** `[HYPOTHESIS]`
- No in-session substitute option — forces session abandonment.
- Substitute suggested is inappropriate for equipment available.

**PREDYX opportunity:** `[HYPOTHESIS]`
- "Adapt Exercise" button visible at all times in session HUD.
- Suggested substitutes pre-filtered for current declared equipment profile.
- Adaptation is logged without breaking program continuity.

---

### Stage 7: Rest Period
**What happens:** `[HYPOTHESIS]`
- Between sets, the user has 90 seconds of rest.
- They glance at the screen to check the countdown.
- They may briefly check form tips for the next set.

**Friction points:** `[HYPOTHESIS]`
- Overwhelming rest screen with too much data to process.
- Poor differentiation between "rest timer" and other metrics.

**Motion opportunity:** `[HYPOTHESIS]`
- A minimal, visually prominent countdown — animated circular progress ring — clearly communicates rest without requiring reading.
- Subtle ambient visual pulse on the rest screen communicates "breathing mode" without being distracting.

**3D Value Classification:** `LOW VALUE` — decorative rest-screen animation has minimal instructional value and risks mobile performance. CSS/GSAP sufficient.

---

## Journey S3: Post-Workout — Completion and Recovery

### Stage 8: Workout Completion
**What happens:** `[HYPOTHESIS]`
- User completes their last set and taps "Finish."
- The app shows a completion summary.
- They feel a sense of accomplishment — this moment needs to feel earned.

**Motivational moments:** `[HYPOTHESIS]`
- Completion celebration that feels proportional to effort (not infantile confetti for every session, but meaningful acknowledgment).
- Seeing a new Personal Record highlighted clearly.
- Seeing their streak incremented.

**Friction points:** `[HYPOTHESIS]`
- Completion screen buried in generic data without highlighting what mattered.
- Forced to rate the session before seeing their stats.

**PREDYX opportunity:** `[HYPOTHESIS]`
- Lead the completion screen with one primary "achievement" (PR, streak milestone, or session volume record) — not a wall of numbers.
- Brief, restrained celebration animation for significant milestones.
- Quick 2-question post-session check-in (perceived exertion + technique confidence) — feeds personalization engine.

---

### Stage 9: Progress Review
**What happens:** `[HYPOTHESIS]`
- After completing the session, the user checks their progress:
  - Did I improve on my last Pendlay Row performance?
  - How does this week compare to last week?

**Friction points:** `[HYPOTHESIS]`
- Progress data buried in nested menus (documented weakness in Freeletics).
- No clear narrative explaining what the numbers mean — raw data without interpretation.
- Comparing specific exercise progression requires too many taps.

**PREDYX opportunity:** `[HYPOTHESIS]`
- Surface exercise-level progression (e.g., "Your Pendlay Row: +5kg in 3 weeks") directly from the post-session screen.
- Plain-language narrative coaching insight (Whoop/Strava pattern applied to training volume).

---

### Stage 10: Recovery & Next Session
**What happens:** `[HYPOTHESIS]`
- The user receives a recovery signal (if wearable connected) or a subjective readiness prompt.
- The home screen updates to suggest appropriate next training stimulus based on recovery state.

**Uncertainty:** `[HYPOTHESIS]`
- "Am I recovered enough to train hard tomorrow?"
- "What should tomorrow's focus be?"

**PREDYX opportunity:** `[HYPOTHESIS]`
- Recovery status card on home screen (wearable-integrated where available; subjective self-report otherwise).
- Proactive next-session recommendation tied to current recovery and program progression.

---

## Journey S4: New User — First-Time Discovery (Beginner Segment)

### Scenario
A fitness beginner downloads PREDYX. They've never used a fitness app seriously. They feel intimidated by gym culture.

### Stage 1: Onboarding
**Friction points:** `[HYPOTHESIS]`
- Too many questions before seeing any value creates abandonment.
- Fitness terminology (1RM, RPE, periodization) creates immediate intimidation.
- Requiring body weight/measurements as a mandatory field feels invasive.

**Motivational moments:** `[HYPOTHESIS]`
- "This is built for people at your level" — explicit beginner inclusion messaging.
- Seeing a recognizable workout type immediately (e.g., "30-minute beginner strength") before any profile setup.

**PREDYX opportunity:** `[HYPOTHESIS]`
- Fast-start: show 2–3 high-quality "Start here" workouts immediately after account creation.
- Progressive profiling: collect detailed fitness data over the first week, not upfront.
- Avoid fitness jargon in onboarding labels.

---

### Stage 2: First Exercise Instruction Experience
**Friction points:** `[HYPOTHESIS]`
- Not knowing how to do exercises correctly creates anxiety and injury risk.
- Video loops without muscle activation overlay don't communicate which muscles are working.

**PREDYX opportunity — 3D / Motion high value:** `[HYPOTHESIS]`
- Muscle activation visualization (even as 2D highlighted silhouette) for each exercise in the library helps beginners understand what they are actually training.
- "Why this exercise?" explanation contextualizes each movement in their fitness journey.

---

## Cross-Journey Friction Point Summary

| Friction Point | Journey Stage | Severity |
|---|---|---|
| Empty home state (no personalization yet) | S1, Stage 1 | High |
| Decision paralysis from too many options | S1, Stage 2 | High |
| Inability to substitute exercises mid-session | S2, Stage 6 | High |
| Small touch targets with sweaty hands | S2, Stage 4 | High |
| Screen lock interrupting active session | S2, Stage 4 | High |
| Progress data buried in nested menus | S3, Stage 9 | Medium |
| Audio ducking glitches breaking music flow | S2, Stage 4 | Medium |
| Fitness jargon intimidating beginners | S4, Stage 1 | Medium |
| Forced post-session rating before seeing stats | S3, Stage 8 | Low |

---

## 3D / Motion Opportunity Map by Journey Stage

| Stage | Opportunity | Classification | Technology |
|---|---|---|---|
| S1 — Pre-workout preview | Muscle activation map before session | `HIGH VALUE` | 2D SVG or lightweight 3D |
| S2 — Mid-session exercise check | Multi-angle demo + muscle overlay (expandable card) | `HIGH VALUE` | Looping video + 2D SVG overlay |
| S2 — Rest period countdown | Animated progress ring | `LOW VALUE` | CSS / GSAP |
| S3 — Completion milestone | Celebration animation (PR / streak) | `MEDIUM VALUE` | Lottie / GSAP particles |
| S3 — Progress narrative | Animated data transitions in progress charts | `MEDIUM VALUE` | CSS / GSAP |
| Marketing / Landing | Scroll-driven parallax hero section | `MEDIUM VALUE` | GSAP ScrollTrigger |
| Marketing / Exercise library showcase | 3D interactive anatomy model | `HIGH VALUE` | Three.js / WebGL |

---

## Unresolved Questions for Phase 2+

| Question | Relevant Phase |
|---|---|
| What is the primary audience segment for PREDYX? (All three? One? A niche?) | Phase 2 |
| Does PREDYX include video instruction or rely on animated/3D instruction instead? | Phase 3 |
| What is the first-session "aha moment" for PREDYX specifically? | Phase 3 |
| How does personalization work without biometric hardware? | Phase 4 |
| What is the minimum viable workout experience (MVP scope) for Phase 7? | Phase 4 |
| Is post-workout recovery guidance in scope for v1? | Phase 4 |
