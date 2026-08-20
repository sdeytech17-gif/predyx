# PREDYX — Decision Log

> **Version:** 0.1.0
> **Phase:** 0 — Project Initialization
> **Date:** 2026-08-17
> **Owner:** @pm

---

## How to Use This Log

Every significant decision made during this project must be recorded here. This includes:

- Technology selections
- Scope changes
- Design direction choices
- Architecture choices
- Approval gate outcomes
- Risk disposition changes

**Decision format:**

```
### DEC-XXX — [Decision Title]
| Field | Value |
| Date | YYYY-MM-DD |
| Phase | Phase number |
| Owner | Agent or Human |
| Status | DECIDED / OPEN / DEFERRED / SUPERSEDED |
| Alternatives Considered | [list] |
| Rationale | [explanation] |
| Impact | [what this decision affects] |
```

---

## Decisions

---

### DEC-001 — Artifact-First Development Model

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 0 |
| **Owner** | @pm (Human instruction) |
| **Status** | `DECIDED` |

**Decision:** PREDYX will be built using a staged, artifact-first, multi-agent development model. No code is written before specifications are approved. Each phase produces explicit artifacts consumed by downstream phases.

**Alternatives Considered:**
- Single-agent full-stack generation (rejected: insufficient quality control, no approval gates)
- Rapid prototype then refine (rejected: risks building on unvalidated assumptions)

**Rationale:** Complex premium product requires validated research, brand strategy, and design before implementation. Prevents expensive rework caused by building on unvalidated assumptions.

**Impact:** All phases, all agents.

---

### DEC-002 — Mobile-First Requirement

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 0 |
| **Owner** | @pm (Human instruction) |
| **Status** | `DECIDED` |

**Decision:** All UI design and implementation must begin with the 375px mobile viewport. Desktop is an enhancement, not the baseline.

**Alternatives Considered:**
- Desktop-first (rejected: fitness content is primarily consumed on mobile)
- Simultaneous design (rejected: forces trade-offs that mobile-first discipline avoids)

**Rationale:** Fitness and wellness platforms are predominantly accessed via mobile. Mobile-first ensures the primary use case is never degraded by desktop-first design drift.

**Impact:** Phase 3 (UX Architecture), Phase 4 (Architecture), Phase 7 (Frontend), Phase 8 (QA).

---

### DEC-003 — WCAG 2.1 Level AA Accessibility Target

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 0 |
| **Owner** | @pm (Human instruction) |
| **Status** | `DECIDED` |

**Decision:** WCAG 2.1 Level AA is the minimum accessibility compliance target for PREDYX.

**Alternatives Considered:**
- WCAG 2.0 AA (rejected: outdated; 2.1 adds important mobile and cognitive criteria)
- WCAG 2.1 AAA (deferred: aspirational; some criteria may not be achievable for all content types)

**Rationale:** Industry standard for accessible web products. Required for broad user inclusion and legal compliance in many jurisdictions.

**Impact:** Phase 3 (Design System), Phase 7 (Frontend), Phase 8 (QA).

---

### DEC-004 — prefers-reduced-motion as First-Class Requirement

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 0 |
| **Owner** | @pm (Human instruction) |
| **Status** | `DECIDED` |

**Decision:** All motion and animation systems must implement and respect the `prefers-reduced-motion` CSS media query. Reduced-motion must be a complete, quality alternative experience.

**Alternatives Considered:**
- Opt-in reduced-motion toggle (deferred: may be added as enhancement in Phase 7)
- CSS-only reduced motion (insufficient: GSAP and WebGL also need to respond)

**Rationale:** Vestibular sensitivity and motion sickness are real user health concerns, especially for a fitness audience. Legal accessibility obligation under WCAG 2.1.

**Impact:** Phase 4 (Motion Planning), Phase 6 (Motion Spec), Phase 7 (Frontend), Phase 8 (QA).

---

### DEC-005 — 3D Must Be Justified Per Component

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 0 |
| **Owner** | @pm (Human instruction) |
| **Status** | `DECIDED` |

**Decision:** No component will use true 3D/WebGL by default. For every proposed 3D element, `@parallax` must explicitly evaluate CSS, GSAP, 2.5D, or WebGL and select the minimum viable technology that achieves the experience goal.

**Alternatives Considered:**
- Full 3D-first approach (rejected: performance risk on mobile, accessibility risk)
- No 3D at all (deferred: may be appropriate, but should be a research-informed decision)

**Rationale:** Prevents performance degradation and over-engineering. Ensures 3D is used meaningfully, not decoratively.

**Impact:** Phase 4, Phase 6, Phase 7.

---

### DEC-006 — Ecommerce and Subscription Out of Scope for v1

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 0 |
| **Owner** | @pm (Human instruction) |
| **Status** | `DECIDED` |

**Decision:** Ecommerce, subscription billing, and payment processing are explicitly out of scope for the initial PREDYX v1 implementation.

**Alternatives Considered:**
- Include basic subscription (rejected: significant backend complexity; deferred to post-launch)

**Rationale:** Scope management. Subscription infrastructure requires significant backend, legal, and UX investment that would delay the core product launch.

**Impact:** Phase 4, Phase 7. Architecture must accommodate future addition without a rewrite.

---

### DEC-007 — Fitness Safety Boundary

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 0 |
| **Owner** | @pm (Human instruction) |
| **Status** | `DECIDED` |

**Decision:** PREDYX is a fitness and wellness product. It must not be positioned as a medical diagnosis or treatment system. No medical claims may be invented or implied. Any health-adjacent feature must be reviewed before specification.

**Alternatives Considered:**
- Health/medical features (deferred: requires regulatory and legal review)

**Rationale:** Protects users from harm and protects the project from legal liability.

**Impact:** Phase 2 (Brand), Phase 3 (UX), Phase 7 (Frontend content).

---

## Phase 1 Gate Log

### GATE-001 — Phase 1 Research Completion

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 1 → 2 Transition |
| **Gate Type** | Informational |
| **Status** | `APPROVED` — Human approved 2026-08-17T17:19 IST |

**Phase 1 Deliverables Produced:**
1. Research Framework (competitors scoped, methodology defined)
2. Competitor Matrix (6 platforms across 8 UX dimensions)
3. Competitor UX Analysis (deep-dive per platform)
4. Competitor Visual Analysis (color, type, photography, motion, 3D)
5. Fitness UX Patterns (9 pattern categories, 40+ specific patterns)
6. User Journey Hypotheses (4 journeys, 10 stages)
7. 3D & Motion Opportunity Assessment (6 opportunities evaluated)
8. Accessibility Research (WCAG 2.1 AA framework + fitness-specific requirements)
9. Whitespace & Opportunities (6 genuine market gaps identified)
10. Research Synthesis (8 research questions answered)

---

## Phase 2 Product Direction — Approved Decisions

All decisions below were explicitly approved by the human at Phase 1→2 gate (2026-08-17T17:19 IST). These are binding constraints for Phase 2 and all downstream phases.

### DEC-008 — Target Audience

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** Primary audience: committed fitness enthusiasts. Secondary: performance-oriented users. PREDYX must NOT be positioned exclusively for elite or professional athletes.

**Impact:** Phase 2 (Brand positioning, persona definition), Phase 3 (UX flows), Phase 7 (Content tone).

---

### DEC-009 — Content Model

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** Hybrid content model:
- 3D/animated instruction for exercise mechanics, movement visualization, anatomy and spatial understanding (where genuinely useful)
- Video instruction for real human demonstration and coaching
- Conventional UI and motion for progress, navigation, and motivation

**Impact:** Phase 3 (UX), Phase 4 (Architecture — content delivery), Phase 5 (Asset requirements), Phase 6 (Motion spec), Phase 7 (Implementation).

---

### DEC-010 — Monetization

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DEFERRED` — Architecture must remain compatible with future subscription/premium features |

**Decision:** Monetization model remains TBD through Phase 2. Product architecture must accommodate future subscription or premium programs without requiring a rebuild.

**Impact:** Phase 4 (Architecture must not lock to a specific revenue model).

---

### DEC-011 — Wearable Integration

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** Apple Watch / WHOOP / wearable integration is POST-LAUNCH. Wearable connectivity is NOT a V1 dependency. V1 must function fully without any wearable.

**Impact:** Phase 4 (Architecture — no wearable API dependency in V1 data model).

---

### DEC-012 — 3D / Parallax Technology Principle

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** PREDYX should have a premium, immersive spatial visual identity. Use the simplest appropriate technology per element:

**Escalation ladder (use lowest rung that achieves the goal):**
`Static → Micro-motion → 2D GSAP → 2.5D Parallax → True 3D/WebGL`

True 3D/WebGL only where it provides meaningful product or experiential value. Not every section.

**Impact:** Phase 6 (Motion/3D Spec — all component decisions must reference this ladder), Phase 7 (Frontend — implementation must justify each rung choice).

---

### DEC-013 — V1 Product Scope

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** V1 core experience focus areas:
1. Workout discovery
2. Exercise education
3. Training programs
4. Performance / progress experience
5. Motivation
6. Premium immersive UX

Frontend implementation does NOT begin until after Phase 6 (Motion/3D Spec) approval.

**Impact:** All phases from 3 onward. Scopes UX, architecture, and implementation.

---

## Phase 2 Gate Log

### GATE-002 — Brand Direction Gate

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 → 3 Transition |
| **Gate Type** | Brand Direction Gate — Required per AGENTS.md §5 |
| **Status** | `APPROVED` — Human approved 2026-08-17T18:14 IST |

**Brand Artifacts Approved:**
1. Audience Definition (committed enthusiast primary, performance-oriented secondary)
2. Brand Positioning (content + data gap owner, premium visual differentiator)
3. Brand Voice & Tone (knowledgeable, direct, warm, precise)
4. Visual Creative Direction (specifications for both concepts)
5. Moodboard: Apex Precision (selected)
6. Moodboard: Evolved Performance (not selected)
7. Brand Strategy Report

---

### DEC-014 — Visual Creative Direction Selection

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 → 3 Transition |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** **Concept 1: APEX PRECISION** is the approved visual direction for PREDYX.

- Background: Obsidian `hsl(220, 10%, 6%)`
- Primary text: Precision White `hsl(0, 0%, 96%)`
- Accent 1 (metrics/CTAs): Luminous Amber `hsl(38, 92%, 54%)`
- Accent 2 (data/progress): Electric Steel Blue `hsl(200, 80%, 62%)`
- Surface texture: subtle noise grain (2–3% opacity)
- No rounded corners beyond 8px — sharp, architectural, precise
- Typography: Engineered geometric grotesque (display) + tabular mono (telemetry)

This direction must NOT be changed without a new human approval gate.

**Impact:** All phases from 3 onward. Phase 3 design tokens, Phase 5 asset direction, Phase 6 motion character, Phase 7 implementation.

---

### DEC-015 — Brand Tagline

| Field | Value |
|---|---|
| **Date** | 2026-08-17 |
| **Phase** | 2 → 3 Transition |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** The approved PREDYX brand tagline is: **"Train with precision."**

This tagline must NOT be changed without a new human approval gate.

**Impact:** Phase 3 (landing page copy), Phase 5 (visual asset copy), Phase 7 (implementation).

---

## Phase 3 Gate Log

### GATE-003 — Phase 3 UX Architecture Approval

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Phase** | 3 → 4 Transition |
| **Gate Type** | Phase Approval Gate |
| **Status** | `APPROVED` — Human approved 2026-08-18T12:26 IST |

**Phase 3 Deliverables Approved:**
1. Information Architecture (5-tab nav, full screen map)
2. User Flows (5 core flows)
3. Design System Specification (Apex Precision tokens, 11 components)
4. Responsive Breakpoints (6 breakpoints, all component behaviors)
5. Interaction Patterns (15 named interactions, all with prefers-reduced-motion)
6. Wireframe Sheets × 3 (Home/Session, Exercise/Progress, Programs/Timer/Discover)
7. Phase 3 UX Report

---

### DEC-016 — Frontend Platform

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Phase** | 4 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** PREDYX V1 is a **web-first product** built with:
- **Next.js** (App Router)
- **React**
- **TypeScript**

The primary product is a premium responsive web experience. Mobile-native (React Native / Expo) is post-launch.

**Impact:** Phase 4 (architecture), Phase 6 (motion spec), Phase 7 (all frontend implementation).

---

### DEC-017 — Motion / 3D Technology Policy

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Phase** | 4 Kickoff |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** Evaluate motion and 3D using the DEC-012 escalation ladder applied to Next.js/web:

1. CSS / native browser capabilities (default)
2. GSAP for scroll and interface motion
3. 2.5D layered parallax where appropriate
4. Three.js / React Three Fiber / WebGL **only** where true 3D provides meaningful product or experiential value

The entire product must NOT be WebGL. Architecture must support: desktop, tablet, mobile, reduced-motion mode, accessible interaction, strong performance, progressive enhancement.

**Impact:** Phase 4 (motion spec), Phase 6 (final motion spec), Phase 7 (implementation).

---

## Phase 4 Gate Log

### GATE-004 — Architecture Gate

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Phase** | 4 → 5 Transition |
| **Gate Type** | Architecture Gate — Required per AGENTS.md §5 |
| **Status** | `APPROVED` — Human approved 2026-08-18T12:39 IST |

**Phase 4 Artifacts Approved:** Platform Architecture · Data Models (Prisma schema) · API Contracts · Motion & 3D Specification · Performance Targets · Phase 4 Report

---

### DEC-018 — 3D Anatomy Model Sourcing

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** Use **licensed third-party 3D anatomy models** for V1. Do not commission custom models. Every external asset must have: documented source, verified commercial web license, and recorded required attribution.

---

### DEC-019 — Monetization UI Assets

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** Monetization UI assets **DEFERRED** from Phase 5 scope. No paywall screens, pricing UI, or subscription checkout in V1 visual assets.

---

### DEC-020 — Program Cover Visual Direction

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED` |

**Decision:** **HYBRID** visual direction — cinematic athlete photography for major programs/hero content; abstract precision graphics for categories/technical/supporting content. Both must be visually coherent within Apex Precision language.

---

### DEC-018-REV — 3D Anatomy Model Sourcing (SUPERSEDES DEC-018)

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Owner** | Human (Approved) |
| **Status** | `DECIDED — Supersedes DEC-018` |

**Decision:** Use **free assets only** for all 3D models. Zero paid purchases, zero subscriptions, zero ambiguous licenses.

**Approved free options (ranked):**
1. **Z-Anatomy** (CC BY-SA 4.0) — primary recommendation. Commercial use permitted. Attribution required. Free via GitHub.
2. **BodyParts3D / DBCLS** (CC BY-SA 2.1 Japan) — fallback. Commercial use permitted. Attribution required. Free via lifesciencedb.jp.
3. **Procedural / MakeHuman** (CC0) — alternative. Zero attribution required. Higher engineering effort. No external model needed.

**Supersedes:** DEC-018 (SketchFab Store paid model recommendation — not approved).

**Impact:** Phase 5 registry documents revised. Phase 7 will implement using chosen free option.

---

## Open Decisions

| ID | Decision | Status |
|---|---|---|
| D-001 | Primary target audience | `RESOLVED: DEC-008` |
| D-002 | Brand identity and visual direction | `RESOLVED: DEC-014, DEC-015` |
| D-003 | Frontend framework | `RESOLVED: DEC-016 — Next.js + React + TypeScript` |
| D-004 | CMS and content strategy | `RESOLVED: Phase 4 — seeded static content` |
| D-005 | Subscription / monetization model | `DEFERRED — DEC-019 — architecture extensible` |
| D-006 | Native apps in scope | `RESOLVED: DEC-016 — post-launch` |
| D-007 | 3D technology per component | `RESOLVED: Motion_3D_Spec.md` |
| D-008 | Hosting and CDN | `RESOLVED: Phase 4 — Vercel + Supabase` |
| D-009 | Analytics | `RESOLVED: Phase 4 — Vercel Analytics` |
| D-010 | Backend API strategy | `RESOLVED: Phase 4 — Next.js Route Handlers` |
| D-011 | Video instruction in scope | `RESOLVED: DEC-009 — hybrid model` |
| D-012 | Wearable integration | `RESOLVED: DEC-011 — post-launch` |
| D-013 | Fitness content strategy | `RESOLVED: Phase 4 — curated, team-created` |

---

*Decision Log is a permanent record. Entries are never deleted — only superseded.*

| D-002 | Brand identity and visual direction | ~~@brand~~ | `RESOLVED: DEC-014, DEC-015` |
| D-003 | Frontend framework selection | ~~@product~~ | `RESOLVED: DEC-016 — Next.js + React + TypeScript` |
| D-004 | CMS and content strategy | @product (Phase 4) | Phase 7 |
| D-005 | Subscription / monetization model | Human | Phase 4 |
| D-006 | Native apps in scope | ~~Human~~ | `RESOLVED: DEC-016 — post-launch` |
| D-007 | 3D technology selection per component | @parallax (Phase 4) | Phase 7 |
| D-008 | Hosting and CDN provider | @product (Phase 4) | Phase 7 |
| D-009 | Analytics provider and privacy model | @product (Phase 4) | Phase 7 |
| D-010 | Backend API strategy | @product (Phase 4) | Phase 7 |
| D-011 | Video instruction in scope | ~~Human / @brand~~ | `RESOLVED: DEC-009 (hybrid model)` |
| D-012 | Wearable/biometric integration | ~~@product~~ | `RESOLVED: DEC-011 — post-launch` |
| D-013 | Fitness content strategy | @product / Human | Phase 4 |

---

*Decision Log is a permanent record. Entries are never deleted — only superseded.*

| D-013 | Fitness content strategy (curated library vs. AI-generated vs. third-party) | @product / Human | Phase 4 |

---

*Decision Log is a permanent record. Entries are never deleted — only superseded.*


---

## Phase 5 Gate Log

### GATE-005 � Asset Gate

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Phase** | 5 ? 6 Transition |
| **Gate Type** | Asset Gate |
| **Status** | `APPROVED` � Human approved 2026-08-18T18:29 IST |

Phase 5 Deliverables Approved: Asset Inventory, Asset Sourcing Plan (revised, free-only), 3D Model Registry v2.0, Phase 5 Report, 9 generated image assets.

3D Model Decision: DEFERRED to Phase 7 kickoff. Two approved free candidates: Z-Anatomy (CC BY-SA 4.0) and MakeHuman + procedural shader (CC0). Phase 6 must define exact requirements enabling rational selection.

---

### DEC-021 � 3D Model Selection Deferral

| Field | Value |
|---|---|
| **Date** | 2026-08-18 |
| **Owner** | Human (Approved) |
| **Status** | `DEFERRED TO PHASE 7 KICKOFF` |

3D anatomy model implementation not locked to either candidate. Phase 6 defines exact requirements. Phase 7 makes the selection.

Approved candidates (both free, ):
- Z-Anatomy (CC BY-SA 4.0) � attribution required
- MakeHuman + procedural shader (CC0) � no attribution required


---

## Phase 7 Gate Log

### GATE-006 — Implementation Gate (Phase 7 Approval)

| Field | Value |
|---|---|
| **Date** | 2026-08-19 |
| **Phase** | 7 → 8 Transition |
| **Gate Type** | Implementation Gate — Required per AGENTS.md § 5 |
| **Status** | `APPROVED` — Human approved 2026-08-19 |

**Phase 7 Deliverables Approved:**
1. Next.js 15 App Router codebase with full TypeScript type safety (0 build errors, 0 warnings).
2. Apex Precision design tokens in `styles/tokens.css` with dark obsidian palette and noise grain overlay.
3. Marketing landing page layout and all 7 modular sections.
4. GSAP 4-tier motion architecture with full `prefers-reduced-motion` compliance.
5. 2.5D Anatomy Engine preview teaser with interactive muscle selectors.
6. Responsive layout verified across 1440px desktop and 375px mobile viewports.
