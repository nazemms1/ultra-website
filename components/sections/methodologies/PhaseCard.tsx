"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import PhaseGlyph from "./PhaseGlyph";
import type { Phase } from "./data";

interface PhaseCardProps {
  phase: Phase;
  index: number;
  total: number;
  /** Whole-track scroll progress, 0 → 1. */
  progress: MotionValue<number>;
}

/**
 * A single phase card riding a circular carousel arc. `rel` is the card's signed
 * distance from the active centre (0 = centred, +1 = next/right, -1 = prev/left).
 * As scroll advances, `rel` decreases so cards sweep right → left along an arc
 * that also dips, scales and rotates them for a pseudo-3D wheel effect.
 */
export default function PhaseCard({
  phase,
  index,
  total,
  progress,
}: PhaseCardProps) {
  const rel = (p: number) => index - p * (total - 1);

  const x = useTransform(progress, (p) => rel(p) * 112);
  const y = useTransform(progress, (p) => Math.abs(rel(p)) * 38);
  const scale = useTransform(progress, (p) =>
    Math.max(0.7, 1 - Math.min(Math.abs(rel(p)), 2) * 0.16),
  );
  const rotateZ = useTransform(progress, (p) => rel(p) * 6);
  const rotateY = useTransform(progress, (p) => rel(p) * -18);
  const opacity = useTransform(progress, (p) => {
    const d = Math.abs(rel(p));
    return d > 1.85 ? 0 : Math.max(0, 1 - d * 0.55);
  });
  const zIndex = useTransform(progress, (p) =>
    Math.round(50 - Math.abs(rel(p)) * 10),
  );
  const pointerEvents = useTransform(progress, (p) =>
    Math.abs(rel(p)) < 0.5 ? "auto" : "none",
  );

  const transform = useMotionTemplate`translate(-50%, -50%) translateX(${x}%) translateY(${y}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[min(92vw,860px)] will-change-transform"
      style={{ transform, opacity, zIndex, pointerEvents }}
    >
      <PhaseCardContent phase={phase} />
    </motion.div>
  );
}

export function PhaseCardContent({ phase }: { phase: Phase }) {
  return (
    <article className="relative grid grid-cols-1 overflow-hidden rounded-[24px] shadow-[0_24px_63px_-16px_rgba(1,177,177,0.35)] backdrop-blur-md md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
      {/* Glass gradient skin + inset cyan border. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{
          backgroundImage:
            "linear-gradient(154deg, rgba(1,177,177,0.18) 0%, rgba(18,18,18,0.95) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(13,241,217,0.25)]"
      />

      {/* Left: holographic illustration + big number watermark. */}
      <div className="relative z-10 h-[230px] sm:h-[280px] md:h-auto md:min-h-[440px]">
        <PhaseGlyph Icon={phase.Icon} index={Number(phase.number) - 1} />
        <span
          className="pointer-events-none absolute bottom-5 left-6 select-none font-ethnocentric text-[68px] leading-none tracking-tight text-transparent sm:text-[88px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(13,241,217,0.95) 0%, rgba(13,241,217,0.1) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          {phase.number}
        </span>
      </div>

      {/* Right: phase meta, title, copy, chips. */}
      <div className="relative z-10 flex flex-col justify-center gap-4 p-7 sm:gap-5 sm:p-11">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="font-rajdhani text-[11px] tracking-[0.35em] text-accent">
            Phase {phase.number}
          </span>
        </div>

        <h3 className="font-ethnocentric text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl">
          {phase.title}
        </h3>

        <p className="max-w-[36ch] text-[15px] leading-relaxed text-white/[0.78]">
          {phase.description}
        </p>

        <div className="mt-1 flex flex-wrap gap-2.5">
          {phase.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/40 bg-accent/[0.06] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
