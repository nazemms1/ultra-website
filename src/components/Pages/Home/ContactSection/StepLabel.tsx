'use client'

import Box from '@mui/material/Box'
import Typography, { typographyClasses } from '@mui/material/Typography'

export default function StepLabel({ imageSrc, label }: { imageSrc: string; label: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        mb: '20px',
        [`.${typographyClasses.root}`]: {
          fontFamily: "'Nulshock', sans-serif !important",
          textTransform: 'uppercase',
        },
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={label}
        sx={{
          width: 32,
          height: 32,
          objectFit: 'contain',
        }}
      />
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          fontFamily: 'Nulshock',
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
