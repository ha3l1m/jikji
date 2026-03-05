'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from './i18n-provider';
import { SectionHeader } from './section-header';
import { Mail } from 'lucide-react';

export function PricingSnippet() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'b200' | 'h200' | 'rtx'>('b200');

  const tabs = [
    { id: 'b200' as const, label: t.pricing_page.tabs.b200 },
    { id: 'h200' as const, label: t.pricing_page.tabs.h200 },
    { id: 'rtx' as const, label: t.pricing_page.tabs.rtx },
  ];

  const rows = t.pricing_page.table[activeTab];
  const headers = t.pricing_page.table.headers;

  return (
    <section id="pricing" className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#5EA5EA]/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionHeader
          title={t.pricing_page.title}
          subtitle={t.pricing_page.subtitle}
        />

        {/* Tab selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#111] p-1 rounded-xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    {headers.map((h, i) => (
                      <th key={i} className="px-6 py-4 text-sm font-medium text-white/60 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-white whitespace-nowrap">{row.name}</td>
                      <td className="px-6 py-5 text-sm text-white/60 whitespace-nowrap">{row.vram}</td>
                      <td className="px-6 py-5 text-sm text-white/60 whitespace-nowrap">{row.vcpu}</td>
                      <td className="px-6 py-5 text-sm text-white/90 font-mono whitespace-nowrap">{row.ondemand}</td>
                      <td className="px-6 py-5 text-sm text-white/90 font-mono whitespace-nowrap">{row['1month']}</td>
                      <td className="px-6 py-5 text-sm text-white/90 font-mono whitespace-nowrap">{row['1year']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mb-14" />

        {/* Consulting CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#5EA5EA]/15 to-[#8B5CF6]/15 border border-[#5EA5EA]/20 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {t.pricing_page.consulting.title}
          </h3>
          <p className="text-lg text-white/80 mb-2 font-medium">
            {t.pricing_page.consulting.desc1}
          </p>
          <p className="text-white/60 mb-8 whitespace-pre-line leading-relaxed">
            {t.pricing_page.consulting.desc2}
          </p>
          <a
            href="mailto:business@jikji.ai"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#5EA5EA]" />
            {t.pricing_page.consulting.contact}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
