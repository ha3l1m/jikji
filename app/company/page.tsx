'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';


export default function CompanyPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-black selection:bg-white/30">
      <Header />
      
      {/* About Section */}
      <section id="about" className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              {t.company.about.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
            >
              {t.company.about.subtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-white/80 leading-relaxed"
            >
              <p>{t.company.about.desc1}</p>
              <p>{t.company.about.desc2}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4"
            >
              {/* Placeholder for the Business AX diagram */}
              <div className="w-full bg-[#151C32] rounded-xl p-4 text-center border border-white/10">
                <span className="font-semibold text-white">Business AX</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="w-full bg-[#151C32] rounded-xl p-4 text-center border border-white/10">
                <span className="font-semibold text-white">AI Applications</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="w-full bg-[#151C32] rounded-xl p-4 text-center border border-white/10">
                <span className="font-semibold text-white">AI Infrastructure</span>
              </div>
              <div className="w-full grid grid-cols-2 gap-4 mt-4">
                <div className="bg-indigo-500/20 text-indigo-300 rounded-xl p-4 text-center text-sm">
                  GPU Cloud Service
                </div>
                <div className="bg-indigo-500/20 text-indigo-300 rounded-xl p-4 text-center text-sm">
                  AI Platform
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* News Section(추후 추가예정) */}
     

      <Footer />
    </main>
  );
}
