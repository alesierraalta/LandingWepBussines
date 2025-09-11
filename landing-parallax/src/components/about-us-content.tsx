"use client";

import React from 'react';
import { Users, Target, Award, Heart } from "lucide-react";

const AboutUsContent = () => {
  return (
    <div className="w-full min-h-full bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 pb-8 flex flex-col justify-center overflow-visible">
      <div className="max-w-4xl mx-auto overflow-visible">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nuestra Pasión
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Creemos que cada negocio merece una presencia digital que genere resultados reales. Nos apasiona transformar ideas en experiencias digitales exitosas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Impulsamos Negocios
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ayudamos a empresarios y emprendedores a acelerar su crecimiento digital con landing pages que convierten visitantes en clientes.
                </p>
              </div>
            </div>
          </div>
        </div>



        {/* WhatsApp CTA */}
        <div className="mt-6 text-center mb-3 overflow-visible">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white overflow-visible">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="text-sm mb-4 opacity-90">
              Únete a las empresas que ya obtienen resultados medibles con landing pages optimizadas
            </p>
            <a
              href="https://wa.me/582411234567?text=Hola%2C%20quiero%20conocer%20más%20sobre%20sus%20servicios%20de%20desarrollo%20web%20y%20cómo%20pueden%20ayudar%20a%20mi%20negocio%20a%20crecer."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;
