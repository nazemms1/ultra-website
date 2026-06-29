import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'

export const relatedSectionSx: SxProps<Theme> = {
  width: '100%',
  pt: { xs: 6, md: 8 },
  pb: { xs: 10, md: 12 },
}

export const relatedGridSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  },
  gap: 3,
}

export function relatedCardSx(theme: Theme, hovered: boolean): SxProps<Theme> {
  return {
    position: 'relative',
    display: 'block',
    height: 428.5,
    borderRadius: '16px',
    overflow: 'hidden',
    bgcolor: 'background.default',
    textDecoration: 'none',
    transition: 'box-shadow 0.4s ease, transform 0.4s ease',
    boxShadow: hovered
      ? `0 0 56px ${alpha(theme.palette.primary.light, 0.22)}, 0 0 96px ${alpha(theme.palette.primary.main, 0.12)}`
      : 'none',
    transform: hovered ? 'translateY(-4px)' : 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(180deg, ${alpha(theme.palette.primary.light, hovered ? 0.22 : 0.15)} 0%, ${alpha(theme.palette.common.black, 0)} 80%)`,
      opacity: 0.8,
      pointerEvents: 'none',
      transition: 'opacity 0.4s ease',
    },
  }
}

export const relatedLogoSlotSx: SxProps<Theme> = {
  position: 'absolute',
  top: '26%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '68%',
  maxWidth: 267,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
}

export const relatedFooterSx: SxProps<Theme> = {
  position: 'absolute',
  insetInline: 0,
  bottom: 0,
  p: 4,
  backdropFilter: 'blur(25px)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 2,
  minHeight: 115,
}

export const relatedTitleSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: 26,
  fontWeight: 700,
  lineHeight: '34px',
  textTransform: 'uppercase',
  color: 'text.primary',
}

export const relatedDescriptionSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  color: theme => alpha(theme.palette.common.white, 0.65),
  mt: 0.5,
}

export const relatedArrowSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 1.5,
  borderRadius: '100px',
  bgcolor: theme => alpha(theme.palette.background.default, 0.2),
  flexShrink: 0,
}
