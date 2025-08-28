'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, memo, ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { hoverGlow } from '@/lib/animations';
import { gradientButton, colors } from '@/lib/styles';

interface OptimizedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, MotionProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary: gradientButton,
  secondary: {
    background: 'transparent',
    border: '1px solid rgba(16, 6, 159, 0.3)',
    color: colors.primary,
    borderRadius: '9999px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  ghost: {
    background: 'transparent',
    border: 'none',
    color: colors.text.primary,
    fontWeight: '600',
    transition: 'all 0.3s ease',
  }
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const OptimizedButton = memo<OptimizedButtonProps>(({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={`
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} 
        rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2
        ${className}
      `}
      style={variants[variant]}
      disabled={isDisabled}
      {...(variant === 'primary' && !isDisabled ? hoverGlow : {})}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Cargando...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={20} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={20} />}
        </>
      )}
    </motion.button>
  );
});

OptimizedButton.displayName = 'OptimizedButton';

