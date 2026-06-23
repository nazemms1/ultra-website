'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import {
  PHASE_CARD_RADIUS,
  phaseCardFill,
  phaseCardInsetBorder,
  phaseCardNumberGradient,
  phaseCardOuterGlow,
  phaseCardSurface,
  phaseCardTagSurface,
  phaseCardVisualBloom,
  phaseCardVisualWash,
} from '@/lib/theme/surfaces'
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

  // Center with margin:auto — avoid translate(-50%,-50%) which misaligns 3D hit targets.
  const transform = useMotionTemplate`translateX(${x}%) translateY(${y}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`

  return (
    <Box
      component={motion.div}
      sx={{
        position: 'absolute',
        inset: 0,
        margin: 'auto',
        width: 'min(86vw, 720px)',
        height: 'fit-content',
        willChange: 'transform',
      }}
      style={{ transform, opacity, zIndex, pointerEvents }}
    >
      <PhaseCardContent phase={phase} />
    </Box>
  )
}

export function PhaseCardContent({ phase }: { phase: Phase }) {
  const theme = useTheme()

  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'visible',
        '&:hover .phase-card-glow': {
          opacity: 1,
        },
      }}
    >
      <Box
        aria-hidden
        className="phase-card-glow"
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          borderRadius: PHASE_CARD_RADIUS,
          boxShadow: phaseCardOuterGlow(theme),
          opacity: 0,
          transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeOut,
          }),
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          ...phaseCardSurface(theme),
          zIndex: 1,
          width: '100%',
        }}
      >
        <Box
          aria-hidden
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            borderRadius: PHASE_CARD_RADIUS,
            background: phaseCardFill(theme),
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
          }}
        >
          {/* Visual Column — image and number occupy isolated vertical zones */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: { xs: 280, sm: 320, md: 'auto' },
              minHeight: { md: 365 },
              overflow: 'hidden',
            }}
          >
            <Box aria-hidden sx={phaseCardVisualBloom(theme)} />
            <Box aria-hidden sx={phaseCardVisualWash(theme)} />

            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                flex: '1 1 auto',
                minHeight: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                pt: { xs: 2, md: 0 },
              }}
            >
              <PhaseGlyph imageUrl={phase.imageUrl} index={Number(phase.number) - 1} compact />
            </Box>

            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                flex: '0 0 auto',
                flexShrink: 0,
                px: { xs: 3, sm: 4 },
                pb: { xs: 2.5, sm: 0.5 },
              }}
            >
              <Typography
                component="span"
                aria-hidden
                sx={{
                  pointerEvents: 'none',
                  display: 'block',
                  userSelect: 'none',
                  fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
                  fontSize: { xs: '54px', sm: '64px', md: '72px' },
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: '-0.022em',
                  ...phaseCardNumberGradient(theme),
                }}
              >
                {phase.number}
              </Typography>
            </Box>
          </Box>

          {/* Copy/Content Column */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2.375,
              p: { xs: 3.5, sm: 4.5, md: 5.5 },
            }}
          >
            {/* Phase Subtitle Tracker */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box sx={{ height: '1px', width: 32, bgcolor: 'primary.light' }} />
              <Typography
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: theme.typography.pxToRem(11),
                  fontWeight: 400,
                  letterSpacing: '0.32em',
                  color: 'primary.light',
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
fontFamily: 'Nulshock, sans-serif',    
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
                fontSize: theme.typography.pxToRem(15),
                lineHeight: 1.58,
                color: theme => alpha(theme.palette.common.white, 0.78),
                textAlign: 'justify',
              }}
            >
              {phase.description}
            </Typography>

            {/* Tags */}
            <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {phase.tags.map(tag => (
                <Box key={tag} sx={phaseCardTagSurface(theme)}>
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          aria-hidden
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            borderRadius: PHASE_CARD_RADIUS,
            boxShadow: phaseCardInsetBorder(theme),
            zIndex: 2,
          }}
        />
      </Box>
    </Box>
  )
}
