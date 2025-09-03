import { HeroParallaxDemo } from "@/components/hero-parallax-demo";
import { EnhancedHeader } from "@/components/enhanced-header";
import { ServicesBento } from "@/components/services-bento";
import { SierraTestimonials } from "@/components/sierra-testimonials";
import { PortfolioDemo } from "@/components/portfolio-demo";
import MinimalContact from "@/components/minimal-contact";
import { AboutUs } from "@/components/about-us";
import Footer from "@/components/footer";

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
      
      {/* Nosotros Section with ContainerScroll */}
      <section id="nosotros">
        <AboutUs />
      </section>
      
      {/* Contact Section - Minimal Design */}
      <MinimalContact />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
