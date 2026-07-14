'use client'

import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import type { RelatedProjectCard as RelatedProjectCardType } from '../types'
import CornerBrackets from '../shared/CornerBrackets'
import {
  relatedArrowSx,
  relatedCardSx,
  relatedDescriptionSx,
  relatedFooterSx,
  relatedLogoSlotSx,
  relatedTitleSx,
} from './constants'

// Peek animation constants — mirrors LogoFlipCard
const PEEK_ANGLE = 38
const PEEK_DELAY_MS = 1800
const PEEK_DURATION_MS = 520
const PEEK_HOLD_MS = 180
const PEEK_RETURN_MS = 420
const PEEK_INTERVAL_MS = 6000

const faceBase = {
  position: 'absolute' as const,
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backfaceVisibility: 'hidden' as const,
  WebkitBackfaceVisibility: 'hidden' as const,
  padding: '15px',
}

type RelatedProjectCardProps = {
  project: RelatedProjectCardType
}

export default function RelatedProjectCard({ project }: RelatedProjectCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [hovered, setHovered] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)

  // Peek animation — same logic as LogoFlipCard
  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>
    let cancelled = false

    const peek = () => {
      if (cancelled || !el) return
      const total = PEEK_DURATION_MS + PEEK_HOLD_MS + PEEK_RETURN_MS
      const anim = el.animate(
        [
          { transform: 'rotateY(0deg)' },
          { transform: `rotateY(${PEEK_ANGLE}deg)`, offset: PEEK_DURATION_MS / total },
          { transform: `rotateY(${PEEK_ANGLE}deg)`, offset: (PEEK_DURATION_MS + PEEK_HOLD_MS) / total },
          { transform: 'rotateY(0deg)' },
        ],
        { duration: total, easing: 'ease-in-out', fill: 'none' },
      )
      el.closest('.related-card')?.addEventListener('mouseenter', () => anim.cancel(), { once: true })
    }

    timeoutId = setTimeout(() => {
      peek()
      intervalId = setInterval(peek, PEEK_INTERVAL_MS)
    }, PEEK_DELAY_MS)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Box
      className="related-card"
      component={Link}
      href={`/projects/${project.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      sx={relatedCardSx(theme, hovered)}
    >
      <CornerBrackets />

      {/* Flip card container */}
      <Box sx={relatedLogoSlotSx}>
        <Box sx={{ width: '100%', perspective: 1200 }}>
          <Box
            ref={innerRef}
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 80, sm: 150 },
              transformStyle: 'preserve-3d',
              transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front */}
            <Box sx={faceBase}>
              {project.logo.src ? (
                <Box
                  component="img"
                  src={project.logo.src}
                  alt={project.logo.alt}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : null}
            </Box>

            {/* Back */}
            <Box sx={{ ...faceBase, transform: 'rotateY(180deg)' }}>
              {project.logoFlip?.src ? (
                <Box
                  component="img"
                  src={project.logoFlip.src}
                  alt={project.logoFlip.alt}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : project.logo.src ? (
                <Box
                  component="img"
                  src={project.logo.src}
                  alt={project.logo.alt}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={relatedFooterSx}>
        <Box sx={{ flex: 1, minWidth: 0, position: 'relative', overflow: 'hidden' }}>
          <Typography sx={relatedTitleSx}>{project.title}</Typography>

          <AnimatePresence>
            {hovered ? (
              <Typography
                component={motion.p}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                sx={relatedDescriptionSx}
              >
                {project.description}
              </Typography>
            ) : null}
          </AnimatePresence>
        </Box>

        <Box sx={relatedArrowSx}>
          <ArrowUpRight size={isMobile ? 12 : 20} color={theme.palette.primary.light} strokeWidth={2} />
        </Box>
      </Box>
    </Box>
  )
}
