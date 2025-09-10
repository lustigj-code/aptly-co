'use client';

import { useEffect, useRef, ReactNode } from 'react';

type ScrollAnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  threshold?: number;
};

export default function ScrollAnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1
}: ScrollAnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animationClasses = {
      fadeIn: 'animate-[fadeInUp_0.8s_ease-out_forwards]',
      slideUp: 'animate-[slideInUp_0.8s_ease-out_forwards]',
      slideLeft: 'animate-[slideInLeft_0.8s_ease-out_forwards]',
      slideRight: 'animate-[slideInRight_0.8s_ease-out_forwards]',
      scale: 'animate-[fadeInScale_0.8s_ease-out_forwards]'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(animationClasses[animation]);
              entry.target.classList.remove('opacity-0');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    section.classList.add('opacity-0');
    observer.observe(section);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [animation, delay, threshold]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}