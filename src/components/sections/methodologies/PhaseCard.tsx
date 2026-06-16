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
        width: 'min(86vw, 700px)',
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
        borderRadius: '20px',
        boxShadow: `0 20px 48px -14px ${alpha(theme.palette.primary.darker, 0.35)}`,
        backdropFilter: 'blur(12px)',
      })}
    >
      <Box
        aria-hidden
        sx={theme => ({
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          backgroundImage: `linear-gradient(154deg, ${alpha(theme.palette.primary.darker, 0.18)} 0%, ${alpha(theme.palette.background.elevated, 0.95)} 60%)`,
        })}
      />
      <Box
        aria-hidden
        sx={theme => ({
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.25)}`,
        })}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: { xs: 170, sm: 200, md: 'auto' },
          minHeight: { md: 320 },
        }}
      >
        <PhaseGlyph Icon={phase.Icon} index={Number(phase.number) - 1} compact />
        <Typography
          component="span"
          aria-hidden
          sx={theme => ({
            pointerEvents: 'none',
            position: 'absolute',
            bottom: 16,
            left: 20,
            userSelect: 'none',
            fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
            fontSize: { xs: '50px', sm: '64px' },
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'transparent',
            backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          })}
        >
          {phase.number}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: { xs: 1.5, sm: 2 },
          p: { xs: 2.75, sm: 3.75 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box sx={{ height: '1px', width: 28, bgcolor: 'primary.main' }} />
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.32em',
              color: 'primary.main',
            }}
          >
            Phase {phase.number}
          </Typography>
        </Box>

        <Typography
          component="h3"
          sx={{
            fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
            fontSize: { xs: '1.375rem', sm: '1.625rem' },
            textTransform: 'uppercase',
            lineHeight: 1.2,
            letterSpacing: '0.02em',
            color: 'text.primary',
          }}
        >
          {phase.title}
        </Typography>

        <Typography
          sx={{
            maxWidth: '35ch',
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          {phase.description}
        </Typography>

        <Box sx={{ mt: 0.25, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {phase.tags.map(tag => (
            <Box
              key={tag}
              sx={theme => ({
                borderRadius: '9999px',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                px: 1.5,
                py: 0.625,
                fontSize: '10px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
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
