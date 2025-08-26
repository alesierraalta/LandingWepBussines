'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useRef, useEffect } from 'react';
import { PerformanceLoader } from '@/lib/performance';

// Lazy load heavy components with optimized loading
export const LazyHeroSection = dynamic(
  () => import('./HeroSection'),
  {
    loading: () => <PerformanceLoader />,
    ssr: true, // Enable SSR for critical above-fold content
  }
);

export const LazyServicesSection = dynamic(
  () => import('./ServicesSection'),
  {
    loading: () => <PerformanceLoader />,
    ssr: false, // Disable SSR for below-fold content
  }
);

export const LazyPortfolioSection = dynamic(
  () => import('./PortfolioSection'),
  {
    loading: () => <PerformanceLoader />,
    ssr: false,
  }
);

export const LazyTestimonialsSection = dynamic(
  () => import('./TestimonialsSection'),
  {
    loading: () => <PerformanceLoader />,
    ssr: false,
  }
);

export const LazyContactSection = dynamic(
  () => import('./ContactSection'),
  {
    loading: () => <PerformanceLoader />,
    ssr: false,
  }
);

// Lazy load 3D components only when needed
export const LazyThree3DScene = dynamic(
  () => import('./Three3DScene').then(mod => ({ default: mod.default })),
  {
    loading: () => (
      <div className="w-full h-64 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse rounded-lg" />
    ),
    ssr: false, // Never SSR 3D components
  }
);



// Progressive enhancement wrapper
export const ProgressiveEnhancement: React.FC<{
  fallback: React.ReactNode;
  children: React.ReactNode;
}> = ({ fallback, children }) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Intersection-based lazy loading
export const IntersectionLazyLoad: React.FC<{
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}> = ({ children, rootMargin = '100px', threshold = 0.1 }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <div ref={ref}>
      {shouldLoad ? children : <PerformanceLoader />}
    </div>
  );
};

// Resource hints for preloading
export const ResourceHints = () => (
  <>
    {/* Preload critical fonts */}
    <link
      rel="preload"
      href="/fonts/inter-var.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    
    {/* Preload critical images */}
    <link
      rel="preload"
      href="/hero-image.webp"
      as="image"
      type="image/webp"
    />
    
    {/* DNS prefetch for external resources */}
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
  </>
);
