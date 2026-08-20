# PREDYX — Phase 5 Visual Asset Report (REVISED)

> **Version:** 2.0.0 — Revised per free-asset-only decision
> **Phase:** 5 — Visual Asset Generation
> **Date:** 2026-08-18
> **Owner:** @imagegen → @pm
> **Status:** COMPLETE — Submitted for Asset Gate Approval (Revised)

---

## Summary of Revision

Phase 5 has been **revised** to correct the 3D model sourcing strategy. The prior recommendation to purchase a paid SketchFab Store model was **not approved** by the human decision-maker.

**New rule (human-approved):** All 3D models must be free with licenses that explicitly permit commercial use. No paid assets. No subscriptions. No ambiguous licenses.

The `3D_Model_Registry.md` has been fully replaced with a free-source evaluation of 5 candidates. All paid model recommendations have been removed from all Phase 5 documents.

---

## Phase 5 Artifacts (Revised)

| # | Artifact | Status | Version |
|---|---|---|---|
| VA-001 | Asset Inventory | ✅ Complete | v1.0 (unchanged) |
| VA-002 | Asset Sourcing Plan & License Registry | ✅ Revised — paid 3D model removed | v2.0 |
| VA-003 | 3D Model Registry | ✅ Fully replaced — free-only strategy | v2.0 |
| VA-004 | Phase 5 Asset Report (this file) | ✅ Revised | v2.0 |
| — | Generated images × 9 | ✅ Filed — unchanged | v1.0 |

---

## Generated Assets Summary (Unchanged)

All 9 generated images remain valid. No changes to marketing or program cover assets.

### Marketing Assets (4 images — all PREDYX-owned, AI-generated)

| Asset | Direction |
|---|---|
| Hero background | Cinematic — barbell squat, amber rim light |
| Feature: Exercise Education | Abstract UI — anatomy viewer, amber/steel highlights |
| Feature: Training Programs | Abstract UI — program week view, amber active state |
| Feature: Progress Tracking | Data visualization — strength chart, amber PR star |

### Program Cover Assets (5 images — all PREDYX-owned, AI-generated)

| Program | Direction |
|---|---|
| 12-Week Powerbuilding | Cinematic — iron plates, amber light |
| 6-Week Hypertrophy Foundation | Cinematic — athlete shoulder, amber rim |
| 4-Week Conditioning Block | Abstract precision — amber velocity lines |
| 8-Week Strength Foundations | Cinematic — chalked hands on bar |
| Mobility & Movement | Abstract precision — steel blue arc diagrams |

---

## 3D Model Strategy — Revised Summary

**Prior (rejected):** SketchFab Store purchase — paid, ~$20–150 — NOT APPROVED.

**New (approved):** Free-only, three ranked options:

| Rank | Source | License | Commercial Use | Attribution | Processing Effort | Cost |
|---|---|---|---|---|---|---|
| 1 (Recommended) | **Z-Anatomy** (GitHub) | CC BY-SA 4.0 | ✅ Yes | Required (text credit in About page) | 4–8 hrs Blender processing | **$0** |
| 2 (Fallback) | **BodyParts3D** (DBCLS/RIKEN) | CC BY-SA 2.1 JP | ✅ Yes | Required (text credit) | 6–10 hrs processing | **$0** |
| 3 (Alternative) | **Procedural / MakeHuman** (CC0) | CC0 | ✅ Yes | None required | Higher engineering — custom shader | **$0** |

**Recommended approach:**
1. Download Z-Anatomy from GitHub
2. Run Blender pipeline: decimate → isolate muscles → export GLB → Draco compress
3. Test in R3F, verify <600KB and 30fps on mid-range mobile
4. Log final choice in `3D_Model_Registry.md`, confirm attribution

If Z-Anatomy proves technically intractable, fall back to BodyParts3D OBJ → GLB pipeline.
If both fail, implement procedural UV-map system using MakeHuman CC0 mesh.

---

## License Summary — Final

| Category | License | Cost | Attribution |
|---|---|---|---|
| All 9 generated images | PREDYX owned (AI-generated) | $0 | None |
| Phosphor Icons | MIT | $0 | None |
| Instrument Sans, JetBrains Mono | SIL OFL | $0 | None |
| Z-Anatomy 3D model (if selected) | CC BY-SA 4.0 | $0 | Required — 1 line of text credit |
| BodyParts3D (if fallback) | CC BY-SA 2.1 JP | $0 | Required — 1 line of text credit |
| MakeHuman + procedural (if alternative) | CC0 | $0 | None |

**Total Phase 5 asset cost: $0** in all scenarios.

---

## Outstanding Action Before Phase 7

| Item | Status | Cost | Owner |
|---|---|---|---|
| Download and process Z-Anatomy (or fallback) into production GLB | ❌ PENDING | $0 | Team / @frontend Phase 7 |
| Log final model selection + attribution in `3D_Model_Registry.md` | ❌ PENDING | — | @pm / team |
| Confirm attribution text appears in PREDYX About/Credits | ❌ PENDING | — | @frontend Phase 7 |

---

## ⚠️ Asset Gate — Required Before Phase 6

**Phases 6 and 7 remain blocked until this gate passes.**

**To approve:** Reply *"Phase 5 approved — proceed to Phase 6."*

**One outstanding decision before Phase 7 (does not block Phase 6):**

> **3D Model Selection:** Do you prefer **Z-Anatomy** (more anatomically accurate, CC BY-SA 4.0, requires attribution credit) or the **Procedural/MakeHuman approach** (CC0, no attribution at all, higher engineering effort, slightly lower anatomical precision)?

This decision can be deferred until Phase 7 kickoff without blocking Phase 6.

**Four asset review questions** (unchanged from prior gate):
1. Hero image direction — approve or redirect?
2. Cinematic cover series (Powerbuilding, Hypertrophy, Strength Foundations) — coherent as a collection?
3. Abstract precision covers (Conditioning, Mobility) — premium enough within Apex Precision?
4. Any additional assets needed before Phase 6?
