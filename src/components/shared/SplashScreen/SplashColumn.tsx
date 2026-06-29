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
  containerStyle,
}: SplashColumnProps) {
  const theme = useTheme()
  const { scaleY, crestY, glowOpacity } = useColumnWaveMotion(index)
  const primaryMain = theme.palette.primary.main
  const primaryDark = theme.palette.primary.darker
  const dividerColor = theme.palette.background.divider

  return (
    <Box
      style={{
        ...containerStyle,
        ...(showDivider ? { borderRight: `1px solid ${dividerColor}` } : undefined),
      }}
      sx={{
        overflow: 'hidden',
      }}
    >
      <Box
        component={motion.div}
        style={{
          scaleY,
          transformOrigin: 'bottom center',
          left: 0,
          right: 0,
          marginLeft: '-8%',
          marginRight: '-8%',
          width: 'auto',
        }}
        sx={{
          position: 'absolute',
          bottom: 0,
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
            top: '-18%',
            left: '-25%',
            right: '-25%',
          }}
          sx={{
            position: 'absolute',
            height: '52%',
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at center bottom, ${alpha(primaryMain, 0.55)} 0%, ${alpha(primaryMain, 0.18)} 42%, transparent 78%)`,
            filter: 'blur(6px)',
          }}
        />

        <Box
          component={motion.div}
          style={{ y: crestY, top: '-4%', left: 0, right: 0 }}
          sx={{
            position: 'absolute',
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
