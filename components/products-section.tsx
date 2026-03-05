'use client';

import { useI18n } from './i18n-provider';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedFeatureCard } from './ui/animated-feature-card';

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
    <section id="products" className="relative bg-[#01071B]">
      {/* ── Sticky Tab Bar ── */}
      <div className="sticky top-16 z-40 flex justify-center py-6 bg-[#01071B]/80 backdrop-blur-md">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-black/0 to-transparent pointer-events-none" />

        <div className="inline-flex bg-[#111] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleTabClick('gpucloud')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'gpucloud'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            GPU Cloud
          </button>
          <button
            onClick={() => handleTabClick('platform')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'platform'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
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
      <div className="bg-[#01071B] pt-10 pb-8">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-col items-center gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            {/* <div className="inline-flex items-center px-3 py-[9px] rounded-full bg-white/10 border border-white/5">
              <span className="text-sm tracking-[1.32px] uppercase text-white">
                GPU Cloud Instance
              </span>
            </div> */}
            <h3 className="text-3xl md:text-[48px] font-bold leading-none text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t.products.gpucloud.oneclick.title}
            </h3>
            <p className="text-base md:text-lg text-white/60 text-center">
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
      <div className="bg-[#01071B] py-[72px] px-6">
        <div className="mx-auto max-w-[1200px] flex flex-col items-center gap-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-[36px] font-bold leading-none text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            {t.products.gpucloud.features.title}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {t.products.gpucloud.features.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex flex-col items-start p-10 gap-2 bg-[#151C32] border border-white/10 rounded-3xl min-h-[200px]"
              >
                <div className="flex flex-col gap-[15px]">
                  <h4 className="text-base md:text-xl font-bold leading-[1.33] bg-gradient-to-br from-white via-white to-[#C1C5C5] bg-clip-text text-transparent">
                    {item.title}
                  </h4>
                  <p className="text-base leading-[1.4] text-white/80">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   PLATFORM CONTENT
   ───────────────────────────────────────── */
function PlatformContent() {
  const { t } = useI18n();

  return (
    <div className="bg-[#01071B]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* AI Inference Platform */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/5 text-sm font-medium text-white/80 mb-6">
              AI INFERENCE
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight whitespace-pre-line bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t.products.platform.inference.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.products.platform.inference.features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-start p-10 gap-2 bg-[#151C32] border border-white/10 rounded-3xl min-h-[200px]"
              >
                <h4 className="text-base md:text-xl font-bold leading-[1.33] bg-gradient-to-br from-white via-white to-[#C1C5C5] bg-clip-text text-transparent">
                  {item.title}
                </h4>
                <p className="text-base leading-[1.4] text-white/80 mt-2">
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/5 text-sm font-medium text-white/80 mb-6">
              CHAT AGENT
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t.products.platform.agents.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.products.platform.agents.features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-start p-10 gap-2 bg-[#151C32] border border-white/10 rounded-3xl min-h-[200px]"
              >
                <h4 className="text-base md:text-xl font-bold leading-[1.33] bg-gradient-to-br from-white via-white to-[#C1C5C5] bg-clip-text text-transparent">
                  {item.title}
                </h4>
                <p className="text-base leading-[1.4] text-white/80 mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* N3N Video AI Platform */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t.products.platform.video.title}
            </h2>
            <div className="inline-block bg-white/10 px-6 py-3 rounded-lg border border-white/20 text-base font-medium text-white/90">
              {t.products.platform.video.subtitle}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {t.products.platform.video.features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-start p-10 gap-2 bg-[#151C32] border border-white/10 rounded-3xl min-h-[200px] group hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <h4 className="text-xl font-bold bg-gradient-to-br from-white via-white to-[#C1C5C5] bg-clip-text text-transparent">
                    {item.title}
                  </h4>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
                <p className="text-base leading-[1.4] text-white/80 whitespace-pre-line font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
