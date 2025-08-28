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
    name: "Sitios Que Dominan Tu Sector",
    description: "Páginas web que posicionan tu negocio como el líder indiscutible. Tus competidores quedarán atrás mientras tú captures todos los clientes de tu industria.",
    href: "#corporativos",
    cta: "Dominar mi sector",
    background: (
      <div className="absolute -right-20 -top-20 w-[600px] h-[400px] opacity-60 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
          alt="Sitios web corporativos"
          width={600}
          height={400}
          className="object-cover w-full h-full"
          priority={false}
          unoptimized
        />
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: MobileIcon,
    name: "Captura Clientes 24/7",
    description: "Tu página vende mientras duermes. Diseño que convierte en cualquier dispositivo, cualquier hora, cualquier lugar. No pierdas ni un cliente más.",
    href: "#responsive",
    cta: "Vender mientras duermo",
    background: (
      <div className="absolute -right-20 -top-20 w-[600px] h-[400px] opacity-60 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center"
          alt="Diseño responsive"
          width={600}
          height={400}
          className="object-cover w-full h-full"
          priority={false}
          unoptimized
        />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Ser el #1 en Google",
    description: "Imagínate aparecer primero cuando buscan tu servicio. Tus clientes te encuentran antes que a la competencia. Más tráfico = más ventas = más dinero.",
    href: "#seo",
    cta: "Ser #1 en Google",
    background: (
      <div className="absolute -right-20 -top-20 w-[600px] h-[400px] opacity-60 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"
          alt="SEO optimizado"
          width={600}
          height={400}
          className="object-cover w-full h-full"
          priority={false}
          unoptimized
        />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: LightningBoltIcon,
    name: "Nunca Más Clientes Impacientes",
    description: "3 segundos pueden costarte miles de pesos. Sitios ultra-rápidos que mantienen a tus visitantes enganchados hasta que compren.",
    href: "#velocidad",
    cta: "Evitar perder clientes",
    background: (
      <div className="absolute -right-20 -top-20 w-[600px] h-[400px] opacity-60 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=center"
          alt="Carga ultra rápida"
          width={600}
          height={400}
          className="object-cover w-full h-full"
          priority={false}
          unoptimized
        />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: RocketIcon,
    name: "Éxito Garantizado o Reembolso",
    description: "No te dejamos solo. Te acompañamos hasta que tengas el sitio que genere los resultados prometidos. Si no funciona, te devolvemos tu dinero.",
    href: "#soporte",
    cta: "Ver garantía",
    background: (
      <div className="absolute -right-20 -top-20 w-[600px] h-[400px] opacity-60 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center"
          alt="Lanzamiento y soporte"
          width={600}
          height={400}
          className="object-cover w-full h-full"
          priority={false}
          unoptimized
        />
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
