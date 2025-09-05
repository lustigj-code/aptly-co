import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const runtime = 'edge';

interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    database?: {
      status: 'ok' | 'error';
      latency?: number;
      error?: string;
    };
    redis?: {
      status: 'ok' | 'error';
      latency?: number;
      error?: string;
    };
    external_apis?: {
      status: 'ok' | 'error';
      services?: {
        openai?: boolean;
        anthropic?: boolean;
        deepgram?: boolean;
        replicate?: boolean;
      };
    };
  };
  environment: {
    node_version: string;
    deployment: string;
    region?: string;
  };
}

// Track application start time
const startTime = Date.now();

async function checkRedis(): Promise<{ status: 'ok' | 'error'; latency?: number; error?: string }> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return { status: 'error', error: 'Redis not configured' };
  }
  
  const start = Date.now();
  try {
    const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/ping`, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });
    
    if (response.ok) {
      return { status: 'ok', latency: Date.now() - start };
    }
    return { status: 'error', error: `Redis responded with ${response.status}` };
  } catch (error) {
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function checkExternalAPIs(): Promise<{ status: 'ok' | 'error'; services?: any }> {
  const services = {
    openai: !!process.env.OPENAI_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    deepgram: !!process.env.DEEPGRAM_API_KEY,
    replicate: !!process.env.REPLICATE_API_TOKEN,
  };
  
  const allConfigured = Object.values(services).every(v => v);
  
  return {
    status: allConfigured ? 'ok' : 'error',
    services,
  };
}

export async function GET(request: NextRequest) {
  const headersList = headers();
  const isInternalCheck = headersList.get('x-health-check-internal') === 'true';
  
  // Basic health check for load balancers
  if (!isInternalCheck) {
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }
  
  // Detailed health check for internal monitoring
  const checks: HealthCheckResponse['checks'] = {};
  
  // Check Redis if available
  if (process.env.UPSTASH_REDIS_REST_URL) {
    checks.redis = await checkRedis();
  }
  
  // Check external API configuration
  checks.external_apis = await checkExternalAPIs();
  
  // Determine overall health status
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  
  if (checks.redis?.status === 'error') {
    overallStatus = 'degraded';
  }
  
  if (checks.external_apis?.status === 'error') {
    overallStatus = overallStatus === 'degraded' ? 'unhealthy' : 'degraded';
  }
  
  const response: HealthCheckResponse = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown',
    uptime: Date.now() - startTime,
    checks,
    environment: {
      node_version: process.version,
      deployment: process.env.VERCEL_ENV || 'local',
      region: process.env.VERCEL_REGION,
    },
  };
  
  const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503;
  
  return NextResponse.json(response, { 
    status: statusCode,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}