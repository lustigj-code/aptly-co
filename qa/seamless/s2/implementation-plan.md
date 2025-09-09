# S2 Implementation Plan - Theme & Section Defaults

## Overview
Transform the current 7-background segmentation into a unified 3-background system to achieve ≤4 segmentation score.

## Current Issues Identified

### 1. Excessive Background Alternation
- **Pattern**: Gradient → Light Navy → Navy → Navy → Light Navy → Navy → Gradient
- **Problem**: Creates visual "zebra stripe" effect
- **Impact**: 10/10 segmentation score (worst possible)

### 2. Inconsistent Section API
- Mix of `background="gradient"`, `background="navy"`, `className="bg-navy"`
- Some sections use design system props, others use Tailwind classes
- No standardized transition handling

### 3. Missing Surface Hierarchy
- Colors chosen randomly rather than following information hierarchy
- No semantic meaning to background choices

## Implementation Steps

### Step 1: Add Surface System to design-tokens.css
```css
/* Add to existing design-tokens.css */

/* ==================== SURFACE SYSTEM ==================== */

/* Surface Hierarchy - Semantic backgrounds */
--surface-primary: var(--color-navy);           /* Main content areas */
--surface-secondary: var(--color-light-navy);   /* Single accent section */
--surface-gradient: linear-gradient(135deg, var(--color-navy) 0%, var(--color-light-navy) 25%, var(--color-teal) 50%, var(--color-muted-teal) 75%, var(--color-light-teal) 100%);
--surface-elevated: rgba(255, 255, 255, 0.05); /* Cards and overlays */

/* Surface Transitions */
--surface-border: rgba(255, 255, 255, 0.08);   /* Subtle section dividers */
--surface-overlay: rgba(10, 0, 74, 0.95);      /* Modal/overlay backgrounds */
```

### Step 2: Add Section Utilities to globals.css
```css
/* Add to @layer utilities in globals.css */

/* Surface Background Utilities */
.surface-primary {
  background: var(--surface-primary);
}

.surface-secondary {
  background: var(--surface-secondary);
}

.surface-gradient {
  background: var(--surface-gradient);
}

.surface-elevated {
  background: var(--surface-elevated);
}

/* Section Transition Utilities */
.section-transition-subtle {
  position: relative;
}

.section-transition-subtle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--surface-border);
}

.section-fade-gradient {
  background: linear-gradient(to bottom, 
    var(--surface-primary) 0%, 
    color-mix(in srgb, var(--surface-primary) 80%, var(--surface-secondary) 20%) 100%
  );
}
```

### Step 3: Update Homepage Background Pattern
**New Pattern (4 total backgrounds):**
1. **Hero**: Gradient (entry impact)
2. **Success Numbers**: Primary (unified start)
3. **Featured Programs**: Primary (continued flow)  
4. **Value Proposition**: Primary (maintained flow)
5. **Trust Partners**: Secondary (single accent break)
6. **How It Works**: Primary (back to main flow)
7. **CTA**: Gradient (strong finish)

**Changes Required:**
- Success Numbers: `bg-light-navy` → `surface-primary`
- Trust Partners: Keep `surface-secondary` (single accent)
- All other navy sections: Use `surface-primary`

### Step 4: Design System Section Component Update
Update the Section component in design-system to support surface variants:

```typescript
// Add to Section component props
type SectionProps = {
  surface?: 'primary' | 'secondary' | 'gradient' | 'elevated';
  transition?: 'none' | 'subtle' | 'fade';
  // ... existing props
}
```

### Step 5: Rollback Plan
All changes are additive and use CSS custom properties. Rollback steps:
1. Remove new utilities from globals.css
2. Remove surface tokens from design-tokens.css  
3. Revert homepage background classes
4. No breaking changes to existing components

## Testing Strategy

### Visual Testing Checkpoints
1. **Homepage Flow**: Verify smooth visual progression
2. **Section Transitions**: Check for harsh vs. smooth boundaries
3. **Brand Compliance**: Ensure exact color values maintained
4. **Mobile Responsive**: Test background behavior on smaller screens

### Success Criteria
- ✅ Maximum 4 background changes across homepage
- ✅ Single accent section (light-navy) instead of alternating pattern
- ✅ Smooth visual flow without harsh boundaries
- ✅ All brand colors exactly preserved
- ✅ No breaking changes to existing components

## Implementation Timeline
- **Phase 1**: Add surface tokens and utilities (15 min)
- **Phase 2**: Update homepage background pattern (10 min)
- **Phase 3**: Test and validate changes (10 min)
- **Phase 4**: Documentation and screenshots (10 min)

**Total Estimated Time**: 45 minutes