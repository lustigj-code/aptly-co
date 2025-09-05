"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BrandGradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "navy" | "teal" | "subtle";
  animated?: boolean;
}

export function BrandGradientBackground({
  children,
  className,
  variant = "primary",
  animated = false,
}: BrandGradientBackgroundProps) {
  const gradients = {
    primary: "bg-gradient-to-br from-navy via-light-navy to-teal",
    navy: "bg-gradient-to-b from-navy to-light-navy",
    teal: "bg-gradient-to-b from-teal to-muted-teal",
    subtle: "bg-gradient-to-br from-navy via-navy to-light-navy",
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        gradients[variant],
        animated && "animate-gradient-shift",
        className
      )}
    >
      {/* Subtle mesh overlay for depth */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export function BrandCircleDecoration({
  className,
  size = "medium",
  color = "teal",
  filled = false,
}: {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "teal" | "yellow" | "navy";
  filled?: boolean;
}) {
  const sizes = {
    small: "w-24 h-24",
    medium: "w-48 h-48",
    large: "w-72 h-72",
  };

  const colors = {
    teal: filled ? "bg-teal" : "border-teal",
    yellow: filled ? "bg-yellow" : "border-yellow",
    navy: filled ? "bg-navy" : "border-navy",
  };

  return (
    <div
      className={cn(
        "rounded-full",
        sizes[size],
        filled ? colors[color] : `border-4 ${colors[color]}`,
        className
      )}
    />
  );
}