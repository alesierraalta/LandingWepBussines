import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SimplifiedServicesSection from '@/components/SimplifiedServicesSection';
import { SplineSceneBasic } from '@/components/SplineSceneBasic';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <SplineSceneBasic />
      <SimplifiedServicesSection />
      <Footer />
    </main>
  );
}