# PREDYX — Responsive Breakpoints & Layout Specification

> **Version:** 1.0.0
> **Phase:** 3 — UX Architecture, Flows & Wireframes
> **Date:** 2026-08-17
> **Owner:** @ui
> **Status:** Complete

---

## Mobile-First Principle

Per DEC-002 (AGENTS.md §8): All UI specifications begin at the 375px mobile viewport. Desktop is an enhancement. Every layout decision starts mobile and scales up — never the reverse.

---

## Breakpoint System

```
xs:   375px   — Mobile S (iPhone SE, older Android)
sm:   390px   — Mobile M (iPhone 14/15, Pixel 7)
md:   768px   — Tablet (iPad Mini, iPad Air portrait)
lg:  1024px   — Tablet landscape / Small desktop
xl:  1280px   — Desktop standard
2xl: 1536px   — Desktop wide
```

**Implementation:** Use CSS custom properties and `@media (min-width)` — mobile-first media query strategy.

```css
/* Breakpoint tokens */
--bp-xs:   375px;
--bp-sm:   390px;
--bp-md:   768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
--bp-2xl: 1536px;
```

---

## Layout Grid by Breakpoint

| Breakpoint | Columns | Gutter | Margin | Max Content Width |
|---|---|---|---|---|
| xs (375px) | 4 | 16px | 16px | 343px |
| sm (390px) | 4 | 16px | 16px | 358px |
| md (768px) | 8 | 24px | 32px | 672px |
| lg (1024px) | 12 | 24px | 48px | 880px |
| xl (1280px) | 12 | 32px | auto | 1200px (max-width container) |
| 2xl (1536px) | 12 | 32px | auto | 1200px (same max-width) |

---

## Component Behavior by Breakpoint

### Navigation

| Breakpoint | Navigation Pattern |
|---|---|
| xs – sm (< 768px) | **Bottom Tab Bar** — 5 tabs, fixed bottom, safe area inset |
| md (768px) | **Bottom Tab Bar** — wider hit areas (96px per tab) |
| lg – 2xl (≥ 1024px) | **Left Sidebar** — collapsible, 72px icon-only (collapsed) / 240px with labels (expanded), top-aligned |

### Content Grid Layouts

**Home Screen**

| Breakpoint | Layout |
|---|---|
| xs – sm | Single column — today's session card full width, quick workouts horizontal scroll |
| md | 2-column — today's session spans 5/8 cols, program progress spans 3/8 cols |
| lg+ | 3-column — today's session (7/12), aside panel for program stats (5/12) |

**Programs Browse Grid**

| Breakpoint | Layout |
|---|---|
| xs – sm | 1 column — full-width program cards, stacked |
| md | 2 columns |
| lg | 3 columns |
| xl+ | 4 columns (max) |

**Discover / Workout Browse Grid**

| Breakpoint | Layout |
|---|---|
| xs – sm | 1 column full-width cards |
| md | 2 columns |
| lg | 3 columns |
| xl+ | 3 columns (max — readability) |

**Exercise Library**

| Breakpoint | Layout |
|---|---|
| xs – sm | List view (1 column) — compact row cards |
| md | 2 columns — card grid |
| lg+ | 3 columns — card grid |

**Exercise Detail**

| Breakpoint | Layout |
|---|---|
| xs – sm | Single column — anatomy view full width, video below, cues below |
| md | 2-column — anatomy + video side-by-side (top), cues full width below |
| lg+ | 2-column — 60% content / 40% anatomy viewer (sticky scroll) |

**Active Session / Exercise Screen**

| Breakpoint | Layout |
|---|---|
| xs – sm | Single column — video top, set log below, no split |
| md | 2-column — video left (50%), set log right (50%) |
| lg+ | 2-column — video left (55%), set log + exercise details right (45%) |

`[DECISION]` Active session layout on desktop is intentionally different — the 2-column split allows viewing instruction alongside logging, which is the primary desktop use case (gym with tablet/laptop nearby).

**Progress Charts**

| Breakpoint | Layout |
|---|---|
| xs – sm | Single column — stats row (3 horizontal cards), chart full width below |
| md | 2-column — PRs panel left, chart right |
| lg+ | 2-column — stats + PRs left (40%), charts right (60%) |

---

## Typography Responsive Scaling

Using CSS `clamp()` for fluid scaling between breakpoints:

```css
--text-d1: clamp(48px, 12vw, 96px);   /* 48px @ 375px → 96px @ 800px+ */
--text-d2: clamp(36px, 9vw, 72px);
--text-h1: clamp(28px, 7vw, 44px);    /* 28px @ 375px → 44px @ 630px+ */
--text-h2: clamp(22px, 5.5vw, 32px);
--text-h3: clamp(18px, 4.5vw, 24px);
```

Body copy does NOT fluid-scale — fixed at 16px across all breakpoints (legibility priority).

---

## Spacing Responsive Scaling

Screen margins and section gaps scale with breakpoints:

```css
/* Horizontal screen margin */
--margin-screen: 16px;                            /* xs – sm */
@media (min-width: 768px)  { --margin-screen: 32px; }   /* md */
@media (min-width: 1024px) { --margin-screen: 48px; }   /* lg */

/* Section vertical gap */
--gap-section: 32px;                              /* xs – sm */
@media (min-width: 768px)  { --gap-section: 48px; }
@media (min-width: 1024px) { --gap-section: 64px; }
```

---

## Touch Target Requirements

| Context | Minimum Size | Source |
|---|---|---|
| All interactive elements | 44 × 44px | WCAG 2.1 AA |
| Primary in-session actions (Start, Complete Set, Next Exercise) | 56 × 56px | Phase 1 Accessibility Research |
| "Start Session" hero CTA | 72px height | Phase 1 — gloved/sweaty hands |
| Bottom tab bar items | 44px × 49px (full height) | Platform standard |
| Filter chips | 36px height, 44px+ width | Minimum touch area |

---

## Safe Area Insets

All fixed bottom elements (bottom tab bar, sticky CTAs) must respect iOS safe area:

```css
/* Sticky footer / tab bar */
padding-bottom: env(safe-area-inset-bottom);
padding-bottom: max(16px, env(safe-area-inset-bottom));
```

---

## Landscape Mobile

Landscape orientation on mobile (xs – sm rotated) must not break the active session screen. Key rules:
- Video aspect ratio maintained (16:9 max height) — do not force full-height video in landscape
- Set log rows must remain accessible without scrolling past 2 rows
- Rest timer: landscape shows timer centered in full viewport — no layout rearrangement needed

---

## Performance Targets by Breakpoint

| Metric | Mobile (xs) | Tablet (md) | Desktop (lg+) |
|---|---|---|---|
| LCP target | < 2.5s | < 2.0s | < 1.8s |
| Image format | WebP + AVIF fallback | WebP + AVIF | WebP + AVIF |
| Video autoplay | Muted only, `playsinline` | Muted only | Muted only |
| 3D anatomy view | Simplified static diagram fallback if no WebGL | Full interactive | Full interactive |

`[HYPOTHESIS]` These targets will be formally validated and measured in Phase 8 QA.
