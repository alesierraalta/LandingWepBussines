// Bundle size optimization utilities
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/GeistVF.woff2',
    '/fonts/GeistMonoVF.woff2'
  ];

  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // DNS prefetch for external resources
  const dnsPrefetches = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com'
  ];

  dnsPrefetches.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Code splitting utilities
export const dynamicImport = <T>(importFn: () => Promise<{ default: T }>) => {
  return memo(lazy(importFn));
};

// Critical CSS extraction for above-the-fold content
export const criticalCSS = `
  /* Critical styles for immediate render */
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
  
  .glass-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

// Performance metrics tracking
export class PerformanceTracker {
  private static instance: PerformanceTracker;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  markStart(name: string) {
    this.metrics.set(`${name}_start`, performance.now());
  }

  markEnd(name: string) {
    const startTime = this.metrics.get(`${name}_start`);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.metrics.set(name, duration);
      console.log(`${name}: ${duration.toFixed(2)}ms`);
    }
  }

  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
}

// Resource loading optimization
export const optimizeImageLoading = () => {
  if (typeof window === 'undefined') return;

  // Lazy load images with intersection observer
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.classList.add('fade-in');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Memory management utilities
export const cleanupResources = () => {
  // Cancel any pending animation frames
  if (typeof window !== 'undefined') {
    const highestId = setTimeout(() => {}, 0);
    for (let id = 0; id < highestId; id++) {
      clearTimeout(id);
    }
  }
};

// Tree shaking optimized exports
export { memo, lazy, Suspense } from 'react';
export { motion } from 'framer-motion';
export type { ComponentType, LazyExoticComponent } from 'react';
