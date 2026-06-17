'use client'

import Typography from '@mui/material/Typography'

export default function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'text.secondary',
        mb: '6px',
      }}
    >
      {children}
    </Typography>
  )
}
