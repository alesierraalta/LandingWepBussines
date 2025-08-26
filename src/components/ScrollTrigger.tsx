'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollTriggerProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'stagger';
  delay?: number;
}

export const ScrollTrigger = ({ 
  children, 
  className = '',
  animationType = 'fade',
  delay = 0
}: ScrollTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const springConfig = { stiffness: 400, damping: 30, mass: 0.8 };
  
  // Smooth spring animations
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, 1]),
    springConfig
  );
  
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [100, 0]),
    springConfig
  );
  
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0.8, 1]),
    springConfig
  );
  
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-10, 0]),
    springConfig
  );

  const getAnimationProps = () => {
    switch (animationType) {
      case 'slide':
        return { opacity, y };
      case 'scale':
        return { opacity, scale };
      case 'rotate':
        return { opacity, rotate };
      case 'stagger':
        return { 
          opacity, 
          y,
          transition: { 
            delay: delay,
            type: "spring",
            ...springConfig 
          }
        };
      default:
        return { opacity };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={getAnimationProps()}
      initial={{ opacity: 0, y: animationType === 'slide' ? 100 : 0 }}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxText = ({ children, speed = 0.5 }: { children: ReactNode; speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, speed * 100]),
    { stiffness: 400, damping: 30 }
  );

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export const MagneticElement = ({ 
  children, 
  strength = 0.3,
  className = ''
}: { 
  children: ReactNode; 
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const element = ref.current;
    if (!element) return;
    
    element.style.transform = 'translate(0px, 0px)';
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};
