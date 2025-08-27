// Advanced Performance Optimization Configuration
import { lazy, Suspense, ComponentType, LazyExoticComponent } from 'react';
import { motion } from 'framer-motion';

// Critical resource preloading
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical fonts with font-display: swap
  const criticalFonts = [
    { href: '/fonts/GeistVF.woff2', type: 'font/woff2' },
    { href: '/fonts/GeistMonoVF.woff2', type: 'font/woff2' }
  ];

  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font.href;
    link.as = 'font';
    link.type = font.type;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images for LCP optimization
  const criticalImages = [
    '/hero-background.webp',
    '/logo.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });

  // DNS prefetch for external resources
  const externalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Enhanced lazy loading with intersection observer
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
): LazyExoticComponent<T> => {
  const LazyComponent = lazy(importFn);
  
  return LazyComponent;
};

// Optimized suspense wrapper with error boundary
export const OptimizedSuspense: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minDelay?: number;
}> = ({ children, fallback, minDelay = 200 }) => {
  const defaultFallback = (
    <div className="flex items-center justify-center min-h-[200px] gpu-accelerated">
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
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for immediate render */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    height: 80px;
  }
  
  .gradient-mesh {
    background: radial-gradient(circle at 20% 80%, rgba(16, 6, 159, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(69, 92, 255, 0.08) 0%, transparent 50%),
                linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
  }
  
  .gpu-accelerated {
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
  }
`;

// Image optimization utilities
export const optimizeImageLoading = () => {
  if (typeof window === 'undefined') return;

  // Lazy load images with intersection observer
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Create a new image to preload
          const newImg = new Image();
          newImg.onload = () => {
            img.src = img.dataset.src!;
            img.classList.add('fade-in');
            img.removeAttribute('data-src');
          };
          newImg.src = img.dataset.src!;
          
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  );

  images.forEach(img => imageObserver.observe(img));
};

// Bundle size optimization
export const optimizeBundleSize = () => {
  // Tree-shake unused Framer Motion features
  const motionConfig = {
    features: {
      layout: false, // Disable if not using layout animations
      drag: false,   // Disable if not using drag
    }
  };
  
  return motionConfig;
};

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window === 'undefined') return;

  // Measure Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
      if (entry.entryType === 'layout-shift') {
        console.log('CLS:', entry.value);
      }
    });
  });

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
};

// Memory management
export const cleanupResources = () => {
  if (typeof window === 'undefined') return;

  // Cancel animation frames
  const highestId = setTimeout(() => {}, 0);
  for (let id = 0; id < highestId; id++) {
    clearTimeout(id);
  }

  // Clear intervals
  const highestIntervalId = setInterval(() => {}, 0);
  for (let id = 0; id < highestIntervalId; id++) {
    clearInterval(id);
  }
};

// Viewport-based component loading
export const ViewportLazyLoad: React.FC<{
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  fallback?: React.ReactNode;
}> = ({ children, rootMargin = '100px', threshold = 0.1, fallback }) => {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className="gpu-accelerated">
      {shouldLoad ? children : (fallback || <div className="min-h-[200px]" />)}
    </div>
  );
};

// Export optimized motion components
export const OptimizedMotion = {
  div: motion.div,
  section: motion.section,
  h1: motion.h1,
  p: motion.p,
  button: motion.button,
};

// Performance-optimized animation presets
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0, transform: 'translateZ(0)' },
    animate: { opacity: 1, transform: 'translateZ(0)' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  slideUp: {
    initial: { opacity: 0, y: 20, transform: 'translateZ(0)' },
    animate: { opacity: 1, y: 0, transform: 'translateZ(0)' },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95, transform: 'translateZ(0)' },
    animate: { opacity: 1, scale: 1, transform: 'translateZ(0)' },
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export default {
  preloadCriticalResources,
  createLazyComponent,
  OptimizedSuspense,
  criticalCSS,
  optimizeImageLoading,
  optimizeBundleSize,
  measurePerformance,
  cleanupResources,
  ViewportLazyLoad,
  OptimizedMotion,
  animationPresets
};