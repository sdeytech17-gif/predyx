import fs from 'fs';
import path from 'path';
import * as THREE from 'three';

const modelsDir = path.join(process.cwd(), 'public', 'models');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const rootGroup = new THREE.Group();
rootGroup.name = 'PredyxHumanAnatomy';

const neutralMat = new THREE.MeshStandardMaterial({
  color: 0x6b7b92,
  roughness: 0.44,
  metalness: 0.04,
  name: 'Mat_NeutralAnatomy',
});

const structuralMat = new THREE.MeshStandardMaterial({
  color: 0x505e70,
  roughness: 0.50,
  metalness: 0.06,
  name: 'Mat_Structural',
});

function createLoftedGeometry(slices, radialSegments = 24) {
  const geom = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];

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

function addPart(name, geometry, mat = neutralMat, pos = [0,0,0], rot = [0,0,0], scale = [1,1,1]) {
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.name = name;
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  rootGroup.add(mesh);
  return mesh;
}

// 1. CONTINUOUS ATHLETIC HUMAN TORSO
const torsoGeom = createLoftedGeometry([
  [0.082, 0.085, 0.54, 0, -0.01],
  [0.195, 0.120, 0.46, 0, 0.005],
  [0.180, 0.115, 0.36, 0, 0.00],
  [0.145, 0.095, 0.22, 0, -0.005],
  [0.155, 0.105, 0.08, 0, -0.01],
  [0.140, 0.095, -0.04, 0, -0.015],
], 24);
addPart('mesh_structural_torso', torsoGeom, structuralMat);

// 2. HEAD & NECK
const headGeom = createLoftedGeometry([
  [0.04, 0.05, 0.98, 0, -0.01],
  [0.092, 0.118, 0.92, 0, -0.01],
  [0.098, 0.125, 0.82, 0, -0.005],
  [0.085, 0.110, 0.74, 0, 0.01],
  [0.062, 0.085, 0.67, 0, 0.025],
  [0.038, 0.058, 0.63, 0, 0.03],
], 20);
addPart('mesh_structural_head', headGeom, structuralMat);

const neckGeom = createLoftedGeometry([
  [0.055, 0.065, 0.65, 0, 0.00],
  [0.060, 0.070, 0.58, 0, -0.005],
  [0.075, 0.088, 0.52, 0, -0.01],
], 18);
addPart('mesh_structural_neck', neckGeom, structuralMat);

const clavicleGeom = new THREE.CapsuleGeometry(0.022, 0.38, 8, 16);
addPart('mesh_structural_clavicle', clavicleGeom, structuralMat, [0, 0.51, 0.032], [0, 0, Math.PI / 2]);

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

addPart('mesh_muscle_chest_L', pecGeomL);
addPart('mesh_muscle_chest_R', pecGeomR);

// 4. DELTOIDS
function createDeltGeom(isFront, isRear) {
  const zOffset = isFront ? 0.028 : isRear ? -0.032 : 0;
  return createLoftedGeometry([
    [0.048, 0.048, 0.53, 0, zOffset * 0.5],
    [0.072, 0.070, 0.45, 0, zOffset],
    [0.050, 0.048, 0.35, 0, zOffset * 0.5],
  ], 16);
}

addPart('mesh_muscle_front_delt_L', createDeltGeom(true, false), neutralMat, [-0.235, 0, 0.018], [0.08, 0.10, -0.08]);
addPart('mesh_muscle_side_delt_L', createDeltGeom(false, false), neutralMat, [-0.255, 0, -0.008], [0, 0, -0.12]);
addPart('mesh_muscle_rear_delt_L', createDeltGeom(false, true), neutralMat, [-0.235, 0, -0.032], [-0.08, -0.10, -0.08]);

addPart('mesh_muscle_front_delt_R', createDeltGeom(true, false), neutralMat, [0.235, 0, 0.018], [0.08, -0.10, 0.08]);
addPart('mesh_muscle_side_delt_R', createDeltGeom(false, false), neutralMat, [0.255, 0, -0.008], [0, 0, 0.12]);
addPart('mesh_muscle_rear_delt_R', createDeltGeom(false, true), neutralMat, [0.235, 0, -0.032], [-0.08, 0.10, 0.08]);

// 5. TRAPEZIUS & RHOMBOIDS
const trapsUpperGeom = createLoftedGeometry([
  [0.062, 0.070, 0.61, 0, -0.032],
  [0.145, 0.088, 0.53, 0, -0.042],
  [0.205, 0.098, 0.47, 0, -0.046],
], 18);
addPart('mesh_muscle_traps_upper', trapsUpperGeom);

const trapsMidGeom = createLoftedGeometry([
  [0.175, 0.078, 0.46, 0, -0.050],
  [0.135, 0.068, 0.35, 0, -0.058],
  [0.058, 0.040, 0.23, 0, -0.062],
], 16);
addPart('mesh_muscle_traps_mid', trapsMidGeom);

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

addPart('mesh_muscle_lats_L', latGeomL);
addPart('mesh_muscle_lats_R', latGeomR);

const erectorsGeom = createLoftedGeometry([
  [0.062, 0.042, 0.29, 0, -0.058],
  [0.072, 0.050, 0.15, 0, -0.062],
  [0.062, 0.042, 0.02, 0, -0.058],
], 14);
addPart('mesh_muscle_erectors', erectorsGeom);

// 7. ABS & OBLIQUES
const absGeom = createLoftedGeometry([
  [0.082, 0.052, 0.32, 0, 0.058],
  [0.076, 0.056, 0.20, 0, 0.060],
  [0.066, 0.046, 0.07, 0, 0.048],
], 18);
addPart('mesh_muscle_abs', absGeom);

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
addPart('mesh_muscle_obliques_L', obliqueGeomL);
addPart('mesh_muscle_obliques_R', obliqueGeomR);

// 8. ARMS & HANDS
const bicepGeom = createLoftedGeometry([
  [0.038, 0.038, 0.40, 0, 0.008],
  [0.054, 0.058, 0.31, 0, 0.022],
  [0.038, 0.038, 0.21, 0, 0.008],
], 16);
addPart('mesh_muscle_biceps_L', bicepGeom.clone(), neutralMat, [-0.265, 0, 0.01], [0.05, 0, -0.06]);
addPart('mesh_muscle_biceps_R', bicepGeom.clone(), neutralMat, [0.265, 0, 0.01], [0.05, 0, 0.06]);

const tricepGeom = createLoftedGeometry([
  [0.044, 0.044, 0.40, 0, -0.008],
  [0.060, 0.064, 0.31, 0, -0.025],
  [0.042, 0.042, 0.20, 0, -0.008],
], 16);
addPart('mesh_muscle_triceps_L', tricepGeom.clone(), neutralMat, [-0.265, 0, -0.025], [-0.05, 0, -0.06]);
addPart('mesh_muscle_triceps_R', tricepGeom.clone(), neutralMat, [0.265, 0, -0.025], [-0.05, 0, 0.06]);

const elbowGeom = new THREE.SphereGeometry(0.038, 12, 12);
addPart('mesh_structural_elbow_L', elbowGeom.clone(), structuralMat, [-0.275, 0.19, -0.005]);
addPart('mesh_structural_elbow_R', elbowGeom.clone(), structuralMat, [0.275, 0.19, -0.005]);

const forearmGeom = createLoftedGeometry([
  [0.044, 0.048, 0.18, 0, 0.005],
  [0.038, 0.038, 0.06, 0, 0.00],
  [0.025, 0.024, -0.05, 0, -0.002],
], 16);
addPart('mesh_muscle_forearms_L', forearmGeom.clone(), neutralMat, [-0.285, 0, 0.008], [0.08, 0, -0.08]);
addPart('mesh_muscle_forearms_R', forearmGeom.clone(), neutralMat, [0.285, 0, 0.008], [0.08, 0, 0.08]);

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
addPart('mesh_structural_hand_L', handGeomL, structuralMat, [-0.295, 0, 0.01], [0, 0, -0.1]);
addPart('mesh_structural_hand_R', handGeomR, structuralMat, [0.295, 0, 0.01], [0, 0, 0.1]);

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
addPart('mesh_muscle_glutes_L', gluteGeomL, neutralMat, [-0.088, 0, -0.018]);
addPart('mesh_muscle_glutes_R', gluteGeomR, neutralMat, [0.088, 0, -0.018]);

const hipFlexorGeom = createLoftedGeometry([
  [0.040, 0.040, 0.05, 0, 0.032],
  [0.048, 0.050, -0.02, 0, 0.042],
  [0.038, 0.038, -0.09, 0, 0.032],
], 14);
addPart('mesh_muscle_hip_flexors_L', hipFlexorGeom.clone(), neutralMat, [-0.075, 0, 0.018], [0.15, 0, -0.08]);
addPart('mesh_muscle_hip_flexors_R', hipFlexorGeom.clone(), neutralMat, [0.075, 0, 0.018], [0.15, 0, 0.08]);

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
addPart('mesh_muscle_quads_L', quadGeomL, neutralMat, [-0.095, 0, 0.012], [-0.04, 0, 0.02]);
addPart('mesh_muscle_quads_R', quadGeomR, neutralMat, [0.095, 0, 0.012], [-0.04, 0, -0.02]);

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
addPart('mesh_muscle_hamstrings_L', hamGeomL, neutralMat, [-0.095, 0, -0.022], [0.04, 0, 0.02]);
addPart('mesh_muscle_hamstrings_R', hamGeomR, neutralMat, [0.095, 0, -0.022], [0.04, 0, -0.02]);

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
addPart('mesh_muscle_adductors_L', adductorGeomL, neutralMat, [-0.045, 0, 0]);
addPart('mesh_muscle_adductors_R', adductorGeomR, neutralMat, [0.045, 0, 0]);

const kneeGeom = new THREE.SphereGeometry(0.042, 14, 14);
addPart('mesh_structural_knee_L', kneeGeom.clone(), structuralMat, [-0.095, -0.42, 0.012]);
addPart('mesh_structural_knee_R', kneeGeom.clone(), structuralMat, [0.095, -0.42, 0.012]);

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
addPart('mesh_muscle_calves_L', calfGeomL, neutralMat, [-0.095, 0, -0.012], [0.03, 0, 0]);
addPart('mesh_muscle_calves_R', calfGeomR, neutralMat, [0.095, 0, -0.012], [0.03, 0, 0]);

const shinGeom = createLoftedGeometry([
  [0.038, 0.030, -0.44, 0, 0.022],
  [0.042, 0.032, -0.56, 0, 0.026],
  [0.032, 0.026, -0.75, 0, 0.018],
], 14);
addPart('mesh_structural_shin_L', shinGeom.clone(), structuralMat, [-0.095, 0, 0.01]);
addPart('mesh_structural_shin_R', shinGeom.clone(), structuralMat, [0.095, 0, 0.01]);

const ankleGeom = new THREE.SphereGeometry(0.034, 12, 12);
addPart('mesh_structural_ankle_L', ankleGeom.clone(), structuralMat, [-0.095, -0.82, 0]);
addPart('mesh_structural_ankle_R', ankleGeom.clone(), structuralMat, [0.095, -0.82, 0]);

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
addPart('mesh_structural_foot_L', footGeomL, structuralMat, [-0.095, 0, 0.02], [0.15, 0, 0]);
addPart('mesh_structural_foot_R', footGeomR, structuralMat, [0.095, 0, 0.02], [0.15, 0, 0]);

// EXPORT TO THREE.JS SCENE JSON ASSET
const json = rootGroup.toJSON();
const outPath = path.join(modelsDir, 'predyx_human_anatomy.json');
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8');
const stats = fs.statSync(outPath);
console.log(`✔ Successfully generated 3D anatomical model asset: ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);
