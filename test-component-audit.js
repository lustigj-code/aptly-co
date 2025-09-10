const { chromium } = require('playwright');

async function auditComponents() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // Navigate to the development server
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Take full page screenshot
    console.log('Taking homepage screenshot...');
    await page.screenshot({ 
      path: 'screenshots/component-audit-homepage.png', 
      fullPage: true 
    });

    // Test different viewport sizes
    const viewports = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];

    for (const viewport of viewports) {
      console.log(`Testing ${viewport.name} viewport...`);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.screenshot({ 
        path: `screenshots/component-audit-${viewport.name}.png`,
        fullPage: true 
      });
    }

    // Test navigation interaction
    console.log('Testing navigation...');
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Hover over navigation items to test states
    const navItems = await page.locator('nav a').all();
    for (let i = 0; i < Math.min(navItems.length, 3); i++) {
      await navItems[i].hover();
      await page.waitForTimeout(200);
    }
    
    await page.screenshot({ 
      path: 'screenshots/navigation-hover-states.png' 
    });

    // Test mobile menu
    await page.setViewportSize({ width: 375, height: 812 });
    const mobileMenuButton = page.locator('[aria-label*="navigation menu"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(300);
      await page.screenshot({ 
        path: 'screenshots/mobile-menu-open.png' 
      });
    }

    // Test other pages for component consistency
    const pages = ['/about', '/services', '/success'];
    
    for (const pagePath of pages) {
      console.log(`Testing ${pagePath} page...`);
      await page.goto(`http://localhost:3000${pagePath}`, { waitUntil: 'networkidle' });
      await page.screenshot({ 
        path: `screenshots/component-audit-${pagePath.replace('/', '')}.png`, 
        fullPage: true 
      });
    }

    console.log('Component audit screenshots completed!');

  } catch (error) {
    console.error('Error during component audit:', error);
  } finally {
    await browser.close();
  }
}

auditComponents();