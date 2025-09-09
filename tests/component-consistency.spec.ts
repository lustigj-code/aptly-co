import { test, expect, type Page } from '@playwright/test';

/**
 * Component Consistency Testing for Aptly.co
 * 
 * Tests design system compliance and component standardization:
 * - Button variants and styling consistency
 * - Card component standardization  
 * - Typography usage and hierarchy
 * - Spacing and layout consistency
 * - Brand design token validation
 */

test.describe('Component Consistency and Design System', () => {
  
  test('Button Component Standardization', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/contact'];
    const buttonAnalysis = [];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      const buttons = page.locator('button, [role="button"], a[class*="button"], .btn');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        
        if (await button.isVisible()) {
          const buttonProps = await button.evaluate(el => {
            const computed = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            
            return {
              backgroundColor: computed.backgroundColor,
              color: computed.color,
              borderRadius: computed.borderRadius,
              padding: computed.padding,
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              fontFamily: computed.fontFamily,
              textTransform: computed.textTransform,
              border: computed.border,
              minHeight: computed.minHeight,
              width: rect.width,
              height: rect.height,
              text: el.textContent?.trim() || '',
              tagName: el.tagName.toLowerCase(),
              className: el.className
            };
          });
          
          buttonAnalysis.push({
            page: pagePath,
            index: i,
            ...buttonProps
          });
        }
      }
    }
    
    // Analyze button consistency
    if (buttonAnalysis.length > 0) {
      // Group buttons by apparent type (primary, secondary, etc.)
      const primaryButtons = buttonAnalysis.filter(btn => 
        btn.backgroundColor.includes('10, 0, 74') || // Navy
        btn.backgroundColor.includes('#0A004A')
      );
      
      const secondaryButtons = buttonAnalysis.filter(btn => 
        btn.backgroundColor.includes('33, 168, 176') || // Teal
        btn.backgroundColor.includes('#21A8B0')
      );
      
      // Primary buttons should be consistent
      if (primaryButtons.length > 1) {
        const firstPrimary = primaryButtons[0];
        primaryButtons.forEach(btn => {
          expect(btn.borderRadius).toBe(firstPrimary.borderRadius);
          expect(btn.fontFamily).toContain('DM Sans');
          expect(parseInt(btn.fontSize.replace('px', ''))).toBeGreaterThanOrEqual(14);
        });
        
        // Brand guideline: buttons should have 24px border radius
        expect(firstPrimary.borderRadius).toBe('24px');
      }
      
      // Secondary buttons should be consistent
      if (secondaryButtons.length > 1) {
        const firstSecondary = secondaryButtons[0];
        secondaryButtons.forEach(btn => {
          expect(btn.borderRadius).toBe(firstSecondary.borderRadius);
          expect(btn.fontFamily).toContain('DM Sans');
        });
      }
      
      // All buttons should meet minimum touch target size (44px)
      buttonAnalysis.forEach(btn => {
        expect(btn.height).toBeGreaterThanOrEqual(44);
      });
      
      // Should have maximum of 2 button variants (primary + secondary)
      const uniqueBackgroundColors = [...new Set(buttonAnalysis.map(btn => btn.backgroundColor))];
      expect(uniqueBackgroundColors.length).toBeLessThanOrEqual(3); // Primary, secondary, + transparent/outline
    }
  });

  test('Card Component Standardization', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/study-app'];
    const cardAnalysis = [];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      const cards = page.locator('.card, [class*="card"], [data-card], .testimonial, .service-card, .feature-card');
      const cardCount = await cards.count();
      
      for (let i = 0; i < cardCount; i++) {
        const card = cards.nth(i);
        
        if (await card.isVisible()) {
          const cardProps = await card.evaluate(el => {
            const computed = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            
            return {
              backgroundColor: computed.backgroundColor,
              border: computed.border,
              borderRadius: computed.borderRadius,
              padding: computed.padding,
              boxShadow: computed.boxShadow,
              width: rect.width,
              height: rect.height,
              className: el.className
            };
          });
          
          cardAnalysis.push({
            page: pagePath,
            index: i,
            ...cardProps
          });
        }
      }
    }
    
    // Analyze card consistency
    if (cardAnalysis.length > 0) {
      // Cards should have consistent styling patterns
      const borderRadiusValues = cardAnalysis.map(card => card.borderRadius);
      const uniqueBorderRadius = [...new Set(borderRadiusValues)];
      
      // Should have consistent border radius (likely 8px or 16px per brand guidelines)
      expect(uniqueBorderRadius.length).toBeLessThanOrEqual(2);
      
      // Cards should have some form of visual separation (border, shadow, or background)
      cardAnalysis.forEach(card => {
        const hasVisualSeparation = 
          card.border !== 'none' ||
          card.boxShadow !== 'none' ||
          !card.backgroundColor.includes('transparent');
        
        expect(hasVisualSeparation).toBe(true);
      });
      
      // Cards should have consistent padding
      const paddingValues = cardAnalysis.map(card => card.padding);
      const uniquePadding = [...new Set(paddingValues)];
      
      // Should use consistent padding (max 3 variations for different card sizes)
      expect(uniquePadding.length).toBeLessThanOrEqual(3);
    }
  });

  test('Typography Hierarchy and Consistency', async ({ page }) => {
    const pages = ['/', '/about', '/services'];
    const typographyAnalysis = [];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const paragraphs = page.locator('p');
      
      // Analyze headings
      const headingCount = await headings.count();
      for (let i = 0; i < headingCount; i++) {
        const heading = headings.nth(i);
        
        if (await heading.isVisible()) {
          const headingProps = await heading.evaluate(el => {
            const computed = getComputedStyle(el);
            return {
              tagName: el.tagName.toLowerCase(),
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              fontFamily: computed.fontFamily,
              color: computed.color,
              lineHeight: computed.lineHeight,
              marginTop: computed.marginTop,
              marginBottom: computed.marginBottom,
              textContent: el.textContent?.trim().substring(0, 50) || ''
            };
          });
          
          typographyAnalysis.push({
            page: pagePath,
            type: 'heading',
            ...headingProps
          });
        }
      }
      
      // Analyze paragraphs (sample)
      const paragraphCount = await paragraphs.count();
      for (let i = 0; i < Math.min(paragraphCount, 3); i++) {
        const paragraph = paragraphs.nth(i);
        
        if (await paragraph.isVisible()) {
          const paragraphProps = await paragraph.evaluate(el => {
            const computed = getComputedStyle(el);
            return {
              tagName: 'p',
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              fontFamily: computed.fontFamily,
              color: computed.color,
              lineHeight: computed.lineHeight
            };
          });
          
          typographyAnalysis.push({
            page: pagePath,
            type: 'paragraph',
            ...paragraphProps
          });
        }
      }
    }
    
    // Analyze typography consistency
    if (typographyAnalysis.length > 0) {
      // All text should use DM Sans font family
      typographyAnalysis.forEach(item => {
        expect(item.fontFamily).toContain('DM Sans');
      });
      
      // Check heading hierarchy
      const headingSizes = {};
      typographyAnalysis.filter(item => item.type === 'heading').forEach(heading => {
        const tag = heading.tagName;
        const size = parseInt(heading.fontSize.replace('px', ''));
        
        if (!headingSizes[tag]) {
          headingSizes[tag] = [];
        }
        headingSizes[tag].push(size);
      });
      
      // Heading sizes should follow hierarchy (h1 > h2 > h3...)
      if (headingSizes.h1 && headingSizes.h2) {
        const avgH1Size = headingSizes.h1.reduce((a, b) => a + b, 0) / headingSizes.h1.length;
        const avgH2Size = headingSizes.h2.reduce((a, b) => a + b, 0) / headingSizes.h2.length;
        expect(avgH1Size).toBeGreaterThan(avgH2Size);
      }
      
      // Paragraph text should be readable (minimum 16px)
      const paragraphs = typographyAnalysis.filter(item => item.type === 'paragraph');
      paragraphs.forEach(p => {
        const fontSize = parseInt(p.fontSize.replace('px', ''));
        expect(fontSize).toBeGreaterThanOrEqual(16);
      });
      
      // Should have consistent paragraph sizes
      const paragraphSizes = paragraphs.map(p => p.fontSize);
      const uniqueParagraphSizes = [...new Set(paragraphSizes)];
      expect(uniqueParagraphSizes.length).toBeLessThanOrEqual(2); // Base size + maybe one variant
    }
  });

  test('Spacing and Layout Consistency', async ({ page }) => {
    const pages = ['/', '/about', '/services'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Check section spacing
      const sections = page.locator('section, .section, [data-section]');
      const sectionCount = await sections.count();
      
      const sectionSpacing = [];
      
      for (let i = 0; i < Math.min(sectionCount, 5); i++) {
        const section = sections.nth(i);
        
        if (await section.isVisible()) {
          const spacing = await section.evaluate(el => {
            const computed = getComputedStyle(el);
            return {
              marginTop: computed.marginTop,
              marginBottom: computed.marginBottom,
              paddingTop: computed.paddingTop,
              paddingBottom: computed.paddingBottom,
              paddingLeft: computed.paddingLeft,
              paddingRight: computed.paddingRight
            };
          });
          
          sectionSpacing.push(spacing);
        }
      }
      
      // Check for consistent spacing patterns (should follow 8px grid)
      sectionSpacing.forEach(spacing => {
        Object.values(spacing).forEach(value => {
          if (value !== '0px' && value !== 'auto') {
            const pixels = parseInt(value.replace('px', ''));
            if (pixels > 0) {
              // Should be multiple of 8 (8px grid system)
              expect(pixels % 8).toBe(0);
            }
          }
        });
      });
      
      // Check container widths
      const containers = page.locator('.container, [class*="container"], .max-w-, main');
      const containerCount = await containers.count();
      
      if (containerCount > 0) {
        for (let i = 0; i < Math.min(containerCount, 3); i++) {
          const container = containers.nth(i);
          
          if (await container.isVisible()) {
            const containerProps = await container.evaluate(el => {
              const computed = getComputedStyle(el);
              const rect = el.getBoundingClientRect();
              return {
                maxWidth: computed.maxWidth,
                width: rect.width,
                marginLeft: computed.marginLeft,
                marginRight: computed.marginRight,
                paddingLeft: computed.paddingLeft,
                paddingRight: computed.paddingRight
              };
            });
            
            // Containers should have reasonable max-widths (not exceeding 1280px per brand guidelines)
            if (containerProps.maxWidth !== 'none') {
              const maxWidthPx = parseInt(containerProps.maxWidth.replace('px', ''));
              if (!isNaN(maxWidthPx)) {
                expect(maxWidthPx).toBeLessThanOrEqual(1280);
              }
            }
            
            // Should have consistent horizontal padding
            const paddingLeft = parseInt(containerProps.paddingLeft.replace('px', ''));
            const paddingRight = parseInt(containerProps.paddingRight.replace('px', ''));
            
            if (paddingLeft > 0 && paddingRight > 0) {
              expect(paddingLeft).toBe(paddingRight); // Symmetric padding
            }
          }
        }
      }
    }
  });

  test('Brand Design Token Usage', async ({ page }) => {
    await page.goto('/');
    
    // Check if CSS custom properties (design tokens) are being used
    const designTokens = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      
      const tokens = {};
      const allProps = Array.from(computed);
      
      for (const prop of allProps) {
        if (prop.startsWith('--')) {
          tokens[prop] = computed.getPropertyValue(prop).trim();
        }
      }
      
      return tokens;
    });
    
    // Should have brand color tokens
    const expectedColorTokens = [
      'navy', 'teal', 'yellow', 'white', 'light-grey', 'grey', 'rich-black'
    ];
    
    const tokenKeys = Object.keys(designTokens);
    const hasColorTokens = expectedColorTokens.some(color => 
      tokenKeys.some(key => key.includes(color))
    );
    
    if (hasColorTokens) {
      // Validate brand color values in tokens
      const brandColors = {
        navy: '#0A004A',
        teal: '#21A8B0', 
        yellow: '#FFDE00',
        white: '#FFFFFF'
      };
      
      Object.entries(brandColors).forEach(([colorName, expectedHex]) => {
        const tokenKey = tokenKeys.find(key => 
          key.includes(colorName) || key.includes(colorName.toLowerCase())
        );
        
        if (tokenKey) {
          const tokenValue = designTokens[tokenKey];
          expect(tokenValue.toUpperCase()).toMatch(expectedHex);
        }
      });
    }
    
    // Check for spacing tokens
    const spacingTokenKeys = tokenKeys.filter(key => 
      key.includes('space') || key.includes('spacing') || key.includes('gap')
    );
    
    if (spacingTokenKeys.length > 0) {
      // Spacing values should follow 8px grid
      spacingTokenKeys.forEach(key => {
        const value = designTokens[key];
        if (value.includes('px')) {
          const pixels = parseInt(value.replace('px', ''));
          if (pixels > 0) {
            expect(pixels % 8).toBe(0);
          }
        }
      });
    }
  });

  test('Component State Consistency', async ({ page }) => {
    await page.goto('/');
    
    // Test interactive element states
    const interactiveElements = page.locator('button, a, input, textarea, [role="button"]');
    const elementCount = await interactiveElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 5); i++) {
      const element = interactiveElements.nth(i);
      
      if (await element.isVisible()) {
        // Normal state
        const normalState = await element.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            opacity: computed.opacity,
            transform: computed.transform
          };
        });
        
        // Hover state
        await element.hover();
        await page.waitForTimeout(200);
        
        const hoverState = await element.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            opacity: computed.opacity,
            transform: computed.transform
          };
        });
        
        // Should have some hover indication
        const hasHoverEffect = Object.keys(normalState).some(property => 
          normalState[property] !== hoverState[property]
        );
        
        // Focus state
        await element.focus();
        await page.waitForTimeout(200);
        
        const focusState = await element.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            outline: computed.outline,
            boxShadow: computed.boxShadow,
            borderColor: computed.borderColor
          };
        });
        
        // Should have focus indication
        const hasFocusIndicator = Object.values(focusState).some(value => 
          value !== 'none' && value !== 'rgba(0, 0, 0, 0)' && value !== 'initial'
        );
        
        expect(hasFocusIndicator).toBe(true);
        
        // Reset focus
        await page.keyboard.press('Tab');
      }
    }
  });

  test('Icon and Image Consistency', async ({ page }) => {
    const pages = ['/', '/about', '/services'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Check icon usage
      const icons = page.locator('svg, [class*="icon"], .icon, [data-icon]');
      const iconCount = await icons.count();
      
      for (let i = 0; i < Math.min(iconCount, 10); i++) {
        const icon = icons.nth(i);
        
        if (await icon.isVisible()) {
          const iconProps = await icon.evaluate(el => {
            const computed = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              width: rect.width,
              height: rect.height,
              color: computed.color || computed.fill,
              tagName: el.tagName.toLowerCase()
            };
          });
          
          // Icons should be reasonably sized
          expect(iconProps.width).toBeGreaterThan(8);
          expect(iconProps.width).toBeLessThan(200);
          expect(iconProps.height).toBeGreaterThan(8);
          expect(iconProps.height).toBeLessThan(200);
          
          // Icons should maintain aspect ratio (roughly square or reasonable ratios)
          const aspectRatio = iconProps.width / iconProps.height;
          expect(aspectRatio).toBeGreaterThan(0.5);
          expect(aspectRatio).toBeLessThan(3);
        }
      }
      
      // Check images have consistent styling
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        
        if (await img.isVisible()) {
          const imgProps = await img.evaluate(el => {
            const computed = getComputedStyle(el);
            return {
              borderRadius: computed.borderRadius,
              objectFit: computed.objectFit,
              alt: el.alt || ''
            };
          });
          
          // Images should have alt text
          expect(imgProps.alt.length).toBeGreaterThan(0);
          
          // Product images should have consistent border radius
          const borderRadius = imgProps.borderRadius;
          if (borderRadius !== '0px') {
            // Should follow brand guidelines (likely 8px or 16px)
            expect(borderRadius).toMatch(/8px|16px/);
          }
        }
      }
    }
  });
});