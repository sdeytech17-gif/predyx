# PREDYX — Competitor Visual Analysis

> **Version:** 1.0.0
> **Phase:** 1 — UX Research
> **Date:** 2026-08-17
> **Owner:** @ux
> **Status:** Complete

---

## Purpose

This document isolates the visual and motion language across all six competitors, providing the evidence base for PREDYX brand and design decisions in Phases 2 and 3.

All claims labeled per PREDYX evidence taxonomy:
`[OBSERVED]` | `[INFERRED]` | `[HYPOTHESIS]`

---

## 1. Color Palette Analysis

| Platform | Background | Primary Accent | Secondary Accents | Semantic Use |
|---|---|---|---|---|
| **Peloton** | #181A1D (near-black) | #DF1C2F (Coral Red) `[O]` | Teals, purples (campaign) | Red = CTA, active state |
| **Nike Training Club** | #111111, #000000 `[O]` | Volt/Neon Lime #D3F633 `[O]` | Crimson Red, Cyan | Neon = active/primary action |
| **Apple Fitness+** | #000000 (OLED black) `[O]` | Move Ring: #FA114F (Neon Pink) `[O]` | Volt Green (Exercise), Cyan (Stand) | Activity Ring colors = semantic progress |
| **Whoop** | #000000, #121212 `[O]` | #00E676 (Electric Green) `[O]` | #FFD600 (Amber), #FF1744 (Red), #00B0FF (Cyan) | Strict semantic: Green=ready, Yellow=caution, Red=strained |
| **Freeletics** | #101010, #1E1E1E `[O]` | #007AFF (Cobalt Blue) `[O]` | Neon Volt Yellow, Alert Red | Blue = primary action |
| **Strava** | White + charcoal #1A1A1E `[O]` | #FC4C02 (Strava Orange) `[O]` | Heatmap neons | Orange = brand identity, activity |

### Cross-Competitor Color Patterns
- `[OBSERVED]` Five of six competitors use dark/near-black backgrounds. Strava is the exception (light mode default, dark mode added 2024).
- `[OBSERVED]` All six use one high-energy accent color (red, orange, lime, blue, green) against the dark base.
- `[OBSERVED]` Secondary accents are limited to 2–3 colors maximum per platform.
- `[INFERRED]` Dark mode is the de facto standard for fitness platforms — reduces glare during workouts, communicates premium/technical aesthetic.
- `[HYPOTHESIS]` Bright neon accents against pure black create strong perceived energy without requiring high-saturation photography.

### Implication for PREDYX
- `[HYPOTHESIS]` A dark-base design system is strongly validated by the competitive landscape. The accent color choice is where PREDYX has room to differentiate.
- `[OPEN]` Specific accent hue(s) for PREDYX must be decided in Phase 2 (Brand) — not before.

---

## 2. Typography Analysis

| Platform | Display / Headline | Body / Data | Numeric Style |
|---|---|---|---|
| **Peloton** | Bold geometric sans-serif (Futura/Brandon Grotesque-adjacent) `[O]` | Clean system sans | Monospaced tabular for telemetry |
| **Nike Training Club** | Heavy condensed grotesque (Nike Trade Gothic/Futura Bold), UPPERCASE `[O]` | SF Pro / Roboto (OS defaults) | Standard |
| **Apple Fitness+** | SF Pro / SF Pro Rounded `[O]` | SF Pro Rounded | Monospaced tabular (timers, calories) `[O]` |
| **Whoop** | Custom WHOOP Sans (geometric grotesque) `[O]` | Same with light weights | Tabular monospaced 44–56pt for primary scores |
| **Freeletics** | Bold condensed aggressive sans (display) `[O]` | Clean geometric sans | Oversized bold numerals (visible at 2–3m) |
| **Strava** | Clean geometric sans-serif (Inter-adjacent) `[O]` | Same, lighter weights | High x-height tabular figures |

### Cross-Competitor Typography Patterns
- `[OBSERVED]` All six use sans-serif type systems — no serif type in the fitness premium space.
- `[OBSERVED]` Display/headline type is uniformly bold to ultra-bold. Compressed/condensed faces appear in NTC and Freeletics for aggressive energy.
- `[OBSERVED]` Monospaced/tabular numerals are used by Peloton, Apple, and Whoop — critical for stable real-time metric displays (prevents layout jitter).
- `[INFERRED]` Uppercase and compressed typefaces communicate performance and intensity; rounded typefaces (Apple) communicate inclusivity and approachability.
- `[OBSERVED]` No platform uses decorative, display, or script typefaces in functional UI.

### Implication for PREDYX
- `[HYPOTHESIS]` PREDYX requires a distinctive display typeface that communicates cinematic precision without generic "gym app" aggression. The tension between power/precision and premium restraint is the design opportunity.
- `[OPEN]` Typeface selection must be finalized in Phase 3 (Design System) after Phase 2 creative direction is approved.

---

## 3. Photography & Imagery Style

| Platform | Primary Style | Environment | Subject |
|---|---|---|---|
| **Peloton** | High-production studio, cinematic lighting `[O]` | Dark studio, home settings | Instructor portraits, diverse athletes |
| **Nike Training Club** | Cinematic athletic realism, authentic sweat `[O]` | Concrete, wood, athletic turf | Diverse bodies, elite athletes, real effort |
| **Apple Fitness+** | Warm studio lighting, natural diffusion `[O]` | Warm wood paneling, minimalist black equipment | Named trainers, inclusive representation |
| **Whoop** | Data-first, minimal hero imagery `[O]` | Abstract data visualization | Athletes at rest/in motion, device on wrist |
| **Freeletics** | Gritty, raw, high-contrast `[O]` | Urban parks, asphalt, concrete, moody warehouse | Muscular definition, intense determination |
| **Strava** | User-generated, map-centric `[O]` | Outdoor (roads, trails, mountains) | Real athletes, GPS traces, landscapes |

### Cross-Competitor Imagery Patterns
- `[OBSERVED]` All premium platforms (Peloton, Apple, Nike) use high-production studio photography with controlled lighting, not lifestyle/stock photography.
- `[OBSERVED]` Authentic athletic effort (visible sweat, strain, real exertion) is universal — overly perfect or CGI physiques are absent.
- `[OBSERVED]` Dark or controlled studio environments dominate — no bright white fitness photography.
- `[INFERRED]` The contrast between dark environments and illuminated athletes creates cinematic impact and focuses attention.
- `[OBSERVED]` Freeletics and Peloton use the most dramatically lit, high-contrast imagery — closest to "cinematic" aesthetic.

### Implication for PREDYX
- `[HYPOTHESIS]` PREDYX should target a visual level between Peloton's polished studio aesthetic and Freeletics' raw energy — cinematic precision without sanitized perfection.
- `[OPEN]` Final imagery style direction awaits Phase 2 brand creative direction approval.

---

## 4. Layout & Density Patterns

| Platform | Layout Approach | Density | Card Style |
|---|---|---|---|
| **Peloton** | Streaming-service carousels, modular cards `[O]` | High (many classes visible) | Dark, rounded, thumbnail-led |
| **Nike Training Club** | Category-first browse, clean grid `[O]` | Medium | Clean, minimal, image-forward |
| **Apple Fitness+** | Horizontal scroll carousels, activity filter chips `[O]` | Medium-low | Apple card system, rounded corners |
| **Whoop** | Data dashboard, modular metric cards `[O]` | Medium-high | Rounded containers (12–16px radius) |
| **Freeletics** | Training journey hero, stack-based flow `[O]` | Medium | Bold, oversized buttons and text |
| **Strava** | Social feed (reverse-chronological cards), map exploration `[O]` | High | Activity cards with map thumbnails |

### Cross-Competitor Layout Patterns
- `[OBSERVED]` Rounded card containers (8–16px border-radius) are universal across all six platforms.
- `[OBSERVED]` Horizontal scroll carousels are used by Peloton and Apple Fitness+ for category browsing — reduces vertical scroll length.
- `[INFERRED]` High-density layouts serve large content libraries; lower density serves "next action" clarity.
- `[OBSERVED]` No platform uses grid backgrounds, heavy textures, or decorative overlays in functional UI.

---

## 5. Motion & Animation Language

| Platform | Motion Character | Key Uses | Accessibility |
|---|---|---|---|
| **Peloton** | Smooth, GSAP-adjacent scroll-driven `[O]` | Parallax on hardware spec pages, class card hover lifts, radial gauges, leaderboard animations | Not prominently documented `[I]` |
| **Nike Training Club** | Clean, 60fps transitions `[O]` | Circular SVG countdown bars, badge glimmer, streak confetti | Respects `prefers-reduced-motion` `[O]` |
| **Apple Fitness+** | Signature Apple spring physics `[O]` | Activity Ring sweep animations, number odometers, interval countdown rings, celebration particle effects | System-level `prefers-reduced-motion` via iOS `[O]` |
| **Whoop** | Functional-first, snappy `[O]` | Recovery/strain gauge animations 0→score, spring-based swipe physics, SVG scroll-fill on web | Short durations (<250ms) `[I]` |
| **Freeletics** | High-energy celebration, restrained in-workout `[O]` | Reward particles, XP counters, badge unlocks, Lottie animations | Not prominently documented `[I]` |
| **Strava** | Minimal during recording, data-driven `[O]` | Elevation scrubber sync, kudos tap bounce, 3D terrain flyover | Not prominently documented `[I]` |

### Cross-Competitor Motion Patterns
- `[OBSERVED]` No platform uses heavy parallax or 3D motion in the core product UI — motion is reserved for micro-interactions and data visualization.
- `[OBSERVED]` Celebration animations (particles, badges) at workout completion appear in Nike, Apple, Freeletics — a clear motivational design pattern.
- `[OBSERVED]` Data-driven animation (filling gauges, animated rings, odometer numbers) appears in Peloton, Apple, Whoop — makes abstract data feel alive.
- `[INFERRED]` The constraint on in-workout motion is deliberate — users need cognitive clarity during exercise, not visual distraction.
- `[OBSERVED]` Apple is the only platform with explicit documented `prefers-reduced-motion` implementation. Nike also respects OS-level settings. Others undocumented.

### Implication for PREDYX
- `[HYPOTHESIS]` PREDYX has a significant motion design opportunity — the competitive space uses motion conservatively. A curated, purposeful GSAP-driven motion system would be differentiated without being reckless.
- `[HYPOTHESIS]` The strongest motion opportunities are: (1) scroll-driven storytelling on the marketing/landing page, (2) exercise instruction (spatial movement cues), and (3) completion celebration.
- `[DECISION prerequisite]` Any motion system must have `prefers-reduced-motion` as a first-class behavior before implementation.

---

## 6. 3D & Spatial Design Usage

| Platform | 3D Usage | Technology | Context |
|---|---|---|---|
| **Peloton** | `<model-viewer>` interactive hardware 3D + AR ("View in Your Space") `[O]` | WebXR / Quick Look | Product commerce page only |
| **Nike Training Club** | None `[O]` | — | — |
| **Apple Fitness+** | None in fitness content; Mindfulness on Vision Pro has 3D spatial environments `[O]` | visionOS spatial | Not fitness context |
| **Whoop** | WebGL/Three.js hardware showcase on web `[O]`; 2D vector muscle heatmaps in app `[O]` | WebGL (marketing); SVG vectors (app) | Marketing hero only; app is 2D |
| **Freeletics** | None `[O]` | — | — |
| **Strava** | FATMAP-based 3D terrain maps `[O]`; 3D route flyover video `[O]` | FATMAP engine (mapbox-based) | Maps and route visualization |

### Key Findings
- `[OBSERVED]` **No competitor uses meaningful 3D in exercise instruction, workout content, or performance data visualization.** The competitive 3D space is empty in the product core.
- `[OBSERVED]` 3D usage is isolated to: hardware commerce (Peloton AR), marketing hero showcases (Whoop), and geographic mapping (Strava FATMAP).
- `[OBSERVED]` Whoop demonstrates the important pattern of **converting web 3D concepts (muscle maps) into lightweight 2D SVG vectors in the app** — this preserves the concept while protecting mobile performance.
- `[INFERRED]` The absence of 3D in exercise instruction is likely driven by performance concerns on mobile, not by lack of design desire. This creates a gap for PREDYX to evaluate carefully.
- `[HYPOTHESIS]` Interactive 3D anatomy visualization for exercise education (muscle engagement maps, movement planes) would be genuinely novel in the fitness UX space if executed with mobile-first performance discipline.

### 3D Opportunity Classification (Preliminary — Full Analysis in Phase 4/6)

| Opportunity | Classification | Rationale |
|---|---|---|
| 3D anatomy muscle maps for exercise library | `HIGH VALUE` | Provides genuine instructional value not achievable with 2D; Whoop's 2D version is popular but limited |
| 3D/parallax hero section on landing/marketing page | `MEDIUM VALUE` | Strong cinematic impact, justifies PREDYX premium feel, but performance must be controlled |
| Scroll-driven 2.5D parallax for content sections | `MEDIUM VALUE` | Differentiated from competitors; adds depth without full WebGL cost |
| 3D progress visualization (e.g., 3D milestone models) | `MEDIUM VALUE` | Novel motivational UX; depends on brand direction |
| 3D workout environment ambiance (background) | `LOW VALUE / DECORATIVE` | High performance cost, low instructional value, distracts from workout |
| 3D avatar/character representation | `LOW VALUE` | No evidence users want CGI avatars; real video outperforms |
| WebGL background particle effects | `LOW VALUE / DECORATIVE` | High mobile performance cost, common cliché, no functional value |

---

## 7. Trust & Credibility Signals

| Platform | Primary Trust Mechanism |
|---|---|
| Peloton | Instructor celebrity, 30-day trial guarantee, press endorsements `[O]` |
| Nike Training Club | Global brand authority, elite athlete co-creation, zero paywall `[O]` |
| Apple Fitness+ | Privacy-by-design, HealthKit on-device encryption, transparent cancellation `[O]` |
| Whoop | Peer-reviewed science, elite sports partnerships, data privacy pledges `[O]` |
| Freeletics | Community scale (60M+ athletes), transformation documentaries, app store accolades `[O]` |
| Strava | Network effect (all athlete history in one place), privacy zones, verified athlete badges `[O]` |

### Implication for PREDYX
- `[HYPOTHESIS]` PREDYX will need to build trust from zero — brand authority, instructor/expert credentials, privacy transparency, and early social proof must be planned in Phase 2 and 3.
- `[OPEN]` Trust mechanism strategy is a Phase 2 brand decision.
