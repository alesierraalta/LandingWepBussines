"use client";

export function SocialProof() {
  const stats = [
    { number: "47", label: "Empresas confían en nosotros", suffix: "+" },
    { number: "312%", label: "Promedio de aumento en ventas", suffix: "" },
    { number: "2.3M", label: "En ventas generadas para clientes", suffix: "€" },
    { number: "97%", label: "De clientes nos recomiendan", suffix: "" }
  ];

  return (
    <section className="relative py-16 px-4 bg-gradient-to-r from-blue-50 to-white z-10">
      <div className="max-w-7xl mx-auto">
        {/* Social Proof Header */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-gray-600 mb-4">
            Más de 47 empresas ya están dominando su sector con nosotros
          </p>
          <h2 
            className="text-2xl md:text-4xl font-black"
            style={{ 
              color: '#10069f',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            Resultados Reales, No Promesas Vacías
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-4xl md:text-5xl font-black mb-2"
                style={{ color: '#10069f' }}
              >
                {stat.number}{stat.suffix}
              </div>
              <p className="text-sm md:text-base font-medium text-gray-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderLeftColor: '#455cff' }}>
            <p className="text-gray-700 font-medium mb-4 italic">
              "En 3 meses, nuestras ventas online se triplicaron. SierraX no solo nos hizo una web, nos cambió el negocio."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold" style={{ color: '#10069f' }}>M</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">María González</p>
                <p className="text-sm text-gray-600">CEO, Constructora MGZ</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderLeftColor: '#455cff' }}>
            <p className="text-gray-700 font-medium mb-4 italic">
              "Ahora aparecemos #1 en Google. Los clientes nos llaman sin que tengamos que buscarlos. Increíble."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold" style={{ color: '#10069f' }}>C</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">Carlos Ruiz</p>
                <p className="text-sm text-gray-600">Director, Clínica Dental Elite</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderLeftColor: '#455cff' }}>
            <p className="text-gray-700 font-medium mb-4 italic">
              "Mi competencia sigue preguntándose cómo conseguimos tantos clientes. Nosotros ya sabemos la respuesta: SierraX."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold" style={{ color: '#10069f' }}>A</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">Ana Martín</p>
                <p className="text-sm text-gray-600">Fundadora, Estudio de Arquitectura AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Call-to-Action */}
        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-gray-700 mb-6">
            ⚠️ Solo trabajamos con 3 nuevos clientes por mes para garantizar resultados excepcionales
          </p>
          <div 
            className="inline-block px-8 py-4 rounded-lg font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: '#10069f',
              boxShadow: '0 4px 14px 0 rgba(16, 6, 159, 0.3)'
            }}
          >
            Reservar Mi Cupo Este Mes
          </div>
          <p className="text-sm text-gray-600 mt-3">
            📞 Consulta gratuita • Sin compromiso • Resultados garantizados
          </p>
        </div>
      </div>
    </section>
  );
}
