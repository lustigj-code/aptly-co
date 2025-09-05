import * as Sentry from "@sentry/nextjs";

// Export the router transition hook as required by Sentry
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Performance Monitoring
    tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
    
    // Session Replay
    replaysSessionSampleRate: 0.1, // Sample 10% of sessions
    replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
    
    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
    
    // Integrations
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: false,
      }),
    ],
    
    // Filter out known issues
    beforeSend(event, hint) {
      // Filter out known non-critical errors
      if (event.exception?.values?.[0]?.value?.includes('ResizeObserver loop')) {
        return null;
      }
      
      // Don't send events in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Sentry Event:', event, hint);
        return null;
      }
      
      return event;
    },
  });
}