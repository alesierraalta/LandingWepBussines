"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "SierraX transformó completamente nuestra presencia online. Nuestro sitio web no solo se ve increíble, sino que genera más clientes cada día.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
    name: "María González",
    role: "CEO, Constructora MGZ",
  },
  {
    text: "La implementación fue rápida y profesional. El diseño responsive funciona perfecto en todos los dispositivos y nuestras ventas aumentaron 300%.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Carlos Ruiz",
    role: "Director, Clínica Dental Elite",
  },
  {
    text: "El equipo de soporte es excepcional. Nos guiaron en cada paso y siguen brindando asistencia continua. Recomendamos SierraX al 100%.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    name: "Ana Martín",
    role: "Fundadora, Estudio AM",
  },
  {
    text: "Nuestro sitio web se integró perfectamente con nuestros sistemas. La interfaz es intuitiva y ha mejorado significativamente la experiencia del cliente.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Roberto Silva",
    role: "CEO, TechSolutions",
  },
  {
    text: "Las funcionalidades robustas y el soporte rápido han transformado completamente nuestro flujo de trabajo digital, haciéndonos mucho más eficientes.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    name: "Lucía Herrera",
    role: "Gerente de Proyectos",
  },
  {
    text: "La implementación superó todas nuestras expectativas. Optimizó nuestros procesos y mejoró significativamente el rendimiento de nuestro negocio.",
    image: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=100&h=100&fit=crop&crop=face",
    name: "Patricia López",
    role: "Analista de Negocios",
  },
  {
    text: "Nuestras funciones empresariales mejoraron con un diseño fácil de usar. Los comentarios de nuestros clientes han sido extremadamente positivos.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    name: "Fernando Castro",
    role: "Director de Marketing",
  },
  {
    text: "Entregaron una solución que superó nuestras expectativas. Entendieron nuestras necesidades perfectamente y mejoraron todas nuestras operaciones.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    name: "Sofía Ramírez",
    role: "Gerente de Ventas",
  },
  {
    text: "Gracias a SierraX, nuestra presencia online y conversiones mejoraron significativamente, impulsando el rendimiento general de nuestro negocio.",
    image: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=100&h=100&fit=crop&crop=face",
    name: "Diego Morales",
    role: "Gerente E-commerce",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const SierraTestimonials = () => {
  return (
    <section className="bg-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #10069f 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="container max-w-7xl mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div 
              className="border-2 py-2 px-6 rounded-full text-sm font-semibold"
              style={{ 
                borderColor: '#10069f',
                color: '#10069f',
                backgroundColor: 'rgba(16, 6, 159, 0.05)'
              }}
            >
              ✨ Testimonios Reales
            </div>
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6"
            style={{ 
              color: '#000000',
              textShadow: '2px 2px 4px rgba(16, 6, 159, 0.1)'
            }}
          >
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
            style={{ color: '#10069f' }}
          >
            Más de 47 empresas ya confiaron en nosotros para dominar sus sectores. 
            <span className="font-bold"> Sus resultados hablan por sí solos.</span>
          </p>
        </motion.div>
        
        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn 
            testimonials={secondColumn} 
            className="hidden md:block" 
            duration={19} 
          />
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            className="hidden lg:block" 
            duration={17} 
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p 
            className="text-lg font-semibold mb-6"
            style={{ color: '#5d5d5d' }}
          >
            ¿Listo para ser el siguiente caso de éxito?
          </p>
          <div 
            className="inline-block px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
              boxShadow: '0 8px 25px rgba(16, 6, 159, 0.4)'
            }}
          >
            🚀 Únete a Nuestros Clientes Exitosos
          </div>
        </motion.div>
      </div>
    </section>
  );
};

