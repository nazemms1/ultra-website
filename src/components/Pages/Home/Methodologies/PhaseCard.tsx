'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { motion, useMotionTemplate, useTransform, type MotionValue } from 'framer-motion'
import PhaseGlyph from './PhaseGlyph'
import type { Phase } from './data'

interface PhaseCardProps {
  phase: Phase
  index: number
  total: number
  progress: MotionValue<number>
}

export default function PhaseCard({ phase, index, total, progress }: PhaseCardProps) {
  const rel = (p: number) => index - p * (total - 1)

  const x = useTransform(progress, p => rel(p) * 112)
  const y = useTransform(progress, p => Math.abs(rel(p)) * 24)
  const scale = useTransform(progress, p => Math.max(0.7, 1 - Math.min(Math.abs(rel(p)), 2) * 0.16))
  const rotateZ = useTransform(progress, p => rel(p) * 6)
  const rotateY = useTransform(progress, p => rel(p) * -18)
  const opacity = useTransform(progress, p => {
    const d = Math.abs(rel(p))
    return d > 1.85 ? 0 : Math.max(0, 1 - d * 0.55)
  })
  const zIndex = useTransform(progress, p => Math.round(50 - Math.abs(rel(p)) * 10))
  const pointerEvents = useTransform(progress, p => (Math.abs(rel(p)) < 0.5 ? 'auto' : 'none'))

  const transform = useMotionTemplate`translate(-50%, -50%) translateX(${x}%) translateY(${y}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`

  return (
    <Box
      component={motion.div}
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 'min(86vw, 720px)',
        willChange: 'transform',
      }}
      style={{ transform, opacity, zIndex, pointerEvents }}
    >
      <PhaseCardContent phase={phase} />
    </Box>
  )
}

export function PhaseCardContent({ phase }: { phase: Phase }) {
  return (
    <Box
      component="article"
      sx={theme => ({
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '0.95fr 1fr' },
        overflow: 'hidden',
        borderRadius: '24px',
        boxShadow: `0 24px 64px -16px ${alpha(theme.palette.primary.darker || '#000', 0.45)}`,
        backdropFilter: 'blur(16px)',
      })}
    >
      {/* Background Glass Layer */}
      <Box
        aria-hidden
        sx={theme => ({
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          backgroundImage: `linear-gradient(154deg, ${alpha(theme.palette.primary.darker || '#001a1a', 0.25)} 0%, ${alpha(theme.palette.background.paper, 0.75)} 60%)`,
        })}
      />

      {/* High-Tech Cyber Border */}
      <Box
        aria-hidden
        sx={theme => ({
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`,
        })}
      />

      {/* Visual Column */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: { xs: 200, sm: 240, md: 'auto' },
          minHeight: { md: 340 },
        }}
      >
        <PhaseGlyph imageUrl={phase.imageUrl} index={Number(phase.number) - 1} compact />

        {/* Large Decorative Phase Number */}
        <Typography
          component="span"
          aria-hidden
          sx={theme => ({
            pointerEvents: 'none',
            position: 'absolute',
            bottom: 16,
            left: 24,
            userSelect: 'none',
            fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
            fontSize: { xs: '54px', sm: '72px' },
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: 'transparent',
            backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          })}
        >
          {phase.number}
        </Typography>
      </Box>

      {/* Copy/Content Column */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
          p: { xs: 3.5, sm: 4.5 },
        }}
      >
        {/* Phase Subtitle Tracker */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ height: '1px', width: 24, bgcolor: 'primary.main' }} />
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              color: 'primary.main',
              textTransform: 'uppercase',
            }}
          >
            Phase {phase.number}
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          component="h3"
          sx={{
            fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            textTransform: 'uppercase',
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            color: 'text.primary',
          }}
        >
          {phase.title}
        </Typography>

        {/* Description Copy */}
        <Typography
          sx={{
            maxWidth: '38ch',
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          {phase.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {phase.tags.map(tag => (
            <Box
              key={tag}
              sx={theme => ({
                borderRadius: '9999px',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                px: 1.75,
                py: 0.5,
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'primary.main',
              })}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
