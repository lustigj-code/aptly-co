import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const outputDir = path.join(process.cwd(), 'qa/seamless/step1');
  await fs.mkdir(outputDir, { recursive: true });

  const pages = [
    { name: 'homepage', url: 'http://localhost:3000/' },
    { name: 'about', url: 'http://localhost:3000/about' },
    { name: 'services', url: 'http://localhost:3000/services' },
    { name: 'insights', url: 'http://localhost:3000/insights' },
    { name: 'success', url: 'http://localhost:3000/success' },
  ];

  for (const pageInfo of pages) {
    console.log(`Taking screenshot of ${pageInfo.name}...`);
    await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations to complete
    
    // Take full page screenshot
    await page.screenshot({
      path: path.join(outputDir, `${pageInfo.name}-full.png`),
      fullPage: true,
    });
    
    // Take above-the-fold screenshot
    await page.screenshot({
      path: path.join(outputDir, `${pageInfo.name}-fold.png`),
      fullPage: false,
    });
  }

  await browser.close();
  console.log('Screenshots saved to qa/seamless/step1/');
}

takeScreenshots().catch(console.error);