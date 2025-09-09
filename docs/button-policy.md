# Button Policy

**Date**: 2024-09-09  
**Version**: 1.0  
**Purpose**: Define button variants, sizes, and interaction standards for the Aptly brand

## Overview

This document establishes comprehensive button standards based on the Aptly Brand Guidelines 2024. It defines the two approved button variants, their visual specifications, and interaction behaviors.

## Brand-Compliant Button Variants

### Primary Button
- **Background**: Navy (`#0A004A`)
- **Text**: White (`#FFFFFF`) 
- **Usage**: Main call-to-action buttons, form submissions
- **Hover State**: Light Navy background (`#3B336E`)
- **Focus Ring**: Navy color with 2px offset

### Secondary Button  
- **Background**: Teal (`#21A8B0`)
- **Text**: White (`#FFFFFF`)
- **Usage**: Secondary actions, navigation elements
- **Hover State**: Muted Teal background (`#69BCC1`)
- **Focus Ring**: Teal color with 2px offset

### Outline Button (Conditional Use)
- **Background**: Transparent
- **Text**: White (`#FFFFFF`)
- **Border**: 1px solid Teal (`#21A8B0`)
- **Usage**: Tertiary actions on dark backgrounds only
- **Hover State**: Teal/10 background, maintains white text

## Size Specifications

All sizes meet WCAG AA minimum touch target requirements (44px).

### Small (sm)
- **Height**: 44px (minimum touch target)
- **Padding**: 16px horizontal, 10px vertical
- **Font Size**: 14px
- **Font Weight**: Medium (500)
- **Border Radius**: 24px (brand standard)

### Medium (md) - Default
- **Height**: 48px (exceeds minimum)
- **Padding**: 24px horizontal, 12px vertical  
- **Font Size**: 16px
- **Font Weight**: Medium (500)
- **Border Radius**: 24px (brand standard)

### Large (lg)
- **Height**: 48px (maintains touch target)
- **Padding**: 32px horizontal, 16px vertical
- **Font Size**: 18px
- **Font Weight**: Medium (500)  
- **Border Radius**: 24px (brand standard)

## Focus Ring Standards

### WCAG AA Compliance
- **Ring Width**: 2px solid
- **Ring Color**: Matches button variant (navy for primary, teal for secondary)
- **Ring Offset**: 2px from button edge
- **Visible**: Always visible when focused via keyboard navigation
- **Contrast**: Minimum 3:1 against surrounding background

### Implementation
```css
.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--focus-ring-color), 0 0 0 4px var(--focus-ring-offset);
}
```

## Interaction States

### Default State
- Full opacity (100%)
- Static positioning
- Solid background per variant

### Hover State  
- **Color Transition**: 200ms ease-in-out
- **Background**: Shifts to specified hover color
- **Cursor**: Pointer
- **No Movement**: Maintains static position (professional appearance)

### Active/Pressed State
- **Scale**: 98% (subtle feedback)
- **Duration**: 100ms 
- **Background**: Slightly darker than hover state
- **Returns**: To hover state on release

### Disabled State
- **Opacity**: 50%
- **Cursor**: not-allowed
- **Background**: Original variant color (dimmed)
- **Pointer Events**: None

### Loading State
- **Background**: Original variant color
- **Content**: Replaced with spinner
- **Spinner Color**: White
- **Disabled**: True (prevents double-clicks)

## Typography Standards

### Font Family
- **Required**: DM Sans (Google Fonts)
- **Fallbacks**: system-ui, sans-serif
- **Weight**: Medium (500) only
- **Line Height**: 1.5 for readability

### Text Treatment
- **Case**: Sentence case (e.g., "Get started" not "GET STARTED")
- **Length**: Maximum 3 words recommended
- **Punctuation**: No periods, minimal exclamation marks
- **Alignment**: Center-aligned within button

## Icon Button Specifications

### Standard Icon Buttons
- **Size**: 44px × 44px minimum (WCAG AA)
- **Border Radius**: 50% (circular)
- **Icon Size**: 20px × 20px maximum
- **Padding**: 12px all sides
- **Variants**: Same color scheme as text buttons

### Required Accessibility
- **aria-label**: Always required (descriptive text)
- **Focus Ring**: Same specifications as text buttons  
- **Touch Target**: Minimum 44px × 44px maintained

## Prohibited Elements

### Strictly Forbidden
- **Drop Shadows**: Use subtle opacity changes only
- **Gradients**: Solid colors only per brand guidelines  
- **Animations**: Beyond hover/focus transitions
- **Custom Fonts**: Only DM Sans permitted
- **Rounded Corners**: Only 24px radius (or 50% for icon buttons)

### Non-Brand Colors
- **Any hex colors** not in approved brand palette
- **Opacity variations** except for disabled state (50%)
- **RGB/HSL values** that don't match exact brand colors

## Implementation Examples

### React Component Structure
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}
```

### CSS Class Naming Convention
```css
.btn-primary-md    /* Primary button, medium size */  
.btn-secondary-sm  /* Secondary button, small size */
.btn-outline-lg    /* Outline button, large size */
```

## Quality Assurance Checklist

### Visual Requirements
- [ ] Uses only approved brand colors (navy, teal, white)
- [ ] Border radius exactly 24px for text buttons
- [ ] DM Sans font family applied
- [ ] Font weight is Medium (500)
- [ ] No drop shadows or gradients

### Accessibility Requirements  
- [ ] Minimum 44px touch target maintained
- [ ] Focus ring visible and properly colored
- [ ] Adequate color contrast (4.5:1 minimum)
- [ ] aria-label provided for icon buttons
- [ ] Keyboard navigation functional

### Interaction Requirements
- [ ] Hover state transitions smoothly (200ms)
- [ ] Loading state prevents multiple clicks  
- [ ] Disabled state properly indicated
- [ ] Active state provides brief feedback

### Brand Compliance
- [ ] Button content uses sentence case
- [ ] No unauthorized color variations
- [ ] Maintains professional, clean appearance
- [ ] Follows 8px spacing grid system

## Usage Guidelines

### When to Use Primary
- Form submissions (submit, save, continue)
- Primary call-to-action per page/section
- Final action in a workflow
- Purchase/enrollment buttons

### When to Use Secondary  
- Navigation between sections
- "Learn more" actions
- Secondary actions in forms
- Social media links

### When to Use Outline
- Cancel/back actions on dark backgrounds
- Less prominent secondary actions
- Tertiary navigation elements

## Resources

- [Brand Specification](./brand-spec.json): Complete color definitions
- [Design System](../src/design-system/index.tsx): Component implementations  
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/): Accessibility requirements

---

**Approved By**: Brand Guidelines Committee  
**Effective Date**: 2024-09-09  
**Next Review**: 2025-03-09