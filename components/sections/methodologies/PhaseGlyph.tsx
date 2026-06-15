"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhaseGlyphProps {
  Icon: LucideIcon;
  /** Phase index — used to vary the floating wireframe debris per phase. */
  index: number;
  className?: string;
}

/**
 * A self-contained, holographic isometric illustration: an animated perspective
 * grid floor, ambient cyan bloom, concentric rings and a glowing central glyph.
 * Pure CSS/SVG so the section renders out-of-the-box with no asset dependency.
 */
export default function PhaseGlyph({ Icon, index, className }: PhaseGlyphProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {/* Ambient bloom behind the glyph. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(13,241,217,0.22)_0%,rgba(13,241,217,0.05)_45%,transparent_70%)] blur-[6px]" />

      {/* Isometric grid floor. */}
      <div
        className="pointer-events-none absolute bottom-[14%] left-1/2 h-[58%] w-[86%] -translate-x-1/2 opacity-70 [transform:perspective(560px)_rotateX(64deg)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,241,217,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(13,241,217,0.28) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 72%)",
        }}
      />

      {/* Floating wireframe debris — varies subtly per phase. */}
      <FloatingShape
        className="left-[14%] top-[20%] h-9 w-9 rounded-[10px] border animate-float"
        rotate={index * 12 + 18}
      />
      <FloatingShape
        className="right-[16%] top-[26%] h-6 w-6 rounded-md border animate-float-slow"
        rotate={-index * 16 - 10}
      />
      <FloatingShape
        className="bottom-[24%] right-[20%] h-7 w-7 rounded-lg border animate-float"
        rotate={index * 20 + 30}
      />

      {/* Central glyph with concentric rings. */}
      <div className="relative flex h-[132px] w-[132px] items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-accent/25" />
        <span className="absolute inset-[16px] rounded-full border border-accent/15" />
        <span className="absolute left-1/2 top-1/2 h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(13,241,217,0.30),transparent_70%)]" />
        <span className="absolute left-1/2 top-1/2 h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 shadow-[inset_0_0_22px_rgba(13,241,217,0.20)]" />
        <Icon
          className="relative h-12 w-12 text-accent drop-shadow-[0_0_14px_rgba(13,241,217,0.85)]"
          strokeWidth={1.4}
        />
      </div>
    </div>
  );
}

function FloatingShape({
  className,
  rotate,
}: {
  className: string;
  rotate: number;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute border-accent/30 bg-accent/[0.04] backdrop-blur-[1px]",
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}
