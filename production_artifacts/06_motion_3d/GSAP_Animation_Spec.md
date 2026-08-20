# PREDYX — GSAP Animation Specification

> **Version:** 1.0.0
> **Phase:** 6 — Final Motion / 3D Specification
> **Date:** 2026-08-18
> **Owner:** @parallax
> **Purpose:** Implementation-ready GSAP specification for all landing page animations. @frontend consumes this directly in Phase 7.

---

## Scope

GSAP is **marketing-only**. It is dynamically imported exclusively in the `(marketing)` route group (`app/(marketing)/layout.tsx`) and is **never loaded** in the authenticated app.

All authenticated app motion is CSS-only (see `CSS_Motion_Tokens.md`).

---

## 1. GSAP Setup

### 1.1 Package Requirements

```json
{
  "gsap": "^3.12.x"
}
```

Plugins used:
- `ScrollTrigger` — pinning, scroll-driven animations
- No `SplitText`, no `Physics2D`, no premium plugins required

### 1.2 GSAPProvider Component

```tsx
// lib/gsap/GSAPProvider.tsx
'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect prefers-reduced-motion globally
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.globalTimeline.timeScale(0) // Stops all GSAP instantly
      // OR: gsap.set(targets, { clearProps: 'all' }) per component
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return <>{children}</>
}
```

### 1.3 Loading Strategy

```tsx
// app/(marketing)/layout.tsx
import dynamic from 'next/dynamic'

const GSAPProvider = dynamic(
  () => import('@/lib/gsap/GSAPProvider').then(m => ({ default: m.GSAPProvider })),
  { ssr: false }
)

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <GSAPProvider>
      {children}
    </GSAPProvider>
  )
}
```

---

## 2. Hero Section — 2.5D Parallax

### 2.1 HTML Structure

```tsx
// components/marketing/HeroSection/HeroSection.tsx
<section id="hero" className={styles.hero} ref={heroRef}>
  {/* Layer 0 — static background (no animation) */}
  <div className={styles.heroBackground} aria-hidden="true">
    <Image src={heroImg} alt="" fill priority quality={85} />
  </div>

  {/* Layer 1 — ambient noise overlay (static) */}
  <div className={styles.heroNoise} aria-hidden="true" />

  {/* Layer 2 — geometric amber accent line */}
  <div className={styles.heroAccentLine} aria-hidden="true" data-parallax-depth="0.3" />

  {/* Layer 3 — PREDYX wordmark */}
  <div className={styles.heroWordmark} data-parallax-depth="0.7">
    <Image src={wordmarkSvg} alt="PREDYX" width={280} height={72} priority />
  </div>

  {/* Layer 4 — tagline + CTA (closest to user) */}
  <div className={styles.heroContent} data-parallax-depth="0.9">
    <p className={styles.heroTagline}>Train with precision.</p>
    <Button href="/signup" variant="primary" size="lg">Start training</Button>
    <Button href="/programs" variant="ghost" size="lg">Explore programs</Button>
  </div>
</section>
```

### 2.2 GSAP Animation Code

```tsx
// HeroSection.tsx — useEffect hook
useEffect(() => {
  if (prefersReducedMotion) return  // Full static fallback

  const ctx = gsap.context(() => {
    const hero = heroRef.current
    if (!hero) return

    // Collect parallax layers
    const layers = hero.querySelectorAll('[data-parallax-depth]')

    layers.forEach((layer) => {
      const depth = parseFloat((layer as HTMLElement).dataset.parallaxDepth ?? '0.5')

      gsap.to(layer, {
        y: () => -(window.innerHeight * 0.4 * (1 - depth)),  // Deeper layers move less
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,  // Tied to scroll position, not duration
        }
      })
    })

    // Wordmark fade out as hero exits
    gsap.to(hero.querySelector('[data-parallax-depth="0.7"]'), {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '40% top',  // Faded by 40% scroll through hero
        scrub: true,
      }
    })

    // Content (tagline + CTA) fade out slightly later
    gsap.to(hero.querySelector('[data-parallax-depth="0.9"]'), {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: '15% top',
        end: '60% top',
        scrub: true,
      }
    })

  }, heroRef)

  return () => ctx.revert()
}, [prefersReducedMotion])
```

### 2.3 Reduced Motion Fallback

When `prefers-reduced-motion: reduce` is detected:
- No parallax depth — all layers render at `y: 0`, `opacity: 1`
- Wordmark and CTA remain fully visible
- Scroll does not affect the hero in any way
- `GSAPProvider` sets `gsap.globalTimeline.timeScale(0)` — all GSAP stops

---

## 3. Feature Pillars Section — Stagger Reveal

### 3.1 HTML Structure

```tsx
<section id="features" className={styles.features} ref={featuresRef}>
  <div className={styles.featuresGrid}>
    {features.map((feature, i) => (
      <div key={feature.id} className={styles.featureCard} data-feature-card>
        <div className={styles.featureImage}>
          <Image src={feature.image} alt={feature.imageAlt} fill />
        </div>
        <h3 className={styles.featureTitle}>{feature.title}</h3>
        <p className={styles.featureBody}>{feature.body}</p>
      </div>
    ))}
  </div>
</section>
```

### 3.2 GSAP Animation Code

```tsx
useEffect(() => {
  if (prefersReducedMotion) return

  const ctx = gsap.context(() => {
    const cards = featuresRef.current?.querySelectorAll('[data-feature-card]')
    if (!cards?.length) return

    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',        // Matches --ease-sharp character
        stagger: 0.1,              // 100ms between cards
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 78%',        // Trigger when 78% down viewport
          toggleActions: 'play none none none',  // One-shot: plays on enter, no reverse
        }
      }
    )
  }, featuresRef)

  return () => ctx.revert()
}, [prefersReducedMotion])
```

### 3.3 Reduced Motion Fallback

Cards are visible at full opacity from initial load — no reveal animation. `opacity: 1; transform: none` in CSS default state; GSAP `fromTo` is never called.

---

## 4. Program Showcase — Horizontal Scroll Pin

### 4.1 Design

The program showcase section is pinned during a horizontal scroll of 3–5 program cards. The user scrolls vertically but program cards translate horizontally. Unpins after all cards have passed.

### 4.2 HTML Structure

```tsx
<section id="programs-showcase" className={styles.showcase} ref={showcaseRef}>
  <div className={styles.showcaseTrack} ref={trackRef}>
    {programs.map(program => (
      <ProgramCard key={program.id} program={program} />
    ))}
  </div>
</section>
```

### 4.3 GSAP Animation Code

```tsx
useEffect(() => {
  if (prefersReducedMotion) return

  const ctx = gsap.context(() => {
    const track = trackRef.current
    const showcase = showcaseRef.current
    if (!track || !showcase) return

    // Calculate total horizontal scroll distance
    const totalWidth = track.scrollWidth - showcase.offsetWidth

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: showcase,
        start: 'top top',
        end: () => `+=${totalWidth}`,    // Pin duration = card width × card count
        pin: true,                        // Pin the section during horizontal scroll
        scrub: 1,                         // 1s lag for smooth feel
        anticipatePin: 1,
        invalidateOnRefresh: true,        // Recalc on resize
      }
    })
  }, showcaseRef)

  return () => ctx.revert()
}, [prefersReducedMotion])
```

### 4.4 Reduced Motion Fallback

Horizontal pin is disabled entirely. Cards display in a **vertical stacked list** with a GSAP stagger-reveal (same as Feature Pillars — Rung ③). The CSS module must include a `.showcase--reduced` modifier that switches from horizontal to vertical layout.

```tsx
// In component:
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
// className={prefersReducedMotion ? styles.showcaseReduced : styles.showcase}
```

---

## 5. Education Preview Section — 2.5D Parallax

### 5.1 Design

The anatomy viewer education teaser uses a **static screenshot** of the anatomy UI (from Phase 5 marketing assets) with layered parallax depth — not the real Three.js viewer.

### 5.2 GSAP Animation Code

```tsx
useEffect(() => {
  if (prefersReducedMotion) return

  const ctx = gsap.context(() => {
    const layers = educationRef.current?.querySelectorAll('[data-edu-depth]')
    if (!layers?.length) return

    layers.forEach(layer => {
      const depth = parseFloat((layer as HTMLElement).dataset.eduDepth ?? '0.5')

      gsap.to(layer, {
        y: () => -(60 * (1 - depth)),  // Subtle ±60px range — tighter than hero
        ease: 'none',
        scrollTrigger: {
          trigger: educationRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    })
  }, educationRef)

  return () => ctx.revert()
}, [prefersReducedMotion])
```

Layer depths:
- Background card (`data-edu-depth="0.2"`) — moves least
- Anatomy image (`data-edu-depth="0.5"`) — midpoint
- UI label overlays (`data-edu-depth="0.75"`) — more parallax depth
- Tagline callout (`data-edu-depth="0.9"`) — most depth

---

## 6. Scroll Progress Indicator

```tsx
// components/marketing/ScrollProgress/ScrollProgress.tsx
// Native scroll-timeline primary; GSAP fallback for older browsers

useEffect(() => {
  const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()')
  if (supportsScrollTimeline || prefersReducedMotion) return

  // GSAP fallback
  const bar = progressRef.current
  if (!bar) return

  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      gsap.set(bar, { scaleX: self.progress, transformOrigin: 'left center' })
    }
  })
}, [prefersReducedMotion])
```

---

## 7. Headline Text Reveal (Optional — Phase 7 Decision)

This is specified but **not required for V1 launch**. Include if timeline allows.

```tsx
// Character-by-character reveal on hero headline
// Technique: split text by character via JS (no SplitText plugin — use manual span wrapping)

useEffect(() => {
  if (prefersReducedMotion) return

  const chars = headlineRef.current?.querySelectorAll('[data-char]')
  if (!chars?.length) return

  gsap.fromTo(chars,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.025,   // 25ms per character
      delay: 0.2,       // Brief pause before text appears
    }
  )
}, [prefersReducedMotion])
```

---

## 8. ScrollTrigger Configuration — Global Defaults

```tsx
// In GSAPProvider.tsx, after gsap.registerPlugin(ScrollTrigger):

ScrollTrigger.defaults({
  markers: process.env.NODE_ENV === 'development',  // Visual markers in dev only
})

// Refresh ScrollTrigger after fonts/images load (prevents offset errors)
window.addEventListener('load', () => ScrollTrigger.refresh())
```

---

## 9. Performance Notes

| Concern | Mitigation |
|---|---|
| Layout thrash on resize | `invalidateOnRefresh: true` on pinned sections |
| Multiple `useEffect` deps | Each section has its own `gsap.context()` — clean revert on unmount |
| GSAP bundle size | ~30KB gzipped — loaded only on marketing routes via `next/dynamic` |
| Scroll jank on mobile | `scrub: 1` adds 1s lag — reduces sharp jumps. Test on iPhone Safari specifically. |
| Pin spacer CLS | GSAP `pin` injects a spacer div — apply `anticipatePin: 1` to prevent layout shift |
