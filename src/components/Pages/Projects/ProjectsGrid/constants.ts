import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'
import { glassSurface } from '@/lib/theme/surfaces'

export const HOVER_TRANSITION = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
export const ITEMS_PER_PAGE = 6
export const IMAGE_BLOCK_WIDTH = 632

export const sectionSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  pt: { xs: 6, md: 10 },
  pb: { xs: 5, md: 7.5 },
}

export const marginWrapperSx: SxProps<Theme> = {
  width: '100%',
  mx: 'auto',
}

export const panelSx: SxProps<Theme> = {
  width: '100%',
  bgcolor: 'background.default',
  overflow: 'visible',
}

export const rowsListSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  width: '100%',
}

export type RowLayout = {
  readonly imageIdleHeight: number
  readonly imageHoverHeight: number
  readonly textIdleHeight: number
  readonly textHoverHeight: number
  readonly titleOpacity: number
  readonly logoOpacity: number
  readonly flipImage: boolean
  readonly idleGradient: number
  readonly hoverGradient: number
  readonly idleImageOpacity: number
  readonly hoverImageOpacity: number
}

export function rowLayoutForIndex(index: number): RowLayout {
  const clampedIndex = Math.min(5, Math.max(0, index))

  const imageIdleHeight = Math.max(160, 260 - clampedIndex * 20)
  const imageHoverHeight = imageIdleHeight + 60

  const textIdleHeight = Math.max(110, 190 - clampedIndex * 16)
  const textHoverHeight = textIdleHeight + 160

  return {
    imageIdleHeight,
    imageHoverHeight,
    textIdleHeight,
    textHoverHeight,
    titleOpacity: 1,
    logoOpacity: 0.9,
    flipImage: false,
    idleGradient: 0.12,
    hoverGradient: 0.22,
    idleImageOpacity: 0.95,
    hoverImageOpacity: 0.95,
  }
}

export const titleSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: { xs: 20, md: 26 },
  fontWeight: 700,
  lineHeight: { xs: '28px', md: '34px' },
  textTransform: 'uppercase',
  color: 'text.primary',
  transition: HOVER_TRANSITION,
  width: '100%',
}

export const hoverDescriptionSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 16, md: 19 },
  fontWeight: 400,
  lineHeight: { xs: '24px', md: '28px' },
  color: theme => alpha(theme.palette.common.white, 0.7),
  maxWidth: 540,
  transition: HOVER_TRANSITION,
}

export const viewMoreButtonSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  alignSelf: 'flex-start',
  px: '28px',
  py: '10px',
  borderRadius: '100px',
  border: theme => `0.774px solid ${alpha(theme.palette.common.white, 0.2)}`,
  bgcolor: 'transparent',
  color: 'text.primary',
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 14, md: 15 },
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: HOVER_TRANSITION,
  '&:hover': {
    borderColor: 'primary.light',
    color: 'primary.light',
    boxShadow: theme => `0 0 20px ${alpha(theme.palette.primary.light, 0.2)}`,
  },
}

export function logoPlateSx(theme: Theme): SxProps<Theme> {
  const glass = glassSurface(theme, { radius: '32px', tint: 0.06 })
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: 200, sm: 240, md: 260 },
    height: { xs: 120, sm: 140, md: 150 },
    p: '12px',
    borderRadius: '32px',
    border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
    backdropFilter: 'blur(26px) brightness(1.08)',
    WebkitBackdropFilter: 'blur(26px) brightness(1.08)',
    background: glass.background,
    boxShadow: `0 0 40px 0 ${alpha(theme.palette.primary.light, 0.35)}`,
    perspective: '1000px',
    transition: HOVER_TRANSITION,
  }
}

export function rowGradient(theme: Theme, opacity: number, imageOnLeft: boolean): string {
  const angle = imageOnLeft ? '270deg' : '90deg'
  return `linear-gradient(${angle}, ${alpha(theme.palette.primary.light, opacity)} 0%, ${alpha(theme.palette.primary.main, 0)} 100%)`
}

export function coverEdgeFade(theme: Theme, imageOnLeft: boolean): string {
  const fade = alpha(theme.palette.background.default, 0.98)
  return imageOnLeft
    ? `linear-gradient(90deg, transparent 0%, transparent 45%, ${fade} 100%)`
    : `linear-gradient(270deg, transparent 0%, transparent 45%, ${fade} 100%)`
}
