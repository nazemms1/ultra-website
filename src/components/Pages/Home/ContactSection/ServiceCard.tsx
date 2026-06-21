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
        // Glass: Light -45°/80%, Refraction 80, Depth 76, Dispersion 50, Frost 38, Splay 38
        background: `linear-gradient(315deg, ${alpha(theme.palette.common.white, 0.10)} 0%, ${alpha(theme.palette.background.paper, 0.08)} 55%, ${alpha(theme.palette.background.paper, 0.06)} 100%)`,
        backdropFilter: 'blur(38px) brightness(1.08) saturate(1.2)',
        WebkitBackdropFilter: 'blur(38px) brightness(1.08) saturate(1.2)',
        border: '1px solid transparent',
        backgroundClip: 'padding-box',
        borderRadius: theme.shape.borderRadius,
        boxShadow: [
          `0 4px 76px 38px rgba(0, 0, 0, 0.76)`,
          `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.50)}`,
          `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
        ].join(', '),
        cursor: 'pointer',
        height: '100%',
        p: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'box-shadow 0.22s',
        userSelect: 'none',
        ...(selected && {
          boxShadow: [
            `0 0 24px ${alpha(theme.palette.primary.main, 0.25)}`,
            `0 4px 76px 38px rgba(0, 0, 0, 0.76)`,
            `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.50)}`,
            `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
          ].join(', '),
        }),
        '&:hover': {
          boxShadow: [
            `0 0 16px ${alpha(theme.palette.primary.main, 0.15)}`,
            `0 4px 76px 38px rgba(0, 0, 0, 0.76)`,
            `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.50)}`,
            `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
          ].join(', '),
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '10px',
          bgcolor: alpha(theme.palette.primary.main, selected ? 0.18 : 0.08),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.22s',
        }}
      >
        <Icon
          size={22}
          color={selected ? theme.palette.primary.main : (theme.palette.text.secondary as string)}
          strokeWidth={1.5}
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
