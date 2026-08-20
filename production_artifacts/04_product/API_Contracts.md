# PREDYX — API Contracts

> **Version:** 1.0.0
> **Phase:** 4 — Product Architecture + 3D/Motion Planning
> **Date:** 2026-08-18
> **Owner:** @product
> **Status:** Complete

---

## API Design Principles

- **RESTful** — resource-oriented URLs, standard HTTP verbs
- **Next.js Route Handlers** — co-located in `app/api/` directory (App Router)
- **Type-safe** — all request/response bodies validated with Zod; TypeScript types auto-derived
- **Auth** — JWT via NextAuth; `Bearer` token or session cookie. All `(app)` routes require auth.
- **Error format** — consistent `{ error: string, code: string }` shape
- **Pagination** — cursor-based for lists (exercises, sessions history)
- **Units** — server always returns `weightKg`; client converts per `UserPreferences.units`

---

## Base URL

```
Production:  https://predyx.com/api
Development: http://localhost:3000/api
```

---

## Authentication

### POST `/api/auth/register`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "min-12-chars",
  "name": "Alex"
}
```

**Response `201`:**
```json
{
  "user": { "id": "cuid", "email": "user@example.com", "name": "Alex" }
}
```

**Errors:** `400` (validation), `409` (email already registered)

---

### POST `/api/auth/[...nextauth]`
Standard NextAuth handler — handles sign-in, sign-out, session, CSRF.

---

## User

### GET `/api/user/me`
Returns current user profile + preferences.

**Response `200`:**
```json
{
  "id": "cuid",
  "email": "user@example.com",
  "name": "Alex",
  "createdAt": "2026-08-18T00:00:00Z",
  "preferences": {
    "goal": "STRENGTH",
    "experienceLevel": "INTERMEDIATE",
    "equipment": ["FULL_GYM", "DUMBBELLS"],
    "trainingDaysPerWeek": 4,
    "units": "KG",
    "restTimerDefault": 90,
    "audioCuesEnabled": true,
    "reducedMotion": false,
    "captionsEnabled": true,
    "enrolledProgramId": "cuid",
    "enrolledWeek": 3
  }
}
```

---

### PATCH `/api/user/preferences`
Update user preferences (partial update).

**Request (any subset of preferences):**
```json
{
  "trainingDaysPerWeek": 5,
  "units": "LBS",
  "restTimerDefault": 120
}
```

**Response `200`:** Updated preferences object.

---

## Programs

### GET `/api/programs`
List all programs (filterable).

**Query params:**
- `goal`: `STRENGTH | CONDITIONING | HYBRID | GENERAL_FITNESS`
- `durationWeeks`: `4 | 6 | 8 | 12`
- `daysPerWeek`: `3 | 4 | 5 | 6`
- `equipment`: comma-separated `Equipment` values
- `difficulty`: `BEGINNER | INTERMEDIATE | ADVANCED`

**Response `200`:**
```json
{
  "programs": [
    {
      "id": "cuid",
      "slug": "12-week-powerbuilding",
      "name": "12-Week Powerbuilding",
      "description": "...",
      "goal": "STRENGTH",
      "durationWeeks": 12,
      "daysPerWeek": 4,
      "equipment": ["FULL_GYM"],
      "difficulty": "INTERMEDIATE",
      "coverImagePath": "/images/programs/powerbuilding.jpg"
    }
  ]
}
```

---

### GET `/api/programs/[slug]`
Get full program detail including all weeks, days, and session plans.

**Response `200`:**
```json
{
  "id": "cuid",
  "slug": "12-week-powerbuilding",
  "name": "...",
  "weeks": [
    {
      "weekNumber": 1,
      "days": [
        {
          "dayNumber": 1,
          "name": "Upper — Push Focus",
          "isRestDay": false,
          "sessionPlan": {
            "exercises": [
              {
                "order": 1,
                "sets": 4,
                "repsTarget": 6,
                "restSeconds": 180,
                "exercise": {
                  "id": "cuid",
                  "slug": "bench-press",
                  "name": "Bench Press",
                  "muscles": [
                    { "role": "PRIMARY", "muscleGroup": { "name": "CHEST" } }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

---

## Workouts

### GET `/api/workouts`
List all standalone workouts (filterable).

**Query params:** `type`, `durationMax`, `muscles`, `equipment`, `difficulty`

**Response `200`:** Array of workout summary objects (same shape as programs summary).

---

### GET `/api/workouts/[slug]`
Full workout detail with exercises. Same nested structure as program session plan.

---

## Exercises

### GET `/api/exercises`
List exercises with pagination and filtering.

**Query params:**
- `muscleGroup`: `MuscleGroupName` value
- `equipment`: `Equipment` value
- `movementPattern`: `MovementPattern` value
- `difficulty`: `Difficulty` value
- `q`: search string (name match)
- `cursor`: cursor for pagination
- `limit`: default 20, max 50

**Response `200`:**
```json
{
  "exercises": [
    {
      "id": "cuid",
      "slug": "romanian-deadlift",
      "name": "Romanian Deadlift",
      "movementPattern": "HINGE",
      "equipment": ["BARBELL"],
      "difficulty": "INTERMEDIATE",
      "muscles": [
        { "role": "PRIMARY", "muscleGroup": { "name": "HAMSTRINGS" } },
        { "role": "PRIMARY", "muscleGroup": { "name": "GLUTES" } },
        { "role": "SECONDARY", "muscleGroup": { "name": "ERECTORS" } }
      ]
    }
  ],
  "nextCursor": "cuid_of_last_item_or_null"
}
```

---

### GET `/api/exercises/[slug]`
Full exercise detail for education page.

**Response `200`:**
```json
{
  "id": "cuid",
  "slug": "romanian-deadlift",
  "name": "Romanian Deadlift",
  "description": "...",
  "movementPattern": "HINGE",
  "equipment": ["BARBELL"],
  "difficulty": "INTERMEDIATE",
  "videoMuxPlaybackId": "abc123",
  "anatomyModelPath": "/models/exercises/romanian-deadlift.glb",
  "cues": [
    "Hinge at the hip — keep the spine neutral throughout",
    "Bar stays close to the legs — drag it down the shins",
    "Drive the hips forward to return to standing"
  ],
  "commonErrors": [
    "Rounding the lower back under load",
    "Bar drifting away from the body at the bottom"
  ],
  "muscles": [
    { "role": "PRIMARY", "muscleGroup": { "name": "HAMSTRINGS" } },
    { "role": "PRIMARY", "muscleGroup": { "name": "GLUTES" } },
    { "role": "SECONDARY", "muscleGroup": { "name": "ERECTORS" } },
    { "role": "SECONDARY", "muscleGroup": { "name": "ADDUCTORS" } }
  ],
  "variations": [
    { "slug": "single-leg-rdl", "name": "Single-Leg Romanian Deadlift" },
    { "slug": "dumbbell-rdl", "name": "Dumbbell Romanian Deadlift" }
  ]
}
```

---

## Sessions

### POST `/api/sessions`
Create a new session (start training).

**Request:**
```json
{
  "sourceType": "PROGRAM",
  "sourceProgramId": "cuid",
  "sourceWeek": 3,
  "sourceDay": 2
}
```

**Response `201`:**
```json
{
  "sessionId": "cuid",
  "status": "IN_PROGRESS",
  "startedAt": "2026-08-18T10:00:00Z"
}
```

---

### PATCH `/api/sessions/[sessionId]`
Update session status (complete or abandon).

**Request:**
```json
{
  "status": "COMPLETED",
  "durationSeconds": 2847,
  "notes": "Felt strong today — increased squat by 2.5kg"
}
```

---

### POST `/api/sessions/[sessionId]/logs`
Log sets for an exercise during a session (batch operation).

**Request:**
```json
{
  "exerciseId": "cuid",
  "order": 1,
  "sets": [
    { "setNumber": 1, "weightKg": 80, "reps": 8, "completed": true },
    { "setNumber": 2, "weightKg": 82.5, "reps": 7, "completed": true },
    { "setNumber": 3, "weightKg": 82.5, "reps": 6, "completed": true }
  ]
}
```

**Response `201`:**
```json
{
  "exerciseLogId": "cuid",
  "newPersonalRecord": {
    "achieved": true,
    "exercise": "Bench Press",
    "weightKg": 82.5,
    "reps": 7,
    "estimated1RMKg": 91.4
  }
}
```

**Note:** Server checks if any set constitutes a PR and returns this in the response so the client can display the PR achievement immediately.

---

### GET `/api/sessions`
List user session history.

**Query params:** `status`, `cursor`, `limit` (default 20)

**Response `200`:**
```json
{
  "sessions": [
    {
      "id": "cuid",
      "sourceType": "PROGRAM",
      "sourceProgramId": "cuid",
      "sourceWeek": 3,
      "sourceDay": 2,
      "status": "COMPLETED",
      "startedAt": "2026-08-18T10:00:00Z",
      "completedAt": "2026-08-18T10:47:00Z",
      "durationSeconds": 2820,
      "exerciseCount": 5,
      "totalVolumeKg": 4280
    }
  ],
  "nextCursor": "cuid_or_null"
}
```

---

### GET `/api/sessions/[sessionId]`
Full session detail for history review.

Returns session + all exercise logs + all set logs.

---

## Progress

### GET `/api/progress/summary`
Weekly summary for the Progress tab overview cards.

**Response `200`:**
```json
{
  "thisWeek": {
    "sessionsCompleted": 3,
    "totalVolumeKg": 8450,
    "activeDayStreak": 14
  },
  "lastWeek": {
    "sessionsCompleted": 4,
    "totalVolumeKg": 9100
  }
}
```

---

### GET `/api/progress/strength`
Strength progression data for an exercise over time.

**Query params:**
- `exerciseId`: required
- `weeks`: `8 | 12 | 24` (default 12)

**Response `200`:**
```json
{
  "exercise": { "id": "cuid", "name": "Back Squat" },
  "dataPoints": [
    {
      "date": "2026-06-01",
      "weekLabel": "W1",
      "maxWeightKg": 80,
      "repsAtMax": 5,
      "estimated1RMKg": 89.3,
      "isPersonalRecord": false
    },
    {
      "date": "2026-08-18",
      "weekLabel": "W12",
      "maxWeightKg": 110,
      "repsAtMax": 4,
      "estimated1RMKg": 123.7,
      "isPersonalRecord": true
    }
  ]
}
```

---

### GET `/api/progress/records`
All personal records for the current user.

**Query params:** `exerciseId` (optional — filter to one exercise)

**Response `200`:**
```json
{
  "personalRecords": [
    {
      "exercise": { "id": "cuid", "slug": "back-squat", "name": "Back Squat" },
      "weightKg": 110,
      "reps": 4,
      "estimated1RMKg": 123.7,
      "achievedAt": "2026-08-18T10:35:00Z"
    }
  ]
}
```

---

## Standard Error Response

All errors return a consistent shape:

```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE"
}
```

| HTTP Status | Code Examples |
|---|---|
| `400` | `VALIDATION_ERROR`, `INVALID_REQUEST` |
| `401` | `UNAUTHORIZED` |
| `403` | `FORBIDDEN` |
| `404` | `NOT_FOUND` |
| `409` | `CONFLICT`, `EMAIL_ALREADY_EXISTS` |
| `429` | `RATE_LIMITED` |
| `500` | `INTERNAL_ERROR` |
