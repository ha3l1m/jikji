import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ProductsSection } from '@/components/products-section';
import { InfraTeaser } from '@/components/infra-teaser';
import { PricingSnippet } from '@/components/pricing-snippet';
import { Footer } from '@/components/footer';
import { I18nProvider } from '@/components/i18n-provider';

export default function Home() {
  return (
    <I18nProvider>
      <main className="min-h-screen bg-black selection:bg-white/30">
        <Header />
        <Hero />
        <ProductsSection />
        <InfraTeaser />
        <PricingSnippet />
        {/* <CTABanner /> */}
        <Footer />
      </main>
    </I18nProvider>
  );
}
