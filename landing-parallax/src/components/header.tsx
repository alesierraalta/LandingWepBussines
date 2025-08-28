"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-white/95"
      style={{
        borderBottomColor: '#455cff',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold logo-bg"
            >
              S
            </div>
            <span 
              className="text-xl font-black" 
              style={{ 
                color: '#000000',
                textShadow: '1px 1px 2px rgba(16, 6, 159, 0.2)'
              }}
            >
              SierraX
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#inicio" 
              className="font-semibold transition-colors hover:opacity-80"
              style={{ 
                color: '#000000',
                textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
              }}
            >
              Inicio
            </a>
            <a 
              href="#servicios" 
              className="font-semibold transition-colors hover:opacity-80"
              style={{ 
                color: '#000000',
                textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
              }}
            >
              Servicios
            </a>
            <a 
              href="#portafolio" 
              className="font-semibold transition-colors hover:opacity-80"
              style={{ 
                color: '#000000',
                textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
              }}
            >
              Portafolio
            </a>
            <a 
              href="#nosotros" 
              className="font-semibold transition-colors hover:opacity-80"
              style={{ 
                color: '#000000',
                textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
              }}
            >
              Nosotros
            </a>
            <a 
              href="#contacto" 
              className="font-semibold transition-colors hover:opacity-80"
              style={{ 
                color: '#000000',
                textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
              }}
            >
              Contacto
            </a>
          </nav>

          {/* CTA Button and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button 
              className="hidden md:flex font-bold text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              variant="default"
              style={{
                backgroundColor: '#10069f',
                borderColor: '#455cff',
                borderWidth: '2px',
                boxShadow: '0 4px 14px 0 rgba(16, 6, 159, 0.3)'
              }}
            >
              Quiero Dominar Mi Sector
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100"
              style={{ color: '#10069f' }}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden border-t mt-2 py-4 header-border-top"
          >
            <nav className="flex flex-col space-y-4">
              <a 
                href="#inicio" 
                className="font-semibold transition-colors py-2 hover:opacity-80"
                style={{ 
                  color: '#000000',
                  textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#servicios" 
                className="font-semibold transition-colors py-2 hover:opacity-80"
                style={{ 
                  color: '#000000',
                  textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </a>
              <a 
                href="#portafolio" 
                className="font-semibold transition-colors py-2 hover:opacity-80"
                style={{ 
                  color: '#000000',
                  textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Portafolio
              </a>
              <a 
                href="#nosotros" 
                className="font-semibold transition-colors py-2 hover:opacity-80"
                style={{ 
                  color: '#000000',
                  textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </a>
              <a 
                href="#contacto" 
                className="font-semibold transition-colors py-2 hover:opacity-80"
                style={{ 
                  color: '#000000',
                  textShadow: '0.5px 0.5px 1px rgba(16, 6, 159, 0.1)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              <Button 
                className="font-bold hover:bg-blue-400 hover:text-white mt-4 button-hover"
                variant="outline"
                style={{
                  color: '#10069f',
                  borderColor: '#10069f',
                  backgroundColor: 'transparent',
                  borderWidth: '2px',
                  textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Cotizar Proyecto
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
