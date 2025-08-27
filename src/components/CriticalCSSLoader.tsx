'use client';

import { useEffect, useState } from 'react';
import { useCriticalCSS } from '@/lib/criticalCSS';

interface CriticalCSSLoaderProps {
  children: React.ReactNode;
  componentName?: string;
  deferredStyles?: string[];
  priority?: 'high' | 'medium' | 'low';
}

// CSS loading priorities
const LOADING_DELAYS = {
  high: 0,
  medium: 100,
  low: 300
};

// Track loaded stylesheets to avoid duplicates
const loadedStylesheets = new Set<string>();

// Utility to load CSS asynchronously
const loadStylesheet = (href: string, media: string = 'all'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (loadedStylesheets.has(href)) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = media;
    
    link.onload = () => {
      loadedStylesheets.add(href);
      resolve();
    };
    
    link.onerror = () => {
      reject(new Error(`Failed to load stylesheet: ${href}`));
    };
    
    document.head.appendChild(link);
  });
};

// Preload CSS for faster loading
const preloadStylesheet = (href: string): void => {
  if (loadedStylesheets.has(href)) return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  
  link.onload = () => {
    // Convert preload to stylesheet
    link.rel = 'stylesheet';
    loadedStylesheets.add(href);
  };
  
  document.head.appendChild(link);
};

// Critical CSS inline component
const InlineCriticalCSS: React.FC<{ css: string; componentName?: string }> = ({ 
  css, 
  componentName 
}) => {
  if (!css) return null;
  
  return (
    <style 
      data-critical="true"
      data-component={componentName}
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
};

// Deferred CSS loader component
const DeferredCSSLoader: React.FC<{
  stylesheets: string[];
  priority: 'high' | 'medium' | 'low';
  onLoad?: () => void;
}> = ({ stylesheets, priority, onLoad }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (stylesheets.length === 0) return;
    
    const delay = LOADING_DELAYS[priority];
    const timer = setTimeout(async () => {
      setIsLoading(true);
      
      try {
        // Load stylesheets in parallel for better performance
        await Promise.all(
          stylesheets.map(async (href) => {
            await loadStylesheet(href);
            setLoadedCount(prev => prev + 1);
          })
        );
        
        onLoad?.();
      } catch (error) {
        console.warn('Failed to load some stylesheets:', error);
      } finally {
        setIsLoading(false);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [stylesheets, priority, onLoad]);
  
  // Preload stylesheets for faster loading
  useEffect(() => {
    if (priority === 'high') {
      stylesheets.forEach(preloadStylesheet);
    }
  }, [stylesheets, priority]);
  
  return null;
};

// Main Critical CSS Loader component
export const CriticalCSSLoader: React.FC<CriticalCSSLoaderProps> = ({
  children,
  componentName,
  deferredStyles = [],
  priority = 'medium'
}) => {
  const { criticalCSS, isLoaded, shouldLoadDeferred } = useCriticalCSS(componentName);
  const [deferredLoaded, setDeferredLoaded] = useState(false);
  
  return (
    <>
      {/* Inline critical CSS */}
      <InlineCriticalCSS css={criticalCSS} componentName={componentName} />
      
      {/* Load deferred styles */}
      {shouldLoadDeferred && (
        <DeferredCSSLoader
          stylesheets={deferredStyles}
          priority={priority}
          onLoad={() => setDeferredLoaded(true)}
        />
      )}
      
      {/* Render children with loading state */}
      <div 
        data-css-loaded={isLoaded && deferredLoaded}
        data-component={componentName}
        style={{
          // Prevent layout shift during CSS loading
          minHeight: isLoaded ? 'auto' : '100px',
          transition: 'min-height 0.3s ease'
        }}
      >
        {children}
      </div>
    </>
  );
};

// Hook for managing CSS loading state
export const useCSSLoadingState = () => {
  const [criticalLoaded, setCriticalLoaded] = useState(false);
  const [deferredLoaded, setDeferredLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Monitor CSS loading progress
    const checkCSSLoading = () => {
      const criticalStyles = document.querySelectorAll('style[data-critical="true"]');
      const deferredStyles = document.querySelectorAll('link[rel="stylesheet"]');
      
      setCriticalLoaded(criticalStyles.length > 0);
      
      // Check if deferred styles are loaded
      let loadedDeferred = 0;
      deferredStyles.forEach((link) => {
        if ((link as HTMLLinkElement).sheet) {
          loadedDeferred++;
        }
      });
      
      const totalDeferred = deferredStyles.length;
      setDeferredLoaded(totalDeferred === 0 || loadedDeferred === totalDeferred);
      setLoadingProgress(totalDeferred === 0 ? 100 : (loadedDeferred / totalDeferred) * 100);
    };
    
    // Initial check
    checkCSSLoading();
    
    // Monitor for changes
    const observer = new MutationObserver(checkCSSLoading);
    observer.observe(document.head, {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, []);
  
  return {
    criticalLoaded,
    deferredLoaded,
    allLoaded: criticalLoaded && deferredLoaded,
    loadingProgress
  };
};

// CSS loading performance monitor
export const CSSPerformanceMonitor: React.FC = () => {
  const { allLoaded, loadingProgress } = useCSSLoadingState();
  const [metrics, setMetrics] = useState<{
    criticalLoadTime: number;
    deferredLoadTime: number;
    totalLoadTime: number;
  } | null>(null);
  
  useEffect(() => {
    const startTime = performance.now();
    let criticalTime = 0;
    
    const checkCriticalLoaded = () => {
      if (document.querySelector('style[data-critical="true"]')) {
        criticalTime = performance.now() - startTime;
      }
    };
    
    const checkAllLoaded = () => {
      if (allLoaded && !metrics) {
        const totalTime = performance.now() - startTime;
        setMetrics({
          criticalLoadTime: criticalTime,
          deferredLoadTime: totalTime - criticalTime,
          totalLoadTime: totalTime
        });
      }
    };
    
    checkCriticalLoaded();
    checkAllLoaded();
    
    const interval = setInterval(() => {
      checkCriticalLoaded();
      checkAllLoaded();
    }, 100);
    
    return () => clearInterval(interval);
  }, [allLoaded, metrics]);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}
    >
      <div>CSS Loading: {Math.round(loadingProgress)}%</div>
      {metrics && (
        <>
          <div>Critical: {Math.round(metrics.criticalLoadTime)}ms</div>
          <div>Deferred: {Math.round(metrics.deferredLoadTime)}ms</div>
          <div>Total: {Math.round(metrics.totalLoadTime)}ms</div>
        </>
      )}
    </div>
  );
};

// Utility component for CSS optimization hints
export const CSSOptimizationHints: React.FC<{ enabled?: boolean }> = ({ 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const [hints, setHints] = useState<string[]>([]);
  
  useEffect(() => {
    if (!enabled) return;
    
    const analyzeCSS = () => {
      const newHints: string[] = [];
      
      // Check for unused CSS
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
      if (stylesheets.length > 5) {
        newHints.push(`Consider consolidating ${stylesheets.length} stylesheets`);
      }
      
      // Check for large inline styles
      const inlineStyles = document.querySelectorAll('style');
      inlineStyles.forEach((style, index) => {
        if (style.textContent && style.textContent.length > 10000) {
          newHints.push(`Large inline style #${index + 1} (${Math.round(style.textContent.length / 1000)}KB)`);
        }
      });
      
      // Check for critical CSS
      const criticalStyles = document.querySelectorAll('style[data-critical="true"]');
      if (criticalStyles.length === 0) {
        newHints.push('No critical CSS detected - consider adding critical styles');
      }
      
      setHints(newHints);
    };
    
    // Analyze after a delay to ensure all CSS is loaded
    const timer = setTimeout(analyzeCSS, 2000);
    return () => clearTimeout(timer);
  }, [enabled]);
  
  if (!enabled || hints.length === 0) {
    return null;
  }
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(255,165,0,0.9)',
        color: 'black',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace',
        maxWidth: '300px'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>CSS Optimization Hints:</div>
      {hints.map((hint, index) => (
        <div key={index} style={{ marginBottom: '2px' }}>• {hint}</div>
      ))}
    </div>
  );
};

export default CriticalCSSLoader;