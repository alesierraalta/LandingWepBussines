'use client';

import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isUpdating: boolean;
  hasUpdate: boolean;
  error: string | null;
  cacheStats: Record<string, number>;
}

interface ServiceWorkerManagerProps {
  onUpdate?: () => void;
  onError?: (error: string) => void;
  showNotifications?: boolean;
}

export const ServiceWorkerManager: React.FC<ServiceWorkerManagerProps> = ({
  onUpdate,
  onError,
  showNotifications = false
}) => {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isUpdating: false,
    hasUpdate: false,
    error: null,
    cacheStats: {}
  });

  useEffect(() => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      setState(prev => ({ ...prev, isSupported: true }));
      registerServiceWorker();
    } else {
      setState(prev => ({ 
        ...prev, 
        error: 'Service Workers are not supported in this browser' 
      }));
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[SW Manager] Service Worker registered successfully:', registration);
      
      setState(prev => ({ ...prev, isRegistered: true }));

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          setState(prev => ({ ...prev, isUpdating: true }));
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available
                setState(prev => ({ 
                  ...prev, 
                  hasUpdate: true, 
                  isUpdating: false 
                }));
                onUpdate?.();
              } else {
                // First time installation
                setState(prev => ({ ...prev, isUpdating: false }));
              }
            }
          });
        }
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          getCacheStats();
        }
      });

      // Get initial cache stats
      getCacheStats();

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

    } catch (error) {
      const errorMessage = `Service Worker registration failed: ${error}`;
      console.error('[SW Manager]', errorMessage);
      setState(prev => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    }
  };

  const getCacheStats = async () => {
    if (!navigator.serviceWorker.controller) return;

    try {
      const messageChannel = new MessageChannel();
      
      const statsPromise = new Promise<Record<string, number>>((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data);
        };
      });

      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_STATS' },
        [messageChannel.port2]
      );

      const stats = await statsPromise;
      setState(prev => ({ ...prev, cacheStats: stats }));
    } catch (error) {
      console.error('[SW Manager] Failed to get cache stats:', error);
    }
  };

  const updateServiceWorker = () => {
    if (!navigator.serviceWorker.controller) return;

    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    
    // Reload the page to activate the new service worker
    window.location.reload();
  };

  const clearCache = async () => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      setState(prev => ({ ...prev, cacheStats: {} }));
      console.log('[SW Manager] All caches cleared');
    } catch (error) {
      console.error('[SW Manager] Failed to clear cache:', error);
    }
  };

  // Show update notification
  if (showNotifications && state.hasUpdate) {
    return (
      <div className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Nueva versión disponible</h4>
            <p className="text-sm opacity-90">Actualiza para obtener las últimas mejoras</p>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={updateServiceWorker}
              className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Actualizar
            </button>
            <button
              onClick={() => setState(prev => ({ ...prev, hasUpdate: false }))}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Development mode cache stats
  if (process.env.NODE_ENV === 'development' && state.isRegistered) {
    return (
      <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded text-xs font-mono z-50 max-w-xs">
        <div className="font-semibold mb-2">Service Worker Status</div>
        <div className="space-y-1">
          <div>Registered: {state.isRegistered ? '✅' : '❌'}</div>
          <div>Updating: {state.isUpdating ? '🔄' : '✅'}</div>
          {Object.keys(state.cacheStats).length > 0 && (
            <div>
              <div className="font-semibold mt-2 mb-1">Cache Stats:</div>
              {Object.entries(state.cacheStats).map(([cacheName, count]) => (
                <div key={cacheName} className="text-xs">
                  {cacheName}: {count} items
                </div>
              ))}
            </div>
          )}
          {state.error && (
            <div className="text-red-400 mt-2">
              Error: {state.error}
            </div>
          )}
          <button
            onClick={clearCache}
            className="bg-red-600 text-white px-2 py-1 rounded text-xs mt-2 hover:bg-red-700 transition-colors"
          >
            Clear Cache
          </button>
        </div>
      </div>
    );
  }

  return null;
};

// Hook for service worker functionality
export const useServiceWorker = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if service worker is installed
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setIsInstalled(true);
      });

      // Listen for updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setHasUpdate(true);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateApp = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  const preloadRoute = async (route: string) => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        await fetch(route);
        console.log(`[SW Hook] Preloaded route: ${route}`);
      } catch (error) {
        console.error(`[SW Hook] Failed to preload route ${route}:`, error);
      }
    }
  };

  const getCacheSize = async (): Promise<number> => {
    if (!('caches' in window)) return 0;

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        totalSize += keys.length;
      }

      return totalSize;
    } catch (error) {
      console.error('[SW Hook] Failed to calculate cache size:', error);
      return 0;
    }
  };

  return {
    isOnline,
    isInstalled,
    hasUpdate,
    updateApp,
    preloadRoute,
    getCacheSize
  };
};

// Offline indicator component
export const OfflineIndicator: React.FC = () => {
  const { isOnline } = useServiceWorker();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
        <span className="font-medium">Sin conexión - Mostrando contenido en caché</span>
      </div>
    </div>
  );
};

// Performance metrics component
export const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<{
    cacheHitRate: number;
    loadTime: number;
    cacheSize: number;
  }>({ cacheHitRate: 0, loadTime: 0, cacheSize: 0 });

  const { getCacheSize } = useServiceWorker();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = async () => {
      const cacheSize = await getCacheSize();
      const loadTime = performance.now();
      
      setMetrics({
        cacheHitRate: 85, // This would be calculated from actual cache hits
        loadTime,
        cacheSize
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, [getCacheSize]);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-green-600 text-white p-3 rounded text-xs font-mono z-40">
      <div className="font-semibold mb-1">Performance</div>
      <div>Cache Hit Rate: {metrics.cacheHitRate}%</div>
      <div>Load Time: {metrics.loadTime.toFixed(2)}ms</div>
      <div>Cache Size: {metrics.cacheSize} items</div>
    </div>
  );
};

export default ServiceWorkerManager;