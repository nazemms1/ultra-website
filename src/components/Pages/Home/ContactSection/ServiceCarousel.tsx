'use client'

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { alpha, useTheme } from '@mui/material/styles'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import type { ServiceCarouselProps } from './types'
import ServiceCard from './ServiceCard'
import { AnimatePresence, motion } from 'framer-motion'

const MotionIconButton = motion.create(IconButton)

export default function ServiceCarousel({
  services,
  selectedService,
  onSelect,
}: ServiceCarouselProps) {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [scrollState, setScrollState] = useState({ canPrev: false, canNext: false })

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  useEffect(() => {
    if (!emblaApi) return

    const onSnapChange = () => {
      setScrollState({
        canPrev: emblaApi.canScrollPrev(),
        canNext: emblaApi.canScrollNext(),
      })
    }

    emblaApi.on('init', onSnapChange)
    emblaApi.on('select', onSnapChange)
    emblaApi.on('reInit', onSnapChange)

    return () => {
      emblaApi.off('init', onSnapChange)
      emblaApi.off('select', onSnapChange)
      emblaApi.off('reInit', onSnapChange)
    }
  }, [emblaApi])

  const showPrev = isHovered && scrollState.canPrev
  const showNext = isHovered && scrollState.canNext

  // Shared Navigation Button Styles
  const navButtonSx = {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    zIndex: 3,
    width: 40,
    height: 40,
    bgcolor: 'transparent',
    color: 'primary.main',
    transition: theme.transitions.create(['background-color', 'opacity'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      bgcolor: alpha(theme.palette.primary.main, 0.08),
    },
    '& svg': {
      filter: `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.4)})`,
    },
  }

  // Shared Shadow/Gradient Transition Configuration
  const shadowTransition = theme.transitions.create(['opacity', 'visibility'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  })

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ position: 'relative' }}
    >
      {/* Left Edge Shadow / Gradient Overlay */}
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          zIndex: 2,
          background: `linear-gradient(to right, ${theme.palette.background.default} 15%, transparent 100%)`,
          opacity: scrollState.canPrev ? 1 : 0,
          visibility: scrollState.canPrev ? 'visible' : 'hidden',
          transition: shadowTransition,
        }}
      />

      {/* Right Edge Shadow / Gradient Overlay */}
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          zIndex: 2,
          background: `linear-gradient(to left, ${theme.palette.background.default} 15%, transparent 100%)`,
          opacity: scrollState.canNext ? 1 : 0,
          visibility: scrollState.canNext ? 'visible' : 'hidden',
          transition: shadowTransition,
        }}
      />
      {/* Previous Button (Left Arrow) */}
      <AnimatePresence>
        {showPrev && (
          <MotionIconButton
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous services"
            size="small"
            sx={{ ...navButtonSx, left: 10 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                overflow: 'hidden',
                position: 'relative',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              }}
            >
              <motion.div
                animate={{
                  x: [0, -24],
                }}
                transition={{
                  duration: 0.8, // Faster, snappier loop speed
                  ease: 'linear',
                  repeat: Infinity,
                }}
                style={{
                  display: 'flex',
                  width: 48,
                  position: 'absolute',
                  left: 0,
                }}
              >
                <ChevronsLeft
                  size={22}
                  strokeWidth={2.5}
                  style={{ width: 24, display: 'flex', justifyContent: 'center' }}
                />
                <ChevronsLeft
                  size={22}
                  strokeWidth={2.5}
                  style={{ width: 24, display: 'flex', justifyContent: 'center' }}
                />
              </motion.div>
            </Box>
          </MotionIconButton>
        )}
      </AnimatePresence>

      {/* Next Button (Right Arrow) */}
      <AnimatePresence>
        {showNext && (
          <MotionIconButton
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next services"
            size="small"
            sx={{ ...navButtonSx, right: 10 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                overflow: 'hidden',
                position: 'relative',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              }}
            >
              <motion.div
                animate={{
                  x: [-24, 0],
                }}
                transition={{
                  duration: 0.8, // Faster, snappier loop speed
                  ease: 'linear',
                  repeat: Infinity,
                }}
                style={{
                  display: 'flex',
                  width: 48,
                  position: 'absolute',
                  left: 0,
                }}
              >
                <ChevronsRight
                  size={22}
                  strokeWidth={2.5}
                  style={{ width: 24, display: 'flex', justifyContent: 'center' }}
                />
                <ChevronsRight
                  size={22}
                  strokeWidth={2.5}
                  style={{ width: 24, display: 'flex', justifyContent: 'center' }}
                />
              </motion.div>
            </Box>
          </MotionIconButton>
        )}
      </AnimatePresence>
      {/* Carousel Track */}
      <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          {services.map(service => (
            <Box
              key={service.id}
              sx={{
                flex: '0 0 auto',
                minWidth: { xs: '68%', sm: 191 },
                width: 191,
                maxWidth: 191,
                height: 147.5,
              }}
            >
              <ServiceCard
                service={service}
                selected={selectedService === service.id}
                onSelect={() => onSelect(service.id)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
