"use client";

import React from "react";
import { motion } from "motion/react";

// Define the approach item type
interface ApproachItem {
  icon: string;
  title: string;
  description: string;
}

interface ApproachColumnProps {
  className?: string;
  items: ApproachItem[];
  duration?: number;
}

export const ApproachColumn = (props: ApproachColumnProps) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.items.map(({ icon, title, description }, i) => (
                <div 
                  className="p-8 rounded-2xl border-2 shadow-lg max-w-xs w-full transition-all duration-300 hover:shadow-xl hover:scale-105" 
                  key={i}
                  style={{
                    borderColor: '#e5e7eb',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 25px rgba(16, 6, 159, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="text-3xl p-3 rounded-xl"
                      style={{
                        backgroundColor: 'rgba(16, 6, 159, 0.1)',
                        border: '2px solid rgba(16, 6, 159, 0.2)'
                      }}
                    >
                      {icon}
                    </div>
                    <div 
                      className="font-bold text-lg leading-tight"
                      style={{ color: '#10069f' }}
                    >
                      {title}
                    </div>
                  </div>
                  <div 
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: '#374151' }}
                  >
                    {description}
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};