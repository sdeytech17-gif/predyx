import fs from 'fs';
let code = fs.readFileSync('app/components/exercise/AnatomyViewer/AnatomyViewer.tsx', 'utf8');

code = code.replace(
  'camera.position.set(0.38, 0.15, 2.75);',
  'camera.position.set(0.38, 0.05, 2.92);'
);

fs.writeFileSync('app/components/exercise/AnatomyViewer/AnatomyViewer.tsx', code, 'utf8');
console.log('Camera adjusted.');
