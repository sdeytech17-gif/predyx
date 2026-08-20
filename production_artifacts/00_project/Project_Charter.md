# PREDYX — Project Charter

> **Version:** 0.1.0
> **Phase:** 0 — Project Initialization
> **Date:** 2026-08-17
> **Status:** Draft — Pending Phase 1 Approval
> **Owner:** @pm

---

## 1. Working Concept

**PREDYX** is a working name for a premium digital fitness and wellness platform. The visual and experiential direction draws on themes of precision, strength, movement, evolution, and performance — characteristics associated with elite athletic pursuit.

> `[ASSUMPTION]` The "predator-inspired" visual energy is a directional hypothesis. Final brand identity must emerge from brand strategy research in Phase 2 and is subject to human approval before any creative work begins.

---

## 2. Product Vision

PREDYX aims to be a **cinematic, technology-driven fitness platform** that combines:

- Structured training and exercise education
- Personalized fitness experiences
- Performance tracking and progress visualization
- Motivational design that sustains engagement

The platform should feel **premium, purposeful, and differentiated** from generic fitness apps and websites — not through superficial aesthetics, but through meaningful UX and content quality.

> `[ASSUMPTION]` "Cinematic" refers to high-production visual quality and immersive UX — not video-only content delivery. This must be refined in Phase 2.

---

## 3. Intended Audience (Hypothesis — Not Validated)

> **All audience definitions below are hypotheses. No user research has been conducted. These must be tested and refined in Phase 1.**

| Segment | Description | Status |
|---|---|---|
| Committed fitness enthusiasts | People with consistent training habits seeking a premium digital resource | `[HYPOTHESIS]` |
| Performance-focused athletes | Amateur and semi-professional athletes tracking and improving metrics | `[HYPOTHESIS]` |
| Fitness beginners seeking premium guidance | People entering fitness who want structured, expert-level instruction | `[HYPOTHESIS]` |
| Fitness coaches and trainers | Professionals who may use PREDYX for client management or content | `[HYPOTHESIS]` |

The final target audience definition will be produced by `@ux` in Phase 1 and confirmed in Phase 2.

---

## 4. Initial Product Scope

### 4.1 In Scope (Phase 1 Hypothesis)

The following capabilities are proposed for the initial PREDYX product. None have been validated by research.

| Feature Area | Description | Status |
|---|---|---|
| Training content | Structured workout programs, exercise library, guided sessions | `[HYPOTHESIS]` |
| Exercise education | Technique instruction, movement mechanics, form guides | `[HYPOTHESIS]` |
| Performance tracking | Personal records, workout history, progress metrics | `[HYPOTHESIS]` |
| Personalization | Training plan customization based on goals and fitness level | `[HYPOTHESIS]` |
| Motivation systems | Streaks, milestones, achievements, progress visualization | `[HYPOTHESIS]` |
| Responsive web platform | Mobile-first web application, desktop-optimized | `[DECISION]` |

### 4.2 Explicitly Out of Scope (Initial Version)

The following are **explicitly excluded** from Phase 7 implementation unless a formal scope change is approved by the human:

| Item | Reason |
|---|---|
| Native mobile apps (iOS/Android) | Post-launch consideration; web-first strategy assumed |
| Live streaming or real-time video | Infrastructure complexity; deferred |
| Medical diagnosis, treatment, or clinical advice | Safety and regulatory boundary — see Fitness Safety Boundary |
| Wearable hardware integration | Post-launch; dependency on data contracts |
| Ecommerce / subscription billing infrastructure | Post-launch; significant complexity |
| Social features (user-to-user interaction) | Post-launch; moderation complexity |
| AI-generated workout recommendations (ML backend) | Deferred; requires data infrastructure |
| Nutritional tracking or meal planning | Out of scope unless validated by Phase 1 research |

---

## 5. Technology Direction

> `[ASSUMPTION]` Technology stack choices are directional hypotheses. Final decisions will be made in Phase 4 by `@product`.

| Layer | Direction | Status |
|---|---|---|
| Frontend framework | Modern web framework (Next.js or Vite — TBD in Phase 4) | `[OPEN]` |
| Styling | Vanilla CSS or design-token-driven CSS system | `[OPEN]` |
| Animation | GSAP (GreenSock Animation Platform) as primary motion library | `[HYPOTHESIS]` |
| 3D / WebGL | Three.js or similar — optional, evaluated per-feature | `[HYPOTHESIS]` |
| Performance | Core Web Vitals targets defined in Phase 4 | `[OPEN]` |
| Hosting / CDN | To be determined in Phase 4 | `[OPEN]` |
| CMS / Content | To be determined in Phase 4 | `[OPEN]` |
| Backend / API | To be determined in Phase 4 | `[OPEN]` |
| Analytics | Privacy-compliant analytics — provider TBD | `[OPEN]` |

---

## 6. 3D / Parallax as an Optional Experience Layer

- 3D and parallax effects are **considered as an experiential layer**, not a requirement.
- Every proposed 3D element must be evaluated by `@parallax` for:
  - Meaningful UX value vs. decorative use
  - Performance cost on mobile
  - Fallback experience for devices that cannot render WebGL
  - Accessibility impact and `prefers-reduced-motion` compliance
- **`[DECISION]`** 3D will not be assumed for any section — it must be justified per-component.

---

## 7. Mobile-First Requirement

- **`[DECISION]`** All UI design and implementation must begin with the mobile viewport (375px baseline).
- Responsive breakpoints will be formally defined in Phase 3.
- Mobile performance targets are non-negotiable; any 3D/parallax feature that degrades mobile performance must be de-scoped or replaced.

---

## 8. Accessibility Requirement

- **`[DECISION]`** WCAG 2.1 Level AA is the minimum accessibility target.
- Motion and animation must respect `prefers-reduced-motion` media query.
- All interactive elements must be keyboard accessible.
- Color contrast must be validated in Phase 3 before any visual assets are generated.

---

## 9. Performance Requirement

- **`[DECISION]`** The platform must target strong Core Web Vitals scores (specific targets to be set in Phase 4).
- Performance is a first-class product requirement, not a post-launch concern.
- Asset optimization, lazy loading, and critical path analysis are required before Phase 7.

---

## 10. Major Risks

See `Risk_Register.md` for the full risk register. Summary:

| Risk | Severity |
|---|---|
| Unclear product positioning before brand work | High |
| 3D/parallax overuse degrading mobile performance | High |
| AI-generated asset quality inconsistency | Medium |
| Motion sickness risk from animation-heavy design | Medium |
| Scope creep into ecommerce/subscription | Medium |
| Fitness/health-related content liability | Medium |
| Privacy and user data compliance | High |

---

## 11. Approval Gates

| Gate | Phase | Approver |
|---|---|---|
| Brand Direction | End of Phase 2 | Human |
| Architecture | End of Phase 4 | Human |
| Asset Approval | End of Phase 5 | Human |
| Implementation | End of Phase 7 | Human |
| Release | End of Phase 9 | Human |

---

## 12. Unresolved Decisions

| ID | Decision | Owner | Needed By |
|---|---|---|---|
| D-001 | Final target audience segments | @ux (Phase 1) | Phase 2 |
| D-002 | Brand identity and visual direction | @brand (Phase 2) | Phase 3 |
| D-003 | Frontend framework selection | @product (Phase 4) | Phase 7 |
| D-004 | CMS / content strategy | @product (Phase 4) | Phase 7 |
| D-005 | Subscription / monetization model | Human | Phase 4 |
| D-006 | Whether native apps are in scope | Human | Phase 4 |
| D-007 | 3D technology selection | @parallax (Phase 4) | Phase 7 |
| D-008 | Hosting and CDN provider | @product (Phase 4) | Phase 7 |
| D-009 | Analytics provider and privacy model | @product (Phase 4) | Phase 7 |
| D-010 | Backend API strategy | @product (Phase 4) | Phase 7 |

---

*This charter is a living document. Changes must be versioned and logged in Decision_Log.md.*
