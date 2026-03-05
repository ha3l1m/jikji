import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-white/30">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
