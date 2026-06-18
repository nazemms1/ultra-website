import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'

export function selectionPillSx(theme: Theme, selected: boolean): SxProps<Theme> {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    userSelect: 'none',
    px: '25px',
    py: '13px',
    borderRadius: '9999px',
    border: '1px solid',
    borderColor: selected ? 'primary.main' : alpha(theme.palette.common.white, 0.1),
    bgcolor: selected
      ? alpha(theme.palette.primary.main, 0.12)
      : alpha(theme.palette.common.white, 0.03),
    boxShadow: selected ? `0 0 18px ${alpha(theme.palette.primary.main, 0.25)}` : 'none',
    transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
    '&:hover': {
      borderColor: alpha(theme.palette.primary.main, 0.45),
    },
  }
}

export function contactFieldSx(theme: Theme): SxProps<Theme> {
  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: alpha(theme.palette.common.white, 0.02),
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: '16px',
      letterSpacing: '0.02em',
      color: 'text.primary',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      '& fieldset': {
        borderColor: alpha(theme.palette.common.white, 0.1),
      },
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.35),
      },
      '&.Mui-focused fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.5),
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.07)}`,
      },
      '& input::placeholder': {
        color: alpha(theme.palette.text.secondary, 0.55),
        opacity: 1,
      },
    },
    '& .MuiInputAdornment-root': {
      mr: '8px',
    },
  }
}

export function captchaBoxSx(theme: Theme): SxProps<Theme> {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    px: '18px',
    py: '14px',
    borderRadius: '10px',
    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
    bgcolor: alpha(theme.palette.common.white, 0.03),
    backdropFilter: 'blur(12px)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'border-color 0.2s',
    '&:hover': {
      borderColor: alpha(theme.palette.primary.main, 0.3),
    },
  }
}
