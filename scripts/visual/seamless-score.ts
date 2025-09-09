import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

async function captureSeamlessBaseline() {
  const browser = await chromium.launch();
  
  try {
    // Capture screenshots at specified breakpoints
    const page = await browser.newPage();
    
    // Desktop screenshot (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.screenshot({ 
      path: 'qa/seamless/baseline/home-desktop.png',
      fullPage: false
    });
    
    // Mobile screenshot (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.screenshot({ 
      path: 'qa/seamless/baseline/home-mobile.png',
      fullPage: false
    });
    
    // Calculate segmentation score
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
        const checkedElements: string[] = [];
        
        while (current) {
          const computed = window.getComputedStyle(current);
          const bg = computed.backgroundColor;
          const bgImage = computed.backgroundImage;
          
          checkedElements.push(`${current.tagName}.${current.className}`);
          
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
          }
          
          current = current.parentElement as HTMLElement;
        }
        
        // Check body and html backgrounds as final fallback
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
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
      'qa/seamless/baseline/score.json',
      JSON.stringify(score, null, 2)
    );
    
    // Create summary markdown
    const summary = `# Seamless Baseline Score

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
`;
    
    await fs.writeFile('qa/seamless/baseline/summary.md', summary);
    
    console.log('✅ Baseline captured successfully');
    console.log(`   Changes above fold: ${score.changesAboveFold}`);
    console.log(`   Total changes: ${score.changesTotal}`);
    
  } finally {
    await browser.close();
  }
}

// Run the capture
captureSeamlessBaseline().catch(console.error);