'use client'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography, { typographyClasses } from '@mui/material/Typography'

export default function StepLabel({ num, label }: { num: string; label: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        mb: '20px',
        [`.${typographyClasses.root}`]: {
          fontFamily: "'Ethnocentric Rg', sans-serif !important",
          textTransform: 'uppercase',
        },
      }}
    >
      <IconButton
        sx={{
          width: 32,
          height: 32,
          border: '1px solid rgba(13, 241, 217, 0.40)',
          background: 'rgba(13, 241, 217, 0.10)',
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            color: 'primary.main',
            lineHeight: 1,
            letterSpacing: '0.05em',
          }}
        >
          {num}
        </Typography>
      </IconButton>
      <Typography
        sx={{
          fontSize: 11,
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
