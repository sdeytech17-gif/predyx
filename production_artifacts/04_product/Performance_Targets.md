# PREDYX — Performance Targets

> **Version:** 1.0.0
> **Phase:** 4 — Product Architecture + 3D/Motion Planning
> **Date:** 2026-08-18
> **Owner:** @product
> **Status:** Complete — Formalizes AGENTS.md §10 hypotheses as targets

---

## Status Change

AGENTS.md §10 listed all performance metrics as `[HYPOTHESIS]`. This artifact **formally sets these as binding targets** for Phase 7 implementation and Phase 8 QA validation.

---

## Core Web Vitals Targets

| Metric | Definition | Mobile Target | Desktop Target | Priority |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | Time until largest visible content is rendered | < 2.5s | < 1.8s | P0 |
| **CLS** (Cumulative Layout Shift) | Visual stability — unexpected layout shifts | < 0.1 | < 0.05 | P0 |
| **INP** (Interaction to Next Paint) | Responsiveness of interactions | < 200ms | < 100ms | P0 |
| **FCP** (First Contentful Paint) | First meaningful paint | < 1.8s | < 1.2s | P1 |
| **TTFB** (Time to First Byte) | Server response time | < 800ms | < 600ms | P1 |
| **TTI** (Time to Interactive) | When app is fully interactive | < 3.5s | < 2.5s | P1 |

**Note:** INP has replaced FID (First Input Delay) in Core Web Vitals as of March 2024. AGENTS.md §10 lists FID — this document supersedes that with INP.

---

## Lighthouse Score Targets

| Category | Mobile | Desktop |
|---|---|---|
| Performance | ≥ 85 | ≥ 95 |
| Accessibility | ≥ 95 | ≥ 95 |
| Best Practices | ≥ 90 | ≥ 90 |
| SEO | ≥ 90 | ≥ 90 |

---

## Bundle Size Targets

| Bundle | Target (gzipped) |
|---|---|
| Main app JS (initial load) | < 150 KB |
| Marketing page JS | < 80 KB (before GSAP loads) |
| GSAP (async load) | ~30 KB — loaded after initial paint |
| React Three Fiber + Three.js (lazy) | ~180 KB — not in initial bundle |
| CSS (critical, inlined) | < 15 KB |
| CSS (total, deferred) | < 50 KB |

**Strategy:** Code splitting via Next.js route groups. Each dynamic import (`AnatomyViewer`, `GSAP`, charts) is loaded only on the page that needs it, after the page is interactive.

---

## Image Performance

| Context | Format | Size Target | Strategy |
|---|---|---|---|
| Hero / LCP image | AVIF (WebP fallback) | < 150 KB | next/image priority + preload |
| Program / workout covers | WebP | < 80 KB per image | next/image lazy |
| Exercise thumbnails | WebP | < 40 KB | next/image lazy |
| Anatomy model (GLTF/GLB) | Draco-compressed GLB | 300–600 KB | Cached after first load |
| Video (Mux HLS) | HLS adaptive bitrate | Mux managed | preload="none" — no cost until play |

---

## Mobile-Specific Targets

Testing baseline device: **mid-range Android** (Samsung Galaxy A54 or Pixel 6a equivalent)

| Concern | Target |
|---|---|
| Rest timer arc animation | 60fps on mid-range Android, CSS SVG only |
| AnatomyViewer on mobile | 30fps minimum, `dpr` capped at 1.5, `frameloop="demand"` |
| Set log input latency | < 50ms keyboard appearance to input ready |
| Touch target minimum | 44px (WCAG) — 56px in-session (Phase 1 requirement) |
| Session screen memory | < 200MB heap during active session |

---

## Session Experience Performance Rules

Active training session is the most performance-critical surface. Rules:

1. **No GSAP loaded** during active session — CSS micro-motion only
2. **No heavy re-renders** — Zustand slice for session state, components subscribe only to their slice
3. **Video preload strategy:** Next exercise video prefetches when previous exercise starts final set
4. **Rest timer:** Pure CSS SVG animation — zero JS involved during countdown
5. **Set logging latency:** Input value → localStorage persist → optimistic UI update — must feel instant (< 16ms)
6. **Screen Wake Lock:** `navigator.wakeLock.request('screen')` on session start; released on session complete/abandon

---

## Accessibility Performance

Accessibility is treated as a performance dimension — accessible experiences must not be degraded by performance optimizations.

| Requirement | Measurement |
|---|---|
| Screen reader announcement latency | < 100ms after action |
| Focus management on route change | Focus moves to `<h1>` of new page within 200ms |
| Reduced-motion alternative render | Must match LCP < 2.5s — no additional penalty for the reduced-motion path |
| Closed captions load time | Captions `.vtt` file loads with Mux asset — no additional request |

---

## Measurement Plan

All targets are validated in Phase 8 QA using:

| Tool | Purpose |
|---|---|
| Lighthouse CI (GitHub Action) | Automated score gating on every PR |
| Chrome DevTools Performance panel | Manual profiling of session flow and anatomy viewer |
| WebPageTest | Real-device mobile testing (throttled 4G) |
| Vercel Analytics | Real-user Web Vitals in production |
| Sentry Performance | Transaction tracing for API routes |

---

## Phase 8 Pass/Fail Criteria

| Metric | Pass | Conditional (requires @pm review) | Fail |
|---|---|---|---|
| Mobile LCP | < 2.5s | 2.5s – 3.5s | > 3.5s |
| CLS | < 0.1 | 0.1 – 0.25 | > 0.25 |
| Mobile INP | < 200ms | 200–500ms | > 500ms |
| Lighthouse Performance (mobile) | ≥ 85 | 75–84 | < 75 |
| Lighthouse Accessibility | ≥ 95 | 90–94 | < 90 |
| AnatomyViewer mobile fps | ≥ 30fps | 20–29fps | < 20fps |

Any **Fail** on a P0 metric triggers a P0 defect (AGENTS.md §13) — work stops until resolved.
