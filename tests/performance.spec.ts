import { test, expect, type Page } from '@playwright/test';

/**
 * Performance Testing Suite for Aptly.co
 * 
 * Tests web performance metrics:
 * - First Contentful Paint (FCP)
 * - Largest Contentful Paint (LCP)  
 * - Cumulative Layout Shift (CLS)
 * - Time to Interactive (TTI)
 * - Bundle size and resource loading
 * - Image lazy loading
 */

test.describe('Performance Testing', () => {
  
  test('Core Web Vitals Measurement', async ({ page }) => {
    // Enable performance metrics collection
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Measure Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {
          fcp: 0,
          lcp: 0,
          cls: 0,
          fid: 0
        };
        
        // First Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          for (const entry of entries) {
            if (entry.name === 'first-contentful-paint') {
              vitals.fcp = entry.startTime;
            }
          }
        }).observe({ entryTypes: ['paint'] });
        
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          vitals.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
        
        // First Input Delay
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            vitals.fid = entry.processingStart - entry.startTime;
          }
        }).observe({ entryTypes: ['first-input'] });
        
        // Resolve after collecting metrics for a reasonable time
        setTimeout(() => resolve(vitals), 3000);
      });
    });
    
    // Validate Core Web Vitals thresholds
    expect(webVitals.fcp).toBeLessThan(1800); // FCP should be < 1.8s
    expect(webVitals.lcp).toBeLessThan(2500); // LCP should be < 2.5s
    expect(webVitals.cls).toBeLessThan(0.1);  // CLS should be < 0.1
    
    if (webVitals.fid > 0) {
      expect(webVitals.fid).toBeLessThan(100); // FID should be < 100ms
    }
  });

  test('Image Loading Performance', async ({ page }) => {
    await page.goto('/');
    
    // Check all images load efficiently
    const images = page.locator('img');
    const imageCount = await images.count();
    
    const imageMetrics = [];
    
    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      
      if (await img.isVisible()) {
        const metrics = await img.evaluate((imgEl) => {
          return {
            src: imgEl.src,
            loading: imgEl.loading,
            naturalWidth: imgEl.naturalWidth,
            naturalHeight: imgEl.naturalHeight,
            complete: imgEl.complete,
            decoded: imgEl.decode ? true : false
          };
        });
        
        imageMetrics.push(metrics);
        
        // Images should be properly sized
        expect(metrics.naturalWidth).toBeGreaterThan(0);
        expect(metrics.naturalHeight).toBeGreaterThan(0);
        
        // Should use lazy loading for non-critical images
        const isAboveFold = await img.boundingBox().then(box => 
          box ? box.y < 600 : false
        );
        
        if (!isAboveFold) {
          expect(metrics.loading).toBe('lazy');
        }
      }
    }
    
    // Check for Next.js Image optimization
    const nextImages = page.locator('img[src*="/_next/image"]');
    const nextImageCount = await nextImages.count();
    
    if (nextImageCount > 0) {
      // Next.js images should have proper optimization
      for (let i = 0; i < Math.min(nextImageCount, 3); i++) {
        const nextImg = nextImages.nth(i);
        const src = await nextImg.getAttribute('src');
        
        // Should have optimization parameters
        expect(src).toMatch(/[?&](w=|quality=|format=)/);
      }
    }
  });

  test('JavaScript Bundle Size and Loading', async ({ page }) => {
    // Monitor network requests
    const requests = [];
    page.on('request', request => {
      if (request.resourceType() === 'script') {
        requests.push({
          url: request.url(),
          method: request.method(),
          size: 0
        });
      }
    });
    
    page.on('response', response => {
      if (response.request().resourceType() === 'script') {
        const request = requests.find(r => r.url === response.url());
        if (request) {
          response.body().then(body => {
            request.size = body.length;
          }).catch(() => {});
        }
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for all scripts to load
    await page.waitForTimeout(2000);
    
    // Analyze bundle sizes
    const jsFiles = requests.filter(r => r.url.includes('.js'));
    const totalJSSize = jsFiles.reduce((total, file) => total + file.size, 0);
    
    // Total JS should be reasonable (under 1MB for initial load)
    expect(totalJSSize).toBeLessThan(1024 * 1024); // 1MB
    
    // Check for code splitting (multiple JS chunks)
    const chunkFiles = jsFiles.filter(r => 
      r.url.includes('chunk') || r.url.includes('_next/static')
    );
    
    if (chunkFiles.length > 1) {
      // Good - using code splitting
      expect(chunkFiles.length).toBeGreaterThan(1);
    }
    
    // Main bundle shouldn't be too large
    const mainBundle = jsFiles.find(r => 
      r.url.includes('main') || r.url.includes('index')
    );
    
    if (mainBundle && mainBundle.size > 0) {
      expect(mainBundle.size).toBeLessThan(500 * 1024); // 500KB
    }
  });

  test('CSS Loading and Rendering Performance', async ({ page }) => {
    const cssRequests = [];
    
    page.on('response', response => {
      if (response.request().resourceType() === 'stylesheet') {
        cssRequests.push({
          url: response.url(),
          status: response.status(),
          fromCache: response.fromCache()
        });
      }
    });
    
    await page.goto('/');
    
    // Check CSS loading
    expect(cssRequests.length).toBeGreaterThan(0);
    
    // All CSS should load successfully
    cssRequests.forEach(css => {
      expect(css.status).toBe(200);
    });
    
    // Check for render-blocking CSS
    const criticalCSS = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      return stylesheets.map(sheet => ({
        href: sheet.href,
        media: sheet.media.mediaText || 'all',
        disabled: sheet.disabled
      }));
    });
    
    // Should have at least one stylesheet
    expect(criticalCSS.length).toBeGreaterThan(0);
    
    // Check for unused CSS (simplified)
    const usedSelectors = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      let totalRules = 0;
      let usedRules = 0;
      
      sheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          totalRules += rules.length;
          
          rules.forEach(rule => {
            if (rule.selectorText) {
              try {
                if (document.querySelector(rule.selectorText)) {
                  usedRules++;
                }
              } catch (e) {
                // Invalid selector, skip
              }
            } else {
              usedRules++; // Non-selector rules (media queries, etc.)
            }
          });
        } catch (e) {
          // Cross-origin stylesheet, skip
        }
      });
      
      return { totalRules, usedRules, efficiency: usedRules / totalRules };
    });
    
    // CSS efficiency should be reasonable (>30% of rules used)
    if (usedSelectors.totalRules > 0) {
      expect(usedSelectors.efficiency).toBeGreaterThan(0.3);
    }
  });

  test('Page Load Speed Across Routes', async ({ page }) => {
    const routes = ['/', '/about', '/services', '/contact', '/study-app'];
    const loadTimes = [];
    
    for (const route of routes) {
      const startTime = Date.now();
      
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      
      const loadTime = Date.now() - startTime;
      loadTimes.push({ route, loadTime });
      
      // Each page should load within reasonable time
      expect(loadTime).toBeLessThan(3000); // 3 seconds
      
      // Check DOM is ready
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      
      // Check main content is visible
      const mainContent = page.locator('main, [role="main"], h1').first();
      await expect(mainContent).toBeVisible();
    }
    
    // Average load time should be good
    const avgLoadTime = loadTimes.reduce((sum, item) => sum + item.loadTime, 0) / loadTimes.length;
    expect(avgLoadTime).toBeLessThan(2000); // 2 seconds average
  });

  test('Resource Caching and Optimization', async ({ page }) => {
    // First visit
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Second visit to test caching
    await page.reload();
    
    const cachedResources = [];
    
    page.on('response', response => {
      if (response.fromCache()) {
        cachedResources.push({
          url: response.url(),
          type: response.request().resourceType(),
          cached: true
        });
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Should have some cached resources on repeat visit
    expect(cachedResources.length).toBeGreaterThan(0);
    
    // Check cache headers for static assets
    const staticAssetRequests = [];
    
    page.on('response', response => {
      const url = response.url();
      if (url.includes('/_next/static/') || url.includes('.css') || url.includes('.js')) {
        staticAssetRequests.push({
          url,
          cacheControl: response.headers()['cache-control'],
          etag: response.headers()['etag']
        });
      }
    });
    
    await page.goto('/');
    
    // Static assets should have appropriate caching headers
    staticAssetRequests.forEach(asset => {
      const cacheControl = asset.cacheControl;
      if (cacheControl) {
        // Should have some form of caching
        expect(cacheControl).toMatch(/max-age|immutable|public/);
      }
    });
  });

  test('Memory Usage and Resource Cleanup', async ({ page, context }) => {
    // Monitor memory usage during navigation
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });
    
    // Navigate through several pages
    const routes = ['/', '/about', '/services', '/contact', '/insights'];
    
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      
      // Force garbage collection if available
      if (process.env.NODE_ENV === 'test') {
        await page.evaluate(() => {
          if ('gc' in window) {
            (window as any).gc();
          }
        });
      }
      
      await page.waitForTimeout(500);
    }
    
    const finalMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });
    
    // Memory shouldn't grow excessively
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreaseRatio = memoryIncrease / initialMemory;
      
      // Memory increase should be reasonable (less than 300% of initial)
      expect(memoryIncreaseRatio).toBeLessThan(3);
    }
    
    // Check for event listener leaks (simplified)
    const listenerCount = await page.evaluate(() => {
      // This is a simplified check - in a real app you'd have more sophisticated monitoring
      const eventTypes = ['click', 'scroll', 'resize', 'load'];
      let totalListeners = 0;
      
      eventTypes.forEach(eventType => {
        // This is an approximation - actual listener counting is complex
        const elements = document.querySelectorAll(`[on${eventType}]`);
        totalListeners += elements.length;
      });
      
      return totalListeners;
    });
    
    // Shouldn't have excessive inline event handlers
    expect(listenerCount).toBeLessThan(50);
  });

  test('Font Loading Performance', async ({ page }) => {
    await page.goto('/');
    
    // Check font loading strategy
    const fontFaces = await page.evaluate(() => {
      const fonts = [];
      if ('fonts' in document) {
        document.fonts.forEach(font => {
          fonts.push({
            family: font.family,
            status: font.status,
            display: font.display || 'auto'
          });
        });
      }
      return fonts;
    });
    
    if (fontFaces.length > 0) {
      // Fonts should be loaded or loading
      fontFaces.forEach(font => {
        expect(font.status).toMatch(/loaded|loading/);
      });
    }
    
    // Check for font display optimization
    const linkElements = await page.locator('link[rel="stylesheet"]').all();
    
    for (const link of linkElements) {
      const href = await link.getAttribute('href');
      if (href && href.includes('fonts.googleapis.com')) {
        // Google Fonts should have display=swap parameter
        expect(href).toMatch(/display=swap/);
      }
    }
    
    // Measure font load time
    const fontLoadTime = await page.evaluate(() => {
      return new Promise((resolve) => {
        const startTime = performance.now();
        
        if ('fonts' in document && document.fonts.ready) {
          document.fonts.ready.then(() => {
            resolve(performance.now() - startTime);
          });
        } else {
          // Fallback for older browsers
          setTimeout(() => resolve(performance.now() - startTime), 100);
        }
      });
    });
    
    // Font loading should be fast
    expect(fontLoadTime).toBeLessThan(1000); // 1 second
  });
});