import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'

/** Figma 2078:4816 — section shell */
export const HERO_HEIGHT = 406

export const VIDEO_SRC = '/videos/colorflow-animation (3).mp4'

export const heroSectionSx: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  minHeight: { xs: 360, md: HERO_HEIGHT },
  overflow: 'hidden',
  borderBottom: theme => `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}

/** Figma 2078:4822 — content container */
export const heroContainerSx: SxProps<Theme> = {
  position: 'relative',
  zIndex: 2,
  maxWidth: 1280,
  mx: 'auto',
  width: '100%',
  px: { xs: 3, md: 4 },
  pt: { xs: '120px', md: 9 },
  pb: { xs: 6, md: 8 },
}

/** Figma 2078:4830 — text column */
export const heroContentSx: SxProps<Theme> = {
  maxWidth: { xs: '100%', md: '100%' },
  pt: { xs: 4, md: 10 },
  pb: { xs: 4, md: 5 },
  pr: { md: 5 },
}

/** Figma 2078:4854 — eyebrow row */
export const eyebrowRowSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1.5,
}

/** Figma 2078:4855 — accent rule */
export const eyebrowRuleSx: SxProps<Theme> = {
  width: 40,
  height: '1px',
  flexShrink: 0,
  bgcolor: theme => alpha(theme.palette.primary.light, 0.6),
}

/** Figma 2078:4857 — eyebrow label */
export const eyebrowTextSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '16px',
  letterSpacing: '8px',
  textTransform: 'uppercase',
  color: 'primary.light',
  whiteSpace: 'nowrap',
}

/** Figma 3888:5227 — display title */
export const titleSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: { xs: 32, sm: 48, md: 60 },
  fontWeight: 700,
  lineHeight: { xs: 1.14, md: '68.4px' },
  letterSpacing: { xs: '-0.02em', md: '-1.8px' },
  textTransform: 'uppercase',
  color: 'text.primary',
  m: 0,
}

/** Figma 2214:5199 — description */
export const descriptionSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 14, md: 16 },
  fontWeight: 400,
  lineHeight: { xs: '24px', md: '26px' },
  color: theme => alpha(theme.palette.primary.lighter, 0.6),
  maxWidth: { xs: '100%', md: 640 },
}

/** Deep Frost overlay over video (Figma 2078:4817–4821) */
export function heroFrostOverlay(theme: Theme): string {
  const { primary, background } = theme.palette

  return [
    `radial-gradient(ellipse 78% 68% at 84% 32%, ${alpha(primary.main, 0.38)} 0%, transparent 58%)`,
    `radial-gradient(ellipse 52% 48% at 62% 58%, ${alpha(primary.light, 0.14)} 0%, transparent 52%)`,
    `linear-gradient(118deg, ${alpha(background.paper, 0.88)} 0%, ${alpha(background.default, 0.72)} 42%, ${alpha(background.default, 0.86)} 100%)`,
  ].join(', ')
}

export const videoSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.5,
  zIndex: 0,
  pointerEvents: 'none',
}

export const frostOverlaySx: SxProps<Theme> = theme => ({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  pointerEvents: 'none',
  background: heroFrostOverlay(theme),
})
