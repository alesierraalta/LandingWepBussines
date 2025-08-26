'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Github,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Desarrollo Web', href: '#servicios' },
      { name: 'Aplicaciones Móviles', href: '#servicios' },
      { name: 'Hosting & Dominio', href: '#servicios' },
      { name: 'SEO & Marketing', href: '#servicios' },
      { name: 'Diseño UI/UX', href: '#servicios' },
      { name: 'E-commerce', href: '#servicios' }
    ],
    company: [
      { name: 'Sobre Nosotros', href: '#' },
      { name: 'Nuestro Equipo', href: '#' },
      { name: 'Portafolio', href: '#portafolio' },
      { name: 'Testimonios', href: '#testimonios' },
      { name: 'Blog', href: '#' },
      { name: 'Carreras', href: '#' }
    ],
    support: [
      { name: 'Centro de Ayuda', href: '#' },
      { name: 'Documentación', href: '#' },
      { name: 'Estado del Servicio', href: '#' },
      { name: 'Soporte Técnico', href: '#contacto' },
      { name: 'Contacto', href: '#contacto' },
      { name: 'FAQ', href: '#' }
    ],
    legal: [
      { name: 'Términos de Servicio', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Política de Cookies', href: '#' },
      { name: 'GDPR', href: '#' },
      { name: 'SLA', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Github, href: '#', name: 'GitHub' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'hola@webhostpro.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: 'Ciudad de México, México' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo */}
                <div className="text-3xl font-bold mb-6">
                  <span className="gradient-text">WebHost</span>
                  <span className="text-gray-400">Pro</span>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                  Somos tu socio tecnológico de confianza. Transformamos ideas en experiencias 
                  digitales extraordinarias con tecnología de vanguardia y soporte excepcional.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon size={16} className="text-primary" />
                      <span className="text-gray-400 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="font-bold text-lg mb-6">Servicios</h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Company */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-bold text-lg mb-6">Empresa</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Support */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-bold text-lg mb-6">Soporte</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Mantente actualizado</h3>
              <p className="text-gray-400">Recibe tips, noticias y ofertas especiales</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-secondary px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Suscribirse
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-gray-400 text-sm">
                © {currentYear} WebHostPro. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-primary hover:bg-secondary rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Volver arriba"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
