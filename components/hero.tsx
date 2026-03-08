'use client';

import { useI18n } from './i18n-provider';
import { motion } from 'motion/react';
import NeuralBackground from './ui/flow-field-background';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Server, Cpu, BarChart3, MessageSquare } from 'lucide-react';

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0E0E10 0%, #0E0E10 100%)' }}>
      {/* Flow field animation background */}
      <div className="absolute inset-0 opacity-40" style={{ mask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)', WebkitMask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)' }}>
        <NeuralBackground
          color="#C9A84C"
          colorEnd="#F0C040"
          trailOpacity={0.05}
          particleCount={350}
          speed={0.4}
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 20%, transparent 30%, #0E0E10 90%)' }} />

      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gold glow - center top */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[-125px] w-[572px] h-[572px] opacity-10 mix-blend-overlay rounded-full blur-3xl" style={{ background: '#F0C040' }} />
        {/* Gold streak */}
        <div className="absolute left-[420px] top-[120px] w-44 h-32 mix-blend-overlay overflow-hidden">
          <div className="absolute left-[52px] top-[42px] w-20 h-6 origin-top-left rotate-[15deg] opacity-20 rounded-full blur-sm" style={{ background: '#C9A84C' }} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-white/60 mb-4"
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

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10"
        >
          <Image
            src="/ai.png"
            alt="AI Infrastructure"
            width={400}
            height={400}
            className="mx-auto w-52 md:w-64 lg:w-72 drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
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
            { title: 'AI Infrastructure', items: ['직지 edge 데이터센터', 'GPUaaS'], icons: [Server, Cpu] },
            { title: 'AI Platform', items: ['AI & MLOps Platform', '배포·추론 API'], icons: [BarChart3, BarChart3] },
            { title: 'AI Applications', items: ['Chat Agent 서비스', 'N3N 영상 AI'], icons: [MessageSquare, MessageSquare] },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl p-4" style={{ background: '#1A1B1E', border: '1px solid rgba(227,229,232,0.08)', boxShadow: '0 0 20px rgba(159,122,94,0.06)' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#E3E5E8' }}>{col.title}</h3>
              <div className="flex gap-2">
                {col.items.map((label, i) => {
                  const Icon = col.icons[i];
                  return (
                    <div key={label} className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(227,229,232,0.04)', border: '1px solid rgba(227,229,232,0.08)' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(159,122,94,0.12)', border: '1px solid rgba(212,157,115,0.2)' }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: '#D49D73' }} />
                      </div>
                      <span className="text-xs font-medium leading-snug" style={{ color: '#8E9399' }}>{label}</span>
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
