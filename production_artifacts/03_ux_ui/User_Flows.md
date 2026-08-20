# PREDYX — User Flows

> **Version:** 1.0.0
> **Phase:** 3 — UX Architecture, Flows & Wireframes
> **Date:** 2026-08-17
> **Owner:** @ui
> **Status:** Complete

---

## Overview

Five core flows covering the primary user journeys for PREDYX V1. Each flow maps the step-by-step path, decision points, and success/failure states.

Flow basis: Phase 1 User Journey Hypotheses + V1 product scope (DEC-013).

---

## Flow 1: Onboarding & First Session

**User:** New user, first open
**Goal:** Get from blank app to completing a first session within 10 minutes
**Success metric (hypothesis):** User starts a session within the first session — reaches the "exercise screen"

```
[App Open]
    │
    ▼
[Welcome Screen]
    │ CTA: "Let's build your training"
    ▼
[Step 1: Primary Goal] ← 4 options as large tap targets
    │
    ▼
[Step 2: Experience Level] ← 3 options
    │
    ▼
[Step 3: Equipment Available] ← 4 options, multi-select allowed
    │
    ▼
[Step 4: Training Days/Week] ← Numeric selector 2–6
    │
    ▼
[Program Recommendation Screen]
    │
    ├─ CTA: "Start this program" → [Home: Today's Session Card visible]
    │       └─ CTA: "Start Session" → [Session Overview] → [Exercise Screen]
    │
    ├─ CTA: "See other programs" → [Programs Tab: Browse]
    │
    └─ CTA: "Skip for now" → [Home: Quick Workouts visible instead]
```

**Design notes:**
- Onboarding is 4 steps maximum — Phase 1 research: >5 steps causes significant drop-off
- No account creation wall before recommendation — show value first, require account on "Start Program"
- Progress indicator visible: "Step 2 of 4" — users need to know end is near
- Each step fits on one screen with no scroll — touch-first, clear choices

---

## Flow 2: Workout Discovery → Start Session

**User:** Returning user, browsing for a standalone workout
**Goal:** Find the right workout and start it in under 60 seconds from Discover tab

```
[Discover Tab]
    │
    ▼
[Workouts View — Default: All, sorted by Featured]
    │
    ├─ [Filter Bar interaction]
    │   ├─ Tap filter chip: Type = "Strength"
    │   ├─ Tap filter chip: Duration = "20–40 min"
    │   └─ Results filter instantly (no load state if pre-cached)
    │
    ├─ [Scroll workout cards]
    │
    └─ [Tap workout card]
        ▼
    [Workout Detail]
        ├─ Overview: name, duration, muscle focus, difficulty
        ├─ Equipment needed
        ├─ Exercise list (collapsible — 3 visible by default, "Show all")
        │   └─ [Tap exercise name] → [Exercise Detail] (modal sheet)
        │       └─ [Back] → returns to Workout Detail
        │
        └─ CTA: "Start Workout" [sticky footer]
            ▼
        [Session Overview: Full exercise list with sets/reps]
            │ CTA: "Begin Session"
            ▼
        [Exercise Screen: First Exercise]
```

**Error states:**
- No results after filtering → empty state: "No workouts match these filters. Try removing one." + "Reset filters" CTA
- Network error loading workout detail → skeleton + retry

---

## Flow 3: Exercise Education (Library)

**User:** Any user, looking up how to perform an exercise correctly
**Goal:** Find an exercise and understand the mechanics, form, and purpose — not just see a demonstration

```
[Discover Tab]
    │
    ├─ Tab within Discover: "Exercises" (secondary nav)
    │
    └─ [Exercise Library View]
        │
        ├─ [Search: "Romanian deadlift"]
        │   └─ Instant results as user types (≥ 2 chars)
        │
        ├─ [Filter: Muscle Group → "Posterior Chain"]
        │   └─ Filtered results
        │
        └─ [Tap exercise card]
            ▼
        [Exercise Detail Page]
            │
            ├─ Section 1: 3D Anatomy View
            │   ├─ Rotating anatomical model (interactive or autorotate)
            │   ├─ Primary muscles: highlighted in AMBER
            │   ├─ Secondary muscles: highlighted in STEEL BLUE
            │   ├─ Tap muscle name → label appears
            │   └─ prefers-reduced-motion: static front/back anatomy diagrams
            │
            ├─ Section 2: Video Instruction
            │   ├─ Looping silent autoplay (muted, closed captions ON by default)
            │   ├─ Full-screen option (icon button)
            │   └─ Pause/play
            │
            ├─ Section 3: Movement Cues (numbered list)
            │   ├─ "1. Hip hinge to load the posterior chain"
            │   ├─ "2. Keep the bar close to the legs throughout"
            │   └─ [4–6 precise cues maximum]
            │
            ├─ Section 4: Common Errors
            │   └─ 2–3 errors with brief explanation
            │
            ├─ Section 5: Muscles Worked (text list)
            │   ├─ Primary: Hamstrings, Glutes
            │   └─ Secondary: Erectors, Adductors
            │
            ├─ Section 6: Variations / Progressions
            │   └─ 2–4 related exercise cards (horizontal scroll)
            │       └─ Tap → [Exercise Detail] (replace current)
            │
            └─ If arrived from active session:
                └─ Sticky footer: "← Back to Session"
```

**Design notes:**
- 3D anatomy view is the primary differentiator for this flow — Phase 1 identified this as an uncontested space
- Video is muted autoplay with captions always on by default (accessibility requirement — Phase 1)
- Movement cues are PREDYX brand voice: precise, expert, brief — not a generic listicle

---

## Flow 4: Active Training Session

**User:** User mid-session, performing exercises
**Goal:** Complete all sets and exercises with minimum friction, log weights accurately, rest between sets

```
[Session Overview]
    │ CTA: "Begin Session"
    ▼
[Exercise Screen: Exercise 1]
    │
    ├─ [Watch video instruction] (loop, top half of screen)
    ├─ [Tap exercise title] → [Exercise Detail — modal sheet]
    │   └─ [Back] → returns to exercise screen
    │
    ├─ [Log Set 1]
    │   ├─ Weight field (pre-populated from last session or program default)
    │   ├─ Reps field (pre-populated from program plan)
    │   └─ Tap ✓ to complete set
    │       ▼
    │   [Rest Timer — full screen]
    │       ├─ Countdown in amber monospace (default 90s)
    │       ├─ Next set preview
    │       ├─ Skip Rest → returns to Exercise Screen
    │       ├─ +30s / –30s adjusters
    │       └─ Auto-advance at 0
    │
    ├─ [Log Sets 2, 3, 4...] (repeat above)
    │
    ├─ All sets complete on Exercise 1
    │   └─ Navigation: "Next Exercise →" (sticky bottom CTA)
    │
    ├─ [Exercise Screen: Exercise 2, 3... N] (repeat flow)
    │
    └─ All exercises complete
        ▼
    [Session Complete Screen]
        ├─ Summary: duration, total volume (kg), exercises completed
        ├─ Personal Records (if any) — amber highlight, PR badge
        ├─ Program progress indicator
        └─ CTAs: "View Progress" / "Back to Home"
```

**Critical UX rules for session flow (from Phase 1):**
- Video area: max 40% of screen height on mobile — must leave room for set log without scroll
- Touch targets for weight/reps fields: minimum 56dp (session-mode accessibility)
- Rest timer full-screen prevents accidental taps — deliberately covers the exercise log
- "Skip Rest" is always visible but NOT a primary CTA — rest is the default behaviour
- If user navigates away mid-session: prompt to resume on return ("Session in progress. Continue?")
- No lock-screen wakelock — note in Phase 7 spec to implement Screen Wake Lock API

---

## Flow 5: Progress Review

**User:** Returning user, reviewing their improvement over time
**Goal:** See how their strength has improved and feel motivated by concrete progress

```
[Progress Tab]
    │
    ▼
[Progress Overview]
    │
    ├─ [Weekly Summary Cards] (top row)
    │   ├─ "3 sessions this week"
    │   ├─ "8,450kg total volume"
    │   └─ "14-day streak" (if applicable — non-punitive display)
    │
    ├─ [Personal Records Section]
    │   ├─ "New this month: Squat 110kg (↑ +5kg)"
    │   └─ [Full PRs list] → tap → PR history for that exercise
    │
    ├─ [Strength Chart]
    │   ├─ Exercise selector (dropdown — most-logged exercises appear first)
    │   ├─ Time range: 8W / 12W / 24W / All
    │   └─ Chart: line chart with amber data points, PR stars
    │       └─ Tap data point → tooltip: "Week 8: 95kg × 5" / "Oct 3"
    │
    ├─ [Volume Chart]
    │   ├─ Weekly total volume bar chart (12 weeks default)
    │   └─ Color: steel blue bars, amber highlight on current week
    │
    └─ [Session History]
        ├─ Chronological list (grouped by week)
        ├─ Card: Date / Session name / Duration / Volume
        └─ Tap → [Session Log Detail]
            └─ Full set-by-set log: exercise, sets, weight, reps — read-only
```

**Design notes:**
- Progress narrative: PREDYX brand voice — "Your squat is up 12kg in eight weeks. That's the program working." shown as contextual copy above the chart — not a generic "Great job!" notification
- Streak counter is displayed but is a secondary metric — never shown with punitive messaging (Phase 1 motivation research)
- Empty state (new user, no data): "Your progress starts with your first session." + CTA to start

---

## Flow Error States

| Scenario | Behavior |
|---|---|
| No internet on session start | "You're offline. Your session will sync when you reconnect." — continue allowed with local storage |
| Session abandoned mid-way | On next app open: "Session in progress from [date]. Resume?" |
| Exercise video fails to load | Video placeholder + "Tap to retry" — movement cues remain visible and accessible |
| No program enrolled | Home shows Quick Workouts instead of Today's Session card — no error, graceful fallback |
| Onboarding skipped | Profile tab shows incomplete prompt — gentle, non-blocking |
