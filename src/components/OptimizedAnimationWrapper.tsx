'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useOptimizedAnimation, useStaggeredAnimation, useScrollAnimation, useHoverAnimation } from '@/hooks/useOptimizedAnimations';

interface OptimizedAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'float' | 'pulse' | 'bounce';
  duration?: number;
  delay?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  hover?: 'lift' | 'scale' | 'glow' | 'rotate';
  scroll?: 'parallax' | 'fadeOnScroll' | 'scaleOnScroll';
  scrollSpeed?: number;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

// Main optimized animation wrapper
export const OptimizedAnimationWrapper = forwardRef<HTMLElement, OptimizedAnimationWrapperProps>((
  {
    children,
    animation = 'fadeIn',
    duration = 600,
    delay = 0,
    easing = 'ease-out',
    threshold = 0.1,
    once = true,
    className = '',
    style = {},
    hover,
    scroll,
    scrollSpeed = 0.5,
    as: Component = 'div',
    ...props
  },
  ref
) => {
  const { ref: animationRef, isVisible, isAnimating } = useOptimizedAnimation({
    type: animation,
    duration,
    delay,
    easing,
    threshold,
    once
  });
  
  const { ref: hoverRef } = useHoverAnimation(
    hover ? { type: hover } : { type: 'lift' }
  );
  
  const { ref: scrollRef } = useScrollAnimation(
    scroll ? { type: scroll, speed: scrollSpeed } : { type: 'parallax', speed: 0 }
  );
  
  // Combine refs
  const combinedRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = combinedRef.current;
    if (element) {
      // Set all refs to the same element
      if (animationRef.current !== element) {
        (animationRef as any).current = element;
      }
      if (hover && hoverRef.current !== element) {
        (hoverRef as any).current = element;
      }
      if (scroll && scrollRef.current !== element) {
        (scrollRef as any).current = element;
      }
      if (ref) {
        if (typeof ref === 'function') {
          ref(element);
        } else {
          (ref as any).current = element;
        }
      }
    }
  }, [animationRef, hoverRef, scrollRef, ref, hover, scroll]);
  
  const combinedClassName = [
    className,
    isVisible ? 'animate-visible' : 'animate-hidden',
    isAnimating ? 'animate-active' : '',
    hover ? `hover-enabled hover-${hover}` : '',
    scroll ? `scroll-enabled scroll-${scroll}` : ''
  ].filter(Boolean).join(' ');
  
  return React.createElement(
    Component,
    {
      ref: combinedRef,
      className: combinedClassName,
      style,
      ...props
    },
    children
  );
});

OptimizedAnimationWrapper.displayName = 'OptimizedAnimationWrapper';

// Staggered animation container
interface StaggeredContainerProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  staggerDelay = 100,
  animation = 'fadeIn',
  className = '',
  as: Component = 'div'
}) => {
  const configs = React.Children.map(children, () => ({ type: animation as any })) || [];
  const { setRef, states } = useStaggeredAnimation(configs, staggerDelay);
  
  return React.createElement(
    Component,
    { className: `staggered-container ${className}` },
    React.Children.map(children, (child, index) => (
      <OptimizedAnimationWrapper
        key={index}
        ref={setRef(index)}
        animation={animation}
        className={states[index]?.isVisible ? 'stagger-visible' : 'stagger-hidden'}
      >
        {child}
      </OptimizedAnimationWrapper>
    ))
  );
};

// Optimized motion replacements for common Framer Motion patterns
export const MotionDiv = forwardRef<HTMLDivElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="div" ref={ref} />
));

export const MotionSection = forwardRef<HTMLElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="section" ref={ref} />
));

export const MotionArticle = forwardRef<HTMLElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="article" ref={ref} />
));

export const MotionHeader = forwardRef<HTMLElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="header" ref={ref} />
));

export const MotionFooter = forwardRef<HTMLElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="footer" ref={ref} />
));

export const MotionNav = forwardRef<HTMLElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="nav" ref={ref} />
));

export const MotionButton = forwardRef<HTMLButtonElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="button" ref={ref} hover="scale" />
));

export const MotionCard = forwardRef<HTMLDivElement, OptimizedAnimationWrapperProps>((props, ref) => (
  <OptimizedAnimationWrapper {...props} as="div" ref={ref} hover="lift" animation="fadeIn" />
));

// Performance-optimized list component
interface OptimizedListProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  staggerDelay?: number;
  className?: string;
  itemClassName?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const OptimizedList: React.FC<OptimizedListProps> = ({
  items,
  renderItem,
  animation = 'fadeIn',
  staggerDelay = 50,
  className = '',
  itemClassName = '',
  as: Component = 'div'
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * staggerDelay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    itemRefs.current.forEach(ref => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [items.length, staggerDelay]);
  
  const setItemRef = (index: number) => (element: HTMLElement | null) => {
    itemRefs.current[index] = element;
  };
  
  return React.createElement(
    Component,
    { className: `optimized-list ${className}` },
    items.map((item, index) => (
      <OptimizedAnimationWrapper
        key={index}
        ref={setItemRef(index)}
        animation={animation}
        className={`list-item ${itemClassName} ${
          visibleItems.has(index) ? 'item-visible' : 'item-hidden'
        }`}
        delay={0} // Delay is handled by the intersection observer
      >
        {renderItem(item, index)}
      </OptimizedAnimationWrapper>
    ))
  );
};

// Scroll-triggered animation container
interface ScrollTriggerProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  className?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

export const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  children,
  animation = 'fadeIn',
  threshold = 0.1,
  rootMargin = '50px',
  once = true,
  className = '',
  onEnter,
  onExit
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onEnter?.();
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
          onExit?.();
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(elementRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, onEnter, onExit]);
  
  return (
    <div
      ref={elementRef}
      className={`scroll-trigger ${className} ${
        isVisible ? `animate-${animation} animate-visible` : 'animate-hidden'
      }`}
    >
      {children}
    </div>
  );
};

// Performance monitoring component
export const AnimationDebugger: React.FC = () => {
  const [metrics, setMetrics] = useState({
    activeAnimations: 0,
    frameDrops: 0,
    averageFPS: 60
  });
  
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const interval = setInterval(() => {
      // This would connect to the performance monitoring in useOptimizedAnimations
      setMetrics({
        activeAnimations: document.querySelectorAll('.animate-active').length,
        frameDrops: 0, // Would be calculated from performance API
        averageFPS: 60
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>Active Animations: {metrics.activeAnimations}</div>
      <div>Frame Drops: {metrics.frameDrops}</div>
      <div>Average FPS: {metrics.averageFPS}</div>
    </div>
  );
};

export default OptimizedAnimationWrapper;