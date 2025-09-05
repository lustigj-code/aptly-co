// Standardized 8px grid spacing system
export const spacing = {
  // Base unit: 8px
  xs: 'p-1',     // 8px
  sm: 'p-2',     // 16px
  md: 'p-3',     // 24px
  lg: 'p-4',     // 32px
  xl: 'p-6',     // 48px
  '2xl': 'p-8',  // 64px
  '3xl': 'p-10', // 80px
  '4xl': 'p-12', // 96px
} as const;

export const sectionSpacing = {
  sm: 'py-8',    // 64px vertical
  md: 'py-12',   // 96px vertical  
  lg: 'py-16',   // 128px vertical
  xl: 'py-20',   // 160px vertical
} as const;

export const gap = {
  xs: 'gap-1',   // 8px
  sm: 'gap-2',   // 16px
  md: 'gap-3',   // 24px
  lg: 'gap-4',   // 32px
  xl: 'gap-6',   // 48px
  '2xl': 'gap-8', // 64px
} as const;

export const margin = {
  xs: 'm-1',     // 8px
  sm: 'm-2',     // 16px
  md: 'm-3',     // 24px
  lg: 'm-4',     // 32px
  xl: 'm-6',     // 48px
  '2xl': 'm-8',  // 64px
  '3xl': 'm-10', // 80px
  '4xl': 'm-12', // 96px
} as const;