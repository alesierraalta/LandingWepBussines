"use client";

import React from 'react';
import { Users, Target, Award, Heart } from "lucide-react";

const AboutUsContent = () => {
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nosotros
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Somos un equipo apasionado por crear experiencias digitales excepcionales que transforman ideas en realidad
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Mission & Values */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nuestra Misión
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Creamos soluciones web que conectan marcas con personas, combinando diseño excepcional con tecnología de vanguardia.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nuestros Valores
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Calidad, transparencia y compromiso guían cada proyecto. Creemos en relaciones duraderas basadas en confianza mutua.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Team & Stats */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nuestro Equipo
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Desarrolladores, diseñadores y estrategistas trabajando juntos para superar tus expectativas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nuestra Experiencia
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Años de experiencia creando soluciones digitales para empresas de todos los tamaños y sectores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">100+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Proyectos Exitosos</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">5+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfacción Cliente</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;
