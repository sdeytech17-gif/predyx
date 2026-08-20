# PREDYX — Visual Asset Inventory

> **Version:** 1.0.0
> **Phase:** 5 — Visual Asset Generation
> **Date:** 2026-08-18
> **Owner:** @imagegen
> **Status:** Complete

---

## Scope

This document inventories every visual asset required for PREDYX V1. Each asset is specified with:
- Intended usage and placement
- Dimensions / aspect ratio
- Source method (generated / licensed / system)
- License status
- Accessibility requirements
- Performance requirements

**Out of scope (DEC-019):** Paywall screens, pricing UI, subscription checkout, premium lock states.

---

## Asset Categories

### Category 1: Marketing Landing Page Assets

| ID | Asset | Placement | Dimensions | Source | Status |
|---|---|---|---|---|---|
| MK-001 | Hero background image | Landing page full-viewport hero | 1920×1080 (16:9) — served via next/image responsive | Generated | See file |
| MK-002 | Feature: Exercise Education card image | Feature pillars section, card 1 | 800×600 (4:3) | Generated | See file |
| MK-003 | Feature: Training Programs card image | Feature pillars section, card 2 | 800×600 (4:3) | Generated | See file |
| MK-004 | Feature: Progress Tracking card image | Feature pillars section, card 3 | 800×600 (4:3) | Generated | See file |
| MK-005 | Education preview screen mockup | "See it in action" marketing section | 1200×900 (4:3) | Generated | See file |

---

### Category 2: Program Cover Images

**Direction (DEC-020 Hybrid):**
- Strength programs → Cinematic athlete photography
- Conditioning programs → Cinematic or hybrid
- Technical / specialist programs → Abstract precision graphic

| ID | Asset | Program | Dimensions | Direction | Status |
|---|---|---|---|---|---|
| PC-001 | 12-Week Powerbuilding cover | 12-Week Powerbuilding | 1200×675 (16:9) | Cinematic photography | See file |
| PC-002 | 6-Week Hypertrophy Foundation cover | 6-Week Hypertrophy Foundation | 1200×675 (16:9) | Cinematic photography | See file |
| PC-003 | 4-Week Conditioning Block cover | 4-Week Conditioning Block | 1200×675 (16:9) | Hybrid | See file |
| PC-004 | 8-Week Strength Foundations cover | 8-Week Strength Foundations | 1200×675 (16:9) | Cinematic photography | See file |
| PC-005 | Mobility & Movement program cover | Mobility & Movement | 1200×675 (16:9) | Abstract precision | See file |

---

### Category 3: Standalone Workout Cover Images

Workout covers use a templated approach — a reusable visual system rather than bespoke images per workout.

| ID | Asset | Type | Dimensions | Direction | Status |
|---|---|---|---|---|---|
| WC-001 | Strength workout cover template | Strength | 800×450 (16:9) | Abstract precision + amber type | See file |
| WC-002 | HIIT / Conditioning workout cover template | HIIT | 800×450 (16:9) | Cinematic motion blur | See file |
| WC-003 | Mobility / Recovery workout cover template | Mobility | 800×450 (16:9) | Abstract precision + steel blue | See file |
| WC-004 | Hybrid workout cover template | Hybrid | 800×450 (16:9) | Abstract precision | See file |

*Individual workouts (15–20) use their type template. Unique per-workout images are not required for V1.*

---

### Category 4: 3D Anatomy Models

See separate `3D_Model_Registry.md` for full sourcing, license, and attribution records.

| ID | Asset | Usage | Format | Source Method | License Status |
|---|---|---|---|---|---|
| 3D-001 | Full-body musculature model | All exercise anatomy views | GLB (Draco compressed) | Licensed third-party | See registry |
| 3D-002 | Upper body detail model (optional) | Upper body exercises | GLB | Licensed third-party | See registry |
| 3D-003 | Lower body detail model (optional) | Lower body exercises | GLB | Licensed third-party | See registry |

*V1 may use a single full-body model with muscle group highlight states toggled per exercise — simplest approach, lowest model count, lowest bandwidth.*

---

### Category 5: System / UI Assets

These are covered by the design system specification and do not require bespoke generation.

| ID | Asset | Source | License |
|---|---|---|---|
| SY-001 | Icon set | Phosphor Icons (React) | MIT — free commercial use, no attribution required |
| SY-002 | Display typeface | Instrument Sans (Google Fonts via next/font) | OFL — free commercial use |
| SY-003 | Monospace typeface | JetBrains Mono (Google Fonts via next/font) | OFL — free commercial use |
| SY-004 | Noise texture (SVG/PNG) | Generated procedurally in CSS or small SVG filter | No license required |
| SY-005 | Favicon / app icon | Generated — PREDYX wordmark variant | Owned by PREDYX |

---

### Category 6: Video Thumbnails / Poster Frames

Exercise instruction videos are delivered via Mux. Mux auto-generates poster frames from video content.

| ID | Asset | Source | Notes |
|---|---|---|---|
| VT-001 | Exercise video poster frames | Mux auto-generated | No separate generation needed. Mux thumbnail API: `image.mux.com/{playback-id}/thumbnail.jpg` |

*When exercise videos are uploaded to Mux, poster frames are automatically available. This category requires no Phase 5 asset generation.*

---

## Accessibility Requirements (All Assets)

| Requirement | Specification |
|---|---|
| All images must have `alt` text | Alt text written per image — see Asset_Sourcing_Plan.md |
| Decorative images | `alt=""` + `aria-hidden="true"` — hero background, abstract graphics |
| Informational images | Descriptive alt text (program names, content description) |
| Color contrast in overlaid text | Amber text on obsidian overlay: 7.2:1 ✅ — White text on dark overlay: 18:1 ✅ |
| Motion in marketing images | Static images only — all motion is CSS/GSAP layered over static assets |
| 3D anatomy viewer | Full SVG fallback — not image-based, specified in Motion_3D_Spec.md |

---

## Performance Requirements (All Assets)

| Requirement | Target | Method |
|---|---|---|
| Image format | WebP primary, AVIF where supported | next/image handles automatically |
| LCP image (hero) | < 150 KB at 1920px | next/image quality={85}, compressed source |
| Program covers | < 80 KB per image at serving size | next/image quality={80} |
| Workout covers | < 50 KB per image | next/image quality={75} |
| 3D models (GLB) | 300–600 KB per model, Draco compressed | Loaded async, cached after first load |
| All images | Width/height attributes set | next/image enforces aspect ratio — zero CLS |

---

## Asset Production Summary

| Category | Count | Generation Method |
|---|---|---|
| Marketing landing | 5 assets | AI image generation (this phase) |
| Program covers | 5 assets | AI image generation (this phase) |
| Workout cover templates | 4 templates | AI image generation (this phase) |
| 3D anatomy models | 1–3 models | Licensed third-party (see registry) |
| System assets | 5 items | Open-source / procedural (no generation needed) |
| Video thumbnails | ~60–80 | Mux auto-generated (no generation needed) |
