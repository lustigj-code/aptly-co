'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface AnalyticsProps {
  trackingId?: string;
  nonce?: string;
}

export default function Analytics({ trackingId, nonce }: AnalyticsProps) {
  useEffect(() => {
    if (!trackingId || typeof window === 'undefined') return;

    // Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    if (nonce) {
      script2.setAttribute('nonce', nonce);
    }
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `;
    document.head.appendChild(script2);

    // Track performance metrics
    if ('performance' in window && 'observer' in window.PerformanceObserver.prototype) {
      // Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            window.gtag('event', 'LCP', {
              value: Math.round(entry.startTime),
              custom_parameter: 'core_web_vitals',
            });
          }
          
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any;
            window.gtag('event', 'FID', {
              value: Math.round(fidEntry.processingStart - fidEntry.startTime),
              custom_parameter: 'core_web_vitals',
            });
          }
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      observer.observe({ type: 'first-input', buffered: true });
    }

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll(`script[src*="${trackingId}"]`);
      scripts.forEach(script => script.remove());
    };
  }, [trackingId, nonce]);

  return null;
}