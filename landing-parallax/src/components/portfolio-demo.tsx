"use client";

import InteractivePortfolio from "@/components/ui/interactive-portfolio";
import MobileProjects from "@/components/mobile-projects";

const PortfolioDemo = () => {
  return (
    <div className="w-full">
      {/* Desktop Portfolio - Hidden on Mobile */}
      <div className="hidden md:block">
        <InteractivePortfolio />
      </div>
      
      {/* Mobile Projects - Hidden on Desktop */}
      <div className="md:hidden">
        <MobileProjects />
      </div>
    </div>
  );
};

export { PortfolioDemo };
