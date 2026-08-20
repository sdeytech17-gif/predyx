# PREDYX — Phase 6 Motion / 3D Specification: Complete

> **Version:** 1.0.0
> **Phase:** 6 — Final Motion / 3D Specification
> **Date:** 2026-08-18
> **Owner:** @parallax → @pm
> **Status:** COMPLETE — Submitted for Implementation Gate Approval

---

## Phase 6 Deliverables

| # | Artifact | Purpose | Status |
|---|---|---|---|
| MO-001 | [Final_Motion_Spec.md](file:///c:/Users/CODECLOUDS-SAURAV/Desktop/for%20AI%20Practise/predyx/production_artifacts/06_motion_3d/Final_Motion_Spec.md) | Master reference — motion ladder, surface map, all surfaces + technologies | ✅ Complete |
| MO-002 | [CSS_Motion_Tokens.md](file:///c:/Users/CODECLOUDS-SAURAV/Desktop/for%20AI%20Practise/predyx/production_artifacts/06_motion_3d/CSS_Motion_Tokens.md) | All CSS custom properties, keyframes, component transition rules | ✅ Complete |
| MO-003 | [GSAP_Animation_Spec.md](file:///c:/Users/CODECLOUDS-SAURAV/Desktop/for%20AI%20Practise/predyx/production_artifacts/06_motion_3d/GSAP_Animation_Spec.md) | Complete GSAP implementation code for landing page | ✅ Complete |
| MO-004 | [Anatomy_Viewer_Requirements.md](file:///c:/Users/CODECLOUDS-SAURAV/Desktop/for%20AI%20Practise/predyx/production_artifacts/06_motion_3d/Anatomy_Viewer_Requirements.md) | 3D viewer requirements + Phase 7 candidate evaluation matrix | ✅ Complete |
| MO-005 | Phase 6 Report (this file) | Gate document | ✅ Complete |

---

## What Was Finalized in Phase 6

### 1. Motion Ladder — Confirmed Assignments

The five-rung motion ladder from Phase 4 has been fully assigned to every component in every surface of the product:

| Rung | Technology | Scope |
|---|---|---|
| ① Static | CSS (no transition) | Navigation labels, hero background, program covers |
| ② CSS micro-motion | CSS transitions + keyframes | **All authenticated app** — full implementation in `CSS_Motion_Tokens.md` |
| ③ GSAP 2D | GSAP ScrollTrigger | Landing page: feature reveals, program showcase, scroll progress |
| ④ GSAP 2.5D Parallax | GSAP ScrollTrigger (scrub) | Landing page: hero parallax, education preview |
| ⑤ Three.js / R3F | React Three Fiber | Exercise anatomy viewer — one component, one page |

### 2. CSS Motion System — Finalized

`CSS_Motion_Tokens.md` provides Phase 7 with:
- **4 easing tokens** (`--ease-sharp`, `--ease-in`, `--ease-out`, `--ease-linear`)
- **6 duration tokens** (`--dur-instant` through `--dur-slow` + dynamic rest timer)
- **Universal `prefers-reduced-motion` override block** covering all CSS animations
- **10 named `@keyframes`** with full specifications: `checkFill`, `amberPulse`, `shimmer`, `starBurst`, `pageFadeIn`, `sheetSlideUp`, `sheetSlideDown`, `scrollProgress`, `overlayFadeIn`, `lineDrawIn`
- **Component transition rules** for every interactive element

### 3. GSAP Specification — Implementation Ready

`GSAP_Animation_Spec.md` provides Phase 7 with:
- `GSAPProvider` component code (loads only on marketing routes)
- Hero 2.5D parallax: 4-layer depth system with exact speeds
- Feature pillars stagger reveal: `fromTo` parameters, trigger point, timing
- Program showcase horizontal pin: total width calculation, scrub config
- Education preview: tighter ±60px parallax range
- Scroll progress bar: native `animation-timeline` + GSAP fallback
- All with `prefersReducedMotion` gates

### 4. Anatomy Viewer — Fully Specified

`Anatomy_Viewer_Requirements.md` defines the 3D viewer to implementation-ready precision:
- **20 required muscle groups** with PREDYX naming convention (`muscle_hamstrings`, etc.)
- **Exact Three.js material values**: base color, amber emissive, steel emissive, roughness, metalness
- **Exact lighting rig**: ambient + key directional + optional fill
- **Exact camera config**: FOV, position, orbit target, zoom limits, damping
- **Performance constraints**: ≤500KB GLB, ≤15k triangles, `dpr={[1, 1.5]}`, `frameloop="demand"`
- **TypeScript API contract**: `AnatomyViewerProps` interface with `PREDYX_MUSCLE_IDS`
- **Phase 7 candidate evaluation matrix** for Z-Anatomy vs MakeHuman+procedural

### 5. prefers-reduced-motion — Complete Compliance

Every animated surface has an explicit reduced-motion behavior documented. The CSS global override block handles all CSS automatically. GSAP is gated per-component. R3F `autoRotate` is conditionally disabled.

---

## Decisions Deferred to Phase 7 (Do Not Block Gate)

| Item | Decision Timing |
|---|---|
| Z-Anatomy vs MakeHuman+procedural | Phase 7 kickoff — after evaluating mesh in Blender |
| Headline character-by-character reveal | Phase 7 — if timeline allows |
| Volume chart bar `scaleY` keyframe | Phase 7 — Progress page implementation |

---

## ⚠️ Implementation Gate — Required Before Phase 7

**Phase 7 (Frontend Implementation) is blocked until this gate passes.**

Phase 7 will implement the full PREDYX web application in Next.js + React + TypeScript using all approved artifacts:
- Phase 3: UX Architecture + Wireframes + UI Spec
- Phase 4: Platform Architecture + Data Models + API Contracts
- Phase 5: Visual Assets
- Phase 6: Motion Spec + CSS Tokens + GSAP Spec + Anatomy Viewer Requirements

**To approve and begin Phase 7:** Reply *"Phase 6 approved — proceed to Phase 7."*

**One open question for your direction:**

> When Phase 7 begins, would you like to start with the **marketing landing page** (public-facing, visual impact) or the **authenticated app** (core product experience — programs, session, progress)? Or both simultaneously using two subagents?
