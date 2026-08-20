# PREDYX — Accessibility Research

> **Version:** 1.0.0
> **Phase:** 1 — UX Research
> **Date:** 2026-08-17
> **Owner:** @ux
> **Target Compliance:** WCAG 2.1 Level AA minimum (per AGENTS.md §9)
> **Status:** Complete

---

## Purpose

Document the accessibility landscape across competitors, identify fitness-specific accessibility requirements, and define the non-negotiable accessibility constraints that must be embedded in all subsequent phases.

**Labels:**
- `[OBSERVED]` — Directly seen in competitor products or official documentation
- `[INFERRED]` — Reasonable interpretation of observed evidence
- `[HYPOTHESIS]` — Untested proposition
- `[REQUIREMENT]` — A non-negotiable constraint for PREDYX derived from AGENTS.md or this research

---

## 1. Competitor Accessibility Posture

| Platform | WCAG Standard | Key Implementations | Gaps / Limitations |
|---|---|---|---|
| **Peloton** | WCAG 2.1 A & AA `[O]` (documented) | Multi-language captions (live + on-demand), TalkBack on hardware screens, visual color-coded metric bands `[O]` | No prominent `prefers-reduced-motion` advertising `[I]` |
| **Nike Training Club** | Not publicly documented | Closed captions on all videos, audio coaching cues, adaptive workouts (wheelchair), WCAG contrast ratios, 44×44pt touch targets `[O]` | Accessibility commitment not as prominently surfaced as Apple `[I]` |
| **Apple Fitness+** | Apple system-level WCAG compliance `[O]` | Audio Hints (VoiceOver), ASL greetings in every workout, SDH subtitles (6+ languages), wheelchair tracking, dedicated programs (Older Adults, Pregnancy, Beginners), modifier trainer in 100% of videos, `prefers-reduced-motion` system-level `[O]` | Vision Pro fitness blocked by DRM + ergonomics `[O]` |
| **Whoop** | WCAG 2.1 AAA contrast on dark mode `[O]` | Pure black/white contrast (AAA), Dynamic Type support, haptic non-visual confirmations `[O]` | Dense graphical charts (HRV timelines) lack text-based data summaries for screen readers `[I]` |
| **Freeletics** | Not publicly documented | Loud countdown beeps, audio prompts, oversized workout buttons, high outdoor contrast `[O]` | Core HIIT flow relies on visual + physical agility — limited for severe visual/motor impairments `[I]` |
| **Strava** | Partial documentation | Dark mode (2024), giant numerals for outdoor visibility, Dynamic Type, 56dp+ Pause/Stop targets `[O]` | Not formally WCAG documented; social features have limited accessibility `[I]` |

### Key Observations
- `[OBSERVED]` Apple Fitness+ has the most comprehensive accessibility implementation across the competitor set, including ASL, audio hints, adaptive program design, and inclusive modifier trainers.
- `[OBSERVED]` All platforms provide some form of closed captioning for video content.
- `[INFERRED]` Fitness-specific accessibility requirements go beyond standard web accessibility — the physical exercise context creates unique needs (eyes-free, sweaty hands, gym noise, distance viewing).
- `[INFERRED]` Most platforms do not publicly document their `prefers-reduced-motion` implementation — this is an under-served area despite being technically straightforward.

---

## 2. Fitness-Specific Accessibility Context

### 2.1 The Physical Exercise Environment
Standard WCAG criteria assume stationary reading/interaction. Fitness UX must address:

| Challenge | Impact | Required Accommodation |
|---|---|---|
| **Sweaty/Slippery Hands** | Reduced touchscreen sensitivity, missed small targets | Touch targets minimum 44×44pt (WCAG AA) — fitness context demands 56–72dp for primary actions |
| **Eyes Diverted from Screen** | Cannot read text or watch video during exercise | Audio cues + haptic feedback must carry all critical information |
| **Phone Floor-Mounted (60cm–1m)** | Text illegible at distance | Primary metric numerals must be readable at arm's length without glasses |
| **Gym Ambient Noise** | Audio cues inaudible | Visual + haptic redundancy for all audio cues |
| **Heavy Gloves / Chalk** | Touchscreen misses, precision loss | Hardware button shortcuts (volume keys) for key actions |
| **Cognitive Load During Exercise** | Cannot process complex UI | Maximum 3–5 visible elements in in-session HUD |
| **Rapid Breathing / Elevated Heart Rate** | Impairs reading comprehension | All UI must be comprehensible without reading; iconography must be universal |

### 2.2 Fitness Content Accessibility
- `[REQUIREMENT]` Closed captions on ALL video content (exercise demos, instructor-led workouts, marketing video).
- `[REQUIREMENT]` Audio coaching cues must not be the sole channel for critical workout information (set completion, rep targets, rest timer) — visual and haptic redundancy required.
- `[REQUIREMENT]` All exercise instruction must be comprehensible without sound (captions + visual cues only).
- `[REQUIREMENT]` Color must never be the sole differentiator — all status information (completion, rest vs. active, progress) must have secondary text or icon encoding.

---

## 3. WCAG 2.1 AA Requirements (Non-Negotiable for PREDYX)

### 3.1 Perceivable
- `[REQUIREMENT]` Minimum color contrast ratio: **4.5:1** for normal text, **3:1** for large text (≥18pt regular / ≥14pt bold).
- `[REQUIREMENT]` For fitness context recommendation: **7:1** (AAA standard) for in-session metric numerals to accommodate sunlight, gym fluorescent lighting, and distance viewing.
- `[REQUIREMENT]` All non-text content (icons, status indicators, progress rings) must have text equivalents for screen readers.
- `[REQUIREMENT]` All video content must provide closed captions (SDH preferred) and audio descriptions where video conveys significant visual information not in audio.
- `[REQUIREMENT]` All interactive UI must remain fully functional with images/video disabled.

### 3.2 Operable
- `[REQUIREMENT]` All functionality must be keyboard-navigable (web platform).
- `[REQUIREMENT]` No timed interactions that cannot be paused, extended, or disabled (this specifically impacts in-session countdown timers — must be pausable).
- `[REQUIREMENT]` Minimum touch target size: 44×44px (WCAG AA). Recommended for fitness: 56–72dp for primary in-session actions.
- `[REQUIREMENT]` Focus indicators must be clearly visible on all interactive elements.
- `[REQUIREMENT]` Skip navigation links for screen reader users.

### 3.3 Understandable
- `[REQUIREMENT]` Language of page must be identified in HTML (`lang` attribute).
- `[REQUIREMENT]` Error messages must identify the field in error and describe the remedy.
- `[REQUIREMENT]` Labels for all form inputs.

### 3.4 Robust
- `[REQUIREMENT]` All interactive elements must have programmatically determinable name, role, and value (ARIA where native HTML is insufficient).
- `[REQUIREMENT]` HTML must be valid and well-structured.
- `[REQUIREMENT]` Screen reader testing: VoiceOver (iOS/macOS) + NVDA/JAWS (Windows web) required in Phase 8 QA.

---

## 4. Motion & Animation Accessibility

### 4.1 `prefers-reduced-motion` — Non-Negotiable

`[REQUIREMENT]` **All animations, transitions, parallax effects, and 3D motion must respect `prefers-reduced-motion: reduce`.**

Implementation standard:
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations must reduce to:
     - Immediate cuts (no transitions)
     - OR subtle static crossfades (≤ 0ms–150ms, no physics/spring behavior)
     - All parallax, GSAP scroll-driven, WebGL canvas animations: DISABLED
     - All looping background animations: DISABLED
     - All particle effects: DISABLED
  */
}
```

- `[REQUIREMENT]` This is especially critical given the planned GSAP ScrollTrigger parallax, 3D anatomy animations, and completion celebrations in PREDYX.
- `[OBSERVED]` Apple is the gold standard: iOS system-level `prefers-reduced-motion` automatically propagates to all app animations.
- `[OBSERVED]` Nike Training Club explicitly implements `prefers-reduced-motion` per documentation.

### 4.2 Specific Animation Accessibility Rules
- `[REQUIREMENT]` No animation that flashes more than 3 times per second (WCAG 2.3.1 — seizure safety).
- `[REQUIREMENT]` All looping decorative animations must either not loop or have a user control to pause.
- `[REQUIREMENT]` Countdown timer animations (e.g., circular progress rings) must have a numeric fallback label that screen readers can read.
- `[REQUIREMENT]` WebGL / Canvas elements must have `aria-label` or equivalent text description for screen readers.

---

## 5. Inclusive Design Requirements

### 5.1 Beginners & Low Fitness Literacy
- `[HYPOTHESIS]` Fitness jargon (1RM, RPE, periodization, HIIT) alienates beginners.
- `[REQUIREMENT]` All fitness terminology must include accessible definitions or tooltip explanations on first use.
- `[OBSERVED]` Apple Fitness+ deliberately avoids intimidating gym terminology in its navigation and content.

### 5.2 Diverse Body Types & Ability Levels
- `[REQUIREMENT]` Exercise library must include modifications for: limited mobility, joint limitations, lower fitness level, pregnancy, and older adults — at minimum in the content strategy (Phase 4 scope to define).
- `[OBSERVED]` Apple Fitness+ modifier trainer in every single workout is the benchmark — reduces intimidation for all user levels.
- `[OBSERVED]` Nike Training Club offers wheelchair and seated adaptive workout programs.

### 5.3 Age Range
- `[HYPOTHESIS]` PREDYX will have users across age ranges — UI font sizes and touch targets must accommodate older adults with reduced fine motor precision.
- `[REQUIREMENT]` Support system Dynamic Type (mobile) and browser font size scaling (web) for all text elements.

### 5.4 Neurological / Cognitive Accessibility
- `[REQUIREMENT]` Consistent navigation — never change the order of navigation items between screens.
- `[REQUIREMENT]` Progressive disclosure — avoid presenting all information simultaneously; reveal complexity on demand.
- `[REQUIREMENT]` Clear error states with actionable remediation messages.

---

## 6. Audio Accessibility

### 6.1 Captioning
- `[REQUIREMENT]` All video content with spoken audio must have synchronized closed captions.
- `[REQUIREMENT]` Captions must cover: instructor cues, form corrections, motivational comments, exercise names, set/rep announcements.
- `[REQUIREMENT]` Caption format: minimum 38px font, high-contrast white on translucent black background, maximum 2 lines simultaneously.

### 6.2 Audio Description
- `[REQUIREMENT]` Exercise demonstration videos where form details are conveyed visually but not verbally must include audio description (e.g., "She is placing feet shoulder-width apart, toes slightly turned out.").

### 6.3 Audio Coaching Independence
- `[REQUIREMENT]` Workouts must be completable for deaf users using visual cues alone: visual countdown timers, visual rep counters, visual interval indicators.

---

## 7. Color & Visual Accessibility

### 7.1 Color Blindness
- `[INFERRED]` Common fitness UI patterns (Green = good, Red = bad recovery/strain) are inaccessible to users with protanopia (red-green color blindness, affects ~8% of males).
- `[REQUIREMENT]` All color-coded status indicators must include:
  - A secondary icon (✓ / ⚠ / ✗)
  - OR a text label (Good / Caution / Rest Required)
  - NOT color alone

### 7.2 Dark Mode as Default
- `[REQUIREMENT]` PREDYX primary design system should default to dark mode (evidenced as standard by all five dark-mode competitors).
- `[REQUIREMENT]` A light mode system-preference override must be available (iOS/Android system setting respected).

### 7.3 Sunlight Readability
- `[REQUIREMENT]` In-session workout screen must target 7:1 contrast ratio for all primary metric numerals to ensure outdoor readability under direct sunlight.

---

## 8. Technical Accessibility Notes

### 8.1 ARIA Requirements
- `[REQUIREMENT]` Custom UI components (countdown timers, progress rings, exercise carousels) must use appropriate ARIA roles and labels.
- `[REQUIREMENT]` Dynamic content updates (live timer, live rep count, animated scores) must use ARIA live regions (`aria-live="polite"` for non-critical, `aria-live="assertive"` for countdown warnings).

### 8.2 Focus Management
- `[REQUIREMENT]` After opening a modal (exercise detail overlay, adapt exercise picker), focus must be trapped within the modal and returned to the trigger element on close.
- `[REQUIREMENT]` After completing a workout and displaying the completion screen, focus must move to the primary completion heading.

### 8.3 Skip Links
- `[REQUIREMENT]` Web platform must include "Skip to main content" and "Skip to workout" skip navigation links visible on focus.

---

## 9. Accessibility Testing Plan (Phase 8 QA Input)

| Test | Method | Tool |
|---|---|---|
| Color contrast audit | Automated | axe-core, WAVE, browser DevTools |
| Screen reader navigation (web) | Manual | NVDA + Firefox, JAWS + Chrome |
| Screen reader navigation (iOS) | Manual | VoiceOver + Safari |
| Keyboard navigation (web) | Manual | Tab / Shift+Tab / Enter / Space / Arrow keys |
| Touch target size audit | Automated + manual | BrowserStack, axe mobile |
| `prefers-reduced-motion` behavior | Manual | Set OS reduced motion → verify all animations disabled |
| Closed caption accuracy | Manual review | Native caption playback |
| Color blindness simulation | Automated | Chrome DevTools Vision Deficiencies, Color Oracle |
| Font scaling behavior | Manual | Browser font scaling (200%), iOS Dynamic Type XXL |
| Live region announcements | Manual | VoiceOver + NVDA |

---

## 10. Accessibility Compliance Decision Log

| Decision | Rationale | Status |
|---|---|---|
| WCAG 2.1 AA minimum target | Per AGENTS.md §9 | `[DECISION]` |
| `prefers-reduced-motion` mandatory for all animation | User safety, vestibular sensitivity | `[DECISION]` |
| 7:1 contrast for in-session metrics (above AA) | Outdoor/gym readability requirement | `[DECISION]` |
| Color must not be sole status differentiator | Color blindness inclusivity | `[DECISION]` |
| Closed captions on all video | Deaf/HoH inclusivity | `[DECISION]` |
| Support OS Dark/Light mode preference | System parity expectation | `[DECISION]` |
