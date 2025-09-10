import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

test('Capture baseline screenshots and analyze visual segmentation', async ({ page }) => {
  // Ensure qa/seamless/s1 directory exists
  const outputDir = path.join(process.cwd(), 'qa', 'seamless', 's1');
  await fs.mkdir(outputDir, { recursive: true });

  // Navigate to homepage
  await page.goto('http://localhost:3000');
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Extra wait for animations

  // Desktop screenshot (1440x900)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ 
    path: path.join(outputDir, 'baseline-desktop.png'),
    fullPage: true 
  });

  // Mobile screenshot (390x844) 
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ 
    path: path.join(outputDir, 'baseline-mobile.png'),
    fullPage: true 
  });

  // Return to desktop for analysis
  await page.setViewportSize({ width: 1440, height: 900 });

  // Analyze section backgrounds for segmentation analysis
  const sections = await page.$$('section');
  const sectionAnalysis = [];
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    
    // Get computed background color
    const bgColor = await page.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        backgroundImage: computed.backgroundImage
      };
    }, section);
    
    // Get section text content for identification
    const textContent = await section.textContent();
    const firstLine = textContent?.split('\n')[0]?.trim().slice(0, 50) || '';
    
    // Get section position
    const boundingBox = await section.boundingBox();
    
    sectionAnalysis.push({
      index: i,
      firstLine,
      bgColor: bgColor.backgroundColor,
      bgImage: bgColor.backgroundImage,
      position: boundingBox,
      aboveFold: boundingBox && boundingBox.y < 900
    });
  }

  // Save analysis data for processing
  await fs.writeFile(
    path.join(outputDir, 'section-analysis.json'),
    JSON.stringify(sectionAnalysis, null, 2)
  );

  console.log(`Screenshots and analysis saved to ${outputDir}`);
  console.log(`Found ${sections.length} sections`);
});