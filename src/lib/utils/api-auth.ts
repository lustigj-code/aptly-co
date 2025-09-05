import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// For production, these should come from environment variables or a secure key management service
const API_KEY_HEADER = 'x-api-key';
const BEARER_TOKEN_HEADER = 'authorization';

// Simple API key validation (in production, use a database or secure storage)
const VALID_API_KEYS = new Set([
  process.env.INTERNAL_API_KEY || 'default-key-change-in-production'
]);

export interface AuthenticatedRequest extends NextRequest {
  userId?: string;
  apiKey?: string;
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  // In production, check against database or secure storage
  return VALID_API_KEYS.has(apiKey);
}

export async function validateBearerToken(token: string): Promise<{ valid: boolean; userId?: string }> {
  // In production, validate JWT or check against session store
  // For now, simple validation
  if (!token.startsWith('Bearer ')) {
    return { valid: false };
  }
  
  // Extract and validate token
  const tokenValue = token.substring(7);
  
  // TODO: Implement proper JWT validation
  // For now, return valid for non-empty tokens
  return {
    valid: tokenValue.length > 0,
    userId: 'user-' + crypto.randomBytes(8).toString('hex')
  };
}

export async function authenticateRequest(
  request: NextRequest
): Promise<{ authenticated: boolean; userId?: string; error?: string }> {
  // Check for API key
  const apiKey = request.headers.get(API_KEY_HEADER);
  if (apiKey) {
    const isValid = await validateApiKey(apiKey);
    if (isValid) {
      return { authenticated: true };
    }
    return { authenticated: false, error: 'Invalid API key' };
  }
  
  // Check for Bearer token
  const bearerToken = request.headers.get(BEARER_TOKEN_HEADER);
  if (bearerToken) {
    const { valid, userId } = await validateBearerToken(bearerToken);
    if (valid) {
      return { authenticated: true, userId };
    }
    return { authenticated: false, error: 'Invalid bearer token' };
  }
  
  return { authenticated: false, error: 'Missing authentication credentials' };
}

export function createAuthErrorResponse(error: string, status: number = 401): NextResponse {
  return NextResponse.json(
    {
      error,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}