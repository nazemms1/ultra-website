'use client'

import { useRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { useReducedMotion, useScroll } from 'framer-motion'
import { SCROLL_VIDEO_SRC } from './constants'
import { useScrollVideoCanvas } from './useScrollVideoCanvas'

type ScrollVideoStackProps = {
  children: ReactNode
}

export default function ScrollVideoStack({ children }: ScrollVideoStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()
  const theme = useTheme()
  const disabled = reduceMotion ?? false

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const { isReady } = useScrollVideoCanvas({
    progress: scrollYProgress,
    videoRef,
    canvasRef,
    disabled,
  })

  return (
    <Box ref={containerRef} sx={{ position: 'relative', isolation: 'isolate' }}>
      {!disabled && (
        <Box
          aria-hidden
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            transform: 'translateZ(0)',
            bgcolor: 'background.default',
          }}
        >
          <Box
            component="video"
            ref={videoRef}
            src={SCROLL_VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            sx={{
              position: 'absolute',
              width: 1,
              height: 1,
              opacity: 0,
              pointerEvents: 'none',
              visibility: 'hidden',
            }}
          />

          <Box
            component="canvas"
            ref={canvasRef}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: isReady ? 1 : 0,
              transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.standard,
              }),
              transform: 'translateZ(0)',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          ...(!disabled && { mt: '-100vh' }),
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
