'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { alpha, useTheme } from '@mui/material/styles'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import SectionHeader from '@/components/shared/SectionHeader'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { PROJECTS } from './data'
import type { ProjectItem } from './types'

/* ─── data mapping ────────────────────────────────────── */

function processProjects(data: any): ProjectItem[] {
  const raw = data ? data.projects || data.items || [] : PROJECTS
  return raw.map((item: any, i: number): ProjectItem => {
    if (item.mockup) return item
    const title = item.title || ''
    const description = item.subtitle || item.description || ''
    const src = item.image?.url || item.image || item.cover_image?.url || item.cover_image || ''
    const isMobile = [title, description].join(' ').toLowerCase().match(/\b(mobile|app)\b/) !== null
    return {
      id: String(item.id),
      title,
      description,
      href: item.id ? `/projects/${item.id}` : '#projects',
      mockup: { src, alt: title, kind: isMobile ? 'mobile' : 'desktop' },
      imageSide: i % 2 === 0 ? 'left' : 'right',
    }
  })
}

function getSectionText(data: any) {
  const s = data?.['main-section'] || data
  return {
    subtitle: s?.title || 'Our Portfolio',
    title: s?.subtitle || s?.description || '',
  }
}

/* ─── section ─────────────────────────────────────────────
   One pinned viewport; projects cross-fade in place as you scroll.

   The whole timeline is derived from `projects.length` — no magic numbers,
   no per-file syncing, no special-casing the last project. The track is
   `total` viewports tall, so every project (the last included) owns an equal
   scroll slice and holds fully visible across it. That equal-slice math is
   exactly what stops the last project from being skipped or left blank.
─────────────────────────────────────────────────────────── */

export default function Projects({ data }: { data?: any }) {
  const reduce = useReducedMotion()

  if (data?.is_shown === false) return null

  const projects = processProjects(data)
  if (projects.length === 0) return null

  const { subtitle, title } = getSectionText(data)

  return reduce ? (
    <StackedProjects projects={projects} subtitle={subtitle} title={title} />
  ) : (
    <PinnedProjects projects={projects} subtitle={subtitle} title={title} />
  )
}

/* ─── pinned, cross-fading variant (default) ──────────── */

function PinnedProjects({
  projects,
  subtitle,
  title,
}: {
  projects: ProjectItem[]
  subtitle: string
  title: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  return (
    <Box
      component="section"
      id="projects"
      ref={trackRef}
      sx={{ position: 'relative', height: `${projects.length * 100}vh` }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: { xs: '100dvh', md: '100vh' },
          overflow: 'hidden',
        }}
      >
        {/* Heading, pinned at the top of the frame */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            pointerEvents: 'none',
            pt: { xs: '80px', md: '110px' },
            px: { xs: 3, md: 8 },
          }}
        >
          <SectionHeader align="center" subtitle={subtitle} title={title || undefined} />
        </Box>

        {/* Projects — each fades/slides in place over its own scroll slice */}
        {projects.map((project, index) => (
          <PinnedProjectPanel
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </Box>
    </Box>
  )
}

function PinnedProjectPanel({
  project,
  index,
  total,
  progress,
}: {
  project: ProjectItem
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // Each project owns the scroll slice centred on (index + 0.5) / total.
  // Everything is derived from the signed distance to that centre, so the
  // first and last projects behave like every other one — no special-casing,
  // and no keyframe arrays to run past the track edges (which is what made
  // the interpolation throw). A project is fully visible at its centre and
  // fades out one slice away on either side.
  const slice = 1 / total
  const center = (index + 0.5) * slice

  // Signed, slice-normalised distance from this project's centre (…, -1, 0, 1, …)
  const dist = useTransform(progress, (p) => (p - center) / slice)

  // A project only fades on a side where it has a neighbour to hand off to.
  // The first project never fades out below its centre, and — crucially — the
  // last project never fades out above its centre, so it stays fully visible
  // to the end of the track instead of leaving the section blank.
  const isFirst = index === 0
  const isLast = index === total - 1

  // Fade band as a fraction of a slice. The outgoing project finishes fading
  // before the incoming one starts, so only one project is ever visible at a
  // time — no overlap between old and new text.
  const FADE = 0.28
  const opacity = useTransform(dist, (d) => {
    // Scrolling past the top edge (d > 0): held solid if this is the last one.
    if (d >= 0.5) return isLast ? 1 : 0
    // Scrolling before the bottom edge (d < 0): held solid if this is the first.
    if (d <= -0.5) return isFirst ? 1 : 0
    const a = Math.abs(d)
    if (a <= 0.5 - FADE) return 1 // solid core of the slice
    // Don't fade on the held side (first→below, last→above).
    if (d < 0 && isFirst) return 1
    if (d > 0 && isLast) return 1
    return (0.5 - a) / FADE // fade across the slice's outer edge
  })
  // Enter from below, hold at centre, exit upwards — but held projects don't
  // drift off on their held side.
  const y = useTransform(dist, (d) => {
    let c = Math.max(-0.5, Math.min(0.5, d))
    if (c < 0 && isFirst) c = 0
    if (c > 0 && isLast) c = 0
    return c * -96
  })
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? 'auto' : 'none'))

  return (
    <Box
      component={motion.div}
      style={{ opacity, y, pointerEvents }}
      sx={{ position: 'absolute', inset: 0 }}
    >
      <ProjectContent project={project} index={index} withHeadingOffset />
    </Box>
  )
}

/* ─── reduced-motion / fallback: plain stacked layout ─── */

function StackedProjects({
  projects,
  subtitle,
  title,
}: {
  projects: ProjectItem[]
  subtitle: string
  title: string
}) {
  return (
    <Box
      component="section"
      id="projects"
      sx={{
        px: { xs: 3, sm: 5, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
        py: { xs: 8, md: 14 },
      }}
    >
      <SectionHeader align="center" subtitle={subtitle} title={title || undefined} />
      <Box sx={{ mx: 'auto', mt: { xs: 6, md: 10 }, maxWidth: 1480, display: 'flex', flexDirection: 'column', gap: { xs: 10, md: 14 } }}>
        {projects.map((project, index) => (
          <ProjectContent key={project.id} project={project} index={index} />
        ))}
      </Box>
    </Box>
  )
}

/* ─── shared content (image + text), used by both variants ── */

function ProjectContent({
  project,
  index,
  withHeadingOffset = false,
}: {
  project: ProjectItem
  index: number
  withHeadingOffset?: boolean
}) {
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'
  const imageFirst = project.imageSide === 'left'

  return (
    <Box
      sx={{
        position: 'relative',
        ...(withHeadingOffset && {
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: '150px', md: '210px' },
          pb: { xs: 5, md: 7 },
        }),
        px: withHeadingOffset ? { xs: 3, sm: 5, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' } : 0,
      }}
    >
      {/* Ambient glow */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            index % 2 === 0
              ? `radial-gradient(ellipse 65% 55% at 12% 50%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 70%)`
              : `radial-gradient(ellipse 65% 55% at 88% 50%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 70%)`,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1480,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          alignItems: 'center',
          gap: { xs: 5, md: 10 },
        }}
      >
        {/* Mockup */}
        <Box sx={{ order: { xs: 0, md: imageFirst ? 0 : 1 }, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 0 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: { xs: '100%', sm: 480, md: 540 },
              aspectRatio: '16/9',
              borderRadius: { xs: '16px', md: '24px' },
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
              bgcolor: alpha(theme.palette.common.black, 0.5),
              boxShadow: `0 30px 60px ${alpha(theme.palette.common.black, 0.5)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.1)}`,
            }}
          >
            <Image
              src={project.mockup.src}
              alt={project.mockup.alt}
              fill
              sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 540px"
              style={{ objectFit: 'fill' }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </Box>
        </Box>

        {/* Text */}
        <Box sx={{ order: { xs: 1, md: imageFirst ? 1 : 0 }, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
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

            <Box sx={{ width: 48, height: 2, borderRadius: 1, background: theme.palette.primary.main }} />

            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                lineHeight: 1.75,
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitLineClamp: 8,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
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
  )
}
