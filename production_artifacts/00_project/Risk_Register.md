# PREDYX — Risk Register

> **Version:** 0.1.0
> **Phase:** 0 — Initial Risk Identification
> **Date:** 2026-08-17
> **Owner:** @pm
> **Review Cadence:** Updated at end of each phase

---

## Risk Rating Scale

| Severity | Definition |
|---|---|
| **Critical** | Could stop the project or cause serious harm |
| **High** | Could significantly delay delivery or degrade quality |
| **Medium** | Could cause rework or partial scope reduction |
| **Low** | Minor impact; easily managed |

| Likelihood | Definition |
|---|---|
| **Very Likely** | Expected to occur without intervention |
| **Likely** | More than 50% chance of occurring |
| **Possible** | Realistic but not expected |
| **Unlikely** | Could occur but unlikely without specific triggers |

---

## Risk Register

---

### RISK-001 — Unclear Product Positioning

| Field | Value |
|---|---|
| **Category** | Strategy |
| **Severity** | High |
| **Likelihood** | Very Likely (pre-research) |
| **Phase Introduced** | 0 |
| **Owner** | @brand, @ux |

**Description:**
PREDYX has no validated positioning, target audience, or competitive differentiation as of Phase 0. All audience and market assumptions are hypotheses. If Phase 1 research reveals that the proposed positioning is crowded, undifferentiated, or misaligned with real user needs, significant rework in Phase 2 will be required.

**Impact:** Could invalidate brand direction and cause Phase 2 restart.

**Mitigation:**
- Phase 1 research must be rigorous and honest — no invented data.
- At least 2 competitor archetypes must be analyzed before brand work begins.
- Brand direction must not be finalized until research is reviewed and approved.

**Status:** `OPEN` — to be reassessed at end of Phase 1.

---

### RISK-002 — 3D / Parallax Overuse Degrading Mobile Performance

| Field | Value |
|---|---|
| **Category** | Technical / Performance |
| **Severity** | High |
| **Likelihood** | Likely |
| **Phase Introduced** | 0 |
| **Owner** | @parallax, @frontend, @qa |

**Description:**
A cinematic visual direction carries a risk of over-investing in 3D and parallax effects that impose severe performance penalties on mobile devices (which are expected to be a primary access channel). WebGL and complex animations can cause high CPU/GPU usage, dropped frames, and inflated LCP on mid-range and low-end devices.

**Impact:** Poor Core Web Vitals, poor mobile UX, potential exclusion of users on low-end hardware.

**Mitigation:**
- Each 3D element must be individually justified by `@parallax` in Phase 4.
- A performance budget must be defined before implementation.
- Every 3D element must have a defined fallback for low-power devices.
- Mobile performance must be QA'd on real mid-range hardware in Phase 8.

**Status:** `OPEN` — managed via Phase 4 performance budget gate.

---

### RISK-003 — AI-Generated Visual Asset Quality Inconsistency

| Field | Value |
|---|---|
| **Category** | Visual Quality |
| **Severity** | Medium |
| **Likelihood** | Likely |
| **Phase Introduced** | 0 |
| **Owner** | @imagegen |

**Description:**
AI-generated imagery can produce inconsistent style, anatomy, lighting, and brand coherence across a large asset set. A fitness platform requires images of athletes and motion that are anatomically correct and tonally consistent. Individual strong images do not guarantee a coherent visual system.

**Impact:** Visual system that feels fragmented; assets that require significant manual correction or regeneration.

**Mitigation:**
- Define a strict visual style guide before any asset generation begins (Phase 5 prerequisite).
- Generate test batches early and validate consistency before full production.
- Establish clear acceptance criteria for each asset category.
- Have `@imagegen` maintain an asset manifest tracking style parameters.

**Status:** `OPEN` — managed in Phase 5 planning.

---

### RISK-004 — Motion Sickness / Vestibular Sensitivity Risk

| Field | Value |
|---|---|
| **Category** | Accessibility / Health |
| **Severity** | Medium |
| **Likelihood** | Possible |
| **Phase Introduced** | 0 |
| **Owner** | @parallax, @frontend, @qa |

**Description:**
Heavy parallax, scroll-jacking, and cinematic motion effects can trigger vestibular disorders and motion sickness in sensitive users. This is a documented accessibility concern. A fitness audience may include users with health sensitivities.

**Impact:** Exclusion of users with vestibular disorders; accessibility non-compliance; potential negative user experience.

**Mitigation:**
- All motion systems must implement `prefers-reduced-motion` media query as a first-class requirement.
- Reduced-motion mode must be a complete, quality alternative — not an afterthought.
- Motion effects must be calibrated for comfort before Phase 7 implementation.
- Phase 8 QA must explicitly test reduced-motion mode.

**Status:** `OPEN` — systemic mitigation built into AGENTS.md operating rules.

---

### RISK-005 — Scope Creep into Ecommerce / Subscription Infrastructure

| Field | Value |
|---|---|
| **Category** | Scope |
| **Severity** | Medium |
| **Likelihood** | Possible |
| **Phase Introduced** | 0 |
| **Owner** | @pm |

**Description:**
Fitness platforms often evolve to include subscription billing, ecommerce, coach marketplaces, and payment processing. These are complex engineering concerns requiring significant backend infrastructure, legal compliance, and payment provider integration. If introduced mid-project, they could derail Phase 7 timelines.

**Impact:** Significant scope increase; potential delivery failure; backend complexity.

**Mitigation:**
- Ecommerce and subscription are explicitly out of scope in v1.
- Any proposal to add subscription functionality must be reviewed as a formal scope change with `@pm` approval.
- Phase 4 architecture must be designed to accommodate future subscription without requiring a rewrite.

**Status:** `OPEN` — actively managed by scope boundary in Project Charter.

---

### RISK-006 — Fitness / Health Content Liability

| Field | Value |
|---|---|
| **Category** | Legal / Compliance |
| **Severity** | High |
| **Likelihood** | Possible |
| **Phase Introduced** | 0 |
| **Owner** | @brand, @pm |

**Description:**
Fitness and wellness content can stray into territory that implies medical diagnosis, treatment recommendations, or health claims. Inaccurate or overclaimed fitness content can create legal liability and user harm.

**Impact:** Legal exposure; user safety concerns; brand damage.

**Mitigation:**
- The Fitness Safety Boundary is explicitly defined in AGENTS.md.
- Brand messaging must not make medical claims.
- Any feature that touches health data (e.g., heart rate zones, caloric needs) must be reviewed before specification.
- Content guidelines must be defined by `@brand` in Phase 2.

**Status:** `OPEN` — systemic mitigation in AGENTS.md and Project Charter.

---

### RISK-007 — Privacy and User Data Compliance

| Field | Value |
|---|---|
| **Category** | Legal / Compliance |
| **Severity** | High |
| **Likelihood** | Likely (if personal data collected) |
| **Phase Introduced** | 0 |
| **Owner** | @product |

**Description:**
A fitness and performance tracking platform by definition collects personal data (workout logs, body metrics, progress data). This triggers obligations under GDPR, CCPA, and other privacy regulations depending on jurisdiction. Fitness data may be classified as sensitive health data in some jurisdictions.

**Impact:** Regulatory non-compliance; legal exposure; user trust damage.

**Mitigation:**
- Privacy architecture must be defined in Phase 4 before any data model is finalized.
- Analytics provider selection must be evaluated against privacy requirements.
- Data minimization principles should be applied by default.
- Jurisdiction scope must be defined as part of Phase 4.

**Status:** `OPEN` — flagged for Phase 4 architecture planning.

---

### RISK-008 — Mobile Experience Degradation from Desktop-First Design Drift

| Field | Value |
|---|---|
| **Category** | UX / Quality |
| **Severity** | Medium |
| **Likelihood** | Possible |
| **Phase Introduced** | 0 |
| **Owner** | @ui, @frontend |

**Description:**
Cinematic and 3D-heavy designs are often conceived and reviewed at desktop resolutions. Without rigorous mobile-first discipline, design decisions made at 1440px can produce poor experiences at 375px, requiring expensive rework late in the project.

**Impact:** Poor mobile UX; expensive design and engineering rework in Phase 8 or 9.

**Mitigation:**
- Mobile-first is a non-negotiable requirement (see AGENTS.md Section 8).
- All wireframes must start at 375px.
- Design reviews must include mobile viewport at every review.
- QA must test on real mobile hardware, not just browser dev tools.

**Status:** `OPEN` — systemic mitigation in AGENTS.md.

---

### RISK-009 — Asset Consistency Across Phases

| Field | Value |
|---|---|
| **Category** | Visual Quality |
| **Severity** | Medium |
| **Likelihood** | Possible |
| **Phase Introduced** | 0 |
| **Owner** | @imagegen, @ui |

**Description:**
Visual assets generated in Phase 5 may not align precisely with the design system finalized in Phase 3, especially if brand direction evolves or design tokens change after asset generation has begun. This can create costly regeneration cycles.

**Impact:** Visual inconsistency; asset regeneration cost; timeline delays.

**Mitigation:**
- Phase 5 must not begin until Phase 3 design system artifacts are approved.
- A visual asset brief must be produced from Phase 3 outputs before `@imagegen` begins work.
- All assets must be validated against the design system before approval.

**Status:** `OPEN` — mitigated by phase dependency rules.

---

### RISK-010 — "Predator-Inspired" Visual Direction Being Misinterpreted or Off-Brand

| Field | Value |
|---|---|
| **Category** | Brand / Strategy |
| **Severity** | Medium |
| **Likelihood** | Possible |
| **Phase Introduced** | 0 |
| **Owner** | @brand |

**Description:**
The "predator-inspired energy" visual direction is an early-stage hypothesis. It could be interpreted as aggressive, exclusionary, or misaligned with the wellness dimension of the product, potentially alienating key audience segments (especially if research reveals that fitness beginners are a primary audience).

**Impact:** Brand strategy mismatch; audience alienation; need for creative direction reset.

**Mitigation:**
- The visual direction is explicitly marked as a hypothesis and NOT finalized.
- `@brand` must evaluate this direction against research findings from Phase 1.
- At least 2 alternative creative directions should be proposed in Phase 2 before direction is selected.
- Human approval gate ensures final brand direction is confirmed before any creative production.

**Status:** `OPEN` — managed at Phase 2 brand approval gate.

---

*Risk Register is a living document. All new risks must be added here when identified.*
