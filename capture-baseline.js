const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function captureBaseline() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), 'qa', 'seamless', 's1');
    await fs.mkdir(outputDir, { recursive: true });

    // Navigate to homepage
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('Page loaded successfully');
    
    // Wait for animations
    await page.waitForTimeout(2000);

    // Desktop screenshot (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ 
      path: path.join(outputDir, 'baseline-desktop.png'),
      fullPage: true 
    });
    console.log('Desktop screenshot captured');

    // Mobile screenshot (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ 
      path: path.join(outputDir, 'baseline-mobile.png'),
      fullPage: true 
    });
    console.log('Mobile screenshot captured');

    console.log(`Screenshots saved to: ${outputDir}`);
    
  } catch (error) {
    if (error.message.includes('ERR_CONNECTION_REFUSED')) {
      console.log('Connection refused - development server not running');
      console.log('Please run: npm run dev');
      console.log('Then re-run this script');
    } else {
      console.error('Error:', error.message);
    }
  }
  
  await browser.close();
}

captureBaseline();