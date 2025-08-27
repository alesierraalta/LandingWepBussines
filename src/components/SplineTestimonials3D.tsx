'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedSplineLoader } from './Spline3DManager';

interface SplineTestimonials3DProps {
  testimonialIndex: number;
  isActive: boolean;
  rating: number;
}

const SplineTestimonials3D: React.FC<SplineTestimonials3DProps> = ({ 
  testimonialIndex, 
  isActive, 
  rating 
}) => {
  // Rotating 3D scenes for testimonials
  const sceneUrls = [
    'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
    'https://prod.spline.design/llcHNPsQoM4zIVdm/scene.splinecode',
    'https://prod.spline.design/pwdKWjSpQR2vJzts/scene.splinecode',
  ];

  const currentScene = sceneUrls[testimonialIndex % sceneUrls.length];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isActive ? 0.25 : 0, 
        scale: isActive ? 1 : 0.8,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Star particles based on rating */}
      <div className="absolute inset-0">
        {[...Array(rating * 2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          >
            <div className="w-1 h-1 bg-yellow-400 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Floating quote symbols */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`quote-${i}`}
            className="absolute text-4xl font-bold opacity-10"
            style={{
              left: `${20 + i * 30}%`,
              top: `${15 + i * 25}%`,
              color: '#10069f'
            }}
            animate={{
              y: [-5, 5, -5],
              rotate: [-2, 2, -2],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            "
          </motion.div>
        ))}
      </div>

      {/* 3D Scene Container */}
      <OptimizedSplineLoader
        sceneUrl={currentScene}
        sceneId={`testimonial-${testimonialIndex}`}
        className="relative w-full h-full z-10"
        fallback={
          <div className="flex items-center justify-center h-full">
            <motion.div 
              className="flex space-x-1"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>
        }
      />

      {/* Testimonial-specific effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 70%, rgba(16, 6, 159, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 60%)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Rating-based glow effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{
          boxShadow: [
            `inset 0 0 20px rgba(251, 191, 36, ${rating * 0.02})`,
            `inset 0 0 40px rgba(251, 191, 36, ${rating * 0.04})`,
            `inset 0 0 20px rgba(251, 191, 36, ${rating * 0.02})`
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Subtle overlay gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.03), rgba(16, 6, 159, 0.03))'
        }}
      />
    </motion.div>
  );
};

export default SplineTestimonials3D;