# QA Commands: Ready-to-Run

## Prerequisites

### Start Development Server
```bash
# Terminal 1: Start the app
npm run dev

# Wait for server to be ready at http://localhost:3000
# Keep this running for all tests
```

### Install Dependencies (if needed)
```bash
# Axe for accessibility testing
npm install -D @axe-core/playwright

# Contrast calculation utility 
npm install -D color-contrast-checker

# Additional Playwright browsers (if needed)
npx playwright install
```

## 1. Axe Accessibility Testing

### Run All Accessibility Tests
```bash
# Run existing accessibility test suite
npx playwright test tests/accessibility.spec.ts --reporter=list

# Run with detailed JSON output
npx playwright test tests/accessibility.spec.ts --reporter=json --output-file=qa/axe/results.json
```

### Run Single Page Axe Test
```bash
# Test specific pages individually
npx playwright test tests/accessibility.spec.ts -g "Homepage" --reporter=list
npx playwright test tests/accessibility.spec.ts -g "Services page" --reporter=list  
npx playwright test tests/accessibility.spec.ts -g "Contact page" --reporter=list
```

### Generate Axe Reports
```bash
# Create output directories
mkdir -p qa/axe qa/visual qa/contrast

# Run tests with HTML reporter for detailed analysis
npx playwright test tests/accessibility.spec.ts --reporter=html
# View report: npx playwright show-report

# Generate individual page reports (create script first)
node scripts/generate-axe-reports.js
```

## 2. Visual Brand Testing

### Capture Brand Color References
```bash
# Run visual regression tests to capture brand consistency
npx playwright test tests/visual-regression.spec.ts --reporter=list

# Update visual baselines if intentional changes made
npx playwright test tests/visual-regression.spec.ts --update-snapshots

# Test specific brand elements
npx playwright test tests/component-consistency.spec.ts --reporter=list
```

### Brand Color Validation Script
```bash
# Run comprehensive brand color audit (create script first)
node scripts/brand-color-audit.js > qa/visual/brand-audit.json

# Check for non-brand color usage
node scripts/detect-non-brand-colors.js
```

## 3. Contrast Ratio Testing

### Automated Contrast Checking
```bash
# Create and run contrast validation script
node scripts/contrast-checker.js > qa/contrast/report.json

# Validate all brand color combinations
node scripts/validate-brand-contrasts.js
```

### Manual Contrast Verification
```bash
# Open specific pages for manual testing
open "http://localhost:3000/"
open "http://localhost:3000/services"  
open "http://localhost:3000/contact"

# Use browser dev tools or external tools:
# - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
# - Chrome DevTools Accessibility panel
# - axe DevTools browser extension
```

## 4. Keyboard Navigation Testing

### Automated Keyboard Tests
```bash
# Run keyboard navigation test suite
npx playwright test tests/accessibility.spec.ts -g "keyboard" --reporter=list

# Test focus management
npx playwright test tests/accessibility.spec.ts -g "focus" --reporter=list
```

### Manual Keyboard Testing Commands
```bash
# Start server and open pages for manual testing
npm run dev

# Manual test checklist:
echo "Manual keyboard testing:"
echo "1. Tab through all interactive elements"
echo "2. Verify focus indicators visible"
echo "3. Test Enter/Space on buttons"
echo "4. Test Escape on modals"
echo "5. Verify logical tab order"
```

## 5. Screen Reader Testing

### Automated ARIA Testing
```bash
# Test ARIA attributes and semantic structure
npx playwright test tests/accessibility.spec.ts -g "aria" --reporter=list
npx playwright test tests/accessibility.spec.ts -g "semantic" --reporter=list
```

### Manual Screen Reader Setup
```bash
# macOS VoiceOver testing
echo "VoiceOver Commands:"
echo "Start: Cmd+F5"
echo "Navigate: Control+Option+Arrow"
echo "Read all: Control+Option+A"

# Test with actual screen reader (manual process)
echo "1. Enable VoiceOver"
echo "2. Navigate through each critical page"
echo "3. Verify content is announced properly"
echo "4. Test form interactions"
```

## 6. Mobile Accessibility Testing

### Automated Mobile Tests
```bash
# Run mobile-specific accessibility tests
npx playwright test tests/mobile-responsiveness.spec.ts --project=mobile-chrome
npx playwright test tests/accessibility.spec.ts --project=mobile-safari
```

### Touch Target Validation
```bash
# Test touch target sizes (44px minimum)
node scripts/touch-target-audit.js > qa/mobile/touch-targets.json

# Run mobile accessibility specifically
npx playwright test --project=mobile-chrome tests/accessibility.spec.ts
```

## 7. Comprehensive Test Suites

### Full Accessibility Audit
```bash
# Complete accessibility test run across all browsers
npx playwright test tests/accessibility.spec.ts --reporter=html

# Generate comprehensive report
npm run test:accessibility:full  # if script exists in package.json
```

### Full Brand Compliance Check
```bash
# Run all brand-related tests
npx playwright test tests/visual-regression.spec.ts tests/component-consistency.spec.ts --reporter=html

# Validate brand guidelines compliance
node scripts/brand-compliance-check.js > qa/brand-compliance-report.json
```

### Performance Impact Check
```bash
# Test performance with accessibility features enabled
npx playwright test tests/performance.spec.ts --reporter=list

# Lighthouse with accessibility focus
npx playwright test tests/performance.spec.ts -g "accessibility" --reporter=list
```

## 8. Reporting & Documentation

### Generate Summary Reports
```bash
# Create consolidated test reports
node scripts/generate-qa-summary.js

# Export results for stakeholders
node scripts/export-accessibility-report.js --format=pdf --output=qa/reports/
```

### Create Evidence Package
```bash
# Bundle all test results and screenshots
zip -r qa/evidence-package.zip qa/ screenshots/ test-results/

# Generate compliance statement
node scripts/generate-compliance-statement.js > qa/wcag-compliance-statement.md
```

## 9. Script Templates

### Create Axe Report Generator (scripts/generate-axe-reports.js)
```bash
cat > scripts/generate-axe-reports.js << 'EOF'
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'homepage', url: 'http://localhost:3000/' },
  { name: 'services', url: 'http://localhost:3000/services' },
  { name: 'contact', url: 'http://localhost:3000/contact' },
  { name: 'about', url: 'http://localhost:3000/about' },
  { name: 'courses', url: 'http://localhost:3000/courses' }
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  for (const pageInfo of pages) {
    const page = await context.newPage();
    await page.goto(pageInfo.url);
    
    const axeResults = await new AxeBuilder({ page }).analyze();
    
    // Save results
    const outputPath = path.join('qa', 'axe', `${pageInfo.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(axeResults, null, 2));
    
    console.log(`✓ ${pageInfo.name}: ${axeResults.violations.length} violations`);
    await page.close();
  }
  
  await browser.close();
})();
EOF

chmod +x scripts/generate-axe-reports.js
```

### Create Contrast Checker Script (scripts/contrast-checker.js)
```bash
cat > scripts/contrast-checker.js << 'EOF'
const { contrast } = require('color-contrast-checker');

const brandColors = {
  navy: '#0A004A',
  teal: '#21A8B0', 
  yellow: '#FFDE00',
  lightNavy: '#3B336E',
  mutedTeal: '#69BCC1',
  lightTeal: '#DEF2F2',
  white: '#FFFFFF',
  lightGrey: '#E6E6E6',
  grey: '#CCCCCC',
  richBlack: '#333333'
};

const combinations = [
  { bg: 'navy', text: 'white', context: 'Primary buttons' },
  { bg: 'white', text: 'navy', context: 'Body text' },
  { bg: 'white', text: 'richBlack', context: 'Primary content' },
  { bg: 'teal', text: 'white', context: 'CTA buttons' },
  { bg: 'lightTeal', text: 'navy', context: 'Card content' },
  { bg: 'lightNavy', text: 'white', context: 'Section backgrounds' }
];

console.log('Contrast Ratio Report\n');

combinations.forEach(combo => {
  const bgColor = brandColors[combo.bg];
  const textColor = brandColors[combo.text];
  const ratio = contrast(bgColor, textColor);
  const normalPass = ratio >= 4.5;
  const largePass = ratio >= 3.0;
  
  console.log(`${combo.context}:`);
  console.log(`  ${combo.bg} (${bgColor}) + ${combo.text} (${textColor})`);
  console.log(`  Ratio: ${ratio.toFixed(2)}:1`);
  console.log(`  Normal text: ${normalPass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Large text: ${largePass ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
});
EOF

chmod +x scripts/contrast-checker.js
```

## 10. Continuous Integration Commands

### GitHub Actions Integration
```bash
# Add to CI pipeline
name: Accessibility Tests
run: |
  npm install
  npm run build
  npx playwright install
  npx playwright test tests/accessibility.spec.ts --reporter=json > accessibility-results.json
  
# Upload results as artifacts
uses: actions/upload-artifact@v3
with:
  name: accessibility-results
  path: accessibility-results.json
```

### Pre-commit Hook
```bash
# Add to .husky/pre-commit or git hooks
npx playwright test tests/accessibility.spec.ts --reporter=list
if [ $? -ne 0 ]; then
  echo "❌ Accessibility tests failed. Please fix violations before committing."
  exit 1
fi
```

## Quick Start Checklist

1. ✅ **Start dev server**: `npm run dev`
2. ✅ **Run Axe tests**: `npx playwright test tests/accessibility.spec.ts`  
3. ✅ **Check contrasts**: `node scripts/contrast-checker.js`
4. ✅ **Visual tests**: `npx playwright test tests/visual-regression.spec.ts`
5. ✅ **Generate reports**: `node scripts/generate-axe-reports.js`
6. ✅ **Review results**: Check `qa/` directory for all outputs

## Emergency Quick Test
```bash
# If you need results fast (5-minute check)
npm run dev &
sleep 10
npx playwright test tests/accessibility.spec.ts -g "critical" --reporter=list
node scripts/contrast-checker.js | head -20
```