# PREDYX — 3D & Motion Opportunity Assessment

> **Version:** 1.0.0
> **Phase:** 1 — UX Research
> **Date:** 2026-08-17
> **Owner:** @ux
> **Status:** Complete — Research-level assessment. Full specification deferred to Phase 6 (@parallax).

---

## Purpose

Assess where 3D and advanced motion design would provide **genuine product or experiential value** for PREDYX, based on:
1. Gaps in the competitive landscape
2. Observed UX patterns
3. User journey friction and opportunity analysis

Per AGENTS.md rule: "Do not assume that every visual needs true 3D. For every proposed 3D experience, @parallax must evaluate whether CSS, GSAP, layered 2.5D, or true WebGL/Three.js is the appropriate solution."

This document provides the **evidence input** for that evaluation. Technical decisions and implementation specifications are for Phase 6.

**Labels:**
- `[OBSERVED]` — Seen in competitor products
- `[INFERRED]` — Reasonable interpretation of evidence
- `[HYPOTHESIS]` — Untested proposition

---

## Competitive Context: The 3D Gap

### What Competitors Do With 3D

| Platform | 3D Usage | Context | Technology |
|---|---|---|---|
| Peloton | `<model-viewer>` interactive hardware 3D; WebXR AR ("View in Your Space") `[O]` | Commerce page only | WebXR / Quick Look |
| Nike Training Club | None `[O]` | — | — |
| Apple Fitness+ | 3D spatial environments in Mindfulness on Vision Pro `[O]` | Mindfulness only, not fitness | visionOS |
| Whoop | WebGL hardware showcase (marketing) `[O]`; 2D SVG muscle heatmaps (app) `[O]` | Marketing hero + app anatomy | WebGL marketing; SVG app |
| Freeletics | None `[O]` | — | — |
| Strava | FATMAP 3D terrain maps + drone flyover `[O]` | Geographic map context only | FATMAP engine |

### Key Finding
`[OBSERVED]` **No competitor uses 3D or advanced spatial design in the core workout experience — exercise instruction, in-session HUD, progress visualization, or motivational content.** The competitive 3D design space within fitness product UX is genuinely vacant.

`[INFERRED]` This gap exists likely due to performance concerns on mobile, not lack of design intent. Platforms have defaulted to safe solutions (2D SVGs, looping video) that work across all devices.

`[HYPOTHESIS]` If PREDYX implements 3D/spatial elements with performance-first constraints, it can establish meaningful visual differentiation within a crowded dark-mode fitness aesthetic space.

---

## Opportunity Assessment Framework

Each opportunity is evaluated across four dimensions:

| Dimension | Description |
|---|---|
| **User Value** | Does it genuinely help the user accomplish a fitness goal or understand something better? |
| **Competitive Differentiation** | Does it create a perception advantage that competitors don't currently offer? |
| **Performance Risk** | What is the risk of degraded mobile performance, battery drain, or load delay? |
| **Implementation Complexity** | Rough signal of build complexity — not a final engineering estimate. |

### Rating Scale

| Rating | Meaning |
|---|---|
| `HIGH` | Significant benefit / concern |
| `MEDIUM` | Moderate benefit / concern |
| `LOW` | Minor benefit / concern |

---

## Opportunity A: 3D Interactive Anatomy Visualization (Exercise Library)

### Description
Interactive 3D human musculature model that highlights primary and secondary muscles activated by each exercise. User can rotate, inspect from multiple angles, and see muscle activation layers.

### Evidence Basis
- `[OBSERVED]` Whoop Strength Trainer uses 2D SVG front/back body heatmaps — well-received pattern but limited by flat representation.
- `[OBSERVED]` Nike Training Club highlights target muscles per exercise as static silhouette graphics.
- `[HYPOTHESIS]` 3D anatomy rotation (even limited 90°–180° arc) would provide instructional clarity that 2D cannot — particularly for posterior chain muscles (lats, rhomboids, rear delts) that are invisible in front-facing 2D maps.

### Evaluation

| Dimension | Rating | Notes |
|---|---|---|
| **User Value** | `HIGH` | Genuine instructional benefit — especially for beginners and intermediate users learning muscle-targeted training |
| **Competitive Differentiation** | `HIGH` | No competitor offers this in a consumer fitness platform |
| **Performance Risk** | `MEDIUM` | 3D anatomy model is static mesh (low poly), not a real-time physics simulation — performance is manageable with progressive loading |
| **Implementation Complexity** | `MEDIUM` | Requires 3D anatomical mesh asset, texture work, React Three Fiber or similar WebGL renderer — achievable with focused engineering |

### `[HYPOTHESIS]` Recommended Approach
- Mobile: Lightweight 2D SVG multi-layer animated heatmap (front + back toggle). WebGL is too heavy for list-level mobile rendering.
- Tablet / Desktop: Full Three.js / React Three Fiber 3D anatomical rotation.
- Progressive enhancement: 2D is the base; 3D loads as enhancement if WebGL is supported and performance budget permits.

### @parallax Evaluation Required
Full evaluation of mesh complexity, loading strategy, texture approach, and mobile fallback — Phase 6 responsibility.

---

## Opportunity B: Scroll-Driven Cinematic Marketing / Landing Page

### Description
The PREDYX marketing site (homepage) uses GSAP ScrollTrigger-driven parallax and scroll-triggered reveals to create a cinematic storytelling experience as users scroll through the brand narrative.

### Evidence Basis
- `[OBSERVED]` Peloton uses scroll-driven micro-interactions and hardware spec parallax — basic GSAP-level animations.
- `[OBSERVED]` Whoop uses scroll-triggered interactive narrative sections — the product's value is "revealed" through scrolling.
- `[INFERRED]` Premium fitness brands universally use scroll-driven reveals, but none achieve a truly cinematic quality — they are all functional, not artful.
- `[HYPOTHESIS]` PREDYX has an opportunity to set a new visual standard in fitness platform marketing sites through genuine cinematic scroll direction.

### Evaluation

| Dimension | Rating | Notes |
|---|---|---|
| **User Value** | `MEDIUM` | Marketing page value is brand perception, not functional fitness utility |
| **Competitive Differentiation** | `HIGH` | No current competitor achieves genuinely cinematic scroll storytelling |
| **Performance Risk** | `MEDIUM` | Scroll-driven animation is CSS/GSAP, not WebGL — performance is acceptable with lazy loading; must respect `prefers-reduced-motion` |
| **Implementation Complexity** | `MEDIUM` | GSAP ScrollTrigger well-understood by frontend engineers; design requires strong creative direction |

### `[HYPOTHESIS]` Recommended Approach
- GSAP ScrollTrigger for scroll-driven reveals, pin sections, and parallax depth.
- 2.5D layered parallax (stacked PNG layers with different scroll speeds) rather than true 3D — provides dimensional depth without WebGL.
- `prefers-reduced-motion` fallback: static sections with fade-in only.

### @parallax Evaluation Required
Motion choreography, easing curves, parallax depth layers, pin section design — Phase 6 responsibility.

---

## Opportunity C: 3D / Spatial Hero Section (Marketing Page)

### Description
The marketing page hero section contains a 3D element — potentially a spatial representation of the PREDYX product aesthetic, a dynamic 3D typographic logo treatment, or an abstract motion sculpture.

### Evidence Basis
- `[OBSERVED]` Whoop uses high-fidelity 3D hardware showcases on their hero — WebGL-rendered device on dark background.
- `[INFERRED]` Fitness brands that successfully use 3D hero elements (Whoop, Eight Sleep) have a hardware product as the 3D object. PREDYX is software-first — a 3D "logo object" or abstract motion sculpture risks looking decorative without grounding.
- `[HYPOTHESIS]` A 3D element in the PREDYX hero that has **semantic meaning** (e.g., a 3D representation of training performance data, or a spatial anatomy visualization) would be justified. A decorative 3D abstract is not.

### Evaluation

| Dimension | Rating | Notes |
|---|---|---|
| **User Value** | `LOW` | At hero level, this is brand impression, not functional value |
| **Competitive Differentiation** | `MEDIUM` | Differentiated only if the 3D element communicates PREDYX's purpose — not purely decorative |
| **Performance Risk** | `HIGH` | WebGL hero on first load creates LCP risk. Must be lazy-loaded or replaced with a static hero on mobile. |
| **Implementation Complexity** | `HIGH` | Requires 3D asset creation, WebGL rendering pipeline, mobile fallback design, and LCP management |

### `[HYPOTHESIS]` Recommended Approach (Preliminary)
- Consider GSAP-animated 2.5D layered hero first. Achieve depth through parallax layers, not WebGL.
- If true 3D hero is pursued in Phase 3+ design: require a mobile static fallback, lazy loading, and LCP < 2.5s compliance.
- Decision on whether hero 3D is meaningful vs. decorative — dependent on Phase 2 brand creative direction.

### @parallax Evaluation Required
Full performance audit of 3D hero vs. 2.5D alternative — Phase 6 responsibility after Phase 2 brand direction.

---

## Opportunity D: In-Session Muscle Activation Animation (During Workout)

### Description
During an active workout session, a background or overlay element shows a human silhouette with muscles highlighted in real time as the user completes reps — a "live muscle engagement" visualization.

### Evidence Basis
- `[OBSERVED]` Whoop shows muscle heatmaps post-workout (not in real time during reps).
- `[HYPOTHESIS]` Real-time muscle activation animation during a set would be visually engaging — but cognitive load during exercise is already high.
- `[INFERRED]` Adding animated visual complexity to the in-session screen competes with the primary UI task (rep count, timer, next exercise) and likely increases cognitive distraction, not useful information.

### Evaluation

| Dimension | Rating | Notes |
|---|---|---|
| **User Value** | `LOW` | During a set, users cannot divide attention between workout and anatomy visualization |
| **Competitive Differentiation** | `MEDIUM` | Novel — but novelty ≠ value |
| **Performance Risk** | `MEDIUM` | Continuous animation during active session drains battery |
| **Implementation Complexity** | `HIGH` | Real-time animation synchronized to rep count requires rep detection (computer vision or manual input) |

### Assessment
`[HYPOTHESIS]` Real-time in-session muscle animation is likely high-cost and low-value. Pre-exercise anatomy visualization (before the set starts) and post-workout summary (after session ends) are higher value at lower cost.

**Not recommended for v1.** Revisit if biometric/CV features are added in later phases.

---

## Opportunity E: 3D Progress Visualization (Post-Workout / Profile)

### Description
Progress data is visualized with 3D or spatially-aware chart types — e.g., a 3D timeline of strength gains, a volumetric progress sphere, or a spatial "achievement trophy" displayed as a 3D object.

### Evidence Basis
- `[OBSERVED]` Strava's challenge finisher badges are described as "3D digital finisher badges" — but these are likely rendered 3D-style 2D graphics, not WebGL.
- `[OBSERVED]` Freeletics uses XP counters and badge unlock animations (Lottie).
- `[HYPOTHESIS]` A 3D rotatable trophy or milestone badge displayed at completion could be a high-quality motivational moment — similar to how game reward systems use 3D models for rare drops.

### Evaluation

| Dimension | Rating | Notes |
|---|---|---|
| **User Value** | `MEDIUM` | 3D badge is motivational, not functional — but motivational design is a core product requirement |
| **Competitive Differentiation** | `MEDIUM` | Novel in fitness; common in gaming |
| **Performance Risk** | `LOW` | Only rendered at completion moment, not continuously — brief WebGL/Lottie moment is acceptable |
| **Implementation Complexity** | `MEDIUM` | Requires 3D badge asset + simple Three.js render or Lottie animation at trigger point |

### `[HYPOTHESIS]` Recommended Approach
- Reserve for major milestone moments only (not every session completion).
- Use Lottie for lighter animations; consider Three.js for major achievements (e.g., 100-session milestone).
- Not a v1 priority — Phase 4+ feature.

---

## Opportunity F: 2.5D Exercise Instruction Video (Layered Motion)

### Description
Exercise instruction uses layered 2.5D video — a person performing the exercise with an animated overlay layer showing movement arc, range of motion, and joint angles.

### Evidence Basis
- `[OBSERVED]` No competitor does this. All instruction is either pure video or pure 2D graphic.
- `[HYPOTHESIS]` An instructional layer overlaid on a looping video (showing movement arc, target ROM, or common error comparison) would provide genuinely higher instructional density than either format alone.

### Evaluation

| Dimension | Rating | Notes |
|---|---|---|
| **User Value** | `HIGH` | Instructional annotation on video is educationally proven (used in physiotherapy, coaching analysis) |
| **Competitive Differentiation** | `HIGH` | No competitor offers annotated instructional video in a consumer fitness app |
| **Performance Risk** | `LOW` | CSS/SVG animation overlay on HTML5 video is lightweight |
| **Implementation Complexity** | `MEDIUM-HIGH` | Requires per-exercise annotation asset creation — high content production cost |

### `[HYPOTHESIS]` Recommended Approach
- Viable for key exercise library content (e.g., primary compound movements).
- Motion annotation as SVG overlay on looping video — no WebGL required.
- Phase 7+ feature — not v1 scope unless content production budget is specifically allocated.

---

## Summary Recommendation Table

| Opportunity | User Value | Differentiation | Performance Risk | Implementation | Phase Recommended |
|---|---|---|---|---|---|
| **A — 3D Anatomy Visualization** | HIGH | HIGH | MEDIUM | MEDIUM | Phase 5 (Assets) + Phase 6 (Motion Spec) |
| **B — Scroll-Driven Marketing Page** | MEDIUM | HIGH | MEDIUM | MEDIUM | Phase 7 (Implementation) — after Phase 2 brand |
| **C — 3D/Spatial Marketing Hero** | LOW | MEDIUM | HIGH | HIGH | Optional, post Phase 2 creative direction decision |
| **D — Real-Time In-Session Muscle Animation** | LOW | MEDIUM | MEDIUM | HIGH | Not recommended for v1 |
| **E — 3D Progress Trophies/Badges** | MEDIUM | MEDIUM | LOW | MEDIUM | Phase 4+ feature |
| **F — Annotated 2.5D Video Instruction** | HIGH | HIGH | LOW | MEDIUM-HIGH | Phase 7+ after content production planning |

---

## Performance Baseline Requirements (All 3D / Motion Elements)

These are research-level requirements. Phase 6 must validate all targets.

- `[HYPOTHESIS]` All motion and 3D elements must load within the LCP target of < 2.5s.
- `[HYPOTHESIS]` Mobile 3D (WebGL) must have a 2D SVG or static fallback for devices below a defined WebGL performance threshold.
- `[HYPOTHESIS]` All animation must respect `prefers-reduced-motion` — reduce to immediate cuts or static states.
- `[HYPOTHESIS]` Battery-intensive continuous animations (particle loops, real-time WebGL) must be opt-in, not default.
- `[HYPOTHESIS]` Core fitness functionality (workout execution, timer, rep tracking) must be fully functional with JavaScript/CSS animation entirely disabled.

---

## Open Questions for Phase 6 (@parallax)

| Question | Priority |
|---|---|
| Is 3D anatomy viable on mobile with Three.js/R3F or does it require progressive WebGL loading? | High |
| What is the exact scroll library strategy for marketing page (GSAP vs. CSS Scroll-Driven)? | High |
| Can 2.5D layered parallax achieve the target cinematic depth without WebGL on marketing page? | High |
| What is the target FPS floor for motion elements on mid-range Android devices? | High |
| How should motion system behave in iOS Low Power Mode? | Medium |
| What is the minimum device tier that will receive full WebGL experience vs. 2D fallback? | Medium |
