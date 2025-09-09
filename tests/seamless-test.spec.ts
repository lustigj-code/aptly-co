import { test, expect } from '@playwright/test';
import fs from 'fs-extra';
import path from 'path';

test.describe('Seamless Background Pattern Test', () => {
  test('should measure background transitions on home page', async ({ page }, testInfo) => {
    await page.goto('http://localhost:3002');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    // Take full page screenshot
    const fullPageScreenshot = await page.screenshot({ 
      path: 'qa/seamless/step2/homepage-full.png',
      fullPage: true 
    });
    
    // Take above fold screenshot  
    await page.screenshot({ 
      path: 'qa/seamless/step2/homepage-above-fold.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
    
    // Scroll and take mid-page screenshot
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'qa/seamless/step2/homepage-mid.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
    
    // Scroll to CTA section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'qa/seamless/step2/homepage-cta.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
    
    // Count distinct background transitions
    const backgroundTransitions = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const backgrounds = new Set();
      let transitionCount = 0;
      let lastBg = '';
      
      sections.forEach((section) => {
        const bg = window.getComputedStyle(section).backgroundColor;
        const bgImage = window.getComputedStyle(section).backgroundImage;
        const fullBg = `${bg}-${bgImage}`;
        
        if (fullBg !== lastBg && lastBg !== '') {
          transitionCount++;
        }
        backgrounds.add(fullBg);
        lastBg = fullBg;
      });
      
      return {
        uniqueBackgrounds: backgrounds.size,
        transitionCount: transitionCount,
        totalSections: sections.length
      };
    });
    
    // Check for soft fade utilities
    const softFades = await page.$$eval('.section-soft-fade', elements => elements.length);
    
    // Check for surface cards
    const surfaceCards = await page.$$eval('.card-standard', elements => elements.length);
    
    // Generate score report
    const score = {
      timestamp: new Date().toISOString(),
      url: 'http://localhost:3002',
      metrics: {
        uniqueBackgrounds: backgroundTransitions.uniqueBackgrounds,
        transitionCount: backgroundTransitions.transitionCount,
        totalSections: backgroundTransitions.totalSections,
        softFades: softFades,
        surfaceCards: surfaceCards,
        aboveFoldTransitions: backgroundTransitions.transitionCount <= 2 ? 'PASS' : 'FAIL',
        totalTransitions: backgroundTransitions.transitionCount <= 4 ? 'PASS' : 'FAIL'
      },
      improvements: {
        step1Transitions: 7, // Previous count
        step2Transitions: backgroundTransitions.transitionCount,
        reduction: 7 - backgroundTransitions.transitionCount
      }
    };
    
    // Save score report
    await fs.writeJson('qa/seamless/step2/score.json', score, { spaces: 2 });
    
    console.log('Seamless Pattern Score:');
    console.log('=======================');
    console.log(`Unique Backgrounds: ${score.metrics.uniqueBackgrounds}`);
    console.log(`Transition Count: ${score.metrics.transitionCount}`);
    console.log(`Soft Fades Used: ${score.metrics.softFades}`);
    console.log(`Surface Cards: ${score.metrics.surfaceCards}`);
    console.log(`Above Fold: ${score.metrics.aboveFoldTransitions}`);
    console.log(`Total Page: ${score.metrics.totalTransitions}`);
    console.log(`Improvement: ${score.improvements.reduction} fewer transitions`);
    
    // Assertions
    expect(backgroundTransitions.transitionCount).toBeLessThanOrEqual(4);
    expect(softFades).toBeGreaterThan(0);
    expect(surfaceCards).toBeGreaterThan(0);
  });
  
  test('should verify visual consistency', async ({ page }) => {
    await page.goto('http://localhost:3002');
    await page.waitForLoadState('networkidle');
    
    // Check that transparent sections exist
    const transparentSections = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      let transparentCount = 0;
      
      sections.forEach(section => {
        const bg = window.getComputedStyle(section).backgroundColor;
        if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') {
          transparentCount++;
        }
      });
      
      return transparentCount;
    });
    
    expect(transparentSections).toBeGreaterThan(3);
    
    // Take mobile screenshot
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'qa/seamless/step2/homepage-mobile.png',
      fullPage: false 
    });
  });
});