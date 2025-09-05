/**
 * Visual Harmony Spacing System
 * Based on 8px grid for perfect visual balance
 */

// Spacing scale based on 8px grid
export const spacing = {
  0: '0',
  1: '0.5rem',   // 8px
  2: '1rem',     // 16px
  3: '1.5rem',   // 24px
  4: '2rem',     // 32px
  5: '2.5rem',   // 40px
  6: '3rem',     // 48px
  7: '3.5rem',   // 56px
  8: '4rem',     // 64px
  9: '4.5rem',   // 72px
  10: '5rem',    // 80px
  12: '6rem',    // 96px
  16: '8rem',    // 128px
  20: '10rem',   // 160px
  24: '12rem',   // 192px
} as const;

// Component-specific spacing
export const componentSpacing = {
  button: {
    paddingX: spacing[4],
    paddingY: spacing[2],
    gap: spacing[2],
  },
  card: {
    padding: spacing[3],
    paddingLg: spacing[4],
  },
  section: {
    mobile: spacing[8],
    tablet: spacing[10],
    desktop: spacing[12],
  },
  container: {
    mobile: spacing[3],
    tablet: spacing[4],
    desktop: spacing[6],
  },
  navbar: {
    height: spacing[10],
    logoHeight: '2.5rem', // 40px
  },
} as const;

// Gap utilities
export const gaps = {
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[3],
  lg: spacing[4],
  xl: spacing[6],
  '2xl': spacing[8],
} as const;

// Contrast ratios for WCAG compliance
export const contrastRatios = {
  high: 0.95,    // For primary text
  medium: 0.8,   // For secondary text
  low: 0.6,      // For tertiary/decorative text
} as const;

// Helper function to get contrast-compliant text color
export function getTextColor(background: string, level: keyof typeof contrastRatios = 'high') {
  return `rgba(255, 255, 255, ${contrastRatios[level]})`;
}

// Helper function to validate spacing consistency
export function validateSpacing(value: string | number): boolean {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return numValue % 8 === 0;
}

// CSS variables generator for runtime usage
export function generateSpacingCSSVariables() {
  return Object.entries(spacing).map(
    ([key, value]) => `--space-${key}: ${value};`
  ).join('\n');
}