// Shared constants and data
export const SERVICES = [
  {
    icon: 'Code2',
    title: 'Desarrollo Web',
    description: 'Sitios web modernos y responsivos con las últimas tecnologías como React, Next.js y TypeScript.',
    features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'PWA']
  },
  {
    icon: 'Smartphone',
    title: 'Aplicaciones Móviles',
    description: 'Apps nativas e híbridas para iOS y Android con rendimiento óptimo y UX excepcional.',
    features: ['React Native', 'Flutter', 'iOS & Android', 'App Store']
  },
  {
    icon: 'Server',
    title: 'Hosting Optimizado',
    description: 'Hosting de alta velocidad con CDN global, SSL gratuito y backups automáticos diarios.',
    features: ['CDN Global', 'SSL Gratuito', 'Backups Diarios', '99.9% Uptime']
  },
  {
    icon: 'Shield',
    title: 'Seguridad Web',
    description: 'Protección avanzada contra amenazas con firewall, monitoreo 24/7 y certificados SSL.',
    features: ['Firewall WAF', 'Monitoreo 24/7', 'SSL Premium', 'Malware Scan']
  },
  {
    icon: 'Zap',
    title: 'Optimización',
    description: 'Mejoramos la velocidad y rendimiento de tu sitio para mejor experiencia de usuario.',
    features: ['Core Web Vitals', 'Lighthouse 90+', 'Compresión', 'Caching']
  },
  {
    icon: 'Palette',
    title: 'Diseño UI/UX',
    description: 'Diseños atractivos y funcionales que convierten visitantes en clientes satisfechos.',
    features: ['Figma Design', 'Prototipado', 'User Testing', 'Wireframes']
  },
  {
    icon: 'Search',
    title: 'SEO Avanzado',
    description: 'Optimización completa para buscadores con estrategias que aumentan tu visibilidad online.',
    features: ['SEO Técnico', 'Content Strategy', 'Link Building', 'Analytics']
  },
  {
    icon: 'Headphones',
    title: 'Soporte 24/7',
    description: 'Atención personalizada las 24 horas con tiempo de respuesta menor a 2 horas.',
    features: ['Chat en Vivo', 'Soporte Email', 'Llamadas', 'Tickets']
  }
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'María González',
    position: 'CEO, TechStartup',
    company: 'TechStartup Inc.',
    content: 'Increíble trabajo. Nuestro sitio web no solo se ve profesional, sino que también ha mejorado significativamente nuestras conversiones. El equipo fue muy profesional y cumplió todos los plazos.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    position: 'Fundador',
    company: 'E-Commerce Plus',
    content: 'El hosting es súper rápido y confiable. Desde que migramos, nuestro sitio carga en menos de 2 segundos. El soporte técnico es excepcional, siempre responden rápidamente.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Marketing Director',
    company: 'Digital Agency',
    content: 'La optimización SEO que hicieron fue impresionante. En 3 meses aumentamos nuestro tráfico orgánico en un 150%. Recomiendo totalmente sus servicios.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: 4,
    name: 'Jorge López',
    position: 'Propietario',
    company: 'Restaurante Gourmet',
    content: 'Desarrollaron nuestra app móvil y sitio web. La experiencia de usuario es fantástica y hemos visto un aumento del 40% en pedidos online. Muy satisfecho con el resultado.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: 5,
    name: 'Laura Sánchez',
    position: 'CTO',
    company: 'FinTech Solutions',
    content: 'Su experiencia en desarrollo web es evidente. Crearon una plataforma compleja con excelente rendimiento. El código es limpio y bien documentado.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: 6,
    name: 'Roberto García',
    position: 'Director General',
    company: 'Consultoría Pro',
    content: 'El diseño UI/UX superó nuestras expectativas. Nuestros clientes constantemente elogian la facilidad de uso de nuestro sitio. Excelente trabajo en equipo.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  }
] as const;

export const CONTACT_INFO = [
  {
    icon: 'Mail',
    title: 'Email',
    content: 'hola@webhostpro.com',
    description: 'Respuesta en menos de 2 horas'
  },
  {
    icon: 'Phone',
    title: 'Teléfono',
    content: '+1 (555) 123-4567',
    description: 'Lun - Vie, 9:00 AM - 6:00 PM'
  },
  {
    icon: 'MapPin',
    title: 'Ubicación',
    content: 'Ciudad de México, México',
    description: 'También trabajamos remotamente'
  },
  {
    icon: 'Clock',
    title: 'Horarios',
    content: '24/7 Soporte Técnico',
    description: 'Atención comercial en horario laboral'
  }
] as const;

export const SERVICE_OPTIONS = [
  'Desarrollo Web',
  'Aplicaciones Móviles',
  'Hosting & Dominio',
  'SEO & Marketing',
  'Diseño UI/UX',
  'E-commerce',
  'Consultoría',
  'Otro'
] as const;

export const BUDGET_RANGES = [
  'Menos de $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  'Más de $25,000',
  'Por definir'
] as const;

export const STATS = [
  { number: '98%', label: 'Satisfacción del Cliente' },
  { number: '150+', label: 'Proyectos Completados' },
  { number: '4.9/5', label: 'Rating Promedio' },
  { number: '24h', label: 'Tiempo de Respuesta' }
] as const;

