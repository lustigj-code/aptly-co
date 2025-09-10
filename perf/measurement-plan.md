# Performance Measurement Plan

## Overview
This document defines the performance measurement strategy for aptly.co, including Lighthouse audit commands, report storage, and measurement procedures.

## Targets
- **Live**: https://aptly.co (all key pages)
- **Local**: http://localhost:3000 (development server)

## Core Web Vitals & Metrics
- **LCP** (Largest Contentful Paint) ≤ 2.5s
- **CLS** (Cumulative Layout Shift) ≤ 0.1
- **INP** (Interaction to Next Paint) ≤ 200ms
- **Lighthouse Categories**: Performance, Accessibility, Best Practices, SEO

## Lighthouse Commands

### Production Testing
```bash
# Homepage
lighthouse https://aptly.co \
  --output=json,html \
  --output-path=perf/lh/prod-homepage \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo

# Services page
lighthouse https://aptly.co/services \
  --output=json,html \
  --output-path=perf/lh/prod-services \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo

# About page
lighthouse https://aptly.co/about \
  --output=json,html \
  --output-path=perf/lh/prod-about \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo

# Success page
lighthouse https://aptly.co/success \
  --output=json,html \
  --output-path=perf/lh/prod-success \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo
```

### Local Development Testing
```bash
# Start dev server first: npm run dev
# Homepage
lighthouse http://localhost:3000 \
  --output=json,html \
  --output-path=perf/lh/local-homepage \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo

# Other pages follow same pattern with appropriate URLs
```

### Mobile Performance Testing
```bash
lighthouse https://aptly.co \
  --output=json,html \
  --output-path=perf/lh/mobile-homepage \
  --chrome-flags="--headless" \
  --emulated-form-factor=mobile \
  --throttling-method=simulate
```

## Report Storage Structure
```
perf/lh/
├── prod-homepage.{html,json}
├── prod-services.{html,json}
├── prod-about.{html,json}
├── prod-success.{html,json}
├── local-homepage.{html,json}
├── local-services.{html,json}
├── mobile-homepage.{html,json}
└── archive/YYYY-MM-DD/
```

## Measurement Procedures

### Pre-Deployment
1. Start local dev server (`npm run dev`)
2. Run local Lighthouse audits
3. Verify thresholds are met
4. Address failing metrics

### Post-Deployment
1. Wait 5 minutes for CDN propagation
2. Run production audits
3. Compare against baselines
4. Archive reports with timestamp

### Regular Monitoring
- Weekly automated production audits
- Monthly comprehensive audits including mobile
- Threshold violation alerts

