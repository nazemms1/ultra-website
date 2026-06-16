'use client'

import Box from '@mui/material/Box'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SplashBackdropVeil from './SplashBackdropVeil'
import SplashColumn from './SplashColumn'
import SplashSpinner from './SplashSpinner'
import SplashWaveAmbient from './SplashWaveAmbient'
import {
  COLUMN_HEIGHT_PROFILE,
  DOOR_EXIT_TRANSITION,
  SPLASH_Z_INDEX,
  SPINNER_EXIT_TRANSITION,
} from './constants'
import type { SplashScreenProps } from './types'

const LEFT_COLUMNS = COLUMN_HEIGHT_PROFILE.slice(0, 10)
const RIGHT_COLUMNS = COLUMN_HEIGHT_PROFILE.slice(10)

export default function SplashScreen({ isLoading, onExitComplete }: SplashScreenProps) {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isLoading ? (
        <Box
          key="ultra-splash-screen"
          component={motion.div}
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          sx={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            zIndex: SPLASH_Z_INDEX,
            bgcolor: 'transparent',
          }}
        >
          <SplashBackdropVeil />
          <SplashWaveAmbient />

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              component={motion.div}
              exit={reducedMotion ? { opacity: 0 } : { x: '-100%' }}
              transition={reducedMotion ? { duration: 0.3 } : DOOR_EXIT_TRANSITION}
              sx={{
                flex: 1,
                display: 'flex',
                height: '100%',
                willChange: 'transform',
              }}
            >
              {LEFT_COLUMNS.map((heightPercent, columnIndex) => (
                <SplashColumn
                  key={`splash-col-${columnIndex}`}
                  heightPercent={heightPercent}
                  index={columnIndex}
                  showDivider={columnIndex < LEFT_COLUMNS.length - 1}
                />
              ))}
            </Box>

            <Box
              component={motion.div}
              exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
              transition={reducedMotion ? { duration: 0.3 } : DOOR_EXIT_TRANSITION}
              sx={{
                flex: 1,
                display: 'flex',
                height: '100%',
                willChange: 'transform',
              }}
            >
              {RIGHT_COLUMNS.map((heightPercent, columnIndex) => (
                <SplashColumn
                  key={`splash-col-${columnIndex + 10}`}
                  heightPercent={heightPercent}
                  index={columnIndex + 10}
                  showDivider={columnIndex < RIGHT_COLUMNS.length - 1}
                />
              ))}
            </Box>
          </Box>

          <Box
            component={motion.div}
            exit={{ opacity: 0, scale: 0.86 }}
            transition={SPINNER_EXIT_TRANSITION}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <SplashSpinner />
          </Box>
        </Box>
      ) : null}
    </AnimatePresence>
  )
}
