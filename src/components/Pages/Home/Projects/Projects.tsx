'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import SectionHeader from '@/components/shared/SectionHeader'
import { StaticProjectRow } from './StaticProjectRow'
import { PROJECTS } from './data'
import type { ProjectItem } from './types'
import ProjectCard from './ProjectCard'

/* ─── helpers ─────────────────────────────────────── */

function processProjects(data: any): ProjectItem[] {
  const raw = data ? data.projects || data.items || [] : PROJECTS
  return raw.map((item: any, i: number): ProjectItem => {
    if (item.mockup) return item
    const title = item.title || ''
    const description = item.subtitle || item.description || ''
    const src = item.image?.url || item.image || item.cover_image?.url || item.cover_image || ''
    const isMobile =
      [title, description].join(' ').toLowerCase().match(/mobile|app/) !== null
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

/* ─── scroll timeline ─────────────────────────────── */
// 0 → TITLE_END  : title rises from centre → pinned top
// TITLE_END → 1  : projects swap one by one
const TITLE_END = 0.15

/* ─── component ───────────────────────────────────── */

export default function Projects({ data }: { data?: any }) {
  const reduce = useReducedMotion()
  const theme = useTheme()
  const trackRef = useRef<HTMLDivElement>(null)

  if (data?.is_shown === false) return null

  const projects = processProjects(data)
  if (projects.length === 0) return null

  const { subtitle, title } = getSectionText(data)

  /* ── reduced-motion: simple scrollable layout, no jank ── */
  if (reduce) {
    return (
      <Box
        component="section"
        id="projects"
        sx={{ px: { xs: 3, sm: 5, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' }, py: { xs: 8, md: 12 } }}
      >
        <SectionHeader align="center" subtitle={subtitle} title={title || undefined} />
        <Box sx={{ mx: 'auto', mt: { xs: 6, md: 8 }, maxWidth: 1480, display: 'flex', flexDirection: 'column', gap: { xs: 10, md: 10 } }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            >
              <MobileProjectRow project={p} index={i} />
            </motion.div>
          ))}
        </Box>
      </Box>
    )
  }

  /* ── scroll-jacked layout — height depends on device ── */
  const totalVh = 1 + projects.length
  return (
    <Box
      component="section"
      id="projects"
      ref={trackRef}
      sx={{
        position: 'relative',
        height: { xs: 'auto', md: `${totalVh * 100}vh` },
        px: { xs: 3, sm: 5, md: 0 },
        py: { xs: 8, md: 0 },
      }}
    >
      {/* Mobile Layout (Pure CSS flow) */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          width: '100%',
        }}
      >
        <SectionHeader align="center" subtitle={subtitle} title={title || undefined} />
        <Box sx={{ mx: 'auto', mt: 6, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            >
              <MobileProjectRow project={p} index={i} />
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Desktop Sticky Frame */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* ① Animated title — starts centred, rises to top */}
        <SectionTitle trackRef={trackRef} subtitle={subtitle} title={title} />

        {/* ② Project cards — each one fades in/out driven by scroll */}
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            trackRef={trackRef}
          />
        ))}
      </Box>
    </Box>
  )
}

/* ─── MobileProjectRow ────────────────────────────────
   Image first, then title + description + button.
   No scroll transforms — pure CSS, zero jank.
─────────────────────────────────────────────────────── */

import Image from 'next/image'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { alpha } from '@mui/material/styles'

function MobileProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'
  const isMobileMockup = project.mockup.kind === 'mobile'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: isMobileMockup ? 200 : '100%',
          mx: 'auto',
          aspectRatio: isMobileMockup ? '9/16' : '16/9',
          transform: isMobileMockup ? 'rotate(2deg)' : 'none',
          filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.45))',
        }}
      >
        {/* Subtle glow */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            background: index % 2 === 0
              ? `radial-gradient(ellipse 80% 60% at 20% 70%, ${alpha(theme.palette.primary.main, 0.09)} 0%, transparent 70%)`
              : `radial-gradient(ellipse 80% 60% at 80% 70%, ${alpha(theme.palette.primary.main, 0.09)} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <Image
          src={project.mockup.src}
          alt={project.mockup.alt}
          fill
          sizes="(max-width: 600px) 90vw, 45vw"
          style={{ objectFit: 'contain' }}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </Box>

      {/* Text + button */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          component="h3"
          sx={{
            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
            fontSize: { xs: '1.5rem', sm: '2rem' },
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
            fontSize: { xs: '0.95rem', sm: '1.05rem' },
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
          sx={{ alignSelf: 'flex-start', px: 3, mt: 1 }}
        >
          {isRtl ? 'عرض التفاصيل' : 'See full details'}
        </AnimatedButton>
      </Box>
    </Box>
  )
}

/* ─── SectionTitle ────────────────────────────────── */

function SectionTitle({
  trackRef,
  subtitle,
  title,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>
  subtitle: string
  title: string
}) {
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // y: centres in viewport (below navbar) → moves to top  over 0 → TITLE_END
  const y = useTransform(scrollYProgress, [0, TITLE_END], ['42vh', '0vh'])

  // title (big heading) fades out as header rises — subtitle stays pinned
  const titleOpacity = useTransform(scrollYProgress, [0, TITLE_END * 0.7], [1, 0])

  return (
    <motion.div style={{ y }} data-section-title>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          pt: { xs: '80px', md: '110px' },
          pb: { xs: 2, md: 3 },
          textAlign: 'center',
          px: { xs: 3, md: 8 },
          pointerEvents: 'none',
        }}
      >
        {/* subtitle stays visible at the top while projects are shown */}
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: { xs: 11, md: 15 },
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: 'primary.main',
            mb: 0.75,
          }}
        >
          {subtitle}
        </Typography>

         {title && (
          <motion.div style={{ opacity: titleOpacity }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: "'Nulshock', sans-serif",
                fontSize: { xs: '1.5rem', md: '3.25rem' },
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'text.primary',
                lineHeight: 1.25,
                mx: 'auto',
                wordBreak: 'break-word',
              }}
            >
              {title}
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  )
}
