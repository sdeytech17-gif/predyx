'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Crosshair, Barbell, Info, Lightning, Cube } from '@phosphor-icons/react';
import { Tag } from '@/app/components/ui/Tag/Tag';
import { MuscleHighlightId, MUSCLE_METADATA } from '@/app/components/exercise/AnatomyViewer/AnatomyModel';
import styles from './EducationPreview.module.css';

const AnatomyViewer = dynamic(
  () => import('@/app/components/exercise/AnatomyViewer/AnatomyViewer').then((mod) => mod.AnatomyViewer),
  {
    ssr: false,
    loading: () => (
      <div className={styles.viewerLoading}>
        <div className={styles.loadingSpinner} />
        <span className={styles.loadingText}>INITIALIZING KINEMATIC ANATOMY ENGINE...</span>
      </div>
    ),
  }
);

interface ExercisePreset {
  id: string;
  name: string;
  category: string;
  primaryMuscles: MuscleHighlightId[];
  secondaryMuscles: MuscleHighlightId[];
  movementPlane: string;
  loadProtocol: string;
  activationCue: string;
}

const exercisePresets: ExercisePreset[] = [
  {
    id: 'squat',
    name: 'Barbell Back Squat',
    category: 'Lower Body Compound',
    primaryMuscles: ['muscle_quads', 'muscle_glutes'],
    secondaryMuscles: ['muscle_abs', 'muscle_erectors', 'muscle_adductors', 'muscle_calves'],
    movementPlane: 'Sagittal (Knee & Hip Extension)',
    loadProtocol: 'Hypertrophy / 70-85% 1RM',
    activationCue: 'Maintain rigid thoracic extension, drive knees tracking over toes, push the floor away through midfoot.',
  },
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    category: 'Posterior Chain Kinetic',
    primaryMuscles: ['muscle_hamstrings', 'muscle_glutes', 'muscle_erectors'],
    secondaryMuscles: ['muscle_lats', 'muscle_traps_upper', 'muscle_traps_mid', 'muscle_forearms'],
    movementPlane: 'Sagittal (Hip Hinge Extension)',
    loadProtocol: 'Peak Force / RPE 8-9',
    activationCue: 'Pull slack out of the barbell, lock lats into back pockets, wedge hips and extend knees and hips simultaneously.',
  },
  {
    id: 'overhead-press',
    name: 'Standing Overhead Press',
    category: 'Vertical Upper Drive',
    primaryMuscles: ['muscle_front_delt', 'muscle_side_delt', 'muscle_triceps'],
    secondaryMuscles: ['muscle_traps_upper', 'muscle_chest', 'muscle_abs'],
    movementPlane: 'Frontal / Scapular Plane',
    loadProtocol: 'Strength / 75-85% 1RM',
    activationCue: 'Squeeze glutes and core, press bar in direct vertical bar path, shrug upper traps at lockout overhead.',
  },
  {
    id: 'barbell-row',
    name: 'Bent-Over Barbell Row',
    category: 'Horizontal Upper Pull',
    primaryMuscles: ['muscle_lats', 'muscle_traps_mid', 'muscle_biceps'],
    secondaryMuscles: ['muscle_rear_delt', 'muscle_erectors', 'muscle_forearms'],
    movementPlane: 'Transverse & Sagittal Pull',
    loadProtocol: 'Volume Load / RPE 7-8',
    activationCue: 'Hinge at 45 degrees, initiate pull with elbow drive toward hip crease, squeeze scapulae without lumbar jerk.',
  },
];

export const EducationPreview: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<ExercisePreset>(exercisePresets[0]);
  const [selectedMuscleId, setSelectedMuscleId] = useState<MuscleHighlightId | null>(null);

  const activeMuscleInfo = selectedMuscleId ? MUSCLE_METADATA[selectedMuscleId] : null;

  return (
    <section
      id="anatomy"
      className={styles.section}
      aria-label="2.5D Kinematic Anatomy Engine"
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tagWrapper}>
            <Tag variant="steel">
              <Cube size={14} weight="bold" />
              <span>2.5D KINEMATIC BIOMECHANICS</span>
            </Tag>
          </div>
          <h2 className={styles.sectionTitle}>
            INTERACTIVE KINEMATIC <span className={styles.highlight}>ANATOMY VIEWER</span>
          </h2>
          <p className={styles.sectionDesc}>
            Dynamic human anatomical model with real-time agonist and synergist force vector highlights. Select movement patterns, toggle anterior and posterior chains, and click any muscle region for precision biomechanical cues.
          </p>
        </div>

        {/* Exercise Switcher Navigation Tabs - Positioned cleanly ABOVE the viewer */}
        <div className={styles.exerciseNav} role="tablist" aria-label="Exercise Presets">
          {exercisePresets.map((ex) => (
            <button
              key={ex.id}
              className={`${styles.exerciseTab} ${selectedExercise.id === ex.id ? styles.exerciseTabActive : ''}`}
              onClick={() => {
                setSelectedExercise(ex);
                setSelectedMuscleId(null);
              }}
              role="tab"
              aria-selected={selectedExercise.id === ex.id}
            >
              <Barbell size={16} className={styles.tabIcon} />
              <span>{ex.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.interactiveContainer}>
          {/* Main 3D Viewport Stage */}
          <div className={styles.stage}>
            <AnatomyViewer
              exerciseName={selectedExercise.name}
              primaryMuscles={selectedExercise.primaryMuscles}
              secondaryMuscles={selectedExercise.secondaryMuscles}
              selectedMuscleId={selectedMuscleId}
              onSelectMuscle={(mId) => setSelectedMuscleId(mId)}
            />
          </div>

          {/* Biomechanics Telemetry Information Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <Crosshair size={20} className={styles.sidebarIcon} />
              <div>
                <h3 className={styles.sidebarTitle}>{selectedExercise.name}</h3>
                <span className={styles.sidebarCategory}>{selectedExercise.category}</span>
              </div>
            </div>

            {/* Muscle Highlight Breakdown */}
            <div className={styles.muscleSection}>
              <div className={styles.muscleGroupBlock}>
                <span className={styles.groupLabel}>PRIMARY AGONISTS (AMBER)</span>
                <div className={styles.chipRow}>
                  {selectedExercise.primaryMuscles.map((mId) => (
                    <button
                      key={mId}
                      className={`${styles.muscleChip} ${styles.chipAmber} ${selectedMuscleId === mId ? styles.chipSelected : ''}`}
                      onClick={() => setSelectedMuscleId(mId)}
                      aria-label={`Highlight ${MUSCLE_METADATA[mId]?.name || mId}`}
                    >
                      {MUSCLE_METADATA[mId]?.name || mId}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.muscleGroupBlock}>
                <span className={styles.groupLabel}>SECONDARY SYNERGISTS (CYAN)</span>
                <div className={styles.chipRow}>
                  {selectedExercise.secondaryMuscles.map((mId) => (
                    <button
                      key={mId}
                      className={`${styles.muscleChip} ${styles.chipSteel} ${selectedMuscleId === mId ? styles.chipSelected : ''}`}
                      onClick={() => setSelectedMuscleId(mId)}
                      aria-label={`Highlight ${MUSCLE_METADATA[mId]?.name || mId}`}
                    >
                      {MUSCLE_METADATA[mId]?.name || mId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Muscle Live HUD Feedback */}
            {activeMuscleInfo && (
              <div className={styles.activeMuscleBox}>
                <div className={styles.activeMuscleHeader}>
                  <Info size={16} className={styles.activeMuscleIcon} />
                  <span>INSPECTING: {activeMuscleInfo.name}</span>
                </div>
                <p className={styles.activeMuscleCue}>{activeMuscleInfo.cue}</p>
              </div>
            )}

            {/* Readout Panels */}
            <div className={styles.dataPanel}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>KINEMATIC PLANE</span>
                <span className={styles.dataValue}>{selectedExercise.movementPlane}</span>
              </div>

              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>LOAD PROTOCOL</span>
                <span className={styles.dataValue}>{selectedExercise.loadProtocol}</span>
              </div>

              <div className={styles.dataCueBox}>
                <div className={styles.dataCueHeader}>
                  <Lightning size={16} className={styles.dataCueIcon} />
                  <span>NEUROMUSCULAR ACTIVATION CUE</span>
                </div>
                <p className={styles.dataCueText}>{selectedExercise.activationCue}</p>
              </div>
            </div>

            <div className={styles.sidebarFooter}>
              <Tag variant="default">WCAG 2.1 AA COMPLIANT KINEMATIC ENGINE</Tag>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
