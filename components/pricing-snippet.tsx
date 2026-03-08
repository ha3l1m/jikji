'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from './i18n-provider';

export function PricingSnippet() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'b200' | 'h200' | 'h100' | 'rtx'>('b200');

  const tabs = [
    { id: 'b200' as const, label: t.pricing_page.tabs.b200 },
    { id: 'h200' as const, label: t.pricing_page.tabs.h200 },
    { id: 'h100' as const, label: t.pricing_page.tabs.h100 },
    { id: 'rtx' as const, label: t.pricing_page.tabs.rtx },
  ];

  const rows = t.pricing_page.table[activeTab];
  const headers = t.pricing_page.table.headers;

  return (
    <section id="pricing" className="py-24 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-gray-900"
          >
            {t.pricing_page.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-light"
          >
            {t.pricing_page.subtitle}
          </motion.p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
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
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {headers.map((h, i) => (
                      <th key={i} className={`px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap${i >= 3 ? ' text-right' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 whitespace-nowrap">{row.name}</td>
                      <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">{row.vram}</td>
                      <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">{row.vcpu}</td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-mono whitespace-nowrap text-right">{row.ondemand}</td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-mono whitespace-nowrap text-right">{row['1month']}</td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-mono whitespace-nowrap text-right">{row['1year']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Notes */}
        <div className="mt-8 space-y-2">
          {t.pricing_page.notes.map((note, idx) => (
            <p key={idx} className="text-sm text-gray-400">* {note}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
