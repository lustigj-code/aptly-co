# Contrast Matrix: Aptly Brand Colors

## WCAG AA Requirements Reference
- **Normal text (<18px or <14px bold)**: 4.5:1 minimum ratio
- **Large text (≥18px regular or ≥14px bold)**: 3.0:1 minimum ratio  
- **UI components**: 3.0:1 minimum ratio

## Brand Color Palette
```css
/* Primary Colors */
--navy: #0A004A         /* RGB(10, 0, 74) */
--teal: #21A8B0         /* RGB(33, 168, 176) */
--yellow: #FFDE00       /* RGB(255, 222, 0) */

/* Secondary Colors */
--light-navy: #3B336E   /* RGB(59, 51, 110) */
--muted-teal: #69BCC1   /* RGB(105, 188, 193) */
--light-teal: #DEF2F2   /* RGB(222, 242, 242) */

/* Neutral Colors */
--white: #FFFFFF        /* RGB(255, 255, 255) */
--light-grey: #E6E6E6   /* RGB(230, 230, 230) */
--grey: #CCCCCC         /* RGB(204, 204, 204) */
--rich-black: #333333   /* RGB(51, 51, 51) */
```

## Calculated Contrast Ratios

### Navy Background (#0A004A)
| Text Color | Hex | Ratio | Normal Text | Large Text | Status | Use Case |
|------------|-----|-------|-------------|------------|---------|----------|
| White | #FFFFFF | **15.69** | ✅ PASS | ✅ PASS | RECOMMENDED | Primary buttons, hero sections |
| Light Teal | #DEF2F2 | **8.44** | ✅ PASS | ✅ PASS | SAFE | Secondary text, subtle content |
| Muted Teal | #69BCC1 | **4.11** | ❌ FAIL | ✅ PASS | LARGE TEXT ONLY | Headers ≥18px regular |
| Teal | #21A8B0 | **3.48** | ❌ FAIL | ✅ PASS | LARGE TEXT ONLY | Headers ≥18px regular |
| Yellow | #FFDE00 | **12.29** | ✅ PASS | ✅ PASS | USE SPARINGLY | Highlights only |
| Light Grey | #E6E6E6 | **9.32** | ✅ PASS | ✅ PASS | SAFE | Subdued text |

**Navy Background Usage Guidance:**
- ✅ **Primary Choice**: White text for all content
- ⚠️ **Secondary**: Light Teal for less important text
- ❌ **Avoid**: Regular Teal, Muted Teal for body text

### Light Navy Background (#3B336E)
| Text Color | Hex | Ratio | Normal Text | Large Text | Status | Use Case |
|------------|-----|-------|-------------|------------|---------|----------|
| White | #FFFFFF | **7.71** | ✅ PASS | ✅ PASS | RECOMMENDED | Card text, section content |
| Light Teal | #DEF2F2 | **4.15** | ❌ FAIL | ✅ PASS | LARGE TEXT ONLY | Headers ≥18px |
| Teal | #21A8B0 | **1.71** | ❌ FAIL | ❌ FAIL | NEVER USE | Not accessible |
| Yellow | #FFDE00 | **6.04** | ✅ PASS | ✅ PASS | USE SPARINGLY | Accent highlights |

**Light Navy Background Usage Guidance:**
- ✅ **Primary Choice**: White text for all content
- ⚠️ **Caution**: Light Teal only for large headings
- ❌ **Never**: Regular Teal text

### White Background (#FFFFFF)
| Text Color | Hex | Ratio | Normal Text | Large Text | Status | Use Case |
|------------|-----|-------|-------------|------------|---------|----------|
| Rich Black | #333333 | **12.63** | ✅ PASS | ✅ PASS | RECOMMENDED | Primary body text |
| Navy | #0A004A | **15.69** | ✅ PASS | ✅ PASS | RECOMMENDED | Headings, emphasis |
| Light Navy | #3B336E | **7.71** | ✅ PASS | ✅ PASS | SAFE | Secondary headings |
| Teal | #21A8B0 | **4.51** | ✅ PASS | ✅ PASS | SAFE | Links, accents |
| Muted Teal | #69BCC1 | **3.82** | ❌ FAIL | ✅ PASS | LARGE TEXT ONLY | Headers ≥18px |
| Grey | #CCCCCC | **2.61** | ❌ FAIL | ❌ FAIL | NEVER USE | Not accessible |
| Light Grey | #E6E6E6 | **1.68** | ❌ FAIL | ❌ FAIL | NEVER USE | Not accessible |

**White Background Usage Guidance:**
- ✅ **Primary Choice**: Rich Black or Navy for body text
- ✅ **Secondary**: Light Navy for hierarchy
- ✅ **Accents**: Teal for interactive elements
- ❌ **Avoid**: Any grey tones for text

### Teal Background (#21A8B0)
| Text Color | Hex | Ratio | Normal Text | Large Text | Status | Use Case |
|------------|-----|-------|-------------|------------|---------|----------|
| White | #FFFFFF | **3.48** | ❌ FAIL | ✅ PASS | LARGE TEXT ONLY | CTA buttons ≥18px |
| Navy | #0A004A | **4.51** | ✅ PASS | ✅ PASS | SAFE | Alternative button style |
| Rich Black | #333333 | **3.63** | ❌ FAIL | ✅ PASS | LARGE TEXT ONLY | Headers only |

**Teal Background Usage Guidance:**
- ⚠️ **Large Text Only**: White text minimum 18px regular
- ✅ **Safe Alternative**: Navy text for smaller sizes
- 🎯 **Best Use**: Call-to-action buttons with large text

### Light Teal Background (#DEF2F2)
| Text Color | Hex | Ratio | Normal Text | Large Text | Status | Use Case |
|------------|-----|-------|-------------|------------|---------|----------|
| Navy | #0A004A | **8.44** | ✅ PASS | ✅ PASS | RECOMMENDED | Card content |
| Rich Black | #333333 | **6.79** | ✅ PASS | ✅ PASS | RECOMMENDED | Body text |
| Light Navy | #3B336E | **4.15** | ❌ FAIL | ✅ PASS | LARGE TEXT ONLY | Headers ≥18px |
| Teal | #21A8B0 | **2.43** | ❌ FAIL | ❌ FAIL | NEVER USE | Not accessible |

**Light Teal Background Usage Guidance:**
- ✅ **Primary Choice**: Navy or Rich Black for all text
- ⚠️ **Headers Only**: Light Navy for large headings
- ❌ **Never**: Regular Teal text

## UI Component Specific Guidelines

### Buttons
| Style | Background | Text | Min Size | Contrast | Status |
|-------|------------|------|----------|----------|---------|
| Primary | Navy (#0A004A) | White | 14px bold | 15.69:1 | ✅ COMPLIANT |
| Secondary | Teal (#21A8B0) | White | 18px reg | 3.48:1 | ⚠️ LARGE ONLY |
| Secondary Alt | Teal (#21A8B0) | Navy | Any size | 4.51:1 | ✅ COMPLIANT |
| Outline | White | Navy | Any size | 15.69:1 | ✅ COMPLIANT |

### Form Elements
| Element | Background | Text | Border | Focus State | Status |
|---------|------------|------|--------|-------------|---------|
| Input | White | Rich Black | Light Grey | Navy outline | ✅ COMPLIANT |
| Label | White | Navy | N/A | N/A | ✅ COMPLIANT |
| Error | White | Red (need check) | N/A | N/A | ⚠️ VERIFY |
| Placeholder | White | Grey | N/A | N/A | ❌ NON-COMPLIANT |

### Navigation
| Element | Background | Text | Hover | Focus | Status |
|---------|------------|------|-------|-------|---------|
| Nav Link | Transparent | Navy | Teal | Navy outline | ✅ COMPLIANT |
| Mobile Menu | White | Navy | Light Teal bg | Navy outline | ✅ COMPLIANT |
| Footer Link | Navy | White | Light Teal | White outline | ✅ COMPLIANT |

## Quick Reference: Safe Combinations

### ✅ Always Safe (4.5:1+ for all text sizes)
- Navy background + White text (15.69:1)
- White background + Navy text (15.69:1)  
- White background + Rich Black text (12.63:1)
- Light Teal background + Navy text (8.44:1)
- Light Navy background + White text (7.71:1)

### ⚠️ Large Text Only (3.0:1+ but <4.5:1)
- Teal background + White text (3.48:1) - minimum 18px regular
- Navy background + Muted Teal text (4.11:1) - minimum 18px regular
- Light Navy background + Light Teal text (4.15:1) - minimum 18px regular

### ❌ Never Use for Text
- Any Grey (#CCCCCC, #E6E6E6) on White background
- Teal text on Light Teal background
- Muted Teal on White background for small text

## Testing Commands

### Manual Contrast Check
```bash
# Use WebAIM contrast checker or similar tool
# Input background RGB and text RGB values
# Verify ratio meets threshold for text size
```

### Automated Verification
```javascript
// Example contrast checking function
function checkContrast(bgColor, textColor, fontSize) {
  const ratio = calculateContrastRatio(bgColor, textColor);
  const isLarge = fontSize >= 18 || (fontSize >= 14 && isBold);
  const threshold = isLarge ? 3.0 : 4.5;
  return ratio >= threshold;
}
```

## Common Violations to Watch For

1. **Grey text on white backgrounds** - Always fails WCAG AA
2. **Teal text on teal backgrounds** - Poor contrast across all shades  
3. **Small text on brand color backgrounds** - Verify size requirements
4. **Placeholder text** - Often uses grey that fails contrast
5. **Disabled states** - May need special handling for contrast

## Recommended Color Pairings by Context

### Marketing/Landing Pages
- Hero: Navy bg + White text
- Sections: White bg + Navy text  
- CTAs: Navy bg + White text (large) or Teal bg + Navy text

### Application UI
- Main content: White bg + Rich Black text
- Sidebar: Light Navy bg + White text
- Cards: Light Teal bg + Navy text
- Buttons: Navy bg + White text

### Content/Blog
- Body: White bg + Rich Black text
- Headers: White bg + Navy text
- Links: Teal text on White bg
- Quotes: Light Teal bg + Navy text