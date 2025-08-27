'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SplineFallback3DProps {
  serviceIndex: number;
  isHovered: boolean;
  className?: string;
  onRetry?: () => void;
  disabled?: boolean;
}

const SplineFallback3D: React.FC<SplineFallback3DProps> = ({ 
  serviceIndex, 
  isHovered, 
  className,
  onRetry,
  disabled = false
}) => {
  // Different color schemes for different services
  const colorSchemes = [
    { primary: '#10069f', secondary: '#455cff', accent: '#6366f1' }, // Web Development
    { primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc' }, // Mobile Apps
    { primary: '#059669', secondary: '#10b981', accent: '#34d399' }, // Cloud Hosting
    { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171' }, // Security
    { primary: '#ea580c', secondary: '#f97316', accent: '#fb923c' }, // Performance
    { primary: '#7c2d12', secondary: '#ea580c', accent: '#f97316' }, // Design
    { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' }, // SEO
    { primary: '#166534', secondary: '#16a34a', accent: '#4ade80' }, // Support
  ];

  const currentScheme = colorSchemes[serviceIndex % colorSchemes.length];

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isHovered ? 0.4 : 0, 
        scale: isHovered ? 1 : 0.8,
        rotateY: isHovered ? 0 : 10
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated geometric background */}
      <div className="absolute inset-0">
        {/* Primary geometric shape */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20"
          style={{
            background: `linear-gradient(135deg, ${currentScheme.primary}, ${currentScheme.secondary})`
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [-10, 10, -10],
            y: [-5, 5, -5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary geometric shape */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 opacity-15"
          style={{
            background: `linear-gradient(45deg, ${currentScheme.secondary}, ${currentScheme.accent})`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            rotate: [0, -180, -360],
            x: [5, -5, 5],
            y: [10, -10, 10]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              background: i % 3 === 0 ? currentScheme.primary : 
                         i % 3 === 1 ? currentScheme.secondary : currentScheme.accent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${currentScheme.primary} 1px, transparent 1px),
              linear-gradient(90deg, ${currentScheme.primary} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Radial gradient overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 30% 30%, ${currentScheme.primary}15 0%, transparent 50%)`,
              `radial-gradient(circle at 70% 70%, ${currentScheme.secondary}15 0%, transparent 50%)`,
              `radial-gradient(circle at 50% 50%, ${currentScheme.accent}15 0%, transparent 50%)`
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Service-specific icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center opacity-20"
          style={{
            background: `linear-gradient(135deg, ${currentScheme.primary}, ${currentScheme.secondary})`
          }}
          animate={{
            scale: isHovered ? [1, 1.1, 1] : [0.8, 0.9, 0.8],
            rotate: [0, 360]
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <div 
            className="w-8 h-8 rounded-sm"
            style={{
              background: currentScheme.accent,
              opacity: 0.8
            }}
          />
        </motion.div>
      </div>

      {/* Overlay gradient for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${currentScheme.primary}10, ${currentScheme.secondary}10)`
        }}
      />

      {/* Retry button */}
      {onRetry && !disabled && (
        <motion.button
          onClick={onRetry}
          className="absolute bottom-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry 3D
        </motion.button>
      )}
      
      {disabled && (
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-lg text-xs text-red-300 pointer-events-auto">
          3D Disabled
        </div>
      )}
    </motion.div>
  );
};

export { SplineFallback3D };
export default SplineFallback3D;