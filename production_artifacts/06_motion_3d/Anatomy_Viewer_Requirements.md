# PREDYX — Anatomy Viewer: 3D Solution Requirements

> **Version:** 1.0.0
> **Phase:** 6 — Final Motion / 3D Specification
> **Date:** 2026-08-18
> **Owner:** @parallax
> **Purpose:** Defines exact requirements the Phase 7 3D anatomy solution must satisfy, enabling a rational Z-Anatomy vs. MakeHuman+Procedural decision at Phase 7 kickoff.

---

## Why This Document Exists

Two free candidates are approved (DEC-021). Neither is locked in. This document defines the **acceptance criteria** — what the anatomy viewer must functionally do, visually look like, technically perform, and accessibly behave — independent of which model is used.

At Phase 7 kickoff, each candidate is evaluated against this requirements matrix. The candidate that satisfies more requirements at lower implementation cost is selected.

---

## 1. Functional Requirements

These are the behaviors the AnatomyViewer component must provide to the user:

| ID | Requirement | Priority | Notes |
|---|---|---|---|
| F-001 | Display a full human body 3D model in standard anatomical position | P0 | Front-facing, Y-up, visible from all sides |
| F-002 | Auto-rotate the model slowly on load (Y-axis, clockwise) | P0 | Communicates 3D, invites interaction |
| F-003 | User can drag to rotate model manually (OrbitControls) | P0 | Pan disabled; zoom optional |
| F-004 | Per-exercise: highlight specific primary muscle groups in amber | P0 | Programmatic, data-driven — no manual editing per exercise |
| F-005 | Per-exercise: highlight specific secondary muscle groups in steel blue | P0 | Same mechanism as F-004 |
| F-006 | Non-highlighted muscle groups remain visible in dark neutral | P0 | Must not disappear — context matters |
| F-007 | Clicking/tapping a highlighted muscle group shows a label | P1 | Label: muscle name, "PRIMARY" or "SECONDARY" badge |
| F-008 | Switching exercises resets highlights smoothly | P1 | New highlights appear within 200ms |
| F-009 | A legend is visible: amber dot "PRIMARY" / steel dot "SECONDARY" | P1 | Static UI element below the canvas |
| F-010 | "Front" / "Back" toggle button rotates model to preset views | P2 | Convenience — not required for V1 launch |

---

## 2. Visual Requirements

These define the exact rendered appearance the viewer must produce:

### 2.1 Model Aesthetic

| ID | Requirement | Specification |
|---|---|---|
| V-001 | Base body surface color | `hsl(220, 8%, 18%)` — dark cool gray, suggests musculature without being garish |
| V-002 | Primary muscle highlight | `#f5a623` (luminous amber) — emissive material, `emissiveIntensity: 0.55` |
| V-003 | Secondary muscle highlight | `#4db8e8` (electric steel blue) — emissive material, `emissiveIntensity: 0.35` |
| V-004 | Active (clicked) muscle highlight | Same hue, `emissiveIntensity: 1.0` — brightened on interaction |
| V-005 | Non-highlighted muscle surface | `hsl(220, 5%, 14%)` — slightly darker than base, recedes |
| V-006 | Material type | `MeshStandardMaterial` with `roughness: 0.85`, `metalness: 0.05` — matte, non-reflective |
| V-007 | No skin texture | Model must feel abstract/scientific — not photorealistic. Flat material only. |

### 2.2 Lighting

| ID | Requirement | Specification |
|---|---|---|
| V-008 | Ambient light | `AmbientLight`, intensity `0.35` — fills shadows without flattening form |
| V-009 | Key directional light | `DirectionalLight`, position `[3, 6, 4]`, intensity `1.1` — upper-front-right |
| V-010 | Fill light (optional) | `DirectionalLight`, position `[-4, 2, -2]`, intensity `0.25`, `#4db8e8` tint — subtle cool fill from rear-left |
| V-011 | No point lights or spotlights | Directional only — prevents unrealistic hotspots on curved musculature |
| V-012 | Background | Obsidian `#0d0f12` — pure CSS background on the containing div, not Three.js scene background |

### 2.3 Camera

| ID | Requirement | Specification |
|---|---|---|
| V-013 | Camera type | `PerspectiveCamera`, `fov: 45` |
| V-014 | Initial camera position | `[0, 1.0, 3.5]` — eye-level, slightly above center of mass |
| V-015 | OrbitControls target | `[0, 1.0, 0]` — orbits around body center |
| V-016 | Zoom limits | `minDistance: 2.0`, `maxDistance: 6.0` |
| V-017 | Auto-rotate speed | `autoRotateSpeed: 0.8` (slow, dignified) |
| V-018 | Camera damping | `enableDamping: true`, `dampingFactor: 0.08` — smooth deceleration matching `--ease-sharp` |

---

## 3. Performance Requirements

| ID | Requirement | Target | Method |
|---|---|---|---|
| P-001 | Model file size (post-Draco) | ≤ 500 KB for full-body model | Draco compress via `@gltf-transform/cli` |
| P-002 | Triangle count | ≤ 15,000 total | Decimate in Blender before export |
| P-003 | Frame rate — desktop | 60 fps sustained | `frameloop="demand"`, `dpr={[1, 1.5]}` |
| P-004 | Frame rate — mid-range mobile | ≥ 30 fps sustained | Target Samsung Galaxy A54 / Pixel 6a |
| P-005 | Canvas pixel ratio cap | max 1.5 | `dpr={[1, 1.5]}` — prevents 4K rendering on Retina |
| P-006 | Render on demand only | `frameloop="demand"` | No continuous render loop — only re-renders on interaction |
| P-007 | Time to interactive (viewer ready) | ≤ 3s on fast 4G | Lazy load (dynamic import, `ssr: false`), cached after first load |
| P-008 | Memory limit (mobile) | ≤ 80 MB GPU heap | Low poly + no large textures |
| P-009 | Viewer only loads on exercise detail page | Not bundled in main JS | `next/dynamic` with `ssr: false`, code-split |

---

## 4. Technical / Mesh Requirements

These requirements must be satisfied by whichever 3D source is chosen:

| ID | Requirement | Z-Anatomy path | MakeHuman+Procedural path |
|---|---|---|---|
| T-001 | Final delivery format: GLB (GLTF 2.0) | Export from Blender | Export from Blender after MakeHuman OBJ import |
| T-002 | Draco compression applied | `gltf-transform optimize --draco` | Same |
| T-003 | **Named muscle groups as addressable mesh objects OR UV-defined regions** | Named mesh objects per muscle in Blender | UV-mapped zones per muscle, programmatic highlight via ShaderMaterial |
| T-004 | PREDYX muscle naming convention applied | Rename in Blender to `muscle_<name>` e.g. `muscle_hamstrings` | UV zone IDs in shader config |
| T-005 | All PREDYX required muscle groups covered (see §5) | Must confirm via mesh audit | Must confirm UV coverage |
| T-006 | No skeleton / armature in delivered GLB | Hide/delete in Blender before export | N/A |
| T-007 | No animations in delivered GLB | Static pose only | Same |
| T-008 | No large embedded textures | Material only — no image textures | Same |
| T-009 | Y-up coordinate system | Verify in Blender | Same |
| T-010 | Model centered at world origin, Y = 0 at feet | Adjust in Blender | Same |

---

## 5. Required Muscle Group Coverage

All muscle groups listed here must be addressable in the delivered model. This is the minimum set for V1's exercise library:

```
UPPER BODY
  muscle_chest           — Pectoralis major + minor (single group for V1)
  muscle_front_delt      — Anterior deltoid
  muscle_side_delt       — Lateral deltoid
  muscle_rear_delt       — Posterior deltoid
  muscle_biceps          — Biceps brachii (long + short)
  muscle_triceps         — Triceps brachii (all heads)
  muscle_lats            — Latissimus dorsi
  muscle_traps_upper     — Upper trapezius
  muscle_traps_mid       — Mid trapezius + rhomboids (single group)
  muscle_forearms        — Forearm flexor/extensor group

CORE
  muscle_abs             — Rectus abdominis
  muscle_obliques        — Internal + external obliques (single group)
  muscle_erectors        — Erector spinae

LOWER BODY
  muscle_quads           — Quadriceps (all heads)
  muscle_hamstrings      — Biceps femoris + semimembranosus + semitendinosus
  muscle_glutes          — Gluteus maximus + medius
  muscle_adductors       — Adductor group
  muscle_hip_flexors     — Iliopsoas (approximate)
  muscle_calves          — Gastrocnemius + soleus
```

**Total: 20 named groups.** All 20 must be independently addressable by name (mesh name or UV zone ID).

---

## 6. Interaction Specification

| ID | Interaction | Trigger | Behavior | Duration |
|---|---|---|---|---|
| I-001 | Auto-rotate on load | Component mount (if `autoRotate=true`) | Y-axis rotation, 0.8 speed | Continuous |
| I-002 | User drag to rotate | Pointer down + move | OrbitControls take over; `autoRotate` pauses | Per gesture |
| I-003 | Auto-rotate resumes | No pointer interaction for 3s | Resume auto-rotate | After 3s idle |
| I-004 | Muscle highlight change | Parent component passes new `primaryMuscles[]`, `secondaryMuscles[]` props | Material emissive updates within 1 frame; `requestRender()` called | Instant |
| I-005 | Muscle tap/click | Pointer up on highlighted mesh | Show label overlay: muscle name + PRIMARY/SECONDARY badge | Label persists until next tap |
| I-006 | Canvas tap on empty space | Pointer up on non-muscle area | Dismiss any open label | Instant |
| I-007 | Exercise switch | New exercise loaded | `primaryMuscles` + `secondaryMuscles` props update; old emissive clears, new emissive sets | < 200ms total |

---

## 7. Accessibility Requirements

| ID | Requirement | Implementation |
|---|---|---|
| A-001 | Full SVG fallback when WebGL unavailable | Detect `canvas.getContext('webgl')` — show SVG body map diagram if false |
| A-002 | `prefers-reduced-motion`: auto-rotate disabled | `autoRotate={false}` when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` |
| A-003 | `prefers-reduced-motion`: user drag still works | User-initiated interaction is permitted under reduced-motion spec |
| A-004 | Muscle labels: screen reader accessible | Label overlays include `role="tooltip"` + `aria-label` with muscle name and role |
| A-005 | Canvas must have accessible `aria-label` | `<canvas aria-label="Interactive 3D anatomy viewer showing muscle activation for [exercise name]" />` |
| A-006 | Legend text is real DOM text | PRIMARY / SECONDARY legend rendered in HTML — not on canvas |
| A-007 | Keyboard: rotate model | `Tab` focuses canvas; arrow keys orbit ±10° per press via `OrbitControls` |

---

## 8. Component API Contract

This is the TypeScript interface `@frontend` must implement in Phase 7:

```typescript
// components/exercise/AnatomyViewer/AnatomyViewer.tsx

interface MuscleHighlight {
  muscleId: keyof typeof MUSCLE_IDS;   // e.g. 'muscle_hamstrings'
  role: 'primary' | 'secondary';
}

interface AnatomyViewerProps {
  exerciseName: string;                 // For aria-label
  primaryMuscles: MuscleHighlightId[];  // From exercise data — PREDYX naming convention
  secondaryMuscles: MuscleHighlightId[];
  autoRotate?: boolean;                 // Default true; false if prefers-reduced-motion
  className?: string;                   // Container class for sizing
}

// PREDYX_MUSCLE_IDS — the canonical muscle name list
export const PREDYX_MUSCLE_IDS = [
  'muscle_chest', 'muscle_front_delt', 'muscle_side_delt', 'muscle_rear_delt',
  'muscle_biceps', 'muscle_triceps', 'muscle_lats', 'muscle_traps_upper',
  'muscle_traps_mid', 'muscle_forearms', 'muscle_abs', 'muscle_obliques',
  'muscle_erectors', 'muscle_quads', 'muscle_hamstrings', 'muscle_glutes',
  'muscle_adductors', 'muscle_hip_flexors', 'muscle_calves'
] as const;

type MuscleHighlightId = typeof PREDYX_MUSCLE_IDS[number];
```

This interface is **identical** regardless of whether Z-Anatomy or MakeHuman is used. The model implementation is encapsulated inside `AnatomyViewer` — the parent exercise page never knows which source was used.

---

## 9. Candidate Evaluation Matrix

Use this matrix at Phase 7 kickoff to select the implementation:

| Requirement Category | Z-Anatomy | MakeHuman + Procedural |
|---|---|---|
| **Named muscle groups (T-003)** | ✅ Named mesh objects per TA2 | ⚠️ UV zones — less precise, must be manually mapped |
| **20 required muscles covered (T-005)** | ✅ Highly likely — TA2 complete | ⚠️ Requires manual UV mapping work for all 20 |
| **Visual quality (V-001–007)** | ✅ Real anatomy = accurate form | ⚠️ Approximate surface body — less anatomically clear |
| **Processing effort** | ⚠️ 4–8 hrs Blender pipeline | ⚠️ 4–8 hrs UV mapping + custom shader development |
| **Engineering complexity (Phase 7)** | ✅ Standard R3F named mesh traversal | ⚠️ Custom ShaderMaterial + UV coordinate system |
| **License (3D model)** | ⚠️ CC BY-SA 4.0 — attribution required | ✅ CC0 — no attribution |
| **Ongoing cost** | $0 | $0 |
| **Attribution burden** | 1 line in About page | None |
| **Risk of mesh quality failure** | Low (established open-source project) | Low-medium (depends on UV mapping quality) |
| **Fits PREDYX Apex Precision aesthetic** | ✅ Abstract, scientific, non-photorealistic | ✅ Abstract, can be equally styled |

**Recommendation at Phase 7 kickoff:** Evaluate Z-Anatomy mesh quality in Blender first (1–2 hrs). If muscle mesh separation and polygon count are acceptable after decimation, proceed with Z-Anatomy. If mesh complexity after decimation is insufficient or anatomically unclear, proceed with MakeHuman + procedural shader.
