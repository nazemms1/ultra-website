'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { alpha } from '@mui/material/styles'
import { AMBIENT_PULSE_TRANSITION } from './constants'

/** Soft bottom-center luminance — makes the liquid field feel alive under the columns. */
export default function SplashWaveAmbient() {
  const theme = useTheme()
  const reducedMotion = useReducedMotion()
  const primaryMain = theme.palette.primary.main

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Box
        component={motion.div}
        animate={
          reducedMotion
            ? { opacity: 0.35, scale: 1 }
            : { opacity: [0.28, 0.42, 0.28], scale: [1, 1.06, 1] }
        }
        transition={reducedMotion ? undefined : AMBIENT_PULSE_TRANSITION}
        style={{ x: '-50%' }}
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: '-12%',
          width: '140%',
          height: '58%',
          background: `radial-gradient(ellipse at center, ${alpha(primaryMain, 0.2)} 0%, ${alpha(primaryMain, 0.08)} 38%, transparent 72%)`,
          filter: 'blur(28px)',
        }}
      />
    </Box>
  )
}
