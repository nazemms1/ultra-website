"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ACCENT = "#0DF1D9";

interface TimelineProps {
  labels: string[];
  progress: MotionValue<number>;
  onSeek: (index: number) => void;
}

export default function Timeline({ labels, progress, onSeek }: TimelineProps) {
  const total = labels.length;
  const fillWidth = useMotionTemplate`${useTransform(progress, (p) => p * 100)}%`;

  return (
    <Box sx={{ mx: "auto", width: "100%", maxWidth: 1280, px: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Scroll to advance
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {total} Phases
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          mt: 1.5,
          height: "2px",
          width: "100%",
          overflow: "hidden",
          borderRadius: "9999px",
          bgcolor: "rgba(255,255,255,0.08)",
        }}
      >
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            borderRadius: "9999px",
            bgcolor: ACCENT,
            boxShadow: "0 0 10px rgba(13,241,217,0.7)",
          }}
          style={{ width: fillWidth }}
        />
      </Box>

      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
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
      </Box>
    </Box>
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
    <Box
      component={motion.button}
      type="button"
      onClick={() => onSeek(index)}
      style={{ opacity }}
      sx={{
        display: "flex",
        flexShrink: 0,
        cursor: "pointer",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        border: "none",
        bgcolor: "transparent",
        outline: "none",
        p: 0,
        "&:hover .timeline-label": { color: ACCENT },
      }}
      aria-label={`Go to ${label} phase`}
    >
      <Box
        component={motion.span}
        sx={{
          display: "block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          bgcolor: ACCENT,
        }}
        style={{ scale: dotScale, boxShadow: glow }}
      />
      <Typography
        className="timeline-label"
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.18em",
          color: "#ffffff",
          transition: "color 0.2s",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
