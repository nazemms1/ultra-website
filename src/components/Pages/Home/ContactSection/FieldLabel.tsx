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
        color: 'rgba(255, 255, 255, 0.50)',
        mb: '8px',
        '& span.asterisk': {
          color: 'primary.main',
        },
      }}
    >
      {typeof children === 'string' && children.includes('*') ? (
        <>
          {children.split('*')[0]}
          <span className="asterisk">*</span>
          {children.split('*')[1]}
        </>
      ) : (
        children
      )}
    </Typography>
  )
}
