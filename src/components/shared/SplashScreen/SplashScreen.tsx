'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import Box from '@mui/material/Box'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SplashBackdropVeil from './SplashBackdropVeil'
import SplashColumn from './SplashColumn'
import SplashLtrShell from './SplashLtrShell'
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
const HALF_COLUMN_WIDTH_PERCENT = 100 / LEFT_COLUMNS.length

const splashRootStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  zIndex: SPLASH_Z_INDEX,
  direction: 'ltr',
}

const doorHalfBaseStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  height: '100%',
  width: '50%',
  overflow: 'hidden',
}

export default function SplashScreen({ isLoading, onExitComplete }: SplashScreenProps) {
  const reducedMotion = useReducedMotion()
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalTarget(document.body)
  }, [])

  if (!portalTarget) return null

  return createPortal(
    <SplashLtrShell>
      <AnimatePresence onExitComplete={onExitComplete}>
        {isLoading ? (
          <motion.div
            key="ultra-splash-screen"
            dir="ltr"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            style={splashRootStyle}
          >
            <SplashBackdropVeil />
            <SplashWaveAmbient />
            <Box
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            >
              <motion.div
                style={{ ...doorHalfBaseStyle, left: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { x: '-100%' }}
                transition={reducedMotion ? { duration: 0.3 } : DOOR_EXIT_TRANSITION}
              >
                {LEFT_COLUMNS.map((heightPercent, columnIndex) => (
                  <SplashColumn
                    key={`splash-col-${columnIndex}`}
                    heightPercent={heightPercent}
                    index={columnIndex}
                    showDivider={columnIndex < LEFT_COLUMNS.length - 1}
                    containerStyle={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${columnIndex * HALF_COLUMN_WIDTH_PERCENT}%`,
                      width: `${HALF_COLUMN_WIDTH_PERCENT}%`,
                    }}
                  />
                ))}
              </motion.div>
              <motion.div
                style={{ ...doorHalfBaseStyle, left: '50%' }}
                exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
                transition={reducedMotion ? { duration: 0.3 } : DOOR_EXIT_TRANSITION}
              >
                {RIGHT_COLUMNS.map((heightPercent, columnIndex) => (
                  <SplashColumn
                    key={`splash-col-${columnIndex + 10}`}
                    heightPercent={heightPercent}
                    index={columnIndex + 10}
                    showDivider={columnIndex < RIGHT_COLUMNS.length - 1}
                    containerStyle={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${columnIndex * HALF_COLUMN_WIDTH_PERCENT}%`,
                      width: `${HALF_COLUMN_WIDTH_PERCENT}%`,
                    }}
                  />
                ))}
              </motion.div>
            </Box>
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                backdropFilter: 'blur(5px) saturate(1.08) brightness(0.88)',
                WebkitBackdropFilter: 'blur(5px) saturate(1.08) brightness(0.88)',
              }}
            />

            <motion.div
              exit={{ opacity: 0, scale: 0.86 }}
              transition={SPINNER_EXIT_TRANSITION}
              style={{
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SplashLtrShell>,
    portalTarget,
  )
}
