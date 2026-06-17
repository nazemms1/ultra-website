'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

type Props = {
  label: string
  checked: boolean
  onChange: () => void
}

export default function RadioOption({ label, checked, onChange }: Props) {
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
        px: '18px',
        py: '10px',
        borderRadius: '9999px',
        border: `1px solid ${
          checked
            ? theme.palette.primary.main
            : alpha(theme.palette.text.primary as string, 0.12)
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
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: `1.5px solid ${
            checked
              ? theme.palette.primary.main
              : alpha(theme.palette.text.primary as string, 0.25)
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
        }}
      >
        {checked && (
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main' }} />
        )}
      </Box>
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.08em',
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
