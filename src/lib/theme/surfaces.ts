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
  const lightOpacity = 0.8
  const paperColor = theme.vars?.palette.background.paper ?? theme.palette.background.paper

  return {
    background: `linear-gradient(${lightAngle}, ${alpha(theme.palette.common.white, lightOpacity * 0.12)} 0%, ${paletteAlpha(paperColor, tint)} 60%, ${paletteAlpha(paperColor, tint * 0.8)} 100%)`,
    backdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)', // Frost 26, Refraction ~80
    WebkitBackdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
    border: '1px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: radius,
    boxShadow: [
      // Depth 41 → deep shadow 41px blur, ~0.41 opacity
      '0 4px 41px 0 rgba(0, 0, 0, 0.41)',
      // Dispersion 45 → angled highlight at top-left (light source at -45°)
      `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.45)}`, // Dispersion 45
      `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`, // shadow edge
    ].join(', '),
  } satisfies SxProps<Theme>
}

export function glassPillSurface(theme: Theme) {
  return glassSurface(theme, { radius: theme.shape.borderRadiusPill })
}

/** Figma StepCard — node 358-5781 / 1625-3075 */
export const PHASE_CARD_RADIUS = '22px'

/** Diagonal fill — rgba(1,177,177,0.18) → rgba(18,18,18,0.95) at 60%. */
export function phaseCardFill(theme: Theme): string {
  const { primary, background } = theme.palette
  // Mirror angle for RTL so the teal accent stays on the visual/left column side
  const angle = theme.direction === 'rtl' ? '315.906deg' : '135.906deg'

  return `linear-gradient(${angle}, ${alpha(primary.main, 0.18)} 40%, ${alpha(background.default, 0.18)} 60%)`
}

/** Resting elevation — 0 24px 63px -16px rgba(1,177,177,0.35). */
export function phaseCardDropShadow(theme: Theme): string {
  return `0px 24px 63px -16px ${alpha(theme.palette.primary.main, 0.35)}`
}

/** Uniform inset stroke — inset 0 0 0 1px rgba(13,241,217,0.25). */
export function phaseCardInsetBorder(theme: Theme): string {
  return `inset 0px 0px 0px 1px ${alpha(theme.palette.primary.light, 0.25)}`
}

/** Hover outer glow — animate via opacity on a dedicated layer. */
export function phaseCardOuterGlow(theme: Theme): string {
  const { primary } = theme.palette

  return [
    phaseCardDropShadow(theme),
    `0 0 56px 8px ${alpha(primary.lighter, 0.14)}`,
    `0 0 96px 16px ${alpha(primary.lighter, 0.08)}`,
  ].join(', ')
}

/** Left-column radial bloom behind the isometric illustration. */
export function phaseCardVisualBloom(theme: Theme): SxProps<Theme> {
  const { primary } = theme.palette

  return {
    pointerEvents: 'none',
    position: 'absolute',
    left: '-8%',
    top: '-9%',
    width: '116%',
    height: '116%',
    background: `radial-gradient(ellipse 70% 65% at 35% 28%, ${alpha(primary.main, 0.25)} 0%, ${alpha(primary.main, 0.125)} 32.5%, transparent 65%)`,
  }
}

/** Figma left-column wash at 30% opacity over the bloom. */
export function phaseCardVisualWash(theme: Theme): SxProps<Theme> {
  return {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    opacity: 0.3,
    background: phaseCardFill(theme),
  }
}

/** Large phase number — vertical gradient text clip. */
export function phaseCardNumberGradient(theme: Theme): SxProps<Theme> {
  const accent = theme.palette.primary.light

  return {
    background: `linear-gradient(to bottom, ${alpha(accent, 0.95)}, ${alpha(accent, 0.1)})`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  }
}

/** Tag pill — fill rgba(13,241,217,0.06) + 1px border at 0.4. */
export function phaseCardTagSurface(theme: Theme): SxProps<Theme> {
  const accent = theme.palette.primary.light

  return {
    borderRadius: '9999px',
    bgcolor: alpha(accent, 0.06),
    border: `1px solid ${alpha(accent, 0.4)}`,
    px: 1.25,
    py: 0.625,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 500,
    fontFamily: "'Rajdhani', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: accent,
  }
}

/** Card shell — radius, clip, resting drop shadow (fill + inset border are separate layers). */
export function phaseCardSurface(theme: Theme, opts?: { radius?: number | string }) {
  const radius = opts?.radius ?? PHASE_CARD_RADIUS

  return {
    position: 'relative',
    borderRadius: radius,
    overflow: 'hidden',
    boxShadow: phaseCardDropShadow(theme),
  } satisfies SxProps<Theme>
}

/**
 * Figma Glass — card variant
 * Light -45° / 80%, Refraction 80, Depth 96, Dispersion 71, Frost 20, Splay 0
 */
export function cardGlassSurface(theme: Theme, opts?: { radius?: number | string }) {
  const radius = opts?.radius ?? theme.shape.borderRadius

  return {
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
    bgcolor: '#0DF1D9',
    color: '#060E10',
    boxShadow: `0 0 23px ${alpha('#0DF1D9', 0.40)}`,
    '&:hover': {
      bgcolor: '#7FFFF4',
      boxShadow: `0 0 36px ${alpha('#0DF1D9', 0.70)}`,
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

export const statNumberSx: SxProps<Theme> = (theme: Theme) => ({
  fontFamily: "'Ethnocentric Rg', sans-serif !important",
  fontSize: { xs: '40px', sm: '48px', md: '54.85px' },
  lineHeight: { xs: '48px', sm: '60px', md: '82.275px' },
  color: theme.palette.primary.main,
  display: 'block',
  fontVariantNumeric: 'tabular-nums',
})

export const statLabelSx: SxProps<Theme> = {
  mt: 1,
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.7px',
  textTransform: 'uppercase',
  color: 'text.secondary',
}
