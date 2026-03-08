'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { FiDatabase, FiCpu, FiActivity, FiCode, FiMessageSquare, FiPlay } from 'react-icons/fi';


export default function CompanyPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-black selection:bg-white/30">
      <Header />

      {/* About Section */}
      <section id="about" className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
        </div>

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

        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/8" />
      </div>

      {/* Full Stack Diagram Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-900/10 rounded-full blur-[140px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-[340px_1fr] gap-12 md:gap-16 items-center">

            {/* Left: heading + desc */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
                {t.company.about.fullstack_title}
              </h2>
              <p className="text-sm md:text-base text-white/50 leading-relaxed">
                {t.company.about.fullstack_desc}
              </p>
            </motion.div>

            {/* Right: staircase diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-end gap-2 md:gap-3"
            >
              {/* Box 1: AI Infrastructure — bottom */}
              <div className="flex-1 rounded-2xl border border-[#5b4a9a]/40 bg-gradient-to-b from-[#1d1840]/90 to-[#13102a]/90 backdrop-blur-sm p-4 md:p-5">
                <p className="text-xs font-bold text-white mb-3">AI Infrastructure</p>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">직지 edge<br />데이터센터</span>
                    <FiDatabase className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80">GPUaaS</span>
                    <FiCpu className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex-shrink-0 mb-6 text-violet-500/40">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" />
                </svg>
              </div>

              {/* Box 2: AI Platform — mid */}
              <div className="flex-1 rounded-2xl border border-[#5b4a9a]/40 bg-gradient-to-b from-[#1d1840]/90 to-[#13102a]/90 backdrop-blur-sm p-4 md:p-5 mb-8">
                <p className="text-xs font-bold text-white mb-3">AI Platform</p>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">AI & MLOps<br />Platform</span>
                    <FiActivity className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">배포·추론<br />API 서비스</span>
                    <FiCode className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex-shrink-0 mb-14 text-violet-500/40">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" />
                </svg>
              </div>

              {/* Box 3: AI Applications — top, with glow */}
              <div className="flex-1 rounded-2xl border border-violet-400/30 bg-gradient-to-b from-[#231f4a]/90 to-[#16133a]/90 backdrop-blur-sm p-4 md:p-5 mb-16 shadow-[0_0_40px_rgba(139,92,246,0.18)] ring-1 ring-violet-500/20">
                <p className="text-xs font-bold text-white mb-3">AI Applications</p>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#342d70]/60 border border-violet-400/10 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">Chat Agent<br />서비스</span>
                    <FiMessageSquare className="flex-shrink-0 text-violet-300/80 text-lg" />
                  </div>
                  <div className="rounded-xl bg-[#342d70]/60 border border-violet-400/10 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">N3N 영상<br />AI 서비스</span>
                    <FiPlay className="flex-shrink-0 text-violet-300/80 text-lg" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/8" />
      </div>

      {/* Heritage Section — 지식의 혁신, 그 맥을 잇다 */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Eyebrow */}
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400/80 border border-blue-400/20 rounded-full px-4 py-1.5 bg-blue-400/5">
                Our Origin
              </span>

              {/* Main headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                {t.company.about.heritage_title}
              </h2>

              {/* Bold sub-statement */}
              <p className="text-lg md:text-xl font-semibold text-white/90 leading-relaxed border-l-2 border-blue-500 pl-5">
                {t.company.about.heritage_subtitle}
              </p>

              {/* Body */}
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                {t.company.about.heritage_desc}
              </p>
            </motion.div>

            {/* Right: Visual card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative circuit/type card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0d1a3a] via-[#0a1628] to-[#060d1f] aspect-[4/3] flex items-center justify-center">
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Center character block */}
                <div className="relative z-10 text-center space-y-4">
                  <div className="text-[96px] md:text-[120px] font-black text-white/10 leading-none select-none" style={{ fontFamily: 'serif' }}>
                    직지
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="h-px w-12 bg-blue-400/40" />
                    <span className="text-xs tracking-[0.25em] uppercase text-blue-300/60 font-medium">1377</span>
                    <div className="h-px w-12 bg-blue-400/40" />
                  </div>
                  <p className="text-xs text-white/30 tracking-widest uppercase">World&apos;s First Metal Movable Type</p>
                </div>
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-blue-400/30 rounded-tl-sm" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-blue-400/30 rounded-tr-sm" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-blue-400/30 rounded-bl-sm" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-blue-400/30 rounded-br-sm" />
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
