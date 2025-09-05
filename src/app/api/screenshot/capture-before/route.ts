import { NextRequest, NextResponse } from 'next/server';
import { ValidationWorkflow } from '@/utils/screenshot/validationWorkflow';

// Store workflow instances in memory (in production, use a proper session store)
const workflowInstances = new Map<string, ValidationWorkflow>();

export async function POST(request: NextRequest) {
  try {
    const { sessionId, pageName, url } = await request.json();
    
    if (!sessionId || !pageName || !url) {
      return NextResponse.json(
        { error: 'Session ID, page name, and URL are required' },
        { status: 400 }
      );
    }

    // Get or create workflow instance
    let workflow = workflowInstances.get(sessionId);
    if (!workflow) {
      workflow = new ValidationWorkflow();
      workflowInstances.set(sessionId, workflow);
      // Re-initialize the session
      await workflow.startValidationSession(sessionId);
    }

    // Build full URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

    // Capture before state
    await workflow.captureBeforeState(pageName, fullUrl, {
      waitForTimeout: 2000,
      fullPage: true
    });
    
    return NextResponse.json({ success: true, pageName });
  } catch (error) {
    console.error('Error capturing before state:', error);
    return NextResponse.json(
      { error: 'Failed to capture before state' },
      { status: 500 }
    );
  }
}