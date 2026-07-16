'use client'

import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/shared/SectionHeader'
import PhaseCard, { PhaseCardContent } from './PhaseCard'
import Timeline from './Timeline'
import { PHASES, type Phase } from './data'
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
    return <MobileMethodologies phasesList={phasesList} data={data} />
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

function MobileCardItem({
  phase,
  index,
  total,
  progress,
}: {
  phase: Phase
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // الكارد الأولى (index=0) ثابتة دائماً في مكانها
  // كل كارد تالية: تبدأ من أسفل (100%) وتنزلق لـ 0% عند دورها وتبقى ثابتة
  // n انتقال → كل انتقال يشغل 1/n من التقدم
  const n = total - 1
  const enterAt = (index - 1) / n  // متى تبدأ بالدخول
  const settleAt = index / n        // متى تستقر فوق السابقة

  const motionY = useTransform(
    progress,
    index === 0
      ? [0, 1]
      : [0, enterAt, settleAt, 1],
    index === 0
      ? ['0%', '0%']
      : ['100%', '100%', '0%', '0%']
  )

  // كل كارد تتلاشى عندما تأتي الكارد التي بعدها
  const fadeStart = index / n
  const fadeEnd = Math.min((index + 1) / n, 1)
  const motionOpacity = useTransform(
    progress,
    index === total - 1 ? [0, 1] : [0, fadeStart, fadeEnd, 1],
    index === total - 1 ? [1, 1] : [1, 1, 0, 0]
  )

  return (
    <Box
      component={motion.div}
      style={{ y: motionY, zIndex: index, opacity: motionOpacity }}
      sx={{ position: 'absolute', inset: 0 }}
    >
      <PhaseCardContent phase={phase} />
    </Box>
  )
}

function MobileCardStack({
  phasesList,
  progress,
}: {
  phasesList: Phase[]
  progress: MotionValue<number>
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardHeight, setCardHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!cardRef.current) return
    const measure = () => setCardHeight(cardRef.current!.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(cardRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <Box
      sx={{
        flexShrink: 0,
        position: 'relative',
        mx: 2,
        height: cardHeight ?? 'auto',
        overflow: 'hidden',
      }}
    >
       <Box
        ref={cardRef}
        aria-hidden
        sx={{ visibility: 'hidden', pointerEvents: 'none' }}
      >
        <PhaseCardContent phase={phasesList[0]} />
      </Box>

      {phasesList.map((phase, i) => (
        <MobileCardItem
          key={phase.number}
          phase={phase}
          index={i}
          total={phasesList.length}
          progress={progress}
        />
      ))}
    </Box>
  )
}

function MobileMethodologies({
  phasesList,
  data,
}: {
  phasesList: Phase[]
  data?: MethodologiesProps['data']
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.1,
    restDelta: 0.0005,
  })

  // activeIndex للـ dots فقط
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      setActiveIndex(Math.min(Math.floor(v * phasesList.length), phasesList.length - 1))
    })
  }, [scrollYProgress, phasesList.length])

  return (
    <Box
      component="section"
      id="methodologies"
      ref={trackRef}
      sx={{ position: 'relative', height: `${phasesList.length * 100}dvh` }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexShrink: 0, pt: 10, pb: 3, px: 3 }}>
          <Header title={data?.title} description={data?.description} />
        </Box>

        {/* Wrapper: يأخذ ارتفاع الكارد الأولى (المرجع) ويقص ما يخرج عنه */}
        <MobileCardStack phasesList={phasesList} progress={progress} />

        {/* Dot indicators */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 1,
            pb: 4,
          }}
        >
          {phasesList.map((_, i) => (
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
