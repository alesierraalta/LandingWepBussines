'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface AnimationConfig {
  type: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'float' | 'pulse' | 'bounce';
  duration?: number;
  delay?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  stagger?: number;
}

interface AnimationState {
  isVisible: boolean;
  isAnimating: boolean;
  hasAnimated: boolean;
}

// Performance monitoring
const animationPerformance = {
  activeAnimations: 0,
  maxConcurrent: 10,
  frameDrops: 0,
  lastFrameTime: 0
};

// Monitor frame rate
const monitorFrameRate = () => {
  const now = performance.now();
  const delta = now - animationPerformance.lastFrameTime;
  
  if (delta > 16.67) { // More than 60fps threshold
    animationPerformance.frameDrops++;
  }
  
  animationPerformance.lastFrameTime = now;
  
  if (animationPerformance.frameDrops > 10) {
    console.warn('Animation performance degraded. Consider reducing concurrent animations.');
    animationPerformance.frameDrops = 0;
  }
};

// CSS class mapping for animations
const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  float: 'animate-float',
  pulse: 'animate-pulse-optimized',
  bounce: 'animate-bounce-optimized'
};

// Easing function mapping
const easingClasses = {
  'ease': '',
  'ease-in': '',
  'ease-out': '',
  'ease-in-out': '',
  'ease-in-out-back': 'ease-in-out-back',
  'ease-in-out-circ': 'ease-in-out-circ',
  'ease-in-out-expo': 'ease-in-out-expo'
};

// Duration mapping
const durationClasses = {
  300: 'duration-fast',
  600: 'duration-normal',
  1000: 'duration-slow',
  2000: 'duration-slower'
};

// Delay mapping
const delayClasses = {
  100: 'delay-100',
  200: 'delay-200',
  300: 'delay-300',
  500: 'delay-500',
  700: 'delay-700',
  1000: 'delay-1000'
};

// Main hook for optimized animations
export const useOptimizedAnimation = (config: AnimationConfig) => {
  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<AnimationState>({
    isVisible: false,
    isAnimating: false,
    hasAnimated: false
  });
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Create intersection observer
  useEffect(() => {
    if (!elementRef.current) return;
    
    const options = {
      threshold: config.threshold || 0.1,
      rootMargin: config.rootMargin || '50px'
    };
    
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState(prev => ({ ...prev, isVisible: true }));
        
        if (config.once) {
          observerRef.current?.disconnect();
        }
      } else if (!config.once) {
        setState(prev => ({ ...prev, isVisible: false }));
      }
    }, options);
    
    observerRef.current.observe(elementRef.current);
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [config.threshold, config.rootMargin, config.once]);
  
  // Apply animation classes
  useEffect(() => {
    if (!elementRef.current || !state.isVisible) return;
    
    const element = elementRef.current;
    const animationClass = animationClasses[config.type];
    
    if (!animationClass) return;
    
    // Check performance limits
    if (animationPerformance.activeAnimations >= animationPerformance.maxConcurrent) {
      console.warn('Too many concurrent animations. Skipping animation.');
      return;
    }
    
    setState(prev => ({ ...prev, isAnimating: true, hasAnimated: true }));
    animationPerformance.activeAnimations++;
    
    // Apply base classes
    element.classList.add('animate-gpu', 'animate-smooth');
    
    // Apply animation class
    element.classList.add(animationClass);
    
    // Apply duration class
    if (config.duration && durationClasses[config.duration as keyof typeof durationClasses]) {
      element.classList.add(durationClasses[config.duration as keyof typeof durationClasses]);
    }
    
    // Apply delay class
    if (config.delay && delayClasses[config.delay as keyof typeof delayClasses]) {
      element.classList.add(delayClasses[config.delay as keyof typeof delayClasses]);
    }
    
    // Apply easing class
    if (config.easing && easingClasses[config.easing as keyof typeof easingClasses]) {
      const easingClass = easingClasses[config.easing as keyof typeof easingClasses];
      if (easingClass) {
        element.classList.add(easingClass);
      }
    }
    
    // Set custom duration and delay via CSS variables
    if (config.duration && !durationClasses[config.duration as keyof typeof durationClasses]) {
      element.style.setProperty('--animation-duration', `${config.duration}ms`);
    }
    
    if (config.delay && !delayClasses[config.delay as keyof typeof delayClasses]) {
      element.style.setProperty('--animation-delay', `${config.delay}ms`);
    }
    
    // Monitor performance
    const animationEndHandler = () => {
      setState(prev => ({ ...prev, isAnimating: false }));
      animationPerformance.activeAnimations--;
      monitorFrameRate();
      element.removeEventListener('animationend', animationEndHandler);
    };
    
    element.addEventListener('animationend', animationEndHandler);
    
    return () => {
      element.removeEventListener('animationend', animationEndHandler);
      animationPerformance.activeAnimations--;
    };
  }, [state.isVisible, config]);
  
  return {
    ref: elementRef,
    ...state
  };
};

// Hook for staggered animations
export const useStaggeredAnimation = (
  configs: AnimationConfig[],
  staggerDelay: number = 100
) => {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [states, setStates] = useState<AnimationState[]>(
    configs.map(() => ({ isVisible: false, isAnimating: false, hasAnimated: false }))
  );
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '50px'
    };
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = refs.current.findIndex(ref => ref === entry.target);
        if (index !== -1 && entry.isIntersecting) {
          // Trigger staggered animations
          setTimeout(() => {
            setStates(prev => {
              const newStates = [...prev];
              newStates[index] = { ...newStates[index], isVisible: true };
              return newStates;
            });
          }, index * staggerDelay);
        }
      });
    }, options);
    
    refs.current.forEach(ref => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [staggerDelay]);
  
  const setRef = useCallback((index: number) => (element: HTMLElement | null) => {
    refs.current[index] = element;
  }, []);
  
  return {
    setRef,
    states
  };
};

// Hook for scroll-based animations
export const useScrollAnimation = (config: {
  type: 'parallax' | 'fadeOnScroll' | 'scaleOnScroll';
  speed?: number;
  threshold?: number;
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    const speed = config.speed || 0.5;
    
    switch (config.type) {
      case 'parallax':
        const parallaxY = (scrollY - elementTop) * speed;
        element.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
        break;
        
      case 'fadeOnScroll':
        const fadeProgress = Math.max(0, Math.min(1, (scrollY - elementTop + window.innerHeight) / window.innerHeight));
        element.style.opacity = fadeProgress.toString();
        break;
        
      case 'scaleOnScroll':
        const scaleProgress = Math.max(0.8, Math.min(1, (scrollY - elementTop + window.innerHeight) / window.innerHeight));
        element.style.transform = `scale3d(${scaleProgress}, ${scaleProgress}, 1)`;
        break;
    }
  }, [scrollY, config]);
  
  return {
    ref: elementRef,
    scrollY
  };
};

// Hook for hover animations
export const useHoverAnimation = (config: {
  type: 'lift' | 'scale' | 'glow' | 'rotate';
  intensity?: number;
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    const intensity = config.intensity || 1;
    
    // Apply base hover class
    element.classList.add(`hover-${config.type}`);
    
    // Apply performance optimizations
    element.classList.add('will-change-transform');
    
    return () => {
      element.classList.remove(`hover-${config.type}`, 'will-change-transform');
    };
  }, [config.type, config.intensity]);
  
  return {
    ref: elementRef,
    isHovered
  };
};

// Hook for performance monitoring
export const useAnimationPerformance = () => {
  const [metrics, setMetrics] = useState({
    activeAnimations: 0,
    frameDrops: 0,
    averageFPS: 60
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        activeAnimations: animationPerformance.activeAnimations,
        frameDrops: animationPerformance.frameDrops,
        averageFPS: animationPerformance.frameDrops > 0 ? 60 - animationPerformance.frameDrops : 60
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return metrics;
};

// Utility function to replace Framer Motion animations
export const replaceFramerMotion = {
  // Replace motion.div with optimized CSS animations
  fadeIn: (props: any) => ({
    ...props,
    className: `${props.className || ''} animate-fade-in animate-gpu`.trim()
  }),
  
  slideUp: (props: any) => ({
    ...props,
    className: `${props.className || ''} animate-slide-up animate-gpu`.trim()
  }),
  
  scaleIn: (props: any) => ({
    ...props,
    className: `${props.className || ''} animate-scale-in animate-gpu`.trim()
  }),
  
  // Replace complex Framer Motion variants with CSS classes
  container: (props: any) => ({
    ...props,
    className: `${props.className || ''} animate-on-scroll`.trim()
  }),
  
  item: (index: number) => (props: any) => ({
    ...props,
    className: `${props.className || ''} animate-on-scroll stagger-${Math.min(index + 1, 5)}`.trim()
  })
};

export default useOptimizedAnimation;