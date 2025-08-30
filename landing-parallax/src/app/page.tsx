import { HeroParallaxDemo } from "@/components/hero-parallax-demo";
import { EnhancedHeader } from "@/components/enhanced-header";
import { ServicesBento } from "@/components/services-bento";
import { SierraTestimonials } from "@/components/sierra-testimonials";
import { PortfolioDemo } from "@/components/portfolio-demo";
import WhatsAppContactForm from "@/components/whatsapp-contact-form";

export default function Home() {
  return (
    <div className="w-full">
      <EnhancedHeader />
      
      <section id="inicio">
        <HeroParallaxDemo />
      </section>
      
      <section id="servicios">
        <ServicesBento />
      </section>
      
      <section id="portafolio">
        <PortfolioDemo />
      </section>
      
      <section id="testimonios">
        <SierraTestimonials />
      </section>
      
      {/* Nosotros Section Placeholder */}
      <section id="nosotros" className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#10069f' }}>Sobre SierraX</h2>
          <p className="text-xl text-gray-700 mb-8">
            Somos especialistas en transformar negocios a través del poder digital. Con más de 5 años de experiencia, 
            hemos ayudado a empresas de todos los tamaños a dominar sus sectores mediante estrategias web que realmente funcionan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Proyectos Exitosos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Soporte Técnico</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section with WhatsApp Integration */}
      <WhatsAppContactForm />
    </div>
  );
}
