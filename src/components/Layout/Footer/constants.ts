import type { SxProps, Theme } from '@mui/material/styles'

export const footerSectionTitleSx: SxProps<Theme> = {
  fontSize: '11px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: 'primary.main',
  fontWeight: 600,
  mb: 2,
}

export const footerLinkSx: SxProps<Theme> = {
  fontSize: '14px',
  letterSpacing: '0.3px',
  color: 'text.secondary',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': { color: 'primary.main' },
}

export const footerBodySx: SxProps<Theme> = {
  fontSize: '14px',
  letterSpacing: '0.3px',
  color: 'text.secondary',
}
