'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowRight } from 'lucide-react'
import { useTransform } from 'framer-motion'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { MotionBox } from './MotionBox'
import { CLIP_CLOSED, CLIP_OPEN, getPanelRanges } from './constants'
import type { ProjectPanelProps } from './types'

export default function ProjectPanel({ project, index, total, progress }: ProjectPanelProps) {
  const { enter, exit } = getPanelRanges(index, total)
  const isFirst = index === 0
  const hasExit = exit !== null

  const [enterStart, enterEnd] = enter
  const exitStart = hasExit ? exit[0] : 1
  const exitEnd = hasExit ? exit[1] : 1

  // Whole-panel opacity: incoming cards fade in, outgoing cards fade out.
  const opacity = useTransform(
    progress,
    isFirst
      ? hasExit
        ? [0, exitStart, exitEnd]
        : [0, 1]
      : hasExit
        ? [enterStart, enterEnd, exitStart, exitEnd]
        : [enterStart, enterEnd],
    isFirst ? (hasExit ? [1, 1, 0] : [1, 1]) : hasExit ? [0, 1, 1, 0] : [0, 1],
  )

  // Phase 2+: subsequent cards slide up from the bottom as they fade in.
  const y = useTransform(progress, [enterStart, enterEnd], isFirst ? [0, 0] : [80, 0])

  // Phase 1: the first card "collapses open" from the centre over the title.
  const clipPath = useTransform(
    progress,
    [enterStart, enterEnd],
    isFirst ? [CLIP_CLOSED, CLIP_OPEN] : [CLIP_OPEN, CLIP_OPEN],
  )

  // Exit split — text leaves to the right, mockup leaves to the left.
  const textX = useTransform(
    progress,
    hasExit ? [exitStart, exitEnd] : [0, 1],
    hasExit ? ['0%', '100%'] : ['0%', '0%'],
  )
  const imageX = useTransform(
    progress,
    hasExit ? [exitStart, exitEnd] : [0, 1],
    hasExit ? ['0%', '-100%'] : ['0%', '0%'],
  )

  const imageFirst = project.imageSide === 'left'
  const isMobileMockup = project.mockup.kind === 'mobile'

  return (
    <MotionBox
      style={{ opacity, y, clipPath }}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 2 + index,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'opacity, transform, clip-path',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1180,
          mx: 'auto',
          px: { xs: 2.5, sm: 4, md: 8 },
          gap: { xs: 2.5, sm: 5, md: 8 },
        }}
      >
        {/* Mockup — true-alpha PNG, exits to the left */}
        <MotionBox
          style={{ x: imageX }}
          sx={{
            order: imageFirst ? 0 : 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={project.mockup.src}
            alt={project.mockup.alt}
            loading="lazy"
            sx={{
              display: 'block',
              width: '100%',
              maxWidth: isMobileMockup
                ? { xs: 150, sm: 220, md: 300 }
                : { xs: 200, sm: 360, md: 480 },
              height: 'auto',
              objectFit: 'contain',
              background: 'transparent',
              transform: isMobileMockup ? 'rotate(3deg)' : 'none',
              filter: 'drop-shadow(0 30px 55px rgba(0, 0, 0, 0.55))',
            }}
          />
        </MotionBox>

        {/* Copy — exits to the right */}
        <MotionBox
          style={{ x: textX }}
          sx={{
            order: imageFirst ? 1 : 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: { xs: 2, md: 4 },
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
            <Typography
              component="h3"
              sx={{
                fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
                fontSize: { xs: '1rem', sm: '1.5rem', md: '1.875rem' },
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: 'text.primary',
              }}
            >
              {project.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1.125rem' },
                lineHeight: { xs: 1.45, md: 1.65 },
                color: 'text.secondary',
                textAlign: 'justify',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: { xs: 5, sm: 8, md: 'unset' },
                overflow: { xs: 'hidden', md: 'visible' },
              }}
            >
              {project.description}
            </Typography>
          </Box>

          <AnimatedButton
            variant="secondary"
            href={project.href}
            endIcon={<ArrowRight size={14} />}
            sx={{
              px: { xs: 2, md: 4 },
              fontSize: { xs: 12, md: 18 },
            }}
          >
            See full details
          </AnimatedButton>
        </MotionBox>
      </Box>
    </MotionBox>
  )
}
