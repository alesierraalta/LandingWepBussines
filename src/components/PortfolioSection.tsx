'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import Image from 'next/image';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'web', label: 'Desarrollo Web' },
    { id: 'hosting', label: 'Hosting' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'app', label: 'Aplicaciones' }
  ];

  const projects = [
    {
      id: 1,
      title: 'TechCorp Solutions',
      category: 'web',
      description: 'Sitio web corporativo con diseño moderno y optimización SEO completa.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'E-Shop Premium',
      category: 'ecommerce',
      description: 'Plataforma de e-commerce con pasarela de pagos y panel administrativo.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Cloud Hosting Pro',
      category: 'hosting',
      description: 'Panel de control personalizado para servicios de hosting cloud.',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'PHP', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'FitTracker App',
      category: 'app',
      description: 'Aplicación móvil para seguimiento de ejercicios y nutrición.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Redux'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 5,
      title: 'Restaurant Menu',
      category: 'web',
      description: 'Sitio web para restaurante con menú digital y reservas online.',
      image: '/api/placeholder/400/300',
      technologies: ['Gatsby', 'Strapi', 'GraphQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Startup Landing',
      category: 'web',
      description: 'Landing page para startup tecnológica con animaciones avanzadas.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'Framer Motion', 'Sanity'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="portafolio" className="py-20 gradient-mesh floating-particles">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
            Nuestro <span className="gradient-text-modern animate-gradient-shift">Portafolio</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8" style={{ color: '#5d5d5d' }}>
            Explora algunos de nuestros proyectos más destacados y descubre cómo hemos ayudado 
            a empresas como la tuya a alcanzar sus objetivos digitales.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300"
              style={
                activeFilter === filter.id
                  ? {
                      background: 'linear-gradient(135deg, #10069f, #455cff)',
                      color: '#ffffff',
                      boxShadow: '0 8px 32px rgba(16, 6, 159, 0.3)'
                    }
                  : {
                      background: 'rgba(255, 255, 255, 0.8)',
                      color: '#5d5d5d',
                      border: '1px solid rgba(16, 6, 159, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }
              }
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(16, 6, 159, 0.1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(16, 6, 159, 0.1)'
                }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-video flex items-center justify-center"
                       style={{
                         background: 'linear-gradient(135deg, rgba(16, 6, 159, 0.1), rgba(69, 92, 255, 0.1))'
                       }}>
                    <div className="text-6xl font-bold" style={{ color: 'rgba(16, 6, 159, 0.3)' }}>
                      {project.title.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.liveUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full transition-colors duration-200"
                      style={{
                        background: '#ffffff',
                        color: '#10069f'
                      }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full transition-colors duration-200"
                      style={{
                        background: '#ffffff',
                        color: '#10069f'
                      }}
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              background: 'linear-gradient(135deg, #10069f, #455cff)',
                              color: '#ffffff'
                            }}>
                        Destacado
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 transition-colors duration-300" 
                      style={{ color: '#000000' }}>
                    {project.title}
                  </h3>
                  
                  <p className="mb-4 leading-relaxed" style={{ color: '#5d5d5d' }}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{
                          background: 'rgba(16, 6, 159, 0.1)',
                          color: '#10069f'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm capitalize" style={{ color: '#5d5d5d' }}>
                      {filters.find(f => f.id === project.category)?.label}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="transition-colors duration-200"
                        style={{ color: '#10069f' }}
                      >
                        <Eye size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg mb-6" style={{ color: '#5d5d5d' }}>
            ¿Te gusta lo que ves? Trabajemos juntos en tu próximo proyecto.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200"
            style={{
              background: 'linear-gradient(135deg, #10069f 0%, #455cff 100%)',
              boxShadow: '0 8px 32px rgba(16, 6, 159, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            Iniciar mi Proyecto
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
