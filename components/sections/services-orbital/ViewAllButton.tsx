"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

interface ViewAllButtonProps {
  label?: string;
  href?: string;
  sx?: object;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ViewAllButton({
  label = "View all services",
  href = "#services",
  sx,
}: ViewAllButtonProps) {
  return (
    <Box
      component={motion.a}
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.2)",
        bgcolor: "transparent",
        px: 4,
        py: "15px",
        backdropFilter: "blur(4px)",
        textDecoration: "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          borderColor: "rgba(255,255,255,0.35)",
          boxShadow: "0 0 28px rgba(13,241,217,0.18)",
        },
        ...sx,
      }}
    >
      <Box
        component={motion.span}
        aria-hidden
        variants={{
          rest: { width: "0%", opacity: 0 },
          hover: { width: "80%", opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: EASE }}
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: "0 auto 0 0",
          zIndex: 0,
          borderRadius: "9999px",
          background:
            "linear-gradient(90deg, rgba(13,241,217,0.30) 0%, rgba(13,241,217,0.12) 65%, rgba(13,241,217,0) 100%)",
        }}
      />

      <Typography
        component="span"
        sx={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#ffffff",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
