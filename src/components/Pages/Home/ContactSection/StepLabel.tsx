'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

export default function StepLabel({ num, label }: { num: string; label: string }) {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '20px' }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1.5px solid ${theme.palette.primary.main}`,
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '11px',
            fontWeight: 800,
            color: 'primary.main',
            lineHeight: 1,
            letterSpacing: '0.05em',
          }}
        >
          {num}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'primary.main',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
