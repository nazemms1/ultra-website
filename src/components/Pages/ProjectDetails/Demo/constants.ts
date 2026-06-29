import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'

export const demoSectionSx: SxProps<Theme> = {
  width: '100%',
  pt: { xs: 6, md: 8 },
  pb: { xs: 6, md: 8 },
}

export const demoHeaderSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
  mb: { xs: 4, md: 3.75 },
}

export function demoChipSx(theme: Theme, active: boolean): SxProps<Theme> {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
    height: 36,
    px: '13px',
    py: '5px',
    borderRadius: '100px',
    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
    bgcolor: active ? alpha(theme.palette.primary.light, 0.15) : 'transparent',
    boxShadow: active ? `0 0 10px ${alpha(theme.palette.primary.light, 0.4)}` : 'none',
    color: active ? 'text.primary' : alpha(theme.palette.common.white, 0.6),
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    cursor: 'pointer',
    transition: 'border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease',
    '&:hover': {
      borderColor: alpha(theme.palette.primary.light, 0.35),
      color: 'text.primary',
    },
  }
}

export const screenshotPanelSx: SxProps<Theme> = {
  width: { xs: '100%', md: 257 },
  flexShrink: 0,
  p: 2.5,
  borderRadius: '25px',
  background: theme =>
    `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.03)} 0%, ${alpha(theme.palette.common.black, 0)} 100%)`,
}

export const screenshotTitleSx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 24,
  fontWeight: 700,
  lineHeight: '40px',
  color: 'text.primary',
  mb: 1.75,
}

export function screenshotThumbSx(theme: Theme, active: boolean): SxProps<Theme> {
  return {
    position: 'relative',
    width: 157,
    height: 86,
    borderRadius: '8px',
    overflow: 'hidden',
    flexShrink: 0,
    cursor: 'pointer',
    opacity: active ? 1 : 0.5,
    border: active ? `2px solid ${theme.palette.common.white}` : '2px solid transparent',
    transition: 'opacity 0.25s ease, border-color 0.25s ease',
    '&:hover': { opacity: 1 },
  }
}

export const demoStageSx: SxProps<Theme> = {
  position: 'relative',
  flex: 1,
  minHeight: { xs: 380, md: 546 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
