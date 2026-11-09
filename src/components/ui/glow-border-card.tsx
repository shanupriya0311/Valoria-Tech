'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  aspectRatio?: string;
  borderRadius?: string;
  animationDuration?: number;
  gradientColors?: string[];
  borderWidth?: string;
  blurAmount?: string;
  inset?: string;
  colorPreset?: 'nature' | 'ocean' | 'sunset' | 'aurora' | 'custom';
  paused?: boolean;
}

const colorPresets: Record<NonNullable<GlowBorderCardProps['colorPreset']>, string[]> = {
  nature: ['#669900', '#88bb22', '#99cc33', '#aaddaa', '#ccee66', '#006699', '#228888', '#3399cc', '#55aacc', '#669900'],
  ocean: ['#006699', '#1177aa', '#2288bb', '#3399cc', '#44aadd', '#55bbee', '#66ccff', '#44bbee', '#2299cc', '#006699'],
  sunset: ['#ff6600', '#ff7711', '#ff8822', '#ff9900', '#ffaa22', '#ffbb44', '#ffcc00', '#ff9933', '#ff7722', '#ff6600'],
  aurora: ['#00ff87', '#22ffaa', '#44ffcc', '#60efff', '#88ddff', '#bb99ff', '#dd77ee', '#ff68f0', '#ff55cc', '#00ff87'],
  custom: ['#669900', '#99cc33', '#ccee66', '#006699', '#3399cc', '#990066', '#cc3399', '#ff6600', '#ff9900', '#ffcc00'],
};

export const GlowBorderCard = React.forwardRef<HTMLDivElement, GlowBorderCardProps>(
  (
    {
      children,
      className,
      width = '320px',
      height,
      aspectRatio = '1',
      borderRadius = '0.75rem',
      animationDuration = 4,
      gradientColors,
      borderWidth = '2px',
      blurAmount = '12px',
      inset = '-1em',
      colorPreset = 'custom',
      paused = false,
      style,
      ...props
    },
    ref,
  ) => {
    const colors = gradientColors ?? colorPresets[colorPreset];
    const colorVars = Object.fromEntries(
      Array.from({ length: 10 }, (_, index) => [
        `--glow-color-${index + 1}`,
        colors[index % colors.length]!,
      ]),
    ) as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          'glow-border-card relative isolate grid place-content-center overflow-visible bg-neutral-950/90 backdrop-blur-md',
          paused && 'glow-border-card-paused',
          className,
        )}
        style={{
          width,
          height: height ?? 'auto',
          aspectRatio: height ? 'unset' : aspectRatio,
          borderRadius,
          '--glow-animation-duration': `${animationDuration}s`,
          '--glow-border-width': borderWidth,
          '--glow-blur-amount': blurAmount,
          '--glow-inset': inset,
          ...colorVars,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <div className="relative z-10 flex w-full items-center justify-center p-4">
          {children}
        </div>
      </div>
    );
  },
);

GlowBorderCard.displayName = 'GlowBorderCard';

export default GlowBorderCard;
