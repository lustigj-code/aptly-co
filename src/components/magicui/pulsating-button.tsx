"use client";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps {
  children: React.ReactNode;
  className?: string;
  pulseColor?: string;
  duration?: string;
  onClick?: () => void;
}

export function PulsatingButton({ 
  children, 
  className, 
  pulseColor = "59, 130, 246", 
  duration = "2s",
  onClick 
}: PulsatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-normal rounded-full text-lg animate-button-pulse",
        className
      )}
      style={{
        '--pulse-color': pulseColor,
        '--duration': duration,
      } as React.CSSProperties}
    >
      {children}
    </button>
  );
} 