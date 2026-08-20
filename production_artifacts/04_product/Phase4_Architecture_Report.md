# PREDYX — Phase 4 Architecture Report

> **Version:** 1.0.0
> **Phase:** 4 — Product Architecture + 3D/Motion Planning
> **Date:** 2026-08-18
> **Owner:** @product + @parallax → @pm
> **Status:** COMPLETE — Submitted for Architecture Gate Approval

---

## Executive Summary

Phase 4 is complete. Five artifacts define the complete technical architecture, data model, API contracts, motion/3D specification, and performance targets for PREDYX V1.

This document is the **Architecture Gate** artifact. Human approval unblocks Phase 5 (Visual Asset Generation), Phase 6 (Final Motion Spec), and eventually Phase 7 (Frontend Implementation).

---

## Phase 4 Artifacts

| # | Artifact | Link | Status |
|---|---|---|---|
| PA-001 | Platform Architecture | `production_artifacts/04_product/Platform_Architecture.md` | ✅ Complete |
| PA-002 | Data Models (Prisma Schema) | `production_artifacts/04_product/Data_Models.md` | ✅ Complete |
| PA-003 | API Contracts | `production_artifacts/04_product/API_Contracts.md` | ✅ Complete |
| PA-004 | Motion & 3D Specification | `production_artifacts/04_product/Motion_3D_Spec.md` | ✅ Complete |
| PA-005 | Performance Targets | `production_artifacts/04_product/Performance_Targets.md` | ✅ Complete |
| PA-006 | Phase 4 Architecture Report (this file) | `production_artifacts/04_product/Phase4_Architecture_Report.md` | ✅ Complete |

---

## Architecture Summary

### Stack

```
Frontend:  Next.js 14 (App Router) + React 18 + TypeScript
Styling:   CSS Modules + CSS Custom Properties (design tokens)
State:     TanStack Query (server) + Zustand (client)
Auth:      NextAuth.js v5
Database:  PostgreSQL via Supabase + Prisma ORM
Video:     Mux (HLS adaptive streaming)
3D:        React Three Fiber + Three.js (anatomy viewer only)
Motion:    GSAP (marketing only) + CSS (app)
Hosting:   Vercel
CDN:       Vercel Edge + Cloudflare (static/3D assets)
Monitoring: Sentry + Vercel Analytics
```

### Rendering by Surface

| Surface | Strategy |
|---|---|
| Landing page | SSG — static, CDN edge cached |
| Exercise / program / workout content | ISR — cached, revalidated hourly |
| Home / session / progress | CSR — user-specific data |

### Data Model: 11 Core Entities

`User` · `UserPreferences` · `Exercise` · `MuscleGroup` · `ExerciseMuscle` · `ExercisePlan` · `Program` + `ProgramWeek` + `ProgramDay` + `SessionPlan` · `Workout` · `Session` · `ExerciseLog` · `SetLog` · `PersonalRecord`

### API: 6 Resource Groups, 16 Endpoints

Auth · User · Programs · Workouts · Exercises · Sessions · Progress

All RESTful, all Zod-validated, all returning consistent error shapes.

---

## Motion & 3D: The Critical Decision

**Only one component uses WebGL in V1 — the Exercise Anatomy Viewer.**

Every other motion surface uses CSS (② micro-motion) or GSAP (③ 2D / ④ 2.5D parallax).

| Motion Surface | Rung | Technology |
|---|---|---|
| Landing hero | ④ | GSAP ScrollTrigger 2.5D parallax |
| Feature reveals | ③ | GSAP ScrollTrigger stagger |
| All app UI | ② | CSS transitions and keyframes |
| Progress charts | ③ | CSS SVG stroke animation |
| **Exercise anatomy viewer** | **⑤** | **React Three Fiber / Three.js** |

**WebGL justification:** The anatomy viewer provides spatial educational value that 2D cannot replicate — it is the primary V1 differentiator identified in Phase 1. All Phase 1 competitors use 2D diagrams or nothing. Three.js is isolated to this one component, lazy-loaded on demand, with a full SVG fallback.

**GSAP is marketing-only** — it is never loaded inside the authenticated app. App motion is 100% CSS.

---

## Performance Targets (Now Binding)

| Metric | Mobile Target | Desktop Target |
|---|---|---|
| LCP | < 2.5s | < 1.8s |
| CLS | < 0.1 | < 0.05 |
| INP | < 200ms | < 100ms |
| Lighthouse Performance | ≥ 85 | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 | ≥ 95 |

These supersede the `[HYPOTHESIS]` status in AGENTS.md §10.

---

## Open Decisions Resolved in Phase 4

| Decision | Resolution |
|---|---|
| D-004 — CMS strategy | Seeded static content for V1 (no CMS) |
| D-005 — Subscription model | TBD — architecture is monetization-agnostic; Supabase RLS supports access control when needed |
| D-007 — 3D technology | React Three Fiber + Three.js — anatomy viewer only |
| D-008 — Hosting | Vercel (frontend) + Supabase (database) |
| D-009 — Analytics | Vercel Analytics (privacy-first, no cookies) |
| D-010 — Backend API | Next.js Route Handlers (co-located API) |
| D-013 — Content strategy | Curated, team-created programs and exercises; seeded at deploy |

---

## What Phase 5 Needs from This Document

@imagegen (Phase 5 — Visual Asset Generation) needs:

1. **Landing page surfaces:** Hero background (obsidian, cinematic athletic), feature section imagery (3 pillars), program showcase covers
2. **App surfaces:** Program cover images (~3–5 programs), workout cover images (~15–20)
3. **Exercise assets:** ~60–80 exercise video thumbnails / poster frames (if pre-generated vs. Mux auto-generated)
4. **3D anatomy models:** GLTF/GLB format, Draco-compressed, ~300–600KB per model — this may be sourced from a 3D library (SketchFab, TurboSquid anatomy models) rather than generated
5. **Specs:** All images must be optimized for `next/image` (WebP/AVIF source), all sizes per `Responsive_Breakpoints.md`

---

## Phase 7 Prerequisites (Complete Before @frontend Begins)

Per AGENTS.md workflow:

| Requirement | Status |
|---|---|
| Phase 3: UX Architecture | ✅ Approved |
| Phase 4: Platform Architecture | 🔄 Awaiting gate |
| Phase 5: Visual Assets | 🔒 Blocked on Phase 4 gate |
| Phase 6: Final Motion Spec | 🔒 Blocked on Phase 5 |

@frontend must not begin implementation until Phase 6 is approved.

---

## ⚠️ Architecture Gate — Required Before Phases 5, 6, and 7

**Phase 5 cannot begin without your explicit approval of this architecture.**

**To proceed:** Reply with: *"Phase 4 approved — proceed to Phase 5."*

**Decisions requiring your input before Phase 5:**

1. **Anatomy model sourcing:** Do you want to source GLTF anatomical models from a 3D asset library (e.g. SketchFab Pro, Anatomy3D) or commission custom models? This determines Phase 5 visual asset scope.

2. **Monetization gate (D-005):** The architecture is monetization-agnostic. Do you want to make any monetization-related decisions now (e.g., paywall on programs, free tier) so Phase 5 assets can include appropriate UI states? Or defer?

3. **Program content:** Phase 5 will need program cover imagery. Do you have a visual direction for program covers — cinematic dark photography vs. abstract precision graphic design?
