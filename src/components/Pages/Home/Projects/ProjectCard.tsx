'use client'

import type { RefObject } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { alpha, useTheme } from '@mui/material/styles'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import AnimatedButton from '@/components/shared/AnimatedButton'
import type { ProjectItem } from './types'

// Must match Projects.tsx
const TITLE_END = 0.15

interface ProjectCardProps {
  project: ProjectItem
  index: number
  total: number
  trackRef: RefObject<HTMLDivElement | null>
}

export default function ProjectCard({ project, index, total, trackRef }: ProjectCardProps) {
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'
  const imageFirst = project.imageSide === 'left'
  const isMobile = project.mockup.kind === 'mobile'
  const isLast = index === total - 1

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Projects occupy scroll range [TITLE_END, 1].
  // Each project gets an equal slice of that range.
  const projectRange = 1 - TITLE_END
  const segSize = projectRange / total
  const segStart = TITLE_END + index * segSize
  const segEnd = segStart + segSize

  // Enter window: first 40% of segment
  const enterStart = segStart
  const enterEnd = segStart + segSize * 0.4

  // Exit window: overlaps with next card's enter
  const exitStart = segEnd
  const exitEnd = segEnd + segSize * 0.4

  // ── opacity ──────────────────────────────────────────────
  const opacityPoints = isLast
    ? [enterStart, enterEnd]
    : [enterStart, enterEnd, exitStart, exitEnd]
  const opacityValues = isLast
    ? [0, 1]
    : [0, 1, 1, 0]

  const opacity = useTransform(scrollYProgress, opacityPoints, opacityValues, { clamp: true })

  // ── slide up on enter ────────────────────────────────────
  const y = useTransform(scrollYProgress, [enterStart, enterEnd], [40, 0], { clamp: true })

  return (
    <motion.div
      style={{ opacity, y, position: 'absolute', inset: 0 }}
    >
      {/* Subtle radial glow per card */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: index % 2 === 0
            ? `radial-gradient(ellipse 65% 55% at 12% 60%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 70%)`
            : `radial-gradient(ellipse 65% 55% at 88% 60%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 70%)`,
        }}
      />

  
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          
          pt: { xs: '180px', md: '300px' },
          pb: { xs: 4, md: 6 },
          px: { xs: 3, sm: 5, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            alignItems: 'center',
            width: '100%',
            maxWidth: 1480,
            gap: { xs: 5, md: 10 },
          }}
        >
          {/* Mockup */}
          <Box
            sx={{
              order: imageFirst ? 0 : 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: isMobile
                  ? { xs: 180, sm: 240, md: 300 }
                  : { xs: '100%', md: 520 },
                aspectRatio: isMobile ? '9/16' : '16/9',
                transform: isMobile ? 'rotate(2deg)' : 'none',
                filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.45))',
              }}
            >
              <Image
                src={project.mockup.src}
                alt={project.mockup.alt}
                fill
                sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 520px"
                style={{ objectFit: 'contain' }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </Box>
          </Box>

          {/* Text block */}
          <Box
            sx={{
              order: imageFirst ? 1 : 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
              <Typography
                component="h3"
                sx={{
                  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: 'text.primary',
                }}
              >
                {project.title}
              </Typography>

              {/* Accent line */}
              <Box sx={{ width: 48, height: 2, borderRadius: 1, background: theme.palette.primary.main }} />

              <Typography
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  lineHeight: 1.75,
                  color: 'text.secondary',
                }}
              >
                {project.description}
              </Typography>

              <AnimatedButton
                variant="secondary"
                href={project.href}
                endIcon={isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                sx={{ alignSelf: 'flex-start', px: { xs: 3, md: 4 }, mt: 1 }}
              >
                {isRtl ? 'عرض التفاصيل' : 'See full details'}
              </AnimatedButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}
