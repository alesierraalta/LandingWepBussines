"use client";
import {
  DesktopIcon,
  MobileIcon,
  GlobeIcon,
  RocketIcon,
  LightningBoltIcon,
  FileTextIcon,
  BellIcon,
  Share1Icon,
  CalendarIcon,
  SpeakerLoudIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Image from "next/image";

const features = [
  {
      Icon: FileTextIcon,
      name: "Empresas con Landing Pages",
      description: "Empresas que usan landing pages generan 12 veces más leads que aquellas con 5 páginas o menos.",
      href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20información%20sobre%20landing%20pages%20para%20empresas",
      cta: "Crear Landing Pages",
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
      Icon: BellIcon,
      name: "Ventaja Competitiva Real",
      description: "Solo 52% de empresas usan landing pages para generar leads, creando oportunidad para destacar.",
      href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20aprovechar%20la%20ventaja%20de%20landing%20pages",
      cta: "Obtener Ventaja",
    background: (
        <div className="absolute inset-0 opacity-60 overflow-hidden">
         <div className="relative w-full h-full">
           <Image
             src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&crop=center"
             alt="Handshake profesional cerrando negocios"
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
      Icon: Share1Icon,
      name: "Conversión vs Páginas Genéricas",
      description: "Landing pages optimizadas convierten 220% mejor que páginas web genéricas de empresas.",
      href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20mejorar%20conversión%20vs%20competencia",
      cta: "Superar Competencia",
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
      Icon: CalendarIcon,
      name: "Escalabilidad Empresarial",
      description: "Empresas con 31-40 landing pages obtienen 7 veces más leads que empresas sin estrategia.",
      href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20escalar%20mi%20empresa%20con%20landing%20pages",
      cta: "Escalar Negocio",
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
      Icon: SpeakerLoudIcon,
      name: "Optimización Empresarial B2B",
      description: "68% de empresas B2B usan landing pages para leads, mientras otras pierden oportunidades.",
      href: "https://wa.me/582411234567?text=Hola%2C%20quiero%20optimización%20empresarial%20B2B",
      cta: "Optimizar B2B",
    background: (
        <div className="absolute inset-0 opacity-60 overflow-hidden">
         <div className="relative w-full h-full">
           <Image
             src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&crop=center"
             alt="Equipo celebrando éxito del proyecto"
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
Ventaja Competitiva Empresarial
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium service-subtitle">
Mientras 48% de empresas no tienen landing pages optimizadas, nosotros creamos estrategias que generan resultados medibles. Esto es lo que marca la diferencia:
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
