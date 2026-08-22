import puppeteer from 'puppeteer-core';

async function testRaycast() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--enable-webgl']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Click on the first muscle chip
  const chipClicked = await page.evaluate(() => {
    const chip = document.querySelector('#anatomy [class*="chipAmber"]');
    if (chip) {
      chip.click();
      return { clicked: true, text: chip.textContent };
    }
    return { clicked: false };
  });
  console.log('Chip clicked:', chipClicked);

  await new Promise(r => setTimeout(r, 300));
  const activeBox = await page.evaluate(() => {
    const box = document.querySelector('#anatomy [class*="activeMuscleBox"]');
    return {
      hasActiveBox: !!box,
      headerText: box?.querySelector('span')?.textContent,
      cueText: box?.querySelector('p')?.textContent
    };
  });
  console.log('Sidebar active muscle inspection box:', activeBox);

  // 2. Click directly on the 3D canvas (torso region)
  const canvas = await page.$('canvas[class*="canvas3d"]');
  if (canvas) {
    const box = await canvas.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2 - 20);
    await new Promise(r => setTimeout(r, 400));
    const tooltipOnCanvas = await page.evaluate(() => {
      const tt = document.querySelector('#anatomy [class*="muscleTooltip"]');
      return {
        hasTooltip: !!tt,
        name: tt?.querySelector('h4')?.textContent
      };
    });
    console.log('3D Canvas Raycast Tooltip result:', tooltipOnCanvas);
  }

  await browser.close();
}

testRaycast().catch(console.error);
