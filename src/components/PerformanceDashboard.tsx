'use client';

import React, { useState, useEffect } from 'react';
import { useBundleAnalysis, usePerformanceMetrics, formatBytes, getPerformanceColor, generatePerformanceReport } from '@/lib/bundleAnalyzer';

interface PerformanceDashboardProps {
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  minimized?: boolean;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  showInProduction = false,
  position = 'bottom-right',
  minimized = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(minimized);
  const [activeTab, setActiveTab] = useState<'bundle' | 'performance' | 'recommendations'>('performance');
  
  const { metrics: bundleMetrics, loading: bundleLoading, analyze } = useBundleAnalysis();
  const { metrics: performanceMetrics, grade } = usePerformanceMetrics();

  useEffect(() => {
    // Only show in development or when explicitly enabled for production
    const isDev = process.env.NODE_ENV === 'development';
    setIsVisible(isDev || showInProduction);
  }, [showInProduction]);

  useEffect(() => {
    // Auto-analyze bundle on mount
    if (isVisible) {
      analyze();
    }
  }, [isVisible, analyze]);

  if (!isVisible) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const downloadReport = () => {
    if (!bundleMetrics || !performanceMetrics) return;
    
    const report = generatePerformanceReport(bundleMetrics, performanceMetrics);
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 font-mono text-xs`}>
      {isMinimized ? (
        // Minimized view
        <div 
          className="bg-black/80 backdrop-blur-sm text-white p-2 rounded-lg cursor-pointer hover:bg-black/90 transition-colors"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              grade === 'A' ? 'bg-green-500' :
              grade === 'B' ? 'bg-yellow-500' :
              grade === 'C' ? 'bg-orange-500' :
              'bg-red-500'
            }`} />
            <span>Performance: {grade}</span>
            {performanceMetrics && (
              <span className="text-gray-300">
                LCP: {performanceMetrics.lcp.toFixed(0)}ms
              </span>
            )}
          </div>
        </div>
      ) : (
        // Expanded view
        <div className="bg-black/90 backdrop-blur-sm text-white rounded-lg shadow-2xl border border-gray-700 w-96 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <h3 className="font-semibold text-sm">Performance Dashboard</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadReport}
                className="text-gray-400 hover:text-white transition-colors"
                title="Download Report"
              >
                ↓
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                −
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {(['performance', 'bundle', 'recommendations'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-xs capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-3 max-h-64 overflow-y-auto">
            {activeTab === 'performance' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Overall Grade:</span>
                  <span className={`font-bold ${
                    grade === 'A' ? 'text-green-400' :
                    grade === 'B' ? 'text-yellow-400' :
                    grade === 'C' ? 'text-orange-400' :
                    'text-red-400'
                  }`}>
                    {grade}
                  </span>
                </div>
                
                {performanceMetrics && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>First Contentful Paint:</span>
                        <span className={getPerformanceColor(performanceMetrics.fcp, { good: 1800, poor: 3000 })}>
                          {performanceMetrics.fcp.toFixed(0)}ms
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Largest Contentful Paint:</span>
                        <span className={getPerformanceColor(performanceMetrics.lcp, { good: 2500, poor: 4000 })}>
                          {performanceMetrics.lcp.toFixed(0)}ms
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>First Input Delay:</span>
                        <span className={getPerformanceColor(performanceMetrics.fid, { good: 100, poor: 300 })}>
                          {performanceMetrics.fid.toFixed(0)}ms
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Cumulative Layout Shift:</span>
                        <span className={getPerformanceColor(performanceMetrics.cls, { good: 0.1, poor: 0.25 })}>
                          {performanceMetrics.cls.toFixed(3)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Time to First Byte:</span>
                        <span className={getPerformanceColor(performanceMetrics.ttfb, { good: 800, poor: 1800 })}>
                          {performanceMetrics.ttfb.toFixed(0)}ms
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'bundle' && (
              <div className="space-y-3">
                {bundleLoading ? (
                  <div className="text-gray-400">Analyzing bundle...</div>
                ) : bundleMetrics ? (
                  <>
                    <div className="flex justify-between">
                      <span>Total Size:</span>
                      <span>{formatBytes(bundleMetrics.totalSize)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Gzipped Size:</span>
                      <span>{formatBytes(bundleMetrics.gzippedSize)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Performance Score:</span>
                      <span className={`${
                        bundleMetrics.performanceScore >= 80 ? 'text-green-400' :
                        bundleMetrics.performanceScore >= 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {bundleMetrics.performanceScore}/100
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-gray-300 mb-2">Chunks:</div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {bundleMetrics.chunks.map((chunk, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span className={chunk.isAsync ? 'text-blue-400' : 'text-white'}>
                              {chunk.name}
                            </span>
                            <span className="text-gray-400">
                              {formatBytes(chunk.gzippedSize)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400">
                    <button 
                      onClick={analyze}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Click to analyze bundle
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="space-y-2">
                {bundleMetrics?.recommendations.length ? (
                  bundleMetrics.recommendations.map((rec, index) => (
                    <div key={index} className="text-yellow-400 text-xs leading-relaxed">
                      • {rec}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">No recommendations available</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Performance monitoring component for specific sections
export const SectionPerformanceMonitor: React.FC<{
  sectionName: string;
  children: React.ReactNode;
}> = ({ sectionName, children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // More than one frame (60fps)
        console.warn(`[Performance] Slow render detected in ${sectionName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [sectionName]);

  return <>{children}</>;
};

// Bundle size warning component
export const BundleSizeWarning: React.FC = () => {
  const { metrics } = useBundleAnalysis();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (metrics && metrics.gzippedSize > 500000) { // 500KB threshold
      setShowWarning(true);
    }
  }, [metrics]);

  if (!showWarning || process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg z-50 font-mono text-sm">
      ⚠️ Large bundle detected: {metrics && formatBytes(metrics.gzippedSize)}
      <button 
        onClick={() => setShowWarning(false)}
        className="ml-2 font-bold hover:bg-yellow-600 px-1 rounded"
      >
        ×
      </button>
    </div>
  );
};

export default PerformanceDashboard;