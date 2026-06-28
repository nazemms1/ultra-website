'use client'

import Box from '@mui/material/Box'
import { useTheme, alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useColumnWaveMotion } from './useColumnWaveMotion'
import type { SplashColumnProps } from './types'

export default function SplashColumn({
  heightPercent,
  index,
  showDivider = true,
}: SplashColumnProps) {
  const theme = useTheme()
  const { scaleY, crestY, glowOpacity } = useColumnWaveMotion(index)
  const primaryMain = theme.palette.primary.main
  const primaryDark = theme.palette.primary.darker
  const isRtl = theme.direction === 'rtl'

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...(showDivider && {
          // In RTL the flex row is mirrored, so the divider goes on the left side
          ...(isRtl ? { borderLeft: '1px solid' } : { borderRight: '1px solid' }),
          borderColor: 'background.divider',
        }),
      }}
    >
      <Box
        component={motion.div}
        style={{
          scaleY,
          transformOrigin: 'bottom center',
        }}
        sx={{
          position: 'absolute',
          bottom: 0,
          // Extend 8% beyond each side symmetrically — use inset 0 + negative
          // margin instead of left/right so stylis-plugin-rtl doesn't flip it.
          left: 0,
          right: 0,
          mx: '-8%',
          width: 'auto',
          height: `${heightPercent}%`,
          willChange: 'transform',
          background: `linear-gradient(to top,
            ${primaryDark} 0%,
            ${alpha(primaryMain, 0.95)} 14%,
            ${alpha(primaryMain, 0.72)} 38%,
            ${alpha(primaryMain, 0.38)} 58%,
            ${alpha(primaryMain, 0.14)} 76%,
            transparent 100%)`,
        }}
      >
        <Box
          component={motion.div}
          style={{
            y: crestY,
            opacity: glowOpacity,
          }}
          sx={{
            position: 'absolute',
            top: '-18%',
            left: '-25%',
            right: '-25%',
            height: '52%',
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at center bottom, ${alpha(primaryMain, 0.55)} 0%, ${alpha(primaryMain, 0.18)} 42%, transparent 78%)`,
            filter: 'blur(6px)',
          }}
        />

        <Box
          component={motion.div}
          style={{ y: crestY }}
          sx={{
            position: 'absolute',
            top: '-4%',
            left: 0,
            right: 0,
            height: '28%',
            pointerEvents: 'none',
            background: `linear-gradient(to bottom, transparent 0%, ${alpha(primaryMain, 0.22)} 100%)`,
            filter: 'blur(10px)',
          }}
        />
      </Box>
    </Box>
  )
}
