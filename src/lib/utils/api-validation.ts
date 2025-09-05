import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export function createValidationErrorResponse(errors: any): NextResponse {
  return NextResponse.json(
    {
      error: 'Validation failed',
      details: errors,
      timestamp: new Date().toISOString(),
    },
    { status: 400 }
  );
}

export async function validateRequestBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ valid: boolean; data?: T; errors?: any }> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (result.success) {
      return { valid: true, data: result.data };
    }
    
    return { valid: false, errors: result.error.format() };
  } catch (error) {
    return { 
      valid: false, 
      errors: { 
        _errors: ['Invalid JSON in request body'] 
      } 
    };
  }
}

// Common validation schemas
export const ChatMessageSchema = z.object({
  message: z.string().min(1).max(10000),
  conversationId: z.string().optional(),
  model: z.string().optional(),
});

export const TranscriptionSchema = z.object({
  audio: z.string(), // Base64 encoded audio
  language: z.string().optional(),
});

export const ImageGenerationSchema = z.object({
  prompt: z.string().min(1).max(1000),
  width: z.number().min(64).max(2048).optional(),
  height: z.number().min(64).max(2048).optional(),
});

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Rate limiting helper
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

// Simple in-memory rate limiter (use Redis in production)
const rateLimitStore = new Map<string, { count: number; reset: number }>();

export function checkRateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now();
  const reset = now + windowMs;
  
  const current = rateLimitStore.get(identifier);
  
  if (!current || current.reset < now) {
    rateLimitStore.set(identifier, { count: 1, reset });
    return { allowed: true, remaining: limit - 1, reset };
  }
  
  if (current.count >= limit) {
    return { allowed: false, remaining: 0, reset: current.reset };
  }
  
  current.count++;
  return { allowed: true, remaining: limit - current.count, reset: current.reset };
}