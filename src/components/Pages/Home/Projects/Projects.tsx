'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import ShimmerText from '@/components/shared/ShimmerText'
import ProjectPanel from './ProjectPanel'
import { StaticProjectRow } from './StaticProjectRow'
import { MotionBox } from './MotionBox'
import { PROJECTS } from './data'
import { SECTION_FADE_IN, TITLE_FADE_OUT, TITLE_RISE } from './constants'

export default function Projects() {
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

  // Whole wrapper fades in on entry and back out when scrolled off the top.
  const wrapperOpacity = useTransform(progress, [...SECTION_FADE_IN], [0, 1])
  // Phase 0 — title rises + fades in, then fades out under the first card.
  const titleY = useTransform(progress, [...TITLE_RISE], [50, 0])
  const titleOpacity = useTransform(
    progress,
    [TITLE_RISE[0], 0.06, TITLE_FADE_OUT[0], TITLE_FADE_OUT[1]],
    [0, 1, 1, 0],
  )

  if (reduce) {
    return (
      <Box component="section" id="projects" sx={{ position: 'relative', px: 3, py: 12 }}>
        <SectionHeading />
        <Box
          sx={{
            mx: 'auto',
            mt: 8,
            display: 'flex',
            maxWidth: 1180,
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {PROJECTS.map(project => (
            <StaticProjectRow key={project.id} project={project} />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      component="section"
      id="projects"
      ref={trackRef}
      aria-label="Explore our projects in action"
      sx={{ position: 'relative', height: '400vh' }}
    >
      <MotionBox
        style={{ opacity: wrapperOpacity }}
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <AmbientGlow />

        {/* Phase 0 — section title, sits behind the project panels */}
        <MotionBox
          style={{ y: titleY, opacity: titleOpacity }}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 3,
            pointerEvents: 'none',
          }}
        >
          <SectionHeading />
        </MotionBox>

        {PROJECTS.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={progress}
          />
        ))}
      </MotionBox>
    </Box>
  )
}

function SectionHeading() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: { xs: '11px', sm: '13px' },
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'primary.main',
          mb: { xs: 2, md: 3 },
        }}
      >
        Our Portfolio
      </Typography>
      <Typography
        component="h2"
        sx={{
          fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
          fontSize: { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' },
          lineHeight: 1.1,
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
          color: 'text.primary',
        }}
      >
        Explore Our
        <br />
        Projects in <ShimmerText sx={{ color: 'primary.main' }}>Action</ShimmerText>
      </Typography>
    </Box>
  )
}

function AmbientGlow() {
  return (
    <>
      <Box
        aria-hidden
        sx={theme => ({
          pointerEvents: 'none',
          position: 'absolute',
          top: -120,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.darker, 0.16)} 0%, transparent 65%)`,
          filter: 'blur(40px)',
        })}
      />
      <Box
        aria-hidden
        sx={theme => ({
          pointerEvents: 'none',
          position: 'absolute',
          bottom: -140,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 65%)`,
          filter: 'blur(50px)',
        })}
      />
    </>
  )
}
