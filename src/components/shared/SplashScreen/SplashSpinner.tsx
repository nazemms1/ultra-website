'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { paletteAlpha } from '@/lib/theme/paletteAlpha'
import {
  SPLASH_SPINNER_BOTTOM_ARC_PATH,
  SPLASH_SPINNER_DEFAULT_SIZE,
  SPLASH_SPINNER_ROTATE_DURATION_S,
  SPLASH_SPINNER_TOP_ARC_PATH,
  SPLASH_SPINNER_VIEWBOX,
} from './spinnerPaths'

type SplashSpinnerProps = {
  size?: number
}

/**
 * Figma Frame152 (993:12958) — dual tapered arcs with continuous rotation.
 */
export default function SplashSpinner({ size = SPLASH_SPINNER_DEFAULT_SIZE }: SplashSpinnerProps) {
  const theme = useTheme()
  const reducedMotion = useReducedMotion()
  const height = (size * SPLASH_SPINNER_VIEWBOX.height) / SPLASH_SPINNER_VIEWBOX.width

  const topArcFill = `color-mix(in srgb, ${theme.palette.primary.lighter} 14%, ${theme.palette.text.primary})`
  const bottomArcFill = theme.palette.primary.darker

  return (
    <Box
      component={motion.div}
      role="status"
      aria-label="Loading"
      animate={reducedMotion ? undefined : { rotate: 360 }}
      transition={
        reducedMotion
          ? undefined
          : {
              duration: SPLASH_SPINNER_ROTATE_DURATION_S,
              repeat: Infinity,
              ease: 'linear',
            }
      }
      sx={{
        width: size,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        filter: `drop-shadow(0 0 10px ${paletteAlpha(theme.palette.primary.main, 0.55)})`,
      }}
    >
      <Box
        component="svg"
        viewBox={`0 0 ${SPLASH_SPINNER_VIEWBOX.width} ${SPLASH_SPINNER_VIEWBOX.height}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        sx={{
          width: '100%',
          height: '100%',
          display: 'block',
          overflow: 'visible',
        }}
      >
        <path d={SPLASH_SPINNER_TOP_ARC_PATH} fill={topArcFill} />
        <path d={SPLASH_SPINNER_BOTTOM_ARC_PATH} fill={bottomArcFill} />
      </Box>
    </Box>
  )
}
