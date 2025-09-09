import { test, expect, type Page } from '@playwright/test';

/**
 * Critical E2E User Journey Tests for Aptly.co
 * 
 * Tests the most important user flows:
 * 1. Homepage → Service exploration → Contact
 * 2. Homepage → Study App → Enrollment path
 * 3. Navigation consistency across all pages
 * 4. Search and discovery flows
 */

test.describe('Critical User Journeys', () => {
  
  test('Homepage to Contact Journey', async ({ page }) => {
    await page.goto('/');
    
    // Verify homepage loads correctly
    await expect(page).toHaveTitle(/Aptly/);
    await expect(page.locator('h1')).toBeVisible();
    
    // Check brand consistency - navy background
    const hero = page.locator('[data-testid="hero-section"]').first();
    const bgColor = await hero.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgColor).toMatch(/rgb\(10, 0, 74\)|#0A004A/i); // Navy color
    
    // Navigate to services
    await page.click('a[href="/services"]');
    await expect(page).toHaveURL(/\/services/);
    await expect(page.locator('h1')).toContainText(/service|solution/i);
    
    // Navigate to contact from services
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/\/contact/);
    
    // Test contact form
    const nameField = page.locator('input[name="name"], input[id="name"], input[type="text"]').first();
    const emailField = page.locator('input[name="email"], input[id="email"], input[type="email"]').first();
    const messageField = page.locator('textarea[name="message"], textarea[id="message"]').first();
    
    if (await nameField.isVisible()) {
      await nameField.fill('Test User');
      await emailField.fill('test@example.com');
      await messageField.fill('Test inquiry about Aptly services');
      
      // Check form validation (should be accessible)
      await expect(nameField).toHaveAttribute('required', '');
      await expect(emailField).toHaveAttribute('required', '');
    }
  });

  test('Homepage to Study App Journey', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to study app
    const studyAppLink = page.locator('a[href="/study-app"]');
    if (await studyAppLink.isVisible()) {
      await studyAppLink.click();
      await expect(page).toHaveURL(/\/study-app/);
      
      // Verify study app page content
      await expect(page.locator('h1')).toBeVisible();
      
      // Check for CTA buttons (should follow brand guidelines)
      const ctaButtons = page.locator('button, a[role="button"]');
      const buttonCount = await ctaButtons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = ctaButtons.nth(i);
        if (await button.isVisible()) {
          const borderRadius = await button.evaluate(el => getComputedStyle(el).borderRadius);
          // Brand guideline: buttons should have 24px border radius
          expect(borderRadius).toMatch(/24px|1.5rem/);
        }
      }
    }
  });

  test('Navigation Consistency Across Pages', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/success', '/insights', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check navigation is present and visible
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
      
      // Verify Aptly logo is present
      const logo = page.locator('img[alt*="Aptly"], svg[role="img"], [data-testid="logo"]').first();
      await expect(logo).toBeVisible();
      
      // Check footer is present
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Verify brand colors are used
      const body = page.locator('body');
      const bodyStyles = await body.evaluate(el => {
        const styles = getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      });
      
      // Should use brand colors (navy background or white)
      expect(bodyStyles.backgroundColor).toMatch(/rgb\(10, 0, 74\)|rgb\(255, 255, 255\)|#0A004A|#FFFFFF/i);
    }
  });

  test('Search and Discovery Flow', async ({ page }) => {
    await page.goto('/');
    
    // Check if there's a search functionality
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]');
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('learning solutions');
      await page.keyboard.press('Enter');
      
      // Verify search results or navigation occurred
      await page.waitForTimeout(1000);
      const currentUrl = page.url();
      expect(currentUrl).not.toBe('/');
    }
    
    // Test insights/blog navigation
    await page.goto('/insights');
    await expect(page).toHaveURL(/\/insights/);
    
    // Check for blog posts/articles
    const articles = page.locator('article, [role="article"], .post, .blog-post');
    if (await articles.count() > 0) {
      const firstArticle = articles.first();
      const articleLink = firstArticle.locator('a').first();
      
      if (await articleLink.isVisible()) {
        await articleLink.click();
        // Should navigate to individual post
        await page.waitForTimeout(1000);
        expect(page.url()).toMatch(/\/insights\//);
      }
    }
  });

  test('Form Interactions and Validation', async ({ page }) => {
    await page.goto('/contact');
    
    // Find all form inputs
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      // Test form validation
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
      
      if (await submitButton.isVisible()) {
        // Try to submit empty form
        await submitButton.click();
        
        // Check for validation messages
        const errorMessages = page.locator('.error, [aria-invalid="true"], .field-error');
        const hasValidation = await errorMessages.count() > 0;
        
        // Fill form properly
        const nameInput = page.locator('input[name="name"], input[id="name"]').first();
        const emailInput = page.locator('input[name="email"], input[id="email"]').first();
        
        if (await nameInput.isVisible()) {
          await nameInput.fill('John Doe');
        }
        if (await emailInput.isVisible()) {
          await emailInput.fill('john@example.com');
        }
        
        // Verify accessibility attributes
        await expect(nameInput).toHaveAttribute('type', 'text');
        await expect(emailInput).toHaveAttribute('type', 'email');
      }
    }
  });
});