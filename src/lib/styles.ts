// Shared style utilities and constants
import { CSSProperties } from 'react';

// Color constants
export const colors = {
  primary: '#10069f',
  secondary: '#455cff',
  text: {
    primary: '#000000',
    secondary: '#5d5d5d',
    white: '#ffffff',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
    primaryReverse: 'linear-gradient(135deg, #455cff 0%, #10069f 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    glassHover: 'rgba(255, 255, 255, 0.9)',
  }
} as const;

// Common style objects
export const glassCard: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(16, 6, 159, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)',
};

export const glassCardHover: CSSProperties = {
  ...glassCard,
  background: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 12px 40px rgba(16, 6, 159, 0.15)',
};

export const iconContainer: CSSProperties = {
  background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.1), rgba(69, 92, 255, 0.1))',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '64px',
  height: '64px',
};

export const gradientButton: CSSProperties = {
  background: colors.gradients.primary,
  color: colors.text.white,
  border: 'none',
  borderRadius: '9999px',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 32px rgba(16, 6, 159, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
};

// Utility functions
export const getGradientText = (): CSSProperties => ({
  background: colors.gradients.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const getFloatingElement = (position: string, depth: number): CSSProperties => ({
  position: 'absolute',
  ...getPositionFromString(position),
  transform: `translateZ(${depth}px)`,
  willChange: 'transform',
  pointerEvents: 'none',
  userSelect: 'none',
});

// Helper to parse position strings like "top-1/4 left-1/4"
const getPositionFromString = (position: string): CSSProperties => {
  const parts = position.split(' ');
  const style: CSSProperties = {};
  
  parts.forEach(part => {
    if (part.startsWith('top-')) {
      const value = part.replace('top-', '').replace('/', '/');
      style.top = value.includes('/') ? `${(parseInt(value.split('/')[0]) / parseInt(value.split('/')[1])) * 100}%` : value;
    }
    if (part.startsWith('bottom-')) {
      const value = part.replace('bottom-', '').replace('/', '/');
      style.bottom = value.includes('/') ? `${(parseInt(value.split('/')[0]) / parseInt(value.split('/')[1])) * 100}%` : value;
    }
    if (part.startsWith('left-')) {
      const value = part.replace('left-', '').replace('/', '/');
      style.left = value.includes('/') ? `${(parseInt(value.split('/')[0]) / parseInt(value.split('/')[1])) * 100}%` : value;
    }
    if (part.startsWith('right-')) {
      const value = part.replace('right-', '').replace('/', '/');
      style.right = value.includes('/') ? `${(parseInt(value.split('/')[0]) / parseInt(value.split('/')[1])) * 100}%` : value;
    }
  });
  
  return style;
};

// Common class names
export const commonClasses = {
  section: 'py-20 gradient-mesh floating-particles',
  container: 'container mx-auto px-6',
  card: 'rounded-2xl p-8 transition-all duration-300',
  heading: 'text-4xl md:text-5xl font-bold mb-6',
  subheading: 'text-2xl font-bold mb-4',
  text: 'leading-relaxed',
  button: 'px-8 py-3 rounded-full font-semibold transition-all duration-300',
  input: 'w-full px-4 py-3 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-500',
} as const;

