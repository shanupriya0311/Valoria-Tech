'use client';

import React, { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  'aria-label'?: string;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 1,
  step = 0.01,
  className,
  'aria-label': ariaLabel = 'Slider',
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentVal = value[0] ?? min;
  const percentage = Math.max(0, Math.min(100, ((currentVal - min) / (max - min)) * 100));

  const updateFromPointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const rawFrac = (clientX - rect.left) / rect.width;
      const clampedFrac = Math.max(0, Math.min(1, rawFrac));
      const rawVal = min + clampedFrac * (max - min);
      const steppedVal = Math.round(rawVal / step) * step;
      const finalVal = Math.max(min, Math.min(max, Number(steppedVal.toFixed(4))));
      onValueChange([finalVal]);
    },
    [min, max, step, onValueChange]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      updateFromPointer(e.clientX);
    }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentVal}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={cn(
        'relative flex w-full touch-none select-none items-center py-1.5 cursor-pointer group',
        className
      )}
    >
      {/* Background Track */}
      <div className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
        {/* Filled Progress Track */}
        <div
          className="h-full bg-white rounded-full transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Thumb Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 size-4 -ml-2 rounded-full border-2 border-black/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-transform duration-75 group-hover:scale-110 active:scale-95"
        style={{ left: `${percentage}%` }}
      />
    </div>
  );
}

