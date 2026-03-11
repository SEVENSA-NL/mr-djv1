"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  /** Use comma as decimal separator (Dutch style) */
  decimal?: boolean;
  duration?: number;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = "",
  prefix = "",
  decimal = false,
  duration = 2000,
  className,
}) => {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const animate = useCallback(() => {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = easedProgress * target;

      if (decimal) {
        setDisplay(current.toFixed(1).replace(".", ","));
      } else {
        setDisplay(Math.floor(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, decimal, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setDisplay(decimal ? target.toFixed(1).replace(".", ",") : target.toString());
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, animate, decimal, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
