'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

type Props = {
  label: string
  checked: boolean
  onChange: () => void
}

export default function OfferingCheckbox({ label, checked, onChange }: Props) {
  const theme = useTheme()
  return (
    <Box
      onClick={onChange}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        userSelect: 'none',
        px: '14px',
        py: '9px',
        borderRadius: '8px',
        border: `1px solid ${
          checked
            ? theme.palette.primary.main
            : alpha(theme.palette.text.primary as string, 0.1)
        }`,
        bgcolor: checked
          ? alpha(theme.palette.primary.main, 0.1)
          : theme.palette.background.elevated,
        transition: 'all 0.2s',
        '&:hover': { borderColor: alpha(theme.palette.primary.main, 0.4) },
      }}
    >
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: '3px',
          border: `1.5px solid ${
            checked
              ? theme.palette.primary.main
              : alpha(theme.palette.text.primary as string, 0.25)
          }`,
          bgcolor: checked ? theme.palette.primary.main : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
        }}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <polyline
              points="1,3.5 3.5,6 8,1"
              stroke="#060E10"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Box>
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: checked ? 'primary.main' : 'text.secondary',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
