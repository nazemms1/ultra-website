'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import type { DemoScreenshot } from '../types'

type DeviceShowcaseProps = {
  device: 'mobile' | 'desktop'
  screenshot: DemoScreenshot
  index: number
}

// Captures wheel events on the element and scrolls it, preventing page scroll.
function useWheelScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const atTop = scrollTop === 0 && e.deltaY < 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0
      if (!atTop && !atBottom) {
        e.preventDefault()
        e.stopPropagation()
        el.scrollTop += e.deltaY
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [ref])
}

// Attaches the scroll-hint behaviour to any scroll container ref.
// Returns a visible state so the hint overlay can fade out.
function useScrollHint(scrollRef: React.RefObject<HTMLElement | null>) {
  const [hintVisible, setHintVisible] = useState(false)
  const didPeekRef = useRef(false)

  const dismiss = useCallback(() => setHintVisible(false), [])

  useEffect(() => {
    // Reset when screenshot changes
    didPeekRef.current = false
    setHintVisible(false)

    const el = scrollRef.current
    if (!el) return

    // Only show hint when there is actually scrollable content
    const checkScrollable = () => {
      if (el.scrollHeight <= el.clientHeight + 2) return
      if (didPeekRef.current) return
      didPeekRef.current = true

      // Small delay so the entrance animation finishes first
      const showTimer = setTimeout(() => {
        setHintVisible(true)

          // Dismiss after a few seconds regardless
        const dismissTimer = setTimeout(() => setHintVisible(false), 3200)

        return () => clearTimeout(dismissTimer)
      }, 500)

      return () => clearTimeout(showTimer)
    }

    // Wait for image to load so scrollHeight is accurate
    const img = el.querySelector('img')
    if (img && !img.complete) {
      img.addEventListener('load', checkScrollable, { once: true })
    } else {
      checkScrollable()
    }

    // Dismiss on user scroll
    el.addEventListener('scroll', dismiss, { passive: true, once: true })
    return () => {
      el.removeEventListener('scroll', dismiss)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef])

  return { hintVisible, dismiss }
}

function ScrollHintOverlay({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onDismiss}
          style={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            pointerEvents: 'auto',
            cursor: 'default',
          }}
        >
          {/* Track */}
          <Box
            sx={{
              width: 24,
              height: 40,
              borderRadius: '12px',
              border: '1.5px solid rgba(13, 241, 217, 0.55)',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(6px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated dot */}
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: '#0DF1D9',
                transform: 'translateX(-50%)',
                top: 5,
                animation: 'scrollDotDrop 1.4s ease-in-out infinite',
                '@keyframes scrollDotDrop': {
                  '0%':   { top: '5px', opacity: 1 },
                  '60%':  { top: '26px', opacity: 0.8 },
                  '100%': { top: '5px', opacity: 0 },
                },
              }}
            />
          </Box>

          {/* Label */}
          <Box
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '9px',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}
          >
            Scroll
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LaptopFrame({ screenshot }: { screenshot: DemoScreenshot }) {
  const theme = useTheme()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { hintVisible, dismiss } = useScrollHint(scrollRef)
  useWheelScroll(scrollRef)

  return (
    // Outer: aspect-ratio box sized to the bezel image (no filter — avoids stacking context)
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 930, mx: 'auto' }}>

      {/* Invisible bezel — sets parent height, no visual output */}
      <Box
        component="img"
        src="/images/web-desktop.png"
        alt=""
        aria-hidden
        sx={{ width: '100%', height: 'auto', display: 'block', visibility: 'hidden' }}
      />

      {/* Screenshot scroll area */}
      <Box
        ref={scrollRef}
        sx={{
          position: 'absolute',
          top: '9.2%',
          bottom: '24.2%',
          left: '13.3%',
          right: '13.3%',
          overflowY: 'auto',
          bgcolor: 'common.black',
          zIndex: 1000,
          borderRadius: '4px',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.1)' },
          '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.15)', borderRadius: '2px' },
          '&::-webkit-scrollbar-thumb:hover': { background: 'rgba(255,255,255,0.3)' },
        }}
      >
        <Box
          component="img"
          src={screenshot.src}
          alt={screenshot.alt}
          sx={{
            width: '100%',
            height: 'auto',
            minHeight: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />

        {/* Bottom fade gradient */}
        <Box
          aria-hidden
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            mt: '-48px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
            pointerEvents: 'none',
            transition: 'opacity 0.4s',
            opacity: hintVisible ? 1 : 0,
          }}
        />
      </Box>

      {/* Visible bezel on top — pointer-events none so scroll area stays interactive */}
      <Box
        component="img"
        src="/images/web-desktop.png"
        alt="Laptop Mockup Frame"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 2,
          pointerEvents: 'none',
          filter: `drop-shadow(30px 20px 40px ${alpha(theme.palette.common.black, 0.45)})`,
        }}
      />

      <ScrollHintOverlay visible={hintVisible} onDismiss={dismiss} />
    </Box>
  )
}

function PhoneFrame({ screenshot, index }: { screenshot: DemoScreenshot; index: number }) {
  const theme = useTheme()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { hintVisible, dismiss } = useScrollHint(scrollRef)
  useWheelScroll(scrollRef)

  return (
    // Outer: sizing + centering only — no filter to avoid breaking stacking context
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 245, mx: 'auto' }}>

      {/* Screenshot scroll area — sits below bezel, fully interactive */}
      <Box
        ref={scrollRef}
        sx={{
          position: 'absolute',
          top: '2.5%',
          bottom: '2.5%',
          left: '5.2%',
          right: '5.2%',
          borderRadius: '32px',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          zIndex: 0,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Box
          component="img"
          src={screenshot.src}
          alt={screenshot.alt}
          sx={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Bottom fade gradient */}
        <Box
          aria-hidden
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            mt: '-48px',
            borderRadius: '0 0 32px 32px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
            pointerEvents: 'none',
            transition: 'opacity 0.4s',
            opacity: hintVisible ? 1 : 0,
          }}
        />
      </Box>

      {/* Bezel on top — filter applied here only, isolated */}
      <Box
        component="img"
        src="/images/mobile-mock.png"
        alt="Mobile Mockup Frame"
        sx={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 1,
          pointerEvents: 'none',
          filter: `drop-shadow(30px 20px 40px ${alpha(theme.palette.common.black, 0.45)})`,
        }}
      />

      <ScrollHintOverlay visible={hintVisible} onDismiss={dismiss} />
    </Box>
  )
}

export default function DeviceShowcase({ device, screenshot, index }: DeviceShowcaseProps) {
  return (
    <AnimatePresence mode="wait">
      <Box
        key={`${device}-${screenshot.id}`}
        component={motion.div}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        {device === 'mobile' ? (
          <PhoneFrame screenshot={screenshot} index={index} />
        ) : (
          <LaptopFrame screenshot={screenshot} />
        )}
      </Box>
    </AnimatePresence>
  )
}
