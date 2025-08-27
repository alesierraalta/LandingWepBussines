'use client';

import { useEffect, useState } from 'react';

interface BundleMetrics {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkInfo[];
  assets: AssetInfo[];
  dependencies: DependencyInfo[];
  performanceScore: number;
  recommendations: string[];
}

interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: string[];
  isInitial: boolean;
  isAsync: boolean;
}

interface AssetInfo {
  name: string;
  size: number;
  type: 'js' | 'css' | 'image' | 'font' | 'other';
  compressed: boolean;
  cached: boolean;
}

interface DependencyInfo {
  name: string;
  version: string;
  size: number;
  treeshakeable: boolean;
  used: boolean;
}

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  tti: number; // Time to Interactive
}

// Bundle size analyzer
export class BundleAnalyzer {
  private static instance: BundleAnalyzer;
  private metrics: BundleMetrics | null = null;
  private performanceObserver: PerformanceObserver | null = null;

  static getInstance(): BundleAnalyzer {
    if (!BundleAnalyzer.instance) {
      BundleAnalyzer.instance = new BundleAnalyzer();
    }
    return BundleAnalyzer.instance;
  }

  async analyzeBundleSize(): Promise<BundleMetrics> {
    try {
      // In production, this would connect to webpack-bundle-analyzer data
      // For now, we'll simulate the analysis
      const chunks = await this.analyzeChunks();
      const assets = await this.analyzeAssets();
      const dependencies = await this.analyzeDependencies();
      
      const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
      const gzippedSize = chunks.reduce((sum, chunk) => sum + chunk.gzippedSize, 0);
      
      const performanceScore = this.calculatePerformanceScore(totalSize, gzippedSize);
      const recommendations = this.generateRecommendations(chunks, assets, dependencies);

      this.metrics = {
        totalSize,
        gzippedSize,
        chunks,
        assets,
        dependencies,
        performanceScore,
        recommendations
      };

      return this.metrics;
    } catch (error) {
      console.error('[Bundle Analyzer] Failed to analyze bundle:', error);
      throw error;
    }
  }

  private async analyzeChunks(): Promise<ChunkInfo[]> {
    // Simulate chunk analysis - in real implementation, this would parse webpack stats
    return [
      {
        name: 'main',
        size: 245000, // 245KB
        gzippedSize: 85000, // 85KB
        modules: ['react', 'react-dom', 'next', 'framer-motion'],
        isInitial: true,
        isAsync: false
      },
      {
        name: 'vendor',
        size: 180000, // 180KB
        gzippedSize: 65000, // 65KB
        modules: ['lodash', 'axios', 'date-fns'],
        isInitial: true,
        isAsync: false
      },
      {
        name: 'spline-3d',
        size: 320000, // 320KB
        gzippedSize: 95000, // 95KB
        modules: ['@splinetool/runtime', '@splinetool/react-spline'],
        isInitial: false,
        isAsync: true
      },
      {
        name: 'animations',
        size: 45000, // 45KB
        gzippedSize: 15000, // 15KB
        modules: ['framer-motion', 'lottie-react'],
        isInitial: false,
        isAsync: true
      }
    ];
  }

  private async analyzeAssets(): Promise<AssetInfo[]> {
    return [
      {
        name: 'main.js',
        size: 245000,
        type: 'js',
        compressed: true,
        cached: true
      },
      {
        name: 'vendor.js',
        size: 180000,
        type: 'js',
        compressed: true,
        cached: true
      },
      {
        name: 'styles.css',
        size: 35000,
        type: 'css',
        compressed: true,
        cached: true
      },
      {
        name: 'hero-image.webp',
        size: 125000,
        type: 'image',
        compressed: true,
        cached: true
      }
    ];
  }

  private async analyzeDependencies(): Promise<DependencyInfo[]> {
    return [
      {
        name: 'react',
        version: '18.2.0',
        size: 45000,
        treeshakeable: false,
        used: true
      },
      {
        name: 'framer-motion',
        version: '10.16.4',
        size: 180000,
        treeshakeable: true,
        used: true
      },
      {
        name: 'lodash',
        version: '4.17.21',
        size: 70000,
        treeshakeable: true,
        used: false // Detected as unused
      },
      {
        name: '@splinetool/runtime',
        version: '0.9.0',
        size: 250000,
        treeshakeable: false,
        used: true
      }
    ];
  }

  private calculatePerformanceScore(totalSize: number, gzippedSize: number): number {
    // Calculate score based on bundle size (0-100)
    const sizeScore = Math.max(0, 100 - (gzippedSize / 1000)); // Penalty for each KB
    const compressionRatio = gzippedSize / totalSize;
    const compressionScore = (1 - compressionRatio) * 100;
    
    return Math.round((sizeScore + compressionScore) / 2);
  }

  private generateRecommendations(chunks: ChunkInfo[], assets: AssetInfo[], dependencies: DependencyInfo[]): string[] {
    const recommendations: string[] = [];

    // Check for large chunks
    const largeChunks = chunks.filter(chunk => chunk.size > 200000);
    if (largeChunks.length > 0) {
      recommendations.push(`Consider code splitting for large chunks: ${largeChunks.map(c => c.name).join(', ')}`);
    }

    // Check for unused dependencies
    const unusedDeps = dependencies.filter(dep => !dep.used);
    if (unusedDeps.length > 0) {
      recommendations.push(`Remove unused dependencies: ${unusedDeps.map(d => d.name).join(', ')}`);
    }

    // Check for non-treeshakeable dependencies
    const nonTreeshakeable = dependencies.filter(dep => !dep.treeshakeable && dep.size > 50000);
    if (nonTreeshakeable.length > 0) {
      recommendations.push(`Consider alternatives for large non-treeshakeable dependencies: ${nonTreeshakeable.map(d => d.name).join(', ')}`);
    }

    // Check compression
    const uncompressedAssets = assets.filter(asset => !asset.compressed && asset.size > 10000);
    if (uncompressedAssets.length > 0) {
      recommendations.push(`Enable compression for: ${uncompressedAssets.map(a => a.name).join(', ')}`);
    }

    return recommendations;
  }

  getMetrics(): BundleMetrics | null {
    return this.metrics;
  }
}

// Performance metrics collector
export class PerformanceCollector {
  private static instance: PerformanceCollector;
  private metrics: PerformanceMetrics | null = null;
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceCollector {
    if (!PerformanceCollector.instance) {
      PerformanceCollector.instance = new PerformanceCollector();
    }
    return PerformanceCollector.instance;
  }

  startCollecting(): void {
    if (typeof window === 'undefined') return;

    // Collect Core Web Vitals
    this.collectCoreWebVitals();
    
    // Collect navigation timing
    this.collectNavigationTiming();
    
    // Collect resource timing
    this.collectResourceTiming();
  }

  private collectCoreWebVitals(): void {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        this.updateMetric('fcp', fcp.startTime);
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });
    this.observers.push(fcpObserver);

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.updateMetric('lcp', lastEntry.startTime);
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(lcpObserver);

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.processingStart && entry.startTime) {
          const fid = entry.processingStart - entry.startTime;
          this.updateMetric('fid', fid);
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.push(fidObserver);

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.updateMetric('cls', clsValue);
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(clsObserver);
  }

  private collectNavigationTiming(): void {
    if (typeof window === 'undefined') return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      const tti = navigation.loadEventEnd - navigation.navigationStart;
      
      this.updateMetric('ttfb', ttfb);
      this.updateMetric('tti', tti);
    }
  }

  private collectResourceTiming(): void {
    if (typeof window === 'undefined') return;

    const resources = performance.getEntriesByType('resource');
    const slowResources = resources.filter(resource => resource.duration > 1000);
    
    if (slowResources.length > 0) {
      console.warn('[Performance] Slow loading resources detected:', slowResources);
    }
  }

  private updateMetric(key: keyof PerformanceMetrics, value: number): void {
    if (!this.metrics) {
      this.metrics = {
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0,
        tti: 0
      };
    }
    
    this.metrics[key] = value;
  }

  getMetrics(): PerformanceMetrics | null {
    return this.metrics;
  }

  getPerformanceGrade(): string {
    if (!this.metrics) return 'N/A';

    const { fcp, lcp, fid, cls } = this.metrics;
    
    // Core Web Vitals thresholds
    const fcpGood = fcp < 1800;
    const lcpGood = lcp < 2500;
    const fidGood = fid < 100;
    const clsGood = cls < 0.1;
    
    const goodMetrics = [fcpGood, lcpGood, fidGood, clsGood].filter(Boolean).length;
    
    if (goodMetrics === 4) return 'A';
    if (goodMetrics === 3) return 'B';
    if (goodMetrics === 2) return 'C';
    if (goodMetrics === 1) return 'D';
    return 'F';
  }

  stopCollecting(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// React hooks for bundle analysis
export const useBundleAnalysis = () => {
  const [metrics, setMetrics] = useState<BundleMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const analyzer = BundleAnalyzer.getInstance();
      const result = await analyzer.analyzeBundleSize();
      setMetrics(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    loading,
    error,
    analyze
  };
};

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [grade, setGrade] = useState<string>('N/A');

  useEffect(() => {
    const collector = PerformanceCollector.getInstance();
    collector.startCollecting();

    const interval = setInterval(() => {
      const currentMetrics = collector.getMetrics();
      const currentGrade = collector.getPerformanceGrade();
      
      setMetrics(currentMetrics);
      setGrade(currentGrade);
    }, 1000);

    return () => {
      clearInterval(interval);
      collector.stopCollecting();
    };
  }, []);

  return {
    metrics,
    grade
  };
};

// Utility functions
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getPerformanceColor = (value: number, thresholds: { good: number; poor: number }): string => {
  if (value <= thresholds.good) return 'text-green-600';
  if (value <= thresholds.poor) return 'text-yellow-600';
  return 'text-red-600';
};

export const generatePerformanceReport = (bundleMetrics: BundleMetrics, performanceMetrics: PerformanceMetrics): string => {
  const report = [
    '# Performance Report',
    '',
    '## Bundle Analysis',
    `- Total Size: ${formatBytes(bundleMetrics.totalSize)}`,
    `- Gzipped Size: ${formatBytes(bundleMetrics.gzippedSize)}`,
    `- Performance Score: ${bundleMetrics.performanceScore}/100`,
    '',
    '## Core Web Vitals',
    `- First Contentful Paint: ${performanceMetrics.fcp.toFixed(2)}ms`,
    `- Largest Contentful Paint: ${performanceMetrics.lcp.toFixed(2)}ms`,
    `- First Input Delay: ${performanceMetrics.fid.toFixed(2)}ms`,
    `- Cumulative Layout Shift: ${performanceMetrics.cls.toFixed(3)}`,
    '',
    '## Recommendations',
    ...bundleMetrics.recommendations.map(rec => `- ${rec}`)
  ];
  
  return report.join('\n');
};

export default BundleAnalyzer;