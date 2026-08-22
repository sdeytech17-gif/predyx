import fs from 'fs';
let code = fs.readFileSync('tools/verify_landing_page.mjs', 'utf8');

code = code.replace(
  `  // Capture Screenshot of 3D Anatomy Section
  const anatomySection = await page.$('#anatomy');
  if (anatomySection) {
    await anatomySection.screenshot({
      path: path.join(artDir, 'predyx_3d_anatomy_section.png')
    });
    console.log('✔ Screenshot of 3D Anatomy Section captured.');
  }`,
  `  // Scroll and capture Screenshot of 3D Anatomy Section
  await page.evaluate(() => {
    const el = document.querySelector('#anatomy');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  const anatomySection = await page.$('#anatomy');
  if (anatomySection) {
    await anatomySection.screenshot({
      path: path.join(artDir, 'predyx_3d_anatomy_section.png')
    });
    console.log('✔ Screenshot of 3D Anatomy Section captured.');
  }`
);

fs.writeFileSync('tools/verify_landing_page.mjs', code, 'utf8');
console.log('verify_landing_page.mjs updated.');
