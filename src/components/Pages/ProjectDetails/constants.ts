import type { SxProps, Theme } from '@mui/material/styles'
import { sectionMaxWidthSx } from '@/lib/theme/surfaces'

/** Figma Container (margin) — max 1280px centered shell */
export const sectionShellSx: SxProps<Theme> = {
  ...sectionMaxWidthSx,
  px: { xs: 3, sm: 4 },
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
