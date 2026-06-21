'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import type { ServiceCardProps } from './types'

export default function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  const theme = useTheme()
  const Icon = service.icon

  return (
    <Box
      onClick={onSelect}
      sx={{
        border: '1px solid',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        cursor: 'pointer',
        height: '100%',
        p: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderColor: selected ? 'primary.main' : alpha(theme.palette.common.white, 0.1),
        background: selected
          ? `radial-gradient(circle at 100% 0%, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%), ${alpha(theme.palette.common.white, 0.04)}`
          : alpha(theme.palette.common.white, 0.03),
        boxShadow: selected
          ? `0 0 24px -4px ${alpha(theme.palette.primary.main, 0.4)}, inset 0 0 12px ${alpha(theme.palette.primary.main, 0.15)}`
          : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
        '&:hover': {
          borderColor: selected ? 'primary.main' : alpha(theme.palette.primary.main, 0.45),
          bgcolor: selected ? undefined : alpha(theme.palette.common.white, 0.06),
          boxShadow: selected
            ? `0 0 32px -4px ${alpha(theme.palette.primary.main, 0.5)}, inset 0 0 16px ${alpha(theme.palette.primary.main, 0.2)}`
            : `0 0 12px -4px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '10px',
          bgcolor: selected
            ? alpha(theme.palette.primary.main, 0.08)
            : alpha(theme.palette.common.white, 0.05),
          border: `1px solid ${selected ? alpha(theme.palette.primary.main, 0.4) : alpha(theme.palette.common.white, 0.1)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.25s ease',
        }}
      >
        <Icon
          size={20}
          color={selected ? theme.palette.primary.main : (theme.palette.text.secondary as string)}
          strokeWidth={selected ? 2 : 1.5}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: selected ? 'primary.main' : 'text.primary',
            lineHeight: 1.3,
            transition: 'color 0.22s',
          }}
        >
          {service.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '12px',
            color: 'text.secondary',
            letterSpacing: '0.02em',
            mt: '2px',
          }}
        >
          {service.subtitle}
        </Typography>
      </Box>
    </Box>
  )
}
