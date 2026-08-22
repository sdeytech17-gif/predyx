import fs from 'fs';

const viewerTsx = `'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HandPointing } from '@phosphor-icons/react';
import {
  createAnatomyBodyGroup,
  MuscleHighlightId,
  PREDYX_MUSCLE_IDS,
  MUSCLE_METADATA,
} from './AnatomyModel';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import { Tag } from '@/app/components/ui/Tag/Tag';
import styles from './AnatomyViewer.module.css';

export interface AnatomyViewerProps {
  exerciseName?: string;
  primaryMuscles?: MuscleHighlightId[];
  secondaryMuscles?: MuscleHighlightId[];
  autoRotate?: boolean;
  className?: string;
  onSelectMuscle?: (muscleId: MuscleHighlightId) => void;
}

export const AnatomyViewer: React.FC<AnatomyViewerProps> = ({
  exerciseName = 'Kinematic Movement',
  primaryMuscles = ['muscle_quads', 'muscle_glutes'],
  secondaryMuscles = ['muscle_abs', 'muscle_erectors'],
  autoRotate = true,
  className,
  onSelectMuscle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleHighlightId | null>(null);
  const [hoveredMuscle, setHoveredMuscle] = useState<MuscleHighlightId | null>(null);

  // Three.js scene references
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    rootGroup: THREE.Group;
    muscleMeshes: Map<MuscleHighlightId, THREE.Mesh[]>;
    allMeshes: THREE.Mesh[];
    idleTimer: NodeJS.Timeout | null;
  } | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!webGLSupported || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 580;

    // 1. Scene & Studio Viewport
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x18202c);

    // 2. Camera with clear full-body framing (Head, Torso, Legs, Feet completely visible, ~70% vertical height)
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 20);
    camera.position.set(0.35, 0.10, 3.65);

    // 3. Renderer with ACES Filmic Tone Mapping & High Precision
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Studio 5-Source Lighting System
    const hemiLight = new THREE.HemisphereLight(0xb8c9dc, 0x1e2736, 3.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 4.2);
    keyLight.position.set(2.5, 4.2, 3.8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 2.8);
    fillLight.position.set(-3.8, 2.0, 2.8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 2.5);
    rimLight.position.set(0, 3.8, -3.8);
    scene.add(rimLight);

    const lowerLight = new THREE.DirectionalLight(0x64748b, 1.6);
    lowerLight.position.set(0, -2.8, 2.6);
    scene.add(lowerLight);

    const backdropLight = new THREE.PointLight(0x38485e, 3.8, 9.0);
    backdropLight.position.set(0, 0.25, -1.2);
    scene.add(backdropLight);

    // 5. Build High-Quality Athletic Human Anatomy Model
    const { rootGroup, muscleMeshes, allMeshes } = createAnatomyBodyGroup();
    scene.add(rootGroup);

    // 6. OrbitControls with smooth damping and full-body pivot
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1.6;
    controls.maxDistance = 5.0;
    controls.maxPolarAngle = Math.PI - 0.15;
    controls.minPolarAngle = 0.15;
    controls.target.set(0, 0.04, 0); // Exact center of human anatomy
    controls.autoRotate = autoRotate && !prefersReducedMotion;
    controls.autoRotateSpeed = 0.75;

    let idleTimer: NodeJS.Timeout | null = null;
    const handleControlStart = () => {
      controls.autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
    };

    const handleControlEnd = () => {
      if (autoRotate && !prefersReducedMotion) {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          controls.autoRotate = true;
        }, 3000);
      }
    };

    controls.addEventListener('start', handleControlStart);
    controls.addEventListener('end', handleControlEnd);

    // 7. Raycasting for Muscle Tapping / Hovering
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedMuscle = (clientX: number, clientY: number): MuscleHighlightId | null => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(rootGroup.children, true);

      for (const hit of intersects) {
        let obj: THREE.Object3D | null = hit.object;
        while (obj && obj !== rootGroup) {
          if (obj.name && PREDYX_MUSCLE_IDS.includes(obj.name as MuscleHighlightId)) {
            return obj.name as MuscleHighlightId;
          }
          obj = obj.parent;
        }
      }
      return null;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const hit = getIntersectedMuscle(e.clientX, e.clientY);
      setHoveredMuscle(hit);
      canvas.style.cursor = hit ? 'pointer' : 'grab';
    };

    let startX = 0;
    let startY = 0;
    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);
      if (dx < 6 && dy < 6) {
        const hit = getIntersectedMuscle(e.clientX, e.clientY);
        setSelectedMuscle(hit);
        if (hit) onSelectMuscle?.(hit);
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', (e: MouseEvent) => {
      const hit = getIntersectedMuscle(e.clientX, e.clientY);
      if (hit) {
        setSelectedMuscle(hit);
        onSelectMuscle?.(hit);
      }
    });

    // 8. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      rootGroup,
      muscleMeshes,
      allMeshes,
      idleTimer,
    };

    return () => {
      cancelAnimationFrame(animId);
      controls.removeEventListener('start', handleControlStart);
      controls.removeEventListener('end', handleControlEnd);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      renderer.dispose();
    };
  }, [webGLSupported, autoRotate, prefersReducedMotion, onSelectMuscle]);

  // Update Materials when primary/secondary muscles or selection changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const { muscleMeshes } = sceneRef.current;

    const primaryColor = new THREE.Color(0xf59e0b);
    const secondaryColor = new THREE.Color(0x0ea5e9);
    const neutralColor = new THREE.Color(0x6b7b92);
    const highlightHoverColor = new THREE.Color(0xfde047);

    PREDYX_MUSCLE_IDS.forEach((id) => {
      const meshes = muscleMeshes.get(id);
      if (!meshes) return;

      const isPrimary = primaryMuscles.includes(id);
      const isSecondary = secondaryMuscles.includes(id);
      const isSelected = selectedMuscle === id;
      const isHovered = hoveredMuscle === id;

      meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (isSelected) {
          mat.color.set(highlightHoverColor);
          mat.emissive.set(highlightHoverColor);
          mat.emissiveIntensity = 0.90;
          mat.roughness = 0.30;
        } else if (isPrimary) {
          mat.color.set(primaryColor);
          mat.emissive.set(primaryColor);
          mat.emissiveIntensity = isHovered ? 0.92 : 0.85;
          mat.roughness = 0.38;
        } else if (isSecondary) {
          mat.color.set(secondaryColor);
          mat.emissive.set(secondaryColor);
          mat.emissiveIntensity = isHovered ? 0.78 : 0.68;
          mat.roughness = 0.40;
        } else {
          mat.color.set(neutralColor);
          mat.emissive.set(0x000000);
          mat.emissiveIntensity = isHovered ? 0.15 : 0;
          mat.roughness = 0.44;
          mat.metalness = 0.04;
        }
      });
    });
  }, [primaryMuscles, secondaryMuscles, selectedMuscle, hoveredMuscle]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current) return;
    const { controls } = sceneRef.current;
    const step = 0.15;

    if (e.key === 'ArrowLeft') {
      controls.target.x -= step * 0.1;
      controls.update();
    } else if (e.key === 'ArrowRight') {
      controls.target.x += step * 0.1;
      controls.update();
    }
  }, []);

  const activeMetadata = selectedMuscle ? MUSCLE_METADATA[selectedMuscle] : null;

  return (
    <div
      ref={containerRef}
      className={\`\${styles.viewerWrapper} \${className || ''}\`}
      aria-label={\`Interactive 3D anatomy viewer showing muscle activation for \${exerciseName}\`}
    >
      {webGLSupported ? (
        <>
          <canvas
            ref={canvasRef}
            className={styles.canvas3d}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="3D Anatomy Model. Use mouse drag or touch to orbit model."
            role="img"
          />

          <div className={styles.hudHeader}>
            <div className={styles.hudBadge}>
              <span className={styles.liveIndicator} />
              <span className={styles.hudTitle}>3D WEBGL ENGINE // LIVE</span>
            </div>
            <div className={styles.controlsHelp}>
              <HandPointing size={14} className={styles.helpIcon} />
              <span>Drag to orbit | Click muscle to inspect</span>
            </div>
          </div>

          {activeMetadata && (
            <div className={styles.muscleTooltip} role="tooltip" aria-live="polite">
              <div className={styles.tooltipHeader}>
                <Tag
                  variant={
                    primaryMuscles.includes(selectedMuscle!)
                      ? 'amber'
                      : secondaryMuscles.includes(selectedMuscle!)
                      ? 'steel'
                      : 'default'
                  }
                >
                  {primaryMuscles.includes(selectedMuscle!)
                    ? 'PRIMARY AGONIST'
                    : secondaryMuscles.includes(selectedMuscle!)
                    ? 'SECONDARY SYNERGIST'
                    : 'STABILIZER'}
                </Tag>
                <button
                  className={styles.closeTooltip}
                  onClick={() => setSelectedMuscle(null)}
                  aria-label="Close tooltip"
                >
                  ✕
                </button>
              </div>
              <h4 className={styles.tooltipName}>{activeMetadata.name}</h4>
              <p className={styles.tooltipCue}>{activeMetadata.cue}</p>
            </div>
          )}

          <div className={styles.legendContainer} aria-label="Muscle highlight legend">
            <div className={styles.legendItem}>
              <span className={\`\${styles.legendSwatch} \${styles.swatchAmber}\`} />
              <span className={styles.legendLabel}>PRIMARY AGONIST</span>
            </div>
            <div className={styles.legendItem}>
              <span className={\`\${styles.legendSwatch} \${styles.swatchSteel}\`} />
              <span className={styles.legendLabel}>SECONDARY SYNERGIST</span>
            </div>
            <div className={styles.legendItem}>
              <span className={\`\${styles.legendSwatch} \${styles.swatchNeutral}\`} />
              <span className={styles.legendLabel}>NEUTRAL ANATOMY</span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.fallbackContainer} role="img" aria-label="Static anatomical musculature diagram">
          <svg viewBox="0 0 200 320" className={styles.fallbackSvg} aria-hidden="true">
            <rect width="200" height="320" rx="8" fill="#1c2432" />
            <circle cx="100" cy="35" r="18" fill="#6b7b92" stroke="#64748b" strokeWidth="1.5" />
            <path d="M75,60 L125,60 L115,140 L85,140 Z" fill="#6b7b92" stroke="#f59e0b" strokeWidth="1.5" />
            <path d="M72,62 L50,130 L60,132 L80,70 Z" fill="#6b7b92" stroke="#0ea5e9" strokeWidth="1.5" />
            <path d="M128,62 L150,130 L140,132 L120,70 Z" fill="#6b7b92" stroke="#0ea5e9" strokeWidth="1.5" />
            <path d="M85,145 L72,250 L88,252 L97,145 Z" fill="#6b7b92" stroke="#f59e0b" strokeWidth="1.5" />
            <path d="M115,145 L128,250 L112,252 L103,145 Z" fill="#6b7b92" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>
          <div className={styles.fallbackNotice}>
            <Tag variant="steel">FALLBACK MODE // SVG ANATOMY</Tag>
            <p>WebGL hardware acceleration unavailable. Showing high-contrast vector biomechanic map.</p>
          </div>
        </div>
      )}
    </div>
  );
};`;

fs.writeFileSync('app/components/exercise/AnatomyViewer/AnatomyViewer.tsx', viewerTsx, 'utf8');
console.log('AnatomyViewer.tsx updated.');
