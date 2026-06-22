'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { motion, type MotionValue } from 'framer-motion'

const EYE_PATH_LEFT =
  'M5.04298 10.5875C7.82804 10.5875 10.0858 8.38693 10.0858 5.67241C10.0858 2.95789 7.82804 0.757324 5.04298 0.757324C2.2578 0.757324 0 2.95789 0 5.67241C0 8.38693 2.2578 10.5875 5.04298 10.5875Z'
const EYE_PATH_RIGHT =
  'M21.8401 11.3425C25.0537 11.3425 27.6588 8.80344 27.6588 5.67125C27.6588 2.53907 25.0537 0 21.8401 0C18.6265 0 16.0214 2.53907 16.0214 5.67125C16.0214 8.80344 18.6265 11.3425 21.8401 11.3425Z'

const EMBLEM_PATH_A =
  'M8.9231 14.8325C9.48125 19.1045 12.5182 34.5605 18.9041 32.5765C26.2257 30.3845 28.5076 17.6325 29.2299 11.0725C29.7716 7.39251 35.1889 7.92051 34.9591 11.6485C34.7457 12.8325 34.4338 14.0005 34.1218 15.1685C32.1355 22.4005 27.9494 33.8405 19.2653 35.2005C10.3513 36.4325 9.13649 20.8165 8.9231 14.8325Z'
const EMBLEM_PATH_B =
  'M25.4876 18.7845C26.3084 14.3205 27.5068 2.92848 21.3835 1.80848C13.159 0.784479 6.72394 10.0485 3.4243 16.3205C2.98106 17.1845 1.88118 17.5365 0.994708 17.1045C0.0425729 16.6245 -0.28575 15.4725 0.272399 14.5925C4.55701 7.76045 12.486 -1.67952 21.7447 0.256478C28.9185 2.19248 26.8829 13.5205 25.4876 18.7845Z'

/** Maps ultra-eyes.svg (28×12) into emblem viewBox (35×36) eye positions. */
const EYE_GROUP_TRANSFORM = 'translate(11.95, 14.88) scale(0.4232)'

interface OrbitalEmblemProps {
  offsetX: MotionValue<number>
  offsetY: MotionValue<number>
}

export default function OrbitalEmblem({ offsetX, offsetY }: OrbitalEmblemProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const eyeFill = theme.palette.primary.light

  return (
    <Box
      sx={{
        position: 'absolute',
        left: -40,
        top: -40,
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Box
        component={motion.svg}
        width={85}
        height={85}
        viewBox="0 0 35 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        sx={{ overflow: 'visible', filter: `drop-shadow(0 0 18px ${alpha(primary, 0.65)})` }}
      >
        <path d={EMBLEM_PATH_A} fill={primary} />
        <path d={EMBLEM_PATH_B} fill={theme.palette.secondary.main} />

        <motion.g style={{ x: offsetX, y: offsetY }}>
          <g transform={EYE_GROUP_TRANSFORM}>
            <path d={EYE_PATH_LEFT} fill={eyeFill} />
            <path d={EYE_PATH_RIGHT} fill={eyeFill} />
          </g>
        </motion.g>
      </Box>
    </Box>
  )
}
