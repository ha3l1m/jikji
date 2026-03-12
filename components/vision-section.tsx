'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';

export function VisionSection() {
  const { t } = useI18n();

  return (
    <section
      id="vision"
      className="relative pb-20 md:pb-32 overflow-hidden"
      style={{ background: '#0E0E10' }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.1]">
            {t.company.about.title}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-center text-sm md:text-base text-white/40 mb-14 max-w-xl mx-auto leading-relaxed"
        >
          {t.company.about.fullstack_desc}
        </motion.p>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative w-full"
        >
          <div className="w-full aspect-[3/2] rounded-2xl bg-white/5 border border-white/10" />
        </motion.div>
      </div>

      {/* subtle bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
