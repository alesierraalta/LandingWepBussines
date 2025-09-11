"use client";

import { ApproachColumn } from "@/components/ui/approach-columns";
import { motion } from "motion/react";

const approachItems = [
  {
    icon: "💼",
    title: "ROI Maximizado",
    description: "Diseñamos soluciones que generan retorno de inversión medible desde el primer mes de lanzamiento."
  },
  {
    icon: "🎨",
    title: "Diseño Premium",
    description: "Interfaces elegantes y profesionales que reflejan la calidad de tu marca y generan confianza instantánea."
  },
  {
    icon: "📊",
    title: "Ventaja Competitiva",
    description: "Te posicionamos por encima de tu competencia con tecnología avanzada y estrategias de conversión probadas."
  },
  {
    icon: "⚡",
    title: "Lanzamiento Rápido",
    description: "Metodología ágil que reduce el time-to-market y te permite capturar oportunidades antes que otros."
  },
  {
    icon: "🚀",
    title: "Escalabilidad Empresarial",
    description: "Arquitectura robusta que soporta el crecimiento exponencial de tu negocio sin limitaciones técnicas."
  },
  {
    icon: "💰",
    title: "Conversión Optimizada",
    description: "Cada elemento está diseñado para convertir visitantes en clientes y maximizar tus ingresos online."
  },
  {
    icon: "🎯",
    title: "Estrategia CEO-Focused",
    description: "Enfoque ejecutivo que alinea la tecnología con tus objetivos de negocio y KPIs estratégicos."
  },
  {
    icon: "📈",
    title: "Crecimiento Sostenible",
    description: "Soluciones que escalan con tu empresa, reduciendo costos operativos y aumentando la eficiencia."
  }
];

const firstColumn = approachItems.slice(0, 3);
const secondColumn = approachItems.slice(3, 6);
const thirdColumn = approachItems.slice(6, 8);

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

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6"
            style={{ 
              color: '#000000',
              textShadow: '2px 2px 4px rgba(16, 6, 159, 0.1)'
            }}
          >
            Por Qué Elegirnos
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
            style={{ color: '#10069f' }}
          >
            Combinamos diseño excepcional con desarrollo técnico avanzado para crear soluciones que impulsan tu negocio. 
            <span className="font-bold"> Cada proyecto diseñado para maximizar tu crecimiento.</span>
          </p>
        </motion.div>
        
        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <ApproachColumn items={firstColumn} duration={15} />
          <ApproachColumn 
            items={secondColumn} 
            className="hidden md:block" 
            duration={19} 
          />
          <ApproachColumn 
            items={thirdColumn} 
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
            ¿Listo para transformar tu idea en realidad?
          </p>
          <a 
            href="https://wa.me/582411234567?text=Hola%2C%20me%20interesa%20trabajar%20con%20ustedes%20en%20mi%20proyecto.%20¿Podemos%20hablar%20sobre%20cómo%20pueden%20ayudarme%3F"
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
Empezar Mi Proyecto
          </a>
        </motion.div>
      </div>
    </section>
  );
};

