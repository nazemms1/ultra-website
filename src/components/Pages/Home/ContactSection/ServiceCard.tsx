'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { cardGlassSurface } from '@/lib/theme/surfaces'
import type { ServiceCardProps } from './types'

export default function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  const theme = useTheme()
  const Icon = service.icon

  return (
    <Box
      onClick={onSelect}
      sx={{
        ...cardGlassSurface(theme, { radius: '16px' }),
        cursor: 'pointer',
        height: '100%',
        p: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderColor: selected ? 'primary.main' : 'transparent',
        background: selected
          ? `radial-gradient(circle at 100% 0%, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%), ${alpha(theme.palette.common.white, 0.04)}`
          : undefined,
        boxShadow: selected
          ? [
              `0 0 24px ${alpha(theme.palette.primary.main, 0.25)}`,
              `0 4px 76px 38px rgba(0, 0, 0, 0.76)`,
              `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.5)}`,
              `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
            ].join(', ')
          : undefined,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
        '&:hover': {
          borderColor: selected ? 'primary.main' : alpha(theme.palette.primary.main, 0.45),
          bgcolor: selected ? undefined : alpha(theme.palette.common.white, 0.06),
          boxShadow: selected
            ? [
                `0 0 32px ${alpha(theme.palette.primary.main, 0.35)}`,
                `0 4px 76px 38px rgba(0, 0, 0, 0.76)`,
                `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.5)}`,
                `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
              ].join(', ')
            : [
                `0 0 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                `0 4px 76px 38px rgba(0, 0, 0, 0.76)`,
                `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.5)}`,
                `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
              ].join(', '),
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
