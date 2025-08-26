'use client';

import { motion } from 'framer-motion';
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

const ServicesSection = () => {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
            Nuestros <span className="gradient-text-modern animate-gradient-shift">Servicios</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#5d5d5d' }}>
            Ofrecemos soluciones integrales para tu presencia digital, desde el diseño inicial 
            hasta el hosting y mantenimiento continuo.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.03, rotateY: 5 }}
              className="group rounded-2xl p-8 transition-all duration-500 animate-float"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(16, 6, 159, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)'
              }}
            >
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
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                   style={{
                     background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.05), rgba(69, 92, 255, 0.05))'
                   }}></div>
            </motion.div>
          ))}
        </motion.div>

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
