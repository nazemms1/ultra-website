'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
import { SMOOTH_EASE, statLabelSx } from './constants'
import type { StatConfig } from './types'

type StatItemProps = {
  stat: StatConfig
  active: boolean
}

export default function StatItem({ stat, active }: StatItemProps) {
  const reduce = useReducedMotion()
  const [clickTrigger, setClickTrigger] = useState(0)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexShrink: 0,
        width: { xs: 180, sm: 200, md: 206.5 },
      }}
    >
      <Box
        component={reduce ? 'div' : motion.div}
        onClick={() => setClickTrigger(prev => prev + 1)}
        {...(!reduce && {
          initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
          animate: active
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 28, filter: 'blur(6px)' },
          transition: {
            duration: stat.entranceDuration,
            delay: stat.entranceDelay,
            ease: SMOOTH_EASE,
          },
          whileHover: {
            scale: 1.15,
            y: -8,
            transition: {
              duration: 0.3,
              ease: SMOOTH_EASE,
            },
          },
        })}
        sx={{
          width: '100%',
          maxWidth: 206.5,
          textAlign: 'center',
          cursor: 'pointer',
          padding: 2,
          borderRadius: 2,
          transition: 'all 0.3s ease',
        }}
      >
        <AnimatedNumber
          value={stat.value}
          suffix={stat.suffix}
          active={active}
          duration={stat.countDuration}
          delay={clickTrigger > 0 ? 0 : stat.entranceDelay + stat.entranceDuration * 0.35}
          clickTrigger={clickTrigger}
        />

        <Typography sx={statLabelSx}>{stat.label}</Typography>
      </Box>
    </Box>
  )
}
