'use client';

import { useI18n } from './i18n-provider';
import { motion } from 'motion/react';
import NeuralBackground from './ui/flow-field-background';
import Link from 'next/link';
import { ArrowRight, Server, Cpu, BarChart3, MessageSquare } from 'lucide-react';

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A0B11 0%, #343E5F 110.38%, #C6C3BD 152.83%)' }}>
      {/* Flow field animation background */}
      <div className="absolute inset-0 opacity-60" style={{ mask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)', WebkitMask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)' }}>
        <NeuralBackground
          color="#5572E2"
          colorEnd="#4064EB"
          trailOpacity={0.06}
          particleCount={400}
          speed={0.5}
        />
      </div>
      {/* Gradient overlay to fade the animation toward the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,transparent_30%,#0A0B11_90%)] pointer-events-none" />

      {/* Decorative gradient blobs + star dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cyan circle - center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[-125px] w-[572px] h-[572px] opacity-20 mix-blend-overlay bg-cyan-200 rounded-full blur-3xl" />
        {/* White streak */}
        <div className="absolute left-[420px] top-[120px] w-44 h-32 mix-blend-overlay overflow-hidden">
          <div className="absolute left-[52px] top-[42px] w-20 h-6 origin-top-left rotate-[15deg] opacity-40 bg-white" />
        </div>
        {/* Blurred pill */}
        <div className="absolute left-[1022px] top-[404px] w-28 h-9 origin-top-left -rotate-[25deg] opacity-5 mix-blend-overlay bg-white rounded-[55px] blur-lg" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 mb-4 backdrop-blur-md"
        >
          <span>{t.hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8 max-w-5xl mx-auto leading-[1.1]"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed font-light"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:business@jikji.ai"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-[10px] bg-white hover:bg-white/90 text-black font-semibold text-base transition-colors"
          >
            {t.hero.cta_primary}
          </a>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-base transition-colors"
          >
            {t.hero.cta_secondary}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Mobile fallback — simplified stacked cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 w-full flex flex-col gap-3 md:hidden"
        >
          {[
            { title: 'AI Infrastructure', items: ['직지 edge 데이터센터', 'GPUaaS'], icons: [Server, Cpu], borderColor: 'border-[#5572E2]/40', glowColor: 'shadow-[0_0_20px_rgba(85,114,226,0.1)]' },
            { title: 'AI Platform', items: ['AI & MLOps Platform', '배포·추론 API'], icons: [BarChart3, BarChart3], borderColor: 'border-[#4064EB]/40', glowColor: 'shadow-[0_0_20px_rgba(64,100,235,0.1)]' },
            { title: 'AI Applications', items: ['Chat Agent 서비스', 'N3N 영상 AI'], icons: [MessageSquare, MessageSquare], borderColor: 'border-[#4064EB]/50', glowColor: 'shadow-[0_0_20px_rgba(64,100,235,0.15)]' },
          ].map((col) => (
            <div key={col.title} className={`rounded-2xl border ${col.borderColor} ${col.glowColor} bg-white/[0.04] p-4`}>
              <h3 className="text-white font-bold text-sm mb-3">{col.title}</h3>
              <div className="flex gap-2">
                {col.items.map((label, i) => {
                  const Icon = col.icons[i];
                  return (
                    <div key={label} className="flex-1 flex items-center gap-2 bg-white/[0.06] rounded-xl px-3 py-2 border border-white/10">
                      <div className="w-7 h-7 rounded-lg bg-[#5572E2]/10 border border-[#5572E2]/20 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#5572E2]" />
                      </div>
                      <span className="text-white/70 text-xs font-medium leading-snug">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
