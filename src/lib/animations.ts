// Shared animation variants and utilities
import { Variants } from 'framer-motion';

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0,
    transform: 'translateZ(0) translateY(20px)',
  },
  visible: {
    y: 0,
    opacity: 1,
    transform: 'translateZ(0) translateY(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const slideInLeft: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Hover animations
export const hoverLift = {
  whileHover: { 
    y: -5, 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.98 }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 0 30px rgba(16, 6, 159, 0.4), 0 0 60px rgba(69, 92, 255, 0.2)",
    transition: { duration: 0.2 }
  }
};

// Floating animation for 3D elements
export const floatingAnimation = (delay = 0, depth = 0) => ({
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    scale: [0.98, 1.02, 0.98],
  },
  transition: {
    duration: 4 + delay,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay,
  },
  style: {
    transform: `translateZ(${depth}px)`,
    willChange: 'transform',
  }
});

// Optimized spring configs
export const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
  mass: 0.8,
};

export const softSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 1,
};

// Performance-optimized animation props
export const performanceProps = {
  style: { 
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
  },
  layout: false,
  layoutId: undefined,
};

