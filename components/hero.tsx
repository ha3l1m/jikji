'use client';

import { useI18n } from './i18n-provider';
import { motion } from 'motion/react';
import { FullStackDiagram } from './full-stack-diagram';
import NeuralBackground from './ui/flow-field-background';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#050505]">
      {/* Flow field animation background */}
      <div className="absolute inset-0 opacity-60" style={{ mask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)', WebkitMask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)' }}>
        <NeuralBackground
          color="#5EA5EA"
          colorEnd="#8B5CF6"
          trailOpacity={0.06}
          particleCount={400}
          speed={0.5}
        />
      </div>
      {/* Gradient overlay to fade the animation toward the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,transparent_30%,#050505_90%)] pointer-events-none" />

      {/* Decorative gradient blobs + star dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Green blob - left */}
        <div className="absolute left-[100px] top-0 w-[691px] h-[818px] mix-blend-overlay overflow-hidden">
          <div className="absolute left-[128px] top-[-192px] w-96 h-[882px] opacity-10 bg-green-200" />
        </div>
        {/* Pink blob - right */}
        <div className="absolute left-[907px] top-0 w-[519px] h-[724px] mix-blend-overlay overflow-hidden">
          <div className="absolute left-[99px] top-[-59px] w-80 h-[684px] opacity-20 bg-pink-200" />
        </div>
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
          className="mb-12"
        >
          <a
            href="mailto:business@jikji.ai"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-[10px] bg-white hover:bg-white/90 text-black font-semibold text-base transition-colors"
          >
            문의하기
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative w-full max-w-5xl mx-auto rounded-2xl border border-white/10 shadow-2xl bg-[#0A0A0A]"
        >
          <FullStackDiagram />
        </motion.div>
      </div>
    </section>
  );
}
