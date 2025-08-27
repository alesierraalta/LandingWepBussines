'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient matching the design */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10069f]/5 via-transparent to-[#455cff]/5" />
      
      {/* Floating particles background */}
      <div className="absolute inset-0 opacity-30">
        <div className="floating-particles" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <Card className="glass-card w-full h-[600px] relative overflow-hidden border-0 shadow-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#10069f"
          />
          
          {/* Geometric shapes for consistency */}
          <div className="absolute top-10 right-10 w-20 h-20 border border-[#455cff]/20 rotate-45 animate-gpu-float" />
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-[#10069f]/10 to-[#455cff]/10 rounded-full animate-gpu-pulse" />
           
          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-12 relative z-10 flex flex-col justify-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text-modern leading-tight">
                  Hosting Profesional
                  <br />
                  <span className="text-4xl md:text-5xl text-[#333333]">
                    de Alto Rendimiento
                  </span>
                </h1>
                <p className="text-lg text-[#5d5d5d] max-w-lg leading-relaxed">
                  Infraestructura de vanguardia con velocidad ultrarrápida, seguridad avanzada 
                  y soporte 24/7. Potencia tu presencia digital con tecnología de clase mundial.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#10069f] to-[#455cff]" />
                  <span className="text-sm text-[#5d5d5d] font-medium">Tecnología Spline</span>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 relative p-6">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#10069f]/5 to-[#455cff]/5 border border-[#10069f]/10">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}