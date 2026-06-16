"use client";

import Box from "@mui/material/Box";
import type { LucideIcon } from "lucide-react";

const ACCENT = "#0DF1D9";

const floatKeyframes = {
  "@keyframes phaseFloat": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-18px)" },
  },
};

interface PhaseGlyphProps {
  Icon: LucideIcon;
  index: number;
  sx?: object;
}

export default function PhaseGlyph({ Icon, index, sx }: PhaseGlyphProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "78%",
          height: "78%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,241,217,0.22) 0%, rgba(13,241,217,0.05) 45%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          bottom: "14%",
          left: "50%",
          width: "86%",
          height: "58%",
          transform: "translateX(-50%) perspective(560px) rotateX(64deg)",
          opacity: 0.7,
          backgroundImage:
            "linear-gradient(rgba(13,241,217,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(13,241,217,0.28) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 72%)",
        }}
      />

      <FloatingShape
        sx={{
          left: "14%",
          top: "20%",
          width: 36,
          height: 36,
          borderRadius: "10px",
          ...floatKeyframes,
          animation: "phaseFloat 6s ease-in-out infinite",
        }}
        rotate={index * 12 + 18}
      />
      <FloatingShape
        sx={{
          right: "16%",
          top: "26%",
          width: 24,
          height: 24,
          borderRadius: "6px",
          ...floatKeyframes,
          animation: "phaseFloat 9s ease-in-out infinite",
        }}
        rotate={-index * 16 - 10}
      />
      <FloatingShape
        sx={{
          bottom: "24%",
          right: "20%",
          width: 28,
          height: 28,
          borderRadius: "8px",
          ...floatKeyframes,
          animation: "phaseFloat 6s ease-in-out infinite",
        }}
        rotate={index * 20 + 30}
      />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          width: 132,
          height: 132,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(13,241,217,0.25)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: "16px",
            borderRadius: "50%",
            border: "1px solid rgba(13,241,217,0.15)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 92,
            height: 92,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(13,241,217,0.30), transparent 70%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 92,
            height: 92,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "1px solid rgba(13,241,217,0.4)",
            boxShadow: "inset 0 0 22px rgba(13,241,217,0.20)",
          }}
        />
        <Icon
          size={48}
          color={ACCENT}
          strokeWidth={1.4}
          style={{ filter: "drop-shadow(0 0 14px rgba(13,241,217,0.85))" }}
        />
      </Box>
    </Box>
  );
}

function FloatingShape({
  sx,
  rotate,
}: {
  sx?: object;
  rotate: number;
}) {
  return (
    <Box
      sx={{
        pointerEvents: "none",
        position: "absolute",
        border: "1px solid rgba(13,241,217,0.3)",
        bgcolor: "rgba(13,241,217,0.04)",
        backdropFilter: "blur(1px)",
        transform: `rotate(${rotate}deg)`,
        ...sx,
      }}
    />
  );
}
