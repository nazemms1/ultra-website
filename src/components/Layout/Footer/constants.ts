import type { SxProps, Theme } from '@mui/material/styles'

export const footerSectionTitleSx: SxProps<Theme> = {
  fontSize: '11px',
  letterSpacing: '3px',
   fontWeight: '400',
  textTransform: 'uppercase',
  color: 'primary.main',
   
  mb: 2,
}

export const footerLinkSx: SxProps<Theme> = {
  fontSize: '14px',
  letterSpacing: '0.3px',
  color: 'rgba(255, 255, 255, 0.65)',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': { color: 'primary.main' },
}

export const footerBodySx: SxProps<Theme> = {
  fontSize: '14px',
  letterSpacing: '0.3px',
  color: 'rgba(255, 255, 255, 0.655)',
}
