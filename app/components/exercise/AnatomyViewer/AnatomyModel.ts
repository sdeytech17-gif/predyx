import * as THREE from 'three';

export const PREDYX_MUSCLE_IDS = [
  'muscle_chest',
  'muscle_front_delt',
  'muscle_side_delt',
  'muscle_rear_delt',
  'muscle_biceps',
  'muscle_triceps',
  'muscle_lats',
  'muscle_traps_upper',
  'muscle_traps_mid',
  'muscle_forearms',
  'muscle_abs',
  'muscle_obliques',
  'muscle_erectors',
  'muscle_quads',
  'muscle_hamstrings',
  'muscle_glutes',
  'muscle_adductors',
  'muscle_hip_flexors',
  'muscle_calves',
] as const;

export type MuscleHighlightId = typeof PREDYX_MUSCLE_IDS[number];

export const MUSCLE_METADATA: Record<MuscleHighlightId, { name: string; region: 'Upper Body' | 'Core' | 'Lower Body'; cue: string }> = {
  muscle_chest: { name: 'Pectoralis Major & Minor', region: 'Upper Body', cue: 'Adduct humerus across midline with scapular retraction.' },
  muscle_front_delt: { name: 'Anterior Deltoid', region: 'Upper Body', cue: 'Drive upward in sagittal plane maintaining clavicular stability.' },
  muscle_side_delt: { name: 'Lateral Deltoid', region: 'Upper Body', cue: 'Abduct in the scapular plane with slight internal rotation.' },
  muscle_rear_delt: { name: 'Posterior Deltoid', region: 'Upper Body', cue: 'Horizontal abduction with neutral spinal alignment.' },
  muscle_biceps: { name: 'Biceps Brachii', region: 'Upper Body', cue: 'Supinate forearm during elbow flexion for peak contraction.' },
  muscle_triceps: { name: 'Triceps Brachii', region: 'Upper Body', cue: 'Full elbow extension locking lateral and long heads.' },
  muscle_lats: { name: 'Latissimus Dorsi', region: 'Upper Body', cue: 'Depress scapulae and drive elbows down toward pelvis.' },
  muscle_traps_upper: { name: 'Upper Trapezius', region: 'Upper Body', cue: 'Elevate clavicles with controlled eccentric descent.' },
  muscle_traps_mid: { name: 'Mid Trapezius & Rhomboids', region: 'Upper Body', cue: 'Retract scapulae forcefully against thoracic cage.' },
  muscle_forearms: { name: 'Brachioradialis & Forearm Flexors', region: 'Upper Body', cue: 'Maintain rigid neutral wrist alignment during loading.' },
  muscle_abs: { name: 'Rectus Abdominis', region: 'Core', cue: 'Posterior pelvic tilt with thoracic rib cage depression.' },
  muscle_obliques: { name: 'Internal & External Obliques', region: 'Core', cue: 'Anti-rotational intra-abdominal pressure bracing.' },
  muscle_erectors: { name: 'Erector Spinae', region: 'Core', cue: 'Isometric axial spinal extension resisting anterior shear.' },
  muscle_quads: { name: 'Quadriceps Femoris', region: 'Lower Body', cue: 'Extend knee through midfoot drive with vertical torso.' },
  muscle_hamstrings: { name: 'Hamstring Complex (Biceps Femoris)', region: 'Lower Body', cue: 'Hip hinge loading posterior chain with active tension.' },
  muscle_glutes: { name: 'Gluteus Maximus & Medius', region: 'Lower Body', cue: 'Extend hips forcefully with neutral pelvis at lockout.' },
  muscle_adductors: { name: 'Adductor Magnus & Longus', region: 'Lower Body', cue: 'Stabilize femur in frontal plane during deep squat depth.' },
  muscle_hip_flexors: { name: 'Iliopsoas Complex', region: 'Lower Body', cue: 'Control hip deceleration during eccentric extension.' },
  muscle_calves: { name: 'Gastrocnemius & Soleus', region: 'Lower Body', cue: 'Plantarflex through first metatarsal for peak tension.' },
};

export const MODEL_NODE_TO_PREDYX_ID: Record<string, MuscleHighlightId> = {
  mesh_muscle_chest_L: 'muscle_chest',
  mesh_muscle_chest_R: 'muscle_chest',
  mesh_muscle_front_delt_L: 'muscle_front_delt',
  mesh_muscle_front_delt_R: 'muscle_front_delt',
  mesh_muscle_side_delt_L: 'muscle_side_delt',
  mesh_muscle_side_delt_R: 'muscle_side_delt',
  mesh_muscle_rear_delt_L: 'muscle_rear_delt',
  mesh_muscle_rear_delt_R: 'muscle_rear_delt',
  mesh_muscle_traps_upper: 'muscle_traps_upper',
  mesh_muscle_traps_mid: 'muscle_traps_mid',
  mesh_muscle_lats_L: 'muscle_lats',
  mesh_muscle_lats_R: 'muscle_lats',
  mesh_muscle_erectors: 'muscle_erectors',
  mesh_muscle_abs: 'muscle_abs',
  mesh_muscle_obliques_L: 'muscle_obliques',
  mesh_muscle_obliques_R: 'muscle_obliques',
  mesh_muscle_biceps_L: 'muscle_biceps',
  mesh_muscle_biceps_R: 'muscle_biceps',
  mesh_muscle_triceps_L: 'muscle_triceps',
  mesh_muscle_triceps_R: 'muscle_triceps',
  mesh_muscle_forearms_L: 'muscle_forearms',
  mesh_muscle_forearms_R: 'muscle_forearms',
  mesh_muscle_glutes_L: 'muscle_glutes',
  mesh_muscle_glutes_R: 'muscle_glutes',
  mesh_muscle_hip_flexors_L: 'muscle_hip_flexors',
  mesh_muscle_hip_flexors_R: 'muscle_hip_flexors',
  mesh_muscle_quads_L: 'muscle_quads',
  mesh_muscle_quads_R: 'muscle_quads',
  mesh_muscle_hamstrings_L: 'muscle_hamstrings',
  mesh_muscle_hamstrings_R: 'muscle_hamstrings',
  mesh_muscle_adductors_L: 'muscle_adductors',
  mesh_muscle_adductors_R: 'muscle_adductors',
  mesh_muscle_calves_L: 'muscle_calves',
  mesh_muscle_calves_R: 'muscle_calves',
};

function createLoftedGeometry(slices: [number, number, number, number?, number?][], radialSegments = 24): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const indices: number[] = [];

  const numSlices = slices.length;

  for (let s = 0; s < numSlices; s++) {
    const [rx, rz, y, cx = 0, cz = 0] = slices[s];
    for (let r = 0; r < radialSegments; r++) {
      const angle = (r / radialSegments) * Math.PI * 2;
      const x = cx + Math.cos(angle) * rx;
      const z = cz + Math.sin(angle) * rz;
      vertices.push(x, y, z);
    }
  }

  for (let s = 0; s < numSlices - 1; s++) {
    const rowA = s * radialSegments;
    const rowB = (s + 1) * radialSegments;
    for (let r = 0; r < radialSegments; r++) {
      const nextR = (r + 1) % radialSegments;
      const a = rowA + r;
      const b = rowA + nextR;
      const c = rowB + r;
      const d = rowB + nextR;

      indices.push(a, c, b);
      indices.push(b, c, d);
    }
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

export function createAnatomyBodyGroup(): {
  rootGroup: THREE.Group;
  muscleMeshes: Map<MuscleHighlightId, THREE.Mesh[]>;
  allMeshes: THREE.Mesh[];
} {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'PredyxHumanAnatomy';

  const muscleMeshes = new Map<MuscleHighlightId, THREE.Mesh[]>();
  const allMeshes: THREE.Mesh[] = [];

  const defaultMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x6b7b92),
    roughness: 0.44,
    metalness: 0.04,
    flatShading: false,
  });

  const structuralMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x505e70),
    roughness: 0.50,
    metalness: 0.06,
    flatShading: false,
  });

  function addPart(
    name: string,
    geometry: THREE.BufferGeometry,
    mat: THREE.Material = defaultMaterial,
    pos: [number, number, number] = [0, 0, 0],
    rot: [number, number, number] = [0, 0, 0],
    scale: [number, number, number] = [1, 1, 1]
  ) {
    const mesh = new THREE.Mesh(geometry, mat.clone());
    mesh.name = name;
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    rootGroup.add(mesh);
    allMeshes.push(mesh);

    const mappedMuscleId = MODEL_NODE_TO_PREDYX_ID[name];
    if (mappedMuscleId) {
      const existing = muscleMeshes.get(mappedMuscleId) || [];
      existing.push(mesh);
      muscleMeshes.set(mappedMuscleId, existing);
    }
    return mesh;
  }

  // 1. TORSO BASE
  const torsoGeom = createLoftedGeometry([
    [0.082, 0.085, 0.54, 0, -0.01],
    [0.195, 0.120, 0.46, 0, 0.005],
    [0.180, 0.115, 0.36, 0, 0.00],
    [0.145, 0.095, 0.22, 0, -0.005],
    [0.155, 0.105, 0.08, 0, -0.01],
    [0.140, 0.095, -0.04, 0, -0.015],
  ], 24);
  addPart('mesh_structural_torso', torsoGeom, structuralMaterial);

  // 2. HEAD & NECK
  const headGeom = createLoftedGeometry([
    [0.04, 0.05, 0.98, 0, -0.01],
    [0.092, 0.118, 0.92, 0, -0.01],
    [0.098, 0.125, 0.82, 0, -0.005],
    [0.085, 0.110, 0.74, 0, 0.01],
    [0.062, 0.085, 0.67, 0, 0.025],
    [0.038, 0.058, 0.63, 0, 0.03],
  ], 20);
  addPart('mesh_structural_head', headGeom, structuralMaterial);

  const neckGeom = createLoftedGeometry([
    [0.055, 0.065, 0.65, 0, 0.00],
    [0.060, 0.070, 0.58, 0, -0.005],
    [0.075, 0.088, 0.52, 0, -0.01],
  ], 18);
  addPart('mesh_structural_neck', neckGeom, structuralMaterial);

  const clavicleGeom = new THREE.CapsuleGeometry(0.022, 0.38, 8, 16);
  addPart('mesh_structural_clavicle', clavicleGeom, structuralMaterial, [0, 0.51, 0.032], [0, 0, Math.PI / 2]);

  // 3. PECTORALS
  const pecGeomL = createLoftedGeometry([
    [0.045, 0.038, 0.505, -0.04, 0.035],
    [0.100, 0.068, 0.44, -0.095, 0.065],
    [0.088, 0.055, 0.36, -0.105, 0.052],
    [0.038, 0.030, 0.32, -0.125, 0.032],
  ], 16);
  const pecGeomR = createLoftedGeometry([
    [0.045, 0.038, 0.505, 0.04, 0.035],
    [0.100, 0.068, 0.44, 0.095, 0.065],
    [0.088, 0.055, 0.36, 0.105, 0.052],
    [0.038, 0.030, 0.32, 0.125, 0.032],
  ], 16);
  addPart('mesh_muscle_chest_L', pecGeomL, defaultMaterial);
  addPart('mesh_muscle_chest_R', pecGeomR, defaultMaterial);

  // 4. DELTOIDS
  function createDeltGeom(isFront: boolean, isRear: boolean) {
    const zOffset = isFront ? 0.028 : isRear ? -0.032 : 0;
    return createLoftedGeometry([
      [0.048, 0.048, 0.53, 0, zOffset * 0.5],
      [0.072, 0.070, 0.45, 0, zOffset],
      [0.050, 0.048, 0.35, 0, zOffset * 0.5],
    ], 16);
  }
  addPart('mesh_muscle_front_delt_L', createDeltGeom(true, false), defaultMaterial, [-0.235, 0, 0.018], [0.08, 0.10, -0.08]);
  addPart('mesh_muscle_side_delt_L', createDeltGeom(false, false), defaultMaterial, [-0.255, 0, -0.008], [0, 0, -0.12]);
  addPart('mesh_muscle_rear_delt_L', createDeltGeom(false, true), defaultMaterial, [-0.235, 0, -0.032], [-0.08, -0.10, -0.08]);

  addPart('mesh_muscle_front_delt_R', createDeltGeom(true, false), defaultMaterial, [0.235, 0, 0.018], [0.08, -0.10, 0.08]);
  addPart('mesh_muscle_side_delt_R', createDeltGeom(false, false), defaultMaterial, [0.255, 0, -0.008], [0, 0, 0.12]);
  addPart('mesh_muscle_rear_delt_R', createDeltGeom(false, true), defaultMaterial, [0.235, 0, -0.032], [-0.08, 0.10, 0.08]);

  // 5. TRAPEZIUS & RHOMBOIDS
  const trapsUpperGeom = createLoftedGeometry([
    [0.062, 0.070, 0.61, 0, -0.032],
    [0.145, 0.088, 0.53, 0, -0.042],
    [0.205, 0.098, 0.47, 0, -0.046],
  ], 18);
  addPart('mesh_muscle_traps_upper', trapsUpperGeom, defaultMaterial);

  const trapsMidGeom = createLoftedGeometry([
    [0.175, 0.078, 0.46, 0, -0.050],
    [0.135, 0.068, 0.35, 0, -0.058],
    [0.058, 0.040, 0.23, 0, -0.062],
  ], 16);
  addPart('mesh_muscle_traps_mid', trapsMidGeom, defaultMaterial);

  // 6. LATS & ERECTORS
  const latGeomL = createLoftedGeometry([
    [0.062, 0.070, 0.43, -0.135, -0.032],
    [0.088, 0.082, 0.31, -0.155, -0.040],
    [0.060, 0.058, 0.15, -0.125, -0.045],
  ], 16);
  const latGeomR = createLoftedGeometry([
    [0.062, 0.070, 0.43, 0.135, -0.032],
    [0.088, 0.082, 0.31, 0.155, -0.040],
    [0.060, 0.058, 0.15, 0.125, -0.045],
  ], 16);
  addPart('mesh_muscle_lats_L', latGeomL, defaultMaterial);
  addPart('mesh_muscle_lats_R', latGeomR, defaultMaterial);

  const erectorsGeom = createLoftedGeometry([
    [0.062, 0.042, 0.29, 0, -0.058],
    [0.072, 0.050, 0.15, 0, -0.062],
    [0.062, 0.042, 0.02, 0, -0.058],
  ], 14);
  addPart('mesh_muscle_erectors', erectorsGeom, defaultMaterial);

  // 7. ABS & OBLIQUES
  const absGeom = createLoftedGeometry([
    [0.082, 0.052, 0.32, 0, 0.058],
    [0.076, 0.056, 0.20, 0, 0.060],
    [0.066, 0.046, 0.07, 0, 0.048],
  ], 18);
  addPart('mesh_muscle_abs', absGeom, defaultMaterial);

  const obliqueGeomL = createLoftedGeometry([
    [0.050, 0.062, 0.27, -0.115, 0.018],
    [0.056, 0.065, 0.16, -0.125, 0.012],
    [0.042, 0.052, 0.05, -0.110, 0.008],
  ], 16);
  const obliqueGeomR = createLoftedGeometry([
    [0.050, 0.062, 0.27, 0.115, 0.018],
    [0.056, 0.065, 0.16, 0.125, 0.012],
    [0.042, 0.052, 0.05, 0.110, 0.008],
  ], 16);
  addPart('mesh_muscle_obliques_L', obliqueGeomL, defaultMaterial);
  addPart('mesh_muscle_obliques_R', obliqueGeomR, defaultMaterial);

  // 8. ARMS & HANDS
  const bicepGeom = createLoftedGeometry([
    [0.038, 0.038, 0.40, 0, 0.008],
    [0.054, 0.058, 0.31, 0, 0.022],
    [0.038, 0.038, 0.21, 0, 0.008],
  ], 16);
  addPart('mesh_muscle_biceps_L', bicepGeom.clone(), defaultMaterial, [-0.265, 0, 0.01], [0.05, 0, -0.06]);
  addPart('mesh_muscle_biceps_R', bicepGeom.clone(), defaultMaterial, [0.265, 0, 0.01], [0.05, 0, 0.06]);

  const tricepGeom = createLoftedGeometry([
    [0.044, 0.044, 0.40, 0, -0.008],
    [0.060, 0.064, 0.31, 0, -0.025],
    [0.042, 0.042, 0.20, 0, -0.008],
  ], 16);
  addPart('mesh_muscle_triceps_L', tricepGeom.clone(), defaultMaterial, [-0.265, 0, -0.025], [-0.05, 0, -0.06]);
  addPart('mesh_muscle_triceps_R', tricepGeom.clone(), defaultMaterial, [0.265, 0, -0.025], [-0.05, 0, 0.06]);

  const elbowGeom = new THREE.SphereGeometry(0.038, 12, 12);
  addPart('mesh_structural_elbow_L', elbowGeom.clone(), structuralMaterial, [-0.275, 0.19, -0.005]);
  addPart('mesh_structural_elbow_R', elbowGeom.clone(), structuralMaterial, [0.275, 0.19, -0.005]);

  const forearmGeom = createLoftedGeometry([
    [0.044, 0.048, 0.18, 0, 0.005],
    [0.038, 0.038, 0.06, 0, 0.00],
    [0.025, 0.024, -0.05, 0, -0.002],
  ], 16);
  addPart('mesh_muscle_forearms_L', forearmGeom.clone(), defaultMaterial, [-0.285, 0, 0.008], [0.08, 0, -0.08]);
  addPart('mesh_muscle_forearms_R', forearmGeom.clone(), defaultMaterial, [0.285, 0, 0.008], [0.08, 0, 0.08]);

  const handGeomL = createLoftedGeometry([
    [0.028, 0.016, -0.05, 0, 0],
    [0.034, 0.014, -0.11, -0.005, 0.004],
    [0.024, 0.010, -0.16, 0, 0],
  ], 12);
  const handGeomR = createLoftedGeometry([
    [0.028, 0.016, -0.05, 0, 0],
    [0.034, 0.014, -0.11, 0.005, 0.004],
    [0.024, 0.010, -0.16, 0, 0],
  ], 12);
  addPart('mesh_structural_hand_L', handGeomL, structuralMaterial, [-0.295, 0, 0.01], [0, 0, -0.1]);
  addPart('mesh_structural_hand_R', handGeomR, structuralMaterial, [0.295, 0, 0.01], [0, 0, 0.1]);

  // 9. GLUTES & HIP FLEXORS
  const gluteGeomL = createLoftedGeometry([
    [0.078, 0.078, 0.05, 0, -0.035],
    [0.104, 0.108, -0.03, 0, -0.058],
    [0.074, 0.068, -0.11, 0, -0.038],
  ], 18);
  const gluteGeomR = createLoftedGeometry([
    [0.078, 0.078, 0.05, 0, -0.035],
    [0.104, 0.108, -0.03, 0, -0.058],
    [0.074, 0.068, -0.11, 0, -0.038],
  ], 18);
  addPart('mesh_muscle_glutes_L', gluteGeomL, defaultMaterial, [-0.088, 0, -0.018]);
  addPart('mesh_muscle_glutes_R', gluteGeomR, defaultMaterial, [0.088, 0, -0.018]);

  const hipFlexorGeom = createLoftedGeometry([
    [0.040, 0.040, 0.05, 0, 0.032],
    [0.048, 0.050, -0.02, 0, 0.042],
    [0.038, 0.038, -0.09, 0, 0.032],
  ], 14);
  addPart('mesh_muscle_hip_flexors_L', hipFlexorGeom.clone(), defaultMaterial, [-0.075, 0, 0.018], [0.15, 0, -0.08]);
  addPart('mesh_muscle_hip_flexors_R', hipFlexorGeom.clone(), defaultMaterial, [0.075, 0, 0.018], [0.15, 0, 0.08]);

  // 10. THIGHS
  const quadGeomL = createLoftedGeometry([
    [0.076, 0.076, -0.07, 0, 0.018],
    [0.090, 0.088, -0.21, -0.008, 0.030],
    [0.068, 0.065, -0.36, 0.004, 0.022],
  ], 18);
  const quadGeomR = createLoftedGeometry([
    [0.076, 0.076, -0.07, 0, 0.018],
    [0.090, 0.088, -0.21, 0.008, 0.030],
    [0.068, 0.065, -0.36, -0.004, 0.022],
  ], 18);
  addPart('mesh_muscle_quads_L', quadGeomL, defaultMaterial, [-0.095, 0, 0.012], [-0.04, 0, 0.02]);
  addPart('mesh_muscle_quads_R', quadGeomR, defaultMaterial, [0.095, 0, 0.012], [-0.04, 0, -0.02]);

  const hamGeomL = createLoftedGeometry([
    [0.072, 0.072, -0.09, 0, -0.018],
    [0.082, 0.078, -0.22, 0, -0.030],
    [0.058, 0.055, -0.36, 0, -0.018],
  ], 18);
  const hamGeomR = createLoftedGeometry([
    [0.072, 0.072, -0.09, 0, -0.018],
    [0.082, 0.078, -0.22, 0, -0.030],
    [0.058, 0.055, -0.36, 0, -0.018],
  ], 18);
  addPart('mesh_muscle_hamstrings_L', hamGeomL, defaultMaterial, [-0.095, 0, -0.022], [0.04, 0, 0.02]);
  addPart('mesh_muscle_hamstrings_R', hamGeomR, defaultMaterial, [0.095, 0, -0.022], [0.04, 0, -0.02]);

  const adductorGeomL = createLoftedGeometry([
    [0.040, 0.042, -0.07, 0, 0],
    [0.045, 0.045, -0.19, 0, 0],
    [0.032, 0.032, -0.32, 0, 0],
  ], 14);
  const adductorGeomR = createLoftedGeometry([
    [0.040, 0.042, -0.07, 0, 0],
    [0.045, 0.045, -0.19, 0, 0],
    [0.032, 0.032, -0.32, 0, 0],
  ], 14);
  addPart('mesh_muscle_adductors_L', adductorGeomL, defaultMaterial, [-0.045, 0, 0]);
  addPart('mesh_muscle_adductors_R', adductorGeomR, defaultMaterial, [0.045, 0, 0]);

  const kneeGeom = new THREE.SphereGeometry(0.042, 14, 14);
  addPart('mesh_structural_knee_L', kneeGeom.clone(), structuralMaterial, [-0.095, -0.42, 0.012]);
  addPart('mesh_structural_knee_R', kneeGeom.clone(), structuralMaterial, [0.095, -0.42, 0.012]);

  // 11. CALVES & FEET
  const calfGeomL = createLoftedGeometry([
    [0.058, 0.058, -0.44, 0, -0.005],
    [0.075, 0.080, -0.56, 0, -0.022],
    [0.044, 0.044, -0.71, 0, -0.008],
    [0.030, 0.030, -0.81, 0, 0.00],
  ], 18);
  const calfGeomR = createLoftedGeometry([
    [0.058, 0.058, -0.44, 0, -0.005],
    [0.075, 0.080, -0.56, 0, -0.022],
    [0.044, 0.044, -0.71, 0, -0.008],
    [0.030, 0.030, -0.81, 0, 0.00],
  ], 18);
  addPart('mesh_muscle_calves_L', calfGeomL, defaultMaterial, [-0.095, 0, -0.012], [0.03, 0, 0]);
  addPart('mesh_muscle_calves_R', calfGeomR, defaultMaterial, [0.095, 0, -0.012], [0.03, 0, 0]);

  const shinGeom = createLoftedGeometry([
    [0.038, 0.030, -0.44, 0, 0.022],
    [0.042, 0.032, -0.56, 0, 0.026],
    [0.032, 0.026, -0.75, 0, 0.018],
  ], 14);
  addPart('mesh_structural_shin_L', shinGeom.clone(), structuralMaterial, [-0.095, 0, 0.01]);
  addPart('mesh_structural_shin_R', shinGeom.clone(), structuralMaterial, [0.095, 0, 0.01]);

  const ankleGeom = new THREE.SphereGeometry(0.034, 12, 12);
  addPart('mesh_structural_ankle_L', ankleGeom.clone(), structuralMaterial, [-0.095, -0.82, 0]);
  addPart('mesh_structural_ankle_R', ankleGeom.clone(), structuralMaterial, [0.095, -0.82, 0]);

  const footGeomL = createLoftedGeometry([
    [0.038, 0.048, -0.82, 0, -0.02],
    [0.048, 0.075, -0.86, 0, 0.03],
    [0.042, 0.068, -0.88, 0, 0.07],
  ], 16);
  const footGeomR = createLoftedGeometry([
    [0.038, 0.048, -0.82, 0, -0.02],
    [0.048, 0.075, -0.86, 0, 0.03],
    [0.042, 0.068, -0.88, 0, 0.07],
  ], 16);
  addPart('mesh_structural_foot_L', footGeomL, structuralMaterial, [-0.095, 0, 0.02], [0.15, 0, 0]);
  addPart('mesh_structural_foot_R', footGeomR, structuralMaterial, [0.095, 0, 0.02], [0.15, 0, 0]);

  // 12. GROUNDING BASE
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const shadowCtx = shadowCanvas.getContext('2d');
  if (shadowCtx) {
    const gradient = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 128, 128);
  }
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.set(0, -0.915, 0.04);
  rootGroup.add(shadowMesh);

  const groundMat = new THREE.MeshBasicMaterial({
    color: 0x64748b,
    transparent: true,
    opacity: 0.35,
    wireframe: true,
  });
  const groundDisc = new THREE.Mesh(new THREE.CircleGeometry(0.68, 24), groundMat);
  groundDisc.rotation.x = -Math.PI / 2;
  groundDisc.position.set(0, -0.91, 0);
  rootGroup.add(groundDisc);

  return { rootGroup, muscleMeshes, allMeshes };
}
