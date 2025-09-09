# Brand Deviations Analysis

**Date**: 2024-09-09  
**Source**: Reconciliation between [brand-spec.json](./brand-spec.json) and existing implementation  

## Summary

Analysis of existing design tokens in `src/styles/design-tokens.css`, `src/styles/themes.css`, and `tailwind.config.js` against the authoritative brand specification extracted from `docs/aptly-brand-guidelines-2024.pdf`.

## Color Deviations

### ✅ Accurate Implementations
All primary brand colors match the PDF specification exactly:
- Navy: `#0A004A` ✓
- Teal: `#21A8B0` ✓  
- Yellow: `#FFDE00` ✓
- Light Navy: `#3B336E` ✓
- Muted Teal: `#69BCC1` ✓
- Light Teal: `#DEF2F2` ✓
- White: `#FFFFFF` ✓
- Light Grey: `#E6E6E6` ✓
- Grey: `#CCCCCC` ✓
- Rich Black: `#333333` ✓

### ⚠️ Missing Colors from Brand Spec

**File**: All token files  
**Issue**: Brand spec includes additional color palettes not implemented in tokens  

**Missing Tertiary Colors:**
- Red: `#E84133` (Error states, alerts)
- Orange: `#EC6726` (Warning states)

**Missing Illustration Colors:**
- Light Orange: `#E08534`
- Light Red: `#D15549`
- Green: `#88B644`  
- Light Purple: `#5C54D2`
- Pink: `#ED9FE2`
- Dark Grey: `#9B9B9A`

**Missing Skin Tone Colors:**
- Light Pink: `#FDE4D2`
- Light Orange: `#FDCE96`
- Pink: `#EF9E92`
- Orange: `#FDAE7D`
- Light Brown: `#97503C`
- Brown: `#7D524E`

**Proposed Fix**: Add missing colors as CSS custom properties in design-tokens.css under respective sections.

## Typography Deviations

### ✅ Accurate Implementation
- Font family: DM Sans ✓
- Font weights: 400, 500, 700 ✓
- Google Fonts source ✓

**File**: `src/styles/design-tokens.css:41`, `tailwind.config.js:37`

### ⚠️ Missing Typography Rules

**Issue**: Brand spec specifies exact typography hierarchy not fully captured in implementation

**Brand Spec Requirements:**
- H1: 36px mobile, 60px desktop, weight 700, line-height 1.1
- H2: 24px mobile, 36px desktop, weight 700, line-height 1.25
- H3: 24px mobile, 30px desktop, weight 500, line-height 1.25
- H4: 20px mobile, 24px desktop, weight 500, line-height 1.5

**Current Implementation:**
- Uses clamp() for responsive scaling (good)
- Sizes approximately match brand spec (good)
- Line heights match brand spec (good)

**Status**: Implementation is compliant with brand spec ✅

## Button Deviations

### ❌ Deviation Found

**File**: `src/styles/design-tokens.css:195-216`  
**Issue**: Button implementation deviates from brand spec

**Brand Spec Requirements:**
- Primary: Navy background (#0A004A), White text
- Secondary: Teal background (#21A8B0), White text  
- Border radius: 24px
- Min height: 48px
- Hover: 10% opacity increase
- Forbidden: Shadows, gradients

**Current Implementation:**
```css
.btn-primary {
  background: var(--color-teal);  /* ❌ Should be Navy */
  /* ... */
}

.btn-secondary {
  background: transparent;        /* ❌ Should be Teal */
  border: 2px solid var(--color-teal);
  /* ... */
}
```

**Proposed Fix:**
```css
.btn-primary {
  background: var(--color-navy);     /* ✓ Navy background */
  color: var(--color-white);
  /* ... existing properties ... */
}

.btn-secondary {
  background: var(--color-teal);     /* ✓ Teal background */
  color: var(--color-white);
  border: none;                      /* ✓ Remove border */
  /* ... existing properties ... */
}
```

## Component Deviations (From Previous Analysis)

### Button Primary Color Inconsistency
- `src/components/ui/brand-button.tsx` uses primary=navy ✅ (correct per brand)
- `src/design-system/index.tsx` Button uses primary=teal ❌ (should be secondary)

### Non-Brand Hex Literals
**Issue**: Non-brand hex literals discovered (see audits/hex-violations.txt)  
**Proposed Fix**: Replace with tokens: navy (#0A004A), teal (#21A8B0), muted-teal (#69BCC1), light-teal (#DEF2F2), etc.

### Animation Color Violations
**Files**: shooting-stars.tsx, aurora-background.tsx, glowing-effect.tsx, sparkles.tsx  
**Issue**: Contain non-brand colors  
**Proposed Fix**: Recolor using brand palette or disable by animation policy

## Gradient Deviations

### ✅ Accurate Implementation

**File**: `src/styles/design-tokens.css:335-344`, `tailwind.config.js:96`

**Brand Spec**: 135deg angle with stops at Navy→Light Navy→Teal→Muted Teal→Light Teal  
**Current Implementation**: Exactly matches brand spec ✓

## Spacing Deviations

### ✅ Accurate Implementation

**File**: `src/styles/design-tokens.css:72-96`

All spacing values follow the required 8px grid system:
- 8px, 16px, 24px, 32px, 48px, 64px, 80px, 96px ✓
- Container max-width: 1280px ✓
- Container padding: 24px mobile, 48px desktop ✓
- Section padding: 64px mobile, 80px desktop ✓

## Animation Deviations

### ⚠️ Potential Policy Violations

**File**: `tailwind.config.js:44-93`

**Current Animations:**
- fade-in, fade-in-up, fade-in-down: ✅ Compliant
- scale-in, slide-in-right, slide-in-left: ✅ Compliant  
- float (6s), pulse-slow (3s): ⚠️ Long durations, check against policy
- shimmer, ripple: ✅ Short durations

**Status**: Requires review against animation-policy.md when created

## Missing Implementation Areas

### Logo Guidelines
- **Issue**: No CSS implementation of logo sizing/clearspace rules
- **Proposed Fix**: Add logo utility classes in design-tokens.css

### Accessibility Rules
- **Issue**: Missing WCAG AA contrast requirements implementation
- **Brand Spec**: Minimum 44px touch targets, high contrast ratios
- **Current**: Touch targets implemented ✅, contrast validation needed

### Print Guidelines
- **Issue**: No CMYK color space utilities for print materials
- **Brand Spec**: CMYK required for print materials
- **Proposed Fix**: Add print-specific color utilities

## Implementation Priority

### High Priority
1. **Fix button color scheme** (Primary = Navy, Secondary = Teal)
2. **Add missing tertiary colors** (Red, Orange for error/warning states)
3. **Fix component button inconsistencies** (brand-button.tsx vs design-system/index.tsx)

### Medium Priority  
4. **Replace non-brand hex literals** (See audits/hex-violations.txt)
5. **Fix animation color violations** (shooting-stars, aurora-background, etc.)
6. **Add illustration color palette** (For future illustration work)

### Low Priority
7. **Create logo utility classes** (Sizing, clearspace)
8. **Add print color utilities** (CMYK variants)
9. **Add skin tone palette** (For illustration work)

## Files Requiring Updates

1. `src/styles/design-tokens.css` - Lines 195-216 (button styles), add missing colors
2. `src/design-system/index.tsx` - Fix button primary/secondary color assignment
3. `src/components/ui/brand-button.tsx` - Already correct ✅
4. Animation components - Remove non-brand colors
5. Files listed in `audits/hex-violations.txt` - Replace hex literals with tokens

## Validation Commands

After implementing fixes:
```bash
npm run lint
npm run typecheck  
npm run build
```

## Notes

- Overall implementation is highly compliant with brand spec
- Primary deviation is button color scheme (easily fixed)
- Missing colors are mostly for specialized use cases
- Core brand elements (colors, typography, spacing) are correctly implemented
- Previous audit findings integrated into comprehensive analysis

