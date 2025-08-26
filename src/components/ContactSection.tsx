'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Desarrollo Web',
    'Aplicaciones Móviles',
    'Hosting & Dominio',
    'SEO & Marketing',
    'Diseño UI/UX',
    'E-commerce',
    'Consultoría',
    'Otro'
  ];

  const budgetRanges = [
    'Menos de $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    'Más de $25,000',
    'Por definir'
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hola@webhostpro.com',
      description: 'Respuesta en menos de 2 horas'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+1 (555) 123-4567',
      description: 'Lun - Vie, 9:00 AM - 6:00 PM'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Ciudad de México, México',
      description: 'También trabajamos remotamente'
    },
    {
      icon: Clock,
      title: 'Horarios',
      content: '24/7 Soporte Técnico',
      description: 'Atención comercial en horario laboral'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="contacto" className="py-20 relative overflow-hidden gradient-mesh floating-particles">
      {/* Background Effects */}

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Hablemos de tu <span className="text-primary">proyecto</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a hacer realidad tus ideas. Cuéntanos sobre tu proyecto 
            y te daremos una propuesta personalizada sin compromiso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900 text-contrast-enhanced">Información de Contacto</h3>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-6 glass-card rounded-2xl hover:bg-white/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <info.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                  <p className="text-primary font-medium mb-1">{info.content}</p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300 drop-shadow-md">{info.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Additional Info */}
            <div className="glass-card bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-gray-200/50">
              <h4 className="font-bold text-xl mb-4 text-gray-900 text-contrast-enhanced">¿Por qué elegirnos?</h4>
              <ul className="space-y-3">
                {[
                  'Consulta inicial gratuita',
                  'Propuesta detallada en 24 horas',
                  'Garantía de satisfacción 100%',
                  'Soporte continuo post-lanzamiento'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary shrink-0" />
                    <span className="text-gray-700 drop-shadow-md">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card border border-gray-200/50 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900 text-contrast-enhanced">Solicitar Cotización</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-500"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-500"
                  placeholder="+52 55 1234 5678"
                />
              </div>

              {/* Service & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-900 mb-2">
                    Servicio de Interés *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-500"
                  >
                    <option value="">Seleccionar servicio</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-900 mb-2">
                    Presupuesto Estimado
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-500"
                  >
                    <option value="">Seleccionar rango</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-500 resize-vertical"
                  placeholder="Describe tu proyecto, objetivos, plazos y cualquier detalle importante..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(16, 6, 159, 0.4), 0 0 60px rgba(69, 92, 255, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                  isSubmitting
                    ? 'bg-gray-400/50 cursor-not-allowed backdrop-blur-sm text-gray-600'
                    : 'bg-primary hover:bg-secondary text-white animate-subtle-glow'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Solicitud
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-700 bg-green-100 border border-green-300 backdrop-blur-sm p-4 rounded-xl"
                >
                  <CheckCircle size={20} />
                  <span>¡Mensaje enviado exitosamente! Te contactaremos pronto.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-700 bg-red-100 border border-red-300 backdrop-blur-sm p-4 rounded-xl"
                >
                  <AlertCircle size={20} />
                  <span>Hubo un error al enviar el mensaje. Inténtalo de nuevo.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
