'use client';

import React, { Suspense, lazy, memo, useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedSuspense, ViewportLazyLoad, animationPresets } from '@/lib/advancedOptimization';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load 3D components with optimized imports
const SplineScene = lazy(() => 
  import('./SplineSceneBasic').then(module => ({
    default: module.default
  }))
);

const SplinePortfolio3D = lazy(() => 
  import('./SplinePortfolio3D').then(module => ({
    default: module.default
  }))
);

const SplineServices3D = lazy(() => 
  import('./SplineServices3D').then(module => ({
    default: module.default
  }))
);

const SplineTestimonials3D = lazy(() => 
  import('./SplineTestimonials3D').then(module => ({
    default: module.default
  }))
);

// Optimized fallback component
const Optimized3DFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg gpu-accelerated">
    <motion.div
      className="relative"
      {...animationPresets.scaleIn}
    >
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
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
      <motion.p 
        className="mt-4 text-sm text-gray-600 text-center"
        {...animationPresets.fadeIn}
        transition={{ delay: 0.2 }}
      >
        Cargando experiencia 3D...
      </motion.p>
    </motion.div>
  </div>
));

Optimized3DFallback.displayName = 'Optimized3DFallback';

// Error fallback component
const Error3DFallback = memo(({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
    <motion.div
      className="text-center"
      {...animationPresets.fadeIn}
    >
      <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar contenido 3D</h3>
      <p className="text-sm text-red-600 mb-4">No se pudo cargar la experiencia 3D. Esto no afecta la funcionalidad del sitio.</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Reintentar
      </button>
    </motion.div>
  </div>
));

Error3DFallback.displayName = 'Error3DFallback';

// Performance monitor for 3D components
const use3DPerformanceMonitor = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });

  const measurePerformance = useCallback((componentName: string) => {
    const startTime = performance.now();
    
    return {
      onLoad: () => {
        const loadTime = performance.now() - startTime;
        setPerformanceMetrics(prev => ({ ...prev, loadTime }));
        console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      },
      onRender: () => {
        const renderTime = performance.now() - startTime;
        setPerformanceMetrics(prev => ({ ...prev, renderTime }));
      }
    };
  }, []);

  return { performanceMetrics, measurePerformance };
};

// Optimized 3D component wrapper
interface Optimized3DWrapperProps {
  children: React.ReactNode;
  componentName: string;
  priority?: 'high' | 'medium' | 'low';
  rootMargin?: string;
  threshold?: number;
}

const Optimized3DWrapper = memo<Optimized3DWrapperProps>(({ 
  children, 
  componentName, 
  priority = 'medium',
  rootMargin = '100px',
  threshold = 0.1 
}) => {
  const { measurePerformance } = use3DPerformanceMonitor();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    const metrics = measurePerformance(componentName);
    metrics.onLoad();
    setIsLoaded(true);
  }, [componentName, measurePerformance]);

  // Adjust loading strategy based on priority
  const loadingConfig = {
    high: { rootMargin: '200px', threshold: 0.01 },
    medium: { rootMargin: '100px', threshold: 0.1 },
    low: { rootMargin: '50px', threshold: 0.3 }
  };

  const config = loadingConfig[priority];

  return (
    <ViewportLazyLoad
      rootMargin={config.rootMargin}
      threshold={config.threshold}
      fallback={<Optimized3DFallback />}
    >
      <ErrorBoundary
        FallbackComponent={Error3DFallback}
        onError={(error) => {
          console.error(`Error in ${componentName}:`, error);
        }}
      >
        <OptimizedSuspense fallback={<Optimized3DFallback />}>
          <motion.div
            className="gpu-accelerated"
            {...animationPresets.fadeIn}
            onAnimationComplete={handleLoad}
          >
            {children}
          </motion.div>
        </OptimizedSuspense>
      </ErrorBoundary>
    </ViewportLazyLoad>
  );
});

Optimized3DWrapper.displayName = 'Optimized3DWrapper';

// Optimized 3D component exports
export const OptimizedSplineHero = memo(() => (
  <Optimized3DWrapper componentName="SplineHero" priority="high">
    <SplineScene />
  </Optimized3DWrapper>
));

export const OptimizedSplinePortfolio = memo(() => (
  <Optimized3DWrapper componentName="SplinePortfolio" priority="medium">
    <SplinePortfolio3D />
  </Optimized3DWrapper>
));

export const OptimizedSplineServices = memo(() => (
  <Optimized3DWrapper componentName="SplineServices" priority="medium">
    <SplineServices3D />
  </Optimized3DWrapper>
));

export const OptimizedSplineTestimonials = memo(() => (
  <Optimized3DWrapper componentName="SplineTestimonials" priority="low">
    <SplineTestimonials3D />
  </Optimized3DWrapper>
));

// Progressive enhancement for 3D content
export const Progressive3DEnhancement: React.FC<{
  fallback2D: React.ReactNode;
  enhanced3D: React.ReactNode;
  enableCondition?: boolean;
}> = ({ fallback2D, enhanced3D, enableCondition = true }) => {
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    // Check device capabilities
    const checkCapabilities = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const hasWebGL = !!gl;
      const hasGoodPerformance = navigator.hardwareConcurrency >= 4;
      const hasEnoughMemory = (navigator as any).deviceMemory >= 4;
      
      return hasWebGL && hasGoodPerformance && enableCondition;
    };

    setCanRender3D(checkCapabilities());
  }, [enableCondition]);

  return (
    <AnimatePresence mode="wait">
      {canRender3D ? (
        <motion.div
          key="3d-content"
          {...animationPresets.fadeIn}
        >
          {enhanced3D}
        </motion.div>
      ) : (
        <motion.div
          key="2d-content"
          {...animationPresets.fadeIn}
        >
          {fallback2D}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Resource cleanup hook
export const use3DResourceCleanup = () => {
  useEffect(() => {
    return () => {
      // Cleanup WebGL contexts and resources
      const canvases = document.querySelectorAll('canvas');
      canvases.forEach(canvas => {
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && gl.getExtension('WEBGL_lose_context')) {
          gl.getExtension('WEBGL_lose_context')!.loseContext();
        }
      });
    };
  }, []);
};

// Export all optimized components
export {
  Optimized3DFallback,
  Error3DFallback,
  Optimized3DWrapper,
  use3DPerformanceMonitor,
  use3DResourceCleanup
};

export default {
  OptimizedSplineHero,
  OptimizedSplinePortfolio,
  OptimizedSplineServices,
  OptimizedSplineTestimonials,
  Progressive3DEnhancement
};