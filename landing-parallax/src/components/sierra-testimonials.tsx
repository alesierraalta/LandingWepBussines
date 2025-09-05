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
          <a 
            href="https://wa.me/582411234567?text=Hola%2C%20vi%20los%20testimonios%20de%20sus%20clientes%20y%20quiero%20ser%20el%20siguiente%20caso%20de%20éxito.%20¿Podemos%20hablar%20sobre%20mi%20proyecto%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
              boxShadow: '0 8px 25px rgba(16, 6, 159, 0.4)'
            }}
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            🚀 Únete a Nuestros Clientes Exitosos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

