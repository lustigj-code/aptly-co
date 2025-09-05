# 🎯 APTLY.CO PROJECT GUIDELINES - MANDATORY

## Project Context
This is the Aptly.co website redesign project. Aptly is an educational technology company that provides digital learning solutions. The website must strictly follow the Aptly Brand Guidelines 2024.

## 🚨 ABSOLUTE BRAND REQUIREMENTS

### Color Palette - USE ONLY THESE COLORS
```css
/* Primary Colors */
--navy: #0A004A;        /* Deep Navy - primary background */
--teal: #21A8B0;        /* Teal - primary accent */
--yellow: #FFDE00;      /* Yellow - highlights only */

/* Secondary Colors */
--light-navy: #3B336E;  /* Light Navy - secondary backgrounds */
--muted-teal: #69BCC1;  /* Muted Teal - subtle accents */
--light-teal: #DEF2F2;  /* Light Teal - light backgrounds */

/* Neutral Colors */
--white: #FFFFFF;       /* White - text on dark */
--light-grey: #E6E6E6;  /* Light Grey - borders */
--grey: #CCCCCC;        /* Grey - secondary text */
--rich-black: #333333;  /* Rich Black - text on light */
```

### Typography - DM SANS ONLY
- Font Family: 'DM Sans', sans-serif
- Weights: Regular (400), Medium (500), Bold (700)
- NEVER use any other font family
- Import from Google Fonts

### Logo Usage Rules
- Horizontal logo for headers
- Vertical logo for centered layouts
- Icon only for mobile/small spaces
- Minimum clearspace: equal to logo height
- Never alter colors or proportions

### Design Principles
1. **Professional & Clean**: No emojis, no playful elements
2. **Minimalist**: White space is essential
3. **Accessible**: WCAG AA compliance required
4. **Consistent**: 8px spacing grid system
5. **Modern**: Flat design, subtle shadows only

## ❌ STRICTLY FORBIDDEN

### Never Use:
- Emojis in code or content
- Non-brand colors or gradients
- Animated backgrounds (stars, particles, etc.)
- Non-DM Sans fonts
- Drop shadows (use subtle overlays only)
- Complex animations
- Rounded corners except where specified (buttons, cards)

## ✅ REQUIRED PATTERNS

### Component Structure
```tsx
// All components must use brand colors via CSS variables
className="bg-navy text-white"  // ✅ Correct
className="bg-[#0A0C2A]"        // ❌ Wrong - use exact brand color
```

### Spacing System (8px grid)
```css
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-6: 48px;
--space-8: 64px;
--space-10: 80px;
--space-12: 96px;
```

### Button Styles
- Rounded corners (border-radius: 24px)
- Primary: Navy background, white text
- Secondary: Teal background, white text
- Hover: 10% opacity increase
- No shadows, no gradients

### Image Treatment
- Rounded corners for photos (16px)
- Navy gradient overlay for text readability
- Professional photography only
- No stock illustrations unless brand-approved

## 🎨 GRADIENT USAGE

### Brand Gradient (Navy to Light Teal)
```css
background: linear-gradient(135deg, #0A004A 0%, #3B336E 25%, #21A8B0 50%, #69BCC1 75%, #DEF2F2 100%);
```
- Use sparingly for backgrounds
- Never for text (except subtle overlays)
- Always maintain high contrast

## 📐 LAYOUT RULES

### Container Widths
- Max width: 1280px
- Padding: 24px mobile, 48px desktop
- Consistent margins across all pages

### Grid System
- 12-column grid desktop
- 4-column grid tablet
- 2-column grid mobile
- Gap: 24px (3 spacing units)

## 🔧 DEVELOPMENT REQUIREMENTS

### File Naming
- Components: PascalCase.tsx
- Utilities: camelCase.ts
- Styles: kebab-case.css

### Component Guidelines
- Functional components only
- TypeScript strict mode
- Props interfaces required
- No inline styles

### Performance
- Images: Next.js Image component required
- Lazy loading for below-fold content
- Minimize JavaScript bundles
- No heavy animation libraries

## 📝 CONTENT TONE

### Voice & Tone
- Professional and authoritative
- Clear and concise
- Educational but accessible
- No casual language or slang
- No exclamation marks unless in CTAs

### Call-to-Action Text
- "Get Started" not "Start Now!"
- "Learn More" not "Check it Out"
- "View Courses" not "Browse Our Awesome Courses"

## 🚀 IMPLEMENTATION CHECKLIST

Before committing any changes:
- [ ] All colors match brand palette exactly
- [ ] Only DM Sans font is used
- [ ] No emojis in code or content
- [ ] Spacing follows 8px grid
- [ ] Components are accessible (ARIA labels, semantic HTML)
- [ ] Images use Next.js Image component
- [ ] No console.logs or debugging code
- [ ] TypeScript has no 'any' types
- [ ] Mobile responsive tested

## Priority Order
1. Brand consistency above all
2. Accessibility and usability
3. Performance optimization
4. Feature completeness

Remember: When in doubt, refer to the Aptly Brand Guidelines 2024 PDF.