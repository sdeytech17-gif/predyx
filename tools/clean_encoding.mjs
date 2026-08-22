import fs from 'fs';
import path from 'path';

function checkDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name !== 'node_modules' && f.name !== '.next') checkDir(full);
    } else if (f.name.endsWith('.tsx') || f.name.endsWith('.ts') || f.name.endsWith('.css')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
      
      // Replace typical double-encoded UTF-8 artifacts
      let updated = content
        .replaceAll('\u00C3\u00A2\u00E2\u201A\u00AC\u00C2\u00A2', '-')
        .replaceAll('\u00C3\u00A2\u00E2\u201A\u00AC\u00E2\u20AC\u0153', '-')
        .replaceAll('\u00E2\u20AC\u00A2', '-')
        .replaceAll('\u00E2\u20AC\u201C', '-')
        .replaceAll('\u00E2\u20AC\u201D', '-')
        .replaceAll('\u00C2\u00B7', '·');

      if (updated !== content) {
        console.log('Cleaned encoding artifacts in:', full);
        fs.writeFileSync(full, updated, 'utf8');
      }
    }
  }
}

checkDir('app');
checkDir('styles');
console.log('Encoding scan complete.');
