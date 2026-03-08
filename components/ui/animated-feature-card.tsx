'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  FiTerminal,
  FiCpu,
  FiFile,
  FiUploadCloud,
} from 'react-icons/fi';
import { SiPytorch, SiTensorflow, SiNvidia } from 'react-icons/si';

export type AnimatedFeatureCardVariant = 'oneclick' | 'framework' | 'storage';

type Props = {
  variant: AnimatedFeatureCardVariant;
  cardTitle: string;
  cardDescription: string;
};

/* ── Card 1: 원클릭 GPU 대시보드 ── */
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

function DashboardMockAnimation({ isHovered }: { isHovered: boolean }) {
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
const frameworkLaunchButtonVariants = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0px rgba(34,197,94,0)',
  },
  hover: {
    scale: [1, 1.02, 1],
    boxShadow: [
      '0 0 0px rgba(34,197,94,0)',
      '0 0 22px rgba(34,197,94,0.75)',
      '0 0 0px rgba(34,197,94,0)',
    ],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const frameworkStatusVariants = {
  initial: { backgroundColor: '#4b5563' },
  hover: (i: number) => ({
    backgroundColor: ['#4b5563', '#22c55e', '#22c55e'],
    transition: { duration: 0.4, delay: i * 0.35, ease: 'easeOut' as const },
  }),
};

function FrameworkAnimation({ isHovered }: { isHovered: boolean }) {
  const frameworks = [
    { Icon: SiPytorch, color: '#EE4C2C', name: 'PyTorch' },
    { Icon: SiTensorflow, color: '#FF6F00', name: 'TensorFlow' },
    { Icon: SiNvidia, color: '#76B900', name: 'CUDA 12.1' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center py-1 relative">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,197,94,0.18) 0%, transparent 70%)',
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
            Runtime Config
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
            <div className="mt-auto size-1.5 rounded-full bg-white/20" />
          </div>

          {/* Main content */}
          <div className="flex-1 px-2 pt-2 pb-2 flex flex-col gap-1.5">
            {frameworks.map(({ Icon, color, name }, i) => (
              <div
                key={name}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-1.5">
                  <Icon style={{ color }} className="size-3 shrink-0" />
                  <span className="text-[9px] text-white/70">{name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <motion.div
                    className="size-1.5 rounded-full"
                    variants={frameworkStatusVariants}
                    initial="initial"
                    animate={isHovered ? 'hover' : 'initial'}
                    custom={i}
                  />
                  <span className="text-[8px] text-white/40">Ready</span>
                </div>
              </div>
            ))}

            {/* Launch button */}
            <motion.div
              variants={frameworkLaunchButtonVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              className="w-full mt-0.5 py-1.5 rounded-lg text-[9px] font-semibold text-white flex items-center justify-center gap-1.5"
              style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
              }}
            >
              <FiCpu className="size-2.5 shrink-0" />
              <span>Initialize Runtime</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card 3: 파일 스토리지 ── */
const storageSyncButtonVariants = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0px rgba(96,165,250,0)',
  },
  hover: {
    scale: [1, 1.02, 1],
    boxShadow: [
      '0 0 0px rgba(96,165,250,0)',
      '0 0 22px rgba(96,165,250,0.75)',
      '0 0 0px rgba(96,165,250,0)',
    ],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const storageFillVariants = {
  initial: { width: '32%' },
  hover: {
    width: ['32%', '68%', '32%'],
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

function StorageAnimation({ isHovered }: { isHovered: boolean }) {
  const files = [
    { name: 'model.pt', size: '2.3 GB', syncing: false },
    { name: 'dataset.pkl', size: '800 MB', syncing: true },
    { name: 'config.yaml', size: '4 KB', syncing: false },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center py-1 relative">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(96,165,250,0.18) 0%, transparent 70%)',
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
            File Storage
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
            <div className="mt-auto size-1.5 rounded-full bg-white/20" />
          </div>

          {/* Main content */}
          <div className="flex-1 px-2 pt-2 pb-2 flex flex-col gap-1.5">
            {/* Storage usage bar */}
            <div
              className="px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-[8px] text-white/40">Storage</span>
                <span className="text-[8px] text-white/60">3.1 / 10 TB</span>
              </div>
              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-blue-400"
                  variants={storageFillVariants}
                  initial="initial"
                  animate={isHovered ? 'hover' : 'initial'}
                />
              </div>
            </div>

            {/* File list */}
            {files.map(({ name, size, syncing }, i) => (
              <div
                key={name}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-1.5">
                  <FiFile className="size-2.5 text-white/40 shrink-0" />
                  <span className="text-[9px] text-white/70 truncate max-w-[60px]">{name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <motion.div
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: syncing ? '#facc15' : '#22c55e' }}
                    animate={
                      isHovered && syncing
                        ? { opacity: [0.4, 1, 0.4], transition: { duration: 0.9, repeat: Infinity } }
                        : { opacity: 1 }
                    }
                  />
                  <span className="text-[8px] text-white/40">{size}</span>
                </div>
              </div>
            ))}

            {/* Sync button */}
            <motion.div
              variants={storageSyncButtonVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              className="w-full mt-0.5 py-1.5 rounded-lg text-[9px] font-semibold text-white flex items-center justify-center gap-1.5"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
              }}
            >
              <FiUploadCloud className="size-2.5 shrink-0" />
              <span>Sync to Storage</span>
            </motion.div>
          </div>
        </div>
      </div>
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
      <div className="px-6 pt-6 pb-5 border-b border-white/10 shrink-0">
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
