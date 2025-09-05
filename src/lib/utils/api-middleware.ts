import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, createAuthErrorResponse } from './api-auth';
import { validateRequestBody, createValidationErrorResponse, checkRateLimit } from './api-validation';
import { z } from 'zod';

export interface ApiHandlerOptions<T = any> {
  requireAuth?: boolean;
  schema?: z.ZodSchema<T>;
  rateLimit?: {
    limit: number;
    windowMs: number;
  };
}

export type ApiHandler<T = any> = (
  request: NextRequest,
  context: {
    params?: any;
    userId?: string;
    body?: T;
  }
) => Promise<NextResponse>;

export function withApiMiddleware<T = any>(
  handler: ApiHandler<T>,
  options: ApiHandlerOptions<T> = {}
): ApiHandler {
  return async (request: NextRequest, context: any) => {
    try {
      // Authentication check
      if (options.requireAuth) {
        const authResult = await authenticateRequest(request);
        if (!authResult.authenticated) {
          return createAuthErrorResponse(authResult.error || 'Unauthorized');
        }
        context = { ...context, userId: authResult.userId };
      }
      
      // Rate limiting
      if (options.rateLimit) {
        const identifier = context.userId || request.ip || 'anonymous';
        const rateLimitResult = checkRateLimit(
          identifier,
          options.rateLimit.limit,
          options.rateLimit.windowMs
        );
        
        if (!rateLimitResult.allowed) {
          return NextResponse.json(
            {
              error: 'Rate limit exceeded',
              retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
            },
            { 
              status: 429,
              headers: {
                'X-RateLimit-Limit': options.rateLimit.limit.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': rateLimitResult.reset.toString(),
              }
            }
          );
        }
      }
      
      // Request body validation
      if (options.schema && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
        const validationResult = await validateRequestBody(request, options.schema);
        if (!validationResult.valid) {
          return createValidationErrorResponse(validationResult.errors);
        }
        context = { ...context, body: validationResult.data };
      }
      
      // Call the actual handler
      const response = await handler(request, context);
      
      // Add security headers to response
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      
      return response;
    } catch (error) {
      console.error('API error:', error);
      
      // Don't expose internal errors in production
      const isDev = process.env.NODE_ENV === 'development';
      
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: isDev && error instanceof Error ? error.message : undefined,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  };
}