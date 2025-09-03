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
        <button 
          className="w-full max-w-sm mx-auto block px-6 py-4 rounded-2xl font-bold text-white text-base shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: '#10069f',
            boxShadow: '0 4px 20px rgba(16, 6, 159, 0.3)',
            minHeight: '56px'
          }}
        >
          Quiero Estos Resultados Para Mi Negocio
        </button>
        <p className="text-sm text-gray-600 mt-4 px-4">
          🚀 Consulta gratuita • Estrategia personalizada • Resultados garantizados
        </p>
      </div>
    </div>
  );
};

export default MobileProjects;
