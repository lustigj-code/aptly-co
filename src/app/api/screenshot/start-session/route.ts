import { NextRequest, NextResponse } from 'next/server';
import { ValidationWorkflow } from '@/utils/screenshot/validationWorkflow';

export async function POST(request: NextRequest) {
  try {
    const { name, pages } = await request.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'Session name is required' },
        { status: 400 }
      );
    }

    const workflow = new ValidationWorkflow();
    const sessionId = await workflow.startValidationSession(name);
    
    // Store session info in memory or database if needed
    // For now, we'll just return the session ID
    
    return NextResponse.json({ sessionId, pages });
  } catch (error) {
    console.error('Error starting screenshot session:', error);
    return NextResponse.json(
      { error: 'Failed to start screenshot session' },
      { status: 500 }
    );
  }
}