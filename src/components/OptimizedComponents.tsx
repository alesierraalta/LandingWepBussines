'use client';

import { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GPUOptimizedMotion } from '@/lib/performance';

// Memoized service card component
export const ServiceCard = memo(({ 
  service, 
  index, 
  variants 
}: { 
  service: any; 
  index: number; 
  variants: any; 
}) => {
  const cardStyle = useMemo(() => ({
    animationDelay: `${index * 0.1}s`,
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(16, 6, 159, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)',
    willChange: 'transform, opacity', // Hint for GPU acceleration
    transform: 'translateZ(0)', // Force GPU layer
  }), [index]);

  const hoverAnimation = useMemo(() => ({
    boxShadow: "0 20px 40px rgba(16, 6, 159, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }), []);

  return (
    <motion.div
      key={`service-${index}`}
      variants={variants}
      whileHover={hoverAnimation}
      className="group rounded-2xl p-8 transition-all duration-500"
      style={cardStyle}
    >
      {/* Service content */}
      <div className="mb-6">
        <motion.div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.1), rgba(69, 92, 255, 0.1))',
            willChange: 'transform',
          }}
          whileHover={{
            background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.2), rgba(69, 92, 255, 0.2))',
            boxShadow: '0 8px 16px rgba(16, 6, 159, 0.2)',
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          <motion.div
            whileHover={{
              filter: 'drop-shadow(0 0 8px rgba(16, 6, 159, 0.6))',
              transition: { duration: 0.2 }
            }}
          >
            <service.icon size={32} style={{ color: '#10069f' }} />
          </motion.div>
        </motion.div>
      </div>

      <h3 
        className="text-xl font-bold mb-3 transition-colors duration-300" 
        style={{ color: '#000000' }}
      >
        {service.title}
      </h3>
      
      <p className="mb-6 leading-relaxed" style={{ color: '#5d5d5d' }}>
        {service.description}
      </p>

      <div className="space-y-2">
        {service.features.map((feature: string, featureIndex: number) => (
          <motion.div
            key={`feature-${index}-${featureIndex}`}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: featureIndex * 0.1 }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ background: '#10069f' }}
            />
            <span className="text-sm" style={{ color: '#5d5d5d' }}>
              {feature}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Memoized floating element component
export const FloatingElement = memo(({ 
  Icon, 
  delay, 
  position, 
  depth, 
  text 
}: {
  Icon: any;
  delay: number;
  position: string;
  depth: number;
  text: string;
}) => {
  const floatingAnimation = useMemo(() => ({
    y: [0, -15, 0],
    rotate: [0, 5, 0],
    scale: [1, 1.05, 1],
  }), []);

  const floatingTransition = useMemo(() => ({
    duration: 4 + delay,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay,
  }), [delay]);

  const elementStyle = useMemo(() => ({
    zIndex: Math.abs(depth),
    transform: `translateZ(${depth}px)`,
    willChange: 'transform',
  }), [depth]);

  return (
    <motion.div
      className={`absolute ${position} pointer-events-none select-none`}
      animate={floatingAnimation}
      transition={floatingTransition}
      style={elementStyle}
    >
      <div className="relative">
        <motion.div
          className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20"
          whileHover={{ scale: 1.1 }}
        >
          <Icon size={32} className="text-primary/80" />
        </motion.div>
        <motion.span
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-primary/60 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 1 }}
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
});

FloatingElement.displayName = 'FloatingElement';

// Optimized contact info card
export const ContactInfoCard = memo(({ 
  info, 
  index, 
  variants 
}: {
  info: any;
  index: number;
  variants: any;
}) => {
  const cardAnimation = useMemo(() => ({
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    scale: 1.02,
    transition: { duration: 0.2 }
  }), []);

  return (
    <motion.div
      key={`contact-${index}`}
      variants={variants}
      className="flex items-start gap-4 p-6 glass-card rounded-2xl hover:bg-white/60 transition-all duration-300 group"
      whileHover={cardAnimation}
      style={{ willChange: 'transform, background-color' }}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
        <info.icon size={24} className="text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
        <p className="text-primary font-medium mb-1">{info.content}</p>
        <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300 drop-shadow-md">
          {info.description}
        </p>
      </div>
    </motion.div>
  );
});

ContactInfoCard.displayName = 'ContactInfoCard';

// High-performance button component
export const OptimizedButton = memo(({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  [key: string]: any;
}) => {
  const buttonVariants = useMemo(() => ({
    primary: {
      whileHover: { 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(16, 6, 159, 0.4), 0 0 60px rgba(69, 92, 255, 0.2)",
        transition: { duration: 0.2 }
      },
      whileTap: { scale: 0.98 },
    },
    secondary: {
      whileHover: { 
        scale: 1.02,
        transition: { duration: 0.2 }
      },
      whileTap: { scale: 0.98 },
    }
  }), []);

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <motion.button
      {...buttonVariants[variant]}
      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
        variant === 'primary' 
          ? 'bg-primary hover:bg-secondary text-white animate-subtle-glow shadow-lg' 
          : 'bg-transparent border border-gray-300 hover:border-primary text-gray-900'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      style={{ 
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

OptimizedButton.displayName = 'OptimizedButton';
