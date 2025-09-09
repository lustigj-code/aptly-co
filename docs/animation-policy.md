# Animation Policy

**Date**: 2024-09-09  
**Source**: Derived from [brand-spec.json](./brand-spec.json) and Aptly Brand Guidelines 2024  

## Overview

This document defines animation standards for the Aptly brand to ensure consistency with brand guidelines while maintaining professional, accessible, and performance-optimized user experiences.

## Core Principles

### Brand Alignment
- **Professional & Clean**: Animations must reflect Aptly's professional educational technology focus
- **Minimalist**: Subtle animations that enhance rather than distract
- **Accessible**: WCAG AA compliant with respect for motion sensitivities  
- **Modern**: Contemporary animation patterns that feel current and refined

### Design Philosophy
- **Purposeful**: Every animation must serve a functional purpose (feedback, hierarchy, flow)
- **Subtle**: Prefer understated effects over dramatic or attention-grabbing animations
- **Performance-First**: Lightweight animations that don't impact page load or responsiveness

## Technical Standards (Expanded from Current Policy)

### Color Requirements
- **Allowed**: Only brand tokens (navy, teal, muted-teal, light-teal, white, light-navy)
- **Overlays**: Low opacity when overlayed (≤ 0.3 as per current policy)
- **Brightness**: Avoid high-saturation or neon palettes ✅ (current policy)
- **Forbidden**: Non-brand hex values, rainbow effects, glowing/neon colors

### Duration Guidelines
- **Micro-interactions**: 300–600ms ✅ (matches current policy)
- **Background shifts**: 1.2–4s ✅ (matches current policy)  
- **Maximum duration**: 8s for looping ✅ (matches current policy)
- **Minimum duration**: 100ms for immediate feedback

### Easing Functions
- **Approved**: ease, ease-in-out, cubic-bezier(0.4,0,0.2,1) ✅ (matches current policy)
- **Additional approved**: cubic-bezier(0.0,0,0.2,1) for entering elements
- **Prohibited**: bounce, elastic (too playful for brand)

### Motion Accessibility
- **Required**: Respect prefers-reduced-motion ✅ (current policy)
- **Required**: Provide non-animated fallbacks ✅ (current policy)
- **Additional**: No flashing content >3 times per second
- **Additional**: Avoid vestibular triggers (excessive motion, spinning)

## Animation Patterns

### ✅ Allowed Patterns (Expanded from Current Policy)
- **gradientShift** ✅ (current policy)
- **float** ✅ (current policy)
- **subtle pulse** ✅ (current policy)
- **skeleton shimmer** ✅ (current policy)
- **Additional allowed**: fade-in, fade-in-up, scale-in, slide transitions
- **Additional allowed**: Loading spinners, progress indicators
- **Additional allowed**: Form feedback, hover states

### ❌ Prohibited Patterns (Expanded from Current Policy)  
- **particle fields** ❌ (current policy)
- **high-contrast sparkles** ❌ (current policy)
- **starfields** ❌ (unless recolored to brand and opacity-limited per current policy)
- **Additional prohibited**: Auto-playing motion graphics
- **Additional prohibited**: Complex parallax effects
- **Additional prohibited**: Bouncing or elastic animations

## Current Implementation Review

### ✅ Compliant Animations (tailwind.config.js)
- `fade-in`, `fade-in-up`, `fade-in-down`: ✅ Appropriate durations (500-600ms)
- `scale-in`, `slide-in-right`, `slide-in-left`: ✅ Suitable for micro-interactions  
- `shimmer`, `ripple`: ✅ Short durations, purposeful

### ⚠️ Animations Requiring Review
- `float` (6s duration): Within policy limit (8s max) ✅
- `pulse-slow` (3s): Within policy range for background shifts ✅

### ❌ Prohibited Animations Identified
From previous audit findings:
- `shooting-stars.tsx`: ❌ Starfield pattern (policy violation)
- `aurora-background.tsx`: ❌ Complex background motion, likely non-brand colors
- `glowing-effect.tsx`: ❌ Likely violates brightness/saturation rules
- `sparkles.tsx`: ❌ High-contrast sparkles (explicit policy violation)

**Action Required**: Remove or redesign these animations per current policy.

## Implementation Guidelines

### CSS Animation Standards
```css
/* Approved durations */
--duration-fast: 300ms;       /* Micro-interactions (policy compliant) */
--duration-base: 500ms;       /* Standard transitions (policy compliant) */
--duration-background: 2s;    /* Background shifts (policy compliant) */

/* Approved easing (per current policy) */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-simple: ease;
--ease-in-out: ease-in-out;

/* Approved colors (per current policy) */
background-color: var(--color-navy);
background-color: var(--color-teal);
background-color: var(--color-muted-teal);
background-color: var(--color-light-teal);
background-color: var(--color-white);

/* Approved opacity for overlays (per current policy) */
--opacity-overlay: 0.3;       /* Maximum for overlays */
--opacity-subtle: 0.1;        /* Very subtle effects */
```

### Motion Reduction (per current policy)
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before, 
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Brand Compliance Checklist

- [ ] Uses only brand token colors
- [ ] Overlay opacity ≤ 0.3  
- [ ] Duration within policy limits (300ms-8s)
- [ ] Uses approved easing functions
- [ ] Respects prefers-reduced-motion
- [ ] Avoids high-saturation/neon palettes
- [ ] Follows allowed patterns only
- [ ] Serves functional purpose
- [ ] Maintains professional tone

## Resources

- [Brand Specification](./brand-spec.json): Complete brand rules
- [Brand Deviations](./brand-deviations.md): Current implementation issues
- [WCAG Motion Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)

## Policy Updates

**Previous Policy**: Basic rules for colors, durations, easing, patterns  
**This Version**: Expanded with comprehensive guidelines while maintaining all existing rules  
**Status**: All current policy rules preserved ✅, additional guidance provided for implementation
