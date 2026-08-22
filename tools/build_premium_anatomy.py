import os

anatomy_tsx = """'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MuscleHighlightId, PREDYX_MUSCLE_IDS, MUSCLE_METADATA } from './AnatomyModel';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import { Tag } from '@/app/components/ui/Tag/Tag';
import styles from './AnatomyViewer.module.css';

export interface AnatomyViewerProps {
  exerciseName?: string;
  primaryMuscles?: MuscleHighlightId[];
  secondaryMuscles?: MuscleHighlightId[];
  className?: string;
  selectedMuscleId?: MuscleHighlightId | null;
  onSelectMuscle?: (muscleId: MuscleHighlightId | null) => void;
}

type BodyView = 'anterior' | 'posterior';

export const AnatomyViewer: React.FC<AnatomyViewerProps> = ({
  exerciseName = 'Kinematic Movement',
  primaryMuscles = ['muscle_quads', 'muscle_glutes'],
  secondaryMuscles = ['muscle_abs', 'muscle_erectors'],
  className,
  selectedMuscleId = null,
  onSelectMuscle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Auto-switch view if exercise is predominantly posterior or anterior
  const isPosteriorDominant = primaryMuscles.some((m) =>
    ['muscle_hamstrings', 'muscle_lats', 'muscle_traps_mid', 'muscle_rear_delt', 'muscle_erectors'].includes(m)
  );

  const [activeView, setActiveView] = useState<BodyView>(isPosteriorDominant ? 'posterior' : 'anterior');
  const [hoveredMuscle, setHoveredMuscle] = useState<MuscleHighlightId | null>(null);

  // Sync view when exercise changes
  useEffect(() => {
    setActiveView(isPosteriorDominant ? 'posterior' : 'anterior');
  }, [exerciseName, isPosteriorDominant]);

  // 2.5D Pointer Parallax Perspective Tilt
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !cardRef.current) return;
    const container = containerRef.current;
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 12,
        rotateX: -y * 12,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.45,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        ease: 'power2.out',
        duration: 0.7,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Dynamic GSAP Transitions for Muscle Highlighting
  useEffect(() => {
    if (!svgRef.current) return;

    PREDYX_MUSCLE_IDS.forEach((muscleId) => {
      const elements = svgRef.current?.querySelectorAll('[data-muscle="' + muscleId + '"]');
      if (!elements || elements.length === 0) return;

      const isPrimary = primaryMuscles.includes(muscleId);
      const isSecondary = secondaryMuscles.includes(muscleId);
      const isSelected = selectedMuscleId === muscleId;
      const isHovered = hoveredMuscle === muscleId;

      let fillColor = '#283446';
      let strokeColor = '#3e4d64';
      let filter = 'none';
      let opacity = 0.88;

      if (isSelected) {
        fillColor = '#fde047';
        strokeColor = '#ffffff';
        filter = 'drop-shadow(0 0 16px rgba(253, 224, 71, 0.95))';
        opacity = 1.0;
      } else if (isPrimary) {
        fillColor = isHovered ? '#fbbf24' : '#f59e0b';
        strokeColor = '#fef3c7';
        filter = 'drop-shadow(0 0 14px rgba(245, 158, 11, 0.90))';
        opacity = 1.0;
      } else if (isSecondary) {
        fillColor = isHovered ? '#38bdf8' : '#0ea5e9';
        strokeColor = '#e0f2fe';
        filter = 'drop-shadow(0 0 12px rgba(14, 165, 233, 0.82))';
        opacity = 0.95;
      } else {
        fillColor = isHovered ? '#475569' : '#253142';
        strokeColor = isHovered ? '#64748b' : '#38475c';
        opacity = 0.85;
      }

      if (prefersReducedMotion) {
        elements.forEach((el) => {
          const pathEl = el as SVGElement;
          pathEl.style.fill = fillColor;
          pathEl.style.stroke = strokeColor;
          pathEl.style.filter = filter;
          pathEl.style.opacity = opacity.toString();
        });
      } else {
        gsap.to(elements, {
          fill: fillColor,
          stroke: strokeColor,
          filter: filter,
          opacity: opacity,
          duration: 0.45,
          ease: 'power2.out',
        });
      }
    });
  }, [primaryMuscles, secondaryMuscles, selectedMuscleId, hoveredMuscle, activeView, prefersReducedMotion]);

  const handleMuscleClick = (muscleId: MuscleHighlightId) => {
    if (selectedMuscleId === muscleId) {
      onSelectMuscle?.(null);
    } else {
      onSelectMuscle?.(muscleId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, muscleId: MuscleHighlightId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMuscleClick(muscleId);
    }
  };

  const activeMetadata = selectedMuscleId ? MUSCLE_METADATA[selectedMuscleId] : null;

  return (
    <div
      ref={containerRef}
      className={styles.viewerWrapper + ' ' + (className || '')}
      aria-label={'Interactive Kinematic Anatomy Visualization for ' + exerciseName}
    >
      {/* Top HUD Controls */}
      <div className={styles.hudHeader}>
        <div className={styles.hudBadge}>
          <span className={styles.liveIndicator} />
          <span className={styles.hudTitle}>2.5D KINEMATIC ANATOMY</span>
        </div>

        {/* View Toggle Button: Anterior / Posterior */}
        <div className={styles.viewToggleGroup} role="group" aria-label="Anatomical View Toggle">
          <button
            type="button"
            className={styles.viewToggleBtn + ' ' + (activeView === 'anterior' ? styles.viewToggleActive : '')}
            onClick={() => setActiveView('anterior')}
            aria-pressed={activeView === 'anterior'}
          >
            ANTERIOR (FRONT)
          </button>
          <button
            type="button"
            className={styles.viewToggleBtn + ' ' + (activeView === 'posterior' ? styles.viewToggleActive : '')}
            onClick={() => setActiveView('posterior')}
            aria-pressed={activeView === 'posterior'}
          >
            POSTERIOR (BACK)
          </button>
        </div>
      </div>

      {/* 2.5D Interactive Card Canvas */}
      <div ref={cardRef} className={styles.figureStage}>
        {/* Soft Radial Studio Environment Glow */}
        <div className={styles.studioGlow} />

        {/* Grounding Perspective Radar & Contact Shadow */}
        <div className={styles.groundingRadar} />
        <div className={styles.contactShadow} />

        {/* Scalable Vector Athletic Anatomy Figure */}
        <svg
          ref={svgRef}
          viewBox="0 0 400 620"
          className={styles.anatomySvg}
          role="img"
          aria-label={'Human anatomical musculature - ' + activeView + ' view'}
        >
          <defs>
            <linearGradient id="bodyBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2736" />
              <stop offset="50%" stopColor="#253245" />
              <stop offset="100%" stopColor="#18202d" />
            </linearGradient>
            <linearGradient id="boneAccent" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* ================================================================= */}
          {/* ANTERIOR (FRONT) ANATOMY VIEW                                     */}
          {/* ================================================================= */}
          {activeView === 'anterior' && (
            <g id="anteriorView" className={styles.anatomyGroup}>
              {/* Continuous Athletic Base Body Silhouette */}
              <path
                d="M175,70 C165,70 152,85 145,105 C138,125 110,140 102,175 C95,210 100,260 95,305 C90,345 80,380 92,400 C100,402 108,390 115,350 C125,295 130,230 135,185 C140,210 145,250 148,290 C150,330 145,395 142,475 C140,535 135,570 148,580 C160,582 165,565 170,515 C175,465 185,385 195,335 C205,385 215,465 220,515 C225,565 230,582 242,580 C255,570 250,535 248,475 C245,395 240,330 242,290 C245,250 250,210 255,185 C260,230 265,295 275,350 C282,390 290,402 298,400 C310,380 300,345 295,305 C290,260 295,210 288,175 C280,140 252,125 245,105 C238,85 225,70 215,70 Z"
                fill="url(#bodyBaseGrad)"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Head & Cranium */}
              <ellipse cx="195" cy="48" rx="28" ry="36" fill="#283446" stroke="#3e4d64" strokeWidth="1.5" />
              {/* Sternocleidomastoid Neck Pillars */}
              <path d="M182,78 L182,106 C188,110 202,110 208,106 L208,78 Z" fill="#202a39" stroke="#334155" strokeWidth="1.5" />

              {/* Clavicles */}
              <path d="M148,112 Q195,120 242,112" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

              {/* PECTORALIS MAJOR & MINOR (Chest) */}
              <path
                data-muscle="muscle_chest"
                className={styles.musclePath}
                d="M150,116 C165,118 190,124 192,154 C175,162 148,158 138,136 Z"
                tabIndex={0}
                role="button"
                aria-label="Pectoralis Major & Minor"
                onClick={() => handleMuscleClick('muscle_chest')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_chest')}
                onMouseEnter={() => setHoveredMuscle('muscle_chest')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_chest"
                className={styles.musclePath}
                d="M240,116 C225,118 200,124 198,154 C215,162 242,158 252,136 Z"
                tabIndex={0}
                role="button"
                aria-label="Pectoralis Major & Minor"
                onClick={() => handleMuscleClick('muscle_chest')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_chest')}
                onMouseEnter={() => setHoveredMuscle('muscle_chest')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* ANTERIOR DELTOIDS */}
              <path
                data-muscle="muscle_front_delt"
                className={styles.musclePath}
                d="M142,110 C125,118 116,135 118,152 C125,155 136,145 140,132 Z"
                tabIndex={0}
                role="button"
                aria-label="Anterior Deltoid"
                onClick={() => handleMuscleClick('muscle_front_delt')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_front_delt')}
                onMouseEnter={() => setHoveredMuscle('muscle_front_delt')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_front_delt"
                className={styles.musclePath}
                d="M248,110 C265,118 274,135 272,152 C265,155 254,145 250,132 Z"
                tabIndex={0}
                role="button"
                aria-label="Anterior Deltoid"
                onClick={() => handleMuscleClick('muscle_front_delt')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_front_delt')}
                onMouseEnter={() => setHoveredMuscle('muscle_front_delt')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* LATERAL DELTOIDS */}
              <path
                data-muscle="muscle_side_delt"
                className={styles.musclePath}
                d="M116,134 C104,144 102,165 106,178 C115,176 122,164 122,152 Z"
                tabIndex={0}
                role="button"
                aria-label="Lateral Deltoid"
                onClick={() => handleMuscleClick('muscle_side_delt')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_side_delt')}
                onMouseEnter={() => setHoveredMuscle('muscle_side_delt')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_side_delt"
                className={styles.musclePath}
                d="M274,134 C286,144 288,165 284,178 C275,176 268,164 268,152 Z"
                tabIndex={0}
                role="button"
                aria-label="Lateral Deltoid"
                onClick={() => handleMuscleClick('muscle_side_delt')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_side_delt')}
                onMouseEnter={() => setHoveredMuscle('muscle_side_delt')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* BICEPS BRACHII */}
              <path
                data-muscle="muscle_biceps"
                className={styles.musclePath}
                d="M112,176 C105,190 106,215 112,228 C120,225 124,205 122,184 Z"
                tabIndex={0}
                role="button"
                aria-label="Biceps Brachii"
                onClick={() => handleMuscleClick('muscle_biceps')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_biceps')}
                onMouseEnter={() => setHoveredMuscle('muscle_biceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_biceps"
                className={styles.musclePath}
                d="M278,176 C285,190 284,215 278,228 C270,225 266,205 268,184 Z"
                tabIndex={0}
                role="button"
                aria-label="Biceps Brachii"
                onClick={() => handleMuscleClick('muscle_biceps')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_biceps')}
                onMouseEnter={() => setHoveredMuscle('muscle_biceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* BRACHIORADIALIS & FOREARMS */}
              <path
                data-muscle="muscle_forearms"
                className={styles.musclePath}
                d="M110,234 C100,250 96,285 94,308 C100,310 108,290 114,260 Z"
                tabIndex={0}
                role="button"
                aria-label="Forearm Flexors & Brachioradialis"
                onClick={() => handleMuscleClick('muscle_forearms')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_forearms')}
                onMouseEnter={() => setHoveredMuscle('muscle_forearms')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_forearms"
                className={styles.musclePath}
                d="M280,234 C290,250 294,285 296,308 C290,310 282,290 276,260 Z"
                tabIndex={0}
                role="button"
                aria-label="Forearm Flexors & Brachioradialis"
                onClick={() => handleMuscleClick('muscle_forearms')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_forearms')}
                onMouseEnter={() => setHoveredMuscle('muscle_forearms')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* RECTUS ABDOMINIS (6-PACK) */}
              <g
                data-muscle="muscle_abs"
                className={styles.muscleGroupPath}
                tabIndex={0}
                role="button"
                aria-label="Rectus Abdominis"
                onClick={() => handleMuscleClick('muscle_abs')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_abs')}
                onMouseEnter={() => setHoveredMuscle('muscle_abs')}
                onMouseLeave={() => setHoveredMuscle(null)}
              >
                {/* Upper Tier */}
                <rect x="178" y="162" width="15" height="18" rx="3" className={styles.musclePath} />
                <rect x="197" y="162" width="15" height="18" rx="3" className={styles.musclePath} />
                {/* Mid Tier */}
                <rect x="178" y="184" width="15" height="18" rx="3" className={styles.musclePath} />
                <rect x="197" y="184" width="15" height="18" rx="3" className={styles.musclePath} />
                {/* Lower Tier */}
                <rect x="178" y="206" width="15" height="20" rx="3" className={styles.musclePath} />
                <rect x="197" y="206" width="15" height="20" rx="3" className={styles.musclePath} />
              </g>

              {/* EXTERNAL & INTERNAL OBLIQUES */}
              <path
                data-muscle="muscle_obliques"
                className={styles.musclePath}
                d="M152,170 C145,190 144,220 156,242 C162,238 168,205 168,178 Z"
                tabIndex={0}
                role="button"
                aria-label="Internal & External Obliques"
                onClick={() => handleMuscleClick('muscle_obliques')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_obliques')}
                onMouseEnter={() => setHoveredMuscle('muscle_obliques')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_obliques"
                className={styles.musclePath}
                d="M238,170 C245,190 246,220 234,242 C228,238 222,205 222,178 Z"
                tabIndex={0}
                role="button"
                aria-label="Internal & External Obliques"
                onClick={() => handleMuscleClick('muscle_obliques')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_obliques')}
                onMouseEnter={() => setHoveredMuscle('muscle_obliques')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* HIP FLEXORS (Iliopsoas) */}
              <path
                data-muscle="muscle_hip_flexors"
                className={styles.musclePath}
                d="M166,248 C160,265 158,285 162,298 C170,290 176,275 178,255 Z"
                tabIndex={0}
                role="button"
                aria-label="Hip Flexors (Iliopsoas)"
                onClick={() => handleMuscleClick('muscle_hip_flexors')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_hip_flexors')}
                onMouseEnter={() => setHoveredMuscle('muscle_hip_flexors')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_hip_flexors"
                className={styles.musclePath}
                d="M224,248 C230,265 232,285 228,298 C220,290 214,275 212,255 Z"
                tabIndex={0}
                role="button"
                aria-label="Hip Flexors (Iliopsoas)"
                onClick={() => handleMuscleClick('muscle_hip_flexors')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_hip_flexors')}
                onMouseEnter={() => setHoveredMuscle('muscle_hip_flexors')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* ADDUCTORS (Inner Thighs) */}
              <path
                data-muscle="muscle_adductors"
                className={styles.musclePath}
                d="M182,295 C180,320 178,355 180,380 C186,375 190,345 192,305 Z"
                tabIndex={0}
                role="button"
                aria-label="Adductor Longus & Magnus"
                onClick={() => handleMuscleClick('muscle_adductors')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_adductors')}
                onMouseEnter={() => setHoveredMuscle('muscle_adductors')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_adductors"
                className={styles.musclePath}
                d="M208,295 C210,320 212,355 210,380 C204,375 200,345 198,305 Z"
                tabIndex={0}
                role="button"
                aria-label="Adductor Longus & Magnus"
                onClick={() => handleMuscleClick('muscle_adductors')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_adductors')}
                onMouseEnter={() => setHoveredMuscle('muscle_adductors')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* QUADRICEPS (Rectus Femoris & Vastus Lateralis/Medialis) */}
              <path
                data-muscle="muscle_quads"
                className={styles.musclePath}
                d="M152,295 C142,325 140,375 146,420 C158,418 174,405 176,350 C176,315 168,295 152,295 Z"
                tabIndex={0}
                role="button"
                aria-label="Quadriceps Femoris"
                onClick={() => handleMuscleClick('muscle_quads')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_quads')}
                onMouseEnter={() => setHoveredMuscle('muscle_quads')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_quads"
                className={styles.musclePath}
                d="M238,295 C248,325 250,375 244,420 C232,418 216,405 214,350 C214,315 222,295 238,295 Z"
                tabIndex={0}
                role="button"
                aria-label="Quadriceps Femoris"
                onClick={() => handleMuscleClick('muscle_quads')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_quads')}
                onMouseEnter={() => setHoveredMuscle('muscle_quads')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* Patella / Kneecaps */}
              <circle cx="160" cy="434" r="8" fill="#283446" stroke="#3e4d64" strokeWidth="1.5" />
              <circle cx="230" cy="434" r="8" fill="#283446" stroke="#3e4d64" strokeWidth="1.5" />

              {/* CALVES & SHINS (Tibialis Anterior / Soleus) */}
              <path
                data-muscle="muscle_calves"
                className={styles.musclePath}
                d="M148,446 C140,470 138,510 144,550 C154,545 166,525 168,475 C168,455 160,446 148,446 Z"
                tabIndex={0}
                role="button"
                aria-label="Tibialis Anterior & Calves"
                onClick={() => handleMuscleClick('muscle_calves')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_calves')}
                onMouseEnter={() => setHoveredMuscle('muscle_calves')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_calves"
                className={styles.musclePath}
                d="M242,446 C250,470 252,510 246,550 C236,545 224,525 222,475 C222,455 230,446 242,446 Z"
                tabIndex={0}
                role="button"
                aria-label="Tibialis Anterior & Calves"
                onClick={() => handleMuscleClick('muscle_calves')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_calves')}
                onMouseEnter={() => setHoveredMuscle('muscle_calves')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* Feet & Ankles */}
              <path d="M140,565 C132,572 135,582 152,582 C162,582 168,575 165,565 Z" fill="#202a39" stroke="#334155" strokeWidth="1.5" />
              <path d="M250,565 C258,572 255,582 238,582 C228,582 222,575 225,565 Z" fill="#202a39" stroke="#334155" strokeWidth="1.5" />
            </g>
          )}

          {/* ================================================================= */}
          {/* POSTERIOR (BACK) ANATOMY VIEW                                     */}
          {/* ================================================================= */}
          {activeView === 'posterior' && (
            <g id="posteriorView" className={styles.anatomyGroup}>
              {/* Continuous Athletic Base Body Silhouette */}
              <path
                d="M175,70 C165,70 152,85 145,105 C138,125 110,140 102,175 C95,210 100,260 95,305 C90,345 80,380 92,400 C100,402 108,390 115,350 C125,295 130,230 135,185 C140,210 145,250 148,290 C150,330 145,395 142,475 C140,535 135,570 148,580 C160,582 165,565 170,515 C175,465 185,385 195,335 C205,385 215,465 220,515 C225,565 230,582 242,580 C255,570 250,535 248,475 C245,395 240,330 242,290 C245,250 250,210 255,185 C260,230 265,295 275,350 C282,390 290,402 298,400 C310,380 300,345 295,305 C290,260 295,210 288,175 C280,140 252,125 245,105 C238,85 225,70 215,70 Z"
                fill="url(#bodyBaseGrad)"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Head & Cervical Spine */}
              <ellipse cx="195" cy="48" rx="28" ry="36" fill="#283446" stroke="#3e4d64" strokeWidth="1.5" />
              <path d="M184,78 L184,102 C190,105 200,105 206,102 L206,78 Z" fill="#202a39" stroke="#334155" strokeWidth="1.5" />

              {/* UPPER TRAPEZIUS (Neck to Clavicle Slope) */}
              <path
                data-muscle="muscle_traps_upper"
                className={styles.musclePath}
                d="M178,92 L144,116 C155,124 175,130 195,130 C215,130 235,124 246,116 L212,92 C206,96 184,96 178,92 Z"
                tabIndex={0}
                role="button"
                aria-label="Upper Trapezius"
                onClick={() => handleMuscleClick('muscle_traps_upper')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_traps_upper')}
                onMouseEnter={() => setHoveredMuscle('muscle_traps_upper')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* MID TRAPEZIUS & RHOMBOIDS (Diamond Scapular Center) */}
              <path
                data-muscle="muscle_traps_mid"
                className={styles.musclePath}
                d="M195,132 L158,154 C170,185 188,198 195,210 C202,198 220,185 232,154 Z"
                tabIndex={0}
                role="button"
                aria-label="Mid Trapezius & Rhomboids"
                onClick={() => handleMuscleClick('muscle_traps_mid')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_traps_mid')}
                onMouseEnter={() => setHoveredMuscle('muscle_traps_mid')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* POSTERIOR / REAR DELTOIDS */}
              <path
                data-muscle="muscle_rear_delt"
                className={styles.musclePath}
                d="M140,118 C122,126 112,148 116,165 C124,166 136,155 142,140 Z"
                tabIndex={0}
                role="button"
                aria-label="Posterior Deltoid"
                onClick={() => handleMuscleClick('muscle_rear_delt')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_rear_delt')}
                onMouseEnter={() => setHoveredMuscle('muscle_rear_delt')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_rear_delt"
                className={styles.musclePath}
                d="M250,118 C268,126 278,148 274,165 C266,166 254,155 248,140 Z"
                tabIndex={0}
                role="button"
                aria-label="Posterior Deltoid"
                onClick={() => handleMuscleClick('muscle_rear_delt')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_rear_delt')}
                onMouseEnter={() => setHoveredMuscle('muscle_rear_delt')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* TRICEPS BRACHII */}
              <path
                data-muscle="muscle_triceps"
                className={styles.musclePath}
                d="M112,170 C104,192 105,216 112,230 C120,225 125,200 122,178 Z"
                tabIndex={0}
                role="button"
                aria-label="Triceps Brachii"
                onClick={() => handleMuscleClick('muscle_triceps')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_triceps')}
                onMouseEnter={() => setHoveredMuscle('muscle_triceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_triceps"
                className={styles.musclePath}
                d="M278,170 C286,192 285,216 278,230 C270,225 265,200 268,178 Z"
                tabIndex={0}
                role="button"
                aria-label="Triceps Brachii"
                onClick={() => handleMuscleClick('muscle_triceps')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_triceps')}
                onMouseEnter={() => setHoveredMuscle('muscle_triceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* FOREARMS (Extensors & Posterior Compartment) */}
              <path
                data-muscle="muscle_forearms"
                className={styles.musclePath}
                d="M110,234 C100,250 96,285 94,308 C100,310 108,290 114,260 Z"
                tabIndex={0}
                role="button"
                aria-label="Posterior Forearm Extensors"
                onClick={() => handleMuscleClick('muscle_forearms')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_forearms')}
                onMouseEnter={() => setHoveredMuscle('muscle_forearms')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_forearms"
                className={styles.musclePath}
                d="M280,234 C290,250 294,285 296,308 C290,310 282,290 276,260 Z"
                tabIndex={0}
                role="button"
                aria-label="Posterior Forearm Extensors"
                onClick={() => handleMuscleClick('muscle_forearms')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_forearms')}
                onMouseEnter={() => setHoveredMuscle('muscle_forearms')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* LATISSIMUS DORSI (V-Taper Wings) */}
              <path
                data-muscle="muscle_lats"
                className={styles.musclePath}
                d="M152,158 C140,185 142,225 160,248 C168,230 178,205 174,178 Z"
                tabIndex={0}
                role="button"
                aria-label="Latissimus Dorsi"
                onClick={() => handleMuscleClick('muscle_lats')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_lats')}
                onMouseEnter={() => setHoveredMuscle('muscle_lats')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_lats"
                className={styles.musclePath}
                d="M238,158 C250,185 248,225 230,248 C222,230 212,205 216,178 Z"
                tabIndex={0}
                role="button"
                aria-label="Latissimus Dorsi"
                onClick={() => handleMuscleClick('muscle_lats')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_lats')}
                onMouseEnter={() => setHoveredMuscle('muscle_lats')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* ERECTOR SPINAE (Dual Lumbar Columns) */}
              <path
                data-muscle="muscle_erectors"
                className={styles.musclePath}
                d="M182,185 C180,215 180,255 182,280 C190,280 192,250 192,185 Z"
                tabIndex={0}
                role="button"
                aria-label="Erector Spinae"
                onClick={() => handleMuscleClick('muscle_erectors')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_erectors')}
                onMouseEnter={() => setHoveredMuscle('muscle_erectors')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_erectors"
                className={styles.musclePath}
                d="M208,185 C210,215 210,255 208,280 C200,280 198,250 198,185 Z"
                tabIndex={0}
                role="button"
                aria-label="Erector Spinae"
                onClick={() => handleMuscleClick('muscle_erectors')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_erectors')}
                onMouseEnter={() => setHoveredMuscle('muscle_erectors')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* GLUTEUS MAXIMUS & MEDIUS */}
              <path
                data-muscle="muscle_glutes"
                className={styles.musclePath}
                d="M152,260 C146,285 148,325 170,345 C186,340 194,310 194,275 C180,265 165,260 152,260 Z"
                tabIndex={0}
                role="button"
                aria-label="Gluteus Maximus & Medius"
                onClick={() => handleMuscleClick('muscle_glutes')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_glutes')}
                onMouseEnter={() => setHoveredMuscle('muscle_glutes')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_glutes"
                className={styles.musclePath}
                d="M238,260 C244,285 242,325 220,345 C204,340 196,310 196,275 C210,265 225,260 238,260 Z"
                tabIndex={0}
                role="button"
                aria-label="Gluteus Maximus & Medius"
                onClick={() => handleMuscleClick('muscle_glutes')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_glutes')}
                onMouseEnter={() => setHoveredMuscle('muscle_glutes')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* HAMSTRINGS (Biceps Femoris & Semitendinosus) */}
              <path
                data-muscle="muscle_hamstrings"
                className={styles.musclePath}
                d="M152,348 C144,375 145,410 152,434 C166,432 178,410 180,365 C174,352 162,348 152,348 Z"
                tabIndex={0}
                role="button"
                aria-label="Hamstrings Complex"
                onClick={() => handleMuscleClick('muscle_hamstrings')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_hamstrings')}
                onMouseEnter={() => setHoveredMuscle('muscle_hamstrings')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_hamstrings"
                className={styles.musclePath}
                d="M238,348 C246,375 245,410 238,434 C224,432 212,410 210,365 C216,352 228,348 238,348 Z"
                tabIndex={0}
                role="button"
                aria-label="Hamstrings Complex"
                onClick={() => handleMuscleClick('muscle_hamstrings')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_hamstrings')}
                onMouseEnter={() => setHoveredMuscle('muscle_hamstrings')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* Popliteal Fossa / Knee Joint */}
              <path d="M152,434 Q165,440 178,434" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M212,434 Q225,440 238,434" fill="none" stroke="#334155" strokeWidth="2" />

              {/* GASTROCNEMIUS & CALVES */}
              <path
                data-muscle="muscle_calves"
                className={styles.musclePath}
                d="M146,446 C138,470 136,505 146,545 C158,542 170,520 172,475 C170,455 160,446 146,446 Z"
                tabIndex={0}
                role="button"
                aria-label="Gastrocnemius & Calves"
                onClick={() => handleMuscleClick('muscle_calves')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_calves')}
                onMouseEnter={() => setHoveredMuscle('muscle_calves')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />
              <path
                data-muscle="muscle_calves"
                className={styles.musclePath}
                d="M244,446 C252,470 254,505 244,545 C232,542 220,520 218,475 C220,455 230,446 244,446 Z"
                tabIndex={0}
                role="button"
                aria-label="Gastrocnemius & Calves"
                onClick={() => handleMuscleClick('muscle_calves')}
                onKeyDown={(e) => handleKeyDown(e, 'muscle_calves')}
                onMouseEnter={() => setHoveredMuscle('muscle_calves')}
                onMouseLeave={() => setHoveredMuscle(null)}
              />

              {/* Achilles Tendons & Feet */}
              <rect x="154" y="546" width="6" height="24" rx="2" fill="#283446" stroke="#3e4d64" />
              <rect x="230" y="546" width="6" height="24" rx="2" fill="#283446" stroke="#3e4d64" />
              <path d="M146,570 C140,576 142,584 160,584 C168,584 172,578 170,570 Z" fill="#202a39" stroke="#334155" strokeWidth="1.5" />
              <path d="M244,570 C250,576 248,584 230,584 C222,584 218,578 220,570 Z" fill="#202a39" stroke="#334155" strokeWidth="1.5" />
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Muscle Inspection Tooltip */}
      {activeMetadata && selectedMuscleId && (
        <div className={styles.muscleTooltip} role="tooltip" aria-live="polite">
          <div className={styles.tooltipHeader}>
            <Tag
              variant={
                primaryMuscles.includes(selectedMuscleId)
                  ? 'amber'
                  : secondaryMuscles.includes(selectedMuscleId)
                  ? 'steel'
                  : 'default'
              }
            >
              {primaryMuscles.includes(selectedMuscleId)
                ? 'PRIMARY AGONIST'
                : secondaryMuscles.includes(selectedMuscleId)
                ? 'SECONDARY SYNERGIST'
                : 'STABILIZER'}
            </Tag>
            <button
              className={styles.closeTooltip}
              onClick={() => onSelectMuscle?.(null)}
              aria-label="Close tooltip"
            >
              ✕
            </button>
          </div>
          <h4 className={styles.tooltipName}>{activeMetadata.name}</h4>
          <p className={styles.tooltipCue}>{activeMetadata.cue}</p>
        </div>
      )}

      {/* DOM Legend Bar */}
      <div className={styles.legendContainer} aria-label="Muscle highlight legend">
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch + ' ' + styles.swatchAmber} />
          <span className={styles.legendLabel}>PRIMARY AGONIST</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch + ' ' + styles.swatchSteel} />
          <span className={styles.legendLabel}>SECONDARY SYNERGIST</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch + ' ' + styles.swatchNeutral} />
          <span className={styles.legendLabel}>NEUTRAL ANATOMY</span>
        </div>
      </div>
    </div>
  );
};
"""

anatomy_css = """
.viewerWrapper {
  position: relative;
  width: 100%;
  height: 640px;
  min-height: 560px;
  background: radial-gradient(circle at 50% 42%, #222d3d 0%, #17202c 60%, #0f151e 100%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.50), inset 0 0 80px rgba(0, 0, 0, 0.35);
  user-select: none;
  perspective: 1000px;
}

.hudHeader {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  right: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  pointer-events: auto;
}

.hudBadge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 5px var(--space-3);
  background-color: rgba(22, 30, 42, 0.90);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  backdrop-filter: blur(12px);
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

.viewToggleGroup {
  display: flex;
  align-items: center;
  background-color: rgba(18, 24, 34, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  padding: 3px;
  backdrop-filter: blur(12px);
}

.viewToggleBtn {
  padding: 5px var(--space-3);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  font-weight: var(--font-weight-medium);
  color: #94a3b8;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-sharp);
  border: none;
  background: transparent;
}

.viewToggleBtn:hover {
  color: #f8fafc;
}

.viewToggleActive {
  background-color: #334155;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}

.figureStage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.studioGlow {
  position: absolute;
  width: 360px;
  height: 520px;
  background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.14) 0%, rgba(245, 158, 11, 0.09) 45%, transparent 70%);
  filter: blur(35px);
  pointer-events: none;
}

.groundingRadar {
  position: absolute;
  bottom: 28px;
  width: 260px;
  height: 64px;
  border: 1px dashed rgba(100, 116, 139, 0.38);
  border-radius: 50%;
  pointer-events: none;
  transform: rotateX(65deg);
}

.contactShadow {
  position: absolute;
  bottom: 32px;
  width: 200px;
  height: 42px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.28) 50%, transparent 80%);
  border-radius: 50%;
  pointer-events: none;
}

.anatomySvg {
  width: 100%;
  max-width: 350px;
  height: 88%;
  max-height: 540px;
  filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.55));
  z-index: 2;
}

.anatomyGroup {
  animation: fadeIn 0.35s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0.4; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.musclePath {
  cursor: pointer;
  outline: none;
  transition: filter 0.2s ease, stroke 0.2s ease;
}

.musclePath:hover,
.musclePath:focus-visible {
  filter: brightness(1.25) drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) !important;
}

.muscleGroupPath {
  cursor: pointer;
  outline: none;
}

.muscleGroupPath:hover .musclePath,
.muscleGroupPath:focus-visible .musclePath {
  filter: brightness(1.25) drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) !important;
}

.muscleTooltip {
  position: absolute;
  bottom: calc(var(--space-12) + 16px);
  left: var(--space-4);
  max-width: 320px;
  background-color: rgba(22, 30, 42, 0.96);
  border: 1px solid var(--color-border-amber);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65);
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
  border: none;
  background: transparent;
  cursor: pointer;
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
  background-color: rgba(22, 30, 42, 0.92);
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
  background-color: #253142;
  border: 1px solid #3e4d64;
}

.legendLabel {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: #cbd5e1;
  letter-spacing: var(--tracking-wider);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .viewerWrapper {
    height: 520px;
    min-height: 480px;
  }
  .hudHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  .legendContainer {
    gap: var(--space-2);
    padding: var(--space-1) var(--space-3);
  }
  .legendLabel {
    font-size: 9px;
  }
}
"""

with open('app/components/exercise/AnatomyViewer/AnatomyViewer.tsx', 'w', encoding='utf-8') as f:
    f.write(anatomy_tsx)

with open('app/components/exercise/AnatomyViewer/AnatomyViewer.module.css', 'w', encoding='utf-8') as f:
    f.write(anatomy_css)

print('AnatomyViewer.tsx and AnatomyViewer.module.css successfully updated.')
