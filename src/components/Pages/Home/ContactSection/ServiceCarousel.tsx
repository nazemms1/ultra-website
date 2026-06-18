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
    top: 'calc(50% - 18px)',
    zIndex: 3,
    width: 36,
    height: 36,
    bgcolor: alpha(theme.palette.background.default, 0.25),
    color: 'primary.main',
    backdropFilter: 'blur(8px)',
    transition: theme.transitions.create(['background-color', 'opacity'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      bgcolor: alpha(theme.palette.primary.main, 0.12),
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
          width: 56,
          zIndex: 2,
          background: `linear-gradient(to right, ${alpha(theme.palette.background.default, 0.95)} 50%, transparent 100%)`,
          // UPDATED: Dynamic opacity & visibility based on scroll availability
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
          width: 56,
          zIndex: 2,
          background: `linear-gradient(to left, ${alpha(theme.palette.background.default, 0.95)} 50%, transparent 100%)`,
          // UPDATED: Dynamic opacity & visibility based on scroll availability
          opacity: scrollState.canNext ? 1 : 0,
          visibility: scrollState.canNext ? 'visible' : 'hidden',
          transition: shadowTransition,
        }}
      />

      {/* Navigation Buttons */}
      <AnimatePresence>
        {showPrev && (
          <MotionIconButton
            initial={{ opacity: 0, x: -8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous services"
            size="small"
            sx={{ ...navButtonSx, left: 4 }}
          >
            <ChevronsLeft size={18} strokeWidth={2} />
          </MotionIconButton>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNext && (
          <MotionIconButton
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next services"
            size="small"
            sx={{ ...navButtonSx, right: 4 }}
          >
            <ChevronsRight size={18} strokeWidth={2} />
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
                minWidth: { xs: '68%', sm: 160 },
                maxWidth: 180,
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
