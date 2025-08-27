'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

// Generate blur placeholder for better UX
const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
};

// Check if browser supports WebP/AVIF
const checkImageSupport = (): Promise<{ webp: boolean; avif: boolean }> => {
  return new Promise((resolve) => {
    const webp = new Image();
    const avif = new Image();
    let webpSupported = false;
    let avifSupported = false;
    let checks = 0;

    const checkComplete = () => {
      checks++;
      if (checks === 2) {
        resolve({ webp: webpSupported, avif: avifSupported });
      }
    };

    webp.onload = () => {
      webpSupported = true;
      checkComplete();
    };
    webp.onerror = () => checkComplete();
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

    avif.onload = () => {
      avifSupported = true;
      checkComplete();
    };
    avif.onerror = () => checkComplete();
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  loading = 'lazy',
  onLoad,
  onError,
}) => {
  const [imageSupport, setImageSupport] = useState<{ webp: boolean; avif: boolean }>({ webp: false, avif: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(src);

  useEffect(() => {
    checkImageSupport().then(setImageSupport);
  }, []);

  useEffect(() => {
    // Generate optimized source based on browser support
    if (src.startsWith('http') || src.startsWith('/')) {
      let optimized = src;
      
      // Add format parameter for external images or API endpoints
      if (imageSupport.avif) {
        optimized = src.includes('?') ? `${src}&format=avif` : `${src}?format=avif`;
      } else if (imageSupport.webp) {
        optimized = src.includes('?') ? `${src}&format=webp` : `${src}?format=webp`;
      }
      
      setOptimizedSrc(optimized);
    }
  }, [src, imageSupport]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate default blur placeholder if not provided
  const defaultBlurDataURL = blurDataURL || (typeof window !== 'undefined' ? generateBlurDataURL(width, height) : undefined);

  // Responsive sizes for better performance
  const responsiveSizes = sizes || (
    fill 
      ? '100vw'
      : width 
        ? `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`
        : '100vw'
  );

  if (hasError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        sizes={responsiveSizes}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          fill && 'object-cover'
        )}
        style={{
          transform: 'translateZ(0)', // GPU acceleration
          willChange: isLoaded ? 'auto' : 'opacity',
        }}
      />
      
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
    </div>
  );
};

// Utility component for progressive image enhancement
export const ProgressiveImage: React.FC<OptimizedImageProps & {
  lowQualitySrc?: string;
}> = ({ lowQualitySrc, ...props }) => {
  const [showHighQuality, setShowHighQuality] = useState(false);

  useEffect(() => {
    if (lowQualitySrc) {
      // Preload high quality image
      const img = new Image();
      img.onload = () => setShowHighQuality(true);
      img.src = props.src;
    } else {
      setShowHighQuality(true);
    }
  }, [props.src, lowQualitySrc]);

  if (lowQualitySrc && !showHighQuality) {
    return (
      <OptimizedImage
        {...props}
        src={lowQualitySrc}
        quality={20}
        className={cn(props.className, 'filter blur-sm')}
      />
    );
  }

  return <OptimizedImage {...props} />;
};

export default OptimizedImage;