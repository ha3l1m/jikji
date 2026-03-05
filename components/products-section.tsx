'use client';

import { useI18n } from './i18n-provider';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Server, Database, Settings, type LucideIcon } from 'lucide-react';

const oneclickIcons: LucideIcon[] = [Server, Settings, Database];

type Tab = 'gpucloud' | 'platform';

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('gpucloud');
  const sectionRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // Track when section is in view to show sticky tab
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleTabClick = useCallback((tab: Tab) => {
    setActiveTab(tab);
    // Scroll to top of section so the new content is visible
    if (sectionRef.current) {
      const headerHeight = 64;
      const tabBarHeight = 80;
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - headerHeight - tabBarHeight + 10;
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
    <section ref={sectionRef} id="products" className="relative bg-[#17171D]">
      {/* ── Sticky Tab Bar ── */}
      <div
        className={`sticky top-16 z-40 flex justify-center py-6 transition-colors duration-300 ${
          isSticky ? 'bg-black' : 'bg-[#17171D]'
        }`}
      >
        {/* Bottom fade gradient so content slides under smoothly */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-black/0 to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 p-[6px] rounded-full bg-white/20 backdrop-blur-[32px]">
          <button
            onClick={() => handleTabClick('gpucloud')}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
              activeTab === 'gpucloud'
                ? 'bg-white text-[#1D1C20]'
                : 'text-white hover:text-white/80'
            }`}
          >
            GPU Cloud
          </button>
          <button
            onClick={() => handleTabClick('platform')}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
              activeTab === 'platform'
                ? 'bg-white text-[#1D1C20]'
                : 'text-white hover:text-white/80'
            }`}
          >
            Platform
          </button>
        </div>
      </div>

      {/* ── Tab Content with crossfade ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'gpucloud' ? (
          <motion.div
            key="gpucloud"
            id="gpucloud"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <GpuCloudContent />
          </motion.div>
        ) : (
          <motion.div
            key="platform"
            id="platform"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <PlatformContent />
          </motion.div>
        )}
      </AnimatePresence>
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
      <div className="flex flex-col items-center justify-center py-[72px] gap-4 bg-[#17171D]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-[48px] font-bold leading-[1.33] text-center text-[#D9D9D9] max-w-5xl px-6"
        >
          {t.products.gpucloud.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-white/60 text-center px-6"
        >
          {t.products.gpucloud.subtitle}
        </motion.p>
      </div>

      {/* OneClick Start */}
      <div className="bg-[#17171D] pb-8">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-col items-center gap-[88px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center px-3 py-[9px] rounded-full bg-white/10 border border-white/5">
              <span className="text-sm tracking-[1.32px] uppercase text-white">
                GPU Cloud Instance
              </span>
            </div>
            <h3 className="text-4xl md:text-[72px] font-bold leading-none text-center bg-gradient-to-l from-[#8DBFC4] to-[#A7C1D7] bg-clip-text text-transparent">
              {t.products.gpucloud.oneclick.title}
            </h3>
            <p className="text-lg md:text-2xl text-white text-center">
              {t.products.gpucloud.oneclick.subtitle}
            </p>
          </motion.div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] w-full">
            {t.products.gpucloud.oneclick.items.map((item, idx) => {
              const Icon = oneclickIcons[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center justify-center rounded-[15px] p-12 md:p-[100px] overflow-hidden"
                >
                  <div className="absolute w-[396px] h-[396px] -top-[186px] left-1/2 -translate-x-1/2 bg-[rgba(140,221,255,0.1)] blur-[40px] rounded-full pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center gap-8">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-[#40C6FF]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col items-center gap-4 text-center">
                      <h4 className="text-2xl md:text-[30px] font-bold leading-[1.33] text-white">
                        {item.title}
                      </h4>
                      <p className="text-lg md:text-2xl leading-[1.33] text-white/80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-[#17171D] py-[72px] px-6">
        <div className="mx-auto max-w-[1200px] flex flex-col items-center gap-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-bold leading-none text-center bg-gradient-to-l from-[#8DBFC4] to-[#A7C1D7] bg-clip-text text-transparent"
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
                className="flex flex-col items-start p-10 gap-2 bg-[#111111] border border-black/5 rounded-3xl min-h-[200px]"
              >
                <div className="flex flex-col gap-[15px]">
                  <h4 className="text-xl md:text-[30px] font-bold leading-[1.33] bg-gradient-to-br from-white via-white to-[#C1C5C5] bg-clip-text text-transparent">
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
    <div className="bg-[#17171D]">
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight whitespace-pre-line bg-gradient-to-l from-[#8DBFC4] to-[#A7C1D7] bg-clip-text text-transparent">
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
                className="flex flex-col items-start p-10 gap-2 bg-[#111111] border border-black/5 rounded-3xl min-h-[200px]"
              >
                <h4 className="text-xl md:text-[30px] font-bold leading-[1.33] bg-gradient-to-br from-white via-white to-[#C1C5C5] bg-clip-text text-transparent">
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight bg-gradient-to-l from-[#8DBFC4] to-[#A7C1D7] bg-clip-text text-transparent">
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
                className="flex flex-col items-start p-10 gap-2 bg-[#111111] border border-black/5 rounded-3xl min-h-[200px]"
              >
                <h4 className="text-xl md:text-[30px] font-bold leading-[1.33] bg-gradient-to-br from-white via-white to-[#C1C5C5] bg-clip-text text-transparent">
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
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight bg-gradient-to-l from-[#8DBFC4] to-[#A7C1D7] bg-clip-text text-transparent">
              {t.products.platform.video.title}
            </h2>
            <div className="inline-block bg-white/10 px-6 py-3 rounded-lg border border-white/20 text-xl font-medium text-white/90">
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
                className="flex flex-col items-start p-10 gap-2 bg-[#111111] border border-black/5 rounded-3xl min-h-[200px] group hover:bg-white/5 transition-colors"
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
