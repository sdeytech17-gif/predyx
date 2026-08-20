# PREDYX — Defect Log

> **Version:** 1.0.0
> **Phase:** 8 — Quality Assurance
> **Author:** @qa
> **Status:** Active / All Discovered Defects Resolved

---

## Severity Classification

- **P0 (Blocking):** Work stops; production build broken or app crash.
- **P1 (Critical):** Core functionality broken or major accessibility failure.
- **P2 (Major):** Visual defect, animation malfunction, or responsive overflow.
- **P3 (Minor):** Cosmetic inconsistency, minor typography alignment, or non-blocking warning.

---

## Defect Inventory & Resolution Status

| Defect ID | Severity | Area | Description | Resolution Status | Resolution Details |
|---|---|---|---|---|---|
| **DEF-001** | P0 | Build / Config | PowerShell UTF-8 BOM byte (`\uFEFF`) in `package.json` broke Next.js build parser | ✅ Resolved | Stripped BOM across all workspace files with Node.js script |
| **DEF-002** | P1 | Dependencies | `Activity` icon missing from `@phosphor-icons/react` bundle | ✅ Resolved | Replaced with official `Pulse` icon across all components |
| **DEF-003** | P1 | Motion / GSAP | Child `useEffect` executed before root `GSAPProvider` plugin registration, emitting hydration warnings | ✅ Resolved | Module-level `gsap.registerPlugin(ScrollTrigger)` added to all animated modules |
| **DEF-004** | P3 | Assets | Missing `favicon.ico` triggered 404 console log | ✅ Resolved | Generated vector geometric SVG and ICO favicons in `public/` |
| **DEF-005** | P2 | Next/Image | Lazy-loaded off-screen images in horizontal track delayed hydration check | ✅ Resolved | Verified image response headers (HTTP 200) and full scroll decoding |

---

## Summary Metrics

- **Total Defects Identified:** 5
- **Resolved:** 5 (100%)
- **Open P0/P1/P2 Blockers:** 0
- **Release Status:** Ready for Phase 9 Release Gate
