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
    <section id="products" className="relative bg-white">
      {/* ── Sticky Tab Bar ── */}
      <div className="sticky top-16 z-40 flex justify-center py-6 bg-white/80 backdrop-blur-md">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-white/0 to-transparent pointer-events-none" />

        <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => handleTabClick('gpucloud')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'gpucloud'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            GPU Cloud
          </button>
          <button
            onClick={() => handleTabClick('platform')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'platform'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
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
      <div className="bg-white pt-8 pb-6">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h3 className="text-3xl md:text-[48px] font-bold leading-none text-center text-gray-900">
              {t.products.gpucloud.oneclick.title}
            </h3>
            <p className="text-base md:text-lg text-gray-500 text-center">
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
      <div className="bg-white py-[72px] px-6">
        <div className="mx-auto max-w-[1200px] flex flex-col items-center gap-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-[36px] font-bold leading-none text-center text-gray-900"
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
                className="flex flex-col items-start p-6 gap-2 bg-gray-50 border border-gray-200 rounded-2xl"
              >
                <div className="flex flex-col gap-[15px]">
                  <h4 className="text-base md:text-xl font-bold leading-[1.33] text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-base leading-[1.4] text-gray-600">
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* AI Inference Platform */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-gray-600 mb-6">
              AI INFERENCE
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight whitespace-pre-line text-gray-900">
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
                className="flex flex-col items-start p-6 gap-2 bg-gray-50 border border-gray-200 rounded-2xl"
              >
                <h4 className="text-base md:text-xl font-bold leading-[1.33] text-gray-900">
                  {item.title}
                </h4>
                <p className="text-base leading-[1.4] text-gray-600 mt-2">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-gray-600 mb-6">
              CHAT AGENT
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-gray-900">
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
                className="flex flex-col items-start p-6 gap-2 bg-gray-50 border border-gray-200 rounded-2xl"
              >
                <h4 className="text-base md:text-xl font-bold leading-[1.33] text-gray-900">
                  {item.title}
                </h4>
                <p className="text-base leading-[1.4] text-gray-600 mt-2">
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
            <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-gray-900">
              {t.products.platform.video.title}
            </h2>
            <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg border border-gray-200 text-base font-medium text-gray-700">
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
                className="flex flex-col items-start p-6 gap-2 bg-gray-50 border border-gray-200 rounded-2xl group hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h4>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                </div>
                <p className="text-base leading-[1.4] text-gray-600 whitespace-pre-line font-medium">
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
