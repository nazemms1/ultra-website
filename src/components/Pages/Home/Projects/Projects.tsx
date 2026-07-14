'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const totalVh = 1 + projects.length

  if (isMobile) {
    return <MobileProjects projects={projects} subtitle={subtitle} title={title} />
  }

  return (
    <Box
      component="section"
      id="projects"
      ref={trackRef}
      sx={{
        position: 'relative',
        height: `${totalVh * 100}vh`,
      }}
    >
      {/* Desktop Sticky Frame */}
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

/* ─── MobileProjects ──────────────────────────────────
   نفس منطق الديسكتوب لكن عمودي:
   الصورة تدخل من الأسفل، النص من الأعلى — وكلاهما يخرج
   بالاتجاه المعاكس عند الانتقال للمشروع التالي.
─────────────────────────────────────────────────────── */

function MobileProjectCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: ProjectItem
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const segSize = 1 / total
  const segStart = index * segSize
  const segEnd   = segStart + segSize
  const isLast   = index === total - 1

  const enterStart = segStart
  const enterEnd   = segStart + segSize * 0.4
  const exitStart  = segEnd   - segSize * 0.4
  const exitEnd    = segEnd

  // opacity — نفس الديسكتوب
  const opacity = useTransform(
    scrollYProgress,
    isLast ? [enterStart, enterEnd] : [enterStart, enterEnd, exitStart, exitEnd],
    isLast ? [0, 1]                  : [0, 1, 1, 0]
  )

  // الصورة: تدخل من الأسفل (+60px → 0), تخرج للأعلى (0 → -60px)
  const imgY = useTransform(
    scrollYProgress,
    isLast ? [enterStart, enterEnd] : [enterStart, enterEnd, exitStart, exitEnd],
    isLast ? ['60px', '0px']         : ['60px', '0px', '0px', '-60px']
  )

  // النص: تدخل من الأعلى (-60px → 0), تخرج للأسفل (0 → +60px)
  const txtY = useTransform(
    scrollYProgress,
    isLast ? [enterStart, enterEnd] : [enterStart, enterEnd, exitStart, exitEnd],
    isLast ? ['-60px', '0px']        : ['-60px', '0px', '0px', '60px']
  )

  return (
    <Box
      component={motion.div}
      style={{ opacity, position: 'absolute', inset: 0 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 4 },
        px: 3,
        pt: { xs: '24px', sm: '40px' },
        pb: 8,
      }}
    >
      {/* الصورة تتحرك للأسفل/الأعلى */}
      <Box component={motion.div} style={{ y: imgY }}>
        <MobileProjectImage project={project} index={index} />
      </Box>

      {/* النص يتحرك للأعلى/الأسفل */}
      <Box component={motion.div} style={{ y: txtY }}>
        <MobileProjectText project={project} />
      </Box>
    </Box>
  )
}

function MobileProjectsHeader({
  subtitle,
  title,
}: {
  subtitle: string
  title: string
}) {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 11,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: 'primary.main',
          mb: 0.75,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </Typography>

      {title && (
        <Typography
          component="h2"
          sx={{
            fontFamily: "'Nulshock', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'text.primary',
            lineHeight: 1.25,
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  )
}

function MobileProjects({
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

  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v =>
    setActiveIndex(Math.min(Math.floor(v * projects.length), projects.length - 1))
  )

  return (
    <Box
      component="section"
      id="projects"
      ref={trackRef}
      sx={{ position: 'relative', height: `${projects.length * 100}dvh` }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header — يأخذ مساحته الطبيعية */}
        <Box sx={{ flexShrink: 0, pt: 10, pb: 2, px: 3, zIndex: 10 }}>
          <MobileProjectsHeader
            subtitle={subtitle}
            title={title}
          />
        </Box>

        {/* منطقة الكاردات — تأخذ ما تبقى من المساحة بعد الـ header */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {projects.map((project, i) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </Box>

        {/* Dot indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            pb: 4,
            zIndex: 10,
          }}
        >
          {projects.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: i === activeIndex ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === activeIndex ? 'primary.main' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

/* ─── Mobile sub-components ───────────────────────────── */

import Image from 'next/image'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { alpha } from '@mui/material/styles'

function MobileProjectImage({ project, index }: { project: ProjectItem; index: number }) {
  const theme = useTheme()
  const isMobileMockup = project.mockup.kind === 'mobile'
  return (
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
      <Box
        aria-hidden
        sx={{
          position: 'absolute', inset: 0, borderRadius: 3, pointerEvents: 'none',
          background: index % 2 === 0
            ? `radial-gradient(ellipse 80% 60% at 20% 70%, ${alpha(theme.palette.primary.main, 0.09)} 0%, transparent 70%)`
            : `radial-gradient(ellipse 80% 60% at 80% 70%, ${alpha(theme.palette.primary.main, 0.09)} 0%, transparent 70%)`,
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
  )
}

function MobileProjectText({ project }: { project: ProjectItem }) {
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        component="h3"
        sx={{
          fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
          fontSize: { xs: '1.5rem', sm: '2rem' },
          lineHeight: 1.1, letterSpacing: '0.02em',
          textTransform: 'uppercase', color: 'text.primary',
        }}
      >
        {project.title}
      </Typography>
      <Box sx={{ width: 48, height: 2, borderRadius: 1, background: theme.palette.primary.main }} />
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: { xs: '0.95rem', sm: '1.05rem' },
          lineHeight: 1.75, color: 'text.secondary',
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
  )
}

// للـ ghost card (قياس) والـ reduced-motion فقط
function MobileProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <MobileProjectImage project={project} index={index} />
      <MobileProjectText project={project} />
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

  // y: centres in viewport (below navbar) → moves to top over 0 → TITLE_END
  const y = useTransform(scrollYProgress, [0, TITLE_END], ['42vh', '0vh'])

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
        )}
      </Box>
    </motion.div>
  )
}
