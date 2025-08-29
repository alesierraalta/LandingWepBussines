"use client";

import React from 'react';

interface SierraXLogoProps {
  className?: string;
  isScrolled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function SierraXLogo({ className = "", isScrolled = false, size = 'medium' }: SierraXLogoProps) {
  const sizes = {
    small: { container: "h-8", text: "text-lg", icon: "w-8 h-8", mountain: "w-5 h-5" },
    medium: { container: "h-12", text: "text-xl", icon: "w-10 h-10", mountain: "w-6 h-6" },
    large: { container: "h-16", text: "text-2xl", icon: "w-14 h-14", mountain: "w-8 h-8" }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center space-x-3 group cursor-pointer ${className}`}>
      {/* Logo Icon with Mountain Design */}
      <div 
        className={`${currentSize.icon} rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}
        style={{ 
          background: isScrolled 
            ? 'linear-gradient(135deg, #10069f 0%, #455cff 50%, #10069f 100%)' 
            : 'linear-gradient(135deg, #455cff 0%, #10069f 50%, #455cff 100%)',
          boxShadow: isScrolled 
            ? '0 8px 25px rgba(16, 6, 159, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)' 
            : '0 8px 30px rgba(69, 92, 255, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
        }}
      >
        {/* Mountain Peak SVG Design */}
        <svg 
          className={`${currentSize.mountain} text-white relative z-10 transition-transform duration-300 group-hover:scale-110`}
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          {/* Sierra (Mountain Range) Design */}
          <path d="M3 18h18v2H3v-2zm2.5-5.5l2.5-3 2.5 3 3-4 3 4 2.5-3L21 14H3l2.5-1.5z" opacity="0.8"/>
          <path d="M5.5 12.5L8 9.5l2.5 3 3-4 3 4 2.5-3L21 14l-2-4.5-2.5 3-3-4-3 4-2.5-3L5.5 12.5z"/>
          {/* X Integration */}
          <path d="M14 6l2 2-2 2 2 2-2 2v-1.5l-1-1 1-1-1-1 1-1V6z" fill="currentColor" opacity="0.9"/>
          <path d="M10 6v1.5l1 1-1 1 1 1-1 1V14l-2-2 2-2-2-2 2-2V6z" fill="currentColor" opacity="0.9"/>
        </svg>

        {/* Gradient Overlay for Depth */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* Company Name */}
      <div className="flex items-baseline space-x-1">
        <span 
          className={`${currentSize.text} font-black transition-all duration-300 group-hover:scale-105 tracking-tight`}
          style={{ 
            color: isScrolled ? '#10069f' : '#ffffff',
            textShadow: isScrolled 
              ? '0 2px 4px rgba(16, 6, 159, 0.1)' 
              : '2px 2px 4px rgba(0, 0, 0, 0.4), 0 0 10px rgba(69, 92, 255, 0.3)',
            filter: isScrolled ? 'none' : 'drop-shadow(0 0 8px rgba(69, 92, 255, 0.4))'
          }}
        >
          Sierra
        </span>
        <span 
          className={`${currentSize.text} font-black transition-all duration-500 group-hover:scale-110 tracking-tight`}
          style={{ 
            color: '#455cff',
            textShadow: isScrolled 
              ? '0 2px 8px rgba(69, 92, 255, 0.3)' 
              : '2px 2px 8px rgba(0, 0, 0, 0.4), 0 0 15px rgba(69, 92, 255, 0.6)',
            filter: 'drop-shadow(0 0 6px rgba(69, 92, 255, 0.5))',
            animation: 'pulse 3s ease-in-out infinite'
          }}
        >
          X
        </span>
      </div>

      {/* Subtle Glow Effect */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            filter: drop-shadow(0 0 6px rgba(69, 92, 255, 0.5));
            transform: scale(1);
          }
          50% { 
            filter: drop-shadow(0 0 12px rgba(69, 92, 255, 0.8));
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
