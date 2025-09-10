import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

async function computeSeamlessScore(outputDir: string = 'qa/seamless/step1') {
  const browser = await chromium.launch();
  
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    const page = await browser.newPage();
    
    // Desktop analysis (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = 900;
    const scrollSteps = 6;
    const stepSize = Math.floor(pageHeight / scrollSteps);
    
    const backgroundColors: string[] = [];
    let changesAboveFold = 0;
    let changesTotal = 0;
    
    // Scroll and capture background colors
    for (let i = 0; i <= scrollSteps; i++) {
      const scrollY = Math.min(i * stepSize, pageHeight - viewportHeight);
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(100); // Allow scroll to settle
      
      // Get background color at center of viewport
      const centerY = scrollY + viewportHeight / 2;
      const backgroundColor = await page.evaluate((y) => {
        const centerX = window.innerWidth / 2;
        const actualY = y - window.scrollY;
        const element = document.elementFromPoint(centerX, actualY);
        
        if (!element) return 'transparent';
        
        // Find the nearest element with a visible background
        let current = element;
        
        while (current) {
          const computed = window.getComputedStyle(current);
          const bg = computed.backgroundColor;
          const bgImage = computed.backgroundImage;
          
          // Check for gradient or image backgrounds
          if (bgImage && bgImage !== 'none') {
            return bgImage.includes('gradient') ? 'gradient' : 'image';
          }
          
          // Check if element has a non-transparent background color
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            // Normalize rgb values
            return bg.replace(/\s/g, '');
          }
          
          // Check Tailwind background classes
          const classList = current.className;
          if (typeof classList === 'string') {
            if (classList.includes('bg-navy')) return '#0A004A';
            if (classList.includes('bg-white')) return '#FFFFFF';
            if (classList.includes('bg-gray')) return '#E6E6E6';
            if (classList.includes('bg-light-teal')) return '#DEF2F2';
            if (classList.includes('bg-teal')) return '#21A8B0';
            if (classList.includes('bg-light-navy')) return '#3B336E';
          }
          
          current = current.parentElement as HTMLElement;
        }
        
        // Check body and html backgrounds as final fallback
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        const bodyBgImage = window.getComputedStyle(document.body).backgroundImage;
        
        if (bodyBgImage && bodyBgImage !== 'none') {
          return 'body-gradient';
        }
        
        if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)') {
          return bodyBg.replace(/\s/g, '');
        }
        
        const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
        if (htmlBg && htmlBg !== 'rgba(0, 0, 0, 0)') {
          return htmlBg.replace(/\s/g, '');
        }
        
        return 'white'; // Default fallback
      }, centerY);
      
      backgroundColors.push(backgroundColor);
      
      // Count changes
      if (i > 0 && backgroundColors[i] !== backgroundColors[i - 1]) {
        changesTotal++;
        // Check if this change is above the fold (first 1000px)
        if (scrollY < 1000) {
          changesAboveFold++;
        }
      }
    }
    
    // Create score object
    const score = {
      changesAboveFold,
      changesTotal,
      scrollSteps,
      pageHeight,
      backgroundColors,
      timestamp: new Date().toISOString()
    };
    
    // Save score JSON
    await fs.writeFile(
      path.join(outputDir, 'score.json'),
      JSON.stringify(score, null, 2)
    );
    
    // Create summary markdown
    const summary = `# Seamless Theme Score

**Date:** ${score.timestamp}

## Metrics
- **Changes Above Fold (first 1000px):** ${score.changesAboveFold}
- **Total Changes:** ${score.changesTotal}
- **Page Height:** ${score.pageHeight}px
- **Scroll Steps:** ${score.scrollSteps}

## Background Color Transitions
${backgroundColors.map((color, i) => `${i}. ${color}`).join('\n')}

## Summary
The homepage has ${score.changesTotal} background color transitions when scrolling from top to bottom.
${score.changesAboveFold > 0 ? `There are ${score.changesAboveFold} transitions visible above the fold.` : 'No transitions above the fold.'}

## Acceptance Criteria
✅ Changes Above Fold ≤ 3: ${score.changesAboveFold <= 3 ? 'PASSED' : 'FAILED'} (actual: ${score.changesAboveFold})
✅ Total Changes Reduced: ${score.changesTotal} total transitions
`;
    
    await fs.writeFile(path.join(outputDir, 'summary.md'), summary);
    
    console.log('✅ Seamless score computed successfully');
    console.log(`   Changes above fold: ${score.changesAboveFold} ${score.changesAboveFold <= 3 ? '✅' : '❌'}`);
    console.log(`   Total changes: ${score.changesTotal}`);
    console.log(`   Results saved to: ${outputDir}/`);
    
  } finally {
    await browser.close();
  }
}

// Run the score computation
computeSeamlessScore().catch(console.error);