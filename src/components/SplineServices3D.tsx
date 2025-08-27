'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OptimizedSplineLoader } from './Spline3DManager';
import { SplineFallback3D } from './SplineFallback3D';
import { useSplineStatus } from '@/lib/spline-config';

interface SplineServices3DProps {
  serviceIndex: number;
  isHovered: boolean;
}

export const SplineServices3D: React.FC<SplineServices3DProps> = ({ serviceIndex, isHovered }) => {
  const { isEnabled: globalSplineEnabled, hasErrors } = useSplineStatus();
  const [useSpline, setUseSpline] = useState(true);
  const [splineError, setSplineError] = useState(false);
  
  // Use fallback if Spline is globally disabled or has persistent errors
  const shouldUseFallback = !globalSplineEnabled || hasErrors || splineError || !useSpline;

  // Different 3D scenes for different services
  const sceneUrls = [
    'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode', // Web Development
    'https://prod.spline.design/llcHNPsQoM4zIVdm/scene.splinecode', // Mobile Apps
    'https://prod.spline.design/pwdKWjSpQR2vJzts/scene.splinecode', // Cloud Hosting
    'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode', // Security
    'https://prod.spline.design/llcHNPsQoM4zIVdm/scene.splinecode', // Performance
    'https://prod.spline.design/pwdKWjSpQR2vJzts/scene.splinecode', // Design
    'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode', // SEO
    'https://prod.spline.design/llcHNPsQoM4zIVdm/scene.splinecode', // Support
  ];

  const currentScene = sceneUrls[serviceIndex % sceneUrls.length];

  // Handle Spline errors gracefully
  const handleSplineError = () => {
    console.warn(`Spline scene failed for service ${serviceIndex}, switching to fallback`);
    setSplineError(true);
    setUseSpline(false);
  };

  // Fallback to CSS animation if Spline fails or is disabled
  if (shouldUseFallback) {
    return (
      <SplineFallback3D 
        serviceIndex={serviceIndex}
        isHovered={isHovered}
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
        onRetry={() => {
          if (globalSplineEnabled) {
            setSplineError(false);
            setUseSpline(true);
          }
        }}
        disabled={!globalSplineEnabled}
      />
    );
  }

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isHovered ? 0.3 : 0, 
        scale: isHovered ? 1 : 0.8,
        rotateY: isHovered ? 0 : 10
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* 3D Scene Container with Enhanced Error Handling */}
      <OptimizedSplineLoader
        sceneUrl={currentScene}
        sceneId={`service-${serviceIndex}`}
        className="relative w-full h-full"
        fallback={
          <SplineFallback3D 
            serviceIndex={serviceIndex}
            isHovered={isHovered}
            className="w-full h-full"
          />
        }
      />

      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.1), rgba(69, 92, 255, 0.1))'
        }}
      />
    </motion.div>
  );
};

export default SplineServices3D;