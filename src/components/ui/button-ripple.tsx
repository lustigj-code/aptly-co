'use client';

import React, { useState, useEffect, MouseEvent } from 'react';

type RippleProps = {
  x: number;
  y: number;
  size: number;
};

type ButtonRippleProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export function ButtonRipple({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
}: ButtonRippleProps) {
  const [ripples, setRipples] = useState<RippleProps[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRipples([]);
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    setRipples([...ripples, { x, y, size }]);
    
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = 'relative overflow-hidden font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center';
  
  const sizeStyles = {
    sm: 'px-4 py-2.5 min-h-[44px] text-sm rounded-full',
    md: 'px-6 py-3 min-h-[44px] text-base rounded-full',
    lg: 'px-8 py-4 min-h-[48px] text-lg rounded-full',
  };
  
  const variantStyles = {
    primary: 'bg-teal text-white hover:bg-opacity-90 border-0',
    secondary: 'bg-transparent text-white hover:bg-white/10 border border-white/30',
    outline: 'bg-transparent text-white hover:bg-white/10 border border-teal/50',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="absolute bg-white bg-opacity-30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
}