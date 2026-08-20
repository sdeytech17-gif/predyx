# AGENTS.md — PREDYX Project Operating Manual

> **Version:** 0.1.0 — Phase 0 Init
> **Last Updated:** 2026-08-17
> **Status:** Active

---

## 1. Project Purpose

PREDYX is a premium, cinematic, technology-driven fitness and wellness platform focused on:

- Training and exercise education
- Personalized fitness experiences
- Performance tracking and motivation

This repository implements PREDYX using a **staged, artifact-first, multi-agent product development system**. Each phase produces explicit artifacts that must be approved before the next phase begins.

---

## 2. Agent Roles & Responsibilities

| Handle | Role | Responsibility |
|---|---|---|
| `@pm` | Project Manager / Orchestrator | Phase sequencing, artifact gating, decision logging, status tracking |
| `@ux` | Fitness UX Researcher | Fitness domain research, competitor analysis, user mental models |
| `@brand` | Fitness Brand Strategist | Brand positioning, naming validation, tone, creative direction |
| `@ui` | UX / Product Designer | UX architecture, user flows, wireframes, responsive UI specifications |
| `@product` | Product / Platform Architect | System architecture, data models, API contracts, platform planning |
| `@imagegen` | Visual Asset Generation Agent | Visual asset planning, generation, curation, and quality validation |
| `@parallax` | 3D / Motion / Parallax Expert | Motion design, parallax systems, 3D/WebGL evaluation and specification |
| `@frontend` | Frontend / GSAP / 3D Engineer | Frontend implementation, GSAP animations, WebGL/3D integration |
| `@qa` | QA / Performance / Accessibility Engineer | Functional, visual, animation, accessibility, and performance QA |

### Agent Constraints

- Each agent has **narrow, phase-specific responsibility**.
- Agents must **not perform tasks outside their phase** unless explicitly instructed by `@pm`.
- Agents must **consume approved upstream artifacts** before producing output.
- Agents must **never invent** user research, interviews, surveys, analytics, quotes, statistics, or competitor data.

---

## 3. Artifact-First Workflow

```
Research / Strategy → Specification → Design → Architecture → Implementation → QA
```

- **All decisions must be captured in artifacts** before being acted upon.
- **No code is written before the specification phase** is approved.
- **No design is finalized before the research phase** is approved.
- **No brand direction is implemented before the brand approval gate** is passed.

### Artifact Source of Truth

All approved artifacts live in `production_artifacts/`. Sub-directories map directly to project phases.

```
production_artifacts/
  00_project/       ← Project management artifacts
  01_research/      ← UX research and competitor analysis
  02_brand/         ← Brand strategy, positioning, creative direction
  03_ux_ui/         ← UX architecture, flows, wireframes, UI spec
  04_product/       ← Platform architecture, data models, API contracts
  05_visual_assets/ ← Generated and curated visual assets
  06_motion_3d/     ← Motion, parallax, and 3D specification
  07_engineering/   ← Frontend implementation artifacts
  08_qa/            ← QA reports, defect logs, regression records
```

---

## 4. Phase Dependencies

```
Phase 0: Project Setup
    ↓
Phase 1: UX Research & Competitor Analysis
    ↓
Phase 2: Brand Strategy & Creative Direction
    ↓ [HUMAN APPROVAL GATE — Brand Direction]
Phase 3: UX Architecture, Flows & Wireframes
    ↓
Phase 4: Product Architecture + Motion/3D Planning
    ↓
Phase 5: Visual Asset Generation & Validation
    ↓
Phase 6: Final Motion/3D Specification
    ↓
Phase 7: Frontend Implementation
    ↓
Phase 8: QA (Functional, Visual, Animation, Accessibility, Performance)
    ↓
Phase 9: Defect Resolution & Final Release Gate
    ↓ [HUMAN APPROVAL GATE — Release]
```

No phase may begin until the previous phase's artifacts are explicitly approved.

---

## 5. Human Approval Gates

The following gates **require explicit human approval before proceeding**:

| Gate | Trigger | Blocks |
|---|---|---|
| **Brand Direction Gate** | End of Phase 2 | All phases from 3 onward |
| **Architecture Gate** | End of Phase 4 | Phases 5, 6, 7 |
| **Asset Gate** | End of Phase 5 | Phases 6, 7 |
| **Implementation Gate** | End of Phase 7 | Phase 8 |
| **Release Gate** | End of Phase 9 | Production deployment |

`@pm` must log each gate outcome in `production_artifacts/00_project/Decision_Log.md`.

---

## 6. Evidence vs. Assumption Rules

All artifacts must clearly label their claims using the following taxonomy:

| Label | Meaning |
|---|---|
| `[ASSUMPTION]` | Stated without supporting evidence; must be validated |
| `[HYPOTHESIS]` | Testable belief; to be confirmed by research or testing |
| `[EVIDENCE]` | Supported by observable, citable data |
| `[DECISION]` | Explicitly chosen direction; logged in Decision_Log.md |
| `[OPEN]` | Unresolved; requires a decision before the next phase |

Agents must **never present assumptions as validated facts**.

---

## 7. No-Code-Before-Specification Rule

- `@frontend` must **not write application code** until Phase 3 (UX Architecture) and Phase 4 (Product Architecture) artifacts are approved.
- `@ui` must **not create high-fidelity designs** until Phase 2 (Brand Direction) is approved.
- `@imagegen` must **not generate production assets** until Phase 2 creative direction is approved.

---

## 8. Mobile-First Requirements

- All UI specifications must begin with the **375px mobile viewport**.
- Responsive breakpoints must be explicitly defined before implementation.
- Mobile performance targets (LCP, FID, CLS) must be specified before QA.
- Touch interaction patterns must be specified alongside pointer interactions.

---

## 9. Accessibility Requirements

- Target compliance: **WCAG 2.1 Level AA minimum**.
- Color contrast ratios must be validated in the UI specification phase.
- Motion and animation must respect `prefers-reduced-motion`.
- All interactive elements must be keyboard navigable.
- Screen reader compatibility must be tested in Phase 8.

---

## 10. Performance Requirements (Targets — To Be Validated)

| Metric | Target | Status |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5s | `[HYPOTHESIS]` |
| Cumulative Layout Shift (CLS) | < 0.1 | `[HYPOTHESIS]` |
| First Input Delay (FID) | < 100ms | `[HYPOTHESIS]` |
| Time to Interactive (TTI) | < 3.5s | `[HYPOTHESIS]` |
| Lighthouse Score (Mobile) | ≥ 85 | `[HYPOTHESIS]` |

These targets will be confirmed and formally set in Phase 4.

---

## 11. 3D / Parallax Principles

- **Do not assume every visual needs true 3D.**
- For every proposed 3D experience, `@parallax` must evaluate whether CSS, GSAP, layered 2.5D, or true WebGL/Three.js is the appropriate solution.
- 3D must provide **meaningful product or experiential value** — not decoration alone.
- Performance cost of any 3D element must be explicitly assessed.
- Fallbacks for devices that cannot support WebGL must be specified.
- `prefers-reduced-motion` must be respected by all motion systems.

---

## 12. Fitness Safety Boundary

- PREDYX is a **fitness and wellness product**, not a medical diagnosis or treatment system.
- **Do not invent or imply medical claims.**
- Any future health-related functionality must be explicitly reviewed before implementation.
- Content must comply with applicable fitness and wellness content guidelines.

---

## 13. Defect Routing

- All defects found in Phase 8 are logged in `production_artifacts/08_qa/Defect_Log.md`.
- **P0 (Blocking):** Immediately escalated to `@pm`; work stops until resolved.
- **P1 (Critical):** Must be resolved before release gate.
- **P2 (Major):** Must be resolved before release gate unless explicitly deferred.
- **P3 (Minor):** May be deferred to a post-release backlog with `@pm` approval.

---

## 14. Release Rules

- No production release without passing the **Release Gate** (end of Phase 9).
- Release Gate requires: all P0/P1/P2 defects resolved, Lighthouse ≥ 85, WCAG 2.1 AA verified.
- Release must be logged in `production_artifacts/00_project/Decision_Log.md`.

---

## 15. Repository Structure

```
predyx/
├── AGENTS.md                      ← This file
├── .agents/
│   ├── agents/                    ← Agent capability definitions
│   ├── skills/                    ← Shared agent skill modules
│   └── workflows/                 ← Phase workflow definitions
├── production_artifacts/
│   ├── 00_project/
│   ├── 01_research/
│   ├── 02_brand/
│   ├── 03_ux_ui/
│   ├── 04_product/
│   ├── 05_visual_assets/
│   ├── 06_motion_3d/
│   ├── 07_engineering/
│   └── 08_qa/
├── app/                           ← Frontend application (Phase 7+)
└── tools/                         ← Build tools, scripts, utilities
```

---

*AGENTS.md is a living document. All changes must be logged in the Decision_Log.*
