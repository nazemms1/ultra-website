"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface TimelineProps {
  labels: string[];
  /** Whole-track scroll progress, 0 → 1. */
  progress: MotionValue<number>;
  /** Smoothly scroll the window to a given phase index. */
  onSeek: (index: number) => void;
}

export default function Timeline({ labels, progress, onSeek }: TimelineProps) {
  const total = labels.length;
  const fillWidth = useMotionTemplate`${useTransform(progress, (p) => p * 100)}%`;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-2">
      <div className="flex items-center justify-between">
        <span className="font-rajdhani text-[11px] tracking-[0.25em] text-white/50">
          Scroll to advance
        </span>
        <span className="font-rajdhani text-[11px] tracking-[0.25em] text-white/50">
          {total} Phases
        </span>
      </div>

      {/* Progress rail. */}
      <div className="relative mt-3 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-accent shadow-[0_0_10px_rgba(13,241,217,0.7)]"
          style={{ width: fillWidth }}
        />
      </div>

      {/* Dots + labels. */}
      <div className="mt-3 flex items-start justify-between">
        {labels.map((label, i) => (
          <TimelineTick
            key={label}
            label={label}
            index={i}
            total={total}
            progress={progress}
            onSeek={onSeek}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineTick({
  label,
  index,
  total,
  progress,
  onSeek,
}: {
  label: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onSeek: (index: number) => void;
}) {
  const dist = useTransform(progress, (p) =>
    Math.abs(index - p * (total - 1)),
  );
  const opacity = useTransform(dist, (d) => 0.35 + 0.65 * Math.max(0, 1 - d));
  const dotScale = useTransform(dist, (d) => 1 + 0.35 * Math.max(0, 1 - d));
  const glow = useTransform(dist, (d) =>
    d < 0.5 ? "0 0 12px 2px rgba(13,241,217,0.7)" : "0 0 0 rgba(13,241,217,0)",
  );

  return (
    <motion.button
      type="button"
      onClick={() => onSeek(index)}
      style={{ opacity }}
      className="group flex shrink-0 cursor-pointer flex-col items-center gap-2 outline-none"
      aria-label={`Go to ${label} phase`}
    >
      <motion.span
        className="block h-2.5 w-2.5 rounded-full bg-accent"
        style={{ scale: dotScale, boxShadow: glow }}
      />
      <span className="font-rajdhani text-[11px] tracking-[0.18em] text-white transition-colors group-hover:text-accent">
        {label}
      </span>
    </motion.button>
  );
}
