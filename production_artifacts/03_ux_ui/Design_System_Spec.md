# PREDYX — Design System Specification

> **Version:** 1.0.0
> **Phase:** 3 — UX Architecture, Flows & Wireframes
> **Date:** 2026-08-17
> **Owner:** @ui
> **Status:** Complete — Implements Apex Precision (DEC-014)

---

## Design System Foundation

This document defines all design tokens, component specifications, and system rules for the PREDYX Apex Precision visual direction. All values here are the specification source of truth for Phase 7 frontend implementation.

---

## Color Tokens

### Base Palette

```css
/* Background Scale */
--color-bg-primary:      hsl(220, 10%, 6%);    /* #0d0f12 — Obsidian */
--color-bg-secondary:    hsl(220, 8%, 11%);    /* #191b1f — Deep Charcoal */
--color-bg-elevated:     hsl(220, 6%, 16%);    /* #242629 — Carbon */
--color-bg-overlay:      hsl(220, 10%, 4%);    /* #090a0d — Modal scrim base */

/* Brand Accents */
--color-amber:           hsl(38, 92%, 54%);    /* #f5a623 — Luminous Amber */
--color-amber-dim:       hsl(38, 72%, 42%);    /* #b87d16 — Amber dim state */
--color-amber-glow:      hsl(38, 92%, 54%, 0.18); /* Ambient glow */

--color-steel:           hsl(200, 80%, 62%);   /* #4db8e8 — Electric Steel Blue */
--color-steel-dim:       hsl(200, 60%, 48%);   /* #317fa8 — Steel dim state */

/* Text Scale */
--color-text-primary:    hsl(0, 0%, 96%);      /* #f5f5f5 — Precision White */
--color-text-secondary:  hsl(220, 8%, 58%);    /* #888d96 — Stone */
--color-text-muted:      hsl(220, 8%, 38%);    /* #585d64 — Dark Stone */
--color-text-disabled:   hsl(220, 6%, 28%);    /* #424549 */

/* Status Colors */
--color-success:         hsl(142, 60%, 48%);   /* #31a857 — PR / achievement green */
--color-error:           hsl(0, 72%, 55%);     /* #e03636 — Error / overtraining */
--color-warning:         hsl(38, 92%, 54%);    /* Same as amber — intentional */

/* Borders */
--color-border-subtle:   hsl(220, 8%, 20%);    /* #2e3138 — Card borders */
--color-border-strong:   hsl(220, 8%, 28%);    /* #3f444d — Input borders */
--color-border-focus:    hsl(38, 92%, 54%);    /* Amber focus ring */
```

### Contrast Validation

| Foreground | Background | Ratio | WCAG Level |
|---|---|---|---|
| `--color-text-primary` on `--color-bg-primary` | White on Obsidian | ~18:1 | ✅ AAA |
| `--color-amber` on `--color-bg-primary` | Amber on Obsidian | ~7.2:1 | ✅ AA Enhanced |
| `--color-steel` on `--color-bg-primary` | Steel on Obsidian | ~5.8:1 | ✅ AA |
| `--color-text-secondary` on `--color-bg-primary` | Stone on Obsidian | ~5.1:1 | ✅ AA |
| `--color-text-muted` on `--color-bg-primary` | Dark Stone on Obsidian | ~3.2:1 | ⚠️ Decorative only — never used for meaningful content |
| `--color-bg-primary` on `--color-amber` | Obsidian text on amber button | ~7.2:1 | ✅ AA Enhanced |

**Rule:** `--color-text-muted` must never carry informational or interactive content. Placeholder and divider use only.

---

## Typography Tokens

### Typeface Selection

**Primary Display & Interface — `font-family-display`**
Preferred: `ABC Diatype`, `Monument Grotesk`, `PP Neue Montreal`
Google Fonts fallback: `Instrument Sans`
Characteristics: Geometric grotesque, uniform stroke weight, ink-trap details at small sizes, available in Variable weight axis

**Telemetry & Data — `font-family-mono`**
Preferred: `ABC Diatype Semi-Mono`, `GT America Mono`
Google Fonts fallback: `JetBrains Mono`
Characteristics: Tabular figures (tnum), equal character width, high legibility at small sizes under motion

```css
--font-display: 'Instrument Sans', 'ABC Diatype', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', 'ABC Diatype Semi-Mono', monospace;
```

### Type Scale (Mobile-First — 375px Base)

```css
/* Display Scale — marketing surfaces */
--text-d1: clamp(48px, 12vw, 96px);   /* Hero headlines */
--text-d2: clamp(36px, 9vw, 72px);    /* Section heroes */

/* Heading Scale — app UI */
--text-h1: clamp(28px, 7vw, 44px);    /* Page titles */
--text-h2: clamp(22px, 5.5vw, 32px);  /* Section headers */
--text-h3: clamp(18px, 4.5vw, 24px);  /* Card titles, subsections */
--text-h4: clamp(15px, 3.8vw, 18px);  /* Small headings */

/* Body Scale */
--text-body-lg: 18px;                  /* Primary instructional copy */
--text-body:    16px;                  /* Standard body / descriptions */
--text-body-sm: 14px;                  /* Supporting / meta copy */

/* Label Scale */
--text-label-lg: 13px;                 /* Navigation labels */
--text-label:    12px;                 /* Category tags, UI labels */
--text-label-sm: 11px;                 /* Metadata */

/* Telemetry Scale (monospaced) */
--text-tele-xl:  48px;   /* Rest timer countdown — hero metric */
--text-tele-lg:  32px;   /* Active rep/set counter */
--text-tele-md:  24px;   /* Progress metrics on session screen */
--text-tele-sm:  16px;   /* Inline data: weight, reps, dates */
--text-tele-xs:  13px;   /* Chart axis labels */
```

### Font Weight Tokens

```css
--font-weight-regular:    400;
--font-weight-medium:     500;
--font-weight-semibold:   600;
--font-weight-bold:       700;
```

### Line Height & Letter Spacing

```css
/* Line Heights */
--leading-tight:   1.1;   /* Display sizes — tight for impact */
--leading-snug:    1.25;  /* Headings */
--leading-normal:  1.5;   /* Body copy */
--leading-relaxed: 1.65;  /* Instructional copy — legibility priority */

/* Letter Spacing */
--tracking-tight:  -0.03em;  /* Display D1, D2 */
--tracking-snug:   -0.01em;  /* H1 */
--tracking-normal:  0em;     /* H2, H3, Body */
--tracking-wide:   +0.06em;  /* Labels — UPPERCASE */
--tracking-wider:  +0.10em;  /* Category tags */
```

---

## Spacing System

Based on a 4px base unit. All spacing values are multiples of 4.

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;    /* Base unit — most common inner padding */
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
```

### Component Padding Conventions

| Component | Padding |
|---|---|
| Card (standard) | `--space-4` all sides (16px) |
| Card (featured / large) | `--space-6` all sides (24px) |
| Button (primary) | `--space-3` vertical, `--space-6` horizontal (12px/24px) |
| Input field | `--space-3` vertical, `--space-4` horizontal |
| Bottom tab bar | `--space-3` top, safe area bottom |
| Screen horizontal margin (mobile) | `--space-4` (16px) |
| Screen horizontal margin (tablet) | `--space-8` (32px) |
| Screen horizontal margin (desktop) | `--space-16` (64px) |

---

## Border Radius

```css
--radius-sm:   4px;   /* Tags, badges, small chips */
--radius-md:   6px;   /* Inputs, buttons */
--radius-lg:   8px;   /* Cards — maximum per Apex Precision direction */
--radius-xl:   8px;   /* Large cards — same as --radius-lg, no rounding beyond this */
--radius-full: 999px; /* Pills — used ONLY for filter chips and rest timer */
```

`[DECISION]` No border radius beyond 8px on structural UI elements. Apex Precision uses sharp, architectural edges.

---

## Elevation & Shadow

```css
/* Apex Precision uses minimal shadow — separation achieved via border */
--shadow-none:   none;
--shadow-card:   0 1px 0 var(--color-border-subtle);          /* Top border only */
--shadow-modal:  0 0 0 1px var(--color-border-subtle),
                 0 24px 64px hsl(220, 10%, 3%, 0.8);          /* Modal elevation */
--shadow-amber:  0 0 40px var(--color-amber-glow);             /* Amber ambient — active states only */
```

`[DECISION]` No box shadows for card depth. Cards are separated by `1px` subtle border, not shadow. This maintains the precision instrument aesthetic.

---

## Surface Texture

```css
/* Noise grain overlay — applied via pseudo-element on bg-primary surfaces */
--texture-noise-opacity: 0.025;  /* 2.5% — subtle grain, non-distracting */
/* Applied as: background-image: url(noise.svg); opacity: var(--texture-noise-opacity) */
```

Implementation note: Noise texture is applied via a fixed-position `::after` pseudo-element on the root body, not repeated per-card. One grain layer, full viewport.

---

## Motion Tokens

```css
/* Durations */
--duration-instant:  80ms;   /* State feedback (checkbox check) */
--duration-fast:    150ms;   /* Button hover, icon swap */
--duration-normal:  250ms;   /* Card expand, tab transition */
--duration-slow:    400ms;   /* Modal enter/exit, page transition */
--duration-xslow:   600ms;   /* Hero animations, feature reveal */

/* Easing — Apex Precision uses sharp deceleration */
--ease-sharp:    cubic-bezier(0.22, 1, 0.36, 1);    /* Standard sharp decelerate */
--ease-snap:     cubic-bezier(0.4, 0, 0.2, 1);      /* Material-style standard */
--ease-linear:   linear;                             /* Timer countdowns only */
--ease-out:      cubic-bezier(0, 0, 0.2, 1);         /* Exit animations */

/* prefers-reduced-motion override */
/* @media (prefers-reduced-motion: reduce) { --duration-*: 0ms or 1ms } */
```

`[DECISION]` No spring or bounce easing in Apex Precision. All easing curves decelerate sharply — like a shutter closing or a dial reaching its stop.

---

## Core Component Specifications

### 1. Button — Primary

```
State:     Default          Hover              Active/Press       Disabled
─────────────────────────────────────────────────────────────────────────
BG:        --color-amber    lighten 8%         darken 8%          --color-bg-elevated
Text:      --color-bg-primary (dark)           same               --color-text-disabled
Border:    none             none               none               none
Radius:    --radius-md (6px)
Height:    52px (mobile), 48px (desktop)
Font:      --font-display / --font-weight-semibold / --text-body / --tracking-wide / uppercase
Padding:   --space-3 / --space-8 (12px / 32px)
Transition: background-color --duration-fast --ease-sharp
Focus:     2px amber outline, 2px offset (keyboard)
```

### 2. Button — Secondary

```
BG:        transparent
Border:    1px solid --color-border-strong
Text:      --color-text-primary
Hover:     BG = --color-bg-elevated, Border = --color-amber
```

### 3. Button — Ghost / Text

```
BG:        transparent
Border:    none
Text:      --color-text-secondary
Hover:     Text = --color-text-primary
Transition: color --duration-fast
```

### 4. Card — Standard

```
BG:        --color-bg-secondary
Border:    1px solid --color-border-subtle (top only, to separate from bg)
Radius:    --radius-lg (8px)
Padding:   --space-4 (16px)
Hover:     BG = --color-bg-elevated, border = --color-border-strong
Transition: background-color --duration-fast --ease-sharp
Min height: 80px
```

### 5. Card — Featured (Program / Workout Hero)

```
BG:        --color-bg-secondary
Border:    1px solid --color-border-subtle
Radius:    --radius-lg (8px)
Padding:   --space-6 (24px)
Image:     16:9 aspect ratio header image, object-fit: cover
Overlay:   gradient from transparent to --color-bg-primary (bottom 40%)
```

### 6. Input Field

```
BG:        --color-bg-elevated
Border:    1px solid --color-border-strong
Radius:    --radius-md (6px)
Height:    52px
Padding:   --space-3 / --space-4 (12px / 16px)
Font:      --font-display / --text-body / --font-weight-regular
Text:      --color-text-primary
Placeholder: --color-text-muted
Focus:     border = --color-amber, no shadow
Error:     border = --color-error
```

### 7. Tag / Filter Chip

```
BG:        --color-bg-elevated (inactive), --color-amber (active)
Text:      --color-text-secondary (inactive), --color-bg-primary (active)
Border:    1px solid --color-border-subtle (inactive)
Radius:    --radius-full (pill)
Height:    36px
Padding:   --space-2 / --space-4 (8px / 16px)
Font:      --font-weight-medium / --text-label-lg / --tracking-wide / uppercase
Min width: 44px (touch target)
```

### 8. Set Log Row (In-Session)

```
Layout:    3 columns: [Weight input] [Reps input] [Complete checkmark]
Height:    56px (satisfies 56–72dp minimum from Phase 1 accessibility research)
BG:        --color-bg-secondary
Border-bottom: 1px solid --color-border-subtle
Input:     Inline number inputs, --font-mono, --color-amber for active
Completed: Row BG dims to --color-bg-elevated, checkmark = amber → steel
Previous:  Small text below inputs in --color-text-muted — "Last: 80kg × 8"
```

### 9. Rest Timer (Full Screen)

```
BG:        --color-bg-primary (full viewport)
Timer:     --text-tele-xl / --font-mono / --color-amber / centered
Countdown: CSS transition on border (arc/circle) in --color-steel
Sub-text:  Next set preview in --text-body / --color-text-secondary
Buttons:   "–30s" / "+30s" ghost buttons, "Skip" text button
Ambient:   Very faint --shadow-amber on timer number only
```

### 10. Progress Chart

```
Grid lines: --color-border-subtle at 40% opacity
Axis labels: --font-mono / --text-tele-xs / --color-text-muted
Data line:  --color-amber / 2px stroke / rounded line-cap
Data points: 6px circles, fill --color-amber, stroke --color-bg-primary
PR marker:  Star icon in --color-amber, tooltip on tap
Area fill:  Amber at 8% opacity below line
```

### 11. Bottom Tab Bar

```
BG:        --color-bg-secondary / blur backdrop (iOS-style frosted)
Border-top: 1px solid --color-border-subtle
Height:    49px + safe area inset
Tab:       Icon (24px) + Label (--text-label / --tracking-wide)
Active:    Icon + label = --color-amber
Inactive:  Icon + label = --color-text-muted
Indicator: 2px top border in amber on active tab (above icon)
Touch:     Min tap target 44px × 44px
```

---

## Grid System

### Mobile (375px — base)

```
Columns:    4
Gutter:     16px (--space-4)
Margin:     16px (--space-4) each side
Column width: (375 - 32 - 48) / 4 = 73.75px
```

### Tablet (768px)

```
Columns:    8
Gutter:     24px (--space-6)
Margin:     32px (--space-8) each side
```

### Desktop (1280px)

```
Columns:    12
Gutter:     32px (--space-8)
Margin:     Auto (max-width container: 1200px centered)
```

---

## Accessibility Tokens

```css
/* Focus Indicators — must be visible on all interactive elements */
--focus-ring:          2px solid var(--color-amber);
--focus-ring-offset:   2px;
--focus-ring-radius:   calc(var(--radius-md) + 2px);

/* Minimum Touch Targets */
--touch-target-min:    44px;    /* WCAG 2.1 AA minimum */
--touch-target-session: 56px;  /* In-session primary actions (Phase 1 requirement) */
--touch-target-hero:   72px;   /* "Start Session" CTA — gloved/sweaty hands */
```

---

## Icon System

- Icon library: **Phosphor Icons** (MIT license, consistent geometric style compatible with Apex Precision)
- Default size: 24px (navigation, cards)
- Small size: 20px (inline, badges)
- Large size: 32px (empty states, feature callouts)
- Weight: Regular (default) / Bold (active/selected states)
- All icons must have `aria-label` or companion visible label text

---

## Loading States

- **Skeleton screens** (not spinners) for content loading — skeleton uses `--color-bg-elevated` with a shimmer animation in amber at 8% opacity
- Shimmer animation: 1.5s linear infinite — `@media (prefers-reduced-motion: reduce) { shimmer: none; background: --color-bg-elevated }` 
- Empty states: Centered icon (Phosphor) + H3 heading + body copy + optional CTA
