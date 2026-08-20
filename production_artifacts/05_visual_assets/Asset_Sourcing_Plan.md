# PREDYX — Asset Sourcing Plan & License Registry

> **Version:** 1.0.0
> **Phase:** 5 — Visual Asset Generation
> **Date:** 2026-08-18
> **Owner:** @imagegen
> **Status:** Complete

---

## Sourcing Plan by Category

### Category 1: Generated Marketing Assets

All marketing landing page assets were **AI-generated** during Phase 5.

| Asset ID | Filename | Source | License | Commercial Use | Attribution |
|---|---|---|---|---|---|
| MK-001 | `predyx_hero_marketing_*.jpg` | AI Image Generation (Gemini Imagen) | PREDYX owned | ✅ Yes — internally generated | None required |
| MK-002 | `predyx_feature_exercise_education_*.jpg` | AI Image Generation | PREDYX owned | ✅ Yes | None required |
| MK-003 | `predyx_feature_programs_*.jpg` | AI Image Generation | PREDYX owned | ✅ Yes | None required |
| MK-004 | `predyx_feature_progress_*.jpg` | AI Image Generation | PREDYX owned | ✅ Yes | None required |

**Accessibility `alt` text:**

| Asset ID | Alt Text |
|---|---|
| MK-001 | `alt=""` (decorative hero background — text overlay conveys meaning) |
| MK-002 | `alt="Exercise Education — 3D anatomy model showing primary and secondary muscle activation for the Romanian Deadlift"` |
| MK-003 | `alt="Training Programs — 12-Week Powerbuilding program week view showing structured daily sessions"` |
| MK-004 | `alt="Progress Tracking — Back Squat strength chart showing 12kg improvement over 8 weeks with personal record marked"` |

---

### Category 2: Program Cover Images

All program covers were **AI-generated** during Phase 5.

| Asset ID | Filename | Program | Direction | Source | License | Alt Text |
|---|---|---|---|---|---|---|
| PC-001 | `predyx_cover_powerbuilding_*.jpg` | 12-Week Powerbuilding | Cinematic photography | AI Generated | PREDYX owned | `"12-Week Powerbuilding program — loaded barbell on squat rack in dramatic amber lighting"` |
| PC-002 | `predyx_cover_hypertrophy_*.jpg` | 6-Week Hypertrophy Foundation | Cinematic photography | AI Generated | PREDYX owned | `"6-Week Hypertrophy Foundation program — athlete's shoulder and arm in dramatic amber rim light"` |
| PC-003 | `predyx_cover_conditioning_*.jpg` | 4-Week Conditioning Block | Abstract precision | AI Generated | PREDYX owned | `"4-Week Conditioning Block program — abstract amber velocity lines on obsidian background"` |
| PC-004 | `predyx_cover_strength_foundations_*.jpg` | 8-Week Strength Foundations | Cinematic photography | AI Generated | PREDYX owned | `"8-Week Strength Foundations program — chalked hands gripping a barbell in amber directional light"` |
| PC-005 | `predyx_cover_mobility_*.jpg` | Mobility & Movement | Abstract precision | AI Generated | PREDYX owned | `"Mobility and Movement program — geometric arc diagrams in steel blue and amber representing range of motion"` |

---

### Category 3: Workout Cover Templates

Not generated in Phase 5 — to be generated in Phase 7 as needed using the established visual system.

**Template direction:**
- Strength: abstract amber diagonal precision graphic (same system as conditioning cover)
- HIIT: cinematic motion blur photography (dark, fast, precise)
- Mobility: steel blue arc geometry (same system as mobility cover)
- Hybrid: combination

All template images to follow same specs: 1200×675 (16:9), AI-generated, PREDYX-owned.

---

### Category 3: 3D Anatomy Models — REVISED TO FREE-ONLY STRATEGY

All paid model sources (SketchFab Store, TurboSquid, CGTrader paid tier) have been **removed from scope** per human decision.

See `3D_Model_Registry.md` (v2.0.0) for complete free-source evaluation.

| Asset ID | Asset | Recommended Source | License | Commercial Use | Attribution | Phase 7 Ready? |
|---|---|---|---|---|---|---|
| 3D-001 | Full-body musculature GLB | Z-Anatomy (primary) | CC BY-SA 4.0 | ✅ Yes | Required — see registry | ❌ Processing required |
| 3D-001 | Full-body musculature GLB | BodyParts3D DBCLS (fallback) | CC BY-SA 2.1 JP | ✅ Yes | Required — see registry | ❌ OBJ → GLB conversion + processing |
| 3D-001 | Full-body musculature GLB | Procedural UV-map via MakeHuman CC0 (alternative) | CC0 | ✅ Yes | ❌ None required | ❌ Custom shader engineering needed |

**No payment required for any of these options.**

**Action required before Phase 7 (no payment involved):**
1. Download Z-Anatomy from GitHub
2. Run Blender processing pipeline (decimate, isolate muscles, export GLB, Draco compress)
3. Verify in R3F test environment
4. Log final model choice in `3D_Model_Registry.md`
5. Confirm attribution in PREDYX About/Credits section

Estimated effort: 4–8 hours (Blender processing + GLB optimization + R3F testing). No cost.

---

### Category 5: Open-Source System Assets

| Asset ID | Asset | Source | License | Commercial Use | Attribution |
|---|---|---|---|---|---|
| SY-001 | Phosphor Icons | phosphoricons.com | MIT | ✅ Yes — free commercial | None required |
| SY-002 | Instrument Sans | fonts.google.com | SIL OFL 1.1 | ✅ Yes — free commercial | None required |
| SY-003 | JetBrains Mono | fonts.google.com / jetbrains.com | SIL OFL 1.1 | ✅ Yes — free commercial | None required |
| SY-004 | Noise texture | CSS SVG filter (procedural) | N/A — generated in browser | ✅ Yes | None required |

---

## Performance Specifications — Generated Assets

| Asset | Source Dimensions | Source Size | Max Serve Size | next/image sizes prop |
|---|---|---|---|---|
| Hero (MK-001) | 1920×1080 | ~800KB raw | < 150KB at 1920w | `sizes="100vw"` |
| Feature cards (MK-002/003/004) | 1200×900 | ~400KB raw | < 80KB at 800w | `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"` |
| Program covers (PC-001–005) | 1400×788 | ~500KB raw | < 80KB at 1200w | `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"` |

All images delivered via `next/image` — automatic WebP/AVIF conversion, responsive srcsets, lazy loading (except hero which uses `priority` flag).

---

## Asset Validation Checklist

Before Asset Gate approval, verify each generated asset:

| Check | MK-001 | MK-002 | MK-003 | MK-004 | PC-001 | PC-002 | PC-003 | PC-004 | PC-005 |
|---|---|---|---|---|---|---|---|---|---|
| On-brand (obsidian, amber, precision) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| No competitor brand marks visible | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| No unintended text visible | ✅ | ⚠️ UI text is intentional — decorative | ⚠️ UI text intentional | ⚠️ Data labels intentional | ✅ | ✅ | ⚠️ "4W/CONDITIONING" intentional | ✅ | ⚠️ "ROM/MOBILITY" intentional |
| Appropriate for fitness context | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Alt text defined | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Source documented | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| License clear | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
