'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useInView } from 'framer-motion';
import { isSplineEnabled, reportSplineError, getSplineConfig } from '@/lib/spline-config';

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

// Optimized Spline loader with enhanced error handling and buffer validation
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Validate scene URL format
  const isValidSplineUrl = (url: string): boolean => {
    return url.includes('spline.design') && url.endsWith('.splinecode');
  };

  // Enhanced error boundary for Spline scenes
  const SplineErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      const handleError = (event: ErrorEvent) => {
        if (event.message?.includes('buffer') || event.message?.includes('spline')) {
          console.error('Spline buffer error detected:', event.error);
          setHasError(true);
          setError('3D scene data corrupted');
        }
      };

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        if (event.reason?.message?.includes('buffer') || event.reason?.message?.includes('spline')) {
          console.error('Spline promise rejection:', event.reason);
          setHasError(true);
          setError('Failed to load 3D scene data');
        }
      };

      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }, []);

    if (hasError) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-400">3D</span>
            </div>
            <span className="text-sm">Scene temporarily unavailable</span>
          </div>
        </div>
      );
    }

    return <>{children}</>;
  };

  useEffect(() => {
    // Check if Spline is globally enabled
    if (!isSplineEnabled()) {
      setError('3D scenes disabled for performance');
      return;
    }

    if (shouldLoad && !isLoaded && !error) {
      const config = getSplineConfig();
      const loadSpline = async () => {
        try {
          // Validate URL before attempting to load
          if (!isValidSplineUrl(sceneUrl)) {
            const errorMsg = 'Invalid Spline scene URL format';
            reportSplineError(sceneId, errorMsg);
            throw new Error(errorMsg);
          }

          const startTime = performance.now();
          
          // Pre-validate scene availability with configurable timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), config.timeout);

          try {
            const response = await fetch(sceneUrl, { 
              method: 'HEAD',
              signal: controller.signal,
              cache: 'force-cache'
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`Scene not accessible: ${response.status}`);
            }

            // Check content type if available
            const contentType = response.headers.get('content-type');
            if (contentType && !contentType.includes('application/octet-stream') && !contentType.includes('binary')) {
              console.warn(`Unexpected content type for Spline scene: ${contentType}`);
            }
          } catch (fetchError) {
            clearTimeout(timeoutId);
            const errorMsg = fetchError instanceof Error ? fetchError.message : 'Scene validation failed';
            
            if (retryCount < config.maxRetries) {
              console.warn(`Retrying scene load for ${sceneId} (${retryCount + 1}/${config.maxRetries})`);
              setRetryCount(prev => prev + 1);
              setTimeout(() => loadSpline(), 1000 * (retryCount + 1)); // Exponential backoff
              return;
            }
            
            reportSplineError(sceneId, errorMsg);
            throw new Error('Scene validation failed');
          }
          
          // Dynamically import Spline only when needed
          const { default: Spline } = await import('@splinetool/react-spline');
          
          const loadTime = performance.now() - startTime;
          if (config.debugMode) {
            console.log(`Spline scene ${sceneId} validated and loaded in ${loadTime.toFixed(2)}ms`);
          }
          
          setIsLoaded(true);
          setRetryCount(0); // Reset retry count on success
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Unknown Spline error';
          console.error(`Failed to load Spline scene ${sceneId}:`, errorMsg);
          reportSplineError(sceneId, errorMsg);
          
          if (retryCount < config.maxRetries) {
            console.warn(`Retrying scene load for ${sceneId} (${retryCount + 1}/${config.maxRetries})`);
            setRetryCount(prev => prev + 1);
            setTimeout(() => loadSpline(), 2000 * (retryCount + 1)); // Exponential backoff
          } else {
            setError('3D scene temporarily unavailable');
          }
        }
      };

      loadSpline();
    }
  }, [shouldLoad, isLoaded, sceneId, sceneUrl, retryCount, error]);

  if (error) {
    return (
      <div className={className} style={style} ref={ref}>
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-400">3D</span>
            </div>
            <span className="text-sm">{error}</span>
            {retryCount > 0 && (
              <div className="text-xs text-gray-400 mt-1">
                Retry {retryCount}/{maxRetries}
              </div>
            )}
          </div>
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
            {retryCount > 0 && (
              <span className="ml-2 text-xs text-gray-500">Retrying...</span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Lazy load the actual Spline component with error boundary
  const LazySpline = React.lazy(() => import('@splinetool/react-spline'));

  return (
    <div className={className} style={style} ref={ref}>
      <SplineErrorBoundary>
        <React.Suspense fallback={fallback}>
          <LazySpline
            scene={sceneUrl}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            onLoad={() => {
              console.log(`Spline scene ${sceneId} rendered successfully`);
              setError(null); // Clear any previous errors
            }}
            onError={(error) => {
              const errorMsg = error instanceof Error ? error.message : 'Spline runtime error';
              console.error(`Spline runtime error for ${sceneId}:`, errorMsg);
              reportSplineError(sceneId, errorMsg);
              setError('3D scene rendering failed');
            }}
          />
        </React.Suspense>
      </SplineErrorBoundary>
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