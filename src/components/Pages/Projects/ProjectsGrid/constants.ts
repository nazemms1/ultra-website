import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'
import { glassSurface } from '@/lib/theme/surfaces'

/** Figma 3888:5149 / 3888:5323 — 500ms transition */
export const HOVER_TRANSITION = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'

export const ITEMS_PER_PAGE = 6

/** Figma gap 120px */
export const ROW_FLEX_GAP = 15

/** Figma image block 632px */
export const IMAGE_BLOCK_WIDTH = 632

export const sectionSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: { xs: 3, md: 3.75 },
  width: '100%',
  pt: { xs: 6, md: 10 },
  pb: { xs: 5, md: 7.5 },
  // px: { xs: 3, md: 'max(16px, calc((100vw - 1920px) / 2 + 10px))' },
}

export const marginWrapperSx: SxProps<Theme> = {
  width: '100%',
  // maxWidth: 1280,
  mx: 'auto',
  pt: { xs: 2, md: 3 },
}

export const panelSx: SxProps<Theme> = {
  width: '100%',
  bgcolor: 'background.default',
  borderRadius: '16px',
  pt: { xs: 5, md: 8.125 },
  pb: { xs: 4, md: 5.625 },
  overflow: 'visible',
}

export const rowsListSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  width: '100%',
}

/** Figma 3888:5149 Default — Type A */
export const ROW_NORMAL = {
  idleHeight: 158,
  hoverHeight: 264,
  pr: 5,
  titleOpacity: 0.4,
  logoOpacity: 0.6,
  flipImage: false,
  idleGradient: 0.1,
  hoverGradient: 0.25,
  idleImageOpacity: 0.4,
  hoverImageOpacity: 0.8,
} as const

/** Figma 3888:5323 Default — Type B */
export const ROW_REVERSED = {
  idleHeight: 194,
  hoverHeight: 299,
  pr: 7.5,
  titleOpacity: 0.6,
  logoOpacity: 1,
  flipImage: true,
  idleGradient: 0.1,
  hoverGradient: 0.25,
  idleImageOpacity: 0.4,
  hoverImageOpacity: 0.8,
} as const

export type RowLayout = typeof ROW_NORMAL | typeof ROW_REVERSED

export function rowLayoutForIndex(index: number): RowLayout {
  return index % 2 === 0 ? ROW_NORMAL : ROW_REVERSED
}

/** Figma 3888:5127 — idle title */
export const titleSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: { xs: 20, md: 26 },
  fontWeight: 700,
  lineHeight: { xs: '28px', md: '34px' },
  textTransform: 'uppercase',
  color: 'text.primary',
  transition: HOVER_TRANSITION,
  maxWidth: 281,
  width: '100%',
}

/** Figma 3888:5291 — hover description */
export const hoverDescriptionSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 16, md: 20 },
  fontWeight: 400,
  lineHeight: { xs: '28px', md: '39px' },
  color: theme => alpha(theme.palette.common.white, 0.8),
  maxWidth: 480,
  transition: HOVER_TRANSITION,
}

/** Figma 4064:3695 — VIEW MORE button */
export const viewMoreButtonSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  alignSelf: 'flex-start',
  px: '30.97px',
  py: '15.485px',
  borderRadius: '100px',
  border: theme => `0.774px solid ${alpha(theme.palette.common.white, 0.2)}`,
  bgcolor: 'transparent',
  color: 'text.primary',
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: { xs: 16, md: 18 },
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
  const glass = glassSurface(theme, { radius: '40px', tint: 0.06 })

  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: 220, sm: 260, md: 286 },
    height: { xs: 130, sm: 155, md: 170 },
    p: '15.36px',
    borderRadius: '40px',
    border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
    backdropFilter: 'blur(26px) brightness(1.08)',
    WebkitBackdropFilter: 'blur(26px) brightness(1.08)',
    background: glass.background,
    boxShadow: `0 0 40px 0 ${alpha(theme.palette.primary.light, 0.35)}`,
    perspective: '1000px',
    transition: HOVER_TRANSITION,
  }
}

export function rowGradient(theme: Theme, opacity: number): string {
  return `linear-gradient(270deg, ${alpha(theme.palette.primary.light, opacity)} 0%, ${alpha(theme.palette.primary.main, 0)} 43.898%)`
}

export function coverEdgeFade(theme: Theme, imageOnLeft: boolean): string {
  const fade = alpha(theme.palette.background.default, 0.98)

  return imageOnLeft
    ? `linear-gradient(90deg, transparent 0%, transparent 38%, ${fade} 100%)`
    : `linear-gradient(270deg, transparent 0%, transparent 38%, ${fade} 100%)`
}
