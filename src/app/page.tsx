import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  LazyHeroSection,
  LazyServicesSection, 
  LazyPortfolioSection,
  LazyTestimonialsSection,
  LazyContactSection,
  IntersectionLazyLoad
} from '@/components/LazyComponents';
import { SplineSceneBasic } from '@/components/SplineSceneBasic';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <LazyHeroSection />
      
      <SplineSceneBasic />
      
      <IntersectionLazyLoad rootMargin="200px">
        <LazyServicesSection />
      </IntersectionLazyLoad>
      
      <IntersectionLazyLoad rootMargin="200px">
        <LazyPortfolioSection />
      </IntersectionLazyLoad>
      
      <IntersectionLazyLoad rootMargin="200px">
        <LazyTestimonialsSection />
      </IntersectionLazyLoad>
      
      <IntersectionLazyLoad rootMargin="100px">
        <LazyContactSection />
      </IntersectionLazyLoad>
      
      <Footer />
    </main>
  );
}