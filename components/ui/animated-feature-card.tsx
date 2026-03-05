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
    { id: 1, x: -70 },
    { id: 2, x: 0 },
    { id: 3, x: 70 },
  ];

  const particleVariants = {
    initial: { opacity: 0, y: 0 },
    hover: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: 80,
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
    initial: { backgroundColor: '#404040' },
    hover: (i: number) => ({
      backgroundColor: ['#404040', '#22c55e', '#404040'],
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
    <div className="relative flex h-full w-full flex-col items-center">
      <FiTerminal className="size-12 text-neutral-400" />
      <motion.div
        variants={clickVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        className="mt-2 text-xs font-mono text-[#40C6FF]/70 px-2 py-0.5 rounded border border-[#40C6FF]/30"
      >
        one-click
      </motion.div>
      <LuArrowDown className="size-6 text-neutral-600 mt-1" />

      <div className="absolute bottom-0 flex w-full justify-around">
        {containers.map((c, i) => (
          <div key={c.id} className="flex flex-col items-center gap-2">
            <FiPackage className="size-8 text-neutral-400" />
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
            className="absolute top-14 size-1.5 rounded-full bg-[#40C6FF]"
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Card 2: 프레임워크 호환 ── */
function FrameworkAnimation({ isHovered }: { isHovered: boolean }) {
  const frameworks = [
    { Icon: SiPytorch, color: '#EE4C2C', x: -70, label: 'PT' },
    { Icon: SiTensorflow, color: '#FF6F00', x: 0, label: 'TF' },
    { Icon: SiNvidia, color: '#76B900', x: 70, label: 'CU' },
  ];

  const particleVariants = {
    initial: { opacity: 0, y: 0, x: 0 },
    hover: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: 90,
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
    initial: { backgroundColor: '#404040' },
    hover: {
      backgroundColor: ['#404040', '#22c55e', '#404040'],
      transition: { duration: 1.5, repeat: Infinity, delay: 1.2 },
    },
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div className="flex w-full justify-around">
        {frameworks.map(({ Icon, color, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Icon style={{ color }} className="size-9" />
          </div>
        ))}
      </div>

      <LuArrowDown className="size-6 text-neutral-600 mt-2" />

      <div className="absolute bottom-0 flex flex-col items-center gap-2">
        <FiCpu className="size-12 text-neutral-400" />
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
              top: '2.5rem',
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
    { id: 1, x: -70 },
    { id: 2, x: 0 },
    { id: 3, x: 70 },
  ];

  const fileVariants = {
    initial: { opacity: 0, y: 0 },
    hover: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: 90,
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
    initial: { backgroundColor: '#404040' },
    hover: {
      backgroundColor: ['#404040', '#22c55e', '#22c55e', '#404040'],
      transition: { duration: 2.4, repeat: Infinity },
    },
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div className="flex w-full justify-around">
        {files.map((f) => (
          <FiFile key={f.id} className="size-9 text-neutral-400" />
        ))}
      </div>

      <LuArrowDown className="size-6 text-neutral-600 mt-2" />

      <div className="absolute bottom-0 flex flex-col items-center gap-2 w-full">
        <FiDatabase className="size-12 text-neutral-400" />
        <motion.div
          className="h-2 w-2 rounded-full"
          variants={dbLightVariants}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
        />
        <div className="w-24 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#40C6FF]"
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
            className="absolute size-1.5 rounded-full bg-[#40C6FF]"
            style={{
              left: `calc(50% + ${f.x}px)`,
              top: '2.5rem',
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
        'relative flex flex-col justify-between',
        'h-[28rem] w-full overflow-hidden',
        'rounded-2xl border border-white/10 bg-[#151C32]',
      )}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 300,
          height: 300,
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(140,221,255,0.08) 0%, rgba(140,221,255,0.02) 50%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      <div className="absolute inset-x-0 top-10 flex h-56 items-center justify-center px-6">
        {variant === 'oneclick' && <OneclickAnimation isHovered={isHovered} />}
        {variant === 'framework' && <FrameworkAnimation isHovered={isHovered} />}
        {variant === 'storage' && <StorageAnimation isHovered={isHovered} />}
      </div>

      <div className="absolute bottom-0 z-10 w-full px-6 pb-6">
        <div className="text-base font-bold text-white">{cardTitle}</div>
        <div className="mt-2 text-sm leading-relaxed text-white/70">{cardDescription}</div>
      </div>

      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#151C32] to-transparent" />
    </div>
  );
}
