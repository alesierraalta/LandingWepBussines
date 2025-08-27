'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedSplineLoader } from './Spline3DManager';

interface SplinePortfolio3DProps {
  projectCategory: string;
  isVisible: boolean;
  projectIndex: number;
}

const SplinePortfolio3D: React.FC<SplinePortfolio3DProps> = ({ 
  projectCategory, 
  isVisible, 
  projectIndex 
}) => {
  // Different 3D scenes based on project category
  const getCategoryScene = (category: string) => {
    const scenes = {
      web: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
      ecommerce: 'https://prod.spline.design/llcHNPsQoM4zIVdm/scene.splinecode',
      hosting: 'https://prod.spline.design/pwdKWjSpQR2vJzts/scene.splinecode',
      app: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
    };
    return scenes[category as keyof typeof scenes] || scenes.web;
  };

  const currentScene = getCategoryScene(projectCategory);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
      initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
      animate={{ 
        opacity: isVisible ? 0.4 : 0, 
        scale: isVisible ? 1 : 0.9,
        rotateX: isVisible ? 0 : 15,
        rotateY: isVisible ? 0 : 5
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Geometric background patterns */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 12)}%`,
              width: `${8 + Math.random() * 4}px`,
              height: `${8 + Math.random() * 4}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: i % 2 === 0 
                  ? 'linear-gradient(45deg, #10069f, #455cff)'
                  : 'linear-gradient(45deg, #ff6b6b, #feca57)',
                borderRadius: i % 3 === 0 ? '50%' : '2px'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* 3D Scene Container */}
      <OptimizedSplineLoader
        sceneUrl={currentScene}
        sceneId={`portfolio-${projectCategory}-${projectIndex}`}
        className="relative w-full h-full z-10"
        fallback={
          <div className="flex items-center justify-center h-full">
            <motion.div 
              className="w-12 h-12 border-2 border-purple-500 rounded-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        }
      />

      {/* Interactive light effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(16, 6, 159, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(69, 92, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(16, 6, 159, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Category-specific overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          background: projectCategory === 'web' 
            ? 'linear-gradient(135deg, rgba(16, 6, 159, 0.05), rgba(69, 92, 255, 0.05))'
            : projectCategory === 'ecommerce'
            ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.05), rgba(254, 202, 87, 0.05))'
            : projectCategory === 'hosting'
            ? 'linear-gradient(135deg, rgba(46, 213, 115, 0.05), rgba(0, 216, 255, 0.05))'
            : 'linear-gradient(135deg, rgba(155, 89, 182, 0.05), rgba(142, 68, 173, 0.05))'
        }}
      />
    </motion.div>
  );
};

export default SplinePortfolio3D;