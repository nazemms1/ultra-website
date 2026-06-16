"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import PhaseGlyph from "./PhaseGlyph";
import type { Phase } from "./data";

const ACCENT = "#0DF1D9";

interface PhaseCardProps {
  phase: Phase;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

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
    <Box
      component={motion.div}
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "min(92vw, 860px)",
        willChange: "transform",
      }}
      style={{ transform, opacity, zIndex, pointerEvents }}
    >
      <PhaseCardContent phase={phase} />
    </Box>
  );
}

export function PhaseCardContent({ phase }: { phase: Phase }) {
  return (
    <Box
      component="article"
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "0.95fr 1fr" },
        overflow: "hidden",
        borderRadius: "24px",
        boxShadow: "0 24px 63px -16px rgba(1,177,177,0.35)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Box
        aria-hidden
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          borderRadius: "24px",
          backgroundImage:
            "linear-gradient(154deg, rgba(1,177,177,0.18) 0%, rgba(18,18,18,0.95) 60%)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          borderRadius: "24px",
          boxShadow: "inset 0 0 0 1px rgba(13,241,217,0.25)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: { xs: 230, sm: 280, md: "auto" },
          minHeight: { md: 440 },
        }}
      >
        <PhaseGlyph Icon={phase.Icon} index={Number(phase.number) - 1} />
        <Typography
          component="span"
          aria-hidden
          sx={{
            pointerEvents: "none",
            position: "absolute",
            bottom: 20,
            left: 24,
            userSelect: "none",
            fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
            fontSize: { xs: "68px", sm: "88px" },
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "transparent",
            backgroundImage:
              "linear-gradient(180deg, rgba(13,241,217,0.95) 0%, rgba(13,241,217,0.1) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          {phase.number}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: { xs: 2, sm: 2.5 },
          p: { xs: 3.5, sm: 5.5 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ height: "1px", width: 32, bgcolor: ACCENT }} />
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.35em",
              color: ACCENT,
            }}
          >
            Phase {phase.number}
          </Typography>
        </Box>

        <Typography
          component="h3"
          sx={{
            fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
            fontSize: { xs: "1.875rem", sm: "2.25rem" },
            textTransform: "uppercase",
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            color: "#ffffff",
          }}
        >
          {phase.title}
        </Typography>

        <Typography
          sx={{
            maxWidth: "36ch",
            fontSize: "15px",
            lineHeight: 1.625,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          {phase.description}
        </Typography>

        <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", gap: 1.25 }}>
          {phase.tags.map((tag) => (
            <Box
              key={tag}
              sx={{
                borderRadius: "9999px",
                border: "1px solid rgba(13,241,217,0.4)",
                bgcolor: "rgba(13,241,217,0.06)",
                px: 1.75,
                py: 0.75,
                fontSize: "10px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: ACCENT,
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
