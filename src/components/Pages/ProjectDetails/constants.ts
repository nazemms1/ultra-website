import type { SxProps, Theme } from '@mui/material/styles'

/** Matches PageHero horizontal padding */
export const sectionShellSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: 1920,
  mx: 'auto',
  position: 'relative',
  zIndex: 1,
  px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
}

export const sectionHeadingSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: 30,
  fontWeight: 700,
  lineHeight: '40px',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  color: 'text.primary',
}
