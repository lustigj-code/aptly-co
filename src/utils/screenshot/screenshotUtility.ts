import { chromium, Page, Browser, BrowserContext } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { createHash } from 'crypto';

export interface ScreenshotOptions {
  fullPage?: boolean;
  viewport?: { width: number; height: number };
  waitForSelector?: string;
  waitForTimeout?: number;
  clip?: { x: number; y: number; width: number; height: number };
  omitBackground?: boolean;
  deviceScaleFactor?: number;
}

export interface ScreenshotResult {
  filePath: string;
  timestamp: string;
  url: string;
  hash: string;
  metadata: {
    viewport: { width: number; height: number };
    fullPage: boolean;
    deviceScaleFactor: number;
  };
}

export class ScreenshotUtility {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private baseDir: string;

  constructor(baseDir: string = path.join(process.cwd(), 'screenshots')) {
    this.baseDir = baseDir;
  }

  async initialize(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });
  }

  async captureScreenshot(
    url: string,
    category: 'before' | 'after' | 'diff' | 'history',
    pageName: string,
    options: ScreenshotOptions = {}
  ): Promise<ScreenshotResult> {
    if (!this.browser || !this.context) {
      await this.initialize();
    }

    const page = await this.context!.newPage();
    
    try {
      // Set viewport if specified
      if (options.viewport) {
        await page.setViewportSize(options.viewport);
      }

      // Navigate to URL
      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for specific selector if provided
      if (options.waitForSelector) {
        await page.waitForSelector(options.waitForSelector, { timeout: 30000 });
      }

      // Wait for additional timeout if specified
      if (options.waitForTimeout) {
        await page.waitForTimeout(options.waitForTimeout);
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${pageName}_${timestamp}.png`;
      const filePath = path.join(this.baseDir, category, filename);

      // Ensure directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Take screenshot
      const screenshotBuffer = await page.screenshot({
        path: filePath,
        fullPage: options.fullPage ?? true,
        clip: options.clip,
        omitBackground: options.omitBackground ?? false,
        type: 'png'
      });

      // Calculate hash for comparison
      const hash = createHash('sha256').update(screenshotBuffer).digest('hex');

      // Get viewport info
      const viewport = page.viewportSize() || { width: 1920, height: 1080 };

      const result: ScreenshotResult = {
        filePath,
        timestamp,
        url,
        hash,
        metadata: {
          viewport,
          fullPage: options.fullPage ?? true,
          deviceScaleFactor: options.deviceScaleFactor ?? 2
        }
      };

      // Save metadata
      await this.saveMetadata(result, category, pageName);

      return result;
    } finally {
      await page.close();
    }
  }

  async captureMultipleViewports(
    url: string,
    category: 'before' | 'after' | 'diff' | 'history',
    pageName: string,
    viewports: Array<{ width: number; height: number; name: string }>
  ): Promise<ScreenshotResult[]> {
    const results: ScreenshotResult[] = [];

    for (const viewport of viewports) {
      const result = await this.captureScreenshot(
        url,
        category,
        `${pageName}_${viewport.name}`,
        { viewport, fullPage: true }
      );
      results.push(result);
    }

    return results;
  }

  private async saveMetadata(
    result: ScreenshotResult,
    category: string,
    pageName: string
  ): Promise<void> {
    const metadataPath = path.join(this.baseDir, category, `${pageName}_metadata.json`);
    
    let existingMetadata: ScreenshotResult[] = [];
    try {
      const data = await fs.readFile(metadataPath, 'utf-8');
      existingMetadata = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet
    }

    existingMetadata.push(result);
    
    // Keep only last 10 entries
    if (existingMetadata.length > 10) {
      existingMetadata = existingMetadata.slice(-10);
    }

    await fs.writeFile(metadataPath, JSON.stringify(existingMetadata, null, 2));
  }

  async cleanup(): Promise<void> {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
    this.context = null;
    this.browser = null;
  }

  // Standard viewport configurations
  static readonly VIEWPORTS = {
    desktop: { width: 1920, height: 1080, name: 'desktop' },
    laptop: { width: 1366, height: 768, name: 'laptop' },
    tablet: { width: 768, height: 1024, name: 'tablet' },
    mobile: { width: 375, height: 812, name: 'mobile' }
  };
}