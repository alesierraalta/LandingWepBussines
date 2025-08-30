"use client";

import React from "react";
import { motion } from "motion/react";

// Define the testimonial type
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

export const TestimonialsColumn = (props: TestimonialsColumnProps) => {
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
              {props.testimonials.map(({ text, image, name, role }, i) => (
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
                  <div 
                    className="text-sm leading-relaxed mb-6 font-medium"
                    style={{ color: '#374151' }}
                  >
                    "{text}"
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      width={48}
                      height={48}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full border-2 object-cover"
                      style={{ borderColor: '#10069f' }}
                    />
                    <div className="flex flex-col">
                      <div 
                        className="font-bold tracking-tight leading-5 text-sm"
                        style={{ color: '#10069f' }}
                      >
                        {name}
                      </div>
                      <div 
                        className="leading-5 tracking-tight text-xs font-medium"
                        style={{ color: '#6b7280' }}
                      >
                        {role}
                      </div>
                    </div>
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

