'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      position: 'CEO, TechStartup',
      company: 'TechStartup Inc.',
      content: 'Increíble trabajo. Nuestro sitio web no solo se ve profesional, sino que también ha mejorado significativamente nuestras conversiones. El equipo fue muy profesional y cumplió todos los plazos.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      position: 'Fundador',
      company: 'E-Commerce Plus',
      content: 'El hosting es súper rápido y confiable. Desde que migramos, nuestro sitio carga en menos de 2 segundos. El soporte técnico es excepcional, siempre responden rápidamente.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      position: 'Marketing Director',
      company: 'Digital Agency',
      content: 'La optimización SEO que hicieron fue impresionante. En 3 meses aumentamos nuestro tráfico orgánico en un 150%. Recomiendo totalmente sus servicios.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 4,
      name: 'Jorge López',
      position: 'Propietario',
      company: 'Restaurante Gourmet',
      content: 'Desarrollaron nuestra app móvil y sitio web. La experiencia de usuario es fantástica y hemos visto un aumento del 40% en pedidos online. Muy satisfecho con el resultado.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 5,
      name: 'Laura Sánchez',
      position: 'CTO',
      company: 'FinTech Solutions',
      content: 'Su experiencia en desarrollo web es evidente. Crearon una plataforma compleja con excelente rendimiento. El código es limpio y bien documentado.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 6,
      name: 'Roberto García',
      position: 'Director General',
      company: 'Consultoría Pro',
      content: 'El diseño UI/UX superó nuestras expectativas. Nuestros clientes constantemente elogian la facilidad de uso de nuestro sitio. Excelente trabajo en equipo.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
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

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            style={{
              color: index < rating ? '#fbbf24' : '#d1d5db'
            }}
            fill={index < rating ? '#fbbf24' : 'none'}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonios" className="py-20 gradient-mesh floating-particles">
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
            Lo que dicen nuestros <span className="gradient-text-modern animate-gradient-shift">clientes</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#5d5d5d' }}>
            La satisfacción de nuestros clientes es nuestra prioridad. Lee lo que opinan sobre 
            nuestros servicios y resultados obtenidos.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="rounded-2xl p-8 transition-all duration-300 relative"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(16, 6, 159, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)'
              }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ background: 'linear-gradient(135deg, #10069f, #455cff)' }}>
                  <Quote size={16} style={{ color: '#ffffff' }} />
                </div>
              </div>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Content */}
              <p className="mb-6 leading-relaxed italic" style={{ color: '#5d5d5d' }}>
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                     style={{ 
                       background: 'linear-gradient(135deg, #10069f, #455cff)',
                       color: '#ffffff'
                     }}>
                  {testimonial.name.charAt(0)}
                </div>
                
                {/* Info */}
                <div>
                  <h4 className="font-semibold" style={{ color: '#000000' }}>{testimonial.name}</h4>
                  <p className="text-sm" style={{ color: '#5d5d5d' }}>{testimonial.position}</p>
                  <p className="text-sm font-medium" style={{ color: '#10069f' }}>{testimonial.company}</p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full -z-10"
                   style={{
                     background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.05), rgba(69, 92, 255, 0.05))'
                   }}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl p-8"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(16, 6, 159, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '98%', label: 'Satisfacción del Cliente' },
              { number: '150+', label: 'Proyectos Completados' },
              { number: '4.9/5', label: 'Rating Promedio' },
              { number: '24h', label: 'Tiempo de Respuesta' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text-modern">
                  {stat.number}
                </div>
                <div className="font-medium" style={{ color: '#5d5d5d' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
            ¿Listo para ser nuestro próximo caso de éxito?
          </h3>
          <p className="mb-6" style={{ color: '#5d5d5d' }}>
            Únete a más de 150 empresas que confían en nosotros
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200 animate-subtle-glow"
            style={{
              background: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
              boxShadow: '0 8px 32px rgba(16, 6, 159, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            Empezar mi Proyecto
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
