'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  FiTerminal,
  FiCpu,
  FiFile,
  FiDatabase,
} from 'react-icons/fi';
import { LuArrowDown } from 'react-icons/lu';
import { SiPytorch, SiTensorflow, SiNvidia } from 'react-icons/si';

export type AnimatedFeatureCardVariant = 'oneclick' | 'framework' | 'storage';

type Props = {
  variant: AnimatedFeatureCardVariant;
  cardTitle: string;
  cardDescription: string;
};

/* ── Card 1: 원클릭 GPU 대시보드 ── */
function DashboardMockAnimation({ isHovered }: { isHovered: boolean }) {
  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 0 0px rgba(139,92,246,0)',
    },
    hover: {
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 0 0px rgba(139,92,246,0)',
        '0 0 22px rgba(139,92,246,0.75)',
        '0 0 0px rgba(139,92,246,0)',
      ],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  const dropdownVariants = {
    closed: { scaleY: 0, opacity: 0, transformOrigin: 'top' },
    open: {
      scaleY: 1,
      opacity: 1,
      transformOrigin: 'top',
      transition: { duration: 0.2, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-1 relative">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.22) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Glass window */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-white/20"
        style={{
          background: 'rgba(13, 17, 23, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 52px rgba(0,0,0,0.5)',
        }}
      >
        {/* Titlebar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.08]"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <span className="size-[7px] rounded-full bg-[#FF5F57]" />
          <span className="size-[7px] rounded-full bg-[#FFBD2E]" />
          <span className="size-[7px] rounded-full bg-[#28C840]" />
          <span className="ml-2 text-[9px] font-medium tracking-wide text-white/40">
            Dashboard
          </span>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex">
          {/* Sidebar */}
          <div
            className="flex flex-col items-center gap-2.5 px-1.5 py-2.5 border-r border-white/[0.06]"
            style={{ minWidth: 28, background: 'rgba(255,255,255,0.015)' }}
          >
            <div className="w-3 h-0.5 rounded-full bg-white/25" />
            <div className="w-3 h-0.5 rounded-full bg-white/15" />
            <div className="w-3 h-0.5 rounded-full bg-white/15" />
            <div className="w-3 h-0.5 rounded-full bg-white/15" />
            <div className="mt-auto size-1.5 rounded-full bg-white/20" />
          </div>

          {/* Main content */}
          <div className="flex-1 px-2 pt-2 pb-2 flex flex-col gap-1.5 relative">
            {/* GPU Type */}
            <div
              className="relative flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-[9px] text-white/50">GPU Type</span>
              <div
                className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-white/10"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-[9px] text-white font-medium">A100</span>
                <span className="text-white/30 text-[7px] leading-none">▼</span>
              </div>

              {/* Dropdown (hover 시 열림) */}
              <motion.div
                variants={dropdownVariants}
                initial="closed"
                animate={isHovered ? 'open' : 'closed'}
                className="absolute right-2 z-10 rounded-lg overflow-hidden border border-white/15"
                style={{
                  top: 'calc(100% + 3px)',
                  minWidth: 72,
                  background: 'rgba(20, 24, 35, 0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1.5"
                  style={{ background: 'rgba(99,102,241,0.15)' }}
                >
                  <span className="size-1 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-[9px] text-white font-medium">A100</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5">
                  <span className="size-1 rounded-full bg-transparent shrink-0" />
                  <span className="text-[9px] text-white/50">H100</span>
                </div>
              </motion.div>
            </div>

            {/* Instance Count */}
            <div
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-[9px] text-white/50">Instance Count</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-[22px] h-3 rounded-full relative flex items-center px-0.5"
                  style={{ background: '#6366f1' }}
                >
                  <div className="size-2 rounded-full bg-white ml-auto" />
                </div>
                <span className="text-[9px] text-white/60 w-3">1</span>
              </div>
            </div>

            {/* Region */}
            <div
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-[9px] text-white/50">Region</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-[22px] h-3 rounded-full relative flex items-center px-0.5"
                  style={{ background: '#6366f1' }}
                >
                  <div className="size-2 rounded-full bg-white ml-auto" />
                </div>
                <span className="text-[9px] text-white/60 w-8 truncate">Region</span>
              </div>
            </div>

            {/* One-Click SSH Deployment button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              className="w-full mt-0.5 py-1.5 rounded-lg text-[9px] font-semibold text-white flex items-center justify-center gap-1.5"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              }}
            >
              <FiTerminal className="size-2.5 shrink-0" />
              <span>One-Click SSH Deployment</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card 2: 프레임워크 호환 ── */
function FrameworkAnimation({ isHovered }: { isHovered: boolean }) {
  const frameworks = [
    { Icon: SiPytorch, color: '#EE4C2C', x: -44, label: 'PT' },
    { Icon: SiTensorflow, color: '#FF6F00', x: 0, label: 'TF' },
    { Icon: SiNvidia, color: '#76B900', x: 44, label: 'CU' },
  ];

  const particleVariants = {
    initial: { opacity: 0, y: 0, x: 0 },
    hover: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: 72,
      x: -frameworks[i % frameworks.length].x * 0.6,
      transition: {
        duration: 1.8,
        repeat: Infinity,
        delay: i * 0.3,
        ease: 'easeOut' as const,
      },
    }),
  };

  const gpuLightVariants = {
    initial: { backgroundColor: '#d1d5db' },
    hover: {
      backgroundColor: ['#d1d5db', '#22c55e', '#d1d5db'],
      transition: { duration: 1.5, repeat: Infinity, delay: 1.2 },
    },
  };

  return (
    <div className="relative flex h-[170px] w-full flex-col items-center">
      <div className="flex w-full justify-around">
        {frameworks.map(({ Icon, color, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Icon style={{ color }} className="size-7" />
          </div>
        ))}
      </div>

      <LuArrowDown className="size-5 text-neutral-600 mt-2" />

      <div className="absolute bottom-0 flex flex-col items-center gap-2">
        <FiCpu className="size-10 text-neutral-400" />
        <motion.div
          className="h-2 w-2 rounded-full"
          variants={gpuLightVariants}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
        />
      </div>

      {frameworks.map(({ x }, fi) =>
        [0, 1].map((pi) => (
          <motion.div
            key={`${fi}-${pi}`}
            custom={fi * 2 + pi}
            variants={particleVariants}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            className="absolute size-1.5 rounded-full"
            style={{
              backgroundColor: frameworks[fi].color,
              left: `calc(50% + ${x}px)`,
              top: '2rem',
            }}
          />
        ))
      )}
    </div>
  );
}

/* ── Card 3: 파일 스토리지 ── */
function StorageAnimation({ isHovered }: { isHovered: boolean }) {
  const files = [
    { id: 1, x: -44 },
    { id: 2, x: 0 },
    { id: 3, x: 44 },
  ];

  const fileVariants = {
    initial: { opacity: 0, y: 0 },
    hover: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: 72,
      transition: {
        duration: 1.8,
        repeat: Infinity,
        delay: i * 0.4,
        ease: 'easeIn' as const,
      },
    }),
  };

  const fillVariants = {
    initial: { width: '0%' },
    hover: {
      width: ['0%', '100%', '0%'],
      transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  const dbLightVariants = {
    initial: { backgroundColor: '#d1d5db' },
    hover: {
      backgroundColor: ['#d1d5db', '#22c55e', '#22c55e', '#d1d5db'],
      transition: { duration: 2.4, repeat: Infinity },
    },
  };

  return (
    <div className="relative flex h-[170px] w-full flex-col items-center">
      <div className="flex w-full justify-around">
        {files.map((f) => (
          <FiFile key={f.id} className="size-7 text-neutral-400" />
        ))}
      </div>

      <LuArrowDown className="size-5 text-neutral-600 mt-2" />

      <div className="absolute bottom-0 flex flex-col items-center gap-2 w-full">
        <FiDatabase className="size-10 text-neutral-400" />
        <motion.div
          className="h-2 w-2 rounded-full"
          variants={dbLightVariants}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
        />
        <div className="w-20 h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-blue-400"
            variants={fillVariants}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
          />
        </div>
      </div>

      {files.map((f, fi) =>
        [0, 1].map((pi) => (
          <motion.div
            key={`${fi}-${pi}`}
            custom={fi + pi * 0.5}
            variants={fileVariants}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            className="absolute size-1.5 rounded-full bg-blue-400"
            style={{
              left: `calc(50% + ${f.x}px)`,
              top: '2rem',
            }}
          />
        ))
      )}
    </div>
  );
}

/* ── Main exported component ── */
export function AnimatedFeatureCard({ variant, cardTitle, cardDescription }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'flex flex-col',
        'h-[22.4rem] w-full overflow-hidden',
        'rounded-2xl border border-white/10 bg-white/5',
      )}
    >
      {/* Top: title + description */}
      <div className="px-6 pt-6 pb-5 border-b border-white/10 shrink-0 min-h-[120px]">
        <div className="text-base font-bold text-white">{cardTitle}</div>
        <div className="mt-1 text-sm leading-relaxed text-white/50">{cardDescription}</div>
      </div>

      {/* Bottom: animation area */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 300,
            height: 300,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(96,165,250,0.06) 0%, rgba(96,165,250,0.02) 50%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {variant === 'oneclick' && <DashboardMockAnimation isHovered={isHovered} />}
          {variant === 'framework' && <FrameworkAnimation isHovered={isHovered} />}
          {variant === 'storage' && <StorageAnimation isHovered={isHovered} />}
        </div>
      </div>
    </div>
  );
}
