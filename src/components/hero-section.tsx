'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Gem,
  ShieldCheck,
  Eye,
  Headset,
} from 'lucide-react';
import { useIntroDone, EASE_OUT } from './intro-provider';
import { AnimatedHeadline } from './animated-headline';
import { LiquidMetalButton } from '@/components/ui/liquid-metal';

export function HeroSection() {
  const done = useIntroDone();

  const rise = (index: number) => ({
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: done
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 20, filter: 'blur(10px)' },
    transition: {
      duration: 0.7,
      ease: EASE_OUT,
      delay: 0.7 + index * 0.1,
    },
  });

  return (
    <section id="home" className="relative flex flex-col items-center px-6 pt-36 pb-24 text-center md:pt-44 overflow-hidden">
      {/* Ambient background blurred spheres */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-foreground/[0.04] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 size-[450px] rounded-full bg-white/[0.02] blur-3xl"
      />

      {/* Ethereal glowing horizon curves matching reference style */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[340px] sm:top-[360px] left-1/2 -translate-x-1/2 w-[1800px] h-[700px] rounded-[100%] border-t border-white/[0.18] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent shadow-[0_-15px_60px_rgba(200,190,255,0.08)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[410px] sm:top-[430px] left-1/2 -translate-x-1/2 w-[1500px] h-[600px] rounded-[100%] border-t border-white/[0.08]"
      />

      {/* 1. Animated Headline with Blur Cascade & Rotating Text Ticker */}
      <AnimatedHeadline />

      {/* 2. Subtitle Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={
          done
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 18, filter: 'blur(10px)' }
        }
        transition={{
          duration: 0.75,
          ease: EASE_OUT,
          delay: 0.55,
        }}
        className="z-10 mt-6 max-w-[680px] text-base sm:text-lg md:text-[19px] text-muted-foreground/90 font-normal leading-relaxed text-balance text-center"
      >
        We connect <span className="text-foreground/95 font-medium">data</span>,{' '}
        <span className="text-foreground/95 font-medium">AI models</span>, and{' '}
        <span className="text-foreground/95 font-medium">business workflows</span> to deliver
        smarter insights and practical solutions built around your goals.
      </motion.p>

      {/* 3. Action Buttons */}
      <motion.div
        {...rise(1)}
        className="z-10 mt-8 flex w-full flex-col items-center"
      >
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-8 w-full">
          <motion.div
            whileHover={{ scale: 1.045, y: -4, filter: 'drop-shadow(0 12px 20px rgba(147, 197, 253, 0.2))' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          >
            <LiquidMetalButton
              type="button"
              size="lg"
              className="min-w-[280px] justify-center"
              icon={<ArrowRight className="size-4" />}
              metalConfig={{
                colorBack: '#3b82f6',
                colorTint: '#93c5fd',
              }}
              onClick={() =>
                document.getElementById('console')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Discover what we deliver
            </LiquidMetalButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.045, y: -4, filter: 'drop-shadow(0 12px 20px rgba(147, 197, 253, 0.2))' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          >
            <LiquidMetalButton
              type="button"
              size="lg"
              className="min-w-[240px] justify-center"
              metalConfig={{
                colorBack: '#3b82f6',
                colorTint: '#93c5fd',
              }}
              onClick={() =>
                document.getElementById('primitives')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Browse Primitives
            </LiquidMetalButton>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. Ecosystem & Performance Badges */}
      <motion.div
        {...rise(2)}
        className="z-10 mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
      >
        <span className="flex items-center gap-2">
          <Gem className="size-3.5 text-violet-300" />
          Product Excellence
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-emerald-400" />
          Data Security &amp; Privacy
        </span>
        <span className="flex items-center gap-2">
          <Eye className="size-3.5 text-sky-300" />
          Transparency &amp; Reliability
        </span>
        <span className="flex items-center gap-2">
          <Headset className="size-3.5 text-amber-300" />
          Post-delivery Support
        </span>
      </motion.div>

    </section>
  );
}
