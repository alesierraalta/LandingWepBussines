import { HeroParallaxDemo } from "@/components/hero-parallax-demo";
import { Header } from "@/components/header";
import { ServicesBento } from "@/components/services-bento";
import { SocialProof } from "@/components/social-proof";
import { PortfolioDemo } from "@/components/portfolio-demo";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <HeroParallaxDemo />
      <SocialProof />
      <ServicesBento />
      <PortfolioDemo />
    </div>
  );
}
