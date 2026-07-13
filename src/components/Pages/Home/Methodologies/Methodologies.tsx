'use client'

import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/shared/SectionHeader'
import PhaseCard, { PhaseCardContent } from './PhaseCard'
import Timeline from './Timeline'
import { PHASES } from './data'
import { shouldDisableScrollVideo } from '../ScrollVideoStack/deviceUtils'

const EASE = [0.22, 1, 0.36, 1] as const

interface MethodologiesProps {
  data?: {
    is_shown?: boolean
    title?: string | null
    description?: string | null
    items?: Array<{
      id: number
      phase_number: number
      title: string
      description: string
      mechanisms: string[]
      image: {
        url: string
      }
    }>
  }
}

export default function Methodologies({ data }: MethodologiesProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const items = data?.items || []
  const mappedPhases = items.map(item => ({
    number: String(item.phase_number).padStart(2, '0'),
    title: item.title,
    description: item.description,
    tags: item.mechanisms || [],
    imageUrl: item.image?.url || '',
  }))

  const phasesList = mappedPhases.length > 0 ? mappedPhases : PHASES

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 45,
    mass: 0.1,
    restDelta: 0.0005,
  })

  const seekToPhase = (index: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const trackTop = window.scrollY + rect.top
    const scrollable = el.offsetHeight - window.innerHeight
    const target = trackTop + (index / (phasesList.length - 1)) * scrollable
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  if (data?.is_shown === false) return null

  if (reduce) {
    return (
      <Box
        component="section"
        id="methodologies"
        sx={{ position: 'relative', overflow: 'hidden', px: 3, py: 12 }}
      >
        <Header title={data?.title} description={data?.description} />
        <Box
          sx={{
            mx: 'auto',
            mt: 7,
            display: 'flex',
            maxWidth: 700,
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {phasesList.map(phase => (
            <PhaseCardContent key={phase.number} phase={phase} />
          ))}
        </Box>
      </Box>
    )
  }

  if (isMobile) {
    return (
      <Box
        component="section"
        id="methodologies"
        sx={{ position: 'relative', overflow: 'hidden', px: 3, py: 8 }}
      >
        <Header title={data?.title} description={data?.description} />
        <Box
          sx={{
            mx: 'auto',
            mt: 7,
            display: 'flex',
            maxWidth: 700,
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {phasesList.map(phase => (
            <PhaseCardContent key={phase.number} phase={phase} />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      component="section"
      id="methodologies"
      ref={trackRef}
      sx={{
        position: 'relative',
        height: '250vh',
        overflow: 'visible',
      }}
    >
      {/* Desktop Sticky Deck Timeline */}
      <Box
        sx={{
          display: 'flex',
          position: 'sticky',
          top: 0,
          height: '100dvh',
          minHeight: 700,
          width: '100%',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          aria-hidden
          sx={theme => ({
            pointerEvents: 'none',
            position: 'absolute',
            left: -96,
            top: 96,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.darker, 0.18)} 0%, transparent 65%)`,
            filter: 'blur(20px)',
          })}
        />
        <Box
          aria-hidden
          sx={theme => ({
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            top: 112,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.14)} 0%, transparent 65%)`,
            filter: 'blur(40px)',
          })}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            flexShrink: 0,
            pt: { xs: 11, sm: 12 },
            pb: { xs: 1, sm: 1.25 },
            pointerEvents: 'none',
          }}
        >
          <Header title={data?.title} description={data?.description} />
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1, flex: 1, minHeight: 0 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: isRtl ? -180 : 180 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            sx={{
              position: 'absolute',
              inset: 0,
              perspective: '1450px',
              transformStyle: 'preserve-3d',
            }}
          >
            {phasesList.map((phase, i) => (
              <PhaseCard
                key={phase.number}
                phase={phase}
                index={i}
                total={phasesList.length}
                progress={progress}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            flexShrink: 0,
            px: { xs: 3, sm: 5 },
            pt: { xs: 1.5, sm: 2 },
            pb: { xs: 5, sm: 6 },
          }}
        >
          <Timeline
            labels={phasesList.map(p => p.title)}
            progress={progress}
            onSeek={seekToPhase}
          />
        </Box>
      </Box>
    </Box>
  )
}

function Header({ title, description }: { title?: string | null; description?: string | null }) {
  const t = useTranslations('Methodologies')
  return (
    <SectionHeader
      align="center"
      sx={{
        pointerEvents: 'auto',
        px: 3,
        mb: 0,
        '& h2': {
          mx: 'auto',
          // maxWidth: 920,
        },
      }}
      subtitle={title ?? t('label')}
      title={
        description ?? (
          <>
            {t('heading')}{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              {t('headingHighlight')}
            </Box>
          </>
        )
      }
    />
  )
}
