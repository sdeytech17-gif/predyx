# PREDYX — 3D Anatomy Model Registry (REVISED)

> **Version:** 2.0.0 — Revised per human decision to use free assets only
> **Phase:** 5 — Visual Asset Generation
> **Date:** 2026-08-18
> **Owner:** @imagegen + @product
> **Status:** Updated — Free-asset strategy, pending final selection

---

## Governing Rules (DEC-018 revised)

- **Zero paid models.** No Sketchfab Store purchases. No subscriptions. No ambiguous licenses.
- Use only free assets with licenses that **explicitly permit commercial use** without payment.
- Every candidate must have: exact source URL, exact license, confirmed commercial use permission, format, polygon count, web suitability, and attribution requirements.
- If no single free model perfectly meets requirements, evaluate: modification, restyling, optimization, or procedural/programmatic alternatives.

---

## Free Source Evaluation — Complete Candidate List

### Candidate A: Z-Anatomy (GitHub / z-anatomy.com)

| Field | Detail |
|---|---|
| **Source** | github.com/zitrusfrisch/z-anatomy (community mirror); z-anatomy.com |
| **What it is** | Open-source 3D human anatomy atlas — complete musculature, skeletal, nervous, and vascular systems. Built for Blender. Organized by Terminologia Anatomica (TA2). |
| **License** | **CC BY-SA 4.0** (Creative Commons Attribution-ShareAlike 4.0 International) |
| **Commercial use** | ✅ **Permitted** — commercial use explicitly allowed under CC BY-SA 4.0 |
| **Attribution required** | ✅ Yes — "Z-Anatomy by [original authors], licensed CC BY-SA 4.0" must appear in PREDYX (About / Credits section) |
| **ShareAlike obligation** | ⚠️ **Critical caveat:** Any *derivative work* (i.e., a modified version of the model itself) must also be released under CC BY-SA 4.0. If PREDYX only *uses* the model without redistribution of a modified `.blend`/`.glb`, ShareAlike does not require PREDYX's codebase to be open source. **PREDYX uses the model as a web asset, not redistributes it as a standalone model — this use is compliant.** `[ASSUMPTION — verify with legal counsel or explicit project FAQ before Phase 7]` |
| **File format** | `.blend` (Blender native) — must be exported to GLB |
| **Polygon / triangle count** | `[OBSERVED — INFERRED]` Very high polygon count (full medical-grade anatomy atlas) — full atlas may be 1M+ triangles. **Requires decimation + per-muscle extraction in Blender before GLB export.** |
| **Named mesh groups** | ✅ Yes — organized by anatomical nomenclature (TA2). Individual muscles are separate named mesh objects. This is the key strength. |
| **Rig / animation** | N/A for this use — pose is fixed (standard anatomical position). PREDYX does not require animation. |
| **Texture** | Included — procedural or image-based depending on version |
| **Estimated GLB size after processing** | 200–600 KB (after muscle isolation, decimation to <15k triangles, Draco compression) |
| **Web suitability** | ✅ Good — after Blender processing pipeline |
| **Overall assessment** | **RECOMMENDED (Candidate A)** — This is the most anatomically precise option with properly named muscle meshes per TA2 nomenclature. Processing required but steps are well-documented. The ShareAlike concern is manageable for PREDYX's intended use-case. |

**Required processing pipeline:**
```
1. Open z-anatomy.blend in Blender 3.6 LTS
2. Select only musculature layer (hide skeleton, organs, etc.)
3. Isolate muscles needed per PREDYX's required list (see below)
4. Decimate each muscle mesh to target triangle count (<500 tris per muscle group)
5. Rename all mesh objects to PREDYX naming convention (e.g., "muscle_hamstrings", "muscle_glutes")
6. Export selected muscles as single GLB (join meshes into one object with named mesh groups)
7. Run Draco compression: npx @gltf-transform/cli optimize model.glb model.optimized.glb --draco.method edgebreaker
8. Verify in R3F test environment
```

---

### Candidate B: MakeHuman (makehumancommunity.org)

| Field | Detail |
|---|---|
| **Source** | makehumancommunity.org — free, open source |
| **What it is** | Parametric human body generator. Creates a human mesh (skin-surface body). NOT an anatomy model — no named muscle groups in the mesh. |
| **License** | **CC0 (Public Domain)** for all exported models — confirmed by MakeHuman community FAQ. No attribution required. |
| **Commercial use** | ✅ **Fully permitted — CC0, zero restrictions** |
| **Attribution required** | ❌ None required (CC0) |
| **ShareAlike obligation** | ❌ None |
| **File format** | OBJ, FBX, DAE (Collada) — no native GLB export. Blender conversion required. |
| **Named mesh groups** | ❌ **Critical weakness:** MakeHuman exports a single body surface mesh — there are no individually named muscle groups. The skin is the mesh; muscles are not separated. |
| **Polygon / triangle count** | ~10,000–50,000 triangles (configurable in export settings) — excellent for web |
| **Web suitability** | ✅ Very good after GLB conversion |
| **Overall assessment** | `[NOT SUITABLE AS PRIMARY MODEL]` — MakeHuman cannot provide the per-muscle named group structure required for the PREDYX anatomy highlight system. Could be used as a **base silhouette reference** or for the skin-surface fallback layer, but cannot drive the interactive muscle highlight feature. |

---

### Candidate C: BodyParts3D (DBCLS / RIKEN, Japan)

| Field | Detail |
|---|---|
| **Source** | lifesciencedb.jp/bp3d/ — official Japanese national bioscience database |
| **What it is** | 3D anatomical models of an adult human male, including complete musculature, derived from CT scan data. |
| **License** | **CC BY-SA 2.1 Japan** — some records also cite CC0 per Integbio Database Catalog `[VERIFY at download time]` |
| **Commercial use** | ✅ Permitted under CC BY-SA 2.1 Japan |
| **Attribution required** | ✅ Yes — "BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan" |
| **ShareAlike obligation** | ⚠️ Same caveat as Candidate A — applies to derivative model redistribution, not to PREDYX's web product use |
| **File format** | **Wavefront OBJ** format — Blender conversion to GLB required |
| **Named mesh groups** | ✅ Yes — individual anatomical structures as separate OBJ files |
| **Polygon / triangle count** | High polygon count (medical scan data) — requires significant decimation in Blender |
| **Web suitability** | ✅ After processing — pipeline similar to Z-Anatomy |
| **Overall assessment** | `[VIABLE ALTERNATIVE]` — If Z-Anatomy (Candidate A) encounters licensing or technical issues, BodyParts3D is a solid free alternative with clear CC BY-SA licensing and verified medical accuracy. Processing pipeline is more complex (many separate OBJ files vs. one structured Blender project). |

---

### Candidate D: Human Reference Atlas (HRA) via humanatlas.io

| Field | Detail |
|---|---|
| **Source** | humanatlas.io / github.com/hubmapconsortium/ccf-releases |
| **What it is** | 3D reference organs (heart, lung, kidney, etc.) from the HuBMAP consortium. Provided in native GLB format. |
| **License** | Open access research resource. License per data release — must verify at download time. Some releases cite CC BY 4.0. `[HYPOTHESIS — not confirmed as unrestricted commercial]` |
| **Commercial use** | `[UNCERTAIN]` — Primarily research-oriented. Commercial use not explicitly confirmed in available documentation. |
| **Named mesh groups** | ⚠️ Organs only — no separate muscle groups. Not designed for musculature highlighting. |
| **Overall assessment** | `[NOT SUITABLE]` — HRA covers organs (heart, lungs, kidneys) rather than skeletal musculature. Wrong data scope for PREDYX. License commercial status is unconfirmed. Eliminate from consideration. |

---

### Candidate E: Sketchfab Free Models with CC0 License (No Purchase)

| Field | Detail |
|---|---|
| **Source** | sketchfab.com — free tier only, CC0 license filter |
| **What it is** | Individual user-uploaded anatomy/character models under CC0 (public domain) license |
| **License** | **CC0** — public domain, no attribution, fully commercial |
| **Commercial use** | ✅ Fully permitted |
| **Attribution required** | ❌ None (CC0) |
| **How to find** | sketchfab.com/search → query "human anatomy muscles" → Filter: Downloadable + CC0 license |
| **File format** | GLTF/GLB available on most downloadable models |
| **Named mesh groups** | `[VARIABLE — depends on uploader]` — Quality varies significantly. May or may not have named muscle groups. |
| **Polygon / triangle count** | `[VARIABLE]` |
| **Overall assessment** | `[VIABLE — REQUIRES VERIFICATION]` Search must be conducted at time of Phase 7 model selection. Specific models cannot be confirmed at this planning stage as availability and license accuracy on Sketchfab changes. Use as a supplementary search, not as primary planned source. |

---

## Recommended Strategy: Z-Anatomy (Candidate A) as Primary

**Recommended approach for PREDYX V1:**

```
Primary:  Z-Anatomy (CC BY-SA 4.0)
          + Blender processing pipeline (decimate, isolate, export GLB)
          + Draco compression
          → Single optimized GLB, < 600KB

Fallback: BodyParts3D (CC BY-SA 2.1 Japan)
          If Z-Anatomy processing proves technically intractable

Supplementary: Search Sketchfab Free CC0 models
               As an option if a suitable CC0 model is found that requires
               less processing effort
```

---

### Alternative: Programmatic Muscle System (No External Model)

If none of the above free sources yield a sufficiently high-quality, GLTF-compatible, named-mesh model within reasonable processing effort, there is a viable **no-external-model alternative**:

**Procedural body highlight using a CC0 base mesh + UV-mapped muscle regions:**

```
1. Generate a CC0 human body surface mesh from MakeHuman (Candidate B)
2. In Blender: UV-unwrap the mesh and define muscle region zones as texture atlas regions
3. Use a custom Three.js ShaderMaterial that reads a highlight texture map
4. Per exercise: pass a "highlight mask" texture that colors specific UV regions
   amber (primary) or steel blue (secondary)
5. No need for separately named mesh groups — muscle regions defined in UV space

Benefits:
  - CC0 (zero attribution required)
  - Full control over visual aesthetic
  - Works with any base human mesh
  - Lower polygon count = better web performance

Trade-offs:
  - Muscle region accuracy is UV-mapping approximation, not true 3D anatomy
  - Less visually precise than Z-Anatomy's TA2-grade muscle separation
  - Higher upfront engineering effort in Phase 7 (custom shader)
```

This approach would still provide the core PREDYX differentiator (interactive muscle highlighting) within a fully free, CC0, PREDYX-owned pipeline.

---

## Decision Required Before Phase 7

| Question | Options |
|---|---|
| Primary 3D model approach | A: Z-Anatomy (CC BY-SA, attribution required, processing needed) / B: Procedural/UV-mapped (CC0, no attribution, more engineering) |

`[OPEN — GATE DECISION]` This decision must be logged in Decision_Log.md before Phase 7 implements the AnatomyViewer component.

---

## Required Muscle Group Coverage (Unchanged)

The selected model must cover these groups for the initial exercise set:

```
UPPER BODY: Pectorals, Anterior/Lateral/Posterior Deltoids, Biceps, Triceps, Lats, Trapezius, Rhomboids, Forearms
CORE: Rectus Abdominis, Obliques, Erector Spinae
LOWER BODY: Quadriceps, Hamstrings, Glutes, Adductors, Hip Flexors, Calves
```

---

## Attribution Templates

### If using Z-Anatomy (CC BY-SA 4.0):
```
3D Anatomy Model: Z-Anatomy by the Z-Anatomy contributors
License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
Source: z-anatomy.com / github.com/zitrusfrisch/z-anatomy
```

### If using BodyParts3D (CC BY-SA 2.1 Japan):
```
3D Anatomy Model: BodyParts3D
© The Database Center for Life Science (DBCLS)
Licensed under Creative Commons Attribution-ShareAlike 2.1 Japan
Source: lifesciencedb.jp/bp3d/
```

### If using Procedural / MakeHuman (CC0):
```
No attribution required.
Model generated using MakeHuman (CC0 output license).
UV-mapped muscle regions are PREDYX-owned.
```
