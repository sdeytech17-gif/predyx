# PREDYX — Competitor UX Analysis

> **Version:** 1.0.0
> **Phase:** 1 — UX Research
> **Date:** 2026-08-17
> **Owner:** @ux
> **Sources:** onepeloton.com, nike.com/ntc, apple.com/apple-fitness-plus, whoop.com, freeletics.com, strava.com; iOS App Store listings; credible product journalism (The Verge, TechCrunch, 9to5Mac, DC Rainmaker, Wired)
> **Status:** Complete

---

## Evidence Taxonomy

| Label | Meaning |
|---|---|
| `[OBSERVED]` | Directly verifiable from product interface or cited source |
| `[INFERRED]` | Reasonable interpretation of observed evidence |
| `[HYPOTHESIS]` | Proposition requiring validation |
| `[EVIDENCE]` | Supported by citable external source |

---

## 1. Peloton

**Source:** onepeloton.com, official product pages, accessibility disclosures

### 1.1 Product Proposition
- `[OBSERVED]` Peloton is a connected, instructor-led, music-driven fitness platform offering both hardware (Bike, Tread, Row, Guide) and standalone digital subscriptions.
- `[OBSERVED]` Positioning: "Motivation that moves you." Covers 10+ modalities: Cycling, Running, Strength, Yoga, Pilates, Meditation, Stretching, Outdoor, Cardio, Barre.
- `[INFERRED]` Strategic pivot from "luxury hardware company" to "software-first fitness ecosystem" to expand TAM beyond hardware owners.

### 1.2 Information Architecture
- `[OBSERVED]` Homepage IA is hardware-led at the top level (Bikes | Treads | Row | App | Accessories | Apparel), but content inside shifts to streaming-service paradigm.
- `[OBSERVED]` Content hierarchy uses Netflix/Spotify-style horizontal carousels: "Just For You", "Trending", "New Classes", "Artist Series", "Beginner Programs".
- `[OBSERVED]` In-app filtering: class type, length (5–60+ min), instructor, music genre, subtitles, equipment needed.

### 1.3 Homepage Structure
- `[OBSERVED]` Full-bleed aspirational hero with dual CTA (hardware shoppers vs. digital subscribers).
- `[OBSERVED]` Social proof: 4.8/5 aggregate star ratings, press endorsement (The Verge, Men's Health, Forbes).
- `[OBSERVED]` Risk reversal: 30-Day Home Trial, Free Delivery/Setup, multi-year warranty.
- `[OBSERVED]` Product rows using card-based layout comparing hardware tiers with financing details.

### 1.4 Onboarding
- `[OBSERVED]` Progressive disclosure: "Try Free Trial" → Account creation → Profile setup → Payment → Initial class recommendations.
- `[OBSERVED]` Interactive quiz ("Find Your Fitness Goal") to route users to appropriate product/plan.
- `[INFERRED]` Non-transactional language ("Get Started") and deferred metric calibration lower friction at conversion.

### 1.5 Workout Discovery
- `[OBSERVED]` Stacking feature (build queue of up to 10 classes: Warmup + Main + Core + Cooldown).
- `[OBSERVED]` Bookmarking, class playlist previews, difficulty ratings visible before launching.
- `[OBSERVED]` Curated multi-week programs with locked sequential class progressions.

### 1.6 Exercise Instruction
- `[OBSERVED]` Broadcast studio HD video. Multi-angle, direct-to-camera instructor coaching.
- `[OBSERVED]` Real-time HUD overlay: Cadence (RPM), Resistance (%), Output (Watts), Heart Rate, Leaderboard rank.
- `[OBSERVED]` Audio Mix Slider: toggle between "More Instructor" and "More Music".
- `[OBSERVED]` Peloton Guide uses ML computer vision: Movement Tracker ring fills as reps are completed; Self Mode split screen for form verification.

### 1.7 Progress Tracking
- `[OBSERVED]` Weekly/daily streak trackers, milestone badges (Century Club — 100th ride), Personal Records, Strive Score (proprietary heart-rate-zone metric).
- `[OBSERVED]` Real-time leaderboard ranking during sessions; tap-to-send "High Fives"; community tags.

### 1.8 Subscription Model
- `[OBSERVED]` All-Access: $49.99/mo (hardware owners, up to 20 profiles). App+: $28.99/mo. App One: $12.99–15.99/mo (limited cardio equipment classes).
- `[EVIDENCE]` Pricing sourced from onepeloton.com official pricing page.

### 1.9 Mobile vs. Desktop
- `[OBSERVED]` Mobile: active workout execution, Apple Watch/WearOS heart rate, offline downloads.
- `[OBSERVED]` Desktop/web: full e-commerce and a web-based class player for library browsing and stack building.

### 1.10 Visual Language
- `[OBSERVED]` Dark mode baseline (#181A1D), crisp white cards, signature Coral-Red accent (#DF1C2F) for primary CTAs and active telemetry.
- `[OBSERVED]` Bold geometric sans-serif typography. High-production studio photography — authentic athletic effort, diverse body types.

### 1.11 Motion & Animation
- `[OBSERVED]` Scroll-driven micro-interactions, subtle parallax on hardware spec cutaways, dynamic radial gauges and pulsing heart-rate indicators during active classes.
- `[OBSERVED]` Class card hover states: scale/lift with preview clip and metadata slide-up.

### 1.12 Trust-Building
- `[OBSERVED]` Instructors as celebrity fitness authorities with credentials, dedicated bio pages, and social followings.
- `[OBSERVED]` 30-day in-home trial, exclusive Artist Series (Beyoncé, Taylor Swift), NBA partnership.

### 1.13 Accessibility
- `[OBSERVED]` Formal WCAG 2.1 A and AA compliance documented at onepeloton.com/accessibility.
- `[OBSERVED]` TalkBack screen reader support on hardware touchscreens, multi-language closed captions, visual color-coded metric bands for hearing-impaired users.

### 1.14 3D / Advanced Motion
- `[OBSERVED]` Uses Google `<model-viewer>` web component for interactive 3D GLTF/GLB hardware models on product detail pages.
- `[OBSERVED]` "View in Your Space" AR via WebXR/Quick Look for hardware sizing in home environment.
- `[OBSERVED]` No heavy full-page Three.js/WebGL canvas animations on marketing pages — lightweight scroll-driven video preferred.

### 1.15 Gaps / Weaknesses
- `[INFERRED]` High total cost of ownership ($49.99/mo + hardware) creates churn risk during economic downturns.
- `[OBSERVED]` Floor strength workouts rely on passive video without real-time rep counting or form correction (except with Guide hardware).
- `[INFERRED]` With tens of thousands of on-demand classes, first-time users can experience decision paralysis despite filtering.

---

## 2. Nike Training Club (NTC)

**Source:** nike.com/ntc, iOS App Store listing, Google Play listing; verified product journalism

### 2.1 Product Proposition
- `[OBSERVED]` NTC positions as "The ultimate training partner" — 180+ free workouts, multi-week progressive training plans, and holistic lifestyle guidance.
- `[OBSERVED]` 100% free for Nike Members since March 2020.
- `[EVIDENCE]` Previously charged $14.99/month; made permanently free during COVID-19 pandemic (multiple credible sources).
- `[INFERRED]` Functions as a DTC ecosystem anchor, not a standalone subscription revenue generator.

### 2.2 Information Architecture
- `[OBSERVED]` App tabs: Home / For You (algorithmic feed), Workouts (discovery + filter), Programs (multi-week plans), Activity / Profile (history, badges, connected sensors).
- `[INFERRED]` Flat navigation: max 2–3 taps from launch to starting a workout.

### 2.3 Homepage / Landing
- `[OBSERVED]` Full-bleed cinematic photography/video loop of athletes in motion. Dual App Store/Google Play download buttons.
- `[OBSERVED]` Four pillars: Expert-Led Content, Workout Variety, Train Anywhere, 100% Free.
- `[OBSERVED]` Side-by-side distinction between Trainer-Led Video Classes and Whiteboard Workouts (self-paced gym mode).

### 2.4 Onboarding
- `[OBSERVED]` ~6 lightweight screens: SSO (Nike Member ID, Apple ID, Google), basic profile (name, pronouns), fitness baseline (Beginner/Intermediate/Advanced), weekly commitment goal, equipment selection, system permissions.
- `[OBSERVED]` Zero paywall friction — no credit card, no subscription selection.

### 2.5 Workout Discovery
- `[OBSERVED]` Multi-dimensional filtering: Muscle Focus (Core/Upper/Lower/Total Body), Workout Focus (Strength/HIIT/Mobility/Yoga/Pilates/Recovery), Equipment (None/Basic/Full Gym), Duration (Under 10m to 45m+), Intensity (Low/Moderate/High), Format (Trainer-Led vs. Whiteboard), Trainer/Athlete.
- `[INFERRED]` Supports two discovery intents: instant contextual ("I have 20 mins and dumbbells") and long-term commitment ("I want a 6-week progressive plan").

### 2.6 Exercise Instruction
- `[OBSERVED]` Dual mode: Trainer-Led Video (continuous HD + audio guidance + countdown overlays) and Whiteboard Workouts (looping per-exercise demo video, multiple angles, form cues, target muscle highlights).
- `[OBSERVED]` In-session: exercise preview drawer, rep counter/timer, audio mixer (instructor vs. Apple Music/Spotify), AirPlay/Chromecast support.

### 2.7 Progress Tracking
- `[OBSERVED]` Milestone trophies/badges (5, 10, 25, 50, 100+ workouts), calendar workout log, program compliance tracking, Apple Watch heart rate integration.
- `[OBSERVED]` Limitation: No granular weight/rep logging for progressive overload tracking.

### 2.8 Subscription
- `[OBSERVED]` 100% free for registered Nike Members.
- `[INFERRED]` Monetizes via brand affinity driving apparel/footwear/equipment sales.

### 2.9 Mobile vs. Desktop
- `[OBSERVED]` Native mobile-only product (iOS, Android, Apple Watch). Desktop serves only as informational marketing funnel — no web workout player.
- `[EVIDENCE]` Netflix partnership (2022–2023) for smart TV distribution.

### 2.10 Visual Language
- `[OBSERVED]` High-contrast dark mode (#111111, #000000), high-visibility athletic neon accents (Volt/Neon Lime #D3F633) for active states.
- `[OBSERVED]` Heavy condensed grotesque typefaces (Nike Trade Gothic/Futura Bold) in uppercase for headers. Diverse, authentic athlete photography — concrete, wood, athletic turf environments.

### 2.11 Motion & Animation
- `[OBSERVED]` Smooth 60fps transitions, circular SVG countdown bars, synchronized haptic pulses at countdown intervals.
- `[OBSERVED]` Badge glimmer animations, trophy unlocks, streak confetti at completion.
- `[OBSERVED]` Respects OS-level `prefers-reduced-motion` — reduces to immediate cuts.

### 2.12 Trust-Building
- `[OBSERVED]` Nike Master Trainers with sports science backgrounds. Elite athlete co-creation (Cristiano Ronaldo, Serena Williams, LeBron James, Sydney McLaughlin).
- `[OBSERVED]` Transparent zero-cost experience — no deceptive trials, no ads.

### 2.13 Accessibility
- `[OBSERVED]` Closed captions on all trainer-led videos. Audio coaching cues usable without looking at screen. Adaptive workouts for seated/wheelchair/limited-mobility users. WCAG-compliant contrast ratios, min 44×44pt touch targets.

### 2.14 3D / Advanced Motion
- `[OBSERVED]` Zero 3D or WebGL in production app.
- `[INFERRED]` Prefers real HD video loops + lightweight 2D vectors — ensures fast load, low battery consumption, universal device compatibility.

### 2.15 Gaps / Weaknesses
- `[OBSERVED]` No progressive overload tracking (cannot record specific weights, reps, or RPE per set).
- `[OBSERVED]` No web/desktop workout player.
- `[INFERRED]` Limited social/community features compared to Peloton or Strava.

---

## 3. Apple Fitness+

**Source:** apple.com/apple-fitness-plus, iOS release notes iOS 14.3 through iOS 17/18, verified tech journalism (The Verge, 9to5Mac)

### 3.1 Product Proposition
- `[OBSERVED]` "Studio-style workouts and guided meditations for everyone, powered by Apple Watch." Core promise: frictionless home/travel fitness dynamically visualizing personal biometric effort on-screen.
- `[INFERRED]` Target: broad general population — beginners, older adults, busy professionals — not elite athletes.
- `[INFERRED]` Ecosystem retention anchor and Apple One bundle driver rather than independent profit center.

### 3.2 Homepage Structure
- `[OBSERVED]` Dynamic hero video with diverse trainers, dual CTA (free trial / hardware promo offer).
- `[OBSERVED]` 12-modality interactive carousel (HIIT, Yoga, Core, Strength, Pilates, Dance, Cycling, Treadmill, Rowing, Kickboxing, Meditation, Mindful Cooldown).
- `[OBSERVED]` Feature deep-dives: Custom Plans & Stacks (iOS 17), real-time metrics HUD, Audio Focus slider.
- `[OBSERVED]` Artist Spotlight section (workouts dedicated to Taylor Swift, Beyoncé, Queen, ABBA).

### 3.3 Information Architecture
- `[OBSERVED]` App tabs: Summary (Activity Rings), Fitness+ (content hub), Sharing.
- `[OBSERVED]` Content hub: Featured carousel → Modality filter chips → My Library → For You (algorithmic) → New This Week → Stacks → Collections → Programs → Audio Experiences → Artist Spotlight → Trainers Directory.
- `[INFERRED]` Architecture philosophy: max 2–3 taps to start a workout; discovery by Time (how many minutes?) and Mood/Music rather than fitness terminology.

### 3.4 Onboarding
- `[OBSERVED]` Relies entirely on Apple ID ecosystem — no external email/password.
- `[OBSERVED]` One-tap Face ID subscription confirmation. Optional Custom Plan onboarding wizard (activity types, target days/week, session length, preferred trainers). HealthKit permissions prompt.
- `[OBSERVED]` Family Sharing: automatic unlock for up to 5 linked iCloud family members.

### 3.5 Workout Discovery
- `[OBSERVED]` Multi-dimensional filtering: Trainer, Duration (5/10/20/30/45 min), Music Genre (9 genres), Equipment.
- `[OBSERVED]` Custom Plans (iOS 17+): algorithmic schedule generation. Stacks: user-built consecutive workout playlists. Demographic-specific programs: Beginners, Older Adults, Pregnancy.

### 3.6 Exercise Instruction
- `[OBSERVED]` Multi-trainer triad pattern: Lead Trainer (center) + Modifier Trainer (low-impact alternatives) + Progression Trainer (advanced form). Background trainers are named professionals who interact with lead.
- `[OBSERVED]` Audio Focus Toggle (iOS 17+): balance trainer voice vs. music volume.
- `[OBSERVED]` Interval timers at top-center; dynamic camera angle shifts for form detail.

### 3.7 Progress Tracking
- `[OBSERVED]` Real-time HUD: Active Calories (top-left), Countdown Clock (top-center), Heart Rate + Heart Rate Zone + Activity Rings (top-right).
- `[OBSERVED]` Burn Bar: rolling 2-minute calorie effort score vs. historical cohort who completed same workout. Toggleable for users who find competition demotivating.
- `[OBSERVED]` Apple Watch haptic pulses 3 seconds before interval ends. Activity Ring closure triggers particle firework animation on both Watch and video screen.

### 3.8 Subscription
- `[OBSERVED]` $9.99/month or $79.99/year. Family Sharing for up to 6 members at no extra cost. Included in Apple One Premier ($37.95/mo). 3 months free with new Apple hardware purchase.

### 3.9 Mobile vs. Desktop/TV
- `[OBSERVED]` iPhone: vertical scroll, sticky tabs. iPad: multi-column grid, sidebar nav, PiP. Apple TV: 10-foot TV UI, large-type HUD, multi-user fast switcher. Mac: no native app — AirPlay mirroring only.
- `[INFERRED]` Prioritizes living room (Apple TV) and portable spaces; treats Mac as non-viable for physical exercise.

### 3.10 Visual Language
- `[OBSERVED]` True black OLED backgrounds (#000000), dark gray cards (#1C1C1E, #2C2C2E). Activity Ring neon colors: Move (Neon Red/Pink #FA114F), Exercise (Volt Green), Stand (Cyan).
- `[OBSERVED]` SF Pro / SF Pro Rounded. Monospaced tabular numbers for timers and calorie counters.
- `[OBSERVED]` Warm wooden studio aesthetic, soft natural lighting, unfiltered athletic realism.

### 3.11 Motion & Animation
- `[OBSERVED]` Apple spring physics transitions. Rolling-odometer number animations for calories/HR. Activity Ring sweep animations with glow shaders. Countdown rings sync with audio chimes.

### 3.12 Trust-Building
- `[OBSERVED]` HealthKit on-device encryption, no third-party tracking SDKs. Named trainer credentials. No upselling, no ads.

### 3.13 Accessibility
- `[OBSERVED]` Audio Hints for VoiceOver users. ASL greetings by trainers in every workout. SDH subtitles in 6+ languages. Adaptive wheelchair tracking (Roll). Inclusive modifier trainer showing seated/low-impact alternatives in 100% of videos. Programs for Older Adults and Pregnancy.

### 3.14 3D / Spatial
- `[OBSERVED]` No native visionOS app. AirPlay to Vision Pro blocked by DRM. Mindfulness app on Vision Pro features interactive 3D spatial environments.
- `[INFERRED]` Spatial fitness deferred due to headset weight/sweat/tracking limitations.

### 3.15 Gaps / Weaknesses
- `[OBSERVED]` Strict Apple ecosystem lock-in — unavailable on Android, Windows, web, or non-Apple TV.
- `[OBSERVED]` No computer vision/real-time form correction.
- `[OBSERVED]` No live interactive classes or real-time social presence.
- `[OBSERVED]` No Mac native experience.
- `[OBSERVED]` Limited progressive overload depth — cannot log specific dumbbell weights or strength progression.

---

## 4. Whoop

**Source:** whoop.com, official product pages, scientific publications page

### 4.1 Product Proposition
- `[OBSERVED]` 24/7 continuous health and performance coaching. Three pillars: Recovery (HRV, readiness), Strain (cardiovascular + muscular load), Sleep. Screen-free wearable sensor + companion AI intelligence app.
- `[INFERRED]` Differentiates from smartwatches by omitting display screen — positions as "invisible physiological sensor" rather than gadget.

### 4.2 Landing Page Structure
- `[OBSERVED]` Scroll-triggered narrative sections dedicated to Recovery, Strain, and Sleep. AI/WHOOP Coach feature spotlight. Elite athlete imagery (LeBron James, Michael Phelps, Patrick Mahomes). Scientific rigor: links to peer-reviewed white papers.

### 4.3 Information Architecture
- `[OBSERVED]` App: 5-tab navigation: Home/My Day (recovery dial, strain gauge, sleep summary), WHOOP Coach (conversational AI chat), Health/Vitals (HRV, RHR, SpO2, Skin Temp, Stress Monitor), Community/Teams (leaderboards, circles), Action / Journal.

### 4.4 Onboarding
- `[OBSERVED]` BLE pairing → profile/goal intake → Apple Health / Health Connect sync → 4–14 day baseline calibration period (explicitly communicated) → daily journal behavior setup.

### 4.5 Data & Tracking
- `[OBSERVED]` Recovery: 0–100% score. Green (67–100%), Yellow (34–66%), Red (0–33%). Calculated from HRV (rMSSD), Resting HR, Sleep Performance, Respiratory Rate, Skin Temp.
- `[OBSERVED]` Strain: 0–21 logarithmic scale. Cardiovascular + muscular load (accelerometer/gyroscope Strength Trainer).
- `[OBSERVED]` Sleep: automated detection, sleep stages (Light, Deep, REM, Awake), Sleep Planner for bedtime recommendations.
- `[OBSERVED]` Stress Monitor, Health Monitor, Journal Correlation Engine (100+ behaviors, monthly correlation reports).

### 4.6 Data Visualization
- `[OBSERVED]` Circular progress rings for Recovery and Strain. Stacked horizontal bars for sleep stages. Color-coded semantic system (Green/Yellow/Red/Cyan). Trend corridors with shaded baseline standard deviation ranges.
- `[INFERRED]` Surface-level data compression (single 0–100 score) with hierarchical depth — casual users grasp readiness in 3 seconds; biohackers can inspect raw HRV graphs.

### 4.7 Subscription
- `[OBSERVED]` Hardware-as-a-Service: device included in subscription. Annual ~$239/year. 30-day free trial. Free hardware upgrades when new generations release.

### 4.8 Visual Language
- `[OBSERVED]` Pure black (#000000), deep carbon gray (#121212, #1C1C1E). White typography. Semantic accents: Electric Green (#00E676), Warm Amber (#FFD600), Crimson Red (#FF1744), Cool Cyan (#00B0FF).
- `[OBSERVED]` Clean geometric sans-serif with tabular numeral styling. High information density in rounded card containers (border-radius 12–16px).

### 4.9 Motion
- `[OBSERVED]` Web: scroll-driven interactive product rotations, SVG gauge fills. App: circular gauge animations from 0 to score on transition, spring-based physics on swipe/pull-to-refresh.

### 4.10 Trust-Building
- `[OBSERVED]` Elite athlete authentic adoption (PGA Tour, NBA, NFL, Olympic). Peer-reviewed white papers (Harvard Medical School, CQUniversity). HIPAA-compliant encryption, explicit anti-data-broker pledges.

### 4.11 Accessibility
- `[OBSERVED]` WCAG 2.1 AAA contrast ratios (white text on pure black). Dynamic Type support. Haptic alarms.
- `[INFERRED]` Dense graphical charts (HRV histograms, sleep stage timelines) present screen reader challenges without text-based data summaries.
- `[HYPOTHESIS]` Color-blind users need secondary iconographic/numeric cues for Green/Yellow/Red states.

### 4.12 3D / Advanced Visualization
- `[OBSERVED]` Web: high-fidelity 3D interactive hardware showcases (WebGL/Three.js-style internal sensor exploded views).
- `[OBSERVED]` App: vector-based anatomical muscle heatmaps (front/back body) in Strength Trainer highlighting loaded muscle groups.
- `[INFERRED]` 3D WebGL confined to marketing hero; in-app 3D translated to lightweight 2D vector heatmaps for mobile performance.

### 4.13 Gaps / Weaknesses
- `[OBSERVED]` No real-time on-wrist metric display during workouts without phone.
- `[OBSERVED]` Recurring subscription with no free/lifetime tier causes churn among casual exercisers.
- `[OBSERVED]` No step counting — disconnects from mainstream "10,000 steps" mental model.
- `[OBSERVED]` Manual strength logging interrupts training rhythm.
- `[INFERRED]` Algorithmic "Red Recovery" discrepancy vs. user subjective energy creates psychological conflict.

---

## 5. Freeletics

**Source:** freeletics.com, iOS App Store, product journalism

### 5.1 Product Proposition
- `[OBSERVED]` "AI Personal Trainer in your pocket." Hyper-personalized fitness coaching dynamically adjusting exercise type, volume, intensity based on goals, equipment, space, and feedback.
- `[INFERRED]` Targets users seeking personal trainer discipline without hourly rates or gym constraints — "No Excuses / Train Anywhere" philosophy.

### 5.2 Landing Page
- `[OBSERVED]` Gritty, high-energy full-bleed visuals of athletes in raw environments (urban parks, asphalt, concrete). AI Coach mechanism explanation. Training Journey cards (6–12 week programs). Coach+ generative AI spotlight. 60M+ athlete social proof.

### 5.3 Information Architecture
- `[OBSERVED]` 3-tab app navigation: Coach (active Training Journey, Adapt Session button), Community/Feed (social activity, claps, challenges), Profile/Progress (Daily Athlete Score, XP/Levels, Personal Bests, history).

### 5.4 Onboarding & AI Setup
- `[OBSERVED]` Detailed intake questionnaire: Primary Goal, Current Fitness Level (pushup/pullup capacity), Available Equipment (multi-select), Weekly Schedule, Physical Limitations (joints, "Quiet Training" for apartment living) → AI recommends Training Journeys → Account creation → Paywall → Initial calibration session.
- `[INFERRED]` Equipment and limitation toggles dramatically improve early retention among apartment dwellers and returning injured athletes.

### 5.5 Workout Discovery
- `[OBSERVED]` Training Journeys (6–12 week cycles). Signature "God Workouts" (Greek mythology — Aphrodite, Zeus) as benchmark competitions. Custom/on-demand workouts by muscle group and time. Audio coaching courses (sports psychology, nutrition).
- `[INFERRED]` Mythology naming creates cultural identity and emotional brand connection among "Free Athletes" community.

### 5.6 Exercise Instruction
- `[OBSERVED]` 4K looping video demonstrations. Multi-angle (front, side, 360°). Slow-motion markers at key movement phases. In-workout: large rep counters, countdown beeps, audio prompts. Text instructions with "Common Mistakes to Avoid."
- `[INFERRED]` Continuous silent video loops allow floor-placement phone viewing without interrupting HIIT pacing.

### 5.7 Progress Tracking
- `[OBSERVED]` Daily Athlete Score (DAS). Personal Bests (PBs) per God Workout with ★ rating for clean-form completion. XP + lifetime level system. Post-workout AI feedback survey (technique, exhaustion, rep completion) that immediately recalibrates next session.
- `[INFERRED]` Star standard prevents form-cheating for faster leaderboard times.

### 5.8 Subscription
- `[OBSERVED]` Freemium: free tier (limited exercises, select God Workouts). Coach subscription unlocks full AI engine (billed 3/6/12-month intervals, ~$1.50–3.50/week equivalent).
- `[OBSERVED]` 14-day money-back guarantee.

### 5.9 Visual Language
- `[OBSERVED]` Very dark backgrounds (#101010, #1E1E1E), stark white type, Electric Cobalt Blue (#007AFF) and neon volt highlights. Gritty outdoor/urban athlete photography. Bold condensed aggressive sans-serif for workout titles; clean geometric sans for body text. Oversized touch buttons for sweaty-hand scenarios.

### 5.10 Motion
- `[OBSERVED]` High-energy reward animations on completion (level-up particles, badge unlocks, animated XP counters). In-workout: smooth SVG progress arcs. Lottie animations and hardware-accelerated transitions for performance.
- `[INFERRED]` Motion is restrained during training, celebratory on completion.

### 5.11 Trust-Building
- `[OBSERVED]` 60M+ athletes across 160 countries. Transformation documentary videos (real users, 15-week changes). Algorithm trained on tens of millions of logged sessions. Apple App of the Day, Google Play Editor's Choice awards.

### 5.12 Accessibility
- `[OBSERVED]` Loud countdown beeps and audio cues for eyes-free training. Oversized touch buttons (full-width). High outdoor contrast. Adapt Session accommodates physical limitations.
- `[INFERRED]` Core HIIT flow relies on visual/physical agility — full accessibility for severe visual/motor impairment requires voice-guidance expansion.

### 5.13 Gaps / Weaknesses
- `[OBSERVED]` Cancellation friction (Trustpilot ~3/5). Video buffering in offline/spotty locations. Historical analytics nested deep and hard to find. Rigid missed-workout flow creates backlog demotivation. No continuous biometric integration (no HRV, no recovery score).

---

## 6. Strava

**Source:** strava.com, iOS App Store, official feature documentation, tech journalism

### 6.1 Product Proposition
- `[OBSERVED]` "The social network for athletes." Records outdoor/endurance activities, shares to athlete-centric feed, competes on geographic segments.
- `[INFERRED]` Positions as open utility and telemetry layer sitting between hardware sensors (Garmin, Wahoo, Apple Watch) and social connection.
- `[HYPOTHESIS]` Network effect and segment telemetry create strong switching costs — users' entire athletic history and peer group reside on Strava.

### 6.2 Landing Page
- `[OBSERVED]` Dynamic lifestyle photography with GPS polyline overlay. Social proof scale metrics. Four core pillar cards: Record, Connect, Compete, Analyze. 3D route/heatmap feature showcase. Subscription upgrade comparison (free vs. paid).

### 6.3 Information Architecture
- `[OBSERVED]` 5-tab mobile navigation: Home (Feed), Maps (3D terrain, route builder), Record (live GPS recording), Groups (challenges, clubs), You (profile, PRs, gear).
- `[OBSERVED]` Desktop web: Dashboard, Training (log, plans), Maps/Routes (route builder with elevation graph), Explore (segments, challenges, clubs, app directory).

### 6.4 Onboarding
- `[OBSERVED]` 1-tap OAuth (Apple ID, Google, Facebook). Basic profiling (name, birthdate, gender). Sport preferences multi-select. GPS/motion permissions. Social graph hook (contacts, Facebook friend sync). Hardware sync (Garmin, Apple Watch, Fitbit, Wahoo). Soft paywall 30-day trial (skippable).

### 6.5 Activity Tracking
- `[OBSERVED]` 30+ sport types. Live telemetry (pace, distance, elevation, HR, power). Auto-pause at stops. BLE sensor pairing. Beacon safety tracking via SMS link. Rich post-activity metadata (RPE, photos, gear, privacy).

### 6.6 Social & Community
- `[OBSERVED]` Kudos (single-tap, haptic). Group activities auto-detection. Segments and KOM/QOM/Local Legend leaderboards. Monthly challenges with digital 3D finisher badges. Clubs with weekly mileage leaderboards. Direct messaging.

### 6.7 Subscription
- `[OBSERVED]` Free: GPS recording, basic feed, top-10 segment leaderboards. Strava Subscription ($11.99/mo or $79.99/yr): full segment leaderboards, route creation, 3D terrain maps, Athlete Intelligence (AI plain-language workout summaries), advanced training analytics.

### 6.8 Visual Language
- `[OBSERVED]` Strava Orange (#FC4C02) brand anchor. Monochrome foundation (white #FFFFFF, light gray #F0F0F2, deep charcoal #1A1A1E). Heatmap: neon spectrum (Red → Orange → Yellow → White) on dark cartography. Clean geometric sans-serif with high x-height. Minimalist Mapbox vector tiles with polyline in high-contrast orange.

### 6.9 Motion
- `[OBSERVED]` Kudos scale-bounce haptic. Weekly goal ring fills. Synchronized elevation profile scrubber with moving map pinpoint. 3D satellite drone flyover following GPS trail.
- `[INFERRED]` During active GPS recording, motion kept minimal to conserve CPU/battery on multi-hour outdoor sessions.

### 6.10 Trust-Building
- `[OBSERVED]` Privacy Zones (hide 200m–1km radius around home). Three-tier activity privacy (Everyone / Followers / Only You). Verified athlete badges. Beacon end-to-end SMS sharing.

### 6.11 Accessibility
- `[OBSERVED]` Native dark mode (2024) with Always Dark / System Match options. Giant high-contrast numerals for outdoor readability. Dynamic Type scaling. 56dp+ touch targets for Pause/Stop.

### 6.12 3D
- `[OBSERVED]` FATMAP-acquired map rendering engine (2024–2025). Full 3D topographic terrain rendering in mobile Maps tab. Terrain analysis layers (slope gradient, aspect, avalanche gradient). 3D satellite route flyover.

### 6.13 Gaps / Weaknesses
- `[OBSERVED]` Poor gym/strength tracking — no set/rep/weight/exercise-level detail.
- `[OBSERVED]` Social comparison anxiety ("Strava anxiety"), overtraining from segment chasing.
- `[OBSERVED]` Past privacy controversy: default public location sharing exposed sensitive areas before privacy boundaries were strengthened.
- `[OBSERVED]` Athlete Intelligence is strictly retrospective — no real-time coaching during activities.

---

## Cross-Competitor Summary

### What No Competitor Does
1. `[OBSERVED]` No competitor uses meaningful 3D/WebGL in the core product workout experience (only Peloton uses `<model-viewer>` for hardware commerce; Whoop uses it for hardware marketing).
2. `[OBSERVED]` No competitor offers both cinematic exercise instruction AND deep physiological performance tracking in a single platform without hardware dependency.
3. `[OBSERVED]` No competitor uses 3D anatomy visualization for exercise education in a consumer-grade web platform.
4. `[INFERRED]` The visual space converges on dark themes + bold typography + video/photo — the aesthetic gap for spatial, architectural, cinematic motion design remains open.

### Common Strengths to Match
- High-contrast dark aesthetic with vivid semantic accents `[OBSERVED]` across all six
- Mobile-first native app experience `[OBSERVED]` across all six
- Frictionless onboarding (best in class: Apple Fitness+, Nike Training Club) `[OBSERVED]`
- Multi-dimensional workout filtering `[OBSERVED]` across Peloton, NTC, Apple Fitness+

### Common Weaknesses = PREDYX Opportunities
- No platform offers exercise instruction + progressive strength tracking + performance data without hardware
- No platform uses 3D anatomy/movement visualization for consumer education
- Motivational design often creates guilt/shame (punitive streaks, aggressive paywalls)
- Most lack a genuine "cinematic" quality — high production but not spatially immersive
