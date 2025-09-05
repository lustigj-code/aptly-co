'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    
    // Report to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, {
        tags: {
          location: 'app-error-boundary',
          digest: error.digest,
        },
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0C2A]">
      <div className="text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-[#7AB8BD]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-xl text-white/70 mb-8">
          We encountered an unexpected error. Don&apos;t worry, our team has been notified.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#7AB8BD] hover:bg-[#6BB3C3] text-white font-semibold rounded-full transition-colors duration-200"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-colors duration-200"
          >
            Go Home
          </Link>
        </div>
        
        {error.digest && (
          <p className="mt-8 text-sm text-white/50">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}