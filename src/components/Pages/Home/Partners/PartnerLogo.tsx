'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import type { PartnerLogoProps } from './types'
import { HOVER_SCALE, HOVER_TRANSITION, REVEAL_STAGGER_S, REVEAL_TRANSITION } from './constants'
import { shouldDisableScrollVideo } from '../ScrollVideoStack/deviceUtils'

const MotionBox = motion.create(Box)

export default function PartnerLogo({ partner, index, visible }: PartnerLogoProps) {
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleTap = () => {
    const isMobileDevice = shouldDisableScrollVideo()
    if (!isMobileDevice) return

    if (partner.url) {
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setActive(prev => !prev)

    timeoutRef.current = setTimeout(() => {
      setActive(false)
    }, 1800)
  }

  const showColor = reduceMotion || hovered || active

  const inner = (
    <MotionBox
      tabIndex={partner.url ? -1 : reduceMotion ? -1 : 0}
      role="img"
      aria-label={partner.name}
      onMouseEnter={() => !shouldDisableScrollVideo() && setHovered(true)}
      onMouseLeave={() => !shouldDisableScrollVideo() && setHovered(false)}
      onFocus={() => !shouldDisableScrollVideo() && setHovered(true)}
      onBlur={() => !shouldDisableScrollVideo() && setHovered(false)}
      onClick={handleTap}
      animate={{
        scale:
          (showColor && !reduceMotion && !shouldDisableScrollVideo()) || active ? HOVER_SCALE : 1,
      }}
      transition={HOVER_TRANSITION}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: reduceMotion ? 'default' : 'pointer',
        outline: 'none',
        '&:focus-visible': {
          borderRadius: '50px',
          boxShadow: theme => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.65)}`,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src={showColor ? partner.colorSrc : partner.cyanSrc}
          alt=""
          fill
          sizes="(max-width: 600px) 45vw, 200px"
          priority={index < 2}
          style={{
            objectFit: 'contain',
            transition: 'filter 0.3s ease',
            filter:
              (showColor && !shouldDisableScrollVideo()) || active
                ? 'drop-shadow(0 0 37.5px rgba(13,241,217,0.55))'
                : 'none',
          }}
        />
      </Box>
    </MotionBox>
  )

  return (
    <Box
      sx={{
        width: {
          xs: 'calc(50% - 12px)',
          sm: partner.slotWidth * 0.82,
          md: partner.slotWidth,
        },
        height: {
          xs: Math.round(partner.slotHeight * 0.62),
          sm: Math.round(partner.slotHeight * 0.82),
          md: partner.slotHeight,
        },
        flexShrink: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: REVEAL_TRANSITION,
        transitionDelay: visible ? `${index * REVEAL_STAGGER_S}s` : '0s',
      }}
    >
      {partner.url ? (
        <Box
          component="a"
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={partner.name}
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            textDecoration: 'none',
            '&:focus-visible': {
              borderRadius: '50px',
              outline: theme => `2px solid ${alpha(theme.palette.primary.main, 0.65)}`,
            },
          }}
        >
          {inner}
        </Box>
      ) : (
        inner
      )}
    </Box>
  )
}
