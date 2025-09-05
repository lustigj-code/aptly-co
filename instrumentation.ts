import * as Sentry from "@sentry/nextjs";

export async function register() {
  // Only initialize Sentry in production
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      // Server configuration
      await import('./sentry.server.config');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      // Edge configuration
      await import('./sentry.edge.config');
    }
  }
}

export const onRequestError = Sentry.captureRequestError;