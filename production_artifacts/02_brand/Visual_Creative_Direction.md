# PREDYX — Visual Creative Direction

> **Version:** 1.0.0
> **Phase:** 2 — Brand Strategy
> **Date:** 2026-08-17
> **Owner:** @brand
> **Status:** Complete — Awaiting Brand Direction Gate Approval

---

## Inputs Consumed

- Brand Research Report: `@brand` subagent (name analysis, competitor brand identity, typography research)
- Brand Positioning: `production_artifacts/02_brand/Brand_Positioning.md`
- Phase 1 Competitor Visual Analysis: `production_artifacts/01_research/Competitor_Visual_Analysis.md`
- Phase 1 Whitespace Opportunities: `production_artifacts/01_research/Whitespace_Opportunities.md`
- Approved DEC-012: 3D/Parallax Technology Escalation Ladder

---

## Visual Identity Design Principles

Before specifying two creative directions, these principles are non-negotiable across both:

### 1. No Dark-Mode Convergence Trap
`[DECISION]` All six Phase 1 competitors use dark-mode card-based UI. PREDYX must NOT simply reproduce this. Whether the brand direction is dark or light, the visual system must feel categorically different from the existing space.

### 2. Visual Identity IS a Product Feature
`[DECISION]` Per Phase 1 research, no competitor uses visual design as a genuine differentiator. For PREDYX, the visual system is a first-class product differentiator — not a coat of paint applied last.

### 3. Texture and Depth
`[DECISION]` Surfaces must have material quality. No flat, textureless containers. Every UI surface should feel like it's made of something — metal, matte composite, polished carbon, frosted glass.

### 4. Typography as Precision Instrument
`[DECISION]` Based on brand research: reject condensed aggressive gym typography (Bebas Neue, Druk). Select an **engineered Swiss geometric grotesque** paired with a **tabular monospaced system** for data contexts.

### 5. Photography and Human Presence
`[DECISION]` Exercise photography must prioritize form, musculature, and spatial awareness — shot with controlled studio or architectural lighting. Athletic precision over lifestyle aspiration (contrasts with Centr/Lululemon lifestyle approach).

---

## Typography System

### Direction: "Precision Instrument"

`[DECISION]` The PREDYX typographic system uses two type families in two roles:

**Primary Display & Interface Typeface**
Role: Headlines, navigation, section labels, exercise names, program titles
Direction: Engineered geometric grotesque with ink-trap details and uniform stroke weight — architectural and clean
Reference styles: ABC Diatype, Monument Grotesk, PP Neue Montreal
Character: Wide tracking on display sizes — narrow on body. No italic. No condensed variants.

**Telemetry & Data Typeface**
Role: Rep counts, set logs, rest timers, performance metrics, weight values, personal records
Direction: Semi-monospaced or tabular geometric — all characters equal width for stable numerical columns
Reference styles: ABC Diatype Semi-Mono, GT America Mono, Söhne Mono
Character: Pure utility — no display use. Maximum legibility in small sizes.

**Body Copy**
Role: Instruction text, educational content, descriptions, onboarding
Direction: Same family as primary display, at body weight — 16–18px, 1.6 line height
No separate body serif. PREDYX is not a literary brand — clarity over warmth in body type.

### Typography Scale (Mobile-First)
```
Display-1:  72–96px / tight tracking (-0.03em) / weight 700
Display-2:  48–60px / tight tracking (-0.02em) / weight 700
H1:         36–44px / normal tracking (-0.01em) / weight 600
H2:         28–32px / normal tracking (0em) / weight 600
H3:         20–24px / normal tracking (0em) / weight 600
Body-L:     18px / 1.6 leading / weight 400
Body:       16px / 1.5 leading / weight 400
Label:      12–13px / wide tracking (+0.08em) / weight 500 / uppercase
Telemetry:  [tabular mono] 14–40px depending on context
```

---

## Color System Direction

`[DECISION]` Both creative directions below share a foundational constraint:
- Color must serve hierarchy and information — not decoration
- Color contrast minimum: 4.5:1 for body (AA), 7:1 for in-session metrics (WCAG enhanced)
- No color as sole status indicator (colorblind accessibility — Phase 1 requirement)
- No gradient text fills on headlines (Forbidden per design system rules)

---

## Two Creative Direction Concepts

Two distinct visual directions are proposed for Brand Direction Gate approval. One will be selected and refined into the full design system in Phase 3.

---

## Concept 1: "APEX PRECISION"

### Concept Premise
PREDYX as a precision instrument. Dark, architectural, obsidian-and-steel aesthetic. The visual language of a high-precision chronograph, a carbon-fiber racing chassis, a biometric cockpit. Intelligence made material.

This direction **leans into the predator-meets-predict etymology** — but resolves it not as aggression, but as calculated precision and controlled power. Every surface feels engineered.

### Color Palette

| Role | Color | Value | Notes |
|---|---|---|---|
| Background Primary | Obsidian | `hsl(220, 10%, 6%)` | Near-black with a cool blue undertone — not pure black |
| Background Secondary | Deep Charcoal | `hsl(220, 8%, 11%)` | Card surfaces, modals |
| Surface Elevated | Carbon | `hsl(220, 6%, 16%)` | Elevated UI elements |
| Primary Brand | Precision White | `hsl(0, 0%, 96%)` | Primary text, icons, CTAs |
| Accent 1 | Luminous Amber | `hsl(38, 92%, 54%)` | Primary action accent, PR indicators, key metrics |
| Accent 2 | Electric Steel | `hsl(200, 80%, 62%)` | Secondary data, completion states, progress rings |
| Destructive / Warning | Crimson | `hsl(0, 72%, 55%)` | Error, overtraining warnings |
| Text Primary | Pure White | `hsl(0, 0%, 96%)` | |
| Text Secondary | Stone | `hsl(220, 8%, 58%)` | Supporting copy, labels |
| Text Muted | Dark Stone | `hsl(220, 8%, 38%)` | Placeholder, inactive |

**Contrast ratios (estimated):**
- White on Obsidian: ~18:1 ✅
- Amber on Obsidian: ~7.2:1 ✅ (meets enhanced in-session target)
- Steel on Obsidian: ~5.8:1 ✅

### Typography Application
- Display/H1 in Precision White, tight tracking, no letter spacing reduction below H2
- Telemetry data in Luminous Amber for active metrics, Electric Steel for completed/passive
- Labels in Stone, uppercase, wide tracking

### Surface & Texture Language
- Primary surfaces: subtle noise texture overlay (2–3% opacity grain) — prevents flat lifeless backgrounds
- Cards: 1px top border in `hsl(220, 8%, 22%)` — separation without shadow
- Elevated states: very subtle ambient glow in Amber (0.3 opacity, 40px blur) — indicates active/selected
- No rounded corners beyond 8px — sharp, precise, architectural

### Photography Style
- High contrast, controlled directional studio lighting
- Athlete anatomy emphasized — muscle definition is visible information, not vanity
- Dark backgrounds — athletes emerging from shadow into light
- No lifestyle context (kitchen prep, beach running, daylight parks) — pure training

### Motion Character
- Sharp, precise transitions — easing curves that decelerate sharply at the end (like a camera aperture closing)
- No bouncy spring animations — nothing wobbles
- Timer countdowns use monospaced number transitions — no morph, just cut

### Moodboard Description
`[See Moodboard_Direction_1.png]` — Carbon and obsidian, amber metric glow, architectural grid, precision typography, athlete emerging from dramatic side lighting.

---

## Concept 2: "EVOLVED PERFORMANCE"

### Concept Premise
PREDYX as an evolved premium product — confident enough to use light surfaces, spatial depth, and tonal warmth. This direction draws on the visual language of high-end consumer technology (Bang & Olufsen, Teenage Engineering, premium Swiss watchmaking) rather than the dark-mode fitness norm.

This direction **rejects the predator etymology entirely** and positions PREDYX as the next evolution of fitness intelligence — refined, modern, sophisticated. Premium by reduction, not by intensity.

### Color Palette

| Role | Color | Value | Notes |
|---|---|---|---|
| Background Primary | Off-White | `hsl(35, 12%, 95%)` | Warm white — not clinical, slightly mineral |
| Background Secondary | Linen | `hsl(35, 10%, 90%)` | Section dividers, subtle layer distinction |
| Surface Elevated | Chalk | `hsl(35, 8%, 97%)` | Cards, floating panels |
| Background Dark (Accented) | Deep Slate | `hsl(215, 20%, 12%)` | Dark sections — hero, exercise instruction blocks |
| Primary Brand | Almost Black | `hsl(215, 20%, 12%)` | Primary text on light |
| Accent 1 | Kinetic Red | `hsl(4, 82%, 52%)` | Primary CTA, active state, PR indicator |
| Accent 2 | Warm Gold | `hsl(42, 88%, 50%)` | Progress milestones, program completion |
| Accent 3 | Slate Blue | `hsl(210, 35%, 45%)` | Secondary data, rest states, informational |
| Destructive | Deep Crimson | `hsl(0, 68%, 42%)` | Errors, overtraining |
| Text Primary | Deep Slate | `hsl(215, 20%, 12%)` | On light surfaces |
| Text Secondary | Mid Slate | `hsl(215, 12%, 42%)` | Supporting copy |
| Text Muted | Pale Slate | `hsl(215, 8%, 65%)` | Placeholder, inactive |

**Contrast ratios (estimated):**
- Deep Slate on Off-White: ~14:1 ✅
- Kinetic Red on Off-White: ~4.8:1 ✅
- Deep Slate on Kinetic Red: ~6.2:1 ✅

### Typography Application
- Display in Deep Slate on light, Pure White on dark sections
- Wide tracking on display titles for open, confident feeling
- Red accent used sparingly — only CTAs and PR celebrations, not decorative

### Surface & Texture Language
- Primary surfaces: subtle paper/mineral grain texture (1–2% noise) — organic premium quality
- Cards: light drop shadow (`box-shadow: 0 2px 12px hsl(215 20% 12% / 0.08)`) — soft, not heavy
- Dark sections: crisp straight edge between light and dark — no gradient fades
- 12–16px border radius for interactive elements — approachable, not boxy

### Photography Style
- High-quality natural and mixed-source lighting — athlete + clean architectural backgrounds
- Tonal variety: some shots on white seamless, some in dramatic architectural environments
- Form and movement emphasis — not just physique
- Strategic use of motion blur on dynamic photography to communicate kinetics

### Motion Character
- Smooth, confident transitions — easing curves that feel deliberate and assured
- Subtle spring on interactive elements (not bouncy — small amplitude, 0.15s settle time)
- Data state changes use animated number increments — progress feels earned, not instant

### Moodboard Description
`[See Moodboard_Direction_2.png]` — Warm off-white, kinetic red accent, light surfaces with depth, premium consumer product aesthetic, confident modern typography, athlete in architectural environment.

---

## Typography Recommendation Summary

`[DECISION — Proposed]` Regardless of which creative direction is selected:

| System Component | Recommended Direction |
|---|---|
| Primary display typeface | Engineered geometric grotesque — ABC Diatype, Monument Grotesk, or PP Neue Montreal |
| Telemetry typeface | Tabular geometric mono — ABC Diatype Semi-Mono or GT America Mono |
| Web variable fonts | Variable axis for weight and width responsive adaptation |
| Google Fonts fallback | If proprietary fonts cannot be licensed in phase 7, use Instrument Sans + JetBrains Mono as design-equivalent open-source alternatives |

---

## Concept Selection Criteria

The Brand Direction Gate will select one concept based on:
1. Which better communicates "precision, intelligence, elevation" without aggression
2. Which is more differentiated from the existing competitive landscape (all dark-mode)
3. Which is more extensible across both marketing surface and in-app training experience
4. Human aesthetic preference and alignment with overall product vision

`[OPEN]` This is an explicit decision point at the Brand Direction Gate.
