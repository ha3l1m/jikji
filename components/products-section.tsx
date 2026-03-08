'use client';

import { useI18n } from './i18n-provider';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { AnimatedFeatureCard } from './ui/animated-feature-card';
import { cn } from '@/lib/utils';

type Tab = 'gpucloud' | 'platform';

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('gpucloud');
  const gpuCloudRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치에 따라 탭 자동 전환
  useEffect(() => {
    const gpuEl = gpuCloudRef.current;
    const platEl = platformRef.current;
    if (!gpuEl || !platEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id as Tab);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    observer.observe(gpuEl);
    observer.observe(platEl);
    return () => observer.disconnect();
  }, []);

  const handleTabClick = useCallback((tab: Tab) => {
    const ref = tab === 'gpucloud' ? gpuCloudRef : platformRef;
    if (ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.scrollY - 64 - 80 + 10;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  // Listen for custom tab-switch events from header nav
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail as Tab;
      if (tab === 'gpucloud' || tab === 'platform') {
        handleTabClick(tab);
      }
    };
    window.addEventListener('products-tab-switch', handler);
    return () => window.removeEventListener('products-tab-switch', handler);
  }, [handleTabClick]);

  return (
    <section id="products" className="relative bg-[#0A0B11]">
      {/* ── Sticky Tab Bar ── */}
      <div className="sticky top-16 z-40 flex justify-center py-6 bg-[#0A0B11]/80 backdrop-blur-md">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />

        <div className="inline-flex bg-white/10 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleTabClick('gpucloud')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'gpucloud'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            GPU Cloud
          </button>
          <button
            onClick={() => handleTabClick('platform')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'platform'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            Platform
          </button>
        </div>
      </div>

      {/* ── 두 섹션 항상 렌더, 스크롤로 탐색 ── */}
      <div ref={gpuCloudRef} id="gpucloud">
        <GpuCloudContent />
      </div>
      <div ref={platformRef} id="platform">
        <PlatformContent />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   GPU CLOUD CONTENT
   ───────────────────────────────────────── */
function GpuCloudContent() {
  const { t } = useI18n();

  return (
    <>
      {/* Tagline */}
      {/* <div className="flex flex-col items-center justify-center py-[72px] gap-4 bg-[#01071B]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-[36px] font-bold leading-[1.33] text-center text-[#D9D9D9] max-w-5xl px-6"
        >
          {t.products.gpucloud.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-white/60 text-center px-6"
        >
          {t.products.gpucloud.subtitle}
        </motion.p>
      </div> */}

      {/* OneClick Start */}
      <div className="pt-8 pb-6">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h3 className="text-3xl md:text-[48px] font-bold leading-none text-center text-white">
              {t.products.gpucloud.oneclick.title}
            </h3>
            <p className="text-base md:text-lg text-white/50 text-center">
              {t.products.gpucloud.oneclick.subtitle}
            </p>
          </motion.div>

          {/* 3 Animated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] w-full">
            {(['oneclick', 'framework', 'storage'] as const).map((variant, idx) => (
              <motion.div
                key={variant}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <AnimatedFeatureCard
                  variant={variant}
                  cardTitle={t.products.gpucloud.oneclick.items[idx].title}
                  cardDescription={t.products.gpucloud.oneclick.items[idx].desc}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-[72px] px-6">
        <div className="mx-auto max-w-[1200px] flex flex-col items-center gap-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-[36px] font-bold leading-none text-center text-white"
          >
            {t.products.gpucloud.features.title}
          </motion.h3>

          <div className="border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full">
            {t.products.gpucloud.features.items.map((item, idx, arr) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={cn(
                  'p-8 md:p-10',
                  idx > 0 && 'border-t border-white/10',
                  idx === 1 && 'md:border-t-0',
                  idx % 2 === 1 && 'md:border-l border-white/10',
                  arr.length % 2 === 1 && idx === arr.length - 1 && 'md:col-span-2',
                )}
              >
                <div className="text-xs font-mono text-white/30 mb-4 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-base text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   AGENT TERMINAL
   ───────────────────────────────────────── */
function AgentTerminal() {
  // Dracula theme tokens
  const Kw   = (s: string) => <span style={{ color: '#ff79c6' }}>{s}</span>;  // pink:   keywords (curl)
  const Flg  = (s: string) => <span style={{ color: '#8be9fd' }}>{s}</span>;  // cyan:   flags (-s -H -d)
  const Str  = (s: string) => <span style={{ color: '#f1fa8c' }}>{s}</span>;  // yellow: strings
  const Key  = (s: string) => <span style={{ color: '#50fa7b' }}>{s}</span>;  // green:  JSON keys
  const Bool = (s: string) => <span style={{ color: '#bd93f9' }}>{s}</span>;  // purple: booleans
  const Pnc  = (s: string) => <span style={{ color: '#f8f8f2' }}>{s}</span>;  // white:  punctuation
  const Cmt  = (s: string) => <span style={{ color: '#6272a4' }}>{s}</span>;  // gray:   continuation \

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative mx-auto max-w-3xl mb-4"
    >
      {/* Ambient glow behind glass */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-40px',
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.25) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Glass window — Dracula bg at 50% opacity */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[0.12]"
        style={{
          background: 'rgba(40, 42, 54, 0.52)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 20px 52px rgba(0,0,0,0.5)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.07]"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FFBD2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
        </div>

        {/* Code body */}
        <pre className="px-6 py-5 text-[13px] leading-[1.9] font-mono overflow-x-auto whitespace-pre">
          <span>{Kw('curl')} {Flg('-s')} {Str('https://api.jikjilabs.local/v1/chat/completions')} {Cmt('\\')}{'\n'}</span>
          <span>{'  '}{Flg('-H')} {Str('"Authorization: Bearer <API_KEY>"')} {Flg('-H')} {Str('"Content-Type: application/json"')} {Cmt('\\')}{'\n'}</span>
          <span>{'  '}{Flg('-d')} {Pnc("'{")}{'\n'}</span>
          <span>{'    '}{Key('"model"')}{Pnc(':')}{Str('"llama"')}{Pnc(',')}{'\n'}</span>
          <span>{'    '}{Key('"messages"')}{Pnc(':[')}
            {Pnc('{')}{Key('"role"')}{Pnc(':')}{Str('"user"')}{Pnc(',')}
            {Key('"content"')}{Pnc(':')}{Str('"회사 소개 한 줄"')}{Pnc('}],')}
            {'\n'}</span>
          <span>{'    '}{Key('"retrieval"')}{Pnc(':{')}
            {Key('"enabled"')}{Pnc(':')}{Bool('true')}{Pnc(',')}
            {Key('"web_search"')}{Pnc(':')}{Bool('true')}{Pnc('},')}{'\n'}</span>
          <span>{'    '}{Key('"memory"')}{Pnc(':{')}
            {Key('"session_id"')}{Pnc(':')}{Str('"cust-42"')}{Pnc('}')}{'\n'}</span>
          <span>{'  '}{Pnc("}'")}<span className="inline-block w-[2px] h-[0.9em] bg-white/50 ml-0.5 animate-pulse align-middle" /></span>
        </pre>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   VIDEO MODAL
   ───────────────────────────────────────── */
interface VideoModalProps {
  item: { title: string; desc: string; detail: string } | null;
  onClose: () => void;
}

function VideoModal({ item, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-lg rounded-2xl border border-white/15 overflow-hidden"
            style={{
              background: 'rgba(13, 11, 30, 0.93)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono tracking-widest text-white/30 uppercase">N3N VIDEO AI</span>
                <h2 className="text-xl font-bold text-white leading-tight">{item.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 ml-4 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Detail text */}
            <div className="px-6 pb-4">
              <p className="text-sm text-white/60 leading-relaxed">{item.detail}</p>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-white/10" />

            {/* Sub-items */}
            <div className="p-6 pt-4 flex flex-col gap-3">
              {item.desc.split('\n').map((tech, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400/70" />
                  <span className="text-sm font-medium text-white/80">{tech}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   PLATFORM CONTENT
   ───────────────────────────────────────── */
function PlatformContent() {
  const { t } = useI18n();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const selectedItem = selectedCard !== null ? t.products.platform.video.features[selectedCard] : null;

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* AI Inference Platform */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-white/60 mb-6">
              AI INFERENCE
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight whitespace-pre-line text-white">
              {t.products.platform.inference.title}
            </h2>
          </motion.div>

          <div className="border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {t.products.platform.inference.features.map((item, idx, arr) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'p-8 md:p-10',
                  idx > 0 && 'border-t border-white/10',
                  idx === 1 && 'md:border-t-0',
                  idx % 2 === 1 && 'md:border-l border-white/10',
                  arr.length % 2 === 1 && idx === arr.length - 1 && 'md:col-span-2',
                )}
              >
                <div className="text-xs font-mono text-white/30 mb-4 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-base text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enterprise AI Agents */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-white/60 mb-6">
              CHAT AGENT
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-white">
              {t.products.platform.agents.title}
            </h2>
          </motion.div>

          {/* Terminal Code Block */}
          <AgentTerminal />

          <div className="border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-10">
            {t.products.platform.agents.features.map((item, idx, arr) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'p-8 md:p-10',
                  idx > 0 && 'border-t border-white/10',
                  idx === 1 && 'md:border-t-0',
                  idx % 2 === 1 && 'md:border-l border-white/10',
                  arr.length % 2 === 1 && idx === arr.length - 1 && 'md:col-span-2',
                )}
              >
                <div className="text-xs font-mono text-white/30 mb-4 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-base text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* N3N Video AI Platform */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 lg:sticky lg:top-32 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-white/60 w-fit">
              N3N VIDEO AI
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug text-white">
              {t.products.platform.video.title}
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              {t.products.platform.video.subtitle}
            </p>
          </motion.div>

          {/* Right: cards */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.products.platform.video.features.map((item, idx, arr) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setSelectedCard(idx)}
                className={cn(
                  'flex flex-col items-start p-6 gap-2 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 hover:border-white/20 transition-all text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50',
                  arr.length === 5 && idx === 4 && 'sm:col-span-2 sm:w-[calc(50%-8px)] sm:mx-auto',
                )}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <h4 className="text-xl font-bold text-white">
                    {item.title}
                  </h4>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-base leading-[1.4] text-white/60 whitespace-pre-line font-medium">
                  {item.desc}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <VideoModal item={selectedItem} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
