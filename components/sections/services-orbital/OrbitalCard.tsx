"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Card footprint used by the orbital geometry. */
export const CARD_W = 270;
export const CARD_H = 150;

/** Exact Figma `Union` geometry (node 792:9513) — glass body with the
 *  top-right notch that cradles the circular icon well. */
const UNION_W = 268.968;
const UNION_H = 144.231;
const CARD_PATH =
  "M225.968 0C249.716 0 268.968 19.2518 268.968 43C268.968 58.8354 260.407 72.6697 247.662 80.1315C244.099 82.2174 241.5 85.8273 241.5 89.9557V124.963C241.5 135.658 232.155 144.231 220.75 144.231H20.75C9.34549 144.231 0 135.658 0 124.963V37C0 26.305 9.34549 17.7314 20.75 17.7314H186.085C189.283 17.7314 192.234 16.1478 194.406 13.8001C202.261 5.31383 213.493 0 225.968 0Z";

const ICON_SIZE = 64;
const ICON_X = 194;
const ICON_Y = 12;
const EASE = [0.22, 1, 0.36, 1] as const;

interface OrbitalCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

export default function OrbitalCard({
  title,
  description,
  Icon,
  onHoverStart,
  onHoverEnd,
  className,
}: OrbitalCardProps) {
  const id = useId().replace(/:/g, "");
  const fillId = `orbital-card-fill-${id}`;
  const strokeId = `orbital-card-stroke-${id}`;
  const strokeHoverId = `orbital-card-stroke-hover-${id}`;

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn("group relative cursor-pointer", className)}
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* Radiating cyan bloom — intensifies on hover. */}
      <motion.div
        aria-hidden
        variants={{ rest: { opacity: 0.45 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute left-[18px] top-[22px] h-[112px] w-[210px] rounded-[32px] bg-[#0DF1D9]/15 blur-[40px]"
      />

      {/* Glass body: fill + base border + brighter hover border, all on the
          exact Figma union path. */}
      <motion.svg
        width={UNION_W}
        height={UNION_H}
        viewBox={`0 0 ${UNION_W} ${UNION_H}`}
        fill="none"
        className="absolute left-0 top-[0.5px] overflow-visible"
        aria-hidden
        variants={{
          rest: {
            filter:
              "drop-shadow(0px 20px 34px rgba(0,0,0,0.5)) drop-shadow(0px 0px 26px rgba(1,177,177,0.14))",
          },
          hover: {
            filter:
              "drop-shadow(0px 24px 40px rgba(0,0,0,0.55)) drop-shadow(0px 0px 48px rgba(13,241,217,0.55))",
          },
        }}
        transition={{ duration: 0.4 }}
      >
        <path d={CARD_PATH} fill={`url(#${fillId})`} />
        {/* base, subtle border */}
        <motion.path
          d={CARD_PATH}
          stroke={`url(#${strokeId})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
          transition={{ duration: 0.4 }}
        />
        {/* brightened border, revealed on hover */}
        <motion.path
          d={CARD_PATH}
          stroke={`url(#${strokeHoverId})`}
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.4 }}
        />
        <defs>
          <linearGradient
            id={fillId}
            x1="0"
            y1="17"
            x2="268"
            y2="144"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0E2A2D" stopOpacity="0.55" />
            <stop offset="0.45" stopColor="#101012" stopOpacity="0.62" />
            <stop offset="1" stopColor="#0A0A0B" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient
            id={strokeId}
            x1="4"
            y1="0"
            x2={UNION_W}
            y2={UNION_H}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient
            id={strokeHoverId}
            x1="4"
            y1="0"
            x2={UNION_W}
            y2={UNION_H}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="0.45" stopColor="#0DF1D9" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0DF1D9" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Circular glass icon well cradled in the top-right notch.
          Outer wrapper drifts outward; inner wrapper scales + glows + the ring
          brightens — so the whole icon container animates on hover. */}
      <motion.div
        variants={{ rest: { x: 0, y: 0 }, hover: { x: 7, y: -7 } }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute"
        style={{
          left: ICON_X,
          top: ICON_Y,
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
      >
        <motion.div
          variants={{
            rest: {
              scale: 1,
              borderColor: "rgba(255,255,255,0.10)",
              boxShadow:
                "inset 0px 4px 10px 0px rgba(255,255,255,0.22), 0px 0px 24px 0px rgba(1,177,177,0.40)",
            },
            hover: {
              scale: 1.1,
              borderColor: "rgba(13,241,217,0.55)",
              boxShadow:
                "inset 0px 4px 12px 0px rgba(255,255,255,0.35), 0px 0px 42px 6px rgba(13,241,217,0.55)",
            },
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex h-full w-full items-center justify-center rounded-full border backdrop-blur-xl"
          style={{ background: "rgba(25,25,27,0.4)" }}
        >
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center justify-center"
          >
            <Icon className="h-[26px] w-[26px] text-[#0DF1D9]" strokeWidth={1.6} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Title + compact description. */}
      <div className="absolute left-[26px] top-[36px] flex w-[168px] flex-col items-start gap-[9px]">
        <h3 className="w-[160px] text-base font-medium normal-case leading-snug tracking-[0] text-white">
          {title}
        </h3>
        <p className="w-full text-xs font-normal normal-case leading-normal tracking-[0] text-[#C0C0C0]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
