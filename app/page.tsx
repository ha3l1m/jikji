import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { StatsBar } from '@/components/stats-bar';
import { Features } from '@/components/features';
import { ProductsSection } from '@/components/products-section';
import { InfraTeaser } from '@/components/infra-teaser';
import { PricingSnippet } from '@/components/pricing-snippet';
import { CTABanner } from '@/components/cta-banner';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-white/30">
      <Header />
      <Hero />
      <StatsBar />
      <Features />
      <ProductsSection />
      <InfraTeaser />
      <PricingSnippet />
      <CTABanner />
      <Footer />
    </main>
  );
}
