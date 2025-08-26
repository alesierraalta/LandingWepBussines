'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  className?: string;
  showHome?: boolean;
  customItems?: BreadcrumbItem[];
}

const Breadcrumb = ({ 
  className = '', 
  showHome = true, 
  customItems 
}: BreadcrumbProps) => {
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

  // Generar breadcrumbs automáticamente desde la URL
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];

    // Agregar inicio si está habilitado
    if (showHome) {
      breadcrumbs.push({
        label: 'Inicio',
        href: '/',
        isActive: pathname === '/'
      });
    }

    // Construir breadcrumbs desde los segmentos de la URL
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // No mostrar breadcrumbs si solo hay un elemento (inicio)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: 'easeOut' 
              }}
              className="flex items-center"
            >
              {/* Separador */}
              {index > 0 && (
                <ChevronRight 
                  className="w-4 h-4 text-gray-400 mx-1" 
                  aria-hidden="true"
                />
              )}
              
              {/* Elemento del breadcrumb */}
              {isLast ? (
                <span 
                  className="text-gray-900 font-medium flex items-center"
                  aria-current="page"
                >
                  {index === 0 && showHome && (
                    <Home className="w-4 h-4 mr-1" aria-hidden="true" />
                  )}
                  {item.label}
                </span>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center group"
                    aria-label={`Ir a ${item.label}`}
                  >
                    {index === 0 && showHome && (
                      <Home 
                        className="w-4 h-4 mr-1 group-hover:text-primary transition-colors" 
                        aria-hidden="true" 
                      />
                    )}
                    <span className="hover:underline">{item.label}</span>
                  </Link>
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb;

// Hook personalizado para usar breadcrumbs en cualquier componente
export const useBreadcrumb = () => {
  const pathname = usePathname();
  
  const updateBreadcrumb = (customItems: BreadcrumbItem[]) => {
    // Esta función puede ser extendida para manejar estado global
    // si se necesita sincronización entre componentes
    return customItems;
  };

  return {
    pathname,
    updateBreadcrumb
  };
};

// Tipos exportados para uso en otros componentes
export type { BreadcrumbItem, BreadcrumbProps };