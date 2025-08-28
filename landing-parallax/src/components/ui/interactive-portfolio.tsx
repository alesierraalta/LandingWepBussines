"use client";

import React, { useState, useEffect } from 'react';
import { FaStore, FaHospital, FaBuilding, FaCog, FaRocket } from 'react-icons/fa';

const InteractivePortfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const projects = [
    {
      title: "E-Commerce Premium",
      description: "Tienda online que vende 24/7",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      icon: <FaStore size={24} className="text-white" />,
      stats: "+340% ventas online",
      sector: "Retail"
    },
    {
      title: "Clínica Médica Elite", 
      description: "Profesional y confiable",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
      icon: <FaHospital size={24} className="text-white" />,
      stats: "+280% citas online",
      sector: "Salud"
    },
    {
      title: "Corporativo Ejecutivo",
      description: "Presencia digital dominante", 
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      icon: <FaBuilding size={24} className="text-white" />,
      stats: "+450% leads B2B",
      sector: "Corporativo"
    },
    {
      title: "Servicios Industriales",
      description: "Líder en su sector",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", 
      icon: <FaCog size={24} className="text-white" />,
      stats: "+520% contactos",
      sector: "Industria"
    },
    {
      title: "Startup Tech",
      description: "Innovación que convierte",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      icon: <FaRocket size={24} className="text-white" />,
      stats: "+670% usuarios",
      sector: "Tecnología"
    }
  ];

  const handleProjectClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    projects.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-20 bg-white font-sans">
      {/* Header Section */}
      <div className="w-full max-w-4xl px-6 mb-16 text-center">
        <h1 
          className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
          style={{ 
            color: '#10069f',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          Proyectos Que Dominan Sus Sectores
        </h1>
        <p 
          className="text-lg md:text-xl font-medium max-w-3xl mx-auto"
          style={{ color: '#5d5d5d' }}
        >
          Cada uno de estos negocios ahora es el líder digital de su industria. 
          <span style={{ color: '#10069f', fontWeight: 'bold' }}> ¿Cuándo será tu turno?</span>
        </p>
      </div>

      {/* Interactive Portfolio */}
      <div className="w-full max-w-7xl px-4">
        <div className="projects-container flex w-full max-w-[1000px] mx-auto h-[450px] items-stretch overflow-hidden relative rounded-2xl shadow-2xl">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '80px',
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: activeIndex === index ? '#455cff' : '#e5e7eb',
                boxShadow: activeIndex === index 
                  ? '0 20px 60px rgba(16, 6, 159, 0.4)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.2)',
                flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                zIndex: activeIndex === index ? 10 : 1,
              }}
              onClick={() => handleProjectClick(index)}
            >
              {/* Dark Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t transition-all duration-700 ease-in-out"
                style={{
                  background: activeIndex === index 
                    ? 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 p-6 text-white">
                {/* Sector Badge */}
                <div 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 transition-all duration-700"
                  style={{
                    backgroundColor: '#10069f',
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  {project.sector}
                </div>

                {/* Icon */}
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all duration-500"
                  style={{ 
                    backgroundColor: 'rgba(69, 92, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {project.icon}
                </div>

                {/* Project Info */}
                <div className="transition-all duration-700 ease-in-out">
                  <h3 
                    className="text-xl font-bold mb-2 transition-all duration-700"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                    }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="text-gray-200 mb-3 transition-all duration-700"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                    }}
                  >
                    {project.description}
                  </p>
                  
                  {/* Stats */}
                  <div 
                    className="inline-block px-4 py-2 rounded-lg font-bold text-sm transition-all duration-700"
                    style={{
                      backgroundColor: 'rgba(16, 6, 159, 0.9)',
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    {project.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p 
            className="text-lg font-semibold mb-6"
            style={{ color: '#5d5d5d' }}
          >
            Estos resultados no son casualidad. <span style={{ color: '#10069f', fontWeight: 'bold' }}>Son estrategia pura.</span>
          </p>
          <div 
            className="inline-block px-8 py-4 rounded-lg font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: '#10069f',
              boxShadow: '0 4px 14px 0 rgba(16, 6, 159, 0.3)'
            }}
          >
            Quiero Estos Resultados Para Mi Negocio
          </div>
          <p className="text-sm text-gray-600 mt-3">
            🚀 Consulta gratuita • Estrategia personalizada • Resultados garantizados
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractivePortfolio;
