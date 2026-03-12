'use client';

import { useI18n } from './i18n-provider';
import { motion } from 'motion/react';
import { EtheralShadow } from './ui/etheral-shadow';
import { DottedSurface } from './ui/dotted-surface';
// import { AuroraBackground } from './ui/aurora-background';
// import NeuralBackground from './ui/flow-field-background';
import Link from 'next/link';

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0E0E10 0%, #0E0E10 100%)',
      }}
    >
      {/* Etheral shadow animation background */}
      <EtheralShadow
        className="pointer-events-none opacity-20"
        style={{
          position: 'absolute',
          inset: 0,
          maskImage:
            'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
        }}
        color="rgba(89, 91, 95, 1)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 0.5, scale: 1.2 }}
        sizing="fill"
      />

      {/* Flow field animation background (hidden) */}
      {/* <div className="absolute inset-0 opacity-20" style={{ mask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)', WebkitMask: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)' }}>
        <NeuralBackground
          color="#595B5F"
          colorEnd="#595B5F"
          trailOpacity={0.06}
          particleCount={350}
          speed={0.4}
          flowScale={0.002}
        />
      </div> */}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 20%, transparent 30%, #0E0E10 90%)',
        }}
      />

      {/* Dotted grid background */}
      <DottedSurface
        className="absolute inset-0 opacity-90"
        style={{ maskImage: 'radial-gradient(ellipse 90% 70% at 50% 35%, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 35%, black 30%, transparent 80%)' }}
      />

      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gold glow - center top */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[-125px] w-[572px] h-[572px] opacity-10 mix-blend-overlay rounded-full blur-3xl"
          style={{ background: '#595B5F' }}
        />
        {/* Gold streak */}
        <div className="absolute left-[420px] top-[120px] w-44 h-32 mix-blend-overlay overflow-hidden">
          <div
            className="absolute left-[52px] top-[42px] w-20 h-6 origin-top-left rotate-[15deg] opacity-20 rounded-full blur-sm"
            style={{ background: '#595B5F' }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* badge hidden */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-6 leading-relaxed font-light"
        >
          <span className="md:hidden">
            데이터센터부터 AI 서비스까지, 한 번에
          </span>
          <span className="hidden md:inline">{t.hero.description}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[32px] md:text-7xl lg:text-[80px] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-10 max-w-5xl mx-auto leading-[1.1] whitespace-normal"
        >
          {t.hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-12 flex flex-row items-center justify-center gap-3 md:gap-4"
        >
          <Link
            href="https://forms.gle/2hcY59NMnXeYeJKQ6"
            className="inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-3.5 rounded-[10px] bg-white hover:bg-white/90 text-black font-semibold text-sm md:text-base transition-colors"
            target="_blank"
          >
            {t.hero.cta_primary}
          </Link>
          {/* cta_secondary hidden */}
        </motion.div>
      </div>
    </section>
  );
}
