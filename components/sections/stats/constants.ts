import type { SxProps, Theme } from "@mui/material/styles";

export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

/** Figma: Ethnocentric 54.85px / 82.275px line-height — shared by number + suffix. */
export const statNumberSx: SxProps<Theme> = {
  fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
  fontSize: { xs: "40px", sm: "48px", md: "54.85px" },
  lineHeight: { xs: "48px", sm: "60px", md: "82.275px" },
  color: "#0DF1D9",
  display: "block",
  fontVariantNumeric: "tabular-nums",
};

export const statLabelSx: SxProps<Theme> = {
  mt: 1,
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.7px",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.8)",
};
