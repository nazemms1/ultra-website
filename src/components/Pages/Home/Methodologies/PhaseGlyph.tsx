'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme, type SxProps, type Theme } from '@mui/material/styles'
import Image from 'next/image'

interface PhaseGlyphProps {
  imageUrl: string
  index: number
  compact?: boolean
  sx?: SxProps<Theme>
}

export default function PhaseGlyph({ imageUrl, index, compact = false, sx }: PhaseGlyphProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main

  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        maxHeight: compact ? '100%' : undefined,
        flex: compact ? '1 1 auto' : undefined,
        minHeight: 0,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        p: compact ? { xs: 1.5, sm: 2, md: 2.5 } : { xs: 2, md: 4 },
        ...sx,
      }}
    >
      {/* Premium Ambient Background Glow */}
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: compact ? '75%' : '85%',
          height: compact ? '75%' : '85%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(primary, 0.18)} 0%, ${alpha(primary, 0.03)} 55%, transparent 75%)`,
          filter: 'blur(10px)',
        }}
      />

      {/* Hero Isometric Illustration Container */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          maxHeight: compact ? '100%' : undefined,
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 1,
          minHeight: 0,
          animation: compact ? undefined : 'phaseFloat 6s ease-in-out infinite',
          '@keyframes phaseFloat': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          filter: `drop-shadow(0 8px 24px ${alpha(primary, 0.25)})`,
        }}
      >
        <Image
          src={imageUrl}
          alt="Phase Illustration"
          width={335}
          height={250}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
            maxWidth: compact ? 325 : 335,
            maxHeight: compact ? 'min(220px, 100%)' : undefined,
          }}
          priority={index === 0}
        />
      </Box>
    </Box>
  )
}
