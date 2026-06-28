'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import type { ServiceCardProps } from './types'

export default function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  const theme = useTheme()
  const Icon = service.icon
  const primary = theme.palette.primary.main

  return (
    <Box
      onClick={onSelect}
      sx={{
        cursor: 'pointer',
        width: '100%',
        height: 147.5,
        p: '21px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: selected ? 'primary.main' : alpha(theme.palette.common.white, 0.08),
        borderRadius: '18px',
        ...(selected
          ? {
              background: `radial-gradient(circle at 100% 0%, ${alpha(primary, 0.25)} 0%, transparent 70%), ${alpha(primary, 0.04)}`,
              boxShadow: [
                `0 0 24px -4px ${alpha(primary, 0.4)}`,
                `inset 0 0 12px ${alpha(primary, 0.15)}`,
              ].join(', '),
            }
          : {
              bgcolor: alpha(theme.palette.common.white, 0.02),
            }),
        transition:
          'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
        '&:hover': {
          borderColor: selected ? 'primary.main' : alpha(primary, 0.45),
          ...(selected
            ? {
                boxShadow: [
                  `0 0 32px -4px ${alpha(primary, 0.5)}`,
                  `inset 0 0 16px ${alpha(primary, 0.2)}`,
                ].join(', '),
              }
            : {
                bgcolor: alpha(theme.palette.common.white, 0.06),
                boxShadow: `0 0 12px -4px ${alpha(primary, 0.2)}`,
              }),
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.25s ease, background-color 0.25s ease',
          ...(typeof service.icon === 'string'
            ? {
                bgcolor: 'transparent',
                border: 'none',
              }
            : {
                borderRadius: '12px',
                bgcolor: selected ? alpha(primary, 0.08) : alpha(theme.palette.common.white, 0.04),
                border: `1px solid ${
                  selected ? alpha(primary, 0.4) : alpha(theme.palette.common.white, 0.06)
                }`,
              }),
        }}
      >
        {typeof service.icon === 'string' ? (
          <Box
            component="img"
            src={service.icon}
            alt={service.title}
            sx={{
              width: 44,
              height: 44,
              objectFit: 'contain',
            }}
          />
        ) : (
          (() => {
            const Icon = service.icon
            return (
              <Icon
                size={20}
                color={selected ? primary : (theme.palette.text.secondary as string)}
                strokeWidth={selected ? 2 : 1.5}
              />
            )
          })()
        )}
      </Box>

      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '17px',
          fontWeight: 600,
          color: 'text.primary',
          lineHeight: '25.5px',
          mt: '14px',
        }}
      >
        {service.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '12px',
          color: alpha(theme.palette.common.white, 0.45),
          lineHeight: '18px',
          mt: '4px',
        }}
      >
        {service.subtitle}
      </Typography>
    </Box>
  )
}
