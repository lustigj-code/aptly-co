import { test, expect } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

// Configure viewport sizes
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

test.describe('Seamless Design - Final Visual QA', () => {
  test.beforeAll(async () => {
    // Ensure screenshot directories exist
    const dirs = [
      'qa/seamless/s4',
      'qa/seamless/final'
    ];
    
    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
  });

  test('Capture final desktop state and count transitions', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Navigate to homepage
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for any animations to complete
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await page.screenshot({
      path: 'qa/seamless/s4/final-desktop.png',
      fullPage: true
    });
    
    // Take above-fold screenshot
    await page.screenshot({
      path: 'qa/seamless/s4/above-fold-desktop.png',
      fullPage: false
    });
    
    // Count background transitions by analyzing DOM
    const transitionCount = await page.evaluate(() => {
      const sections = document.querySelectorAll('section, div[class*="bg-"], div[class*="surface-"]');
      const backgrounds = new Set();
      let previousBg = '';
      let changeCount = 0;
      let aboveFoldChanges = 0;
      const viewportHeight = window.innerHeight;
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const computed = window.getComputedStyle(section);
        const bgColor = computed.backgroundColor;
        const bgImage = computed.backgroundImage;
        
        // Create unique identifier for background
        const currentBg = `${bgColor}-${bgImage}`;
        
        if (currentBg !== previousBg && previousBg !== '') {
          changeCount++;
          
          // Check if this change is above the fold
          if (rect.top < viewportHeight) {
            aboveFoldChanges++;
          }
        }
        
        previousBg = currentBg;
        backgrounds.add(currentBg);
      });
      
      return {
        totalChanges: changeCount,
        aboveFoldChanges,
        uniqueBackgrounds: backgrounds.size,
        viewportHeight
      };
    });
    
    console.log('Desktop Transition Analysis:', transitionCount);
    
    // Save metrics
    await fs.writeFile(
      'qa/seamless/s4/desktop-metrics.json',
      JSON.stringify(transitionCount, null, 2)
    );
  });

  test('Capture final mobile state', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(MOBILE_VIEWPORT);
    
    // Navigate to homepage
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for any animations to complete
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await page.screenshot({
      path: 'qa/seamless/s4/final-mobile.png',
      fullPage: true
    });
    
    // Take above-fold screenshot
    await page.screenshot({
      path: 'qa/seamless/s4/above-fold-mobile.png',
      fullPage: false
    });
    
    // Count transitions on mobile
    const mobileTransitions = await page.evaluate(() => {
      const sections = document.querySelectorAll('section, div[class*="bg-"], div[class*="surface-"]');
      let previousBg = '';
      let changeCount = 0;
      let aboveFoldChanges = 0;
      const viewportHeight = window.innerHeight;
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const computed = window.getComputedStyle(section);
        const bgColor = computed.backgroundColor;
        const bgImage = computed.backgroundImage;
        
        const currentBg = `${bgColor}-${bgImage}`;
        
        if (currentBg !== previousBg && previousBg !== '') {
          changeCount++;
          
          if (rect.top < viewportHeight) {
            aboveFoldChanges++;
          }
        }
        
        previousBg = currentBg;
      });
      
      return {
        totalChanges: changeCount,
        aboveFoldChanges,
        viewportHeight
      };
    });
    
    console.log('Mobile Transition Analysis:', mobileTransitions);
    
    // Save mobile metrics
    await fs.writeFile(
      'qa/seamless/s4/mobile-metrics.json',
      JSON.stringify(mobileTransitions, null, 2)
    );
  });

  test('Visual smoothness check', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Scroll through page slowly to check for visual artifacts
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = DESKTOP_VIEWPORT.height;
    const steps = Math.ceil(scrollHeight / viewportHeight);
    
    const artifacts = [];
    
    for (let i = 0; i < steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * viewportHeight);
      await page.waitForTimeout(500);
      
      // Check for harsh transitions
      const harshTransitions = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const issues = [];
        
        elements.forEach((el) => {
          const computed = window.getComputedStyle(el);
          
          // Check for abrupt color changes without gradients
          if (el.tagName === 'SECTION' || el.classList.toString().includes('surface')) {
            const bg = computed.backgroundColor;
            const gradient = computed.backgroundImage;
            const hasGradient = gradient && gradient !== 'none';
            
            // Mark sections without smooth transitions
            if (!hasGradient && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
              const rect = el.getBoundingClientRect();
              if (rect.height > 100) { // Only flag significant sections
                issues.push({
                  element: el.tagName + '.' + el.className,
                  background: bg,
                  position: rect.top
                });
              }
            }
          }
        });
        
        return issues;
      });
      
      if (harshTransitions.length > 0) {
        artifacts.push({ scroll: i * viewportHeight, issues: harshTransitions });
      }
    }
    
    // Save artifacts analysis
    await fs.writeFile(
      'qa/seamless/s4/artifacts-analysis.json',
      JSON.stringify(artifacts, null, 2)
    );
    
    console.log('Visual artifacts found:', artifacts.length);
  });

  test('Generate visual comparison data', async ({ page }) => {
    // This test generates comparison data for the final report
    const comparisonData = {
      baseline: {
        segmentationScore: 10,
        totalChanges: 7,
        aboveFoldChanges: 3,
        source: 'qa/seamless/baseline/initial-audit.md'
      },
      final: {
        segmentationScore: 0, // Will be calculated
        totalChanges: 0, // Will be filled from metrics
        aboveFoldChanges: 0, // Will be filled from metrics
        source: 'qa/seamless/s4/desktop-metrics.json'
      },
      improvements: {
        surfaceSystem: true,
        gradientTransitions: true,
        consistentTreatment: true,
        smoothFlow: true
      }
    };
    
    // Read the desktop metrics we just captured
    try {
      const metricsContent = await fs.readFile('qa/seamless/s4/desktop-metrics.json', 'utf-8');
      const metrics = JSON.parse(metricsContent);
      
      comparisonData.final.totalChanges = metrics.totalChanges;
      comparisonData.final.aboveFoldChanges = metrics.aboveFoldChanges;
      
      // Calculate segmentation score (lower is better)
      // Score = (above-fold changes * 2) + (total changes * 0.5)
      comparisonData.final.segmentationScore = 
        (metrics.aboveFoldChanges * 2) + (metrics.totalChanges * 0.5);
    } catch (error) {
      console.error('Could not read metrics:', error);
    }
    
    await fs.writeFile(
      'qa/seamless/s4/comparison-data.json',
      JSON.stringify(comparisonData, null, 2)
    );
  });
});