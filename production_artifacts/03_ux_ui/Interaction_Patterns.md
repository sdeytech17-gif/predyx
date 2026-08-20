# PREDYX — Interaction Patterns & Micro-Animation Specification

> **Version:** 1.0.0
> **Phase:** 3 — UX Architecture, Flows & Wireframes
> **Date:** 2026-08-17
> **Owner:** @ui
> **Status:** Complete — Implements DEC-012 (Technology Escalation Ladder)

---

## Governing Principle: Technology Escalation Ladder

Per DEC-012 (Human Approved):

```
Static → Micro-motion → 2D GSAP → 2.5D Parallax → True 3D/WebGL
```

Every interaction in this specification is assigned to the appropriate rung. No interaction uses a higher rung than necessary.

---

## prefers-reduced-motion Rule

**This is non-negotiable.** Every animation defined below must have a reduced-motion alternative.

```css
@media (prefers-reduced-motion: reduce) {
  /* Strategy 1: Duration = 0ms (instant state change) */
  /* Strategy 2: Opacity fade only — no translation, scale, or rotation */
  /* Strategy 3: Static alternative (anatomy diagram instead of 3D rotation) */
}
```

Specific reduced-motion behavior is defined per interaction below.

---

## Apex Precision Motion Character

Animations express the brand: precise, controlled, sharp. Motion curves decelerate sharply — never bounce, never spring. Like a shutter, a dial, or a mechanical arm reaching its stop.

| Property | Value |
|---|---|
| Standard easing | `cubic-bezier(0.22, 1, 0.36, 1)` — sharp deceleration |
| Exit easing | `cubic-bezier(0.4, 0, 1, 1)` — fast out |
| Timer countdowns | `linear` only |
| Spring physics | Never used in Apex Precision |

---

## Interaction Patterns

### 1. Page / Screen Transitions

**Rung:** Micro-motion

```
Type:       Directional slide + fade
Forward:    New screen slides in from right (translateX: 100% → 0), 
            old screen fades out (opacity: 1 → 0)
Back:       New screen slides in from left (-100% → 0)
Duration:   250ms
Easing:     --ease-sharp
Reduced:    Opacity fade only (no translation). 200ms.
```

---

### 2. Bottom Tab Bar Switch

**Rung:** Micro-motion

```
Icon:       Scale 1.0 → 1.1 on active, 1.1 → 1.0 on inactive
Label:      Color transition (stone → amber), duration 150ms
Amber bar:  Width from 0 → 24px, top of tab, 150ms
Duration:   150ms
Easing:     --ease-sharp
Reduced:    Instant color swap only (0ms)
```

---

### 3. Button Hover / Press

**Rung:** Micro-motion

Primary button (amber):
```
Hover:      background-color lightens 8%, 150ms
Press:      background-color darkens 8% + scale(0.97), 80ms
Release:    Return to hover state, 100ms
Reduced:    Color change only, no scale
```

Ghost / secondary button:
```
Hover:      border-color → amber, color → text-primary, 150ms
Press:      opacity 0.7, 80ms
Reduced:    Instant color change only
```

---

### 4. Card Hover (Desktop Only)

**Rung:** Micro-motion

```
BG:         --color-bg-secondary → --color-bg-elevated, 150ms
Border:     --color-border-subtle → --color-border-strong, 150ms
Transform:  none (no lift/scale — Apex Precision is flat, not floating)
Reduced:    Border color change only
```

---

### 5. Filter Chip Activation

**Rung:** Micro-motion

```
Inactive → Active:   BG fade (transparent → amber), color (stone → obsidian), 150ms
Active → Inactive:   Reverse, 150ms
Content reflow:      Stagger — chips shift position after 50ms delay, 200ms
Reduced:             Instant state change
```

---

### 6. Set Completion (Check ✓ Tap)

**Rung:** Micro-motion — most satisfying interaction in the product

```
1. Checkmark icon: scale(0.85) → scale(1.0), 100ms, --ease-sharp
2. Row BG: dims from --color-bg-secondary → --color-bg-elevated, 200ms
3. Weight/reps text: opacity 1.0 → 0.5 (dimmed = logged), 200ms
4. Amber checkmark border: fills clockwise arc, 200ms
5. If it's the final set: amber pulse on exercise complete → dissolve, 400ms
6. Auto-advance to rest timer: 300ms delay then full-screen transition

Haptic feedback (mobile):   Light impact on check, medium on final set
Reduced:                    Instant opacity + color change, no arc animation, no pulse
```

---

### 7. Rest Timer

**Rung:** Micro-motion

```
Circle arc:     SVG `stroke-dashoffset` animates linearly from full → 0 
                over rest duration. Amber → dims to steel as timer progresses.
Number:         Monospace number updates per second — instant swap (no morph)
                `font-variant-numeric: tabular-nums` ensures no layout shift
Final 5s:       Arc color shifts to amber from steel, slight amber glow appears
Timer end:      Short vibration (mobile), then auto-advance to exercise screen
Reduced:        No arc animation. Static number countdown only. No glow.
```

---

### 8. Set Log Input — Weight/Reps Entry

**Rung:** Static + Micro-motion

```
Tap field:      Focus ring (2px amber) appears instantly (0ms)
                Keyboard slides up (OS native — no custom animation)
Value change:   Number morphs instantly (monospace tabular — no animation needed)
Submit (✓):     [See Set Completion pattern above]
```

---

### 9. Session Complete — PR Achievement

**Rung:** Micro-motion

```
PR badge:       Scale(0) → scale(1.0), 400ms, --ease-sharp
PR text:        "NEW PR" fades in, amber color, 300ms delay after badge
Amber line:     1px line sweeps under PR exercise name, left to right, 200ms
Confetti:       NOT used — Apex Precision does not use confetti or particles
                Achievement is communicated through typography and amber emphasis alone
Reduced:        Fade in only (opacity 0 → 1), no scale, no sweep
```

---

### 10. Exercise Anatomy View — 3D Rotation

**Rung:** True 3D/WebGL (lowest appropriate rung still requires WebGL for genuine spatial anatomy)

This is the only true 3D interaction in V1 core UX (identified in Phase 1 as unopposed territory).

```
Default:        Auto-rotate slowly (15°/second), front to 45° view
User drag:      Touch/pointer drag rotates model freely on Y axis
Muscle tap:     Tap highlighted region → label tooltip appears (amber, 200ms fade)
Lighting:       Single directional light (top-right) to emphasize muscle topology
Model detail:   Low-poly anatomical model — accurate musculature, not photo-realistic
Amber muscles:  Primary muscles — emissive amber material (glows softly)
Steel muscles:  Secondary muscles — emissive electric steel blue
Fallback (no WebGL): Static front/back 2D anatomy diagram (SVG). Same muscle highlighting.
Fallback (reduced motion): Static 3D model, no auto-rotation, drag still works.
```

`[DECISION]` The anatomy viewer is the one place where WebGL is explicitly justified. It provides genuine educational value impossible to achieve with 2D diagrams. Fallback is required and fully functional.

---

### 11. Strength Chart — Data Reveal on Load

**Rung:** 2D GSAP / CSS

```
Line:       Draws from left to right, SVG path `stroke-dashoffset` animation
Duration:   600ms
Easing:     --ease-sharp (decelerate at end of line)
Data points: Scale(0) → scale(1) with 20ms stagger per point, after line reaches point
PR star:    Same scale animation + amber glow pulse once, then settle
Reduced:    Static chart — no draw animation, no stagger. Data visible immediately.
```

---

### 12. Progress Numbers — Counting Up

**Rung:** 2D GSAP

Used for the progress overview summary cards (3 sessions this week, 8,450kg volume, etc.)

```
Count:      Number increments from 0 to final value over 800ms
Easing:     Cubic ease-out (fast start, slow finish)
Trigger:    When card enters viewport (Intersection Observer)
Reduced:    Display final number immediately — no counting animation
```

---

### 13. Home Screen — Today's Session Card Entrance

**Rung:** Micro-motion

```
On first load:  Card fades in + translates Y: 16px → 0
Duration:       350ms
Delay:          150ms (after route transition completes)
Easing:         --ease-sharp
Reduced:        Fade in only (no translate)
```

---

### 14. Skeleton Loading → Content Reveal

**Rung:** Micro-motion

```
Shimmer:    CSS gradient animation sweeps left to right across skeleton surfaces
            `background-image: linear-gradient(90deg, transparent, amber-4%, transparent)`
            Duration: 1.5s, infinite loop
Reveal:     Skeleton cross-fades to content, 200ms opacity
Reduced:    Static skeleton (no shimmer), instant reveal on content load
```

---

### 15. Modal / Bottom Sheet Entrance

**Rung:** Micro-motion

```
Mobile (bottom sheet):
    Enter:  translateY(100%) → translateY(0), 300ms, --ease-sharp
    Exit:   translateY(0) → translateY(100%), 200ms, --ease-out
    Backdrop: opacity 0 → 0.7, 250ms

Desktop (modal):
    Enter:  opacity 0 + scale(0.97) → opacity 1 + scale(1.0), 200ms
    Exit:   opacity 1 → 0, 150ms
    Reduced: Opacity only (no translate, no scale)
```

---

## Gestures (Mobile)

| Gesture | Action | Screen |
|---|---|---|
| Swipe right (edge) | Navigate back | All secondary screens |
| Swipe down | Dismiss bottom sheet / modal | Bottom sheets |
| Long press (exercise card) | Quick preview / peek | Exercise Library |
| Swipe left on session exercise | Mark skipped (with undo) | Active Session |
| Pinch on anatomy viewer | Zoom in/out | Exercise Detail |

---

## Haptic Feedback (Mobile Only)

| Event | Haptic Type |
|---|---|
| Set logged (✓) | Light impact |
| Final set complete | Medium impact |
| Rest timer ends | Notification (double tap) |
| PR achieved | Heavy impact + short pause + medium impact |
| Error (invalid input) | Error (sharp buzz) |
| Filter chip toggle | Selection (light) |

All haptics must have an audio/visual fallback. Audio cues are optional (controlled by user preference in Profile settings).

---

## Non-Animation UX Patterns

### Scroll Behavior
- `scroll-behavior: smooth` — but NOT for in-session scrolling (instant scroll to keep rhythm)
- `scroll-snap-type: x mandatory` on horizontal scroll carousels (Quick Workouts, Related Exercises)
- `overscroll-behavior-y: contain` on modals and bottom sheets to prevent body scroll bleed

### Focus Management
- Focus trapped inside modals and bottom sheets
- On modal/sheet close: focus returns to trigger element
- Keyboard navigation: Tab order matches visual reading order

### Loading Strategy
- Images: `loading="lazy"` on all below-fold images
- Fonts: `font-display: swap` — text visible immediately in fallback font
- Critical CSS: inlined — no flash of unstyled content
