import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Performance Monitoring
    tracesSampleRate: 0.1,
    
    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
    
    // Filter sensitive data
    beforeSend(event, hint) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['x-api-key'];
        delete event.request.headers['cookie'];
      }
      
      // Remove sensitive data from error messages
      if (event.exception?.values) {
        event.exception.values = event.exception.values.map(value => ({
          ...value,
          value: value.value?.replace(/api[_-]?key["\s:=]+["']?[\w-]+["']?/gi, 'API_KEY_REDACTED')
        }));
      }
      
      return event;
    },
  });
}