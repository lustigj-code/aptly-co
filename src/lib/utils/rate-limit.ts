import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create Redis client
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Create rate limiters
export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, '1 m'), // 60 requests per minute
      analytics: true,
      prefix: 'aptly:api',
    })
  : null;

export const authRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 minutes
      analytics: true,
      prefix: 'aptly:auth',
    })
  : null;

export const uploadRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(10, '1 h'), // 10 uploads per hour
      analytics: true,
      prefix: 'aptly:upload',
    })
  : null;

// Fallback in-memory rate limiter for development
const inMemoryStore = new Map<string, { count: number; reset: number }>();

export async function checkRateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60000,
  prefix: string = 'api'
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  // Use Upstash if available
  if (apiRateLimit && redis) {
    const { success, limit: rateLimitLimit, remaining, reset } = await apiRateLimit.limit(identifier);
    return { success, limit: rateLimitLimit, remaining, reset };
  }
  
  // Fallback to in-memory rate limiting
  const now = Date.now();
  const key = `${prefix}:${identifier}`;
  const record = inMemoryStore.get(key);
  
  if (!record || record.reset < now) {
    inMemoryStore.set(key, { count: 1, reset: now + windowMs });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }
  
  if (record.count >= limit) {
    return { success: false, limit, remaining: 0, reset: record.reset };
  }
  
  record.count++;
  return { success: true, limit, remaining: limit - record.count, reset: record.reset };
}

// Helper function to get client identifier
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  // Priority: CF-Connecting-IP > X-Forwarded-For > X-Real-IP
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a generic identifier
  return 'anonymous';
}

// Middleware helper for API routes
export async function withRateLimit(
  request: Request,
  handler: () => Promise<Response>,
  options: {
    limit?: number;
    window?: number;
    identifier?: string;
  } = {}
): Promise<Response> {
  const identifier = options.identifier || getClientIdentifier(request);
  const { success, limit, remaining, reset } = await checkRateLimit(
    identifier,
    options.limit,
    options.window
  );
  
  if (!success) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(reset).toISOString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }
  
  // Execute handler and add rate limit headers to response
  const response = await handler();
  
  // Clone response to add headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('X-RateLimit-Limit', limit.toString());
  newResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
  newResponse.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());
  
  return newResponse;
}