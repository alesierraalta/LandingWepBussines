"use client";

import React from 'react';
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HyperText } from "@/components/magicui/hyper-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import AboutUsContent from "@/components/about-us-content";

export const AboutUs = () => {
  return (
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center">
          <BlurFade delay={0.2} inView>
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center">
              <span className="text-4xl md:text-6xl font-bold">Conoce a</span>
              <br />
              <img 
                src="/icon-white-logo.jpg" 
                alt="SierraX Logo" 
                className="h-32 md:h-40 lg:h-48 w-auto object-contain -my-4"
                style={{
                  filter: 'brightness(1.1) contrast(1.2)',
                  maxWidth: '400px'
                }}
              />
            </h1>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl text-center -mt-4">
              El equipo detrás de las experiencias digitales que transforman negocios
            </p>
          </BlurFade>
        </div>
      }
    >
      <BlurFade delay={0.8} inView>
        <AboutUsContent />
      </BlurFade>
    </ContainerScroll>
  );
};
