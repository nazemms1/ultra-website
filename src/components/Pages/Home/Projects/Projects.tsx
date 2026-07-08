'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
  const trackRef = useRef<HTMLDivElement>(null)

  if (data?.is_shown === false) return null

  const projects = processProjects(data)
  if (projects.length === 0) return null

  const { subtitle, title } = getSectionText(data)

  /* ── reduced-motion fallback ── */
  if (reduce) {
    return (
      <Box
        component="section"
        id="projects"
        sx={{ px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' }, py: 12 }}
      >
        <SectionHeader align="center" subtitle={subtitle} title={title || undefined} />
        <Box sx={{ mx: 'auto', mt: 8, maxWidth: 1480, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {projects.map(p => <StaticProjectRow key={p.id} project={p} />)}
        </Box>
      </Box>
    )
  }

  /* ── scroll-jacked layout ──
     Height = 1 viewport for the title intro + 1 per project
  ── */
  const totalVh = 1 + projects.length
  return (
    <Box
      component="section"
      id="projects"
      ref={trackRef}
      sx={{ position: 'relative', height: `${totalVh * 100}vh` }}
    >
      {/* Sticky frame */}
      <Box
        sx={{
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
