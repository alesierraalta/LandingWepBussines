'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, memo } from 'react';
import { LucideIcon } from 'lucide-react';
import { fadeInUp, hoverLift } from '@/lib/animations';
import { glassCard, iconContainer, colors } from '@/lib/styles';

interface OptimizedCardProps extends MotionProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  features?: string[];
  children?: ReactNode;
  className?: string;
  onHover?: () => void;
  onHoverEnd?: () => void;
  index?: number;
  disableAnimations?: boolean;
  disableHover?: boolean;
}

export const OptimizedCard = memo<OptimizedCardProps>(({
  icon: Icon,
  title,
  description,
  features = [],
  children,
  className = '',
  onHover,
  onHoverEnd,
  index = 0,
  disableAnimations = false,
  disableHover = false,
  ...motionProps
}) => {
  const Component = disableAnimations ? 'div' : motion.div;
  const animationProps = disableAnimations ? {} : {
    variants: fadeInUp,
    ...(disableHover ? {} : hoverLift),
    whileHover: disableHover ? {} : {
      boxShadow: '0 12px 40px rgba(16, 6, 159, 0.15)',
      transition: { duration: 0.3, ease: "easeOut" }
    },
    ...motionProps
  };

  return (
    <Component
      className={`group rounded-2xl p-8 ${disableHover ? '' : 'cursor-pointer'} relative overflow-hidden transition-all duration-300 ${className}`}
      style={glassCard}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      {...animationProps}
    >
      {/* Icon */}
      {Icon && (
        <div className="mb-6">
          <div style={iconContainer}>
            <Icon size={32} style={{ color: colors.primary }} />
          </div>
        </div>
      )}

      {/* Content */}
      {title && (
        <h3 className="text-xl font-bold mb-3 transition-colors duration-300" 
            style={{ color: colors.text.primary }}>
          {title}
        </h3>
      )}
      
      {description && (
        <p className="mb-6 leading-relaxed" style={{ color: colors.text.secondary }}>
          {description}
        </p>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-2 mb-6">
          {features.map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className="flex items-center gap-2"
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: colors.gradients.primary }}
              />
              <span className="text-sm" style={{ color: colors.text.secondary }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Custom children */}
      {children}

      {/* Hover Effect Overlay */}
      {!disableHover && (
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.08), rgba(69, 92, 255, 0.08))',
            backdropFilter: 'blur(4px)'
          }}
        />
      )}
    </Component>
  );
});

OptimizedCard.displayName = 'OptimizedCard';
