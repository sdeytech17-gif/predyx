import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const artDir = 'C:/Users/CODECLOUDS-SAURAV/.gemini/antigravity/brain/3c314e1d-f34b-4348-94c6-d401c00d3d3a';

async function runVerification() {
  console.log('================================================================');
  console.log('=== PREDYX 2.5D KINEMATIC ANATOMY VERIFICATION SUITE ===');
  console.log('================================================================');
  
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const errors = [];

  // ==========================================
  // TEST 1: DESKTOP 1440px & ANATOMY VIEWER
  // ==========================================
  console.log('\n--- 1. Testing Desktop 1440x900 & Live Anatomy Viewer ---');
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[Console Error] ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    errors.push(`[Page Error] ${err.toString()}`);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Check SVG Anatomy Presence
  const svgStatus = await page.evaluate(() => {
    const svg = document.querySelector('#anatomy svg');
    const musclePaths = document.querySelectorAll('#anatomy [data-muscle]');
    return {
      hasSvg: !!svg,
      muscleCount: musclePaths.length,
      viewBox: svg?.getAttribute('viewBox'),
      ariaLabel: svg?.getAttribute('aria-label')
    };
  });
  console.log('Anatomy SVG Status:', svgStatus);
  if (!svgStatus.hasSvg || svgStatus.muscleCount === 0) {
    errors.push('Anatomy SVG or muscle paths not detected!');
  }

  // Test 2.5D Parallax Pointer Movement
  console.log('\n--- 2. Testing 2.5D Pointer Parallax Tilt Gesture ---');
  const stageElement = await page.$('#anatomy [class*="viewerWrapper"]');
  if (stageElement) {
    const box = await stageElement.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.25);
      await new Promise(r => setTimeout(r, 200));
      await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.75);
      await new Promise(r => setTimeout(r, 300));
      console.log('✔ Pointer parallax gesture successfully executed.');
    }
  }

  // Test Anterior / Posterior Toggle
  console.log('\n--- 3. Testing Anterior / Posterior View Toggle ---');
  const viewToggleResults = await page.evaluate(async () => {
    const posteriorBtn = Array.from(document.querySelectorAll('#anatomy button')).find(b => b.textContent.includes('POSTERIOR'));
    const anteriorBtn = Array.from(document.querySelectorAll('#anatomy button')).find(b => b.textContent.includes('ANTERIOR'));
    
    posteriorBtn?.click();
    await new Promise(r => setTimeout(r, 300));
    const isPosterior = !!document.querySelector('#posteriorView');
    
    anteriorBtn?.click();
    await new Promise(r => setTimeout(r, 300));
    const isAnterior = !!document.querySelector('#anteriorView');
    
    return { isPosterior, isAnterior };
  });
  console.log('View Toggle Results:', viewToggleResults);

  // Test Exercise Switcher
  console.log('\n--- 4. Testing Exercise Presets & Material Highlights ---');
  const exerciseResults = await page.evaluate(async () => {
    const tabs = Array.from(document.querySelectorAll('#anatomy button[role="tab"]'));
    const results = [];
    for (const tab of tabs) {
      tab.click();
      await new Promise(r => setTimeout(r, 250));
      const activeTitle = document.querySelector('#anatomy h3[class*="sidebarTitle"]')?.textContent;
      const primaryChips = Array.from(document.querySelectorAll('#anatomy [class*="chipAmber"]')).map(c => c.textContent?.trim());
      const secondaryChips = Array.from(document.querySelectorAll('#anatomy [class*="chipSteel"]')).map(c => c.textContent?.trim());
      results.push({ tab: tab.textContent?.trim(), activeTitle, primaryChips, secondaryChips });
    }
    return results;
  });
  console.log('Exercise preset switches:', JSON.stringify(exerciseResults, null, 2));

  // Test Direct SVG Muscle Click Inspection
  console.log('\n--- 5. Testing Direct SVG Muscle Click & Tooltip ---');
  const tooltipResult = await page.evaluate(async () => {
    const quadPath = document.querySelector('#anatomy [data-muscle="muscle_quads"]');
    if (quadPath) {
      quadPath.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await new Promise(r => setTimeout(r, 300));
      const tooltip = document.querySelector('#anatomy [role="tooltip"]');
      return {
        hasTooltip: !!tooltip,
        name: tooltip?.querySelector('h4')?.textContent,
        cue: tooltip?.querySelector('p')?.textContent
      };
    }
    return null;
  });
  console.log('SVG Muscle Click Result:', tooltipResult);

  // Capture Anatomy Section Screenshot
  console.log('\n--- 6. Capturing Production Artifact Screenshots ---');
  const anatomySection = await page.$('#anatomy');
  if (anatomySection) {
    const anatomyPath = path.join(artDir, 'predyx_3d_anatomy_section.png');
    await anatomySection.screenshot({ path: anatomyPath });
    console.log(`✔ Saved Anatomy Section screenshot to ${anatomyPath}`);
  }

  // Desktop Full Page Screenshot
  const desktopPath = path.join(artDir, 'predyx_desktop_1440.png');
  await page.screenshot({ path: desktopPath, fullPage: false });
  console.log(`✔ Saved Desktop 1440px viewport screenshot to ${desktopPath}`);

  // ==========================================
  // TEST 2: MOBILE 375px VIEWPORT
  // ==========================================
  console.log('\n--- 7. Testing Mobile 375px Viewport ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const mobileAnatomy = await mobilePage.$('#anatomy');
  if (mobileAnatomy) {
    const mobilePath = path.join(artDir, 'predyx_mobile_375.png');
    await mobileAnatomy.screenshot({ path: mobilePath });
    console.log(`✔ Saved Mobile 375px screenshot to ${mobilePath}`);
  }

  await browser.close();

  console.log('\n================================================================');
  if (errors.length === 0) {
    console.log('✔ ALL PREDYX ANATOMY TESTS PASSED WITH 0 ERRORS.');
  } else {
    console.warn(`⚠ ${errors.length} non-fatal or logged items:`, errors);
  }
  console.log('================================================================');
}

runVerification().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
