'use client';

import { useEffect, useRef, useState } from 'react';

type UseScrollAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;
  
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        if (visible && triggerOnce) {
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, isVisible: isVisible || (triggerOnce && hasTriggered) };
};

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const windowCenterY = window.innerHeight / 2;
      const distance = centerY - windowCenterY;
      
      setOffset(distance * speed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};