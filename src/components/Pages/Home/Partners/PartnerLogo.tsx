'use client'

import { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import type { PartnerLogoProps } from './types'
import { HOVER_SCALE, HOVER_TRANSITION, REVEAL_STAGGER_S, REVEAL_TRANSITION } from './constants'

const MotionBox = motion.create(Box)

export default function PartnerLogo({ partner, index, visible }: PartnerLogoProps) {
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const showColor = reduceMotion || hovered

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
      <MotionBox
        tabIndex={reduceMotion ? -1 : 0}
        role="img"
        aria-label={partner.name}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        animate={{ scale: showColor && !reduceMotion ? HOVER_SCALE : 1 }}
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
            filter: showColor
              ? theme => `drop-shadow(0 0 37.5px ${alpha(theme.palette.primary.main, 0.55)})`
              : 'none',
            transition: 'filter 0.3s ease',
          }}
        >
          <MotionBox
            aria-hidden={showColor}
            animate={{ opacity: showColor ? 0 : 1 }}
            transition={HOVER_TRANSITION}
            sx={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={partner.cyanSrc}
              alt=""
              fill
              sizes="(max-width: 600px) 45vw, 200px"
              priority={index < 2}
              style={{ objectFit: 'contain' }}
            />
          </MotionBox>

          <MotionBox
            aria-hidden={!showColor}
            animate={{ opacity: showColor ? 1 : 0 }}
            transition={HOVER_TRANSITION}
            sx={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={partner.colorSrc}
              alt=""
              fill
              sizes="(max-width: 600px) 45vw, 200px"
              style={{ objectFit: 'contain' }}
            />
          </MotionBox>
        </Box>
      </MotionBox>
    </Box>
  )
}
