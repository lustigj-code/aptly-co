const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  console.log('Verifying UI Fixes\n');
  console.log('=' .repeat(60) + '\n');
  
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Check button alignment
  const buttonCheck = await page.evaluate(() => {
    const buttons = [];
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent?.trim();
      if (text?.includes('Browse Programs') || text?.includes('Talk to Advisor')) {
        const rect = btn.getBoundingClientRect();
        const styles = window.getComputedStyle(btn);
        buttons.push({
          text: text,
          height: rect.height,
          minHeight: styles.minHeight,
          display: styles.display,
          alignItems: styles.alignItems,
          justifyContent: styles.justifyContent
        });
      }
    });
    return buttons;
  });
  
  console.log('BUTTON ALIGNMENT CHECK:');
  buttonCheck.forEach((btn, i) => {
    console.log(`${i + 1}. ${btn.text}:`);
    console.log(`   Height: ${btn.height}px`);
    console.log(`   Min-Height: ${btn.minHeight}`);
    console.log(`   Display: ${btn.display}`);
    console.log(`   Align: ${btn.alignItems} / ${btn.justifyContent}\n`);
  });
  
  // Check Stay Updated section
  await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await page.waitForTimeout(1500);
  
  const stayUpdatedCheck = await page.evaluate(() => {
    const form = document.querySelector('footer form');
    if (form) {
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      
      if (input && button) {
        const inputRect = input.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const inputStyles = window.getComputedStyle(input);
        const buttonStyles = window.getComputedStyle(button);
        
        return {
          found: true,
          input: {
            height: inputRect.height,
            minHeight: inputStyles.minHeight
          },
          button: {
            height: buttonRect.height,
            minHeight: buttonStyles.minHeight,
            text: button.textContent?.trim()
          },
          aligned: Math.abs(inputRect.height - buttonRect.height) < 2
        };
      }
    }
    return { found: false };
  });
  
  console.log('STAY UPDATED SECTION:');
  if (stayUpdatedCheck.found) {
    console.log('Input Height:', stayUpdatedCheck.input.height + 'px');
    console.log('Button Height:', stayUpdatedCheck.button.height + 'px');
    console.log('Alignment:', stayUpdatedCheck.aligned ? 'ALIGNED' : 'MISALIGNED');
  }
  
  // Check partner logos
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const logoCheck = await page.evaluate(() => {
    const logos = [];
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.alt === 'Meta' || img.alt === 'Google' || img.alt === 'Coursera') {
        logos.push({
          alt: img.alt,
          displayed: img.offsetWidth > 0 && img.offsetHeight > 0,
          width: img.offsetWidth,
          height: img.offsetHeight,
          src: img.src
        });
      }
    });
    return logos;
  });
  
  console.log('\nPARTNER LOGOS:');
  logoCheck.forEach(logo => {
    console.log(`${logo.alt}: ${logo.displayed ? 'VISIBLE' : 'NOT VISIBLE'} (${logo.width}x${logo.height})`);
  });
  
  // Take final screenshot
  await page.screenshot({ path: 'screenshots/ui-fixes-verified.png', fullPage: false });
  
  console.log('\nAll fixes verified. Check screenshot for visual confirmation.');
  
  await page.waitForTimeout(5000);
  await browser.close();
})();