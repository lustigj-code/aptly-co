import { test, expect, type Page } from '@playwright/test';

/**
 * Mobile Responsiveness Tests for Aptly.co
 * 
 * Tests responsive design across multiple devices:
 * - Mobile phones (375px to 428px)
 * - Tablets (768px to 1024px) 
 * - Desktop breakpoints
 * - Touch targets and navigation
 */

test.describe('Mobile Responsiveness', () => {
  
  const viewports = [
    { name: 'Mobile Small', width: 375, height: 667 }, // iPhone SE
    { name: 'Mobile Large', width: 428, height: 926 }, // iPhone 14 Pro Max
    { name: 'Tablet Portrait', width: 768, height: 1024 }, // iPad
    { name: 'Tablet Landscape', width: 1024, height: 768 }, // iPad Landscape
    { name: 'Desktop Small', width: 1280, height: 720 }, // Small desktop
  ];

  for (const viewport of viewports) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
      });

      test('Homepage Layout and Navigation', async ({ page }) => {
        await page.goto('/');
        
        // Check that content doesn't overflow horizontally
        const body = await page.locator('body').boundingBox();
        expect(body?.width).toBeLessThanOrEqual(viewport.width);
        
        // Verify navigation is accessible on mobile
        const nav = page.locator('nav').first();
        await expect(nav).toBeVisible();
        
        if (viewport.width <= 768) {
          // Mobile navigation should have hamburger menu or be collapsible
          const hamburger = page.locator('[aria-label*="menu"], [aria-label*="Menu"], .menu-toggle, [data-testid="menu-toggle"]');
          const mobileMenu = page.locator('[role="menu"], .mobile-menu, .nav-mobile');
          
          if (await hamburger.isVisible()) {
            await hamburger.click();
            await expect(mobileMenu).toBeVisible();
            
            // Check touch targets (should be at least 44px)
            const menuLinks = mobileMenu.locator('a');
            const linkCount = await menuLinks.count();
            
            for (let i = 0; i < Math.min(linkCount, 3); i++) {
              const link = menuLinks.nth(i);
              const box = await link.boundingBox();
              if (box) {
                expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(44);
              }
            }
          }
        }
        
        // Test main content areas
        const hero = page.locator('section, div').first();
        await expect(hero).toBeVisible();
        
        // Check for horizontal scrolling issues
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(viewport.width + 10); // Allow 10px tolerance
      });

      test('Form Elements and Touch Targets', async ({ page }) => {
        await page.goto('/contact');
        
        // Check form inputs are appropriately sized for touch
        const inputs = page.locator('input, textarea, button, select');
        const inputCount = await inputs.count();
        
        for (let i = 0; i < Math.min(inputCount, 5); i++) {
          const input = inputs.nth(i);
          if (await input.isVisible()) {
            const box = await input.boundingBox();
            if (box) {
              // Touch targets should be at least 44x44px
              expect(box.height).toBeGreaterThanOrEqual(44);
              
              // Width should be reasonable for mobile
              if (viewport.width <= 768) {
                expect(box.width).toBeGreaterThanOrEqual(120);
              }
            }
          }
        }
        
        // Test form submission on mobile
        const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
        if (await submitBtn.isVisible()) {
          const btnBox = await submitBtn.boundingBox();
          if (btnBox) {
            expect(btnBox.height).toBeGreaterThanOrEqual(44);
            expect(btnBox.width).toBeGreaterThanOrEqual(88); // Minimum width for buttons
          }
        }
      });

      test('Typography and Readability', async ({ page }) => {
        await page.goto('/');
        
        // Check font sizes are readable on mobile
        const headings = page.locator('h1, h2, h3');
        const paragraphs = page.locator('p');
        
        if (await headings.count() > 0) {
          const h1 = headings.first();
          const fontSize = await h1.evaluate(el => getComputedStyle(el).fontSize);
          const fontSizeNum = parseInt(fontSize.replace('px', ''));
          
          if (viewport.width <= 768) {
            expect(fontSizeNum).toBeGreaterThanOrEqual(24); // Minimum h1 size on mobile
          } else {
            expect(fontSizeNum).toBeGreaterThanOrEqual(32); // Larger on desktop
          }
        }
        
        if (await paragraphs.count() > 0) {
          const para = paragraphs.first();
          const fontSize = await para.evaluate(el => getComputedStyle(el).fontSize);
          const fontSizeNum = parseInt(fontSize.replace('px', ''));
          expect(fontSizeNum).toBeGreaterThanOrEqual(16); // Minimum readable size
        }
      });

      test('Images and Media Responsiveness', async ({ page }) => {
        await page.goto('/');
        
        const images = page.locator('img');
        const imageCount = await images.count();
        
        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const img = images.nth(i);
          if (await img.isVisible()) {
            const box = await img.boundingBox();
            if (box) {
              // Images shouldn't exceed viewport width
              expect(box.width).toBeLessThanOrEqual(viewport.width);
              
              // Images should have proper aspect ratios
              const aspectRatio = box.width / box.height;
              expect(aspectRatio).toBeGreaterThan(0.1);
              expect(aspectRatio).toBeLessThan(10);
            }
            
            // Check for alt text (accessibility)
            const alt = await img.getAttribute('alt');
            expect(alt).toBeTruthy();
          }
        }
      });

      test('Content Layout and Spacing', async ({ page }) => {
        const pages = ['/', '/about', '/services'];
        
        for (const pagePath of pages) {
          await page.goto(pagePath);
          
          // Check content doesn't have excessive horizontal margins on mobile
          const main = page.locator('main, [role="main"]').first();
          if (await main.isVisible()) {
            const box = await main.boundingBox();
            if (box && viewport.width <= 768) {
              // On mobile, content should use most of the available width
              expect(box.width).toBeGreaterThanOrEqual(viewport.width * 0.85);
            }
          }
          
          // Check vertical spacing isn't too cramped
          const sections = page.locator('section');
          const sectionCount = await sections.count();
          
          if (sectionCount >= 2) {
            const firstSection = sections.first();
            const secondSection = sections.nth(1);
            
            const firstBox = await firstSection.boundingBox();
            const secondBox = await secondSection.boundingBox();
            
            if (firstBox && secondBox) {
              const gap = secondBox.y - (firstBox.y + firstBox.height);
              expect(gap).toBeGreaterThanOrEqual(16); // Minimum spacing
            }
          }
        }
      });
    });
  }

  test('Orientation Change Handling', async ({ page }) => {
    // Test tablet rotation
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Portrait mode
    let nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Rotate to landscape
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.reload();
    
    // Should still be functional
    nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Content should adapt to new dimensions
    const hero = page.locator('section, div').first();
    const box = await hero.boundingBox();
    if (box) {
      expect(box.width).toBeLessThanOrEqual(1024);
    }
  });
});