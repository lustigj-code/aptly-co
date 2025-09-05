# Screenshot Validation Workflow Documentation

## Overview

The Screenshot Validation Workflow is a comprehensive system designed to prevent UI regressions by capturing and comparing screenshots before and after code changes. This ensures visual consistency across the aptly.co website and helps maintain design integrity.

## Key Features

- **Multi-viewport Testing**: Automatically captures screenshots in desktop, laptop, tablet, and mobile viewports
- **Pixel-perfect Comparison**: Detects even minor visual changes with configurable thresholds
- **Session Management**: Tracks validation sessions for organized testing
- **Pre-commit Integration**: Optional hooks to validate changes before committing
- **Developer-friendly Tools**: CLI commands and React components for easy integration

## Architecture

The system consists of four main components:

1. **Screenshot Utility** (`src/utils/screenshot/screenshotUtility.ts`)
   - Handles browser automation via Playwright
   - Captures screenshots with various options
   - Manages viewport configurations

2. **Comparison Utility** (`src/utils/screenshot/comparisonUtility.ts`)
   - Performs pixel-by-pixel comparisons
   - Generates visual diff images
   - Calculates difference percentages

3. **Validation Workflow** (`src/utils/screenshot/validationWorkflow.ts`)
   - Orchestrates the validation process
   - Manages sessions and state
   - Generates comprehensive reports

4. **CLI Interface** (`src/utils/screenshot/cli.ts`)
   - Provides command-line access to all features
   - Enables automation and scripting

## Quick Start

### 1. Basic Screenshot Capture

Capture a single screenshot:
```bash
npm run screenshot:home
```

### 2. Full Validation Workflow

Run a complete before/after validation:
```bash
npm run screenshot:validate
```

This will:
1. Capture screenshots of all pages
2. Wait for you to make changes
3. Capture screenshots again
4. Compare and report differences

### 3. Custom Validation

Validate specific pages with custom threshold:
```bash
npm run screenshot:validate --pages home,about --threshold 2.0
```

## CLI Commands

### Available npm Scripts

- `npm run screenshot` - Show CLI help and available commands
- `npm run screenshot:home` - Quick capture of home page
- `npm run screenshot:validate` - Run full validation workflow

### Direct CLI Usage

```bash
# Start a new validation session
tsx src/utils/screenshot/cli.ts start-session "feature-update"

# Capture before state
tsx src/utils/screenshot/cli.ts capture-before home http://localhost:3000

# Make your changes, then capture after state
tsx src/utils/screenshot/cli.ts capture-after home

# Complete session and generate report
tsx src/utils/screenshot/cli.ts complete-session

# List all sessions
tsx src/utils/screenshot/cli.ts list-sessions

# Compare two specific screenshots
tsx src/utils/screenshot/cli.ts compare path/to/before.png path/to/after.png
```

## Directory Structure

```
screenshots/
├── before/          # Screenshots taken before changes
├── after/           # Screenshots taken after changes
├── diff/            # Comparison visualizations and reports
├── history/         # Historical screenshots for reference
└── sessions/        # Session metadata and tracking
```

## Pre-commit Hook

The pre-commit hook automatically validates UI changes before allowing commits.

### How it Works

1. Detects if any UI files (*.tsx, *.jsx, *.css) have changed
2. If yes, runs screenshot validation
3. Blocks commit if significant visual changes are detected

### Bypassing the Hook

If changes are intentional:
```bash
SKIP_SCREENSHOT_VALIDATION=true git commit -m "Update UI design"
```

## React Component Integration

Use the `ScreenshotValidator` component for in-app validation:

```tsx
import { ScreenshotValidator } from '@/components/ScreenshotValidator';

function DevTools() {
  return (
    <div>
      <ScreenshotValidator />
    </div>
  );
}
```

## Configuration Options

### Viewport Presets

The system includes four standard viewports:
- **Desktop**: 1920x1080
- **Laptop**: 1366x768
- **Tablet**: 768x1024
- **Mobile**: 375x812

### Screenshot Options

```typescript
interface ScreenshotOptions {
  fullPage?: boolean;           // Capture entire page (default: true)
  viewport?: { width, height }; // Custom viewport size
  waitForSelector?: string;     // Wait for element before capture
  waitForTimeout?: number;      // Additional wait time in ms
  clip?: { x, y, width, height }; // Capture specific region
  omitBackground?: boolean;     // Transparent background
  deviceScaleFactor?: number;   // Pixel density (default: 2)
}
```

### Comparison Threshold

The threshold determines how much difference is acceptable:
- `0.01` (1%) - Default, catches most visual changes
- `0.1` (10%) - More lenient, ignores minor variations
- `0` - Exact match required

## Best Practices

### 1. Consistent Environment

- Always run validations with the same browser version
- Ensure consistent font rendering across environments
- Use the same OS/platform when possible

### 2. Handling Dynamic Content

For pages with dynamic content:
```javascript
// Wait for specific elements
await captureScreenshot(url, 'before', 'page-name', {
  waitForSelector: '.content-loaded',
  waitForTimeout: 3000
});
```

### 3. Organizing Sessions

Use descriptive session names:
```bash
# Good
npm run screenshot start-session "navbar-redesign-2024-01"
npm run screenshot start-session "fix-mobile-layout-issue-123"

# Less helpful
npm run screenshot start-session "test"
npm run screenshot start-session "changes"
```

### 4. Review Process

1. Always review diff images when changes are detected
2. Check multiple viewports, especially mobile
3. Verify animations and transitions still work
4. Document intentional visual changes

## Troubleshooting

### Common Issues

**1. Playwright Not Installed**
```bash
npm run playwright:install
```

**2. Server Not Running**
The validation script will attempt to start the dev server automatically. Ensure port 3000 is available.

**3. Screenshot Differences on Different Machines**
- Use Docker for consistent environment
- Disable font smoothing: `defaults write -g AppleFontSmoothing -int 0`
- Use headless mode for consistency

**4. Timeout Errors**
Increase wait times for slow-loading pages:
```javascript
waitForTimeout: 5000 // 5 seconds
```

## GitHub Actions Integration

For CI/CD integration, use the provided GitHub Actions workflow:

```yaml
name: Visual Regression Tests
on: [pull_request]

jobs:
  screenshot-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run playwright:install
      - run: npm run screenshot:validate --base-url ${{ secrets.PREVIEW_URL }}
```

## Advanced Usage

### Custom Validation Logic

Create custom validation scripts:

```typescript
import { ValidationWorkflow } from '@/utils/screenshot/validationWorkflow';

const workflow = new ValidationWorkflow();

async function customValidation() {
  const sessionId = await workflow.startValidationSession('custom');
  
  // Capture specific components
  await workflow.captureBeforeState('header', 'http://localhost:3000', {
    clip: { x: 0, y: 0, width: 1920, height: 100 }
  });
  
  // Apply changes programmatically
  await applyThemeChanges();
  
  // Validate
  const results = await workflow.captureAfterState('header');
  
  // Custom logic based on results
  if (results.some(r => r.differencePercentage > 5)) {
    throw new Error('Header changed too much!');
  }
}
```

### Batch Processing

Validate multiple environments:

```bash
for env in dev staging prod; do
  npm run screenshot:validate --base-url https://$env.aptly.co
done
```

## Maintenance

### Cleaning Old Screenshots

Remove screenshots older than 30 days:
```bash
find screenshots -name "*.png" -mtime +30 -delete
```

### Archiving Sessions

Archive completed sessions:
```bash
tar -czf sessions-archive-$(date +%Y%m).tar.gz screenshots/sessions/
```

## Contributing

When adding new pages or components:

1. Update the default pages list in `scripts/screenshot-validate.ts`
2. Add appropriate wait conditions for dynamic content
3. Test across all viewports
4. Document any special considerations

## Support

For issues or questions:
1. Check existing screenshots in the `diff` directory
2. Review session logs in `screenshots/sessions/`
3. Enable verbose logging with `DEBUG=screenshot:*`
4. Contact the development team with session IDs and diff images