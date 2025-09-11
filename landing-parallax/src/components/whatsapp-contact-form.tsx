"use client";

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
// import { useTheme } from "next-themes";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
}

const WhatsAppContactForm = () => {
  // const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Por favor ingresa un teléfono válido';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Selecciona el tipo de proyecto';
    }

    return newErrors;
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const generateWhatsAppMessage = () => {
    const getProjectTypeMessage = (type: string) => {
      const types: { [key: string]: string } = {
        'landing-page': 'Landing Page de Alta Conversión Optimizada',
        'ecommerce': 'Tienda Online Profesional',
        'corporate': 'Sitio Corporativo (Genera confianza inmediata)',
        'leadgen': 'Página de Captura de Leads Efectiva',
        'sales-funnel': 'Embudo de Ventas Completo (Automatizado)',
        'express': 'Proyecto Express (5-7 días entrega)'
      };
      return types[type] || type;
    };

    const getBudgetMessage = (budget: string) => {
      const budgets: { [key: string]: string } = {
        'express': 'Paquete Express: $15,000 (Entrega rápida)',
        'pro': 'Paquete Pro: $25,000 (Solución completa)',
        'premium': 'Paquete Premium: $45,000 (Máximo rendimiento)',
        'enterprise': 'Enterprise: $75,000+ (Solución empresarial)',
        'budget-flexible': 'Presupuesto Flexible (Planes de pago)'
      };
      return budgets[budget] || budget;
    };

    const getTimelineMessage = (timeline: string) => {
      const timelines: { [key: string]: string } = {
        'urgent': 'URGENTE: Necesito vender YA (5-7 días)',
        'express': 'Express: Quiero resultados rápidos (10-15 días)',
        'standard': 'Estándar: Planificación estratégica (3-4 semanas)',
        'losing-money': 'Cada día pierdo dinero, ayúdame'
      };
      return timelines[timeline] || timeline;
    };

    const message = `🚨 *SOLICITUD URGENTE - Landing de Alta Conversión*

👋 ¡Hola! Soy *${formData.name}* y NECESITO generar más ventas online *YA*.

💸 *SITUACIÓN CRÍTICA:*
Mi competencia me está ganando clientes mientras no tengo presencia digital profesional. Cada día que pasa pierdo dinero.

📋 *DETALLES DEL PROYECTO:*
${formData.company ? `🏢 Empresa: ${formData.company}` : ''}
📧 Email: ${formData.email}
📱 Teléfono: ${formData.phone}
🎯 Necesito: ${getProjectTypeMessage(formData.projectType)}
💰 Inversión: ${getBudgetMessage(formData.budget)}
⏰ Urgencia: ${getTimelineMessage(formData.timeline)}

🎯 *MI OBJETIVO:*
${formData.description || 'Necesito una landing page que convierta visitantes en clientes reales con resultados medibles.'}

🚀 *LO QUE BUSCO:*
✅ Landing page con conversión optimizada
✅ Garantía de resultados en 30 días
✅ Resultados medibles y efectivos
✅ Entrega en máximo 15 días

💰 *QUIERO MI AUDITORÍA GRATUITA DE $5,000 USD*

¿Pueden ayudarme a dominar mi mercado con una estrategia efectiva como sus otros clientes?

*Enviado desde sierrax.com* 
*¡RESPUESTA EN MENOS DE 2 HORAS!* ⚡`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate processing delay for better UX
    setTimeout(() => {
      const whatsappMessage = generateWhatsAppMessage();
      const whatsappNumber = "+582411234567"; // Replace with your actual WhatsApp number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Show success state
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          description: ''
        });
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="relative py-20 px-4 bg-white" id="contacto">
      <div className="max-w-7xl mx-auto">
        {/* Header con Psicología del Marketing */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-red-100 border border-red-300 rounded-full">
            <span className="text-red-700 font-bold text-sm">🚨 SOLO 5 CUPOS DISPONIBLES ESTE MES</span>
          </div>
          
          <h2 className="service-title text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            ¿Cuántos Clientes Más Perderás Hoy<br />
            <span className="text-red-600">Mientras Tu Competencia Vende Online?</span>
          </h2>
          
          {/* Elemento de Pérdida/Ganancia */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 max-w-4xl mx-auto mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-red-600 text-2xl">⚠️</div>
              <div className="text-center">
                <p className="text-red-800 font-bold text-lg">CADA DÍA SIN LANDING PAGE PROFESIONAL:</p>
                <p className="text-red-600 font-black text-2xl">PIERDES $2,500 - $5,000 USD EN VENTAS</p>
              </div>
              <div className="text-red-600 text-2xl">⚠️</div>
            </div>
            <p className="text-center text-red-700 font-semibold">Tus competidores YA están capturando a TUS clientes potenciales</p>
          </div>
          
          <p className="service-subtitle text-xl md:text-2xl font-medium max-w-4xl mx-auto mb-8">
            <strong>Resultados visibles en 30 días</strong> o devolvemos tu dinero.<br />
            Landing pages optimizadas que <span className="text-blue-600 font-bold">superan el promedio</span> de conversión de la industria.
          </p>

          {/* Urgency Timer */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-orange-800">Cotización Express válida por 48 horas</p>
                <p className="text-orange-600 text-sm">Después de este tiempo, tendrás que esperar hasta 2 semanas</p>
              </div>
            </div>
          </div>

          {/* Social Proof Counter */}
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">127</div>
              <div className="text-sm text-gray-600">Clientes Activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">23%</div>
                <div className="text-sm text-gray-600">Conversión Promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">15 días</div>
              <div className="text-sm text-gray-600">Entrega Puntual</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">
                🏆 Expertos Certificados en Landing Pages de Alta Conversión
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">GARANTÍA TOTAL: Si no aumentas tus ventas en 30 días, te devolvemos el 100%</span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">ENTREGA RÁPIDA: Tu landing lista en máximo 15 días</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">RESULTADOS REALES: Nuestros clientes aumentan ventas 312% en promedio</span>
                </div>
              </div>
              
              {/* Prueba Social Específica */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <p className="text-green-800 font-bold text-sm mb-2">🎉 ÚLTIMOS RESULTADOS DE CLIENTES:</p>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div className="text-center">
                      <p className="font-black text-green-600 text-lg">+450%</p>
                      <p className="text-green-700">Ventas Online</p>
                      <p className="text-gray-600">Clínica Dental</p>
                    </div>
                    <div className="text-center">
                      <p className="font-black text-blue-600 text-lg">+280%</p>
                      <p className="text-blue-700">Leads Calificados</p>
                      <p className="text-gray-600">Consultora Legal</p>
                    </div>
                    <div className="text-center">
                      <p className="font-black text-purple-600 text-lg">+620%</p>
                      <p className="text-purple-700">ROI Mensual</p>
                      <p className="text-gray-600">E-commerce</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                <strong className="text-red-600">⚠️ ADVERTENCIA:</strong> Cada día que tu competencia tiene una landing page profesional y tú no, 
                están capturando a TUS clientes potenciales. <br/><br/>
                <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">
                  Un cliente perdido hoy = $2,500 USD menos en tu bolsillo este mes
                </span>
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-black">Teléfono Directo</p>
                  <p className="text-gray-600">+58 241 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-black">Email</p>
                  <p className="text-gray-600">hola@sierrax.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-black">Ubicación</p>
                  <p className="text-gray-600">Valencia, Carabobo, Venezuela</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-black">Horario de Atención</p>
                  <p className="text-gray-600">Lun - Vie: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Resultados Efectivos */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
              <h4 className="font-bold text-black mb-4">🎯 Resultados Reales de Nuestros Clientes</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">+$2.3M</p>
                  <p className="text-sm text-gray-600">Generados para clientes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">15 días</p>
                  <p className="text-sm text-gray-600">Entrega Puntual</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">6.6%</p>
                <p className="text-sm text-gray-600">Conversión Mediana</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">5 cupos</p>
                  <p className="text-sm text-gray-600">Disponibles este mes</p>
                </div>
              </div>
              
              {/* Testimonial Express */}
              <div className="mt-4 p-3 bg-white rounded-lg border-l-4 border-green-400">
                <p className="text-sm italic text-gray-700 mb-2">
                  "En 3 semanas mi landing generó resultados excepcionales. La conversión fue inmediata."
                </p>
                <p className="text-xs text-gray-600">- Carlos M., CEO TechnoPlus</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <MagicCard
              className="p-0 max-w-none w-full"
              gradientColor="#D9D9D955"
            >
              <div className="relative p-8 bg-white rounded-lg overflow-hidden">
                <BorderBeam
                  size={250}
                  duration={6}
                  colorFrom="#10069f"
                  colorTo="#455cff"
                />
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="inline-block mb-3 px-4 py-2 bg-orange-100 border border-orange-300 rounded-full">
                      <span className="text-orange-700 font-bold text-xs">⏰ CUPO LIMITADO - SOLO 5 CUPOS</span>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">
                      Consigue Tu Landing de Alta Conversión
                    </h3>
                    <p className="text-green-600 font-semibold text-lg">
                      💰 GRATIS: Auditoría de tu competencia ($5,000 USD de valor)
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-black font-medium">
                          Nombre Completo *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Tu nombre completo"
                          className={`mt-1 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                          required
                        />
                        {errors.name && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-black font-medium">
                          Empresa
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Nombre de tu empresa"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-black font-medium">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="tu@email.com"
                          className={`mt-1 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                          required
                        />
                        {errors.email && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-black font-medium">
                          Teléfono *
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+58 241 123-4567"
                          className={`mt-1 ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                          required
                        />
                        {errors.phone && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="projectType" className="text-black font-medium">
                        Tipo de Servicio *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger className={`mt-1 ${errors.projectType ? 'border-red-500 focus:border-red-500' : ''}`}>
                          <SelectValue placeholder="Selecciona el tipo de servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="landing-page">🚀 Landing Page de Alta Conversión Optimizada</SelectItem>
                          <SelectItem value="ecommerce">💰 Tienda Online Profesional</SelectItem>
                          <SelectItem value="corporate">🏢 Sitio Corporativo (Genera confianza inmediata)</SelectItem>
                          <SelectItem value="leadgen">🎯 Página de Captura de Leads Efectiva</SelectItem>
                          <SelectItem value="sales-funnel">📈 Embudo de Ventas Completo (Automatizado)</SelectItem>
                          <SelectItem value="express">⚡ Servicio Express (5-7 días entrega)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.projectType && (
                        <div className="flex items-center mt-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.projectType}
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget" className="text-black font-medium">
                          Presupuesto Estimado
                        </Label>
                        <Select onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona tu presupuesto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="express">🔥 Paquete Express: $15,000 (Entrega rápida)</SelectItem>
                    <SelectItem value="pro">💎 Paquete Pro: $25,000 (Solución completa)</SelectItem>
                    <SelectItem value="premium">🚀 Paquete Premium: $45,000 (Máximo rendimiento)</SelectItem>
                    <SelectItem value="enterprise">🏆 Enterprise: $75,000+ (Solución empresarial)</SelectItem>
                            <SelectItem value="budget-flexible">💰 Presupuesto Flexible (Planes de pago)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline" className="text-black font-medium">
                          Timeline Deseado
                        </Label>
                        <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="¿Cuándo lo necesitas?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">🚨 URGENTE: Necesito vender YA (5-7 días)</SelectItem>
                            <SelectItem value="express">⚡ Express: Quiero resultados rápidos (10-15 días)</SelectItem>
                            <SelectItem value="standard">📈 Estándar: Planificación estratégica (3-4 semanas)</SelectItem>
                            <SelectItem value="losing-money">💸 Cada día pierdo dinero, ayúdame</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-black font-medium">
                        Describe Tu Proyecto
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Ejemplo: 'Tengo una empresa de [tu sector] y necesito mejorar mis conversiones online. Mi competencia me está ganando clientes. Necesito una landing que convierta visitantes en ventas reales. Mi público objetivo es [descripción] y mi mayor problema actual es [problema]'"
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    {/* Contador de Urgencia */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="text-center">
                        <p className="text-red-800 font-bold text-sm mb-1">⏰ CUPOS DISPONIBLES HOY:</p>
                        <div className="flex justify-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        </div>
                        <p className="text-red-600 font-black text-lg mt-1">SOLO QUEDAN 2 CUPOS</p>
                        <p className="text-red-700 text-xs">El próximo cupo se libera en 7 días</p>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <ShimmerButton
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-5 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:scale-100 shadow-lg"
                        disabled={isSubmitting || showSuccess}
                      >
                        {showSuccess ? (
                          <span className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>¡Redirigiendo a WhatsApp!</span>
                          </span>
                        ) : isSubmitting ? (
                          <span className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Preparando mensaje...</span>
                          </span>
                        ) : (
                          <span className="flex flex-col items-center justify-center">
                            <span className="flex items-center space-x-2 mb-1">
                              <Send className="w-5 h-5" />
                              <span>🚨 RESERVAR MI CUPO AHORA</span>
                            </span>
                            <span className="text-xs opacity-90">💰 + AUDITORÍA GRATIS ($5,000 USD)</span>
                          </span>
                        )}
                      </ShimmerButton>
                      
                      {/* Elementos de Confianza */}
                      <div className="mt-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">Conexión segura SSL</span>
                        </div>
                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                          <span>🔒 Datos protegidos</span>
                          <span>⚡ Respuesta en 2 horas</span>
                          <span>✅ Sin spam</span>
                        </div>
                      </div>
                    </div>

                    {showSuccess && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">¡Mensaje enviado exitosamente!</span>
                        </div>
                        <p className="text-green-600 text-sm mt-1">
                          Te hemos redirigido a WhatsApp con tu información. Responderemos en menos de 24 horas.
                        </p>
                      </div>
                    )}

                    <div className="text-center space-y-2">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-700 font-bold text-sm">
                          ⚠️ ADVERTENCIA: Solo tenemos 5 cupos disponibles este mes
                        </p>
                        <p className="text-red-600 text-xs">
                          Una vez llenos, la próxima oportunidad será hasta el próximo mes
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Al enviar serás redirigido a WhatsApp con tu información. <br/>
                        <span className="font-semibold">Respuesta rápida en menos de 2 horas.</span>
                      </p>
                    </div>
                  </form>
                  
                  {/* Barra de Autoridad */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-600 mb-3">CONFIADO POR EMPRESAS LÍDERES:</p>
                    <div className="flex justify-center items-center space-x-6 opacity-60">
                      <div className="text-center">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">TECH</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">MED</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">LAW</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">RETAIL</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2">+127 empresas han aumentado sus ventas con nosotros</p>
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppContactForm;
