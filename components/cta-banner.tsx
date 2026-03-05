'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';

export function CTABanner() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-16 bg-[#01071B]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Card gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111d52] via-[#0c1440] to-[#090e2c]" />

          {/* Blue radial glow – top-right */}
          <div className="absolute right-0 top-0 w-3/4 h-full bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(85,114,226,0.28)_0%,transparent_70%)]" />

          {/* Warm purple glow – bottom-left accent */}
          <div className="absolute left-0 bottom-0 w-1/2 h-2/3 bg-[radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(120,80,220,0.12)_0%,transparent_70%)]" />

          {/* Subtle border ring */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/[0.07]" />

          {/* Decorative dots grid – top-right corner */}
          <div
            className="absolute right-10 top-8 w-40 h-32 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10 px-10 py-14 md:px-16 md:py-16">
            {/* Left: text */}
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-widest text-[#5572E2]/80 uppercase mb-4">
                Enterprise
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-snug">
                {t.pricing_page.consulting.title}
              </h2>
              <p className="text-base text-white/50 font-light leading-relaxed">
                {t.pricing_page.consulting.desc1}
              </p>
            </div>

            {/* Right: CTA button */}
            <div className="shrink-0">
              <a
                href="mailto:business@jikji.ai"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#0c1440] font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg shadow-[#5572E2]/10"
              >
                {t.company.promotion.btn_inquiry}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
