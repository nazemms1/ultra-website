'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { SERVICES } from './data'

type Props = {
  service: (typeof SERVICES)[number]
  selected: boolean
  onSelect: () => void
}

export default function ServiceCard({ service, selected, onSelect }: Props) {
  const theme = useTheme()
  const Icon = service.icon

  return (
    <Box
      onClick={onSelect}
      sx={{
        flex: '1 1 0',
        minWidth: 140,
        cursor: 'pointer',
        borderRadius: '12px',
        p: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        border: `1px solid ${
          selected
            ? theme.palette.primary.main
            : alpha(theme.palette.text.primary as string, 0.12)
        }`,
        bgcolor: selected
          ? alpha(theme.palette.primary.main, 0.1)
          : theme.palette.background.elevated,
        boxShadow: selected ? `0 0 24px ${alpha(theme.palette.primary.main, 0.18)}` : 'none',
        transition: 'all 0.22s',
        userSelect: 'none',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.45),
          bgcolor: alpha(theme.palette.primary.main, 0.05),
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
          transition: 'all 0.22s',
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
