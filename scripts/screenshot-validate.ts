#!/usr/bin/env tsx

import { ValidationWorkflow } from '../src/utils/screenshot/validationWorkflow';
import { ComparisonResult } from '../src/utils/screenshot/comparisonUtility';
import path from 'path';
import { spawn } from 'child_process';

interface ValidationConfig {
  pages: Array<{
    name: string;
    url: string;
    waitForSelector?: string;
    waitForTimeout?: number;
  }>;
  baseUrl: string;
  threshold?: number;
}

const defaultConfig: ValidationConfig = {
  baseUrl: process.env.SCREENSHOT_BASE_URL || 'http://localhost:3000',
  threshold: 1.0, // 1% difference threshold
  pages: [
    { name: 'home', url: '/', waitForTimeout: 2000 },
    { name: 'about', url: '/about', waitForTimeout: 2000 },
    { name: 'courses', url: '/courses', waitForTimeout: 2000 },
    { name: 'study-app', url: '/study-app', waitForTimeout: 3000 },
    { name: 'faq', url: '/faq', waitForTimeout: 2000 }
  ]
};

async function runValidation(config: ValidationConfig = defaultConfig): Promise<void> {
  console.log('🔍 Starting Screenshot Validation Workflow\n');
  
  const workflow = new ValidationWorkflow();
  const sessionName = `validation_${new Date().toISOString().split('T')[0]}`;
  
  try {
    // Start validation session
    console.log(`📸 Starting session: ${sessionName}`);
    const sessionId = await workflow.startValidationSession(sessionName);
    
    // Ensure dev server is running
    console.log('\n🚀 Ensuring development server is running...');
    const serverProcess = await ensureDevServerRunning();
    
    // Wait for server to be ready
    await waitForServer(config.baseUrl);
    
    // Capture before state for all pages
    console.log('\n📷 Capturing BEFORE state for all pages...\n');
    for (const page of config.pages) {
      const fullUrl = `${config.baseUrl}${page.url}`;
      console.log(`  - Capturing ${page.name} (${fullUrl})`);
      await workflow.captureBeforeState(page.name, fullUrl, {
        waitForSelector: page.waitForSelector,
        waitForTimeout: page.waitForTimeout
      });
    }
    
    console.log('\n✅ All BEFORE screenshots captured!');
    console.log('\n⏸️  Make your changes now, then press ENTER to capture AFTER state...');
    
    // Wait for user to make changes
    await waitForUserInput();
    
    // Capture after state and compare
    console.log('\n📷 Capturing AFTER state and comparing...\n');
    const allComparisons: Array<{ page: string; comparisons: ComparisonResult[] }> = [];
    
    for (const page of config.pages) {
      console.log(`\n  Comparing ${page.name}:`);
      const comparisons = await workflow.captureAfterState(page.name);
      allComparisons.push({ page: page.name, comparisons });
      
      // Display results for this page
      comparisons.forEach((comp, i) => {
        const viewport = ['desktop', 'laptop', 'tablet', 'mobile'][i];
        const status = comp.identical 
          ? '✅ IDENTICAL' 
          : `❌ CHANGED (${comp.differencePercentage.toFixed(2)}% difference)`;
        console.log(`    ${viewport}: ${status}`);
      });
    }
    
    // Complete session and generate report
    const summary = await workflow.completeSession();
    
    // Display summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`  Total Pages Validated: ${summary.totalPages}`);
    console.log(`  Total Screenshots: ${summary.totalScreenshots}`);
    console.log(`  ✅ Identical: ${summary.identicalCount}`);
    console.log(`  ❌ Changed: ${summary.changedCount}`);
    console.log(`  ⚠️  Failed: ${summary.failedCount}`);
    console.log('='.repeat(60));
    
    // Check if any changes exceeded threshold
    let hasSignificantChanges = false;
    for (const { page, comparisons } of allComparisons) {
      for (const comp of comparisons) {
        if (!comp.identical && comp.differencePercentage > (config.threshold || 1.0)) {
          hasSignificantChanges = true;
          console.log(`\n⚠️  Significant change detected in ${page}: ${comp.differencePercentage.toFixed(2)}% difference`);
        }
      }
    }
    
    if (summary.reportPath) {
      console.log(`\n📄 Detailed report saved to: ${summary.reportPath}`);
    }
    
    // Exit with appropriate code
    if (hasSignificantChanges) {
      console.log('\n❌ Validation failed: Significant visual changes detected!');
      process.exit(1);
    } else if (summary.changedCount > 0) {
      console.log('\n⚠️  Minor visual changes detected (within threshold)');
      process.exit(0);
    } else {
      console.log('\n✅ All pages are visually identical!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('\n❌ Validation failed with error:', error);
    process.exit(1);
  }
}

async function ensureDevServerRunning(): Promise<any> {
  // Check if server is already running
  try {
    const response = await fetch('http://localhost:3000');
    if (response.ok) {
      console.log('  ✅ Development server is already running');
      return null;
    }
  } catch (error) {
    // Server not running, start it
    console.log('  🚀 Starting development server...');
    const serverProcess = spawn('npm', ['run', 'dev'], {
      detached: true,
      stdio: 'ignore'
    });
    serverProcess.unref();
    return serverProcess;
  }
}

async function waitForServer(baseUrl: string, maxAttempts = 30): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        console.log('  ✅ Server is ready!');
        return;
      }
    } catch (error) {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error('Server failed to start within 30 seconds');
}

function waitForUserInput(): Promise<void> {
  return new Promise((resolve) => {
    process.stdin.once('data', () => {
      resolve();
    });
  });
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Screenshot Validation Tool

Usage: npm run screenshot:validate [options]

Options:
  --pages <pages>     Comma-separated list of pages to validate
  --threshold <n>     Difference threshold percentage (default: 1.0)
  --base-url <url>    Base URL for screenshots (default: http://localhost:3000)
  --help, -h          Show this help message

Examples:
  npm run screenshot:validate
  npm run screenshot:validate --pages home,about --threshold 2.0
  npm run screenshot:validate --base-url https://staging.aptly.co
  `);
  process.exit(0);
}

// Parse custom options
const customConfig: Partial<ValidationConfig> = {};

const pagesIndex = args.indexOf('--pages');
if (pagesIndex !== -1 && args[pagesIndex + 1]) {
  const pageNames = args[pagesIndex + 1].split(',');
  customConfig.pages = defaultConfig.pages.filter(p => pageNames.includes(p.name));
}

const thresholdIndex = args.indexOf('--threshold');
if (thresholdIndex !== -1 && args[thresholdIndex + 1]) {
  customConfig.threshold = parseFloat(args[thresholdIndex + 1]);
}

const baseUrlIndex = args.indexOf('--base-url');
if (baseUrlIndex !== -1 && args[baseUrlIndex + 1]) {
  customConfig.baseUrl = args[baseUrlIndex + 1];
}

// Run validation
runValidation({ ...defaultConfig, ...customConfig });