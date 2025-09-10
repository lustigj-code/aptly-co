import { test, expect, type Page } from '@playwright/test';

/**
 * Visual Regression Testing for Aptly.co
 * 
 * Tests visual consistency and brand compliance:
 * - Page layouts and component rendering
 * - Brand color consistency
 * - Typography and spacing
 * - Component standardization
 * - Responsive design visual validation
 */

test.describe('Visual Regression Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Ensure consistent viewport for visual tests
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Wait for fonts to load
    await page.evaluate(() => {
      if ('fonts' in document) {
        return document.fonts.ready;
      }
      return Promise.resolve();
    });
  });

  test('Homepage Visual Consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    // Remove any dynamic content that might cause flaky tests
    await page.evaluate(() => {
      // Hide any time-dependent content
      const timeElements = document.querySelectorAll('[data-time], .timestamp, .current-time');
      timeElements.forEach(el => el.style.visibility = 'hidden');
      
      // Hide any random/dynamic content
      const dynamicElements = document.querySelectorAll('[data-dynamic], .random-content');
      dynamicElements.forEach(el => el.style.visibility = 'hidden');
    });
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test hero section specifically
    const heroSection = page.locator('section, div').first();
    if (await heroSection.isVisible()) {
      await expect(heroSection).toHaveScreenshot('homepage-hero.png', {
        animations: 'disabled'
      });
    }
    
    // Test navigation area
    const navigation = page.locator('nav').first();
    await expect(navigation).toHaveScreenshot('navigation.png', {
      animations: 'disabled'
    });
  });

  test('Component Visual Consistency', async ({ page }) => {
    await page.goto('/');
    
    // Test button consistency
    const buttons = page.locator('button, [role="button"], a[class*="button"]');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      // Screenshot first few buttons to ensure consistency
      for (let i = 0; i < Math.min(buttonCount, 4); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          await expect(button).toHaveScreenshot(`button-${i}.png`, {
            animations: 'disabled'
          });
        }
      }
    }
    
    // Test card components
    const cards = page.locator('.card, [class*="card"], [data-card]');
    const cardCount = await cards.count();
    
    if (cardCount > 0) {
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = cards.nth(i);
        if (await card.isVisible()) {
          await expect(card).toHaveScreenshot(`card-${i}.png`, {
            animations: 'disabled'
          });
        }
      }
    }
    
    // Test form elements if present
    const forms = page.locator('form');
    if (await forms.count() > 0) {
      const form = forms.first();
      await expect(form).toHaveScreenshot('form-component.png', {
        animations: 'disabled'
      });
    }
  });

  test('Page Layout Consistency', async ({ page }) => {
    const pages = [
      { path: '/', name: 'homepage' },
      { path: '/about', name: 'about' },
      { path: '/services', name: 'services' },
      { path: '/contact', name: 'contact' },
      { path: '/study-app', name: 'study-app' }
    ];
    
    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      // Remove dynamic content
      await page.evaluate(() => {
        const dynamicSelectors = [
          '[data-time]', '.timestamp', '.current-time',
          '[data-dynamic]', '.random-content'
        ];
        
        dynamicSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.style.visibility = 'hidden');
        });
      });
      
      // Full page screenshot
      await expect(page).toHaveScreenshot(`${pageInfo.name}-page.png`, {
        fullPage: true,
        animations: 'disabled'
      });
      
      // Header consistency
      const header = page.locator('header, nav').first();
      if (await header.isVisible()) {
        await expect(header).toHaveScreenshot(`${pageInfo.name}-header.png`, {
          animations: 'disabled'
        });
      }
      
      // Footer consistency  
      const footer = page.locator('footer').first();
      if (await footer.isVisible()) {
        await expect(footer).toHaveScreenshot(`${pageInfo.name}-footer.png`, {
          animations: 'disabled'
        });
      }
    }
  });

  test('Mobile Visual Consistency', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const pages = ['/', '/about', '/services', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      const pageName = pagePath.replace('/', '') || 'home';
      
      // Mobile full page
      await expect(page).toHaveScreenshot(`mobile-${pageName}.png`, {
        fullPage: true,
        animations: 'disabled'
      });
      
      // Mobile navigation (might be hamburger menu)
      const mobileNav = page.locator('nav, .mobile-menu, [data-mobile-nav]').first();
      if (await mobileNav.isVisible()) {
        await expect(mobileNav).toHaveScreenshot(`mobile-nav-${pageName}.png`, {
          animations: 'disabled'
        });
      }
    }
  });

  test('Brand Color Visual Validation', async ({ page }) => {
    await page.goto('/');
    
    // Create a color palette reference
    await page.evaluate(() => {
      // Create brand color samples for visual verification
      const colorSamples = document.createElement('div');
      colorSamples.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: white;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        z-index: 9999;
        font-family: 'DM Sans', sans-serif;
      `;
      colorSamples.innerHTML = `
        <div style="margin-bottom: 10px; font-weight: bold;">Brand Colors:</div>
        <div style="display: flex; gap: 10px; margin-bottom: 5px;">
          <div style="width: 30px; height: 30px; background: #0A004A; border-radius: 4px;" title="Navy"></div>
          <span>Navy #0A004A</span>
        </div>
        <div style="display: flex; gap: 10px; margin-bottom: 5px;">
          <div style="width: 30px; height: 30px; background: #21A8B0; border-radius: 4px;" title="Teal"></div>
          <span>Teal #21A8B0</span>
        </div>
        <div style="display: flex; gap: 10px; margin-bottom: 5px;">
          <div style="width: 30px; height: 30px; background: #FFDE00; border-radius: 4px;" title="Yellow"></div>
          <span>Yellow #FFDE00</span>
        </div>
        <div style="display: flex; gap: 10px;">
          <div style="width: 30px; height: 30px; background: #FFFFFF; border: 1px solid #ccc; border-radius: 4px;" title="White"></div>
          <span>White #FFFFFF</span>
        </div>
      `;
      document.body.appendChild(colorSamples);
    });
    
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('brand-colors-reference.png', {
      animations: 'disabled'
    });
  });

  test('Typography Visual Consistency', async ({ page }) => {
    await page.goto('/');
    
    // Create typography samples
    await page.evaluate(() => {
      const typographySamples = document.createElement('div');
      typographySamples.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border: 1px solid #ccc;
        border-radius: 8px;
        z-index: 9999;
        font-family: 'DM Sans', sans-serif;
        max-width: 600px;
      `;
      typographySamples.innerHTML = `
        <h1 style="color: #0A004A; margin: 0 0 20px 0;">DM Sans Heading 1</h1>
        <h2 style="color: #0A004A; margin: 0 0 16px 0;">DM Sans Heading 2</h2>
        <h3 style="color: #21A8B0; margin: 0 0 12px 0;">DM Sans Heading 3</h3>
        <p style="color: #333333; margin: 0 0 16px 0;">
          Regular body text using DM Sans font family. This should be readable and consistent across all pages.
        </p>
        <p style="color: #666666; margin: 0 0 16px 0; font-size: 14px;">
          Smaller secondary text for captions and details.
        </p>
        <button style="background: #0A004A; color: white; padding: 12px 24px; border: none; border-radius: 24px; font-family: 'DM Sans', sans-serif; font-weight: 500;">
          Primary Button
        </button>
        <button style="background: #21A8B0; color: white; padding: 12px 24px; border: none; border-radius: 24px; font-family: 'DM Sans', sans-serif; font-weight: 500; margin-left: 12px;">
          Secondary Button
        </button>
      `;
      document.body.appendChild(typographySamples);
    });
    
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('typography-reference.png', {
      animations: 'disabled'
    });
  });

  test('Dark Mode Visual Consistency', async ({ page }) => {
    await page.goto('/');
    
    // Test both light and dark themes
    const themes = ['light', 'dark'];
    
    for (const theme of themes) {
      // Set theme
      await page.evaluate((themeValue) => {
        document.body.className = themeValue === 'dark' ? 'dark' : '';
        localStorage.setItem('theme', themeValue);
      }, theme);
      
      await page.waitForTimeout(300);
      
      // Full page in current theme
      await expect(page).toHaveScreenshot(`${theme}-theme-homepage.png`, {
        fullPage: true,
        animations: 'disabled'
      });
      
      // Navigation in current theme
      const nav = page.locator('nav').first();
      if (await nav.isVisible()) {
        await expect(nav).toHaveScreenshot(`${theme}-theme-nav.png`, {
          animations: 'disabled'
        });
      }
      
      // Test theme toggle button if present
      const themeToggle = page.locator('[data-testid="theme-toggle"], [aria-label*="theme"]').first();
      if (await themeToggle.isVisible()) {
        await expect(themeToggle).toHaveScreenshot(`${theme}-theme-toggle.png`, {
          animations: 'disabled'
        });
      }
    }
  });

  test('Loading States Visual Consistency', async ({ page }) => {
    // Test loading states by throttling network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 500); // Add delay to simulate loading
    });
    
    await page.goto('/');
    
    // Capture loading state
    await expect(page).toHaveScreenshot('loading-state.png', {
      animations: 'disabled'
    });
    
    // Wait for full load
    await page.waitForLoadState('networkidle');
    
    // Capture loaded state
    await expect(page).toHaveScreenshot('loaded-state.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('Error State Visual Consistency', async ({ page }) => {
    // Test 404 page
    await page.goto('/non-existent-page');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('404-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test form validation errors
    await page.goto('/contact');
    
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const submitBtn = page.locator('button[type="submit"]').first();
      
      if (await submitBtn.isVisible()) {
        // Submit empty form to trigger validation
        await submitBtn.click();
        await page.waitForTimeout(500);
        
        await expect(form).toHaveScreenshot('form-validation-errors.png', {
          animations: 'disabled'
        });
      }
    }
  });

  test('Interactive Elements Visual States', async ({ page }) => {
    await page.goto('/');
    
    // Test button hover states
    const buttons = page.locator('button, [role="button"], a[class*="button"]');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      
      // Normal state
      await expect(firstButton).toHaveScreenshot('button-normal.png', {
        animations: 'disabled'
      });
      
      // Hover state
      await firstButton.hover();
      await page.waitForTimeout(200);
      await expect(firstButton).toHaveScreenshot('button-hover.png', {
        animations: 'disabled'
      });
      
      // Focus state
      await firstButton.focus();
      await page.waitForTimeout(200);
      await expect(firstButton).toHaveScreenshot('button-focus.png', {
        animations: 'disabled'
      });
    }
    
    // Test link states
    const links = page.locator('a:not(.logo):not([role="button"])');
    if (await links.count() > 0) {
      const firstLink = links.first();
      
      // Normal state
      await expect(firstLink).toHaveScreenshot('link-normal.png', {
        animations: 'disabled'
      });
      
      // Hover state
      await firstLink.hover();
      await page.waitForTimeout(200);
      await expect(firstLink).toHaveScreenshot('link-hover.png', {
        animations: 'disabled'
      });
    }
  });
});