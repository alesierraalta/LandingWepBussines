'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import MobileBreadcrumb from './MobileBreadcrumb';
import { useScrollSpy } from '../hooks/useScrollSpy';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.1)']
  );

  // Track active section for navigation highlighting
  const activeSection = useScrollSpy({
    sections: ['hero', 'services', 'portfolio', 'testimonials', 'contact'],
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0.1
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: 'Inicio', href: '#hero', id: 'hero' },
    { name: 'Servicios', href: '#services', id: 'services' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Testimonios', href: '#testimonials', id: 'testimonials' },
    { name: 'Contacto', href: '#contact', id: 'contact' }
  ];

  const handleLinkClick = (href?: string) => {
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.85)'
            : 'rgba(0, 0, 0, 0.95)',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled 
            ? '1px solid rgba(255, 255, 255, 0.2)' 
            : '1px solid rgba(255, 255, 255, 0.1)'
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ 
          backdropFilter: isScrolled ? "blur(25px) saturate(200%)" : "none",
          transition: { duration: 0.3 }
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-card border-b border-gray-200 shadow-lg backdrop-blur-xl' 
            : 'bg-black shadow-md'
        }`}
        style={{
          opacity,
          scale,
          boxShadow
        }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div 
                className="text-2xl font-bold"
                whileHover={{
                  textShadow: "0 0 20px rgba(16, 6, 159, 0.5)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span 
                  className={isScrolled ? "gradient-text-modern" : "text-white"}
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 500, damping: 30 }
                  }}
                >
                  WebHost
                </motion.span>
                <motion.span 
                  className={isScrolled ? "text-primary" : "text-blue-200"}
                  whileHover={{
                    color: "#10069f",
                    scale: 1.15,
                    rotateZ: -10,
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                >
                  .Pro
                </motion.span>
              </motion.div>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    textShadow: "0 2px 10px rgba(16, 6, 159, 0.3)",
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                  className={`${
                    activeSection === item.id
                      ? isScrolled
                        ? 'text-primary font-bold shadow-lg'
                        : 'text-secondary font-bold shadow-lg'
                      : isScrolled 
                        ? 'text-gray-700 hover:text-primary' 
                        : 'text-white hover:text-secondary'
                  } transition-all duration-300 font-medium relative group cursor-pointer`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                >
                  <motion.span
                    whileHover={{
                      letterSpacing: "0.05em",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.name}
                  </motion.span>
                  <motion.span 
                    className={`absolute -bottom-1 left-0 h-1 ${
                      isScrolled 
                        ? 'bg-gradient-to-r from-primary to-secondary'
                        : 'bg-gradient-to-r from-secondary to-primary'
                    }`}
                    initial={{ width: 0 }}
                    animate={{
                      width: activeSection === item.id ? "100%" : 0,
                      height: activeSection === item.id ? "3px" : "2px",
                      boxShadow: activeSection === item.id 
                        ? isScrolled
                          ? "0 0 15px rgba(16, 6, 159, 0.8)" 
                          : "0 0 20px rgba(69, 92, 255, 0.9)"
                        : "0 0 0px rgba(16, 6, 159, 0)",
                      transition: { duration: 0.4, ease: "easeInOut" }
                    }}
                    whileHover={{
                      width: "100%",
                      boxShadow: isScrolled 
                        ? "0 0 10px rgba(16, 6, 159, 0.6)"
                        : "0 0 15px rgba(69, 92, 255, 0.7)",
                      transition: { duration: 0.3, ease: "easeInOut" }
                    }}
                  />
                </motion.a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.08,
                  rotateX: 5,
                  boxShadow: "0 10px 30px rgba(16, 6, 159, 0.4)",
                  background: "linear-gradient(135deg, #455cff 0%, #10069f 100%)",
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotateX: -2,
                  transition: { duration: 0.1 }
                }}
                onMouseEnter={(e) => {
                  const btn = e.target as HTMLElement;
                  btn.style.setProperty('--glow-intensity', '1');
                }}
                onMouseLeave={(e) => {
                  const btn = e.target as HTMLElement;
                  btn.style.setProperty('--glow-intensity', '0.5');
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg animate-subtle-glow relative overflow-hidden group ${
                  isScrolled
                    ? 'bg-primary text-white hover:bg-secondary'
                    : 'bg-secondary text-white hover:bg-primary font-bold'
                }`}
                onClick={() => handleLinkClick('#contact')}
              >
                <motion.span
                  whileHover={{
                    letterSpacing: "0.05em",
                    transition: { duration: 0.2 }
                  }}
                >
                  Cotizar Proyecto
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: "100%",
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                />
              </motion.button>
            </div>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`lg:hidden relative z-50 p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-white/20 text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {!isMobileMenuOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

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
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="text-xl font-bold">
                    <span className="gradient-text-modern">WebHost</span>
                    <span className="text-primary">.Pro</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="px-6 space-y-4">
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
                        className={`block transition-colors duration-300 font-medium py-3 px-4 rounded-lg group ${
                          activeSection === item.id
                            ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold shadow-md'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.href);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          {item.name}
                          <ChevronDown className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" />
                        </div>
                      </motion.a>
                    ))}
                  </nav>
                </div>

                <div className="p-6 border-t border-gray-200">
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <MobileBreadcrumb />
    </>
  );
};

export default Header;
