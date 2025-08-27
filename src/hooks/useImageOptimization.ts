'use client';

import { useState, useEffect, useCallback } from 'react';

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  lazy?: boolean;
  priority?: boolean;
}

interface ImageSupport {
  webp: boolean;
  avif: boolean;
  jpeg2000: boolean;
  jpegXR: boolean;
}

interface OptimizedImageData {
  src: string;
  format: string;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
}

// Cache for browser support detection
let browserSupportCache: ImageSupport | null = null;

// Detect browser image format support
const detectImageSupport = async (): Promise<ImageSupport> => {
  if (browserSupportCache) {
    return browserSupportCache;
  }

  const testImages = {
    webp: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
    avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=',
    jpeg2000: 'data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB',
    jpegXR: 'data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckqJuK7UzuTVkQgpe8'
  };

  const support: ImageSupport = {
    webp: false,
    avif: false,
    jpeg2000: false,
    jpegXR: false
  };

  const promises = Object.entries(testImages).map(([format, dataUrl]) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        support[format as keyof ImageSupport] = img.width === 2 && img.height === 2;
        resolve();
      };
      img.onerror = () => {
        support[format as keyof ImageSupport] = false;
        resolve();
      };
      img.src = dataUrl;
    });
  });

  await Promise.all(promises);
  browserSupportCache = support;
  return support;
};

// Generate optimized image URL
const generateOptimizedUrl = (
  src: string,
  options: ImageOptimizationOptions,
  support: ImageSupport
): string => {
  if (!src) return src;

  // For external URLs or API endpoints
  if (src.startsWith('http') || src.startsWith('/api/')) {
    const url = new URL(src, window.location.origin);
    const params = new URLSearchParams(url.search);

    // Add quality parameter
    if (options.quality && options.quality !== 85) {
      params.set('q', options.quality.toString());
    }

    // Add dimensions
    if (options.width) {
      params.set('w', options.width.toString());
    }
    if (options.height) {
      params.set('h', options.height.toString());
    }

    // Determine best format
    let format = options.format || 'auto';
    if (format === 'auto') {
      if (support.avif) {
        format = 'avif';
      } else if (support.webp) {
        format = 'webp';
      } else {
        format = 'jpeg';
      }
    }

    if (format !== 'jpeg' && format !== 'png') {
      params.set('fm', format);
    }

    url.search = params.toString();
    return url.toString();
  }

  // For local images, Next.js will handle optimization
  return src;
};

// Generate responsive sizes string
const generateSizes = (width?: number): string => {
  if (!width) {
    return '100vw';
  }

  return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`;
};

// Main hook for image optimization
export const useImageOptimization = (
  src: string,
  options: ImageOptimizationOptions = {}
) => {
  const [optimizedData, setOptimizedData] = useState<OptimizedImageData>({
    src,
    format: 'jpeg',
    isLoading: true,
    error: null,
    isSupported: true
  });

  const [browserSupport, setBrowserSupport] = useState<ImageSupport | null>(null);

  // Detect browser support on mount
  useEffect(() => {
    detectImageSupport().then(setBrowserSupport);
  }, []);

  // Generate optimized URL when src or options change
  useEffect(() => {
    if (!browserSupport || !src) return;

    try {
      const optimizedSrc = generateOptimizedUrl(src, options, browserSupport);
      const format = options.format === 'auto' 
        ? (browserSupport.avif ? 'avif' : browserSupport.webp ? 'webp' : 'jpeg')
        : options.format || 'jpeg';

      setOptimizedData({
        src: optimizedSrc,
        format,
        isLoading: false,
        error: null,
        isSupported: true
      });
    } catch (error) {
      setOptimizedData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        isSupported: false
      }));
    }
  }, [src, options, browserSupport]);

  // Preload image function
  const preloadImage = useCallback((imageSrc?: string) => {
    const targetSrc = imageSrc || optimizedData.src;
    if (!targetSrc) return Promise.reject('No source provided');

    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = targetSrc;
    });
  }, [optimizedData.src]);

  // Generate responsive sizes
  const responsiveSizes = generateSizes(options.width);

  return {
    ...optimizedData,
    browserSupport,
    responsiveSizes,
    preloadImage,
    // Utility functions
    isWebPSupported: browserSupport?.webp || false,
    isAVIFSupported: browserSupport?.avif || false,
    // Next.js Image props
    imageProps: {
      src: optimizedData.src,
      quality: options.quality || 85,
      priority: options.priority || false,
      loading: options.lazy === false ? 'eager' : 'lazy',
      sizes: responsiveSizes,
      ...(options.width && { width: options.width }),
      ...(options.height && { height: options.height })
    }
  };
};

// Hook for batch image optimization
export const useBatchImageOptimization = (
  images: Array<{ src: string; options?: ImageOptimizationOptions }>
) => {
  const [optimizedImages, setOptimizedImages] = useState<OptimizedImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const optimizeImages = async () => {
      setIsLoading(true);
      const support = await detectImageSupport();
      
      const optimized = images.map(({ src, options = {} }) => {
        try {
          const optimizedSrc = generateOptimizedUrl(src, options, support);
          const format = options.format === 'auto' 
            ? (support.avif ? 'avif' : support.webp ? 'webp' : 'jpeg')
            : options.format || 'jpeg';

          return {
            src: optimizedSrc,
            format,
            isLoading: false,
            error: null,
            isSupported: true
          };
        } catch (error) {
          return {
            src,
            format: 'jpeg',
            isLoading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            isSupported: false
          };
        }
      });

      setOptimizedImages(optimized);
      setIsLoading(false);
    };

    if (images.length > 0) {
      optimizeImages();
    }
  }, [images]);

  return {
    optimizedImages,
    isLoading,
    totalImages: images.length,
    optimizedCount: optimizedImages.filter(img => img.isSupported).length
  };
};

// Hook for lazy loading with intersection observer
export const useLazyImageLoading = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isInView, shouldLoad: isInView };
};

export default useImageOptimization;