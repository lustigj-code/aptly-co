const { createCanvas, loadImage } = require('canvas');
const fs = require('fs').promises;
const path = require('path');

async function generateComparison() {
  const qaDir = path.join(process.cwd(), 'qa/seamless/final');
  
  try {
    // Load images for comparison
    const images = {
      step2Desktop: await loadImageSafe('qa/seamless/step2/home-desktop.png'),
      finalDesktop: await loadImageSafe('qa/seamless/final/home-desktop-final.png'),
      step2Mobile: await loadImageSafe('qa/seamless/step2/home-mobile.png'),
      finalMobile: await loadImageSafe('qa/seamless/final/home-mobile-final.png')
    };
    
    // Create comparison canvas for desktop
    if (images.step2Desktop && images.finalDesktop) {
      const width = Math.max(images.step2Desktop.width, images.finalDesktop.width);
      const height = Math.max(images.step2Desktop.height, images.finalDesktop.height);
      const canvas = createCanvas(width * 2 + 20, height);
      const ctx = canvas.getContext('2d');
      
      // Fill background
      ctx.fillStyle = '#0A004A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw before/after
      ctx.drawImage(images.step2Desktop, 0, 0);
      ctx.drawImage(images.finalDesktop, width + 20, 0);
      
      // Add labels
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('BEFORE', 20, 40);
      ctx.fillText('AFTER', width + 40, 40);
      
      const buffer = canvas.toBuffer('image/png');
      await fs.writeFile(path.join(qaDir, 'comparison-desktop.png'), buffer);
      console.log('Created desktop comparison');
    }
    
    // Create comparison for mobile
    if (images.step2Mobile && images.finalMobile) {
      const width = Math.max(images.step2Mobile.width, images.finalMobile.width);
      const height = Math.max(images.step2Mobile.height, images.finalMobile.height);
      const canvas = createCanvas(width * 2 + 20, height);
      const ctx = canvas.getContext('2d');
      
      // Fill background
      ctx.fillStyle = '#0A004A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw before/after
      ctx.drawImage(images.step2Mobile, 0, 0);
      ctx.drawImage(images.finalMobile, width + 20, 0);
      
      // Add labels
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('BEFORE', 10, 30);
      ctx.fillText('AFTER', width + 30, 30);
      
      const buffer = canvas.toBuffer('image/png');
      await fs.writeFile(path.join(qaDir, 'comparison-mobile.png'), buffer);
      console.log('Created mobile comparison');
    }
    
    console.log('Comparisons generated successfully');
    
  } catch (error) {
    console.error('Error generating comparisons:', error);
  }
}

async function loadImageSafe(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), imagePath);
    await fs.access(fullPath);
    return await loadImage(fullPath);
  } catch (error) {
    console.log(`Image not found: ${imagePath}`);
    return null;
  }
}

generateComparison();