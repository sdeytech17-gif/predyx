# PREDYX — Phase 3 UX Architecture Report

> **Version:** 1.0.0
> **Phase:** 3 — UX Architecture, Flows & Wireframes
> **Date:** 2026-08-17
> **Owner:** @ui → @pm
> **Status:** COMPLETE — Submitted for Phase 3 Approval Gate

---

## Executive Summary

Phase 3 UX Architecture is complete. Six artifacts define the complete structural and interaction specification for PREDYX V1 — from information architecture and user flows through the full design system, responsive breakpoints, interaction patterns, and visual wireframes.

This document is the approval-gate artifact for Phase 3. Human approval unblocks Phase 4 (Product Architecture + Motion/3D Planning).

---

## Phase 3 Artifacts

| # | Artifact | Path | Status |
|---|---|---|---|
| UX-001 | Information Architecture | `production_artifacts/03_ux_ui/Information_Architecture.md` | ✅ Complete |
| UX-002 | User Flows (5 flows) | `production_artifacts/03_ux_ui/User_Flows.md` | ✅ Complete |
| UX-003 | Design System Specification | `production_artifacts/03_ux_ui/Design_System_Spec.md` | ✅ Complete |
| UX-004 | Responsive Breakpoints | `production_artifacts/03_ux_ui/Responsive_Breakpoints.md` | ✅ Complete |
| UX-005 | Interaction Patterns | `production_artifacts/03_ux_ui/Interaction_Patterns.md` | ✅ Complete |
| UX-006 | Wireframes (visual) | `production_artifacts/03_ux_ui/Wireframes_*.jpg` (3 sheets) | ✅ Complete |
| UX-007 | Phase 3 UX Report (this file) | `production_artifacts/03_ux_ui/Phase3_UX_Report.md` | ✅ Complete |

---

## Architecture Summary

### Navigation Model
**Bottom tab bar (mobile)** — 5 destinations: Home · Programs · Discover · Progress · Profile
**Left sidebar (desktop ≥ 1024px)** — collapsible, same 5 destinations

Bottom tab bar chosen over hamburger based on:
- Phase 1 research: one-thumb access required in workout context
- Tabs keep core features always visible — critical during an active session

### Information Architecture
7 structural sections across 5 primary tabs. V1 scope fully mapped with explicit exclusion list (social feed, live classes, nutrition, wearable integration, AI coaching — all post-launch).

Discovery and Exercise Library unified in a single Discover tab — same search/filter behavior, same navigation pattern, reduced primary navigation from 6 to 5 tabs.

### Five User Flows Specified
1. **Onboarding → First Session** — 4 steps maximum, program recommendation before account required
2. **Workout Discovery → Start Session** — filter-first, exercise preview from within workout context
3. **Exercise Education** — 3D anatomy + video + movement cues — the primary differentiator flow
4. **Active Training Session** — set logging, rest timer, progression data visible at all times
5. **Progress Review** — strength charts, PR tracking, volume history, session history

---

## Design System Overview

### Color (Apex Precision — DEC-014 compliant)

| Token | Value | Role |
|---|---|---|
| `--color-bg-primary` | `hsl(220, 10%, 6%)` | Main surface |
| `--color-bg-secondary` | `hsl(220, 8%, 11%)` | Cards, panels |
| `--color-amber` | `hsl(38, 92%, 54%)` | Primary brand accent, CTAs, active metrics |
| `--color-steel` | `hsl(200, 80%, 62%)` | Secondary data, progress, passive states |
| `--color-text-primary` | `hsl(0, 0%, 96%)` | Body text |

All contrast ratios meet WCAG 2.1 AA. Active in-session metrics use amber at 7.2:1 (meeting enhanced 7:1 target from Phase 1 accessibility research).

### Typography
- Primary: Instrument Sans (open-source) / ABC Diatype (preferred if licensed)
- Telemetry: JetBrains Mono (open-source) / ABC Diatype Semi-Mono (preferred)
- Full fluid scale using `clamp()`, mobile-first

### Spacing
4px base unit. 10-step scale. All component padding specified.

### Motion (Apex Precision character)
Sharp deceleration (`cubic-bezier(0.22, 1, 0.36, 1)`). No spring. No bounce. 15 named interactions with durations, easing, haptics, and `prefers-reduced-motion` alternatives for all.

---

## Visual Wireframes

Three wireframe sheets produced (Apex Precision Apex visual direction):

**Sheet 1: Home Screen + Active Session Exercise Screen**
- Shows today's session card, program progress, quick workouts, tab bar
- Shows video instruction area, set log rows, previous session reference, inter-exercise navigation

**Sheet 2: Exercise Detail + Progress Screen**
- Shows 3D anatomy view with primary (amber) / secondary (steel blue) muscle highlighting
- Shows movement cues, video instruction, common errors
- Shows progress stats cards, PR list, strength chart with amber data line, PR star marker

**Sheet 3: Programs Browse + Rest Timer + Discover/Search**
- Shows filter chip system (active amber / inactive dark)
- Shows full-screen rest timer with SVG arc countdown, next-set preview
- Shows search + workout/exercise tab switch, filter dropdowns, workout cards

---

## Key Design Decisions Made in Phase 3

| Decision | Status |
|---|---|
| Bottom tab bar navigation (5 destinations) | `[DECIDED]` |
| Discovery + Exercise Library unified in one tab | `[DECIDED]` |
| No account wall before program recommendation | `[DECIDED]` |
| Onboarding capped at 4 steps | `[DECIDED]` |
| Video area ≤ 40% screen height on exercise screen (mobile) | `[DECIDED]` |
| Rest timer is full-screen (prevents accidental taps) | `[DECIDED]` |
| Skeleton loading (not spinners) | `[DECIDED]` |
| No shadow-based card elevation (border separation only) | `[DECIDED]` |
| 3D anatomy viewer: WebGL with full SVG fallback | `[DECIDED]` |
| Set logging rows: 56px height minimum (session-mode accessibility) | `[DECIDED]` |
| Progress narrative text (not generic "Great job!") | `[DECIDED]` |
| No confetti / particle effects for achievements | `[DECIDED]` |
| Phosphor Icons as icon system | `[DECIDED]` |

---

## Accessibility Compliance Checklist (Phase 3 Specification)

| Requirement | Specification Status |
|---|---|
| WCAG 2.1 AA contrast (4.5:1 body) | ✅ Specified — all tokens validated |
| 7:1 contrast for in-session metrics | ✅ Amber on Obsidian = 7.2:1 |
| prefers-reduced-motion — all 15 interactions | ✅ Specified per interaction |
| Minimum 44px touch targets | ✅ Specified — 56px in-session, 72px hero CTA |
| Closed captions default ON | ✅ Specified in User Flows (Flow 3, Flow 4) |
| Color never sole status indicator | ✅ Completed/active states use icon + color + text |
| Focus ring on all interactive elements | ✅ Specified — 2px amber, 2px offset |
| Focus trapped in modals | ✅ Specified in Interaction Patterns |
| Keyboard navigation order = visual order | ✅ Specified |
| 3D anatomy fallback for no-WebGL | ✅ Specified — SVG fallback |

---

## Open Questions for Phase 4

The following questions are `[OPEN]` and must be resolved in Phase 4 (Product Architecture):

| Question | Priority | Owner |
|---|---|---|
| Which 3D library for anatomy viewer: Three.js, Babylon.js, or custom WebGL? | P0 | @parallax + @product |
| Frontend framework: Next.js (web-first) or Expo/React Native (mobile-native)? | P0 | @product |
| Offline mode: How much session data cached locally? Which API for sync? | P1 | @product |
| Content delivery: How are videos served? CDN + adaptive bitrate? | P1 | @product |
| Set log data model: Local-first with sync, or server-first? | P0 | @product |
| Screen Wake Lock API: Confirm browser/platform support for session screen | P1 | @product |

---

## Phase 4 Readiness

Phase 3 is complete. @product and @parallax are unblocked to begin Phase 4 once this artifact is approved.

**Phase 4 will produce:**
- Platform architecture decisions (frontend framework, backend API, data models)
- 3D / WebGL library evaluation and selection
- Full data model for: sessions, exercises, programs, user progress
- CDN and content delivery strategy
- API contract outlines
- Performance target confirmation (LCP, CLS, FID, TTI — currently `[HYPOTHESIS]` in AGENTS.md §10)

---

## ⚠️ Human Approval Gate — Phase 3

**Phase 3 is complete. Phase 4 cannot begin without your explicit approval.**

**To proceed:** Reply with: *"Phase 3 approved — proceed to Phase 4."*

**Optional input before Phase 4:**
1. Any changes to the navigation model (5-tab bottom bar)?
2. Any additions or removals from the V1 screen map?
3. Any interaction patterns that feel off-brand or wrong?
4. Frontend preference: web-first (Next.js) or mobile-native (React Native/Expo)?
