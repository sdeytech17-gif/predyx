import fs from 'fs';

const viewerCss = `.viewerWrapper {
  position: relative;
  width: 100%;
  height: 540px;
  min-height: 460px;
  background: radial-gradient(circle at 50% 45%, #222b3a 0%, #171e2b 65%, #101520 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.35);
  user-select: none;
}

@media (min-width: 1024px) {
  .viewerWrapper {
    height: 580px;
  }
}

.canvas3d {
  width: 100%;
  height: 100%;
  display: block;
  touch-action: none;
  cursor: grab;
}

.canvas3d:active {
  cursor: grabbing;
}

.canvas3d:focus-visible {
  outline: 2px solid var(--color-amber);
  outline-offset: -2px;
}

.hudHeader {
  position: absolute;
  top: var(--space-3);
  left: var(--space-4);
  right: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 5;
}

.hudBadge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 4px var(--space-3);
  background-color: rgba(24, 32, 44, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
}

.liveIndicator {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: var(--color-success);
  box-shadow: 0 0 8px var(--color-success);
}

.hudTitle {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-wider);
}

.controlsHelp {
  display: none;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: #94a3b8;
  background-color: rgba(24, 32, 44, 0.82);
  padding: 4px var(--space-3);
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (min-width: 640px) {
  .controlsHelp {
    display: flex;
  }
}

.helpIcon {
  color: var(--color-steel);
}

.muscleTooltip {
  position: absolute;
  bottom: calc(var(--space-12) + 16px);
  left: var(--space-4);
  max-width: 320px;
  background-color: rgba(24, 32, 44, 0.95);
  border: 1px solid var(--color-border-amber);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6);
  z-index: 10;
  animation: tooltipEnter var(--dur-fast) var(--ease-sharp);
}

@keyframes tooltipEnter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.tooltipHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.closeTooltip {
  color: var(--color-text-muted);
  font-size: var(--text-tele-xs);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
}

.closeTooltip:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-elevated);
}

.tooltipName {
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.tooltipCue {
  font-size: var(--text-label-sm);
  color: #cbd5e1;
  line-height: 1.45;
}

.legendContainer {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-4);
  right: var(--space-4);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  background-color: rgba(24, 32, 44, 0.90);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  z-index: 5;
  width: max-content;
  max-width: calc(100% - 32px);
}

.legendItem {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.legendSwatch {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-xs);
}

.swatchAmber {
  background-color: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
}

.swatchSteel {
  background-color: #0ea5e9;
  box-shadow: 0 0 8px #0ea5e9;
}

.swatchNeutral {
  background-color: #526074;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.legendLabel {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: #cbd5e1;
  letter-spacing: var(--tracking-wider);
  white-space: nowrap;
}

.fallbackContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  text-align: center;
  background-color: #18202c;
}

.fallbackSvg {
  max-height: 260px;
  margin-bottom: var(--space-4);
}

.fallbackNotice {
  max-width: 380px;
  font-size: var(--text-label-sm);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}
`;

const eduTsx = `'use client';

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
        <span className={styles.loadingText}>INITIALIZING 3D WEBGL ENGINE...</span>
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
      aria-label="3D Kinematic Anatomy Engine"
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tagWrapper}>
            <Tag variant="steel">
              <Cube size={14} weight="bold" />
              <span>3D WEBGL BIOMECHANICS</span>
            </Tag>
          </div>
          <h2 className={styles.sectionTitle}>
            INTERACTIVE 3D <span className={styles.highlight}>ANATOMY VIEWER</span>
          </h2>
          <p className={styles.sectionDesc}>
            Real-time Three.js WebGL anatomical model with dynamic agonist and synergist shader highlights. Orbit, rotate, and inspect muscular force vectors in full 3D space.
          </p>
        </div>

        {/* Exercise Switcher Navigation Tabs - Positioned cleanly ABOVE the viewer */}
        <div className={styles.exerciseNav} role="tablist" aria-label="Exercise Presets">
          {exercisePresets.map((ex) => (
            <button
              key={ex.id}
              className={\`\${styles.exerciseTab} \${selectedExercise.id === ex.id ? styles.exerciseTabActive : ''}\`}
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
              autoRotate={true}
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
                      className={\`\${styles.muscleChip} \${styles.chipAmber} \${selectedMuscleId === mId ? styles.chipSelected : ''}\`}
                      onClick={() => setSelectedMuscleId(mId)}
                      aria-label={\`Highlight \${MUSCLE_METADATA[mId]?.name || mId}\`}
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
                      className={\`\${styles.muscleChip} \${styles.chipSteel} \${selectedMuscleId === mId ? styles.chipSelected : ''}\`}
                      onClick={() => setSelectedMuscleId(mId)}
                      aria-label={\`Highlight \${MUSCLE_METADATA[mId]?.name || mId}\`}
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
              <Tag variant="default">WCAG 2.1 AA COMPLIANT 3D ENGINE</Tag>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`;

const eduCss = `.section {
  position: relative;
  padding: var(--space-20) 0;
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-subtle);
  overflow: hidden;
}

.header {
  text-align: center;
  max-width: 780px;
  margin: 0 auto var(--space-8);
}

.tagWrapper {
  margin-bottom: var(--space-3);
  display: flex;
  justify-content: center;
}

.sectionTitle {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(var(--text-h3), 4vw, var(--text-h1));
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.highlight {
  color: var(--color-amber);
}

.sectionDesc {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Exercise Navigation Tabs */
.exerciseNav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
  position: relative;
  z-index: 10;
}

.exerciseTab {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-sharp),
    border-color var(--dur-fast) var(--ease-sharp),
    color var(--dur-fast) var(--ease-sharp);
}

.exerciseTab:hover {
  background-color: var(--color-bg-elevated);
  border-color: var(--color-border-medium);
  color: var(--color-text-primary);
}

.exerciseTabActive {
  background-color: var(--color-bg-elevated);
  border-color: var(--color-amber);
  color: var(--color-amber);
  box-shadow: 0 0 12px rgba(245, 166, 35, 0.15);
}

.tabIcon {
  color: inherit;
}

/* Main Container Grid */
.interactiveContainer {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: stretch;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .interactiveContainer {
    grid-template-columns: 1.35fr 0.65fr;
    gap: var(--space-8);
  }
}

.stage {
  position: relative;
  display: flex;
  flex-direction: column;
}

.viewerLoading {
  width: 100%;
  height: 540px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.loadingSpinner {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-border-subtle);
  border-top-color: var(--color-amber);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loadingText {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wider);
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.sidebarHeader {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-subtle);
}

.sidebarIcon {
  color: var(--color-amber);
  margin-top: 2px;
  flex-shrink: 0;
}

.sidebarTitle {
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.sidebarCategory {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-muted);
}

/* Muscle Breakdown Section */
.muscleSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.muscleGroupBlock {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.groupLabel {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-wider);
}

.chipRow {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.muscleChip {
  display: inline-flex;
  align-items: center;
  padding: 3px var(--space-3);
  border-radius: var(--radius-sm);
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-sharp),
    border-color var(--dur-fast) var(--ease-sharp),
    transform var(--dur-micro) var(--ease-sharp);
}

.muscleChip:active {
  transform: scale(0.96);
}

.chipAmber {
  background-color: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #fbbf24;
}

.chipAmber:hover, .chipAmber.chipSelected {
  background-color: #f59e0b;
  color: #08090a;
  border-color: #f59e0b;
  font-weight: var(--font-weight-semibold);
}

.chipSteel {
  background-color: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.35);
  color: #38bdf8;
}

.chipSteel:hover, .chipSteel.chipSelected {
  background-color: #0ea5e9;
  color: #08090a;
  border-color: #0ea5e9;
  font-weight: var(--font-weight-semibold);
}

/* Active Muscle Detail Box */
.activeMuscleBox {
  padding: var(--space-3) var(--space-4);
  background-color: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
}

.activeMuscleHeader {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  font-weight: var(--font-weight-semibold);
  color: #fbbf24;
  margin-bottom: 2px;
}

.activeMuscleIcon {
  color: #fbbf24;
}

.activeMuscleCue {
  font-size: var(--text-label-sm);
  color: var(--color-text-secondary);
  line-height: 1.45;
}

/* Readout Panels */
.dataPanel {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.dataRow {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--space-3);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--color-steel);
}

.dataLabel {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-wider);
}

.dataValue {
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.dataCueBox {
  padding: var(--space-4);
  background-color: rgba(245, 158, 11, 0.04);
  border: 1px solid rgba(245, 158, 11, 0.18);
  border-radius: var(--radius-md);
}

.dataCueHeader {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  font-weight: var(--font-weight-semibold);
  color: #fbbf24;
  margin-bottom: var(--space-1);
}

.dataCueIcon {
  color: #fbbf24;
}

.dataCueText {
  font-size: var(--text-label-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.sidebarFooter {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}
`;

fs.writeFileSync('app/components/exercise/AnatomyViewer/AnatomyViewer.module.css', viewerCss, 'utf8');
fs.writeFileSync('app/components/marketing/EducationPreview/EducationPreview.tsx', eduTsx, 'utf8');
fs.writeFileSync('app/components/marketing/EducationPreview/EducationPreview.module.css', eduCss, 'utf8');
console.log('All layout and style files written successfully.');
