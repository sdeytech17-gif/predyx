# PREDYX — Information Architecture

> **Version:** 1.0.0
> **Phase:** 3 — UX Architecture, Flows & Wireframes
> **Date:** 2026-08-17
> **Owner:** @ui
> **Status:** Complete

---

## Inputs Consumed

- Phase 1: User Journey Hypotheses, Fitness UX Patterns, Whitespace Opportunities
- Phase 2: Brand Positioning (V1 pillars), Audience Definition
- Approved decisions: DEC-008 (audience), DEC-009 (content model), DEC-013 (V1 scope), DEC-014 (Apex Precision)

---

## V1 Product Scope (from DEC-013)

1. Workout discovery
2. Exercise education
3. Training programs
4. Performance / progress tracking
5. Motivation
6. Premium immersive UX

The IA must serve these six areas and no others in V1.

---

## Navigation Model

### Primary: Bottom Tab Bar (Mobile)

Mobile-first navigation pattern. Five top-level destinations accessible from any point in the app.

```
┌────────────────────────────────────────────────┐
│                                                │
│                [SCREEN CONTENT]                │
│                                                │
│                                                │
├────────────────────────────────────────────────┤
│  🏠 Home  │  📋 Programs  │  🔍 Discover  │  📈 Progress  │  👤 Profile  │
└────────────────────────────────────────────────┘
```

| Tab | Icon | Primary Content |
|---|---|---|
| **Home** | Home | Today's session, current program card, quick-access recent workouts |
| **Programs** | Grid | Browse and enroll in multi-week training programs |
| **Discover** | Search | Browse and filter individual workouts + Exercise Library |
| **Progress** | Chart | Strength tracking, personal records, session history, volume charts |
| **Profile** | Person | Settings, preferences, account, equipment profile |

### Desktop Navigation: Left Sidebar (Collapsed by Default)

On viewports ≥ 1024px, the bottom tab bar is replaced by a collapsible left sidebar. Same five items, top-aligned. Brand wordmark at top.

---

## Complete Screen Map

### 0. Pre-Auth Surfaces

```
┌─ Landing Page (Web / Marketing)
│   ├─ Hero Section
│   ├─ Feature Pillars (Education / Programs / Progress)
│   ├─ Exercise Education Preview
│   ├─ Program Showcase
│   ├─ Social Proof / Trust
│   └─ CTA → Sign Up / App Download
│
├─ Sign Up
│   ├─ Email + Password
│   └─ → Onboarding Flow
│
└─ Log In
    └─ → Home (if onboarding complete)
```

### 1. Onboarding Flow (First-Time Only)

```
┌─ Welcome Screen
│   └─ CTA: "Let's build your training." → Step 1
│
├─ Step 1: Primary Goal
│   ├─ Build strength
│   ├─ Improve conditioning
│   ├─ Move better / recover
│   └─ General fitness
│
├─ Step 2: Experience Level
│   ├─ New to structured training
│   ├─ Training 1–2 years
│   └─ 3+ years of consistent training
│
├─ Step 3: Equipment Available
│   ├─ Full gym (barbells, cables, machines)
│   ├─ Dumbbells + bench
│   ├─ Bodyweight only
│   └─ Mix (varies by day)
│
├─ Step 4: Training Days Per Week
│   └─ Selector: 2 / 3 / 4 / 5 / 6
│
├─ Step 5: Program Recommendation
│   ├─ Recommended program card (primary)
│   ├─ Alternate options (2–3)
│   └─ CTA: "Start this program" / "I'll choose later"
│
└─ → Home
```

### 2. Home Tab

```
┌─ Home
│   ├─ Greeting + Date
│   ├─ Today's Session Card (if program enrolled)
│   │   ├─ Program name + week/day
│   │   ├─ Session name + estimated duration
│   │   ├─ Muscle focus tags
│   │   └─ CTA: "Start Session" / "Preview"
│   │
│   ├─ Current Program Progress (mini-card)
│   │   ├─ Program name + week progress bar
│   │   └─ Link → Program Detail
│   │
│   ├─ Quick Workouts (horizontal scroll)
│   │   └─ Filter: Muscle / Duration / Equipment
│   │
│   └─ Recent Activity (last 3 sessions)
```

### 3. Programs Tab

```
┌─ Programs
│   ├─ Currently Active (if enrolled)
│   │   └─ → Program Detail
│   │
│   ├─ Browse All Programs
│   │   ├─ Filter / Sort bar
│   │   │   ├─ Goal: Strength / Conditioning / Hybrid
│   │   │   ├─ Duration: 4 / 6 / 8 / 12 weeks
│   │   │   ├─ Days/week: 3 / 4 / 5
│   │   │   └─ Equipment: Full gym / Dumbbells / Bodyweight
│   │   │
│   │   └─ Program Card Grid
│   │       ├─ Program name
│   │       ├─ Duration + days/week
│   │       ├─ Difficulty level
│   │       ├─ Goal tag
│   │       └─ → Program Detail
│   │
│   └─ Program Detail
│       ├─ Program header (name, overview, goal, duration)
│       ├─ What you'll build (key outcomes)
│       ├─ Equipment needed
│       ├─ Week-by-week plan (collapsed accordion per week)
│       │   └─ Each week: Day cards (session name, muscles, exercises count)
│       │       └─ → Session Preview
│       ├─ Exercise preview (3–4 key exercises with thumbnail)
│       └─ CTA: "Start Program" / "Continue Program"
```

### 4. Discover Tab

```
┌─ Discover
│   ├─ Search Bar (exercises + workouts)
│   │
│   ├─ Workouts
│   │   ├─ Filter Bar (inline)
│   │   │   ├─ Type: Strength / HIIT / Mobility / Cardio
│   │   │   ├─ Duration: <20 / 20–40 / 40+ min
│   │   │   ├─ Muscle: Full Body / Upper / Lower / Push / Pull / Core
│   │   │   └─ Equipment: Any / Gym / Dumbbells / Bodyweight
│   │   │
│   │   └─ Workout Card Grid
│   │       └─ → Workout Detail
│   │           ├─ Workout name + goal + duration
│   │           ├─ Muscle focus diagram (simplified)
│   │           ├─ Exercise list (expandable per exercise)
│   │           │   └─ → Exercise Detail
│   │           └─ CTA: "Start Workout"
│   │
│   └─ Exercise Library (tab within Discover)
│       ├─ Search
│       ├─ Filter: Muscle Group / Equipment / Movement Pattern
│       ├─ Exercise Card List
│       └─ → Exercise Detail
│           ├─ Exercise name + muscle group
│           ├─ 3D anatomy view (primary + secondary muscles highlighted)
│           ├─ Video instruction (real human demo)
│           ├─ Step-by-step movement cues (text)
│           ├─ Common errors to avoid
│           ├─ Variations / progressions
│           └─ Related exercises
```

### 5. Active Session Flow

```
┌─ Session Overview (pre-session)
│   ├─ Session name + estimated time
│   ├─ Exercise list (all exercises + sets/reps plan)
│   └─ CTA: "Begin Session"
│
├─ Exercise Screen (per exercise)
│   ├─ Exercise name + set count indicator (Set 2/4)
│   ├─ Video loop (silent autoplay, closed caption available)
│   ├─ Target: Reps + Weight (pre-populated from last session or plan)
│   ├─ Set logging row (weight field + reps field + checkmark)
│   ├─ Previous session data (last logged weight/reps for reference)
│   ├─ Notes field (optional)
│   ├─ Navigation: ← Previous Exercise / Next Exercise →
│   └─ Exercise name → Exercise Detail (full education)
│
├─ Rest Timer (between sets)
│   ├─ Full-screen rest mode
│   ├─ Timer countdown (monospaced amber — telemetry style)
│   ├─ Next set preview (exercise + target)
│   ├─ Skip / Extend buttons
│   └─ Auto-advance when timer reaches 0
│
└─ Session Complete
    ├─ Session summary (total volume, exercises completed, duration)
    ├─ Personal records achieved (amber highlight)
    ├─ Progress ring / visual for program completion
    └─ CTA: "View Progress" / "Back to Home"
```

### 6. Progress Tab

```
┌─ Progress
│   ├─ Overview Cards (weekly summary)
│   │   ├─ Sessions completed this week
│   │   ├─ Total volume lifted (kg)
│   │   └─ Active streak (days)
│   │
│   ├─ Personal Records
│   │   ├─ Recent PRs (last 30 days)
│   │   └─ PR list by exercise (with date)
│   │
│   ├─ Strength Charts
│   │   ├─ Exercise selector (dropdown)
│   │   └─ Line chart: weight over time (last 8 / 12 / 24 weeks)
│   │
│   ├─ Volume Chart
│   │   └─ Bar chart: weekly total volume (last 12 weeks)
│   │
│   └─ Session History
│       ├─ List of sessions (date, name, duration, volume)
│       └─ → Session Log Detail
│           └─ Full set-by-set log for that session
```

### 7. Profile Tab

```
┌─ Profile
│   ├─ User basics (name, member since)
│   │
│   ├─ Training Preferences
│   │   ├─ Primary goal
│   │   ├─ Equipment available
│   │   └─ Training days
│   │
│   ├─ Units (kg / lbs toggle)
│   │
│   ├─ App Preferences
│   │   ├─ Rest timer default duration
│   │   ├─ Audio cues on/off
│   │   ├─ Reduce motion on/off
│   │   └─ Closed captions on/off
│   │
│   └─ Account
│       ├─ Email / password
│       └─ Log out
```

---

## Content Type Inventory

| Content Type | Description | Delivery Method (DEC-009) |
|---|---|---|
| Training Programs | Multi-week structured plans with periodization | Curated structured data |
| Workouts | Individual sessions (standalone) | Curated structured data |
| Exercises | Individual movements with education | 3D anatomy + video + text cues |
| Session Logs | User-generated training records | User data |
| Progress Data | Strength over time, volume, PRs | User data + visualization |
| Marketing / Landing | Brand introduction, feature showcase | Editorial + cinematic UI |

---

## V1 Exclusions (Out of Scope)

| Feature | Status | Notes |
|---|---|---|
| Social / Community feed | Out of scope V1 | No competitor analysis recommended adding this without differentiation |
| Live / scheduled classes | Out of scope V1 | Requires significant backend infrastructure |
| Nutrition tracking | Out of scope V1 | Outside V1 product scope (DEC-013) |
| Wearable integration | Post-launch | DEC-011 |
| Subscription / paywall flow | TBD | DEC-010 — architecture must accommodate, not implement |
| AI coaching / adaptive programming | Post-launch | V1 uses curated programs only |

---

## Navigation Decision Notes

`[DECISION]` Bottom tab bar was chosen over hamburger/drawer for mobile because:
- Fitness apps require rapid one-thumb access to core functions during sessions
- Phase 1 research: eyes-free/one-handed operation is critical in workout context
- Tab bar keeps navigation visible and never buries core features

`[DECISION]` "Discover" combines both Workouts browse and Exercise Library in one tab because:
- Search and filtering behaviors are identical for both
- Users naturally browse exercises from within workout browsing context
- Reduces tab count from 6 to 5 — cleaner primary navigation
