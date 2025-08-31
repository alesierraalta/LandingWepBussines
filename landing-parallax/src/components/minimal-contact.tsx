"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Phone, Mail, MapPin } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

const MinimalContact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const message = `Hola, soy ${formData.name} de ${formData.company || 'mi empresa'}.

Estoy interesado en: ${formData.projectType}

Detalles del proyecto:
${formData.message}

Mis datos de contacto:
📧 ${formData.email}
📱 ${formData.phone}

¡Espero su respuesta!`;
      
      const whatsappUrl = `https://wa.me/5255123456789?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 px-4 bg-gray-50" id="contacto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hablemos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Información de contacto
              </h3>
              <p className="text-gray-600 mb-8">
                Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+52 55 1234-5678</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">hola@sierrax.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ubicación</p>
                  <p className="text-gray-600">Ciudad de México, México</p>
                </div>
              </div>
            </div>

            {/* Simple stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-gray-600">Proyectos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">5+</div>
                  <div className="text-sm text-gray-600">Años</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">24h</div>
                  <div className="text-sm text-gray-600">Respuesta</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Envíanos un mensaje
              </h3>
              <p className="text-gray-600">
                Completa el formulario y nos pondremos en contacto contigo
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Nombre *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Tu nombre"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-gray-700 font-medium">
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
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+52 55 1234-5678"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="projectType" className="text-gray-700 font-medium">
                  Tipo de proyecto *
                </Label>
                <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona el tipo de proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landing-page">Landing Page</SelectItem>
                    <SelectItem value="ecommerce">Tienda Online</SelectItem>
                    <SelectItem value="corporate">Sitio Corporativo</SelectItem>
                    <SelectItem value="webapp">Aplicación Web</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Cuéntanos más sobre tu proyecto..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Enviar mensaje</span>
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalContact;