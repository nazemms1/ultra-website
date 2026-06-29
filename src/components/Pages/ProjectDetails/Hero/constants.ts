import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'
import { glassSurface } from '@/lib/theme/surfaces'

/** Figma node 4256:3949 — section shell */
export const heroSectionSx: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  borderBottom: theme => `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}

/** Figma node 4256:3955 — inner content container (pt clears fixed 68px navbar) */
export const heroContainerSx: SxProps<Theme> = {
  position: 'relative',
  zIndex: 2,
  maxWidth: 1280,
  mx: 'auto',
  width: '100%',
  px: { xs: 3, sm: 4 },
  pt: { xs: '120px', md: '140px' },
  pb: { xs: 6, md: 10 },
}

/** Figma node 4256:3957 — breadcrumb link */
export const backLinkSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  textDecoration: 'none',
  transition: 'opacity 0.25s ease, transform 0.25s ease',
  '&:hover': {
    opacity: 1,
    transform: 'translateX(-3px)',
  },
  '[dir="rtl"] &:hover': {
    transform: 'translateX(3px)',
  },
}

export const backLinkTextSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: 10,
  fontWeight: 700,
  lineHeight: '15px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: theme => alpha(theme.palette.common.white, 0.8),
}

/** Figma node 4256:3967 — meta tag */
export const metaTagSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 12, md: 14 },
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '0.57em',
  textTransform: 'uppercase',
  color: 'primary.light',
}

/** Figma node 4256:3969 — display title */
export const titleSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: { xs: 36, sm: 48, md: 60 },
  fontWeight: 700,
  lineHeight: { xs: 1.1, md: '60px' },
  letterSpacing: { xs: '-0.02em', md: '-0.04em' },
  textTransform: 'uppercase',
  color: 'text.primary',
}

/** Figma node 4256:3971 — short description */
export const descriptionSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 18, md: 24 },
  fontWeight: 400,
  lineHeight: { xs: 1.5, md: '39px' },
  color: theme => alpha(theme.palette.common.white, 0.7),
  maxWidth: 640,
  pt: 1,
}

/** Figma node 4256:3972 — visit website CTA */
export const visitButtonSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.25,
  px: { xs: 2.5, md: '30.97px' },
  py: { xs: 1.25, md: '15.485px' },
  borderRadius: '100px',
  border: theme => `0.774px solid ${alpha(theme.palette.common.white, 0.2)}`,
  bgcolor: 'transparent',
  color: 'text.primary',
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 16, md: 18 },
  fontWeight: 600,
  lineHeight: '18.582px',
  letterSpacing: '0.055em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition:
    'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
  '&:hover': {
    borderColor: theme => alpha(theme.palette.primary.light, 0.5),
    bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
    boxShadow: theme => `0 0 24px ${alpha(theme.palette.primary.light, 0.2)}`,
    transform: 'translateY(-1px)',
  },
}

/** Figma node 4256:3979 — frosted logo card */
export function logoCardSx(theme: Theme) {
  const glass = glassSurface(theme, { radius: '40px', tint: 0.06 })

  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: '100%', sm: 286 },
    maxWidth: 286,
    minHeight: { xs: 140, sm: 170 },
    p: '15.36px',
    borderRadius: '40px',
    border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    background: glass.background,
    boxShadow: `0 0 40px 0 ${alpha(theme.palette.primary.light, 0.4)}`,
  } satisfies SxProps<Theme>
}

/** Radial bloom behind the logo card */
export function logoGlowSx(theme: Theme): SxProps<Theme> {
  return {
    pointerEvents: 'none',
    position: 'absolute',
    inset: '-20%',
    borderRadius: '50%',
    background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${alpha(theme.palette.primary.light, 0.35)} 0%, ${alpha(theme.palette.primary.main, 0.12)} 45%, transparent 70%)`,
    filter: 'blur(12px)',
    zIndex: 0,
  }
}
