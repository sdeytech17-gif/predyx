import puppeteer from 'puppeteer-core';
import path from 'path';

const artDir = 'C:/Users/CODECLOUDS-SAURAV/.gemini/antigravity/brain/3c314e1d-f34b-4348-94c6-d401c00d3d3a';

async function captureReviewScreenshots() {
  console.log('--- Launching Chrome for Visual Review Capture ---');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop 1440px - Anterior Chain (Squat)
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/#anatomy', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    const el = document.querySelector('#anatomy');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));

  const anatomyEl = await page.$('#anatomy');
  if (anatomyEl) {
    const squatPath = path.join(artDir, 'predyx_anatomy_desktop_squat.png');
    await anatomyEl.screenshot({ path: squatPath });
    console.log('Saved: ' + squatPath);
  }

  // 2. Desktop 1440px - Switch to Deadlift (Posterior Chain)
  await page.evaluate(() => {
    const deadliftTab = Array.from(document.querySelectorAll('#anatomy button[role="tab"]')).find(b => b.textContent.includes('Deadlift'));
    deadliftTab?.click();
  });
  await new Promise(r => setTimeout(r, 800));

  if (anatomyEl) {
    const deadliftPath = path.join(artDir, 'predyx_anatomy_desktop_deadlift.png');
    await anatomyEl.screenshot({ path: deadliftPath });
    console.log('Saved: ' + deadliftPath);
  }

  // 3. Mobile 375px Viewport
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:3000/#anatomy', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await mobilePage.evaluate(() => {
    const el = document.querySelector('#anatomy');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));

  const mobileAnatomyEl = await mobilePage.$('#anatomy');
  if (mobileAnatomyEl) {
    const mobilePath = path.join(artDir, 'predyx_anatomy_mobile_375.png');
    await mobileAnatomyEl.screenshot({ path: mobilePath });
    console.log('Saved: ' + mobilePath);
  }

  await browser.close();
  console.log('--- Visual Review Capture Completed ---');
}

captureReviewScreenshots().catch(console.error);
