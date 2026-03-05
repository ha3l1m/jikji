'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';
import { SeoulDottedMap } from './seoul-dotted-map';
import { ArrowRight, Server, Shield, Database, Cloud, Cpu, type LucideIcon } from 'lucide-react';

const isolationIcons: LucideIcon[] = [Shield, Database, Cloud, Cpu];

export function InfraTeaser() {
  const { t } = useI18n();
  const cluster = t.infrastructure.region.cluster;

  return (
    <>
      {/* Map + Stats Section */}
      <section id="infrastructure" className="py-24 relative overflow-hidden bg-[#070708] border-t border-white/5">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-0 w-[400px] h-[500px] mix-blend-overlay overflow-hidden">
            <div className="absolute left-16 -top-24 w-64 h-[500px] opacity-8 bg-green-200" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-[500px] h-[500px] opacity-10 mix-blend-overlay bg-cyan-200 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
            >
              {cluster.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-white/50 font-light"
            >
              {cluster.subtitle}
            </motion.p>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SeoulDottedMap className="w-full max-w-lg mx-auto" />
            </motion.div>

            {/* Stats + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4 mb-10">
                {cluster.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white/[0.04] border border-white/8 rounded-2xl p-5"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs font-medium text-[#5EA5EA]">{stat.label}</div>
                    <div className="text-xs text-white/40 mt-1">{stat.desc}</div>
                  </motion.div>
                ))}
              </div>

              <a
                href="mailto:business@jikji.ai"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#5EA5EA]/10 hover:bg-[#5EA5EA]/20 border border-[#5EA5EA]/30 text-[#5EA5EA] font-medium text-sm transition-colors group"
              >
                AI Infrastructure 문의하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
            >
              {t.infrastructure.region.title}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {t.infrastructure.region.services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/50 mb-6 h-10">{service.subtitle}</p>
                <ul className="space-y-3">
                  {service.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm font-medium flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5EA5EA] mt-1.5 shrink-0" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Isolation / PMDC Section */}
      <section id="isolation" className="py-24 bg-[#050505] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                {t.infrastructure.isolation.title}
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                {t.infrastructure.isolation.subtitle}
              </p>
              <p className="text-xl font-semibold text-[#5EA5EA] mb-12">
                {t.infrastructure.isolation.desc}
              </p>

              <div className="space-y-8">
                {t.infrastructure.isolation.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5EA5EA]/10 flex items-center justify-center shrink-0">
                      {(() => { const Icon = isolationIcons[idx]; return <Icon className="w-6 h-6 text-[#5EA5EA]" />; })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <div className="relative inline-flex rounded-full p-[1px] overflow-hidden">
                  <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3D9F5_0%,#5EA5EA_50%,#B3D9F5_100%)]" />
                  <a
                    href="mailto:business@jikji.ai"
                    className="relative z-10 inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all bg-zinc-950 bg-gradient-to-tr from-zinc-300/5 via-[#5EA5EA]/20 to-transparent hover:from-zinc-300/10 hover:via-[#5EA5EA]/30"
                  >
                    {t.infrastructure.isolation.cta}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-white/5 rounded-3xl overflow-hidden relative flex items-center justify-center border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
                <div className="text-center">
                  <Server className="w-24 h-24 text-white/20 mx-auto mb-4" />
                  <span className="text-white/40 font-medium text-lg">PMDC Container Image</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
