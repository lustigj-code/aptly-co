"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  loop?: boolean;
  loopDelay?: number;
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  loop = false,
  loopDelay = 2000,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    let isLooping = false;

    const startTyping = () => {
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
          if (loop && !isLooping) {
            isLooping = true;
            setTimeout(() => {
              setDisplayedText("");
              i = 0;
              isLooping = false;
              startTyping();
            }, loopDelay);
          }
      }
    }, duration);

      return typingEffect;
    };

    const intervalId = startTyping();

    return () => {
      clearInterval(intervalId);
    };
  }, [children, duration, started, loop, loopDelay]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "inline-block",
        className,
      )}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}
