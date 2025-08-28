'use client';

import { motion } from 'framer-motion';
import { Code2, Server } from 'lucide-react';
import { OptimizedSection } from './shared/OptimizedSection';
import { OptimizedCard } from './shared/OptimizedCard';
import { OptimizedButton } from './shared/OptimizedButton';
import { staggerContainer } from '@/lib/animations';

const SimplifiedServicesSection = () => {
  const services = [
    {
      icon: Code2,
      title: 'Desarrollo Web Profesional',
      description: 'Sitios web modernos y responsivos con las últimas tecnologías como React, Next.js y TypeScript. Creamos experiencias digitales que convierten visitantes en clientes.',
      features: [
        'React & Next.js',
        'TypeScript',
        'Responsive Design',
        'PWA',
        'SEO Optimizado',
        'Performance 90+'
      ]
    },
    {
      icon: Server,
      title: 'Hosting Profesional de Alto Rendimiento',
      description: 'Hosting de alta velocidad con CDN global, SSL gratuito y backups automáticos diarios. Infraestructura confiable para tu negocio digital.',
      features: [
        'CDN Global',
        'SSL Gratuito',
        'Backups Diarios',
        '99.9% Uptime',
        'Soporte 24/7',
        'Velocidad Ultrarrápida'
      ]
    }
  ];

  return (
    <OptimizedSection 
      id="servicios"
      headerTitle="Nuestros Servicios Principales"
      headerSubtitle="Ofrecemos las soluciones esenciales para tu presencia digital: desarrollo web profesional y hosting optimizado."
      gradientWord="Servicios"
    >
      {/* Services Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        variants={staggerContainer}
      >
        {services.map((service, index) => (
          <OptimizedCard
            key={index}
            className="p-8 text-center lg:text-left hover:shadow-2xl transition-all duration-300"
            disableAnimations={false}
            disableHover={false}
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                     style={{
                       background: 'linear-gradient(135deg, #10069f, #455cff)',
                     }}>
                  <service.icon size={32} className="text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
                  {service.title}
                </h3>
                <p className="mb-6 text-lg leading-relaxed" style={{ color: '#5d5d5d' }}>
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" 
                           style={{ background: '#455cff' }}>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#5d5d5d' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <OptimizedButton>
                  {index === 0 ? 'Solicitar Desarrollo' : 'Ver Planes de Hosting'}
                </OptimizedButton>
              </div>
            </div>
          </OptimizedCard>
        ))}
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        variants={staggerContainer}
        className="mt-20 max-w-4xl mx-auto"
      >
        <OptimizedCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '100+', label: 'Proyectos Completados' },
              { number: '99.9%', label: 'Uptime Garantizado' },
              { number: '24/7', label: 'Soporte Técnico' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-3 gradient-text-modern">
                  {stat.number}
                </div>
                <div className="text-lg font-medium" style={{ color: '#5d5d5d' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </OptimizedCard>
      </motion.div>

      {/* CTA Section */}
      <OptimizedCard className="text-center mt-16 p-8">
        <h3 className="text-3xl font-bold mb-4" style={{ color: '#000000' }}>
          ¿Listo para impulsar tu negocio digital?
        </h3>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#5d5d5d' }}>
          Únete a más de 100 empresas que confían en nosotros para su presencia digital
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <OptimizedButton size="lg">
            Iniciar Proyecto
          </OptimizedButton>
          <OptimizedButton variant="secondary" size="lg">
            Ver Portafolio
          </OptimizedButton>
        </div>
      </OptimizedCard>
    </OptimizedSection>
  );
};

export default SimplifiedServicesSection;
