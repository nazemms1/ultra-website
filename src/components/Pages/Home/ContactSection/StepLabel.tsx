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
          fontSize: '14px',
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
