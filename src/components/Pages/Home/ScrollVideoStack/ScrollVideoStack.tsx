'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { useScrollVideoScrub } from './useScrollVideoScrub'
import { shouldDisableScrollVideo } from './deviceUtils'

type ScrollVideoStackProps = {
  children: ReactNode
}

const canvasSx = {
  position: 'absolute' as const,
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none' as const,
  userSelect: 'none' as const,
  backgroundColor: 'transparent',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  willChange: 'transform',
  contain: 'strict' as const,
}

export default function ScrollVideoStack({ children }: ScrollVideoStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!!reduceMotion || shouldDisableScrollVideo())
  }, [reduceMotion])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const { isReady, layerOpacity } = useScrollVideoScrub({
    progress: scrollYProgress,
    canvasRef,
    viewportRef,
    disabled,
  })

  return (
    <Box ref={containerRef} sx={{ position: 'relative' }}>
      <Box
        ref={viewportRef}
        aria-hidden
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          bgcolor: 'transparent',
        }}
      >
        <Box
          component={motion.div}
          style={{ opacity: layerOpacity }}
          sx={{
            position: 'absolute',
            inset: 0,
            visibility: isReady ? 'visible' : 'hidden',
          }}
        >
          <Box component="canvas" ref={canvasRef} sx={canvasSx} />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
          mt: { xs: 0, md: '-100vh' },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
