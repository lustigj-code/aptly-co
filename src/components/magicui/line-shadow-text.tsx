import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";

interface LineShadowTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  shadowColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  as?: React.ElementType;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  gradientFrom = "#60a5fa",
  gradientTo = "#a855f7",
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motion.create(Component);
  const content = typeof children === "string" ? children : null;

  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <MotionComponent
      style={{ 
        "--shadow-color": shadowColor,
        "--gradient-from": gradientFrom,
        "--gradient-to": gradientTo
      } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:left-[0.08em] after:top-[0.08em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_40%,var(--gradient-from)_40%,var(--gradient-to)_60%,transparent_0)]",
        "after:-z-10 after:bg-[length:0.12em_0.12em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className,
      )}
      data-text={content}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}
