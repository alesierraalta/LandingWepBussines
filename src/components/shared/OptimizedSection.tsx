'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, memo } from 'react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { commonClasses } from '@/lib/styles';

interface OptimizedSectionProps extends MotionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  gradientWord?: string;
}

export const OptimizedSection = memo<OptimizedSectionProps>(({ 
  id, 
  children, 
  className = '', 
  headerTitle,
  headerSubtitle,
  gradientWord,
  ...motionProps 
}) => {
  return (
    <motion.section
      id={id}
      className={`${commonClasses.section} ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      {...motionProps}
    >
      <div className={commonClasses.container}>
        {(headerTitle || headerSubtitle) && (
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            {headerTitle && (
              <h2 className={commonClasses.heading} style={{ color: '#000000' }}>
                {gradientWord ? (
                  <>
                    {headerTitle.split(gradientWord)[0]}
                    <span className="gradient-text-modern animate-gradient-shift">
                      {gradientWord}
                    </span>
                    {headerTitle.split(gradientWord)[1]}
                  </>
                ) : (
                  headerTitle
                )}
              </h2>
            )}
            {headerSubtitle && (
              <p className="text-lg max-w-3xl mx-auto" style={{ color: '#5d5d5d' }}>
                {headerSubtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
});

OptimizedSection.displayName = 'OptimizedSection';

