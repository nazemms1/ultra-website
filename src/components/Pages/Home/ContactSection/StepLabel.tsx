'use client'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography, { typographyClasses } from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export default function StepLabel({ num, label }: { num: string; label: string }) {
  const theme = useTheme()
  const radius = theme.shape.borderRadius

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        mb: '20px',
        [`.${typographyClasses.root}`]: {
          fontFamily: "'Ethnocentric Rg', sans-serif !important",
          textTransform: 'uppercase',
        },
      }}
    >
      <IconButton
        sx={{
          width: 32,
          height: 32,
          background: `linear-gradient(to top left, ${alpha(theme.palette.primary.main, 0.125)} 25%, ${alpha(theme.palette.primary.main, 0.125)} 15%)`,
          backdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
          WebkitBackdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
          backgroundClip: 'padding-box',
          borderRadius: radius,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
          boxShadow: [
            `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.5)}`,
            `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.5)}`,
          ].join(', '),
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            color: 'primary.main',
            lineHeight: 1,
            letterSpacing: '0.05em',
          }}
        >
          {num}
        </Typography>
      </IconButton>
      <Typography
        sx={{
          fontSize: 11,
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
