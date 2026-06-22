'use client'

import { useRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { useScrollVideoScrub } from './useScrollVideoScrub'

type ScrollVideoStackProps = {
  children: ReactNode
}

const frameSx = {
  position: 'absolute' as const,
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  pointerEvents: 'none' as const,
  userSelect: 'none' as const,
  transform: 'translateZ(0)',
}

export default function ScrollVideoStack({ children }: ScrollVideoStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLImageElement>(null)
  const reduceMotion = useReducedMotion()
  const disabled = reduceMotion ?? false

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const { isReady, blendOpacity, showOverlay } = useScrollVideoScrub({
    progress: scrollYProgress,
    baseRef,
    overlayRef,
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
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              visibility: isReady ? 'visible' : 'hidden',
            }}
          >
            <Box
              component="img"
              ref={baseRef}
              alt=""
              draggable={false}
              fetchPriority="high"
              decoding="async"
              sx={frameSx}
            />

            {showOverlay && (
              <Box
                component={motion.img}
                ref={overlayRef}
                alt=""
                draggable={false}
                decoding="async"
                style={{ opacity: blendOpacity }}
                sx={frameSx}
              />
            )}
          </Box>
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
