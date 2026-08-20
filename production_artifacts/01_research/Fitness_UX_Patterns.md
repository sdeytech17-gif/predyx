# PREDYX — Fitness UX Patterns

> **Version:** 1.0.0
> **Phase:** 1 — UX Research
> **Date:** 2026-08-17
> **Owner:** @ux
> **Status:** Complete

---

## Purpose

This document catalogs observable UX patterns across the fitness platform space. These are patterns that have been directly observed in real products or are well-established in credible UX practice. Each pattern is labeled to distinguish evidence from inference.

**Labels:**
- `[OBSERVED]` — Directly seen in competitor products or primary sources
- `[INFERRED]` — Reasonable interpretation of observed behavior
- `[HYPOTHESIS]` — Proposition requiring validation
- `[EVIDENCE]` — Supported by citable secondary source

---

## Pattern Category 1: Onboarding Patterns

### P-ON-01: Frictionless Fast-Start Onboarding
- `[OBSERVED]` Nike Training Club and Apple Fitness+ complete onboarding in under 60 seconds using 1-tap OAuth + minimal profiling.
- `[INFERRED]` Reduces abandonment at the entry point; users experience value before commitment.
- `[EVIDENCE]` UX research indicates fitness apps have ~90% 30-day abandonment rate; early time-to-first-workout is critical (multiple UX sources, 2024).

### P-ON-02: Diagnostic Quiz Onboarding
- `[OBSERVED]` Freeletics uses a detailed intake questionnaire (goal, fitness level, equipment, constraints, frequency) before presenting subscription options.
- `[INFERRED]` Creates "sunk cost" and "IKEA effect" psychological investment — users feel the plan was made for them.
- `[HYPOTHESIS]` Including physical constraint toggles (joint limitations, "Quiet Training") during onboarding reduces early churn.

### P-ON-03: Health API Auto-Fill
- `[OBSERVED]` Whoop, Apple Fitness+, and Strava prompt for Apple HealthKit / Android Health Connect during onboarding to pre-populate user metrics.
- `[INFERRED]` Eliminates manual data entry for age, weight, resting heart rate, and historical workouts.

### P-ON-04: Zero Paywall Entry
- `[OBSERVED]` Nike Training Club: 100% free. Strava: freemium with soft paywall. Apple Fitness+: 1-month free trial standard, 3-month hardware promo.
- `[INFERRED]` Eliminating or delaying paywall dramatically increases conversion into user database.
- `[HYPOTHESIS]` PREDYX will need a clear free vs. paid value boundary that doesn't punish exploration.

### P-ON-05: Baseline Calibration Period
- `[OBSERVED]` Whoop explicitly communicates a 4–14 day calibration period before baseline metrics are accurate.
- `[INFERRED]` Setting expectation for calibration prevents early dissatisfaction from imprecise initial data.

### P-ON-06: Empty State Guidance
- `[OBSERVED]` Post-onboarding empty states are universally handled with curated starter content, not blank screens.
- `[EVIDENCE]` "Empty interface paralysis" is a documented UX failure mode (eleken.co, 2024).

---

## Pattern Category 2: Workout Discovery Patterns

### P-WD-01: Multi-Dimensional Faceted Filtering
- `[OBSERVED]` Peloton, Nike, Apple Fitness+ all offer multi-tag filtering across: Modality/Type, Duration, Equipment, Instructor/Trainer, Intensity/Difficulty.
- `[INFERRED]` Reduces decision fatigue by collapsing a large content library into contextually relevant options.

### P-WD-02: Two Discovery Intents
- `[INFERRED]` Successful discovery UX serves two mental models simultaneously:
  - **Contextual/situational**: "I have 20 minutes and dumbbells right now"
  - **Long-term commitment**: "I want a structured 8-week strength program"
- `[OBSERVED]` Nike Training Club explicitly supports both with Workouts (instant filter) and Programs (structured plans) as separate top-level tabs.

### P-WD-03: Personalized Home Feed
- `[OBSERVED]` Peloton's home tab is a personalized "For You" feed based on workout history, goals, and preferences.
- `[OBSERVED]` Apple Fitness+ includes a "For You" algorithmic section.
- `[INFERRED]` Personalized feed reduces decision paralysis and rewards platform loyalty.

### P-WD-04: Environment Toggle
- `[INFERRED]` A top-of-screen toggle (Home / Gym) that dynamically reconfigures the entire discovery view is highly effective for equipment-variable audiences.
- `[HYPOTHESIS]` PREDYX users likely train across both home and gym environments — an environment toggle is a high-value low-effort pattern.

### P-WD-05: Structured Multi-Week Programs
- `[OBSERVED]` All platforms except Strava and Whoop offer multi-week structured training programs with sequential locked/unlocked class progression.
- `[INFERRED]` Programs create habit loops, reduce session-level decision fatigue, and improve retention vs. single workout discovery.

### P-WD-06: Content Stacking / Queuing
- `[OBSERVED]` Peloton's "Stack" feature allows up to 10 classes to be queued and played sequentially (Warmup + Main + Core + Cooldown).
- `[INFERRED]` Stacking lets users design a complete training session without committing during a single workout — supports thoughtful training planning.

---

## Pattern Category 3: Exercise Instruction Patterns

### P-EX-01: Continuous Looping Video (3–5s)
- `[OBSERVED]` Nike Training Club, Freeletics use silent looping exercise demo videos. Can be placed on the floor and viewed mid-exercise.
- `[INFERRED]` Continuous loop prevents the need to restart video; supports eyes-free interval training.

### P-EX-02: Multi-Angle Video Coverage
- `[OBSERVED]` Freeletics provides front, side, and 360° rotational angles for exercise demonstrations.
- `[INFERRED]` Multiple angles clarify joint position and spinal alignment that single-angle video cannot.

### P-EX-03: Slow-Motion Key Phase Markers
- `[OBSERVED]` Freeletics uses slow-motion at key movement phases (bottom of squat, hip extension).
- `[INFERRED]` Slow-motion at critical form moments reduces injury risk and technique misunderstanding.

### P-EX-04: Instructor-Led Live/Pre-Recorded Video
- `[OBSERVED]` Peloton, Apple Fitness+, Nike Training Club all use instructor-led video as primary instruction method.
- `[OBSERVED]` Apple Fitness+ uses a multi-trainer triad: Lead Trainer, Modifier (low-impact), Progression (advanced).
- `[INFERRED]` Dedicated modifier reduces intimidation for beginners; all three levels train simultaneously.

### P-EX-05: Structured Form Instructions
- `[OBSERVED]` Nike, Freeletics, and others provide: Setup → Execution → Common Mistakes to Avoid text breakdown.
- `[INFERRED]` Three-section format matches how fitness professionals verbally instruct movement.

### P-EX-06: Audio Coaching with Music Ducking
- `[OBSERVED]` Peloton and Apple Fitness+ allow audio balance control (instructor voice vs. music).
- `[OBSERVED]` Apple Fitness+ introduced a formal "Audio Focus" toggle (iOS 17).
- `[OBSERVED]` Audio ducking glitches (music not recovering after coaching cue) are a documented frustration.

### P-EX-07: Anatomical Muscle Maps
- `[OBSERVED]` Whoop Strength Trainer shows front/back 2D vector muscle heatmaps highlighting loaded muscle groups per workout.
- `[OBSERVED]` Nike Training Club highlights targeted muscle groups per exercise.
- `[HYPOTHESIS]` 3D interactive anatomy visualization (allowing rotation and muscle layer toggling) would provide significantly more instructional value than static 2D maps.

### P-EX-08: Eyes-Free Workout Interaction
- `[OBSERVED]` Apple Watch haptic pulses 3 seconds before interval ends. Freeletics uses audio countdown beeps. Nike uses haptic pulses.
- `[OBSERVED]` Giant touch targets (56–72dp) for Pause/Stop/Next used by Apple, Freeletics, Strava during active tracking.
- `[INFERRED]` During exercise, users' hands are sweaty, attention is divided, and phone is often floor-mounted — all UI must accommodate eyes-free and sweat-impaired interaction.

---

## Pattern Category 4: In-Session Metric HUD Patterns

### P-HUD-01: Minimal In-Session HUD
- `[OBSERVED]` Best-in-class platforms show only 3–5 critical metrics during an active session: Timer, Rep Count, Heart Rate (if available), and Rest/Active indicator.
- `[INFERRED]` Cognitive load during exercise is high — minimal HUD prevents distraction from the workout itself.

### P-HUD-02: Large Readability at Distance
- `[OBSERVED]` Freeletics: primary metrics visible from 2–3m. Strava: giant numerals for outdoor GPS screens. Apple Fitness+: full-screen countdown clock.
- `[INFERRED]` Phone placed on floor or propped against equipment requires at-a-glance readability without leaning in.

### P-HUD-03: Real-Time Data Animation
- `[OBSERVED]` Apple Fitness+ animates calorie and heart rate counters as rolling odometers. Whoop animates strain gauge filling. Peloton animates leaderboard shifts.
- `[INFERRED]` Animated live data feels alive and motivating — creates "living dashboard" experience.

---

## Pattern Category 5: Progress & Achievement Patterns

### P-PA-01: Visual Ring / Orbit Progress Metaphor
- `[OBSERVED]` Apple Activity Rings (Move, Exercise, Stand). Whoop circular Recovery and Strain dials.
- `[INFERRED]` Circular progress metaphors provide instant cognitive "at-a-glance" completion sense without requiring decimal parsing.

### P-PA-02: Calendar Consistency Heatmap
- `[OBSERVED]` Peloton activity calendar with colored dots. Strava weekly mileage goal rings.
- `[INFERRED]` Visual consistency streaks provide the "chain effect" — users are motivated not to break the visual pattern.

### P-PA-03: Forgiving Streak Mechanics
- `[EVIDENCE]` Rigid streaks that reset on a single missed day cause guilt and abandonment (multiple UX sources, 2024).
- `[INFERRED]` Modern platforms (Duolingo Streak Freeze, Strava grace periods) are moving toward flexible streak models that preserve momentum.
- `[HYPOTHESIS]` PREDYX should design recovery/rest days as intentional positive actions, not just absence from training.

### P-PA-04: Personal Records (PRs)
- `[OBSERVED]` Strava KOM/QOM/CR, Peloton PR tracking, Freeletics Personal Bests.
- `[INFERRED]` PRs create a permanent, personally meaningful benchmark — they give each workout a competitive dimension even without other users.

### P-PA-05: Micro-Reward Celebration
- `[OBSERVED]` Apple Fitness+: Activity Ring closure triggers particle/firework celebration on Watch + screen. Nike: badge glimmer, trophy unlock, streak confetti. Freeletics: level-up particles, badge animations.
- `[INFERRED]` Haptic + visual celebration at milestone completion triggers dopamine reward response and reinforces positive habit loop.

### P-PA-06: Milestone Badges
- `[OBSERVED]` Peloton Century Club (100th ride), Nike milestone trophies, Strava 3D finisher badges, Freeletics XP/level system.
- `[INFERRED]` Named milestones with visual identity (badge art) create social sharing moments and long-term retention anchors.

---

## Pattern Category 6: Personalization Patterns

### P-PERS-01: Contextual Time-of-Day Greeting
- `[INFERRED]` Dynamic home screen headers responding to time of day and recent activity ("Good evening — here's your recovery-focused session for tonight") reduce cognitive load in workout selection.
- `[HYPOTHESIS]` Context-aware recommendations are expected by users familiar with Netflix, Spotify, and personalized content platforms.

### P-PERS-02: Equipment Auto-Remap
- `[OBSERVED]` Nike and Freeletics filter exercise options based on declared equipment profile.
- `[INFERRED]` Removing exercises the user cannot perform prevents frustration and abandonment mid-session.

### P-PERS-03: Adapt / Substitute Mechanic
- `[OBSERVED]` Freeletics prominently features an "Adapt Session" button on the active workout screen.
- `[INFERRED]` On-demand exercise substitution when equipment is occupied or a joint flares up prevents complete session abandonment.
- `[EVIDENCE]` "Inflexible session workflows" is a documented primary failure mode causing user abandonment (decode.agency, 2024).

### P-PERS-04: Post-Session AI Feedback Loop
- `[OBSERVED]` Freeletics: 3-question post-workout survey (Technique, Exhaustion, Completion rate) immediately recalibrates the next session.
- `[INFERRED]` Visible recalibration response to user feedback builds trust that the AI is actually listening.

---

## Pattern Category 7: Motivational Design Patterns

### P-MOT-01: Positive Framing Over Shame
- `[EVIDENCE]` Studies show rigid streak mechanics and leaderboard shaming cause guilt, demotivation, and churn (UCL study on exercise guilt, 2024).
- `[INFERRED]` Compassionate, "no bad days" messaging supports sustainable engagement vs. performance anxiety.
- `[HYPOTHESIS]` PREDYX's motivational voice should celebrate effort and adaptation, not punish absence.

### P-MOT-02: Relative Effort Comparison
- `[OBSERVED]` Peloton Burn Bar: ranks user vs. historical cohort who completed same workout (not vs. all users globally). Strava: Local Legend (most attempts, not fastest).
- `[INFERRED]` Relative comparison scales for all fitness levels — beginners feel competitive against their own history, not elite athletes.

### P-MOT-03: Progress Narrative
- `[OBSERVED]` Whoop monthly correlation reports ("Recovery improved +8% on days you took Magnesium"). Strava "Athlete Intelligence" plain-language workout summaries.
- `[INFERRED]` Plain-language narrative explanations of data patterns feel like coaching insights, not raw data dumps.

---

## Pattern Category 8: Social & Community Patterns

### P-SOC-01: Passive Social Proof (vs. Active Comparison)
- `[OBSERVED]` Apple Fitness+ Burn Bar is optional and hidden by default. Peloton leaderboard is active but skippable. Strava Local Legend doesn't require being fastest.
- `[INFERRED]` Fitness platforms are moving toward opt-in social comparison rather than forced leaderboard pressure.

### P-SOC-02: Community Naming / Identity
- `[OBSERVED]` Freeletics: "Free Athletes." Peloton: "Members," "Riders," century badge community. Strava: KOM/QOM holders.
- `[INFERRED]` Named community identities create belonging and tribal loyalty beyond the product's functional value.

### P-SOC-03: Challenge as Motivation
- `[OBSERVED]` Strava monthly challenges (distance, elevation, time). Peloton holiday rides. Freeletics group challenges.
- `[INFERRED]` Time-bounded challenges with visible participation metrics motivate consistent engagement during campaign windows.

---

## Pattern Category 9: Accessibility Patterns

### P-ACC-01: High-Contrast Dark Mode as Default
- `[OBSERVED]` Five of six platforms default to dark mode — pure black/charcoal with white text at WCAG AAA contrast ratios.
- `[OBSERVED]` Strava added dark mode in 2024 with System Match option.

### P-ACC-02: Audio + Haptic Redundancy
- `[OBSERVED]` Apple Watch haptic + audio chime at interval end (3-second warning). Freeletics countdown beeps + audio prompt. Nike haptic pulse at countdown intervals.
- `[INFERRED]` Dual sensory feedback channels (audio + haptic) ensure critical cues are not missed in noisy gym environments or with headphones removed.

### P-ACC-03: Closed Captions on All Video
- `[OBSERVED]` Peloton: multi-language real-time captions (live and on-demand). Apple Fitness+: SDH subtitles in 6+ languages. Nike: closed captions on all trainer-led videos.

### P-ACC-04: Screen-Free / Audio-Led Fallback
- `[OBSERVED]` Apple Fitness+: Audio Hints allow VoiceOver users to follow workouts. Nike: audio coaching cues usable without looking at screen.
- `[INFERRED]` Workouts must be completable without continuous visual attention — audio-led mode is an accessibility and usability requirement.

---

## Key Pattern Summary for PREDYX

| Pattern Category | Strongest Observed Patterns | PREDYX Relevance |
|---|---|---|
| Onboarding | Frictionless fast-start + progressive profiling | High — minimize pre-workout barrier |
| Discovery | Multi-dimensional filter + dual intent (instant/structured) | High — core navigation model |
| Exercise Instruction | Looping video + multi-angle + audio coaching | High — exercise library foundation |
| In-Session HUD | Minimal, large, distance-readable | High — workout screen design constraint |
| Progress | Forgiving streaks, PRs, micro-celebrations | High — motivational system design |
| Personalization | Equipment remapping, Adapt mechanic, feedback loop | High — personalization strategy |
| Motivation | Positive framing, relative comparison, narrative coaching | High — brand voice implication |
| Accessibility | Dark high-contrast, audio redundancy, closed captions, eyes-free | Non-negotiable — systemic requirement |

---

*Patterns will be refined and used as UX requirements input for Phase 3 (UX Architecture).*
