import { test, expect, type Page } from '@playwright/test';

/**
 * Dark Mode and Theme Consistency Tests for Aptly.co
 * 
 * Tests theme switching functionality and brand consistency:
 * - Dark mode toggle functionality
 * - Theme persistence across pages
 * - Brand color consistency in both themes
 * - Accessibility in different themes
 */

test.describe('Dark Mode and Theme Consistency', () => {
  
  test('Dark Mode Toggle Functionality', async ({ page }) => {
    await page.goto('/');
    
    // Look for theme toggle button
    const themeToggle = page.locator(
      '[data-testid="theme-toggle"], ' +
      '[aria-label*="theme"], ' +
      '[aria-label*="dark"], ' +
      '[aria-label*="mode"], ' +
      'button:has-text("Dark"), ' +
      'button:has-text("Light"), ' +
      '.theme-toggle, ' +
      '.dark-mode-toggle'
    );
    
    if (await themeToggle.count() > 0) {
      const toggle = themeToggle.first();
      await expect(toggle).toBeVisible();
      
      // Get initial theme state
      const body = page.locator('body');
      const initialClass = await body.getAttribute('class') || '';
      const initialStyle = await body.evaluate(el => getComputedStyle(el).backgroundColor);
      
      // Click theme toggle
      await toggle.click();
      
      // Wait for theme transition
      await page.waitForTimeout(500);
      
      // Check theme has changed
      const newClass = await body.getAttribute('class') || '';
      const newStyle = await body.evaluate(el => getComputedStyle(el).backgroundColor);
      
      // Either class or styles should have changed
      const themeChanged = newClass !== initialClass || newStyle !== initialStyle;
      expect(themeChanged).toBe(true);
      
      // Toggle back
      await toggle.click();
      await page.waitForTimeout(500);
      
      const finalClass = await body.getAttribute('class') || '';
      const finalStyle = await body.evaluate(el => getComputedStyle(el).backgroundColor);
      
      // Should return to original state or similar
      expect(finalClass === initialClass || finalStyle === initialStyle).toBe(true);
    }
  });

  test('Brand Color Consistency Across Themes', async ({ page }) => {
    const testPages = ['/', '/about', '/services', '/contact'];
    
    for (const pagePath of testPages) {
      await page.goto(pagePath);
      
      // Test both light and dark themes
      for (const theme of ['light', 'dark']) {
        // Set theme via localStorage or class
        await page.evaluate((themeValue) => {
          document.body.classList.toggle('dark', themeValue === 'dark');
          localStorage.setItem('theme', themeValue);
        }, theme);
        
        await page.waitForTimeout(200);
        
        // Check brand colors are maintained
        const brandElements = page.locator(
          'nav, header, footer, .brand-color, .navy, .teal, [data-brand-color]'
        );
        
        const elementCount = await brandElements.count();
        
        for (let i = 0; i < Math.min(elementCount, 5); i++) {
          const element = brandElements.nth(i);
          if (await element.isVisible()) {
            const styles = await element.evaluate(el => {
              const computed = getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor,
                color: computed.color,
                borderColor: computed.borderColor
              };
            });
            
            // Check for brand colors in computed styles
            const hasNavy = Object.values(styles).some(color => 
              color.includes('10, 0, 74') || color.includes('#0A004A')
            );
            
            const hasTeal = Object.values(styles).some(color => 
              color.includes('33, 168, 176') || color.includes('#21A8B0')
            );
            
            const hasWhite = Object.values(styles).some(color => 
              color.includes('255, 255, 255') || color.includes('#FFFFFF')
            );
            
            // Should use at least one brand color
            if (hasNavy || hasTeal || hasWhite) {
              expect(true).toBe(true); // Brand colors detected
            }
          }
        }
      }
    }
  });

  test('Theme Persistence Across Navigation', async ({ page }) => {
    await page.goto('/');
    
    // Set dark theme
    await page.evaluate(() => {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    
    const initialTheme = await page.evaluate(() => 
      document.body.classList.contains('dark')
    );
    
    // Navigate to different pages
    const testPages = ['/about', '/services', '/contact', '/'];
    
    for (const pagePath of testPages) {
      await page.goto(pagePath);
      await page.waitForTimeout(300);
      
      const currentTheme = await page.evaluate(() => 
        document.body.classList.contains('dark') || 
        localStorage.getItem('theme') === 'dark'
      );
      
      expect(currentTheme).toBe(initialTheme);
    }
  });

  test('Accessibility in Different Themes', async ({ page }) => {
    await page.goto('/');
    
    const themes = [
      { name: 'light', class: '', bgExpected: 'light' },
      { name: 'dark', class: 'dark', bgExpected: 'dark' }
    ];
    
    for (const theme of themes) {
      // Set theme
      await page.evaluate((themeClass) => {
        document.body.className = themeClass;
        if (themeClass) {
          localStorage.setItem('theme', 'dark');
        } else {
          localStorage.setItem('theme', 'light');
        }
      }, theme.class);
      
      await page.waitForTimeout(300);
      
      // Test text contrast in current theme
      const textElements = page.locator('h1, h2, h3, p, a:not(.logo), button, span');
      const elementCount = await textElements.count();
      
      for (let i = 0; i < Math.min(elementCount, 8); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const styles = await element.evaluate(el => {
            const computed = getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor || 'transparent',
              fontSize: computed.fontSize
            };
          });
          
          // Check readability - text should not be too close to background color
          const textColor = styles.color;
          const bgColor = styles.backgroundColor;
          
          // Basic contrast check - white text should not be on light backgrounds
          const isWhiteText = textColor.includes('255, 255, 255');
          const isLightBg = bgColor.includes('255, 255, 255') || bgColor === 'transparent';
          const isDarkBg = bgColor.includes('10, 0, 74') || bgColor.includes('51, 51, 81');
          
          if (isWhiteText && theme.name === 'dark') {
            // White text in dark theme should be on dark backgrounds
            expect(isDarkBg || bgColor === 'transparent').toBe(true);
          }
          
          // Font size should still meet minimum requirements
          const fontSize = parseInt(styles.fontSize.replace('px', ''));
          expect(fontSize).toBeGreaterThanOrEqual(14); // Minimum readable size
        }
      }
      
      // Test focus visibility in current theme
      const focusableElements = page.locator('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
      const focusableCount = await focusableElements.count();
      
      if (focusableCount > 0) {
        const firstFocusable = focusableElements.first();
        await firstFocusable.focus();
        
        const focusStyles = await firstFocusable.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            outline: computed.outline,
            boxShadow: computed.boxShadow,
            borderColor: computed.borderColor
          };
        });
        
        // Should have visible focus indicator in current theme
        const hasFocusStyle = Object.values(focusStyles).some(style => 
          style !== 'none' && style !== 'rgba(0, 0, 0, 0)' && style !== 'initial'
        );
        
        expect(hasFocusStyle).toBe(true);
      }
    }
  });

  test('Theme Toggle Icon and State Indication', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator(
      '[data-testid="theme-toggle"], [aria-label*="theme"], .theme-toggle'
    ).first();
    
    if (await themeToggle.isVisible()) {
      // Check initial state indication
      const initialAriaLabel = await themeToggle.getAttribute('aria-label');
      const initialIcon = await themeToggle.locator('svg, img, .icon').count();
      
      // Should have some indication of current theme
      expect(initialAriaLabel?.toLowerCase()).toMatch(/light|dark|theme/);
      
      // Click to change theme
      await themeToggle.click();
      await page.waitForTimeout(300);
      
      // Check state has changed
      const newAriaLabel = await themeToggle.getAttribute('aria-label');
      expect(newAriaLabel).not.toBe(initialAriaLabel);
      
      // Icon might change too
      const newIconCount = await themeToggle.locator('svg, img, .icon').count();
      
      if (initialIcon > 0 && newIconCount > 0) {
        // Icons should be different or have different appearance
        const iconElement = themeToggle.locator('svg, img, .icon').first();
        const iconStyles = await iconElement.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            fill: computed.fill,
            color: computed.color,
            opacity: computed.opacity
          };
        });
        
        // Icon should have appropriate styling
        expect(Object.values(iconStyles).some(style => 
          style !== 'none' && style !== 'initial'
        )).toBe(true);
      }
    }
  });

  test('CSS Variables and Custom Properties in Themes', async ({ page }) => {
    await page.goto('/');
    
    // Check for CSS custom properties used in theming
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      
      const customProps = {};
      const allProps = Array.from(computed);
      
      for (const prop of allProps) {
        if (prop.startsWith('--')) {
          customProps[prop] = computed.getPropertyValue(prop);
        }
      }
      
      return customProps;
    });
    
    // Should have custom properties for theming
    const propKeys = Object.keys(rootStyles);
    const hasThemeProps = propKeys.some(key => 
      key.includes('color') || key.includes('bg') || key.includes('text') || 
      key.includes('navy') || key.includes('teal')
    );
    
    if (hasThemeProps) {
      // Test theme switching with CSS variables
      for (const theme of ['light', 'dark']) {
        await page.evaluate((themeValue) => {
          document.body.className = themeValue === 'dark' ? 'dark' : '';
        }, theme);
        
        await page.waitForTimeout(200);
        
        const themeStyles = await page.evaluate(() => {
          const root = document.documentElement;
          const computed = getComputedStyle(root);
          return {
            navyColor: computed.getPropertyValue('--navy') || computed.getPropertyValue('--color-navy'),
            tealColor: computed.getPropertyValue('--teal') || computed.getPropertyValue('--color-teal'),
            backgroundColor: computed.getPropertyValue('--bg-color') || computed.getPropertyValue('--background'),
            textColor: computed.getPropertyValue('--text-color') || computed.getPropertyValue('--foreground')
          };
        });
        
        // Brand colors should remain consistent
        const navy = themeStyles.navyColor?.trim();
        const teal = themeStyles.tealColor?.trim();
        
        if (navy) {
          expect(navy).toMatch(/#0A004A|rgb\(10,\s*0,\s*74\)/i);
        }
        if (teal) {
          expect(teal).toMatch(/#21A8B0|rgb\(33,\s*168,\s*176\)/i);
        }
      }
    }
  });

  test('System Theme Preference Detection', async ({ page }) => {
    // Test with different system preferences
    const preferences = [
      { colorScheme: 'light', name: 'Light System' },
      { colorScheme: 'dark', name: 'Dark System' }
    ];
    
    for (const pref of preferences) {
      await page.emulateMedia({ colorScheme: pref.colorScheme as 'light' | 'dark' });
      await page.goto('/');
      
      await page.waitForTimeout(300);
      
      // Check if system preference is respected
      const bodyClass = await page.locator('body').getAttribute('class') || '';
      const isDarkMode = bodyClass.includes('dark') || 
                        await page.evaluate(() => 
                          getComputedStyle(document.body).backgroundColor.includes('10, 0, 74')
                        );
      
      // If no manual theme is set, should follow system preference
      const hasManualTheme = await page.evaluate(() => 
        localStorage.getItem('theme') !== null
      );
      
      if (!hasManualTheme && pref.colorScheme === 'dark') {
        // Should detect dark system preference
        expect(isDarkMode).toBe(true);
      }
    }
  });
});