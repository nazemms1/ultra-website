'use client'

import Box from '@mui/material/Box'
import { motion, useReducedMotion } from 'framer-motion'
import { DOOR_EXIT_TRANSITION } from './constants'

/** Full-viewport frosted veil — blurs live page content instead of a flat black plate. */
export default function SplashBackdropVeil() {
  const reducedMotion = useReducedMotion()

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : DOOR_EXIT_TRANSITION}
      // backdropFilter is passed via style (not sx) to bypass stylis-plugin-rtl
      // which can strip or mangle filter values in RTL emotion cache.
      style={{
        backdropFilter: 'blur(28px) saturate(1.08) brightness(0.88)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.08) brightness(0.88)',
      }}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        bgcolor: 'background.default',
      }}
    />
  )
}
