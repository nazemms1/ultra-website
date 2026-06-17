'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import type { LucideIcon } from 'lucide-react'

const floatKeyframes = {
  '@keyframes phaseFloat': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-18px)' },
  },
}

interface PhaseGlyphProps {
  Icon: LucideIcon
  index: number
  compact?: boolean
  sx?: object
}

export default function PhaseGlyph({ Icon, index, compact = false, sx }: PhaseGlyphProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const hub = compact ? 112 : 132
  const ring = compact ? 78 : 92
  const iconSize = compact ? 40 : 48
  const innerInset = compact ? '13px' : '16px'

  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '78%',
          height: '78%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(primary, 0.22)} 0%, ${alpha(primary, 0.05)} 45%, transparent 70%)`,
          filter: 'blur(6px)',
        }}
      />

      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          bottom: '14%',
          left: '50%',
          width: '86%',
          height: '58%',
          transform: 'translateX(-50%) perspective(560px) rotateX(64deg)',
          opacity: 0.7,
          backgroundImage: `linear-gradient(${alpha(primary, 0.28)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(primary, 0.28)} 1px, transparent 1px)`,
          backgroundSize: '26px 26px',
          maskImage: `radial-gradient(ellipse at center, ${theme.palette.common.black} 30%, transparent 72%)`,
          WebkitMaskImage: `radial-gradient(ellipse at center, ${theme.palette.common.black} 30%, transparent 72%)`,
        }}
      />

      <FloatingShape
        sx={{
          left: '14%',
          top: '20%',
          width: 36,
          height: 36,
          borderRadius: '10px',
          ...floatKeyframes,
          animation: 'phaseFloat 6s ease-in-out infinite',
        }}
        rotate={index * 12 + 18}
      />
      <FloatingShape
        sx={{
          right: '16%',
          top: '26%',
          width: 24,
          height: 24,
          borderRadius: '6px',
          ...floatKeyframes,
          animation: 'phaseFloat 9s ease-in-out infinite',
        }}
        rotate={-index * 16 - 10}
      />
      <FloatingShape
        sx={{
          bottom: '24%',
          right: '20%',
          width: 28,
          height: 28,
          borderRadius: '8px',
          ...floatKeyframes,
          animation: 'phaseFloat 6s ease-in-out infinite',
        }}
        rotate={index * 20 + 30}
      />

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: hub,
          height: hub,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `1px solid ${alpha(primary, 0.25)}`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: innerInset,
            borderRadius: '50%',
            border: `1px solid ${alpha(primary, 0.15)}`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: ring,
            height: ring,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(primary, 0.3)}, transparent 70%)`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: ring,
            height: ring,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: `1px solid ${alpha(primary, 0.4)}`,
            boxShadow: `inset 0 0 22px ${alpha(primary, 0.2)}`,
          }}
        />
        <Box
          sx={{ color: 'primary.main', filter: `drop-shadow(0 0 14px ${alpha(primary, 0.85)})` }}
        >
          <Icon size={iconSize} color="currentColor" strokeWidth={1.4} />
        </Box>
      </Box>
    </Box>
  )
}

function FloatingShape({ sx, rotate }: { sx?: object; rotate: number }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        pointerEvents: 'none',
        position: 'absolute',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        bgcolor: alpha(theme.palette.primary.main, 0.04),
        backdropFilter: 'blur(1px)',
        transform: `rotate(${rotate}deg)`,
        ...sx,
      }}
    />
  )
}
