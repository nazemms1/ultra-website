'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import SectionHeader from '@/components/shared/SectionHeader'
import PhaseCard, { PhaseCardContent } from './PhaseCard'
import Timeline from './Timeline'
import { PHASES } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Methodologies() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0005,
  })

  const seekToPhase = (index: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const trackTop = window.scrollY + rect.top
    const scrollable = el.offsetHeight - window.innerHeight
    const target = trackTop + (index / (PHASES.length - 1)) * scrollable
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  if (reduce) {
    return (
      <Box
        component="section"
        id="methodologies"
        sx={{ position: 'relative', overflow: 'hidden', px: 3, py: 12 }}
      >
        <Header />
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
          {PHASES.map(phase => (
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
      aria-label="How we turn ideas into reality"
      sx={{ position: 'relative', height: '500vh' }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          height: '100vh',
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
          }}
        >
          <Header />
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1, flex: 1, minHeight: 0 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 180 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            sx={{
              position: 'absolute',
              inset: 0,
              perspective: '1400px',
              transformStyle: 'preserve-3d',
            }}
          >
            {PHASES.map((phase, i) => (
              <PhaseCard
                key={phase.number}
                phase={phase}
                index={i}
                total={PHASES.length}
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
            pb: 3,
          }}
        >
          <Timeline labels={PHASES.map(p => p.title)} progress={progress} onSeek={seekToPhase} />
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <SectionHeader
      align="center"
      sx={{
        px: 3,
        mb: 0,
        '& h2': {
          mx: 'auto',
          maxWidth: 720,
          fontSize: { xs: '1.375rem', sm: '1.75rem', lg: '2rem' },
        },
      }}
      title={
        <>
          <Box
            component="span"
            sx={{
              display: 'block',
              mb: { xs: 1.25, sm: 1.5 },
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: { xs: '12px', sm: '13px' },
              letterSpacing: '0.45em',
              textTransform: 'none',
              color: 'primary.main',
            }}
          >
            Our methodologies
          </Box>
          How we turn ideas into{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            reality
          </Box>
        </>
      }
    />
  )
}
