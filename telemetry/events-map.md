# Telemetry Events Map

## Overview
Defines telemetry event taxonomy, PII policies, and instrumentation for aptly.co analytics and error monitoring.

## Event Naming Convention
All events use kebab-case: `category-action-object`

## PII Policy
- **NO PII COLLECTION**: No emails, names, phone numbers, IP addresses
- **ANONYMOUS ONLY**: User interactions, performance metrics, error data
- **HASHED IDS**: Session identifiers only (anonymized)

## Core Events

### Page Navigation
```javascript
// page-view
{
  event: 'page-view',
  page_path: '/services',
  referrer_domain: 'google.com',  // domain only
  session_id: 'hash_abc123'       // anonymized
}

// page-exit  
{
  event: 'page-exit',
  page_path: '/about',
  time_on_page_seconds: 45,
  scroll_depth_percent: 85
}
```

### User Interactions
```javascript
// button-click
{
  event: 'button-click',
  button_id: 'cta-get-started',
  button_text: 'Get Started',
  page_path: '/',
  section: 'hero'
}

// form-submit
{
  event: 'form-submit',
  form_id: 'contact-form',
  form_valid: true,              // boolean only, no data
  submission_time_seconds: 120
}

// nav-click
{
  event: 'nav-click',
  nav_item: 'services',
  nav_type: 'header',            // header, footer, mobile
  destination_path: '/services'
}
```

### Performance & Errors
```javascript
// performance-metric
{
  event: 'performance-metric',
  metric_name: 'LCP',
  metric_value: 2.3,             // seconds
  page_path: '/',
  device_type: 'desktop'         // desktop, mobile, tablet
}

// error-boundary
{
  event: 'error-boundary',
  error_type: 'javascript',      // javascript, network, render
  error_component: 'ContactForm',
  page_path: '/contact'
}
```

## Instrumentation Sources

### Next.js Instrumentation
- `instrumentation.ts` - Server-side telemetry setup
- `instrumentation-client.ts` - Client-side tracking

### Error Monitoring  
- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking

### Analytics Configuration
- Google Analytics 4 integration
- Custom event tracking utilities
- Performance monitoring setup

## Event Categories

### Business Metrics
- `page-view` - Page popularity tracking
- `form-submit` - Conversion funnel monitoring
- `cta-click` - Call-to-action performance
- `nav-click` - Navigation pattern analysis

### Technical Metrics
- `performance-metric` - Core Web Vitals tracking  
- `error-boundary` - Application stability
- `resource-load` - Asset loading performance
- `api-response` - Backend performance

### User Experience
- `scroll-milestone` - Content engagement depth
- `content-interaction` - Content engagement tracking
- `mobile-menu-toggle` - Mobile UX interactions

## Data Retention & Privacy

### Retention Periods
- Analytics: 26 months (GA4 default)
- Error logs: 90 days (Sentry)
- Performance: 13 months
- Sessions: 30 minutes inactivity

### Privacy Compliance
- No PII collection
- Cookie consent implementation
- GDPR/CCPA compliant handling
- Vendor data processing agreements

## Monitoring & Alerting

### Performance Alerts
- LCP > 4s → Immediate notification
- Error rate > 1% → Daily summary
- Form conversion < 2% → Weekly review

### Validation Checklist
- [ ] Sentry DSN configured per environment
- [ ] GA4 measurement ID set
- [ ] Sampling rates configured (10% for performance)
- [ ] PII scrubbing enabled in beforeSend hooks
- [ ] Cookie consent integration active

