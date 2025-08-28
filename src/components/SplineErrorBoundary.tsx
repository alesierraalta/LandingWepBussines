'use client';

import React, { Component, ErrorInfo, ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  retryDelay?: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class SplineErrorBoundary extends Component<Props, State> {
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error details
    console.error('Spline Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Auto-retry logic for specific errors
    if (this.shouldRetry(error) && this.state.retryCount < (this.props.maxRetries || 3)) {
      this.scheduleRetry();
    }
  }

  private shouldRetry(error: Error): boolean {
    const retryableErrors = [
      'Data read, but end of buffer not reached',
      'Failed to fetch',
      'Network request failed',
      'Loading chunk',
      'ChunkLoadError',
    ];

    return retryableErrors.some(errorType => 
      error.message.includes(errorType) || error.name.includes(errorType)
    );
  }

  private scheduleRetry = () => {
    const delay = (this.props.retryDelay || 2000) * Math.pow(2, this.state.retryCount); // Exponential backoff
    
    this.retryTimeout = setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      }));
    }, delay);
  };

  private handleManualRetry = () => {
    if (this.state.retryCount < (this.props.maxRetries || 3)) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <SplineErrorFallback
          error={this.state.error}
          retryCount={this.state.retryCount}
          maxRetries={this.props.maxRetries || 3}
          onRetry={this.handleManualRetry}
        />
      );
    }

    return this.props.children;
  }
}

interface SplineErrorFallbackProps {
  error: Error | null;
  retryCount: number;
  maxRetries: number;
  onRetry: () => void;
}

const SplineErrorFallback: React.FC<SplineErrorFallbackProps> = ({
  error,
  retryCount,
  maxRetries,
  onRetry,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getErrorMessage = (error: Error | null): string => {
    if (!error) return 'Unknown error occurred';
    
    if (error.message.includes('Data read, but end of buffer not reached')) {
      return 'Scene data is incomplete or corrupted';
    }
    if (error.message.includes('Failed to fetch')) {
      return 'Network connection issue';
    }
    if (error.message.includes('ChunkLoadError')) {
      return 'Failed to load 3D resources';
    }
    
    return 'Failed to load 3D scene';
  };

  const getErrorSuggestion = (error: Error | null): string => {
    if (!error) return 'Please try refreshing the page';
    
    if (error.message.includes('Data read, but end of buffer not reached')) {
      return 'The 3D model may be corrupted. Please try again later.';
    }
    if (error.message.includes('Failed to fetch')) {
      return 'Check your internet connection and try again.';
    }
    
    return 'Please refresh the page or try again later.';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mb-4 text-red-500"
        >
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </motion.div>

        {/* Error Message */}
        <h3 className="text-lg font-semibold text-red-800 mb-2 text-center">
          3D Scene Unavailable
        </h3>
        
        <p className="text-red-600 text-center mb-2">
          {getErrorMessage(error)}
        </p>
        
        <p className="text-sm text-red-500 text-center mb-4">
          {getErrorSuggestion(error)}
        </p>

        {/* Retry Section */}
        {retryCount < maxRetries && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 mb-3"
          >
            Retry Loading ({retryCount + 1}/{maxRetries})
          </motion.button>
        )}

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-red-400 hover:text-red-600 underline"
        >
          {showDetails ? 'Hide' : 'Show'} Error Details
        </button>

        {/* Error Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 bg-red-100 rounded text-xs text-red-700 max-w-full overflow-auto"
            >
              <strong>Error:</strong> {error?.message}<br />
              <strong>Retry Count:</strong> {retryCount}
              {error?.stack && (
                <>
                  <br />
                  <strong>Stack:</strong>
                  <pre className="mt-1 text-xs whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-4 bg-white/50 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-center h-20">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-50"></div>
              <p className="text-sm text-gray-600">3D Preview Unavailable</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Hook for error reporting
export const useSplineErrorReporting = () => {
  const reportError = (error: Error, context: string) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Spline Error in ${context}:`, error);
    }

    // In production, you could send to error tracking service
    // Example: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // window.gtag?.('event', 'exception', {
      //   description: error.message,
      //   fatal: false,
      // });
    }
  };

  return { reportError };
};

