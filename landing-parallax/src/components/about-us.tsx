"use client";

import React from 'react';
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import AboutUsContent from "@/components/about-us-content";

export const AboutUs = () => {
  return (
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            Conoce a <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              SierraX
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            El equipo detrás de las experiencias digitales que transforman negocios
          </p>
        </div>
      }
    >
      <AboutUsContent />
    </ContainerScroll>
  );
};
