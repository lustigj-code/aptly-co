# Accessibility & Brand Compliance QA Plan

## Test Targets

### Pages to Test
| Route | Page | Priority | Notes |
|-------|------|----------|-------|
| `/` | Homepage | Critical | Primary landing, hero section |
| `/about` | About | High | Company info, team |
| `/services` | Services | Critical | Core offering |
| `/courses` | Courses | Critical | Product catalog |
| `/programs` | Programs | High | Educational offerings |
| `/study-app` | Study App | High | Product feature |
| `/success` | Success Stories | Medium | Social proof |
| `/insights` | Insights | Medium | Blog/content |
| `/insights/[slug]` | Article Detail | Medium | Dynamic content |
| `/business` | Business | High | B2B offering |
| `/careers` | Careers | Medium | Recruitment |
| `/contact` | Contact | High | Lead generation |
| `/faq` | FAQ | Low | Support |
| `/privacy` | Privacy Policy | Low | Legal |
| `/terms` | Terms | Low | Legal |

### Element Selectors for Testing

#### Navigation & Structure
```css
/* Primary Navigation */
.navbar, nav[role="navigation"]
.navbar a, .nav-link
.mobile-menu

/* Footer */
footer, .footer
footer a, .footer-link
```

#### Interactive Elements
```css
/* Buttons */
.btn-primary         /* Navy background, white text */
.btn-secondary       /* Teal background, white text */
.btn-outline         /* Border variant */
button[type="submit"]

/* Form Controls */
input[type="text"], input[type="email"]
textarea
select
.form-group label
.error-message
```

#### Content Components
```css
/* Cards */
.card, .card-standard
.card-header, .card-body
.testimonial-card
.service-card

/* Typography */
h1, .h1, .text-4xl, .text-5xl, .text-6xl    /* Large headings ≥24px */
h2, .h2, .text-3xl                          /* Sub headings ≥19px */
h3, .h3, .text-2xl
h4, h5, h6
p, .text-base                               /* Body text <18px */
.text-sm, .text-xs                          /* Small text */
a:not([class])                              /* Inline links */
```

#### Brand-Specific Elements
```css
/* Logo & Branding */
.logo, .brand-logo
.hero-section
.trust-section
.gradient-background

/* Color-Critical Components */
.bg-navy, .text-white
.bg-teal, .bg-light-teal
.bg-light-navy
.text-navy, .text-teal
```

## WCAG AA Compliance Thresholds

### Color Contrast Requirements
- **Normal text (<18px or <14px bold)**: 4.5:1 minimum ratio
- **Large text (≥18px regular or ≥14px bold)**: 3.0:1 minimum ratio
- **UI components & focus indicators**: 3.0:1 minimum ratio

### Focus Management
- All interactive elements must have visible focus indicators
- Focus order must be logical and predictable
- Skip links for keyboard navigation
- No focus traps except in modals

### Semantic Structure
- Proper heading hierarchy (h1 → h2 → h3...)
- Form labels properly associated
- Alt text for all informative images
- ARIA landmarks for page regions

## Brand Color Matrix Testing

### Primary Combinations to Verify
| Background | Text Color | Expected Result | Min Ratio | Use Case |
|------------|------------|-----------------|-----------|----------|
| Navy (#0A004A) | White (#FFFFFF) | ✅ PASS | 4.5:1 | Primary buttons, hero |
| Navy (#0A004A) | Light Teal (#DEF2F2) | ⚠️ VERIFY | 4.5:1 | Secondary text |
| Light Navy (#3B336E) | White (#FFFFFF) | ✅ PASS | 4.5:1 | Cards, sections |
| Light Navy (#3B336E) | Teal (#21A8B0) | ⚠️ VERIFY | 4.5:1 | Accent text |
| White (#FFFFFF) | Navy (#0A004A) | ✅ PASS | 4.5:1 | Body text |
| White (#FFFFFF) | Rich Black (#333333) | ✅ PASS | 4.5:1 | Primary text |
| White (#FFFFFF) | Teal (#21A8B0) | ⚠️ VERIFY | 3.0:1 | Large headings only |
| Teal (#21A8B0) | White (#FFFFFF) | ✅ PASS | 3.0:1 | CTA buttons |
| Light Teal (#DEF2F2) | Navy (#0A004A) | ✅ PASS | 4.5:1 | Cards with dark text |

### Focus States to Test
| Element | Default State | Focus State | Hover State |
|---------|---------------|-------------|-------------|
| Primary Button | Navy bg, White text | Navy bg + outline | Navy bg + opacity |
| Secondary Button | Teal bg, White text | Teal bg + outline | Teal bg + opacity |
| Navigation Links | Navy/White text | Underline + outline | Teal color |
| Form Inputs | Grey border | Navy outline | Navy border |

## Manual Testing Checklist

### Keyboard Navigation
- [ ] Tab order follows visual layout
- [ ] All interactive elements reachable
- [ ] Focus visible on all elements
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys work in menus

### Screen Reader Testing
- [ ] Page title descriptive
- [ ] Heading structure logical
- [ ] Form labels announced
- [ ] Button purposes clear
- [ ] Image alt text meaningful
- [ ] Status messages announced

### Mobile Accessibility
- [ ] Touch targets ≥44px
- [ ] Text scales properly
- [ ] Horizontal scrolling avoided
- [ ] Form inputs accessible
- [ ] Navigation usable

## Automated Testing Strategy

### Axe-Core via Playwright
- Test all target pages with @axe-core/playwright
- Generate JSON reports for each page
- Focus on violations, incomplete tests, and passes
- Export results to `qa/axe/` directory

### Visual Regression
- Capture brand color reference screenshots
- Test focus states and hover interactions
- Verify consistent spacing and typography
- Store baseline images in `qa/visual/`

### Performance Impact
- Test with accessibility tree enabled
- Measure impact of ARIA labels and descriptions
- Verify screen reader compatibility doesn't slow rendering

## Exit Criteria

### Zero Critical Violations
- No WCAG Level A or AA violations on critical pages
- All color contrast ratios meet minimum thresholds
- All interactive elements keyboard accessible
- All form controls properly labeled

### Brand Compliance
- All text/background combinations verified compliant
- Focus indicators consistent with brand guidelines
- UI components maintain accessibility at all breakpoints
- No accessibility-specific color deviations from brand palette

### Documentation Complete
- All test results documented in QA reports
- Contrast calculations verified and recorded
- Manual test evidence captured
- Remediation recommendations provided for any issues