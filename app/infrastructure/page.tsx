'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { Server, Database, Cloud, Shield, Cpu, type LucideIcon } from 'lucide-react';

const isolationIcons: LucideIcon[] = [Shield, Database, Cloud, Cpu];

export default function InfrastructurePage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-black selection:bg-black/10">
      <Header />
      
      {/* Sovereign Region Section */}
      <section id="region" className="pt-32 pb-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
            >
              {t.infrastructure.region.title}
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-24">
            {t.infrastructure.region.services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-black/5"
              >
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-black/60 mb-6 h-10">{service.subtitle}</p>
                <ul className="space-y-3">
                  {service.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm font-medium flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span className="text-black/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Cluster Section */}
          <div className="bg-black text-white rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  {t.infrastructure.region.cluster.title}
                </h2>
                <p className="text-xl text-white/60">
                  {t.infrastructure.region.cluster.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {t.infrastructure.region.cluster.stats.map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-sm text-white/60 mb-2">{stat.desc}</div>
                    <div className="text-4xl md:text-6xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm font-medium text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Isolation Section */}
      <section id="isolation" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                {t.infrastructure.isolation.title}
              </h2>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                {t.infrastructure.isolation.subtitle}
              </p>
              <p className="text-xl font-semibold text-indigo-600 mb-12">
                {t.infrastructure.isolation.desc}
              </p>

              <div className="space-y-8">
                {t.infrastructure.isolation.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      {(() => { const Icon = isolationIcons[idx]; return <Icon className="w-6 h-6 text-indigo-600" />; })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-black/60 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <a 
                  href="mailto:business@jikji.ai"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FF3B30] text-white font-semibold rounded-full hover:bg-[#FF3B30]/90 transition-all"
                >
                  {t.infrastructure.isolation.cta}
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-black/5 rounded-3xl overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                {/* Placeholder for PMDC image */}
                <div className="text-center">
                  <Server className="w-24 h-24 text-black/20 mx-auto mb-4" />
                  <span className="text-black/40 font-medium text-lg">PMDC Container Image</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
