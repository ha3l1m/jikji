'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';

export function CTABanner() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-20 bg-[#01071B] border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          {t.hero.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-white/50 max-w-xl mx-auto mb-10 font-light"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Animated border CTA — same style as infrastructure page */}
          <div className="relative inline-flex rounded-full p-[1px] overflow-hidden">
            <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E1E3EE_0%,#5572E2_50%,#E1E3EE_100%)]" />
            <a
              href="mailto:business@jikji.ai"
              className="relative z-10 inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all bg-zinc-950 bg-gradient-to-tr from-zinc-300/5 via-[#5572E2]/20 to-transparent hover:from-zinc-300/10 hover:via-[#5572E2]/30"
            >
              {t.hero.cta_primary}
            </a>
          </div>

          <a
            href="#products"
            onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium text-sm transition-colors"
          >
            {t.hero.cta_secondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
