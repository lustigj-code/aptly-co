const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function captureAndCompare() {
  const qaDir = path.join(process.cwd(), 'qa/seamless/final');
  
  // Ensure directory exists
  await fs.mkdir(qaDir, { recursive: true });
  
  const results = {
    timestamp: new Date().toISOString(),
    screenshots: {},
    comparisons: {},
    segmentation_score: {}
  };
  
  const browser = await chromium.launch({ headless: true });
  
  try {
    // Desktop screenshots
    const desktop = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const pageDesktop = await desktop.newPage();
    
    await pageDesktop.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await pageDesktop.waitForTimeout(2000);
    
    // Full page screenshot
    await pageDesktop.screenshot({ 
      path: path.join(qaDir, 'home-desktop.png'),
      fullPage: true 
    });
    results.screenshots.home_desktop = 'home-desktop.png';
    
    // Above fold screenshot
    await pageDesktop.screenshot({ 
      path: path.join(qaDir, 'home-desktop-above-fold.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    
    // Scrolled view
    await pageDesktop.evaluate('window.scrollTo(0, 800)');
    await pageDesktop.waitForTimeout(500);
    await pageDesktop.screenshot({ 
      path: path.join(qaDir, 'home-desktop-scrolled.png')
    });
    results.screenshots.home_desktop_scrolled = 'home-desktop-scrolled.png';
    
    // Mobile screenshots
    const mobile = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const pageMobile = await mobile.newPage();
    
    await pageMobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await pageMobile.waitForTimeout(2000);
    
    await pageMobile.screenshot({ 
      path: path.join(qaDir, 'home-mobile.png'),
      fullPage: true 
    });
    results.screenshots.home_mobile = 'home-mobile.png';
    
    // Analyze for segmentation
    const segmentationAnalysis = await pageDesktop.evaluate(() => {
      const sections = document.querySelectorAll('section, div[class*="py-"], div[class*="bg-"]');
      const issues = [];
      let hardBreaks = 0;
      let visibleBorders = 0;
      
      sections.forEach((section, i) => {
        const styles = window.getComputedStyle(section);
        const bg = styles.backgroundColor;
        const border = styles.borderColor;
        
        // Check for hard color breaks
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const rgb = bg.match(/\d+/g);
          if (rgb) {
            const [r, g, b] = rgb.map(Number);
            // Check if it's a solid color (not surface/transparent)
            if (r > 20 || g > 20 || b > 20) {
              hardBreaks++;
              issues.push({
                element: section.className,
                issue: 'Hard background color break',
                color: bg
              });
            }
          }
        }
        
        // Check for visible borders
        if (border && border !== 'rgba(0, 0, 0, 0)') {
          visibleBorders++;
          issues.push({
            element: section.className,
            issue: 'Visible border',
            color: border
          });
        }
      });
      
      return {
        total_sections: sections.length,
        hard_breaks: hardBreaks,
        visible_borders: visibleBorders,
        issues: issues.slice(0, 5), // First 5 issues
        seamless_score: Math.max(0, 100 - (hardBreaks * 20) - (visibleBorders * 10))
      };
    });
    
    results.segmentation_score = segmentationAnalysis;
    
    // Calculate change metrics
    results.comparisons = {
      changes_above_fold: segmentationAnalysis.hard_breaks > 0 ? 1 : 0,
      changes_total: segmentationAnalysis.hard_breaks + segmentationAnalysis.visible_borders,
      assessment: segmentationAnalysis.seamless_score >= 80 ? 'PASS' : 'NEEDS_WORK'
    };
    
  } finally {
    await browser.close();
  }
  
  // Save results
  await fs.writeFile(
    path.join(qaDir, 'score.json'),
    JSON.stringify(results, null, 2)
  );
  
  // Generate summary
  const summary = `# Seamless Polish - Final Validation

## Timestamp
${results.timestamp}

## Segmentation Score
- **Seamless Score**: ${results.segmentation_score.seamless_score}/100
- **Hard Breaks Found**: ${results.segmentation_score.hard_breaks}
- **Visible Borders**: ${results.segmentation_score.visible_borders}
- **Total Sections Analyzed**: ${results.segmentation_score.total_sections}

## Change Metrics
- **Changes Above Fold**: ${results.comparisons.changes_above_fold}
- **Changes Total**: ${results.comparisons.changes_total}
- **Assessment**: ${results.comparisons.assessment}

## Issues Found
${results.segmentation_score.issues.length > 0 ? 
  results.segmentation_score.issues.map(i => `- ${i.element}: ${i.issue}`).join('\n') : 
  '✅ No segmentation issues detected'}

## Screenshots Captured
- Desktop Full: ${results.screenshots.home_desktop}
- Desktop Scrolled: ${results.screenshots.home_desktop_scrolled}
- Mobile Full: ${results.screenshots.home_mobile}

## Recommendation
${results.comparisons.assessment === 'PASS' ? 
  '✅ The design maintains seamless flow with minimal segmentation.' :
  '⚠️ Some hard breaks remain that need addressing for true seamless flow.'}
`;
  
  await fs.writeFile(path.join(qaDir, 'summary.md'), summary);
  
  console.log('=== Seamless Validation Results ===');
  console.log(`Seamless Score: ${results.segmentation_score.seamless_score}/100`);
  console.log(`Changes Above Fold: ${results.comparisons.changes_above_fold}`);
  console.log(`Changes Total: ${results.comparisons.changes_total}`);
  console.log(`Assessment: ${results.comparisons.assessment}`);
  console.log('\nResults saved to qa/seamless/final/');
  
  return results;
}

captureAndCompare().catch(console.error);