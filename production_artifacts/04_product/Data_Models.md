# PREDYX — Data Models

> **Version:** 1.0.0
> **Phase:** 4 — Product Architecture + 3D/Motion Planning
> **Date:** 2026-08-18
> **Owner:** @product
> **Status:** Complete

---

## Overview

This document defines the complete V1 data model for PREDYX, expressed as both entity definitions and Prisma schema. This is the authoritative data layer specification for Phase 7 implementation.

---

## Entity Relationship Overview

```
User
 ├── Preferences (1:1)
 ├── Sessions (1:N)
 │    └── ExerciseLogs (1:N)
 │         └── SetLogs (1:N)
 └── PersonalRecords (1:N)

Program
 └── Weeks (1:N)
      └── Days (1:N)
           └── SessionPlan (1:1)
                └── ExercisePlans (1:N) → Exercise

Workout (standalone)
 └── ExercisePlans (1:N) → Exercise

Exercise
 ├── ExerciseMuscles (1:N) → MuscleGroup
 └── ExerciseVariations (M:N self-referential)
```

---

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ─── ENUMS ────────────────────────────────────────────────────────────────────

enum Goal {
  STRENGTH
  CONDITIONING
  HYBRID
  GENERAL_FITNESS
}

enum ExperienceLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum Equipment {
  FULL_GYM
  DUMBBELLS
  BODYWEIGHT
  BARBELL
  RESISTANCE_BANDS
  KETTLEBELLS
  CABLE
  MACHINE
}

enum MovementPattern {
  HINGE
  SQUAT
  PUSH
  PULL
  CARRY
  ROTATE
  LUNGE
  CORE
  CARDIO
}

enum MuscleGroupName {
  CHEST
  BACK
  SHOULDERS
  BICEPS
  TRICEPS
  FOREARMS
  QUADS
  HAMSTRINGS
  GLUTES
  CALVES
  CORE
  HIP_FLEXORS
  ADDUCTORS
  ERECTORS
}

enum SessionStatus {
  IN_PROGRESS
  COMPLETED
  ABANDONED
}

enum SessionSourceType {
  PROGRAM
  WORKOUT
  CUSTOM
}

enum WorkoutType {
  STRENGTH
  HIIT
  MOBILITY
  CONDITIONING
  HYBRID
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum MuscleRole {
  PRIMARY
  SECONDARY
}

enum Units {
  KG
  LBS
}

// ─── USER ─────────────────────────────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  name          String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  preferences   UserPreferences?
  sessions      Session[]
  personalRecords PersonalRecord[]

  @@index([email])
}

model UserPreferences {
  id                  String          @id @default(cuid())
  userId              String          @unique
  user                User            @relation(fields: [userId], references: [id], onDelete: Cascade)

  goal                Goal            @default(GENERAL_FITNESS)
  experienceLevel     ExperienceLevel @default(BEGINNER)
  equipment           Equipment[]
  trainingDaysPerWeek Int             @default(3)
  units               Units           @default(KG)
  restTimerDefault    Int             @default(90)  // seconds
  audioCuesEnabled    Boolean         @default(true)
  reducedMotion       Boolean         @default(false)
  captionsEnabled     Boolean         @default(true)

  enrolledProgramId   String?         // currently active program
  enrolledWeek        Int?            // current week number in program

  updatedAt           DateTime        @updatedAt
}

// ─── EXERCISE LIBRARY ─────────────────────────────────────────────────────────

model Exercise {
  id                String          @id @default(cuid())
  slug              String          @unique
  name              String
  description       String?
  movementPattern   MovementPattern
  equipment         Equipment[]
  difficulty        Difficulty      @default(INTERMEDIATE)

  // Content delivery
  videoMuxId        String?         // Mux asset ID
  videoMuxPlaybackId String?        // Mux playback ID
  anatomyModelPath  String?         // CDN path to GLTF/GLB file

  // Instruction content
  cues              String[]        // Ordered movement cues
  commonErrors      String[]        // Common form errors to avoid

  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  // Relations
  muscles           ExerciseMuscle[]
  variations        ExerciseVariation[] @relation("BaseExercise")
  variationOf       ExerciseVariation[] @relation("VariationExercise")
  exercisePlans     ExercisePlan[]
  exerciseLogs      ExerciseLog[]
  personalRecords   PersonalRecord[]

  @@index([slug])
  @@index([movementPattern])
}

model MuscleGroup {
  id        String          @id @default(cuid())
  name      MuscleGroupName @unique
  exercises ExerciseMuscle[]
}

model ExerciseMuscle {
  exerciseId    String
  muscleGroupId String
  role          MuscleRole

  exercise      Exercise    @relation(fields: [exerciseId], references: [id], onDelete: Cascade)
  muscleGroup   MuscleGroup @relation(fields: [muscleGroupId], references: [id])

  @@id([exerciseId, muscleGroupId])
}

model ExerciseVariation {
  baseExerciseId      String
  variationExerciseId String

  baseExercise        Exercise @relation("BaseExercise", fields: [baseExerciseId], references: [id])
  variationExercise   Exercise @relation("VariationExercise", fields: [variationExerciseId], references: [id])

  @@id([baseExerciseId, variationExerciseId])
}

// ─── EXERCISE PLAN (shared between Programs and Workouts) ─────────────────────

model ExercisePlan {
  id                String    @id @default(cuid())
  exerciseId        String
  exercise          Exercise  @relation(fields: [exerciseId], references: [id])
  order             Int
  sets              Int
  repsTarget        Int?      // null = AMRAP or duration-based
  repsDuration      Int?      // seconds, if duration-based
  restSeconds       Int       @default(90)
  rpeTarget         Int?      // Rate of Perceived Exertion 1–10
  notes             String?

  // Parent — one of these will be set, the other null
  sessionPlanId     String?
  sessionPlan       SessionPlan? @relation(fields: [sessionPlanId], references: [id], onDelete: Cascade)
  workoutId         String?
  workout           Workout? @relation(fields: [workoutId], references: [id], onDelete: Cascade)
}

// ─── PROGRAMS ────────────────────────────────────────────────────────────────

model Program {
  id                String    @id @default(cuid())
  slug              String    @unique
  name              String
  description       String
  goal              Goal
  durationWeeks     Int
  daysPerWeek       Int
  equipment         Equipment[]
  difficulty        Difficulty
  tags              String[]

  coverImagePath    String?   // CDN path

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  weeks             ProgramWeek[]

  @@index([slug])
  @@index([goal])
  @@index([difficulty])
}

model ProgramWeek {
  id          String    @id @default(cuid())
  programId   String
  program     Program   @relation(fields: [programId], references: [id], onDelete: Cascade)
  weekNumber  Int
  description String?

  days        ProgramDay[]

  @@unique([programId, weekNumber])
}

model ProgramDay {
  id            String      @id @default(cuid())
  weekId        String
  week          ProgramWeek @relation(fields: [weekId], references: [id], onDelete: Cascade)
  dayNumber     Int
  name          String      // e.g. "Upper Body — Push Focus"
  isRestDay     Boolean     @default(false)

  sessionPlan   SessionPlan?

  @@unique([weekId, dayNumber])
}

model SessionPlan {
  id          String        @id @default(cuid())
  dayId       String        @unique
  day         ProgramDay    @relation(fields: [dayId], references: [id], onDelete: Cascade)

  exercises   ExercisePlan[]
}

// ─── WORKOUTS (standalone) ───────────────────────────────────────────────────

model Workout {
  id                String      @id @default(cuid())
  slug              String      @unique
  name              String
  description       String
  type              WorkoutType
  durationMinutes   Int
  equipment         Equipment[]
  difficulty        Difficulty
  tags              String[]

  coverImagePath    String?

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  exercises         ExercisePlan[]

  @@index([slug])
  @@index([type])
  @@index([difficulty])
}

// ─── SESSIONS (user training records) ────────────────────────────────────────

model Session {
  id              String            @id @default(cuid())
  userId          String
  user            User              @relation(fields: [userId], references: [id], onDelete: Cascade)

  sourceType      SessionSourceType
  sourceProgramId String?           // if sourceType = PROGRAM
  sourceWeek      Int?
  sourceDay       Int?
  sourceWorkoutId String?           // if sourceType = WORKOUT

  status          SessionStatus     @default(IN_PROGRESS)
  startedAt       DateTime          @default(now())
  completedAt     DateTime?
  durationSeconds Int?

  notes           String?

  exerciseLogs    ExerciseLog[]

  @@index([userId])
  @@index([userId, status])
  @@index([userId, startedAt])
}

model ExerciseLog {
  id          String      @id @default(cuid())
  sessionId   String
  session     Session     @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  exerciseId  String
  exercise    Exercise    @relation(fields: [exerciseId], references: [id])
  order       Int
  skipped     Boolean     @default(false)

  sets        SetLog[]

  @@index([sessionId])
  @@index([exerciseId])
}

model SetLog {
  id              String      @id @default(cuid())
  exerciseLogId   String
  exerciseLog     ExerciseLog @relation(fields: [exerciseLogId], references: [id], onDelete: Cascade)
  setNumber       Int
  weightKg        Float?      // stored in kg; converted to lbs in UI by user units preference
  reps            Int?
  durationSeconds Int?        // for duration-based sets
  completed       Boolean     @default(false)
  completedAt     DateTime?
  rpe             Int?        // Rate of Perceived Exertion logged by user
  notes           String?

  @@index([exerciseLogId])
}

// ─── PERSONAL RECORDS ────────────────────────────────────────────────────────

model PersonalRecord {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  exerciseId  String
  exercise    Exercise  @relation(fields: [exerciseId], references: [id])

  weightKg    Float
  reps        Int
  // Estimated 1RM = weightKg × (1 + reps/30) — Epley formula
  estimated1RMKg Float?

  achievedAt  DateTime
  sessionId   String?   // Reference to the session where this PR was set

  @@index([userId, exerciseId])
  @@index([userId, achievedAt])
}
```

---

## Key Data Design Decisions

| Decision | Rationale |
|---|---|
| Weight stored in kg universally | Single source of truth — UI converts to lbs based on `UserPreferences.units` |
| `SessionPlan` separate from `Session` | `SessionPlan` is the template (what the program prescribes); `Session` is the record (what the user actually did) |
| `ExercisePlan` shared by programs and workouts | Same structure — no duplication of plan logic |
| `slug` on Program / Workout / Exercise | URL-safe identifiers for ISR pages (`/programs/12-week-powerbuilding`) |
| `PersonalRecord.estimated1RMKg` | Computed and stored at PR time using Epley formula — avoids re-computing in queries |
| `Session.durationSeconds` | Stored as integer seconds — simple, timezone-independent |
| `SetLog.weightKg` nullable | Not all exercises use weight (bodyweight, duration-based); null = bodyweight |

---

## Seed Data Plan

The following content types will be seeded via `prisma/seed.ts` for V1:

| Content | V1 Seed Count |
|---|---|
| Exercises | ~60–80 core exercises (covering all major movement patterns and muscle groups) |
| Muscle Groups | 14 (all MuscleGroupName enum values) |
| Programs | 3–5 initial programs (strength-focused, conditioning, hybrid) |
| Workouts (standalone) | 15–20 (variety of types, durations, equipment) |
| Users | 0 (user data is never seeded) |
