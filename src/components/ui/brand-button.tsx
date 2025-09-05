"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export function BrandButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  className,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-navy text-white hover:bg-light-navy focus:ring-navy",
    secondary: "bg-teal text-white hover:bg-muted-teal focus:ring-teal",
    outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white focus:ring-navy",
    ghost: "text-navy hover:bg-navy/10 focus:ring-navy",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-brand-sm",
    md: "px-6 py-3 text-base rounded-brand",
    lg: "px-8 py-4 text-lg rounded-brand-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";

  const buttonClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    disabled && disabledStyles,
    className
  );

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={buttonClassName}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

// Icon button variant for specific use cases
export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  onClick,
  disabled = false,
  className,
  ariaLabel,
}: {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel: string; // Required for accessibility
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-navy text-white hover:bg-light-navy focus:ring-navy",
    secondary: "bg-teal text-white hover:bg-muted-teal focus:ring-teal",
    outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white focus:ring-navy",
    ghost: "text-navy hover:bg-navy/10 focus:ring-navy",
  };

  const sizes = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && disabledStyles,
        className
      )}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}