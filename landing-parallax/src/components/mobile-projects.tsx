"use client";

import React from 'react';
import { FaStore, FaHospital, FaBuilding, FaCog, FaRocket } from 'react-icons/fa';

const MobileProjects = () => {
  const projects = [
    {
      title: "E-Commerce Premium",
      description: "Tienda online que vende 24/7",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      icon: <FaStore size={20} className="text-white" />,
      stats: "+340% ventas online",
      sector: "Retail"
    },
    {
      title: "Clínica Médica Elite", 
      description: "Profesional y confiable",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
      icon: <FaHospital size={20} className="text-white" />,
      stats: "+280% citas online",
      sector: "Salud"
    },
    {
      title: "Corporativo Ejecutivo",
      description: "Presencia digital dominante", 
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      icon: <FaBuilding size={20} className="text-white" />,
      stats: "+450% leads B2B",
      sector: "Corporativo"
    },
    {
      title: "Servicios Industriales",
      description: "Líder en su sector",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", 
      icon: <FaCog size={20} className="text-white" />,
      stats: "+520% contactos",
      sector: "Industria"
    },
    {
      title: "Startup Tech",
      description: "Innovación que convierte",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      icon: <FaRocket size={20} className="text-white" />,
      stats: "+670% usuarios",
      sector: "Tecnología"
    }
  ];

  return (
    <div className="py-16 bg-white px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 
          className="text-3xl font-black mb-4 tracking-tight"
          style={{ 
            color: '#10069f',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          Proyectos Que Dominan Sus Sectores
        </h1>
        <p 
          className="text-base font-medium max-w-sm mx-auto leading-relaxed"
          style={{ color: '#5d5d5d' }}
        >
          Cada uno de estos negocios ahora es el líder digital de su industria. 
          <span style={{ color: '#10069f', fontWeight: 'bold' }}> ¿Cuándo será tu turno?</span>
        </p>
      </div>

      {/* Mobile Projects Grid */}
      <div className="space-y-4 max-w-md mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundImage: `url('${project.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '160px',
              border: '2px solid #e5e7eb'
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Sector Badge */}
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                    style={{ backgroundColor: '#10069f' }}
                  >
                    <span className="text-white">{project.sector}</span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div 
                    className="inline-block px-3 py-2 rounded-lg font-bold text-sm"
                    style={{ backgroundColor: 'rgba(16, 6, 159, 0.9)' }}
                  >
                    <span className="text-white">{project.stats}</span>
                  </div>
                </div>

                {/* Icon */}
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full ml-4"
                  style={{ 
                    backgroundColor: 'rgba(69, 92, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {project.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p 
          className="text-base font-semibold mb-6 max-w-xs mx-auto"
          style={{ color: '#5d5d5d' }}
        >
          Estos resultados no son casualidad. <span style={{ color: '#10069f', fontWeight: 'bold' }}>Son estrategia pura.</span>
        </p>
        <a 
          href="https://wa.me/582411234567?text=Hola%2C%20vi%20los%20resultados%20de%20sus%20proyectos%20y%20quiero%20estos%20mismos%20resultados%20para%20mi%20negocio.%20¿Podemos%20hablar%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-sm mx-auto block px-6 py-4 rounded-2xl font-bold text-white text-base shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          style={{
            backgroundColor: '#10069f',
            boxShadow: '0 4px 20px rgba(16, 6, 159, 0.3)',
            minHeight: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Quiero Estos Resultados Para Mi Negocio
        </a>
        <p className="text-sm text-gray-600 mt-4 px-4">
          🚀 Consulta gratuita • Estrategia personalizada • Resultados garantizados
        </p>
      </div>
    </div>
  );
};

export default MobileProjects;
