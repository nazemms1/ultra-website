import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'
import { paletteAlpha } from './paletteAlpha'

/** Figma Glass plugin — light -45°, frost blur, inner highlight */
export function glassSurface(theme: Theme, opts?: { tint?: number; radius?: number | string }) {
  const tint = opts?.tint ?? 0.1
  const radius = opts?.radius ?? theme.shape.borderRadius

  return {
    background: paletteAlpha(theme.vars!.palette.background.paper, tint),
    backdropFilter: 'blur(24px) brightness(1.05)',
    WebkitBackdropFilter: 'blur(24px) brightness(1.05)',
    border: `1px solid`,
    borderColor: 'divider',
    borderRadius: radius,
    boxShadow: [
      '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.18)}`,
      `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.05)}`,
    ].join(', '),
  } satisfies SxProps<Theme>
}

export function glassPillSurface(theme: Theme) {
  return glassSurface(theme, { radius: theme.shape.borderRadiusPill })
}

export function cardSurface(theme: Theme) {
  return {
    background: `linear-gradient(135deg, ${alpha(theme.palette.background.card, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backdropFilter: 'blur(12px)',
  } satisfies SxProps<Theme>
}

export function glowOrb(theme: Theme, opacity = 0.05) {
  return {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(100px)',
    pointerEvents: 'none',
    bgcolor: alpha(theme.palette.primary.main, opacity),
  } satisfies SxProps<Theme>
}

export function primaryButtonSx(theme: Theme) {
  return {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    boxShadow: `0 0 23px ${alpha(theme.palette.primary.darker, 0.5)}`,
    '&:hover': {
      bgcolor: 'primary.light',
      boxShadow: `0 0 36px ${alpha(theme.palette.primary.darker, 0.8)}`,
      transform: 'translateY(-1px)',
    },
  } satisfies SxProps<Theme>
}

export function glassButtonSx(theme: Theme) {
  return {
    ...glassPillSurface(theme),
    color: 'text.primary',
    '&:hover': {
      borderColor: alpha(theme.palette.primary.main, 0.5),
      color: 'primary.main',
      bgcolor: alpha(theme.palette.primary.main, 0.06),
      transform: 'translateY(-1px)',
    },
  } satisfies SxProps<Theme>
}

export function ghostButtonSx(theme: Theme) {
  return {
    bgcolor: 'transparent',
    color: 'text.primary',
    border: `1px solid ${alpha(theme.palette.common.white, 0.25)}`,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      borderColor: 'primary.main',
      color: 'primary.main',
      boxShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.18)}`,
    },
  } satisfies SxProps<Theme>
}

export function eyebrowBadgeSx(theme: Theme) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    px: 1.5,
    py: 0.5,
    borderRadius: theme.shape.borderRadiusPill,
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'primary.main',
    bgcolor: alpha(theme.palette.primary.main, 0.1),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  } satisfies SxProps<Theme>
}

export const sectionMaxWidthSx: SxProps<Theme> = {
  maxWidth: 1280,
  mx: 'auto',
  width: '100%',
  position: 'relative',
  zIndex: 1,
}

export const statNumberSx: SxProps<Theme> = {
  fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
  fontSize: { xs: '40px', sm: '48px', md: '54.85px' },
  lineHeight: { xs: '48px', sm: '60px', md: '82.275px' },
  color: 'primary.main',
  display: 'block',
  fontVariantNumeric: 'tabular-nums',
}

export const statLabelSx: SxProps<Theme> = {
  mt: 1,
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.7px',
  textTransform: 'uppercase',
  color: 'text.secondary',
}
