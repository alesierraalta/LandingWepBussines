"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
// import { MobileHero } from "@/components/mobile-hero";

export function HeroParallaxDemo() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Desktop Hero - Hidden on Mobile */}
      <div className="hidden md:block absolute top-0 left-0 w-full z-0">
        <HeroParallax products={products} />
      </div>
      
      {/* Mobile Hero - Simplified for Mobile */}
      <div className="md:hidden min-h-screen flex flex-col justify-center items-center px-6 py-24">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-black leading-tight hero-title mb-6">
            ¿Tu competencia ya está <br />
            <span className="text-5xl">ganando clientes online?</span>
          </h1>
          <p className="text-lg font-medium hero-subtitle mb-8 leading-relaxed">
            Cada día que pasa sin una presencia web profesional, pierdes clientes que van directo a tu competencia.
          </p>
          <button 
            className="w-full font-bold text-white px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#10069f',
              borderColor: '#455cff',
              borderWidth: '2px',
              boxShadow: '0 8px 30px rgba(16, 6, 159, 0.4)',
              minHeight: '60px'
            }}
          >
            🚀 Dominar Mi Sector Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export const products = [
  {
    title: "RestaurantePremium",
    link: "#proyecto1",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "TiendaModerna",
    link: "#proyecto2",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "InmobiliariaElite",
    link: "#proyecto3",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "ClinicaDental",
    link: "#proyecto4",
    thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "GimnasioFit",
    link: "#proyecto5",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "AbogadosAsociados",
    link: "#proyecto6",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "AgenciaViajes",
    link: "#proyecto7",
    thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "EscuelaTech",
    link: "#proyecto8",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "ConstructoraAlpha",
    link: "#proyecto9",
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "SalonBelleza",
    link: "#proyecto10",
    thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "ConsultoraNegocios",
    link: "#proyecto11",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "EventosLujo",
    link: "#proyecto12",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "VeterinariaCare",
    link: "#proyecto13",
    thumbnail: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "StartupTech",
    link: "#proyecto14",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "FloristeriaBella",
    link: "#proyecto15",
    thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop&crop=center",
  },
];
