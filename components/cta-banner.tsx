'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';
import Link from 'next/link';

export function CTABanner() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-24 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
            {t.cta_banner.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-500 font-light mb-10">
            {t.cta_banner.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/support"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#5572E2] text-white font-semibold text-base hover:bg-[#4461d1] transition-colors"
            >
              {t.cta_banner.btn_free}
            </Link>
            <a
              href="mailto:business@jikji.ai"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl border-2 border-gray-900 text-gray-900 font-semibold text-base hover:bg-gray-50 transition-colors"
            >
              {t.cta_banner.btn_inquiry}
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">
            {t.cta_banner.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
