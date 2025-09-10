const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to homepage
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Desktop screenshot (1440x900)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'qa/seamless/s3/after-desktop.png',
    fullPage: true
  });
  
  // Mobile screenshot (390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'qa/seamless/s3/after-mobile.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Screenshots captured for S3 implementation');
})();