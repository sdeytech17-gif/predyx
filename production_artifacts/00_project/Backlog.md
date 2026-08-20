# PREDYX — Product Backlog

> **Version:** 0.1.0
> **Phase:** 0 — Initial Backlog
> **Date:** 2026-08-17
> **Owner:** @pm
> **Status:** Active — Items refined per phase

---

## Backlog Legend

| Symbol | Meaning |
|---|---|
| `[ ]` | Not started |
| `[/]` | In progress |
| `[x]` | Complete |
| `[~]` | Deferred |
| `[!]` | Blocked |

Priority levels: **P0** (must-have), **P1** (high), **P2** (medium), **P3** (low / nice-to-have)

---

## Phase 0 — Project Setup

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| P0-001 | Create repository folder structure | @pm | P0 | `[x]` |
| P0-002 | Create AGENTS.md | @pm | P0 | `[x]` |
| P0-003 | Create Project_Charter.md | @pm | P0 | `[x]` |
| P0-004 | Create Backlog.md | @pm | P0 | `[x]` |
| P0-005 | Create Risk_Register.md | @pm | P0 | `[x]` |
| P0-006 | Create Decision_Log.md | @pm | P0 | `[x]` |
| P0-007 | Create Status.md | @pm | P0 | `[x]` |
| P0-008 | Create agent definition stubs in .agents/ | @pm | P1 | `[x]` |
| P0-009 | Define workflow for Phase 1 in .agents/workflows/ | @pm | P1 | `[x]` |

---

## Phase 1 — UX Research & Competitor Analysis

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| R-001 | Define fitness UX research framework and questions | @ux | P0 | `[x]` |
| R-002 | Identify key competitor fitness platforms for analysis | @ux | P0 | `[x]` |
| R-003 | Conduct competitor UX analysis (navigation, content, IA) | @ux | P0 | `[x]` |
| R-004 | Conduct competitor visual analysis (design system, motion) | @ux | P0 | `[x]` |
| R-005 | Conduct competitor performance analysis (load times, mobile) | @ux | P1 | `[x]` |
| R-006 | Document fitness UX patterns and mental models | @ux | P0 | `[x]` |
| R-007 | Identify UX gaps and opportunities in the fitness space | @ux | P0 | `[x]` |
| R-008 | Document user journey hypotheses (pre/during/post workout) | @ux | P1 | `[x]` |
| R-009 | Produce Phase 1 Research Report | @ux | P0 | `[x]` |
| R-010 | @pm review and approve Phase 1 artifacts | @pm | P0 | `[/]` — **Awaiting human approval gate** |

---

## Phase 2 — Brand Strategy & Creative Direction

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| B-001 | Define PREDYX brand positioning statement | @brand | P0 | `[ ]` |
| B-002 | Validate / refine brand name "PREDYX" | @brand | P0 | `[ ]` |
| B-003 | Define target audience personas (evidence-based) | @brand | P0 | `[ ]` |
| B-004 | Define brand personality and tone of voice | @brand | P0 | `[ ]` |
| B-005 | Define brand visual language direction (color, type, mood) | @brand | P0 | `[ ]` |
| B-006 | Create brand moodboard directions (minimum 2 concepts) | @brand | P1 | `[ ]` |
| B-007 | Evaluate "predator-inspired" visual direction vs. alternatives | @brand | P0 | `[ ]` |
| B-008 | Define competitive differentiation strategy | @brand | P0 | `[ ]` |
| B-009 | Fitness safety boundary review for brand messaging | @brand | P0 | `[ ]` |
| B-010 | Produce Phase 2 Brand Strategy Report | @brand | P0 | `[ ]` |
| B-011 | **HUMAN APPROVAL GATE: Brand Direction** | Human | P0 | `[ ]` |

---

## Phase 3 — UX Architecture, Flows & Wireframes

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| U-001 | Define information architecture (site map) | @ui | P0 | `[ ]` |
| U-002 | Define primary user flows (onboarding, training, tracking) | @ui | P0 | `[ ]` |
| U-003 | Define responsive breakpoint system | @ui | P0 | `[ ]` |
| U-004 | Create mobile wireframes (key screens) | @ui | P0 | `[ ]` |
| U-005 | Create desktop wireframes (key screens) | @ui | P1 | `[ ]` |
| U-006 | Define navigation patterns and IA logic | @ui | P0 | `[ ]` |
| U-007 | Define design system foundations (spacing, grid, tokens) | @ui | P0 | `[ ]` |
| U-008 | Define typography scale and hierarchy | @ui | P0 | `[ ]` |
| U-009 | Define color system and accessibility contrast ratios | @ui | P0 | `[ ]` |
| U-010 | Define interaction states (hover, active, focus, disabled) | @ui | P1 | `[ ]` |
| U-011 | Define motion design principles and patterns | @ui | P1 | `[ ]` |
| U-012 | Produce Phase 3 UX/UI Specification Document | @ui | P0 | `[ ]` |
| U-013 | @pm review and approve Phase 3 artifacts | @pm | P0 | `[ ]` |

---

## Phase 4 — Product Architecture & 3D/Parallax Planning

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| A-001 | Define platform architecture (frontend + backend) | @product | P0 | `[ ]` |
| A-002 | Select and justify frontend framework | @product | P0 | `[ ]` |
| A-003 | Define data models (users, workouts, programs, progress) | @product | P0 | `[ ]` |
| A-004 | Define API contract strategy | @product | P0 | `[ ]` |
| A-005 | Define CMS and content strategy | @product | P1 | `[ ]` |
| A-006 | Define performance budget and Core Web Vitals targets | @product | P0 | `[ ]` |
| A-007 | Define hosting, CDN, and deployment strategy | @product | P1 | `[ ]` |
| A-008 | Define analytics and privacy model | @product | P1 | `[ ]` |
| A-009 | Evaluate 3D needs per UI section | @parallax | P0 | `[ ]` |
| A-010 | Select 3D/parallax technology per component | @parallax | P0 | `[ ]` |
| A-011 | Define fallback strategy for no-WebGL environments | @parallax | P0 | `[ ]` |
| A-012 | Define `prefers-reduced-motion` motion system | @parallax | P0 | `[ ]` |
| A-013 | Produce Phase 4 Architecture Document | @product | P0 | `[ ]` |
| A-014 | **HUMAN APPROVAL GATE: Architecture** | Human | P0 | `[ ]` |

---

## Phase 5 — Visual Asset Generation & Validation

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| V-001 | Define visual asset requirements list | @imagegen | P0 | `[ ]` |
| V-002 | Define visual style guide for asset generation | @imagegen | P0 | `[ ]` |
| V-003 | Generate hero and key section imagery | @imagegen | P0 | `[ ]` |
| V-004 | Generate UI icons and system graphics | @imagegen | P1 | `[ ]` |
| V-005 | Generate texture and background assets | @imagegen | P1 | `[ ]` |
| V-006 | Validate asset quality and brand consistency | @imagegen | P0 | `[ ]` |
| V-007 | Optimize assets for web delivery | @imagegen | P0 | `[ ]` |
| V-008 | Produce Phase 5 Visual Asset Manifest | @imagegen | P0 | `[ ]` |
| V-009 | **HUMAN APPROVAL GATE: Visual Assets** | Human | P0 | `[ ]` |

---

## Phase 6 — Motion / 3D Final Specification

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| M-001 | Produce final motion specification (timing, easing, triggers) | @parallax | P0 | `[ ]` |
| M-002 | Produce 3D scene specifications for approved 3D elements | @parallax | P0 | `[ ]` |
| M-003 | Produce parallax layer specifications | @parallax | P1 | `[ ]` |
| M-004 | Define scroll-triggered animation map | @parallax | P1 | `[ ]` |
| M-005 | Validate motion specs against performance budget | @parallax | P0 | `[ ]` |
| M-006 | Produce Phase 6 Motion/3D Specification Document | @parallax | P0 | `[ ]` |
| M-007 | @pm review and approve Phase 6 artifacts | @pm | P0 | `[ ]` |

---

## Phase 7 — Frontend Implementation

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| F-001 | Set up project scaffold and dev environment | @frontend | P0 | `[ ]` |
| F-002 | Implement design system (tokens, typography, color, grid) | @frontend | P0 | `[ ]` |
| F-003 | Implement core layout and navigation | @frontend | P0 | `[ ]` |
| F-004 | Implement all approved page sections (mobile-first) | @frontend | P0 | `[ ]` |
| F-005 | Implement GSAP animation system | @frontend | P0 | `[ ]` |
| F-006 | Implement parallax and scroll-triggered animations | @frontend | P1 | `[ ]` |
| F-007 | Implement 3D elements (per approved spec) | @frontend | P1 | `[ ]` |
| F-008 | Integrate visual assets | @frontend | P0 | `[ ]` |
| F-009 | Implement responsive breakpoints | @frontend | P0 | `[ ]` |
| F-010 | Implement accessibility features (ARIA, keyboard, focus) | @frontend | P0 | `[ ]` |
| F-011 | Implement `prefers-reduced-motion` system | @frontend | P0 | `[ ]` |
| F-012 | Implement performance optimizations (lazy load, code split) | @frontend | P0 | `[ ]` |
| F-013 | **HUMAN APPROVAL GATE: Implementation** | Human | P0 | `[ ]` |

---

## Phase 8 — QA

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| Q-001 | Functional QA — all user flows | @qa | P0 | `[ ]` |
| Q-002 | Responsive QA — all breakpoints | @qa | P0 | `[ ]` |
| Q-003 | Visual regression QA | @qa | P0 | `[ ]` |
| Q-004 | Animation and motion QA | @qa | P1 | `[ ]` |
| Q-005 | Accessibility audit (WCAG 2.1 AA) | @qa | P0 | `[ ]` |
| Q-006 | Performance audit (Lighthouse, Web Vitals) | @qa | P0 | `[ ]` |
| Q-007 | Cross-browser compatibility QA | @qa | P0 | `[ ]` |
| Q-008 | `prefers-reduced-motion` QA | @qa | P0 | `[ ]` |
| Q-009 | Produce Phase 8 QA Report | @qa | P0 | `[ ]` |

---

## Phase 9 — Defect Resolution & Release

| ID | Item | Owner | Priority | Status |
|---|---|---|---|---|
| X-001 | Triage all Phase 8 defects | @pm | P0 | `[ ]` |
| X-002 | Resolve all P0 and P1 defects | @frontend | P0 | `[ ]` |
| X-003 | Resolve all P2 defects (or formally defer) | @frontend | P1 | `[ ]` |
| X-004 | Regression testing after defect fixes | @qa | P0 | `[ ]` |
| X-005 | Final performance validation | @qa | P0 | `[ ]` |
| X-006 | Final accessibility validation | @qa | P0 | `[ ]` |
| X-007 | **HUMAN APPROVAL GATE: Release** | Human | P0 | `[ ]` |
| X-008 | Production deployment | @frontend | P0 | `[ ]` |

---

*Backlog is a living document. Items are refined at the start of each phase.*
