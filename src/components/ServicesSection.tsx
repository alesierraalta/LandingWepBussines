'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Code2, 
  Smartphone, 
  Server, 
  Shield, 
  Zap, 
  Palette,
  Search,
  Headphones
} from 'lucide-react';
import { ScrollTrigger, ParallaxText } from './ScrollTrigger';
import SplineServices3D from './SplineServices3D';

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Code2,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos y responsivos con las últimas tecnologías como React, Next.js y TypeScript.',
      features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'PWA']
    },
    {
      icon: Smartphone,
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas y híbridas para iOS y Android con rendimiento óptimo y UX excepcional.',
      features: ['React Native', 'Flutter', 'iOS & Android', 'App Store']
    },
    {
      icon: Server,
      title: 'Hosting Optimizado',
      description: 'Hosting de alta velocidad con CDN global, SSL gratuito y backups automáticos diarios.',
      features: ['CDN Global', 'SSL Gratuito', 'Backups Diarios', '99.9% Uptime']
    },
    {
      icon: Shield,
      title: 'Seguridad Web',
      description: 'Protección avanzada contra amenazas con firewall, monitoreo 24/7 y certificados SSL.',
      features: ['Firewall WAF', 'Monitoreo 24/7', 'SSL Premium', 'Malware Scan']
    },
    {
      icon: Zap,
      title: 'Optimización',
      description: 'Mejoramos la velocidad y rendimiento de tu sitio para mejor experiencia de usuario.',
      features: ['Core Web Vitals', 'Lighthouse 90+', 'Compresión', 'Caching']
    },
    {
      icon: Palette,
      title: 'Diseño UI/UX',
      description: 'Diseños atractivos y funcionales que convierten visitantes en clientes satisfechos.',
      features: ['Figma Design', 'Prototipado', 'User Testing', 'Wireframes']
    },
    {
      icon: Search,
      title: 'SEO Avanzado',
      description: 'Optimización completa para buscadores con estrategias que aumentan tu visibilidad online.',
      features: ['SEO Técnico', 'Content Strategy', 'Link Building', 'Analytics']
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Atención personalizada las 24 horas con tiempo de respuesta menor a 2 horas.',
      features: ['Chat en Vivo', 'Soporte Email', 'Llamadas', 'Tickets']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="servicios" className="py-20 gradient-mesh floating-particles">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollTrigger animationType="slide" className="text-center mb-16">
          <ParallaxText speed={-0.2}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6" style={{ color: '#000000' }}>
              Nuestros <span className="gradient-text-modern animate-gradient-shift">Servicios</span>
            </h2>
          </ParallaxText>
          <motion.p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: '#5d5d5d' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Ofrecemos soluciones integrales para tu presencia digital, desde el diseño inicial 
            hasta el hosting y mantenimiento continuo.
          </motion.p>
        </ScrollTrigger>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollTrigger 
              key={index}
              animationType="stagger"
              delay={index * 0.1}
            >
              <motion.div 
                className="group rounded-2xl p-8 transition-all duration-500 cursor-pointer relative overflow-hidden"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(16, 6, 159, 0.1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)'
                }}
                whileHover={{
                  boxShadow: '0 12px 40px rgba(16, 6, 159, 0.15)',
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
              >
              {/* 3D Background Effect */}
              <SplineServices3D 
                serviceIndex={index}
                isHovered={hoveredService === index}
              />
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300"
                     style={{
                       background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.1), rgba(69, 92, 255, 0.1))'
                     }}>
                  <service.icon size={32} style={{ color: '#10069f' }} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 transition-colors duration-300" 
                  style={{ color: '#000000' }}>
                {service.title}
              </h3>
              
              <p className="mb-6 leading-relaxed" style={{ color: '#5d5d5d' }}>
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full mr-3 animate-pulse"
                         style={{ background: 'linear-gradient(90deg, #10069f, #455cff)' }}></div>
                    <span style={{ color: '#5d5d5d' }}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                   style={{
                     background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.08), rgba(69, 92, 255, 0.08))',
                     backdropFilter: 'blur(4px)'
                   }}></div>
              </motion.div>
            </ScrollTrigger>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="rounded-2xl p-8"
               style={{
                 background: 'rgba(255, 255, 255, 0.8)',
                 border: '1px solid rgba(16, 6, 159, 0.2)',
                 backdropFilter: 'blur(10px)',
                 boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)'
               }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
              ¿Necesitas una solución personalizada?
            </h3>
            <p className="mb-6" style={{ color: '#5d5d5d' }}>
              Consultamos contigo para crear la solución perfecta para tu negocio
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 animate-subtle-glow"
              style={{
                background: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
                boxShadow: '0 8px 32px rgba(16, 6, 159, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              Solicitar Consulta Gratuita
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
