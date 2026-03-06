'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  FiTerminal,
  FiPackage,
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

/* ── Card 1: 원클릭 개발 환경 ── */
function OneclickAnimation({ isHovered }: { isHovered: boolean }) {
  const containers = [
    { id: 1, x: -44 },
    { id: 2, x: 0 },
    { id: 3, x: 44 },
  ];

  const particleVariants = {
    initial: { opacity: 0, y: 0 },
    hover: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: 64,
      x: containers[i % containers.length].x,
      transition: {
        duration: 1.8,
        repeat: Infinity,
        delay: i * 0.35,
        ease: 'easeOut' as const,
      },
    }),
  };

  const lightVariants = {
    initial: { backgroundColor: '#d1d5db' },
    hover: (i: number) => ({
      backgroundColor: ['#d1d5db', '#22c55e', '#d1d5db'],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        delay: i * 0.35 + 1.0,
      },
    }),
  };

  const clickVariants = {
    initial: { scale: 1, opacity: 0.4 },
    hover: {
      scale: [1, 0.85, 1],
      opacity: [0.4, 1, 0.4],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  return (
    <div className="relative flex h-[170px] w-full flex-col items-center">
      <FiTerminal className="size-10 text-neutral-400" />
      <motion.div
        variants={clickVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        className="mt-2 text-xs font-mono text-blue-400 px-2 py-0.5 rounded border border-blue-200"
      >
        one-click
      </motion.div>
      <LuArrowDown className="size-5 text-neutral-600 mt-1" />

      <div className="absolute bottom-0 flex w-full justify-around">
        {containers.map((c, i) => (
          <div key={c.id} className="flex flex-col items-center gap-2">
            <FiPackage className="size-6 text-neutral-400" />
            <motion.div
              className="h-2 w-2 rounded-full"
              variants={lightVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              custom={i}
            />
          </div>
        ))}
      </div>

      <motion.div
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            className="absolute top-11 size-1.5 rounded-full bg-blue-400"
          />
        ))}
      </motion.div>
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
        'rounded-2xl border border-gray-200 bg-gray-50',
      )}
    >
      {/* Top: title + description */}
      <div className="px-6 pt-6 pb-5 border-b border-gray-200 shrink-0 min-h-[120px]">
        <div className="text-base font-bold text-gray-900">{cardTitle}</div>
        <div className="mt-1 text-sm leading-relaxed text-gray-500">{cardDescription}</div>
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
          {variant === 'oneclick' && <OneclickAnimation isHovered={isHovered} />}
          {variant === 'framework' && <FrameworkAnimation isHovered={isHovered} />}
          {variant === 'storage' && <StorageAnimation isHovered={isHovered} />}
        </div>
      </div>
    </div>
  );
}
