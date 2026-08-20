# PREDYX — Motion & 3D Specification

> **Version:** 1.0.0
> **Phase:** 4 — Product Architecture + 3D/Motion Planning
> **Date:** 2026-08-18
> **Owner:** @parallax + @product
> **Status:** Complete — Implements DEC-012 + DEC-017

---

## Governing Law

All technology selections in this document follow the DEC-012 escalation ladder:

```
① Static                    (no animation)
② Micro-motion / CSS        (transitions, keyframes, browser-native)
③ 2D GSAP                   (timeline/ScrollTrigger/interface choreography)
④ 2.5D Parallax (GSAP/CSS)  (layered depth, scroll-driven spatial illusion)
⑤ True 3D / WebGL           (Three.js / React Three Fiber)
```

**Every component must use the lowest rung that achieves the goal.** No component may use a higher rung without explicit justification and a performance assessment.

**prefers-reduced-motion is mandatory** — every animation must have a compliant fallback.

---

## Surface Map: Technology Assignment

### A. Marketing Landing Page

The landing page is the highest-motion surface — it establishes the PREDYX brand as cinematic and immersive. But it must NOT use WebGL.

---

#### A1. Hero Section

**Component:** Full-viewport hero with PREDYX wordmark + tagline "Train with precision."

**Technology: Rung ④ — 2.5D Parallax (GSAP ScrollTrigger)**

```
Layers (back to front):
  Layer 0: Static Obsidian background (#0d0f12) — no animation
  Layer 1: Subtle noise texture overlay — static
  Layer 2: Abstract athletic silhouette / motion blur — translateY at 0.3× scroll speed (slowest)
  Layer 3: Geometric amber accent line (horizontal) — translateY at 0.5× scroll speed
  Layer 4: PREDYX wordmark — translateY at 0.7× scroll speed, fade out past 60vh scroll
  Layer 5: Tagline + CTA — translateY at 0.9× scroll speed, fade out past 40vh scroll

Scroll behavior:
  - GSAP ScrollTrigger on hero container
  - Each layer uses gsap.to(layer, { y: depth × scrollProgress })
  - Wordmark fades (opacity 1 → 0) as hero exits
  - NOT full-page scroll-jack — natural scroll, parallax is additive

Implementation:
  components/marketing/HeroSection/HeroParallax.tsx
  Uses: gsap + ScrollTrigger (dynamic imported — marketing only)
  Client component: 'use client'

prefers-reduced-motion:
  All translateY animations disabled
  Wordmark + tagline + CTA appear statically, full opacity from load
  No parallax depth — single flat layer
```

**Performance budget:** Hero images served as `<Image>` with `priority` — no LCP delay. GSAP loaded async after initial paint.

---

#### A2. Feature Pillars Section

**Component:** Three feature cards — "Exercise Education / Training Programs / Progress Tracking" — revealed as user scrolls.

**Technology: Rung ③ — 2D GSAP ScrollTrigger**

```
Behavior:
  - Cards initially: opacity 0, translateY +40px
  - On enter viewport: stagger reveal — card 1 (0ms delay), card 2 (100ms), card 3 (200ms)
  - Each: opacity 1, translateY 0, duration 600ms, --ease-sharp

GSAP code pattern:
  gsap.fromTo(cards, 
    { opacity: 0, y: 40 }, 
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: section, start: 'top 80%' }
    }
  )

prefers-reduced-motion: All cards visible from load, no animation
```

---

#### A3. Exercise Education Preview

**Component:** Showcase of the 3D anatomy + instruction experience — marketing teaser, NOT the real 3D viewer.

**Technology: Rung ④ — 2.5D Parallax (CSS + GSAP)**

```
Approach: 
  Pre-rendered static screenshot of the anatomy viewer (2D image)
  + layered CSS/GSAP parallax to imply depth
  
Layers:
  Background card: 0.2× parallax speed
  Anatomy image: 0.5× parallax speed  
  Amber highlight overlay: 0.7× parallax speed
  Text callouts: 0.9× parallax speed

Rationale: Loading the real Three.js anatomy viewer on the marketing page 
           would be a significant LCP/TTI liability. The 2.5D illusion 
           communicates the spatial quality without the WebGL cost.

prefers-reduced-motion: Static flat layout — no parallax
```

---

#### A4. Program Showcase

**Technology: Rung ③ — GSAP horizontal scroll or stagger reveal**

```
Option A: Horizontal scrolling strip (GSAP ScrollTrigger pinned scroll)
  - Pin the section during horizontal program card scroll
  - 3–4 program cards scroll into view horizontally
  - Duration: scroll distance = 300px × number of cards

Option B (simpler): Vertical stagger reveal of 3 program cards
  
[DECISION — Phase 7] Confirm Option A vs. B based on content count and layout testing.
For now, spec assumes Option A.

prefers-reduced-motion: Option B layout — simple stagger, no pin/horizontal scroll
```

---

#### A5. Marketing Page Scroll Progress Indicator

**Technology: Rung ② — CSS**

```
1px amber line at top of viewport, width grows from 0 → 100% as page scrolls.
Pure CSS: scroll-timeline (native) or GSAP fallback for older browsers.
No JS overhead for this element.
prefers-reduced-motion: Hidden entirely.
```

---

### B. App Shell & Navigation

**Technology: Rung ② — CSS micro-motion**

All navigation transitions are CSS-only. No GSAP loaded for the app shell.

```
Bottom tab bar active indicator: CSS transition (color, border-top width)
Page route transitions: CSS opacity fade (250ms) via Next.js layout animation
Sidebar expand/collapse: CSS max-width transition (240px ↔ 72px)

prefers-reduced-motion: Instant state changes (transition-duration: 0ms)
```

---

### C. Active Session Experience

These are the most interaction-dense surfaces — performance is critical. CSS only.

#### C1. Rest Timer Arc

**Technology: Rung ② — CSS / SVG animation**

```
SVG circle with stroke-dashoffset:
  <circle
    r="60" 
    stroke-dasharray="377"   // 2π × 60
    stroke-dashoffset="0 → 377"  // animates over restDuration
    stroke="var(--color-amber)"
    transition="stroke-dashoffset linear [restDuration]s"
  />

Color shift (amber → steel) in final 10 seconds:
  CSS custom property animation via JS setInterval update

prefers-reduced-motion: Static circle (full ring), text countdown only. No arc animation.
```

#### C2. Set Completion Feedback

**Technology: Rung ② — CSS keyframes**

```
Checkmark fill animation:
  @keyframes checkFill { from { scale: 0.85 } to { scale: 1.0 } }
  duration: 100ms

Row dim on complete:
  CSS opacity transition: 1.0 → 0.55, 200ms

Final set pulse:
  @keyframes amberPulse { 0% { opacity: 1 } 50% { opacity: 0.4 } 100% { opacity: 0 } }
  One-shot, 400ms

prefers-reduced-motion: Instant opacity change only. No keyframe animation.
```

#### C3. Exercise Screen Transition (Previous → Next)

**Technology: Rung ② — CSS**

```
Slide + fade: current screen slides out left, next slides in right
CSS only: translate(-100%) + opacity transition, 250ms, --ease-sharp

prefers-reduced-motion: Opacity crossfade only (no translate)
```

---

### D. Exercise Education — 3D Anatomy Viewer ⚠️ WEBGL JUSTIFIED

**Technology: Rung ⑤ — React Three Fiber + Three.js**

This is the **only component in V1 that uses true 3D/WebGL.** Justification:

> *"A 3D interactive anatomical model that users can rotate to understand muscle activation during a specific exercise is not achievable with 2D or 2.5D at equivalent educational value. This is the primary PREDYX differentiator — the space is unoccupied by all six Phase 1 competitors."*

```tsx
// Implementation specification

// Dynamic import — anatomy viewer is lazy loaded only on exercise detail pages
const AnatomyViewer = dynamic(
  () => import('@/components/exercise/AnatomyViewer'),
  { 
    ssr: false,           // No server-side rendering — WebGL is client-only
    loading: () => <AnatomySkeleton /> 
  }
)

// AnatomyViewer internals:
// <Canvas> (R3F)
//   <ambientLight intensity={0.4} />
//   <directionalLight position={[5, 5, 3]} intensity={1.2} />
//   <OrbitControls 
//     enableZoom={true} 
//     enablePan={false}
//     autoRotate={true} 
//     autoRotateSpeed={1.5}
//   />
//   <AnatomicalModel 
//     modelPath={exercise.anatomyModelPath}
//     primaryMuscles={exercise.primaryMuscles}
//     secondaryMuscles={exercise.secondaryMuscles}
//   />

// Material system:
// Base musculature: MeshStandardMaterial, color hsl(220, 8%, 22%)  
// Primary muscles:  MeshStandardMaterial, emissive: amber, emissiveIntensity: 0.6
// Secondary muscles: MeshStandardMaterial, emissive: steel-blue, emissiveIntensity: 0.4
// On muscle click/tap: emissiveIntensity: 1.0 + label tooltip appears

// Model format: GLTF/GLB, Draco compressed, ~300–600KB per model
// Skeleton LOD: Single LOD for V1 (Phase 4+ can add LOD system)
```

**Fallback (no WebGL support — ~2% of browsers):**
```
Static SVG anatomy diagram showing:
  - Front and back body silhouette
  - Primary muscles: amber fill (#f5a623 at 80% opacity)
  - Secondary muscles: steel fill (#4db8e8 at 50% opacity)
  - Same legend: "PRIMARY / SECONDARY" with color chips

Detection:
  const supportsWebGL = (() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch { return false }
  })()
```

**Fallback (prefers-reduced-motion):**
```
WebGL viewer still loads (3D model is static information — not decorative motion)
BUT:
  autoRotate = false
  Interaction (drag to rotate): still works — user-initiated motion is permitted
  No auto-spin on load
```

---

### E. Progress Charts

**Technology: Rung ③ — CSS / SVG + GSAP on mount**

```
Library: Recharts (React SVG charts) — zero canvas/WebGL
  OR: Custom SVG path with CSS stroke-dashoffset animation

Strength chart line draw:
  On chart mount, animate stroke-dashoffset 0 → total path length over 600ms
  GSAP timeline (page-level, not marketing level — GSAP loaded only here if used)
  
  Alternative (simpler): CSS animation on SVG path, triggered by Intersection Observer

Data points: CSS scale(0) → scale(1) with 20ms stagger after line reaches each point
PR star marker: Same scale animation + single amber glow pulse

prefers-reduced-motion: Static chart, no draw animation, all points visible immediately
```

---

## Performance Budget by Rung

| Technology | Initial JS Cost | When Loaded |
|---|---|---|
| CSS / micro-motion | 0 KB | Always (critical CSS inlined) |
| GSAP | ~30 KB gzipped | Marketing pages only (dynamic import) |
| React Three Fiber + Three.js | ~180 KB gzipped | Exercise detail pages only (dynamic import, `ssr: false`) |
| GLTF model per exercise | 300–600 KB | On exercise detail page load, cached |
| Recharts | ~28 KB gzipped | Progress page only (dynamic import) |

**Total 3D-related JS cost (R3F + Three.js):** ~180 KB — acceptable for exercise detail page, which is a deliberate navigation destination. Not on critical path.

---

## WebGL Performance Considerations

| Concern | Mitigation |
|---|---|
| Initial WebGL context creation | Load anatomy viewer behind user interaction (scroll into view or `loading="lazy"` equivalent for dynamic imports) |
| GLTF model size | Draco compression targets 300–600KB per model. Cached after first load. |
| Mobile GPU | Low-poly models (< 15k triangles). Test on mid-range Android (Samsung Galaxy A series). |
| Multiple anatomy viewers open | Only one `<Canvas>` context per page — React Three Fiber manages context sharing |
| Battery drain | `frameloop="demand"` on R3F canvas — only re-renders on interaction, not every frame |

```tsx
// frameloop="demand" — critical for battery life
<Canvas frameloop="demand" dpr={[1, 1.5]}>
  {/* dpr capped at 1.5 — prevents 4K rendering on Retina displays */}
```

---

## Motion Library Loading Strategy

```tsx
// Next.js dynamic import — GSAP only on marketing route group
// app/(marketing)/layout.tsx
const GSAPProvider = dynamic(() => import('@/lib/gsap/GSAPProvider'), {
  ssr: false
})

// app/(app)/layout.tsx — NO GSAP import
// All app motion is CSS only
```

This ensures **zero GSAP JS loaded in the authenticated app** — the app shell is CSS micro-motion only. GSAP is exclusively a marketing surface tool.

---

## Summary: 3D/Motion Decision Table

| Component / Surface | Rung | Technology | prefers-reduced-motion |
|---|---|---|---|
| Marketing hero | ④ 2.5D Parallax | GSAP ScrollTrigger | Static flat layout |
| Feature section reveal | ③ 2D GSAP | GSAP ScrollTrigger | Visible on load |
| Education preview (marketing) | ④ 2.5D Parallax | GSAP + CSS | Static flat |
| Program showcase | ③ 2D GSAP | GSAP ScrollTrigger pin | Simple stagger |
| App page transitions | ② CSS | CSS opacity/translate | Instant swap |
| Bottom tab bar | ② CSS | CSS transitions | Instant |
| Button hover/press | ② CSS | CSS transitions | Color only |
| Card hover | ② CSS | CSS transitions | Instant |
| Set completion | ② CSS | CSS keyframes | Instant opacity |
| Rest timer arc | ② CSS/SVG | SVG stroke-dashoffset | Static ring + countdown |
| Skeleton shimmer | ② CSS | CSS keyframes | Static skeleton |
| Progress charts | ③ CSS/SVG | stroke-dashoffset + GSAP | Static chart |
| **Exercise anatomy viewer** | **⑤ WebGL** | **React Three Fiber** | **Static (no auto-rotate; drag still works)** |
| Session PR achievement | ② CSS | CSS keyframes | Fade only |
| Modal / bottom sheet | ② CSS | CSS translate | Opacity only |
