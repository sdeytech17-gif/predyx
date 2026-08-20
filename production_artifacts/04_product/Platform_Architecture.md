# PREDYX — Platform Architecture

> **Version:** 1.0.0
> **Phase:** 4 — Product Architecture + 3D/Motion Planning
> **Date:** 2026-08-18
> **Owner:** @product
> **Status:** Complete — Awaiting Architecture Gate Approval

---

## Inputs Consumed

- DEC-016: Next.js + React + TypeScript (web-first, approved)
- DEC-017: Motion/3D technology escalation policy (approved)
- DEC-010: Backend API strategy (TBD → resolved here)
- DEC-004: CMS and content strategy (TBD → resolved here)
- Phase 3: Design System, Responsive Breakpoints, Interaction Patterns, IA

---

## Technology Stack

### Frontend

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG/ISR per route, server components, built-in image/font optimization |
| Language | **TypeScript** | Type safety across data models, API contracts, and component props |
| UI Library | **React 18+** | Server + client components, Suspense, concurrent rendering |
| Styling | **CSS Modules + CSS Custom Properties** | Design token system from Phase 3, zero-runtime, scoped styles |
| Animation | **GSAP 3** | ScrollTrigger for marketing, interface motion. Industry standard, `prefers-reduced-motion` support |
| 3D | **React Three Fiber + Three.js** | Exercise anatomy viewer only — component-isolated, lazy loaded |
| State (server) | **TanStack Query v5** | Data fetching, caching, background refresh, offline support |
| State (client) | **Zustand** | Session in-progress state, UI preferences, filter state |
| Forms | **React Hook Form + Zod** | Onboarding, set logging, profile — validated, performant |
| Icons | **Phosphor Icons (React)** | Phase 3 decision — geometric, consistent, accessible |
| Auth | **NextAuth.js v5 (Auth.js)** | JWT sessions, email/password, extensible for OAuth later |

### Backend / Data

| Layer | Technology | Rationale |
|---|---|---|
| Database | **PostgreSQL** via **Supabase** | Relational data model fits training/program structure; Supabase provides PostgreSQL + Auth + Storage + Realtime in one managed service |
| ORM | **Prisma** | Type-safe query builder, schema migrations, excellent TypeScript integration |
| API | **Next.js Route Handlers** (App Router) | Co-located with frontend, Edge Runtime support, type-safe with Zod validation |
| Authentication | **NextAuth.js + Supabase Auth adapter** | JWT access tokens, session management, Supabase row-level security |
| File Storage | **Supabase Storage** | Profile images, user-generated content (future) |
| Video Delivery | **Mux** | Adaptive bitrate streaming (HLS), automatic thumbnails, analytics, signed URLs |
| 3D Model Delivery | **CDN** (Cloudflare / Vercel Edge) | GLTF/GLB files served from edge, Draco compression |

### Infrastructure & Deployment

| Layer | Technology | Rationale |
|---|---|---|
| Hosting | **Vercel** | Native Next.js platform, edge functions, automatic CI/CD, analytics |
| CDN | **Vercel Edge Network + Cloudflare** | Static assets and 3D models via Cloudflare; Next.js routes via Vercel Edge |
| Database hosting | **Supabase** (hosted PostgreSQL) | Managed, automated backups, connection pooling via PgBouncer |
| Image optimization | **Vercel Image Optimization** (next/image) | Automatic WebP/AVIF conversion, lazy loading, responsive srcsets |
| Fonts | **next/font** (Google Fonts self-hosted) | Zero layout shift, preloaded, self-hosted for performance |
| Error tracking | **Sentry** | Frontend + backend error tracking, performance monitoring |
| Analytics | **Vercel Analytics** (privacy-first) | Page views, Web Vitals, no cookie banner required |

`[DECISION]` Vercel + Supabase is the V1 stack. Both are zero-ops for the team at this scale, integrate natively with Next.js/Prisma, and are extensible to production scale. Can migrate database to dedicated PostgreSQL (Railway, Neon, AWS RDS) post-launch if needed.

---

## Project Directory Structure

```
predyx/
├── app/                          ← Next.js App Router
│   ├── (marketing)/              ← Route group: public marketing pages (SSG)
│   │   ├── page.tsx              ← Landing page (/)
│   │   ├── about/
│   │   └── layout.tsx            ← Marketing layout (no auth, no nav bar)
│   │
│   ├── (auth)/                   ← Route group: authentication
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   │
│   ├── (app)/                    ← Route group: authenticated app
│   │   ├── layout.tsx            ← App shell (bottom tab bar, auth guard)
│   │   ├── home/page.tsx
│   │   ├── programs/
│   │   │   ├── page.tsx          ← Programs browse (ISR)
│   │   │   └── [slug]/page.tsx   ← Program detail (ISR)
│   │   ├── discover/
│   │   │   ├── page.tsx          ← Discover / workouts (ISR)
│   │   │   └── exercises/
│   │   │       ├── page.tsx      ← Exercise library (ISR)
│   │   │       └── [slug]/page.tsx ← Exercise detail (ISR)
│   │   ├── session/
│   │   │   ├── [id]/page.tsx     ← Active session (CSR — client component)
│   │   │   └── complete/page.tsx ← Session complete
│   │   ├── progress/page.tsx     ← Progress (CSR — user-specific)
│   │   └── profile/page.tsx      ← Profile settings
│   │
│   ├── api/                      ← Route Handlers (API endpoints)
│   │   ├── auth/[...nextauth]/   ← NextAuth handler
│   │   ├── programs/
│   │   ├── exercises/
│   │   ├── sessions/
│   │   ├── progress/
│   │   └── user/
│   │
│   ├── layout.tsx                ← Root layout (fonts, providers, global styles)
│   └── globals.css               ← Design token CSS custom properties
│
├── components/                   ← Shared React components
│   ├── ui/                       ← Primitive design system components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Tag/
│   │   └── ...
│   ├── layout/                   ← Layout components
│   │   ├── BottomTabBar/
│   │   ├── SideBar/
│   │   └── PageHeader/
│   ├── session/                  ← Session flow components
│   │   ├── ExerciseScreen/
│   │   ├── SetLogRow/
│   │   └── RestTimer/
│   ├── exercise/                 ← Exercise education components
│   │   ├── AnatomyViewer/        ← R3F 3D component (lazy loaded)
│   │   ├── VideoPlayer/
│   │   └── MovementCues/
│   ├── progress/                 ← Progress visualization components
│   │   ├── StrengthChart/
│   │   ├── VolumeChart/
│   │   └── PersonalRecords/
│   └── marketing/                ← Landing page components
│       ├── HeroSection/
│       ├── FeatureSection/
│       └── ProgramShowcase/
│
├── lib/                          ← Shared utilities and config
│   ├── db/                       ← Prisma client, queries
│   │   ├── prisma.ts
│   │   └── queries/
│   ├── auth/                     ← NextAuth config
│   ├── validations/              ← Zod schemas (shared client + server)
│   ├── hooks/                    ← Custom React hooks
│   │   ├── useSessionProgress.ts
│   │   ├── usePersonalRecords.ts
│   │   └── useRestTimer.ts
│   └── utils/                    ← Pure utility functions
│
├── prisma/
│   ├── schema.prisma             ← Database schema
│   └── seed.ts                  ← Content seed (exercises, programs, workouts)
│
├── public/                       ← Static assets
│   ├── models/                   ← GLTF anatomy models (Draco compressed)
│   ├── fonts/                    ← Self-hosted fonts
│   └── images/                  ← Static images (optimized via next/image)
│
├── styles/                       ← Global CSS
│   ├── tokens.css                ← All CSS custom properties (from Design System Spec)
│   ├── reset.css
│   └── typography.css
│
└── types/                        ← TypeScript type definitions
    ├── api.ts                    ← API request/response types
    ├── models.ts                 ← Domain model types
    └── session.ts                ← Session state types
```

---

## Rendering Strategy by Route

| Route | Strategy | Rationale |
|---|---|---|
| `/` (landing page) | **SSG** — build-time static | Marketing content never changes; fastest possible delivery |
| `/programs` | **ISR** (revalidate: 3600s) | Program catalog changes occasionally; stale-while-revalidate acceptable |
| `/programs/[slug]` | **ISR** (revalidate: 3600s) | Same rationale as above |
| `/discover` | **ISR** (revalidate: 3600s) | Workout catalog; acceptable to be slightly stale |
| `/discover/exercises` | **ISR** (revalidate: 3600s) | Exercise library is stable content |
| `/discover/exercises/[slug]` | **ISR** (revalidate: 86400s) | Exercise content is very stable; anatomy model is static |
| `/home` | **Server Component + Client hydration** | Today's session requires user context; server renders personalized data |
| `/session/[id]` | **CSR (Client Component)** | Fully dynamic, real-time set logging; no server render benefit |
| `/progress` | **CSR (Client Component)** | User-specific data, charts; all fetched client-side |
| `/profile` | **CSR (Client Component)** | Settings UI; user-specific |

---

## Authentication & Authorization

### Strategy: JWT via NextAuth.js

- Email + password authentication in V1 (social OAuth — Google/Apple — added post-launch)
- JWT stored in HTTP-only cookie (secure, not accessible via JS — XSS protection)
- Session validated server-side on every authenticated Route Handler call
- NextAuth middleware protects `(app)` route group — unauthenticated users redirected to `/login`

### Authorization Rules

| Resource | Rule |
|---|---|
| Programs, Exercises, Workouts | Public read (ISR — no auth required to view content) |
| Sessions | Owner-only (userId must match JWT sub) |
| Progress / PRs | Owner-only |
| Profile | Owner-only |
| Seed content (create/update) | Admin role only (future) |

---

## Content Strategy `[DECISION — D-004 resolved]`

For V1: **Seeded static content** — no headless CMS required.

Training programs, exercises, and workouts are defined as structured data in `prisma/seed.ts` and seeded into the database at deploy time.

**Rationale:**
- V1 content library is small and curated — a CMS would add infrastructure complexity with no immediate benefit
- Content can be updated by running a new seed migration
- Post-launch: evaluate Sanity or Contentful if content editors need to update programs without developer involvement

`[DECISION — D-013 resolved]` V1 content model: **curated, trainer-designed programs and exercises**. No AI-generated content. No third-party licensed content in V1. All content created and owned by PREDYX.

---

## Performance Architecture

### Image Strategy
- All images: `next/image` component — automatic WebP/AVIF, responsive srcsets, lazy loading
- Aspect ratios defined in CSS to prevent CLS (Cumulative Layout Shift)
- Priority flag on above-fold images only (hero, today's session card image)

### Font Strategy
- `next/font/google` — Instrument Sans (display) + JetBrains Mono (telemetry)
- Fonts preloaded, self-hosted, zero layout shift guaranteed by next/font
- CSS `font-display: swap` fallback: system-ui for display, monospace for data

### Video Strategy (Mux)
- All exercise instruction videos delivered via Mux HLS (adaptive bitrate)
- Autoplay: muted + `playsinline` + `preload="none"` (no bandwidth cost until play)
- Closed captions: .vtt tracks attached to all Mux assets
- Thumbnail: Mux-generated, displayed as poster frame

### Bundle Strategy
- 3D anatomy viewer (`AnatomyViewer`) — **dynamic import** with `next/dynamic`, `ssr: false`, loaded only on exercise detail pages
- GSAP — loaded only on marketing pages (landing) via dynamic import
- Chart components — dynamic import on progress page
- All heavy components: Suspense boundary with skeleton fallback

### Offline / Session Continuity
- Active session state persisted to **localStorage** via Zustand `persist` middleware
- If network drops mid-session, set logs continue saving locally
- On reconnect: sync session to server (optimistic update strategy)
- Screen Wake Lock API: `navigator.wakeLock.request('screen')` — prevents phone sleep during sessions

---

## Security Considerations

| Concern | Mitigation |
|---|---|
| XSS | JWT in HTTP-only cookies; React's JSX escaping |
| CSRF | NextAuth CSRF token on form submissions |
| SQL injection | Prisma parameterized queries — no raw SQL |
| Rate limiting | Vercel Edge middleware rate limiter on auth endpoints |
| Environment secrets | `.env.local` — never committed; Vercel environment variables |
| Video access | Mux signed URLs — videos not publicly guessable |

---

## Environment Variables Required

```
# Database
DATABASE_URL=
DIRECT_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Mux (video)
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
NEXT_PUBLIC_MUX_ENV_KEY=

# Sentry (monitoring)
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```
