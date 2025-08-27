'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useInView } from 'framer-motion';

interface Spline3DContextType {
  activeScenes: Set<string>;
  registerScene: (id: string) => void;
  unregisterScene: (id: string) => void;
  isSceneActive: (id: string) => boolean;
  maxConcurrentScenes: number;
}

const Spline3DContext = createContext<Spline3DContextType | null>(null);

export const useSpline3D = () => {
  const context = useContext(Spline3DContext);
  if (!context) {
    throw new Error('useSpline3D must be used within a Spline3DProvider');
  }
  return context;
};

interface Spline3DProviderProps {
  children: React.ReactNode;
  maxConcurrentScenes?: number;
}

export const Spline3DProvider: React.FC<Spline3DProviderProps> = ({ 
  children, 
  maxConcurrentScenes = 3 
}) => {
  const [activeScenes, setActiveScenes] = useState<Set<string>>(new Set());

  const registerScene = useCallback((id: string) => {
    setActiveScenes(prev => {
      const newSet = new Set(prev);
      
      // If we're at the limit, remove the oldest scene
      if (newSet.size >= maxConcurrentScenes) {
        const firstScene = newSet.values().next().value;
        if (firstScene) {
          newSet.delete(firstScene);
        }
      }
      
      newSet.add(id);
      return newSet;
    });
  }, [maxConcurrentScenes]);

  const unregisterScene = useCallback((id: string) => {
    setActiveScenes(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const isSceneActive = useCallback((id: string) => {
    return activeScenes.has(id);
  }, [activeScenes]);

  const value: Spline3DContextType = {
    activeScenes,
    registerScene,
    unregisterScene,
    isSceneActive,
    maxConcurrentScenes
  };

  return (
    <Spline3DContext.Provider value={value}>
      {children}
    </Spline3DContext.Provider>
  );
};

// Hook for managing scene visibility based on viewport
export const useSplineVisibility = (sceneId: string, threshold = 0.3) => {
  const { registerScene, unregisterScene, isSceneActive } = useSpline3D();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold });
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true);
      registerScene(sceneId);
    } else if (!inView && shouldLoad) {
      // Delay unregistering to avoid flickering
      const timeout = setTimeout(() => {
        unregisterScene(sceneId);
        setShouldLoad(false);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [inView, shouldLoad, sceneId, registerScene, unregisterScene]);

  return {
    ref,
    shouldLoad: shouldLoad && isSceneActive(sceneId),
    inView
  };
};

// Performance monitoring hook
export const useSplinePerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0
  });

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const measurePerformance = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setPerformanceMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return performanceMetrics;
};

// Optimized Spline loader with performance monitoring
export const OptimizedSplineLoader: React.FC<{
  sceneUrl: string;
  sceneId: string;
  fallback?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ sceneUrl, sceneId, fallback, className, style }) => {
  const { shouldLoad, ref } = useSplineVisibility(sceneId);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      const loadSpline = async () => {
        try {
          const startTime = performance.now();
          
          // Dynamically import Spline only when needed
          const { default: Spline } = await import('@splinetool/react-spline');
          
          const loadTime = performance.now() - startTime;
          console.log(`Spline scene ${sceneId} loaded in ${loadTime.toFixed(2)}ms`);
          
          setIsLoaded(true);
        } catch (err) {
          console.error(`Failed to load Spline scene ${sceneId}:`, err);
          setError('Failed to load 3D scene');
        }
      };

      loadSpline();
    }
  }, [shouldLoad, isLoaded, sceneId]);

  if (error) {
    return (
      <div className={className} style={style} ref={ref}>
        <div className="flex items-center justify-center h-full text-gray-500">
          <span>3D scene unavailable</span>
        </div>
      </div>
    );
  }

  if (!shouldLoad || !isLoaded) {
    return (
      <div className={className} style={style} ref={ref}>
        {fallback || (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    );
  }

  // Lazy load the actual Spline component
  const LazySpline = React.lazy(() => import('@splinetool/react-spline'));

  return (
    <div className={className} style={style} ref={ref}>
      <React.Suspense fallback={fallback}>
        <LazySpline
          scene={sceneUrl}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
          onLoad={() => console.log(`Spline scene ${sceneId} rendered`)}
        />
      </React.Suspense>
    </div>
  );
};

// Performance debug component (only in development)
export const SplinePerformanceDebug: React.FC = () => {
  const { activeScenes } = useSpline3D();
  const metrics = useSplinePerformance();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50">
      <div>Active Scenes: {activeScenes.size}</div>
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(2)} MB</div>
      <div className="text-xs mt-2">
        Scenes: {Array.from(activeScenes).join(', ')}
      </div>
    </div>
  );
};