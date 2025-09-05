import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export interface ComparisonResult {
  identical: boolean;
  differencePercentage: number;
  diffImagePath?: string;
  beforeHash: string;
  afterHash: string;
  timestamp: string;
  details: {
    pixelsDifferent: number;
    totalPixels: number;
    threshold: number;
  };
}

export class ComparisonUtility {
  private baseDir: string;

  constructor(baseDir: string = path.join(process.cwd(), 'screenshots')) {
    this.baseDir = baseDir;
  }

  async compareScreenshots(
    beforePath: string,
    afterPath: string,
    threshold: number = 0.01 // 1% difference threshold
  ): Promise<ComparisonResult> {
    // Calculate hashes first for quick comparison
    const beforeHash = await this.calculateFileHash(beforePath);
    const afterHash = await this.calculateFileHash(afterPath);

    if (beforeHash === afterHash) {
      return {
        identical: true,
        differencePercentage: 0,
        beforeHash,
        afterHash,
        timestamp: new Date().toISOString(),
        details: {
          pixelsDifferent: 0,
          totalPixels: 0,
          threshold
        }
      };
    }

    // If hashes differ, perform pixel comparison
    const comparison = await this.pixelComparison(beforePath, afterPath, threshold);
    
    return {
      ...comparison,
      beforeHash,
      afterHash,
      timestamp: new Date().toISOString()
    };
  }

  private async calculateFileHash(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = createHash('sha256');
      const stream = createReadStream(filePath);
      
      stream.on('error', reject);
      stream.on('data', chunk => hash.update(chunk));
      stream.on('end', () => resolve(hash.digest('hex')));
    });
  }

  private async pixelComparison(
    beforePath: string,
    afterPath: string,
    threshold: number
  ): Promise<Omit<ComparisonResult, 'beforeHash' | 'afterHash' | 'timestamp'>> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Create comparison HTML
      const comparisonHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            .container { display: flex; gap: 20px; flex-wrap: wrap; }
            .image-box { 
              flex: 1; 
              min-width: 300px;
              border: 2px solid #ccc;
              padding: 10px;
              border-radius: 8px;
            }
            .image-box h3 { margin-top: 0; color: #333; }
            img { max-width: 100%; height: auto; display: block; }
            .diff-container { 
              position: relative; 
              margin-top: 20px;
              border: 2px solid #ff6b6b;
              padding: 10px;
              border-radius: 8px;
            }
            .stats {
              margin-top: 20px;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 8px;
            }
            .identical { color: #28a745; font-weight: bold; }
            .different { color: #dc3545; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Screenshot Comparison</h1>
          <div class="container">
            <div class="image-box">
              <h3>Before</h3>
              <img id="before" src="${beforePath}" />
            </div>
            <div class="image-box">
              <h3>After</h3>
              <img id="after" src="${afterPath}" />
            </div>
          </div>
          <div class="diff-container">
            <h3>Difference Visualization</h3>
            <canvas id="diff"></canvas>
          </div>
          <div class="stats" id="stats"></div>
          <script>
            async function compareImages() {
              const beforeImg = document.getElementById('before');
              const afterImg = document.getElementById('after');
              const canvas = document.getElementById('diff');
              const ctx = canvas.getContext('2d');
              const stats = document.getElementById('stats');
              
              // Wait for images to load
              await Promise.all([
                new Promise(r => beforeImg.complete ? r() : beforeImg.onload = r),
                new Promise(r => afterImg.complete ? r() : afterImg.onload = r)
              ]);
              
              // Set canvas size
              canvas.width = beforeImg.naturalWidth;
              canvas.height = beforeImg.naturalHeight;
              
              // Draw images to canvas for pixel comparison
              const tempCanvas1 = document.createElement('canvas');
              const tempCanvas2 = document.createElement('canvas');
              tempCanvas1.width = tempCanvas2.width = canvas.width;
              tempCanvas1.height = tempCanvas2.height = canvas.height;
              
              const ctx1 = tempCanvas1.getContext('2d');
              const ctx2 = tempCanvas2.getContext('2d');
              
              ctx1.drawImage(beforeImg, 0, 0);
              ctx2.drawImage(afterImg, 0, 0);
              
              const data1 = ctx1.getImageData(0, 0, canvas.width, canvas.height);
              const data2 = ctx2.getImageData(0, 0, canvas.width, canvas.height);
              const diffData = ctx.createImageData(canvas.width, canvas.height);
              
              let diffPixels = 0;
              const totalPixels = canvas.width * canvas.height;
              
              for (let i = 0; i < data1.data.length; i += 4) {
                const r1 = data1.data[i];
                const g1 = data1.data[i + 1];
                const b1 = data1.data[i + 2];
                const r2 = data2.data[i];
                const g2 = data2.data[i + 1];
                const b2 = data2.data[i + 2];
                
                const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
                
                if (diff > 0) {
                  diffPixels++;
                  diffData.data[i] = 255; // Red for differences
                  diffData.data[i + 1] = 0;
                  diffData.data[i + 2] = 0;
                  diffData.data[i + 3] = 255;
                } else {
                  diffData.data[i] = data1.data[i];
                  diffData.data[i + 1] = data1.data[i + 1];
                  diffData.data[i + 2] = data1.data[i + 2];
                  diffData.data[i + 3] = 128; // Semi-transparent for unchanged
                }
              }
              
              ctx.putImageData(diffData, 0, 0);
              
              const percentage = (diffPixels / totalPixels) * 100;
              const identical = percentage < ${threshold};
              
              stats.innerHTML = \`
                <h3>Comparison Results</h3>
                <p>Status: <span class="\${identical ? 'identical' : 'different'}">\${identical ? 'IDENTICAL' : 'DIFFERENT'}</span></p>
                <p>Pixels Different: \${diffPixels.toLocaleString()} / \${totalPixels.toLocaleString()}</p>
                <p>Difference: \${percentage.toFixed(4)}%</p>
                <p>Threshold: ${threshold}%</p>
              \`;
              
              window.comparisonResult = {
                identical,
                differencePercentage: percentage,
                pixelsDifferent: diffPixels,
                totalPixels: totalPixels
              };
            }
            
            compareImages();
          </script>
        </body>
        </html>
      `;

      // Save comparison HTML
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const htmlPath = path.join(this.baseDir, 'diff', `comparison_${timestamp}.html`);
      await fs.mkdir(path.dirname(htmlPath), { recursive: true });
      await fs.writeFile(htmlPath, comparisonHtml);

      // Navigate to comparison page
      await page.goto(`file://${htmlPath}`);
      await page.waitForFunction(() => (window as any).comparisonResult !== undefined, { timeout: 10000 });

      // Get comparison results
      const result = await page.evaluate(() => (window as any).comparisonResult);

      // Take screenshot of comparison
      const diffImagePath = path.join(this.baseDir, 'diff', `diff_${timestamp}.png`);
      await page.screenshot({ path: diffImagePath, fullPage: true });

      return {
        identical: result.identical,
        differencePercentage: result.differencePercentage,
        diffImagePath,
        details: {
          pixelsDifferent: result.pixelsDifferent,
          totalPixels: result.totalPixels,
          threshold
        }
      };
    } finally {
      await browser.close();
    }
  }

  async generateComparisonReport(
    comparisons: ComparisonResult[],
    reportName: string
  ): Promise<string> {
    const reportPath = path.join(this.baseDir, 'diff', `${reportName}_report.json`);
    
    const report = {
      timestamp: new Date().toISOString(),
      totalComparisons: comparisons.length,
      identicalCount: comparisons.filter(c => c.identical).length,
      differentCount: comparisons.filter(c => !c.identical).length,
      comparisons: comparisons
    };

    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    return reportPath;
  }
}