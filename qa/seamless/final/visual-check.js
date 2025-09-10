const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function visualCheck() {
  const qaDir = path.join(process.cwd(), 'qa/seamless/final');
  await fs.mkdir(qaDir, { recursive: true });
  
  const browser = await chromium.launch({ headless: true });
  
  try {
    // Desktop screenshots
    const desktop = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2 // High quality screenshots
    });
    const page = await desktop.newPage();
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000); // Wait for animations
    
    // Take multiple screenshots for comparison
    await page.screenshot({ 
      path: path.join(qaDir, 'home-desktop-final.png'),
      fullPage: true 
    });
    
    // Check text contrast
    const contrastCheck = await page.evaluate(() => {
      const checkContrast = (fg, bg) => {
        const getLuminance = (r, g, b) => {
          const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        };
        
        const parseColor = (color) => {
          const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
        };
        
        const [fr, fgreen, fb] = parseColor(fg);
        const [br, bgreen, bb] = parseColor(bg);
        
        const l1 = getLuminance(fr, fgreen, fb);
        const l2 = getLuminance(br, bgreen, bb);
        
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      };
      
      const elements = document.querySelectorAll('h1, h2, h3, p, button, a');
      const issues = [];
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const bg = styles.backgroundColor;
        
        if (color && bg && bg !== 'rgba(0, 0, 0, 0)') {
          const ratio = checkContrast(color, bg);
          if (ratio < 4.5) { // WCAG AA for normal text
            issues.push({
              element: el.tagName,
              text: el.textContent.substring(0, 50),
              ratio: ratio.toFixed(2),
              required: '4.5'
            });
          }
        }
      });
      
      return issues;
    });
    
    // Check for visual segmentation
    const segmentationCheck = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const checks = [];
      
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        const styles = window.getComputedStyle(section);
        
        // Check if section has hard background
        const bg = styles.backgroundColor;
        const hasHardBg = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
        
        // Check if section has borders
        const hasBorder = styles.borderTopWidth !== '0px' || styles.borderBottomWidth !== '0px';
        
        checks.push({
          section: i + 1,
          classes: section.className,
          hasHardBackground: hasHardBg,
          hasBorder: hasBorder,
          height: Math.round(rect.height)
        });
      });
      
      return checks;
    });
    
    // Mobile check
    const mobile = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 3,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
    });
    const mobilePage = await mobile.newPage();
    
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(3000);
    
    await mobilePage.screenshot({ 
      path: path.join(qaDir, 'home-mobile-final.png'),
      fullPage: true 
    });
    
    // Calculate scores
    const hardBreaks = segmentationCheck.filter(s => s.hasHardBackground).length;
    const borders = segmentationCheck.filter(s => s.hasBorder).length;
    const contrastIssues = contrastCheck.length;
    
    const sections = segmentationCheck;
    const seamlessScore = Math.max(0, 100 - (hardBreaks * 15) - (borders * 5) - (contrastIssues * 2));
    
    // Generate final report
    const report = {
      timestamp: new Date().toISOString(),
      scores: {
        seamless: seamlessScore,
        changesAboveFold: hardBreaks > 0 ? 1 : 0,
        changesTotal: hardBreaks + borders,
        assessment: seamlessScore >= 85 ? 'PASS' : 'NEEDS_IMPROVEMENT'
      },
      segmentation: {
        totalSections: sections.length,
        hardBreaks,
        borders,
        details: segmentationCheck
      },
      accessibility: {
        contrastIssues: contrastIssues,
        details: contrastCheck.slice(0, 5)
      },
      screenshots: {
        desktop: 'home-desktop-final.png',
        mobile: 'home-mobile-final.png'
      }
    };
    
    await fs.writeFile(
      path.join(qaDir, 'visual-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    // Generate markdown summary
    const summary = `# Seamless Polish - Visual Validation Report

## Scores
- **Seamless Score**: ${seamlessScore}/100
- **Assessment**: ${report.scores.assessment}
- **Changes Above Fold**: ${report.scores.changesAboveFold}
- **Total Changes**: ${report.scores.changesTotal}

## Segmentation Analysis
- Total Sections: ${report.segmentation.totalSections}
- Hard Background Breaks: ${hardBreaks}
- Visible Borders: ${borders}

## Accessibility Check
- Contrast Issues Found: ${contrastIssues}
${contrastIssues > 0 ? '\nContrast issues need attention for WCAG AA compliance.' : '✅ All text meets WCAG AA contrast requirements.'}

## Visual Evidence
- Desktop: qa/seamless/final/${report.screenshots.desktop}
- Mobile: qa/seamless/final/${report.screenshots.mobile}

## Recommendation
${seamlessScore >= 85 ? 
  '✅ The design successfully achieves seamless flow with minimal visual segmentation.' :
  seamlessScore >= 70 ?
  '⚠️ Good progress on seamless design, minor refinements needed.' :
  '❌ Significant segmentation remains. Further polish required.'}

Generated: ${report.timestamp}
`;
    
    await fs.writeFile(path.join(qaDir, 'summary.md'), summary);
    
    console.log('=== Visual Validation Complete ===');
    console.log(`Seamless Score: ${seamlessScore}/100`);
    console.log(`Hard Breaks: ${hardBreaks}`);
    console.log(`Borders: ${borders}`);
    console.log(`Contrast Issues: ${contrastIssues}`);
    console.log(`Assessment: ${report.scores.assessment}`);
    console.log('\nFull report saved to qa/seamless/final/');
    
  } finally {
    await browser.close();
  }
}

visualCheck().catch(console.error);