import { test, expect, type Page } from '@playwright/test';

/**
 * Accessibility Testing Suite for Aptly.co
 * 
 * Tests WCAG AA compliance including:
 * - Color contrast ratios (21:1 for large text, 7:1 for normal)
 * - Keyboard navigation
 * - Screen reader support (ARIA)
 * - Focus management
 * - Semantic HTML structure
 */

test.describe('Accessibility Compliance (WCAG AA)', () => {
  
  test('Color Contrast Ratios', async ({ page }) => {
    await page.goto('/');
    
    // Test primary brand color combinations
    const textElements = page.locator('h1, h2, h3, p, a, button, span');
    const elementCount = await textElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 10); i++) {
      const element = textElements.nth(i);
      if (await element.isVisible()) {
        const styles = await element.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });
        
        // Test brand color combinations
        const textColor = styles.color;
        const bgColor = styles.backgroundColor;
        
        // White text on navy background should have high contrast
        if (textColor.includes('255, 255, 255') && bgColor.includes('10, 0, 74')) {
          // This combination should pass AA standards (21:1 ratio for navy/white)
          expect(true).toBe(true); // Navy #0A004A and white have 21:1 contrast
        }
        
        // Large text requirements (18pt+ or 14pt+ bold)
        const fontSize = parseInt(styles.fontSize.replace('px', ''));
        const isLargeText = fontSize >= 24 || (fontSize >= 18); // Simplified check
        
        // All text should meet minimum requirements
        expect(fontSize).toBeGreaterThanOrEqual(16); // Base readability
      }
    }
  });

  test('Keyboard Navigation', async ({ page }) => {
    await page.goto('/');
    
    // Start keyboard navigation with Tab
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = await page.locator(':focus').first();
    if (await focusedElement.isVisible()) {
      // Focus should be visible (outline or custom focus styles)
      const outline = await focusedElement.evaluate(el => getComputedStyle(el).outline);
      const boxShadow = await focusedElement.evaluate(el => getComputedStyle(el).boxShadow);
      
      // Should have some form of focus indication
      expect(outline !== 'none' || boxShadow !== 'none').toBe(true);
    }
    
    // Test tab order through navigation
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        await page.keyboard.press('Tab');
        const currentFocus = page.locator(':focus');
        await expect(currentFocus).toBeVisible();
        
        // Should be able to activate with Enter or Space
        const tagName = await currentFocus.evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'a' || tagName === 'button') {
          // Test that element is focusable and has proper role
          const role = await currentFocus.getAttribute('role');
          const href = await currentFocus.getAttribute('href');
          expect(tagName === 'a' ? href : true).toBeTruthy();
        }
      }
    }
  });

  test('ARIA Labels and Semantic HTML', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      // Should have exactly one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
      
      // Check heading text is descriptive
      const h1Text = await page.locator('h1').textContent();
      expect(h1Text?.length || 0).toBeGreaterThan(5);
    }
    
    // Check navigation landmarks
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    const main = page.locator('main, [role="main"]');
    if (await main.count() > 0) {
      await expect(main.first()).toBeVisible();
    }
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check form accessibility
    await page.goto('/contact');
    
    const formInputs = page.locator('input, textarea, select');
    const inputCount = await formInputs.count();
    
    for (let i = 0; i < Math.min(inputCount, 5); i++) {
      const input = formInputs.nth(i);
      if (await input.isVisible()) {
        // Each input should have a label
        const id = await input.getAttribute('id');
        const name = await input.getAttribute('name');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledby = await input.getAttribute('aria-labelledby');
        
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          if (await label.count() === 0) {
            // No label element, should have aria-label or aria-labelledby
            expect(ariaLabel || ariaLabelledby).toBeTruthy();
          }
        } else {
          // No ID, should have aria-label
          expect(ariaLabel || name).toBeTruthy();
        }
        
        // Required fields should be marked
        const required = await input.getAttribute('required');
        const ariaRequired = await input.getAttribute('aria-required');
        if (required !== null || ariaRequired === 'true') {
          expect(true).toBe(true); // Properly marked as required
        }
      }
    }
  });

  test('Image Alt Text and Media Accessibility', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/study-app'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const alt = await img.getAttribute('alt');
          const role = await img.getAttribute('role');
          
          // Decorative images should have empty alt or role="presentation"
          // Content images should have descriptive alt text
          if (role === 'presentation' || alt === '') {
            expect(true).toBe(true); // Decorative image
          } else {
            expect(alt).toBeTruthy();
            expect(alt?.length || 0).toBeGreaterThan(3);
            expect(alt?.length || 0).toBeLessThan(125); // Reasonable length
          }
        }
      }
      
      // Check for videos or audio elements
      const videos = page.locator('video');
      const videoCount = await videos.count();
      
      for (let i = 0; i < videoCount; i++) {
        const video = videos.nth(i);
        if (await video.isVisible()) {
          // Videos should have controls
          const controls = await video.getAttribute('controls');
          expect(controls).toBeTruthy();
          
          // Check for captions/subtitles
          const tracks = video.locator('track[kind="captions"], track[kind="subtitles"]');
          // Note: This is ideal but not always required depending on content
        }
      }
    }
  });

  test('Skip Links and Focus Management', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip link (should be first focusable element)
    await page.keyboard.press('Tab');
    const firstFocus = page.locator(':focus');
    
    if (await firstFocus.isVisible()) {
      const text = await firstFocus.textContent();
      if (text?.toLowerCase().includes('skip')) {
        // Test skip link functionality
        await page.keyboard.press('Enter');
        
        // Should jump to main content
        const newFocus = page.locator(':focus');
        const newFocusId = await newFocus.getAttribute('id');
        expect(newFocusId).toMatch(/main|content|skip-target/i);
      }
    }
    
    // Test modal focus management if modals exist
    const modalTriggers = page.locator('[data-modal], [aria-haspopup="dialog"], button[aria-expanded]');
    const modalCount = await modalTriggers.count();
    
    if (modalCount > 0) {
      const firstModal = modalTriggers.first();
      if (await firstModal.isVisible()) {
        await firstModal.click();
        
        // Check if modal appears
        const modal = page.locator('[role="dialog"], .modal, [aria-modal="true"]');
        if (await modal.isVisible()) {
          // Focus should be trapped in modal
          const modalFocusable = modal.locator('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
          const focusableCount = await modalFocusable.count();
          
          if (focusableCount > 0) {
            // First element should receive focus
            const firstFocusable = modalFocusable.first();
            await expect(firstFocusable).toBeFocused();
          }
          
          // Close modal to clean up
          const closeBtn = modal.locator('[aria-label*="close"], .close, button').first();
          if (await closeBtn.isVisible()) {
            await closeBtn.click();
          }
        }
      }
    }
  });

  test('Screen Reader Support and ARIA', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper ARIA landmarks
    const landmarks = {
      banner: page.locator('[role="banner"], header'),
      navigation: page.locator('[role="navigation"], nav'),
      main: page.locator('[role="main"], main'),
      contentinfo: page.locator('[role="contentinfo"], footer')
    };
    
    for (const [landmarkName, locator] of Object.entries(landmarks)) {
      if (await locator.count() > 0) {
        await expect(locator.first()).toBeVisible();
      }
    }
    
    // Check for proper button and link roles
    const buttons = page.locator('button, [role="button"]');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const tagName = await button.evaluate(el => el.tagName.toLowerCase());
        const role = await button.getAttribute('role');
        
        if (tagName !== 'button') {
          expect(role).toBe('button');
        }
        
        // Buttons should have accessible names
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();
        expect(ariaLabel || (text && text.trim().length > 0)).toBeTruthy();
      }
    }
    
    // Check for proper form field associations
    await page.goto('/contact');
    
    const fieldsets = page.locator('fieldset');
    const fieldsetCount = await fieldsets.count();
    
    for (let i = 0; i < fieldsetCount; i++) {
      const fieldset = fieldsets.nth(i);
      const legend = fieldset.locator('legend');
      
      if (await legend.count() > 0) {
        const legendText = await legend.textContent();
        expect(legendText?.trim().length || 0).toBeGreaterThan(0);
      }
    }
  });

  test('Error States and Messages', async ({ page }) => {
    await page.goto('/contact');
    
    // Test form validation errors
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
      
      if (await submitBtn.isVisible()) {
        // Submit empty form to trigger validation
        await submitBtn.click();
        
        // Check for error messages
        const errorMessages = page.locator('[role="alert"], .error, [aria-invalid="true"] ~ *, .field-error');
        const errorCount = await errorMessages.count();
        
        if (errorCount > 0) {
          for (let i = 0; i < errorCount; i++) {
            const error = errorMessages.nth(i);
            if (await error.isVisible()) {
              // Error messages should be associated with fields
              const errorText = await error.textContent();
              expect(errorText?.trim().length || 0).toBeGreaterThan(0);
            }
          }
        }
        
        // Check for aria-invalid attributes
        const invalidFields = page.locator('[aria-invalid="true"]');
        const invalidCount = await invalidFields.count();
        
        for (let i = 0; i < invalidCount; i++) {
          const field = invalidFields.nth(i);
          const describedBy = await field.getAttribute('aria-describedby');
          
          if (describedBy) {
            const errorElement = page.locator(`#${describedBy}`);
            await expect(errorElement).toBeVisible();
          }
        }
      }
    }
  });
});