import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'
import { paletteAlpha } from './paletteAlpha'

/**
 * Figma Glass plugin — Light -45° / 80%, Refraction 80, Depth 41, Dispersion 45, Frost 26, Splay 0
 *
 * Frost 26        → blur(26px)
 * Refraction 80   → brightness(1.08) in backdrop-filter
 * Light -45°/80%  → linear-gradient(315deg, white 80% opacity) as top layer
 * Depth 41        → box-shadow spread scaled from 41 → ~41px blur, 0.41 opacity
 * Dispersion 45   → inner border highlights at ±45% intensity
 */
export function glassSurface(theme: Theme, opts?: { tint?: number; radius?: number | string }) {
  const tint = opts?.tint ?? 0.08
  const radius = opts?.radius ?? theme.shape.borderRadius

  // Light -45° at 80% → 315deg gradient using paper color at 80% opacity as light source
  const lightAngle = '315deg' // −45° = 315°
  const lightOpacity = 0.80
  const paperColor = theme.vars?.palette.background.paper ?? theme.palette.background.paper

  return {
    background: `linear-gradient(${lightAngle}, ${alpha(theme.palette.common.white, lightOpacity * 0.12)} 0%, ${paletteAlpha(paperColor, tint)} 60%, ${paletteAlpha(paperColor, tint * 0.8)} 100%)`,
    backdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',   // Frost 26, Refraction ~80
    WebkitBackdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
    border: '1px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: radius,
    boxShadow: [
      // Depth 41 → deep shadow 41px blur, ~0.41 opacity
      '0 4px 41px 0 rgba(0, 0, 0, 0.41)',
      // Dispersion 45 → angled highlight at top-left (light source at -45°)
      `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.45)}`,   // Dispersion 45
      `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`, // shadow edge
    ].join(', '),
  } satisfies SxProps<Theme>
}

export function glassPillSurface(theme: Theme) {
  return glassSurface(theme, { radius: theme.shape.borderRadiusPill })
}

/**
 * Figma Glass — card variant
 * Light -45° / 80%, Refraction 80, Depth 96, Dispersion 71, Frost 20, Splay 0
 */
export function cardGlassSurface(
  theme: Theme,
  opts?: { radius?: number | string },
): SxProps<Theme> {
  const radius = opts?.radius ?? theme.shape.borderRadius
  const paperColor = theme.vars?.palette.background.paper ?? theme.palette.background.paper

  return {
    // background: `linear-gradient(315deg, ${alpha(theme.palette.common.white, 0.10)} 0%, ${paletteAlpha(paperColor, 0.08)} 55%, ${paletteAlpha(paperColor, 0.06)} 100%)`,
    backdropFilter: 'blur(20px) brightness(1.08) saturate(1.15)',
    WebkitBackdropFilter: 'blur(20px) brightness(1.08) saturate(1.15)',
    border: '1px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: radius,
    boxShadow: [
      '0 8px 96px 0 rgba(0, 0, 0, 0.55)',
      `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.71)}`,
      `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.08)}`,
    ].join(', '),
  } satisfies SxProps<Theme>
}

/** Figma Glass pill — same style used in the Navbar pills. Safe to reuse across components. */
export function navGlassPillSurface(theme: Theme): SxProps<Theme> {
  return {
    ...glassPillSurface(theme),
    boxShadow: [
      '0 4px 41px 0 rgba(0, 0, 0, 0.41)',
      `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.45)}`,
      `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
    ].join(', '),
  }
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
    boxShadow: [
      '0 4px 41px 0 rgba(0, 0, 0, 0.41)',
      `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.45)}`,
      `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
    ].join(', '),
    '&:hover': {
      borderColor: alpha(theme.palette.primary.main, 0.5),
      color: 'primary.main',
      bgcolor: alpha(theme.palette.primary.main, 0.06),
      transform: 'translateY(-1px)',
      boxShadow: [
        '0 4px 41px 0 rgba(0, 0, 0, 0.5)',
        `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.55)}`,
        `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.08)}`,
      ].join(', '),
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
