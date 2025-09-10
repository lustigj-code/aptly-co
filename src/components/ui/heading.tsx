import { ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingVariant = 'display' | 'title' | 'section' | 'subsection' | 'body' | 'small';

type HeadingProps = {
  level: HeadingLevel;
  variant?: HeadingVariant;
  className?: string;
  children: ReactNode;
};

const variantStyles: Record<HeadingVariant, string> = {
  display: 'h1 font-bold leading-tight',      // Uses design token --h1-size
  title: 'h1 font-bold leading-tight',        // Uses design token --h1-size
  section: 'h2 font-bold leading-snug',       // Uses design token --h2-size (standardized)
  subsection: 'h3 font-semibold leading-snug', // Uses design token --h3-size
  body: 'text-lg font-medium leading-normal',
  small: 'text-base font-medium leading-normal'
};

const levelToDefaultVariant: Record<HeadingLevel, HeadingVariant> = {
  h1: 'display',
  h2: 'section',
  h3: 'subsection',
  h4: 'body',
  h5: 'small',
  h6: 'small'
};

export default function Heading({ level, variant, className = '', children }: HeadingProps) {
  const Component = level;
  const defaultVariant = levelToDefaultVariant[level];
  const variantClass = variantStyles[variant || defaultVariant];
  
  return (
    <Component className={`font-dm-sans ${variantClass} ${className}`}>
      {children}
    </Component>
  );
}