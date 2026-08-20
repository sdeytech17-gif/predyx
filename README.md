# PREDYX — Precision Human Performance

> **Version:** 1.0.0 (Production Release Candidate)  
> **Framework:** Next.js 15 (App Router) • React 19 • TypeScript • GSAP 3.12  
> **Design Language:** Apex Precision  

---

## 1. Overview

PREDYX is a premium, cinematic, technology-driven fitness and wellness platform engineered for elite exercise education, dynamic biomechanics, and intelligent performance tracking.

Built with an artifact-first multi-agent product development methodology, every interface component, motion curve, and visual layer is rigorously specified across Phases 0 through 9.

---

## 2. Platform Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Static site generation (SSG), optimized routing, server-rendered layouts |
| **Language** | TypeScript 5.7 (Strict) | 100% type safety across models, tokens, and props |
| **Motion** | GSAP 3.12 + ScrollTrigger | 4-tier progressive motion ladder (CSS → GSAP → 2.5D Parallax → WebGL) |
| **Design System** | Custom CSS Custom Properties | *Apex Precision* dark obsidian palette (`#08090a`), Apex Amber (`#f5a623`), Steel Blue (`#4db8e8`) |
| **Typography** | `next/font/google` | Self-hosted *Instrument Sans* (display) and *JetBrains Mono* (telemetry) |
| **Icons** | `@phosphor-icons/react` | Clean geometric vector iconography |
| **Accessibility** | WCAG 2.1 Level AA | High-contrast ratios (7.4:1 to 18.2:1), full keyboard navigation, `prefers-reduced-motion` |

---

## 3. Repository Structure

```
predyx/
├── AGENTS.md                      # Multi-agent operating manual & human approval gates
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript path mappings (@/*)
├── next.config.mjs                # Production config & enterprise security headers
├── vercel.json                    # Edge caching and CDN headers
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout, Google Fonts, SEO metadata, GSAPProvider
│   ├── page.tsx                   # Marketing landing page composition
│   ├── components/
│   │   ├── motion/                # GSAPProvider & ScrollTrigger contexts
│   │   ├── ui/                    # Button, Card, Tag, ScrollProgress primitives
│   │   └── marketing/             # Navbar, HeroSection, FeatureSection, ProgramShowcase, EducationPreview, TelemetrySection, Footer
│   └── hooks/                     # usePrefersReducedMotion and helper hooks
├── public/                        # Static assets (9 approved Phase 5 visuals, vector favicons, robots.txt, sitemap.xml)
├── styles/                        # Design tokens (tokens.css), reset (reset.css), globals (globals.css)
├── tools/                         # Automated visual and functional verification scripts
└── production_artifacts/          # Permanent record of all approved project phases
    ├── 00_project/                # Charter, Decision Log, Risk Register, Status, Release Notes
    ├── 01_research/               # UX Research, Competitor Analysis, Journey Maps
    ├── 02_brand/                  # Brand Strategy, Positioning, Voice & Tone
    ├── 03_ux_ui/                  # Design System Specification, Wireframes, User Flows
    ├── 04_product/                # Platform Architecture, Data Models, API Contracts
    ├── 05_visual_assets/          # Visual Asset Inventory & Sourcing Plan
    ├── 06_motion_3d/              # Motion Specifications & 3D Anatomy Requirements
    ├── 07_engineering/            # Frontend Implementation specifications
    └── 08_qa/                     # QA Test Plan, Reports (Functional, Visual, Motion, A11y, Performance), Defect Log
```

---

## 4. Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build

# Start local production server
npm run start
```

---

## 5. Deployment Guide (GitHub → Vercel)

1. Push this repository to GitHub or GitLab:
   ```bash
   git init
   git add .
   git commit -m "feat: PREDYX V1.0.0 production release"
   git remote add origin https://github.com/<your-username>/predyx.git
   git branch -M main
   git push -u origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new).
3. Import the `predyx` repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **Deploy**. Vercel will build and assign your live production domain (e.g. `https://predyx.vercel.app`).
