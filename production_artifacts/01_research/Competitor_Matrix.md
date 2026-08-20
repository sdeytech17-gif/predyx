# PREDYX — Competitor Matrix

> **Version:** 1.0.0
> **Phase:** 1 — UX Research
> **Date:** 2026-08-17
> **Owner:** @ux
> **Status:** Complete

---

## Overview

Six competitors analyzed across key UX dimensions. All claims labeled per PREDYX evidence taxonomy.

| Label | Meaning |
|---|---|
| `[O]` | OBSERVED — directly verifiable from product/source |
| `[I]` | INFERRED — reasonable interpretation of observed evidence |
| `[H]` | HYPOTHESIS — proposition requiring validation |

---

## Matrix: Core Proposition & Model

| Dimension | Peloton | Nike Training Club | Apple Fitness+ | Whoop | Freeletics | Strava |
|---|---|---|---|---|---|---|
| **Tier** | Premium | Mainstream / Free | Premium / Ecosystem | Premium / Data | Mid-tier / AI | Community / Free+Premium |
| **Primary value prop** | Live/on-demand classes + community | Free brand-led workout content | Instructor video + Apple Watch integration | Recovery & strain data science | AI-personalized bodyweight training | Activity tracking + social motivation |
| **Hardware dependency** | High (Bike/Tread preferred) `[O]` | None `[O]` | Apple Watch required for metrics `[O]` | Proprietary wearable required `[O]` | None `[O]` | Optional (GPS/wearable) `[O]` |
| **Content format** | Video (live + on-demand) `[O]` | Guided video workouts `[O]` | Instructor-led video `[O]` | Data dashboard + coaching insights `[O]` | AI-generated programs + instructional GIFs `[I]` | Activity maps, segments, photos `[O]` |
| **Personalization depth** | Moderate (tags, history) `[I]` | Low `[I]` | Moderate (Watch data) `[I]` | High (biometric-driven) `[O]` | High (AI coach) `[O]` | Low (activity-based) `[I]` |
| **Subscription model** | ~$44/month (All-Access) `[O]` | Free `[O]` | $9.99/month (Apple One bundle) `[O]` | $239/year + hardware `[O]` | ~$12–18/month `[I]` | Free + $7–8/month (Summit) `[O]` |
| **Primary platform** | App + web + hardware `[O]` | Mobile app + limited web `[O]` | iPhone/iPad/Apple TV + Mac `[O]` | App + web dashboard `[O]` | Mobile app primary `[O]` | Mobile + web `[O]` |
| **Community features** | Strong (leaderboards, challenges) `[O]` | Minimal `[I]` | None (individual) `[I]` | Moderate (community insights) `[I]` | Moderate (challenges) `[I]` | Very strong (segments, clubs, kudos) `[O]` |

---

## Matrix: Information Architecture

| Dimension | Peloton | Nike Training Club | Apple Fitness+ | Whoop | Freeletics | Strava |
|---|---|---|---|---|---|---|
| **Primary navigation pattern** | Home / Classes / Programs / More `[O]` | Workouts / Plans / Activity `[I]` | Fitness / Activity / Summary `[I]` | Overview / Strain / Recovery / Sleep `[O]` | Today / Explore / Profile `[I]` | Home / Explore / Groups / Profile `[O]` |
| **Content depth** | Very deep (16+ modalities) `[O]` | Moderate `[I]` | Moderate (10+ activity types) `[O]` | Narrow (recovery focus) `[O]` | Focused (bodyweight) `[O]` | Broad (all activities) `[O]` |
| **Homepage role** | Personalized home feed `[O]` | Promotional marketing + app CTA `[O]` | Marketing + App Store CTA `[O]` | Data dashboard `[O]` | Goal-oriented coaching feed `[I]` | Activity feed + segment discovery `[O]` |
| **Search/filter capability** | Robust (modality, duration, instructor, level) `[O]` | Moderate (category, duration, equipment) `[I]` | Moderate (activity type, duration) `[I]` | N/A (data platform) `[O]` | Limited (AI decides) `[I]` | Strong (activity type, geography) `[O]` |
| **Onboarding friction** | Medium (hardware setup heavy if applicable) `[I]` | Low (app-direct) `[I]` | Low (Apple ID) `[O]` | High (hardware setup + biometrics) `[O]` | Medium (fitness assessment quiz) `[I]` | Low (social login, activity import) `[O]` |

---

## Matrix: Visual Language

| Dimension | Peloton | Nike Training Club | Apple Fitness+ | Whoop | Freeletics | Strava |
|---|---|---|---|---|---|---|
| **Color palette** | Dark backgrounds, Peloton red CTA `[O]` | Black + white + Nike red/orange `[O]` | Dark with activity-coded colors `[O]` | Near-black with cyan/teal data accents `[O]` | Very dark + vivid green accents `[I]` | Orange + white, clean `[O]` |
| **Typography style** | Bold, large, clean sans-serif `[O]` | Nike brand typeface (Futura-adjacent), bold `[O]` | San Francisco (Apple system font) `[O]` | Clean data-first sans-serif `[O]` | Bold, compressed — aggressive feel `[I]` | Clean, functional sans-serif `[O]` |
| **Photography style** | High-production studio + instructor portraits `[O]` | Nike athlete photography — dynamic, diverse `[O]` | High-production instructor + class imagery `[O]` | Minimal (data-focused) `[O]` | Gritty athletic photography `[I]` | User-generated photos + maps `[O]` |
| **Density** | High (many classes visible) `[O]` | Medium `[I]` | Medium-low (Apple minimalism) `[O]` | Medium (data panels) `[O]` | Medium `[I]` | High (social feed) `[O]` |
| **Motion/animation** | Moderate (transitions, hover states) `[I]` | Minimal `[I]` | Apple-standard smooth transitions `[O]` | Data visualization animations `[I]` | Minimal website; app GIFs `[I]` | Map animation, segment flythrough `[I]` |
| **3D / WebGL usage** | None evident `[O]` | None evident `[O]` | None evident (traditional) `[O]` | None evident `[O]` | None evident `[O]` | None evident `[O]` |

---

## Matrix: Workout / Training Experience

| Dimension | Peloton | Nike Training Club | Apple Fitness+ | Whoop | Freeletics | Strava |
|---|---|---|---|---|---|---|
| **Discovery method** | Personalized home feed + filter browse `[O]` | Category browse + Plan selection `[I]` | Collection browse + instructor browse `[I]` | N/A (not training content) | AI-generated daily workout `[I]` | Activity recording, not guided workouts `[O]` |
| **Exercise instruction** | Live/video instructor `[O]` | Video instructor `[O]` | Video instructor `[O]` | None (coaching insight, not workouts) `[O]` | Animated GIFs + text cues `[I]` | N/A |
| **In-session metrics** | Live metrics (power, cadence, resistance) `[O]` | Rep/time count `[I]` | Apple Watch metrics overlay `[O]` | Strain score tracking `[O]` | Rep counter, timer `[I]` | GPS tracking, heart rate, pace `[O]` |
| **Progress tracking** | Output history, PR tracking, streak `[O]` | Workout log `[I]` | Activity rings (Apple Watch) `[O]` | HRV, recovery scores, sleep `[O]` | Fitness level score `[I]` | Strava segments, PRs, yearly totals `[O]` |
| **Completion feedback** | Post-class summary, high-five, instructor shout-out `[O]` | Completion screen `[I]` | Completion animation, activity ring close `[O]` | Strain score update `[O]` | Coach feedback message `[I]` | Activity summary, kudos `[O]` |

---

## Matrix: Accessibility & Performance Signals

| Dimension | Peloton | Nike Training Club | Apple Fitness+ | Whoop | Freeletics | Strava |
|---|---|---|---|---|---|---|
| **Accessibility signals** | Closed captions on classes `[O]` | Limited visible signals `[I]` | Strong (Apple system-level) `[O]` | Limited visible signals `[I]` | Limited visible signals `[I]` | Limited visible signals `[I]` |
| **Reduced motion** | Not prominently advertised `[I]` | Not prominent `[I]` | Apple OS-level support `[O]` | Unknown `[I]` | Unknown `[I]` | Unknown `[I]` |
| **Mobile-first** | App-first experience `[O]` | App-first `[O]` | Apple device ecosystem primary `[O]` | App-first `[O]` | App-first `[O]` | App-first `[O]` |
| **Website performance** | Video-heavy marketing site `[I]` | Nike.com is optimized `[I]` | apple.com is highly optimized `[O]` | Data-focused, lighter `[I]` | Standard marketing site `[I]` | Standard + map components `[I]` |

---

> **Key insight:** No competitor analyzed deploys meaningful 3D/WebGL in their product experience. The visual space is dominated by dark themes, bold typography, high-production photography, and video instruction. This creates a genuine opportunity for PREDYX to differentiate through thoughtful spatial and motion design — if used purposefully. `[I]`
