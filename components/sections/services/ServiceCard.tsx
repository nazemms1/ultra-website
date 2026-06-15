"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardData {
  title: string;
  description: string;
  Icon?: LucideIcon;
}

interface ServiceCardProps extends ServiceCardData {
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

/** Figma card geometry from node 792:9515. */
export const CARD_W = 270;
export const CARD_H = 155;

const UNION_W = 268.968;
const UNION_H = 144.231;
const ICON_SIZE = 64;
const ICON_X = 194;
const ICON_Y = 12;

/**
 * Exact Figma `Union` path exported by MCP for the card container.
 * ViewBox: 0 0 268.968 144.231
 */
const CARD_PATH =
  "M225.968 0C249.716 0 268.968 19.2518 268.968 43C268.968 58.8354 260.407 72.6697 247.662 80.1315C244.099 82.2174 241.5 85.8273 241.5 89.9557V124.963C241.5 135.658 232.155 144.231 220.75 144.231H20.75C9.34549 144.231 0 135.658 0 124.963V37C0 26.305 9.34549 17.7314 20.75 17.7314H186.085C189.283 17.7314 192.234 16.1478 194.406 13.8001C202.261 5.31383 213.493 0 225.968 0Z";

export default function ServiceCard({
  title,
  description,
  className,
  onHoverStart,
  onHoverEnd,
}: ServiceCardProps) {
  const id = useId().replace(/:/g, "");
  const fillId = `service-card-fill-${id}`;
  const strokeId = `service-card-stroke-${id}`;

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={cn("group relative", className)}
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* Figma-like teal bloom behind the glass body. */}
      <motion.div
        aria-hidden
        variants={{
          rest: { opacity: 0.65 },
          hover: { opacity: 0.95 },
        }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute left-[18px] top-[24px] h-[110px] w-[204px] rounded-[28px] bg-[#0DF1D9]/10 blur-[34px]"
      />

      {/* Exact Figma union container: fill, border, and shadow on one path. */}
      <motion.svg
        width={UNION_W}
        height={UNION_H}
        viewBox={`0 0 ${UNION_W} ${UNION_H}`}
        fill="none"
        className="absolute left-[0.25px] top-[0.52px] overflow-visible"
        aria-hidden
        variants={{
          rest: { filter: "drop-shadow(0px 0px 30px rgba(1,177,177,0.18))" },
          hover: { filter: "drop-shadow(0px 0px 40px rgba(13,241,217,0.5))" },
        }}
        transition={{ duration: 0.35 }}
      >
        <path d={CARD_PATH} fill={`url(#${fillId})`} />
        <path
          d={CARD_PATH}
          stroke={`url(#${strokeId})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
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
            <stop stopColor="#09272A" stopOpacity="0.7" />
            <stop offset="0.42" stopColor="#081416" stopOpacity="0.92" />
            <stop offset="1" stopColor="#0A0A0A" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient
            id={strokeId}
            x1="4"
            y1="0"
            x2={UNION_W}
            y2={UNION_H}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FAFAFA" stopOpacity="0.34" />
            <stop offset="0.42" stopColor="#0DF1D9" stopOpacity="0.12" />
            <stop offset="0.72" stopColor="#0DF1D9" stopOpacity="0.18" />
            <stop offset="1" stopColor="#FAFAFA" stopOpacity="0.32" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Exact Figma icon well: left 194, top 12, size 64. */}
      <motion.div
        variants={{ rest: { x: 0, y: 0 }, hover: { x: 7, y: -7 } }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute flex items-center justify-center rounded-full bg-black/0 backdrop-blur-xl"
        style={{
          left: ICON_X,
          top: ICON_Y,
          width: ICON_SIZE,
          height: ICON_SIZE,
          boxShadow:
            "inset 0px 4px 10px 0px rgba(255,255,255,0.25), 0px 0px 30px 0px rgba(1,177,177,0.5)",
        }}
      >
        <PhoneSlot />
      </motion.div>

      {/* Text from MCP: left 26, top 38, gap 9, title 16, body 12. */}
      <div className="absolute left-[26px] top-[38px] flex w-[168px] flex-col items-start gap-[9px]">
        <h2 className="mt-[-1px] w-[156px] text-base font-medium normal-case leading-normal tracking-[0] text-white">
          {title}
        </h2>
        <p className="w-full text-xs font-normal normal-case leading-normal tracking-[0] text-[#C0C0C0]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function PhoneSlot() {
  return (
    <svg
      width="20"
      height="32"
      viewBox="0 0 22 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 1H6C3.23858 1 1 3.23858 1 6V28C1 30.7614 3.23858 33 6 33H16C18.7614 33 21 30.7614 21 28V6C21 3.23858 18.7614 1 16 1Z"
        stroke="#0DF1D9"
        strokeWidth="2"
      />
      <path
        d="M11 26V28"
        stroke="#0DF1D9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
