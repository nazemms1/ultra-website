'use client'

import Typography from '@mui/material/Typography'

export default function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'primary.main',
        mb: '8px',
      }}
    >
      {children}
    </Typography>
  )
}
