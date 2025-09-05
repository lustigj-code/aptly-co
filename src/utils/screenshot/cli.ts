#!/usr/bin/env node

import { ValidationWorkflow } from './validationWorkflow';
import { ScreenshotUtility } from './screenshotUtility';
import { ComparisonUtility } from './comparisonUtility';
import path from 'path';

const commands = {
  'capture-before': captureBeforeCommand,
  'capture-after': captureAfterCommand,
  'start-session': startSessionCommand,
  'complete-session': completeSessionCommand,
  'list-sessions': listSessionsCommand,
  'quick-capture': quickCaptureCommand,
  'compare': compareCommand
};

async function main() {
  const [, , command, ...args] = process.argv;

  if (!command || !commands[command as keyof typeof commands]) {
    console.log(`
Screenshot Validation CLI

Usage: npm run screenshot [command] [options]

Commands:
  start-session <name>              Start a new validation session
  capture-before <page> <url>       Capture before state of a page
  capture-after <page>              Capture after state and compare
  complete-session                  Complete current session and generate report
  list-sessions                     List all validation sessions
  quick-capture <page> <url>        Quick capture without session
  compare <before> <after>          Compare two specific screenshots

Examples:
  npm run screenshot start-session "navbar-update"
  npm run screenshot capture-before "home" "http://localhost:3000"
  npm run screenshot capture-after "home"
  npm run screenshot complete-session
    `);
    process.exit(1);
  }

  try {
    await commands[command as keyof typeof commands](args);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

async function startSessionCommand(args: string[]) {
  const [name] = args;
  if (!name) {
    console.error('Session name required');
    process.exit(1);
  }

  const workflow = new ValidationWorkflow();
  const sessionId = await workflow.startValidationSession(name);
  
  // Save session ID for subsequent commands
  process.env.SCREENSHOT_SESSION_ID = sessionId;
  
  console.log(`Started validation session: ${sessionId}`);
  console.log('Session ID saved to environment');
}

async function captureBeforeCommand(args: string[]) {
  const [pageName, url] = args;
  if (!pageName || !url) {
    console.error('Page name and URL required');
    process.exit(1);
  }

  const workflow = new ValidationWorkflow();
  
  // Get session ID from environment or start new session
  if (!process.env.SCREENSHOT_SESSION_ID) {
    const sessionId = await workflow.startValidationSession(`session_${Date.now()}`);
    process.env.SCREENSHOT_SESSION_ID = sessionId;
  }

  await workflow.captureBeforeState(pageName, url);
  console.log(`Captured before state for ${pageName}`);
}

async function captureAfterCommand(args: string[]) {
  const [pageName] = args;
  if (!pageName) {
    console.error('Page name required');
    process.exit(1);
  }

  const workflow = new ValidationWorkflow();
  const comparisons = await workflow.captureAfterState(pageName);
  
  console.log(`\nComparison Results for ${pageName}:`);
  comparisons.forEach((comp, i) => {
    const viewport = ['desktop', 'laptop', 'tablet', 'mobile'][i];
    console.log(`  ${viewport}: ${comp.identical ? '✅ IDENTICAL' : `❌ CHANGED (${comp.differencePercentage.toFixed(2)}%)`}`);
  });
}

async function completeSessionCommand(args: string[]) {
  const workflow = new ValidationWorkflow();
  const summary = await workflow.completeSession();
  
  console.log('\nValidation Session Summary:');
  console.log(`  Total Pages: ${summary.totalPages}`);
  console.log(`  Total Screenshots: ${summary.totalScreenshots}`);
  console.log(`  Identical: ${summary.identicalCount} ✅`);
  console.log(`  Changed: ${summary.changedCount} ❌`);
  console.log(`  Failed: ${summary.failedCount} ⚠️`);
  
  if (summary.reportPath) {
    console.log(`\nDetailed report saved to: ${summary.reportPath}`);
  }
}

async function listSessionsCommand(args: string[]) {
  const workflow = new ValidationWorkflow();
  const sessions = await workflow.listSessions();
  
  console.log('\nAvailable Sessions:');
  sessions.forEach(session => {
    console.log(`  - ${session}`);
  });
}

async function quickCaptureCommand(args: string[]) {
  const [pageName, url] = args;
  if (!pageName || !url) {
    console.error('Page name and URL required');
    process.exit(1);
  }

  const screenshotUtil = new ScreenshotUtility();
  await screenshotUtil.initialize();
  
  try {
    const result = await screenshotUtil.captureScreenshot(
      url,
      'history',
      pageName,
      { fullPage: true }
    );
    
    console.log(`Screenshot saved to: ${result.filePath}`);
  } finally {
    await screenshotUtil.cleanup();
  }
}

async function compareCommand(args: string[]) {
  const [beforePath, afterPath] = args;
  if (!beforePath || !afterPath) {
    console.error('Both before and after paths required');
    process.exit(1);
  }

  const comparisonUtil = new ComparisonUtility();
  const result = await comparisonUtil.compareScreenshots(beforePath, afterPath);
  
  console.log('\nComparison Result:');
  console.log(`  Status: ${result.identical ? '✅ IDENTICAL' : '❌ DIFFERENT'}`);
  console.log(`  Difference: ${result.differencePercentage.toFixed(4)}%`);
  console.log(`  Pixels Changed: ${result.details.pixelsDifferent}`);
  
  if (result.diffImagePath) {
    console.log(`  Diff Image: ${result.diffImagePath}`);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}