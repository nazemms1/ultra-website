'use client'

import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import { alpha, useTheme } from '@mui/material/styles'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import { glassSurface } from '@/lib/theme/surfaces'

// Widget 1: Web Development - Translucent Code Editor & Page Speed Dial
function WebDevWidget({ active }: { active: boolean }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(13, 241, 217, 0.15)',
        boxShadow: 'inset 0 0 24px rgba(13, 241, 217, 0.05)',
      }}
    >
      {/* Code Bar */}
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#eab308' }} />
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
      </Stack>

      {/* Code Text */}
      <Stack
        spacing={0.5}
        sx={{ fontFamily: 'monospace', fontSize: '11px', color: '#8892b0', textAlign: 'left' }}
      >
        <Box sx={{ color: '#0DF1D9' }}>const Application = () =&gt; &#123;</Box>
        <Box sx={{ pl: 2, color: '#ffffff' }}>return (</Box>
        <Box sx={{ pl: 4, color: '#a0aec0' }}>
          &lt;<span style={{ color: '#0DF1D9' }}>Performance</span> score=&#123;99&#125; /&gt;
        </Box>
        <Box sx={{ pl: 2, color: '#ffffff' }}>)</Box>
        <Box sx={{ color: '#0DF1D9' }}>&#125;</Box>
      </Stack>

      {/* Speed Dial Metric */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 2,
          pt: 1.5,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Stack spacing={0.25} sx={{ textAlign: 'left' }}>
          <Typography
            sx={{ fontSize: '10px', color: '#0DF1D9', fontWeight: 700, letterSpacing: '0.05em' }}
          >
            LOAD TIME
          </Typography>
          <Typography
            sx={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', fontFamily: 'Rajdhani' }}
          >
            0.32 seconds
          </Typography>
        </Stack>
        <Box
          sx={{
            position: 'relative',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="44" height="44" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="3"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#0DF1D9"
              strokeDasharray="99, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
          <Typography
            sx={{
              position: 'absolute',
              fontSize: '11px',
              fontWeight: 700,
              color: '#0DF1D9',
              fontFamily: 'Rajdhani',
            }}
          >
            99
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

// Widget 2: UI/UX Design - Floating Interaction Cards & Glowing Ratings
function UiUxWidget({ active }: { active: boolean }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(13, 241, 217, 0.15)',
        boxShadow: 'inset 0 0 24px rgba(13, 241, 217, 0.05)',
      }}
    >
      {/* Floating social likes pill */}
      <motion.div
        animate={active ? { y: [10, 0, 10] } : {}}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                bgcolor: 'rgba(13, 241, 217, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0DF1D9">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </Box>
            <Stack sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '10px', color: 'text.secondary', fontWeight: 600 }}>
                REACTION
              </Typography>
              <Typography
                sx={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', fontFamily: 'Rajdhani' }}
              >
                + 12.4k Likes
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: '#0DF1D9',
              boxShadow: '0 0 8px #0DF1D9',
            }}
          />
        </Stack>
      </motion.div>

      {/* Star Reviews Widget */}
      <Stack
        spacing={0.5}
        sx={{ textAlign: 'left', pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Typography
          sx={{ fontSize: '10px', color: '#0DF1D9', fontWeight: 700, letterSpacing: '0.05em' }}
        >
          USER EXPERIENCE
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Rating
            value={5}
            readOnly
            size="small"
            sx={{ color: '#0DF1D9', filter: 'drop-shadow(0 0 4px rgba(13,241,217,0.5))' }}
          />
          <Typography
            sx={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: 'Rajdhani' }}
          >
            4.9 / 5.0 Rating
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

// Widget 3: AI & Automation - Animated Neural Waves & Metric Progress
function AiAutomationWidget({ active }: { active: boolean }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(13, 241, 217, 0.15)',
        boxShadow: 'inset 0 0 24px rgba(13, 241, 217, 0.05)',
      }}
    >
      {/* Wave chart animation */}
      <Box sx={{ height: 60, width: '100%', position: 'relative', overflow: 'hidden' }}>
        <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
          <motion.path
            d="M0 40 Q25 20, 50 40 T100 40 T150 40 T200 40"
            fill="none"
            stroke="rgba(13, 241, 217, 0.2)"
            strokeWidth="1.5"
            animate={
              active
                ? {
                    d: [
                      'M0 40 Q25 20, 50 40 T100 40 T150 40 T200 40',
                      'M0 40 Q25 50, 50 20 T100 30 T150 50 T200 30',
                      'M0 40 Q25 20, 50 40 T100 40 T150 40 T200 40',
                    ],
                  }
                : {}
            }
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          <motion.path
            d="M0 30 Q25 50, 50 20 T100 40 T150 15 T200 35"
            fill="none"
            stroke="#0DF1D9"
            strokeWidth="2.5"
            animate={
              active
                ? {
                    d: [
                      'M0 30 Q25 50, 50 20 T100 40 T150 15 T200 35',
                      'M0 30 Q25 15, 50 45 T100 20 T150 50 T200 20',
                      'M0 30 Q25 50, 50 20 T100 40 T150 15 T200 35',
                    ],
                  }
                : {}
            }
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
        </svg>
      </Box>

      {/* Automation Metrics Progress */}
      <Stack
        spacing={1}
        sx={{ textAlign: 'left', pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Typography
          sx={{ fontSize: '10px', color: '#0DF1D9', fontWeight: 700, letterSpacing: '0.05em' }}
        >
          AUTOMATION RATIO
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', fontFamily: 'Rajdhani' }}
          >
            Tasks Automated
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 700, color: '#0DF1D9', fontFamily: 'Rajdhani' }}
          >
            + 340%
          </Typography>
        </Stack>
        <Box
          sx={{
            width: '100%',
            height: 4,
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{ height: '100%', backgroundColor: '#0DF1D9', borderRadius: 2 }}
            initial={{ width: 0 }}
            animate={active ? { width: '82%' } : { width: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </Box>
      </Stack>
    </Box>
  )
}

// Widget 4: Cloud & DevOps - Translucent Server Status and Latency
function DevOpsWidget({ active }: { active: boolean }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(13, 241, 217, 0.15)',
        boxShadow: 'inset 0 0 24px rgba(13, 241, 217, 0.05)',
      }}
    >
      {/* Latency meter */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', height: 60 }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '2px solid rgba(13,241,217,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                bgcolor: '#0DF1D9',
                boxShadow: '0 0 10px #0DF1D9',
              }}
            />
          </Box>
          <Box
            component={motion.div}
            animate={active ? { scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
            sx={{
              position: 'absolute',
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '2px solid #0DF1D9',
            }}
          />
        </Box>
        <Stack sx={{ textAlign: 'left' }}>
          <Typography sx={{ fontSize: '10px', color: 'text.secondary', fontWeight: 600 }}>
            LATENCY
          </Typography>
          <Typography
            sx={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', fontFamily: 'Rajdhani' }}
          >
            12 ms Avg
          </Typography>
        </Stack>
      </Stack>

      {}
      <Stack
        spacing={0.5}
        sx={{ textAlign: 'left', pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Typography
          sx={{ fontSize: '10px', color: '#0DF1D9', fontWeight: 700, letterSpacing: '0.05em' }}
        >
          SYSTEM HEALTH
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: 'Rajdhani' }}
          >
            Cloud Uptime
          </Typography>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 700, color: '#0DF1D9', fontFamily: 'Rajdhani' }}
          >
            99.99%
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

// React SVG icon in primary color
const ReactIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="-11.5 -10.23 23 20.46"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    style={{ marginRight: 6 }}
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

// Flutter SVG icon in primary color
const FlutterIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
    <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zm7.37 12.816L14.314 20.2 9.7 15.584l7.984-7.984h7.37z" />
  </svg>
)

const tagIcons: Record<string, React.ReactNode> = {
  React: <ReactIcon />,
  Flutter: <FlutterIcon />,
}

// Sample services data with 3D illustrations from public folder
const STACK_SERVICES = [
  {
    title: 'Web Development',
    description:
      'We specialize in crafting robust, high-performance applications and web platforms that are thoughtfully engineered to evolve seamlessly with your business needs. Our solutions emphasize seamless scalability and resilience, ensuring your systems maintain optimal reliability and responsiveness even as demand grows. By integrating intuitive design principles and advanced technologies, we create user-friendly experiences that drive engagement and efficiency, empowering your business to thrive in dynamic markets.',
    image: '/images/methodologies/1.png',
    tags: ['React', 'Flutter'],
  },
  {
    title: 'UI/UX Design',
    description:
      'We craft intuitive, accessible interfaces that turn complex products into effortless experiences. Grounded in research and a cohesive design system, every flow is shaped to delight users while driving the metrics your business cares about — from activation to retention and conversion.',
    image: '/images/methodologies/2.png',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    title: 'AI & Automation',
    description:
      "We build AI-powered systems and automation pipelines that remove bottlenecks and multiply your team's capacity. From custom machine learning models and LLM integrations to end-to-end workflow automation, we help you move faster and unlock insights.",
    image: '/images/methodologies/3.png',
    tags: ['LLMs', 'OpenAI', 'Python', 'Automation'],
  },
  {
    title: 'Cloud & DevOps',
    description:
      'We design resilient cloud infrastructure and automated delivery pipelines that scale effortlessly with demand. From infrastructure-as-code and containerized workloads to zero-downtime deployments, we give your teams the confidence to ship faster.',
    image: '/images/methodologies/4.png',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
]

interface CardWrapperProps {
  service: (typeof STACK_SERVICES)[0]
  index: number
  total: number
  progress: MotionValue<number>
}

function CardWrapper({ service, index, total, progress }: CardWrapperProps) {
  const theme = useTheme()

  // Normalized center position for this card
  const progressActive = index / (total - 1)
  const step = 1 / (total - 1)

  // Motion transforms based on scroll progress (relative to adjacent active states)
  const y = useTransform(
    progress,
    [progressActive - step, progressActive, progressActive + step],
    [380, 0, -380],
  )

  const opacity = useTransform(
    progress,
    [progressActive - 2 * step, progressActive - step, progressActive, progressActive + step],
    [0, 0.45, 1, 0],
  )

  const scaleX = useTransform(
    progress,
    [progressActive - step, progressActive, progressActive + step],
    [0.82, 1, 0.88],
  )

  const scaleY = useTransform(
    progress,
    [progressActive - step, progressActive, progressActive + step],
    [0.86, 1, 0.88],
  )

  const blurValue = useTransform(
    progress,
    [progressActive - step, progressActive, progressActive + step],
    [2.5, 0, 10],
  )
  const filter = useMotionTemplate`blur(${blurValue}px)`

  const zIndex = useTransform(
    progress,
    [progressActive - step, progressActive, progressActive + step],
    [5, 10, 1],
  )

  const pointerEvents = useTransform(progress, p =>
    Math.abs(p - progressActive) < step * 0.4 ? 'auto' : 'none',
  )

  return (
    <Box
      component={motion.div}
      style={{
        y,
        opacity,
        scaleX,
        scaleY,
        filter,
        zIndex,
        pointerEvents,
      }}
      sx={{
        position: 'absolute',
        width: 'min(92vw, 1120px)',
        height: 'fit-content',
        willChange: 'transform, opacity, filter',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          p: { xs: 3.5, md: 5.5 },
          ...glassSurface(theme, { radius: '24px' }),
          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.primary.main, 0.015)} 45%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.7) 100%)`,
          borderColor: alpha(theme.palette.primary.main, 0.2),
          boxShadow: [
            `0 30px 60px ${alpha(theme.palette.common.black, 0.55)}`,
            `inset 1px 1px 0 0 ${alpha(theme.palette.primary.main, 0.25)}`,
            `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
          ].join(', '),
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 14,
            height: 14,
            borderTop: `2px solid ${theme.palette.primary.main}`,
            borderLeft: `2px solid ${theme.palette.primary.main}`,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 14,
            height: 14,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            borderRight: `2px solid ${theme.palette.primary.main}`,
          }}
        />

        {/* Left Side: 3D Illustration */}
        <Box
          sx={{
            width: { xs: 160, md: 280 },
            height: { xs: 160, md: 280 },
            flexShrink: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={service.image}
            alt={service.title}
            width={280}
            height={280}
            style={{
              objectFit: 'contain',
              filter: `drop-shadow(0 10px 25px ${alpha(theme.palette.primary.main, 0.3)})`,
            }}
          />
        </Box>

        {/* Right Side: Text & Tags */}
        <Stack spacing={2} sx={{ flex: 1, alignItems: 'flex-start' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.02em',
              fontSize: { xs: '20px', md: '24px' },
            }}
          >
            {service.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Rajdhani", sans-serif',
              color: '#CEFAFE99',
              lineHeight: 1.62,
              fontSize: { xs: '12px', md: '12px' },
              // letterSpacing: '0.015em',
            }}
          >
            {service.description}
          </Typography>

          <Stack spacing={1.25} sx={{ pt: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '11px',
              }}
            >
              Tools Used
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {service.tags.map(tag => (
                <Chip
                  key={tag}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                      {tagIcons[tag]}
                      <Box component="span" sx={{ color: '#ffffff' }}>
                        {tag}
                      </Box>
                    </Box>
                  }
                  size="medium"
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.35)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    color: '#ffffff',
                    fontWeight: 500,
                    fontSize: '13px',
                    borderRadius: '100px',
                    px: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default function ServicesCardStack() {
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.3,
    restDelta: 0.001,
  })

  return (
    <Box
      ref={trackRef}
      sx={{
        position: 'relative',
        height: '400vh', // Scrolling track length
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        {/* Render card deck */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {STACK_SERVICES.map((service, index) => (
            <CardWrapper
              key={service.title}
              service={service}
              index={index}
              total={STACK_SERVICES.length}
              progress={progress}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
