# PREDYX — QA Test Plan

> **Version:** 1.0.0
> **Phase:** 8 — Quality Assurance
> **Author:** @qa (QA, Performance & Accessibility Engineer)
> **Status:** Active

---

## 1. Scope & Objective

This test plan defines the testing methodology, validation matrices, and acceptance criteria for PREDYX V1, specifically validating the marketing landing page, core component architecture, design token enforcement, GSAP motion system, mobile responsiveness, accessibility, and Core Web Vitals performance.

---

## 2. Test Dimensions & Criteria

### 2.1 Functional Testing
- Navigation link scrolling and anchor targets (`#features`, `#programs`, `#anatomy`, `#telemetry`).
- Mobile hamburger menu state toggling (open/close/backdrop).
- Interactive 2.5D Anatomy Engine muscle selector tabs and stage pins.
- Program card CTA interaction and action targets.
- Dynamic telemetry readout synchronization.

### 2.2 Visual & Responsive Testing
- Multi-viewport layout integrity:
  - Mobile Base: 375px (iPhone SE / 13 mini)
  - Tablet: 768px (iPad portrait)
  - Desktop Standard: 1024px, 1280px, 1440px
- Zero horizontal overflow (`document.documentElement.scrollWidth <= window.innerWidth`).
- Precision design token consistency (*Apex Precision* colors, 1px borders, typography scales).
- Image aspect ratio stability and zero layout shift (CLS).

### 2.3 Animation & Motion Testing
- 4-tier motion ladder verification:
  - Rung 1: CSS keyframe and transition execution.
  - Rung 2: GSAP ScrollTrigger multi-depth parallax and stagger reveals.
  - Rung 3: Desktop pinned horizontal scroll track.
- `prefers-reduced-motion: reduce` compliance:
  - Complete deactivation of scroll-jacking and parallax translations.
  - Automatic fallback to static vertical program grid and instant CSS transitions.

### 2.4 Accessibility (WCAG 2.1 Level AA)
- Color contrast ratios:
  - Off-white on Obsidian: 18:1 (exceeds 4.5:1 requirement).
  - Amber on Obsidian: 7.2:1 (exceeds 4.5:1 requirement).
  - Steel Blue on Obsidian: 8.1:1 (exceeds 4.5:1 requirement).
- Keyboard navigation: Full tab sequence across 26 interactive elements with visible focus rings (`:focus-visible`).
- Screen reader semantic landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`).
- Touch target sizes $\ge 44\text{dp}$ ($\ge 48\text{dp}$ for primary CTAs).

### 2.5 Performance & Bundle Verification
- Next.js static prerendering (SSG) validation.
- Bundle budget: First Load JS $\le 200\text{kB}$.
- Core Web Vitals targets:
  - LCP (Largest Contentful Paint) $< 2.5\text{s}$.
  - CLS (Cumulative Layout Shift) $< 0.1$.
  - FID / INP $< 100\text{ms}$.
