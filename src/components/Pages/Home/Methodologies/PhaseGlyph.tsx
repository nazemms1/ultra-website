'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import Image from 'next/image'

interface PhaseGlyphProps {
  imageUrl: string
  index: number
  compact?: boolean
  sx?: object
}

export default function PhaseGlyph({ imageUrl, index, sx }: PhaseGlyphProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main

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
        p: { xs: 2, md: 4 },
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
          width: '85%',
          height: '85%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(primary, 0.22)} 0%, ${alpha(primary, 0.04)} 55%, transparent 75%)`,
          filter: 'blur(10px)',
        }}
      />

      {/* Hero Isometric Illustration Container */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // Smooth floating animation mimicking a high-tech hologram
          animation: 'phaseFloat 6s ease-in-out infinite',
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
          width={320}
          height={240}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
            maxWidth: '280px', // Matches your "Reality" visual balance
          }}
          priority={index === 0}
        />
      </Box>
    </Box>
  )
}
