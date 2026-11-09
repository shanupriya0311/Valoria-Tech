'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  Home,
  Settings,
  Terminal,
  FlaskConical,
  Rocket,
  MessageSquare,
  Sparkles,
  Layers,
  Activity,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GlassDockItem {
  icon: string | LucideIcon | React.ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface GlassDockProps {
  items: GlassDockItem[];
  className?: string;
  accentColor?: 'orange' | 'white';
}

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  settings: Settings,
  terminal: Terminal,
  flask: FlaskConical,
  rocket: Rocket,
  message: MessageSquare,
  sparkles: Sparkles,
  layers: Layers,
  activity: Activity,
  cpu: Cpu,
};

function DockIcon({
  item,
  mouseX,
  accentColor = 'orange',
}: {
  item: GlassDockItem;
  mouseX: MotionValue<number>;
  accentColor?: 'orange' | 'white';
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Apple WWDC fluid magnification: icons scale smoothly from 40px to 62px
  const widthSync = useTransform(distance, [-140, 0, 140], [42, 60, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 18 });

  const renderIcon = () => {
    if (typeof item.icon === 'string') {
      const LucideComponent = ICON_MAP[item.icon.toLowerCase()] || Sparkles;
      return <LucideComponent className="size-5" />;
    }
    if (React.isValidElement(item.icon)) {
      return item.icon;
    }
    if (typeof item.icon === 'function') {
      const Component = item.icon as LucideIcon;
      return <Component className="size-5" />;
    }
    return <Sparkles className="size-5" />;
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        'group relative flex items-center justify-center rounded-2xl transition-colors duration-200 cursor-pointer select-none',
        'bg-white/[0.06] hover:bg-white/[0.14] active:scale-95',
        'border border-white/[0.12] hover:border-orange-500/40',
        'shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2)]',
        item.active &&
          (accentColor === 'orange'
            ? 'bg-orange-500/15 border-orange-500/50 text-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.35)]'
            : 'bg-white/20 border-white/40 text-white shadow-[0_0_16px_rgba(255,255,255,0.3)]')
      )}
    >
      <div className="text-neutral-200 group-hover:text-white transition-colors duration-150">
        {renderIcon()}
      </div>

      {/* Apple Tooltip on hover */}
      <span className="pointer-events-none absolute -top-9 rounded-md bg-[#16161b]/90 border border-white/10 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-150 group-hover:-top-10 group-hover:opacity-100 whitespace-nowrap z-30 font-sans">
        {item.title}
      </span>

      {/* Active Dot indicator below */}
      {item.active && (
        <span
          className={cn(
            'absolute -bottom-1.5 size-1 rounded-full',
            accentColor === 'orange'
              ? 'bg-orange-400 shadow-[0_0_6px_#f97316]'
              : 'bg-white shadow-[0_0_6px_#ffffff]'
          )}
        />
      )}
    </motion.div>
  );

  if (item.href) {
    return (
      <Link href={item.href} onClick={item.onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={item.onClick} className="outline-none">
      {content}
    </button>
  );
}

export function GlassDock({
  items,
  className,
  accentColor = 'orange',
}: GlassDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'relative flex items-center gap-3 rounded-3xl p-2.5',
        'bg-[#101014]/80 backdrop-blur-2xl',
        'border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.22)]',
        className
      )}
    >
      {/* Specular Rim Light across top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      {items.map((item, idx) => (
        <DockIcon
          key={`${item.title}-${idx}`}
          item={item}
          mouseX={mouseX}
          accentColor={accentColor}
        />
      ))}
    </motion.div>
  );
}

export function GlassDockDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <GlassDock
        items={[
          { icon: 'home', title: 'Home', href: '/' },
          { icon: 'settings', title: 'Settings', href: '/settings' },
        ]}
      />
    </div>
  );
}

