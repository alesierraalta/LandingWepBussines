'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on links
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Portafolio', href: '#portafolio' },
    { name: 'Testimonios', href: '#testimonios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'glass-card shadow-2xl border-b border-gray-200' 
            : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 2
              }}
              whileTap={{ scale: 0.95 }}
              className="text-xl sm:text-2xl font-bold cursor-pointer"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <span className="gradient-text-modern">WebHost</span>
              <span className="text-gray-900 ml-1">Pro</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    y: -2,
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-900 hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                </motion.a>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden lg:flex">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(16, 6, 159, 0.4), 0 0 60px rgba(69, 92, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-secondary transition-all duration-300 animate-subtle-glow shadow-lg hover:shadow-2xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                Cotizar Proyecto
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-lg text-gray-900 hover:text-primary hover:bg-gray-100 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              className="absolute top-0 right-0 h-full w-80 max-w-[85vw] glass-card border-l border-gray-200"
            >
              {/* Mobile Menu Header */}
                              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="text-xl font-bold">
                  <span className="gradient-text-modern">WebHost</span>
                  <span className="text-gray-900">Pro</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg text-gray-900 hover:text-primary hover:bg-gray-100 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col p-6 space-y-2">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ 
                      x: 8,
                      backgroundColor: "rgba(0, 0, 0, 0.05)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-900 hover:text-primary transition-all duration-300 font-medium py-3 px-4 rounded-lg block"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile CTA Button */}
                <motion.button
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: navigation.length * 0.1,
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(16, 6, 159, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white px-6 py-4 rounded-xl font-medium hover:bg-secondary transition-all duration-300 mt-6 w-full shadow-lg animate-subtle-glow"
                  onClick={handleLinkClick}
                >
                  Cotizar Proyecto
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
