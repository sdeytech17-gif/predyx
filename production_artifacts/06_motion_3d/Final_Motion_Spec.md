# PREDYX — Final Motion / 3D Specification

> **Version:** 1.0.0
> **Phase:** 6 — Final Motion / 3D Specification
> **Date:** 2026-08-18
> **Owner:** @parallax
> **Status:** Complete — Master implementation reference for Phase 7 @frontend

---

## This Document's Role

This is the **master motion specification** for Phase 7 implementation. It is the single authoritative reference `@frontend` reads before writing any animation code.

It synthesizes Phase 3 (Interaction Patterns), Phase 4 (Motion_3D_Spec.md), and Phase 6 specifications into a final, coherent, implementation-ready document.

**Companion documents (required reading for Phase 7):**
- `CSS_Motion_Tokens.md` — All CSS custom properties, keyframes, component rules
- `GSAP_Animation_Spec.md` — All GSAP landing page implementation code
- `Anatomy_Viewer_Requirements.md` — 3D anatomy viewer technical requirements + evaluation matrix

---

## Part 1 — Motion Philosophy

### Brand Motion Character

**PREDYX motion is sharp, precise, and intentional.** Motion communicates control — it does not decorate.

| Principle | Application |
|---|---|
| Sharp deceleration | Primary easing: `cubic-bezier(0.22, 1, 0.36, 1)` — fast departure, crisp landing |
| No spring, no bounce | No elastic or spring easing anywhere in the product |
| No particle effects | No floating particles, confetti, or generative effects |
| Motion earns its place | Every animation must communicate state change or spatial relationship — nothing decorative |
| Duration is minimal | Shortest duration that communicates clearly. Never linger. |

### Motion Ladder (DEC-012, DEC-017 — Final Assignment)

```
① Static              — navigation labels, hero background, program covers
② CSS micro-motion    — all authenticated app: buttons, cards, set rows, rest timer, skeletons, transitions
③ GSAP 2D             — landing page feature reveal, program showcase horizontal scroll
④ GSAP 2.5D Parallax  — landing page hero, education preview section
⑤ Three.js / R3F      — exercise anatomy viewer (one component, one page)
```

**Rule: every component uses the lowest rung that achieves the goal.** No overrides without @pm approval.

---

## Part 2 — Easing Reference

| Token | Value | Use case |
|---|---|---|
| `--ease-sharp` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for all UI motion |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `--ease-linear` | `linear` | Progress bars, rest timer only |
| GSAP: `'power3.out'` | Approx matches `--ease-sharp` | GSAP animations use this string |
| GSAP: `'none'` | Linear | Scrub-based scroll animations |

---

## Part 3 — Duration Reference

| Token | Value | Use case |
|---|---|---|
| `--dur-instant` | `0ms` | `prefers-reduced-motion` overrides |
| `--dur-micro` | `100ms` | Button press, checkmark, icon state |
| `--dur-fast` | `200ms` | Hover states, completion feedback |
| `--dur-normal` | `250ms` | Route transitions, modal enter/exit |
| `--dur-slow` | `400ms` | PR achievement, chart reveal |
| Rest timer | Dynamic | `--rest-duration` custom prop set per session |

---

## Part 4 — Complete Surface Map

### 4.1 Marketing Landing Page

| Surface | Rung | Technology | Spec Document |
|---|---|---|---|
| Hero background | ① Static | `next/image` (priority) | Asset_Sourcing_Plan.md |
| Hero wordmark + tagline | ④ 2.5D Parallax | GSAP ScrollTrigger (scrub) | GSAP_Animation_Spec.md §2 |
| Scroll progress bar | ② CSS / ③ GSAP fallback | CSS `animation-timeline: scroll()` | CSS_Motion_Tokens.md §6, GSAP §6 |
| Feature pillars reveal | ③ GSAP 2D | GSAP ScrollTrigger stagger | GSAP_Animation_Spec.md §3 |
| Education preview | ④ 2.5D Parallax | GSAP ScrollTrigger (scrub) | GSAP_Animation_Spec.md §5 |
| Program showcase | ③ GSAP 2D | GSAP ScrollTrigger pin + horizontal | GSAP_Animation_Spec.md §4 |
| Hero headline chars | ③ GSAP 2D (optional) | GSAP fromTo stagger | GSAP_Animation_Spec.md §7 |

### 4.2 Authenticated App — Shell

| Surface | Rung | Technology | Spec |
|---|---|---|---|
| Route transitions | ② CSS | `pageFadeIn` keyframe on `.page-content` | CSS_Motion_Tokens.md §4.8 |
| Bottom tab bar active | ② CSS | Tab indicator CSS transition | CSS_Motion_Tokens.md §4.3 |
| Sidebar expand/collapse | ② CSS | `width` transition + label opacity | CSS_Motion_Tokens.md §5 |

### 4.3 Authenticated App — Home

| Surface | Rung | Technology | Spec |
|---|---|---|---|
| Today's session card | ② CSS | Card hover rule | CSS_Motion_Tokens.md §4.2 |
| Recent session list items | ② CSS | Card hover rule | CSS_Motion_Tokens.md §4.2 |

### 4.4 Authenticated App — Programs / Discover

| Surface | Rung | Technology | Spec |
|---|---|---|---|
| Program card hover | ② CSS | Card transition | CSS_Motion_Tokens.md §4.2 |
| Filter chip toggle | ② CSS | Background + border-color transition | CSS_Motion_Tokens.md §4.1 |
| Modal / drawer | ② CSS | `sheetSlideUp`, `overlayFadeIn` | CSS_Motion_Tokens.md §4.9 |

### 4.5 Authenticated App — Exercise Detail

| Surface | Rung | Technology | Spec |
|---|---|---|---|
| Exercise page mount | ② CSS | `pageFadeIn` | CSS_Motion_Tokens.md §4.8 |
| **Anatomy viewer** | **⑤ Three.js / R3F** | **React Three Fiber** | **Anatomy_Viewer_Requirements.md** |
| Muscle highlight change | ⑤ Three.js | Emissive material property update | Anatomy_Viewer_Requirements.md §6 |
| Muscle label appear | ② CSS | DOM overlay: opacity + scale | CSS_Motion_Tokens.md §4.1 |

### 4.6 Authenticated App — Active Session

| Surface | Rung | Technology | Spec |
|---|---|---|---|
| Exercise screen enter | ② CSS | `exerciseEnter` keyframe | CSS_Motion_Tokens.md §4.7 |
| Exercise screen exit | ② CSS | `exerciseExit` keyframe | CSS_Motion_Tokens.md §4.7 |
| Set completion checkmark | ② CSS | `checkFill` keyframe | CSS_Motion_Tokens.md §4.4 |
| Set row dim (completed) | ② CSS | `opacity` transition | CSS_Motion_Tokens.md §4.4 |
| Last-set amber ring | ② CSS | `amberPulse` keyframe (one-shot) | CSS_Motion_Tokens.md §4.4 |
| Rest timer arc | ② CSS / SVG | `stroke-dashoffset` linear transition | CSS_Motion_Tokens.md §4.5 |
| Rest timer color shift | ② CSS | `stroke` transition on `.--warning` | CSS_Motion_Tokens.md §4.5 |
| Session complete PR | ② CSS | `starBurst` + `amberPulse` | CSS_Motion_Tokens.md §4.4 |
| Bottom sheet (rest, info) | ② CSS | `sheetSlideUp` | CSS_Motion_Tokens.md §4.9 |

### 4.7 Authenticated App — Progress

| Surface | Rung | Technology | Spec |
|---|---|---|---|
| Strength chart line draw | ② CSS | `lineDrawIn` via Intersection Observer | CSS_Motion_Tokens.md §4.10 |
| Chart data points | ② CSS | `checkFill` with staggered delay | CSS_Motion_Tokens.md §4.10 |
| PR star marker | ② CSS | `starBurst` + `amberPulse` | CSS_Motion_Tokens.md §4.10 |
| Volume chart bars | ② CSS | `scaleY` transition from 0, transform-origin bottom | To be defined in Phase 7 component |

### 4.8 Skeleton Loaders (All Pages)

| Surface | Rung | Technology | Spec |
|---|---|---|---|
| All loading skeletons | ② CSS | `shimmer` keyframe | CSS_Motion_Tokens.md §4.6 |

---

## Part 5 — prefers-reduced-motion: Complete Compliance Map

Every surface above has a tested fallback:

| Surface | Reduced-motion behavior |
|---|---|
| Hero parallax | Static flat layout — layers at `y: 0`, full opacity |
| Feature reveal | Cards visible at full opacity on load, no stagger |
| Program showcase | Vertical card list, no pin, stagger reveal (Rung ③ → static if needed) |
| Education preview | Static flat image, no parallax |
| Route transitions | `--dur-instant` overrides make all CSS transitions instant |
| Tab bar | Instant state change |
| Set completion | Instant opacity change — no `checkFill` keyframe |
| Last-set amber ring | `amberPulse` not triggered |
| Rest timer arc | Arc hidden entirely — countdown text only |
| Exercise screen transitions | Opacity fade only (`pageFadeIn` without translateY) |
| PR star achievement | Instant appear — `starBurst` not triggered |
| Strength chart | Static chart visible from load — `lineDrawIn` not triggered |
| Anatomy viewer (auto-rotate) | `autoRotate: false` — model is static, drag-to-rotate still works |
| Skeleton shimmer | Static skeleton shape — `shimmer` animation not triggered |
| Modal / bottom sheet | Instant appear/disappear — `sheetSlideUp`/`sheetSlideDown` not triggered |
| Scroll progress bar | Hidden entirely |

**Implementation rule:** The CSS global `@media (prefers-reduced-motion: reduce)` block in `tokens.css` covers all CSS durations automatically. GSAP is gated by `prefersReducedMotion` check in `GSAPProvider`. R3F `autoRotate` gated by `window.matchMedia` check.

---

## Part 6 — 3D Anatomy Viewer Summary

Full specification: `Anatomy_Viewer_Requirements.md`

Key constraints for Phase 7:

| Constraint | Value |
|---|---|
| Model file | Single GLB, ≤ 500KB Draco-compressed |
| Triangle count | ≤ 15,000 total |
| Canvas pixel ratio | `dpr={[1, 1.5]}` |
| Render loop | `frameloop="demand"` — not continuous |
| Loading | `next/dynamic` with `ssr: false` — exercise detail page only |
| Primary highlight | `#f5a623` amber, `emissiveIntensity: 0.55` |
| Secondary highlight | `#4db8e8` steel blue, `emissiveIntensity: 0.35` |
| Background | CSS `background: #0d0f12` on container div — not Three.js |
| Auto-rotate speed | `0.8` (slow) |
| WebGL fallback | SVG muscle diagram (real DOM — not canvas) |
| Reduced-motion | `autoRotate: false` — drag still enabled |
| Target mobile fps | 30fps minimum — Samsung Galaxy A54 |

**3D model selection:** Deferred to Phase 7 kickoff. Evaluate Z-Anatomy vs MakeHuman+procedural against `Anatomy_Viewer_Requirements.md §9` matrix.

---

## Part 7 — Motion Review Checklist for Phase 7

@qa uses this checklist in Phase 8. @frontend self-checks before marking Phase 7 complete.

### Marketing Page
- [ ] Hero parallax: all layers move at correct relative speeds (`data-parallax-depth` values)
- [ ] Hero wordmark fades by 40% scroll; content fades by 60%
- [ ] Feature cards: stagger reveal triggers at `top 78%`, one-shot
- [ ] Program showcase: pin engages correctly, horizontal track moves smoothly
- [ ] Education preview: subtle parallax (±60px range)
- [ ] Scroll progress bar: accurately tracks page scroll position
- [ ] All GSAP animations: correct behavior with `prefers-reduced-motion: reduce`
- [ ] GSAP loaded only on marketing routes — verify in browser Network tab

### Authenticated App
- [ ] All route transitions: `pageFadeIn`, 250ms, `--ease-sharp`
- [ ] All card hovers: `translateY(-2px)`, 200ms
- [ ] Set completion: `checkFill` 100ms, row dims to 0.55 opacity 200ms
- [ ] Last set: `amberPulse` fires once after checkFill
- [ ] Rest timer: arc animates linearly, color shifts to steel blue at final 10s
- [ ] Rest timer (reduced-motion): arc hidden, countdown text remains
- [ ] Exercise screen transitions: enter/exit slide ±24px, 250ms
- [ ] Exercise screen (reduced-motion): fade only, no translate
- [ ] Strength chart: line draws in 600ms, dots stagger 20ms each
- [ ] PR star: `starBurst` + `amberPulse` sequence on new PR
- [ ] Skeletons: shimmer on all loading states

### Anatomy Viewer
- [ ] Model loads without blocking page interactivity
- [ ] Auto-rotate at correct speed (0.8)
- [ ] Drag-to-rotate works on touch and pointer
- [ ] Muscle highlights update within 1 frame on exercise switch
- [ ] Muscle label appears on tap/click of highlighted group
- [ ] SVG fallback shown on browsers without WebGL
- [ ] `prefers-reduced-motion`: auto-rotate disabled, drag still works
- [ ] Canvas has correct `aria-label`
- [ ] Legend ("PRIMARY / SECONDARY") is real DOM text, not canvas
- [ ] Frame rate: 60fps desktop, ≥ 30fps mid-range Android
