"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SierraXLogo } from "@/components/sierra-x-logo";

export function EnhancedHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items with their corresponding section IDs
  const navItems = [
    { href: "#inicio", label: "Inicio", id: "inicio" },
    { href: "#servicios", label: "Servicios", id: "servicios" },
    { href: "#portafolio", label: "Portafolio", id: "portafolio" },
    { href: "#nosotros", label: "Nosotros", id: "nosotros" },
    { href: "#contacto", label: "Contacto", id: "contacto" }
  ];

  // Handle scroll events for sticky behavior and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      // Update scroll progress
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrollProgress})`;
      }

      // Find active section based on scroll position
      const sections = ['inicio', 'testimonios', 'servicios', 'portafolio', 'nosotros', 'contacto'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left transition-transform duration-150 ease-out"
        style={{ 
          background: 'linear-gradient(90deg, #10069f 0%, #455cff 50%, #10069f 100%)',
          transform: 'scaleX(0)'
        }}
      />

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-blue-500/10 border-b border-blue-100' 
            : 'bg-black/20 backdrop-blur-sm'
        }`}
      >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Logo */}
              <SierraXLogo isScrolled={isScrolled} size="medium" />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative group ${
                      activeSection === item.id
                        ? 'text-white shadow-lg transform scale-105'
                        : isScrolled 
                          ? 'text-gray-700 hover:text-blue-600'
                          : 'text-white/90 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: activeSection === item.id ? '#10069f' : 'transparent',
                      textShadow: !isScrolled ? '1px 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                    }}
                  >
                    {item.label}
                    
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <div 
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300"
                        style={{ backgroundColor: '#455cff' }}
                      />
                    )}
                    
                    {/* Hover effect */}
                    <div 
                      className="absolute inset-0 rounded-lg bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backdropFilter: 'blur(8px)' }}
                    />
                  </button>
                ))}
              </nav>

              {/* CTA Button and Mobile Menu */}
              <div className="flex items-center space-x-4">
                {/* Enhanced CTA Button */}
                <div className="hidden md:block">
                  <Button
                    className="font-bold text-white px-6 py-3 text-sm hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundColor: '#10069f',
                      borderColor: '#455cff',
                      borderWidth: '2px',
                      boxShadow: '0 4px 20px rgba(16, 6, 159, 0.4)'
                    }}
                  >
                    🚀 Dominar Mi Sector Ahora
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`md:hidden transition-all duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  }`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>
        </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-white/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col justify-center items-center h-full space-y-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`text-2xl font-bold transition-all duration-300 px-6 py-3 rounded-xl ${
                  activeSection === item.id
                    ? 'text-white shadow-lg transform scale-110'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                style={{
                  backgroundColor: activeSection === item.id ? '#10069f' : 'transparent',
                  boxShadow: activeSection === item.id ? '0 8px 25px rgba(16, 6, 159, 0.3)' : 'none'
                }}
              >
                {item.label}
              </button>
            ))}
            
            <div className="mt-8">
              <Button
                className="font-bold text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
                onClick={() => setIsOpen(false)}
                style={{
                  backgroundColor: '#10069f',
                  borderColor: '#455cff',
                  borderWidth: '2px',
                  boxShadow: '0 8px 30px rgba(16, 6, 159, 0.4)'
                }}
              >
                🚀 Dominar Mi Sector
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
