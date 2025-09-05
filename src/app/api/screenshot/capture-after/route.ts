import { NextRequest, NextResponse } from 'next/server';
import { ValidationWorkflow } from '@/utils/screenshot/validationWorkflow';

// Share the same workflow instances
const workflowInstances = new Map<string, ValidationWorkflow>();

export async function POST(request: NextRequest) {
  try {
    const { sessionId, pageName } = await request.json();
    
    if (!sessionId || !pageName) {
      return NextResponse.json(
        { error: 'Session ID and page name are required' },
        { status: 400 }
      );
    }

    // Get workflow instance
    const workflow = workflowInstances.get(sessionId);
    if (!workflow) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Capture after state and get comparisons
    const comparisons = await workflow.captureAfterState(pageName);
    
    // Format results for frontend
    const results = comparisons.map((comp, index) => ({
      page: pageName,
      viewport: ['desktop', 'laptop', 'tablet', 'mobile'][index],
      identical: comp.identical,
      differencePercentage: comp.differencePercentage,
      diffPath: comp.diffImagePath
    }));
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error capturing after state:', error);
    return NextResponse.json(
      { error: 'Failed to capture after state' },
      { status: 500 }
    );
  }
}

// Cleanup old workflow instances periodically
if (typeof global !== 'undefined' && !(global as any).screenshotCleanupInterval) {
  (global as any).screenshotCleanupInterval = setInterval(() => {
    // Remove workflow instances older than 30 minutes
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    Array.from(workflowInstances.entries()).forEach(([sessionId, workflow]) => {
      if (sessionId.includes('_') && parseInt(sessionId.split('_').pop() || '0') < thirtyMinutesAgo) {
        workflow.completeSession().catch(console.error);
        workflowInstances.delete(sessionId);
      }
    });
  }, 10 * 60 * 1000); // Run every 10 minutes
}