import { ScreenshotUtility, ScreenshotOptions, ScreenshotResult } from './screenshotUtility';
import { ComparisonUtility, ComparisonResult } from './comparisonUtility';
import path from 'path';
import fs from 'fs/promises';

export interface ValidationSession {
  id: string;
  startTime: string;
  endTime?: string;
  status: 'in-progress' | 'completed' | 'failed';
  pages: ValidationPage[];
  summary?: ValidationSummary;
}

export interface ValidationPage {
  name: string;
  url: string;
  beforeScreenshots: ScreenshotResult[];
  afterScreenshots?: ScreenshotResult[];
  comparisons?: ComparisonResult[];
  status: 'pending' | 'captured-before' | 'captured-after' | 'compared';
}

export interface ValidationSummary {
  totalPages: number;
  totalScreenshots: number;
  identicalCount: number;
  changedCount: number;
  failedCount: number;
  reportPath?: string;
}

export class ValidationWorkflow {
  private screenshotUtil: ScreenshotUtility;
  private comparisonUtil: ComparisonUtility;
  private sessionsDir: string;
  private currentSession: ValidationSession | null = null;

  constructor(baseDir: string = path.join(process.cwd(), 'screenshots')) {
    this.screenshotUtil = new ScreenshotUtility(baseDir);
    this.comparisonUtil = new ComparisonUtility(baseDir);
    this.sessionsDir = path.join(baseDir, 'sessions');
  }

  async startValidationSession(sessionName: string): Promise<string> {
    await fs.mkdir(this.sessionsDir, { recursive: true });
    
    const sessionId = `${sessionName}_${Date.now()}`;
    this.currentSession = {
      id: sessionId,
      startTime: new Date().toISOString(),
      status: 'in-progress',
      pages: []
    };

    await this.saveSession();
    await this.screenshotUtil.initialize();
    
    return sessionId;
  }

  async captureBeforeState(
    pageName: string,
    url: string,
    options: ScreenshotOptions = {}
  ): Promise<void> {
    if (!this.currentSession) {
      throw new Error('No active validation session');
    }

    // Capture screenshots for multiple viewports
    const viewports = [
      ScreenshotUtility.VIEWPORTS.desktop,
      ScreenshotUtility.VIEWPORTS.laptop,
      ScreenshotUtility.VIEWPORTS.tablet,
      ScreenshotUtility.VIEWPORTS.mobile
    ];

    const screenshots = await this.screenshotUtil.captureMultipleViewports(
      url,
      'before',
      pageName,
      viewports
    );

    this.currentSession.pages.push({
      name: pageName,
      url,
      beforeScreenshots: screenshots,
      status: 'captured-before'
    });

    await this.saveSession();
  }

  async captureAfterState(
    pageName: string,
    options: ScreenshotOptions = {}
  ): Promise<ComparisonResult[]> {
    if (!this.currentSession) {
      throw new Error('No active validation session');
    }

    const page = this.currentSession.pages.find(p => p.name === pageName);
    if (!page) {
      throw new Error(`Page ${pageName} not found in current session`);
    }

    if (page.status !== 'captured-before') {
      throw new Error(`Before state not captured for page ${pageName}`);
    }

    // Capture after screenshots with same viewports
    const viewports = [
      ScreenshotUtility.VIEWPORTS.desktop,
      ScreenshotUtility.VIEWPORTS.laptop,
      ScreenshotUtility.VIEWPORTS.tablet,
      ScreenshotUtility.VIEWPORTS.mobile
    ];

    const afterScreenshots = await this.screenshotUtil.captureMultipleViewports(
      page.url,
      'after',
      pageName,
      viewports
    );

    page.afterScreenshots = afterScreenshots;

    // Compare before and after
    const comparisons: ComparisonResult[] = [];
    
    for (let i = 0; i < page.beforeScreenshots.length; i++) {
      const beforeShot = page.beforeScreenshots[i];
      const afterShot = afterScreenshots[i];
      
      const comparison = await this.comparisonUtil.compareScreenshots(
        beforeShot.filePath,
        afterShot.filePath,
        0.01 // 1% threshold
      );
      
      comparisons.push(comparison);
    }

    page.comparisons = comparisons;
    page.status = 'compared';

    await this.saveSession();
    
    return comparisons;
  }

  async completeSession(): Promise<ValidationSummary> {
    if (!this.currentSession) {
      throw new Error('No active validation session');
    }

    let identicalCount = 0;
    let changedCount = 0;
    let totalScreenshots = 0;

    for (const page of this.currentSession.pages) {
      if (page.comparisons) {
        totalScreenshots += page.comparisons.length;
        identicalCount += page.comparisons.filter(c => c.identical).length;
        changedCount += page.comparisons.filter(c => !c.identical).length;
      }
    }

    const summary: ValidationSummary = {
      totalPages: this.currentSession.pages.length,
      totalScreenshots,
      identicalCount,
      changedCount,
      failedCount: this.currentSession.pages.filter(p => p.status === 'pending').length
    };

    // Generate final report
    const allComparisons = this.currentSession.pages
      .flatMap(p => p.comparisons || []);
    
    if (allComparisons.length > 0) {
      summary.reportPath = await this.comparisonUtil.generateComparisonReport(
        allComparisons,
        this.currentSession.id
      );
    }

    this.currentSession.endTime = new Date().toISOString();
    this.currentSession.status = 'completed';
    this.currentSession.summary = summary;

    await this.saveSession();
    await this.screenshotUtil.cleanup();

    const session = this.currentSession;
    this.currentSession = null;
    
    return summary;
  }

  async loadSession(sessionId: string): Promise<ValidationSession> {
    const sessionPath = path.join(this.sessionsDir, `${sessionId}.json`);
    const data = await fs.readFile(sessionPath, 'utf-8');
    return JSON.parse(data);
  }

  async listSessions(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.sessionsDir);
      return files
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
    } catch (error) {
      return [];
    }
  }

  private async saveSession(): Promise<void> {
    if (!this.currentSession) return;
    
    const sessionPath = path.join(this.sessionsDir, `${this.currentSession.id}.json`);
    await fs.writeFile(sessionPath, JSON.stringify(this.currentSession, null, 2));
  }

  // Quick validation for single page
  async quickValidate(
    pageName: string,
    url: string,
    changeFunction: () => Promise<void>
  ): Promise<ComparisonResult[]> {
    const sessionId = await this.startValidationSession(`quick_${pageName}`);
    
    try {
      // Capture before
      await this.captureBeforeState(pageName, url);
      
      // Apply changes
      await changeFunction();
      
      // Capture after and compare
      const comparisons = await this.captureAfterState(pageName);
      
      // Complete session
      await this.completeSession();
      
      return comparisons;
    } catch (error) {
      this.currentSession!.status = 'failed';
      await this.saveSession();
      throw error;
    }
  }
}