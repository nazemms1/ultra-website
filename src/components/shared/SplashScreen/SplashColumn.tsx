'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { paletteAlpha } from '@/lib/theme/paletteAlpha'
import { COLUMN_BREATHE_TRANSITION } from './constants'
import type { SplashColumnProps } from './types'

export default function SplashColumn({ heightPercent, index, showDivider = true }: SplashColumnProps) {
  const theme = useTheme()
  const reducedMotion = useReducedMotion()
  const primaryMain = theme.palette.primary.main
  const primaryDark = theme.palette.primary.darker

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...(showDivider && {
          borderRight: '1px solid',
          borderColor: 'background.divider',
        }),
      }}
    >
      <Box
        component={motion.div}
        initial={false}
        animate={reducedMotion ? { scaleY: 1 } : { scaleY: [1, 1.028, 1] }}
        transition={{
          ...COLUMN_BREATHE_TRANSITION,
          delay: index * 0.07,
        }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${heightPercent}%`,
          transformOrigin: 'bottom center',
          willChange: 'transform',
          background: `linear-gradient(to top,
            ${primaryDark} 0%,
            ${paletteAlpha(primaryMain, 0.92)} 18%,
            ${paletteAlpha(primaryMain, 0.55)} 48%,
            ${paletteAlpha(primaryMain, 0.18)} 72%,
            transparent 100%)`,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-8%',
            left: '-20%',
            right: '-20%',
            height: '42%',
            background: `radial-gradient(ellipse at center bottom, ${paletteAlpha(primaryMain, 0.22)} 0%, transparent 72%)`,
            pointerEvents: 'none',
          },
        }}
      />
    </Box>
  )
}
