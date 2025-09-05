"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AptlyLogoProps {
  variant?: "horizontal" | "vertical" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  colorScheme?: "default" | "white" | "monochrome";
  className?: string;
}

export function AptlyLogo({
  variant = "horizontal",
  size = "md",
  colorScheme = "default",
  className,
}: AptlyLogoProps) {
  const sizes = {
    sm: { icon: "h-6", text: "text-lg", spacing: "gap-2" },
    md: { icon: "h-8", text: "text-2xl", spacing: "gap-3" },
    lg: { icon: "h-12", text: "text-3xl", spacing: "gap-4" },
    xl: { icon: "h-16", text: "text-4xl", spacing: "gap-5" },
  };

  const currentSize = sizes[size];

  const colors = {
    default: {
      leftCircle: "fill-white stroke-navy",
      rightCircle: "fill-teal",
      overlap: "fill-yellow",
      text: "text-navy",
    },
    white: {
      leftCircle: "fill-transparent stroke-white",
      rightCircle: "fill-white opacity-80",
      overlap: "fill-white",
      text: "text-white",
    },
    monochrome: {
      leftCircle: "fill-grey stroke-rich-black",
      rightCircle: "fill-light-grey",
      overlap: "fill-grey",
      text: "text-rich-black",
    },
  };

  const currentColors = colors[colorScheme];

  const IconComponent = () => (
    <svg
      className={cn(currentSize.icon, "w-auto")}
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left circle (Navy with white fill in default) */}
      <circle
        cx="25"
        cy="20"
        r="18"
        className={currentColors.leftCircle}
        strokeWidth="4"
      />
      
      {/* Right circle (Teal) */}
      <circle
        cx="55"
        cy="20"
        r="18"
        className={currentColors.rightCircle}
      />
      
      {/* Overlap area (Yellow) */}
      <path
        d="M 37 20 A 18 18 0 0 0 43 20 A 18 18 0 0 0 37 20"
        className={currentColors.overlap}
      />
    </svg>
  );

  const TextComponent = () => (
    <span className={cn("font-bold lowercase", currentSize.text, currentColors.text)}>
      aptly
    </span>
  );

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex", className)}>
        <IconComponent />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("inline-flex flex-col items-center", currentSize.spacing, className)}>
        <IconComponent />
        <TextComponent />
      </div>
    );
  }

  // Horizontal (default)
  return (
    <div className={cn("inline-flex items-center", currentSize.spacing, className)}>
      <IconComponent />
      <TextComponent />
    </div>
  );
}

// Simplified logo mark for favicon and small uses
export function AptlyMark({ 
  size = 32, 
  className 
}: { 
  size?: number; 
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="64" height="64" rx="12" fill="#0A004A"/>
      <circle cx="24" cy="32" r="14" fill="white" stroke="#0A004A" strokeWidth="2"/>
      <circle cx="40" cy="32" r="14" fill="#21A8B0"/>
      <path d="M 26 32 A 14 14 0 0 0 38 32 A 14 14 0 0 0 26 32" fill="#FFDE00"/>
    </svg>
  );
}