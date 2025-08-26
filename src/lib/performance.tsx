'use client';

import { memo, useMemo, useCallback, Suspense, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Performance monitoring utilities
export const usePerformanceMonitor = () => {
  const measureFPS = useCallback(() => {
    let frames = 0;
    let startTime = performance.now();
    
    const countFPS = () => {
      frames++;
      const currentTime = performance.now();
      if (currentTime - startTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - startTime));
        console.log(`Current FPS: ${fps}`);
        frames = 0;
        startTime = currentTime;
      }
      requestAnimationFrame(countFPS);
    };
    
    requestAnimationFrame(countFPS);
  }, []);

  return { measureFPS };
};

// GPU-optimized motion configurations
export const GPUOptimizedMotion = {
  // Ultra-smooth fade animations
  fadeIn: {
    initial: { opacity: 0, transform: 'translateZ(0)' },
    animate: { opacity: 1, transform: 'translateZ(0)' },
    exit: { opacity: 0, transform: 'translateZ(0)' },
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
    },
  },

  // Hardware-accelerated slide animations
  slideUp: {
    initial: { 
      opacity: 0, 
      y: 30,
      transform: 'translateZ(0)', // Force GPU layer
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transform: 'translateZ(0)',
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transform: 'translateZ(0)',
    },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },

  // Optimized scale animations
  scale: {
    initial: { 
      scale: 0.9, 
      opacity: 0,
      transform: 'translateZ(0) scale(0.9)',
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      transform: 'translateZ(0) scale(1)',
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transform: 'translateZ(0) scale(0.9)',
    },
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },

  // Floating animation optimized for continuous performance
  float: {
    animate: {
      y: [-8, 8, -8],
      rotateX: [0, 2, 0],
      rotateY: [0, -1, 0],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    },
  },
};

// High-performance motion wrapper
export const OptimizedMotion = memo(motion.div);

// Intersection Observer for performance-aware animations
export const useIntersectionAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first intersection to prevent unnecessary re-triggers
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '50px', // Start animation before element is fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Performance-optimized container variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transform: 'translateZ(0) translateY(20px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    transform: 'translateZ(0) translateY(0px)',
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      mass: 0.6,
    },
  },
};

// Reduced motion support for accessibility
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Optimized loading component
export const PerformanceLoader = memo(() => (
  <div 
    className="flex items-center justify-center min-h-[200px]"
    style={{ 
      willChange: 'transform',
      transform: 'translateZ(0)',
    }}
  >
    <motion.div
      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  </div>
));

PerformanceLoader.displayName = 'PerformanceLoader';
