"use client";

import { useId, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export const CARD_W = 270;
export const CARD_H = 150;

const UNION_W = 268.968;
const UNION_H = 144.231;
const CARD_PATH =
  "M225.968 0C249.716 0 268.968 19.2518 268.968 43C268.968 58.8354 260.407 72.6697 247.662 80.1315C244.099 82.2174 241.5 85.8273 241.5 89.9557V124.963C241.5 135.658 232.155 144.231 220.75 144.231H20.75C9.34549 144.231 0 135.658 0 124.963V37C0 26.305 9.34549 17.7314 20.75 17.7314H186.085C189.283 17.7314 192.234 16.1478 194.406 13.8001C202.261 5.31383 213.493 0 225.968 0Z";

const ICON_SIZE = 64;
const ICON_X = 194;
const ICON_Y = 12;
const ACCENT = "#0DF1D9";
const TRANSITION = { duration: 0.3, ease: "easeOut" } as const;

interface OrbitalCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  sx?: SxProps<Theme>;
}

export default function OrbitalCard({
  title,
  description,
  Icon,
  onHoverStart,
  onHoverEnd,
  sx,
}: OrbitalCardProps) {
  const id = useId().replace(/:/g, "");
  const fillId = `orbital-card-fill-${id}`;
  const strokeId = `orbital-card-stroke-${id}`;
  const strokeHoverId = `orbital-card-stroke-hover-${id}`;

  const [hovered, setHovered] = useState(false);
  const state = hovered ? "hover" : "rest";

  return (
    <Box
      component={motion.div}
      initial="rest"
      animate={state}
      onHoverStart={() => {
        setHovered(true);
        onHoverStart?.();
      }}
      onHoverEnd={() => {
        setHovered(false);
        onHoverEnd?.();
      }}
      variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
      transition={TRANSITION}
      sx={{
        position: "relative",
        cursor: "pointer",
        width: CARD_W,
        height: CARD_H,
        transformOrigin: "50% 55%",
        ...sx,
      }}
    >
      <Box
        component={motion.div}
        aria-hidden
        animate={state}
        variants={{ rest: { opacity: 0.4 }, hover: { opacity: 1 } }}
        transition={TRANSITION}
        sx={{
          pointerEvents: "none",
          position: "absolute",
          left: "18px",
          top: "22px",
          width: 210,
          height: 112,
          borderRadius: "32px",
          bgcolor: "rgba(13,241,217,0.15)",
          filter: "blur(40px)",
        }}
      />

      <motion.svg
        width={UNION_W}
        height={UNION_H}
        viewBox={`0 0 ${UNION_W} ${UNION_H}`}
        fill="none"
        aria-hidden
        animate={state}
        variants={{
          rest: {
            filter:
              "drop-shadow(0px 20px 34px rgba(0,0,0,0.5)) drop-shadow(0px 0px 26px rgba(1,177,177,0.14))",
          },
          hover: {
            filter:
              "drop-shadow(0px 24px 40px rgba(0,0,0,0.55)) drop-shadow(0px 0px 52px rgba(13,241,217,0.6))",
          },
        }}
        transition={TRANSITION}
        style={{
          position: "absolute",
          left: 0,
          top: "0.5px",
          overflow: "visible",
        }}
      >
        <path d={CARD_PATH} fill={`url(#${fillId})`} />
        <motion.path
          d={CARD_PATH}
          fill={ACCENT}
          animate={state}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 0.07 } }}
          transition={TRANSITION}
        />
        <motion.path
          d={CARD_PATH}
          stroke={`url(#${strokeId})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          animate={state}
          variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
          transition={TRANSITION}
        />
        <motion.path
          d={CARD_PATH}
          stroke={`url(#${strokeHoverId})`}
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
          animate={state}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={TRANSITION}
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
            <stop stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="0.45" stopColor="#0DF1D9" stopOpacity="0.6" />
            <stop offset="1" stopColor="#0DF1D9" stopOpacity="0.45" />
          </linearGradient>
        </defs>
      </motion.svg>

      <Box
        component={motion.div}
        animate={state}
        variants={{ rest: { x: 0, y: 0 }, hover: { x: 7, y: -7 } }}
        transition={TRANSITION}
        sx={{
          position: "absolute",
          left: ICON_X,
          top: ICON_Y,
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
      >
        <Box
          component={motion.div}
          animate={state}
          variants={{
            rest: {
              scale: 1,
              borderColor: "rgba(255,255,255,0.12)",
              boxShadow:
                "inset 0px 4px 10px 0px rgba(255,255,255,0.22), 0px 0px 24px 0px rgba(1,177,177,0.40)",
            },
            hover: {
              scale: 1.1,
              borderColor: "rgba(13,241,217,0.6)",
              boxShadow:
                "inset 0px 4px 12px 0px rgba(255,255,255,0.32), 0px 0px 42px 6px rgba(13,241,217,0.55)",
            },
          }}
          transition={TRANSITION}
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid",
            backdropFilter: "blur(24px)",
            bgcolor: "rgba(25,25,27,0.4)",
          }}
        >
          <Box
            component={motion.div}
            animate={state}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
            transition={TRANSITION}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={26} color={ACCENT} strokeWidth={1.6} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "26px",
          top: "36px",
          display: "flex",
          width: 168,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "9px",
        }}
      >
        <Typography
          component="h3"
          sx={{
            width: 160,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.375,
            letterSpacing: 0,
            textTransform: "none",
            color: "#ffffff",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            width: "100%",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: 0,
            textTransform: "none",
            color: "#C0C0C0",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
