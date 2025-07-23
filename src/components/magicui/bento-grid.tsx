import React from "react";
import { cn } from "@/lib/utils";

export interface BentoCardProps {
  title: string;
  description: React.ReactNode;
  accent?: string;
  background?: React.ReactNode;
  className?: string;
  gridArea?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(220px,1fr)]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  accent = '#21a8b0',
  background,
  className,
  gridArea,
  children,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        // Reduced border, lighter background, less padding, no shadow
        "relative flex flex-col justify-between bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4 overflow-hidden transition-all duration-300 hover:scale-[1.02] group cursor-pointer min-h-[180px]",
        className
      )}
      style={gridArea ? { gridArea } : {}}
    >
      {/* Optional background node */}
      {background && (
        <div className="pointer-events-none absolute inset-0 z-0">{background}</div>
      )}
      {/* Smaller, lighter accent dot */}
      <span
        className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
        style={{ background: accent, boxShadow: `0 0 8px 2px ${accent}40` }}
      />
      <div className="relative z-10 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-lg md:text-xl mb-0" style={{ color: accent }}>{title}</h3>
        <div className="text-white/80 text-sm mb-1 flex-1">{description}</div>
        {children}
      </div>
      {/* Removed accent bar at bottom */}
    </div>
  );
} 