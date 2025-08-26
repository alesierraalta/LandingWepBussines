'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Code, Server, Zap, Brackets, Terminal, Database, Globe, Cpu } from 'lucide-react';

const HeroSection = () => {

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transform: 'translateZ(0)', // Force GPU layer
    },
    visible: {
      opacity: 1,
      transform: 'translateZ(0)',
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1, // Reduced for faster perception
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 15, // Reduced distance for smoother animation
      opacity: 0,
      transform: 'translateZ(0) translateY(15px)',
    },
    visible: {
      y: 0,
      opacity: 1,
      transform: 'translateZ(0) translateY(0px)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      }
    }
  };

  // Elementos de programación flotantes en 3D
  const floatingElements = [
    { Icon: Code, delay: 0, position: 'top-1/4 left-1/4', depth: -100, text: '</>' },
    { Icon: Terminal, delay: 0.5, position: 'top-1/3 right-1/4', depth: -200, text: '~$' },
    { Icon: Database, delay: 1, position: 'bottom-1/3 left-1/3', depth: -150, text: 'SQL' },
    { Icon: Globe, delay: 1.5, position: 'top-1/2 right-1/3', depth: -180, text: 'API' },
    { Icon: Cpu, delay: 2, position: 'bottom-1/4 right-1/4', depth: -120, text: 'JS' },
    { Icon: Brackets, delay: 2.5, position: 'top-3/4 left-1/2', depth: -160, text: '{}' },
  ];

  // Fragmentos de código flotantes (reposicionados lejos del texto central)
  const codeFragments = [
    { code: 'const app = () => {}', position: 'top-16 left-8', delay: 3 },
    { code: 'import React from "react"', position: 'bottom-16 right-8', delay: 3.5 },
    { code: 'export default', position: 'bottom-32 left-12', delay: 4 },
    { code: '{ useState, useEffect }', position: 'top-24 right-16', delay: 4.5 },
  ];

  // Formas geométricas 3D de fondo (evitando el área central del texto)
  const geometricShapes = [
    { shape: 'cube', position: 'top-12 left-12', size: 35, delay: 0 },
    { shape: 'tetrahedron', position: 'top-20 right-12', size: 30, delay: 2 },
    { shape: 'octahedron', position: 'bottom-12 left-16', size: 40, delay: 4 },
    { shape: 'sphere', position: 'top-32 right-20', size: 25, delay: 6 },
    { shape: 'cylinder', position: 'bottom-20 right-8', size: 32, delay: 8 },
  ];

  // Estado para el sistema de partículas avanzado (generado solo en el cliente)
  const [particleSwarms, setParticleSwarms] = useState([]);
  
  // Generar partículas solo en el cliente para evitar errores de hidratación
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 10 }, (_, i) => {
        // Generar posiciones que eviten el centro (30%-70% tanto X como Y)
        let x, y;
        do {
          x = Math.random() * 100;
          y = Math.random() * 100;
        } while (x > 25 && x < 75 && y > 30 && y < 70);
        
        return {
          id: i,
          x,
          y,
          size: Math.random() * 6 + 3,
          delay: Math.random() * 8,
          duration: Math.random() * 18 + 12
        };
      });
    };
    
    setParticleSwarms(generateParticles());
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh floating-particles depth-layer">
      {/* Background Elements & Advanced 3D Animation System */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ 
          perspective: '1200px', 
          zIndex: -10
        }}
      >
        
        {/* Advanced Particle Swarm System */}
        {particleSwarms.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute animate-particle-swarm hidden lg:block"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(16, 6, 159, 0.4), rgba(69, 92, 255, 0.2))`,
              borderRadius: '50%',
              filter: 'blur(1px)',
              zIndex: -5
            }}
            animate={{
              scale: [1, 1.5, 0.8, 1.2, 1],
              opacity: [0.2, 0.6, 0.3, 0.8, 0.2],
              rotate: [0, 180, 360, 180, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* 3D Geometric Shapes Background */}
        {geometricShapes.map((shape, index) => (
          <motion.div
            key={`shape-${index}`}
            className={`absolute ${shape.position} animate-geometric-float hidden xl:block`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              zIndex: -8
            }}
            initial={{ 
              opacity: 0,
              scale: 0,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0
            }}
            animate={{
              opacity: [0, 0.3, 0.6, 0.2, 0.4],
              scale: [0, 1, 1.2, 0.8, 1],
              rotateX: [0, 360, 180, 270, 360],
              rotateY: [0, 180, 360, 90, 180],
              rotateZ: [0, 90, 180, 270, 360]
            }}
            transition={{
              duration: 25,
              delay: shape.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Renderizar diferentes formas geométricas */}
            {shape.shape === 'cube' && (
              <div className="relative w-full h-full animate-parallax-drift"
                   style={{
                     background: 'linear-gradient(45deg, rgba(16, 6, 159, 0.2), rgba(69, 92, 255, 0.1))',
                     border: '1px solid rgba(16, 6, 159, 0.3)',
                     transformStyle: 'preserve-3d',
                     boxShadow: '0 0 20px rgba(16, 6, 159, 0.2)'
                   }}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500/10 transform rotateY-45"></div>
              </div>
            )}
            
            {shape.shape === 'sphere' && (
              <div className="w-full h-full rounded-full animate-parallax-drift"
                   style={{
                     background: 'radial-gradient(circle at 30% 30%, rgba(69, 92, 255, 0.3), rgba(16, 6, 159, 0.1))',
                     border: '1px solid rgba(69, 92, 255, 0.4)',
                     boxShadow: 'inset 0 0 20px rgba(16, 6, 159, 0.2), 0 0 30px rgba(69, 92, 255, 0.1)'
                   }}>
              </div>
            )}

            {shape.shape === 'tetrahedron' && (
              <div className="relative w-full h-full animate-parallax-drift"
                   style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-0 transform rotate-45"
                     style={{
                       background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.25), transparent)',
                       border: '1px solid rgba(16, 6, 159, 0.3)',
                       clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                     }}>
                </div>
              </div>
            )}

            {(shape.shape === 'octahedron' || shape.shape === 'cylinder') && (
              <div className="w-full h-full animate-parallax-drift"
                   style={{
                     background: 'linear-gradient(90deg, rgba(16, 6, 159, 0.2), rgba(69, 92, 255, 0.1), rgba(16, 6, 159, 0.2))',
                     border: '1px solid rgba(69, 92, 255, 0.3)',
                     borderRadius: shape.shape === 'cylinder' ? '50%' : '20%',
                     transform: 'rotateX(45deg) rotateY(45deg)',
                     boxShadow: '0 0 25px rgba(16, 6, 159, 0.15)'
                   }}>
              </div>
            )}
          </motion.div>
        ))}

        {/* Gradient Orbs with Enhanced Effects */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-parallax-drift"
          style={{ 
            background: 'radial-gradient(circle, #10069f25, #455cff20)',
            zIndex: -6
          }}
          animate={{
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.5, 0.2, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-parallax-drift"
          style={{ 
            background: 'radial-gradient(circle, #455cff25, #10069f20)',
            zIndex: -6
          }}
          animate={{
            scale: [0.9, 1.2, 1, 0.9],
            opacity: [0.2, 0.4, 0.6, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* 3D Floating Programming Elements */}
        {floatingElements.map(({ Icon, delay, position, depth, text }, index) => (
          <motion.div
            key={`element-${index}`}
            className={`absolute ${position} hidden lg:block`}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotateX: 45,
              rotateY: 45,
              z: depth
            }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0.3, 0.8],
              scale: [0, 1.2, 1, 0.8, 1],
              rotateX: [45, 0, 15, -10, 5],
              rotateY: [45, 360, 180, 270, 360],
              z: [depth, depth - 50, depth, depth - 30, depth],
              x: [0, 20, -15, 10, 0],
              y: [0, -10, 15, -5, 0]
            }}
            transition={{
              duration: 8,
              delay: delay,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            style={{
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 10px 20px rgba(16, 6, 159, 0.3))'
            }}
          >
            <div className="relative group">
              {/* Icon Container */}
              <div className="p-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-blue-200/50 transition-all duration-300"
                   style={{
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(16, 6, 159, 0.05))',
                     boxShadow: `0 8px 32px rgba(16, 6, 159, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)`
                   }}>
                <Icon size={28} style={{ color: '#10069f' }} />
              </div>
              
              {/* Floating Text */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  y: [10, 0, -5, -10],
                  scale: [0.8, 1, 1.1, 0.9]
                }}
                transition={{
                  duration: 4,
                  delay: delay + 1,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                <span className="text-sm font-mono px-2 py-1 rounded-md text-white"
                      style={{ 
                        background: 'linear-gradient(135deg, #10069f, #455cff)',
                        boxShadow: '0 4px 12px rgba(16, 6, 159, 0.3)'
                      }}>
                  {text}
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Floating Code Fragments */}
        {codeFragments.map(({ code, position, delay }, index) => (
          <motion.div
            key={`code-${index}`}
            className={`absolute ${position} hidden xl:block`}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              rotateX: 90,
              z: -200
            }}
            animate={{ 
              opacity: [0, 0.7, 0.7, 0.3, 0.7],
              scale: [0.5, 1, 1.1, 0.9, 1],
              rotateX: [90, 0, 10, -5, 0],
              z: [-200, -100, -150, -120, -100],
              y: [0, -20, 10, -15, 0]
            }}
            transition={{
              duration: 10,
              delay: delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="px-4 py-2 rounded-lg backdrop-blur-md border border-blue-200/30"
                 style={{
                   background: 'rgba(255, 255, 255, 0.8)',
                   boxShadow: '0 8px 25px rgba(16, 6, 159, 0.15)'
                 }}>
              <code className="text-sm font-mono" style={{ color: '#10069f' }}>
                {code}
              </code>
            </div>
          </motion.div>
        ))}

        {/* Animated Grid Lines - DISABLED for debugging */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 6, 159, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 6, 159, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 rounded-full font-medium mb-8 animate-subtle-glow"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.1), rgba(69, 92, 255, 0.1))',
              border: '1px solid rgba(16, 6, 159, 0.2)',
              color: '#10069f'
            }}
          >
            <span className="w-2 h-2 rounded-full mr-3 animate-pulse" style={{ background: '#455cff' }}></span>
            Soluciones Web Profesionales
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight cursor-pointer"
            style={{ color: '#000000' }}
            whileHover={{ 
              scale: 1.02, 
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            onMouseEnter={() => {
              document.body.style.cursor = 'grab';
            }}
            onMouseLeave={() => {
              document.body.style.cursor = 'auto';
            }}
          >
            <strong>Desarrollo Web Profesional</strong> y{' '}
            <span className="gradient-text-modern animate-gradient-shift">Hosting Optimizado</span>
            <br />
            para tu <em>negocio digital</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#5d5d5d' }}
          >
            🏆 <strong>Especialistas en desarrollo web con React y Next.js</strong>. Creamos sitios web profesionales, hosting de alta velocidad y soluciones SEO que impulsan tu presencia digital en México y Latinoamérica.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -5, 
                rotateX: 8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                const btn = e.target as HTMLElement;
                btn.style.boxShadow = '0 12px 40px rgba(16, 6, 159, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                btn.style.background = 'linear-gradient(135deg, #0d0580 0%, #3d4ecc 100%)';
              }}
              onMouseLeave={(e) => {
                const btn = e.target as HTMLElement;
                btn.style.boxShadow = '0 8px 32px rgba(16, 6, 159, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                btn.style.background = 'linear-gradient(135deg, #10069f 0%, #455cff 100%)';
              }}
              className="group glass-card text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 animate-subtle-glow hover:animate-gradient-shift cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
                boxShadow: '0 8px 32px rgba(16, 6, 159, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              Iniciar Proyecto
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -5, 
                rotateX: 8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                const btn = e.target as HTMLElement;
                btn.style.background = 'rgba(16, 6, 159, 0.1)';
                btn.style.borderColor = '#0d0580';
                btn.style.boxShadow = '0 8px 25px rgba(16, 6, 159, 0.2)';
              }}
              onMouseLeave={(e) => {
                const btn = e.target as HTMLElement;
                btn.style.background = 'rgba(255, 255, 255, 0.8)';
                btn.style.borderColor = '#10069f';
                btn.style.boxShadow = '';
              }}
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 cursor-pointer"
              style={{
                border: '2px solid #10069f',
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#10069f',
                backdropFilter: 'blur(10px)'
              }}
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Ver Portafolio
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '100+', label: 'Proyectos Completados' },
              { number: '99.9%', label: 'Uptime Garantizado' },
              { number: '24/7', label: 'Soporte Técnico' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-6 rounded-2xl animate-float"
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ 
                  animationDelay: `${index * 0.5}s`,
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(16, 6, 159, 0.1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)'
                }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text-modern mb-2">{stat.number}</div>
                <div className="font-medium" style={{ color: '#5d5d5d' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full flex justify-center"
          style={{
            border: '2px solid rgba(69, 92, 255, 0.5)'
          }}
        >
          <div className="w-1 h-3 rounded-full mt-2" style={{ background: '#455cff' }}></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
