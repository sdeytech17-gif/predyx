# Workflow: Phase 1 — UX Research & Competitor Analysis

> **Owner:** @ux
> **Orchestrator:** @pm
> **Status:** Ready to begin — awaiting human instruction
> **Inputs:** Approved Phase 0 artifacts
> **Outputs:** Phase 1 Research Report (must be approved before Phase 2 begins)

---

## Phase 1 Objectives

1. Establish a factual evidence base for brand and design decisions.
2. Understand the competitive fitness platform landscape.
3. Document fitness UX patterns and mental models.
4. Produce testable user journey hypotheses.

---

## Step-by-Step Workflow

### Step 1 — Research Framework Definition
**Owner:** @ux
**Action:** Define the research questions and scope before conducting any analysis.
**Output:** `production_artifacts/01_research/Research_Framework.md`
**Must cover:**
- What competitors will be analyzed (and why)
- What UX dimensions will be evaluated
- What fitness domain patterns are of interest
- What hypotheses about PREDYX users will be tested

---

### Step 2 — Competitor Identification
**Owner:** @ux
**Action:** Identify 4–6 fitness platform competitors across different tiers (premium, mainstream, niche).
**Output:** Competitor shortlist in `production_artifacts/01_research/Competitor_Analysis.md`
**Rules:**
- Must be real, publicly accessible products.
- Must cover a range: at minimum, one premium/cinematic, one mainstream, one mobile-first.
- Do NOT fabricate products or features.

---

### Step 3 — Competitor UX Analysis
**Owner:** @ux
**Action:** Analyze each competitor across:
- Information architecture and navigation
- Primary user flows (onboarding, training, tracking)
- Content strategy and exercise library structure
- Mobile vs. desktop experience quality
- Interaction patterns and micro-interactions
- Performance and load characteristics (observable, not invented)
**Output:** `production_artifacts/01_research/Competitor_Analysis.md` (full)

---

### Step 4 — Competitor Visual Analysis
**Owner:** @ux
**Action:** Document (do not evaluate for copying):
- Color system and mood
- Typography choices
- Imagery and photography style
- Motion and animation approach
- 3D or parallax usage (if any)
**Output:** Appended to `production_artifacts/01_research/Competitor_Analysis.md`

---

### Step 5 — Fitness UX Patterns Documentation
**Owner:** @ux
**Action:** Document established and observed UX patterns in the fitness domain:
- How users navigate workout content
- Common workout selection flows
- Progress and tracking patterns
- Motivational UX patterns (streaks, achievements)
- Onboarding patterns
**Output:** `production_artifacts/01_research/Fitness_UX_Patterns.md`
**Rules:** Label each pattern as `[OBSERVED]` (seen in competitors), `[INFERRED]` (reasonable inference), or `[HYPOTHESIS]` (to be validated).

---

### Step 6 — User Journey Hypotheses
**Owner:** @ux
**Action:** Develop hypothetical user journeys for the PREDYX audience hypotheses defined in the Project Charter.
**Output:** `production_artifacts/01_research/User_Journey_Hypotheses.md`
**Format:** Journey maps for at minimum:
- Pre-workout: Discovery → Onboarding → First session
- During workout: Session navigation → Instruction → Tracking
- Post-workout: Summary → Progress → Re-engagement
**Rules:** All journeys are `[HYPOTHESIS]` until validated. Must not invent user quotes or research data.

---

### Step 7 — Gap and Opportunity Analysis
**Owner:** @ux
**Action:** Based on steps 3–6, identify observable UX gaps in the competitive landscape that PREDYX could address.
**Output:** Appended to `production_artifacts/01_research/Phase1_Research_Report.md`
**Rules:** Opportunities must be grounded in observed competitor behavior, not invented data.

---

### Step 8 — Phase 1 Research Report
**Owner:** @ux
**Action:** Consolidate all Phase 1 outputs into a single report for @pm review.
**Output:** `production_artifacts/01_research/Phase1_Research_Report.md`
**Must include:**
- Executive summary
- Competitor analysis summary
- Key fitness UX patterns identified
- User journey hypotheses
- Gaps and opportunities
- Unresolved questions for Phase 2
- Explicit evidence vs. assumption labeling throughout

---

### Step 9 — @pm Review
**Owner:** @pm
**Action:** Review Phase 1 Research Report for completeness, evidence discipline, and readiness to brief @brand.
**Output:** Approval or revision request logged in `Decision_Log.md`

---

## Exit Criteria (Phase 1 Complete When)

- [ ] Competitor analysis covers ≥ 4 real platforms
- [ ] Fitness UX patterns documented with evidence labels
- [ ] User journey hypotheses documented for ≥ 3 scenarios
- [ ] Gap analysis grounded in observed behavior
- [ ] Phase 1 Research Report approved by @pm
- [ ] No invented data, quotes, or statistics

---

## Handoff to Phase 2

`@brand` receives:
- `production_artifacts/01_research/Phase1_Research_Report.md`
- `production_artifacts/01_research/Competitor_Analysis.md`
- `production_artifacts/01_research/Fitness_UX_Patterns.md`
- `production_artifacts/01_research/User_Journey_Hypotheses.md`
