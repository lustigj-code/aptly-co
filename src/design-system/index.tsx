// Aptly Design System - Complete Component Library
// Following Brand Guidelines 2024

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ============================================
// TYPOGRAPHY SYSTEM
// ============================================

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'regular' | 'medium' | 'bold';
  color?: 'white' | 'navy' | 'teal' | 'rich-black' | 'light-teal';
  className?: string;
  children: React.ReactNode;
};

const sizeClasses = {
  xs: 'text-sm',      // 14px
  sm: 'text-base',    // 16px
  md: 'text-lg',      // 18px
  lg: 'text-2xl',     // 24px
  xl: 'text-4xl',     // 36px
  '2xl': 'text-5xl',  // 48px
  '3xl': 'text-6xl'   // 60px
};

const colorClasses = {
  white: 'text-white',
  navy: 'text-navy',
  teal: 'text-teal',
  'rich-black': 'text-rich-black',
  'light-teal': 'text-light-teal'
};

const weightClasses = {
  regular: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold'
};

export function Heading({ 
  as: Component = 'h2', 
  size = 'lg', 
  weight = 'bold',
  color = 'white',
  className = '',
  children 
}: HeadingProps) {
  return (
    <Component 
      className={`font-sans ${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Component>
  );
}

// ============================================
// BUTTON SYSTEM
// ============================================

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({ 
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  children,
  external = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-sans font-medium rounded-3xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-navy text-white hover:bg-opacity-90 focus:ring-navy",
    secondary: "bg-teal text-white hover:bg-opacity-90 focus:ring-teal",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy focus:ring-white"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

// ============================================
// CONTAINER SYSTEM
// ============================================

type ContainerProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  children: React.ReactNode;
};

export function Container({ 
  size = 'lg', 
  className = '', 
  children 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full'
  };
  
  return (
    <div className={`mx-auto px-6 sm:px-8 lg:px-12 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// SECTION SYSTEM
// ============================================

type SectionProps = {
  background?: 'transparent' | 'navy' | 'light-navy' | 'white' | 'gradient';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
};

export function Section({ 
  background = 'transparent',
  spacing = 'lg',
  className = '',
  children 
}: SectionProps) {
  const backgroundClasses = {
    transparent: '',
    navy: 'bg-navy',
    'light-navy': 'bg-light-navy',
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-navy via-light-navy to-teal'
  };
  
  const spacingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24'
  };
  
  return (
    <section className={`${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}

// ============================================
// CARD SYSTEM
// ============================================

type CardProps = {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

export function Card({ 
  variant = 'default',
  padding = 'md',
  className = '',
  children 
}: CardProps) {
  const variantClasses = {
    default: 'bg-white/5 backdrop-blur-sm',
    bordered: 'bg-transparent border border-white/20',
    elevated: 'bg-white shadow-lg'
  };
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div className={`rounded-2xl ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// GRID SYSTEM
// ============================================

type GridProps = {
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

export function Grid({ 
  cols = { default: 1, md: 2, lg: 3 },
  gap = 'md',
  className = '',
  children 
}: GridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };
  
  const colClasses = [
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`grid ${colClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// BADGE SYSTEM
// ============================================

type BadgeProps = {
  variant?: 'default' | 'success' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
};

export function Badge({ 
  variant = 'default',
  size = 'sm',
  children 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-white/10 text-white',
    success: 'bg-teal/20 text-teal',
    info: 'bg-muted-teal/20 text-muted-teal'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}

// ============================================
// DIVIDER SYSTEM
// ============================================

type DividerProps = {
  color?: 'light' | 'medium';
  spacing?: 'sm' | 'md' | 'lg';
};

export function Divider({ 
  color = 'light',
  spacing = 'md' 
}: DividerProps) {
  const colorClasses = {
    light: 'border-white/10',
    medium: 'border-white/20'
  };
  
  const spacingClasses = {
    sm: 'my-4',
    md: 'my-8',
    lg: 'my-12'
  };
  
  return <hr className={`border-t ${colorClasses[color]} ${spacingClasses[spacing]}`} />;
}

// ============================================
// STAT SYSTEM
// ============================================

type StatProps = {
  value: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
};

export function Stat({ value, label, size = 'md' }: StatProps) {
  const sizeClasses = {
    sm: { value: 'text-2xl', label: 'text-sm' },
    md: { value: 'text-4xl', label: 'text-base' },
    lg: { value: 'text-5xl', label: 'text-lg' }
  };
  
  return (
    <div className="text-center">
      <div className={`font-bold text-white ${sizeClasses[size].value}`}>{value}</div>
      <div className={`text-light-teal mt-1 ${sizeClasses[size].label}`}>{label}</div>
    </div>
  );
}