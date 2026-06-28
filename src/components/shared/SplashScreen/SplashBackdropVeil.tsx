'use client'

import Box from '@mui/material/Box'
import { motion, useReducedMotion } from 'framer-motion'
import { DOOR_EXIT_TRANSITION } from './constants'
import { paletteAlpha } from '@/lib/theme/paletteAlpha'
import { useTheme } from '@mui/material/styles'

/** Full-viewport frosted veil — blurs live page content instead of a flat black plate. */
export default function SplashBackdropVeil() {
  const reducedMotion = useReducedMotion()
  const theme = useTheme()
  return (
    <Box
      component={motion.div}
      dir="ltr"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : DOOR_EXIT_TRANSITION}
      style={{
        backdropFilter: 'blur(28px) saturate(1.08) brightness(0.88)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.08) brightness(0.88)',
      }}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        direction: 'ltr',
        bgcolor: paletteAlpha(theme.vars!.palette.background.default, 1),
      }}
    />
  )
}
