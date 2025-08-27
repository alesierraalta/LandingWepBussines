'use client';

import React, { useState, useEffect } from 'react';

// Spline configuration interface
export interface SplineConfig {
  enabled: boolean;
  maxRetries: number;
  timeout: number;
  debugMode: boolean;
  fallbackMode: boolean;
}

// Default configuration
const DEFAULT_CONFIG: SplineConfig = {
  enabled: true,
  maxRetries: 3,
  timeout: 10000, // 10 seconds
  debugMode: process.env.NODE_ENV === 'development',
  fallbackMode: false
};

// Spline status interface
export interface SplineStatus {
  isEnabled: boolean;
  hasErrors: boolean;
  errorCount: number;
  lastError?: string;
}

// Error log entry
interface SplineError {
  sceneId: string;
  message: string;
  timestamp: number;
}

// Spline manager class
class SplineManagerClass {
  private config: SplineConfig;
  private errorLog: SplineError[] = [];
  private isDisabled = false;
  private disableReason?: string;

  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('spline-config');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.config = { ...DEFAULT_CONFIG, ...parsed };
      }
      
      const errorLog = localStorage.getItem('spline-errors');
      if (errorLog) {
        this.errorLog = JSON.parse(errorLog);
      }
      
      const disabled = localStorage.getItem('spline-disabled');
      if (disabled) {
        const { isDisabled, reason } = JSON.parse(disabled);
        this.isDisabled = isDisabled;
        this.disableReason = reason;
      }
    } catch (error) {
      console.warn('Failed to load Spline config from storage:', error);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('spline-config', JSON.stringify(this.config));
      localStorage.setItem('spline-errors', JSON.stringify(this.errorLog));
      localStorage.setItem('spline-disabled', JSON.stringify({
        isDisabled: this.isDisabled,
        reason: this.disableReason
      }));
    } catch (error) {
      console.warn('Failed to save Spline config to storage:', error);
    }
  }

  getConfig(): SplineConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<SplineConfig>) {
    this.config = { ...this.config, ...updates };
    this.saveToStorage();
  }

  isEnabled(): boolean {
    return this.config.enabled && !this.isDisabled;
  }

  disable(reason: string) {
    this.isDisabled = true;
    this.disableReason = reason;
    this.saveToStorage();
    console.warn(`Spline disabled: ${reason}`);
  }

  enable() {
    this.isDisabled = false;
    this.disableReason = undefined;
    this.saveToStorage();
    console.log('Spline re-enabled');
  }

  forceDisable() {
    this.config.enabled = false;
    this.isDisabled = true;
    this.disableReason = 'Force disabled due to persistent errors';
    this.saveToStorage();
  }

  reportError(sceneId: string, message: string) {
    const error: SplineError = {
      sceneId,
      message,
      timestamp: Date.now()
    };
    
    this.errorLog.push(error);
    
    // Keep only last 50 errors
    if (this.errorLog.length > 50) {
      this.errorLog = this.errorLog.slice(-50);
    }
    
    this.saveToStorage();
    
    // Auto-disable if too many errors
    const recentErrors = this.errorLog.filter(
      err => Date.now() - err.timestamp < 300000 // 5 minutes
    );
    
    if (recentErrors.length > this.config.maxRetries * 3) {
      this.disable('Too many recent errors');
    }
  }

  getErrorLog(): SplineError[] {
    return [...this.errorLog];
  }

  getErrorCount(): number {
    return this.errorLog.length;
  }

  getStatus(): SplineStatus {
    const recentErrors = this.errorLog.filter(
      err => Date.now() - err.timestamp < 300000 // 5 minutes
    );
    
    return {
      isEnabled: this.isEnabled(),
      hasErrors: recentErrors.length > 0,
      errorCount: this.errorLog.length,
      lastError: this.errorLog[this.errorLog.length - 1]?.message
    };
  }

  clearErrors() {
    this.errorLog = [];
    this.saveToStorage();
  }
}

// Global instance
const splineManager = new SplineManagerClass();

// Utility functions
export const getSplineConfig = (): SplineConfig => {
  return splineManager.getConfig();
};

export const isSplineEnabled = (): boolean => {
  return splineManager.isEnabled();
};

export const reportSplineError = (sceneId: string, message: string): void => {
  splineManager.reportError(sceneId, message);
};

export const getSplineStatus = (): SplineStatus => {
  return splineManager.getStatus();
};

export const enableSpline = (): void => {
  splineManager.enable();
};

export const disableSpline = (reason: string): void => {
  splineManager.disable(reason);
};

// React hook for Spline status
export const useSplineStatus = () => {
  const [status, setStatus] = useState(() => splineManager.getStatus());
  
  useEffect(() => {
    const handleStatusChange = () => {
      setStatus(splineManager.getStatus());
    };
    
    // Listen for storage changes (cross-tab sync)
    window.addEventListener('storage', handleStatusChange);
    
    return () => {
      window.removeEventListener('storage', handleStatusChange);
    };
  }, []);
  
  return status;
};

// React component wrapper for Spline configuration
export const SplineConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize Spline configuration on app start
    const config = getSplineConfig();
    
    if (config.debugMode) {
      console.log('Spline configuration initialized:', config);
    }
    
    // Check for persistent errors and disable if needed
    const errorCount = splineManager.getErrorCount();
    if (errorCount > config.maxRetries * 2) {
      console.warn(`High error count detected (${errorCount}), considering disabling Spline`);
      splineManager.forceDisable();
    }
  }, []);
  
  return React.createElement(React.Fragment, null, children);
};