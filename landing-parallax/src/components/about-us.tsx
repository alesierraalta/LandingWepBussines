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
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4 text-center">
              <span className="text-4xl md:text-6xl font-bold">Conoce a</span>
              <br />
              <HyperText 
                className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-center"
                as="span"
                delay={800}
                animateOnHover={false}
                startOnView={true}
                style={{ 
                  background: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                SierraX
              </HyperText>
            </h1>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl text-center">
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
