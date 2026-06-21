'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const
const DOT_TRANSITION = { duration: 0.35, ease: EASE } as const
const LINE_TRANSITION = { duration: 0.48, ease: EASE, delay: 0.06 } as const

const MotionBox = motion.create(Box)

export default function OrbitalAccentRail() {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const primaryMid = theme.palette.primary.light
  const primaryFade = alpha(theme.palette.primary.darker || primary, 0)

  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        width: 16,
        flexShrink: 0,
        alignSelf: 'stretch',
      }}
    >
      <MotionBox
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={DOT_TRANSITION}
        sx={t => ({
          position: 'relative',
          zIndex: 1,
          width: 16,
          height: 16,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          boxShadow: `0 0 12px ${alpha(t.palette.primary.main, 0.65)}`,
        })}
      />

      <MotionBox
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0, opacity: 0 }}
        transition={LINE_TRANSITION}
        sx={{
          position: 'absolute',
          left: '6px',
          top: '7px',
          bottom: 0,
          width: 4,
          transformOrigin: 'top center',
          borderRadius: '2px',
          background: `linear-gradient(180deg, ${primary} 0%, ${primaryMid} 57.21%, ${primaryFade} 100%)`,
        }}
      />
    </Box>
  )
}
