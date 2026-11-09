'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiquidMetal } from '@/components/ui/liquid-metal';

export interface SaveButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  onSave?: () => Promise<void> | void;
  idleText?: string;
  loadingText?: string;
  savedText?: string;
  resetDelay?: number;
  className?: string;
}

const SPRING_PHYSICS = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 22,
};

export function SaveButton({
  onSave,
  idleText = 'Apply for Internship',
  loadingText = 'Submitting Application…',
  savedText = 'Application Submitted!',
  resetDelay = 2400,
  className,
  disabled,
  onClick,
  ...props
}: SaveButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'saved'>('idle');

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status !== 'idle' || disabled) return;
    onClick?.(e);
    setStatus('loading');
    try {
      if (onSave) {
        await onSave();
      } else {
        // Simulated network delay
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setStatus('saved');
      setTimeout(() => {
        setStatus('idle');
      }, resetDelay);
    } catch {
      setStatus('idle');
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={{
        scale: 1.045,
        y: -3,
        filter:
          status === 'saved'
            ? 'drop-shadow(0 14px 28px rgba(16, 185, 129, 0.35))'
            : 'drop-shadow(0 14px 28px rgba(147, 197, 253, 0.28))',
      }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_PHYSICS}
      onClick={handleClick}
      disabled={status !== 'idle' || disabled}
      className={cn(
        'relative group cursor-pointer border-none bg-transparent p-0 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {/* Outer Shell with Liquid Metal Border */}
      <div
        className="relative rounded-full overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]"
        style={{ padding: 4 }}
      >
        {/* Liquid Metal Shader Border Layer */}
        <LiquidMetal
          colorBack={status === 'saved' ? '#10b981' : '#3b82f6'}
          colorTint={status === 'saved' ? '#6ee7b7' : '#93c5fd'}
          speed={status === 'loading' ? 0.9 : 0.45}
          repetition={4}
          distortion={0.15}
          scale={1}
          className="absolute inset-0 z-0 rounded-full"
        />

        {/* Inner Button Body matching Home Page Button */}
        <div
          className={cn(
            'relative z-10 flex items-center gap-4 rounded-full py-3 pl-3 pr-8 transition-[background-color,transform] duration-300 min-w-[270px] sm:min-w-[300px]',
            status === 'saved'
              ? 'bg-[#061e16]'
              : 'bg-black'
          )}
        >
          {/* Circular Icon Container matching Home Page Pill Icon */}
          <div
            className={cn(
              'size-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
              status === 'saved'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.4)]'
                : status === 'loading'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-neutral-800 text-white border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] group-hover:bg-neutral-700'
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {status === 'idle' && (
                <motion.span
                  key="idle-icon"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center justify-center"
                >
                  <ArrowRight className="size-4 text-white stroke-[2.2]" />
                </motion.span>
              )}

              {status === 'loading' && (
                <motion.span
                  key="loading-icon"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center justify-center"
                >
                  <Loader2 className="size-4 animate-spin text-sky-400" />
                </motion.span>
              )}

              {status === 'saved' && (
                <motion.span
                  key="saved-icon"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center justify-center"
                >
                  <Check className="size-4 text-emerald-400 stroke-[2.8]" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Label with Gaussian Deblur Transition */}
          <div className="flex-1 text-left overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={status}
                initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'block text-base sm:text-[17px] font-medium tracking-tight whitespace-nowrap',
                  status === 'saved' ? 'text-emerald-300' : 'text-white'
                )}
              >
                {status === 'idle'
                  ? idleText
                  : status === 'loading'
                  ? loadingText
                  : savedText}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default SaveButton;
