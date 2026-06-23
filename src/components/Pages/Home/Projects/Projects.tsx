'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha, useTheme } from '@mui/material/styles'
import { useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SECTION_HEADER_INSET } from '@/components/Layout/sectionInsets'
import ShimmerText from '@/components/shared/ShimmerText'
import ProjectPanel from './ProjectPanel'
import { StaticProjectRow } from './StaticProjectRow'
import { MotionBox } from './MotionBox'
import { PROJECTS } from './data'
import { LABEL_PIN, SECTION_FADE_IN, TITLE_FADE_OUT, TITLE_RISE } from './constants'

/** Smooth 0→1 easing for the label pin transition. */
function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

function useViewportHeight() {
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 900)

  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return height
}

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const viewportHeight = useViewportHeight()
  const headerInsetPx = Number.parseFloat(
    theme.spacing(isSmUp ? SECTION_HEADER_INSET.sm : SECTION_HEADER_INSET.xs),
  )
  const titleGapPx = Number.parseFloat(theme.spacing(isMdUp ? 3 : 2))

  const estimatedHeroLabelY = viewportHeight * 0.5 - (isMdUp ? 100 : 76)
  const [labelHeroOffset, setLabelHeroOffset] = useState(() => estimatedHeroLabelY - headerInsetPx)
  const labelHeroOffsetMV = useMotionValue(labelHeroOffset)

  useEffect(() => {
    labelHeroOffsetMV.set(labelHeroOffset)
  }, [labelHeroOffset, labelHeroOffsetMV])

  useLayoutEffect(() => {
    const measure = () => {
      const sticky = stickyRef.current
      const stage = stageRef.current
      const title = titleRef.current
      if (!sticky || !stage || !title) return

      const stickyTop = sticky.getBoundingClientRect().top
      const stageRect = stage.getBoundingClientRect()
      const stageCenterY = stageRect.top + stageRect.height / 2 - stickyTop

      const titleStyles = getComputedStyle(title)
      const titleMarginTop = Number.parseFloat(titleStyles.marginTop) || titleGapPx
      const titleHeight = title.getBoundingClientRect().height
      const labelHeight = labelRef.current?.getBoundingClientRect().height ?? (isMdUp ? 20 : 18)

      const titleMarginBoxTop = stageCenterY - (titleMarginTop + titleHeight) / 2
      const heroLabelY = titleMarginBoxTop - labelHeight

      setLabelHeroOffset(heroLabelY - headerInsetPx)
    }

    measure()

    const observer = new ResizeObserver(measure)
    if (stickyRef.current) observer.observe(stickyRef.current)
    if (stageRef.current) observer.observe(stageRef.current)
    if (titleRef.current) observer.observe(titleRef.current)
    if (labelRef.current) observer.observe(labelRef.current)

    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [headerInsetPx, isMdUp, titleGapPx, viewportHeight])

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

  const labelY = useTransform([progress, labelHeroOffsetMV], ([p, offset]: number[]) => {
    const heroOffset = typeof offset === 'number' ? offset : 0
    const [riseStart, riseEnd] = TITLE_RISE
    const [pinStart, pinEnd] = LABEL_PIN

    if (p <= riseEnd) {
      const riseT = smoothstep((p - riseStart) / (riseEnd - riseStart))
      return heroOffset + 40 * (1 - riseT)
    }

    if (p < pinStart) {
      return heroOffset
    }

    if (p <= pinEnd) {
      const pinT = smoothstep((p - pinStart) / (pinEnd - pinStart))
      return heroOffset * (1 - pinT)
    }

    return 0
  })

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
        ref={stickyRef}
        style={{ opacity: wrapperOpacity }}
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
        <AmbientGlow />

        {/* Header band — single PortfolioLabel animates from hero position to pinned top */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 30,
            flexShrink: 0,
            pt: SECTION_HEADER_INSET,
            pb: { xs: 1, sm: 1.25 },
            textAlign: 'center',
            px: 3,
            pointerEvents: 'none',
          }}
        >
          <MotionBox style={{ y: labelY, willChange: 'transform' }}>
            <PortfolioLabel labelRef={labelRef} />
          </MotionBox>
        </Box>

        {/* Project stage */}
        <Box ref={stageRef} sx={{ position: 'relative', zIndex: 1, flex: 1, minHeight: 0 }}>
          <MotionBox
            style={{ y: titleY, opacity: titleOpacity }}
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              px: 3,
              pointerEvents: 'none',
            }}
          >
            <MainTitle titleRef={titleRef} />
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
        </Box>
      </MotionBox>
    </Box>
  )
}

function SectionHeading() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <PortfolioLabel />
      <MainTitle />
    </Box>
  )
}

function PortfolioLabel({ labelRef }: { labelRef?: React.RefObject<HTMLParagraphElement | null> }) {
  return (
    <Typography
      ref={labelRef}
      component="p"
      sx={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: { xs: '11px', sm: '13px' },
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        color: 'primary.main',
      }}
    >
      Our Portfolio
    </Typography>
  )
}

function MainTitle({ titleRef }: { titleRef?: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <Typography
      ref={titleRef}
      component="h2"
      sx={{
        fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
        fontSize: { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' },
        lineHeight: 1.1,
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
        color: 'text.primary',
        mt: { xs: 2, md: 3 },
      }}
    >
      Explore Our
      <br />
      Projects in <ShimmerText sx={{ color: 'primary.main' }}>Action</ShimmerText>
    </Typography>
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
          top: 0,
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
          bottom: 0,
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
