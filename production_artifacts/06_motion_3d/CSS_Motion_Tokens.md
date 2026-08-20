# PREDYX — CSS Motion Tokens & Keyframes

> **Version:** 1.0.0
> **Phase:** 6 — Final Motion / 3D Specification
> **Date:** 2026-08-18
> **Owner:** @parallax
> **Purpose:** Complete CSS motion token system — all custom properties, timing functions, durations, keyframes, and component-level transition rules for the authenticated app. Implementation-ready for Phase 7.

---

## Design Principle

All in-app motion (excluding landing page GSAP and the 3D anatomy viewer) is implemented **exclusively in CSS**. No JavaScript animation library is loaded in the authenticated app shell.

This file is the single source of truth for every CSS animation variable used in PREDYX.

---

## Part 1 — CSS Custom Properties (Design Tokens)

Place in `styles/tokens.css` (already referenced in Platform Architecture):

```css
/* ─── MOTION TOKENS ──────────────────────────────────────────────────────── */

/* Easing curves */
--ease-sharp:       cubic-bezier(0.22, 1, 0.36, 1);   /* Primary: fast in, sharp deceleration */
--ease-in:          cubic-bezier(0.4, 0, 1, 1);        /* Entering elements */
--ease-out:         cubic-bezier(0, 0, 0.2, 1);        /* Exiting elements — sharp stop */
--ease-linear:      linear;                            /* Progress bars, timers only */

/* Duration scale */
--dur-instant:      0ms;    /* For prefers-reduced-motion overrides */
--dur-micro:        100ms;  /* Button press, checkmark fill, icon state change */
--dur-fast:         200ms;  /* Set completion, card hover, chip toggle */
--dur-normal:       250ms;  /* Page route transitions, modal enter/exit */
--dur-slow:         400ms;  /* Section reveals, PR achievement, skeleton fade */
--dur-rest-timer:   var(--rest-duration, 90000ms); /* Dynamic: set per session via JS custom property */

/* Stagger base (used in JS for GSAP; defined here for reference) */
--stagger-base:     80ms;   /* Per-item delay in list/card stagger reveals */
```

---

## Part 2 — `prefers-reduced-motion` Override Block

This block must be included **globally** in `styles/tokens.css` immediately after the motion token block. It overrides all durations to instant for users who have requested reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration:         var(--dur-instant) !important;
    animation-delay:            var(--dur-instant) !important;
    transition-duration:        var(--dur-instant) !important;
    transition-delay:           var(--dur-instant) !important;
    scroll-behavior:            auto !important;
  }

  /* SVG Rest Timer: hide arc, show text only */
  .rest-timer__arc {
    display: none !important;
  }

  /* Skeleton shimmer: remove animation, keep visual structure */
  .skeleton::after {
    animation: none !important;
  }
}
```

> **Important:** This single block covers all CSS animations automatically. GSAP's `prefers-reduced-motion` is handled separately in `lib/gsap/GSAPProvider.tsx` (see GSAP Spec).

---

## Part 3 — Named Keyframes

All `@keyframes` blocks used across the product. Each has a clear purpose.

```css
/* ─────────────────────────────────────────────────────────────────────────
   KF-001: Set completion checkmark
   Usage: Set row → ✓ icon fill on completion
   Duration: var(--dur-micro)  Easing: var(--ease-sharp)
   ───────────────────────────────────────────────────────────────────────── */
@keyframes checkFill {
  0%   { transform: scale(0.75); opacity: 0.4; }
  60%  { transform: scale(1.08); }
  100% { transform: scale(1.0);  opacity: 1; }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-002: Amber pulse (one-shot — final set complete / PR moment)
   Usage: Amber glow on last set row; PR achievement amber flash
   Duration: var(--dur-slow)  Easing: ease-out  Iteration: 1
   ───────────────────────────────────────────────────────────────────────── */
@keyframes amberPulse {
  0%   { box-shadow: 0 0 0 0 hsl(37 92% 55% / 0.7); }
  50%  { box-shadow: 0 0 0 12px hsl(37 92% 55% / 0); }
  100% { box-shadow: 0 0 0 0   hsl(37 92% 55% / 0); }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-003: Skeleton shimmer
   Usage: Loading skeletons on Home, Programs, Discover, Progress
   Duration: 1600ms  Easing: linear  Iteration: infinite
   ───────────────────────────────────────────────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-004: PR star burst (Personal Record achievement)
   Usage: PR badge appears on session complete and progress chart peak
   Duration: var(--dur-slow)  Easing: var(--ease-sharp)
   ───────────────────────────────────────────────────────────────────────── */
@keyframes starBurst {
  0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
  60%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
  100% { transform: scale(1.0) rotate(0deg); opacity: 1; }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-005: Page fade-in (route enter)
   Usage: Route transitions — new page content appears
   Duration: var(--dur-normal)  Easing: var(--ease-out)
   ───────────────────────────────────────────────────────────────────────── */
@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-006: Bottom sheet slide up
   Usage: Rest timer bottom sheet, exercise info bottom sheet
   Duration: var(--dur-normal)  Easing: var(--ease-sharp)
   ───────────────────────────────────────────────────────────────────────── */
@keyframes sheetSlideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-007: Bottom sheet slide down (exit)
   Usage: Dismissing bottom sheets
   Duration: var(--dur-fast)  Easing: var(--ease-in)
   ───────────────────────────────────────────────────────────────────────── */
@keyframes sheetSlideDown {
  from { transform: translateY(0); }
  to   { transform: translateY(100%); }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-008: Scroll progress indicator
   Usage: 1px amber line at top of marketing page
   Driven by: scroll-timeline (native) or JS fallback
   ───────────────────────────────────────────────────────────────────────── */
@keyframes scrollProgress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-009: Modal/overlay fade in
   Usage: Confirmation dialogs, info overlays
   Duration: var(--dur-fast)  Easing: var(--ease-out)
   ───────────────────────────────────────────────────────────────────────── */
@keyframes overlayFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ─────────────────────────────────────────────────────────────────────────
   KF-010: Strength chart line draw (stroke-dashoffset)
   Usage: Progress page strength chart — line draws in on mount
   Duration: 600ms  Easing: var(--ease-sharp)
   Applied to: SVG <path> elements via Intersection Observer trigger
   ───────────────────────────────────────────────────────────────────────── */
/* Note: stroke-dasharray and stroke-dashoffset values set dynamically via JS
   based on path length at render time. Keyframe only controls direction. */
@keyframes lineDrawIn {
  from { stroke-dashoffset: var(--path-length); }
  to   { stroke-dashoffset: 0; }
}
```

---

## Part 4 — Component Transition Rules

Each component's CSS transition declaration — the implementation-ready rules for Phase 7:

### 4.1 Button

```css
.btn {
  transition:
    background-color var(--dur-fast)  var(--ease-sharp),
    border-color     var(--dur-fast)  var(--ease-sharp),
    color            var(--dur-fast)  var(--ease-sharp),
    transform        var(--dur-micro) var(--ease-sharp),
    box-shadow       var(--dur-fast)  var(--ease-sharp);
}

.btn:hover  { /* component CSS module handles property values */ }
.btn:active { transform: scale(0.96); }
```

### 4.2 Card (Program, Workout, Exercise)

```css
.card {
  transition:
    transform  var(--dur-fast) var(--ease-sharp),
    box-shadow var(--dur-fast) var(--ease-sharp),
    border-color var(--dur-fast) var(--ease-sharp);
}

.card:hover {
  transform: translateY(-2px);
  /* box-shadow and border-color values in CSS module */
}
```

### 4.3 Bottom Tab Bar Active Indicator

```css
.tab-indicator {
  transition:
    transform    var(--dur-fast)   var(--ease-sharp),
    opacity      var(--dur-fast)   var(--ease-sharp),
    border-color var(--dur-micro)  var(--ease-sharp);
}
```

### 4.4 Set Log Row — Completion State

```css
.set-row {
  transition: opacity var(--dur-fast) var(--ease-sharp);
}

.set-row--completed {
  opacity: 0.55;
  transition: opacity var(--dur-fast) var(--ease-sharp);
}

.set-row__check {
  animation: checkFill var(--dur-micro) var(--ease-sharp) forwards;
}

/* Final set in an exercise: one-shot amber ring */
.set-row--last-complete .set-row__check {
  animation:
    checkFill  var(--dur-micro) var(--ease-sharp) forwards,
    amberPulse var(--dur-slow)  ease-out          forwards var(--dur-micro);
}
```

### 4.5 Rest Timer Arc (SVG)

```css
.rest-timer__arc {
  /* stroke-dashoffset animates linearly over restDuration */
  /* Value set via JS custom property: style="--rest-duration: 90000ms" */
  transition: stroke-dashoffset var(--rest-duration, 90000ms) var(--ease-linear);

  /* Color transitions — amber to steel in final 10s */
  /* Color change triggered by adding .rest-timer__arc--warning class via JS */
}

.rest-timer__arc--warning {
  transition:
    stroke-dashoffset var(--rest-duration, 90000ms) var(--ease-linear),
    stroke            var(--dur-slow)               var(--ease-sharp);
  /* stroke value changes to steel blue in CSS module */
}

/* prefers-reduced-motion: entire arc hidden, countdown text only */
@media (prefers-reduced-motion: reduce) {
  .rest-timer__arc { display: none; }
}
```

### 4.6 Skeleton Loaders

```css
.skeleton {
  position: relative;
  overflow: hidden;
  background: hsl(220 8% 12%);
  border-radius: 4px;
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    hsl(220 8% 18% / 0.8) 50%,
    transparent 100%
  );
  background-size: 600px 100%;
  animation: shimmer 1600ms linear infinite;
}
```

### 4.7 Exercise Screen Transition (Session)

```css
.exercise-screen {
  /* Enter: slide in from right */
  animation: exerciseEnter var(--dur-normal) var(--ease-sharp) forwards;
}

.exercise-screen--exit {
  /* Exit: slide out to left */
  animation: exerciseExit var(--dur-normal) var(--ease-sharp) forwards;
}

/* prefers-reduced-motion: opacity crossfade only */
@media (prefers-reduced-motion: reduce) {
  .exercise-screen, .exercise-screen--exit {
    animation-name: pageFadeIn; /* reuse simple fade */
  }
}
```

```css
/* Supporting keyframes for exercise screen slide */
@keyframes exerciseEnter {
  from { transform: translateX(24px); opacity: 0; }
  to   { transform: translateX(0);   opacity: 1; }
}

@keyframes exerciseExit {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(-24px); opacity: 0; }
}
```

### 4.8 Page Route Transitions (Next.js layout)

```css
/* Applied to route group layout wrapper */
.page-content {
  animation: pageFadeIn var(--dur-normal) var(--ease-sharp) forwards;
}
```

### 4.9 Modal / Overlay

```css
.overlay-backdrop {
  animation: overlayFadeIn var(--dur-fast) var(--ease-out) forwards;
}

.bottom-sheet {
  animation: sheetSlideUp var(--dur-normal) var(--ease-sharp) forwards;
}

.bottom-sheet--closing {
  animation: sheetSlideDown var(--dur-fast) var(--ease-in) forwards;
}
```

### 4.10 Progress Chart — Strength Line Draw

```css
/* Applied via Intersection Observer when chart enters viewport */
.strength-chart__path {
  stroke-dasharray: var(--path-length); /* set by React via ref on mount */
  stroke-dashoffset: var(--path-length);
  animation: lineDrawIn 600ms var(--ease-sharp) forwards;
}

/* Data point circles */
.strength-chart__dot {
  transform: scale(0);
  animation: checkFill 200ms var(--ease-sharp) forwards;
  /* animation-delay set per-dot via inline style: calc(600ms + index * 20ms) */
}

/* PR star marker */
.strength-chart__pr-star {
  animation:
    starBurst var(--dur-slow) var(--ease-sharp) forwards,
    amberPulse var(--dur-slow) ease-out forwards var(--dur-slow);
}
```

---

## Part 5 — Sidebar Navigation (Desktop)

```css
.sidebar {
  width: 240px;
  transition: width var(--dur-normal) var(--ease-sharp);
  overflow: hidden;
}

.sidebar--collapsed {
  width: 72px;
}

/* Labels fade out during collapse */
.sidebar__label {
  transition: opacity var(--dur-fast) var(--ease-sharp);
  opacity: 1;
  white-space: nowrap;
}

.sidebar--collapsed .sidebar__label {
  opacity: 0;
  pointer-events: none;
}
```

---

## Part 6 — Scroll Progress Bar (Marketing Page Only)

```css
/* 1px amber line at top of landing page — tracks scroll position */
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 1px;
  background: var(--color-amber);
  transform-origin: left center;
  transform: scaleX(0);
  z-index: 100;

  /* Native scroll-timeline (Chrome 115+) */
  animation: scrollProgress linear both;
  animation-timeline: scroll(root block);

  /* Reduced motion: hide entirely */
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
}
```

*Fallback for browsers without `animation-timeline`: GSAP ScrollTrigger updates `transform: scaleX()` via `onUpdate` in `GSAPProvider.tsx`.*
