'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface MobileBreadcrumbProps {
  className?: string;
}

const MobileBreadcrumb = ({ className = '' }: MobileBreadcrumbProps) => {
  const pathname = usePathname();

  // Mapeo de rutas a etiquetas legibles
  const routeLabels: Record<string, string> = {
    '/': 'Inicio',
    '/servicios': 'Servicios',
    '/portafolio': 'Portafolio',
    '/testimonios': 'Testimonios',
    '/contacto': 'Contacto',
    '/blog': 'Blog',
    '/sobre-nosotros': 'Sobre Nosotros',
    '/precios': 'Precios'
  };

  // Obtener la página actual y la anterior
  const getCurrentPage = () => {
    if (pathname === '/') return null;
    
    const segments = pathname.split('/').filter(segment => segment !== '');
    const currentSegment = segments[segments.length - 1];
    const parentPath = segments.length > 1 ? `/${segments.slice(0, -1).join('/')}` : '/';
    
    return {
      current: routeLabels[pathname] || currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1),
      parentPath,
      parentLabel: routeLabels[parentPath] || 'Inicio'
    };
  };

  const pageInfo = getCurrentPage();

  // No mostrar si estamos en la página de inicio
  if (!pageInfo) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`lg:hidden bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-2 ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* Botón de regreso */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={pageInfo.parentPath}
            className="flex items-center text-gray-600 hover:text-primary transition-colors duration-200"
            aria-label={`Volver a ${pageInfo.parentLabel}`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{pageInfo.parentLabel}</span>
          </Link>
        </motion.div>

        {/* Página actual */}
        <div className="flex items-center text-gray-900">
          <span className="text-sm font-semibold">{pageInfo.current}</span>
        </div>

        {/* Icono de inicio (enlace rápido) */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href="/"
            className="p-1 text-gray-500 hover:text-primary transition-colors duration-200"
            aria-label="Ir al inicio"
          >
            <Home className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Indicador de progreso visual */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-0.5 bg-gradient-to-r from-primary to-secondary mt-2 rounded-full origin-left"
      />
    </motion.div>
  );
};

export default MobileBreadcrumb;