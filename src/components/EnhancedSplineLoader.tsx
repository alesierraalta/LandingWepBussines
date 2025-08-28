'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplineErrorBoundary, useSplineErrorReporting } from './SplineErrorBoundary';

interface SplineSceneValidation {
  isValid: boolean;
  size: number;
  contentType: string;
  error?: string;
}

interface EnhancedSplineLoaderProps {
  sceneUrl: string;
  sceneId: string;
  fallback?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  timeout?: number;
  validateBeforeLoad?: boolean;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}

const validateSplineScene = async (url: string): Promise<SplineSceneValidation> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    const size = contentLength ? parseInt(contentLength, 10) : 0;
    
    // Basic validation checks
    if (size === 0) {
      return {
        isValid: false,
        size,
        contentType: contentType || 'unknown',
        error: 'Scene file appears to be empty'
      };
    }

    if (size < 1024) { // Less than 1KB seems too small for a Spline scene
      return {
        isValid: false,
        size,
        contentType: contentType || 'unknown',
        error: 'Scene file is too small to be valid'
      };
    }

    // Check if the content type suggests it's a binary file (Spline scenes are typically binary)
    const isLikelyBinary = !contentType || 
      contentType.includes('application/octet-stream') ||
      contentType.includes('binary') ||
      !contentType.includes('text');

    return {
      isValid: true,
      size,
      contentType: contentType || 'unknown'
    };

  } catch (error) {
    return {
      isValid: false,
      size: 0,
      contentType: 'unknown',
      error: error instanceof Error ? error.message : 'Validation failed'
    };
  }
};

const SplineLoadingIndicator: React.FC<{ 
  stage: 'validating' | 'loading' | 'rendering';
  progress?: number;
}> = ({ stage, progress = 0 }) => {
  const stageMessages = {
    validating: 'Validating 3D scene...',
    loading: 'Loading 3D assets...',
    rendering: 'Rendering scene...'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full p-6"
    >
      {/* Animated Loading Ring */}
      <div className="relative w-16 h-16 mb-4">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-200"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Progress indicator */}
        {progress > 0 && (
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ scale: 0 }}
            animate={{ scale: progress / 100 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Stage Message */}
      <motion.p
        key={stage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-gray-600 mb-2"
      >
        {stageMessages[stage]}
      </motion.p>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </motion.div>
  );
};

export const EnhancedSplineLoader: React.FC<EnhancedSplineLoaderProps> = ({
  sceneUrl,
  sceneId,
  fallback,
  className = '',
  style,
  timeout = 15000,
  validateBeforeLoad = true,
  onLoadStart,
  onLoadComplete,
  onLoadError,
}) => {
  const [loadingStage, setLoadingStage] = useState<'validating' | 'loading' | 'rendering' | 'complete' | 'error'>('validating');
  const [progress, setProgress] = useState(0);
  const [validation, setValidation] = useState<SplineSceneValidation | null>(null);
  const [SplineComponent, setSplineComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { reportError } = useSplineErrorReporting();

  // Memoized scene validation
  const validateScene = useCallback(async () => {
    if (!validateBeforeLoad) {
      setValidation({ isValid: true, size: 0, contentType: 'unknown' });
      return true;
    }

    setLoadingStage('validating');
    setProgress(10);

    try {
      const result = await validateSplineScene(sceneUrl);
      setValidation(result);
      setProgress(30);

      if (!result.isValid) {
        throw new Error(result.error || 'Scene validation failed');
      }

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Validation failed');
      setError(error);
      setLoadingStage('error');
      reportError(error, `Scene validation for ${sceneId}`);
      return false;
    }
  }, [sceneUrl, sceneId, validateBeforeLoad, reportError]);

  // Load Spline component dynamically
  const loadSplineComponent = useCallback(async () => {
    setLoadingStage('loading');
    setProgress(40);

    try {
      onLoadStart?.();

      // Dynamic import with timeout
      const importPromise = import('@splinetool/react-spline');
      const timeoutPromise = new Promise((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(new Error('Spline import timeout'));
        }, timeout);
      });

      const { default: Spline } = await Promise.race([importPromise, timeoutPromise]) as any;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setSplineComponent(() => Spline);
      setProgress(70);
      setLoadingStage('rendering');

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load Spline component');
      setError(error);
      setLoadingStage('error');
      reportError(error, `Component loading for ${sceneId}`);
      onLoadError?.(error);
    }
  }, [sceneId, timeout, onLoadStart, onLoadError, reportError]);

  // Initialize loading process
  useEffect(() => {
    const initializeSpline = async () => {
      const isValid = await validateScene();
      if (isValid) {
        await loadSplineComponent();
      }
    };

    initializeSpline();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [validateScene, loadSplineComponent]);

  // Handle Spline load completion
  const handleSplineLoad = useCallback(() => {
    setProgress(100);
    setLoadingStage('complete');
    onLoadComplete?.();
    
    // Simulate rendering completion
    setTimeout(() => {
      setProgress(0);
    }, 1000);
  }, [onLoadComplete]);

  // Handle Spline errors
  const handleSplineError = useCallback((splineError: any) => {
    const error = new Error(splineError?.message || 'Spline rendering error');
    setError(error);
    setLoadingStage('error');
    reportError(error, `Spline rendering for ${sceneId}`);
    onLoadError?.(error);
  }, [sceneId, reportError, onLoadError]);

  // Memoized Spline component to prevent unnecessary re-renders
  const MemoizedSpline = useMemo(() => {
    if (!SplineComponent) return null;

    return React.memo((props: any) => (
      <SplineComponent
        {...props}
        onLoad={handleSplineLoad}
        onError={handleSplineError}
        style={{ 
          width: '100%', 
          height: '100%', 
          background: 'transparent',
          ...props.style 
        }}
      />
    ));
  }, [SplineComponent, handleSplineLoad, handleSplineError]);

  // Render loading states
  if (loadingStage === 'error' || error) {
    return (
      <div className={className} style={style}>
        {fallback || (
          <div className="flex items-center justify-center h-full text-red-500">
            <span>Failed to load 3D scene</span>
          </div>
        )}
      </div>
    );
  }

  if (loadingStage !== 'complete' || !MemoizedSpline) {
    return (
      <div className={className} style={style}>
        <SplineLoadingIndicator stage={loadingStage} progress={progress} />
      </div>
    );
  }

  // Render the Spline component
  return (
    <div className={className} style={style}>
      <SplineErrorBoundary
        maxRetries={3}
        retryDelay={2000}
        onError={(error, errorInfo) => {
          reportError(error, `Spline runtime for ${sceneId}`);
          console.error('Spline Error Boundary:', { error, errorInfo, sceneId, validation });
        }}
      >
        <MemoizedSpline scene={sceneUrl} />
      </SplineErrorBoundary>
    </div>
  );
};

// Hook for managing multiple Spline scenes
export const useSplineManager = () => {
  const [activeScenes, setActiveScenes] = useState<Set<string>>(new Set());
  const [sceneErrors, setSceneErrors] = useState<Map<string, Error>>(new Map());

  const registerScene = useCallback((sceneId: string) => {
    setActiveScenes(prev => new Set([...prev, sceneId]));
  }, []);

  const unregisterScene = useCallback((sceneId: string) => {
    setActiveScenes(prev => {
      const newSet = new Set(prev);
      newSet.delete(sceneId);
      return newSet;
    });
    
    // Clear any errors for this scene
    setSceneErrors(prev => {
      const newMap = new Map(prev);
      newMap.delete(sceneId);
      return newMap;
    });
  }, []);

  const reportSceneError = useCallback((sceneId: string, error: Error) => {
    setSceneErrors(prev => new Map([...prev, [sceneId, error]]));
  }, []);

  return {
    activeScenes,
    sceneErrors,
    registerScene,
    unregisterScene,
    reportSceneError,
  };
};

