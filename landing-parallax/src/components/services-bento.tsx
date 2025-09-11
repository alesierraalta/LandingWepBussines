"use client";
import {
  DesktopIcon,
  MobileIcon,
  GlobeIcon,
  RocketIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Image from "next/image";

const features = [
  {
    Icon: DesktopIcon,
    name: "Presencia Digital Sólida",
    description: "Construimos tu presencia online para generar $5,000+ mensuales en nuevos clientes.",
    href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20información%20sobre%20sitios%20web%20que%20generen%20$5000%20mensuales",
    cta: "Generar $5,000/mes",
    background: (
        <div className="absolute inset-0 opacity-60 overflow-hidden">
         <div className="relative w-full h-full">
           <Image
             src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&crop=center"
             alt="Edificios corporativos modernos que dominan el sector"
             fill
             className="object-cover"
             style={{
               objectFit: 'cover',
               objectPosition: 'center'
             }}
             priority={false}
             unoptimized
           />
         </div>
        </div>
      ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: MobileIcon,
    name: "Ventas Automáticas 24/7",
    description: "Sistema que convierte visitantes en clientes, generando $2,000-$8,000 mensuales adicionales.",
    href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20información%20sobre%20sistema%20de%20ventas%20automáticas%2024/7",
    cta: "Automatizar ventas",
    background: (
        <div className="absolute inset-0 opacity-60 overflow-hidden">
         <div className="relative w-full h-full">
           <Image
             src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&crop=center"
             alt="Handshake profesional cerrando negocios 24/7"
             fill
             className="object-cover"
             style={{
               objectFit: 'cover',
               objectPosition: 'center'
             }}
             priority={false}
             unoptimized
           />
         </div>
        </div>
      ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Más Visibilidad Online",
    description: "Mejoramos tu posicionamiento para aumentar tus ingresos en $3,000-$10,000 mensuales.",
    href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20información%20sobre%20SEO%20para%20aumentar%20mis%20ingresos",
    cta: "Aumentar ingresos",
    background: (
        <div className="absolute inset-0 opacity-60 overflow-hidden">
         <div className="relative w-full h-full">
           <Image
             src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center"
             alt="Gráficos de crecimiento y éxito en Google"
             fill
             className="object-cover"
             style={{
               objectFit: 'cover',
               objectPosition: 'center'
             }}
             priority={false}
             unoptimized
           />
         </div>
        </div>
      ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: LightningBoltIcon,
    name: "Optimización de Conversión",
    description: "Sitios optimizados que convierten 40% más visitantes en clientes pagando.",
    href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20información%20sobre%20optimización%20de%20conversión",
    cta: "Convertir más clientes",
    background: (
        <div className="absolute inset-0 opacity-60 overflow-hidden">
         <div className="relative w-full h-full">
           <Image
             src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center"
             alt="Equipo trabajando eficientemente con tecnología moderna"
             fill
             className="object-cover"
             style={{
               objectFit: 'cover',
               objectPosition: 'center'
             }}
             priority={false}
             unoptimized
           />
         </div>
        </div>
      ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: RocketIcon,
    name: "ROI Comprobado",
    description: "Nuestros clientes recuperan su inversión en 60-90 días y generan $15,000+ anuales.",
    href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20información%20sobre%20ROI%20y%20resultados%20comprobados",
    cta: "Ver resultados",
    background: (
        <div className="absolute inset-0 opacity-60 overflow-hidden">
         <div className="relative w-full h-full">
           <Image
             src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&crop=center"
             alt="Equipo celebrando éxito garantizado"
             fill
             className="object-cover"
             style={{
               objectFit: 'cover',
               objectPosition: 'center'
             }}
             priority={false}
             unoptimized
           />
         </div>
        </div>
      ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function ServicesBento() {
  return (
    <section className="relative py-20 px-4 bg-white z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 service-title">
Por Qué Nuestros Clientes Facturan 3X Más
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium service-subtitle">
No es casualidad. Usamos estrategias comprobadas que convierten visitantes en clientes pagantes. Esto es lo que hace la diferencia:
          </p>
        </div>
        
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
