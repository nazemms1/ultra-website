'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { paletteAlpha } from '@/lib/theme/paletteAlpha'
import { DOOR_EXIT_TRANSITION } from './constants'

/** Full-viewport frosted veil — blurs live page content instead of a flat black plate. */
export default function SplashBackdropVeil() {
  const theme = useTheme()
  const reducedMotion = useReducedMotion()

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : DOOR_EXIT_TRANSITION}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backdropFilter: 'blur(28px) saturate(1.08) brightness(0.88)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.08) brightness(0.88)',
        bgcolor: paletteAlpha(theme.vars!.palette.background.default, 1),
      }}
    />
  )
}
